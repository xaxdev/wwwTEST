import React,{PropTypes} from 'react';
import numberFormat from '../../utils/convertNumberformat';
import convertDate from '../../utils/convertDate';
import percentformatFormat from '../../utils/convertMarkpercent';
import convertBlanktodash  from '../../utils/convertBlanktodash';
import convertMarkpercent from '../../utils/convertMarkpercent';
const logindata = sessionStorage.logindata ? JSON.parse(sessionStorage.logindata) : null;
    var styles ={
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
    const currency = logindata.currency;
    let invoicedDate = !!props.id ? convertDate(props.itemCreatedDate) : convertDate(props.createdDate);
    let actualCost = !!props.id ? numberFormat(props.actualCost[currency]): numberFormat(props.totalActualCost['USD']);
    let updatedCost = !!props.id ? numberFormat(props.updatedCost[currency]) : numberFormat(props.totalUpdatedCost['USD']);
    let price = !!props.id ? numberFormat(props.price[currency]) : numberFormat(props.totalPrice['USD']);
    let markUp = convertMarkpercent(props.markup);
    const userLogin = JSON.parse(sessionStorage.logindata);

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
        <div style={(userLogin.permission.price == 'All') ?
            styles.colmd12  : styles.colmdhide}>
          <div style={styles.colmd5}>Cost Price ({ currency })</div>
          <div style={styles.colmd5}>{ actualCost }</div>
        </div>
        <div style={(userLogin.permission.price == 'Updated'
              || userLogin.permission.price == 'All') ?
            styles.colmd12  : styles.colmdhide}>
          <div style={styles.colmd5}>Updated Cost ({ currency })</div>
          <div style={styles.colmd5}>{ updatedCost }</div>
        </div>
        <div style={(userLogin.permission.price == 'Public'
              || userLogin.permission.price == 'Updated'
              || userLogin.permission.price == 'All') ?
            styles.colmd12  : styles.colmdhide}>
          <div style={styles.colmd5}>Retail Price ({ currency })</div>
          <div style={styles.colmd5}>{ price }</div>
        </div>
        <div style={(userLogin.permission.price == 'Updated'
              || userLogin.permission.price == 'All') ?
            styles.colmd12  : styles.colmdhide}>
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
          <div style={styles.colmd5}>Date Created</div>
          <div style={styles.colmd5}>{invoicedDate}</div>
        </div>
      </div>

    );
  }
}


module.exports = Detail
