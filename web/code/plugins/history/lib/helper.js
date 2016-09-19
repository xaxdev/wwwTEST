const Boom = require('boom');
const Promise = require('bluebird');
const _ = require('lodash');
const internals = {
    filters: []
};

export default {
    save: (request, reply, item) => {

        return (async (request, reply, item) => {

            try {
                const db = request.server.plugins['hapi-mongodb'].db

                return await db.collection('History')
                .findOneAndUpdate({ "userId": request.auth.credentials.id, "itemId": item.id } , { $set: { "displayStatus": true, "lookUpDate": _.now() }}, { returnOriginal: false, upsert: true })
                .then((value, err) => {
                    if (err) return Promise.reject(err)
                    return Promise.resolve(item)
                })
            } catch (e) {

                return Boom.badImplementation('', e)
            }
        })(request, reply, item);
    },

    getUserById: (request, reply, userId) => {

        return (async (request, reply, userId) => {

            try {
                const Users = request.collections.user
                const Permissions = request.collections.permission

                return await Users
                .findOne(userId)
                .then(async (user) => {

                    if (!user) return Boom.badRequest('User doesn\'t not found.')

                    return await Permissions
                    .findOne({ "id": user.permission })
                    .populate('onhandLocation')
                    .populate('onhandWarehouse')
                    .then((permission) => {

                        if (!permission) user.permission = {}

                        user.permission = permission.toJSON()

                        return user
                    })
                })
            } catch (e) {

                return Boom.badImplementation('', e)
            }
        })(request, reply, userId);
    },

    getItemDataById: (request, reply, itemId) => {

        const elastic = request.server.plugins.elastic.client;

        internals.query = JSON.parse(
            `{
                "query":
                {
                    "constant_score" : {
                        "query" : {
                            "bool" : {
                                "should" : [{
                                    "match" : {
                                        "id" : "5637209721"
                                    }
                                }, {
                                    "match" : {
                                        "id" : "5637234633"
                                    }
                                }, {
                                    "match" : {
                                        "id" : "5637222093"
                                    }
                                }, {
                                    "match" : {
                                        "id" : "5637870664"
                                    }
                                }, {
                                    "match" : {
                                        "id" : "5637209718"
                                    }
                                }, {
                                    "match" : {
                                        "id" : "5637230194"
                                    }
                                }, {
                                    "match" : {
                                        "id" : "5637249602"
                                    }
                                }
                            ]
                        }
                    }
                }
            }
        }`);

        const getProductDetail =  elastic
        .search({
            index: 'mol',
            type: 'items',
            body: internals.query
        });

        const getSetreference = getProductDetail.then((response) => {

            const productResult = response.hits.hits.map((element) => element._source);
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

        Promise.all([getProductDetail, getSetreference]).spread((productDetail, setReference) => {

            const productResult = productDetail.hits.hits.map((element) => element._source);
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

            // console.log(productResult);

            elastic.close();
            return JSON.stringify(productResult, null, 4);
        })
        // .catch(function(error) {
        //     elastic.close();
        //     return Boom.badImplementation(err);
        // });
    }
}
