import GetItemEqualOne from './getItemEqualOne';
import GetItemNotEqualOne from './getItemNotEqualOne';
import GetItemNotEqualElse from './getItemNotEqualElse';

export default function GetListViewAsSetItem(item, currency, isViewAsSet, env, userPermissionPrice, titleValue){
    let row = item.items != undefined
                   ? item.items.length +1
                   : 0;

    let htmlViewAsSetAll = '';
    if (item.items != undefined && item.items.length == 1) {
        htmlViewAsSetAll = GetItemEqualOne(item, currency, isViewAsSet, env, userPermissionPrice, titleValue);
    }else if(item.items != undefined && item.items.length != 1){
        htmlViewAsSetAll = GetItemNotEqualOne(item, currency, isViewAsSet, env, row, userPermissionPrice, titleValue);
    }else{
        htmlViewAsSetAll = GetItemNotEqualElse(item, currency, isViewAsSet, env, row, userPermissionPrice, titleValue);
    }

    return htmlViewAsSetAll;
}
