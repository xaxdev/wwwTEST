const Boom = require('boom');

const internals = {
  filters: []
};

module.exports = {
  auth: false,
  handler: (request, reply) => {

    const elastic = request.server.plugins.elastic.client;
    console.log('request.payload-->',request.params.setReference);
    const setReference = request.params.setReference;
    const productId = request.params.productId;

    internals.query = JSON.parse(
      `{
        "sort" : [
             { "reference" : "desc" }
          ],
        "query":{
             "constant_score": {
               "filter": {
                 "bool": {
                   "must": [
                     {
                       "match": {
                         "setReference": "${setReference}"
                       }
                     }
                   ]
                 }
               }
             }
          }
        }`);

    elastic
      .search({
        index: 'mol',
        type: 'items',
        body: internals.query
      }).then(function (response) {

        let productdata = [];
        const productResult = response.hits.hits.map((element) => element._source);
        let len = productResult.length;
        let totalprice = "";
        let totalCHF = 0;
        let totalEUR = 0;
        let totalJOD = 0;
        let totalKWD = 0;
        let totalLBP = 0;
        let totalOMR = 0;
        let totalQAR = 0;
        let totalSAR = 0;
        let totalUSD = 0;
        let totalAED = 0;
        for (let i = 0; i < len; i++) {
           totalCHF += parseInt(productResult[i].price.CHF);
           totalEUR += parseInt(productResult[i].price.EUR);
           totalJOD += parseInt(productResult[i].price.JOD);
           totalKWD += parseInt(productResult[i].price.KWD);
           totalLBP += parseInt(productResult[i].price.LBP);
           totalOMR += parseInt(productResult[i].price.OMR);
           totalQAR += parseInt(productResult[i].price.QAR);
           totalSAR += parseInt(productResult[i].price.SAR);
           totalUSD += parseInt(productResult[i].price.USD);
           totalAED += parseInt(productResult[i].price.AED);
           if(productId !== productResult[i].id){
              productdata.push({
                  id: productResult[i].id,
                  image:productResult[i].gallery
              });
           }
        }

        let price = {
            "CHF": parseInt(totalCHF),
            "EUR": parseInt(totalEUR),
            "JOD": parseInt(totalJOD),
            "KWD": parseInt(totalKWD),
            "LBP": parseInt(totalLBP),
            "OMR": parseInt(totalOMR),
            "QAR": parseInt(totalQAR),
            "SAR": parseInt(totalSAR),
            "USD": parseInt(totalUSD),
            "AED": parseInt(totalAED)
          }

        const responseData = {
          totalprice:price,
          products:productdata

        }

        elastic.close();
        return reply(JSON.stringify(responseData, null, 4));
      })
      .catch(function (error) {
        elastic.close();
        return reply(Boom.badImplementation(err));
      });
  }
};
