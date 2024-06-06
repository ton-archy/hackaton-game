const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {ObjectId} = Schema.Types;
const RecordMapper = require("../db/plugins/RecordMapper");
const {ResourcesSchema} = require('./ResourcesSchema');

const ConclusionSchema = Schema({
  line: {type: String, required: true},
  img: {type: String, required: false},
  resourcesChange: {type: ResourcesSchema, required: true},
});

const ActionSchema = Schema({
  line: {type: String, required: true},
  img: {type: String, required: false},
  resourcesChange: {type: ResourcesSchema, required: true},
  conclusion: {type: ConclusionSchema, required: false},
});

const ScriptSchema = Schema({
  _id: {type: String, required: true},
  scriptId: {type: Number, required: true},
  actor: {type: String, required: false},
  img: {type: String, required: false},
  line: {type: String, required: true},
  answers: [
    {type: ActionSchema, required: true},
    {type: ActionSchema, required: true}
  ],
  next: {type: String, required: true},
});
ScriptSchema.plugin(RecordMapper);

const ScriptModel = mongoose.model('scripts', ScriptSchema);

module.exports = ScriptModel;
