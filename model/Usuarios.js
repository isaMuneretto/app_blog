const db = require("../sequelize");  // Importa o objeto de conexão com o banco de dados
const Sequelize = require("sequelize");  // Importa a classe Sequelize para definir modelos

//método define do sequelize define um modelo com dois argumentos(nome do modelo e obj com as colunas)
const Usuario = db.define("usuario", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
    },
});

// Sincroniza o modelo com o banco de dados
Usuario.sync();
//modelo exportado para ser usado em outras partes do codigo
module.exports = Usuario;