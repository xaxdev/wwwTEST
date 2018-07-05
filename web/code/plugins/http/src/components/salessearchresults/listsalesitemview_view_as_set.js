import React, { Component, PropTypes } from 'react';
import ReactImageFallback from 'react-image-fallback';
import numberFormat2digit from '../../utils/convertNumberformatwithcomma2digit';
import numberFormat from '../../utils/convertNumberformat';
import GetSalesPricePermission from '../../utils/getSalesPricePermission';

class ListSalesItemsViewASSet extends Component {
    constructor(props) {
        super(props);

        this.onClickGrid = this.onClickGrid.bind(this);

    }

    onClickGrid = (event) => {
        event.preventDefault();
        this.props.onClickList(event.currentTarget.id);
    }

    render = _ => {
        const { item } = this.props;
        const isItems = item.items != undefined ? item.items.length > 0 ? true : false : false;
        let row = item.items != undefined ? item.items.length + 1 : 0;
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
                                <td>
                                    <div className="list-tagbar-soldout">
                                        <span className="list-tagbar-soldout tagbar-soldout"></span>
                                        <img id={item.reference} src={item.imageThumbnail} width="60" onClick={this.onClickGrid}/>
                                    </div>
                                </td>
                                <td><span id={item.reference} onClick={this.onClickGrid}>{item.reference}</span></td>
                                <td>{subitem.reference}</td>
                                <td>{subitem.description}</td>
                                <td>{subitem.sku}</td>
                                <td>{subitem.hierarchy != undefined ? subitem.hierarchy.split('\\').slice(-1).pop():''}</td>
                                <td>{subitem.company}</td>
                                <td>{subitem.warehouse}</td>
                                <td className="text-right">{numberFormat2digit(subitem.grossWeight)}</td>
                                <td className="text-left">{subitem.stoneDetail == ''?'-':subitem.stoneDetail}</td>
                                <td className={`${(priceSalesCTP) ? '' : ' hidden'}`}>{numberFormat(subitem.actualCost['USD'])}</td>
                                <td className={`${(priceSalesUCP) ? '' : ' hidden'}`}>{numberFormat(subitem.updatedCost['USD'])}</td>
                                <td className={`${(priceSalesRTP) ? '' : ' hidden'}`}>{numberFormat(subitem.price['USD'])}</td>
                            </tr>
                        );
                    })}
                    <tr>
                        <td  colSpan="9" className="bd-lb-white"></td>
                        <td className="font-b fc-000 text-center bg-eb">Total</td>
                        <td className={`font-b fc-000 bg-eb td-text ${(priceSalesCTP) ? '' : ' hidden'}`}>{numberFormat(item.totalActualCost['USD'])}</td>
                        <td className={`font-b fc-000 bg-eb td-text ${(priceSalesUCP) ? '' : ' hidden'}`}>{numberFormat(item.totalUpdatedCost['USD'])}</td>
                        <td className={`font-b fc-000 bg-eb td-text ${(priceSalesRTP) ? '' : ' hidden'}`}>{numberFormat(item.totalPrice['USD'])}</td>
                    </tr>
                    <tr>
                        <td colSpan="13" height="40px" className="bd-tblr-white"></td>
                    </tr>
                </tbody>
            );
        }else if(item.items != undefined && item.items.length != 1){
            return (
                <tbody key={item.reference} id={item.reference}>
                    <tr>
                        <td rowSpan={row}>
                            <div className="list-tagbar-soldout">
                                <span className="list-tagbar-soldout tagbar-soldout"></span>
                                <img id={item.reference} src={item.imageThumbnail} width="60" onClick={this.onClickGrid}/>
                            </div>
                        </td>
                        <td rowSpan={row}><span id={item.reference} onClick={this.onClickGrid}>{item.reference}</span></td>
                    </tr>
                    {item.items.map((subitem,index) => {
                        return (
                            <tr key={index} id={index}>
                                <td>{subitem.reference}</td>
                                <td>{subitem.description}</td>
                                <td>{subitem.sku}</td>
                                <td>{subitem.hierarchy != undefined ? subitem.hierarchy.split('\\').slice(-1).pop():''}</td>
                                <td>{subitem.company}</td>
                                <td>{subitem.warehouse}</td>
                                <td className="text-right">{numberFormat2digit(subitem.grossWeight)}</td>
                                <td className="text-left">{subitem.stoneDetail == ''?'-':subitem.stoneDetail}</td>
                                <td className={`${(priceSalesCTP) ? '' : ' hidden'}`}>{numberFormat(subitem.actualCost['USD'])}</td>
                                <td className={`${(priceSalesUCP) ? '' : ' hidden'}`}>{numberFormat(subitem.updatedCost['USD'])}</td>
                                <td className={`${(priceSalesRTP) ? '' : ' hidden'}`}>{numberFormat(subitem.price['USD'])}</td>
                            </tr>
                        );
                    })}
                    <tr>
                        <td  colSpan="9" className="bd-lb-white"></td>
                        <td className="font-b fc-000 text-center bg-eb">Total</td>
                        <td className={`font-b fc-000 text-right bg-eb td-text ${(priceSalesCTP) ? '' : ' hidden'}`}>{numberFormat(item.totalActualCost['USD'])}</td>
                        <td className={`font-b fc-000 text-right bg-eb td-text ${(priceSalesUCP) ? '' : ' hidden'}`}>{numberFormat(item.totalUpdatedCost['USD'])}</td>
                        <td className={`font-b fc-000 text-right bg-eb td-text ${(priceSalesRTP) ? '' : ' hidden'}`}>{numberFormat(item.totalPrice['USD'])}</td>
                    </tr>
                    <tr>
                        <td colSpan="13" height="40px" className="bd-tblr-white"></td>
                    </tr>
                </tbody>
            );
        }else{
            return (
                <tbody key={item.reference} id={item.reference}>
                    <tr>
                        <td rowSpan={row}>
                            <div className="list-tagbar-soldout">
                                <span className="list-tagbar-soldout tagbar-soldout"></span>
                                <img id={item.reference} src={item.imageThumbnail} width="60" onClick={this.onClickGrid}/>
                            </div>
                        </td>
                        <td rowSpan={row}><span id={item.reference} onClick={this.onClickGrid}>{item.reference}</span></td>
                    </tr>
                    <tr>
                        <td  colSpan="9" className="bd-lb-white"></td>
                        <td className="font-b fc-000 text-center bg-eb">Total</td>
                        <td className={`font-b fc-000 text-right bg-eb td-text ${(priceSalesCTP) ? '' : ' hidden'}`}>
                            {numberFormat(!!item.totalActualCost?item.totalActualCost['USD']:0)}
                        </td>
                        <td className={`font-b fc-000 text-right bg-eb td-text ${(priceSalesUCP) ?'' : ' hidden'}`}>
                            {numberFormat(!!item.totalUpdatedCost?item.totalUpdatedCost['USD']:0)}
                        </td>
                        <td className={`font-b fc-000 text-right bg-eb td-text ${(priceSalesRTP) ? '' : ' hidden'}`}>
                            {numberFormat(!!item.totalPrice?item.totalPrice['USD']:0)}
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="13" height="40px" className="bd-tblr-white"></td>
                    </tr>
                </tbody>
            );
        }
    }
}

module.exports = ListSalesItemsViewASSet
