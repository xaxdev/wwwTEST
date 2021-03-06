const Boom = require('boom');

const internals = {
    filters: []
};

module.exports = {
    auth: {
        strategy: 'authentication'
    },
    handler: (request, reply) => {
        (async _ => {

            const elastic = request.server.plugins.elastic.client;
            const setReference = request.params.setReference.replace('-','/');

            internals.query = JSON.parse(
                `{
                    "query":{
                        "constant_score": {
                            "filter": {
                                "bool": {
                                    "must": [
                                        {
                                            "match": {
                                                "reference": "${setReference}"
                                            }
                                        }
                                    ]
                                }
                            }
                        }
                    }
                }`
            );

            elastic
            .search({
                index: 'mol',
                type: 'setitems',
                body: internals.query
            }).then(function (response) {
                try {
                    let productdata = [];
                    const [productResult] = response.hits.hits.map((element) => element._source);
                    if (!productResult.image) {
                        productResult.gallery = [];
                    }else{
                        productResult.gallery = [...productResult.image];
                    }
                    if (!!productResult.items) {
                        let images = {};
                        images = productResult.items.map((item) => {
                            let { original, thumbnail, lastModifiedDateImage } = item.image;
                            return {...images, original, thumbnail, defaultSetImage: "0", lastModifiedDateSetImage: lastModifiedDateImage};
                        });

                        productResult.gallery.push(...images);

                        let len = productResult.items.length;

                        let productdata = {};

                        productdata = productResult.items.map((item) => {
                            let { id, image, specialDiscount } = item;
                            return {...productdata, id, image, specialDiscount};
                        });

                        const responseSetData = {
                            totalprice:productResult.totalPrice,
                            setimage: (!!productResult.image)? productResult.image.original:null,
                            products:productdata
                        }
                        productResult.setReferenceData = responseSetData;
                    }

                    elastic.close();
                    return reply(JSON.stringify(productResult, null, 4));
                } catch (err) {
                    elastic.close();
                    console.log(err);
                    return reply(Boom.badImplementation(err));
                }
            })
            .catch(function (error) {
                elastic.close();
                return reply(Boom.badImplementation(err));
            });
        })()
    }
};
