import React,{ Component } from 'react';
import { reduxForm } from 'redux-form';
import validateUserEdit from '../../utils/validateuseredit.js';
import { Link } from 'react-router';
import * as masterDataActions from '../../actions/masterdataaction';
import { bindActionCreators } from 'redux';
import shallowCompare from 'react-addons-shallow-compare';
import Multiselect from 'react-bootstrap-multiselect';
import GenPassword from '../../utils/genPassword';
import ReactDOM from 'react-dom';
var _ = require('lodash');

export const fields = ['id','firstName','lastName','username','email','password','role','currency','status','company',
          'location','warehouse','productGroup','onhand','price','productGroupSTO','productGroupJLY','productGroupWAT'
          ,'productGroupACC','productGroupOBA','productGroupSPP','onhandLocationValue','webOnly','permissionId','onhandLocation'
          ,'onhandAll','onhandWarehouse','onhandWarehouseValue'];

class UserDetailsFrom extends Component {

  constructor(props) {
    super(props);

    this.generatePassword = this.generatePassword.bind(this);
    this.selectedCompany = this.selectedCompany.bind(this);
    this.selectedSite = this.selectedSite.bind(this);
    this.selectedProductGroup = this.selectedProductGroup.bind(this);
    this.selectedOnHandWarehouse = this.selectedOnHandWarehouse.bind(this);
    this.selectedOnHandLocation = this.selectedOnHandLocation.bind(this);
    this.changedOnHandLocation = this.changedOnHandLocation.bind(this);
    this.selectedOnHandAll = this.selectedOnHandAll.bind(this);

    // console.log('constructor-->',this.props.user);
    this.state = {
      hideProductGroups: (this.props.user.productGroup == 2) ? false: true,
      productGroupDatas:[],
      selectedCompany: false,
      selectedSite: false,
      selectedOnHandWarehouse: !this.props.user.onhandWarehouse,
      selectedOnHandLocation: !this.props.user.onhandLocation,
      selectedOnHandAll: (!this.props.user.onhandLocation && !this.props.user.onhandWarehouse)? true: false,
      genPass:'',
      changedOnHandLocation:false
    };
  }
  componentWillMount(){
    this.props.optionsActions.get();
  }
  // shouldComponentUpdate(nextProps, nextState) {
  //   return shallowCompare(this, nextProps, nextState);
  // }
  componentDidMount(){

    this.setState(
      {
        selectedOnHandWarehouse: (this.props.user.onhandWarehouseValue.length != 0) ? false : true,
        selectedOnHandLocation: (this.props.user.onhandLocationValue.length != 0) ? false : true,
      }
    );
  }
  selectedCompany(e){
    // console.log('e-->',e);
    // console.log('this selectedCompany-->',e.target.value);
    if(e.target.value == ''){
      this.setState(
        {
          selectedCompany:false,
          selectedSite: false
        });
    }else{
      this.props.optionsActions.getSite(e.target.value);
      this.setState(
        {
          selectedCompany:true
        });
    }
  }

