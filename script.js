const listOfPokemons = document.getElementById('listOfPokemons');
const infoBox = document.querySelector('.infoBox');
const displayPhoto = pokemonDetailsUrl => {
    fetch(pokemonDetailsUrl)
        .then(res => res.json())
        .then(pokeInfos => {
            console.log({ pokeInfos })
            let img = document.createElement("IMG");
            img.src = pokeInfos.sprites.front_default;
            infoBox.appendChild(img);
        });
}
window.addEventListener('load', () => {
    const url = 'https://pokeapi.co/api/v2/pokemon?limit=151'
    fetch(url)
        .then(response => response.json())
        .then(pokemons => {
            console.log({ pokemons })
            let pokeResults = pokemons.results;
            console.log(pokeResults);
            pokeResults.map(pokeresult => {
                let listElement = document.createElement("LI");
                listElement.innerText = pokeresult.name;
                listOfPokemons.appendChild(listElement);
                listElement.classList.add('listElement');
                let infoButton = document.createElement("BUTTON");
                infoButton.innerText = 'INFO';
                listElement.appendChild(infoButton);
                infoButton.classList.add('infoButton');
                infoButton.addEventListener('click', () => displayPhoto(pokeresult.url))

            })

        })
        .catch(error => console.log(error))
})