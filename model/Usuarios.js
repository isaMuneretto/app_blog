const db = require("../sequelize");
const Sequelize = require("sequelize");

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

Usuario.sync();

module.exports = Usuario;