import React, { Component, PropTypes }from 'react';
import { connect } from 'react-redux';
import { reduxForm, reset } from 'redux-form';
import { Button,FormControl,Pagination, ControlLabel, DropdownButton, MenuItem } from 'react-bootstrap';
import { Link } from 'react-router';
import { Modal, ModalClose } from 'react-modal-bootstrap';
import jQuery from 'jquery';
var _ = require('lodash');
var Loading = require('react-loading');
import * as itemactions from '../../actions/itemactions';
import PureInput from '../../utils/PureInput';
import GridItemsView from '../../components/searchresults/griditemview';
import ListItemsView from '../../components/searchresults/listitemview';
import numberFormat from '../../utils/convertNumberformatwithcomma';
// var XLSX = require('xlsx')

const checkFields = ['metalType', 'site', 'size', 'cut', 'metalColor', 'certificatedNumber', 'caseDimension',
      'color', 'collection', 'certificateDate','obaDimension', 'clarity', 'brand', 'dominantStone', 'grossWeight',
      'cutGrade'];
const labels = {
  metalType: 'Metal Type',
  site: 'Warehouse',
  size: 'Size',
  cut: 'Cut',
  metalColor: 'Meta lColor',
  certificatedNumber: 'Certificate Number',
  caseDimension: 'Case Dimension',
  color: 'Color',
  collection: 'Collection',
  certificateDate: 'Certificate Date',
  obaDimension: 'OBA Dimension',
  clarity: 'Clarity',
  brand: 'Brand',
  dominantStone: 'Dominant Stone',
  grossWeight: 'Gross Weight',
  cutGrade: 'Cut Grade'
}

class SearchResult extends Component {
  constructor(props) {
    super(props);

    this.handleSelect = this.handleSelect.bind(this);
    this.handleGo = this.handleGo.bind(this);
    this.onClickGrid = this.onClickGrid.bind(this);
    this.gridViewResults = this.gridViewResults.bind(this);
    this.listViewResults = this.listViewResults.bind(this);
    this.sortingBy = this.sortingBy.bind(this);
    this.sortingDirection = this.sortingDirection.bind(this);
    this.newSearch = this.newSearch.bind(this);
    this.modifySearch = this.modifySearch.bind(this);
    this.exportExcel = this.exportExcel.bind(this);
    this.confirmExport = this.confirmExport.bind(this);

    this.state = {
      activePage: this.props.currentPage,
      showGridView: true,
      showListView: false,
      isExport: false,
      isOpen: false,
      allFields:false,
      showImages:false,
      metalType:false,
      site:false,
      size:false,
      cut:false,
      metalColor:false,
      certificatedNumber:false,
      caseDimension:false,
      color:false,
      collection:false,
      certificateDate:false,
      obaDimension:false,
      clarity:false,
      brand:false,
      dominantStone:false,
      grossWeight:false,
      cutGrade:false,
    };
  }
  componentWillMount() {
      // console.log('this.props.currentPage->',this.props.currentPage);
      var params = {
        'page' : this.props.currentPage,
        'sortBy': 'itemCreatedDate',
        'sortDirections': 'desc'
      };  // default search params

      const { filters } =  this.props;
      // console.log('filters-->',filters);
      filters.forEach(function(filter){
        var keys = Object.keys(filter);
        keys.forEach((key) => {
          const value = filter[key];
          params[key] = value;
        });
      });

      this.props.getItems(params);
  }
  componentDidMount() {
    jQuery('#printproduct').click( function(){

          var dvContainerPrint = jQuery('#dvContainerPrint').html();
          var printWindow = window.open('', '', 'height=800,width=1200');
          printWindow.document.write('<html><head><title>Mol online 2016</title>');
          printWindow.document.write('</head><body >');
          printWindow.document.write(dvContainerPrint);
          printWindow.document.write('</body></html>');
          printWindow.document.close();
          printWindow.print();
    });
  }

