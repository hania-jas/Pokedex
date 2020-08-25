window.addEventListener('load', () => {
    const listOfPokemons = document.getElementById('listOfPokemons');
    const infoBox = document.querySelector('.infoBox');
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
                infoButton.dataset.url = pokeresult.url;
                infoButton.innerText = 'INFO';
                listElement.appendChild(infoButton);
                infoButton.classList.add('infoButton');
                const displayPhoto = () => {
                    fetch(infoButton.dataset.url)
                        .then(res => res.json())
                        .then(pokeInfos => {
                            console.log({ pokeInfos })
                            let img = document.createElement("IMG");
                            img.src = pokeInfos.sprites.front_default;
                            infoBox.appendChild(img);


                        });
                }
                infoButton.addEventListener('click', displayPhoto)

            })

        })
        .catch(error => console.log(error))
})