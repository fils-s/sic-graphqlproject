const sequelize = require('../../connection');

const Utilizador = require('./utilizador');
const Notificacao = require('./Notificacao');
const Opcao = require('./opcao');
const Pergunta = require('./pergunta');
const Questionario = require('./questionario');
const RegistoHumor = require('./registoHumor');
const RespostaUtilizador = require('./respostaUtilizador');


// Relação entre Utilizador e RegistoHumor (1:N)
Utilizador.hasMany(RegistoHumor, { foreignKey: 'utilizadorId' });
RegistoHumor.belongsTo(Utilizador, { foreignKey: 'utilizadorId' });

// Relação entre RegistoHumor e Questionario (1:1)
RegistoHumor.hasOne(Questionario, { foreignKey: 'registoHumorId' });
Questionario.belongsTo(RegistoHumor, { foreignKey: 'registoHumorId' });

// Relação entre Questionario e Pergunta (1:N)
Questionario.hasMany(Pergunta, { foreignKey: 'questionarioId' });
Pergunta.belongsTo(Questionario, { foreignKey: 'questionarioId' });

// Relação entre Pergunta e Opcao (1:N)
Pergunta.hasMany(Opcao, { foreignKey: 'perguntaId' });
Opcao.belongsTo(Pergunta, { foreignKey: 'perguntaId' });

// Relação entre Utilizador e Opcao (N:M) através de RespostaUtilizador
Utilizador.belongsToMany(Opcao, { through: RespostaUtilizador, foreignKey: 'utilizadorId' });
Opcao.belongsToMany(Utilizador, { through: RespostaUtilizador, foreignKey: 'opcaoId' });

// Relação entre Notificacao e Utilizador (1:N)
Utilizador.hasMany(Notificacao, { foreignKey: 'utilizadorId' });
Notificacao.belongsTo(Utilizador, { foreignKey: 'utilizadorId' });


sequelize.sync({ 'logging': false, 'force': false });

module.exports = { Utilizador, Notificacao, Opcao, Pergunta, Questionario, RegistoHumor, RespostaUtilizador};