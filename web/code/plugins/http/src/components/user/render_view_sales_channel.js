import React, { Component, PropTypes } from 'react';
import MultipleCheckBoxs from '../../utils/multipleCheckBoxs';

class RenderViewSales extends Component {
    constructor(props) {
        super(props);

    }
    render(){
        const { props, state, onChangedSalesChannel, onChangedSalesChannelChecked, dataDropDowntSalesChannel } = this.props;
        const { fields: { salesChannel, salesChannelValue }, userTypeValue } = props;
        return(
            <div className={`form-group ${userTypeValue != 'OnHand' && userTypeValue != null ?'':'hidden'}`}>
                <label className="col-md-2 col-sm-2 control-label">View Channel</label>
                <div className="col-md-4 col-sm-12 col-xs-12">
                    <div className="col-sm-12 col-xs-12 nopadding">
                        <input type="checkbox" value="Location" {...salesChannel}
                            checked={state.selectedSalesChannel}
                            onChange={onChangedSalesChannel}
                            ref="location" /> All Channel
                    </div>
                    <div className="user-edit user-per-height">
                        <MultipleCheckBoxs datas={dataDropDowntSalesChannel} name={'checkbox-allSalesChannel'}
                            checkedAll={state.selectedSalesChannel}
                            chekedValue={state.chkSalesChannel}
                            onChange={onChangedSalesChannelChecked}
                            salesChannelValue={salesChannelValue.value}/>
                    </div>
                </div>
            </div>
        )
    }
}
module.exports = RenderViewSales;
