window.addEventListener('load', () => {
    const listOfPokemons = document.getElementById('listOfPokemons');
    fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
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
            })

        })
        .catch(error => console.log(error))


})