import GetSalesItemEqualOne from './getSalesItemEqualOne';
import GetSalesItemNotEqualOne from './getSalesItemNotEqualOne';
import GetSalesItemNotEqualElse from './getSalesItemNotEqualElse';

export default function GetListViewAsSetSalesItem(item,currency,isViewAsSet,env,userPermissionPrice){
    let row = item.items != undefined
                   ? item.items.length +1
                   : 0;

    let htmlViewAsSetAll = '';
    if (item.items != undefined && item.items.length == 1) {
        htmlViewAsSetAll = GetSalesItemEqualOne(item,currency,isViewAsSet,env,userPermissionPrice);
    }else if(item.items != undefined && item.items.length != 1){
        htmlViewAsSetAll = GetSalesItemNotEqualOne(item,currency,isViewAsSet,env,row,userPermissionPrice);
    }else{
        htmlViewAsSetAll = GetSalesItemNotEqualElse(item,currency,isViewAsSet,env,row,userPermissionPrice);
    }

    return htmlViewAsSetAll;
}
