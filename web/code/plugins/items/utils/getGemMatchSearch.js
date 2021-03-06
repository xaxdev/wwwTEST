module.exports = (field, value, cb) => {
    let gemstoneFilter = '';

    if (field == 'color' || field == 'certificate.agency' || field == 'clarity') {
        value = `${value}`
        value = value.replace(/,/gi, ' ');
    }

    gemstoneFilter =
      `{
        "match": {
          "gemstones.${field}": {
              "query": "${value}",
              "operator": "AND"
          }
        }
      }`;

    return gemstoneFilter;
}
