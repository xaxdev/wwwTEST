const GetGemMatchSearch = require('./getGemMatchSearch');

module.exports = (key, obj, userCurrency, cb) => {
    const valusObj = obj[key];
    const gemstoneFields = Object.keys(valusObj);
    let gemstoneFilterSplit = [];
    let gemstoneFilter = '';
    let objRangeGemstone={length:0};
    let valFromCerDate = 0;
    let valToCerDate = 0;
    let valCaratWeightFrom = 0;
    let valCaratWeightTo = 0;
    let valStoneFromCost = 0;
    let valStoneToCost = 0;
    let valQuantityFrom = 0;
    let valQuantityTo = 0;

    gemstoneFields.forEach((key)=>{
        const fieldValus = valusObj[key];

        if(key == 'stoneType'){
            gemstoneFilterSplit.push(JSON.parse(GetGemMatchSearch('stoneTypeId',fieldValus)));
        }
        if(key == 'certificatedNumber'){
            gemstoneFilterSplit.push(JSON.parse(GetGemMatchSearch('certificate.number',fieldValus)));
        }
        if(key == 'certificateAgency'){
            gemstoneFilterSplit.push(JSON.parse(GetGemMatchSearch('certificate.agency',fieldValus)));
        }
        if(key == 'cut'){
            gemstoneFilterSplit.push(JSON.parse(GetGemMatchSearch('cut',fieldValus)));
        }
        if(key == 'color'){
            gemstoneFilterSplit.push(JSON.parse(GetGemMatchSearch('color',fieldValus)));
        }
        if(key == 'clarity'){
            gemstoneFilterSplit.push(JSON.parse(GetGemMatchSearch('clarity',fieldValus)));
        }
        if(key == 'origin'){
            gemstoneFilterSplit.push(JSON.parse(GetGemMatchSearch('origin',fieldValus)));
        }
        if(key == 'symmetry'){
            gemstoneFilterSplit.push(JSON.parse(GetGemMatchSearch('symmetry',fieldValus)));
        }
        if(key == 'totalCaratWeightFrom' || key == 'totalCaratWeightTo'){
            if(key == 'totalCaratWeightFrom'){
                valCaratWeightFrom = fieldValus;
            }
            if(key == 'totalCaratWeightTo'){
                valCaratWeightTo = fieldValus;
            }
            var objLength = objRangeGemstone.length +1;
            objRangeGemstone = {...objRangeGemstone,'gemstones.carat':{'from':valCaratWeightFrom,'to':valCaratWeightTo},'length':objLength};
        }
        if(key == 'quantityFrom' || key == 'quantityTo'){
            if(key == 'quantityFrom'){
                valQuantityFrom = fieldValus;
            }
            if(key == 'quantityTo'){
                valQuantityTo = fieldValus;
            }
            var objLength = objRangeGemstone.length +1;
            objRangeGemstone = {...objRangeGemstone,'gemstones.quantity':{'from':valQuantityFrom,'to':valQuantityTo},'length':objLength};
        }
        if(key == 'cerDateFrom' || key == 'cerDateTo'){
            if(key == 'cerDateFrom'){
                // MM-dd-YYYY to YYYY-MM-dd
                var d = fieldValus.split('-');
                valFromCerDate = `${d[2]}-${d[0]}-${d[1]}`;
            }
            if(key == 'cerDateTo'){
                // MM-dd-YYYY to YYYY-MM-dd
                var d = fieldValus.split('-');
                valToCerDate= `${d[2]}-${d[0]}-${d[1]}`;
            }
            var objLength = objRangeGemstone.length +1;
            objRangeGemstone = {...objRangeGemstone,'gemstones.certificate.issuedDate':{'from':valFromCerDate,'to':valToCerDate},'length':objLength};
        }
        if(key == 'stoneCostFrom' || key == 'stoneCostTo'){
            if(key == 'stoneCostFrom'){
                valStoneFromCost = fieldValus;
            }
            if(key == 'stoneCostTo'){
                valStoneToCost = fieldValus;
            }
            var objLength = objRangeGemstone.length +1;
            switch(userCurrency){
                case 'AED':
                    objRangeGemstone = {...objRangeGemstone,'gemstones.cost.AED':{'from':valStoneFromCost,'to':valStoneToCost},'length':objLength};
                    break;
                case 'CHF':
                    objRangeGemstone = {...objRangeGemstone,'gemstones.cost.CHF':{'from':valStoneFromCost,'to':valStoneToCost},'length':objLength};
                    break;
                case 'EUR':
                    objRangeGemstone = {...objRangeGemstone,'gemstones.cost.EUR':{'from':valStoneFromCost,'to':valStoneToCost},'length':objLength};
                    break;
                case 'JOD':
                    objRangeGemstone = {...objRangeGemstone,'gemstones.cost.JOD':{'from':valStoneFromCost,'to':valStoneToCost},'length':objLength};
                    break;
                case 'KWD':
                    objRangeGemstone = {...objRangeGemstone,'gemstones.cost.KWD':{'from':valStoneFromCost,'to':valStoneToCost},'length':objLength};
                    break;
                case 'LBP':
                    objRangeGemstone = {...objRangeGemstone,'gemstones.cost.LBP':{'from':valStoneFromCost,'to':valStoneToCost},'length':objLength};
                    break;
                case 'OMR':
                    objRangeGemstone = {...objRangeGemstone,'gemstones.cost.OMR':{'from':valStoneFromCost,'to':valStoneToCost},'length':objLength};
                    break;
                case 'QAR':
                    objRangeGemstone = {...objRangeGemstone,'gemstones.cost.QAR':{'from':valStoneFromCost,'to':valStoneToCost},'length':objLength};
                    break;
                case 'SAR':
                    objRangeGemstone = {...objRangeGemstone,'gemstones.cost.SAR':{'from':valStoneFromCost,'to':valStoneToCost},'length':objLength};
                    break;
                default:
                    objRangeGemstone = {...objRangeGemstone,'gemstones.cost.USD':{'from':valStoneFromCost,'to':valStoneToCost},'length':objLength};
                    break;
            }
        }
    });
    if(objRangeGemstone.length != 0){
        var keysObjRangeGemstone = Object.keys(objRangeGemstone);
        keysObjRangeGemstone.forEach((key) => {
            if(key != 'length'){
                if(objRangeGemstone[key].to != 0){
                    gemstoneFilter =
                    `{
                        "range": {
                            "${key}": {
                                "gte": "${objRangeGemstone[key].from}",
                                "lte": "${objRangeGemstone[key].to}"
                            }
                        }
                    }`;
                }else{
                    gemstoneFilter =
                    `{
                        "range": {
                            "${key}": {
                                "gte": "${objRangeGemstone[key].from}"
                            }
                        }
                    }`;
                }
                gemstoneFilterSplit.push(JSON.parse(gemstoneFilter));
                gemstoneFilter = '';
            }
        });
    }
    let filter =
    `{
        "nested": {
            "path": "gemstones",
            "query": {
                "bool": {
                    "must": ${JSON.stringify(gemstoneFilterSplit)}
                }
            }
        }
    }`;
    return filter;
}
