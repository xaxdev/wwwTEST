import numberFormat from './convertNumberformat';
import GetPriceWithCurrency from './getPriceWithCurrency';
import numberFormat2digit from './convertNumberformatwithcomma2digit';

export default function GetHTMLListAllSales(datas,currency,isViewAsSet,env,userPermissionPrice){
    const priceSalesRTP = userPermissionPrice.priceSalesRTP;
    const priceSalesUCP = userPermissionPrice.priceSalesUCP;
    const priceSalesCTP = userPermissionPrice.priceSalesCTP;
    const priceSalesNSP = userPermissionPrice.priceSalesNSP;
    const priceSalesMGP = userPermissionPrice.priceSalesMGP;
    const priceSalesDSP = userPermissionPrice.priceSalesDSP;
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
                                            <span class="font-w9" >
                                                <span>${datas.summary.count}</span>
                                                <span> </span>
                                                <span>${isViewAsSet ? 'Sets' : 'Items'}</span>
                                                <span> </span>
                                            </span>
                                        </span>
                                        <span class="${(priceSalesNSP) ? '' : 'hidden'}">
                                            <span style="padding: 0 15px;">|</span>
                                            <span style="font-weight: bold; color: #000;">Total Net Sales :</span>
                                            <span class="font-w9">${numberFormat(datas.summary.netAmount) }</span>
                                        </span>
                                        <span class="${(priceSalesUCP) ? '' : 'hidden'}">
                                            <span style="padding: 0 15px;">|</span>
                                            <span style="font-weight: bold; color: #000;">Total Updated Cost :</span>
                                            <span class="font-w9">
                                                <span>${numberFormat(datas.summary.cost)}</span>
                                                <span> </span>
                                                <span>${isViewAsSet ? 'USD' : currency}</span>
                                            </span>
                                        </span>
                                    </div>
                                    <div style="background-color: #dddddd;float: left;width: 100%;padding: 10px 0px;text-align: center; font-family:'Open Sans', sans-serif; font-size: 10px;">
                                        <span class="${(priceSalesNSP) ? '' : 'hidden'}">
                                            <span style="font-weight: bold; color: #000;">Highest Net Sales :</span>
                                            <span class="font-w9">
                                                <span>${numberFormat(datas.summary.maxPrice)}</span>
                                                <span> </span>
                                                <span>${isViewAsSet ? 'USD' : currency}</span>
                                                <span> </span>
                                            </span>
                                        </span>
                                        <span class="${(priceSalesNSP) ? '' : 'hidden'}">
                                            <span style="padding: 0 15px;">|</span>
                                            <span style="font-weight: bold; color: #000;">Lowest Net Sales :</span>
                                            <span class="font-w9">
                                                <span>${numberFormat(datas.summary.minPrice)}</span>
                                                <span> </span>
                                                <span>${isViewAsSet ? 'USD' : currency}</span>
                                                <span> </span>
                                            </span>
                                        </span>
                                        <span class="${(priceSalesMGP) ? '' : 'hidden'}">
                                            <span style="padding: 0 15px;">|</span>
                                            <span style="font-weight: bold; color: #000;">Average Margin % :</span>
                                            <span class="font-w9">
                                                <span>${numberFormat((datas.summary.margin/datas.summary.netAmount)*100)} %</span>
                                                <span> </span>
                                                <span>${isViewAsSet ? 'USD' : currency}</span>
                                                <span> </span>
                                            </span>
                                        </span>
                                        <span class="${(priceSalesDSP) ? '' : 'hidden'}">
                                            <span style="padding: 0 15px;">|</span>
                                            <span style="font-weight: bold; color: #000;">Average Discount % :</span>
                                            <span class="font-w9">
                                                <span>${numberFormat((datas.summary.disconst/datas.summary.price)*100)} %</span>
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
                                                                <th style="padding:10px 10px; text-align:center; color:#fff; background-color: #383735;  font-weight: normal; font-size: 6px; border: 1px solid #5c5954;" role="columnheader" scope="col" tabindex="0"
                                                                    aria-sort="none" aria-label="Description: activate to sort column ascending" style="width: 0px;">
                                                                    <span>Description</span>
                                                                    <span class="sort-icon sort-none" aria-hidden="true"></span>
                                                                </th>
                                                                <th style="padding:10px 10px; text-align:center; color:#fff; background-color: #383735;  font-weight: normal; font-size: 6px; border: 1px solid #5c5954;" role="columnheader" scope="col" tabindex="0"
                                                                    aria-sort="none" aria-label="SKU: activate to sort column ascending" style="width: 0px;">
                                                                    <span>SKU</span>
                                                                    <span class="sort-icon sort-none" aria-hidden="true"></span>
                                                                </th>
                                                                <th style="padding:10px 10px; text-align:center; color:#fff; background-color: #383735;  font-weight: normal; font-size: 6px; border: 1px solid #5c5954;" role="columnheader" scope="col" tabindex="0"
                                                                    aria-sort="none" aria-label="Company: activate to sort column ascending" style="width: 0px;">
                                                                    <span>Company</span>
                                                                    <span class="sort-icon sort-none" aria-hidden="true"></span>
                                                                </th>
                                                                <th style="padding:10px 10px; text-align:center; color:#fff; background-color: #383735;  font-weight: normal; font-size: 6px; border: 1px solid #5c5954;" role="columnheader" scope="col" tabindex="0"
                                                                    aria-sort="none" aria-label="Location: activate to sort column ascending" style="width: 0px;">
                                                                    <span>Location</span>
                                                                    <span class="sort-icon sort-none" aria-hidden="true"></span>
                                                                </th>
                                                                <th style="padding:10px 10px; text-align:center; color:#fff; background-color: #383735;  font-weight: normal; font-size: 6px; border: 1px solid #5c5954;" role="columnheader" scope="col"
                                                                    tabindex="0" aria-sort="none" aria-label="Size: activate to sort column ascending" style="width: 0px;">
                                                                    <span>Size</span>
                                                                    <span class="sort-icon sort-none" aria-hidden="true"></span>
                                                                </th>
                                                                <th style="padding:10px 10px; text-align:center; color:#fff; background-color: #383735;  font-weight: normal; font-size: 6px; border: 1px solid #5c5954;" role="columnheader" scope="col"
                                                                    tabindex="0" aria-sort="none" aria-label="Jewelry Weight: activate to sort column ascending" style="width: 0px;">
                                                                    <span>Jewelry Weight</span>
                                                                    <span class="sort-icon sort-none" aria-hidden="true"></span>
                                                                </th>
                                                                <th style="padding:10px 10px; text-align:center; color:#fff; background-color: #383735;  font-weight: normal; font-size: 6px; border: 1px solid #5c5954;" role="columnheader" scope="col"
                                                                    tabindex="0" aria-sort="none" aria-label="Item Weight (Grams): activate to sort column ascending" style="width: 0px;">
                                                                    <span>Item Weight (Grams)</span>
                                                                    <span class="sort-icon sort-none" aria-hidden="true"></span>
                                                                </th>
                                                                <th style="padding:10px 10px; text-align:center; color:#fff; background-color: #383735;  font-weight: normal; font-size: 6px; border: 1px solid #5c5954;" role="columnheader" scope="col"
                                                                    tabindex="0" aria-sort="none" aria-label="Item Weight (Grams): activate to sort column ascending" style="width: 0px;">
                                                                    <span>Stone Detail</span>
                                                                    <span class="sort-icon sort-none" aria-hidden="true"></span>
                                                                </th>
                                                                <th style="padding:10px 10px; text-align:center; color:#fff; background-color: #383735;  font-weight: normal; font-size: 6px; border: 1px solid #5c5954;" role="columnheader"
                                                                    scope="col" tabindex="0" aria-sort="none" aria-label="Price: activate to sort column ascending" style="width: 0px;">
                                                                    <span>Price</span>
                                                                    <span class="sort-icon sort-none" aria-hidden="true"></span>
                                                                </th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            ${datas.exportData.map((item,index) => {
                                                                let imagesProduct = '';
                                                                let itemName = '';
                                                                let price = '';
                                                                let size = '';
                                                                let jewelsWeight = 0;
                                                                let grossWeight = 0;
                                                                let imgPath = env == 'production'
                                                                    ? 'file:///home/mol/www/projects/mol/web/code/plugins/http/public/images/'
                                                                    : 'file:///home/dev/www/mol/web/code/plugins/http/public/images/';
                                                                if(item.price != undefined){
                                                                    price = (item.price[currency] != undefined) ? numberFormat(item.price[currency]) : '- ';
                                                                }else{
                                                                    price = '- ';
                                                                }

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

                                                                return (`<tr>
                                                                            <td style="padding:5px 5px;word-break: normal;font-size: 6px; border: 1px solid #5c5954;">
                                                                                <span>
                                                                                    <img src="${imagesProduct}" width="60">
                                                                                </span>
                                                                            </td>
                                                                            <td style="padding:5px 5px;word-break: normal;font-size: 6px; border: 1px solid #5c5954;">
                                                                                <span>${item.reference}</span>
                                                                            </td>
                                                                            <td style="padding:5px 5px;word-break: normal;font-size: 6px; border: 1px solid #5c5954;">
                                                                                <span>${itemName}</span>
                                                                            </td>
                                                                            <td style="padding:5px 5px;word-break: normal;font-size: 6px; border: 1px solid #5c5954;">
                                                                                <span>${item.sku}</span>
                                                                            </td>
                                                                            <td style="padding:5px 5px;word-break: normal;font-size: 6px; border: 1px solid #5c5954;">
                                                                                <span>${item.companyName}</span>
                                                                            </td>
                                                                            <td style="padding:5px 5px;word-break: normal;font-size: 6px; border: 1px solid #5c5954;">
                                                                                <span>${item.warehouseName}</span>
                                                                            </td>
                                                                            <td style="padding:5px 5px;word-break: normal;font-size: 6px; border: 1px solid #5c5954;">
                                                                                <span>${size}</span>
                                                                            </td>
                                                                            <td style="padding:5px 5px;word-break: normal;font-size: 6px; border: 1px solid #5c5954;">
                                                                                <span>${jewelsWeight}</span>
                                                                            </td>
                                                                            <td style="padding:5px 5px;word-break: normal;font-size: 6px; border: 1px solid #5c5954;">
                                                                                <span>${grossWeight}</span>
                                                                            </td>
                                                                            <td style="padding:5px 5px;word-break: normal;font-size: 6px; border: 1px solid #5c5954;">
                                                                                <span>${item.stoneDetail != ''? item.stoneDetail: '-'}</span>
                                                                            </td>
                                                                            <td style="padding:5px 5px;word-break: normal;font-size: 6px; border: 1px solid #5c5954;">
                                                                                <span>${price}</span>
                                                                            </td>
                                                                        </tr>`)
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
