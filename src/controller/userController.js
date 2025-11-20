const usuarioModel = require("../models/userModel");
const usuarioSchema = require("../validations/usuarioSchema");
const bcrypt = require("bcryptjs");

module.exports = {
  getAll: async (req, res) => {
    const usuarios = await usuarioModel.findAll();
    return res.json(usuarios);
  },

  getOne: async (req, res) => {
    const { id } = req.params;
    const usuario = await usuarioModel.findById(id);

    if (!usuario) return res.status(404).json({ error: "Usuário não encontrado" });

    return res.json(usuario);
  },

  create: async (req, res) => {
    try {
      const data = usuarioSchema.parse(req.body);

      const exists = await usuarioModel.findByEmail(data.email);
      if (exists) return res.status(400).json({ error: "E-mail já cadastrado" });

      const senhaHash = await bcrypt.hash(data.senha, 10);
      delete data.senha;

      const novo = await usuarioModel.create({
        ...data,
        senhaHash,
      });

      return res.status(201).json(novo);

    } catch (err) {
      return res.status(400).json({ error: err.errors || err.message });
    }
  },

  update: async (req, res) => {
    const { id } = req.params;

    let data = req.body;

    if (data.senha) {
      data.senhaHash = await bcrypt.hash(data.senha, 10);
      delete data.senha;
    }

    try {
      const updated = await usuarioModel.update(id, data);
      return res.json(updated);

    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  },

  delete: async (req, res) => {
    try {
      await usuarioModel.remove(req.params.id);
      return res.json({ message: "Usuário removido" });
    } catch {
      return res.status(400).json({ error: "Erro ao deletar usuário" });
    }
  }
};
