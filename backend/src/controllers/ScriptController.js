const {Router} = require('express');
const scriptService = require('../services/ScriptService');
const {checkAuth} = require("../utils/auth");

const router = Router();

router.use(checkAuth);

router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    let script = await scriptService.getScriptById(id);
    res
      .status(200)
      .json(script);
  } catch (e) {
    res
      .status(500)
      .json({error: e.message});
  }
});

module.exports = router;
