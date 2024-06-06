const repository = require("../repositories/HeroesRepository");
const scriptRepository = require("../repositories/ScriptRepository");
const {mergeResources} = require("../utils/resources");
const { DateTime } = require("luxon");
const HeroState = require("../constants/HeroState");

const defaultResources = {
  army: 50,
  provision: 50,
  tools: 50,
  mysteryCurrency: 0,
}

let FIRST_SCRIPTS_PER_DAY = 10;
let SCRIPTS_PER_DAY = 10;

if (process.env.NODE_ENV === 'production') {
  FIRST_SCRIPTS_PER_DAY = 14;
  SCRIPTS_PER_DAY = 10;
}

class HeroService {
  getHero(id){
    return repository.getHeroById(id);
  }

  getHeroesListByUser(userId) {
    return repository.getHeroesListByUser(userId)
  }

  async createHero(userId) {
    const firstScript = await scriptRepository.getFirstScript();
    const heroItem = {
      owner: userId,
      resources: defaultResources,
      currentScript: firstScript.id,
      scriptsLeft: FIRST_SCRIPTS_PER_DAY,
      vault: 0
    };
    return await repository.addHeroItem(heroItem);
  }

  async applyAnswer(hero, answer, nextScriptId) {
    const updatedResources = mergeResources(hero.resources, answer.resourcesChange);
    const heroState = this.checkResources(updatedResources);
    const scriptsLeft = hero.scriptsLeft - 1;
    let update = null;
    if(scriptsLeft !== 0 && heroState === HeroState.None) {
      update = {
        resources: updatedResources,
        currentScript: nextScriptId,
        scriptsLeft
      }
    } else {
      update = {
        resources: defaultResources,
        currentScript: nextScriptId,
        scriptsLeft: 0,
        vault: hero.vault + updatedResources.mysteryCurrency,
        cooldownUntil: DateTime.now().endOf('day').toISO(),
        state: heroState
      }
    }

    await repository.updateHero(hero._id, update);



    return update;
  }

  checkResources(res) {
    if(res.army >= 100 || res.provision >= 100 || res.tools >= 100) {
      return HeroState.Victory;
    }
    if(res.army <=0 || res.provision <=0 || res.tools <=0) {
      return HeroState.Lose;
    }
    return HeroState.None;
  }

  async refine(hero) {
    const date = DateTime.fromISO(hero.cooldownUntil);
    if(DateTime.now() > date) {
      const update = {
        scriptsLeft: SCRIPTS_PER_DAY,
        cooldownUntil: "",
        state: HeroState.None
      }

      await repository.updateHero(hero._id, update);

      return update;
    }
  }

  getHero(id) {
    return repository.getHeroById(id);
  }
}

module.exports = new HeroService();
