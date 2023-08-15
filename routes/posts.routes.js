const express = require('express');
const router = express.Router();
const { QueryTypes } = require('sequelize');
const sequelize = require("../sequelize");
const Post = require('../model/Posts');

sequelize.sync();

//Métoo GET retorna posts com paginação e ordenação
router.get('/', async (req, res) => {
    try {

        const { page = 1, limit = 10 } = req.query;
        const [results, metadata] = await sequelize.query(
            `SELECT * FROM posts ORDER BY updatedAt DESC LIMIT :limit OFFSET :offset`,
            {
                replacements: { limit: limit, offset: (page - 1) * limit },
                type: sequelize.QueryTypes.SELECT
            }
        );
        res.json({
            post: results,
        });
    } catch (error) {
        res.status(500).json({
            sucess: false,
            message: error.message,
        });
    }
});

//Método GET consulta posts pelo ID
router.get('/:id', async (req, res) => {
    try {

        const [results, metadata] = await sequelize.query(
            `SELECT * FROM posts WHERE id = :id`,
            {
                replacements: { id: req.params.id },
                type: sequelize.QueryTypes.SELECT
            }
        );
        if (results.length === 0) {
            res.status(404).json({
                sucess: false,
                message: "Post não encontrado",
            });
        } else {
            res.json({
                sucess: true,
                post: results,
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

        const query = `INSERT INTO posts (titulo, conteudo, autor_id, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?)`;
        const replacements = [req.body.titulo, req.body.conteudo, req.body.autor_id, new Date(), new Date()];

        const [results, metadata] = await sequelize.query(query, { replacements });

        res.status(201).json({
            success: true,
            message: "Post criado com sucesso",
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
        const { conteudo } = req.body; //campo a ser alterado

        //altera o campo conteúdo, no registro onde o id coincidir com o id enviado
        await sequelize.query("UPDATE posts SET conteudo = ? WHERE id = ?",
            {
                replacements: [conteudo, id],
                type: QueryTypes.UPDATE
            });

        res.status(200).json({ message: 'Post atualizado com sucesso.' }); //statusCode indica ok no update

    } catch (error) {
        res.status(400).json({ msg: error.message }); //retorna status de erro e mensagens
    }
});

//Método DELETE para deletar um post
router.delete('/:id', async (req, res) => {
    try {

    const { id } = req.params; //pega o id enviado pela requisição para ser excluído
    
        await sequelize.query("DELETE FROM posts WHERE id = ?",
            {
                replacements: [id],
                type: QueryTypes.DELETE
            });

        res.status(200).json({ message: 'Post deletado com sucesso.' }); //statusCode indica ok no delete

    } catch (error) {
        res.status(400).json({ msg: error.message }); //retorna status de erro e mensagens
    }
});

module.exports = router;
