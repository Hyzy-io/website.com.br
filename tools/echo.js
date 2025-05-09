// tools/echo.js
module.exports = async (input, context) => {
  return {
    message: `Você disse: ${input.message || 'nada'}`
  }
}
