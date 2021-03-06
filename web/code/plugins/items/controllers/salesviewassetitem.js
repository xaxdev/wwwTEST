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
        const db = request.mongo.db
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
            }`
        );
        const getProductDetail =  elastic.search({
            index: 'mol_solditems',
            type: 'solditems',
            body: internals.query
        });
        const getSetreference = getProductDetail.then((response) => {
            try {
                const [productResult] = response.hits.hits.map((element) => element._source);
                if (!productResult) {
                    return reply(Boom.badRequest('Couldn\'t found data product detail of item:' + id));
                }

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
                    }`
                );

                return elastic.search({
                    index: 'mol_solditems',
                    type: 'setitems',
                    body: query
                });
            } catch (err) {
                console.log(err);
                return reply(Boom.badImplementation(err));
            }
        });

        const getMovements = getProductDetail.then((response) => {
            try {
                const [productResult] = response.hits.hits.map((element) => element._source);
                if (!productResult) {
                    return reply(Boom.badRequest('Couldn\'t found data of item:' + id));
                }
                const query =  GetMovement(productResult.reference,productResult.sku);

                return elastic.search({
                    index: 'mol_solditems',
                    type: 'activities',
                    body: query
                });
            } catch (err) {
                console.log(err);
                return reply(Boom.badImplementation(err));
            }
        });

        const getGOCs = getProductDetail.then((response) => {
            try {
                const [productResult] = response.hits.hits.map((element) => element._source);
                if (!productResult) {
                    return reply(Boom.badRequest('Couldn\'t found data of item:' + id));
                }
                const query =  GetGOC(productResult.reference,productResult.sku);

                return elastic.search({
                    index: 'mol_solditems',
                    type: 'activities',
                    body: query
                });
            } catch (err) {
                console.log(err);
                return reply(Boom.badImplementation(err));
            }
        });
        try {
            Promise.all([getProductDetail, getSetreference, getMovements, getGOCs]).spread(async (productDetail, setReference, movements, gocs) => {
                const [productResult] = await productDetail.hits.hits.map((element) => element._source);
                // add certificate images to item gallery
                if (!!productResult.gemstones) {
                    let certificateImages = productResult.gemstones.reduce((certificateImages, gemstone) => (gemstone.certificate && gemstone.certificate.images)? certificateImages.concat(gemstone.certificate.images) : certificateImages, [])

                    //change path original image of certificate by korakod
                    certificateImages = certificateImages.map((images) => {
                        let { original, thumbnail, physicalFile } = images;
                        // original = original.replace('/images/products/original','/original');
                        // thumbnail = thumbnail.replace('/images/products/thumbnail','/original');
                        original = physicalFile
                        thumbnail = physicalFile
                        return {...images, original, thumbnail};
                    });
                    productResult.gallery.push(...certificateImages)
                }

                // const [setReferenceData] = setReference.hits.hits.map((element) => element._source);
                // console.log('productResult.setReference-->',productResult.setReference);
                const [setReferenceData] = await db.collection('SetReferenceSearch').find({ "userId": request.auth.credentials.id, "reference": productResult.setReference  }).toArray()
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
                        setimage: (!!setReferenceData.image) ? setReferenceData.image.length != 0 ?setReferenceData.image[0].original : null : null,
                        products:productdata
                    }
                    productResult.setReferenceData = responseSetData;
                }
                let movement = await movements.hits.hits.map((element) => element._source);
                // console.log(movement);
                movement = movement.filter((item) => {
                    return item.physicalInvent != 1;
                })
                const goc = await gocs.hits.hits.map((element) => element._source);
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
                console.log(err);
                return reply(Boom.badImplementation(err));
            });

        } catch (err) {
            elastic.close();
            return reply(Boom.badImplementation(err));
        }
    }
};
