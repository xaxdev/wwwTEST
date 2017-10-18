import numberFormat from './convertNumberformat';
import GetPriceWithCurrency from './getPriceWithCurrency';
import numberFormat2digit from './convertNumberformatwithcomma2digit';

export default function GetItemEqualOne(item,currency,isViewAsSet,env,row,userPermissionPrice){
    let imgPath = env == 'production'
                            ? 'file:///var/www/mol/web/code/plugins/http/public/images/'
                            : 'file:///home/dev/www/mol/web/code/plugins/http/public/images/';

    let imagesThumbnail = (item.image) != undefined
                      ?  item.image.length != 0
                          ? item.image[0].thumbnail
                          : '/images/blank.gif'
                      : '/images/blank.gif';
    let imagesProduct = imagesThumbnail.replace(/\/images\//g,imgPath);
    let htmlViewAsSetAll = '';
    htmlViewAsSetAll =
    `<tbody>
        <tr>
            <td style="padding:5px 5px;word-break: normal;font-size: 4px; border: 1px solid #5c5954;" rowspan="${row}">
                <img src="${imagesProduct}" width="60">
            </td>
            <td style="padding:5px 5px;word-break: normal;font-size: 4px; border: 1px solid #5c5954;" rowspan="${row}">${item.reference}</td>
        </tr>
        <tr>
            <td colspan="9" style="border-left: 1px solid #fff;border-bottom: 1px solid #fff;padding:5px 5px;word-break: normal;font-size: 4px;"></td>
            <td style="font-weight: bold; font-family:'open_sanssemibold';color:#000;text-align: center;background-color: #ebd79a;padding:5px 5px;word-break: normal;font-size: 4px; border: 1px solid #5c5954;border-right: 1px solid #5c5954; border-bottom: 1px solid #5c5954;"
                >Total</td>
            <td style="${(userPermissionPrice == 'All') ?
               '' : ' hidden'} text-align:right;font-weight: bold; font-family:'open_sanssemibold';color:#000;background-color: #ebd79a;padding:5px 5px;word-break: normal;font-size: 4px;border: 1px solid #5c5954; border-right: 1px solid #5c5954; border-bottom: 1px solid #5c5954;"
                >${numberFormat(item.totalActualCost['USD'])}</td>
            <td style="${(userPermissionPrice == 'Updated'
                || userPermissionPrice == 'All') ?
                '' : ' hidden'} text-align:right;font-weight: bold; font-family:'open_sanssemibold';color:#000;background-color: #ebd79a;padding:5px 5px;word-break: normal;font-size: 4px;border: 1px solid #5c5954; border-right: 1px solid #5c5954; border-bottom: 1px solid #5c5954;"
                >${numberFormat(item.totalUpdatedCost['USD'])}</td>
            <td style="${(userPermissionPrice == 'Public'
                || userPermissionPrice == 'Updated'
                || userPermissionPrice == 'All') ?
                '' : ' hidden'} text-align:right;font-weight: bold; font-family:'open_sanssemibold';color:#000;background-color: #ebd79a;padding:5px 5px;word-break: normal;font-size: 4px;border: 1px solid #5c5954; border-right: 1px solid #5c5954; border-bottom: 1px solid #5c5954;"
                >${numberFormat(item.totalPrice['USD'])}</td>
        </tr>
        <tr>
            <td style="border-left: 1px solid #fff;border-right: 1px solid #fff;border-bottom: transparent;" colspan="12" height="40px"></td>
        </tr>
     </tbody>`

    return htmlViewAsSetAll;
}
