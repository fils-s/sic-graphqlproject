const jwt = require("jsonwebtoken");
const { Utilizador } = require("../models/index");

const secret = process.env.SECRET;

module.exports = {
    verificarUtilizador: async (authHeader) => {
        if (!authHeader) throw new Error("Não autenticado.");

        if (!authHeader.startsWith("Bearer ")) {
            throw new Error("Formato de token inválido. Use 'Bearer <token>'");
        }

        try {
            const token = authHeader.split(" ")[1];
            const payload = jwt.verify(token, secret);

            if (!payload || !payload.id) {
                throw new Error("Token inválido.");
            }

            const utilizador = await Utilizador.findByPk(payload.id);
            if (!utilizador) {
                throw new Error("Utilizador não encontrado.");
            }

            return utilizador;
        } catch (error) {
            if (error instanceof jwt.TokenExpiredError) {
                throw new Error("O seu token expirou! Por favor faça login de novo.");
            }
            throw new Error("Token inválido.");
        }
    }
};