import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import InitDataLocation from '../../utils/initDataLocation';
import InitDataCompany from '../../utils/initDataCompany';
import InitModifyData from '../../utils/initModifyData';
import jQuery from 'jquery';
let _ = require('lodash');
let X = XLSX;

class SalesReportHeader extends Component {
    constructor(props) {
        super(props);

        this.handleLocationSelectChange = this.handleLocationSelectChange.bind(this);
        this.handleWarehouseSelectChange = this.handleWarehouseSelectChange.bind(this);
        this.handleDominantStoneSelectChange = this.handleDominantStoneSelectChange.bind(this);
        this.handleSalesChannelSelectChange = this.handleSalesChannelSelectChange.bind(this);
        this.readFile = this.readFile.bind(this);
    }

    componentDidMount() {
        jQuery('#file').hide();
        jQuery('#btn-browsefile').click(function(){
            jQuery('#file').click();
              });
        jQuery('#file').change(function() {

            let filename =jQuery('#file')[0].files[0];
            //alert(filename.name);
            jQuery('#fileName').text(filename.name);
        });
    }

    handleLocationSelectChange = LocationSelectValue => {
        const { props } = this.props;
        let {fields:{ location }, searchResult} = props;

        let paramsLocation = (searchResult.paramsSearch != null)?
                              searchResult.paramsSearch.location:
                              null;

        paramsLocation = LocationSelectValue;

        location.onChange(LocationSelectValue);
        location.value = LocationSelectValue;
        props.inventoryActions.setDataLocation(LocationSelectValue);
        let vlues = LocationSelectValue.split(',');
        props.masterDataActions.getSalesWarehouse(vlues);
    }

    handleWarehouseSelectChange = WarehouseSelectValue => {
        const { props } = this.props;
        let {fields:{ warehouse}, searchResult} = props;

        let paramsHeader = (searchResult.paramsSearch != null)?
                              searchResult.paramsSearch:
                              null;


        if(paramsHeader != null)
            paramsHeader.warehouse = WarehouseSelectValue;

        warehouse.onChange(WarehouseSelectValue);
        warehouse.value = WarehouseSelectValue;
        props.inventoryActions.setDataWarehouse(WarehouseSelectValue);
    }

    handleDominantStoneSelectChange = DominantStoneSelectValue => {
        const { props } = this.props;
        let { fields: { dominantStone }, searchResult } = props;

        let paramsSearch = (searchResult.paramsSearch != null)?
                              searchResult.paramsSearch:
                              null;
        if(paramsSearch != null)
            paramsSearch.dominantStone = DominantStoneSelectValue;

        dominantStone.onChange(DominantStoneSelectValue);
        props.inventoryActions.setDataDominantStone(DominantStoneSelectValue);
    }

    handleSalesChannelSelectChange = SalesChannelSelectValue => {
        const { props } = this.props;
        let { fields: { salesChannel }, searchResult } = props;

        let paramsSearch = (searchResult.paramsSearch != null)?
                              searchResult.paramsSearch:
                              null;
        if(paramsSearch != null)
            paramsSearch.salesChannel = SalesChannelSelectValue;

        salesChannel.onChange(SalesChannelSelectValue);
        props.salesActions.setDataSalesChannel(SalesChannelSelectValue);
    }

    readFile = e => {
        e.preventDefault();
        const { props } = this.props;
        let that = this;
        let { fields:{reference }} = props;
        let X = XLSX;
        let rABS = false;
        let use_worker = false;

        let files = e.target.files;

        let f = files[0];
        {
      		let reader = new FileReader();
      		let name = f.name;
      		reader.onload = function(e) {
                  let data = e.target.result;
                  let arr = xls.fixdata(data);
                  let wb = X.read(btoa(arr), {type: 'base64'});
                  let items = xls.process_wb(wb);
                  reference.onChange(items.item);
                  that.props.setItemsOrder(items.AllData);
      		}
            if(rABS) reader.readAsBinaryString(f);
            else reader.readAsArrayBuffer(f);
    	};
    }

