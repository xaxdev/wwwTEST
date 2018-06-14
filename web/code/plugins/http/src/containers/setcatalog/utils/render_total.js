import React, { Component, PropTypes } from 'react';
import { reduxForm, reset } from 'redux-form';
import numberFormat from '../../../utils/convertNumberformat';

class RenderClassTotals extends Component {
    render(){
        const { userLogin,listSetCatalogItems,_totalPublicPrice,_totalUpdatedCost,_totalPublicPriceSet,_totalUpdatedCostSet,avrgPrice } = this.props;
        return(
            <div>
              <div id="dvTotalSetItems" className="bg-f7d886 text-center">
                    <span>
                        <span className="font-b fc-000">All Pages :</span>
                        <span className="font-w9">{ numberFormat(!!listSetCatalogItems?listSetCatalogItems.total_pages:0) } Pages </span>
                        <span className="padding-lf15">|</span>
                    </span>
                    <span>
                        <span className="font-b fc-000">Total SetItems :</span>
                        <span className="font-w9">{ numberFormat(!!listSetCatalogItems?listSetCatalogItems.total_setitems:0) } Sets </span>
                        <span className="padding-lf15">|</span>
                    </span>
                    <span className={`spSetItemsPublicPrice${(userLogin.permission.price == 'Public' || userLogin.permission.price == 'Updated'
                            || userLogin.permission.price == 'All') ?
                            '' : ' hidden'}`}>
                        <span className="font-b fc-000">Total Retail Price(Set) :</span>
                        <span className="font-w9">{ _totalPublicPriceSet } USD</span>
                    </span>
                    <span className={`spSetItemsUpdated${(userLogin.permission.price == 'Updated' || userLogin.permission.price == 'All') ?
                        '' : ' hidden'}`}>
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
