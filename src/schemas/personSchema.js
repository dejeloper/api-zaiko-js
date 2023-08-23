const { z } = require("zod");

const personSchema = z.object({
  Name: z
    .string({
      invalid_type_error: "El nombre debe ser de tipo texto",
      required_error: "El nombre es requerido",
    })
    .min(4, { message: "El nombre debe tener al menos 4 caracter" })
    .max(50, { message: "El nombre debe tener máximo 50 caracteres" }),
  LastName: z
    .string({
      invalid_type_error: "El apellido debe ser de tipo texto",
      required_error: "El apellido es requerido",
    })
    .min(4, { message: "El apellido debe tener al menos 4 caracter" })
    .max(50, { message: "El apellido debe tener máximo 50 caracteres" }),
  DocumentType: z
    .number({
      invalid_type_error: "El tipo de documento debe ser de tipo numérico",
      required_error: "El tipo de documento es requerido",
    })
    .int()
    .min(1001, {
      message: "El tipo de documento debe ser mayor o igual a 1001",
    })
    .max(1010, {
      message: "El tipo de documento debe ser menor o igual a 1010",
    }),
  DocumentNumber: z
    .string({
      invalid_type_error: "El número de documento debe ser de tipo numérico",
      required_error: "El número de documento es requerido",
    })
    .min(4, {
      message: "El número de documento debe tener al menos 4 caracter",
    })
    .max(20, {
      message: "El número de documento debe tener máximo 20 caracteres",
    }),
  DateBirthday: z
    .date({
      invalid_type_error: "La fecha de nacimiento debe ser de tipo fecha",
      required_error: "La fecha de nacimiento es requerida",
    })
    .min(new Date(1970, 1, 1), {
      message: "La fecha de nacimiento debe ser mayor a 1970-01-01",
    })
    .max(new Date(2014, 1, 1), {
      message: "La fecha de nacimiento debe ser menor a 2014-01-01",
    }),
  State: z
    .number({
      invalid_type_error: "El estado debe ser de tipo numérico",
      required_error: "El estado es requerido",
    })
    .positive()
    .min(1001, { message: "El estado debe ser mayor o igual a 1001" })
    .max(1003, { message: "El estado debe ser menor o igual a 1003" }),
  UserCreated: z
    .string()
    .min(4, {
      message: "El Usuario de Creación debe tener al menos 4 caracter",
    })
    .max(50, {
      message: "El Usuario de Creación debe tener máximo 50 caracteres",
    })
    .optional(),
  UserUpdate: z
    .string()
    .min(4, {
      message: "El Usuario de Actualización debe tener al menos 4 caracter",
    })
    .max(50, {
      message: "El Usuario de Actualización debe tener máximo 50 caracteres",
    })
    .optional(),
});

function validateCreatePerson(person) {
  if (person.DateBirthday) person.DateBirthday = new Date(person.DateBirthday);

  return personSchema.safeParse(person);
}

function validatePartialPerson(person) {
  if (person.DateBirthday) person.DateBirthday = new Date(person.DateBirthday);

  return personSchema.partial().safeParse(person);
}

module.exports = {
  validateCreatePerson,
  validatePartialPerson,
};
