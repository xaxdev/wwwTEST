module.exports = (item, type, userCurrency, cb) => {
  switch(type){
    case 'price':
      if(item.price != undefined){
        switch(userCurrency){
          case 'AED':
            return item.price.AED != undefined ? item.price.AED : 0;
          case 'CHF':
            return item.price.CHF != undefined ? item.price.CHF : 0;
          case 'EUR':
            return item.price.EUR != undefined ? item.price.EUR : 0;
          case 'JOD':
            return item.price.JOD != undefined ? item.price.JOD : 0;
          case 'KWD':
            return item.price.KWD != undefined ? item.price.KWD : 0;
          case 'LBP':
            return item.price.LBP != undefined ? item.price.LBP : 0;
          case 'OMR':
            return item.price.OMR != undefined ? item.price.OMR : 0;
          case 'QAR':
            return item.price.QAR != undefined ? item.price.QAR : 0;
          case 'SAR':
            return item.price.SAR != undefined ? item.price.SAR : 0;
          default:
            return item.price.USD != undefined ? item.price.USD : 0;
        }
      }else{
        return 0;
      }
      break;
    case 'updatedCost':
      if(item.updatedCost != undefined){
        switch(userCurrency){
          case 'AED':
            return item.updatedCost.AED != undefined ? item.updatedCost.AED : 0;
          case 'CHF':
            return item.updatedCost.CHF != undefined ? item.updatedCost.CHF : 0;
          case 'EUR':
            return item.updatedCost.EUR != undefined ? item.updatedCost.EUR : 0;
          case 'JOD':
            return item.updatedCost.JOD != undefined ? item.updatedCost.JOD : 0;
          case 'KWD':
            return item.updatedCost.KWD != undefined ? item.updatedCost.KWD : 0;
          case 'LBP':
            return item.updatedCost.LBP != undefined ? item.updatedCost.LBP : 0;
          case 'OMR':
            return item.updatedCost.OMR != undefined ? item.updatedCost.OMR : 0;
          case 'QAR':
            return item.updatedCost.QAR != undefined ? item.updatedCost.QAR : 0;
          case 'SAR':
            return item.updatedCost.SAR != undefined ? item.updatedCost.SAR : 0;
          default:
            return item.updatedCost.USD != undefined ? item.updatedCost.USD : 0;
        }
      }else{
        return 0;
      }
      break;
  }
}
