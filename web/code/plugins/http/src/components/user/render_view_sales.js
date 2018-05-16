import React, { Component, PropTypes } from 'react';
import MultipleCheckBoxs from '../../utils/multipleCheckBoxs';

class RenderViewSales extends Component {
    constructor(props) {
        super(props);

    }
    render(){
        const {
            props, state, onChangedSalesLocation, onChangedSalesLocationChecked, onChangedSalesWarehouse, onChangedSalesWarehouseChecked, onChangedSalesAll,
            dataDropDowntSalesLocations, dataDropDowntSalesWareHouse
        } = this.props;
        const { fields: { salesLocation, salesWarehouse, salesAll, salesLocationValue, salesWarehouseValue }, userTypeValue } = props;
        return(
            <div className={`form-group ${userTypeValue != 'OnHand'?'':'hidden'}`}>
                <label className="col-md-2 col-sm-2 control-label">View Sales</label>
                <div className="col-md-4 col-sm-12 col-xs-12">
                    <div className="col-sm-12 col-xs-12 nopadding">
                        <input type="checkbox" value="Location" {...salesLocation}
                            checked={state.selectedSalesLocation}
                            onChange={onChangedSalesLocation}
                            ref="location" /> All Company
                    </div>
                    <div className="user-edit user-per-height">
                        <MultipleCheckBoxs datas={dataDropDowntSalesLocations} name={'checkbox-allSalesCompany'}
                            checkedAll={state.selectedSalesLocation}
                            chekedValue={state.chkSalesLocation}
                            onChange={onChangedSalesLocationChecked}
                            salesLocationValue={salesLocationValue.value}/>
                    </div>
                </div>
                <div className="col-md-4 col-sm-12 col-xs-12">
                    <div className="col-sm-12 col-xs-12 nopadding">
                        <input type="checkbox" value="Warehouse" {...salesWarehouse}
                            checked={state.selectedSalesWarehouse}
                            onChange={onChangedSalesWarehouse}
                            ref="warehouse" /> All Warehouse
                    </div>
                    <div className="user-edit user-per-height">
                        <MultipleCheckBoxs datas={dataDropDowntSalesWareHouse} name={'checkbox-allSalesWarehouse'}
                          checkedAll={state.selectedSalesWarehouse}
                          chekedValue={state.chkSalesWarehouse}
                          onChange={onChangedSalesWarehouseChecked}
                          salesWarehouseValue={salesWarehouseValue.value}/>
                    </div>
                </div>
                <div className="col-sm-2 hidden">
                    <label>
                        <input type="checkbox" value="All" {...salesAll}
                            checked={state.selectedSalesAll}
                            onChange={onChangedSalesAll}
                            ref="allSalesLocation" /> All Locations
                    </label>
                </div>
            </div>
        )
    }
}
module.exports = RenderViewSales;
