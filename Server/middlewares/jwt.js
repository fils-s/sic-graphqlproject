const jwt = require("jsonwebtoken");
const { Utilizador } = require("../models/index");

const secret = process.env.SECRET;

module.exports = {
  verificarUtilizador: async (authHeader) => {
    if (!authHeader) throw new Error("Não autenticado.");

    try {
      const token = authHeader.split(" ")[1];
      const payload = jwt.verify(token, secret);

      if (!payload) throw new Error("Token falhou verificação.");

      const utilizador = await Utilizador.findByPk(payload.id);

      if (!utilizador) throw new Error("Utilizador não encontrado.");
      return utilizador;
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        throw new Error("O seu token expirou! Por favor faça login de novo.");
      }
      throw new Error("Token inválido.");
    }
  }
};