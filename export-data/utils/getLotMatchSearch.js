module.exports = (field, value, cb) => {
  let lotFilter = '';

  if (field == 'color' || field == 'cut' || field == 'clarity' ) {
      value = `${value}`
      value = value.replace(/,/gi, ' ');
  }

  lotFilter =
    `{
      "match": {
        "lotNumbers.${field}": "${value}"
      }
    }`;

  return lotFilter;
}
