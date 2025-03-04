const { RegistoHumor, Utilizador } = require('../../models');
const { PubSub } = require('graphql-subscriptions');

const pubsub = new PubSub();

const resolversRegisto = {
    
    Query: {
        // Obtem todos os registos de humor do utilizador
        listarRegistos: async (_, __, context) => {
            if (!context.utilizador) {
                throw new Error('Não autenticado.');
              }
        
              const utilizador = await Utilizador.findByPk(context.utilizador.utilizadorId);
              if (!utilizador) {
                throw new Error('Utilizador não encontrado.');
              }

              return RegistoHumor.findAll()
          },
    },

    Mutation: {
        // Criar novo registo de humor
        novaResposta: async (_,{ valorResposta, textoPergunta, notasAdicionais }, context)=>{
            if (!context.utilizador) {
                throw new Error('Não autenticado.');
              }
              let utilizador = await Utilizador.findByPk(context.utilizador.utilizadorId);
              const dataHoje = new Date().toISOString();
              const registo = new RegistoHumor({ data: dataHoje, valorResposta, textoPergunta, notasAdicionais, utilizadorId: utilizador.utilizadorId});
              await registo.save();
  
              pubsub.publish('NOVO_REGISTO_ADICIONADO');
              return registo;
        },

        //Atualizar os dados (valor da resposta e notas adicionais) num registo de humor
        updateResposta: async (_, { registoId, novoValorResposta, novasNotasAdicionais }) => {
            const registo = await RegistoHumor.findByPk(registoId);
            if (!registo) {
              throw new Error('Registo não encontrado');
            }
            if (novoValorResposta) {
                registo.valorResposta = novoValorResposta
              }

              if (novasNotasAdicionais) {
                registo.notasAdicionais = novasNotasAdicionais
              }
        
              await registo.save();
        
              return {
                registoId: registo.registoId,
                valorResposta: registo.valorResposta,
                textoPergunta: registo.textoPergunta,
                notasAdicionais: registo.notasAdicionais
              };
        },

        //REmover um registo de humor
        removeResposta: async (_, { registoId }) => {
            const registo = await RegistoHumor.findByPk(registoId);
            if (!registo) {
              throw new Error('Registo não encontrado');
            }
            await registo.destroy();
            return 'Registo removido com sucesso';
          },
    },
    Subscription: {
        novaNotificacao: {
          subscribe: () => pubsub.asyncIterableIterator('NOVA_NOTIFICACAO')
        }
      }
}

// Função para fazer com que a notificação aconteça a cada 24 horas
const notificacaoDiaria = () => {
    const notificacao = { notificacaoId: '1', textoNotif: 'Não te esqueças de registar o teu nível de humor de hoje' };
    pubsub.publish('NOVA_NOTIFICACAO', { novaNotificacao: notificacao });
  };

  setInterval(notificacaoDiaria, 24 * 60 * 60 * 1000);

module.exports = resolversRegisto;