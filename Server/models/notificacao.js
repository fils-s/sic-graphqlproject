const { DataTypes } = require('sequelize');
const sequelize = require('../../connection')

const Notificacao = sequelize.define("Notificacao",
    {
        notificacaoId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        tipoNotif: {
            type: DataTypes.STRING,
            allowNull: false
        },
        textoNotif: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        tableName: 'Notificacao',
        timestamps: false
    }
);

module.exports = Notificacao;