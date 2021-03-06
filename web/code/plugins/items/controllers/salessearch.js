const Boom = require('boom');
const Promise = require('bluebird');
const GetSalesSearch = require('../utils/getSalesSearch');
const getAllSalesData = require('../utils/getAllSalesData');
const getSalesSetReference = require('../utils/getSalesSetReference');
const saveSalesSetReferenceData =  require('../utils/saveSalesSetReferenceData');
const FilterSalesSetReference =  require('../utils/filterSalesSetReference');

const internals = {
    filters: []
};

module.exports = {
    auth: {
        strategy: 'authentication'
    },
    handler: (request, reply) => {
        const elastic = request.server.plugins.elastic.client;

        let obj = request.payload;
        let page = request.payload.page;
        let sortBy = request.payload.sortBy;
        let sortDirections = request.payload.sortDirections;
        let userCurrency = 'USD';
        let keys = Object.keys(obj);
        let size = request.payload.pageSize;
        let itemsOrder = request.payload.ItemsSalesOrder;
        let setReferencdOrder = request.payload.SetReferenceSalesOrder;
        let isSetReference = !!request.payload.setReference? true: false;
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
                    internals.query = GetSalesSearch(request, 0, 100000,clar);
                    ps.push(getClarityItems(internals.query));
                })
            }else{
                internals.query = GetSalesSearch(request, 0, 100000,null);
                // console.log(JSON.stringify(internals.query, null, 2));
                ps.push(getClarityItems(internals.query));
            }
        }else{
            internals.query = GetSalesSearch(request, 0, 100000,null);
            // console.log(JSON.stringify(internals.query, null, 2));
            ps.push(getClarityItems(internals.query));
        }

        // console.log(JSON.stringify(internals.query, null, 2));

        try {
            Promise.all(ps).then(async (allItems) => {
                let data = [];
                await allItems.map((all) => {
                    data.push(...all.hits.hits.map((element) => element._source))
                })

                let isViewAsSet = !!keys.find((key) => {return key == 'viewAsSet'});

                elastic.close();

                if (isViewAsSet) {
                    data = data.sort(compareBy('setReference','asc'));
                    let setSalesReferences = await FilterSalesSetReference(await getSalesSetReference(data), keys, obj)
                    setSalesReferences = setSalesReferences.sort(compareBy(sortBy,sortDirections));
                    await saveSalesSetReferenceData(request,setSalesReferences);
                    return reply(getAllSalesData(setSalesReferences, sortDirections, sortBy, size, page, userCurrency, keys, obj, request, itemsOrder,
                        setReferencdOrder,isSetReference
                    ));
                }else {
                    return reply(getAllSalesData(data, sortDirections, sortBy, size, page, userCurrency, keys, obj, request, itemsOrder, setReferencdOrder,
                        isSetReference
                    ));
                }

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
