const { getOptions } = require("loader-utils");

module.exports = function (source, map, meta) {
  if (meta.attributes.excerpt || !meta.text) {
    this.callback(null, source, map, meta);
    return;
  }

  const options = getOptions(this);
  const length = options && options.length ? options.length : 200;

  const callback = this.async();
  const text = meta.text;

  let excerpt = text.replace(/\r?\n|\r/g, " ");

  if (excerpt.length > length && length) {
    excerpt = excerpt.substr(0, excerpt.lastIndexOf(" ", length - 1)) + "...";
  }

  const attributes = {
    ...meta.attributes,
    excerpt,
  };

  const newMeta = {
    ...meta,
    attributes,
  };
  callback(null, source, map, newMeta);
};
