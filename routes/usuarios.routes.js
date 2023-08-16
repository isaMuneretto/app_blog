const express = require('express'); //Importa funcionalidades do Express
const router = express.Router(); //cria um roteador usando a funcionalidade do Express Router
const { QueryTypes } = require('sequelize'); //Importa tipos de consultas do Sequelize
const sequelize = require("../sequelize"); //Importa Sequelize
const Usuario = require('../model/Usuarios'); //Importa o model Usuarios

// Sincroniza os modelos com o banco de dados
sequelize.sync();

//Método GET retorna usuarios com paginação e ordenação
router.get('/', async (req, res) => {
    try {

        const { page = 1, limit = 10 } = req.query;
        const [results, metadata] = await sequelize.query(
            `SELECT * FROM usuarios ORDER BY updatedAt DESC`,
            {
                replacements: { limit: limit, offset: (page - 1) * limit },
                type: sequelize.QueryTypes.SELECT
            }
        );
        res.status(200).json({
            usuario: results,
        });
    } catch (error) {
        res.status(500).json({
            sucess: false,
            message: error.message,
        });
    }
});

//Método GET para listar todos os usuários sem paginação
router.get('/todos', async (req, res) => {
    try {
        const query = "SELECT * FROM usuarios ORDER BY updatedAt DESC";
        const results = await sequelize.query(query, { type: QueryTypes.SELECT });

        res.status(200).json({
            usuarios: results,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

//Método GET consulta usuario pelo ID
router.get('/:id', async (req, res) => {
    try {

        const [results, metadata] = await sequelize.query(
            `SELECT * FROM posts WHERE id = :id`,
            {
                replacements: { id: req.params.id },
                type: sequelize.QueryTypes.SELECT
            }
        );
        res.status(200).json({
            posts: results,
        });

    } catch (error) {
        res.status(500).json({
            sucess: false,
            message: error.message,
        });
    }
});

// Método POST para criar um usuario
router.post('/', async (req, res) => {
    try {

        const query = `INSERT INTO usuarios (nome, email, createdAt, updatedAt) VALUES (?, ?, ?, ?)`;
        const replacements = [req.body.nome, req.body.email, new Date(), new Date()];

        const [results, metadata] = await sequelize.query(query,
            {
                replacements
            });

        res.status(201).json({
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

        const id = req.params.id; 
        const { email } = req.body; //campo a ser alterado

        await sequelize.query("UPDATE usuarios SET email = ? WHERE id = ?",
            {
                replacements: [email, id],
                type: QueryTypes.UPDATE
            });

        res.status(200).json({ 
            message: 'Usuário atualizado com sucesso.'
        });

    } catch (error) {
        res.status(400).json({//retorna status de erro e mensagens
            success: false,
            message: error.message
        });
    }
});

//Método DELETE para deletar um usuario
router.delete('/:id', async (req, res) => {
    try {

        const { id } = req.params; //pega o id enviado pela requisição para ser excluído

        await sequelize.query("DELETE FROM usuarios WHERE id = ?",
            {
                replacements: [id],
                type: QueryTypes.DELETE
            });

        res.status(200).json({ //statusCode indica ok no delete
            message: 'Usuário deletado com sucesso.'
        });

    } catch (error) {
        res.status(400).json({ //retorna status de erro e mensagens
            success: false,
            message: error.message
        });
    }
});

module.exports = router;