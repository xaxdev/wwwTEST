import numberFormat from './convertNumberformat';

export default (item, type, currency)=> {
    const userLogin = JSON.parse(sessionStorage.logindata);

    switch(type){
        case 'margin':
            if(item.margin != undefined){
                return (item.margin[currency] != undefined) ?
                     numberFormat(item.margin[currency]) + ' ' + currency :
                     '- ' + currency;
            }else{
                return '- ' + currency;
            }
            break;
        case 'netAmount':
            if(item.netAmount != undefined){
                return (item.netAmount[currency] != undefined) ?
                     numberFormat(item.netAmount[currency]) + ' ' + currency :
                     '- ' + currency;
            }else{
                return '- ' + currency;
            }
            break;
        case 'discPercent':
            if(item.discPercent != undefined){
                return item.discPercent + ' %';
            }else{
                return '- %';
            }
            break;
        case 'actualCost':
            if(item.actualCost != undefined){
                return (item.actualCost[currency] != undefined) ?
                     numberFormat(item.actualCost[currency]) + ' ' + currency :
                     '- ' + currency;
            }else{
                return '- ' + currency;
            }
            break;
        case 'updatedCost':
            if(item.updatedCost != undefined){
                return (item.updatedCost[currency] != undefined) ?
                     numberFormat(item.updatedCost[currency]) + ' ' + currency :
                     '- ' + currency;
            }else{
                return '- ' + currency;
            }
            break;
        default :
            if(item.price != undefined){
                return (item.price[currency] != undefined) ?
                     numberFormat(item.price[currency]) + ' ' + currency :
                     '- ' + currency;
            }else{
                return '- ' + currency;
            }
            break;
    }
}
