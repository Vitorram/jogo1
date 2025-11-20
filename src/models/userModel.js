const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  findAll: () => prisma.usuario.findMany(),

  findById: (id) =>
    prisma.usuario.findUnique({ where: { id: Number(id) } }),

  findByEmail: (email) =>
    prisma.usuario.findUnique({ where: { email } }),

  create: (data) =>
    prisma.usuario.create({ data }),

  update: (id, data) =>
    prisma.usuario.update({
      where: { id: Number(id) },
      data
    }),

  remove: (id) =>
    prisma.usuario.delete({ where: { id: Number(id) } }),
};
