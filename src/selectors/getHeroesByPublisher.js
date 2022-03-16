import { heroes } from "../data/heroes"

export const getHeroesByPublisher = (publiher) => {

    const validPublishers = ['DC Comics', 'Marvel Comics'];

    if (!validPublishers.includes(publiher)) {
        throw new Error(`${publiher} is not a valid publisher`);
    }

    //console.log('getHeroesByPublisher Called');
    return heroes.filter(hero => hero.publisher === publiher);
}