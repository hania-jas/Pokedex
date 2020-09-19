const createPokemonImage = src => {
    let pokeImage = document.createElement("IMG");
    pokeImage.src = src;
    pokeImage.classList.add('image');
    return pokeImage;
}

const createShapes = (element, className) => {
    let shape = document.createElement(element);
    shape.classList.add(className);
    return shape;
}

const createNavigationButton = buttonClass => {
    let triangle = document.createElement("LI");
    triangle.classList.add(buttonClass);
    return triangle;
}

const createPokemonTypeInfo = typeName => {
    let typeNameElement = document.createElement("LI");
    typeNameElement.classList.add('infoLiItem');
    typeNameElement.innerText = `TYPE NAME: ${typeName}`;
    return typeNameElement;
}

const createPokemonInfo = pokeInfos => {
    let container = document.createElement("DIV");

    let pokemonHeight = document.createElement("LI");
    pokemonHeight.classList.add('infoLiItem');
    let pokemonWeight = document.createElement("LI");
    pokemonWeight.classList.add('infoLiItem');
    let pokemonBaseExperience = document.createElement("LI");
    pokemonBaseExperience.classList.add('infoLiItem')

    pokemonHeight.innerText = `HEIGHT: ${pokeInfos.height}`;
    pokemonWeight.innerText = `WEIGHT: ${pokeInfos.weight}`;
    pokemonBaseExperience.innerText = `BASE EXPERIENCE: ${pokeInfos.base_experience}`;

    container.appendChild(pokemonHeight);
    container.appendChild(pokemonWeight);
    container.appendChild(pokemonBaseExperience);

    const pokeTypes = pokeInfos.types;
    for (let i = 0; i < pokeTypes.length; i++) {
        const newTypeNameElement = createPokemonTypeInfo(pokeTypes[i].type.name);
        container.appendChild(newTypeNameElement);
    }
    return container;


}

const createPokemonListItem = (name, url) => {
    let listElement = document.createElement("LI");
    listElement.classList.add('listElement');
    listElement.innerText = name;
    let infoButton = document.createElement("BUTTON");
    infoButton.classList.add('infoButton');
    infoButton.innerText = 'INFO';

    infoButton.addEventListener('click', () => displayPhotoAndInfo(url));
    listElement.appendChild(infoButton);
    return listElement;



}