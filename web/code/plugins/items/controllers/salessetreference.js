import Joi from 'joi'
import Boom from 'boom'

module.exports = {
    auth: {
        strategy: 'authentication'
    },
    validate: {
        query: {
            page: Joi.number().integer().positive(),
            size: Joi.number().integer().positive(),
            sort: Joi.number().integer().positive(),
            order: Joi.number().valid(1, -1)
        }
    },
    handler: (request, reply) => {
        (async () => {
            try {
                const userHelper = request.user
                const helper = request.helper
                const db = request.mongo.db
                const ObjectID = request.mongo.ObjectID
                const catalogId = request.params.id || ""
                const itemRef = request.params.reference || ""
                const qPage = request.payload.page || request.pagination.page
                const qSize = request.payload.pageSize || request.pagination.size
                const page = parseInt(qPage)
                const size = parseInt(qSize)
                const sort = request.payload.sortBy
                const order = request.payload.sortDirections == 'desc' ? -1 : 1
                const sorting = { [sort]: order }
                let allData = [];

                let setReferences = await db.collection('SetReferenceSearch').find({"userId": request.auth.credentials.id})
                .sort(sorting).limit(size).skip((page - 1) * size).toArray()
                let exportData = await db.collection('SetReferenceSearch').find({"userId": request.auth.credentials.id}).sort(sorting).toArray()
                exportData = exportData.map(function(item){
                    const netamount = item.totalNetAmount;
                    delete item.totalNetAmount
                    return {...item,'totalNetAmount':{'USD':netamount}}
                })

                if (!!setReferences.length) {
                    let sumPrice = 0;
                    let sumCost = 0;
                    let sumNetAmount = 0;
                    let sumDisconst = 0;
                    let sumMargin = 0;
                    let sumDisconstPercent = 0;
                    let sumMarginPercent = 0;
                    let avrgPrice = 0;
                    let sumPriceData = [];
                    let sumCostData = [];
                    let sumNetAmountData = [];
                    let sumDisconstData = [];
                    let sumMarginData = [];
                    let itemCount = exportData.length;
                    let maxPrice = 0;
                    let minPrice = 0;


                    exportData.forEach(function(item){
                        allData.push({
                            'id': item.id, 'reference':item.reference, 'postedDate':item.postedDate, 'totalPrice':item.totalPrice, 'description':item.description,
                            'setReference':item.reference, 'totalNetAmount':item.totalNetAmount, 'totalNetAmount':item.totalNetAmount
                        });
                        if(item.totalNetAmount['USD'] != undefined){
                            if(item.totalNetAmount['USD'] != 0){
                              maxPrice = Math.max(maxPrice, item.totalNetAmount['USD']);
                            }else{
                              maxPrice = Math.max(maxPrice, 0);
                            }
                        }else{
                            item.totalNetAmount['USD'] = 0;
                            maxPrice = Math.max(maxPrice, 0);
                        }
                        minPrice = maxPrice;
                        if(item.totalNetAmount['USD'] != undefined){
                            minPrice = Math.min(minPrice, item.totalNetAmount['USD']);
                        }else{
                            minPrice = Math.min(minPrice, 0);
                        }
                        sumPriceData.push(item.totalPrice!=undefined? item.totalPrice['USD']!=undefined? item.totalPrice['USD']: 0: 0);
                        sumPriceData.forEach(function(price) {
                            sumPrice = sumPrice+Math.round(price);
                        });
                        avrgPrice = sumPrice/itemCount;
                        sumCostData.push(item.totalUpdatedCost!=undefined? item.totalUpdatedCost['USD']!=undefined? item.totalUpdatedCost['USD']: 0: 0);
                        sumCostData.forEach(function(cost) {
                            sumCost = sumCost+Math.round(cost);
                        });
                        sumNetAmountData.push(item.totalNetAmount!=undefined? item.totalNetAmount['USD']!=undefined? item.totalNetAmount['USD']: 0: 0);
                        sumNetAmountData.forEach(function(price) {
                            sumNetAmount = sumNetAmount+Math.round(price);
                        });
                        sumDisconstData.push(item.totalDiscountAmount!=undefined? item.totalDiscountAmount['USD']!=undefined? item.totalDiscountAmount['USD']: 0: 0);
                        sumDisconstData.forEach(function(price) {
                            sumDisconst = sumDisconst+Math.round(price);
                        });
                        sumDisconstPercent = (sumDisconst/sumPrice)*100;
                        sumMarginData.push(item.totalMargin != undefined? item.totalMargin['USD']!=undefined? item.totalMargin['USD']: 0: 0);
                        sumMarginData.forEach(function(price) {
                            sumMargin = sumMargin+Math.round(price);
                        });
                        sumMarginPercent = (sumMargin/sumNetAmount)*100;
                    })
                    setReferences = setReferences.map(function(item){
                        const netamount = item.totalNetAmount;
                        delete item.totalNetAmount
                        return {...item,'totalNetAmount':{'USD':netamount}}
                    })

                    const sendData = {
                        'data':setReferences,
                        'allData':allData,
                        'exportData': exportData,
                        'pageSize': size,
                        'summary':{
                            'count': allData.length,
                            'price': sumPrice,
                            'cost': sumCost,
                            'maxPrice': maxPrice,
                            'minPrice': minPrice,
                            'avrgPrice': avrgPrice,
                            'netAmount': sumNetAmount,
                            'disconst': sumDisconst,
                            'margin': sumMargin,
                            'sumDisconstPercent': sumDisconstPercent,
                            'sumMarginPercent': sumMarginPercent
                        }
                    };

                    return reply(sendData)
                } else {
                    return reply('')
                }
            } catch (e) {
                reply(Boom.badImplementation('', e))
            }
        })();
    }
}
