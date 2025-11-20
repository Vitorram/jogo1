const usuarioModel = require("../models/usuarioModel");
const bcrypt = require("bcryptjs");

module.exports = {
  login: async (req, res) => {
    const { email, senha } = req.body;

    const usuario = await usuarioModel.findByEmail(email);
    if (!usuario) return res.status(400).json({ error: "Usuário não encontrado" });

    const valid = await bcrypt.compare(senha, usuario.senhaHash);
    if (!valid) return res.status(400).json({ error: "Senha incorreta" });

    return res.json({
      message: "Login OK",
      usuario: {
        id: usuario.id,
        nomeCompleto: usuario.nomeCompleto,
        email: usuario.email,
      }
    });
  }
};
