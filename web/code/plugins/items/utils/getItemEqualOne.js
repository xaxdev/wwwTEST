import numberFormat from './convertNumberformat';
import GetPriceWithCurrency from './getPriceWithCurrency';
import numberFormat2digit from './convertNumberformatwithcomma2digit';
import config from './config';
import compareBy from './compare';

export default function GetItemEqualOne(item,currency,isViewAsSet,env,userPermissionPrice){

    let imgPath = env == 'production'
        ? 'file:///home/mol/www/projects/mol/web/code/plugins/http/public/images/'
        : env == 'staging'
            ?'file:///home/mol/www/projects/staging_mol/web/code/plugins/http/public/images/'
            :`file:///${config.fullpath_localfile}web/code/plugins/http/public/images/`;
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
    let tagbarspeciallist = `position: absolute;top: 0px;left: 0px;z-index: 999;width: 30px;height: 32px;background: url(${imgPathPublic}/js/plugins/http/public/images/img_special_discount_list.png)right top no-repeat;`
    let htmlViewAsSetAll = '';
    htmlViewAsSetAll =
    `<tbody>
        ${item.items.map((subitem) => {
            const isSpecialDisc = subitem.specialDiscount != undefined ? subitem.specialDiscount == 1?true:false : false;
            return (
                    `<tr id=${subitem.reference} >
                        <td style="padding:5px 5px;word-break: normal;font-size: 4px; border: 1px solid #5c5954;">
                            <div style="position: relative;">
                                <span style="${(isSpecialDisc)? tagbarspeciallist:''}"></span>
                                <img src="${imagesProduct}" width="60">
                            </div>
                        </td>
                        <td style="padding:5px 5px;word-break: normal;font-size: 4px; border: 1px solid #5c5954;">${item.reference}</td>
                        <td style="padding:5px 5px;word-break: normal;font-size: 4px; border: 1px solid #5c5954;">${subitem.reference}</td>
                        <td style="padding:5px 5px;word-break: normal;font-size: 4px; border: 1px solid #5c5954;">${subitem.description}</td>
                        <td style="padding:5px 5px;word-break: normal;font-size: 4px; border: 1px solid #5c5954;">${subitem.sku}</td>
                        <td style="padding:5px 5px;word-break: normal;font-size: 4px; border: 1px solid #5c5954;">${subitem.hierarchy != undefined ? subitem.hierarchy.split('\\').slice(-1).pop():''}</td>
                        <td style="padding:5px 5px;word-break: normal;font-size: 4px; border: 1px solid #5c5954;">${subitem.company}</td>
                        <td style="padding:5px 5px;word-break: normal;font-size: 4px; border: 1px solid #5c5954;">${subitem.warehouse}</td>
                        <td style="padding:5px 5px;word-break: normal;font-size: 4px; border: 1px solid #5c5954;">${numberFormat2digit(subitem.grossWeight)}</td>
                        <td style="padding:5px 5px;word-break: normal;font-size: 4px; border: 1px solid #5c5954;">${subitem.stoneDetail == ''?'-':subitem.stoneDetail}</td>
                        <td style="padding:5px 5px;word-break: normal;font-size: 4px; border: 1px solid #5c5954;${(userPermissionPrice == 'All') ?
                            '' : ' hidden'}">${numberFormat(subitem.actualCost['USD'])}
                        </td>
                        <td style="padding:5px 5px;word-break: normal;font-size: 4px; border: 1px solid #5c5954;${(userPermissionPrice == 'Updated'
                            || userPermissionPrice == 'All') ? '' : ' hidden'}">
                            ${numberFormat(subitem.updatedCost['USD'])}
                        </td>
                        <td style="padding:5px 5px;word-break: normal;font-size: 4px; border: 1px solid #5c5954;${(userPermissionPrice == 'Public'
                            || userPermissionPrice == 'Updated'
                            || userPermissionPrice == 'All') ? '' : ' hidden'}">
                            ${numberFormat(subitem.price['USD'])}
                        </td>
                    </tr>`
            );
        }).join('')}
        <tr>
            <td colspan="9" style="border-left: 1px solid #fff;border-bottom: 1px solid #fff;padding:5px 5px;word-break: normal;font-size: 4px;"></td>
            <td style="font-weight: bold; font-family:'open_sanssemibold';color:#000;text-align: center;background-color: #ebd79a;padding:5px 5px;word-break: normal;font-size: 4px; border: 1px solid #5c5954;border-right: 1px solid #5c5954; border-bottom: 1px solid #5c5954;">
                Total
            </td>
            <td style="${(userPermissionPrice == 'All') ?'' : ' hidden'} text-align:right;font-weight: bold; font-family:'open_sanssemibold';color:#000;background-color: #ebd79a;padding:5px 5px;word-break: normal;font-size: 4px;border: 1px solid #5c5954; border-right: 1px solid #5c5954; border-bottom: 1px solid #5c5954;">
                ${numberFormat(item.totalActualCost['USD'])}
            </td>
            <td style="${(userPermissionPrice == 'Updated' || userPermissionPrice == 'All') ? '' : ' hidden'} text-align:right;font-weight: bold; font-family:'open_sanssemibold';color:#000;background-color: #ebd79a;padding:5px 5px;word-break: normal;font-size: 4px;border: 1px solid #5c5954; border-right: 1px solid #5c5954; border-bottom: 1px solid #5c5954;">
                ${numberFormat(item.totalUpdatedCost['USD'])}
            </td>
            <td style="${(userPermissionPrice == 'Public' || userPermissionPrice == 'Updated' || userPermissionPrice == 'All') ? '' : ' hidden'} text-align:right;font-weight: bold; font-family:'open_sanssemibold';color:#000;background-color: #ebd79a;padding:5px 5px;word-break: normal;font-size: 4px;border: 1px solid #5c5954; border-right: 1px solid #5c5954; border-bottom: 1px solid #5c5954;">
                ${numberFormat(item.totalPrice['USD'])}
            </td>
        </tr>
        <tr>
            <td style="border-left: 1px solid #fff;border-right: 1px solid #fff;border-bottom: transparent;" colspan="12" height="40px"></td>
        </tr>
     </tbody>`

    return htmlViewAsSetAll;
}
