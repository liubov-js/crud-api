module.exports.REGEX_UUID = new RegExp(
  /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/
);

module.exports.getBaseUrl = (req) =>
  req.url.substring(0, req.url.lastIndexOf('/') + 1);

module.exports.getId = (req) => req.url.split('/')[3]; // TODO: 3
