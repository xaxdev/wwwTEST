import numberFormat from './convertNumberformat';
import GetPriceWithCurrency from './getPriceWithCurrency';
import numberFormat2digit from './convertNumberformatwithcomma2digit';
import GetItemEqualOne from './getItemEqualOne';
import GetItemNotEqualOne from './getItemNotEqualOne';
import GetItemNotEqualElse from './getItemNotEqualElse';

export default function GetListViewAsSetItem(item,currency,isViewAsSet,env,userPermissionPrice){
    let row = item.items != undefined
                   ? item.items.length +1
                   : 0;

    let htmlViewAsSetAll = '';
    if (item.items != undefined && item.items.length == 1) {
        htmlViewAsSetAll = GetItemEqualOne(item,currency,isViewAsSet,env,userPermissionPrice);
    }else if(item.items != undefined && item.items.length != 1){
        htmlViewAsSetAll = GetItemNotEqualOne(item,currency,isViewAsSet,env,row,userPermissionPrice);
    }else{
        htmlViewAsSetAll = GetItemNotEqualElse(item,currency,isViewAsSet,env,row,userPermissionPrice);
    }

    return htmlViewAsSetAll;
}
