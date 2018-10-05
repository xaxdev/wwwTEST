import numberFormat from './convertNumberformat';
import GetPriceWithCurrency from './getPriceWithCurrency';
import numberFormat2digit from './convertNumberformatwithcomma2digit';

export default function GetItemEqualOne(item,currency,isViewAsSet,env,row,userPermissionPrice){
    const priceSalesRTP = userPermissionPrice.priceSalesRTP;
    const priceSalesUCP = userPermissionPrice.priceSalesUCP;
    const priceSalesCTP = userPermissionPrice.priceSalesCTP;
    const priceSalesNSP = userPermissionPrice.priceSalesNSP;
    const priceSalesMGP = userPermissionPrice.priceSalesMGP;
    const priceSalesDSP = userPermissionPrice.priceSalesDSP;

    let imgPath = env == 'production'
    ? 'file:///home/mol/www/projects/mol/web/code/plugins/http/public/images/'
    : env == 'staging'
        ?'file:///home/mol/www/projects/staging_mol/web/code/plugins/http/public/images/'
        :'file:///home/dev/www/mol/web/code/plugins/http/public/images/';
    let imgPathPublic = env == 'production'
        ? 'file:///home/mol/www/projects/mol/web/code/plugins/http/public'
        : env == 'staging'
            ?'file:///home/mol/www/projects/staging_mol/web/code/plugins/http/public'
            :'file:///home/dev/www/mol/web/code/plugins/http/public';
    let tagbarsoldoutlist = `position: absolute;top: -5px;right: -5px;z-index: 9999;width: 30px;height: 32px;background: url(${imgPathPublic}/js/plugins/http/public/images/img_sold_out_list.png)right top no-repeat;`

    let imagesGallery = [];
    let imagesOrder = [];
    let imagesThumbnail =  '';

    if (item.image.length > 1) {
        // First checked defaultImage = 1
        imagesGallery = item.image.find((im) => {
            return im.defaultSetImage == 1;
        })
        if (!!imagesGallery) {
            // If has defaultImage = 1
            imagesThumbnail = (imagesGallery) != undefined
                ? imagesGallery.thumbnail : '/images/blank.gif';
        }else{
            // checked lastModifiedDateImage by using lastModifiedDateImage
            imagesOrder = item.image.sort(compareBy('lastModifiedDateSetImage','desc',null));
            imagesThumbnail = (imagesOrder.length) != 0 ? imagesOrder[0].thumbnail : '/images/blank.gif';
        }
    }else{
        imagesThumbnail = (item.image) != undefined
            ? (item.image.length) != 0 ? item.image[0].thumbnail : '/images/blank.gif'
            : '/images/blank.gif';
    }

    let imagesProduct = imagesThumbnail.replace(/\/images\//g,imgPath);
    let htmlViewAsSetAll = '';
    htmlViewAsSetAll =
    `<tbody>
        <tr>
            <td style="padding:5px 5px;word-break: normal;font-size: 4px; border: 1px solid #5c5954;" rowspan="${row}">
                <div style="position: relative;">
                    <span style="${tagbarsoldoutlist}"></span>
                    <img src="${imagesProduct}" width="60">
                </div>
            </td>
            <td style="padding:5px 5px;word-break: normal;font-size: 4px; border: 1px solid #5c5954;" rowspan="${row}">${item.reference}</td>
        </tr>
        ${item.items.map((subitem,index) => {
            return (
                    `<tr id="${index}">
                        <td style="padding:5px 5px;word-break: normal;font-size: 4px; border: 1px solid #5c5954;">${subitem.reference}</td>
                        <td style="padding:5px 5px;word-break: normal;font-size: 4px; border: 1px solid #5c5954;">${subitem.description}</td>
                        <td style="padding:5px 5px;word-break: normal;font-size: 4px; border: 1px solid #5c5954;">${subitem.sku}</td>
                        <td style="padding:5px 5px;word-break: normal;font-size: 4px; border: 1px solid #5c5954;">${subitem.hierarchy != undefined ? subitem.hierarchy.split('\\').slice(-1).pop():''}</td>
                        <td style="padding:5px 5px;word-break: normal;font-size: 4px; border: 1px solid #5c5954;">${subitem.company}</td>
                        <td style="padding:5px 5px;word-break: normal;font-size: 4px; border: 1px solid #5c5954;">${subitem.warehouse}</td>
                        <td style="padding:5px 5px;word-break: normal;font-size: 4px; border: 1px solid #5c5954;">${numberFormat2digit(subitem.grossWeight)}</td>
                        <td style="padding:5px 5px;word-break: normal;font-size: 4px; border: 1px solid #5c5954;">${subitem.stoneDetail == ''?'-':subitem.stoneDetail}</td>
                        <td style="padding:5px 5px;word-break: normal;font-size: 4px; border: 1px solid #5c5954;${(priceSalesCTP) ? '' : ' hidden'}">
                            ${numberFormat(subitem.actualCost['USD'])}
                        </td>
                        <td style="padding:5px 5px;word-break: normal;font-size: 4px; border: 1px solid #5c5954;${(priceSalesUCP) ? '' : ' hidden'}">
                            ${numberFormat(subitem.updatedCost['USD'])}
                        </td>
                        <td style="padding:5px 5px;word-break: normal;font-size: 4px; border: 1px solid #5c5954;${(priceSalesRTP) ? '' : ' hidden'}">
                            ${numberFormat(subitem.price['USD'])}
                        </td>
                    </tr>`
            );
        }).join('')}
        <tr>
            <td colspan="9" style="border-left: 1px solid #fff;border-bottom: 1px solid #fff;padding:5px 5px;word-break: normal;font-size: 4px;"></td>
            <td style="font-weight: bold; font-family:'open_sanssemibold';color:#000;text-align: center;background-color: #ebd79a;padding:5px 5px;word-break: normal;font-size: 4px; border: 1px solid #5c5954;border-right: 1px solid #5c5954; border-bottom: 1px solid #5c5954;"
                >Total</td>
            <td style="${(priceSalesCTP) ? '' : ' hidden'} text-align:right;font-weight: bold; font-family:'open_sanssemibold';color:#000;background-color: #ebd79a;padding:5px 5px;word-break: normal;font-size: 4px;border: 1px solid #5c5954; border-right: 1px solid #5c5954; border-bottom: 1px solid #5c5954;">
                ${numberFormat(item.totalActualCost['USD'])}
            </td>
            <td style="${(priceSalesUCP) ? '' : ' hidden'} text-align:right;font-weight: bold; font-family:'open_sanssemibold';color:#000;background-color: #ebd79a;padding:5px 5px;word-break: normal;font-size: 4px;border: 1px solid #5c5954; border-right: 1px solid #5c5954; border-bottom: 1px solid #5c5954;">
                ${numberFormat(item.totalUpdatedCost['USD'])}
            </td>
            <td style="${(priceSalesRTP) ? '' : ' hidden'} text-align:right;font-weight: bold; font-family:'open_sanssemibold';color:#000;background-color: #ebd79a;padding:5px 5px;word-break: normal;font-size: 4px;border: 1px solid #5c5954; border-right: 1px solid #5c5954; border-bottom: 1px solid #5c5954;">
                ${numberFormat(item.totalPrice['USD'])}
            </td>
        </tr>
        <tr>
            <td style="border-left: 1px solid #fff;border-right: 1px solid #fff;border-bottom: transparent;" colspan="12" height="40px"></td>
        </tr>
     </tbody>`

    return htmlViewAsSetAll;
}
