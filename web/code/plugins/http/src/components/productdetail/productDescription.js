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
        let invoicedDate = !!props.id ? convertDate(props.itemCreatedDate) : convertDate(props.createdDate);
        let actualCost = !!props.id ? numberFormat(props.actualCost[currency]): numberFormat(props.totalActualCost['USD']);
        let updatedCost = !!props.id ? numberFormat(props.updatedCost[currency]) : numberFormat(props.totalUpdatedCost['USD']);
        let price = !!props.id ? numberFormat(props.price[currency]) : numberFormat(props.totalPrice['USD']);
        let markUp = convertMarkpercent(props.markup);
        const userLogin = JSON.parse(sessionStorage.logindata);
        let setReference = (props.setReference != undefined ) ? props.setReference : '-';
        setReference = (setReference != '' ) ? setReference : '-';

        return (
            <div className="line-h">
                <div className="col-md-12 col-sm-12 nopadding">
                    <div className="col-md-4 col-sm-4 nopadding font-b">Item Reference</div>
                    <div className="col-md-8 col-sm-8">{props.reference}</div>
                </div>
                <div className="col-md-12 col-sm-12 nopadding">
                    <div className="col-md-4 col-sm-4 nopadding font-b">Description</div>
                    <div className="col-md-8 col-sm-8 text-wrap">{props.description}</div>
                </div>
                <div className={`col-md-12 col-sm-12 nopadding ${(userLogin.permission.price == 'All') ? '' : 'hidden'}`}>
                    <div className="col-md-4 col-sm-4 nopadding font-b">Cost Price ({ currency })</div>
                    <div className="col-md-8 col-sm-8">{ actualCost }</div>
                </div>
                <div className={`col-md-12 col-sm-12 nopadding ${(userLogin.permission.price == 'Updated' || userLogin.permission.price == 'All') ?
                '' : 'hidden'}`}>
                    <div className="col-md-4 col-sm-4 nopadding font-b">Updated Cost ({ currency })</div>
                    <div className="col-md-8 col-sm-8">{ updatedCost }</div>
                </div>
                <div className={`col-md-12 col-sm-12 nopadding ${(userLogin.permission.price == 'Public' || userLogin.permission.price == 'Updated'
                || userLogin.permission.price == 'All') ? '' : 'hidden'}`}>
                    <div className="col-md-4 col-sm-4 nopadding font-b">Retail Price ({ currency })</div>
                    <div className="col-md-8 col-sm-8">{ price }</div>
                </div>
                <div className={`col-md-12 col-sm-12 nopadding ${(userLogin.permission.price == 'Updated' || userLogin.permission.price == 'All') ?
                '' : 'hidden'}`}>
                    <div className="col-md-4 col-sm-4 nopadding font-b">Markup (Times)</div>
                    <div className="col-md-8 col-sm-8">{markUp}</div>
                </div>
                <div className="col-md-12 col-sm-12 nopadding">
                    <div className="col-md-4 col-sm-4 nopadding font-b">Company</div>
                    <div className="col-md-8 col-sm-8">{props.companyName}</div>
                </div>
                <div className="col-md-12 col-sm-12 nopadding">
                    <div className="col-md-4 col-sm-4 nopadding font-b">Location</div>
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
                    <div className="col-md-4 col-sm-4 nopadding font-b">Set Reference Number</div>
                    <div className="col-md-8 col-sm-8">{setReference}</div>
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
