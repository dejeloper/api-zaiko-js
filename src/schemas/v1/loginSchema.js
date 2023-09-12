const { z } = require("zod");

const loginSchema = z.object({
  Username: z
    .string({
      invalid_type_error: "El usuario debe ser de tipo texto",
      required_error: "El usuario es requerido",
    })
    .min(4, { message: "El usuario debe tener al menos 4 caracter" })
    .max(50, { message: "El usuario debe tener máximo 50 caracteres" }),
  Password: z
    .string({
      invalid_type_error: "La contraseña debe ser de tipo texto",
      required_error: "La contraseña es requerida",
    })
    .min(4, { message: "La contraseña debe tener al menos 4 caracter" })
    .max(50, { message: "La contraseña debe tener máximo 50 caracteres" }),
});

function validateLogin(data) {
  return loginSchema.safeParse(data);
}

module.exports = {
  validateLogin,
};
