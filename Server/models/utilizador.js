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
            defaultValue: 'utilizador'
        },
        dataNascimento: {
            type: DataTypes.DATE,
            allowNull: true
        }
    },
);

module.exports = Utilizador;