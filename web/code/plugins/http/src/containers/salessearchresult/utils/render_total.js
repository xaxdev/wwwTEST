import React, { Component, PropTypes } from 'react';
import { reduxForm, reset } from 'redux-form';
import numberFormat from '../../../utils/convertNumberformat';

class RenderClassTotals extends Component {
    render(){
        const {
            userLogin, allItems, ViewAsSet, _totalPublicPrice, _totalUpdatedCost, maxPrice, minPrice, avrgPrice, _totalNetAmount, _totalDiscount, _totalMargin,
            totalPublicPrice
        } = this.props;
        return(
          <div>
            <div id="dvTotalsub1" className="bg-or text-center">
                <span>
                    <span className="font-b fc-000">Total Items :</span>
                    <span className="font-w9">{ numberFormat(allItems.length) } {ViewAsSet ? 'Sets' : 'Items'} </span>
                    <span className="padding-lf15">|</span>
                </span>
                <span className={`${(userLogin.permission.price == 'Public'
                    || userLogin.permission.price == 'Updated'
                    || userLogin.permission.price == 'All') ?
                    '' : 'hidden'}`}>
                    <span className="font-b fc-000">Total Net Sales :</span>
                    <span className="font-w9">{ numberFormat(_totalNetAmount) } { ViewAsSet ? 'USD' : userLogin.currency }</span>
                </span>
                <span className={`${(userLogin.permission.price == 'Updated'
                    || userLogin.permission.price == 'All') ?
                    '' : 'hidden'}`}>
                    <span className="padding-lf15">|</span>
                    <span className="font-b fc-000">Total Updated Cost :</span>
                    <span className="font-w9">{ _totalUpdatedCost } { ViewAsSet ? 'USD' : userLogin.currency }</span>
                </span>
            </div>
            <div id="dvTotalsub2" className="bg-f7d886 text-center">
                <span>
                    <span className="font-b fc-000">Highest Price :</span>
                    <span className="font-w9">{ numberFormat(maxPrice) } { ViewAsSet ? 'USD' : userLogin.currency } </span>
                    <span className="padding-lf15">|</span>
                </span>
                <span>
                    <span className="font-b fc-000">Lowest Price :</span>
                    <span className="font-w9">{ numberFormat(minPrice) } { ViewAsSet ? 'USD' : userLogin.currency } </span>
                    <span className="padding-lf15">|</span>
                </span>
                <span>
                    <span className="font-b fc-000">Average Margin % : </span>
                    <span className="font-w9">{ numberFormat((_totalMargin/_totalNetAmount)*100) } % </span>
                    <span className="padding-lf15">|</span>
                </span>
                <span>
                    <span className="font-b fc-000">Average Discount % : </span>
                    <span className="font-w9">{ numberFormat((_totalDiscount/totalPublicPrice)*100) } % </span>
                </span>
            </div>
          </div>
        );
    }
}

module.exports = RenderClassTotals
