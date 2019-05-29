import numberFormat from './convertNumberformat';
import GetPriceWithCurrency from './getPriceWithCurrency';
import config from './config';

export default function GetHTMLViewASSetGridAllSales(datas,currency,isViewAsSet,env,userPermissionPrice){
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
                                            <span style="font-weight: 900;" >
                                                <span>${datas.summary.count}</span>
                                                <span> </span>
                                                <span>${isViewAsSet ? 'Sets' : 'Items'}</span>
                                                <span> </span>
                                            </span>
                                        </span>
                                        <span style="${(priceSalesNSP) ? '' : 'display: none !important;visibility: hidden !important;'}">
                                            <span style="padding: 0 15px;">|</span>
                                            <span style="font-weight: bold; color: #000;">Total Net Sales :</span>
                                            <span style="font-weight: 900;">${numberFormat(datas.summary.netAmount) }</span>
                                        </span>
                                        <span style="${(priceSalesUCP) ? '' : 'display: none !important;visibility: hidden !important;'}">
                                            <span style="padding: 0 15px;">|</span>
                                            <span style="font-weight: bold; color: #000;">Total Updated Cost :</span>
                                            <span style="font-weight: 900;">
                                                <span>${numberFormat(datas.summary.cost)}</span>
                                                <span> </span>
                                                <span>${isViewAsSet ? 'USD' : currency}</span>
                                            </span>
                                        </span>
                                    </div>
                                    <div style="background-color: #dddddd;float: left;width: 100%;padding: 10px 0px;text-align: center; font-family:'Open Sans', sans-serif; font-size: 10px;">
                                        <span style="${(priceSalesNSP) ? '' : 'display: none !important;visibility: hidden !important;'}">
                                            <span style="font-weight: bold; color: #000;">Highest Net Sales :</span>
                                            <span style="font-weight: 900;">
                                                <span>${numberFormat(datas.summary.maxPrice)}</span>
                                                <span> </span>
                                                <span>${isViewAsSet ? 'USD' : currency}</span>
                                                <span> </span>
                                            </span>
                                        </span>
                                        <span style="${(priceSalesNSP) ? '' : 'display: none !important;visibility: hidden !important;'}">
                                            <span style="padding: 0 15px;">|</span>
                                            <span style="font-weight: bold; color: #000;">Lowest Net Sales :</span>
                                            <span style="font-weight: 900;">
                                                <span>${numberFormat(datas.summary.minPrice)}</span>
                                                <span> </span>
                                                <span>${isViewAsSet ? 'USD' : currency}</span>
                                                <span> </span>
                                            </span>
                                        </span>
                                        <span style="${(priceSalesMGP) ? '' : 'display: none !important;visibility: hidden !important;'}">
                                            <span style="padding: 0 15px;">|</span>
                                            <span style="font-weight: bold; color: #000;">Average Margin % :</span>
                                            <span style="font-weight: 900;">
                                                <span>${numberFormat((datas.summary.margin/datas.summary.netAmount)*100)} %</span>
                                                <span> </span>
                                                <span>${isViewAsSet ? 'USD' : currency}</span>
                                                <span> </span>
                                            </span>
                                        </span>
                                        <span style="${(priceSalesDSP) ? '' : 'display: none !important;visibility: hidden !important;'}">
                                            <span style="padding: 0 15px;">|</span>
                                            <span style="font-weight: bold; color: #000;">Average Discount % :</span>
                                            <span style="font-weight: 900;">
                                                <span>${numberFormat((datas.summary.disconst/datas.summary.price)*100)} %</span>
                                                <span> </span>
                                                <span>${isViewAsSet ? 'USD' : currency}</span>
                                                <span> </span>
                                            </span>
                                        </span>
                                    </div>
                                    <div style="position: relative;">
                                        <div>
                                            ${datas.exportData.map((item,index) => {
                                                let imagesProduct = '';
                                                let itemName = '';
                                                let price = '';
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
                                                let tagbarsoldoutgrid = `position: absolute;top: 0;right: 0;z-index: 9999;width: 88px;height: 93px;background: url(${imgPathPublic}/js/plugins/http/public/images/img_sold_out_pdf.png)right top no-repeat;`
                                                if(isViewAsSet){
                                                    price = numberFormat(item.totalPrice['USD']) + ' ' + 'USD';
                                                    itemName = (item.type != 'CER')
                                                        ? (item.description != undefined) ?
                                                            (item.description.length <= 80) ? item.description : item.description.substring(0, 80) + '...'
                                                        : '-' :
                                                        item.name;

                                                    let imagesGallery = [];
                                                    let imagesOrder = [];

                                                    if (item.image.length > 1) {
                                                        // First checked defaultImage = 1
                                                        imagesGallery = item.image.find((im) => {
                                                            return im.defaultSetImage == 1;
                                                        })
                                                        if (!!imagesGallery) {
                                                            // If has defaultImage = 1
                                                            imagesProduct = (imagesGallery) != undefined
                                                                ? imagesGallery.original : '/images/blank.gif';
                                                        }else{
                                                            // checked lastModifiedDateImage by using lastModifiedDateImage
                                                            imagesOrder = item.image.sort(compareBy('lastModifiedDateSetImage','desc',null));
                                                            imagesProduct = (imagesOrder.length) != 0 ? imagesOrder[0].original : '/images/blank.gif';
                                                        }
                                                    }else{
                                                        imagesProduct = (item.image) != undefined
                                                            ? item.image.length != 0 ?item.image[0].original : '/images/blank.gif'
                                                            : '/images/blank.gif';
                                                    }
                                                    imagesProduct = (item.image) != undefined
                                                        ? item.image.length != 0 ? item.image[0].original : '/images/blank.gif'
                                                        : '/images/blank.gif';
                                                }else{
                                                    let imagesGallery = [];
                                                    let imagesOrder = [];

                                                    if (item.gallery.length > 1) {
                                                        // First checked defaultImage = 1
                                                        imagesGallery = item.gallery.find((gallery) => {
                                                            return gallery.defaultImage == 1;
                                                        })
                                                        if (!!imagesGallery) {
                                                            // If has defaultImage = 1
                                                            imagesProduct = (imagesGallery) != undefined
                                                                ? imagesGallery.original : '/images/blank.gif';
                                                        }else{
                                                            // checked lastModifiedDateImage by using lastModifiedDateImage
                                                            imagesOrder = item.gallery.sort(compareBy('lastModifiedDateImage','desc',null));
                                                            imagesProduct = (imagesOrder.length) != 0 ? imagesOrder[0].original : '/images/blank.gif';
                                                        }
                                                    }else{
                                                        imagesProduct = (item.gallery) != undefined
                                                            ? (item.gallery.length) != 0 ? item.gallery[0].original : '/images/blank.gif'
                                                            : '/images/blank.gif';
                                                    }
                                                    price = GetPriceWithCurrency(item,'price',currency);
                                                    itemName = (item.description != undefined)
                                                        ? (item.description.length <= 80) ? item.description : item.description.substring(0, 80) + '...'
                                                        : '-';
                                                }
                                                imagesProduct = imagesProduct.replace(/\/images\//g,imgPath);
                                                return (`<div name="${item.id}" id="${index}" style="width: 135px; padding: 0;float: left;height: 380px; margin: 0 auto;">
                                                            <div style="margin: 0 auto; text-align: center;font-size: 10px;position: relative;z-index: 2;padding: 15px 11px 0 11px;height: 380px;cursor: pointer;">
                                                                <div style="margin: 0 auto; height: 200px; overflow: hidden; position: relative; width:123px;">
                                                                    <span style="${tagbarsoldoutgrid}"></span>
                                                                    <img style="width:120px;margin: 0 auto;" width="160" src="${imagesProduct}" name="${item.id}" id="${item.id}">
                                                                </div>
                                                                <p style="font-family: 'open_sanssemibold';color: #000;margin: 0 0 10px;">
                                                                    <span name="${item.id}" id="${item.id}">${item.reference}</span>
                                                                    <br ${isViewAsSet?'style="display:none;"':''}>
                                                                    <span ${isViewAsSet?'style="display:none;"':''} name="${item.id}" id="${item.id}" >${item.sku}</span>
                                                                </p>
                                                                <p style="height: 85px;overflow: hidden;word-wrap: break-word;margin: 0 0 10px;" name="${item.id}" id="${item.id}">${itemName}</p>
                                                                <span style="color: #ae8f3b; font-weight: bold; ${(item.type != 'CER') ? '' : 'display: none !important;visibility: hidden !important;'}">${price}</span>
                                                                <span class="line"></span>
                                                            </div>
                                                        </div>`)
                                            }).join('')}
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