  selectedSite(e){
    if(e.target.value != '')
    {
      // console.log('this selectedWarehouse-->',e.target.value);
      const { options } = this.props;
      const siteid = e.target.value;
      const comid = this.refs.company.value;
      const propsCom = { siteid, comid, options };
      this.props.optionsActions.getWarehouse(propsCom);
      this.setState(
        {
          selectedSite:true
        });
    }else{
      this.setState(
        {
          selectedSite: false
        });
    }
  }
  selectedProductGroup(e){
    if(e.target.value != 2) //select All disbal all check box
    {
      this.setState(
        {
          hideProductGroups: true,
          productGroupDatas: this.props.options.productGroups
        });
    }else{
      this.setState(
        {
          hideProductGroups: false,
          productGroupDatas: []
        });
    }
    // console.log('this.state-->',this.state);
  }
  selectedOnHandWarehouse(e){
    // console.log('selectedOnHandWarehouse-->');
    var {
        fields: {
            onhand,
            onhandAll,
            onhandWarehouseValue
        }
    } = this.props;
    if (e.target.checked) {
        this.setState({
            selectedOnHandWarehouse: true,
            selectedOnHandAll: true
        });

        var select = ReactDOM.findDOMNode(this.refs.selectMultiLocation);

        var values = [].filter.call(select.options, function(o) {
            return o.selected;
        }).map(function(o) {
            return o.value;
        });
        if (values.length != 0) {
            this.setState({
                selectedOnHandLocation: false,
            });
            var selectWarehouse = ReactDOM.findDOMNode(this.refs.selectMultiWarehouse);
            var valuesWarehouse = [].filter.call(selectWarehouse.options, function(o) {
                return !o.selected;
            }).map(function(o) {
                return o.value;
            });
            onhandWarehouseValue.onChange(valuesWarehouse);
            onhand.onChange('Warehouse');
            onhandAll.onChange(false);
        }else{
          this.setState({
              selectedOnHandLocation: true,
          });
          onhand.onChange('All');
          onhandAll.onChange(true);
        }

    } else {
        this.setState({
            selectedOnHandWarehouse: false,
            selectedOnHandLocation: false,
            selectedOnHandAll: false
        });
        // onhand.value = 'notWarehouse';
        onhand.onChange('Warehouse');
        onhandAll.onChange(false);
    }
  }
  selectedOnHandLocation(e){
    // console.log('e.target.value-->',e.target.value);
    var {
        fields: {
            onhand,
            onhandAll
        }
    } = this.props;
    if (e.target.checked) {
        this.setState({
            selectedOnHandWarehouse: true,
            selectedOnHandLocation: true,
            selectedOnHandAll: true,
            changedOnHandLocation: true
        });
        // onhand.value = 'Location';
        onhand.onChange('All');
        onhandAll.onChange(true);
        this.props.optionsActions.get();
    } else {
        this.setState({
            selectedOnHandWarehouse: false,
            selectedOnHandLocation: false,
            selectedOnHandAll: false,
            changedOnHandLocation: false
        });
        onhand.onChange('Location');
        onhandAll.onChange(false);
    }
  }
  selectedOnHandAll(e){
    // console.log('e.target.value-->',e.target.value);
    var {fields: { onhand, onhandAll }} = this.props;
    if(e.target.checked){
      this.setState(
        {
          selectedOnHandWarehouse: false,
          selectedOnHandLocation: false,
          selectedOnHandAll: true
        });
        // onhand.value = 'All';
        onhand.onChange('All');
    }else{
      this.setState(
        {
          selectedOnHandWarehouse: false,
          selectedOnHandLocation: false,
          selectedOnHandAll: false
        });
      // onhand.value = 'notAll';
      onhand.onChange('notAll');
    }
  }
  changedOnHandLocation(e) {
      var {
          fields: {
              onhandLocationValue
          }
      } = this.props;
      var select = ReactDOM.findDOMNode(this.refs.selectMultiLocation);

      var values = [].filter.call(select.options, function(o) {
          return o.selected;
      }).map(function(o) {
          return o.value;
      });

      if (values.length != 0) {
        this.setState({
          changedOnHandLocation: true
        });
      }else{
        this.setState({
          changedOnHandLocation: false
        });
      }

      onhandLocationValue.onChange(values);

      this.props.optionsActions.getOnHandWarehouse(values);
  }
  generatePassword(){
    var pass = GenPassword();
    this.setState({
      genPass: pass
    });
    this.props.fields.password.onChange(pass);
    ReactDOM.findDOMNode(this.refs.password).focus();
  }
  renderOption(type){
    if (typeof (this.props.options) !== 'undefined') {
      if (this.props.options.length == 0) {
        // console.log('this.props.options-->',this.props.options);
        switch(type){
          case 'role':
            return (
              <option value={''}>{'Please select role'}</option>
            );
          case 'curr':
            return (
              <option value={''}>{'Please select currency'}</option>
            );
          case 'comp':
            return (
              <option value={''}>{'Please select company'}</option>
            );
          case 'site':
            return (
              <option value={''}>{'Please select Site'}</option>
            );
          case 'warehouse':
            return (
              <option value={''}>{'Please select warehouse'}</option>
            );
          default:
            return false;
        }
       }
      else {
        // console.log('this.props.options-->',this.props.options);
        switch(type){
          case 'role':
            if (this.props.options) {
              return this.props.options.roles.map(role =>
                {
                  return (
                    <option key={role.id} value={role.name}>{role.name}</option>
                  );
                });
              }
          case 'curr':
            if (this.props.options) {
              return this.props.options.currencies.map(curr =>
                {
                  return (
                    <option key={curr.id} value={curr.name}>{curr.name}</option>
                  );
                });
              }
          case 'comp':
            if (this.props.options) {
              return this.props.options.companies.map(comp =>
                {
                  return (
                    <option key={comp.id}  value={comp.code}>{comp.name}</option>
                  );
                });
              }
          case 'site':
            if (this.props.options) {
              return this.props.options.locations.map(site =>
                {
                  return (
                    <option key={site.id}  value={site.code}>{site.name}</option>
                  );
                });
            }
          case 'warehouse':
            if (this.props.options) {
              return this.props.options.warehouses.map(warehouse =>
                {
                  return (
                    <option key={warehouse.id}  value={warehouse.code}>{warehouse.name}</option>
                  );
                });
            }
          default:
            return false;
        }
      }
    }

  }

