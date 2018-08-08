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
            try {
                const db = request.mongo.db

                let productdata = [];
                const setReference = request.params.setReference.replace('-','/');
                let [productResult]  = await db.collection('SetReferenceSearch').find({ "userId": request.auth.credentials.id, "reference": setReference  }).toArray()
                const netamount = productResult.totalNetAmount;
                delete productResult.totalNetAmount
                productResult = {...productResult,'totalNetAmount':{'USD':netamount}}

                if (!productResult.image) {
                    productResult.gallery = [];
                }else{
                    productResult.gallery = [...productResult.image];
                }
                if (!!productResult.items) {
                    let images = {};
                    images = productResult.items.map((item) => {
                        let { original, thumbnail } = item.image;
                        return {...images, original, thumbnail};
                    });
                    productResult.gallery.push(...images);

                    let len = productResult.items.length;
                    let productdata = {};

                    productdata = productResult.items.map((item) => {
                        let { id, image } = item;
                        return {...productdata, id, image};
                    });

                    const responseSetData = {
                        totalprice: productResult.totalPrice,
                        setimage: (!!productResult.image)? productResult.image.original: null,
                        products: productdata
                    }
                    productResult.setReferenceData = responseSetData;
                }
                return reply(JSON.stringify(productResult, null, 4));
            } catch (err) {
                console.log(err);
                reply(Boom.badImplementation('', err))
            }
        })()
    }
};
