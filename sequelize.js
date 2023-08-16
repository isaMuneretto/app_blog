//configurações do banco de dados estão seguras no arquivo .env para não ficarem expostas quando compartilhar o código

// Importa a biblioteca Sequelize e dotenv
const Sequelize = require("sequelize");
const dotenv = require('dotenv');
dotenv.config(); //carrega as configurações do banco de dados no arquivo .env

//db é uma instância (obj) do Sequelize usando as info. para a conexão com o banco de dados
const db = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: "mysql",
    }
);

//instância é exportada
module.exports = db