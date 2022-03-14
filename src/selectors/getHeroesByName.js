import { heroes } from "../data/heroes";

export const getHeroesByName = (name = '') => {

    console.log('getHeroesByName called');

    if (name === '') {
        return [];
    }

    name = name.toLowerCase();
    return heroes.filter(heroe => heroe.superhero.toLowerCase().includes(name));

    //return [...heroes];
}