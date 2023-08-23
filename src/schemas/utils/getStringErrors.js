function generateErrorMessage(respuesta) {
  const errores = respuesta.error.errors;
  let mensaje = "Se encontraron los siguientes errores: ";

  errores.forEach((error) => {
    mensaje += `${error.message} - `;
  });

  return mensaje;
}

module.exports = {
  generateErrorMessage,
};
