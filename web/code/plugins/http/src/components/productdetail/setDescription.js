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
        let invoicedDate = props.createdDate != undefined ? convertDate(props.createdDate): '-';
        let actualCost = props.totalActualCost != undefined ? numberFormat(props.totalActualCost['USD']): '-';
        let updatedCost = props.totalUpdatedCost != undefined ? numberFormat(props.totalUpdatedCost['USD']): '-';
        let price = props.totalPrice != undefined ? numberFormat(props.totalPrice['USD']): '-';
        let markUp = props.markup != undefined ? convertMarkpercent(props.markup): '-';
        const userLogin = JSON.parse(sessionStorage.logindata);
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
                <div className="col-md-12 col-sm-12 nopadding">
                    <div className="col-md-4 col-sm-4 nopadding font-b">Set Name</div>
                    <div className="col-md-8 col-sm-8 text-wrap">{props.setName != undefined ? props.setName: '-'}</div>
                </div>
                <div className="col-md-12 col-sm-12 nopadding">
                    <div className="col-md-4 col-sm-4 nopadding font-b">Set Romance Name</div>
                    <div className="col-md-8 col-sm-8 text-wrap">{props.setRomanceNote != undefined ? props.setRomanceNote: '-'}</div>
                </div>
                <div className={`col-md-12 col-sm-12 nopadding ${(userLogin.permission.price == 'All') ? '' : 'hidden'}`}>
                    <div className="col-md-4 col-sm-4 nopadding font-b">Total Cost Price (USD)</div>
                    <div className="col-md-8 col-sm-8">{ actualCost }</div>
                </div>
                <div className={`col-md-12 col-sm-12 nopadding ${(userLogin.permission.price == 'Updated'
                    || userLogin.permission.price == 'All') ? '' : 'hidden'}`}>
                    <div className="col-md-4 col-sm-4 nopadding font-b">Total Updated Cost (USD)</div>
                    <div className="col-md-8 col-sm-8">{ updatedCost }</div>
                </div>
                <div className={`col-md-12 col-sm-12 nopadding ${(userLogin.permission.price == 'Public'
                    || userLogin.permission.price == 'Updated' || userLogin.permission.price == 'All') ? '' : 'hidden'}`}>
                    <div className="col-md-4 col-sm-4 nopadding font-b">Total Price (USD)</div>
                    <div className="col-md-8 col-sm-8">{ price }</div>
                </div>
                <div className={`col-md-12 col-sm-12 nopadding ${(userLogin.permission.price == 'Updated' || userLogin.permission.price == 'All') ?
                    '' : 'hidden'}`}>
                    <div className="col-md-4 col-sm-4 nopadding font-b">Markup (Times)</div>
                    <div className="col-md-8 col-sm-8">{markUp}</div>
                </div>
                <div className="col-md-12 col-sm-12 nopadding">
                    <div className="col-md-4 col-sm-4 nopadding font-b">Company</div>
                    <div className="col-md-8 col-sm-8">{props.companyName != undefined ? props.companyName: '-'}</div>
                </div>
                <div className="col-md-12 col-sm-12 nopadding">
                    <div className="col-md-4 col-sm-4 nopadding font-b">Location</div>
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
module.exports = Detail
