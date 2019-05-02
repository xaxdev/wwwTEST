import numberFormat from './convertNumberformat';
import GetListViewAsSetSalesItem from './getListViewAsSetSalesItem';

export default function GetHTMLListViewAsSetAllSales(datas,currency,isViewAsSet,env,userPermissionPrice){
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
                                            <div class="col-sm-12">
                                                <div class="row"></div>
                                                <div>
                                                    <table style="font-size: 4px; border-spacing: 0;margin:0 auto; width:80%;">
                                                        <thead style="padding:10px 10px; text-align:center; color:#fff; background-color: #383735;  font-weight: normal; font-size: 4px;" id="listViewPrint">
                                                            <tr>
                                                                <th><span>Images</span></th>
                                                                <th><span>Set Product Number</span></th>
                                                                <th><span>Item Reference</span></th>
                                                                <th><span>Description</span></th>
                                                                <th><span>SKU</span></th>
                                                                <th><span>Category Name</span></th>
                                                                <th><span>Company</span></th>
                                                                <th><span>Location</span></th>
                                                                <th><span>Item Weight (Grams)</span></th>
                                                                <th><span>Stone Detail</span></th>
                                                                <th style="${(priceSalesCTP) ? '' : 'display: none !important;visibility: hidden !important;'}"><span>Group Cost Price (USD)</span></th>
                                                                <th style="${(priceSalesUCP) ? '' : 'display: none !important;visibility: hidden !important;'}"><span>Updated Cost Price (USD)</span></th>
                                                                <th style="${(priceSalesRTP) ? '' : 'display: none !important;visibility: hidden !important;'}"><span>Selling Cost Price (USD)</span></th>
                                                            </tr>
                                                        </thead>
                                                        ${datas.exportData.map((item,index) => {
                                                            return GetListViewAsSetSalesItem(item,currency,isViewAsSet,env,userPermissionPrice);
                                                        }).join('')}
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
