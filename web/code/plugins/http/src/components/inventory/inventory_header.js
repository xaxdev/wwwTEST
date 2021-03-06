import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import InitDataLocation from '../../utils/initDataLocation';
import InitDataCompany from '../../utils/initDataCompany';
import InitModifyData from '../../utils/initModifyData';
import * as xls from '../../utils/xls';
import * as inventoryActions from '../../actions/inventoryactions';
import jQuery from 'jquery';
let _ = require('lodash');
let X = XLSX;

class InventoryHeader extends Component {
    constructor(props) {
        super(props);

        this.handleWarehouseSelectChange = this.handleWarehouseSelectChange.bind(this);
        this.handleLocationSelectChange = this.handleLocationSelectChange.bind(this);
        this.handleDominantStoneSelectChange = this.handleDominantStoneSelectChange.bind(this);
        this.readFile = this.readFile.bind(this);
    }

    handleWarehouseSelectChange (WarehouseSelectValue) {
        let {fields:{ warehouse}, searchResult} = this.props.props;

        let paramsHeader = (searchResult.paramsSearch != null)? searchResult.paramsSearch: null;

        if(paramsHeader != null)
            paramsHeader.warehouse = WarehouseSelectValue;

        warehouse.onChange(WarehouseSelectValue);
        warehouse.value = WarehouseSelectValue;
        this.props.props.inventoryActions.setDataWarehouse(WarehouseSelectValue);
    }

    handleLocationSelectChange(LocationSelectValue){
        let {fields:{ location },searchResult} = this.props.props;

        let paramsLocation = (searchResult.paramsSearch != null)? searchResult.paramsSearch.location: null;

        paramsLocation = LocationSelectValue;

        location.onChange(LocationSelectValue);
        location.value = LocationSelectValue;
        this.props.props.inventoryActions.setDataLocation(LocationSelectValue);
        let vlues = LocationSelectValue.split(',');
        this.props.props.masterDataActions.getOnHandWarehouse(vlues);
    }

    handleDominantStoneSelectChange(DominantStoneSelectValue){
        const { props } = this.props;
        let { fields: { dominantStone }, searchResult } = props;

        let paramsSearch = (searchResult.paramsSearch != null)? searchResult.paramsSearch: null;
        if(paramsSearch != null)
            paramsSearch.dominantStone = DominantStoneSelectValue;

        dominantStone.onChange(DominantStoneSelectValue);
        props.inventoryActions.setDataDominantStone(DominantStoneSelectValue);
    }

