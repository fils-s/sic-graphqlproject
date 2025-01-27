const { DataTypes } = require('sequelize');
const sequelize = require('../../connection')

const Pergunta = sequelize.define("Pergunta",
    {
        perguntaId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        textoPergunta: {
            type: DataTypes.STRING,
            allowNull: false
        },
        tipoPergunta: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
);

module.exports = Pergunta;