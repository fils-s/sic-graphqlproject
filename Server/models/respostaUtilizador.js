const { DataTypes } = require('sequelize');
const sequelize = require('../../connection')

const RespostaUtilizador = sequelize.define("RespostaUtilizador",
    {
        registoId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        textoResposta: {
            type: DataTypes.STRING,
            allowNull: true
        },
        opcaoId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Opcaos', 
                key: 'opcaoId'
            }
        },
        utilizadorId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Utilizadors', 
                key: 'utilizadorId'
            }
        },
        perguntaId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Pergunta', 
                key: 'perguntaId'
            }
        },
    },
);

module.exports = RespostaUtilizador;