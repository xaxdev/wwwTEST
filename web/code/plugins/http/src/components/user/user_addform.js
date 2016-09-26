import React,{ Component } from 'react';
import { reduxForm } from 'redux-form';
import validateUserAdd from '../../utils/validateuseradd';
import { Link } from 'react-router';
import shallowCompare from 'react-addons-shallow-compare';
import * as masterDataActions from '../../actions/masterdataaction';
// import * as regionActions from '../../actions/regionsaction';
import { bindActionCreators } from 'redux';
// import CheckBoxList from 'react-checkbox-list';
import Multiselect from 'react-bootstrap-multiselect';
import GenPassword from '../../utils/genPassword';
import ReactDOM from 'react-dom';
var _ = require('lodash');

class UsersNewFrom extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hideProductGroups: false,
      productGroupDatas:[],
      selectedCompany: false,
      selectedSite: false,
      // selectedOnHandWarehouse: (this.props.user != undefined)?(this.props.user.onhandWarehouse)? true: false : false,
      selectedOnHandWarehouse: true,
      // selectedOnHandLocation: (this.props.user != undefined)?(this.props.user.onhandLocation)? true: false: false,
      selectedOnHandLocation: true,
      selectedOnHandAll: (this.props.user != undefined)?(!this.props.user.onhandLocation && !this.props.user.onhandWarehouse)? true: false: false,
      genPass:'',
      selectedStatus: true,
      changedOnHandLocation:false,
      clickAllLocarion: true,
      clickAllWarehouse: true
    };

    this.generatePassword = this.generatePassword.bind(this);
    this.selectedCompany = this.selectedCompany.bind(this);
    this.selectedSite = this.selectedSite.bind(this);
    this.selectedProductGroup = this.selectedProductGroup.bind(this);
    this.selectedOnHandWarehouse = this.selectedOnHandWarehouse.bind(this);
    this.selectedOnHandLocation = this.selectedOnHandLocation.bind(this);
    this.changedOnHandLocation = this.changedOnHandLocation.bind(this);
    this.selectedOnHandAll = this.selectedOnHandAll.bind(this);

    this.props.fields.status.onChange(true);
    this.props.fields.onhand.onChange('Warehouse');
    this.props.fields.price.onChange('Public');
    }
  componentWillMount(){
    this.props.optionsActions.get();
  }
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }
  componentDidUpdate(){
    // console.log('componentDidUpdate-->');
    if (this.state.selectedOnHandLocation) {
      if (this.state.clickAllLocarion) {
        // console.log('clickAllLocarion-->true');
        let select = ReactDOM.findDOMNode(this.refs.selectMultiLocation);

        let values = [].filter.call(select.options, function(o) {
            return o.selected || !o.selected;
        }).map(function(o) {
            return o.value;
        });

        _.each(select.options,function (o) {
          o.selected = true;
        });

        let selectWarehouse = ReactDOM.findDOMNode(this.refs.selectMultiWarehouse);

        let valuesWarehouse = [].filter.call(selectWarehouse.options, function(o) {
            return o.selected || !o.selected;
        }).map(function(o) {
            return o.value;
        });

        _.each(selectWarehouse.options,function (o) {
          o.selected = true;
        });
      } else {
        // console.log('clickAllLocarion-->false');
        let select = ReactDOM.findDOMNode(this.refs.selectMultiLocation);

        let values = [].filter.call(select.options, function(o) {
            return o.selected || !o.selected;
        }).map(function(o) {
            return o.value;
        });

        _.each(select.options,function (o) {
          o.selected = false;
        });

        let selectWarehouse = ReactDOM.findDOMNode(this.refs.selectMultiWarehouse);

        let valuesWarehouse = [].filter.call(selectWarehouse.options, function(o) {
            return o.selected || !o.selected;
        }).map(function(o) {
            return o.value;
        });

        _.each(selectWarehouse.options,function (o) {
          o.selected = false;
        });
      }
    }else{
      // Click not checked all location
      let select = ReactDOM.findDOMNode(this.refs.selectMultiLocation);

      let valuesAll = [].filter.call(select.options, function(o) {
          return o.selected || !o.selected;
      }).map(function(o) {
          return o.value;
      });

      let values = [].filter.call(select.options, function(o) {
          return o.selected;
      }).map(function(o) {
          return o.value;
      });

      if (!this.state.changedOnHandLocation) {
        _.each(select.options,function (o) {
          o.selected = false;
        });
      }

      if(this.state.selectedOnHandWarehouse){
        // console.log('this.state.clickAllWarehouse-->',this.state.clickAllWarehouse);
        if (this.state.clickAllWarehouse) {
            let selectWarehouse = ReactDOM.findDOMNode(this.refs.selectMultiWarehouse);
            _.each(selectWarehouse.options,function (o) {
              o.selected = true;
            });
        }
      }else{

        if (!this.state.clickAllWarehouse) {
          // console.log('this.state.clickAllWarehouse--> !false');
          let selectWarehouse = ReactDOM.findDOMNode(this.refs.selectMultiWarehouse);
          let valuesWarehouseAll = [].filter.call(selectWarehouse.options, function(o) {
              return o.selected || !o.selected;
          }).map(function(o) {
              return o.value;
          });
          let valuesWarehouse = [].filter.call(selectWarehouse.options, function(o) {
              return o.selected
          }).map(function(o) {
              return o.value;
          });
          // console.log('valuesWarehouseAll-->',valuesWarehouseAll.length);
          // console.log('valuesWarehouse-->',valuesWarehouse.length);
          if (valuesWarehouseAll.length == valuesWarehouse.length) {
            _.each(selectWarehouse.options,function (o) {
              o.selected = false;
            });
          }else{
            // console.log('valuesWarehouseAll.length != valuesWarehouse.length-->');
            if(!this.state.changedOnHandLocation){
              _.each(selectWarehouse.options,function (o) {
                o.selected = false;
              });
            }
          }
        }else{
          // console.log('this.state.clickAllWarehouse-->true');
        }
      }
    }
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
      // console.log('this selectedLocation-->',this.refs.company.value);
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

  selectedOnHandWarehouse(e) {
    // console.log('e.target.value-->',e.target.value);
    let {
        fields: {
            onhand,
            onhandAll,
            onhandWarehouseValue,
            onhandLocationValue
        }
    } = this.props;
    if (e.target.checked) {
        this.setState({
            selectedOnHandWarehouse: true,
            selectedOnHandAll: true,
            clickAllWarehouse: true
        });

        let select = ReactDOM.findDOMNode(this.refs.selectMultiLocation);

        let values = [].filter.call(select.options, function(o) {
            return o.selected;
        }).map(function(o) {
            return o.value;
        });
        if (values.length != 0) {
            this.setState({
                selectedOnHandLocation: false,
            });
            let selectWarehouse = ReactDOM.findDOMNode(this.refs.selectMultiWarehouse);

            _.each(selectWarehouse.options,function (o) {
              o.selected = false;
            });

            let valuesWarehouse = [].filter.call(selectWarehouse.options, function(o) {
                return !o.selected;
            }).map(function(o) {
                return o.value;
            });
            if(valuesWarehouse.length == 0){
              valuesWarehouse = [].filter.call(this.props.warehouseOnHand, function(o) {
                  return o.code;
              });
            }
            onhandWarehouseValue.onChange(valuesWarehouse);
            onhand.onChange('AllWarehouse');
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
            selectedOnHandAll: false,
            clickAllWarehouse: false
        });

        let selectWarehouse = ReactDOM.findDOMNode(this.refs.selectMultiWarehouse);

        _.each(selectWarehouse.options,function (o) {
          o.selected = false;
        });
        // onhand.value = 'notWarehouse';
        // onhandLocationValue.onChange([]);
        onhandWarehouseValue.onChange([]);
        onhand.onChange('Warehouse');
        onhandAll.onChange(false);
        if (onhandLocationValue.value.length != 0) {
          this.props.optionsActions.getOnHandWarehouse(onhandLocationValue.value);
        }else{
          this.props.optionsActions.getOnHandWarehouse([]);
        }
    }
  }
  selectedOnHandLocation(e) {
    // console.log('e.target.value-->',e.target.value);
    let {
        fields: {
            onhand,
            onhandAll,onhandWarehouseValue
        }
    } = this.props;
    if (e.target.checked) {
        this.setState({
            selectedOnHandWarehouse: true,
            selectedOnHandLocation: true,
            selectedOnHandAll: true,
            changedOnHandLocation: true,
            clickAllLocarion: true
        });

        let select = ReactDOM.findDOMNode(this.refs.selectMultiLocation);

        let values = [].filter.call(select.options, function(o) {
            return o.selected || !o.selected;
        }).map(function(o) {
            return o.value;
        });

        _.each(select.options,function (o) {
          o.selected = false;
        });

        // console.log('values-->',values);
        // this.props.optionsActions.getOnHandWarehouse(values);

        let selectWarehouse = ReactDOM.findDOMNode(this.refs.selectMultiWarehouse);

        let valuesWarehouse = [].filter.call(selectWarehouse.options, function(o) {
            return o.selected || !o.selected;
        }).map(function(o) {
            return o.value;
        });

        _.each(selectWarehouse.options,function (o) {
          o.selected = true;
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
            changedOnHandLocation: false,
            clickAllLocarion: false
        });

        let select = ReactDOM.findDOMNode(this.refs.selectMultiLocation);

        let values = [].filter.call(select.options, function(o) {
            return o.selected || !o.selected;
        }).map(function(o) {
            return o.value;
        });

        _.each(select.options,function (o) {
          o.selected = false;
        });

        // this.props.optionsActions.getOnHandWarehouse(values);

        let selectWarehouse = ReactDOM.findDOMNode(this.refs.selectMultiWarehouse);

        let valuesWarehouse = [].filter.call(selectWarehouse.options, function(o) {
            return o.selected || !o.selected;
        }).map(function(o) {
            return o.value;
        });

        _.each(selectWarehouse.options,function (o) {
          o.selected = false;
        });

        onhandWarehouseValue.onChange([]);

        onhand.onChange('Location');
        onhandAll.onChange(false);
        this.props.optionsActions.getOnHandWarehouse([]);
    }
  }
  selectedOnHandAll(e){
    // console.log('e.target.value-->',e.target.value);
    // console.log('e.target.value-->',e.target.value);
    var {fields: { onhand }} = this.props;
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
    let {
        fields: {
            onhandLocationValue,onhandWarehouseValue
        }
    } = this.props;
    let select = ReactDOM.findDOMNode(this.refs.selectMultiLocation);

    let values = [].filter.call(select.options, function(o) {
        return o.selected;
    }).map(function(o) {
        return o.value;
    });

    if (values.length != 0) {
      this.setState({
        changedOnHandLocation: true,
        selectedOnHandLocation: false,
        selectedOnHandWarehouse: false
      });

      let selectWarehouse = ReactDOM.findDOMNode(this.refs.selectMultiWarehouse);

      _.each(selectWarehouse.options,function (o) {
        o.selected = false;
      });
    }else{
      this.setState({
        changedOnHandLocation: false
      });
    }

    onhandWarehouseValue.onChange([]);
    onhandLocationValue.onChange(values);

    this.props.optionsActions.getOnHandWarehouse(values);
  }
  selectedStatus(e){
    // console.log('e-->',e.target.value);
    if(e.target.value == 'true'){
      this.setState(
        {
          selectedStatus: true
        });
    }else{
      this.setState(
        {
          selectedStatus: false
        });
    }

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
                    <option key={comp.id} value={comp.code}>{comp.name}</option>
                  );
                });
              }
          case 'site':
            if (this.props.options) {
              return this.props.options.locations.map(site =>
                {
                  return (
                    <option key={site.id} value={site.code}>{site.code + ' [' + site.name + ']'}</option>
                  );
                });
            }
          case 'warehouse':
            if (this.props.options) {
              return this.props.options.warehouses.map(warehouse =>
                {
                  return (
                    <option key={warehouse.id} value={warehouse.code}>{warehouse.code + ' [' + warehouse.name + ']'}</option>
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
              firstName,lastName,username,email,password,role,currency,status,company,location,warehouse
              ,productGroup,onhand,price,productGroupSTO,productGroupJLY,productGroupWAT
              ,productGroupACC,productGroupOBA,productGroupSPA,onhandValue,webOnly,onhandLocation,onhandAll
              ,permissionId,onhandWarehouse,onhandWarehouseValue,onhandLocationValue,productGroupErr
          },handleSubmit,invalid,submitting } = this.props;
    // const datas = [{value:'One',selected:true},{value:'Two'},{value:'Three'},{value:'Four',label:'Four Label'}];

    // console.log('warehouseOnHand-->',this.props.warehouseOnHand);
    var dataDropDowntLocations = [];
    var dataDropDowntWareHouse = [];
    var that = this;

    const userLogin = JSON.parse(sessionStorage.logindata);

    if (typeof(this.props.options) !== 'undefined') {
      if (typeof(this.props.warehouseOnHand) !== 'undefined') {
          dataDropDowntWareHouse.push(this.props.warehouseOnHand.map(warehouse => {
              return ({
                  value: warehouse.code,
                  name: warehouse.name
              });
          }))
          dataDropDowntWareHouse = dataDropDowntWareHouse[0];
      }

      if (typeof(this.props.locationOnHand) !== 'undefined') {
          dataDropDowntLocations.push(this.props.locationOnHand.map(location => {
              return ({
                  value: location.code,
                  name: location.name
              });
          }))
          dataDropDowntLocations = dataDropDowntLocations[0];
      }
    }

      return (
        <form onSubmit={handleSubmit}>
          <div className="col-sm-12 bg-hearder bg-header-inventories">
            <div className="col-sm-6 m-width-60 ft-white m-nopadding">
              <h1>Create New User</h1>
            </div>
            <div className="col-sm-6 m-width-40 m-nopadding text-right maring-t15">
              <button type="submit" className="btn btn-primary btn-radius" disabled={submitting}>
                {submitting ? <i/> : <i/>}Save
              </button>
              <Link to="/users" className="btn btn-primary btn-radius">Cancel</Link>
            </div>
          </div>
          <div className="col-sm-12 nopadding">
              <div className="panel panel-default">
                <div className="panel-body">
                  <div className="row margin-ft">
                      <div className="col-sm-12">
                        <h2>User Profile</h2>
                      </div>
                      <div className="col-sm-6 form-horizontal">
                        <div className={`form-group ${firstName.touched && firstName.invalid ? 'has-danger' : ''}` }>
                          <label className="col-sm-4 control-label">First Name</label>
                          <div className="col-sm-7">
                            <input type="text" className="form-control" {...firstName}/>
                            <div className="text-help">
                              { firstName.touched ? firstName.error : ''}
                            </div>
                          </div>
                        </div>
                        <div className={`form-group ${lastName.touched && lastName.invalid ? 'has-danger' : ''}` }>
                          <label className="col-sm-4 control-label">Last Name</label>
                          <div className="col-sm-7">
                            <input type="text" className="form-control" {...lastName}/>
                            <div className="text-help">
                              { lastName.touched ? lastName.error : ''}
                            </div>
                          </div>
                        </div>
                        <div className={`form-group ${email.touched && email.invalid ? 'has-danger' : ''}` }>
                          <label className="col-sm-4 control-label">Email</label>
                          <div className="col-sm-7">
                            <input type="email" className="form-control" {...email}/>
                            <div className="text-help">
                              { email.touched ? email.error : ''}
                            </div>
                          </div>
                        </div>
                        <div className={`form-group ${username.touched && username.invalid ? 'has-danger' : ''}` }>
                          <label className="col-sm-4 control-label">User Name</label>
                          <div className="col-sm-7">
                            <input type="text" className="form-control" {...username}/>
                            <div className="text-help">
                              { username.touched ? username.error : ''}
                            </div>
                          </div>
                        </div>
                        <div className={`form-group ${password.touched && password.invalid ? 'has-danger' : ''}` }>
                          <label className="col-sm-4 control-label">Password</label>
                          <div className="col-sm-7">
                          <input type="text" className="form-control" value={this.state.genPass} ref="password" {...password}/>
                          <div className="text-help">
                            { password.touched ? password.error : ''}
                          </div>
                          <div className="gen-passord">
                            <input type="button" className="btn btn-primary pull-xs-right btn-radius" value="Generate" onClick={this.generatePassword}/>
                          </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-6 form-horizontal">
                        <div className={`form-group ${status.touched && status.invalid ? 'has-danger' : ''}` }>
                          <label className="col-sm-4 control-label">Status</label>
                          <div className="col-sm-7">
                            <input type="checkbox" {...status}
                              checked={this.state.selectedStatus}
                              onChange={event => this.setState({ selectedStatus: event.target.checked })}/>
                              <span>Active</span>
                            <div className="text-help">
                              { status.touched ? status.error : ''}
                            </div>
                          </div>
                        </div>
                          <div className={`form-group ${currency.touched && currency.invalid ? 'has-danger' : ''}` }>
                            <label className="col-sm-4 control-label">Currency</label>
                            <div className="col-sm-7">
                              <select className="form-control" {...currency}>
                                <option key={''} value={''}>{'Please select currency'}</option>
                                {this.renderOption('curr')}
                              </select>
                              <div className="text-help">
                                { currency.touched ? currency.error : ''}
                              </div>
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
                            <select disabled={`${this.state.selectedCompany ? '' : 'disabled'}`} className="form-control" {...location} onClick={this.selectedSite}>
                              <option key={''} value={''}>{'Please select Site'}</option>
                              {this.renderOption('site')}
                            </select>
                            <div className="text-help">
                              { location.touched ? location.error : ''}
                            </div>
                          </div>
                        </div>
                          <div className="form-group">
                            <label className="col-sm-4 control-label">Warehouse</label>
                            <div className="col-sm-7">
                              <select disabled={`${this.state.selectedSite ? '' : 'disabled'}`}  className="form-control" {...warehouse} >
                                <option key={''} value={''}>{'Please select warehouse'}</option>
                                {this.renderOption('warehouse')}
                              </select>
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
                      </div>
                      <div className="col-sm-12 form-horizontal">
                        <div className={`form-group ${role.touched && role.invalid ? 'has-danger' : ''}` }>
                          <label className="col-sm-2 control-label">Role</label>
                          <div className="col-sm-5">
                            <select className="form-control" {...role}>
                              <option key={''} value={''}>{'Please select role'}</option>
                              {this.renderOption('role')}
                            </select>
                            <div className="text-help">
                              { role.touched ? role.error : ''}
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <label className="col-sm-2 control-label">View Product Group</label>
                          <div className="col-sm-5">
                            <select className="form-control" {...productGroup} onClick={this.selectedProductGroup}>
                              <option key={1} value={1}>{'All Prouct Group'}</option>
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
                                  {...productGroupACC}/>
                                <span>Accessory</span>
                              </div>
                              <div>
                                <input type="checkbox"  value="OBA"
                                  checked={productGroupOBA.value === 'OBA'}
                                  {...productGroupOBA}/>
                                <span>Object Of Art</span>
                              </div>
                              <div>
                                <input type="checkbox"  value="SPA"
                                  checked={productGroupSPA.value === 'SPA'}
                                  {...productGroupSPA}/>
                                <span>Spare Parts</span>
                              </div>
                              <div className="text-help">
                                { productGroupErr.touched ? productGroupErr.error : ''}
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
                          <div className="col-sm-4">
                              <input type="checkbox" value="Location" {...onhandLocation}
                                checked={this.state.selectedOnHandLocation}
                                onChange={this.selectedOnHandLocation}
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
                                  {dataDropDowntLocations.map(value => <option key={value.value} value={value.value}>{value.value + ' [' + value.name + ']'}</option>
                                  )}
                                </select>
                              </div>
                          </div>
                          <div className="col-sm-4">
                              <input type="checkbox" value="Warehouse" {...onhandWarehouse}
                                checked={this.state.selectedOnHandWarehouse}
                                onChange={this.selectedOnHandWarehouse}
                              /> All Warehouse
                              <div className="user-edit">
                                <select multiple
                                  {...onhandWarehouseValue}
                                  maxHeight={200} multiple
                                  ref="selectMultiWarehouse"
                                  disabled={`${this.state.selectedOnHandWarehouse ? 'disabled' : ''}`}>
                                  {dataDropDowntWareHouse.map(value => <option key={value.value} value={value.value}>{value.value + ' [' + value.name + ']'}</option>
                                  )}
                                </select>
                              </div>
                          </div>
                          <div className="col-sm-2 hidden">
                            <label>
                              <input type="checkbox" value="All" {...onhandAll}
                                checked={this.state.selectedOnHandAll}
                                onChange={this.selectedOnHandAll} />
                              All Locations
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-12 text-right">
                          <button type="submit" className="btn btn-primary btn-radius" disabled={submitting}>
                            {submitting ? <i/> : <i/>}Save
                          </button>
                          <Link to="/users" className="btn btn-primary btn-radius">Cancel</Link>
                      </div>
                  </div>
                </div>
              </div>
          </div>
        </form>
      );
  }
}

function mapStateToProps(state) {
  // console.log('state add form-->',state);
  return {
    options: state.users.options,
    locationOnHand: state.users.locationOnHand,
    warehouseOnHand: state.users.warehouseOnHand,
    selectedCompany:state.users.selectedCompany,
    selectedWarehouses:state.users.selectedWarehouses,
    statusCode: state.users.statusCode,
    message: state.users.message
  };
}
function mapDispatchToProps(dispatch) {
  return {
    optionsActions: bindActionCreators(Object.assign({}, masterDataActions), dispatch)
  }
}
module.exports = reduxForm({ // <----- THIS IS THE IMPORTANT PART!
  form: 'UsersNewFrom',
  fields: ['firstName','lastName','username','email','password','role','currency','status','company',
          'location','warehouse','productGroup','onhand','price','productGroupSTO','productGroupJLY','productGroupWAT'
          ,'productGroupACC','productGroupOBA','productGroupSPA','onhandValue','webOnly','permissionId'
          ,'onhandLocation','onhandAll','onhandWarehouse','onhandWarehouseValue','onhandLocationValue','productGroupErr'],
  validate:validateUserAdd
},mapStateToProps, mapDispatchToProps)(UsersNewFrom);
