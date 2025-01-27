const { DataTypes } = require('sequelize');
const sequelize = require('../../connection')

const Opcao = sequelize.define("Opcao",
    {
        opcaoId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        textoOpcao: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
);

module.exports = Opcao;