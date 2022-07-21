const dateInput = document.querySelector('input')

handleChange = () => {
  const chosenDate = new Date(dateInput.value).getTime()
  const isSummer =  chosenDate >= new Date(2021, 11, 22).getTime() && chosenDate <= new Date(2022, 02, 21).getTime()
  const isFall =  chosenDate >= new Date(2022, 02, 22).getTime() && chosenDate <= new Date(2022, 05, 21).getTime()
  const isWinter =  chosenDate >= new Date(2022, 05, 22).getTime() && chosenDate <= new Date(2022, 08, 21).getTime()
  const isSpring =  chosenDate >= new Date(2022, 08, 22).getTime() && chosenDate <= new Date(2022, 11, 21).getTime()

  let seasonParagraph = document.querySelector('p')

  const insertSeasonMessage = (message) => seasonParagraph.textContent = message

  if (!seasonParagraph) {
    seasonParagraph = document.createElement('p')
    document.body.appendChild(seasonParagraph)
  }
  
  if (isSummer) {
    insertSeasonMessage('É verão 🌞')
    return
  }
 
  if (isFall) {
    insertSeasonMessage('É outono 🍂')
    return
  }
  
  if (isWinter) {
    insertSeasonMessage('É inverno ☃️')
    return
  }

  if (isSpring) {
    insertSeasonMessage('É primavera 🌻')
    return
  }

  seasonParagraph.textContent = 'Não sei a estação dessa data, tenta um dia entre 22 de Dezembro de 2021 e 21 de Dezembro de 2022'
  
}