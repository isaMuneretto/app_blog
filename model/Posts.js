const db = require("../sequelize");  // Importa o objeto de conexão com o banco de dados
const Sequelize = require("sequelize"); // Importa a classe Sequelize para definir modelos
const Usuarios = require("./Usuarios")  // Importa o modelo "Usuarios" 

//método define do sequelize define um modelo com dois argumentos(nome do modelo e obj com as colunas)
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

//Relação entre o modelo Post e Usuarios criando chave estrangeira 
Post.belongsTo(Usuarios, { foreignKey: 'autor_id' });
// Sincroniza o modelo com o banco de dados
Post.sync();
//modelo exportado para ser usado em outras partes do codigo
module.exports = Post;