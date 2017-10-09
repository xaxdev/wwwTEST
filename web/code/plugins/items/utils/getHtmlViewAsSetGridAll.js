import numberFormat from './convertNumberformat';
import GetPriceWithCurrency from './getPriceWithCurrency';

export default function GetHTMLViewASSetAll(datas,currency,isViewAsSet,env){

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
                                                <span>Items</span>
                                                <span> </span>
                                            </span>
                                            <span style="padding: 0 15px;">|</span>
                                        </span>
                                        <span class="">
                                            <span style="font-weight: bold; color: #000;">Total Public Price :</span>
                                            <span class="font-w9" >
                                                <span>${numberFormat(datas.summary.price)}</span>
                                                <span> </span>
                                                <span>${currency}</span>
                                            </span>
                                        </span>
                                        <span class="">
                                            <span style="padding: 0 15px;">|</span>
                                            <span style="font-weight: bold; color: #000;">Total Updated Cost :</span>
                                            <span class="font-w9">
                                                <span>${numberFormat(datas.summary.cost)}</span>
                                                <span> </span>
                                                <span>${currency}</span>
                                            </span>
                                        </span>
                                    </div>
                                    <div style="background-color: #dddddd;float: left;width: 100%;padding: 10px 0px;text-align: center; font-family:'Open Sans', sans-serif; font-size: 10px;">
                                        <span>
                                            <span style="font-weight: bold; color: #000;">Highest Price :</span>
                                            <span class="font-w9">
                                                <span>${numberFormat(datas.summary.maxPrice)}</span>
                                                <span> </span>
                                                <span>${currency}</span>
                                                <span> </span>
                                            </span>
                                            <span style="padding: 0 15px;">|</span>
                                        </span>
                                        <span>
                                            <span style="font-weight: bold; color: #000;">Lowest Price :</span>
                                            <span class="font-w9">
                                                <span>${numberFormat(datas.summary.minPrice)}</span>
                                                <span> </span>
                                                <span>${currency}</span>
                                                <span> </span>
                                            </span>
                                            <span style="padding: 0 15px;">|</span>
                                        </span>
                                        <span>
                                            <span style="font-weight: bold; color: #000;">Average Price :</span>
                                            <span class="font-w9">
                                                <span>${numberFormat(datas.summary.avrgPrice)}</span>
                                                <span> </span>
                                                <span>${currency}</span>
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
                                                                        ? 'file:///var/www/mol/web/code/plugins/http/public/images/'
                                                                        : 'file:///home/dev/www/mol/web/code/plugins/http/public/images/';
                                                if(isViewAsSet){
                                                    price = numberFormat(item.totalPrice['USD']) + ' ' + 'USD';
                                                    itemName = (item.type != 'CER')?
                                                                      (item.description != undefined) ?
                                                                          (item.description.length <= 80) ? item.description : item.description.substring(0, 80) + '...'
                                                                      : '-' :
                                                                      item.name
                                                                      ;
                                                    imagesProduct = (item.image) != undefined
                                                                    ? item.image.length != 0
                                                                        ? item.image[0].original
                                                                        : '/images/blank.gif'
                                                                    : '/images/blank.gif';
                                                }else{
                                                    price = GetPriceWithCurrency(item,'price',currency);
                                                    itemName = (item.description != undefined)
                                                                ? (item.description.length <= 80) ? item.description : item.description.substring(0, 80) + '...'
                                                                : '-';
                                                    imagesProduct = (item.gallery) != undefined
                                                                        ? (item.gallery.length) != 0 ? item.gallery[0].original : '/images/blank.gif'
                                                                        : '/images/blank.gif';
                                                }
                                                imagesProduct = imagesProduct.replace(/\/images\//g,imgPath);
                                                return (`<div name="${item.id}" id="${index}" style="width: 135px; padding: 0;float: left;height: 380px; margin: 0 auto;">
                                                            <div style="margin: 0 auto; text-align: center;font-size: 10px;position: relative;z-index: 2;padding: 15px 11px 0 11px;height: 380px;cursor: pointer;">
                                                                <div style="margin: 0 auto; height: 200px; overflow: hidden; position: relative; width:123px;">
                                                                    <img style="width:120px;margin: 0 auto;" width="160" src="${imagesProduct}" name="${item.id}" id="${item.id}">
                                                                </div>
                                                                <p style="font-family: 'open_sanssemibold';color: #000;margin: 0 0 10px;">
                                                                    <span name="${item.id}" id="${item.id}">${item.reference}</span>
                                                                    <br ${isViewAsSet?'style="display:none;"':''}>
                                                                    <span ${isViewAsSet?'style="display:none;"':''} name="${item.id}" id="${item.id}" >${item.sku}</span>
                                                                </p>
                                                                <p style="height: 85px;overflow: hidden;word-wrap: break-word;margin: 0 0 10px;" name="${item.id}" id="${item.id}">${itemName}</p>
                                                                <span style="color: #ae8f3b; font-weight: bold;">${price}</span>
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
