import numberFormat from './convertNumberformat';

export default (item, type)=> {
  const userLogin = JSON.parse(sessionStorage.logindata);
  const currency = userLogin.currency;

  switch(type){
    case 'actualCost':
      if(item.actualCost != undefined){
        return (item.actualCost[currency] != undefined) ?
               numberFormat(item.actualCost[currency]) + ' ' + currency :
               '0 ' + currency;
      }else{
        return '0 ' + currency;
      }
      break;
    case 'updatedCost':
      if(item.updatedCost != undefined){
        return (item.updatedCost[currency] != undefined) ?
               numberFormat(item.updatedCost[currency]) + ' ' + currency :
               '0 ' + currency;
      }else{
        return '0 ' + currency;
      }
      break;
    default :
      if(item.price != undefined){
        return (item.price[currency] != undefined) ?
               numberFormat(item.price[currency]) + ' ' + currency :
               '0 ' + currency;
      }else{
        return '0 ' + currency;
      }
      break;
  }
}
