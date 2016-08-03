import React, { Component, PropTypes }from 'react';
import { connect } from 'react-redux';
import { reduxForm, reset } from 'redux-form';
import { Button,FormControl,Pagination, ControlLabel, DropdownButton, MenuItem } from 'react-bootstrap';
import { Link } from 'react-router';
import { Modal, ModalClose } from 'react-modal-bootstrap';
import shallowCompare from 'react-addons-shallow-compare';
import jQuery from 'jquery';
let _ = require('lodash');
let Loading = require('react-loading');
import * as itemactions from '../../actions/itemactions';
import PureInput from '../../utils/PureInput';
import GridItemsView from '../../components/searchresults/griditemview';
import GridItemsViewPrint from '../../components/searchresults/griditemviewPrint';
import ListItemsView from '../../components/searchresults/listitemview';
import ListItemsViewPrint from '../../components/searchresults/listitemviewPrint';
import numberFormat from '../../utils/convertNumberformat';
import GenHtmlExportExcel from '../../utils/genHtmlExportExcel';
import moment from 'moment';
// let XLSX = require('xlsx')

const checkFields = ['ingredients','categoryName','category', 'article', 'collection','setReferenceNumber','cut',
      'color','clarity', 'caratWt', 'unit', 'qty', 'origin', 'symmetry', 'flourance', 'batch', 'netWeight',
      'stoneQty','markup', 'certificatedNumber', 'certificateDate', 'vendorCode', 'vendorName', 'metalColor',
      'metalType','dominantStone','brand', 'complication', 'strapType', 'strapColor', 'buckleType','dialIndex',
      'dialColor','movement','serial', 'limitedEdition','limitedEditionNumber'
    ];
