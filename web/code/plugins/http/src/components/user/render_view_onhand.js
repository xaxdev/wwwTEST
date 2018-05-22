import React, { Component, PropTypes } from 'react';
import MultipleCheckBoxs from '../../utils/multipleCheckBoxs';

class RenderViewOnHand extends Component {
    constructor(props) {
        super(props);

    }
    render(){
        const {
            props, state, onChangedOnHandLocation, onChangedOnHandLocationChecked, onChangedOnHandWarehouse, onChangedOnHandWarehouseChecked, onChangedOnHandAll,
            dataDropDowntLocations, dataDropDowntWareHouse
        } = this.props;
        const { fields: { webOnly, movement, onhandLocation, onhandWarehouse, onhandAll, onhandLocationValue, onhandWarehouseValue }, userTypeValue } = props;
        return(
            <div>
                <div className="form-group">
                    <label className="col-sm-2 control-label">Web Only</label>
                    <div className="col-sm-7">
                        <input type="checkbox" {...webOnly}/>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-2 control-label">Movement Activity</label>
                    <div className="col-sm-7">
                        <input type="checkbox" {...movement}/>
                    </div>
                </div>
                <div className={`form-group ${userTypeValue != 'Sales' && userTypeValue != null ?'':'hidden'}`}>
                    <label className="col-md-2 col-sm-2 control-label">View On-hand</label>
                    <div className="col-md-4 col-sm-12 col-xs-12">
                        <div className="col-sm-12 col-xs-12 nopadding">
                            <input type="checkbox" value="Location" {...onhandLocation}
                                checked={state.selectedOnHandLocation}
                                onChange={onChangedOnHandLocation}
                                ref="location" /> All Company
                        </div>
                        <div className="user-edit user-per-height">
                            <MultipleCheckBoxs datas={dataDropDowntLocations} name={'checkbox-allCompany'}
                                checkedAll={state.selectedOnHandLocation}
                                chekedValue={state.chkLocation}
                                onChange={onChangedOnHandLocationChecked}
                                onhandLocationValue={onhandLocationValue.value}/>
                        </div>
                    </div>
                    <div className="col-md-4 col-sm-12 col-xs-12">
                        <div className="col-sm-12 col-xs-12 nopadding">
                            <input type="checkbox" value="Warehouse" {...onhandWarehouse}
                                checked={state.selectedOnHandWarehouse}
                                onChange={onChangedOnHandWarehouse}
                                ref="warehouse" /> All Location
                        </div>
                        <div className="user-edit user-per-height">
                            <MultipleCheckBoxs datas={dataDropDowntWareHouse} name={'checkbox-allWarehouse'}
                              checkedAll={state.selectedOnHandWarehouse}
                              chekedValue={state.chkWarehouse}
                              onChange={onChangedOnHandWarehouseChecked}
                              onhandWarehouseValue={onhandWarehouseValue.value}/>
                        </div>
                    </div>
                    <div className="col-sm-2 hidden">
                        <label>
                            <input type="checkbox" value="All" {...onhandAll}
                                checked={state.selectedOnHandAll}
                                onChange={onChangedOnHandAll}
                                ref="allLocation" /> All Locations
                        </label>
                    </div>
                </div>
            </div>
        )
    }
}
module.exports = RenderViewOnHand;
