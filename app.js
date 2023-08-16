const express = require("express"); //importa express para construção de apps
const cors = require("cors"); // Importa o middleware CORS 
const app = express(); //cria instância do Express
const bodyParser = require("body-parser"); //analisar dados do corpo das requisições

//Define a porta em que o servidor irá ouvir
const PORT = 8081;
// importa as rotas
const post = require('./routes/posts.routes');
const usuario = require('./routes/usuarios.routes');

app.use(cors()); //adiciona o cors ao express para permitir requisições de diferentes domínios
app.use(bodyParser.json()); //permite o express analisar JSON no corpo das req

app.use('/post', post); //define o caminho /post para rotas posts
app.use('/usuario', usuario); //define o caminho /usuario para rotas de usuarios


app.listen(PORT, () => { //inicia o servidor e escuta na porta definida
    console.log(`Server started on port ${PORT}`);
});