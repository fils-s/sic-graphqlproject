const { DataTypes } = require('sequelize');
const sequelize = require('../../connection')

const RegistoHumor = sequelize.define("RegistoHumor",
    {
        registoId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        data: {
            type: DataTypes.DATE,
            allowNull: false
        },
        tipoHumor: {
            type: DataTypes.STRING,
            allowNull: false
        },
        notasAdicionais: {
            type: DataTypes.STRING,
            allowNull: true
        }
    },
);

module.exports = RegistoHumor;