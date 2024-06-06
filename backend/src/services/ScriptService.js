const repository = require("../repositories/ScriptRepository");

const firstScriptId = "d0cc3df2-0421-4b25-9395-50171a587388";

class ScriptService {
  getFirstScript() {
    return repository.getScriptById(firstScriptId);
  }

  getScriptById(id) {
    return repository.getScriptById(id);
  }
}

module.exports = new ScriptService();
