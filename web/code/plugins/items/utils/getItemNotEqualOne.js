import numberFormat from './convertNumberformat';
import numberFormat2digit from './convertNumberformatwithcomma2digit';
import config from './config';
import compareBy from './compare';

export default function GetItemEqualOne(item, currency, isViewAsSet, env, row, userPermissionPrice, titleValue){
    let imgPath = env == 'production'
    ? `file:///${config.images.production.path}`
    : env == 'staging'
        ? `file:///${config.images.staging.path}`
        : `file:///${config.fullpath_localfile}web/code/plugins/http/public/images/`;
    let imgPathPublic = env == 'production'
        ? 'file:///home/mol/www/projects/mol/web/code/plugins/http/public'
        : env == 'staging'
            ?'file:///home/mol/www/projects/staging_mol/web/code/plugins/http/public'
            :`file:///${config.fullpath_localfile}web/code/plugins/http/public`;

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
    const isSpecialDisc = item.specialDiscount != undefined ? item.specialDiscount == 1?true:false : false;
    let tagbarspeciallist = `position: absolute;top: 0px;left: 0px;z-index: 999;width: 30px;height: 32px;background: url(${imgPathPublic}/js/plugins/http/public/images/img_special_discount_list.png)right top no-repeat;`
    let htmlViewAsSetAll = '';
    let colSpan = titleValue.length == 1 ? 3 : (3 + titleValue.length) - 1
    htmlViewAsSetAll =
    `<tbody>
        <tr>
            <td style="padding:5px 5px;word-break: normal;font-size: 4px; border: 1px solid #5c5954;" rowspan="${row}">
                <div style="position: relative;">
                    <span style="${(isSpecialDisc)?tagbarspeciallist:''}"></span>
                    <img src="${imagesProduct}" width="60">
                </div>
            </td>
            <td style="padding:5px 5px;word-break: normal;font-size: 4px; border: 1px solid #5c5954;" rowspan="${row}">${item.reference}</td>
        </tr>
        ${item.items.map((subitem,index) => {
            return (
                    `<tr id="${index}">
                        <td style="padding:5px 5px;word-break: normal;font-size: 4px; border: 1px solid #5c5954;">${subitem.reference}</td>
                        ${titleValue.map((title)=>{
                            switch (title) {
                                case 'stoneDetail':
                                    return(`<td style="padding:5px 5px;word-break: normal;font-size: 4px; border: 1px solid #5c5954;">${subitem[title] == ''?'-':subitem[title]}</td>`)
                                    break;
                                case 'grossWeight':
                                    return(`<td style="padding:5px 5px;word-break: normal;font-size: 4px; border: 1px solid #5c5954;">${numberFormat2digit(subitem[title])}</td>`)
                                    break;
                                case 'hierarchy':
                                    return(`<td style="padding:5px 5px;word-break: normal;font-size: 4px; border: 1px solid #5c5954;">${subitem[title] != undefined ? subitem[title].split('\\').slice(-1).pop():''}</td>`)
                                    break;
                                default:
                                    return(`<td style="padding:5px 5px;word-break: normal;font-size: 4px; border: 1px solid #5c5954;">${subitem[title]}</td>`)
                                    break;
                            }
                        }).join('')}
                        <td style="padding:5px 5px;word-break: normal;font-size: 4px; border: 1px solid #5c5954;${(userPermissionPrice == 'All') ?
                            '' : 'display: none !important;visibility: hidden !important;'}">
                            ${numberFormat(subitem.actualCost['USD'])}
                        </td>
                        <td style="padding:5px 5px;word-break: normal;font-size: 4px; border: 1px solid #5c5954;${(userPermissionPrice == 'Updated'
                            || userPermissionPrice == 'All') ? '' : 'display: none !important;visibility: hidden !important;'}">
                            ${numberFormat(subitem.updatedCost['USD'])}
                        </td>
                        <td style="padding:5px 5px;word-break: normal;font-size: 4px; border: 1px solid #5c5954;${(userPermissionPrice == 'Public'
                            || userPermissionPrice == 'Updated' || userPermissionPrice == 'All') ? '' : 'display: none !important;visibility: hidden !important;'}">
                            ${numberFormat(subitem.price['USD'])}
                        </td>
                    </tr>`
            );
        }).join('')}
        <tr>
            <td colspan="${colSpan}" style="border-left: 1px solid #fff;border-bottom: 1px solid #fff;padding:5px 5px;word-break: normal;font-size: 4px;"></td>
            <td style="font-weight: bold; font-family:'open_sanssemibold';color:#000;text-align: center;background-color: #ebd79a;padding:5px 5px;word-break: normal;font-size: 4px; border: 1px solid #5c5954;border-right: 1px solid #5c5954; border-bottom: 1px solid #5c5954;">
                Total
            </td>
            <td style="${(userPermissionPrice == 'All') ? '' : 'display: none !important;visibility: hidden !important;'} text-align:right;font-weight: bold; font-family:'open_sanssemibold';color:#000;background-color: #ebd79a;padding:5px 5px;word-break: normal;font-size: 4px;border: 1px solid #5c5954; border-right: 1px solid #5c5954; border-bottom: 1px solid #5c5954;">
                ${numberFormat(item.totalActualCost['USD'])}
            </td>
            <td style="${(userPermissionPrice == 'Updated'
                || userPermissionPrice == 'All') ? '' : 'display: none !important;visibility: hidden !important;'} text-align:right;font-weight: bold; font-family:'open_sanssemibold';color:#000;background-color: #ebd79a;padding:5px 5px;word-break: normal;font-size: 4px;border: 1px solid #5c5954; border-right: 1px solid #5c5954; border-bottom: 1px solid #5c5954;">
                ${numberFormat(item.totalUpdatedCost['USD'])}
            </td>
            <td style="${(userPermissionPrice == 'Public'
                || userPermissionPrice == 'Updated' || userPermissionPrice == 'All') ? '' : 'display: none !important;visibility: hidden !important;'} text-align:right;font-weight: bold; font-family:'open_sanssemibold';color:#000;background-color: #ebd79a;padding:5px 5px;word-break: normal;font-size: 4px;border: 1px solid #5c5954; border-right: 1px solid #5c5954; border-bottom: 1px solid #5c5954;">
                ${numberFormat(item.totalPrice['USD'])}
            </td>
        </tr>
        <tr>
            <td style="border-left: 1px solid #fff;border-right: 1px solid #fff;border-bottom: transparent;" colspan="12" height="40px"></td>
        </tr>
     </tbody>`

    return htmlViewAsSetAll;
}
