import React,{PropTypes} from 'react';
import numberFormat from '../../utils/convertNumberformat';
import convertDate from '../../utils/convertDate';
import percentformatFormat from '../../utils/convertMarkpercent';
import convertBlanktodash  from '../../utils/convertBlanktodash';
import convertMarkpercent from '../../utils/convertMarkpercent';
import GetSalesPricePermission from '../../utils/getSalesPricePermission';

const logindata = sessionStorage.logindata ? JSON.parse(sessionStorage.logindata) : null;
const styles ={
    colmd12:{
        width:'100%',
        float:'left'
    },
    colmdhide:{
        display:'none'
    },
    colmd5:{
        width: '50%',
        float:'left',
        lineHeight:'26px'
    }
};
const DetailDescriptionPrint = (props) => {
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
            <div>
                <div style={styles.colmd12}>
                    <div style={styles.colmd5}>Item Reference</div>
                    <div style={styles.colmd5}>{convertBlanktodash(props.reference)}</div>
                </div>
                <div style={styles.colmd12}>
                    <div style={styles.colmd5}>Description</div>
                    <div style={styles.colmd5}>{convertBlanktodash(props.description)}</div>
                </div>
                <div style={(priceSalesCTP) ? styles.colmd12  : styles.colmdhide}>
                    <div style={styles.colmd5}>Cost Price ({ currency })</div>
                    <div style={styles.colmd5}>{ actualCost }</div>
                </div>
                <div style={(priceSalesUCP) ? styles.colmd12  : styles.colmdhide}>
                    <div style={styles.colmd5}>Updated Cost ({ currency })</div>
                    <div style={styles.colmd5}>{ updatedCost }</div>
                </div>
                <div style={(priceSalesRTP) ? styles.colmd12  : styles.colmdhide}>
                    <div style={styles.colmd5}>Price ({ currency })</div>
                    <div style={styles.colmd5}>{ price }</div>
                </div>
                <div style={(priceSalesNSP) ? styles.colmd12  : styles.colmdhide}>
                    <div style={styles.colmd5}>Net Sales ({ currency })</div>
                    <div style={styles.colmd5}>{ netSales }</div>
                </div>
                <div style={(priceSalesMGP) ? styles.colmd12  : styles.colmdhide}>
                    <div style={styles.colmd5}>Margin %</div>
                    <div style={styles.colmd5}>{ marginPercent }</div>
                </div>
                <div style={(priceSalesMGP) ? styles.colmd12  : styles.colmdhide}>
                    <div style={styles.colmd5}>Margin Amount ({ currency })</div>
                    <div style={styles.colmd5}>{ marginAmount }</div>
                </div>
                <div style={(priceSalesDSP) ? styles.colmd12  : styles.colmdhide}>
                    <div style={styles.colmd5}>Discount % </div>
                    <div style={styles.colmd5}>{ discountPercent }</div>
                </div>
                <div style={(priceSalesDSP) ? styles.colmd12  : styles.colmdhide}>
                    <div style={styles.colmd5}>Discount Amount ({ currency })</div>
                    <div style={styles.colmd5}>{ discount }</div>
                </div>
                <div style={(priceSalesUCP) ?styles.colmd12  : styles.colmdhide}>
                    <div style={styles.colmd5}>Markup (Times)</div>
                    <div style={styles.colmd5}>{markUp}</div>
                </div>
                <div style={styles.colmd12}>
                    <div style={styles.colmd5}>Company</div>
                    <div style={styles.colmd5}>{convertBlanktodash(props.companyName)}</div>
                </div>
                <div style={styles.colmd12}>
                    <div style={styles.colmd5}>Location</div>
                    <div style={styles.colmd5}>{convertBlanktodash(props.warehouseName)}</div>
                </div>
                <div style={styles.colmd12}>
                    <div style={styles.colmd5}>Vendor Item Reference</div>
                    <div style={styles.colmd5}>{convertBlanktodash(props.venderReference)}</div>
                </div>
                <div style={styles.colmd12}>
                    <div style={styles.colmd5}>SKU</div>
                    <div style={styles.colmd5}>{convertBlanktodash(props.sku)}</div>
                </div>
                <div style={styles.colmd12}>
                    <div style={styles.colmd5}>Set Reference Number</div>
                    <div style={styles.colmd5}>{convertBlanktodash(setReference)}</div>
                </div>
                <div style={styles.colmd12}>
                    <div style={styles.colmd5}>Date Created</div>
                    <div style={styles.colmd5}>{dateCreate}</div>
                </div>
                <div style={styles.colmd12}>
                    <div style={styles.colmd5}>Channel</div>
                    <div style={styles.colmd5}>{convertBlanktodash(props.salesChannelName)}</div>
                </div>
                <div style={styles.colmd12}>
                    <div style={styles.colmd5}>Customer Name & ID</div>
                    <div style={styles.colmd5}>{convertBlanktodash(props.customerName) - convertBlanktodash(props.customer)}</div>
                </div>
                <div style={styles.colmd12}>
                    <div style={styles.colmd5}>Invoiced Date</div>
                    <div style={styles.colmd5}>{invoicedDate}</div>
                </div>
                <div style={styles.colmd12}>
                    <div style={styles.colmd5}>Invoice No</div>
                    <div style={styles.colmd5}>{convertBlanktodash(props.invoicedId)}</div>
                </div>
                <div style={styles.colmd12}>
                    <div style={styles.colmd5}>Sales Person Name</div>
                    <div style={styles.colmd5}>{convertBlanktodash(props.salesPersonName)}</div>
                </div>
            </div>
        );
    }
}

module.exports = DetailDescriptionPrint
