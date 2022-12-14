const colorAleatorio = () => {
  // Genera un color aleatorio en formato hexadecimal
  const color = Math.floor(Math.random() * 16777215).toString(16)
  return `#${color}`
}

export default colorAleatorio
