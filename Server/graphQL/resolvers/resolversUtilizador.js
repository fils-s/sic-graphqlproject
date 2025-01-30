const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Utilizador } = require('../../models');
const { verificarRespostaDiaria, enviarNotificacao } = require('../../utilities/notifs');
const { verificarUtilizador } = require('../../middlewares/jwt');
const { PubSub } = require('graphql-subscriptions');

const SECRET = process.env.SECRET;
const pubsub = new PubSub();

const resolversUtilizador = {
  Query: {
    // Obter todos os utilizadores (para admins)
    utilizadores: async (_, __, context) => {
      try {
          if (!context.utilizador) {
              throw new Error("Não autenticado.");
          }
  
          if (context.utilizador.role !== "admin") {
              throw new Error("Esta ação requer privilégios de administrador");
          }
  
          return await Utilizador.findAll();
      } catch (error) {
          throw new Error(error.message);
      }
  },
    // Obter Perfil do Utilizador Autenticado
    perfil: async (_, __, context) => {
      if (!context.utilizador) {
        throw new Error('Não autenticado.');
      }

      const utilizador = await Utilizador.findByPk(context.utilizador.utilizadorId);
      if (!utilizador) {
        throw new Error('Utilizador não encontrado.');
      }

      const respondeu = await verificarRespostaDiaria(utilizador.utilizadorId);
      if (!respondeu) {
        await enviarNotificacao(utilizador.utilizadorId);
      }

      return utilizador;
    }
  },

  Mutation: {
    // Registar um novo utilizador
    registar: async (_, { username, password, dataNascimento, role }) => {
      const utilizadorExistente = await Utilizador.findOne({ where: { username } });
      if (utilizadorExistente) {
        throw new Error('Username já existe.');
      }
      // Encriptar a password antes de guardar
      const hashedPassword = await bcrypt.hash(password, 10);

      const roleDefinido = role || 'utilizador';
      const novoUtilizador = await Utilizador.create({
        username,
        password: hashedPassword,
        role: roleDefinido,
        dataNascimento
      });

      return {
        utilizadorId: novoUtilizador.utilizadorId,
        username: novoUtilizador.username,
        dataNascimento: novoUtilizador.dataNascimento,
        message: 'Utilizador registado com sucesso.'
      };
    },

    // Fazer login e gerar JWT
    login: async (_, { username, password }) => {
      const utilizador = await Utilizador.findOne({ where: { username } });
      if (!utilizador) {
        throw new Error('Credenciais inválidas.');
      }

      const isPasswordValid = bcrypt.compare(password, utilizador.password);
      if (!isPasswordValid) {
        throw new Error('Palavra Passe Errada.');
      }
      const token = jwt.sign(
        { id: utilizador.utilizadorId, username: utilizador.username },
        SECRET,
        { expiresIn: '1d' }
      );
      return {
        token,
        message: 'Autenticado com Sucesso',
      };
    },

    // Editar perfil
    editarPerfil: async (_, { novoUsername, novaFreqResultados }, context) => {
      if (!context.utilizador) {
        throw new Error('Não autenticado.');
      }

      const utilizador = await Utilizador.findByPk(context.utilizador.utilizadorId);
      if (!utilizador) {
        throw new Error('Utilizador não encontrado.');
      }

      if (novoUsername) {
        const utilizadorExistente = await Utilizador.findOne({ where: { username: novoUsername } });
        if (utilizadorExistente) {
          throw new Error('Este nome de utilizador já está em uso.');
        }
        utilizador.username = novoUsername;
      }

      if (novaFreqResultados) {
        utilizador.freqResultados = novaFreqResultados;
      }

      await utilizador.save();

      return {
        utilizadorId: utilizador.utilizadorId,
        username: utilizador.username,
        dataNascimento: utilizador.dataNascimento,
        freqResultados: utilizador.freqResultados,
        message: 'Perfil atualizado com sucesso.',
      };
    }
  },
  Subscription: {
    novaNotificacao: {
      subscribe: () => pubsub.asyncIterableIterator('NOVA_NOTIFICACAO')
    }
  }
};

module.exports = resolversUtilizador;