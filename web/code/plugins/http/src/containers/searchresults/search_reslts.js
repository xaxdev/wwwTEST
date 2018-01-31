import React, { Component, PropTypes }from 'react';
import { connect } from 'react-redux';
import { reduxForm, reset } from 'redux-form';
import { Button,FormControl,Pagination, ControlLabel, DropdownButton, MenuItem } from 'react-bootstrap';
import { Link } from 'react-router';
import { Modal, ModalClose } from 'react-modal-bootstrap';
import shallowCompare from 'react-addons-shallow-compare';
import jQuery from 'jquery';
import Path from 'path';
import moment from 'moment-timezone';
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
import convertDate from '../../utils/convertDate';
import validateCatalog from '../../utils/validatecatalog';
import GenTemplateHtml from '../../utils/genTemplatePdfSearchResult';
import GetGemstoneLotnumberFilter from './utils/get_gemlot_filter';
import RenderClassTotals from './utils/render_total';
import RenderExportExcelDialog from './utils/render_export_excel_dialog';
import RenderExportExcelViewAsSetDialog from './utils/render_export_excel_viewasset_dialog'
import ModalPrintOptions from './utils/modalPrintOptions';

let _ = require('lodash');
let Loading = require('react-loading');
let sortBy = require('lodash.sortby');

