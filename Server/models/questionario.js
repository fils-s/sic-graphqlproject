const { DataTypes } = require('sequelize');
const sequelize = require('../../connection')

const Questionario = sequelize.define("Questionario",
    {
        questionarioId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
);

module.exports = Questionario;