var listaNumeros = [ 2, 3, 9, 12, 16, 55, 90, 78, 17 ]

listaNumeros.forEach((numero, index) => {
  const dobro = numero * 2
  listaNumeros[index] = dobro
})