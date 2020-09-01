const listOfPokemons = document.getElementById('listOfPokemons');
const pokeImg = document.querySelector('.pokeImg');
const infoList = document.getElementById('infoList');
const firstLi = document.getElementById('firstLi');
const secondLi = document.getElementById('secondLi');
const thirdLi = document.getElementById('thirdLi');
const paragraph = document.getElementById('paragraph');
const dateParagraph = document.getElementById('dateParagraph');

const displayDateAndTime = () => {
    let today = new Date();
    let date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
    let time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    dateParagraph.innerHTML = `DATE: ${date} TIME: ${time}`;
    setTimeout(displayDateAndTime, 1000);
}

const displayPhotoAndInfo = (pokemonDetailsUrl) => {
    fetch(pokemonDetailsUrl)
        .then(res => res.json())
        .then(pokeInfos => {
            console.log({ pokeInfos })
            let img = document.createElement("IMG");
            img.src = pokeInfos.sprites.front_default;
            pokeImg.appendChild(img);
            let triangleLeft = document.createElement("DIV");
            pokeImg.appendChild(triangleLeft);
            triangleLeft.id = 'triangleLeft';
            let triangleRight = document.createElement("DIV");
            pokeImg.appendChild(triangleRight);
            triangleRight.id = 'triangleRight';
            img.setAttribute("id", "image");
            paragraph.innerText = pokeInfos.name;
            firstLi.innerText = `HEIGHT: ${pokeInfos.height}`;
            secondLi.innerText = `WEIGHT: ${pokeInfos.weight}`;
            thirdLi.innerText = `BASE EXPERIENCE: ${pokeInfos.base_experience}`;

            let pokeTypes = pokeInfos.types
            for (let i = 0; i < pokeTypes.length; i++) {
                console.log(pokeTypes[i].type.name);
                let newListElement = document.createElement("LI");
                newListElement.innerText = `TYPE NAME: ${pokeTypes[i].type.name}`;
                infoList.appendChild(newListElement);
            }


        });
}


window.addEventListener('load', () => {
    const url = 'https://pokeapi.co/api/v2/pokemon?limit=151'
    fetch(url)
        .then(response => response.json())
        .then(pokemons => {
            console.log({ pokemons })
            let pokeResults = pokemons.results;
            pokeResults.map(pokeresult => {
                let listElement = document.createElement("LI");
                listElement.innerText = pokeresult.name;
                listOfPokemons.appendChild(listElement);
                listElement.classList.add('listElement');
                let infoButton = document.createElement("BUTTON");
                infoButton.innerText = 'INFO';
                listElement.appendChild(infoButton);
                infoButton.classList.add('infoButton');
                infoButton.addEventListener('click', () => displayPhotoAndInfo(pokeresult.url));
            })
        })
        .catch(error => console.log(error))
    displayDateAndTime();
})