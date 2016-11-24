import React, { Component, PropTypes }from 'react';
import { connect } from 'react-redux';
import { reduxForm, reset } from 'redux-form';
import { Button,FormControl,Pagination, ControlLabel, DropdownButton, MenuItem } from 'react-bootstrap';
import { Link } from 'react-router';
import { Modal, ModalClose } from 'react-modal-bootstrap';
import shallowCompare from 'react-addons-shallow-compare';
import jQuery from 'jquery';
import Path from 'path';
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
import ModalMyCatalog from '../../utils/modalMyCatalog';
import Modalalertmsg from '../../utils/modalalertmsg';
import moment from 'moment-timezone';
import convertDate from '../../utils/convertDate';
import validateCatalog from '../../utils/validatecatalog';
import GenTemplateHtml from '../../utils/genTemplatePdfSearchResult';

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

let listMyCatalog = []

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
    this.selectedPageSize = this.selectedPageSize.bind(this);
    this.addMyCatalog = this.addMyCatalog.bind(this);
    this.checkedOneItemMyCatalog = this.checkedOneItemMyCatalog.bind(this);
    this.addedOneItemMyCatalog = this.addedOneItemMyCatalog.bind(this);

    // console.log('this.props.items-->',this.props.searchResult.datas);

    this.state = {
      activePage: this.props.currentPage,
      // showGridView: true,
      // showListView: false,
      isExport: false,
      isOpen: false,
      isOpenDownload: false,
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
      showLoading: false,
      isOpenAddMyCatalog: false,
      enabledMyCatalog:false,
      isOpenAddMyCatalogmsg: false,
      isOpenPrintPdfmsg: false
    };
  }
  componentWillMount() {
      // console.log('this.props.sortingBy->',this.props.sortingBy);
      // console.log('this.props.sortDirection->',this.props.sortDirection);

      const userLogin = JSON.parse(sessionStorage.logindata);

      let sortingBy = '';

      switch (this.props.sortingBy) {
        case 'price':
          sortingBy = 'price.' + userLogin.currency;
          break;
        default:
          sortingBy = this.props.sortingBy;
          break;
      }
      let params = {
        'page' : this.props.currentPage,
        'sortBy': sortingBy,
        'sortDirections': this.props.sortDirection,
        'pageSize' : this.props.pageSize
      };  // default search params

      // const { filters } =  this.props;
      const filters =  JSON.parse(sessionStorage.filters);
      let gemstoneFilter = {};
      // console.log('filters-->',filters);
      filters.forEach(function(filter){
        let keys = Object.keys(filter);
        keys.forEach((key) => {
          const value = filter[key];
          const gemstoneFields = keys[0].split('.');
          if(gemstoneFields[0] == 'gemstones'){
            gemstoneFilter[gemstoneFields[1]] = value;
          }else if(gemstoneFields[0] == 'certificatedNumber'){
            gemstoneFilter[gemstoneFields[0]] = value;
          }else if(gemstoneFields[0] == 'certificateAgency'){
            gemstoneFilter[gemstoneFields[0]] = value;
          }else if(gemstoneFields[0] == 'cerDateFrom'){
            gemstoneFilter[gemstoneFields[0]] = value;
          }
          else{
            params[key] = value;
          }
        });
      });

      if(Object.keys(gemstoneFilter).length != 0){
        params['gemstones'] = gemstoneFilter;
      }
      // console.log('params-->',params);
      const paramsSearchStorage =  JSON.parse(sessionStorage.paramsSearch);
      // this.props.setShowGridView(true);
      // this.props.setShowListView(false);
      this.props.setParams(paramsSearchStorage)
      this.props.getItems(params)
      .then((value) => {
          this.props.getCatalogName();
      });

  }
  componentDidMount() {

    let that = this;
    if(this.refs.sortingBy != undefined){
      // let select = React.findDOMNode(this.refs.sortingBy);
      let values = [].filter.call(this.refs.sortingBy.options, function (o) {
            o.selected = false;

            if(o.value == that.props.sortingBy){
              o.selected = true
            }
            return o.selected;
          }).map(function (o) {
            return o.value;
          });
    }

    if(this.refs.sortingDirection != undefined){
      // let select = React.findDOMNode(this.refs.sortingBy);
      let values = [].filter.call(this.refs.sortingDirection.options, function (o) {
            o.selected = false;

            if(o.value == that.props.sortDirection){
              o.selected = true
            }
            return o.selected;
          }).map(function (o) {
            return o.value;
          });
    }

    if(this.refs.pageSize != undefined){
      // let select = React.findDOMNode(this.refs.sortingBy);
      let values = [].filter.call(this.refs.pageSize.options, function (o) {
            o.selected = false;

            if(o.value == that.props.pageSize){
              o.selected = true
            }
            return o.selected;
          }).map(function (o) {
            return o.value;
          });
    }

  }
  shouldComponentUpdate(nextProps, nextState) {
    // console.log('nextProps.currentPage-->',nextProps.currentPage);
    // console.log('nextState-->',nextState);
    return shallowCompare(this, nextProps, nextState);
  }
  componentWillReceiveProps(nextProps) {
    // console.log('nextProps-->',nextProps);

    if(this.props.currentPage != nextProps.currentPage){
      let { currPage } = this.props.fields;
      currPage.onChange(nextProps.currentPage);
    }
  }
  printResults(e){
    e.preventDefault();
    // console.log('printproductBind-->');

    const { showGridView,showListView } = this.props;
    const userLogin = JSON.parse(sessionStorage.logindata);

    const host = HOSTNAME || 'localhost';
    const ROOT_URL = (host != 'mol.mouawad.com')? `http://${host}:3005`: `http://${host}`;
    let imagesReplace = ROOT_URL+'/images/';

    let exportDate = moment().tz('Asia/Bangkok').format('YYYYMMDD_HHmmss');

    let dvTotal1 = jQuery('#dvTotalsub1').html();
    let dvTotal2 = jQuery('#dvTotalsub2').html();
    let dvGridview = jQuery('#dvGridview').html();
    let dvListview = jQuery('#dvListview').html();

    let dv = {
                'dvTotal1': dvTotal1,
                'dvTotal2': dvTotal2,
                'dvGridview': dvGridview,
                'dvListview': dvListview
            };
    let htmlTemplate = '';

    htmlTemplate = GenTemplateHtml(showGridView, showListView, ROOT_URL, imagesReplace, dv);

    // console.log(htmlTemplate);
    let params = {
                    'temp': htmlTemplate,
                    'userName': `${userLogin.username}_${exportDate}`,
                    'userEmail': userLogin.email,
                    'ROOT_URL': ROOT_URL
                }

    this.props.writeHtml(params)
        .then((value) => {
            if (value) {
                this.setState({isOpenPrintPdfmsg: true});
            }
            console.log(value);
        });

  }
  handleSelect(eventKey) {
      this.setState({activePage: eventKey});

      const userLogin = JSON.parse(sessionStorage.logindata);
      const { showGridView,showListView } = this.props;

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
      const pageSize = this.refs.pageSize.value;

      let params = {
        'page' : eventKey,
        'sortBy': sortingBy,
        'sortDirections': sortingDirection,
        'pageSize' : pageSize
      };
      const { filters } =  this.props;

      let gemstoneFilter = {};
      // console.log('filters-->',filters);
      filters.forEach(function(filter){
        let keys = Object.keys(filter);
        keys.forEach((key) => {
          const value = filter[key];
          const gemstoneFields = keys[0].split('.');
          if(gemstoneFields[0] == 'gemstones'){
            gemstoneFilter[gemstoneFields[1]] = value;
          }else if(gemstoneFields[0] == 'certificatedNumber'){
            gemstoneFilter[gemstoneFields[0]] = value;
          }else if(gemstoneFields[0] == 'certificateAgency'){
            gemstoneFilter[gemstoneFields[0]] = value;
          }else if(gemstoneFields[0] == 'cerDateFrom'){
            gemstoneFilter[gemstoneFields[0]] = value;
          }
          else{
            params[key] = value;
          }
        });
      });

      if(Object.keys(gemstoneFilter).length != 0){
        params['gemstones'] = gemstoneFilter;
      }

      let girdView = showGridView;
      let listView = showListView;

      this.props.setShowGridView(false);
      this.props.setShowListView(false);

      this.setState({
        showLoading: true
      });

      this.props.getItems(params)
      .then((value) => {
        this.setState({showLoading: false});
        if(girdView){
          // this.setState({showGridView: true});
          this.props.setShowGridView(true);
        }else if (listView) {
          // this.setState({showListView: true});
          this.props.setShowListView(true);
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
    const { showGridView,showListView } = this.props;

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
    const pageSize = this.refs.pageSize.value;

    this.setState({activePage: getPage});
    // console.log('getPage-->',getPage);
    let params = {
      'page' : getPage,
      'sortBy': sortingBy,
      'sortDirections': sortingDirection,
      'pageSize' : pageSize
    };
    let { filters } =  this.props;

    let gemstoneFilter = {};
    // console.log('filters-->',filters);
    filters.forEach(function(filter){
      let keys = Object.keys(filter);
      keys.forEach((key) => {
        const value = filter[key];
        const gemstoneFields = keys[0].split('.');
        if(gemstoneFields[0] == 'gemstones'){
          gemstoneFilter[gemstoneFields[1]] = value;
        }else if(gemstoneFields[0] == 'certificatedNumber'){
          gemstoneFilter[gemstoneFields[0]] = value;
        }else if(gemstoneFields[0] == 'certificateAgency'){
          gemstoneFilter[gemstoneFields[0]] = value;
        }else if(gemstoneFields[0] == 'cerDateFrom'){
          gemstoneFilter[gemstoneFields[0]] = value;
        }
        else{
          params[key] = value;
        }
      });
    });

    if(Object.keys(gemstoneFilter).length != 0){
      params['gemstones'] = gemstoneFilter;
    }

    let girdView = showGridView;
    let listView = showListView;

    this.props.setShowGridView(false);
    this.props.setShowListView(false);

    this.setState({
      showLoading: true
    });

    this.props.getItems(params)
    .then((value) => {
      this.setState({showLoading: false});
      if(girdView){
        // this.setState({showGridView: true});
        this.props.setShowGridView(true);
      }else if (listView) {
        // this.setState({showListView: true});
        this.props.setShowListView(true);
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
    // console.log('totalPages-->',totalPages);
    // console.log('this.state.activePage-->',this.state.activePage);
    const page = this.state.activePage;
    // currPage.value = this.state.activePage;
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
             maxButtons={4}
             activePage={this.state.activePage}
             onSelect={this.handleSelect} />

            <div>
              <span>Page</span>
                <input type="number" placeholder={page} ref="reletego" {...currPage}/>
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
            items,totalPublicPrice,totalUpdatedCost,allItems,maxPrice,minPrice,avrgPrice,
            handleSubmit,
            resetForm,
            submitting } = this.props;
      // let _totalUpdatedCost = new Intl.NumberFormat().format(totalUpdatedCost);
    let _totalUpdatedCost =  (totalUpdatedCost!=null) ? numberFormat(totalUpdatedCost) : 0;
    let _totalPublicPrice =  (totalPublicPrice!=null) ? numberFormat(totalPublicPrice) : 0;

    const userLogin = JSON.parse(sessionStorage.logindata);

    return(
      <div>
        <div id="dvTotalsub1" className="bg-or text-center">
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

        <div id="dvTotalsub2" className="bg-f7d886 text-center">
            <span><span className="font-b fc-000">Highest Price :</span> <span className="font-w9">{ numberFormat(maxPrice) } { userLogin.currency } </span><span className="padding-lf15">|</span></span>
            <span><span className="font-b fc-000">Lowest Price :</span> <span className="font-w9">{ numberFormat(minPrice) } { userLogin.currency } </span><span className="padding-lf15">|</span></span>
            <span><span className="font-b fc-000">Average Price :</span> <span className="font-w9">{ numberFormat(avrgPrice) } { userLogin.currency } </span></span>
        </div>
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
  checkedOneItemMyCatalog = (item) => {
    //   console.log('item.target.value-->',item.target.value);
    const { items } = this.props;
    let itemAdded = items.filter(oneItem => oneItem.id === item.target.value);
    itemAdded = itemAdded[0];
    let itemName = (itemAdded.type != 'CER')? itemAdded.description: itemAdded.name;
    let objItem = {id: itemAdded.id, reference: itemAdded.reference, description: itemName}

    if(!this.state.enabledMyCatalog){
        listMyCatalog = [];
    }

    if (item.target.checked) {
      listMyCatalog.push(objItem);
    } else {
      listMyCatalog = listMyCatalog.filter(inItem => inItem.id !== item.target.value);
    }

    if (listMyCatalog.length != 0) {
      this.setState({enabledMyCatalog: true});
    } else {
      this.setState({enabledMyCatalog: false});
    }
    // console.log('item -->',item.target.checked);
    // console.log('item -->',item.target.value);
    // console.log('listMyCatalog -->',listMyCatalog);
  }
  addedOneItemMyCatalog = (item) => {
      let fileName = jQuery('input[type="checkbox"]');
      fileName.removeAttr('checked');
      listMyCatalog  = [];
      this.setState({enabledMyCatalog: false});
      const { items } = this.props;
      let itemAdded = items.filter(oneItem => oneItem.id === item.target.attributes[3].value);
      itemAdded = itemAdded[0];
      let itemName = (itemAdded.type != 'CER')? itemAdded.description: itemAdded.name;
      let objItem = {id: itemAdded.id, reference: itemAdded.reference, description: itemName}

      listMyCatalog.push(objItem);

      this.setState({isOpenAddMyCatalog: true});
  }
  gridViewResults(){
    this.props.setShowGridView(true);
    this.props.setShowListView(false);
    // this.setState({
    //   showGridView: true,
    //   showListView:false
    // });
  }
  listViewResults(){
    this.props.setShowGridView(false);
    this.props.setShowListView(true);
    // this.setState({
    //   showGridView: false,
    //   showListView: true
    // });
  }
  sortingBy(e){
    e.preventDefault();

    const userLogin = JSON.parse(sessionStorage.logindata);
    const { showGridView,showListView } = this.props;

    let sortingBy = '';

    switch (e.target.value) {
      case 'price':
        sortingBy = 'price.' + userLogin.currency;
        break;
      default:
        sortingBy = e.target.value;
        break;
    }

    this.setState({activePage: 1});

    const { searchResult } = this.props;
    const sortingDirection = this.refs.sortingDirection.value;
    const pageSize = this.refs.pageSize.value;
    // this.props.sortBy(searchResult, sortingBy, sortingDirection);
    let params = {
      'page' : 1,
      'sortBy': sortingBy,
      'sortDirections': sortingDirection,
      'pageSize' : pageSize
    };

    let { filters } =  this.props;

    let gemstoneFilter = {};
    // console.log('filters-->',filters);
    filters.forEach(function(filter){
      let keys = Object.keys(filter);
      keys.forEach((key) => {
        const value = filter[key];
        const gemstoneFields = keys[0].split('.');
        if(gemstoneFields[0] == 'gemstones'){
          gemstoneFilter[gemstoneFields[1]] = value;
        }else if(gemstoneFields[0] == 'certificatedNumber'){
          gemstoneFilter[gemstoneFields[0]] = value;
        }else if(gemstoneFields[0] == 'certificateAgency'){
          gemstoneFilter[gemstoneFields[0]] = value;
        }else if(gemstoneFields[0] == 'cerDateFrom'){
          gemstoneFilter[gemstoneFields[0]] = value;
        }
        else{
          params[key] = value;
        }
      });
    });

    if(Object.keys(gemstoneFilter).length != 0){
      params['gemstones'] = gemstoneFilter;
    }

    let girdView = showGridView;
    let listView = showListView;

    this.props.setShowGridView(false);
    this.props.setShowListView(false);

    this.setState({
      showLoading: true
    });

    this.props.setSortingBy(e.target.value);

    this.props.getItems(params)
    .then((value) => {
      this.setState({showLoading: false});
      if(girdView){
        // this.setState({showGridView: true});
        this.props.setShowGridView(true);
      }else if (listView) {
        // this.setState({showListView: true});
        this.props.setShowListView(true);
      }
    });

    let { currPage } = this.props.fields;
    currPage.onChange(1);
    currPage.value = 1;
    // console.log('currPage.value-->',currPage.value);

  }
  sortingDirection(e){
    e.preventDefault();

    const sortingDirection = e.target.value;
    const { searchResult } = this.props;
    const { showGridView,showListView } = this.props;

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

    this.setState({activePage: 1});

    const pageSize = this.refs.pageSize.value;

    let params = {
      'page' : 1,
      'sortBy': sortingBy,
      'sortDirections': sortingDirection,
      'pageSize' : pageSize
    };

    let { filters } =  this.props;

    let gemstoneFilter = {};
    // console.log('filters-->',filters);
    filters.forEach(function(filter){
      let keys = Object.keys(filter);
      keys.forEach((key) => {
        const value = filter[key];
        const gemstoneFields = keys[0].split('.');
        if(gemstoneFields[0] == 'gemstones'){
          gemstoneFilter[gemstoneFields[1]] = value;
        }else if(gemstoneFields[0] == 'certificatedNumber'){
          gemstoneFilter[gemstoneFields[0]] = value;
        }else if(gemstoneFields[0] == 'certificateAgency'){
          gemstoneFilter[gemstoneFields[0]] = value;
        }else if(gemstoneFields[0] == 'cerDateFrom'){
          gemstoneFilter[gemstoneFields[0]] = value;
        }
        else{
          params[key] = value;
        }
      });
    });

    if(Object.keys(gemstoneFilter).length != 0){
      params['gemstones'] = gemstoneFilter;
    }

    let girdView = showGridView;
    let listView = showListView;

    this.props.setShowGridView(false);
    this.props.setShowListView(false);

    this.setState({
      showLoading: true
    });

    this.props.setSortDirection(e.target.value);

    this.props.getItems(params)
    .then((value) => {
      this.setState({showLoading: false});
      if(girdView){
        // this.setState({showGridView: true});
        this.props.setShowGridView(true);
      }else if (listView) {
        // this.setState({showListView: true});
        this.props.setShowListView(true);
      }
    });

    let { currPage } = this.props.fields;
    currPage.onChange(1);
    currPage.value = 1;
  }
  selectedPageSize(e){
    e.preventDefault();

    const pageSize = e.target.value;

    const getPage = parseInt((this.refs.reletego.value != ''? this.refs.reletego.value: this.state.activePage));

    const userLogin = JSON.parse(sessionStorage.logindata);
    const { showGridView,showListView } = this.props;

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

    // this.setState({activePage: getPage});
    this.setState({activePage: 1});
    // console.log('getPage-->',getPage);
    let params = {
      'page' : 1,
      'sortBy': sortingBy,
      'sortDirections': sortingDirection,
      'pageSize' : pageSize
    };
    let { filters } =  this.props;

    let gemstoneFilter = {};
    // console.log('filters-->',filters);
    filters.forEach(function(filter){
      let keys = Object.keys(filter);
      keys.forEach((key) => {
        const value = filter[key];
        const gemstoneFields = keys[0].split('.');
        if(gemstoneFields[0] == 'gemstones'){
          gemstoneFilter[gemstoneFields[1]] = value;
        }else if(gemstoneFields[0] == 'certificatedNumber'){
          gemstoneFilter[gemstoneFields[0]] = value;
        }else if(gemstoneFields[0] == 'certificateAgency'){
          gemstoneFilter[gemstoneFields[0]] = value;
        }else if(gemstoneFields[0] == 'cerDateFrom'){
          gemstoneFilter[gemstoneFields[0]] = value;
        }
        else{
          params[key] = value;
        }
      });
    });

    if(Object.keys(gemstoneFilter).length != 0){
      params['gemstones'] = gemstoneFilter;
    }

    let girdView = showGridView;
    let listView = showListView;

    this.props.setShowGridView(false);
    this.props.setShowListView(false);

    this.setState({
      showLoading: true
    });

    this.props.setPageSize(pageSize);

    this.props.getItems(params)
    .then((value) => {
      this.setState({showLoading: false});
      if(girdView){
        // this.setState({showGridView: true});
        this.props.setShowGridView(true);
      }else if (listView) {
        // this.setState({showListView: true});
        this.props.setShowListView(true);
      }
    });

  }
  newSearch(e){
    e.preventDefault();

    const token = sessionStorage.token;

    this.props.setSortingBy('itemCreatedDate');
    this.props.setSortDirection('desc');
    this.props.setPageSize(16);
    this.props.setShowGridView(true);
    this.props.setShowListView(false);

    this.props.newSearch();
    if(token){
      this.context.router.push('/inventories');
    }
  }
  modifySearch(e){
    e.preventDefault();

    const token = sessionStorage.token;

    this.props.setSortingBy('itemCreatedDate');
    this.props.setSortDirection('desc');
    this.props.setPageSize(16);
    this.props.setShowGridView(true);
    this.props.setShowListView(false);

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

    this.setState({ showImages: false })
    this.setState({isOpen: false});
  }

  hideModalDownload = (e) => {
    e.preventDefault();
    const { showGridView,showListView } = this.props;

    this.setState({isOpenDownload: false});

    let girdView = showGridView;
    let listView = showListView;

    this.props.setShowGridView(false);
    this.props.setShowListView(false);

    if(girdView){
      // this.setState({showGridView: true});
      this.props.setShowGridView(true);
    }else if (listView) {
      // this.setState({showListView: true});
      this.props.setShowListView(true);
    }
  }

  hideModalNoResults = (e) => {
    e.preventDefault();

    this.setState({isOpenNoResults: false});

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
      const that = this;
      checkFields.map(function(field, index){
          that.setState({ [field]: false });
      });
      this.setState({ allFields: false });
      this.setState({ showImages: false });
      this.setState({isOpen: true});
  }
  confirmExport(e){
    e.preventDefault();

    const host = HOSTNAME || 'localhost';
    const ROOT_URL = (host != 'mol.mouawad.com')? `//${host}:3005`: `//${host}`;

    const that = this;
    const { items, exportItems, filters, paramsSearch, showGridView,showListView } = this.props;
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

    let fields = {
      allFields: this.state.allFields,
      showImages: this.state.showImages,
      ingredients: this.state.ingredients,
      categoryName: this.state.categoryName,
      category: this.state.category,
      article: this.state.article,
      collection: this.state.collection,
      setReferenceNumber: this.state.setReferenceNumber,
      cut: this.state.cut,
      color: this.state.color,
      clarity: this.state.clarity,
      caratWt: this.state.caratWt,
      unit: this.state.unit,
      qty: this.state.qty,
      origin: this.state.origin,
      symmetry: this.state.symmetry,
      flourance: this.state.flourance,
      batch: this.state.batch,
      netWeight: this.state.netWeight,
      stoneQty: this.state.stoneQty,
      dominantStone: this.state.dominantStone,
      markup: this.state.markup,
      certificatedNumber: this.state.certificatedNumber,
      certificateDate: this.state.certificateDate,
      vendorCode: this.state.vendorCode,
      vendorName: this.state.vendorName,
      metalColor: this.state.metalColor,
      metalType: this.state.metalType,
      brand: this.state.brand,
      complication: this.state.complication,
      strapType: this.state.strapType,
      strapColor: this.state.strapColor,
      buckleType: this.state.buckleType,
      dialIndex: this.state.dialIndex,
      dialColor: this.state.dialColor,
      movement: this.state.movement,
      serial: this.state.serial,
      limitedEdition: this.state.limitedEdition,
      limitedEditionNumber: this.state.limitedEditionNumber,
    };

    let params = {
      'page' : this.props.currentPage,
      'sortBy': sortingBy,
      'sortDirections': sortingDirection,
      'pageSize' : this.props.pageSize,
      'fields': fields,
      'price': userLogin.permission.price,
      'ROOT_URL': ROOT_URL,
      'userName': userLogin.username,
      'userEmail': userLogin.email
    };

    // default search params

    let gemstoneFilter = {};
    // console.log('filters-->',filters);
    filters.forEach(function(filter){
      let keys = Object.keys(filter);
      keys.forEach((key) => {
        const value = filter[key];
        const gemstoneFields = keys[0].split('.');
        if(gemstoneFields[0] == 'gemstones'){
          gemstoneFilter[gemstoneFields[1]] = value;
        }else if(gemstoneFields[0] == 'certificatedNumber'){
          gemstoneFilter[gemstoneFields[0]] = value;
        }else if(gemstoneFields[0] == 'certificateAgency'){
          gemstoneFilter[gemstoneFields[0]] = value;
        }else if(gemstoneFields[0] == 'cerDateFrom'){
          gemstoneFilter[gemstoneFields[0]] = value;
        }
        else{
          params[key] = value;
        }
      });
    });

    if(Object.keys(gemstoneFilter).length != 0){
      params['gemstones'] = gemstoneFilter;
    }

    this.setState({
      showLoading: true,
      isOpen: false
    });

    let girdView = showGridView;
    let listView = showListView;

    this.props.setShowGridView(false);
    this.props.setShowListView(false);

    // console.log('params--:>',params);
    this.props.exportDatas(params)
        .then((value) => {
          // console.log('value-->',value);
        //   console.log('export done!');
          if(girdView){
            // this.setState({showGridView: true});
            that.props.setShowGridView(true);
          }else if (listView) {
            // this.setState({showListView: true});
            that.props.setShowListView(true);
          }
          that.setState({
            showLoading: false,
            isOpenDownload: true
          });
        });
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
                <input type="checkbox" checked={this.state.allFields} onChange={event => {
                        // console.log('all checked-->',event.target.checked);
                        that.setState({ allFields: event.target.checked });
                        if (event.target.checked) {
                            checkFields.map(function(field, index){
                                that.setState({ [field]: true });
                            });
                        } else {
                            checkFields.map(function(field, index){
                                that.setState({ [field]: false });
                            });
                        }
                    }
                }/>
                <label className="control-label">Select All</label>
              </div>
              <div className="col-sm-3">
                <input type="checkbox" checked={this.state.showImages} onChange={event => that.setState({ showImages: event.target.checked })}/>
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
                            <input id={index} type="checkbox" checked={that.state[field]}
                              onChange={event => {
                                  that.setState({ [field]: event.target.checked });
                                  that.setState({ allFields:false });
                                }
                              }
                              />
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

  renderDownloadDialog(){
    let that = this;
    const { listFileName } = that.props;
    const userLogin = JSON.parse(sessionStorage.logindata);
    if(listFileName != null){
      return(
        <div>
        <div  className="popexport">
          <Modal isOpen={this.state.isOpenDownload} onRequestHide={this.hideModalDownload}>
            <div className="modal-header">
              <ModalClose onClick={this.hideModalDownload}/>
              <h1 className="modal-title">Export</h1>
            </div>
            <div className="modal-body">
              <h3>Please checking your email for download files.</h3>
              <a href={listFileName[0]} target="_blank" >{listFileName[0]}</a>
              <link></link>
              <br/>
              <div className="col-sm-12">
                <div className="col-sm-3">
                </div>
                <div className="col-sm-3">
                </div>
                <div className="col-sm-3">
                </div>
                <div className="col-sm-3">
                </div>
              </div>
              <div className="col-md-12">

              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-default btn-radius" onClick={this.hideModalDownload}>
                Close
              </button>
            </div>
          </Modal>
          </div>
         </div>
      );
    }else{
      return(
        <div>
        <div  className="popexport">
          <Modal isOpen={this.state.isOpenDownload} onRequestHide={this.hideModalDownload}>
            <div className="modal-header">
              <ModalClose onClick={this.hideModalDownload}/>
              <h1 className="modal-title">Export</h1>
            </div>
            <div className="modal-body">
              <h3>Please checking your email for download files.</h3>
              <br/>
              <div className="col-sm-12">
                <div className="col-sm-3">
                </div>
                <div className="col-sm-3">
                </div>
                <div className="col-sm-3">
                </div>
                <div className="col-sm-3">
                </div>
              </div>
              <div className="col-md-12">

              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-default btn-radius" onClick={this.hideModalDownload}>
                Close
              </button>
            </div>
          </Modal>
          </div>
         </div>
      );
    }
  }
  addMyCatalog = _=>{
      this.setState({isOpenAddMyCatalog: true});
  }
  handleClose= _=>{
    //   console.log(this);
    const { fields: {
              oldCatalogName,newCatalogName,validateCatalogName
          } } = this.props;

    newCatalogName.value = '';
    oldCatalogName.value = '';
    newCatalogName.onChange('');
    oldCatalogName.onChange('');

    this.setState({isOpenAddMyCatalog: false});

  }
  handleSubmitCatalog = (e)=>{
      e.preventDefault();
      let fileName = jQuery('input[type="checkbox"]');
      fileName.removeAttr('checked');
      this.setState({isOpenAddMyCatalog: false});
      const { fields: {
                oldCatalogName,newCatalogName,validateCatalogName
            } } = this.props;
        const  Detail  = this.props.productdetail;
        const  listCatalogName  = this.props.listCatalogName;
        let oldCatalogTitle = ''
        if (oldCatalogName.value) {
           oldCatalogTitle = listCatalogName.find(catalogname => catalogname._id === oldCatalogName.value)
        }

        const catalogdata = {
           id:!!oldCatalogName.value ? oldCatalogName.value:null,
           catalog: !!oldCatalogName.value ? oldCatalogTitle.catalog:newCatalogName.value,
           items:listMyCatalog
        }
        // console.log('catalogdata-->',catalogdata);
        this.props.addCatalog(catalogdata).then( () =>{
        //    console.log('Added!');
            newCatalogName.value = '';
            oldCatalogName.value = '';
            newCatalogName.onChange('');
            oldCatalogName.onChange('');

           this.setState({isOpenAddMyCatalogmsg: true});
           this.setState({enabledMyCatalog: false});
           this.props.getCatalogName();
        })

  }
  renderAddMyCatalog = _=> {
      const { listCatalogName,
               submitting } = this.props;
      return(<ModalMyCatalog onSubmit={this.handleSubmitCatalog} listCatalogName={listCatalogName}
          isOpen={this.state.isOpenAddMyCatalog}
          isClose={this.handleClose} props={this.props}/>);
  }
  renderAlertmsg = _=> {

    const message = 'Add to catalog success';
    const title = 'ADD TO CATALOG';
    return(<Modalalertmsg isOpen={this.state.isOpenAddMyCatalogmsg} isClose={this.handleClosemsg}
            props={this.props} message={message}  title={title}/>);
  }
  renderAlertmsgPdf = _=> {

    const message = 'Please checking your email for printing files.';
    const title = 'SEARCH RESULTS';
    return(<Modalalertmsg isOpen={this.state.isOpenPrintPdfmsg} isClose={this.handleClosePdfmsg}
            props={this.props} message={message}  title={title}/>);
  }
  hideModalAddMyCatalog = (e) => {
    e.preventDefault();

    this.setState({isOpenAddMyCatalog: false});
  }
  handleClosemsg = _=>{
      this.setState({isOpenAddMyCatalogmsg: false});
  }
  handleClosePdfmsg = _=>{
      this.setState({isOpenPrintPdfmsg: false});
  }
  confirmAddMyCatalog = (e) => {
    e.preventDefault();

    // console.log('hi');
    this.setState({isOpenAddMyCatalog: false});
  }
  render() {
    const { fields: {
              oldCatalogName,newCatalogName,validateCatalogName
            }, totalPages,showGridView,showListView,
             currentPage,allItems,pageSize,
             items,totalPublicPrice,totalUpdatedCost,
             handleSubmit,
             resetForm,
             submitting } = this.props;

     const userLogin = JSON.parse(sessionStorage.logindata);

     const { isOpenMessage } = this.state;

     var numbers = document.querySelectorAll('input[type="number"]');

    for (var i in numbers) {
      if (numbers.hasOwnProperty(i)) {
        numbers[i].onkeydown = function(e) {
            if(!((e.keyCode > 95 && e.keyCode < 106)
              || (e.keyCode > 47 && e.keyCode < 58)
              || e.keyCode == 8
              || e.keyCode == 37
              || e.keyCode == 39
              || e.keyCode == 46
              || e.keyCode == 110
              || e.keyCode == 190
              )) {
                return false;
            }
        }
      }
    }

    // console.log('this.state.activePage-->',this.state.activePage);

     // console.log('pageSize-->',pageSize);
    if(items == null){
      return (
        <center ><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><Loading type="spin" color="#202020" width="10%"/></center>
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
                    <select className="form-searchresult"
                      onChange={this.sortingBy} ref="sortingBy" >
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
                      <div className={`bd-white m-pt-mgl ${showGridView ? 'active-bar' : ''}` }><span className="glyphicon glyphicon-th-large"></span></div>
                  </div>
                  <div
                    disabled={submitting} onClick={ this.listViewResults } >
                      <div className={`bd-white m-pt-mgl ${showListView ? 'active-bar' : ''}` }><span className="glyphicon glyphicon-th-list"></span></div>
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
                          <div className="col-md-2 col-sm-3 col-xs-12 nopadding">
                            {
                                this.state.enabledMyCatalog ?
                                <a><div className="icon-add margin-l10" disabled={true} enabled={false}
                                onClick={ this.addMyCatalog }></div></a>:
                                <a><div className="icon-add margin-l10" disabled={true}
                                enabled={false}></div></a>
                            }
                            <a><div className="icon-excel margin-l10" disabled={submitting}
                                  onClick={ this.exportExcel }></div></a>
                            <a><div className="icon-print margin-l10" id="printproduct" disabled={submitting}
                                  onClick={ this.printResults }>
                                </div>
                            </a>
                          </div>
                          <div className="col-md-10 col-sm-9 col-xs-12 pagenavi">
                            <div className="searchresult-navi search-right">
                                {this.renderPagination()}
                            </div>
                            <div className="pull-right maring-b10">
                              <div className="pull-left padding-r10 margin-t7">View</div>
                              <div className="pull-left">
                              <select className="form-control" onChange={ this.selectedPageSize } ref="pageSize">
                                <option key="16" value="16">16</option>
                                <option key="32" value="32">32</option>
                                <option key="60" value="60">60</option>
                              </select>
                              </div>
                              <div className="pull-left padding-l10 margin-t7 margin-r10">
                              per page
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* End Util&Pagination */}
                        <div id="dvContainerPrint">
                          {/* Total Data */}
                            <div id="dvTotal">
                              {this.renderTotals()}
                            </div>
                          {/* End Total Data */}
                          {/* Grid Product */}
                          <div className={`search-product  ${showGridView ? '' : 'hidden'}` }>
                            <GridItemsView  items={items} onClickGrid={this.onClickGrid}
                            onCheckedOneItemMyCatalog={this.checkedOneItemMyCatalog}
                            onAddedOneItemMyCatalog={this.addedOneItemMyCatalog} />
                          </div>
                          <div id="dvGridview" className="search-product hidden">
                            <GridItemsViewPrint  items={items} onClickGrid={this.onClickGrid} />
                          </div>
                          <div className={`col-sm-12 search-product list-search ${showListView ? '' : 'hidden'}` }>
                            <ListItemsView items={items} pageSize={pageSize} onClickGrid={this.onClickGrid}/>
                          </div>
                          <div id="dvListview" className="col-sm-12 search-product hidden">
                            <ListItemsViewPrint items={items} pageSize={pageSize} onClickGrid={this.onClickGrid}/>
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
            {this.renderDownloadDialog()}
            {this.renderAddMyCatalog()}
            {this.renderAlertmsg()}
            {this.renderAlertmsgPdf()}
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
    paramsSearch: state.searchResult.paramsSearch,
    maxPrice: state.searchResult.maxPrice,
    minPrice: state.searchResult.minPrice,
    avrgPrice: state.searchResult.avrgPrice,
    pageSize: state.searchResult.PageSize,
    sortingBy: state.searchResult.SortingBy,
    sortDirection: state.searchResult.SortDirection,
    showGridView: state.searchResult.ShowGridView,
    showListView: state.searchResult.ShowListView,
    listCatalogName: state.myCatalog.ListCatalogName
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
  fields: [ 'currPage','oldCatalogName','newCatalogName','validateCatalogName' ],
  validate:validateCatalog
},mapStateToProps,itemactions)(SearchResult)