    render() {
        const { props } = this.props;
        const userLogin = JSON.parse(sessionStorage.logindata);
        const host = HOSTNAME || 'localhost';
        const ROOT_URL = (host != 'mol.mouawad.com')? `//${host}:3005`: `//${host}`;

        let {
            fields: {
                reference, description, certificatedNumber, sku, customer, salesPersonName, invoiceNo, invoiceDateFrom, invoiceDateTo, totalCostFrom,
                totalCostTo, totalUpdatedCostFrom, totalUpdatedCostTo, retailPriceFrom, retailPriceTo, netSalesFrom, netSalesTo, marginFrom, marginTo,
                discountFrom, discountTo
            }
        } = props;

        let dataDropDowntLocations = [];
        let dataDropDowntWareHouse = [];
        let dataDropDowntDominantStone = [];
        let dataDropDowntSalesChannel = [];
        let that = this;

        if(userLogin.permission.salesLocation != undefined){
            if(userLogin.permission.salesLocation.type == 'SalesLocation' || userLogin.permission.salesLocation.type == 'All'){
                if (props.options != undefined){
                    if (props.options.companies) {
                        dataDropDowntLocations = InitDataCompany(props.options.companies, userLogin);
                    }
                }
            }
        }

        if (props.options != undefined){
            if (props.options.salesChannels) {
                dataDropDowntSalesChannel.push(props.options.salesChannels.map(salesChannel =>{
                    return ({value: salesChannel.code, label:salesChannel.name});
                }))
                dataDropDowntSalesChannel = dataDropDowntSalesChannel[0];
            }
            if (props.options.dominantStones) {
                dataDropDowntDominantStone.push(props.options.dominantStones.map(dominantStone =>{
                    return ({value: dominantStone.code, label:dominantStone.name});
                }))
                dataDropDowntDominantStone = dataDropDowntDominantStone[0];
            }
            if (props.warehouseSales) {
                let newDate = [];
                let data = [];
                if(userLogin.permission.salesWarehouse != undefined){
                    if (userLogin.permission.salesWarehouse.type == 'SalesWarehouse'){
                        userLogin.permission.salesWarehouse.places.forEach(function(settingWarehouse){
                            newDate.push(_.filter(that.props.props.warehouseSales,
                                function(warehouse){
                                    if(warehouse.code != undefined){
                                      return warehouse.code.toString() == settingWarehouse;
                                    }
                                }
                            ));
                        });
                    }
                    if (userLogin.permission.salesWarehouse.type == 'All'){
                        dataDropDowntLocations.forEach(function(location){
                            newDate.push(_.filter(that.props.props.warehouseSales,
                              function(warehouse)
                              { return warehouse.comid == location.value})
                            );
                        });
                    }
                }
                let subdata = [];
                newDate.forEach(newdata =>{
                    newdata.forEach(subdata =>{
                      data.push(subdata);
                    })
                });

                dataDropDowntWareHouse.push(data.map(warehouse =>{
                    return ({value: warehouse.code,label:warehouse.code +' ['+ warehouse.name + ']'});
                }))
                dataDropDowntWareHouse = dataDropDowntWareHouse[0];
            }
        }

        return (
            <div>
                <div className="row">
                    <div className="col-sm-12">
                        <div className="panel panel-default">
                            <div className="panel-body">
                                <div className="row margin-ft">
                                    <div className="col-md-12 col-sm-12 form-horizontal">
                                        <div className="form-group">
                                            <label className="col-sm-2 control-label">Item Reference</label>
                                            <div className="col-sm-10">
                                                <input type="text" className="form-control"
                                                   placeholder="Enter Multiple Item Ref separated with comma" {...reference}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-sm-12 form-horizontal">
                                        <div className="form-group">
                                            <label className="col-sm-4 control-label">Item Description</label>
                                            <div className="col-sm-7">
                                                <input type="text" className="form-control" {...description}/>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="col-sm-4 control-label">Certificated Number</label>
                                            <div className="col-sm-7">
                                                <input type="text" className="form-control" {...certificatedNumber}/>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="col-sm-4 control-label">SKU</label>
                                            <div className="col-sm-7">
                                                <input type="text" className="form-control" {...sku}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-sm-12 form-horizontal">
                                        <div className={`form-group ${(userLogin.permission.salesLocation != undefined) ? '' :
                                                          'hidden'}` }>
                                            <label className="col-sm-4 control-label">Company</label>
                                            <div className= "col-sm-7">
                                                <Select multi simpleValue
                                                    value={props.LocationValue}
                                                    placeholder="Select your Company"
                                                    options={dataDropDowntLocations}
                                                    onChange={this.handleLocationSelectChange}
                                                    disabled={(userLogin.permission.salesLocation != undefined) ? false : true}
                                                    ref="location"/>
                                            </div>
                                        </div>
                                        <div className={`form-group ${(userLogin.permission.salesWarehouse != undefined) ?'' :
                                                          'hidden'}` }>
                                            <label className="col-sm-4 control-label">Location</label>
                                            <div className="col-sm-7">
                                                <Select multi simpleValue
                                                  value={props.WarehouseValue}
                                                  placeholder="Select your Location"
                                                  options={dataDropDowntWareHouse}
                                                  onChange={this.handleWarehouseSelectChange}
                                                  disabled={(userLogin.permission.salesWarehouse != undefined) ? false : true}/>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="col-sm-4 control-label">Dominant Stone</label>
                                            <div className="col-sm-7">
                                                <Select multi simpleValue value={props.DominantStoneValue}
                                                  placeholder="Select your Dominant Stone"
                                                  options={dataDropDowntDominantStone}
                                                  onChange={this.handleDominantStoneSelectChange} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="panel-body">
                                <div className="row margin-ft">
                                    <div className="row gemstone-bar">
                                    </div>
                                    <div className="col-md-12 col-sm-12 form-horizontal">
                                        <div className="form-group">
                                            <label className="col-sm-2 control-label">Customer Search</label>
                                            <div className="col-sm-10">
                                                <input type="text" className="form-control"
                                                   placeholder="Customer Name, ID, Email, Phone Number" {...customer}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-sm-12 form-horizontal">
                                        <div className="form-group">
                                            <label className="col-sm-4 control-label">Sales Person Name</label>
                                            <div className="col-sm-7">
                                                <input type="text" className="form-control" {...salesPersonName}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-sm-12 form-horizontal">
                                        <div className="form-group">
                                            <label className="col-sm-4 control-label">Channel</label>
                                            <div className="col-sm-7">
                                                <Select multi simpleValue value={props.SalesChannelValue}
                                                  placeholder="Select your Sales Channel"
                                                  options={dataDropDowntSalesChannel}
                                                  onChange={this.handleSalesChannelSelectChange} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="panel-body">
                                <div className="row margin-ft">
                                    <div className="row gemstone-bar">
                                    </div>
                                    <div className="col-md-12 col-sm-12 form-horizontal">
                                        <div className="form-group">
                                            <label className="col-sm-2 control-label">Invoice No.</label>
                                            <div className="col-sm-10">
                                                <input type="text" className="form-control"
                                                   placeholder="" {...invoiceNo}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-sm-12 form-horizontal">
                                        <div className="form-group">
                                            <label className="col-sm-4 control-label">Invoice Date</label>
                                            <div className="col-sm-7">
                                                <label className="col-sm-2 control-label padding-l font-nor">From: </label>
                                                <div className="col-sm-4 nopadding">
                                                    <input type="number" className="form-control" {...invoiceDateFrom}/>
                                                </div>
                                                <label className="col-sm-2 control-label font-nor m-margin-t10 m-nopadding">To: </label>
                                                <div className="col-sm-4 nopadding">
                                                    <input type="number" className="form-control" {...invoiceDateTo}/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={`form-group ${(userLogin.permission.price == 'All') ?
                                            '' : 'hidden'}`}>
                                            <label className="col-sm-4 control-label">Cost Price ({userLogin.currency})</label>
                                            <div className="col-sm-7">
                                                <label className="col-sm-2 control-label padding-l font-nor">From: </label>
                                                <div className="col-sm-4 nopadding">
                                                    <input type="number" className="form-control" {...totalCostFrom}/>
                                                </div>
                                                <label className="col-sm-2 control-label font-nor m-margin-t10 m-nopadding">To: </label>
                                                <div className="col-sm-4 nopadding">
                                                    <input type="number" className="form-control" {...totalCostTo}/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-sm-12 form-horizontal">
                                        <div className={`form-group ${(userLogin.permission.price == 'Updated'
                                                                      || userLogin.permission.price == 'All') ?
                                                                      '' : 'hidden'}`}>
                                            <label className="col-sm-4 control-label">Updated Cost ({userLogin.currency})</label>
                                            <div className="col-sm-7">
                                                <label className="col-sm-2 control-label padding-l font-nor">From: </label>
                                                <div className="col-sm-4 nopadding">
                                                    <input type="number" className="form-control" {...totalUpdatedCostFrom}/>
                                                </div>
                                                <label className="col-sm-2 control-label font-nor m-margin-t10 m-nopadding">To: </label>
                                                <div className="col-sm-4 nopadding">
                                                    <input type="number" className="form-control" {...totalUpdatedCostTo}/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={`form-group ${(userLogin.permission.price == 'Public'
                                                                      || userLogin.permission.price == 'Updated'
                                                                      || userLogin.permission.price == 'All') ?
                                                                    '' : 'hidden'}`}>
                                            <label className="col-sm-4 control-label">Retail Price ({userLogin.currency})</label>
                                            <div className="col-sm-7">
                                                <label className="col-sm-2 control-label padding-l font-nor">From: </label>
                                                <div className="col-sm-4 nopadding">
                                                    <input type="number" className="form-control" {...retailPriceFrom}/>
                                                </div>
                                                <label className="col-sm-2 control-label font-nor m-margin-t10 m-nopadding">To: </label>
                                                <div className="col-sm-4 nopadding">
                                                    <input type="number" className="form-control" {...retailPriceTo}/>
                                                </div>
                                           </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="panel-body">
                                <div className="row margin-ft">
                                    <div className="row gemstone-bar">
                                    </div>
                                    <div className="col-md-6 col-sm-12 form-horizontal">
                                        <div className="form-group">
                                            <label className="col-sm-4 control-label">Net Sales ({userLogin.currency})</label>
                                            <div className="col-sm-7">
                                                <label className="col-sm-2 control-label padding-l font-nor">From: </label>
                                                <div className="col-sm-4 nopadding">
                                                    <input type="number" className="form-control" {...netSalesFrom}/>
                                                </div>
                                                <label className="col-sm-2 control-label font-nor m-margin-t10 m-nopadding">To: </label>
                                                <div className="col-sm-4 nopadding">
                                                    <input type="number" className="form-control" {...netSalesTo}/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="col-sm-4 control-label">Margin %</label>
                                            <div className="col-sm-7">
                                                <label className="col-sm-2 control-label padding-l font-nor">From: </label>
                                                <div className="col-sm-4 nopadding">
                                                    <input type="number" className="form-control" {...marginFrom}/>
                                                </div>
                                                <label className="col-sm-2 control-label font-nor m-margin-t10 m-nopadding">To: </label>
                                                <div className="col-sm-4 nopadding">
                                                    <input type="number" className="form-control" {...marginTo}/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="col-sm-4 control-label">Discount %</label>
                                            <div className="col-sm-7">
                                                <label className="col-sm-2 control-label padding-l font-nor">From: </label>
                                                <div className="col-sm-4 nopadding">
                                                    <input type="number" className="form-control" {...discountFrom}/>
                                                </div>
                                                <label className="col-sm-2 control-label font-nor m-margin-t10 m-nopadding">To: </label>
                                                <div className="col-sm-4 nopadding">
                                                    <input type="number" className="form-control" {...discountTo}/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-sm-12 form-horizontal">
                                        <div className="form-group">
                                            <label className="col-sm-4 control-label">Attachment</label>
                                            <div className="col-sm-7">
                                                <input id="file" type="file" field={reference} onChange={this.readFile}/>
                                                <span id="fileName"></span>
                                                <input type="button" id="btn-browsefile" value=" "/>
                                                <div className="font-nor control-label">The system able to import only excel file. Click here to download a format file <a href={ROOT_URL+'/upload_file/Mol_upload_items.xlsx'} >Mol upload items.xlsx</a></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

module.exports = connect(null,null)(SalesReportHeader);
