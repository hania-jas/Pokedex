const listOfPokemons = document.querySelector('.listOfPokemons');
const pokeImg = document.querySelector('.pokeImg');
const infoList = document.querySelector('.infoList');
const pokeNameParagraph = document.querySelector('.pokeNameParagraph');
const displayDateAndTimeParagraph = document.querySelector('.displayDateAndTimeParagraph');

const displayDateAndTime = () => {
    let today = new Date();
    let date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
    let time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    displayDateAndTimeParagraph.innerHTML = `DATE: ${date} TIME: ${time}`;
    setTimeout(displayDateAndTime, 1000);
}
clearPokemonInfoScreen = () => {
    infoList.innerHTML = '';
    pokeImg.innerHTML = '';
    pokeNameParagraph.innerText = '';
}

const displayPhotoAndInfo = (pokemonDetailsUrl) => {
    fetch(pokemonDetailsUrl)
        .then(res => res.json())
        .then(pokeInfos => {
            clearPokemonInfoScreen();

            const pokemonImageSrc = pokeInfos.sprites.front_default;
            const pokemonImage = createPokemonImage(pokemonImageSrc);
            pokeImg.appendChild(pokemonImage);

            const triangleLeft = createNavigationButton('triangleLeft');
            const triangleRight = createNavigationButton('triangleRight');
            pokeImg.appendChild(triangleLeft);
            pokeImg.appendChild(triangleRight);

            pokeNameParagraph.innerText = pokeInfos.name;
            const pokemonInfoComponent = createPokemonInfo(pokeInfos);
            infoList.appendChild(pokemonInfoComponent);

        });
}


window.addEventListener('load', () => {
    const url = 'https://pokeapi.co/api/v2/pokemon?limit=151'
    fetch(url)
        .then(response => response.json())
        .then(pokemons => {
            let pokeResults = pokemons.results;
            pokeResults.map(pokeresult => {
                const pokemonListItem = createPokemonListItem(pokeresult.name, pokeresult.url);
                listOfPokemons.appendChild(pokemonListItem);
            })
        })
        .catch(error => console.log(error))
    displayDateAndTime();
})