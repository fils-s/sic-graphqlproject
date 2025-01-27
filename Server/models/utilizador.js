const { DataTypes } = require('sequelize');
const sequelize = require('../../connection')
const bcrypt = require('bcrypt')

const Utilizador = sequelize.define("Utilizador",
    {
        utilizadorId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [2, 30]
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            set(value) {
                const hashedPassword = bcrypt.hashSync(value,10)
                this.setDataValue('password',hashedPassword)
            },
        },
        role: {
            type: DataTypes.STRING,
            validate: {
                isIn: {
                    args: [['utilizador', 'admin']],
                    msg: 'O cargo de utilizador deve ser Utilizador ou Admin.'
                }
            },
            defaultValue: 'utilizador'
        },
        dataNascimento: {
            type: DataTypes.DATE,
            allowNull: true
        },
        freqResultados: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isIn: {
                    args: [['Semanal', 'Quinzenal', 'Mensal']],
                    msg: 'A frequência de resultados deve ser Semanal, Quinzenal ou Mensal.'
                }
            },
            defaultValue: 'Semanal'
        }
    },
    {
        tableName: 'Utilizador',
        timestamps: false
    }
);

module.exports = Utilizador;