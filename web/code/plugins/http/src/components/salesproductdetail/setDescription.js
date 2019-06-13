import React from 'react';
import numberFormat from '../../utils/convertNumberformat';
import convertDate from '../../utils/convertDate';
import convertMarkpercent from '../../utils/convertMarkpercent';
import GetSalesPricePermission from '../../utils/getSalesPricePermission';
const logindata = sessionStorage.logindata ? JSON.parse(sessionStorage.logindata) : null;

const SetDetail = (props) =>{
    if(logindata){
        const userLogin = JSON.parse(sessionStorage.logindata);
        const priceSalesRTP = GetSalesPricePermission(userLogin.permission.priceSales).priceSalesRTP;
        const priceSalesUCP = GetSalesPricePermission(userLogin.permission.priceSales).priceSalesUCP;
        const priceSalesCTP = GetSalesPricePermission(userLogin.permission.priceSales).priceSalesCTP;
        const priceSalesNSP = GetSalesPricePermission(userLogin.permission.priceSales).priceSalesNSP;
        const priceSalesMGP = GetSalesPricePermission(userLogin.permission.priceSales).priceSalesMGP;
        const priceSalesDSP = GetSalesPricePermission(userLogin.permission.priceSales).priceSalesDSP;

        let invoicedDate = props.invoiceDate != undefined ? convertDate(props.invoiceDate): '-';
        let actualCost = props.totalActualCost != undefined ? numberFormat(props.totalActualCost['USD']): '-';
        let updatedCost = props.totalUpdatedCost != undefined ? numberFormat(props.totalUpdatedCost['USD']): '-';
        let price = props.totalPrice != undefined ? numberFormat(props.totalPrice['USD']): '-';
        let netSales = props.totalNetAmount != undefined ? numberFormat(props.totalNetAmount['USD']): '-';
        let discount = props.totalDiscountAmount != undefined ? numberFormat(props.totalDiscountAmount['USD']): '-';
        let marginAmount = props.totalMargin != undefined ? numberFormat(props.totalMargin['USD']): '-';
        let markUp = props.markup != undefined ? convertMarkpercent(props.markup): '-';
        let setReference = (props.setReference != undefined ) ? props.setReference : '-';
        setReference = (setReference != '' ) ? setReference : '-';

        return (
            <div className="line-h">
                <div className="col-md-12 col-sm-12 nopadding">
                    <div className="col-md-4 col-sm-4 nopadding font-b">Item Reference</div>
                    <div className="col-md-8 col-sm-8">{props.reference != undefined ? props.reference: '-'}</div>
                </div>
                <div className="col-md-12 col-sm-12 nopadding">
                    <div className="col-md-4 col-sm-4 nopadding font-b">Description</div>
                    <div className="col-md-8 col-sm-8 text-wrap">{props.description != undefined ? props.description: '-'}</div>
                </div>
                <div className={`col-md-12 col-sm-12 nopadding ${(priceSalesCTP) ? '' : 'hidden'}`}>
                    <div className="col-md-4 col-sm-4 nopadding font-b">Total Initial Cost (USD)</div>
                    <div className="col-md-8 col-sm-8">{ actualCost }</div>
                </div>
                <div className={`col-md-12 col-sm-12 nopadding ${(priceSalesUCP) ? '' : 'hidden'}`}>
                    <div className="col-md-4 col-sm-4 nopadding font-b">Total Updated Cost (USD)</div>
                    <div className="col-md-8 col-sm-8">{ updatedCost }</div>
                </div>
                <div className={`col-md-12 col-sm-12 nopadding ${(priceSalesRTP) ? '' : 'hidden'}`}>
                    <div className="col-md-4 col-sm-4 nopadding font-b">Total Retail Price (USD)</div>
                    <div className="col-md-8 col-sm-8">{ price }</div>
                </div>
                <div className={`col-md-12 col-sm-12 nopadding ${(priceSalesNSP) ? '' : 'hidden'}`}>
                    <div className="col-md-4 col-sm-4 nopadding font-b">Total Net Sales (USD)</div>
                    <div className="col-md-8 col-sm-8">{ netSales }</div>
                </div>
                <div className={`col-md-12 col-sm-12 nopadding ${(priceSalesDSP) ? '' : 'hidden'}`}>
                    <div className="col-md-4 col-sm-4 nopadding font-b">Total Discount Amount (USD)</div>
                    <div className="col-md-8 col-sm-8">{ discount }</div>
                </div>
                <div className={`col-md-12 col-sm-12 nopadding ${(priceSalesMGP) ? '' : 'hidden'}`}>
                    <div className="col-md-4 col-sm-4 nopadding font-b">Total Margin Amount (USD)</div>
                    <div className="col-md-8 col-sm-8">{ marginAmount }</div>
                </div>
                <div className={`col-md-12 col-sm-12 nopadding ${(priceSalesUCP) ? '' : 'hidden'}`}>
                    <div className="col-md-4 col-sm-4 nopadding font-b">Markup (Times)</div>
                    <div className="col-md-8 col-sm-8">{markUp}</div>
                </div>
                <div className="col-md-12 col-sm-12 nopadding">
                    <div className="col-md-4 col-sm-4 nopadding font-b">Company</div>
                    <div className="col-md-8 col-sm-8">{props.companyName != undefined ? props.companyName: '-'}</div>
                </div>
                <div className="col-md-12 col-sm-12 nopadding">
                    <div className="col-md-4 col-sm-4 nopadding font-b">Boutique</div>
                    <div className="col-md-8 col-sm-8">{props.warehouseName != undefined ? props.warehouseName: '-'}</div>
                </div>
                <div className="col-md-12 col-sm-12 nopadding">
                    <div className="col-md-4 col-sm-4 nopadding font-b">Date Created</div>
                    <div className="col-md-8 col-sm-8">{invoicedDate}</div>
                </div>
            </div>
        );
    }
}

module.exports = SetDetail
