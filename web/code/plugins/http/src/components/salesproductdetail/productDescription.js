import React from 'react';
import numberFormat from '../../utils/convertNumberformat';
import convertDate from '../../utils/convertDate';
import convertMarkpercent from '../../utils/convertMarkpercent';
import GetSalesPricePermission from '../../utils/getSalesPricePermission';
const logindata = sessionStorage.logindata ? JSON.parse(sessionStorage.logindata) : null;

const DetailDescription = (props) => {
    if(logindata){
        const userLogin = JSON.parse(sessionStorage.logindata);
        const priceSalesRTP = GetSalesPricePermission(userLogin.permission.priceSales).priceSalesRTP;
        const priceSalesUCP = GetSalesPricePermission(userLogin.permission.priceSales).priceSalesUCP;
        const priceSalesCTP = GetSalesPricePermission(userLogin.permission.priceSales).priceSalesCTP;
        const priceSalesNSP = GetSalesPricePermission(userLogin.permission.priceSales).priceSalesNSP;
        const priceSalesMGP = GetSalesPricePermission(userLogin.permission.priceSales).priceSalesMGP;
        const priceSalesDSP = GetSalesPricePermission(userLogin.permission.priceSales).priceSalesDSP;
        const currency = 'USD';

        let invoicedDate = !!props.id ? !!props.invoiceDate?convertDate(props.invoiceDate):'' : convertDate(props.invoiceDate);
        let actualCost = !!props.id ? numberFormat(props.actualCost[currency]): numberFormat(!!props.totalActualCost?props.totalActualCost['USD']:0);
        let updatedCost = !!props.id ? numberFormat(props.updatedCost[currency]) : numberFormat(!!props.totalUpdatedCost?props.totalUpdatedCost['USD']:0);
        let price = !!props.id ? numberFormat(props.price[currency]) : numberFormat(!!props.totalPrice?props.totalPrice['USD']:0);
        let netSales = !!props.id ? numberFormat(!!props.netAmount?props.netAmount[currency]:0) : numberFormat(!!props.totalNetAmount?props.totalNetAmount['USD']:0);
        let discount = !!props.id ? numberFormat(!!props.discountAmountUSD?props.discountAmountUSD:0) : numberFormat(!!props.totalDiscountAmount?props.totalDiscountAmount['USD']:0);
        let discountPercent = !!props.id ? numberFormat(!!props.discountPercent?props.discountPercent:0) : numberFormat(!!props.totalDiscountPercent?props.totalDiscountPercent:0);
        let marginAmount = !!props.id ? numberFormat(!!props.margin?props.margin[currency]:0) : numberFormat(!!props.totalMargin?props.totalMargin['USD']:0);
        let marginPercent = !!props.id ? numberFormat(!!props.marginPercent?props.marginPercent:0) : numberFormat(!!props.totalMarginPercent?props.totalMarginPercent:0);
        let markUp = convertMarkpercent(props.markup);
        let setReference = (props.setReference != undefined ) ? props.setReference : '-';
        setReference = (setReference != '' ) ? setReference : '-';
        let dateCreate = !!props.id ? convertDate(props.itemCreatedDate) : convertDate(props.postedDate);

        return (
            <div className="line-h">
                <div className="col-md-12 col-sm-12 nopadding">
                    <div className="col-md-4 col-sm-4 nopadding font-b">Item Reference</div>
                    <div className="col-md-8 col-sm-8">{props.reference}</div>
                </div>
                <div className="col-md-12 col-sm-12 nopadding">
                    <div className="col-md-4 col-sm-4 nopadding font-b">SKU</div>
                    <div className="col-md-8 col-sm-8">{props.sku}</div>
                </div>
                <div className="col-md-12 col-sm-12 nopadding">
                    <div className="col-md-4 col-sm-4 nopadding font-b">Set Reference Number</div>
                    <div className="col-md-8 col-sm-8">{setReference}</div>
                </div>
                <div className="col-md-12 col-sm-12 nopadding">
                    <div className="col-md-4 col-sm-4 nopadding font-b">Description</div>
                    <div className="col-md-8 col-sm-8 text-wrap">{props.description}</div>
                </div>
                <div className={`col-md-12 col-sm-12 nopadding ${(priceSalesCTP) ? '' : 'hidden'}`}>
                    <div className="col-md-4 col-sm-4 nopadding font-b">Initial Cost ({ currency })</div>
                    <div className="col-md-8 col-sm-8">{ actualCost }</div>
                </div>
                <div className={`col-md-12 col-sm-12 nopadding ${(priceSalesUCP) ? '' : 'hidden'}`}>
                    <div className="col-md-4 col-sm-4 nopadding font-b">Updated Cost ({ currency })</div>
                    <div className="col-md-8 col-sm-8">{ updatedCost }</div>
                </div>
                <div className={`col-md-12 col-sm-12 nopadding ${(priceSalesRTP) ? '' : 'hidden'}`}>
                    <div className="col-md-4 col-sm-4 nopadding font-b">Retail Price ({ currency })</div>
                    <div className="col-md-8 col-sm-8">{ price }</div>
                </div>
                <div className={`col-md-12 col-sm-12 nopadding ${(priceSalesUCP) ? '' : 'hidden'}`}>
                    <div className="col-md-4 col-sm-4 nopadding font-b">Markup (Times)</div>
                    <div className="col-md-8 col-sm-8">{markUp}</div>
                </div>
                <div className={`col-md-12 col-sm-12 nopadding ${(priceSalesDSP) ? '' : 'hidden'}`}>
                    <div className="col-md-4 col-sm-4 nopadding font-b">Discount Amount ({ currency })</div>
                    <div className="col-md-8 col-sm-8">{ discount }</div>
                </div>
                <div className={`col-md-12 col-sm-12 nopadding ${(priceSalesDSP) ? '' : 'hidden'}`}>
                    <div className="col-md-4 col-sm-4 nopadding font-b">Discount % </div>
                    <div className="col-md-8 col-sm-8">{ discountPercent }</div>
                </div>
                <div className={`col-md-12 col-sm-12 nopadding ${(priceSalesMGP) ? '' : 'hidden'}`}>
                    <div className="col-md-4 col-sm-4 nopadding font-b">Margin Amount ({ currency })</div>
                    <div className="col-md-8 col-sm-8">{ marginAmount }</div>
                </div>
                <div className={`col-md-12 col-sm-12 nopadding ${(priceSalesMGP) ? '' : 'hidden'}`}>
                    <div className="col-md-4 col-sm-4 nopadding font-b">Margin %</div>
                    <div className="col-md-8 col-sm-8">{ marginPercent }</div>
                </div>
                <div className={`col-md-12 col-sm-12 nopadding ${(priceSalesNSP) ? '' : 'hidden'}`}>
                    <div className="col-md-4 col-sm-4 nopadding font-b">Net Sales ({ currency })</div>
                    <div className="col-md-8 col-sm-8">{ netSales }</div>
                </div>
                <div className="col-md-12 col-sm-12 nopadding">
                    <div className="col-md-4 col-sm-4 nopadding font-b">Location</div>
                    <div className="col-md-8 col-sm-8">{props.warehouseName}</div>
                </div>
                <div className="col-md-12 col-sm-12 nopadding">
                    <div className="col-md-4 col-sm-4 nopadding font-b">Company</div>
                    <div className="col-md-8 col-sm-8">{props.companyName}</div>
                </div>
                <div className="col-md-12 col-sm-12 nopadding">
                    <div className="col-md-4 col-sm-4 nopadding font-b">Vendor Item Reference</div>
                    <div className="col-md-8 col-sm-8">{props.venderReference}</div>
                </div>
                <div className="col-md-12 col-sm-12 nopadding">
                    <div className="col-md-4 col-sm-4 nopadding font-b">Channel</div>
                    <div className="col-md-8 col-sm-8">{props.salesChannelName}</div>
                </div>
                <div className="col-md-12 col-sm-12 nopadding">
                    <div className="col-md-4 col-sm-4 nopadding font-b">Customer Name & ID</div>
                    <div className="col-md-8 col-sm-8">{props.customerName} - {props.customer}</div>
                </div>
                <div className="col-md-12 col-sm-12 nopadding">
                    <div className="col-md-4 col-sm-4 nopadding font-b">Invoice Date</div>
                    <div className="col-md-8 col-sm-8">{invoicedDate}</div>
                </div>
                <div className="col-md-12 col-sm-12 nopadding">
                    <div className="col-md-4 col-sm-4 nopadding font-b">Invoice No</div>
                    <div className="col-md-8 col-sm-8">{props.invoicedId}</div>
                </div>
                <div className="col-md-12 col-sm-12 nopadding">
                    <div className="col-md-4 col-sm-4 nopadding font-b">Sales Person Name</div>
                    <div className="col-md-8 col-sm-8">{props.salesPersonName}</div>
                </div>
                <div className="col-md-12 col-sm-12 nopadding">
                    <div className="col-md-4 col-sm-4 nopadding font-b">Manufactory Date</div>
                    <div className="col-md-8 col-sm-8">{dateCreate}</div>
                </div>
            </div>
        );
    }
}


module.exports = DetailDescription
