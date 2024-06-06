const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {Number} = Schema.Types;
const IdRemover = require("../db/plugins/IdRemover");

const ResourcesSchema = Schema({
  army: Number,
  provision: Number,
  tools: Number,
  mysteryCurrency: Number,
});
ResourcesSchema.plugin(IdRemover);

module.exports = {
  ResourcesSchema
};
