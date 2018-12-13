import React,{PropTypes} from 'react';
import numberFormat from '../../utils/convertNumberformat';
import convertDate from '../../utils/convertDate';
import percentformatFormat from '../../utils/convertMarkpercent';
import convertBlanktodash  from '../../utils/convertBlanktodash';
import convertMarkpercent from '../../utils/convertMarkpercent';

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

const Detail = (props) =>{
    if(logindata){
        let invoicedDate = convertDate(props.invoiceDate);
        const userLogin = JSON.parse(sessionStorage.logindata);
        return (
            <div>
                <div style={styles.colmd12}>
                    <div style={styles.colmd5}>Item Reference</div>
                    <div style={styles.colmd5}>{convertBlanktodash(props.reference)}</div>
                </div>
                <div style={styles.colmd12}>
                    <div style={styles.colmd5}>Description</div>
                    <div style={styles.colmd5}>{convertBlanktodash(props.name)}</div>
                </div>
                <div style={styles.colmd12}>
                    <div style={styles.colmd5}>Company</div>
                    <div style={styles.colmd5}>{convertBlanktodash(props.companyName)}</div>
                </div>
                <div style={styles.colmd12}>
                    <div style={styles.colmd5}>Boutique</div>
                    <div style={styles.colmd5}>{convertBlanktodash(props.warehouseName)}</div>
                </div>
                <div style={styles.colmd12}>
                    <div style={styles.colmd5}>Laboratory</div>
                    <div style={styles.colmd5}>{convertBlanktodash(props.agency)}</div>
                </div>
                <div style={styles.colmd12}>
                    <div style={styles.colmd5}>SKU</div>
                    <div style={styles.colmd5}>{convertBlanktodash(props.sku)}</div>
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
