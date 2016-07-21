import React,{PropTypes} from 'react';
import numberFormat from '../../utils/convertNumberformat';
import percentformatFormat from '../../utils/convertMarkpercent';
import convertDate from '../../utils/convertDate';
const logindata = sessionStorage.logindata ? JSON.parse(sessionStorage.logindata) : null;

// console.log("logindata -->",logindata);
const Detail = (props) =>{
  if(logindata){
    const currency = logindata.currency;
    let invoicedDate = convertDate(props.itemCreatedDate);
    let actualCost = numberFormat(props.actualCost[currency]);
    let updatedCost = numberFormat(props.updatedCost[currency]);
    let price = numberFormat(props.price[currency]);
    let markUp = percentformatFormat(props.markup);
    const userLogin = JSON.parse(sessionStorage.logindata);

    return (
      <div className="line-h">
        <div className="col-md-12 col-sm-12 nopadding">
          <div className="col-md-4 col-sm-4 nopadding font-b">Item Reference</div>
          <div className="col-md-8 col-sm-8">{props.reference}</div>
        </div>
        <div className="col-md-12 col-sm-12 nopadding">
          <div className="col-md-4 col-sm-4 nopadding font-b">Description</div>
          <div className="col-md-8 col-sm-8">{props.description}</div>
        </div>
        <div className={`col-md-12 col-sm-12 nopadding ${(userLogin.permission.price == 'All') ?
            '' : 'hidden'}`}>
          <div className="col-md-4 col-sm-4 nopadding font-b">Actual Cost ({ currency })</div>
          <div className="col-md-8 col-sm-8">{ actualCost }</div>
        </div>
        <div className={`col-md-12 col-sm-12 nopadding ${(userLogin.permission.price == 'Updated'
              || userLogin.permission.price == 'All') ?
            '' : 'hidden'}`}>
          <div className="col-md-4 col-sm-4 nopadding font-b">Updated Cost ({ currency })</div>
          <div className="col-md-8 col-sm-8">{ updatedCost }</div>
        </div>
        <div className={`col-md-12 col-sm-12 nopadding ${(userLogin.permission.price == 'Public'
              || userLogin.permission.price == 'Updated'
              || userLogin.permission.price == 'All') ?
            '' : 'hidden'}`}>
          <div className="col-md-4 col-sm-4 nopadding font-b">Public Price ({ currency })</div>
          <div className="col-md-8 col-sm-8">{ price }</div>
        </div>
        <div className={`col-md-12 col-sm-12 nopadding ${(userLogin.permission.price == 'Updated'
              || userLogin.permission.price == 'All') ?
            '' : 'hidden'}`}>
          <div className="col-md-4 col-sm-4 nopadding font-b">Markup (%)</div>
          <div className="col-md-8 col-sm-8">{markUp}</div>
        </div>
        <div className="col-md-12 col-sm-12 nopadding">
          <div className="col-md-4 col-sm-4 nopadding font-b">Location</div>
          <div className="col-md-8 col-sm-8">{props.siteName}</div>
        </div>
        <div className="col-md-12 col-sm-12 nopadding">
          <div className="col-md-4 col-sm-4 nopadding font-b">Warehouse</div>
          <div className="col-md-8 col-sm-8">{props.warehouseName}</div>
        </div>
        <div className="col-md-12 col-sm-12 nopadding">
          <div className="col-md-4 col-sm-4 nopadding font-b">Vendor Item Reference</div>
          <div className="col-md-8 col-sm-8">{props.venderReference}</div>
        </div>
        <div className="col-md-12 col-sm-12 nopadding">
          <div className="col-md-4 col-sm-4 nopadding font-b">SKU</div>
          <div className="col-md-8 col-sm-8">{props.sku}</div>
        </div>
        <div className="col-md-12 col-sm-12 nopadding">
          <div className="col-md-4 col-sm-4 nopadding font-b">Date Created</div>
          <div className="col-md-8 col-sm-8">{invoicedDate}</div>
        </div>
      </div>

    );
  }
}


module.exports = Detail