  render() {

    const { fields: {
              id,firstName,lastName,username,email,password,role,currency,status,company,location,warehouse,productGroup
              ,onhand,price,productGroupSTO,productGroupJLY,productGroupWAT,onhandLocation,onhandAll
              ,productGroupACC,productGroupOBA,productGroupSPP,onhandLocationValue,webOnly,permissionId,onhandWarehouse
              ,onhandWarehouseValue
          },handleSubmit,submitting } = this.props;
    var dataDropDowntLocations = [];
    var dataDropDowntWareHouse = [];
    var that = this;

    const userLogin = JSON.parse(sessionStorage.logindata);

    if (typeof (this.props.options) !== 'undefined') {
      if (this.state.changedOnHandLocation) {
          if (typeof (this.props.warehouseOnHand) !== 'undefined')  {
              dataDropDowntWareHouse.push(this.props.warehouseOnHand.map(warehouse =>{
                return ({value: warehouse.code,name:warehouse.name});
              })
            )
            dataDropDowntWareHouse = dataDropDowntWareHouse[0];
          }
      }else{
        if (this.props.warehouseOnHand) {
          var newDate = [];
          var data = [];
          if(dataDropDowntLocations.length != 0){
            dataDropDowntLocations.forEach(function(location){
              newDate.push(_.filter(that.props.warehouseOnHand,
                function(warehouse)
                { return warehouse.locationid == location.value})
              );
            });
          }else{
            if(userLogin.permission.onhandWarehouse != undefined){
              if (userLogin.permission.onhandWarehouse.type == 'Warehouse'
                || userLogin.permission.onhandWarehouse.type == 'All'){
                  if (userLogin.permission.onhandWarehouse.type == 'Warehouse') {
                    userLogin.permission.onhandWarehouse.places.forEach(function(settingWarehouse){
                      newDate.push(_.filter(that.props.warehouseOnHand,
                        function(warehouse){
                          // console.log('warehouse.id-->',warehouse.id);
                          if(warehouse.code != undefined){
                            return warehouse.code.toString() == settingWarehouse;
                          }
                        })
                      );
                    });

                    var subdata = [];
                    newDate.forEach(newdata =>{
                        newdata.forEach(subdata =>{
                          data.push(subdata);
                        })
                    });

                    dataDropDowntWareHouse.push(data.map(warehouse =>{
                        return ({value: warehouse.code,name:warehouse.name});
                      })
                    )
                    dataDropDowntWareHouse = dataDropDowntWareHouse[0];

                  } else {
                    if (typeof (this.props.warehouseOnHand) !== 'undefined')  {
                        dataDropDowntWareHouse.push(this.props.warehouseOnHand.map(warehouse =>{
                          return ({value: warehouse.code,name:warehouse.name});
                        })
                      )
                      dataDropDowntWareHouse = dataDropDowntWareHouse[0];
                    }
                  }
              }
            }
          }
        }
      }

    if (typeof (this.props.locationOnHand) !== 'undefined') {
      dataDropDowntLocations.push(this.props.locationOnHand.map(location =>{
          return ({value: location.code,name:location.name});
        })
      )
      dataDropDowntLocations = dataDropDowntLocations[0];
      }

    }
    // console.log('this.props.user.onhandLocation-->',this.props.user.onhandLocation);

    return (
      <form onSubmit={handleSubmit}>
            <div className="col-sm-12 bg-hearder bg-header-inventories">
                <div className="col-xs-6 m-width-60 ft-white m-nopadding">
                  <h1>User Details</h1>
                </div>
                <div className="col-sm-6 m-width-40 m-nopadding text-right maring-t15">
                  <Link to="/users" className="btn btn-primary btn-radius">Back to User List</Link>
                  <button type="submit" className="btn btn-primary btn-radius" disabled={submitting}>Update User</button>
                </div>
            </div>
            <div className="col-sm-12 nopadding">
              <div className="panel panel-default">
                <div className="panel-body">
                  <div className="row margin-ft">
                        <div className="col-sm-12">
                          <h2>User Profile</h2>
                </div>
                <div className="form-group hidden" >
                  <label>Id</label>
                  <input type="text" className="form-control" {...id}/>
                </div>
                <div className="col-sm-6 form-horizontal">
                  <div className="form-group">
                    <label className="col-sm-4 control-label">First Name</label>
                    <div className="col-sm-7">
                      <input type="text" className="form-control" {...firstName} />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="col-sm-4 control-label">Last Name</label>
                    <div className="col-sm-7">
                      <input type="text" className="form-control" {...lastName} />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="col-sm-4 control-label">Email</label>
                    <div className="col-sm-7">
                      <input type="text" className="form-control" {...email} />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="col-sm-4 control-label">User Name</label>
                    <div className="col-sm-7">
                      <input type="text" className="form-control" {...username} disabled="disabled"/>
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="col-sm-4 control-label">Password</label>
                    <div className="col-sm-7">
                      <input type="text" className="form-control" value={this.state.genPass} ref="password" {...password}/>
                      <div className="gen-passord">
                        <input type="button" className="btn btn-primary pull-xs-right btn-radius" value="Generate" onClick={this.generatePassword}/>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 form-horizontal">
                  <div className="form-group">
                    <label className="col-sm-4 control-label">Status</label>
                    <div className="col-sm-7">
                      <input type="checkbox" defaultChecked={this.props.user.status?'checked':''} {...status} />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="col-sm-4 control-label">Currency</label>
                    <div className="col-sm-7">
                      <select className="form-control" {...currency}>
                        <option key={''} value={''}>{'Please select currency'}</option>
                        {this.renderOption('curr')}
                      </select>
                    </div>
                  </div>
                  <div className={`form-group ${company.touched && company.invalid ? 'has-danger' : ''}` }>
                    <label className="col-sm-4 control-label">Company</label>
                    <div className="col-sm-7">
                      <select className="form-control" {...company} onClick={this.selectedCompany} ref="company">
                        <option key={''} value={''}>{'Please select company'}</option>
                        {this.renderOption('comp')}
                      </select>
                      <div className="text-help">
                        { company.touched ? company.error : ''}
                      </div>
                    </div>
                  </div>
                  <div className={`form-group ${location.touched && location.invalid ? 'has-danger' : ''}` }>
                    <label className="col-sm-4 control-label">Site</label>
                    <div className="col-sm-7">
                      <select  disabled={`${this.state.selectedCompany ? '' : 'disabled'}`}  className="form-control" {...location} onClick={this.selectedSite}>
                        <option key={''} value={''}>{'Please select location'}</option>
                        {this.renderOption('site')}
                      </select>
                      <div className="text-help">
                        { location.touched ? location.error : ''}
                      </div>
                    </div>
                  </div>
                  <div className={`form-group ${warehouse.touched && warehouse.invalid ? 'has-danger' : ''}` }>
                    <label className="col-sm-4 control-label">Warehouse</label>
                    <div className="col-sm-7">
                      <select  disabled={`${this.state.selectedSite ? '' : 'disabled'}`}   className="form-control" {...warehouse} >
                        <option key={''} value={''}>{'Please select warehouse'}</option>
                        {this.renderOption('warehouse')}
                      </select>
                      <div className="text-help">
                        { warehouse.touched ? warehouse.error : ''}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-12">
                  <div className="bd-color"></div>
                </div>
                <div className="form-horizontal">
                  <div className="col-sm-12">
                    <h2>User Permission</h2>
                  </div>
                  <div className="col-sm-12 form-horizontal">
                    <div className="form-group">
                      <label className="col-sm-2 control-label">Role</label>
                      <div className="col-sm-5">
                        <select className="form-control" {...role}>
                          <option key={''} value={''}>{'Please select role'}</option>
                          {this.renderOption('role')}
                        </select>
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="col-sm-2 control-label">View Product Group</label>
                      <div className="col-sm-5">
                        <select className="form-control" {...productGroup} onClick={this.selectedProductGroup}>
                          {/*<option key={1} value={1}>{'All Prouct Group'}</option>*/}
                          <option key={2} value={2}>{'Some Prouct Group'}</option>
                        </select>
                        <div id="checkboxlistProduct" className={`${this.state.hideProductGroups ? 'hiddenViewProductGroup' : ''}` }>
                          <div>
                            <input type="checkbox"  value="JLY"
                              checked={productGroupJLY.value === 'JLY'}
                              {...productGroupJLY}/>
                            <span>Jewelry</span>
                          </div>
                          <div>
                            <input type="checkbox"  value="WAT"
                              checked={productGroupWAT.value === 'WAT'}
                              {...productGroupWAT}/>
                            <span>Watch</span>
                          </div>
                          <div>
                            <input type="checkbox" value="STO"
                              checked={productGroupSTO.value === 'STO'}
                              {...productGroupSTO}/>
                            <span>Stone</span>
                          </div>
                          <div>
                            <input type="checkbox"  value="ACC"
                              checked={productGroupACC.value === 'ACC'}
                              {...productGroupACC} disabled="disabled"/>
                            <span>Accessory</span>
                          </div>
                          <div>
                            <input type="checkbox"  value="OBA"
                              checked={productGroupOBA.value === 'OBA'}
                              {...productGroupOBA}  disabled="disabled"/>
                            <span>Object Of Art</span>
                          </div>
                          <div>
                            <input type="checkbox"  value="SPP"
                              checked={productGroupSPP.value === 'SPP'}
                              {...productGroupSPP}  disabled="disabled"/>
                            <span>Spare Parts</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="col-sm-2 control-label">View Price</label>
                      <div className="col-sm-4">
                        <label>
                        <input type="radio" {...price} value="Public"
                          checked={price.value === 'Public'}
                        /> Only Public Price
                        </label>
                      </div>
                      <div className="col-sm-4">
                        <label>
                          <input type="radio" {...price} value="Updated"
                            checked={price.value === 'Updated'}
                          /> View Updated Cost and Public Price
                        </label>
                      </div>
                      <div className="col-sm-2">
                        <label>
                        <input type="radio" {...price} value="All"
                          checked={price.value === 'All'}
                        /> View All Price
                        </label>
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="col-sm-2 control-label">Web Only</label>
                      <div className="col-sm-7">
                        <input type="checkbox" {...webOnly}/>
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="col-sm-2 control-label">View On-hand</label>
                      <div className="col-sm-4 ">
                        <label>
                          <input type="checkbox" value="Location" {...onhandLocation}
                            checked={this.state.selectedOnHandLocation}
                            onChange={this.selectedOnHandLocation}
                            ref="location"
                          /> All Site
                          <div className="user-edit">
                            <select multiple
                              {...onhandLocationValue}
                              maxHeight={200} multiple
                              disabled={`${this.state.selectedOnHandLocation ? 'disabled' : ''}`}
                              onChange={this.changedOnHandLocation}
                              ref="selectMultiLocation"
                              onBlur={() => this.props.fields.onhandLocation.onBlur(this.props.fields.onhandLocation.value)}
                            >
                              {dataDropDowntLocations.map(value => <option key={value.value} value={value.value}>{value.name}</option>
                              )}
                            </select>
                          </div>
                        </label>
                      </div>
                      <div className="col-sm-4">
                        <label>
                          <input type="checkbox" value="Warehouse" {...onhandWarehouse}
                            checked={this.state.selectedOnHandWarehouse}
                            onChange={this.selectedOnHandWarehouse}
                            ref="warehouse"
                          /> All Warehouse
                          <div className="user-edit">
                            <select multiple
                              {...onhandWarehouseValue}
                              maxHeight={200} multiple
                              ref="selectMultiWarehouse"
                              disabled={`${this.state.selectedOnHandWarehouse ? 'disabled' : ''}`}>
                              {dataDropDowntWareHouse.map(value => <option key={value.value} value={value.value}>{value.name}</option>
                              )}
                            </select>
                          </div>
                        </label>
                      </div>
                      <div className="col-sm-2 hidden">
                        <label>
                          <input type="checkbox" value="All" {...onhandAll}
                            checked={this.state.selectedOnHandAll}
                            onChange={this.selectedOnHandAll}
                            ref="allLocation"
                          />
                          All Locations
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-12 col-xs-12 m-nopadding text-right">
                  <Link to="/users" className="btn btn-primary btn-radius">Back to User List</Link>
                  <button type="submit" className="btn btn-primary btn-radius" disabled={submitting}>Update User</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

function mapStateToProps(state){
    // console.log('UsersUpdateForm state -->',state);
    return {
           initialValues: state.users.user,
           options: state.users.options,
           locationOnHand: state.users.locationOnHand,
           warehouseOnHand: state.users.warehouseOnHand,
           selectedCompany:state.users.selectedCompany,
           selectedWarehouses:state.users.selectedWarehouses
           }
}

function mapDispatchToProps(dispatch) {
  return {
    optionsActions: bindActionCreators(Object.assign({}, masterDataActions), dispatch)
  }
}

module.exports = reduxForm({ // <----- THIS IS THE IMPORTANT PART!
  form: 'UsersUpdateForm',
  fields: fields,
  validate:validateUserEdit
},mapStateToProps,mapDispatchToProps)(UserDetailsFrom);