    selectedSpecialDiscount = e => {
        const { props } = this.props;
        let { fields: { specialDiscount }, searchResult } = props;

        let paramsSearch = (searchResult.paramsSearch != null) ? searchResult.paramsSearch : null;

        if(paramsSearch != null)
            paramsSearch.specialDiscount = e.target.checked? 1: 0;

        if (e.target.checked) {
            specialDiscount.onChange(1);
        }else{
            specialDiscount.onChange(0);
        }

        props.inventoryActions.setSpecialDiscount(e.target.checked? 1: 0);
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

    readFile(e){
        e.preventDefault();
        let that = this;
        let { fields:{reference }} = this.props.props;
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
        let {
            fields: {
                reference,description,venderReference,vendorName,certificatedNumber,sku,location,warehouse,attachment,totalCostFrom,totalCostTo,
                totalUpdatedCostFrom, totalUpdatedCostTo, publicPriceFrom,publicPriceTo, specialDiscount
            }
        } = this.props.props;
        const userLogin = JSON.parse(sessionStorage.logindata);
        const host = HOSTNAME || 'localhost';
        const ROOT_URL = (host != 'mol.mouawad.com')? `//${host}:${(ENVIRONMENT!='staging')?3005:4005}`: `//${host}`;

        InitModifyData(this.props.props);

        let dataDropDowntLocations = [];
        let dataDropDowntWareHouse = [];
        let dataDropDowntDominantStone = [];
        let that = this;

        if(userLogin.permission.onhandLocation != undefined){
            if(userLogin.permission.onhandLocation.type == 'Location' || userLogin.permission.onhandLocation.type == 'All'){
                if (this.props.props.options != undefined){
                    if (this.props.props.options.companies) {
                        dataDropDowntLocations = InitDataCompany(this.props.props.options.companies,userLogin);
                    }
                }
            }
        }
        if (this.props.props.options != undefined){
            if (this.props.props.options.dominantStones) {
                dataDropDowntDominantStone.push(this.props.props.options.dominantStones.map(dominantStone =>{
                    return ({value: dominantStone.code,label:dominantStone.name});
                }))
                dataDropDowntDominantStone = dataDropDowntDominantStone[0];
            }

            if (this.props.props.options.warehouses) {
                let newDate = [];
                let data = [];
                if(userLogin.permission.onhandWarehouse != undefined){
                    if (userLogin.permission.onhandWarehouse.type == 'Warehouse'){
                        userLogin.permission.onhandWarehouse.places.forEach(function(settingWarehouse){
                            newDate.push(_.filter(that.props.props.options.warehouses,
                                function(warehouse){
                                    if(warehouse.code != undefined){
                                        return warehouse.code.toString() == settingWarehouse;
                                    }
                                }
                            ));
                        });
                    }
                    if (userLogin.permission.onhandWarehouse.type == 'All'){
                        dataDropDowntLocations.forEach(function(location){
                            newDate.push(_.filter(that.props.props.options.warehouses,
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
            <div >
                <div className="row">
                    <div className="col-sm-12">
                        <div className="panel panel-default">
                            <div className="panel-body">
                                <div className="row margin-ft">
                                    <div className="col-md-6 col-sm-12 form-horizontal">
                                        <div className="form-group">
                                            <label className="col-sm-4 control-label">Item Reference</label>
                                             <div className="col-sm-7">
                                                <input type="text" className="form-control"
                                                    placeholder="Enter Multiple Item Ref separated with comma" {...reference}/>
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
                                            <label className="col-sm-4 control-label">Certificate Number</label>
                                            <div className="col-sm-7">
                                                <input type="text" className="form-control" {...certificatedNumber}/>
                                            </div>
                                        </div>
                                        <div className={`form-group ${(userLogin.permission.onhandLocation != undefined) ? '' : 'hidden'}` }>
                                            <label className="col-sm-4 control-label">Company</label>
                                            <div className= "col-sm-7">
                                                <Select multi simpleValue value={this.props.props.LocationValue} placeholder="Select your Company"
                                                    options={dataDropDowntLocations} onChange={this.handleLocationSelectChange}
                                                    disabled={(userLogin.permission.onhandLocation != undefined) ? false : true} ref="location"/>
                                            </div>
                                        </div>
                                        <div className={`form-group ${(userLogin.permission.onhandWarehouse != undefined) ?'' : 'hidden'}` }>
                                            <label className="col-sm-4 control-label">Location</label>
                                            <div className="col-sm-7">
                                                <Select multi simpleValue value={this.props.props.WarehouseValue} placeholder="Select your Location"
                                                    options={dataDropDowntWareHouse} onChange={this.handleWarehouseSelectChange}
                                                    disabled={(userLogin.permission.onhandWarehouse != undefined) ? false : true}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-sm-12 form-horizontal">
                                        <div className="form-group">
                                            <label className="col-sm-4 control-label">SKU</label>
                                            <div className="col-sm-7">
                                                <input type="text" className="form-control" {...sku}/>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="col-sm-4 control-label">Dominant Stone</label>
                                            <div className="col-sm-7">
                                                <Select multi simpleValue value={props.DominantStoneValue} placeholder="Select your Dominant Stone"
                                                    options={dataDropDowntDominantStone} onChange={this.handleDominantStoneSelectChange} />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="col-sm-4 control-label">Special Discount</label>
                                            <div className="col-sm-7">
                                                <input type="checkbox" value="Discount" {...specialDiscount} checked={(props.SpecialDiscount==1)?true:false}
                                                    onChange={this.selectedSpecialDiscount} />
                                            </div>
                                        </div>
                                        <div className={`form-group ${(userLogin.permission.price == 'All') ? '' : 'hidden'}`}>
                                            <label className="col-sm-4 control-label">Initial Cost ({userLogin.currency})</label>
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
                                        <div className={`form-group ${(userLogin.permission.price == 'Updated' || userLogin.permission.price == 'All') ?
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
                                        <div className={`form-group ${(userLogin.permission.price == 'Public' || userLogin.permission.price == 'Updated'
                                            || userLogin.permission.price == 'All') ? '' : 'hidden'}`}>
                                            <label className="col-sm-4 control-label">Retail Price ({userLogin.currency})</label>
                                            <div className="col-sm-7">
                                                <label className="col-sm-2 control-label padding-l font-nor">From: </label>
                                                <div className="col-sm-4 nopadding">
                                                    <input type="number" className="form-control" {...publicPriceFrom}/>
                                                </div>
                                                <label className="col-sm-2 control-label font-nor m-margin-t10 m-nopadding">To: </label>
                                                <div className="col-sm-4 nopadding">
                                                    <input type="number" className="form-control" {...publicPriceTo}/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="col-sm-4 control-label">Attachment</label>
                                            <div className="col-sm-7">
                                                <input id="file" type="file" field={reference} onChange={this.readFile}/>
                                                <span id="fileName"></span>
                                                <input type="button" id="btn-browsefile" value=" "/>
                                                <div className="font-nor control-label">
                                                    The system able to import only excel file. Click here to download a format file
                                                    <a href={ROOT_URL+'/upload_file/Mol_upload_items.xlsx'} >Mol upload items.xlsx</a>
                                                </div>
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

module.exports = connect(null,inventoryActions)(InventoryHeader);
