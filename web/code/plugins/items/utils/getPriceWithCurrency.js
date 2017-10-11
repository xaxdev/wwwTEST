import numberFormat from './convertNumberformat';

export default (item, type,currency)=> {

  switch(type){
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
