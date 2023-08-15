const express = require('express');
const router = express.Router();
const { QueryTypes } = require('sequelize');
const sequelize = require("../sequelize");
const Post = require('../model/Posts');

sequelize.sync();

//Métoo GET retorna usuario com paginação e ordenação
router.get('/', async (req, res) => {
    try {

        const { page = 1, limit = 10 } = req.query;
        const [results, metadata] = await sequelize.query(
            `SELECT * FROM usuarios ORDER BY updatedAt DESC LIMIT :limit OFFSET :offset`,
            {
                replacements: { limit: limit, offset: (page - 1) * limit },
                type: sequelize.QueryTypes.SELECT
            }
        );
        res.json({
            usuario: results,
        });
    } catch (error) {
        res.status(500).json({
            sucess: false,
            message: error.message,
        });
    }
});

//Método GET consulta usuario pelo ID
router.get('/:id', async (req, res) => {
    try {

        const [results, metadata] = await sequelize.query(
            `SELECT * FROM usuarios WHERE id = :id`,
            {
                replacements: { id: req.params.id },
                type: sequelize.QueryTypes.SELECT
            }
        );
        if (results.length === 0) {
            res.status(404).json({
                sucess: false,
                message: "Usuário não encontrado",
            });
        } else {
            res.json({
                sucess: true,
                usuario: results,
            });
        }
    } catch (error) {
        res.status(500).json({
            sucess: false,
            message: error.message,
        });
    }
});

// Método POST para criar um post
router.post('/', async (req, res) => {
    try {

        const query = `INSERT INTO usuarios (nome, email, createdAt, updatedAt) VALUES (?, ?, ?, ?)`;
        const replacements = [req.body.nome, req.body.email, new Date(), new Date()];

        const [results, metadata] = await sequelize.query(query, { replacements });

        res.status(201).json({
            success: true,
            message: "Usuário criado com sucesso!",
            results: results,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

//Método PUT para atualizar, o id indica o registro a ser alterado
router.put('/:id', async (req, res) => {
    try {

    const id = req.params.id; //pega o id enviado pela requisição
    const { email } = req.body; //campo a ser alterado
    
        //altera o campo conteúdo, no registro onde o id coincidir com o id enviado
        await sequelize.query("UPDATE usuarios SET email = ? WHERE id = ?", 
        { 
            replacements: [email, id],
            type: QueryTypes.UPDATE 
        });

        res.status(200).json({ message: 'Usuário atualizado com sucesso.' }); //statusCode indica ok no update
    
    } catch (error) {
        res.status(400).json({ msg: error.message }); //retorna status de erro e mensagens
    }
});

//Método DELETE para deletar um post
router.delete('/:id', async (req, res) => {
    try {

    const { id } = req.params; //pega o id enviado pela requisição para ser excluído

    
        await sequelize.query("DELETE FROM usuarios WHERE id = ?", 
        { 
            replacements: [id], 
            type: QueryTypes.DELETE 
        });

        res.status(200).json({ message: 'Usuário deletado com sucesso.' }); //statusCode indica ok no delete

    } catch (error) {
        res.status(400).json({ msg: error.message }); //retorna status de erro e mensagens
    }
});

module.exports = router;