const checkFields = ['ingredients','categoryName','category', 'article', 'collection','setReferenceNumber','cut',
    'color','clarity', 'caratWt', 'unit', 'qty', 'origin', 'symmetry', 'flourance', 'batch', 'netWeight',
    'stoneQty','markup', 'certificatedNumber', 'certificateDate', 'vendorCode', 'vendorName', 'metalColor',
    'metalType','dominantStone','brand', 'complication', 'strapType', 'strapColor', 'buckleType','dialIndex',
    'dialColor','movement','serial', 'limitedEdition','limitedEditionNumber','itemCreatedDate'
];
const checkFieldsViewAsSet = ['totalActualCost','totalUpdatedCost','totalPrice', 'markup', 'companyName',
    'warehouseName','createdDate'
];
const chkAllItems = ['0','1','2','3', '4', '5','6','7','8','9', '10', '11', '12', '13', '14', '15', '16', '17',
    '18','19', '20', '21', '22', '23', '24','25','26','27', '28', '29', '30', '31','32','33','34','35','36','37',
    '38','39','40','41','42','43','44','45','46','47','48','49','50','51','52','53','54','55','56','57','58','59',
    '60'
];
const labels = {
    ingredients: 'Ingredients', categoryName: 'Category Name', category: 'Category', article: 'Article',
    collection: 'Collection', setReferenceNumber: 'Set Reference Number', cut: 'Cut', color: 'Color',
    clarity: 'Clarity', caratWt: 'Carat Wt', unit: 'Unit', qty: 'Qty', origin: 'Origin', symmetry: 'Symmetry',
    flourance: 'Flourance', batch: 'Batch', netWeight: 'Net Weight', stoneQty: 'Stone Qty', dominantStone: 'Dominant Stone',
    markup: 'Markup%', certificatedNumber: 'Certificate Number', certificateDate: 'Certificate Date',
    vendorCode: 'Vendor Code', vendorName: 'Vendor Name', metalColor: 'Metal Colour', metalType: 'Metal Type',
    brand: 'Brand', complication: 'Complication', strapType: 'Strap Type', strapColor: 'Strap Color',
    buckleType: 'Buckle Type', dialIndex: 'Dial Index', dialColor: 'Dial Color', movement: 'Movement',
    serial: 'Serial #', limitedEdition: 'Limited Edition', limitedEditionNumber: 'Limited Edition #',
    itemCreatedDate: 'Created Date'
}
const labelsViewAsSet = {
    totalActualCost: 'Total Actual Cost (USD)', totalUpdatedCost: 'Total Updated Cost (USD)',
    totalPrice: 'Total Public Price (USD)', markup: 'Markup (Times)', companyName: 'Company',
    warehouseName: 'Warehouse', createdDate: 'Created Date'
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
        this.onCheckedAllItems = this.onCheckedAllItems.bind(this);
        this.exportExcelViewAsSet = this.exportExcelViewAsSet.bind(this);
        this.confirmExportViewAsSet = this.confirmExportViewAsSet.bind(this);
        this.showDialogPrintOptions = this.showDialogPrintOptions.bind(this);
        // console.log('this.props.items-->',this.props.searchResult.datas);
        this.state = {
            activePage: this.props.currentPage, isExport: false, isOpen: false, isOpenDownload: false, allFields: false,
            isOpenNoResults: true, showImages: false, ingredients: false, categoryName: false, category: false,
            article: false, collection: false, setReferenceNumber: false, cut: false, color: false, clarity: false,
            caratWt: false, unit: false, qty: false, origin: false, symmetry: false, flourance: false, batch: false,
            netWeight: false,stoneQty: false, dominantStone: false, markup: false, certificatedNumber: false,
            certificateDate: false, vendorCode: false, vendorName: false, metalColor: false, metalType: false,
            brand: false, complication: false, strapType: false, strapColor: false, buckleType: false, dialIndex: false,
            dialColor: false, movement: false, serial: false, limitedEdition: false, limitedEditionNumber: false,
            itemCreatedDate:false,showLoading: false, isOpenAddMyCatalog: false, enabledMyCatalog:false,
            isOpenAddMyCatalogmsg: false, isOpenPrintPdfmsg: false, isOpenMsgPageInvalid: false, checkAllItems: false,
            allFieldsViewAsSet: false, showImagesViewAsSet: false, isOpenViewAsSet: false, totalActualCost: false,
            totalUpdatedCost: false, totalPrice: false, markup: false, companyName: false, warehouseName: false,
            createdDate: false, isOpenPrintOptions: false
        };
    }

    componentWillMount() {
        const { ItemsOrder,SetReferencdOrder } = this.props;
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
            'page' : this.props.currentPage, 'sortBy': sortingBy, 'sortDirections': this.props.sortDirection,
            'pageSize' : this.props.pageSize, 'ItemsOrder': ItemsOrder,'SetReferencdOrder': SetReferencdOrder
        };  // default search params

        const filters =  JSON.parse(sessionStorage.filters);
        params = GetGemstoneLotnumberFilter(filters, params);
        const paramsSearchStorage =  JSON.parse(sessionStorage.paramsSearch);
        this.props.setParams(paramsSearchStorage)
        this.props.getItems(params).then(async (value) => {
            await this.props.getCatalogNameSetItem();
            await this.props.getSetCatalogName();
        });
    }

    componentDidMount() {
        let that = this;
        const { fields: {printPage } } = this.props;
        if (printPage.value == undefined) {
            printPage.onChange('all');
        }
        if(this.refs.sortingBy != undefined){
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
        return shallowCompare(this, nextProps, nextState);
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.currentPage != nextProps.currentPage){
            let { currPage } = this.props.fields;
            currPage.onChange(nextProps.currentPage);
        }
    }

    printResults = async(e)=>{
        e.preventDefault();
        const { fields: { printPage }, totalPages, items, exportItems,ViewAsSet } = this.props;
        const { showGridView, showListView } = this.props;
        const userLogin = JSON.parse(sessionStorage.logindata);
        const host = HOSTNAME || 'localhost';
        const env_web = ENVIRONMENT !== 'production' ? 'development' : 'production';
        const ROOT_URL = (host != 'mol.mouawad.com')? `http://${host}:3005`: `http://${host}`;
        let imagesReplace = ROOT_URL+'/images/';
        let exportDate = moment().tz('Asia/Bangkok').format('YYYYMMDD_HHmmss');
        let dvTotal1 = jQuery('#dvTotalsub1').html();
        let dvTotal2 = jQuery('#dvTotalsub2').html();
        let dvGridview = jQuery('#dvGridview').html();
        let dvListview = jQuery('#dvListview').html();
        let dvListviewAll = jQuery('#dvListviewAll').html();
        let dv = {
            'dvTotal1': dvTotal1, 'dvTotal2': dvTotal2, 'dvGridview': dvGridview, 'dvListview': dvListview,
            'printPage':printPage, 'items': exportItems, 'userLogin': userLogin, 'ViewAsSet': ViewAsSet,
            'dvListviewAll': dvListviewAll, 'env': env_web
        };
        let htmlTemplate = '';
        if (printPage.value != 'all') {
            htmlTemplate = GenTemplateHtml(showGridView, showListView, ROOT_URL, imagesReplace, dv);
          //   console.log('htmlTemplate-->',htmlTemplate);
            let params = {
                'temp': htmlTemplate,
                'userName': `${userLogin.username}_${exportDate}`,
                'userEmail': userLogin.email,
                'ROOT_URL': ROOT_URL
            }

            this.props.writeHtml(params).then((value) => {
                if (value) {
                    this.setState({ isOpenPrintPdfmsg: true });
                }
            });
            this.setState({isOpenPrintOptions: false});
        } else {
            const { showGridView,showListView,ItemsOrder,SetReferencdOrder,ViewAsSet } = this.props;
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
            const userPermissionPrice = userLogin.permission.price;
            let viewType = '';
            if (showGridView) {
                viewType = 'grid';
            } else {
                viewType = 'list';
            }
            let params = {
                'page' : 1, 'sortBy': sortingBy, 'sortDirections': sortingDirection, 'pageSize' : pageSize,
                'ItemsOrder': ItemsOrder, 'SetReferencdOrder': SetReferencdOrder,'userName': `${userLogin.username}_${exportDate}`,
                'userEmail': userLogin.email,'ROOT_URL': ROOT_URL, 'env': env_web, 'viewType': viewType,
                'userPermissionPrice': userPermissionPrice
            };
            const filters =  JSON.parse(sessionStorage.filters);
            params = GetGemstoneLotnumberFilter(filters, params);

            await this.props.getAllPDF(params).then((value) => {
                if (value) {
                    this.setState({isOpenPrintPdfmsg: true});
                }
            });
            this.setState({isOpenPrintOptions: false});
        }
    }

    showDialogPrintOptions = _ =>{
        this.setState({isOpenPrintOptions: true});
    }

    handleClosePrintOptions = _ =>{
        this.setState({isOpenPrintOptions: false});
    }

    renderDialogPrintOptions = _ =>{
        return(
            <ModalPrintOptions onSubmit={this.printResults} isOpen={this.state.isOpenPrintOptions}
                isClose={this.handleClosePrintOptions} props={this.props} />
        );
    }

    handleSelect(eventKey) {
        this.setState({activePage: eventKey});
        const userLogin = JSON.parse(sessionStorage.logindata);
        const { showGridView,showListView,ItemsOrder,SetReferencdOrder } = this.props;
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
            'page' : eventKey, 'sortBy': sortingBy, 'sortDirections': sortingDirection, 'pageSize' : pageSize,
            'ItemsOrder': ItemsOrder, 'SetReferencdOrder': SetReferencdOrder
        };
        const filters =  JSON.parse(sessionStorage.filters);
        params = GetGemstoneLotnumberFilter(filters, params);
        let girdView = showGridView;
        let listView = showListView;
        this.props.setShowGridView(false);
        this.props.setShowListView(false);
        this.setState({ showLoading: true });
        this.props.getItems(params).then(async (value) => {
            await this.props.getCatalogNameSetItem();
            await this.props.getSetCatalogName();
            this.setState({showLoading: false});
            if(girdView){
                this.props.setShowGridView(true);
            }else if (listView) {
                this.props.setShowListView(true);
            }
        });
        let { currPage } = this.props.fields;
        currPage.onChange(eventKey);
    }

    handleGo(e){
        e.preventDefault();
        const getPage = parseInt((this.refs.reletego.value != ''?this.refs.reletego.value:this.state.activePage));
        const userLogin = JSON.parse(sessionStorage.logindata);
        const { showGridView,showListView,totalPages,ItemsOrder,SetReferencdOrder } = this.props;
        if (Number(this.refs.reletego.value) > totalPages || Number(this.refs.reletego.value) < 1) {
            this.setState({isOpenMsgPageInvalid: true});
        }else{
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
            let params = {
                'page' : getPage, 'sortBy': sortingBy, 'sortDirections': sortingDirection, 'pageSize' : pageSize,
                'ItemsOrder': ItemsOrder, 'SetReferencdOrder': SetReferencdOrder
            };
            const filters =  JSON.parse(sessionStorage.filters);
            params = GetGemstoneLotnumberFilter(filters, params);
            let girdView = showGridView;
            let listView = showListView;
            this.props.setShowGridView(false);
            this.props.setShowListView(false);
            this.setState({ showLoading: true });
            this.props.getItems(params).then(async (value) => {
                await his.props.getCatalogNameSetItem();
                await this.props.getSetCatalogName();
                this.setState({showLoading: false});
                if(girdView){
                    this.props.setShowGridView(true);
                }else if (listView) {
                    this.props.setShowListView(true);
                }
            });
        }
    }

    renderPagination(){
        const { fields: { currPage }, totalPages, currentPage, items, handleSubmit, resetForm, submitting
        } = this.props;
        const page = this.state.activePage;
        return(
            <div>
                <Pagination prev next first last ellipsis boundaryLinks
                    items={totalPages} maxButtons={4}
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
        const { fields: { currPage }, totalPages, currentPage,ViewAsSet, items, totalPublicPrice, totalUpdatedCost,
                allItems, maxPrice, minPrice, avrgPrice, handleSubmit, resetForm, submitting
        } = this.props;
        let _totalUpdatedCost =  (totalUpdatedCost!=null) ? numberFormat(totalUpdatedCost) : 0;
        let _totalPublicPrice =  (totalPublicPrice!=null) ? numberFormat(totalPublicPrice) : 0;
        const userLogin = JSON.parse(sessionStorage.logindata);
        return(
            <RenderClassTotals userLogin={userLogin} allItems={allItems} ViewAsSet={ViewAsSet}
                _totalPublicPrice = {_totalPublicPrice} _totalUpdatedCost = {_totalUpdatedCost}
                maxPrice = {maxPrice} minPrice = {minPrice} avrgPrice = {avrgPrice} />
        );
    }

    onClickGrid(pageNumber) {
        const { ViewAsSet } = this.props;
        const token = sessionStorage.token;
        if(token){
            if (ViewAsSet) {
                this.context.router.push(`/setdetail/${pageNumber.replace('/','-')}`);
            }else{
                this.context.router.push(`/productdetail/${pageNumber}`);
            }
        }
    }

    onCheckedAllItems = (e) =>{
        const that = this;
        const { allItems, ViewAsSet } = this.props;
        let itemAdded = [];
        allItems.map((item) => {
            let objItem = {};
            if (ViewAsSet) {
                let itemName = (item.type != undefined)
                                ? (item.type != 'CER')
                                    ? item.description
                                    : item.name
                                :item.description;
                objItem = {...objItem, reference: item.reference, description: itemName, priceUSD: item.totalPrice['USD']};
            }else{
                //   objItem = {...objItem, id: item.id, reference: item.reference, description: itemName, priceUSD: item.price['USD']};
                objItem = {...objItem, id: item.id};
            }
            listMyCatalog.push(objItem);
        });
        if (e.target.checked) {
            chkAllItems.map(function(field, index){
                that.setState({[field]: true});
            });
            this.setState({enabledMyCatalog: true});
            this.setState({checkAllItems: true});
        }else{
            listMyCatalog = [];
            chkAllItems.map(function(field, index){
                that.setState({[field]: false});
            });
            this.setState({enabledMyCatalog: false});
            this.setState({checkAllItems: false});
        }
    }

    checkedOneItemMyCatalog = (item) => {
        const { items, ViewAsSet, allItems } = this.props;
        let itemAdded = [];
        const itemReference = item.target.value;
        const itemIndexId = item.target.id;
        if (ViewAsSet) {
            itemAdded = items.filter(oneItem => oneItem.reference === itemReference);
        }else{
            itemAdded = items.filter(oneItem => oneItem.id === itemReference);
        }
        itemAdded = itemAdded[0];

        let itemName = (itemAdded.type != undefined)
                        ? (itemAdded.type != 'CER')
                            ? itemAdded.description
                            : itemAdded.name
                        :itemAdded.description;

        let objItem = {};
        if (ViewAsSet) {
            objItem = {...objItem, reference: itemAdded.reference, description: itemName, priceUSD: itemAdded.priceUSD};
        }else{
            objItem = {...objItem, id: itemAdded.id, reference: itemAdded.reference, description: itemName, priceUSD: itemAdded.price['USD']};
        }
        if(!this.state.enabledMyCatalog){
            listMyCatalog = [];
        }
        if (item.target.checked) {
            listMyCatalog.push(objItem);
            this.setState({[itemIndexId]: true});
            this.setState({checkAllItems: (allItems.length == listMyCatalog.length) ? true : false});
        } else {
            if (ViewAsSet) {
                listMyCatalog = listMyCatalog.filter(inItem => inItem.reference !== itemReference);
            }else{
                listMyCatalog = listMyCatalog.filter(inItem => inItem.id !== itemReference);
            }
            this.setState({[itemIndexId]: false});
            this.setState({checkAllItems: false});
        }
        if (listMyCatalog.length != 0) {
            this.setState({enabledMyCatalog: true});
        } else {
            this.setState({enabledMyCatalog: false});
        }
    }

    addedOneItemMyCatalog = (item) => {
        let fileName = jQuery('input[type="checkbox"]');
        fileName.removeAttr('checked');
        listMyCatalog  = [];
        this.setState({enabledMyCatalog: false});
        const { items, ViewAsSet } = this.props;
        let itemAdded = [];
        if (ViewAsSet) {
            itemAdded = items.filter(oneItem => oneItem.reference === item.target.attributes[3].value);
        }else{
            itemAdded = items.filter(oneItem => oneItem.id === item.target.attributes[3].value);
        }
        itemAdded = itemAdded[0];
        let itemName = (itemAdded.type != undefined)
                          ? (itemAdded.type != 'CER')
                              ? itemAdded.description
                              : itemAdded.name
                          :itemAdded.description;
        let objItem = {};
        if (ViewAsSet) {
            objItem = {...objItem, reference: itemAdded.reference, description: itemName, priceUSD: itemAdded.priceUSD};
        }else{
            objItem = {...objItem, id: itemAdded.id, reference: itemAdded.reference, description: itemName, priceUSD: itemAdded.price['USD']};
        }
        listMyCatalog.push(objItem);
        this.setState({isOpenAddMyCatalog: true});
    }

    gridViewResults(){
        this.props.setShowGridView(true);
        this.props.setShowListView(false);
    }

    listViewResults(){
        this.props.setShowGridView(false);
        this.props.setShowListView(true);
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
        let params = {
            'page' : 1, 'sortBy': sortingBy, 'sortDirections': sortingDirection, 'pageSize' : pageSize,
            'ItemsOrder': null, 'SetReferencdOrder': null
        };
        const filters =  JSON.parse(sessionStorage.filters);
        params = GetGemstoneLotnumberFilter(filters, params);
        let girdView = showGridView;
        let listView = showListView;
        this.props.setShowGridView(false);
        this.props.setShowListView(false);
        this.setState({ showLoading: true });
        this.props.setItemsOrder(null);
        this.props.setSetReferenceOrder(null);
        this.props.setSortingBy(e.target.value);
        this.props.getItems(params).then(async (value) => {
            await this.props.getCatalogNameSetItem();
            await this.props.getSetCatalogName();
            this.setState({showLoading: false});
            if(girdView){
                this.props.setShowGridView(true);
            }else if (listView) {
                this.props.setShowListView(true);
            }
        });
        let { currPage } = this.props.fields;
        currPage.onChange(1);
        currPage.value = 1;
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
            'page' : 1, 'sortBy': sortingBy, 'sortDirections': sortingDirection, 'pageSize' : pageSize,
            'ItemsOrder': null, 'SetReferencdOrder': null
        };

        const filters =  JSON.parse(sessionStorage.filters);
        params = GetGemstoneLotnumberFilter(filters, params);
        let girdView = showGridView;
        let listView = showListView;
        this.props.setShowGridView(false);
        this.props.setShowListView(false);
        this.setState({ showLoading: true });
        this.props.setItemsOrder(null);
        this.props.setSetReferenceOrder(null);
        this.props.setSortDirection(e.target.value);
        this.props.getItems(params).then(async (value) => {
            await this.props.getCatalogNameSetItem();
            await this.props.getSetCatalogName();
            this.setState({showLoading: false});
            if(girdView){
                this.props.setShowGridView(true);
            }else if (listView) {
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
        const { showGridView,showListView,ItemsOrder,SetReferencdOrder } = this.props;
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

        this.setState({activePage: 1});
        let params = {
            'page' : 1, 'sortBy': sortingBy, 'sortDirections': sortingDirection, 'pageSize' : pageSize,
            'ItemsOrder': ItemsOrder, 'SetReferencdOrder': SetReferencdOrder
        };

        const filters =  JSON.parse(sessionStorage.filters);
        params = GetGemstoneLotnumberFilter(filters, params);
        let girdView = showGridView;
        let listView = showListView;
        this.props.setShowGridView(false);
        this.props.setShowListView(false);
        this.setState({ showLoading: true });
        this.props.setPageSize(pageSize);
        this.props.getItems(params).then(async (value) => {
            await his.props.getCatalogNameSetItem();
            await this.props.getSetCatalogName();
            this.setState({showLoading: false});
            if(girdView){
                this.props.setShowGridView(true);
            }else if (listView) {
                this.props.setShowListView(true);
            }
        });
    }

    newSearch(e){
        e.preventDefault();
        (async() => {
            const token = sessionStorage.token;
            this.props.setSortingBy('itemCreatedDate');
            this.props.setSortDirection('desc');
            this.props.setPageSize(16);
            this.props.setShowGridView(true);
            this.props.setShowListView(false);
            let paramsSearch = this.props.paramsSearch;
            let keys = Object.keys(paramsSearch);
            keys.forEach((key) => {
                paramsSearch[key] = '';
            })
            await this.props.newSearch();
            await this.props.setParams(paramsSearch);
            await sessionStorage.setItem('paramsSearch', JSON.stringify(paramsSearch));
            if(token){
                this.context.router.push('/inventories');
            }
        })()
    }

    modifySearch(e) {
        e.preventDefault();
        (async() => {
            const token = sessionStorage.token;
            this.props.setSortingBy('itemCreatedDate');
            this.props.setSortDirection('desc');
            this.props.setPageSize(16);
            this.props.setShowGridView(true);
            this.props.setShowListView(false);
            this.setState({showLoading: false});
            await this.props.modifySearch(this.props.paramsSearch);
            if(token){
                this.context.router.push('/inventories');
            }
        })()
    }

    openModal() {
        this.setState({ isOpen: true });
    }

    hideModal = (e) => {
        e.preventDefault();
        this.setState({ showImages: false })
        this.setState({ isOpen: false });
    }

    hideModalViewAsSet = (e) => {
        e.preventDefault();
        this.setState({ showImagesViewAsSet: false })
        this.setState({isOpenViewAsSet: false});
    }

    hideModalDownload = (e) => {
        e.preventDefault();
        const { showGridView,showListView } = this.props;

        this.setState({ isOpenDownload: false });

        let girdView = showGridView;
        let listView = showListView;

        this.props.setShowGridView(false);
        this.props.setShowListView(false);

        if(girdView){
            this.props.setShowGridView(true);
        }else if (listView) {
            this.props.setShowListView(true);
        }
    }

    hideModalNoResults = (e) => {
        e.preventDefault();
        this.setState({isOpenNoResults: false});
        this.setState({showLoading: true});

        this.props.modifySearch(this.props.paramsSearch);

        const token = sessionStorage.token;

        let modalOpen = jQuery('.modal-open');
        modalOpen.removeClass();
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
        this.setState({ isOpen: true });
    }

    exportExcelViewAsSet = _=> {
        const that = this;
        checkFieldsViewAsSet.map(function(field, index){
            that.setState({ [field]: false });
        });
        this.setState({ allFieldsViewAsSet: false });
        this.setState({ showImagesViewAsSet: false });
        this.setState({ isOpenViewAsSet: true });
    }

    confirmExport(e){
        e.preventDefault();
        const that = this;
        const host = HOSTNAME || 'localhost';
        const ROOT_URL = (host != 'mol.mouawad.com')? `//${host}:3005`: `//${host}`;
        const { items, exportItems, paramsSearch, showGridView,showListView } = this.props;
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
            allFields: this.state.allFields, showImages: this.state.showImages, ingredients: this.state.ingredients,
            categoryName: this.state.categoryName, category: this.state.category, article: this.state.article,
            collection: this.state.collection, setReferenceNumber: this.state.setReferenceNumber, cut: this.state.cut,
            color: this.state.color, clarity: this.state.clarity, caratWt: this.state.caratWt, unit: this.state.unit,
            qty: this.state.qty, origin: this.state.origin, symmetry: this.state.symmetry, flourance: this.state.flourance,
            batch: this.state.batch, netWeight: this.state.netWeight, stoneQty: this.state.stoneQty,
            dominantStone: this.state.dominantStone, markup: this.state.markup, certificatedNumber: this.state.certificatedNumber,
            certificateDate: this.state.certificateDate, vendorCode: this.state.vendorCode, brand: this.state.brand,
            vendorName: this.state.vendorName, metalColor: this.state.metalColor, metalType: this.state.metalType,
            complication: this.state.complication, strapType: this.state.strapType, strapColor: this.state.strapColor,
            buckleType: this.state.buckleType, dialIndex: this.state.dialIndex, dialColor: this.state.dialColor,
            movement: this.state.movement, serial: this.state.serial, limitedEdition: this.state.limitedEdition,
            limitedEditionNumber: this.state.limitedEditionNumber, itemCreatedDate: this.state.itemCreatedDate
        };
        let params = {
            'page' : this.props.currentPage, 'sortBy': sortingBy, 'sortDirections': sortingDirection,
            'pageSize' : this.props.pageSize, 'fields': fields, 'price': userLogin.permission.price,
            'ROOT_URL': ROOT_URL, 'userName': userLogin.username, 'userEmail': userLogin.email
        };
        // default search params
        const filters =  JSON.parse(sessionStorage.filters);

        params = GetGemstoneLotnumberFilter(filters, params);

        this.setState({ showLoading: true, isOpen: false });

        let girdView = showGridView;
        let listView = showListView;

        this.props.setShowGridView(false);
        this.props.setShowListView(false);

        this.props.exportDatas(params).then((value) => {
            if(girdView){
                that.props.setShowGridView(true);
            }else if (listView) {
                that.props.setShowListView(true);
            }
            that.setState({ showLoading: false, isOpenDownload: true });
        });
    }

    confirmExportViewAsSet = e => {
        e.preventDefault();
        const that = this;
        const host = HOSTNAME || 'localhost';
        const ROOT_URL = (host != 'mol.mouawad.com')? `//${host}:3005`: `//${host}`;
        const { items, exportItems, paramsSearch, showGridView,showListView } = this.props;
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
            allFieldsViewAsSet: this.state.allFieldsViewAsSet, showImagesViewAsSet: this.state.showImagesViewAsSet,
            totalActualCost: this.state.totalActualCost, totalUpdatedCost: this.state.totalUpdatedCost,
            totalPrice: this.state.totalPrice, markup: this.state.markup, companyName: this.state.companyName,
            warehouseName: this.state.warehouseName, createdDate: this.state.createdDate
        };

        let params = {
            'page' : this.props.currentPage, 'sortBy': sortingBy, 'sortDirections': sortingDirection,
            'pageSize' : this.props.pageSize, 'fields': fields, 'price': userLogin.permission.price,
            'ROOT_URL': ROOT_URL, 'userName': userLogin.username, 'userEmail': userLogin.email
        };

        // default search params

        const filters =  JSON.parse(sessionStorage.filters);

        params = GetGemstoneLotnumberFilter(filters, params);

        this.setState({ showLoading: true, isOpenViewAsSet: false });

        let girdView = showGridView;
        let listView = showListView;

        this.props.setShowGridView(false);
        this.props.setShowListView(false);

        this.props.exportDatas(params).then(async (value) => {
            await this.props.getCatalogNameSetItem();
            await this.props.getSetCatalogName();
            if(girdView){
                that.props.setShowGridView(true);
            }else if (listView) {
                that.props.setShowListView(true);
            }
            that.setState({ showLoading: false, isOpenDownload: true });
        });
    }

    renderExportExcelDialog(){
        let that = this;
        const userLogin = JSON.parse(sessionStorage.logindata);
        return(
            <RenderExportExcelDialog that={this} userLogin={userLogin} checkFields={checkFields} labels={labels}/>
        );
    }

    renderExportExcelViewAsSetDialog = _=>{
        let that = this;
        const userLogin = JSON.parse(sessionStorage.logindata);
        return(
            <RenderExportExcelViewAsSetDialog that={this} userLogin={userLogin}
                checkFieldsViewAsSet ={checkFieldsViewAsSet } labelsViewAsSet={labelsViewAsSet}/>
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
                                <h3>Please check your email for download files.</h3>
                                <a href={listFileName[0]} target="_blank" >{listFileName[0]}</a>
                                <link></link>
                                <br/>
                                <div className="col-sm-12">
                                    <div className="col-sm-3"></div><div className="col-sm-3"></div>
                                    <div className="col-sm-3"></div><div className="col-sm-3"></div>
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
                                <h3>Please check your email for download files.</h3>
                                <br/>
                                <div className="col-sm-12">
                                    <div className="col-sm-3"></div><div className="col-sm-3"></div>
                                    <div className="col-sm-3"></div><div className="col-sm-3"></div>
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
        const {fields: { oldCatalogName, newCatalogName, validateCatalogName } } = this.props;

        newCatalogName.value = '';
        oldCatalogName.value = '';
        newCatalogName.onChange('');
        oldCatalogName.onChange('');
        this.setState({ isOpenAddMyCatalog: false });
    }

    handleSubmitCatalog = (e)=> {
        e.preventDefault();
        const { ViewAsSet } = this.props;
        let fileName = jQuery('input[type="checkbox"]');
        fileName.removeAttr('checked');
        this.setState({isOpenAddMyCatalog: false});
        const { fields: { oldCatalogName, newCatalogName, validateCatalogName, oldSetCatalogName, newSetCatalogName } } = this.props;
        const  Detail  = this.props.productdetail;
        const  listCatalogName  = this.props.listCatalogName;
        const  listSetCatalogName  = this.props.listSetCatalogName;
        let oldCatalogTitle = ''
        let oldSetCatalogTitle = ''
        if (oldCatalogName.value) {
            oldCatalogTitle = listCatalogName.find(catalogname => catalogname._id === oldCatalogName.value)
        }
        if (oldSetCatalogName.value) {
            oldSetCatalogTitle = listSetCatalogName.find(catalogname => catalogname._id === oldCatalogName.value)
        }

        const catalogdata = {...catalogdata,
            id:!!oldCatalogName.value ? oldCatalogName.value  :null,
            catalog: !!oldCatalogName.value ? oldCatalogTitle.catalog : newCatalogName.value,
            items:listMyCatalog
        }
        const setcatalogdata = {...catalogdata,
            id:!!oldSetCatalogName.value ? oldSetCatalogName.value : null,
            setcatalog: !!oldSetCatalogName.value ? oldSetCatalogTitle.setcatalog : newSetCatalogName.value,
            items:listMyCatalog
        }

        if (ViewAsSet) {
            if (!!oldCatalogName.value || !!newCatalogName.value) {
                this.props.addCatalogSetItem(catalogdata).then(async () =>{
                    newCatalogName.value = '';
                    oldCatalogName.value = '';
                    newCatalogName.onChange('');
                    oldCatalogName.onChange('');

                    this.setState({isOpenAddMyCatalogmsg: true});
                    this.setState({enabledMyCatalog: false});
                    await this.props.getCatalogNameSetItem();
                    await this.props.getSetCatalogName();
                })
            }
            if (!!oldSetCatalogName.value || !!newSetCatalogName.value) {
                this.props.addNewSetCatalogItem(setcatalogdata).then(async () =>{
                    newSetCatalogName.value = '';
                    oldSetCatalogName.value = '';
                    newSetCatalogName.onChange('');
                    oldSetCatalogName.onChange('');

                    this.setState({isOpenAddMyCatalogmsg: true});
                    this.setState({enabledMyCatalog: false});
                    await this.props.getCatalogNameSetItem();
                    await this.props.getSetCatalogName();
                })
            }

        } else {
            this.props.addCatalog(catalogdata).then(async () =>{
                newCatalogName.value = '';
                oldCatalogName.value = '';
                newCatalogName.onChange('');
                oldCatalogName.onChange('');

                this.setState({isOpenAddMyCatalogmsg: true});
                this.setState({enabledMyCatalog: false});
                await this.props.getCatalogNameSetItem();
                await this.props.getSetCatalogName();
            })
        }
    }

    renderAddMyCatalog = _=> {
        const { listCatalogName, listSetCatalogName, submitting } = this.props;
        return(
            <ModalMyCatalog onSubmit={this.handleSubmitCatalog} listCatalogName={listCatalogName}
                isOpen={this.state.isOpenAddMyCatalog} isClose={this.handleClose} props={this.props}
                listSetCatalogName = {listSetCatalogName}/>
        );
    }

    renderAlertmsg = _=> {
        const message = 'Add to catalog success';
        const title = 'SEARCH RESULTS';
        return(
            <Modalalertmsg isOpen={this.state.isOpenAddMyCatalogmsg} isClose={this.handleClosemsg}
                props={this.props} message={message}  title={title}/>
        );
    }

    renderAlertmsgPdf = _=> {
        const message = 'Please check your email for printing files.';
        const title = 'SEARCH RESULTS';
        return(
            <Modalalertmsg isOpen={this.state.isOpenPrintPdfmsg} isClose={this.handleClosePdfmsg}
                props={this.props} message={message}  title={title}/>
        );
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
        this.setState({isOpenAddMyCatalog: false});
    }

    renderAlertmsgPageInvalid = _=> {
        const message = 'Page is invalid.';
        const title = 'SEARCH RESULTS';
        return(
            <Modalalertmsg isOpen={this.state.isOpenMsgPageInvalid} isClose={this.handleCloseMsgPageInvalid}
                props={this.props} message={message}  title={title}/>
        );
    }

    handleCloseMsgPageInvalid = _=>{
        this.setState({isOpenMsgPageInvalid: false});
    }

    render() {
        const { fields: { oldCatalogName, newCatalogName, validateCatalogName },
              totalPages, showGridView, showListView, ViewAsSet, currentPage, allItems, pageSize,exportItems,
              totalPublicPrice, totalUpdatedCost, handleSubmit, resetForm, submitting, ItemsOrder,
              sortingBy, sortDirection } = this.props;
        const { isOpenMessage } = this.state;
        const userLogin = JSON.parse(sessionStorage.logindata);
        let { items } = this.props;
        let numbers = document.querySelectorAll('input[type="number"]');

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
                      || e.keyCode == 190 )) {
                        return false;
                    }
                }
            }
        }
        if(items == null){
            return (
                <form role="form">
                    <div >
                        <center>
                            <h3>Please wait....</h3>
                            <br/><br/><br/><br/><br/><br/>
                            <Loading type="spin" color="#202020" width="10%"/>
                        </center>
                    </div>
                </form>
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
                                            <select className="form-searchresult" onChange={this.sortingBy} ref="sortingBy" >
                                                <option key={'itemCreatedDate'} value={'itemCreatedDate'}>{'Updated Date'}</option>
                                                <option key={'price'} value={'price'}>{'Public Price'}</option>
                                                <option key={'reference'} value={'reference'}>{'Item Reference'}</option>
                                                <option key={'description'} value={'description'}>{'Description'}</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-sm-2 col-xs-12 nopadding padding-l10 m-pt-select">
                                        <div className="styled-select">
                                            <select className="form-searchresult" onChange={this.sortingDirection}
                                                ref="sortingDirection">
                                                <option key={'desc'} value={'desc'}>{'Descending'}</option>
                                                <option key={'asc'} value={'asc'}>{'Ascending'}</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-sm-2 ft-white nopadding pd-10">
                                        <div disabled={submitting} onClick={ this.gridViewResults }>
                                            <div className="bd-white m-pt-mgl"></div>
                                        </div>
                                        <div disabled={submitting} onClick={ this.listViewResults } >
                                            <div className="bd-white m-pt-mgl"></div>
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
                                            <select className="form-searchresult" onChange={this.sortingBy}
                                                ref="sortingBy">
                                                <option key={'itemCreatedDate'} value={'itemCreatedDate'}>{'Updated Date'}</option>
                                                <option key={'price'} value={'price'}>{'Public Price'}</option>
                                                <option key={'reference'} value={'reference'}>{'Item Reference'}</option>
                                                <option key={'description'} value={'description'}>{'Description'}</option>
                                                <option key={'setReference'} value={'setReference'}>{'Set Reference Number'}</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-sm-2 col-xs-12 nopadding padding-l10 m-pt-select">
                                        <div className="styled-select">
                                            <select className="form-searchresult" onChange={this.sortingDirection}
                                                ref="sortingDirection">
                                                <option key={'desc'} value={'desc'}>{'Descending'}</option>
                                                <option key={'asc'} value={'asc'}>{'Ascending'}</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-sm-2 ft-white nopadding pd-10">
                                        <div disabled={submitting} onClick={ this.gridViewResults } >
                                            <div className={`icon-grid m-pt-mgl ${showGridView ? 'icon-grid-active' : ''}` }></div>
                                        </div>
                                        <div disabled={submitting} onClick={ this.listViewResults } >
                                            <div className={`icon-list m-pt-mgl ${showListView ? 'icon-list-active' : ''}` }></div>
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
                                            <div className="col-md-3 col-sm-12 col-xs-12 nopadding">
                                                <div className="checkbox checkbox-warning check-navi">
                                                    <input type="checkbox" id="checkAllItems" className="styled"
                                                        type="checkbox" name="all" checked={this.state.checkAllItems}
                                                        onChange={this.onCheckedAllItems} />
                                                    <label className="checkbox1">Select All</label>
                                                </div>
                                                {
                                                    this.state.enabledMyCatalog
                                                    ? <a><div className="icon-add" disabled={true} enabled={false}
                                                        onClick={ this.addMyCatalog }></div></a>
                                                    : <a><div className="icon-add" disabled={true} enabled={false} >
                                                        </div></a>
                                                }
                                                <div className="box-line-nav"><div className="line-nav"></div></div>
                                                {
                                                    ViewAsSet
                                                    ? <a><div className="icon-excel" disabled={submitting}
                                                          onClick={ this.exportExcelViewAsSet }></div></a>
                                                    : <a><div className="icon-excel" disabled={submitting}
                                                          onClick={ this.exportExcel }></div></a>
                                                }
                                                <a>
                                                    <div className="icon-print margin-l10" id="printproduct"
                                                        disabled={submitting} onClick={ this.showDialogPrintOptions }>
                                                    </div>
                                                </a>
                                            </div>
                                            <div className="col-md-9 col-sm-12 col-xs-12 pagenavi">
                                                <div className="searchresult-navi search-right">
                                                    {this.renderPagination()}
                                                </div>
                                                <div className="pull-right maring-b10">
                                                    <div className="pull-left padding-r10 margin-t7">View</div>
                                                    <div className="pull-left">
                                                        <select className="form-control"
                                                            onChange={ this.selectedPageSize } ref="pageSize">
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
                                                    onAddedOneItemMyCatalog={this.addedOneItemMyCatalog}
                                                    ViewAsSet={ViewAsSet} stateItem={this.state} chkAllItems={chkAllItems}
                                                    listMyCatalog={listMyCatalog}/>
                                            </div>
                                            <div id="dvGridview" className="search-product hidden">
                                                <GridItemsViewPrint  items={items} onClickGrid={this.onClickGrid}
                                                    ViewAsSet={ViewAsSet} stateItem={this.state} chkAllItems={chkAllItems}
                                                    listMyCatalog={listMyCatalog}/>
                                            </div>
                                            <div className={`col-sm-12 search-product list-search ${showListView ? '' : 'hidden'}` }>
                                                <ListItemsView key={'listView'} id={'listView'}
                                                    items={items} pageSize={pageSize} onClickGrid={this.onClickGrid}
                                                    onCheckedOneItemMyCatalog={this.checkedOneItemMyCatalog}
                                                    ViewAsSet={ViewAsSet} stateItem={this.state} chkAllItems={chkAllItems}
                                                    listMyCatalog={listMyCatalog}/>
                                            </div>
                                            <div id="dvListview" className="col-sm-12 search-product hidden">
                                                <ListItemsViewPrint items={items} pageSize={pageSize} onClickGrid={this.onClickGrid}
                                                    ViewAsSet={ViewAsSet} stateItem={this.state} chkAllItems={chkAllItems}
                                                    listMyCatalog={listMyCatalog}/>
                                            </div>
                                            <div id="dvListviewAll" className="col-sm-12 search-product hidden">
                                                <ListItemsViewPrint items={items} pageSize={exportItems.length}
                                                      onClickGrid={this.onClickGrid} ViewAsSet={ViewAsSet} stateItem={this.state}
                                                      chkAllItems={chkAllItems} listMyCatalog={listMyCatalog}/>
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
                        {this.renderAlertmsgPageInvalid()}
                        {this.renderExportExcelViewAsSetDialog()}
                        {this.renderDialogPrintOptions()}
                    </form>
                );
            }
        }
    }
}
function mapStateToProps(state) {
    return {
        searchResult: state.searchResult, items: state.searchResult.datas, exportItems: state.searchResult.exportItems,
        totalPages: state.searchResult.totalpage, currentPage: state.searchResult.currentPage,
        totalPublicPrice: state.searchResult.totalpublicprice, totalUpdatedCost: state.searchResult.totalupdatedcost,
        allItems: state.searchResult.allItems, filters: state.searchResult.filters, maxPrice: state.searchResult.maxPrice,
        paramsSearch: state.searchResult.paramsSearch, minPrice: state.searchResult.minPrice,
        avrgPrice: state.searchResult.avrgPrice, pageSize: state.searchResult.PageSize, sortingBy: state.searchResult.SortingBy,
        sortDirection: state.searchResult.SortDirection, showGridView: state.searchResult.ShowGridView,
        showListView: state.searchResult.ShowListView, listCatalogName: state.myCatalog.ListCatalogName,
        ViewAsSet: state.searchResult.viewAsSet, ItemsOrder: state.searchResult.itemsOrder,
        SetReferencdOrder: state.searchResult.setReferenceOrder, listSetCatalogName: state.myCatalog.ListSetCatalogName,
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
    fields: [ 'currPage','oldCatalogName','newCatalogName','validateCatalogName','printPage','oldSetCatalogName','newSetCatalogName' ],
    validate:validateCatalog
},mapStateToProps,itemactions)(SearchResult)
