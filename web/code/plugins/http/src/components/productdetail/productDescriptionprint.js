import React,{PropTypes} from 'react';
import numberFormat from '../../utils/convertNumberformat';
import convertDate from '../../utils/convertDate';
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
    let invoicedDate = convertDate(props.itemCreatedDate);
    let actualCost = numberFormat(props.actualCost[currency]);
    let updatedCost = numberFormat(props.updatedCost[currency]);
    let price = numberFormat(props.price[currency]);
    const userLogin = JSON.parse(sessionStorage.logindata);

    return (
      <div>
        <div style={styles.colmd12}>
          <div style={styles.colmd5}>Item Reference</div>
          <div style={styles.colmd5}>{props.reference}</div>
        </div>
        <div style={styles.colmd12}>
          <div style={styles.colmd5}>Description</div>
          <div style={styles.colmd5}>{props.description}</div>
        </div>
        <div style={(userLogin.permission.price == 'All') ?
            styles.colmd12  : styles.colmdhide}>
          <div style={styles.colmd5}>Actual Cost ({ currency })</div>
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
          <div style={styles.colmd5}>Public Price ({ currency })</div>
          <div style={styles.colmd5}>{ price }</div>
        </div>
        <div style={userLogin.permission.price == 'Updated'
              || userLogin.permission.price == 'All') ?
            styles.colmd12  : styles.colmdhide}>
          <div style={styles.colmd5}>Markup (%)</div>
          <div style={styles.colmd5}>{props.markup}</div>
        </div>
        <div style={styles.colmd12}>
          <div style={styles.colmd5}>Location</div>
          <div style={styles.colmd5}>{props.siteName}</div>
        </div>
        <div style={styles.colmd12}>
          <div style={styles.colmd5}>Warehouse</div>
          <div style={styles.colmd5}>{props.warehouseName}</div>
        </div>
        <div style={styles.colmd12}>
          <div style={styles.colmd5}>Vendor Item Reference</div>
          <div style={styles.colmd5}>{props.venderReference}</div>
        </div>
        <div style={styles.colmd12}>
          <div style={styles.colmd5}>SKU</div>
          <div style={styles.colmd5}>{props.sku}</div>
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
