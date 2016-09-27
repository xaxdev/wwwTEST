const Boom = require('boom');
const Promise = require('bluebird');
const _ = require('lodash');
const internals = {
    filters: []
};

module.exports = {
    auth: {
        strategy: 'authentication'
    },
    handler: async (request, reply) => {

        const elastic = request.server.plugins.elastic.client
        const reference = request.params.reference
        const historyHelper = request.history
        const userHelper = request.user
        const user = await userHelper.getUserById(request, reply, request.auth.credentials.id)

        internals.query = JSON.parse(
            `{
                "query":
                {
                    "match": {"reference": "${reference}"}
                }
            }`);

        try {

            const getProductDetail =  elastic.search({ index: 'mol', type: 'items', body: internals.query });
            const getSetreference = getProductDetail.then((response) => {

                if (response.hits.total == 0) return Promise.reject("Invalid item.")

                const [productResult] = response.hits.hits.map((element) => element._source);
                const query = JSON.parse(
                    `{
                        "query":{
                            "constant_score": {
                                "filter": {
                                    "bool": {
                                        "must": [
                                            {
                                                "match": { "reference": "${productResult.setReference}" }
                                            }
                                        ]
                                    }
                                }
                            }
                        }
                    }`);

                    return elastic.search({ index: 'mol', type: 'setitems', body: query});
                });

            Promise.all([getProductDetail, getSetreference]).spread((productDetail, setReference) => {

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
                        setimage:setReferenceData.image.original,
                        products:productdata
                    }

                    productResult.setReferenceData = responseSetData;
                }

                elastic.close();
                return productResult
            })
            .then((item) => {

                if (!_.isNull(item)) {
                    const userLocation = user.permission.onhandLocation.places
                    const userWarehouse = user.permission.onhandWarehouse.places
                    const location = userLocation.length != 0 ? userLocation.find(place => place === item.site) : true
                    const warehouse = userWarehouse.length != 0 ? userWarehouse.find(place => place === item.warehouse) : true

                    if (!(!!location && !!warehouse)) return Promise.reject("Invalid item.")

                    item.authorization = !!location && !!warehouse
                    item.availability = true
                    item.actualCost = _.hasIn(item.actualCost, user.currency) ? _.result(item.actualCost, user.currency) : -1
                    item.updatedCost = _.hasIn(item.updatedCost, user.currency) ? _.result(item.updatedCost, user.currency) : -1
                    item.price = _.hasIn(item.price, user.currency) ? _.result(item.price, user.currency) : -1

                    switch (user.permission.price.toUpperCase()) {
                        case "PUBLIC":
                            delete item.actualCost
                            delete item.updatedCost
                            break;
                        case "UPDATED":
                            delete item.actualCost
                            break;
                    }

                    return item
                }

                return Promise.reject("Invalid item.")
            })
            .then(async (item) => {

                if (!_.isNull(item)) {
                    await historyHelper.save(request, reply, item)
                    return reply(JSON.stringify(item, null, 4))
                }

                return Promise.reject("Invalid item.")
            })
            .catch(function(error) {

                reply(Boom.badRequest(error))
            })
        } catch (e) {

            reply(Boom.badImplementation(e))
        }
    }
};
