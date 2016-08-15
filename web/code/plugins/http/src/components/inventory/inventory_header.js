import React, { Component, PropTypes } from 'react';
import Select from 'react-select';
import InitDataLocation from '../../utils/initDataLocation';
import InitModifyData from '../../utils/initModifyData';
import * as xls from '../../utils/xls';
import jQuery from 'jquery';
var _ = require('lodash');
var X = XLSX;

class InventoryHeader extends Component {
  constructor(props) {
    super(props);

    this.handleWarehouseSelectChange = this.handleWarehouseSelectChange.bind(this);
    this.handleLocationSelectChange = this.handleLocationSelectChange.bind(this);
    this.readFile = this.readFile.bind(this);
  }
  handleWarehouseSelectChange (WarehouseSelectValue) {
    // console.log('WarehouseValue-->',WarehouseValue);
    var {fields:{ warehouse}, searchResult} = this.props.props;

    var paramsHeader = (searchResult.paramsSearch != null)?
                          searchResult.paramsSearch:
                          null;


    if(paramsHeader != null)
       paramsHeader.warehouse = WarehouseSelectValue;

    warehouse.onChange(WarehouseSelectValue);
    warehouse.value = WarehouseSelectValue;
    this.props.props.inventoryActions.setDataWarehouse(WarehouseSelectValue);
	}
  handleLocationSelectChange(LocationSelectValue){
    var {fields:{ location },searchResult} = this.props.props;

    var paramsLocation = (searchResult.paramsSearch != null)?
                          searchResult.paramsSearch.location:
                          null;

    // if(paramsLocation != null)
      paramsLocation = LocationSelectValue;

    location.onChange(LocationSelectValue);
    location.value = LocationSelectValue;
    this.props.props.inventoryActions.setDataLocation(LocationSelectValue);
    let vlues = LocationSelectValue.split(',');
    this.props.props.masterDataActions.getOnHandWarehouse(vlues);
  }
  componentDidMount() {
      jQuery('#file').hide();
      jQuery('#btn-browsefile').click(function(){
          jQuery('#file').click();
            });
      jQuery('#file').change(function() {

          var filename =jQuery('#file')[0].files[0];
          //alert(filename.name);
          jQuery('#fileName').text(filename.name);
      });

  }
  readFile(e){
    e.preventDefault();
    var { fields:{reference }} = this.props.props;
    var X = XLSX;

    var that = this;
    var rABS = false;
    var use_worker = false;

    var files = e.target.files;
    var f = files[0];
    {
		var reader = new FileReader();
		var name = f.name;
		reader.onload = function(e) {
			// if(typeof console !== 'undefined') console.log('onload', new Date(), rABS, use_worker);
			var data = e.target.result;

				var arr = xls.fixdata(data);
				var wb = X.read(btoa(arr), {type: 'base64'});
				var items = xls.process_wb(wb);
        reference.onChange(items);
        // console.log(JSON.stringify(items, 2, 2));
			}
		};
		if(rABS) reader.readAsBinaryString(f);
		else reader.readAsArrayBuffer(f);
  }
  render() {
    // console.log('props-->',this.props.props);
    var { fields:
            {
              reference,description,venderReference,vendorName,certificatedNumber,sku,location,warehouse,attachment
            }
          } = this.props.props;
    const userLogin = JSON.parse(sessionStorage.logindata);

    // console.log('userLogin-->',userLogin);

    InitModifyData(this.props.props);

    var dataDropDowntLocations = [];
    var dataDropDowntWareHouse = [];
    var that = this;

    if(userLogin.permission.onhandLocation != undefined){
      if(userLogin.permission.onhandLocation.type == 'Location'
        || userLogin.permission.onhandLocation.type == 'All'){
        if (this.props.props.options != undefined){
          if (this.props.props.options.locations) {
            dataDropDowntLocations = InitDataLocation(this.props.props.options.locations,userLogin);
          }
        }
      }
    }
    if (this.props.props.options != undefined){
      if (this.props.props.options.warehouses) {
        var newDate = [];
        var data = [];
        if(dataDropDowntLocations.length != 0){
          dataDropDowntLocations.forEach(function(location){
            newDate.push(_.filter(that.props.props.options.warehouses,
              function(warehouse)
              { return warehouse.locationid == location.value})
            );
          });
        }else{
          if(userLogin.permission.onhandWarehouse != undefined){
            if (userLogin.permission.onhandWarehouse.type == 'Warehouse'
              || userLogin.permission.onhandWarehouse.type == 'All'){
              userLogin.permission.onhandWarehouse.places.forEach(function(settingWarehouse){
                newDate.push(_.filter(that.props.props.options.warehouses,
                  function(warehouse){
                    // console.log('warehouse.id-->',warehouse.id);
                    if(warehouse.code != undefined){
                      return warehouse.code.toString() == settingWarehouse;
                    }
                  })
                );
              });
            }
          }
        }

        var subdata = [];
        newDate.forEach(newdata =>{
            newdata.forEach(subdata =>{
              data.push(subdata);
            })
        });

        dataDropDowntWareHouse.push(data.map(warehouse =>{
            return ({value: warehouse.code,label:warehouse.code +' ['+ warehouse.name + ']'});
          })
        )
        dataDropDowntWareHouse = dataDropDowntWareHouse[0];
      }
    }

    return (
      <div >
        <div className="row">
          <div className="col-sm-12">
            <div className="panel panel-default">
              <div className="panel-body">
                <div className="row margin-ft">
                  <div className="col-sm-6 form-horizontal">
                      <div className="form-group">
                        <label className="col-sm-4 control-label">Item Reference</label>
                         <div className="col-sm-7">
                            <input type="text" className="form-control" {...reference}/>
                         </div>
                      </div>
                      <div className="form-group">
                        <label className="col-sm-4 control-label">Item Description</label>
                        <div className="col-sm-7">
                            <input type="text" className="form-control" {...description}/>
                        </div>
                      </div>
                      <div className="form-group">
                        <label className="col-sm-4 control-label">Vendor Item Reference</label>
                        <div className="col-sm-7">
                            <input type="text" className="form-control" {...venderReference}/>
                        </div>
                      </div>
                      <div className="form-group">
                        <label className="col-sm-4 control-label">Vendor Name</label>
                        <div className="col-sm-7">
                            <input type="text" className="form-control" {...vendorName}/>
                        </div>
                      </div>
                      <div className="form-group">
                        <label className="col-sm-4 control-label">Certificated Number</label>
                        <div className="col-sm-7">
                            <input type="text" className="form-control" {...certificatedNumber}/>
                        </div>
                      </div>
                  </div>
                  <div className="col-sm-6 form-horizontal">
                      <div className="form-group">
                        <label className="col-sm-4 control-label">SKU</label>
                        <div className="col-sm-7">
                            <input type="text" className="form-control" {...sku}/>
                        </div>
                      </div>
                      <div className={`form-group ${(userLogin.permission.onhandLocation != undefined) ? '' :
                                        'hidden'}` }>
                        <label className="col-sm-4 control-label">Site</label>
                        <div className= "col-sm-7">
                          <Select multi simpleValue
                              value={this.props.props.LocationValue}
                              placeholder="Select your Site"
                              options={dataDropDowntLocations}
                              onChange={this.handleLocationSelectChange}
                              disabled={(userLogin.permission.onhandLocation != undefined) ? false : true}
                              ref="location"/>
                        </div>
                      </div>
                      <div className={`form-group ${(userLogin.permission.onhandWarehouse != undefined) ?'' :
                                        'hidden'}` }>
                        <label className="col-sm-4 control-label">Warehouse</label>
                        <div className="col-sm-7">
                            <Select multi simpleValue
                              value={this.props.props.WarehouseValue}
                              placeholder="Select your Warehouse"
                              options={dataDropDowntWareHouse}
                              onChange={this.handleWarehouseSelectChange}
                              disabled={(userLogin.permission.onhandWarehouse != undefined) ? false : true}/>
                        </div>
                      </div>
                      <div className="form-group">
                        <label className="col-sm-4 control-label">Attachment</label>
                        <div className="col-sm-7">

                          <input id="file" type="file" field={reference} onChange={this.readFile}/>
                          <span id="fileName"></span>
                          <input type="button" id="btn-browsefile" value=" "/>
                        </div>
                      </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = InventoryHeader;