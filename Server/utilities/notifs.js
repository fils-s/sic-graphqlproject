// src/utils/notificacaoUtils.js

const { Op } = require('sequelize');
const { RegistoHumor, Notificacao } = require('../models');

module.exports = {
    // Função para verificar se o utilizador já respondeu à pergunta diária
    verificarRespostaDiaria: async (utilizadorId) => {
        const agora = new Date();
        const dataHoje = agora.toISOString().split("T")[0]; //(YYYY-MM-DD)
    
        const respostaDiaria = await RegistoHumor.findOne({
            where: {
                utilizadorId,
                data: {
                    [Op.gte]: new Date(dataHoje),
                    [Op.lte]: new Date(dataHoje + 'T23:59:59.999Z')
                }
            }
        });
    
        return respostaDiaria !== null;
    },
    // Função para criar a notificação
    enviarNotificacao: async (utilizadorId) => {
        const textoNotif = `Ainda não respondeu à sua pergunta diária. Não se esqueça de responder!`;
    
        await Notificacao.create({
            textoNotif,
            utilizadorId
        });
    }
}