  handleSelect(eventKey) {
      this.setState({
        activePage: eventKey
      });
      const sortingBy = this.refs.sortingBy.value;
      const sortingDirection = this.refs.sortingDirection.value;

      var params = {
        'page' : eventKey,
        'sortBy': sortingBy,
        'sortDirections': sortingDirection
      };
      const { filters } =  this.props;
      filters.forEach(function(filter){
        var keys = Object.keys(filter);
        keys.forEach((key) => {
          const value = filter[key];
          params[key] = value;
        });
      });
      this.props.getItems(params);
      var { currPage } = this.props.fields;
      currPage.onChange(eventKey);
  }
  handleGo(e){
    e.preventDefault();
    // console.log('handleGo-->',this.refs.reletego.value);
    const getPage = parseInt((this.refs.reletego.value != ''?this.refs.reletego.value:this.state.activePage));
    const sortingBy = this.refs.sortingBy.value;
    const sortingDirection = this.refs.sortingDirection.value;

    this.setState({
      activePage: getPage
    });
    // console.log('getPage-->',getPage);
    var params = {
      'page' : getPage,
      'sortBy': sortingBy,
      'sortDirections': sortingDirection
    };
    const { filters } =  this.props;
    filters.forEach(function(filter){
      var keys = Object.keys(filter);
      keys.forEach((key) => {
        const value = filter[key];
        params[key] = value;
      });
    });
    // console.log('params-->',params);
    this.props.getItems(params);
  }
  renderPagination(){
    const { fields: { currPage },
            totalPages,
            currentPage,
            items,
            handleSubmit,
            resetForm,
            submitting } = this.props;
    // console.log('currPage-->',currPage);

    return(
        <div>
            <Pagination
             prev
             next
             first
             last
             ellipsis
             boundaryLinks
             items={totalPages}
             maxButtons={5}
             activePage={this.state.activePage}
             onSelect={this.handleSelect} />

            <div>
              <span>Page</span>
                <input type="text" placeholder={this.state.activePage} ref="reletego" {...currPage}/>
              <span>of</span>
              <span>{numberFormat(totalPages)}</span>
              <button type="button" disabled={submitting} onClick={this.handleGo}>Go</button>
            </div>

        </div>

      );
  }
  renderTotals(){
    const { fields: { currPage },
            totalPages,
            currentPage,
            items,totalPublicPrice,totalUpdatedCost,allItems,
            handleSubmit,
            resetForm,
            submitting } = this.props;
      // var _totalUpdatedCost = new Intl.NumberFormat().format(totalUpdatedCost);
    var _totalUpdatedCost =  (totalUpdatedCost!=null)?totalUpdatedCost.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'):0;
    var _totalPublicPrice =  (totalPublicPrice!=null)?totalPublicPrice.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'):0;

    const userLogin = JSON.parse(sessionStorage.logindata);

    return(
      <div>
          <span><span className="font-b fc-000">Total Items :</span> <span className="font-w9">{ numberFormat(allItems.length) } Items </span><span className="padding-lf15">|</span></span>
          <span className={`${(userLogin.permission.price == 'Public' || userLogin.permission.price == 'Updated'
              || userLogin.permission.price == 'All') ?
              '' : 'hidden'}`}>
              <span className="font-b fc-000">Total Public Price :</span> <span className="font-w9">{ _totalPublicPrice } { userLogin.currency }</span><span className="padding-lf15">
              |
              </span>
          </span>
          <span className={`${(userLogin.permission.price == 'Updated' || userLogin.permission.price == 'All') ?
              '' : 'hidden'}`}>
              <span className="font-b fc-000">Total Updated Cost :</span> <span className="font-w9">{ _totalUpdatedCost } { userLogin.currency }
              </span>
          </span>
      </div>
    );
  }
  onClickGrid(pageNumber) {
    // console.log('onClickGrid==>',pageNumber);
    const token = sessionStorage.token;
    if(token){
        this.context.router.push(`/productdetail/${pageNumber}`);
    }
    // this.setState({ currentPage: pageNumber });
  }
  gridViewResults(){
    this.setState({
      showGridView: true,
      showListView:false
    });
  }
  listViewResults(){
    this.setState({
      showGridView: false,
      showListView: true
    });
  }
  sortingBy(e){
    const sortingBy = e.target.value;
    const { searchResult } = this.props;
    const sortingDirection = this.refs.sortingDirection.value;
    // console.log('searchResult-->',searchResult);

    // this.props.sortBy(searchResult, sortingBy, sortingDirection);
    var params = {
      'page' : searchResult.currentPage,
      'sortBy': sortingBy,
      'sortDirections': sortingDirection
    };
    const { filters } =  this.props;
    filters.forEach(function(filter){
      var keys = Object.keys(filter);
      keys.forEach((key) => {
        const value = filter[key];
        params[key] = value;
      });
    });
    this.props.getItems(params);
  }
  sortingDirection(e){
    const sortingDirection = e.target.value;
    const { searchResult } = this.props;
    const sortingBy = this.refs.sortingBy.value;

    // this.props.sortBy(searchResult, sortingBy, sortingDirection);
    var params = {
      'page' : searchResult.currentPage,
      'sortBy': sortingBy,
      'sortDirections': sortingDirection
    };
    const { filters } =  this.props;
    filters.forEach(function(filter){
      var keys = Object.keys(filter);
      keys.forEach((key) => {
        const value = filter[key];
        params[key] = value;
      });
    });
    this.props.getItems(params);
  }
  newSearch(e){
    e.preventDefault();
    const token = sessionStorage.token;
    this.props.newSearch();
    if(token){
      this.context.router.push('/inventories');
    }
  }
  modifySearch(e){
    e.preventDefault();
    const token = sessionStorage.token;
    this.props.modifySearch(this.props.paramsSearch);
    if(token){
      this.context.router.push('/inventories');
    }
  }
  openModal(){
    this.setState({ isOpen: true });
  }
  hideModal = (e) => {
    e.preventDefault();

    this.setState({
      isOpen: false,
    });
  }
  exportExcel(){
    this.setState({
      isOpen: true,
    });
  }
  s2ab(s) {
  	var buf = new ArrayBuffer(s.length);
  	var view = new Uint8Array(buf);
  	for (var i=0; i!=s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
  	return buf;
  }
  sheet_from_array_of_arrays(data, opts) {
  	var ws = {};
  	var range = {s: {c:10000000, r:10000000}, e: {c:0, r:0 }};
  	for(var R = 0; R != data.length; ++R) {
  		for(var C = 0; C != data[R].length; ++C) {
  			if(range.s.r > R) range.s.r = R;
  			if(range.s.c > C) range.s.c = C;
  			if(range.e.r < R) range.e.r = R;
  			if(range.e.c < C) range.e.c = C;
  			var cell = {v: data[R][C] };
  			if(cell.v == null) continue;
  			var cell_ref = XLSX.utils.encode_cell({c:C,r:R});

  			if(typeof cell.v === 'number') cell.t = 'n';
  			else if(typeof cell.v === 'boolean') cell.t = 'b';
  			else if(cell.v instanceof Date) {
  				cell.t = 'n'; cell.z = XLSX.SSF._table[14];
  				cell.v = datenum(cell.v);
  			}
  			else cell.t = 's';

  			ws[cell_ref] = cell;
  		}
  	}
  	if(range.s.c < 10000000) ws['!ref'] = XLSX.utils.encode_range(range);
  	return ws;
  }
  Workbook() {
  	if(!(this instanceof Workbook)) return new Workbook();
  	this.SheetNames = [];
  	this.Sheets = {};
  }
  confirmExport(e){
    e.preventDefault();
    const that = this;
    const { items } = this.props;
    // console.log('this',this);
    var titles = ['Item Reference', 'Description', 'SKU', 'Location', 'Vendor Item Reference', 'Vendor Name',
                  'Public Price', 'Quantity', 'Unit'];
    if(this.state.allFields){
      titles.push('Metal Type', 'Site', 'Size', 'Cut', 'Metal Color', 'Certificate Number', 'Case Dimension',
                  'Color', 'Collection', 'Certificate Date','OBA Dimension', 'Clarity', 'Brand', 'Dominant Stone',
                  'Gross Weight', 'Cut Grade');
    }else{
      if(this.state.metalType) titles.push('Metal Type');
      if(this.state.site) titles.push('Site');
      if(this.state.size) titles.push('Size');
      if(this.state.cut) titles.push('Cut');
      if(this.state.metalColor) titles.push('Metal Color');
      if(this.state.certificatedNumber) titles.push('Certificate Number');
      if(this.state.caseDimension) titles.push('Case Dimension');
      if(this.state.color) titles.push('Color');
      if(this.state.collection) titles.push('Collection');
      if(this.state.certificateDate) titles.push('Certificate Date');
      if(this.state.obaDimension) titles.push('OBA Dimension');
      if(this.state.clarity) titles.push('Clarity');
      if(this.state.brand) titles.push('Brand');
      if(this.state.dominantStone) titles.push('Dominant Stone');
      if(this.state.grossWeight) titles.push('Gross Weight');
      if(this.state.cutGrade) titles.push('Cut Grade');
    }
    if (this.state.showImages) titles.push('Images');

    var data = [titles];
    items.forEach(function(item){
      var arrayItems = [];

      arrayItems.push(item.reference,item.description,item.sku,item.location,item.venderReference,'Vendor Name',
                      item.priceUSD,'Quantity','Unit');

      if(that.state.allFields){
        arrayItems.push(item.metalType,item.site,item.size,item.cut,item.metalColor,item.certificatedNumber,
                        item.caseDimension,item.color,item.collection,item.certificateDate,item.obaDimension,
                        item.clarity,item.brand,item.dominantStone,item.grossWeight,item.cutGrade
                      );
      }else{
        if(that.state.metalType) arrayItems.push(item.metalType);
        if(that.state.site) arrayItems.push(item.site);
        if(that.state.size) arrayItems.push(item.size);
        if(that.state.cut) arrayItems.push(item.cut);
        if(that.state.metalColor) arrayItems.push(item.metalColor);
        if(that.state.certificatedNumber) arrayItems.push(item.certificatedNumber);
        if(that.state.caseDimension) arrayItems.push(item.caseDimension);
        if(that.state.color) arrayItems.push(item.color);
        if(that.state.collection) arrayItems.push(item.collection);
        if(that.state.certificateDate) arrayItems.push(item.certificateDate);
        if(that.state.obaDimension) arrayItems.push(item.obaDimension);
        if(that.state.clarity) arrayItems.push(item.clarity);
        if(that.state.brand) arrayItems.push(item.brand);
        if(that.state.dominantStone) arrayItems.push(item.dominantStone);
        if(that.state.grossWeight) arrayItems.push(item.grossWeight);
        if(that.state.cutGrade) arrayItems.push(item.cutGrade);
      }

      if (that.state.showImages) arrayItems.push(item.gallery[0].thumbnail);

      data.push(arrayItems);
    });

    var ws_name = 'Items';
    /* set up workbook objects -- some of these will not be required in the future */
    var wb = {}
    wb.Sheets = {};
    wb.Props = {};
    wb.SSF = {};
    wb.SheetNames = [];

    /* create worksheet: */
    var ws = {}

    /* the range object is used to keep track of the range of the sheet */
    var range = {s: {c:0, r:0}, e: {c:0, r:0 }};

    /* Iterate through each element in the structure */
    for(var R = 0; R != data.length; ++R) {
      if(range.e.r < R) range.e.r = R;
      for(var C = 0; C != data[R].length; ++C) {
        if(range.e.c < C) range.e.c = C;

        /* create cell object: .v is the actual data */
        var cell = { v: data[R][C] };
        if(cell.v == null) continue;

        /* create the correct cell reference */
        var cell_ref = XLSX.utils.encode_cell({c:C,r:R});

        /* determine the cell type */
        if(typeof cell.v === 'number') cell.t = 'n';
        else if(typeof cell.v === 'boolean') cell.t = 'b';
        else cell.t = 's';

        /* add to structure */
        ws[cell_ref] = cell;
      }
    }
    ws['!ref'] = XLSX.utils.encode_range(range);

        /* add worksheet to workbook */
    wb.SheetNames.push(ws_name);
    wb.Sheets[ws_name] = ws;

    /* write file */
    var wbout = XLSX.write(wb, {bookType:'xlsx', bookSST:false, type: 'binary'});
    saveAs(new Blob([this.s2ab(wbout)],{type:'application/octet-stream'}), 'MolProduct.xlsx')

  }
  renderExportExcelDialog(){
    var that = this;
    return(
      <div >
        <Modal isOpen={this.state.isOpen} onRequestHide={this.hideModal}>
          <div className="modal-header">
            <ModalClose onClick={this.hideModal}/>
            <h1 className="modal-title">Export</h1>
          </div>
          <div className="modal-body">
            <h3>Please choose additional fields for exprot.</h3>
            <h5>(Normal export field Item Reference, Description, SKU, Location, Vendor Item Reference, Vendor Name, Public Price, Quantity, Unit)</h5>
            <br/>
            <div className="col-sm-12">
              <div className="col-sm-3">
                <input type="checkbox" onChange={event => that.setState({ allFields: event.target.checked })}/>
                <label className="control-label">Select All</label>
              </div>
              <div className="col-sm-3">
                <input type="checkbox" onChange={event => that.setState({ showImages: event.target.checked })}/>
                <label className="control-label">Show Images</label>
              </div>
              <div className="col-sm-3">
              </div>
              <div className="col-sm-3">
              </div>
            </div>
            <div className="col-md-12">
              {checkFields.map(function(field, index){
                  return(
                        <div className="col-md-3" key={index}>
                          <label key={index}>
                            <input id={index} type="checkbox" disabled={`${that.state.allFields ? 'disabled' : ''}`}
                              onChange={event => that.setState({ [field]: event.target.checked })}/>
                            {labels[ field ]}
                          </label>
                        </div>
                  );
                }
              )}
            </div>
          </div>
          <div className="modal-footer">
            <button className="btn btn-default btn-radius" onClick={this.confirmExport}>
              Export
            </button>
            <button className="btn btn-default btn-radius" onClick={this.hideModal}>
              Cancel
            </button>
          </div>
        </Modal>
       </div>
    );
  }

  render() {
    const { totalPages,
            currentPage,
            items,totalPublicPrice,totalUpdatedCost,
            handleSubmit,
            resetForm,
            submitting } = this.props;

    const userLogin = JSON.parse(sessionStorage.logindata);

    // console.log('userLogin-->',userLogin);
    if(items == null){
      return (
        <center><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><Loading type="spin" color="#202020" width="10%"/></center>
      );
    }else{
      return(
        <form role="form">
          {/* Header Search */}
          <div className="col-sm-12 bg-hearder bg-header-searchresult">
            <div className="col-md-4 col-sm-12 ft-white m-nopadding">
              <h1>SEARCH RESULTS</h1>
            </div>
            <div className="col-md-8 col-sm-12 nopadding">
            <div className="m-width-100 text-right maring-t15 float-r ip-font ipp-margin m-pt">
              <div className="col-sm-4 col-xs-12 nopadding">
                  <div className="col-sm-6 col-xs-6 ft-white nopad-ipl">
                    <button className="btn btn-searchresult" disabled={submitting} onClick={this.newSearch}>New Search</button>
                  </div>
                  <div className="col-sm-6 col-xs-6 ft-white nopad-ipl">
                    <button className="btn btn-searchresult" disabled={submitting} onClick={this.modifySearch}>Modify Search</button>
                  </div>
              </div>
              <div className="col-sm-2 col-xs-12 ft-white margin-t5">
                <ControlLabel> <span className="fc-ddbe6a m-none">|</span> Sort By: </ControlLabel>
              </div>
              <div className="col-sm-2 col-xs-12 nopadding">
                <div className="styled-select">
                  <select className="form-searchresult" onChange={this.sortingBy} ref="sortingBy">
                    <option key={'itemCreatedDate'} value={'itemCreatedDate'}>{'Updated Date'}</option>
                    <option key={'priceUSD'} value={'priceUSD'}>{'Public Price'}</option>
                    <option key={'reference'} value={'reference'}>{'Item Reference'}</option>
                    <option key={'description'} value={'description'}>{'Description'}</option>
                  </select>
                </div>
              </div>
              <div className="col-sm-2 col-xs-12 nopadding padding-l10 m-pt-select">
                <div className="styled-select">
                    <select className="form-searchresult" onChange={this.sortingDirection} ref="sortingDirection">
                      <option key={'desc'} value={'desc'}>{'Descending'}</option>
                      <option key={'asc'} value={'asc'}>{'Ascending'}</option>
                    </select>
                </div>
              </div>
              <div className="col-sm-2 ft-white nopadding">
              <div
                disabled={submitting} onClick={ this.gridViewResults }>
                <div className="bd-white m-pt-mgl"><span className="glyphicon glyphicon-th-large"></span></div>
              </div>
              <div
                disabled={submitting} onClick={ this.listViewResults } >
                <div className="bd-white"><span className="glyphicon glyphicon-th-list"></span></div>
              </div>
              </div>
            </div>
            </div>
          </div>
          {/* End Header Search */}
          {/* Util&Pagination */}
          <div className="row">
            <div className="col-sm-12">
                <div className="panel panel-default">
                    <div className="panel-body padding-ft0">
                      <div className="col-sm-12 ">
                        <div className="col-md-3 col-sm-4 nopadding">

                          <a><div className="icon-add margin-l10"></div></a>
                          <a><div className="icon-excel margin-l10" disabled={submitting}
                                onClick={ this.exportExcel }></div></a>
                          <a><div className="icon-print margin-l10" id="printproduct"></div></a>
                        </div>
                        <div className="col-md-9 col-sm-8 pagenavi">
                          <div className="searchresult-navi">
                              {this.renderPagination()}
                          </div>
                        </div>
                      </div>
                      {/* End Util&Pagination */}
                      <div id="dvContainerPrint">
                        {/* Total Data */}
                          <div className="bg-or text-center">
                            {this.renderTotals()}
                          </div>
                        {/* End Total Data */}
                        {/* Grid Product */}
                        <div className={`search-product ${this.state.showGridView ? '' : 'hidden'}` }>
                          <GridItemsView  items={items} onClickGrid={this.onClickGrid} />
                        </div>
                        <div className={`col-sm-12 search-product ${this.state.showListView ? '' : 'hidden'}` }>
                          <ListItemsView items={items} onClickGrid={this.onClickGrid}/>
                        </div>
                        {/* Grid Product */}
                      </div>
                      {/* Pagination */}
                      <div className="col-sm-12 pagenavi maring-t20">
                        <div className="searchresult-navi pull-right margin-r20">
                          {this.renderPagination()}
                        </div>
                      </div>
                      {/* End Pagination */}
                  </div>
                </div>
            </div>
          </div>
          {this.renderExportExcelDialog()}
        </form>
      );
    }
  }
}
function mapStateToProps(state) {
  // console.log('state-->',state);

  return {
    searchResult: state.searchResult,
    items: state.searchResult.datas,
    totalPages: state.searchResult.totalpage,
    currentPage: state.searchResult.currentPage,
    totalPublicPrice: state.searchResult.totalpublicprice,
    totalUpdatedCost: state.searchResult.totalupdatedcost,
    allItems: state.searchResult.allItems,
    filters: state.searchResult.filters,
    paramsSearch: state.searchResult.paramsSearch
   }
}
SearchResult.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
}
SearchResult.contextTypes = {
  router: PropTypes.object
};
module.exports = reduxForm({
  form: 'SearchResult',
  fields: [ 'currPage' ]
},mapStateToProps,itemactions)(SearchResult)
