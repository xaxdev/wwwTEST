const Boom = require('boom');
import Elasticsearch from 'elasticsearch'
const Promise = require('bluebird');
const GetMovement = require('../utils/getMovement');
const GetGOC = require('../utils/getGOC');
const GetSalesSearch = require('../utils/getSalesSearch');
const getSalesSetReference = require('../utils/getSalesSetReference');

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
        let obj = request.payload;
        let sortBy = request.payload.sortBy;
        let sortDirections = request.payload.sortDirections;
        let keys = Object.keys(obj);
        let ps=[];

        const getClarityItems =  (query) => {
            // console.log(JSON.stringify(query, null, 2));
            return elastic.search({
                index: 'mol_solditems',
                type: 'solditems',
                body: query
            })
        };

        if (!!keys.find((key) => {return key == 'gemstones'})) {
            const valusObj = obj['gemstones'];
            const clarityFields = Object.keys(valusObj);
            if (!!clarityFields.find((key) => {return key == 'clarity'})) {
                const clarities = valusObj.clarity.split(',');
                clarities.map((clar) => {
                    internals.querySet = GetSalesSearch(request, 0, 100000,clar);
                    ps.push(getClarityItems(internals.querySet));
                })
            }else{
                internals.querySet = GetSalesSearch(request, 0, 100000,null);
                // console.log(JSON.stringify(internals.query, null, 2));
                ps.push(getClarityItems(internals.querySet));
            }
        }else{
            internals.querySet = GetSalesSearch(request, 0, 100000,null);
            // console.log(JSON.stringify(internals.query, null, 2));
            ps.push(getClarityItems(internals.querySet));
        }

        // console.log(JSON.stringify(internals.querySet, null, 2));

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

                return elastic.search({
                    index: 'mol_solditems',
                    type: 'solditems',
                    body: internals.querySet
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

                let setReferenceData = setReference.hits.hits.map((element) => element._source);
                setReferenceData = setReferenceData.sort(compareBy('setReference','asc'));
                let [setSalesReferences] = await getSalesSetReference(setReferenceData);

                if(typeof setSalesReferences === 'undefined'){
                    productResult.setReferenceData = '';
                } else {
                    let len = setSalesReferences.items.length;

                    let productdata = [];
                    for (let i = 0; i < len; i++) {
                        if(productResult.id !== setSalesReferences.items[i].id){
                            productdata.push({
                                id: setSalesReferences.items[i].id,
                                image:setSalesReferences.items[i].image
                            });
                        }
                    }
                    const responseSetData = {
                        totalprice:setSalesReferences.totalPrice,
                        setimage: (!!setSalesReferences.image) ? setSalesReferences.image.length != 0 ?setSalesReferences.image[0].original : null : null,
                        products:productdata
                    }
                    productResult.setReferenceData = responseSetData;
                }
                let movement = movements.hits.hits.map((element) => element._source);
                // console.log(movement);
                movement = movement.filter((item) => {
                    return item.physicalInvent != 1;
                })
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
                console.log(err);
                return reply(Boom.badImplementation(err));
            });

        } catch (err) {
            elastic.close();
            return reply(Boom.badImplementation(err));
        }
    }
};

const compareBy = (property, order = 'asc') => (a, b) => {
    if(!a.hasOwnProperty(property) || !b.hasOwnProperty(property)) {
        return 0;
    }
    let priceA = 0;
    let priceB = 0;
    const first = (property.toLowerCase().indexOf('price') != -1 || property.toLowerCase().indexOf('netamount') != -1)
                    ? a[property] != undefined
                        ? a[property] != undefined ? a[property]: 0
                        : 0
                    : a[property]
    const second = (property.toLowerCase().indexOf('price') != -1 || property.toLowerCase().indexOf('netamount') != -1)
                    ? b[property] != undefined
                        ? b[property] != undefined ? b[property] : 0
                        : 0
                    : b[property]
    if (typeof first !== typeof second) {
        return 0
    }

    let comparison = 0
    if (first > second) {
        comparison = 1
    }

    if (first < second) {
        comparison = -1
    }

    return (order === 'desc')? (comparison * -1) : comparison
}
