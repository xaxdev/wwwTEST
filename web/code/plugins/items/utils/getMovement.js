const internals = {
  filters: []
};
module.exports = (reference, sku, cb) => {
    let filter = '';
    internals.filters = [];

    if (!!reference && reference != '') {
        filter =
          `{
            "match": {
              "reference": {
                "query": "${reference}"
              }
            }
          }`;
        internals.filters.push(JSON.parse(filter));
        filter = '';
    }
    filter =
      `{
        "match": {
          "type": "mov"
        }
      }`;
    internals.filters.push(JSON.parse(filter));
    filter = '';
    if (!!sku && sku != '') {
        filter =
          `{
            "match": {
              "sku": {
                "query": "${sku}"
              }
            }
          }`;
        internals.filters.push(JSON.parse(filter));
        filter = '';
    }
    internals.query = JSON.parse(
      `{
        "query":{
             "constant_score": {
               "filter": {
                 "bool": {
                   "must": ${JSON.stringify(internals.filters)}
                 }
               }
             }
          }
        }`);
    return internals.query;
}
