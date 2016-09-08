const Boom = require('boom');
const Promise = require('bluebird');
const internals = {
    filters: []
};

module.exports = {
    auth: {
        strategy: 'authentication'
    },
    handler: (request, reply) => {

        const elastic = request.server.plugins.elastic.client;
        const reference = request.params.reference;
        const history = request.history;

        internals.query = JSON.parse(
        `{
            "query":
            {
                "match": {"reference": "${reference}"}
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

        Promise.all([getProductDetail, getSetreference])
        .spread((productDetail, setReference) => {

            const [productResult] = productDetail.hits.hits.map((element) => element._source);

            if(typeof productResult.gemstones !== 'undefined'){

                const images = productResult.gemstones.reduce((accumulator, gemstone) => {

                    let data = [];

                    if (gemstone && gemstone.certificate && gemstone.certificate.images) {
                        data = gemstone.certificate.images;
                    }

                    return accumulator.concat(data);
                }, []);

                productResult.gallery = productResult.gallery.concat(images);
            }

            const [setReferenceData] = setReference.hits.hits.map((element) => element._source);

            if(typeof setReferenceData === 'undefined') {

                productResult.setReferenceData = '';
            } else {

                let len = setReferenceData.items.length;
                let productdata = [];

                for (let i = 0; i < len; i++) {
                    if(productResult.id !== setReferenceData.items[i].id) {
                        productdata.push({
                            id: setReferenceData.items[i].id,
                            image:setReferenceData.items[i].image
                        });
                    }
                }

                const responseSetData = {
                    totalprice:setReferenceData.totalPrice,
                    setimage:setReferenceData.image.original,
                    products:productdata
                }

                productResult.setReferenceData = responseSetData;
            }

            elastic.close();

            // return reply(JSON.stringify(productResult, null, 4));
            return productResult;
        })
        .then(function(item){

            history.save(request, reply, item)

            return reply(JSON.stringify(item, null, 4));
        })
        .catch(function(error) {

            console.log(error);

            elastic.close();

            return reply(Boom.badImplementation(error));
        });
    }
};
