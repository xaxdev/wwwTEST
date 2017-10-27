export default function GetGemstoneLotnumberFilter(filters, params){
    let gemstoneFilter = {};
    let lotNumberFilter = {};
    const obj = {};
    const userLogin = JSON.parse(sessionStorage.logindata);

    filters.forEach(function(filter){
      let keys = Object.keys(filter);
      keys.forEach((key) => {
        const value = filter[key];
        const gemstoneFields = keys[0].split('.');
        if(gemstoneFields[0] == 'gemstones'){
          gemstoneFilter[gemstoneFields[1]] = value;
        }else if(gemstoneFields[0] == 'certificatedNumber'){
          gemstoneFilter[gemstoneFields[0]] = value;
        }else if(gemstoneFields[0] == 'certificateAgency'){
          gemstoneFilter[gemstoneFields[0]] = value;
        }else if(gemstoneFields[0] == 'cerDateFrom'){
          gemstoneFilter[gemstoneFields[0]] = value;
        }else if(gemstoneFields[0] == 'lotNumbers'){
          lotNumberFilter[gemstoneFields[1]] = value;
        }
        else{
          //   console.log('gemstoneFields[0]-->',gemstoneFields[0]);
            switch (gemstoneFields[0]) {
                case 'sparePartProductHierarchy':
                    break;
                case 'obaProductHierarchy':
                    break;
                case 'accessoryProductHierarchy':
                    break;
                case 'stoneProductHierarchy':
                    break;
                case 'watchProductHierarchy':
                    break;
                case 'jewelryProductHierarchy':
                    break;
                default:
                    if (key == 'userCurrency') {
                        if (value != userLogin.currency) {
                            params[key] = userLogin.currency;
                        }else{
                            params[key] = value;
                        }
                    }else{
                        params[key] = value;
                    }
                    break;
            }
        }
      });
    });

    if(Object.keys(gemstoneFilter).length != 0){
      params['gemstones'] = gemstoneFilter;
    }
    if(Object.keys(lotNumberFilter).length != 0){
      params['lotNumbers'] = lotNumberFilter;
    }

    return params;
}
