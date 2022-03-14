import { heroes } from "../data/heroes"

export const getHeroById = (id) => {
    // console.log('getHeroeById Called');
    return heroes.find(heroe => heroe.id === id);
}