const labels = {
  ingredients: 'Ingredients',
  categoryName: 'Category Name',
  category: 'Category',
  article: 'Article',
  collection: 'Collection',
  setReferenceNumber: 'Set Reference Number',
  cut: 'Cut',
  color: 'Color',
  clarity: 'Clarity',
  caratWt: 'Carat Wt',
  unit: 'Unit',
  qty: 'Qty',
  origin: 'Origin',
  symmetry: 'Symmetry',
  flourance: 'Flourance',
  batch: 'Batch',
  netWeight: 'Net Weight',
  stoneQty: 'Stone Qty',
  dominantStone: 'Dominant Stone',
  markup: 'Markup%',
  certificatedNumber: 'Certificate Number',
  certificateDate: 'Certificate Date',
  vendorCode: 'Vendor Code',
  vendorName: 'Vendor Name',
  metalColor: 'Metal Colour',
  metalType: 'Metal Type',
  brand: 'Brand',
  complication: 'Complication',
  strapType: 'Strap Type',
  strapColor: 'Strap Color',
  buckleType: 'Buckle Type',
  dialIndex: 'Dial Index',
  dialColor: 'Dial Color',
  movement: 'Movement',
  serial: 'Serial #',
  limitedEdition: 'Limited Edition',
  limitedEditionNumber: 'Limited Edition #'

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
    this.hideModalNoResults = this.hideModalNoResults.bind(this);
    this.printResults = this.printResults.bind(this);

    // console.log('this.props.items-->',this.props.searchResult.datas);

    this.state = {
      activePage: this.props.currentPage,
      showGridView: true,
      showListView: false,
      isExport: false,
      isOpen: false,
      isOpenNoResults: true,
      allFields: false,
      showImages: false,
      ingredients: false,
      categoryName: false,
      category: false,
      article: false,
      collection: false,
      setReferenceNumber: false,
      cut: false,
      color: false,
      clarity: false,
      caratWt: false,
      unit: false,
      qty: false,
      origin: false,
      symmetry: false,
      flourance: false,
      batch: false,
      netWeight: false,
      stoneQty: false,
      dominantStone: false,
      markup: false,
      certificatedNumber: false,
      certificateDate: false,
      vendorCode: false,
      vendorName: false,
      metalColor: false,
      metalType: false,
      brand: false,
      complication: false,
      strapType: false,
      strapColor: false,
      buckleType: false,
      dialIndex: false,
      dialColor: false,
      movement: false,
      serial: false,
      limitedEdition: false,
      limitedEditionNumber: false,
      showLoading: false
    };
  }
  componentWillMount() {
      // console.log('this.props.currentPage->',this.props.currentPage);
      let params = {
        'page' : this.props.currentPage,
        'sortBy': 'itemCreatedDate',
        'sortDirections': 'desc'
      };  // default search params

      const { filters } =  this.props;
      // console.log('filters-->',filters);
      filters.forEach(function(filter){
        let keys = Object.keys(filter);
        keys.forEach((key) => {
          const value = filter[key];
          params[key] = value;
        });
      });
      // console.log('params-->',params);
      this.props.getItems(params);
  }

  shouldComponentUpdate(nextProps, nextState) {
    // console.log('nextProps-->',nextProps);
    // console.log('nextState-->',nextState);
    return shallowCompare(this, nextProps, nextState);
  }
  printResults(e){
    e.preventDefault();
    // console.log('printproductBind-->');

    let dvTotal = jQuery('#dvTotalsub').html();
    let dvGridview = jQuery('#dvGridview').html();
    let dvListview = jQuery('#dvListview').html();
    // console.log('printproduct-->',dvContainerPrint);
    let options = 'toolbar=1,menubar=1,scrollbars=yes,scrolling=yes,resizable=yes,width=800,height=1200';
    let printWindow = window.open('', '', options);
    printWindow.document.write('<style>@media print{@page {size: landscape;}}</style>');
    printWindow.document.write('<html><head><title>Mol online 2016</title>');
    printWindow.document.write('<link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css"></link>');
    printWindow.document.write('<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css"></link>');
    printWindow.document.write('<link rel="stylesheet" href="https://cdn.rawgit.com/carlosrocha/react-data-components/master/css/table-twbs.css"></link>');
    printWindow.document.write('<link rel="stylesheet" href="/css/style.css"></link>');
    printWindow.document.write('</head><body >');
    if (this.state.showGridView) {
        printWindow.document.write(dvGridview);
        printWindow.document.write(dvTotal);
    }
    if (this.state.showListView) {
      printWindow.document.write(dvListview);
      printWindow.document.write(dvTotal);
    }
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.focus();
    setTimeout( function(){
      printWindow.document.close();
      printWindow.print();
    },1500);
    return true;
  }
  handleSelect(eventKey) {
      this.setState({
        activePage: eventKey
      });

      const userLogin = JSON.parse(sessionStorage.logindata);

      let sortingBy = '';

      switch (this.refs.sortingBy.value) {
        case 'price':
          sortingBy = 'price.' + userLogin.currency;
          break;
        default:
          sortingBy = this.refs.sortingBy.value;
          break;
      }

      const sortingDirection = this.refs.sortingDirection.value;

      let params = {
        'page' : eventKey,
        'sortBy': sortingBy,
        'sortDirections': sortingDirection
      };
      const { filters } =  this.props;

      filters.forEach(function(filter){
        let keys = Object.keys(filter);
        keys.forEach((key) => {
          const value = filter[key];
          params[key] = value;
        });
      });

      let girdView = this.state.showGridView;
      let listView = this.state.showListView;

      this.setState({
        showGridView: false,
        showListView: false,
        showLoading: true
      });

      this.props.getItems(params)
      .then((value) => {
        this.setState({
          showLoading: false
        });
        if(girdView){
          this.setState({
            showGridView: true
          });
        }else if (listView) {
          this.setState({
            showListView: true
          });
        }
      });

      let { currPage } = this.props.fields;
      currPage.onChange(eventKey);
  }
  handleGo(e){
    e.preventDefault();
    // console.log('handleGo-->',this.refs.reletego.value);

    const getPage = parseInt((this.refs.reletego.value != ''?this.refs.reletego.value:this.state.activePage));

    const userLogin = JSON.parse(sessionStorage.logindata);

    let sortingBy = '';

    switch (this.refs.sortingBy.value) {
      case 'price':
        sortingBy = 'price.' + userLogin.currency;
        break;
      default:
        sortingBy = this.refs.sortingBy.value;
        break;
    }

    const sortingDirection = this.refs.sortingDirection.value;

    this.setState({
      activePage: getPage
    });
    // console.log('getPage-->',getPage);
    let params = {
      'page' : getPage,
      'sortBy': sortingBy,
      'sortDirections': sortingDirection
    };
    let { filters } =  this.props;

    filters.forEach(function(filter){
      let keys = Object.keys(filter);
      keys.forEach((key) => {
        const value = filter[key];
        params[key] = value;
      });
    });

    let girdView = this.state.showGridView;
    let listView = this.state.showListView;

    this.setState({
      showGridView: false,
      showListView: false,
      showLoading: true
    });

    this.props.getItems(params)
    .then((value) => {
      this.setState({
        showLoading: false
      });
      if(girdView){
        this.setState({
          showGridView: true
        });
      }else if (listView) {
        this.setState({
          showListView: true
        });
      }
    });
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
    // console.log('this.state.activePage-->',this.state.activePage);
    const page = this.state.activePage;
    currPage.value = this.state.activePage;
    // console.log('renderPagination-->',this.state.activePage);

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
                <input type="text" placeholder={page} ref="reletego" {...currPage}/>
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
      // let _totalUpdatedCost = new Intl.NumberFormat().format(totalUpdatedCost);
    let _totalUpdatedCost =  (totalUpdatedCost!=null) ? numberFormat(totalUpdatedCost) : 0;
    let _totalPublicPrice =  (totalPublicPrice!=null) ? numberFormat(totalPublicPrice) : 0;

    const userLogin = JSON.parse(sessionStorage.logindata);

    return(
      <div id="dvTotalsub">
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
    e.preventDefault();

    const userLogin = JSON.parse(sessionStorage.logindata);

    let sortingBy = '';

    switch (e.target.value) {
      case 'price':
        sortingBy = 'price.' + userLogin.currency;
        break;
      default:
        sortingBy = e.target.value;
        break;
    }

    this.setState({
      activePage: 1
    });

    const { searchResult } = this.props;
    const sortingDirection = this.refs.sortingDirection.value;
    // this.props.sortBy(searchResult, sortingBy, sortingDirection);
    let params = {
      'page' : 1,
      'sortBy': sortingBy,
      'sortDirections': sortingDirection
    };

    let { filters } =  this.props;

    filters.forEach(function(filter){
      let keys = Object.keys(filter);
      keys.forEach((key) => {
        const value = filter[key];
        params[key] = value;
      });
    });

    let girdView = this.state.showGridView;
    let listView = this.state.showListView;

    this.setState({
      showGridView: false,
      showListView: false,
      showLoading: true
    });

    this.props.getItems(params)
    .then((value) => {
      this.setState({
        showLoading: false
      });
      if(girdView){
        this.setState({
          showGridView: true
        });
      }else if (listView) {
        this.setState({
          showListView: true
        });
      }
    });

    let { currPage } = this.props.fields;
    currPage.onChange(this.state.activePage);
    currPage.value = this.state.activePage;
    // console.log('this.state.activePage-->',this.state.activePage);

  }
  sortingDirection(e){
    e.preventDefault();

    const sortingDirection = e.target.value;
    const { searchResult } = this.props;

    const userLogin = JSON.parse(sessionStorage.logindata);

    let sortingBy = '';

    switch (this.refs.sortingBy.value) {
      case 'price':
        sortingBy = 'price.' + userLogin.currency;
        break;
      default:
        sortingBy = this.refs.sortingBy.value;
        break;
    }

    this.setState({
      activePage: 1
    });

    let params = {
      'page' : 1,
      'sortBy': sortingBy,
      'sortDirections': sortingDirection
    };

    let { filters } =  this.props;

    filters.forEach(function(filter){
      let keys = Object.keys(filter);
      keys.forEach((key) => {
        const value = filter[key];
        params[key] = value;
      });
    });

    let girdView = this.state.showGridView;
    let listView = this.state.showListView;

    this.setState({
      showGridView: false,
      showListView: false,
      showLoading: true
    });

    this.props.getItems(params)
    .then((value) => {
      this.setState({
        showLoading: false
      });
      if(girdView){
        this.setState({
          showGridView: true
        });
      }else if (listView) {
        this.setState({
          showListView: true
        });
      }
    });
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

  hideModalNoResults = (e) => {
    e.preventDefault();

    this.setState({
      isOpenNoResults: false
    });

    this.props.modifySearch(this.props.paramsSearch);

    const token = sessionStorage.token;

    let modalOpen = jQuery('.modal-open');
    modalOpen.removeClass()
    // console.log('modalOpen-->',modalOpen);

    if(token){
      this.context.router.push('/inventories');
    }
  }

  exportExcel(){
    this.setState({
      isOpen: true,
    });
  }
  s2ab(s) {
  	let buf = new ArrayBuffer(s.length);
  	let view = new Uint8Array(buf);
  	for (let i=0; i!=s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
  	return buf;
  }
  sheet_from_array_of_arrays(data, opts) {
  	let ws = {};
  	let range = {s: {c:10000000, r:10000000}, e: {c:0, r:0 }};
  	for(let R = 0; R != data.length; ++R) {
  		for(let C = 0; C != data[R].length; ++C) {
  			if(range.s.r > R) range.s.r = R;
  			if(range.s.c > C) range.s.c = C;
  			if(range.e.r < R) range.e.r = R;
  			if(range.e.c < C) range.e.c = C;
  			let cell = {v: data[R][C] };
  			if(cell.v == null) continue;
  			let cell_ref = XLSX.utils.encode_cell({c:C,r:R});

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
  base64(s){
    return window.btoa(unescape(encodeURIComponent(s)));
  }
  format(s, c){
    return s.replace(/{(\w+)}/g, function(m, p) { return c[p]; });
  }
  confirmExport(e){
    e.preventDefault();

    let host = HOSTNAME || 'localhost:3005';
    host = (host == 'localhost') ? 'localhost:3005' : host;
    const ROOT_URL = `${host}`;

    const that = this;
    const { items, exportItems } = this.props;
    const userLogin = JSON.parse(sessionStorage.logindata);

    // if (!this.state.showImages) {
    //   let titles = ['Item Reference', 'Description', 'SKU', 'Site', 'Vendor Item Reference', 'Vendor Name',
    //               'Public Price', 'Quantity', 'Unit'];
    //   if(this.state.allFields){
    //     titles.push('Metal Type', 'Warehouse', 'Size', 'Cut', 'Metal Colour', 'Certificate Number',
    //                 'Color', 'Collection', 'Certificate Date', 'Clarity', 'Brand', 'Dominant Stone',
    //                 'Gross Weight');
    //   }else{
    //     if(this.state.metalType) titles.push('Metal Type');
    //     if(this.state.site) titles.push('Warehouse');
    //     if(this.state.size) titles.push('Size');
    //     if(this.state.cut) titles.push('Cut');
    //     if(this.state.metalColor) titles.push('Metal Colour');
    //     if(this.state.certificatedNumber) titles.push('Certificate Number');
    //     if(this.state.color) titles.push('Color');
    //     if(this.state.collection) titles.push('Collection');
    //     if(this.state.certificateDate) titles.push('Certificate Date');
    //     if(this.state.clarity) titles.push('Clarity');
    //     if(this.state.brand) titles.push('Brand');
    //     if(this.state.dominantStone) titles.push('Dominant Stone');
    //     if(this.state.grossWeight) titles.push('Gross Weight');
    //   }
    //   if (this.state.showImages) titles.push('Images');
    //
    //   let data = [titles];
    //   exportItems.forEach(function(item){
    //     // console.log('item-->',item);
    //     let arrayItems = [];
    //
    //     arrayItems.push(item.reference,item.description,item.sku,item.siteName,item.venderReference,
    //                     (item.vendorName != undefined) ? item.vendorName : '',
    //                     (userLogin.currency == 'AED')
    //                     ? numberFormat(item.price.AED)
    //                       : (userLogin.currency == 'CHF') ? numberFormat(item.price.CHF)
    //                       : (userLogin.currency == 'EUR') ? numberFormat(item.price.EUR)
    //                       : (userLogin.currency == 'JOD') ? numberFormat(item.price.JOD)
    //                       : (userLogin.currency == 'KWD') ? numberFormat(item.price.KWD)
    //                       : (userLogin.currency == 'LBP') ? numberFormat(item.price.LBP)
    //                       : (userLogin.currency == 'OMR') ? numberFormat(item.price.OMR)
    //                       : (userLogin.currency == 'QAR') ? numberFormat(item.price.QAR)
    //                       : (userLogin.currency == 'SAR') ? numberFormat(item.price.SAR)
    //                       : numberFormat(item.price.USD)
    //                     ,item.quantity,(item.unit != undefined) ? item.unit : '');
    //
    //     if(that.state.allFields){
    //       arrayItems.push((item.metalTypeName != undefined) ? item.metalTypeName : '',
    //                       (item.warehouseName != undefined) ? item.warehouseName : '',
    //                       (item.size != undefined) ? item.size : '',
    //                       (item.cutName != undefined) ? item.cutName : '',
    //                       (item.metalColorName != undefined) ? item.metalColorName : '',
    //                       (item.gemstones.certificate != undefined) ? item.gemstones.certificate.number : '',
    //                       (item.colorName != undefined) ? item.colorName : '',
    //                       (item.collectionName != undefined) ? item.collectionName : '',
    //                       (item.gemstones.certificate != undefined) ? item.gemstones.certificate.issuedDate : '',
    //                       (item.clarityName != undefined) ? item.clarityName : '',
    //                       (item.brandName != null) ? item.brandName : '',
    //                       (item.dominantStoneName != undefined) ? item.dominantStoneName : '',
    //                       (item.grossWeight != undefined) ? item.grossWeight : ''
    //                     );
    //     }else{
    //       if(that.state.metalType) arrayItems.push((item.metalTypeName != undefined) ? item.metalTypeName : '');
    //       if(that.state.site) arrayItems.push((item.warehouseName != undefined) ? item.warehouseName : '');
    //       if(that.state.size) arrayItems.push((item.size != undefined) ? item.size : '');
    //       if(that.state.cut) arrayItems.push((item.cutName != undefined) ? item.cutName : '');
    //       if(that.state.metalColor) arrayItems.push((item.metalColorName != undefined) ? item.metalColorName : '');
    //       if(that.state.certificatedNumber) arrayItems.push((item.gemstones.certificate != undefined) ? item.gemstones.certificate.number : '');
    //       if(that.state.color) arrayItems.push((item.colorName != undefined) ? item.colorName : '');
    //       if(that.state.collection) arrayItems.push((item.collectionName != undefined) ? item.collectionName : '');
    //       if(that.state.certificateDate) arrayItems.push((item.gemstones.certificate != undefined) ? item.gemstones.certificate.issuedDate : '');
    //       if(that.state.clarity) arrayItems.push((item.clarityName != undefined) ? item.clarityName : '');
    //       if(that.state.brand) arrayItems.push((item.brandName != null) ? item.brandName : '');
    //       if(that.state.dominantStone) arrayItems.push((item.dominantStoneName != undefined) ? item.dominantStoneName : '');
    //       if(that.state.grossWeight) arrayItems.push((item.grossWeight != undefined) ? item.grossWeight : '');
    //     }
    //
    //     if (that.state.showImages)
    //       arrayItems.push((item.gallery.length) != 0
    //                         ? ROOT_URL + item.gallery[0].thumbnail
    //                         : ROOT_URL + '/images/blank.gif');
    //
    //     data.push(arrayItems);
    //   });
    //
    //   let ws_name = 'Items';
    //   /* set up workbook objects -- some of these will not be required in the future */
    //   let wb = {}
    //   wb.Sheets = {};
    //   wb.Props = {};
    //   wb.SSF = {};
    //   wb.SheetNames = [];
    //
    //   /* create worksheet: */
    //   let ws = {}
    //
    //   /* the range object is used to keep track of the range of the sheet */
    //   let range = {s: {c:0, r:0}, e: {c:0, r:0 }};
    //
    //   /* Iterate through each element in the structure */
    //   for(let R = 0; R != data.length; ++R) {
    //     if(range.e.r < R) range.e.r = R;
    //     for(let C = 0; C != data[R].length; ++C) {
    //       if(range.e.c < C) range.e.c = C;
    //
    //       /* create cell object: .v is the actual data */
    //       let cell = { v: data[R][C] };
    //       if(cell.v == null) continue;
    //
    //       /* create the correct cell reference */
    //       let cell_ref = XLSX.utils.encode_cell({c:C,r:R});
    //
    //       /* determine the cell type */
    //       if(typeof cell.v === 'number') cell.t = 'n';
    //       else if(typeof cell.v === 'boolean') cell.t = 'b';
    //       else cell.t = 's';
    //
    //       /* add to structure */
    //       ws[cell_ref] = cell;
    //     }
    //   }
    //   ws['!ref'] = XLSX.utils.encode_range(range);
    //
    //       /* add worksheet to workbook */
    //   wb.SheetNames.push(ws_name);
    //   wb.Sheets[ws_name] = ws;
    //
    //   /* write file */
    //   let wbout = XLSX.write(wb, {bookType:'xlsx', bookSST:false, type: 'binary'});
    //   saveAs(new Blob([this.s2ab(wbout)],{type:'application/octet-stream'}), 'download.xlsx')
    // } else {
      var tab_text = GenHtmlExportExcel(this, exportItems, userLogin, ROOT_URL);

      var data_type = 'data:application/vnd.ms-excel;base64';

      var ua = window.navigator.userAgent;
      var msie = ua.indexOf('MSIE');
      var edge = ua.indexOf('Edge');
      var sa = '';
      var uriContent = '';
      var startDate = new Date();
      var exportDate = moment(startDate,'MM-DD-YYYY');
      exportDate = exportDate.format('YYYYMMDD_HHmm');
      var fileName = 'download_'+exportDate+'.xls';

      if (msie > 0 || edge > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
          if (window.navigator.msSaveBlob) {
              var blob = new Blob([tab_text], {
                  type: 'application/csv;charset=utf-8;'
              });
              this.setState({
                isOpen: false,
              });
              navigator.msSaveBlob(blob, fileName);
          }
      } else {
          var isFirefox = typeof InstallTrigger !== 'undefined';
          if(!isFirefox){
            this.setState({
              isOpen: false,
            });
            uriContent = 'data:application/vnd.ms-excel;base64,' + $.base64.encode(tab_text);
            sa = window.open(uriContent,fileName);

          } else {
              var uri = 'data:application/vnd.ms-excel;base64,'
              // uriContent = 'data:application/octet-stream,' + encodeURIComponent(tab_text);
              // sa = window.open(uriContent,'download.xlsx');
              // let wbout = XLSX.write(tab_text, {bookType:'xlsx', bookSST:false, type: 'binary'});
              this.setState({
                isOpen: false,
              });
              // window.open(uriContent,'download.xls')
              window.location.href = uri + $.base64.encode(tab_text)
          }
      }
      return sa;
    // }
    // this.setState({
    //   isOpen: false,
    // });
  }
  renderExportExcelDialog(){
    let that = this;
    const userLogin = JSON.parse(sessionStorage.logindata);
    return(
      <div>
      <div  className="popexport">
        <Modal isOpen={this.state.isOpen} onRequestHide={this.hideModal}>
          <div className="modal-header">
            <ModalClose onClick={this.hideModal}/>
            <h1 className="modal-title">Export</h1>
          </div>
          <div className="modal-body">
            <h3>Please choose additional fields for export.</h3>
            <h5>(Normal export field Item Reference, Item Description, SKU, Item Vendor Reference,
                  {`${(userLogin.permission.price == 'All') ? 'Actual Price, ':''}`}
                  {`${(userLogin.permission.price == 'Updated' || userLogin.permission.price == 'All') ? 'Updated Price, ':''}`}
                  {`${(userLogin.permission.price == 'Public' || userLogin.permission.price == 'Updated' || userLogin.permission.price == 'All') ? 'Public Price, ':''}`}
                  {`${(userLogin.permission.price == 'All') ? 'Actual Price (USD), ':''}`}
                  {`${(userLogin.permission.price == 'Updated' || userLogin.permission.price == 'All') ? 'Updated Price (USD), ':''}`}
                  {`${(userLogin.permission.price == 'Public' || userLogin.permission.price == 'Updated' || userLogin.permission.price == 'All') ? 'Public Price (USD), ':''}`}
                  Gross Weight, Ring Size, Jewels Weight (text), Site, Company, Warehouse)</h5>
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
            <button id="export" className="btn btn-default btn-radius" onClick={this.confirmExport}>
              Export
            </button>
            <button className="btn btn-default btn-radius" onClick={this.hideModal}>
              Cancel
            </button>
          </div>
        </Modal>
        </div>
       </div>
    );
  }

  render() {
    const { totalPages,
            currentPage,allItems,
            items,totalPublicPrice,totalUpdatedCost,
            handleSubmit,
            resetForm,
            submitting } = this.props;

    const userLogin = JSON.parse(sessionStorage.logindata);

    const { isOpenMessage } = this.state;

    // console.log('this.state.activePage-->',this.state.activePage);

    // console.log('userLogin-->',userLogin);
    if(items == null){
      return (
        <center><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><Loading type="spin" color="#202020" width="10%"/></center>
      );
    }else{
      if(allItems.length == 0){
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
                      <option key={'price'} value={'price'}>{'Public Price'}</option>
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
                <div className="col-sm-2 ft-white nopadding pd-10">
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

            <div >
              <Modal isOpen={this.state.isOpenNoResults} onRequestHide={this.hideModalNoResults}>
                <div className="modal-header">
                  <ModalClose onClick={this.hideModalNoResults}/>
                  <h1 className="modal-title">Message</h1>
                </div>
                <div className="modal-body">
                  <h3>No Results.</h3>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-default btn-radius btn-width" onClick={this.hideModalNoResults}>
                    Ok
                  </button>
                </div>
              </Modal>
             </div>
          </form>
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
              <div className="m-width-100 text-right maring-t15 float-r ip-font m-pt">
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
                      <option key={'price'} value={'price'}>{'Public Price'}</option>
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
                <div className="col-sm-2 ft-white nopadding pd-10">
                  <div
                    disabled={submitting} onClick={ this.gridViewResults } >
                      <div className={`bd-white m-pt-mgl ${this.state.showGridView ? 'active-bar' : ''}` }><span className="glyphicon glyphicon-th-large"></span></div>
                  </div>
                  <div
                    disabled={submitting} onClick={ this.listViewResults } >
                      <div className={`bd-white m-pt-mgl ${this.state.showListView ? 'active-bar' : ''}` }><span className="glyphicon glyphicon-th-list"></span></div>
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
                            <a><div className="icon-print margin-l10" id="printproduct" disabled={submitting}
                                  onClick={ this.printResults }>
                                </div>
                            </a>
                          </div>
                          <div className="col-md-9 col-sm-8 pagenavi">
                            <div className="searchresult-navi search-right">
                                {this.renderPagination()}
                            </div>
                          </div>
                        </div>
                        {/* End Util&Pagination */}
                        <div id="dvContainerPrint">
                          {/* Total Data */}
                            <div id="dvTotal" className="bg-or text-center">
                              {this.renderTotals()}
                            </div>
                          {/* End Total Data */}
                          {/* Grid Product */}
                          <div className={`search-product ${this.state.showGridView ? '' : 'hidden'}` }>
                            <GridItemsView  items={items} onClickGrid={this.onClickGrid} />
                          </div>
                          <div id="dvGridview" className="search-product hidden">
                            <GridItemsViewPrint  items={items} onClickGrid={this.onClickGrid} />
                          </div>
                          <div className={`col-sm-12 search-product ${this.state.showListView ? '' : 'hidden'}` }>
                            <ListItemsView items={items} onClickGrid={this.onClickGrid}/>
                          </div>
                          <div id="dvListview" className="col-sm-12 search-product hidden">
                            <ListItemsViewPrint items={items} onClickGrid={this.onClickGrid}/>
                          </div>
                          <div className={`${this.state.showLoading ? '' : 'hidden'}` }>
                            <center>
                              <br/><br/><br/><br/><br/><br/>
                                <Loading type="spin" color="#202020" width="10%"/>
                            </center>
                            <br/><br/><br/><br/><br/><br/>
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
}
function mapStateToProps(state) {
  // console.log('state-->',state);

  return {
    searchResult: state.searchResult,
    items: state.searchResult.datas,
    exportItems: state.searchResult.exportItems,
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
