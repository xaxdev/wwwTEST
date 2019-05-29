module.exports = async (data, params, elastic, cb) => {
    let { sortBy, sortDirections, keys, obj} = params
    try {
        const setReferenceResult = data;
        const setReferenceFilter = setReferenceResult.filter((item) => {
            return item.setReference != undefined && item.setReference != '';
        })
        const setReferenceArray = setReferenceFilter.map((item) => {
            return item.setReference;
        })
        const setReferenceUniq = setReferenceArray.sort().filter(function(item, pos, ary) {
            return !pos || item != ary[pos - 1];
        })
        let objRange = { length: 0 }

        let isViewAsSet = !!keys.find((key) => {return key == 'viewAsSet'});
        let valFromPPP = 0
        let valToPPP = 0
        let valFromUpdatedCost = 0
        let valToUpdatedCost = 0
        let valFromCost = 0
        let valToCost = 0
        let filter = ''
        let filters = []
        filter = 
        `{
            "match": {
                "reference": "${setReferenceUniq.join(' ')}"
            }
        }`
        filters.push(JSON.parse(filter))
        filter = ''

        if (isViewAsSet) {
            keys.forEach((key) => {
                let value = obj[key];
                if(key == 'publicPriceFrom' || key == 'publicPriceTo'){
                    if(key == 'publicPriceFrom'){
                        valFromPPP = value;
                    }
                    if(key == 'publicPriceTo'){
                        valToPPP = value;
                    }
                    let objLength = objRange.length + 1
                    objRange = {...objRange,'totalPrice.USD':{'from':valFromPPP,'to':valToPPP},'length':objLength};
                } else if(key == 'totalUpdatedCostFrom' || key == 'totalUpdatedCostTo'){
                    if(key == 'totalUpdatedCostFrom'){
                        valFromUpdatedCost = value;
                    }
                    if(key == 'totalUpdatedCostTo'){
                        valToUpdatedCost = value;
                    }
                    let objLength = objRange.length + 1
                    objRange = {...objRange,'totalUpdatedCost.USD':{'from':valFromUpdatedCost,'to':valToUpdatedCost},'length':objLength};
                } else if(key == 'totalCostFrom' || key == 'totalCostTo'){
                    if(key == 'totalCostFrom'){
                        valFromCost = value;
                    }
                    if(key == 'totalCostTo'){
                        valToCost = value;
                    }
                    let objLength = objRange.length +1;
                    objRange = {...objRange,'totalActualCost.USD':{'from':valFromCost,'to':valToCost},'length':objLength};
                }
            })

            if(objRange.length != 0){
                // console.log(JSON.stringify(objRange, null, 2));
                let keysObjRange = Object.keys(objRange)
                keysObjRange.forEach((key) => {
                    if(key != 'length'){
                        if(objRange[key].to != 0 ){
                            filter =
                            `{
                                "range": {
                                    "${key}": {
                                        "gte": "${objRange[key].from}",
                                        "lte": "${objRange[key].to}"
                                    }
                                }
                            }`;
                        }else{
                            filter =
                            `{
                                "range": {
                                    "${key}": {
                                        "gte": "${objRange[key].from}"
                                    }
                                }
                            }`;
                        }
                        filters.push(JSON.parse(filter))
                        filter = '';
                    }
                })
            }
        }

        if (sortBy.indexOf('price') != -1) {
            sortBy = 'totalPrice.USD';
        }else if (sortBy.indexOf('Date') != -1) {
            sortBy = 'createdDate';
        }else if (sortBy.indexOf('setReference') != -1) {
            sortBy = 'reference';
        }else{
            sortBy = sortBy;
        }

        let missing = '';

        switch (sortDirections) {
            case 'asc':
                missing = '"missing" : "_first"';
                missing = `{"${sortBy}" : {${missing}}},`;
                break;
            default:
                break;
        }

        const query = JSON.parse(
            `{
                "timeout": "5s",
                "from": 0,
                "size": 10000,
                "sort" : [
                    ${missing}
                    {"${sortBy}" : "${sortDirections}"}
                ],
                "query":{
                    "constant_score": {
                        "filter": {
                            "bool": {
                                "must": ${JSON.stringify(filters)}
                            }
                        }
                    }
                }
            }`
        )

        // console.log(JSON.stringify(query, null, 2));

        const getData = async (query) => {
            return elastic.search({
                index: 'mol',
                type: 'setitems',
                body: query
            })
        }
        const result = await getData(query)
        
        return result
           
    } catch (error) {
        console.log(error);
        throw error
    }
}