import React, { Component, PropTypes } from 'react';
import ReactImageFallback from 'react-image-fallback';
import numberFormat2digit from '../../utils/convertNumberformatwithcomma2digit';
import numberFormat from '../../utils/convertNumberformat';
import GetSalesPricePermission from '../../utils/getSalesPricePermission';

class ListSalesItemsViewASSetPrint extends Component {
    constructor(props) {
        super(props);
    }

    render(){
        const { item } = this.props;
        const isItems = item.items != undefined ? item.items.length > 0 ? true : false : false;
        let row = item.items != undefined ? item.items.length +1 : 0;
        const userLogin = JSON.parse(sessionStorage.logindata);
        const priceSalesRTP = GetSalesPricePermission(userLogin.permission.priceSales).priceSalesRTP;
        const priceSalesUCP = GetSalesPricePermission(userLogin.permission.priceSales).priceSalesUCP;
        const priceSalesCTP = GetSalesPricePermission(userLogin.permission.priceSales).priceSalesCTP;
        const priceSalesNSP = GetSalesPricePermission(userLogin.permission.priceSales).priceSalesNSP;
        const priceSalesMGP = GetSalesPricePermission(userLogin.permission.priceSales).priceSalesMGP;
        const priceSalesDSP = GetSalesPricePermission(userLogin.permission.priceSales).priceSalesDSP;

        if (item.items != undefined && item.items.length == 1) {
            return (
                <tbody key={item.reference} id={item.reference}>
                    {item.items.map((subitem) => {
                        return (
                            <tr key={subitem.reference} id={subitem.reference}>
                                <td className="tdd"><img src={item.imageThumbnail} width="60"/></td>
                                <td className="tdd">{item.reference}</td>
                                <td className="tdd">{subitem.reference}</td>
                                <td className="tdd">{subitem.description}</td>
                                <td className="tdd">{subitem.sku}</td>
                                <td className="tdd">{subitem.hierarchy != undefined ? subitem.hierarchy.split('\\').slice(-1).pop():''}</td>
                                <td className="tdd">{subitem.company}</td>
                                <td className="tdd">{subitem.warehouse}</td>
                                <td className="tdd">{numberFormat2digit(subitem.grossWeight)}</td>
                                <td className="tdd">{subitem.stoneDetail == ''?'-':subitem.stoneDetail}</td>
                                <td className={`tdd${(priceSalesCTP) ? '' : ' hidden'}`}>{numberFormat(subitem.actualCost['USD'])}</td>
                                <td className={`tdd${(priceSalesUCP) ? '' : ' hidden'}`}>{numberFormat(subitem.updatedCost['USD'])}</td>
                                <td className={`tdd${(priceSalesRTP) ? '' : ' hidden'}`}>{numberFormat(subitem.price['USD'])}</td>
                            </tr>
                        );
                    })}
                    <tr>
                        <td colSpan="9" className="bd-lb-white"></td>
                        <td className="font-b fc-000 text-center bg-eb">Total</td>
                        <td className={`font-b fc-000 text-right bg-eb${(priceSalesCTP) ? '' : ' hidden'}`}>{numberFormat(item.totalActualCost['USD'])}</td>
                        <td className={`font-b fc-000 text-right bg-eb${(priceSalesUCP) ? '' : ' hidden'}`}>{numberFormat(item.totalUpdatedCost['USD'])}</td>
                        <td className={`font-b fc-000 text-right bg-eb${(priceSalesRTP) ? '' : ' hidden'}`}>{numberFormat(item.totalPrice['USD'])}</td>
                    </tr>
                    <tr>
                        <td className="bd-tblr-white" colSpan="12" height="40px" ></td>
                    </tr>
                </tbody>
            );
        }else if(item.items != undefined && item.items.length != 1){
            return (
                <tbody key={item.reference} id={item.reference}>
                    <tr>
                        <td className="tdd" rowSpan={row}><img src={item.imageThumbnail} width="60"/></td>
                        <td className="tdd" rowSpan={row}>{item.reference}</td>
                    </tr>
                    {item.items.map((subitem,index) => {
                        return (
                            <tr key={index} id={index}>
                                <td className="tdd">{subitem.reference}</td>
                                <td className="tdd">{subitem.description}</td>
                                <td className="tdd">{subitem.sku}</td>
                                <td className="tdd">{subitem.hierarchy != undefined ? subitem.hierarchy.split('\\').slice(-1).pop():''}</td>
                                <td className="tdd">{subitem.company}</td>
                                <td className="tdd">{subitem.warehouse}</td>
                                <td className="tdd">{numberFormat2digit(subitem.grossWeight)}</td>
                                <td className="tdd">{subitem.stoneDetail == ''?'-':subitem.stoneDetail}</td>
                                <td className={`tdd${(priceSalesCTP) ? '' : ' hidden'}`}>{numberFormat(subitem.actualCost['USD'])}</td>
                                <td className={`tdd${(priceSalesUCP) ? '' : ' hidden'}`}>{numberFormat(subitem.updatedCost['USD'])}</td>
                                <td className={`tdd${(priceSalesRTP) ? '' : ' hidden'}`}>{numberFormat(subitem.price['USD'])}</td>
                            </tr>
                        );
                    })}
                    <tr>
                        <td  colSpan="9" className="bd-lb-white"></td>
                        <td className="font-b fc-000 text-center bg-eb">Total</td>
                        <td className={`font-b fc-000 text-right bg-eb${(priceSalesCTP) ? '' : ' hidden'}`}>{numberFormat(item.totalActualCost['USD'])}</td>
                        <td className={`font-b fc-000 text-right bg-eb${(priceSalesUCP) ? '' : ' hidden'}`}>{numberFormat(item.totalUpdatedCost['USD'])}</td>
                        <td className={`font-b fc-000 text-right bg-eb${(priceSalesRTP) ? '' : ' hidden'}`}>{numberFormat(item.totalPrice['USD'])}</td>
                    </tr>
                    <tr>
                        <td className="bd-tblr-white" colSpan="12" height="40px" ></td>
                    </tr>
                </tbody>
            );
        }else{
            return (
                <tbody>
                    <tr>
                        <td className="tdd" rowSpan={row}><img src={item.imageThumbnail} width="60"/></td>
                        <td className="tdd" rowSpan={row}>{item.reference}</td>
                    </tr>
                    <tr>
                        <td  colSpan="9" className="bd-lb-white"></td>
                        <td className="font-b fc-000 text-center bg-eb">Total</td>
                        <td className={`font-b fc-000 text-right bg-eb${(priceSalesCTP) ? '' : ' hidden'}`}>
                            {numberFormat(!!item.totalActualCost?item.totalActualCost['USD']:0)}
                        </td>
                        <td className={`font-b fc-000 text-right bg-eb${(priceSalesUCP) ? '' : ' hidden'}`}>
                            {numberFormat(!!item.totalUpdatedCost?item.totalUpdatedCost['USD']:0)}
                        </td>
                        <td className={`font-b fc-000 text-right bg-eb${(priceSalesRTP) ? '' : ' hidden'}`}>
                            {numberFormat(!!item.totalPrice?item.totalPrice['USD']:0)}
                        </td>
                    </tr>
                    <tr>
                        <td className="bd-tblr-white" colSpan="12" height="40px" ></td>
                    </tr>
                </tbody>
            );
        }
    }
}

module.exports = ListSalesItemsViewASSetPrint
