const characterCard = document.querySelector(".character_wrapper");
const inputElement = document.querySelector("#input_id");

const baseUrl = "https://rickandmortyapi.com/api/character";
//https://mocki.io/v1/31b5bdb5-fdc2-4e0e-9c2a-f4ebe67c3f86
//https://rickandmortyapi.com/api/character
const getAllCharacter = async () => {
  const response = await fetch(baseUrl, { mathod: "GET" });

  if (!response.ok) {
    throw new Error("Error requetion");
  } else {

    return await response.json();
  }
};


const renderCharacter = (characters) => {
  characterCard.innerHTML = ``;
  if(characters) {
    characters.forEach((character) => {
      characterCard.innerHTML += 
      `<div class="wrapper_card">
                      <h3 class="title_character">${character.name}</h3>
                      <img class="img_character" src="${character.image}" alt="${character.name}">
                      <div class="wrapper_content">
                          <p class="text">Species: <span class="span">${character.species}</span></p>
                          <p class="text">Status: <span class="span">${character.status}</span></p>
                          <p class="text">Location name: <span class="span">${character.location.name}</span></p>
                      </div>
                  </div>
                  `;
    });
  } else {
    characterCard.innerHTML += `<h2>Данных нет</h2>`
  }
};

const filtrCharacterByName = (characters, name) => {
  const filterName =  characters.filter(character => {
    return (`
      ${character.name}
      ${character.species}
      ${character.status}
      ${character.location.name}
      `).toLowerCase().includes(name.toLowerCase().trim())
  });
  return filterName
}


const getFillterCharacter = async () => {

  const response = await getAllCharacter();
  
  renderCharacter(response.results);
  inputElement.addEventListener('input', (event) => {
    const filtredCharacter = filtrCharacterByName(response.results, event.target.value)
    renderCharacter(filtredCharacter);
  });
}

getFillterCharacter()
.catch(error => {
  console.error('Error requetion: ', error)
})
