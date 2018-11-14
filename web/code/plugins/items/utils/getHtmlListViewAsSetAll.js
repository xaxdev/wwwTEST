import numberFormat from './convertNumberformat';
import GetPriceWithCurrency from './getPriceWithCurrency';
import numberFormat2digit from './convertNumberformatwithcomma2digit';
import GetListViewAsSetItem from './getListViewAsSetItem';
import { ColumnsViewAsSet } from './columns'
import filterArray from './filterArray'

export default function GetHTMLViewASSetAll(datas, currency, isViewAsSet, env, userPermissionPrice, titleColumn){
    let tableColumns = [];
    let titleValue = [];

    if (titleColumn.length != 0) {
        const getTitle = filterArray(ColumnsViewAsSet,titleColumn,'value')
        getTitle.map((title) => {
            tableColumns = [...tableColumns, title.label]
            titleValue = [...titleValue, title.value]
        })
    }else{
        ColumnsViewAsSet.map((title) => {
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
                                                    <table style="font-size: 4px; border-spacing: 0;margin:0 auto; width:80%;">
                                                        <thead style="padding:10px 10px; text-align:center; color:#fff; background-color: #383735;  font-weight: normal; font-size: 4px;" id="listViewPrint">
                                                            <tr>
                                                                <th><span>Images</span></th>
                                                                <th><span>Set Product Number</span></th>
                                                                <th><span>Item Reference</span></th>
                                                                ${tableColumns.map((title)=>{
                                                                    return(
                                                                        `<th><span>${title}</span></th>`
                                                                    )
                                                                }).join('')}
                                                                <th><span style="${(userPermissionPrice == 'All') ? '' : 'hidden'}">Group Cost Price (USD)</span></th>
                                                                <th><span style="${(userPermissionPrice == 'Updated' || userPermissionPrice == 'All') ?
                                                                    '' : 'hidden'}">Updated Cost Price (USD)</span></th>
                                                                <th><span style="${(userPermissionPrice == 'Public' || userPermissionPrice == 'Updated'
                                                                    || userPermissionPrice == 'All') ?
                                                                    '' : 'hidden'}">Selling Cost Price (USD)</span></th>
                                                            </tr>
                                                        </thead>
                                                        ${datas.exportData.map((item,index) => {
                                                            return GetListViewAsSetItem(item, currency, isViewAsSet, env, userPermissionPrice, titleValue);
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
