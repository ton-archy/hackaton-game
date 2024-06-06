const {Router} = require('express');
const {checkAuth, parseQuery} = require("../utils/auth");
const heroService = require("../services/HeroService");
const scriptService = require("../services/ScriptService");

const router = Router();

router.use(checkAuth);

router.get('/', async (req, res, next) => {
  try {
    const token = req.headers.token;
    const initData = parseQuery(token);
    const heroes = await heroService.getHeroesListByUser(initData.user.id);
    res
      .status(200)
      .json(heroes);
  } catch (e) {
    res
      .status(500)
      .json({error: e.message});
  }
});

router.post('/', async (req, res, next) => {
  try {
    const token = req.headers.token;
    const initData = parseQuery(token);
    const newHero = await heroService.createHero(initData.user.id);
    res
      .status(201)
      .json(newHero);
  } catch (e) {
    res
      .status(500)
      .json({error: e.message});
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const heroId = req.params.id;
    const hero = await heroService.getHero(heroId);
    res
      .status(200)
      .json(hero);
  } catch (e) {
    res
      .status(500)
      .json({error: e.message});
  }
});

router.post('/:id/answer', async (req, res, next) => {
  try {
    const heroId = req.params.id;
    const token = req.headers.token;
    const initData = parseQuery(token);
    const answerId = req.body.answer;

    const hero = await heroService.getHero(heroId);
    if(parseInt(hero.owner) !== initData.user.id) {
      throw Error("You have no rights for this hero.");
    }
    if(hero.scriptsLeft === 0) {
      throw Error("You have no left scripts for today.");
    }

    const script = await scriptService.getScriptById(hero.currentScript);
    const answer = script.answers.find(answer => answer._id == answerId);
    await heroService.applyAnswer(hero, answer, script.next);
    const updatedHero = await heroService.getHero(heroId);
    res
      .status(200)
      .json(updatedHero);

  } catch (e) {
    res
      .status(500)
      .json({error: e.message});
  }
});

router.post('/:id/refine', async (req, res, next) => {
  try {
    const heroId = req.params.id;
    const token = req.headers.token;
    const initData = parseQuery(token);

    const hero = await heroService.getHero(heroId);
    if(parseInt(hero.owner) !== initData.user.id) {
      throw Error("You have no rights for this hero");
    }

    await heroService.refine(hero);
    const updatedHero = await heroService.getHero(heroId);
    res
      .status(200)
      .json(updatedHero);

  } catch (e) {
    res
      .status(500)
      .json({error: e.message});
  }
});

module.exports = router;
