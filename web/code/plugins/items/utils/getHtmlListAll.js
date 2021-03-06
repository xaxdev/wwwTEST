import numberFormat from './convertNumberformat';
import numberFormat2digit from './convertNumberformatwithcomma2digit';
import config from './config';
import { ColumnsNomal } from './columns'
import filterArray from './filterArray'

export default function GetHTMLViewASSetAll(datas, currency, isViewAsSet, env, userPermissionPrice, titleColumn){
    let tableColumns = [];
    let titleValue = [];

    if (titleColumn.length != 0) {
        const getTitle = filterArray(ColumnsNomal,titleColumn,'value')
        getTitle.map((title) => {
            tableColumns = [...tableColumns, title.label]
            titleValue = [...titleValue, title.value]
        })
    }else{
        ColumnsNomal.map((title) => {
            tableColumns = [...tableColumns, title.label]
            titleValue = [...titleValue, title.value]
        })
    }

    let htmlViewAsSetAll = '';
    htmlViewAsSetAll =
    `<html>
        <head>
            <title>Mol online 2016</title>
            <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet">
        </head>
        <body style="margin:0;padding:0; font-family: 'Open Sans', sans-serif; font-size: 10px;">
            <form>
                <div style="margin: 0;padding: 0;">
                    <div>
                        <div style="width: 100%;">
                            <div style="border-radius: 0;margin-bottom: 0 !important;border: 0;box-shadow: none;">
                                <div>
                                    <div style="background-color: #debe6b;float: left;width: 100%;padding: 15px 0;margin: 0px 0 1px 0;text-align: center; font-family: 'Open Sans', sans-serif; font-size: 10px;">
                                        <span>
                                            <span style="font-weight: bold; color: #000;" >Total Items :</span>
                                            <span style="font-weight: 900;" >
                                                <span>${datas.summary.count}</span>
                                                <span> </span>
                                                <span>${isViewAsSet ? 'Sets' : 'Items'}</span>
                                                <span> </span>
                                            </span>
                                            <span style="padding: 0 15px;">|</span>
                                        </span>
                                        <span style="${(userPermissionPrice == 'Public' || userPermissionPrice == 'Updated' || userPermissionPrice == 'All') ?
                                            '' : 'display: none !important;visibility: hidden !important;'}">
                                            <span style="font-weight: bold; color: #000;">Total Price :</span>
                                            <span style="font-weight: 900;" >
                                                <span>${numberFormat(datas.summary.price)}</span>
                                                <span> </span>
                                                <span>${isViewAsSet ? 'USD' : currency}</span>
                                            </span>
                                        </span>
                                        <span style="${(userPermissionPrice == 'Updated' || userPermissionPrice == 'All') ? '' : 'display: none !important;visibility: hidden !important;'}">
                                            <span style="padding: 0 15px;">|</span>
                                            <span style="font-weight: bold; color: #000;">Total Updated Cost :</span>
                                            <span style="font-weight: 900;" >
                                                <span>${numberFormat(datas.summary.cost)}</span>
                                                <span> </span>
                                                <span>${isViewAsSet ? 'USD' : currency}</span>
                                            </span>
                                        </span>
                                    </div>
                                    <div style="background-color: #dddddd;float: left;width: 100%;padding: 10px 0px;text-align: center; font-family:'Open Sans', sans-serif; font-size: 10px;">
                                        <span>
                                            <span style="font-weight: bold; color: #000;">Highest Price :</span>
                                            <span style="font-weight: 900;" >
                                                <span>${numberFormat(datas.summary.maxPrice)}</span>
                                                <span> </span>
                                                <span>${isViewAsSet ? 'USD' : currency}</span>
                                                <span> </span>
                                            </span>
                                            <span style="padding: 0 15px;">|</span>
                                        </span>
                                        <span>
                                            <span style="font-weight: bold; color: #000;">Lowest Price :</span>
                                            <span style="font-weight: 900;" >
                                                <span>${numberFormat(datas.summary.minPrice)}</span>
                                                <span> </span>
                                                <span>${isViewAsSet ? 'USD' : currency}</span>
                                                <span> </span>
                                            </span>
                                            <span style="padding: 0 15px;">|</span>
                                        </span>
                                        <span>
                                            <span style="font-weight: bold; color: #000;">Average Price :</span>
                                            <span style="font-weight: 900;" >
                                                <span>${numberFormat(datas.summary.avrgPrice)}</span>
                                                <span> </span>
                                                <span>${isViewAsSet ? 'USD' : currency}</span>
                                                <span> </span>
                                            </span>
                                        </span>
                                    </div>
                                    <div style="position: relative;">
                                        <div>
                                            <div class="col-sm-12">
                                                <div class="row"></div>
                                                <div>
                                                    <table style="font-size: 6px; border-spacing: 0;margin:0 auto; width:80%;">
                                                        <caption style="position: absolute;width: 1px;height: 1px;padding: 0;margin: -1px;overflow: hidden;clip: rect(0,0,0,0);border: 0;" role="alert" aria-live="polite">Sorted by reference: ascending order</caption>
                                                        <thead style="padding:10px 10px; text-align:center; color:#fff; background-color: #383735;  font-weight: normal; font-size: 6px;">
                                                            <tr>
                                                                <th style="padding:10px 10px; text-align:center; color:#fff; background-color: #383735;  font-weight: normal; font-size: 6px; border: 1px solid #5c5954;"
                                                                    role="columnheader" scope="col" style="width: 0px;">
                                                                    <span>Images</span>
                                                                </th>
                                                                <th style="padding:10px 10px; text-align:center; color:#fff; background-color: #383735;  font-weight: normal; font-size: 6px; border: 1px solid #5c5954;"
                                                                    role="columnheader" scope="col" tabindex="0" aria-sort="ascending" aria-label="Item Reference: activate to sort column descending" style="width: 0px;">
                                                                    <span>Item Reference</span>
                                                                    <span class="sort-icon sort-ascending" aria-hidden="true"></span>
                                                                </th>
                                                                ${tableColumns.map((title)=>{
                                                                    return(
                                                                        `<th style="padding:10px 10px; text-align:center; color:#fff; background-color: #383735;  font-weight: normal; font-size: 6px; border: 1px solid #5c5954;" role="columnheader" scope="col" tabindex="0"
                                                                            aria-sort="none" aria-label="Description: activate to sort column ascending" style="width: 0px;">
                                                                            <span>${title}</span>
                                                                            <span class="sort-icon sort-none" aria-hidden="true"></span>
                                                                        </th>`
                                                                    )
                                                                }).join('')}
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            ${datas.exportData.map((item,index) => {
                                                                let imagesProduct = '';
                                                                let itemName = '';
                                                                let price = '';
                                                                let updated = '';
                                                                let actual = '';
                                                                let size = '';
                                                                let jewelsWeight = 0;
                                                                let grossWeight = 0;
                                                                let imgPath = env == 'production'
                                                                    ? `file:///${config.images.production.path}`
                                                                    : env == 'staging'
                                                                        ? `file:///${config.images.staging.path}`
                                                                        : `file:///${config.fullpath_localfile}web/code/plugins/http/public/images/`;
                                                                let imgPathPublic = env == 'production'
                                                                    ? 'file:///home/mol/www/projects/mol/web/code/plugins/http/public'
                                                                    : env == 'staging'
                                                                        ?'file:///home/mol/www/projects/staging/mol/web/code/plugins/http/public'
                                                                        :`file:///${config.fullpath_localfile}web/code/plugins/http/public`;
                                                                let tagbarspeciallist = `position: absolute;top: -5px;left: -5px;z-index: 9;width: 30px;height: 32px;background: url(${imgPathPublic}/js/plugins/http/public/images/img_special_discount_list.png)right top no-repeat;`
                                                                if(item.price != undefined){
                                                                    price = (item.price[currency] != undefined) ? numberFormat(item.price[currency]) : '- ';
                                                                }else{
                                                                    price = '- ';
                                                                }

                                                                if(item.updatedCost != undefined){
                                                                    updated = (item.updatedCost[currency] != undefined) ? numberFormat(item.updatedCost[currency]) : '- '
                                                                }else{
                                                                    updated = '- ';
                                                                }

                                                                if(item.actualCost != undefined){
                                                                    actual = (item.actualCost[currency] != undefined) ? numberFormat(item.actualCost[currency]) : '- '
                                                                }else{
                                                                    actual = '- ';
                                                                }

                                                                let isSpecialDisc = item.specialDiscount != undefined ? item.specialDiscount == 1?true:false : false;

                                                                switch (item.type) {
                                                                    case 'JLY':
                                                                        size = (item.size != undefined) ? item.size : '';
                                                                        break;
                                                                    case 'WAT':
                                                                        size = (item.caseDimension != undefined) ? item.caseDimension : '';
                                                                        break;
                                                                    case 'OBA':
                                                                        size = (item.dimension != undefined) ? item.dimension : '';
                                                                        break;
                                                                    default:
                                                                        break;
                                                                }
                                                                itemName = (item.type != 'CER')
                                                                    ? (item.description != undefined)
                                                                        ? item.description
                                                                        : '-'
                                                                    : item.name ;
                                                                imagesProduct = (item.gallery) != undefined
                                                                    ? (item.gallery.length) != 0 ? item.gallery[0].original : '/images/blank.gif'
                                                                    : '/images/blank.gif';
                                                                imagesProduct = imagesProduct.replace(/\/images\//g,imgPath);

                                                                if (item.gemstones != undefined) {
                                                                    item.gemstones.forEach(function(gemstone) {
                                                                        if(gemstone.carat != undefined){
                                                                            jewelsWeight = jewelsWeight + gemstone.carat;
                                                                        }
                                                                    });
                                                                } else {
                                                                    jewelsWeight = '';
                                                                }
                                                                jewelsWeight = numberFormat2digit(jewelsWeight);
                                                                grossWeight = numberFormat2digit(item.grossWeight)

                                                                return (
                                                                    `<tr>
                                                                        <td style="padding:5px 5px;word-break: normal;font-size: 6px; border: 1px solid #5c5954;">
                                                                            <div style="position: relative;">
                                                                                <span style="${(isSpecialDisc)? tagbarspeciallist:''}"></span>
                                                                                <img src="${imagesProduct}" width="60">
                                                                            </div>
                                                                        </td>
                                                                        <td style="padding:5px 5px;word-break: normal;font-size: 6px; border: 1px solid #5c5954;">
                                                                            <span>${item.reference}</span>
                                                                        </td>
                                                                        ${titleValue.map((title)=>{
                                                                            switch (title) {
                                                                                case 'priceUSD':
                                                                                    return(
                                                                                        `<td style="padding:5px 5px;word-break: normal;font-size: 6px; border: 1px solid #5c5954;">
                                                                                            <span>${price}</span>
                                                                                        </td>`
                                                                                    )
                                                                                    break;
                                                                                case 'updatedCostUSD':
                                                                                    return(
                                                                                        `<td style="padding:5px 5px;word-break: normal;font-size: 6px; border: 1px solid #5c5954;">
                                                                                            <span>${updated}</span>
                                                                                        </td>`
                                                                                    )
                                                                                    break;
                                                                                case 'actualCostUSD':
                                                                                    return(
                                                                                        `<td style="padding:5px 5px;word-break: normal;font-size: 6px; border: 1px solid #5c5954;">
                                                                                            <span>${actual}</span>
                                                                                        </td>`
                                                                                    )
                                                                                    break;
                                                                                case 'stoneDetail':
                                                                                    return(
                                                                                        `<td style="padding:5px 5px;word-break: normal;font-size: 6px; border: 1px solid #5c5954;">
                                                                                            <span>${item[title] != ''? item[title]: '-'}</span>
                                                                                        </td>`
                                                                                    )
                                                                                    break;
                                                                                case 'grossWeight':
                                                                                    return(
                                                                                        `<td style="padding:5px 5px;word-break: normal;font-size: 6px; border: 1px solid #5c5954;">
                                                                                            <span>${grossWeight}</span>
                                                                                        </td>`
                                                                                    )
                                                                                    break;
                                                                                case 'description':
                                                                                    return(
                                                                                        `<td style="padding:5px 5px;word-break: normal;font-size: 6px; border: 1px solid #5c5954;">
                                                                                            <span>${itemName}</span>
                                                                                        </td>`
                                                                                    )
                                                                                    break;
                                                                                case 'size':
                                                                                    return(
                                                                                        `<td style="padding:5px 5px;word-break: normal;font-size: 6px; border: 1px solid #5c5954;">
                                                                                            <span>${size}</span>
                                                                                        </td>`
                                                                                    )
                                                                                    break;
                                                                                case 'jewelsWeight':
                                                                                    return(
                                                                                        `<td style="padding:5px 5px;word-break: normal;font-size: 6px; border: 1px solid #5c5954;">
                                                                                            <span>${jewelsWeight}</span>
                                                                                        </td>`
                                                                                    )
                                                                                    break;
                                                                                default:
                                                                                    return(
                                                                                        `<td style="padding:5px 5px;word-break: normal;font-size: 6px; border: 1px solid #5c5954;">
                                                                                            <span>${item[title]}</span>
                                                                                        </td>`
                                                                                    )
                                                                                    break;
                                                                            }
                                                                        }).join('')}
                                                                    </tr>`
                                                                )
                                                            }).join('')}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </body>
    </html>`
    return htmlViewAsSetAll.toString();
}
