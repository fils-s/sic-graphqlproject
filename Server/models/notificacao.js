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