export default (item, type)=> {
  const userLogin = JSON.parse(sessionStorage.logindata);

  switch(type){
    case 'actualCost':
      switch(userLogin.currency){
        case 'AED':
          return (item.actualCost.AED != undefined) ?
                 item.actualCost.AED.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') + ' AED' :
                 '0 AED';
        case 'CHF':
          return (item.actualCost.CHF != undefined) ?
                 item.actualCost.CHF.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') + ' CHF' :
                 '0 CHF';
        case 'EUR':
          return (item.actualCost.EUR != undefined) ?
                  item.actualCost.EUR.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') + ' EUR' :
                  '0 EUR';
        case 'JOD':
          return (item.actualCost.JOD != undefined) ?
               item.actualCost.JOD.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') + ' JOD' :
               '0 JOD';
        case 'KWD':
          return (item.actualCost.KWD != undefined) ?
                  item.actualCost.KWD.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') + ' KWD' :
                  '0 KWD';
        case 'LBP':
          return (item.actualCost.LBP != undefined) ?
                 item.actualCost.LBP.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') + ' LBP' :
                 '0 LBP';
        case 'OMR':
          return (item.actualCost.OMR != undefined) ?
                  item.actualCost.OMR.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') + ' OMR' :
                  '0 OMR';
        case 'QAR':
          return (item.actualCost.QAR != undefined) ?
                  item.actualCost.QAR.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') + ' QAR' :
                  '0 QAR';
        case 'SAR':
          return (item.actualCost.SAR != undefined) ?
                 item.actualCost.SAR.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') + ' SAR' :
                 '0 SAR';
        default:
          return (item.actualCost.USD != undefined) ?
                item.actualCost.USD.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') + ' USD' :
                '0 USD';
      }
      break;
    case 'updatedCost':
      switch(userLogin.currency){
        case 'AED':
          return (item.updatedCost.AED != undefined) ?
                 item.updatedCost.AED.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') + ' AED' :
                 '0 AED';
        case 'CHF':
          return (item.updatedCost.CHF != undefined) ?
                 item.updatedCost.CHF.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') + ' CHF' :
                 '0 CHF';
        case 'EUR':
          return (item.updatedCost.EUR != undefined) ?
                  item.updatedCost.EUR.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') + ' EUR' :
                  '0 EUR';
        case 'JOD':
          return (item.updatedCost.JOD != undefined) ?
               item.updatedCost.JOD.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') + ' JOD' :
               '0 JOD';
        case 'KWD':
          return (item.updatedCost.KWD != undefined) ?
                  item.updatedCost.KWD.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') + ' KWD' :
                  '0 KWD';
        case 'LBP':
          return (item.updatedCost.LBP != undefined) ?
                 item.updatedCost.LBP.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') + ' LBP' :
                 '0 LBP';
        case 'OMR':
          return (item.updatedCost.OMR != undefined) ?
                  item.updatedCost.OMR.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') + ' OMR' :
                  '0 OMR';
        case 'QAR':
          return (item.updatedCost.QAR != undefined) ?
                  item.updatedCost.QAR.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') + ' QAR' :
                  '0 QAR';
        case 'SAR':
          return (item.updatedCost.SAR != undefined) ?
                 item.updatedCost.SAR.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') + ' SAR' :
                 '0 SAR';
        default:
          return (item.updatedCost.USD != undefined) ?
                item.updatedCost.USD.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') + ' USD' :
                '0 USD';
      }
      break;
    default :
      switch(userLogin.currency){
        case 'AED':
          return (item.price.AED != undefined) ?
                 item.price.AED.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') + ' AED' :
                 '0 AED';
        case 'CHF':
          return (item.price.CHF != undefined) ?
                 item.price.CHF.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') + ' CHF' :
                 '0 CHF';
        case 'EUR':
          return (item.price.EUR != undefined) ?
                  item.price.EUR.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') + ' EUR' :
                  '0 EUR';
        case 'JOD':
          return (item.price.JOD != undefined) ?
               item.price.JOD.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') + ' JOD' :
               '0 JOD';
        case 'KWD':
          return (item.price.KWD != undefined) ?
                  item.price.KWD.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') + ' KWD' :
                  '0 KWD';
        case 'LBP':
          return (item.price.LBP != undefined) ?
                 item.price.LBP.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') + ' LBP' :
                 '0 LBP';
        case 'OMR':
          return (item.price.OMR != undefined) ?
                  item.price.OMR.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') + ' OMR' :
                  '0 OMR';
        case 'QAR':
          return (item.price.QAR != undefined) ?
                  item.price.QAR.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') + ' QAR' :
                  '0 QAR';
        case 'SAR':
          return (item.price.SAR != undefined) ?
                 item.price.SAR.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') + ' SAR' :
                 '0 SAR';
        default:
          return (item.price.USD != undefined) ?
                item.price.USD.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') + ' USD' :
                '0 USD';
      }
      break;
  }
}
