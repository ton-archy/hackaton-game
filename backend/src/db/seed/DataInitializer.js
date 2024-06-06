const fs = require('fs');
const path = require('path');
const scriptRepository = require('../../repositories/ScriptRepository');
const {ResourcesSchema} = require("../../models/ResourcesSchema");
const {
  v4: guid,
} = require('uuid');
const xlsx = require('node-xlsx');

class DataInitializer {

  initializeData(callback) {
    this.addScripts()
      .then(callback)
  }

  updateData(callback) {
    this.addScriptsIds()
      .then(callback);
  }

  async addScripts() {
    const scripts = this.parseTable();
    const lastScript = await this.findLastScript();
    let id = lastScript || guid();
    let updated = 0;
    let created = 0;
    for(const script of scripts) {
      const existedScript = await scriptRepository.getScriptByOuterId(script.scriptId);
      if(existedScript)
      {
        script.next = existedScript.next;
        await scriptRepository.updateScript(existedScript._id, script);
        updated++;
      } else {
        let nextId = guid();
        script._id = id;
        script.next = nextId;
        await scriptRepository.addScriptItem(script);
        id = nextId;
        created++
      }
    }
    console.log(`Created: ${created}, Updated: ${updated}`);
  }

  async findLastScript()
  {
    const scriptsList = await scriptRepository.getScriptList();
    if(scriptsList.length === 0)
    {
      return null;
    }

    let count = 0;
    let id = scriptsList[0]._id;
    let lastScript = scriptsList[0].next;
    while(id != null) {
      lastScript = scriptsList[count].next;
      id = scriptsList.find(script => script._id === lastScript);
      count++;
    }

    return lastScript;
  }

  addNumberSafe(num) {
    const int = parseInt(num);
    return !isNaN(int) ? num : 0;
  }

  parseTable() {
    const filename = 'reign_dialog_scheme_4.xlsx';
    const data = this.getFile(filename);
    const workbook = xlsx.parse(data);
    const table = workbook[0].data;
    return table.map(script => {
      const [scriptId, actor, line, answer1, foodCh1, toolsCh1, armyCh1, cur1, answer2, foodCh2, toolsCh2, armyCh2, cur2, img] = script;
      return {
        scriptId,
        actor,
        img: img,
        line,
        answers: [{
          line: answer1,
          resourcesChange: {
            army: this.addNumberSafe(armyCh1),
            provision: this.addNumberSafe(foodCh1),
            tools: this.addNumberSafe(toolsCh1),
            mysteryCurrency: this.addNumberSafe(cur1)
          },
        },
          {
            line: answer2,
            resourcesChange: {
              army: this.addNumberSafe(armyCh2),
              provision: this.addNumberSafe(foodCh2),
              tools: this.addNumberSafe(toolsCh2),
              mysteryCurrency: this.addNumberSafe(cur2)
            },
          }],
      };
    });
  }

  // only for first migration
  async addScriptsIds() {
    const scriptsList = await scriptRepository.getScriptList();
    let scriptId = 1;
    for(const script of scriptsList) {
      const update = {scriptId};
      const updatedData = await scriptRepository.updateScript(script.id, update)
      scriptId++;
    }
  }

  getFile(filename) {
    const filepath = path.join(__dirname, '/data/' + filename)
    try {
      const data = fs.readFileSync(filepath);
      return data;
    } catch (err) {
      console.error(err);
    }
  }
}

module.exports = new DataInitializer();

// node src/db/seed/dbSeeder.js
