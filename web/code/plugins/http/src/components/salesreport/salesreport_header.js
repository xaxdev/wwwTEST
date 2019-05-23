import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import Calendar from 'react-input-calendar';
import moment from 'moment';
import Autosuggest from 'react-autosuggest';
import InitDataSalesCompany from '../../utils/initDataSalesCompany';
import InitDataSalesChannel from '../../utils/initDataSalesChannel';
import InitModifySalesData from '../../utils/initModifySalesData';
import * as xls from '../../utils/xls';
import * as inventoryActions from '../../actions/inventoryactions';
import GetSalesPricePermission from '../../utils/getSalesPricePermission';
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
        this.handleChangeStart = this.handleChangeStart.bind(this);
        this.handleChangeEnd = this.handleChangeEnd.bind(this);
        this.readFile = this.readFile.bind(this);
        this.selectedCustomerSearch = this.selectedCustomerSearch.bind(this);

        this.state = {
            startDate: null,
            endDate: null,
            treeViewData: null,
            suggestions: []
        }
    }

    componentDidMount() {
        const { props } = this.props;
        let { fields: { customer }, CustomerSelectedType } = props
        props.salesActions.setCustomerSearch(customer.value)
        
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

        let paramsLocation = (searchResult.paramsSalesSearch != null)? searchResult.paramsSalesSearch.location: null;

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

        let paramsHeader = (searchResult.paramsSalesSearch != null)? searchResult.paramsSalesSearch: null;


        if(paramsHeader != null)
            paramsHeader.warehouse = WarehouseSelectValue;

        warehouse.onChange(WarehouseSelectValue);
        warehouse.value = WarehouseSelectValue;
        props.inventoryActions.setDataWarehouse(WarehouseSelectValue);
    }

    handleDominantStoneSelectChange = DominantStoneSelectValue => {
        const { props } = this.props;
        let { fields: { dominantStone }, searchResult } = props;

        let paramsSalesSearch = (searchResult.paramsSalesSearch != null)? searchResult.paramsSalesSearch: null;
        if(paramsSalesSearch != null)
            paramsSalesSearch.dominantStone = DominantStoneSelectValue;

        dominantStone.onChange(DominantStoneSelectValue);
        props.inventoryActions.setDataDominantStone(DominantStoneSelectValue);
    }

    handleSalesChannelSelectChange = SalesChannelSelectValue => {
        const { props } = this.props;
        let { fields: { salesChannel }, searchResult } = props;

        let paramsSalesSearch = (searchResult.paramsSalesSearch != null)? searchResult.paramsSalesSearch: null;
        if(paramsSalesSearch != null)
            paramsSalesSearch.salesChannel = SalesChannelSelectValue;

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
                that.props.setItemsSalesOrder(items.AllData);
      		}
            if(rABS) reader.readAsBinaryString(f);
            else reader.readAsArrayBuffer(f);
    	};
    }

    handleChangeStart(startDate){
        const { props } = this.props;
        let { fields: { invoiceDateFrom }, searchResult } = props;

        let paramsSalesSearch = (searchResult.paramsSalesSearch != null)? searchResult.paramsSalesSearch : null;
        if(paramsSalesSearch != null)
            paramsSalesSearch.invoiceDateFrom = startDate;

        invoiceDateFrom.onChange(startDate);
        this.setState({startDate});
        this.handleChangeDate({ startDate });
    }

    handleChangeEnd(endDate){
        const { props } = this.props;
        let { fields: { invoiceDateTo }, searchResult } = props;

        let paramsSalesSearch = (searchResult.paramsSalesSearch != null)? searchResult.paramsSalesSearch : null;
        if(paramsSalesSearch != null)
            paramsSalesSearch.invoiceDateTo = endDate;

        invoiceDateTo.onChange(endDate);
        this.setState({endDate});
        this.handleChangeDate({ endDate });
    }

    handleChangeDate ({ startDate, endDate }) {
        const { props } = this.props;
        let startDateM = (typeof startDate !== 'undefined')? moment(startDate,'MM-DD-YYYY') : moment(this.state.startDate,'MM-DD-YYYY');
        let endDateM = (typeof endDate !== 'undefined')? moment(endDate,'MM-DD-YYYY') : moment(this.state.endDate,'MM-DD-YYYY');

        if (startDateM.isAfter(endDateM)) {
            let temp = startDate || this.state.startDate;
            startDate = endDate|| this.state.endDate;
            endDate = temp
        }else{
            if(startDate == undefined){
                if (startDateM._isValid) {
                    startDate = startDateM._i;
                }
            }
            if(endDate == undefined){
                if (endDateM._isValid) {
                    endDate = endDateM._i;
                }
            }
        }

        this.setState({ startDate, endDate })
        props.inventoryActions.setInvoiceDateFrom(startDate);
        props.inventoryActions.setInvoiceDateTo(endDate);
    }

    selectedCustomerSearch(e){
        const { props } = this.props;
        let { fields: { customerSearch } } = props
        const { value } = e.target
        
        props.salesActions.setCustomerSearch('')
        this.setState({ suggestions: [] });
        customerSearch.onChange(value)
        props.salesActions.setCustomerType(value)
    }

    onChangeTypeSuggest = (event, { newValue }) => {
        const { props } = this.props;
        let { fields: { customer } } = props
        customer.onChange(newValue)
        props.salesActions.setCustomerSearch(newValue)
    };

    onSuggestionsFetchRequested = ({ value }) => {
        const { CustomerSelectedType } = this.props.props
        const { customers } = this.props.props.options;
        this.setState({ suggestions: getSuggestions(value, customers, CustomerSelectedType)});
    };

    onSuggestionsClearRequested = () => {
        this.setState({ suggestions: [] });
    };

    render() {
        const { props } = this.props;
        const userLogin = JSON.parse(sessionStorage.logindata);
        const host = HOSTNAME || 'localhost';
        const ROOT_URL = (host != 'mol.mouawad.com')? `//${host}:${(ENVIRONMENT!='staging')?3005:4005}`: `//${host}`;

        let {
            fields: {
                reference, description, certificatedNumber, sku, salesPersonName, invoiceNo, totalCostFrom,
                totalCostTo, totalUpdatedCostFrom, totalUpdatedCostTo, retailPriceFrom, retailPriceTo, netSalesFrom, netSalesTo, marginFrom, marginTo,
                discountFrom, discountTo, customerSearch
            }, searchResult, CustomerSelectedType, CustomerSearchValue
        } = props;

        const { suggestions } = this.state

        InitModifySalesData(this.props.props);

        let dataDropDowntLocations = [];
        let dataDropDowntWareHouse = [];
        let dataDropDowntDominantStone = [];
        let dataDropDowntSalesChannel = [];
        let that = this;

        let paramsSalesSearch = (searchResult.paramsSalesSearch != null)? searchResult.paramsSalesSearch: null;

        if(userLogin.permission.salesLocation != undefined){
            if(userLogin.permission.salesLocation.type == 'SalesLocation' || userLogin.permission.salesLocation.type == 'All'){
                if (props.options != undefined){
                    if (props.options.companies) {
                        dataDropDowntLocations = InitDataSalesCompany(props.options.companies, userLogin);
                    }
                }
            }
        }

        if(userLogin.permission.salesChannel != undefined){
            if(userLogin.permission.salesChannel.type == 'SalesChannel' || userLogin.permission.salesChannel.type == 'All'){
                if (props.options != undefined){
                    if (props.options.salesChannels) {
                        dataDropDowntSalesChannel = InitDataSalesChannel(props.options.salesChannels, userLogin);
                    }
                }
            }
        }

        if (props.options != undefined){
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
                    if (userLogin.permission.salesWarehouse.type == 'All' || userLogin.permission.salesWarehouse.type == 'AllSalesWarehouse'){
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

        const priceSalesRTP = GetSalesPricePermission(userLogin.permission.priceSales).priceSalesRTP;
        const priceSalesUCP = GetSalesPricePermission(userLogin.permission.priceSales).priceSalesUCP;
        const priceSalesCTP = GetSalesPricePermission(userLogin.permission.priceSales).priceSalesCTP;
        const priceSalesNSP = GetSalesPricePermission(userLogin.permission.priceSales).priceSalesNSP;
        const priceSalesMGP = GetSalesPricePermission(userLogin.permission.priceSales).priceSalesMGP;
        const priceSalesDSP = GetSalesPricePermission(userLogin.permission.priceSales).priceSalesDSP;

        let calendarDateFrom = null
        if (paramsSalesSearch != null ) {
            if (paramsSalesSearch.invoiceDateFrom != '' && paramsSalesSearch.invoiceDateFrom != null ) {
                calendarDateFrom = moment(paramsSalesSearch.invoiceDateFrom,'MM-DD-YYYY').format('MM/DD/YYYY')
            }else{
                calendarDateFrom = ''
            }
        }else{
            if (props.InvoiceDateFrom != null) {
                calendarDateFrom = moment(props.InvoiceDateFrom,'MM-DD-YYYY').format('MM/DD/YYYY')
            } else {
                calendarDateFrom = props.InvoiceDateFrom
            }
        }

        let calendarDateTo = null
        if (paramsSalesSearch != null ) {
            if (paramsSalesSearch.invoiceDateTo != '' && paramsSalesSearch.invoiceDateTo != null) {
                calendarDateTo = moment(paramsSalesSearch.invoiceDateTo,'MM-DD-YYYY').format('MM/DD/YYYY')
            }else{
                calendarDateTo = ''
            }
        }else{
            if (props.InvoiceDateTo != null) {
                calendarDateTo = moment(props.InvoiceDateTo,'MM-DD-YYYY').format('MM/DD/YYYY')
            } else {
                calendarDateTo = props.InvoiceDateTo
            }
        }

        // Autosuggest will pass through all these props to the input.
        const inputProps = {
            placeholder: 
                CustomerSelectedType=='name'?'Customer Name':
                CustomerSelectedType=='id'?'Customer Id':
                CustomerSelectedType=='email'?'Customer Email':
                CustomerSelectedType=='phone'?'Customer Phone Number':'',
            value: CustomerSearchValue,
            onChange: this.onChangeTypeSuggest
        };

        return (
            <div>
                <div className="row">
                    <div className="col-sm-12">
                        <div className="panel panel-default">
                            <div className="block_title_sale">
                                <div className="row margin-ft">
                                    <div className="col-md-12 col-sm-12 form-horizontal">
                                        <h2 className="title_sales">Period</h2>
                                    </div>
                                </div>
                            </div>
                            <div className="panel-body">
                                <div className="row margin-ft">
                                    <div className="col-md-12 col-sm-12 form-horizontal">
                                        <div className="form-group">
                                            <div className="row salesreport-bar"></div>
                                            <label className="col-md-2 col-sm-4 control-label">Invoice Date</label>
                                            <div className="col-md-4 col-sm-6">
                                                <label className="col-sm-2 control-label padding-l font-nor">From: </label>
                                                <div className="col-sm-10 nopadding">
                                                    <Calendar format="MM-DD-YYYY" closeOnSelect = {true} onChange={this.handleChangeStart}
                                                        date={calendarDateFrom} />
                                                </div>
                                                <label className="col-sm-2 control-label font-nor m-margin-t10 m-nopadding">To: </label>
                                                <div className="col-sm-10 nopadding">
                                                    <Calendar format="MM-DD-YYYY" closeOnSelect = {true} onChange={this.handleChangeEnd}
                                                        date={calendarDateTo} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="block_title_sale">
                                <div className="row margin-ft">
                                    <div className="col-md-12 col-sm-12 form-horizontal">
                                        <h2 className="title_sales">Location</h2>
                                    </div>
                                </div>
                            </div>
                            <div className="panel-body">
                                <div className="row margin-ft">
                                    <div className="row salesreport-bar"></div>
                                    <div className="col-md-6 col-sm-12 form-horizontal">
                                        <div className={`form-group ${(userLogin.permission.salesLocation != undefined) ? '' : 'hidden'}` }>
                                            <label className="col-sm-4 control-label">Company</label>
                                            <div className= "col-sm-7">
                                                <Select multi simpleValue value={props.LocationValue} placeholder="Select your Company"
                                                    options={dataDropDowntLocations} onChange={this.handleLocationSelectChange}
                                                    disabled={(userLogin.permission.salesLocation != undefined) ? false : true} ref="location"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-sm-12 form-horizontal">
                                        <div className={`form-group ${(userLogin.permission.salesWarehouse != undefined) ?'' : 'hidden'}` }>
                                            <label className="col-sm-4 control-label">Boutique</label>
                                            <div className="col-sm-7">
                                                <Select multi simpleValue value={props.WarehouseValue} placeholder="Select your Boutique"
                                                    options={dataDropDowntWareHouse} onChange={this.handleWarehouseSelectChange}
                                                    disabled={(userLogin.permission.salesWarehouse != undefined) ? false : true}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="block_title_sale">
                                <div className="row margin-ft">
                                    <div className="col-md-12 col-sm-12 form-horizontal">
                                        <h2 className="title_sales">Customer</h2>
                                    </div>
                                </div>
                            </div>
                            <div className="panel-body">
                                <div className="row margin-ft">
                                    <div className="row salesreport-bar"></div>
                                    <div className="col-md-6 col-sm-12 form-horizontal">
                                        <div className="form-group">
                                            <label className="col-sm-4 control-label">Customer Search</label>
                                            <div className="col-sm-7 salesreport-input">
                                                <div className={`${(CustomerSelectedType != 'name') ? 'hidden' : ''}` }>
                                                    <Autosuggest  id="name" suggestions={suggestions} 
                                                        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                                                        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                                                        getSuggestionValue={getSuggestionValueName}
                                                        renderSuggestion={renderSuggestionName}
                                                        inputProps={inputProps}/>
                                                </div>
                                                <div className={`${(CustomerSelectedType != 'id') ? 'hidden' : ''}` }>
                                                    <Autosuggest id="id" suggestions={suggestions} 
                                                        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                                                        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                                                        getSuggestionValue={getSuggestionValueId}
                                                        renderSuggestion={renderSuggestionId}
                                                        inputProps={inputProps}/>
                                                </div>
                                                <div className={`${(CustomerSelectedType != 'email') ? 'hidden' : ''}` }>
                                                    <Autosuggest id="email" suggestions={suggestions} 
                                                        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                                                        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                                                        getSuggestionValue={getSuggestionValueEmail}
                                                        renderSuggestion={renderSuggestionEmail}
                                                        inputProps={inputProps}/>
                                                </div>
                                                <div className={`${(CustomerSelectedType != 'phone') ? 'hidden' : ''}` }>
                                                    <Autosuggest id="phone" suggestions={suggestions} 
                                                        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                                                        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                                                        getSuggestionValue={getSuggestionValuePhone}
                                                        renderSuggestion={renderSuggestionPhone}
                                                        inputProps={inputProps}/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-sm-12 form-horizontal">
                                        <div className="form-group">
                                            <label className="col-sm-4 control-label">Select Customer Search</label>
                                            <div className="col-sm-7">
                                            <select className="form-control" {...customerSearch} onChange={this.selectedCustomerSearch} ref="customerSearch">
                                                <option key={'name'} value={'name'}>{'Name'}</option>
                                                <option key={'id'} value={'id'}>{'Id'}</option>
                                                <option key={'email'} value={'email'}>{'Email'}</option>
                                                <option key={'phone'} value={'phone'}>{'Phone Number'}</option>
                                            </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-12 col-sm-12 form-horizontal">
                                        <div className="form-group">
                                            <label className="col-md-2 col-sm-4 control-label">Invoice No.</label>
                                            <div className="col-md-10 col-sm-7 salesreport-input">
                                                <input type="text" className="form-control"
                                                   placeholder="" {...invoiceNo}/>
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
                                                <Select multi simpleValue value={props.SalesChannelValue} placeholder="Select your Sales Channel"
                                                    options={dataDropDowntSalesChannel} onChange={this.handleSalesChannelSelectChange} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="block_title_sale">
                                <div className="row margin-ft">
                                    <div className="col-md-12 col-sm-12 form-horizontal">
                                    <h2 className="title_sales">Inventory</h2>
                                    </div>
                                </div>
                            </div>
                            <div className="panel-body">
                                <div className="row margin-ft">
                                    <div className="row salesreport-bar"></div>
                                    <div className="col-md-12 col-sm-12 form-horizontal">
                                        <div className="form-group">
                                            <label className="col-md-2 col-sm-4 control-label">Item Reference</label>
                                            <div className="col-md-10 col-sm-7 salesreport-input">
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
                                            <label className="col-sm-4 control-label">Certificate Number</label>
                                            <div className="col-sm-7">
                                                <input type="text" className="form-control" {...certificatedNumber}/>
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
                                    </div>
                                </div>
                            </div>
                            <div className="block_title_sale">
                                <div className="row margin-ft">
                                    <div className="col-md-12 col-sm-12 form-horizontal">
                                        <h2 className="title_sales"> Value</h2>
                                    </div>
                                </div>
                            </div>
                            <div className="panel-body">
                                <div className="row margin-ft">
                                    <div className="row salesreport-bar"></div>
                                    <div className="col-md-6 col-sm-12 form-horizontal">
                                        <div className={`form-group ${(priceSalesCTP) ? '' : 'hidden'}`}>
                                            <label className="col-sm-4 control-label">Cost Price (USD)</label>
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
                                        <div className={`form-group ${(priceSalesRTP) ? '' : 'hidden'}`}>
                                            <label className="col-sm-4 control-label">Price (USD)</label>
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
                                        <div className={`form-group ${(priceSalesMGP) ? '' : 'hidden'}`}>
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
                                        <div className={`form-group ${(priceSalesDSP) ? '' : 'hidden'}`}>
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
                                        <div className={`form-group ${(priceSalesUCP) ? '' : 'hidden'}`}>
                                            <label className="col-sm-4 control-label">Updated Cost (USD)</label>
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
                                        <div className={`form-group ${(priceSalesNSP) ? '' : 'hidden'}`}>
                                            <label className="col-sm-4 control-label">Net Sales (USD)</label>
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

module.exports = connect(null,inventoryActions)(SalesReportHeader);

// Teach Autosuggest how to calculate suggestions for any given input value.
const getSuggestions = (value, customers, type) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    switch (type) {
        case 'phone':
            return inputLength === 0 ? [] : customers.filter(cus =>        
                cus.retailMobilePrimary.toLowerCase().slice(0, inputLength) === inputValue
            );
        case 'email':
            return inputLength === 0 ? [] : customers.filter(cus =>        
                cus.email.toLowerCase().slice(0, inputLength) === inputValue
            );
        case 'id':
            return inputLength === 0 ? [] : customers.filter(cus =>        
                cus.accountNumber.toLowerCase().slice(0, inputLength) === inputValue
            );
        case 'name':
            return inputLength === 0 ? [] : customers.filter(cus =>        
                cus.customerName.toLowerCase().slice(0, inputLength) === inputValue
            );
        default:
            break;
    }  
};
// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValueName = suggestion => suggestion.customerName;
const getSuggestionValueId = suggestion => suggestion.accountNumber;
const getSuggestionValueEmail = suggestion => suggestion.email;
const getSuggestionValuePhone = suggestion => suggestion.retailMobilePrimary;

// Use your imagination to render suggestions.
const renderSuggestionName = suggestion => (<div>{suggestion.customerName}</div>);
const renderSuggestionId = suggestion => (<div>{suggestion.accountNumber}</div>);
const renderSuggestionEmail = suggestion => (<div>{suggestion.email}</div>);
const renderSuggestionPhone = suggestion => (<div>{suggestion.retailMobilePrimary}</div>);