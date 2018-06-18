import React, { Component, PropTypes } from 'react';
import { reduxForm, reset } from 'redux-form';
import numberFormat from '../../../utils/convertNumberformat';
import GetSalesPricePermission from '../../../utils/getSalesPricePermission';

class RenderClassTotals extends Component {
    render(){
        const {
            userLogin, allItems, ViewAsSet, _totalPublicPrice, _totalUpdatedCost, maxPrice, minPrice, avrgPrice, _totalNetAmount, _totalDiscount, _totalMargin,
            totalPublicPrice
        } = this.props;
        
        const priceSalesRTP = GetSalesPricePermission(userLogin.permission.priceSales).priceSalesRTP;
        const priceSalesUCP = GetSalesPricePermission(userLogin.permission.priceSales).priceSalesUCP;
        const priceSalesCTP = GetSalesPricePermission(userLogin.permission.priceSales).priceSalesCTP;
        const priceSalesNSP = GetSalesPricePermission(userLogin.permission.priceSales).priceSalesNSP;
        const priceSalesMGP = GetSalesPricePermission(userLogin.permission.priceSales).priceSalesMGP;
        const priceSalesDSP = GetSalesPricePermission(userLogin.permission.priceSales).priceSalesDSP;

        return(
          <div>
            <div id="dvTotalsub1" className="bg-or text-center">
                <span>
                    <span className="font-b fc-000">Total Items :</span>
                    <span className="font-w9">{ numberFormat(allItems.length) } {ViewAsSet ? 'Sets' : 'Items'} </span>
                </span>
                <span className={`${(priceSalesNSP) ? '' : 'hidden'}`}>
                    <span className="padding-lf15">|</span>
                    <span className="font-b fc-000">Total Net Sales :</span>
                    <span className="font-w9">{ numberFormat(_totalNetAmount) } { ViewAsSet ? 'USD' : 'USD' }</span>
                </span>
                <span className={`${(priceSalesUCP) ? '' : 'hidden'}`}>
                    <span className="padding-lf15">|</span>
                    <span className="font-b fc-000">Total Updated Cost :</span>
                    <span className="font-w9">{ _totalUpdatedCost } { ViewAsSet ? 'USD' : 'USD' }</span>
                </span>
            </div>
            <div id="dvTotalsub2" className="bg-f7d886 text-center">
                <span className={`${(priceSalesNSP) ? '' : 'hidden'}`}>
                    <span className="font-b fc-000">Highest Net Sales :</span>
                    <span className="font-w9">{ numberFormat(maxPrice) } { ViewAsSet ? 'USD' : 'USD' } </span>
                </span>
                <span className={`${(priceSalesNSP) ? '' : 'hidden'}`}>
                    <span className="padding-lf15">|</span>
                    <span className="font-b fc-000">Lowest Net Sales :</span>
                    <span className="font-w9">{ numberFormat(minPrice) } { ViewAsSet ? 'USD' : 'USD' } </span>
                </span>
                <span className={`${(priceSalesMGP) ? '' : 'hidden'}`}>
                    <span className="padding-lf15">|</span>
                    <span className="font-b fc-000">Average Margin % : </span>
                    <span className="font-w9">{ numberFormat((_totalMargin/_totalNetAmount)*100) } % </span>
                </span>
                <span className={`${(priceSalesDSP) ? '' : 'hidden'}`}>
                    <span className="padding-lf15">|</span>
                    <span className="font-b fc-000">Average Discount % : </span>
                    <span className="font-w9">{ numberFormat((_totalDiscount/totalPublicPrice)*100) } % </span>
                </span>
            </div>
          </div>
        );
    }
}

module.exports = RenderClassTotals
