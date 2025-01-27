const sequelize = require('../../connection');

const Utilizador = require('./utilizador');
const Notificacao = require('./Notificacao');
const RegistoHumor = require('./registoHumor');

// Relação entre Utilizador e RegistoHumor
Utilizador.hasMany(RegistoHumor, { foreignKey: 'utilizadorId' });
RegistoHumor.belongsTo(Utilizador, { foreignKey: 'utilizadorId' });

// Relação entre Notificacao e Utilizador
Utilizador.hasMany(Notificacao, { foreignKey: 'utilizadorId' });
Notificacao.belongsTo(Utilizador, { foreignKey: 'utilizadorId' });

sequelize.sync({ 'logging': false, 'force': false });

module.exports = { Utilizador, Notificacao, RegistoHumor};