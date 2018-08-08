import GetSalesHierarchyCode from './get_sales_hierarchy_code';
import GetLotNumber from './get_lotnumber';
import GetCodeNotUseSalesHierarchy from './get_code_notusesaleshierarchy';
import ProductGroupSales from '../../../utils/userproductgroupsales';

export default function GetFilterSearch(that, data, userLogin, filters, jlySalesHierarchy, watSalesHierarchy, stoSalesHierarchy,
    accSalesHierarchy, obaSalesHierarchy, sppSalesHierarchy){

    let { paramsSalesSearch, activeTabSalesCategory, salesIsAdvance } = that.props;

    const notUseSalesHierarchy = JSON.parse(userLogin.permission.notUseSalesHierarchy);

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
                if(userLogin.permission.salesLocation != undefined){
                    data.location = userLogin.permission.salesLocation.places.join(',');
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
                if(userLogin.permission.salesWarehouse != undefined){
                    data.warehouse = userLogin.permission.salesWarehouse.places.join(',');
                }else{
                    data.warehouse = [];
                }
            }
        }
    });

    (async () => {
        if(filters.length != 0){
            that.props.setSalesParams(paramsSalesSearch)
            sessionStorage.setItem('paramsSalesSearch', JSON.stringify(paramsSalesSearch));
            filters.splice(0, filters.length);
        }else{
            // if not have filters is mean new search
            // set params by new criterias
            that.props.setSalesParams(data);
            sessionStorage.setItem('paramsSalesSearch', JSON.stringify(data));
        }
    })()
    // let keyscat = Object.keys(data);
    keyscat.forEach((keycat) => {
        const valueKeys = (paramsSalesSearch != null) ? paramsSalesSearch[keycat] : data[keycat];

        if(valueKeys != '' && valueKeys != undefined){
            let propname = {};
            switch(keycat){
                case 'watchProductSalesHierarchy':
                    propname = {...GetSalesHierarchyCode(valueKeys)};
                    watSalesHierarchy = true;
                    break;
                case 'jewelryProductSalesHierarchy':
                    propname = {...GetSalesHierarchyCode(valueKeys)};
                    jlySalesHierarchy = true;
                    break;
                case 'stoneProductSalesHierarchy':
                    propname = {...GetSalesHierarchyCode(valueKeys)};
                    stoSalesHierarchy = true;
                    break;
                case 'accessoryProductSalesHierarchy':
                    propname = {...GetSalesHierarchyCode(valueKeys)};
                    accSalesHierarchy = true;
                    break;
                case 'obaProductSalesHierarchy':
                    propname = {...GetSalesHierarchyCode(valueKeys)};
                    obaSalesHierarchy = true;
                    break;
                case 'sparePartProductSalesHierarchy':
                    propname = {...GetSalesHierarchyCode(valueKeys)};
                    sppSalesHierarchy = true;
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

    if(salesIsAdvance){
        let code = '';
        switch(activeTabSalesCategory){
            case 1:
                filters.push({'type':'JLY'});
                if(GetCodeNotUseSalesHierarchy(notUseSalesHierarchy, 'JLY')!='')
                    filters.push({'notUseSalesHierarchy': GetCodeNotUseSalesHierarchy(notUseSalesHierarchy, 'JLY')});
                break;
            case 2:
                filters.push({'type':'WAT'});
                if(GetCodeNotUseSalesHierarchy(notUseSalesHierarchy, 'WAT')!='')
                    filters.push({'notUseSalesHierarchy': GetCodeNotUseSalesHierarchy(notUseSalesHierarchy, 'WAT')});
                break;
            case 3:
                filters.push({'type':'STO'});
                if(GetCodeNotUseSalesHierarchy(notUseSalesHierarchy, 'STO')!='')
                    filters.push({'notUseSalesHierarchy': GetCodeNotUseSalesHierarchy(notUseSalesHierarchy, 'STO')});
                break;
            case 4:
                filters.push({'type':'ACC'});
                if(GetCodeNotUseSalesHierarchy(notUseSalesHierarchy, 'ACC')!='')
                    filters.push({'notUseSalesHierarchy': GetCodeNotUseSalesHierarchy(notUseSalesHierarchy, 'ACC')});
                break;
            case 5:
                filters.push({'type':'OBA'});
                if(GetCodeNotUseSalesHierarchy(notUseSalesHierarchy, 'OBA')!='')
                    filters.push({'notUseSalesHierarchy': GetCodeNotUseSalesHierarchy(notUseSalesHierarchy, 'OBA')});
                break;
            case 6:
                filters.push({'type':'SPA'});
                if(GetCodeNotUseSalesHierarchy(notUseSalesHierarchy, 'SPP')!='')
                    filters.push({'notUseSalesHierarchy': GetCodeNotUseSalesHierarchy(notUseSalesHierarchy, 'SPP')});
                break;
            default:
                break;
        }
    }else{
        let productArray = [];
        const productGroupSales = ProductGroupSales(userLogin);
        if(productGroupSales.productGroupSalesJLY){
            productArray.push('JLY');
        }
        if(productGroupSales.productGroupSalesWAT){
            productArray.push('WAT');
        }
        if(productGroupSales.productGroupSalesSTO){
            productArray.push('STO');
        }
        if(productGroupSales.productGroupSalesACC){
            productArray.push('ACC');
        }
        if(productGroupSales.productGroupSalesOBA){
            productArray.push('OBA');
        }
        if(productGroupSales.productGroupSalesSPA){
            productArray.push('SPA');
        }
        productArray.push('CER');
        filters.push({'type':productArray.join(' ')});
    }

    filters.push({'userCurrency':userLogin.currency});

    const findLocation = filters.find((item) => {return item.location != undefined});
    const findWareHouse = filters.find((item) => {return item.warehouse != undefined});
    const findSalesChannel = filters.find((item) => {return item.salesChannel != undefined});

    if (!findLocation) {
        if (userLogin.permission.salesLocation.places.length != 0) {
            filters.push({'location':userLogin.permission.salesLocation.places});
        }
    }

    if (!findWareHouse) {
        if (userLogin.permission.salesWarehouse.places.length != 0) {
            filters.push({'warehouse':userLogin.permission.salesWarehouse.places});
        }
    }

    if (!findSalesChannel) {
        if (userLogin.permission.salesChannel.places.length != 0) {
            filters.push({'salesChannel':userLogin.permission.salesChannel.places});
        }
    }
    return filters;
}
