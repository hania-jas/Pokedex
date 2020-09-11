const listOfPokemons = document.querySelector('.listOfPokemons');
const pokeImg = document.querySelector('.pokeImg');
const infoList = document.querySelector('.infoList');
const pokeNameParagraph = document.querySelector('.pokeNameParagraph');
const displayDateAndTimeParagraph = document.querySelector('.displayDateAndTimeParagraph');
const input = document.querySelector('.input');

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
    let inputValue = input.value.toUpperCase();
    const listElement = listOfPokemons.getElementsByClassName('listElement');
    for (let i = 0; i < listElement.length; i++) {
        let textValue = listElement[i].innerText;
        if (textValue.indexOf(inputValue) > -1) {
            listElement[i].style.display = '';
        } else {
            listElement[i].style.display = 'none';
        }
    }
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
        .catch(error => console.log(error));
    displayDateAndTime();
    document.addEventListener('keydown', searchPokemon);
})