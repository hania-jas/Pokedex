const listOfPokemons = document.querySelector('.listOfPokemons');
const pokeImg = document.querySelector('.pokeImg');
const infoList = document.querySelector('.infoList');
const pokeNameParagraph = document.querySelector('.pokeNameParagraph');
const displayDateAndTimeParagraph = document.querySelector('.displayDateAndTimeParagraph');
const input = document.querySelector('.input');

let pokemonList = [];

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
const displayNextPokemon = id => {
    if (id < 151) {
        id++;
        let url = 'https://pokeapi.co/api/v2/pokemon/' + id;
        displayPhotoAndInfo(url);
    }

}
const displayPreviousPokemon = id => {
    if (id > 1) {
        id--;
        let url = 'https://pokeapi.co/api/v2/pokemon/' + id;
        displayPhotoAndInfo(url);
    }
}

const displayPhotoAndInfo = (pokemonDetailsUrl) => {
    fetch(pokemonDetailsUrl)
        .then(res => res.json())
        .then(pokeInfos => {
            clearPokemonInfoScreen();

            const pokemonImageSrc = pokeInfos.sprites.front_default;
            const pokemonImage = createPokemonImage(pokemonImageSrc);
            pokeImg.appendChild(pokemonImage);
            const pokeImgBackground = createShapes("DIV", 'pokeImgBackground');
            const leftCorner = createShapes("DIV", 'leftCorner');
            const pokeImgWhiteBackground = createShapes("DIV", 'pokeImgWhiteBackground');
            pokeImg.appendChild(pokeImgBackground);
            pokeImg.appendChild(leftCorner);
            pokeImgBackground.appendChild(pokeImgWhiteBackground);
            const backroundImageBigCircle = createShapes("DIV", 'backroundImageBigCircle');
            pokeImgBackground.appendChild(backroundImageBigCircle);
            const leftBackgroundStripes = createShapes("DIV", 'leftBackgroundStripes');
            const rightBackgroundStripes = createShapes("DIV", 'rightBackgroundStripes')
            pokeImgBackground.appendChild(leftBackgroundStripes);
            pokeImgBackground.appendChild(rightBackgroundStripes);

            const triangleLeft = createNavigationButton('triangleLeft');
            const triangleRight = createNavigationButton('triangleRight');
            pokeImg.appendChild(triangleLeft);
            pokeImg.appendChild(triangleRight);
            triangleRight.addEventListener('click', () => displayNextPokemon(pokeInfos.id));
            triangleLeft.addEventListener('click', () => displayPreviousPokemon(pokeInfos.id));

            pokeNameParagraph.innerText = pokeInfos.name;
            const pokemonInfoComponent = createPokemonInfo(pokeInfos);
            infoList.appendChild(pokemonInfoComponent);
        });
}
const searchPokemon = () => {
    let inputValue = input.value;
    displayListOfPokemons(pokemonList, inputValue);
}

const displayListOfPokemons = (pokemonList, filteringText = '') => {
    listOfPokemons.innerHTML = '';
    pokemonList.forEach(pokeItem => {
        const pokeNameInUpperCase = pokeItem.name.toUpperCase();
        const filteringTextInUpperCase = filteringText.toUpperCase();

        if (pokeNameInUpperCase.indexOf(filteringTextInUpperCase) > -1 || filteringText === '') {
            const pokemonListItem = createPokemonListItem(pokeItem.name, pokeItem.url);
            listOfPokemons.appendChild(pokemonListItem);
        }
    })
}

window.addEventListener('load', () => {
    const url = 'https://pokeapi.co/api/v2/pokemon?limit=151'
    fetch(url)
        .then(response => response.json())
        .then(pokemons => {
            pokemonList = pokemons.results;
            displayListOfPokemons(pokemonList);
        })
        .catch(error => console.log(error));

    displayDateAndTime();

    document.addEventListener('keyup', searchPokemon);
})