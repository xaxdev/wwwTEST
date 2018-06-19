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
const Detail = (props) => {
    if(logindata){
        const userLogin = JSON.parse(sessionStorage.logindata);
        const priceSalesRTP = GetSalesPricePermission(userLogin.permission.priceSales).priceSalesRTP;
        const priceSalesUCP = GetSalesPricePermission(userLogin.permission.priceSales).priceSalesUCP;
        const priceSalesCTP = GetSalesPricePermission(userLogin.permission.priceSales).priceSalesCTP;
        const priceSalesNSP = GetSalesPricePermission(userLogin.permission.priceSales).priceSalesNSP;
        const priceSalesMGP = GetSalesPricePermission(userLogin.permission.priceSales).priceSalesMGP;
        const priceSalesDSP = GetSalesPricePermission(userLogin.permission.priceSales).priceSalesDSP;
        const currency = 'USD';

        let invoicedDate = !!props.id ? convertDate(props.invoiceDate) : convertDate(props.invoiceDate);
        let actualCost = !!props.id ? numberFormat(props.actualCost[currency]): numberFormat(props.totalActualCost['USD']);
        let updatedCost = !!props.id ? numberFormat(props.updatedCost[currency]) : numberFormat(props.totalUpdatedCost['USD']);
        let price = !!props.id ? numberFormat(props.price[currency]) : numberFormat(props.totalPrice['USD']);
        let netSales = !!props.id ? numberFormat(props.netAmount[currency]) : numberFormat(props.totalNetAmount['USD']);
        let discount = !!props.id ? numberFormat(props.discountAmountUSD) : numberFormat(props.totalDiscountAmount['USD']);
        let discountPercent = !!props.id ? numberFormat(props.discPercent) : numberFormat(props.discPercent);
        let marginAmount = !!props.id ? numberFormat(props.margin[currency]) : numberFormat(props.totalMargin['USD']);
        let markUp = convertMarkpercent(props.markup);
        let setReference = (props.setReference != undefined ) ? props.setReference : '-';
        setReference = (setReference != '' ) ? setReference : '-';

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
                    <div style={styles.colmd5}>Retail Price ({ currency })</div>
                    <div style={styles.colmd5}>{ price }</div>
                </div>
                <div style={(priceSalesNSP) ? styles.colmd12  : styles.colmdhide}>
                    <div style={styles.colmd5}>Net Sales ({ currency })</div>
                    <div style={styles.colmd5}>{ netSales }</div>
                </div>
                <div style={(priceSalesDSP) ? styles.colmd12  : styles.colmdhide}>
                    <div style={styles.colmd5}>Discount Amount ({ currency })</div>
                    <div style={styles.colmd5}>{ discount }</div>
                </div>
                <div style={(priceSalesDSP) ? styles.colmd12  : styles.colmdhide}>
                    <div style={styles.colmd5}>Discount % </div>
                    <div style={styles.colmd5}>{ discountPercent }</div>
                </div>
                <div style={(priceSalesMGP) ? styles.colmd12  : styles.colmdhide}>
                    <div style={styles.colmd5}>Margin Amount ({ currency })</div>
                    <div style={styles.colmd5}>{ marginAmount }</div>
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
                    <div style={styles.colmd5}>Invoice Id</div>
                    <div style={styles.colmd5}>{convertBlanktodash(props.invoicedId)}</div>
                </div>
                <div style={styles.colmd12}>
                    <div style={styles.colmd5}>Customer Name</div>
                    <div style={styles.colmd5}>{convertBlanktodash(props.customerName)}</div>
                </div>
                <div style={styles.colmd12}>
                    <div style={styles.colmd5}>Sales Name</div>
                    <div style={styles.colmd5}>{convertBlanktodash(props.salesPersonName)}</div>
                </div>
                <div style={styles.colmd12}>
                    <div style={styles.colmd5}>Sales Channel</div>
                    <div style={styles.colmd5}>{convertBlanktodash(props.salesChannelType)}</div>
                </div>
                <div style={styles.colmd12}>
                    <div style={styles.colmd5}>Invoiced Date</div>
                    <div style={styles.colmd5}>{invoicedDate}</div>
                </div>
            </div>
        );
    }
}

module.exports = Detail
