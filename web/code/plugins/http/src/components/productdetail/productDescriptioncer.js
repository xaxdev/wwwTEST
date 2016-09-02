import React,{PropTypes} from 'react';
import numberFormat from '../../utils/convertNumberformat';
import percentformatFormat from '../../utils/convertMarkpercent';
import convertDate from '../../utils/convertDate';
import convertBlanktodash  from '../../utils/convertBlanktodash';
import convertMarkpercent from '../../utils/convertMarkpercent';
const logindata = sessionStorage.logindata ? JSON.parse(sessionStorage.logindata) : null;

const Detail = (props) =>{
  if(logindata){
    const currency = logindata.currency;
    let invoicedDate = convertDate(props.certifiedDate);
    const userLogin = JSON.parse(sessionStorage.logindata);

    return (
      <div className="line-h">
        <div className="col-md-12 col-sm-12 nopadding">
          <div className="col-md-4 col-sm-4 nopadding font-b">Item Reference</div>
          <div className="col-md-8 col-sm-8">{props.reference}</div>
        </div>
        <div className="col-md-12 col-sm-12 nopadding">
          <div className="col-md-4 col-sm-4 nopadding font-b">Description</div>
          <div className="col-md-8 col-sm-8 text-wrap">{props.name}</div>
        </div>
        <div className="col-md-12 col-sm-12 nopadding">
          <div className="col-md-4 col-sm-4 nopadding font-b">Site</div>
          <div className="col-md-8 col-sm-8">{props.siteName}</div>
        </div>
        <div className="col-md-12 col-sm-12 nopadding">
          <div className="col-md-4 col-sm-4 nopadding font-b">Warehouse</div>
          <div className="col-md-8 col-sm-8">{props.warehouseName}</div>
        </div>
        <div className="col-md-12 col-sm-12 nopadding">
          <div className="col-md-4 col-sm-4 nopadding font-b">Laboratory</div>
          <div className="col-md-8 col-sm-8">{props.agency}</div>
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
