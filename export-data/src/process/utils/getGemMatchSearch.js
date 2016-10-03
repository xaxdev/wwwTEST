module.exports = (fiels, value, cb) => {
  let gemstoneFilter = '';

  gemstoneFilter =
    `{
      "match": {
        "gemstones.${fiels}": "${value}"
      }
    }`;

  return gemstoneFilter;
}
