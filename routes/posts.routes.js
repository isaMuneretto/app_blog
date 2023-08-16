const express = require('express');  //Importa funcionalidades do Express
const router = express.Router(); //cria um roteador usando a funcionalidade do Express Router
const { QueryTypes } = require('sequelize'); //Importa tipos de consultas do Sequelize
const sequelize = require("../sequelize"); //Importa Sequelize
const Post = require('../model/Posts'); //Importa a model Post

// Sincroniza os modelos com o banco de dados
sequelize.sync();

//Método GET retorna posts com paginação e ordenação
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
        res.status(200).json({
            post: results,
        });
    } catch (error) {
        res.status(500).json({
            sucess: false,
            message: error.message,
        });
    }
});

//Método GET para listar todos os posts sem paginação
router.get('/todos', async (req, res) => {
    try {

        const query = "SELECT * FROM posts ORDER BY updatedAt DESC";
        const results = await sequelize.query(query,
            {
                type: QueryTypes.SELECT
            });

        res.status(200).json({
            posts: results,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
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

// Método POST para criar um post
router.post('/', async (req, res) => {
    try {

        const query = `INSERT INTO posts (titulo, conteudo, autor_id, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?)`;
        const replacements = [req.body.titulo, req.body.conteudo, req.body.autor_id, new Date(), new Date()];

        const [results, metadata] = await sequelize.query(query,
            {
                replacements
            });

        res.status(201).json({
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

        const id = req.params.id;
        const { conteudo } = req.body; //campo a ser alterado

        await sequelize.query("UPDATE posts SET conteudo = ? WHERE id = ?",
            {
                replacements: [conteudo, id],
                type: QueryTypes.UPDATE
            });

        res.status(200).json({ //statusCode indica ok no update
            message: 'Post atualizado com sucesso.'
        });

    } catch (error) {//retorna status de erro e mensagens
        res.status(400).json({ 
            msg: error.message 
        }); 
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

        res.status(200).json({ //statusCode indica ok no delete
            message: 'Post deletado com sucesso.'
        });

    } catch (error) {//retorna status de erro e mensagens
        res.status(400).json({ 
            msg: error.message 
        }); 
    }
});

module.exports = router;
