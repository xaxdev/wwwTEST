import GetHierarchyCode from './get_hierarchy_code';
import GetLotNumber from './get_lotnumber';
import GetCodeNotUseHierarchy from './get_code_notusehierarchy';
import ProductGroup from '../../../utils/userproductgroup';

export default function GetFilterSearch(that, data, userLogin, filters, jlyHierarchy, watHierarchy, stoHierarchy,
                            accHierarchy, obaHierarchy, sppHierarchy){
    let { paramsSearch, activeTabCategory, isAdvance } = that.props;

    const notUseHierarchy = JSON.parse(userLogin.permission.notUseHierarchy);

    // set default location & warehouse
    let keyscat = Object.keys(data);
    let i=0;
    // find criterias
    keyscat.forEach((keycat) => {

      const valueKeys = data[keycat];
      if(valueKeys != '' && valueKeys != undefined){
        i++;
      }
      if(keycat == 'location'){
        if(that.props.searchResult.LocationValue != 0){
          // using from selected location
          data.location = that.props.searchResult.LocationValue;
        }else{
          //  using location permission user
          if(userLogin.permission.onhandLocation != undefined){
            data.location = userLogin.permission.onhandLocation.places.join(',');
          }else{
            data.location = [];
          }
        }
      }else if(keycat == 'warehouse'){
        if(that.props.searchResult.WarehouseValue != 0){
          // using from selected location
          data.warehouse = that.props.searchResult.WarehouseValue;
        }else{
          //  using location permission user
          if(userLogin.permission.onhandWarehouse != undefined){
            data.warehouse = userLogin.permission.onhandWarehouse.places.join(',');
          }else{
            data.warehouse = [];
          }
        }
      }
    });

    (async () => {
        if(filters.length != 0){
            that.props.setParams(paramsSearch)
            sessionStorage.setItem('paramsSearch', JSON.stringify(paramsSearch));
            filters.splice(0, filters.length);
        }else{
            // if not have filters is mean new search
            // set params by new criterias
            that.props.setParams(data);
            sessionStorage.setItem('paramsSearch', JSON.stringify(data));
        }
    })()
    // let keyscat = Object.keys(data);
    keyscat.forEach((keycat) => {

      const valueKeys = (paramsSearch != null) ? paramsSearch[keycat] : data[keycat];

      if(valueKeys != '' && valueKeys != undefined){
        let propname = {};
        switch(keycat){
          case 'stoneProductHierarchy':
            propname = {...GetHierarchyCode(valueKeys)};
            stoHierarchy = true;
            break;
          case 'jewelryProductHierarchy':
            propname = {...GetHierarchyCode(valueKeys)};
            jlyHierarchy = true;
            break;
          case 'watchProductHierarchy':
            propname = {...GetHierarchyCode(valueKeys)};
            watHierarchy = true;
            break;
          case 'accessoryProductHierarchy':
            propname = {...GetHierarchyCode(valueKeys)};
            accHierarchy = true;
            break;
          case 'obaProductHierarchy':
            propname = {...GetHierarchyCode(valueKeys)};
            obaHierarchy = true;
            break;
          case 'sparePartProductHierarchy':
            propname = {...GetHierarchyCode(valueKeys)};
            sppHierarchy = true;
            break;
          case 'color':
              propname = {...GetLotNumber(valueKeys, keycat)};
              break;
          case 'cut':
              propname = {...GetLotNumber(valueKeys, keycat)};
              break;
          case 'clarity':
              propname = {...GetLotNumber(valueKeys, keycat)};
              break;
          case 'lotNumber':
              propname = {...GetLotNumber(valueKeys, keycat)};
              break;
          case 'lotQuantityFrom':
              propname = {...GetLotNumber(valueKeys, keycat)};
              break;
          case 'lotQuantityTo':
              propname = {...GetLotNumber(valueKeys, keycat)};
              break;
          case 'totalCaratWeightFrom':
              propname = {...GetLotNumber(valueKeys, keycat)};
              break;
          case 'totalCaratWeightTo':
              propname = {...GetLotNumber(valueKeys, keycat)};
              break;
          default:

            if(keycat.indexOf('gemstone_') != -1){
              propname['gemstones.'+keycat.replace('gemstone_', '')]= valueKeys;
            }else{
              propname[keycat]= valueKeys;
            }
            break;
        }
        filters.push(propname);
      }
    });
    if(isAdvance){
        let code = '';
      switch(activeTabCategory){
        case 1:
          filters.push({'type':'JLY'});
          if(GetCodeNotUseHierarchy(notUseHierarchy, 'JLY')!='')
            filters.push({'notUseHierarchy': GetCodeNotUseHierarchy(notUseHierarchy, 'JLY')});
          break;
        case 2:
          filters.push({'type':'WAT'});
          if(GetCodeNotUseHierarchy(notUseHierarchy, 'WAT')!='')
            filters.push({'notUseHierarchy': GetCodeNotUseHierarchy(notUseHierarchy, 'WAT')});
          break;
        case 3:
          filters.push({'type':'STO'});
          if(GetCodeNotUseHierarchy(notUseHierarchy, 'STO')!='')
            filters.push({'notUseHierarchy': GetCodeNotUseHierarchy(notUseHierarchy, 'STO')});
          break;
        case 4:
          filters.push({'type':'ACC'});
          if(GetCodeNotUseHierarchy(notUseHierarchy, 'ACC')!='')
            filters.push({'notUseHierarchy': GetCodeNotUseHierarchy(notUseHierarchy, 'ACC')});
          break;
        case 5:
          filters.push({'type':'OBA'});
          if(GetCodeNotUseHierarchy(notUseHierarchy, 'OBA')!='')
            filters.push({'notUseHierarchy': GetCodeNotUseHierarchy(notUseHierarchy, 'OBA')});
          break;
        case 6:
          filters.push({'type':'SPA'});
          if(GetCodeNotUseHierarchy(notUseHierarchy, 'SPP')!='')
            filters.push({'notUseHierarchy': GetCodeNotUseHierarchy(notUseHierarchy, 'SPP')});
          break;
        default:
          break;
      }
    }else{
      let productArray = [];
      const productGroup = ProductGroup(userLogin);
      if(productGroup.productGroupJLY){
        productArray.push('JLY');
      }
      if(productGroup.productGroupWAT){
        productArray.push('WAT');
      }
      if(productGroup.productGroupSTO){
        productArray.push('STO');
      }
      if(productGroup.productGroupACC){
        productArray.push('ACC');
      }
      if(productGroup.productGroupOBA){
        productArray.push('OBA');
      }
      if(productGroup.productGroupSPA){
        productArray.push('SPA');
      }
      productArray.push('CER');
      // console.log('productGroup-->',productArray.join(' '));
      filters.push({'type':productArray.join(' ')});
    }

    filters.push({'userCurrency':userLogin.currency});
    // console.log(filters.find((item) => {return item.location != undefined}));
    const findLocation = filters.find((item) => {return item.location != undefined});
    const findWareHouse = filters.find((item) => {return item.warehouse != undefined});

    if (!findLocation) {
        if (userLogin.permission.onhandLocation.places.length != 0) {
            filters.push({'location':userLogin.permission.onhandLocation.places});
        }
    }

    if (!findWareHouse) {
        if (userLogin.permission.onhandWarehouse.places.length != 0) {
            filters.push({'warehouse':userLogin.permission.onhandWarehouse.places});
        }
    }
    return filters;
}
