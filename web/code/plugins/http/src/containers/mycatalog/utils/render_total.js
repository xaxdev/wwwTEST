import React, { Component, PropTypes } from 'react';
import { reduxForm, reset } from 'redux-form';
import numberFormat from '../../../utils/convertNumberformat';

class RenderClassTotals extends Component {
    render(){
        const { userLogin,listCatalogItems, _totalPublicPrice, _totalUpdatedCost,
                _totalPublicPriceSet, _totalUpdatedCostSet, avrgPrice } = this.props;
        return(
            <div>
              <div id="dvTotalItems" className="bg-f7d886 text-center border-b-white">
                    <span>
                        <span className="font-b fc-000">All Pages :</span>
                        <span className="font-w9">{ numberFormat(listCatalogItems.total_pages) } Pages </span>
                        <span className="padding-lf15">|</span>
                    </span>
                    <span>
                        <span className="font-b fc-000">Total Items :</span>
                        <span className="font-w9">{ numberFormat(listCatalogItems.total_items) } Items </span>
                        <span className="padding-lf15">|</span>
                    </span>
                    <span className={`${(userLogin.permission.price == 'Public' || userLogin.permission.price == 'Updated'
                            || userLogin.permission.price == 'All') ?
                            '' : 'hidden'}`}>
                        <span className="font-b fc-000">Total Public Price :</span>
                        <span className="font-w9">{ _totalPublicPrice } { userLogin.currency }</span>
                    </span>
                    <span className={`${(userLogin.permission.price == 'Updated' || userLogin.permission.price == 'All') ?
                        '' : 'hidden'}`}>
                        <span className="padding-lf15"> | </span>
                        <span className="font-b fc-000">Total Updated Cost :</span>
                        <span className="font-w9">{ _totalUpdatedCost } { userLogin.currency }
                        </span>
                    </span>
              </div>
              <div id="dvTotalSetItems" className="bg-f7d886 text-center">
                    <span>
                        <span className="font-b fc-000">All Pages :</span>
                        <span className="font-w9">{ numberFormat(listCatalogItems.total_pages) } Pages </span>
                        <span className="padding-lf15">|</span>
                    </span>
                    <span>
                        <span className="font-b fc-000">Total SetItems :</span>
                        <span className="font-w9">{ numberFormat(listCatalogItems.total_setitems) } Sets </span>
                        <span className="padding-lf15">|</span>
                    </span>
                    <span className={`${(userLogin.permission.price == 'Public' || userLogin.permission.price == 'Updated'
                            || userLogin.permission.price == 'All') ?
                            '' : 'hidden'}`}>
                        <span className="font-b fc-000">Total Public Price(Set) :</span>
                        <span className="font-w9">{ _totalPublicPriceSet } USD</span>
                    </span>
                    <span className={`${(userLogin.permission.price == 'Updated' || userLogin.permission.price == 'All') ?
                        '' : 'hidden'}`}>
                        <span className="padding-lf15"> | </span>
                        <span className="font-b fc-000">Total Updated Cost(Set) :</span>
                        <span className="font-w9">{ _totalUpdatedCostSet } USD
                        </span>
                    </span>
              </div>
            </div>
        );
    }
}

module.exports = RenderClassTotals
