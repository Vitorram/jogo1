const { z } = require("zod");

module.exports = z.object({
  nomeCompleto: z.string().min(3),
  email: z.string().email(),
  senha: z.string().min(6),

  cpf: z.string().optional(),
  rua: z.string().optional(),
  bairro: z.string().optional(),
  rg: z.string().optional(),
  cnh: z.string().optional(),
});
