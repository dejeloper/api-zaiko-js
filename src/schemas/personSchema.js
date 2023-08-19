const { z } = require("zod");

const personSchema = z.object({
  Name: z
    .string({
      invalid_type_error: "El nombre debe ser de tipo texto",
      required_error: "El nombre es requerido",
    })
    .min(1)
    .max(50),
  LastName: z
    .string({
      invalid_type_error: "El apellido debe ser de tipo texto",
      required_error: "El apellido es requerido",
    })
    .min(1)
    .max(50),
  DocumentType: z
    .number({
      invalid_type_error: "El tipo de documento debe ser de tipo numérico",
      required_error: "El tipo de documento es requerido",
    })
    .positive()
    .min(1001)
    .max(1010),
  DocumentNumber: z
    .string({
      invalid_type_error: "El número de documento debe ser de tipo numérico",
      required_error: "El número de documento es requerido",
    })
    .min(6)
    .max(20),
  DateBirthday: z
    .date({
      invalid_type_error: "La fecha de nacimiento debe ser de tipo fecha",
      min_error: "La fecha de nacimiento debe ser mayor a 1970-01-01",
      max_error: "La fecha de nacimiento debe ser menor a 2014-01-01",
      required_error: "La fecha de nacimiento es requerida",
    })
    .min(new Date(1970, 1, 1))
    .max(new Date(2014, 1, 1)),
  State: z
    .number({
      invalid_type_error: "El estado debe ser de tipo numérico",
      required_error: "El estado es requerido",
    })
    .positive()
    .min(1001)
    .max(1010),
  UserCreated: z.string().min(1).max(50),
});

function validatePerson(person) {
  person.DateBirthday = new Date(person.DateBirthday);

  return personSchema.safeParse(person);
}

module.exports = {
  validatePerson,
};
