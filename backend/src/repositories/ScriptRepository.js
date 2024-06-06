const ScriptModel = require('../models/Script');

class ScriptRepository {
  getScriptList() {
    return ScriptModel.find();
  }

  updateScript(id, update) {
    return ScriptModel.updateOne({_id: id}, update);
  }

  async addScriptItem(script) {
    const scriptItem = new ScriptModel(script);
    return await scriptItem.save();
  }

  getScriptById(id) {
    return ScriptModel.findOne({_id: id});
  }

  getScriptByOuterId(scriptId) {
    return ScriptModel.findOne({scriptId: scriptId});
  }

  getFirstScript() {
    return ScriptModel.findOne();
  }
}

module.exports = new ScriptRepository();
