const Boom = require('boom');
import Elasticsearch from 'elasticsearch'
const Promise = require('bluebird');
const GetMovement = require('../utils/getMovement');
const GetGOC = require('../utils/getGOC');

const internals = {
  filters: []
};

module.exports = {
    auth: {
        strategy: 'authentication'
    },
  handler: (request, reply) => {

    const elastic = new Elasticsearch.Client({
                    host: request.elasticsearch.host,
                    keepAlive: false
                });
    const id = request.params.id;
    internals.query = JSON.parse(
    `{
      "query":
        {
         "match": {"id": "${id}"}
        }
    }`);

    const getProductDetail =  elastic
            .search({
                index: 'mol',
                type: 'items',
                body: internals.query
            });

    const getSetreference = getProductDetail.then((response) => {
      const [productResult] = response.hits.hits.map((element) => element._source);
      const query = JSON.parse(
        `{
          "query":{
               "constant_score": {
                 "filter": {
                   "bool": {
                     "must": [
                       {
                         "match": {
                           "reference": "${productResult.setReference}"
                         }
                       }
                     ]
                   }
                 }
               }
            }
          }`);

      return elastic.search({
              index: 'mol',
              type: 'setitems',
              body: query
            });
    });

    const getMovements = getProductDetail.then((response) => {
        const [productResult] = response.hits.hits.map((element) => element._source);
        const query =  GetMovement(productResult.reference,productResult.sku);
        // console.log(JSON.stringify(query, null, 2));

        return elastic.search({
                index: 'mol',
                type: 'movements',
                body: query
              });
    });

    const getGOCs = getProductDetail.then((response) => {
        const [productResult] = response.hits.hits.map((element) => element._source);
        const query =  GetGOC(productResult.reference,productResult.sku);
        // console.log(JSON.stringify(query, null, 2));

        return elastic.search({
                index: 'mol',
                type: 'movements',
                body: query
              });
    });

    Promise.all([getProductDetail, getSetreference, getMovements, getGOCs]).spread((productDetail, setReference, movements, gocs) => {

        const [productResult] = productDetail.hits.hits.map((element) => element._source);

        // add certificate images to item gallery
        if (!!productResult.gemstones) {
            let certificateImages = productResult.gemstones.reduce((certificateImages, gemstone) => (gemstone.certificate && gemstone.certificate.images)? certificateImages.concat(gemstone.certificate.images) : certificateImages, [])

            //change path original image of certificate by korakod
            certificateImages = certificateImages.map((images) => {
                                    let { original, thumbnail } = images;
                                    original = original.replace('/images/products/original','/original');
                                    thumbnail = thumbnail.replace('/images/products/thumbnail','/original');
                                    return {...images, original, thumbnail};
                                });
            productResult.gallery.push(...certificateImages)
        }

        const [setReferenceData] = setReference.hits.hits.map((element) => element._source);
        if(typeof setReferenceData === 'undefined'){
            productResult.setReferenceData = '';
        } else {
            let len = setReferenceData.items.length;

            let productdata = [];
            for (let i = 0; i < len; i++) {
               if(productResult.id !== setReferenceData.items[i].id){
                  productdata.push({
                      id: setReferenceData.items[i].id,
                      image:setReferenceData.items[i].image
                  });
               }
            }
            const responseSetData = {
              totalprice:setReferenceData.totalPrice,
              setimage: (!!setReferenceData.image)? setReferenceData.image.original:null,
              products:productdata
            }

            productResult.setReferenceData = responseSetData;
        }

        const movement = movements.hits.hits.map((element) => element._source);
        const goc = gocs.hits.hits.map((element) => element._source);
        const activities = {
            movement: movement,
            goc: goc
        };

        productResult.activities = activities;

        elastic.close();
        return reply(JSON.stringify(productResult, null, 4));
    })
    .catch(function(err) {
        elastic.close();
        return reply(Boom.badImplementation(error));
    });
  }
};
