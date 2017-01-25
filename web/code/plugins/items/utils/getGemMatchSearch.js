module.exports = (field, value, cb) => {
  let gemstoneFilter = '';

  if (field == 'color' || field == 'certificate.agency' ) {
      value = `${value}`
      value = value.replace(/,/gi, ' ');
  }

  gemstoneFilter =
    `{
      "match": {
        "gemstones.${field}": "${value}"
      }
    }`;

  return gemstoneFilter;
}
