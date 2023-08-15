const db = require("../sequelize");
const Sequelize = require("sequelize");
const Usuarios = require("./Usuarios")

const Post = db.define("post", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    titulo: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    conteudo: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    autor_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
});

Post.belongsTo(Usuarios, { foreignKey: 'autor_id' });

Post.sync();

module.exports = Post;