const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {ObjectId} = Schema.Types;
const RecordMapper = require("../db/plugins/RecordMapper");
const {ResourcesSchema} = require('./ResourcesSchema');

const HeroSchema = Schema({
  owner: {type: String, required: true},
  name: {type: String, required: false},
  resources: {type: ResourcesSchema, required: true},
  currentScript: {type: String, required: false},
  scriptsLeft: {type: Number, required: false},
  cooldownUntil: {type: String, required: false},
  vault: {type: Number, required: false},
  state: {type: String, required: false},
});
HeroSchema.plugin(RecordMapper);

const HeroModel = mongoose.model('heroes', HeroSchema);

module.exports = HeroModel;
