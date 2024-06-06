const HeroModel = require('../models/Hero');

class HeroesRepository {
  getHeroesListByUser(userId) {
    return HeroModel.find({owner: userId});
  }

  getHeroById(id) {
    return HeroModel.findOne({_id: id});
  }

  heroIsExisted(name) {
    return HeroModel.exists({name});
  }

  addHeroItem(hero) {
    const command = new HeroModel(hero);
    return command.save();
  }

  updateHero(id, update) {
    return HeroModel.updateOne({_id: id}, update);
  }
}

module.exports = new HeroesRepository();
