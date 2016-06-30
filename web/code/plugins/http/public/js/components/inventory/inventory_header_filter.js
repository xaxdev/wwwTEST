import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import * as masterDataActions from '../../actions/masterdataaction';
import Select from 'react-select';
import PureInput from '../../utils/PureInput';
import shallowCompare from 'react-addons-shallow-compare';

class InventoryHeaderFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
			WarehouseValue: [],
      LocationValue: [],
      hideAdvanceSearch: true,
      hideStoneSearch: false,
      hideJewelrySearch: true
    };
  }
  componentWillMount(){
    this.props.optionsActions.get();
  }
  // shouldComponentUpdate(nextProps) {
  //   return this.props.reference !== nextProps.reference||
  //     this.props.description !== nextProps.description||
  //     this.props.venderReference !== nextProps.venderReference||
  //     this.props.vendorName !== nextProps.vendorName||
  //     this.props.certificatedNumber !== nextProps.certificatedNumber||
  //     this.props.sku !== nextProps.sku||
  //     this.props.attachment !== nextProps.attachment
  //
  // }
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }
  handleWarehouseSelectChange (WarehouseValue) {
    var {warehouse} = this.props;
    warehouse.onChange(WarehouseValue);
		this.setState({ WarehouseValue });
	}
  handleLocationSelectChange(LocationValue){
    var {location} = this.props;
    location.onChange(LocationValue);
    this.setState({ LocationValue });
  }
  advanceSearchClick(){
    if (this.state.hideAdvanceSearch) {
      this.setState({ hideAdvanceSearch:false });
    } else {
      this.setState({ hideAdvanceSearch:true });
    }
  }
  stoneSearchClick(){
    this.setState({ hideStoneSearch:false });
    this.setState({ hideJewelrySearch:true });
  }
  jewelrySearchClick(){
    this.setState({ hideJewelrySearch:false });
    this.setState({ hideStoneSearch:true });
  }
  render() {
    const { reference,description,venderReference,vendorName,certificatedNumber,sku,location,warehouse,
            attachment} = this.props;
    const userLogin = JSON.parse(sessionStorage.logindata);
    var dataDropDowntLocations = [];
    var dataDropDowntWareHouse = [];
    if (this.props.options.warehouses) {
      dataDropDowntWareHouse.push(this.props.options.warehouses.map(warehouse =>{
          return ({value: warehouse.id,label:warehouse.code});
        })
      )
      dataDropDowntWareHouse = dataDropDowntWareHouse[0];
    }
    if (this.props.options.locations) {
      dataDropDowntLocations.push(this.props.options.locations.map(location =>{
          return ({value: location.id,label:location.code});
        })
      )
      dataDropDowntLocations = dataDropDowntLocations[0];
    }
    return (

        <div>
          {/*<!-- /.row -->*/}
          <div className="row">
            <div className="col-lg-12">
              <div className="panel panel-default">
                <div className="panel-body">
                  <div className="row">
                    <div className="col-lg-6">
                        <div className="form-group">
                          <label>Item Reference</label>
                          <PureInput type="text" className="form-control" field={reference} />
                        </div>
                        <div className="form-group">
                          <label>Item Description</label>
                          <PureInput type="text" className="form-control" field={description} />
                        </div>
                        <div className="form-group">
                          <label>Vendor Item Reference</label>
                          <PureInput type="text" className="form-control" field={venderReference} />
                        </div>
                        <div className="form-group">
                          <label>Vendor Name</label>
                          <PureInput type="text" className="form-control" field={vendorName} />
                        </div>
                        <div className="form-group">
                          <label>Certificated Number</label>
                          <PureInput type="text" className="form-control" field={certificatedNumber} />
                        </div>
                    </div>
                    {/*<!-- /.col-lg-6 (nested) -->*/}
                    <div className="col-lg-6">
                        <div className="form-group">
                          <label>SKU</label>
                          <PureInput type="text" className="form-control" field={sku} />
                        </div>
                        <div className="form-group">
                          <label>Warehouse</label>
                          <Select multi simpleValue value={this.state.WarehouseValue}
                              placeholder="Select your Warehouse"
                              options={dataDropDowntWareHouse}
                              onChange={this.handleWarehouseSelectChange.bind(this)} />
                        </div>
                        <div className="form-group">
                          <label>Location</label>
                          <Select multi simpleValue value={this.state.LocationValue}
                              placeholder="Select your Location"
                              options={dataDropDowntLocations}
                              onChange={this.handleLocationSelectChange.bind(this)} />
                        </div>
                        <div className="form-group">
                          <label>Attachment (Upload)</label>
                          <PureInput type="text" className="form-control" field={attachment} />
                        </div>
                    </div>
                    {/*<!-- /.col-lg-6 (nested) -->*/}
                  </div>
                  {/*<!-- /.row (nested) -->*/}
                </div>
                {/*<!-- /.panel-body -->*/}
              </div>
              {/*<!-- /.panel -->*/}
            </div>
            {/*<!-- /.col-lg-12 -->*/}
          </div>
          {/*<!-- /.row -->*/}
        </div>
    );
  }
}
InventoryHeaderFilter.propTypes = {
  reference: PropTypes.object.isRequired,
  description: PropTypes.object.isRequired,
  venderReference: PropTypes.object.isRequired,
  vendorName: PropTypes.object.isRequired,
  certificatedNumber: PropTypes.object.isRequired,
  sku: PropTypes.object.isRequired,
  attachment: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  warehouse: PropTypes.object.isRequired
}
function mapStateToProps(state) {
  // console.log('state add form-->',state);
  return {
    options: state.users.options,
    selectedCompany:state.users.selectedCompany,
    selectedWarehouses:state.users.selectedWarehouses
  };
}
function mapDispatchToProps(dispatch) {
  return {
    optionsActions: bindActionCreators(Object.assign({}, masterDataActions), dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(InventoryHeaderFilter);
