import {get, post} from "./index";
import {DateTime} from "luxon";

export const getHeroesByUser = async () => {
  return get("hero/");
}

export const createHero = () => {
  return post("hero/")
}

export const applyAnswer = (heroId, answerId) => {
  const body = {
    answer: answerId
  }
  return post(`hero/${heroId}/answer`, body);
}

export const refineHero = (heroId) => {
  return post(`hero/${heroId}/refine`);
}

export const getFirstHero = async () => {
  const heroes = await getHeroesByUser();
  if (heroes.length === 0) {
    return await createHero();
  } else {
    let hero = heroes[0];
    if (hero.scriptsLeft === 0) {
      const date = DateTime.fromISO(hero.cooldownUntil);
      if (DateTime.now() > date) {
        hero = await refineHero(hero.id);
      }
    }
    return hero;
  }
}
