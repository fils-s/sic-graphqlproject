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
        valorResposta: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        textoPergunta: {
            type: DataTypes.STRING,
            allowNull: false
        },
        notasAdicionais: {
            type: DataTypes.STRING,
            allowNull: true
        }
    },
    {
        tableName: 'RegistoHumor',
        timestamps: false
    }
);

module.exports = RegistoHumor;