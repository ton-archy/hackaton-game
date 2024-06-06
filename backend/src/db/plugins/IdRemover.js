const IdRemover = (schema) => {
  schema.options.toJSON = {
    virtuals: true,
    versionKey: false,
    transform(doc, ret) {
      delete ret._id;
    }
  };
}

module.exports = IdRemover;
