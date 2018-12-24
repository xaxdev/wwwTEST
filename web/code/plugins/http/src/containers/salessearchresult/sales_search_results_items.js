import React, { Component, PropTypes } from 'react';
import { Button,FormControl,Pagination, ControlLabel, DropdownButton, MenuItem } from 'react-bootstrap';
import { Modal, ModalClose } from 'react-modal-bootstrap';
import moment from 'moment-timezone';
import RenderClassTotals from './utils/render_total';
import GetGemstoneLotnumberFilter from './utils/get_gemlot_filter';
import ModalPrintOptions from './utils/modalPrintOptions';
import RenderSalesExportExcelDialog from './utils/render_export_excel_dialog';
import RenderExportExcelViewAsSetDialog from './utils/render_export_excel_viewasset_dialog'
import numberFormat from '../../utils/convertNumberformat';
import GenSalesTemplateHtml from '../../utils/genTemplatePdfSalesSearchResult';
import GridSalesItemsView from '../../components/salessearchresults/gridsalesitemview';
import ListSalesItemsView from '../../components/salessearchresults/listsalesitemview';
import ListSalesItemsViewPrint from '../../components/salessearchresults/listsalesitemviewprint';
import GridSalesItemsViewPrint from '../../components/salessearchresults/gridsalesitemviewprint';
import Modalalertmsg from '../../utils/modalalertmsg';
import GetSalesPricePermission from '../../utils/getSalesPricePermission';

const Loading = require('react-loading');

const checkFields = ['ingredients', 'categoryName', 'category', 'article', 'collection', 'setReferenceNumber', 'cut', 'color','clarity', 'caratWt', 'unit',
    'qty', 'origin', 'symmetry', 'flourance', 'batch', 'netWeight', 'stoneQty','markup', 'certificatedNumber', 'certificateDate', 'vendorCode', 'vendorName',
    'metalColor', 'metalType','dominantStone','brand', 'complication', 'strapType', 'strapColor', 'buckleType','dialIndex', 'dialColor','movement','serial',
    'limitedEdition','limitedEditionNumber','itemCreatedDate', 'postedDate', 'salesId', 'salesPersonName', 'salesChannel', 'customer', 'customerName',
    'invoicedId', 'invoiceDate', 'inventSizeId'
];

const checkFieldsViewAsSet = ['totalActualCost','totalUpdatedCost','totalPrice', 'markup', 'companyName', 'warehouseName', 'postedDate'];

const labels = {
    ingredients: 'Ingredients', categoryName: 'Category Name', category: 'Category', article: 'Article', collection: 'Collection', cut: 'Cut', color: 'Color',
    setReferenceNumber: 'Set Reference Number', clarity: 'Clarity', caratWt: 'Carat Wt', unit: 'Unit', qty: 'Qty', origin: 'Origin', symmetry: 'Symmetry',
    flourance: 'Flourance', batch: 'Batch', netWeight: 'Gold weight (Grams)', stoneQty: 'Stone Qty', dominantStone: 'Dominant Stone', markup: 'Markup%',
    certificatedNumber: 'Certificate Number', certificateDate: 'Certificate Date', vendorCode: 'Vendor Code', vendorName: 'Vendor Name', metalType: 'Metal Type',
    metalColor: 'Metal Colour', brand: 'Brand', complication: 'Complication', strapType: 'Strap Type', strapColor: 'Strap Color', buckleType: 'Buckle Type',
    dialIndex: 'Dial Index', dialColor: 'Dial Color', movement: 'Movement', serial: 'Serial #', limitedEdition: 'Limited Edition', itemCreatedDate: 'Created Date',
    limitedEditionNumber: 'Limited Edition #', postedDate: 'Posted Date', salesId: 'Sales Id', salesPersonName: 'Sales Person Name', salesChannel: 'Sales Channel Type',
    customer: 'Customer', customerName: 'Customer Name', invoicedId: 'Invoiced Id', invoiceDate: 'Invoice Date', inventSizeId: 'Size'
}

const labelsViewAsSet = {
    totalActualCost: 'Total Cost Price (USD)', totalUpdatedCost: 'Total Updated Cost (USD)', totalPrice: 'Total Price (USD)', markup: 'Markup (Times)',
    companyName: 'Company', warehouseName: 'Boutique', postedDate: 'Posted Date'
}
class SalesSearchResultItems extends Component {
    constructor(props) {
        super(props);

        this.salesSortingBy = this.salesSortingBy.bind(this);
        this.salesSortingDirection = this.salesSortingDirection.bind(this);
        this.selectedSalesPageSize = this.selectedSalesPageSize.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleGo = this.handleGo.bind(this);
        this.onClickGrid = this.onClickGrid.bind(this);
        this.showDialogPrintOptions = this.showDialogPrintOptions.bind(this);
        this.printResults = this.printResults.bind(this);
        this.confirmExport = this.confirmExport.bind(this);
        this.selectedAllFieldsExportExcel = this.selectedAllFieldsExportExcel.bind(this);
        this.selectedShowImages = this.selectedShowImages.bind(this);
        this.exportExcel = this.exportExcel.bind(this);
        this.exportExcelViewAsSet = this.exportExcelViewAsSet.bind(this);
        this.confirmExportViewAsSet = this.confirmExportViewAsSet.bind(this);

        this.state = {
            activePage: this.props.currentSalesPage, isExport: false, isOpen: false, isOpenDownload: false, allFields: false, isOpenNoResults: true, cut: false,
            showImages: false, ingredients: false, categoryName: false, category: false,article: false, collection: false, setReferenceNumber: false,
            color: false, clarity: false,caratWt: false, unit: false, qty: false, origin: false, symmetry: false, flourance: false, batch: false,
            netWeight: false,stoneQty: false, dominantStone: false,  certificatedNumber: false, certificateDate: false, vendorCode: false,
            vendorName: false, metalColor: false, metalType: false, brand: false, complication: false, strapType: false, strapColor: false, buckleType: false,
            dialIndex: false,dialColor: false, movement: false, serial: false, limitedEdition: false, limitedEditionNumber: false, itemCreatedDate:false,
            showLoading: false, postedDate:false, isOpenAddMyCatalog: false, enabledMyCatalog:false, isOpenAddMyCatalogmsg: false, isOpenPrintPdfmsg: false,
            isOpenMsgPageInvalid: false, markup: false, checkAllItems: false, allFieldsViewAsSet: false, showImagesViewAsSet: false, isOpenViewAsSet: false,
            totalActualCost: false, totalUpdatedCost: false, totalPrice: false, companyName: false, warehouseName: false, createdDate: false, salesId:false,
            isOpenPrintOptions: false, salesPersonName:false, salesChannel: false, customer: false, customerName: false, invoicedId: false,
            invoiceDate: false, inventSizeId: false
        };
    }

    componentDidMount() {
        const { props } = this.props;
        let that = this;
        const { fields: {printPage } } = props;
        if (printPage.value == undefined) {
            printPage.onChange('all');
        }
        if(this.refs.salesSortingBy != undefined){
            let values = [].filter.call(this.refs.salesSortingBy.options, function (o) {
                o.selected = false;
                if(o.value == props.salesSortingBy){
                    o.selected = true
                }
                return o.selected;
            }).map(function (o) {
                return o.value;
            });
        }
        if(this.refs.salesSortingDirection != undefined){
            let values = [].filter.call(this.refs.salesSortingDirection.options, function (o) {
                o.selected = false;
                if(o.value == props.salesSortDirection){
                    o.selected = true
                }
                return o.selected;
            }).map(function (o) {
                return o.value;
            });
        }
        if(this.refs.salesPageSize != undefined){
            let values = [].filter.call(this.refs.salesPageSize.options, function (o) {
                o.selected = false;
                if(o.value == props.salesPageSize){
                    o.selected = true
                }
                return o.selected;
            }).map(function (o) {
                return o.value;
            });
        }
    }

    printResults = async(e) => {
        e.preventDefault();
        const { props } = this.props;
        const { fields: { printPage }, totalPages, items, exportItems } = props;
        const { salesShowGridView, salesShowListView, ViewAsSet } = props;
        const userLogin = JSON.parse(sessionStorage.logindata);
        const host = HOSTNAME || 'localhost';
        const env_web = ENVIRONMENT;
        const ROOT_URL = (host != 'mol.mouawad.com')? `http://${host}:${(ENVIRONMENT!='staging')?3005:4005}`: `http://${host}`;
        let imagesReplace = ROOT_URL+'/images/';
        let exportDate = moment().tz('Asia/Bangkok').format('YYYYMMDD_HHmmss');
        let dvTotal1 = jQuery('#dvTotalsub1').html();
        let dvTotal2 = jQuery('#dvTotalsub2').html();
        let dvGridview = jQuery('#dvGridview').html();
        let dvListview = jQuery('#dvListview').html();
        let dvListviewAll = jQuery('#dvListviewAll').html();
        let dv = {
            'dvTotal1': dvTotal1, 'dvTotal2': dvTotal2, 'dvGridview': dvGridview, 'dvListview': dvListview, 'printPage':printPage, 'items': exportItems,
            'userLogin': userLogin, 'ViewAsSet': ViewAsSet, 'dvListviewAll': dvListviewAll, 'env': env_web
        };
        let htmlTemplate = '';
        if (printPage.value != 'all') {
            htmlTemplate = GenSalesTemplateHtml(salesShowGridView, salesShowListView, ROOT_URL, imagesReplace, dv);
            // console.log('htmlTemplate-->',htmlTemplate);
            let params = {
                'temp': htmlTemplate, 'userName': `${userLogin.username}_${exportDate}`, 'userEmail': userLogin.email, 'ROOT_URL': ROOT_URL, 'channel':'pdf'
            }

            props.writeHtml(params).then((value) => {
                if (value) {
                    this.setState({ isOpenPrintPdfmsg: true });
                }
            });
            this.setState({isOpenPrintOptions: false});
        } else {
            const { salesShowGridView,salesShowListView,ItemsSalesOrder,SetReferenceSalesOrder,ViewAsSet } = this.props;
            let salesSortingBy = '';
            switch (this.refs.salesSortingBy.value) {
                case 'netAmount':
                  salesSortingBy = 'netAmount.' + 'USD';
                  break;
                case 'price':
                  salesSortingBy = 'price.' + 'USD';
                  break;
                default:
                  salesSortingBy = this.refs.salesSortingBy.value;
                  break;
            }
            const salesSortingDirection = this.refs.salesSortingDirection.value;
            const salesPageSize = this.refs.salesPageSize.value;
            // const userPermissionPrice = userLogin.permission.price;
            const userPermissionPrice = GetSalesPricePermission(userLogin.permission.priceSales);
            let viewType = '';
            if (salesShowGridView) {
                viewType = 'grid';
            } else {
                viewType = 'list';
            }
            let params = {
                'page' : 1, 'sortBy': salesSortingBy, 'sortDirections': salesSortingDirection, 'pageSize' : salesPageSize, 'ItemsSalesOrder': ItemsSalesOrder,
                'SetReferenceSalesOrder': SetReferenceSalesOrder,'userName': `${userLogin.username}_${exportDate}`, 'userEmail': userLogin.email,'ROOT_URL': ROOT_URL,
                'env': env_web, 'viewType': viewType, 'userPermissionPrice': userPermissionPrice
            };
            const filters =  JSON.parse(sessionStorage.filters);
            params = GetGemstoneLotnumberFilter(filters, params);

            await props.getSalesAllPDF(params).then((value) => {
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
        const { props } = this.props;
        return(
            <ModalPrintOptions onSubmit={this.printResults} isOpen={this.state.isOpenPrintOptions} isClose={this.handleClosePrintOptions} props={props} />
        );
    }

    salesSortingBy = e => {
        e.preventDefault();
        const { props } = this.props;
        const userLogin = JSON.parse(sessionStorage.logindata);
        const { salesShowGridView, salesShowListView } = props;
        let salesSortingBy = '';
        switch (e.target.value) {
            case 'netAmount':
              salesSortingBy = 'netAmount.' + 'USD';
              break;
            case 'price':
                salesSortingBy = 'price.' + 'USD';
                break;
            default:
                salesSortingBy = e.target.value;
                break;
        }
        this.setState({activePage: 1});
        const { searchResult } = props;
        const salesSortingDirection = this.refs.salesSortingDirection.value;
        const salesPageSize = this.refs.salesPageSize.value;
        let params = {
            'page' : 1, 'sortBy': salesSortingBy, 'sortDirections': salesSortingDirection, 'pageSize' : salesPageSize, 'ItemsSalesOrder': null,
            'SetReferenceSalesOrder': null
        };
        const filters =  JSON.parse(sessionStorage.filters);
        params = GetGemstoneLotnumberFilter(filters, params);
        let girdView = salesShowGridView;
        let listView = salesShowListView;
        props.setSalesShowGridView(false);
        props.setSalesShowListView(false);
        this.setState({ showLoading: true });
        props.setItemsSalesOrder(null);
        props.setSetReferenceSalesOrder(null);
        props.setSalesSortingBy(e.target.value);
        props.setCurrentSalesPage(1);
        props.setFirstSearch(2);
        if (props.ViewAsSet) {
            props.getSalesSetReferences(params).then(async (value) => {
                this.setState({showLoading: false});
                if(girdView){
                    props.setSalesShowGridView(true);
                }else if (listView) {
                    props.setSalesShowListView(true);
                }
            });
        }else{
            props.getSalesItems(params).then(async (value) => {
                this.setState({showLoading: false});
                if(girdView){
                    props.setSalesShowGridView(true);
                }else if (listView) {
                    props.setSalesShowListView(true);
                }
            });
        }

        let { currPage } = props.fields;
        currPage.onChange(1);
        currPage.value = 1;
    }

    salesSortingDirection = e => {
        e.preventDefault();
        const { props } = this.props;
        const { salesShowGridView, salesShowListView } = props;
        const salesSortingDirection = e.target.value;
        const { searchResult } = props;
        const userLogin = JSON.parse(sessionStorage.logindata);
        let salesSortingBy = '';
        switch (this.refs.salesSortingBy.value) {
            case 'netAmount':
              salesSortingBy = 'netAmount.' + 'USD';
              break;
            case 'price':
                salesSortingBy = 'price.' + 'USD';
                break;
            default:
                salesSortingBy = this.refs.salesSortingBy.value;
                break;
        }
        this.setState({activePage: 1});
        const salesPageSize = this.refs.salesPageSize.value;
        let params = {
            'page' : 1, 'sortBy': salesSortingBy, 'sortDirections': salesSortingDirection, 'pageSize' : salesPageSize, 'ItemsSalesOrder': null,
            'SetReferenceSalesOrder': null
        };

        const filters =  JSON.parse(sessionStorage.filters);
        params = GetGemstoneLotnumberFilter(filters, params);
        let girdView = salesShowGridView;
        let listView = salesShowListView;
        props.setSalesShowGridView(false);
        props.setSalesShowListView(false);
        this.setState({ showLoading: true });
        props.setItemsSalesOrder(null);
        props.setSetReferenceSalesOrder(null);
        props.setSalesSortDirection(e.target.value);
        props.setCurrentSalesPage(1);
        props.setFirstSearch(2);
        if (props.ViewAsSet) {
            props.getSalesSetReferences(params).then(async (value) => {
                this.setState({showLoading: false});
                if(girdView){
                    props.setSalesShowGridView(true);
                }else if (listView) {
                    props.setSalesShowListView(true);
                }
            });
        }else{
            props.getSalesItems(params).then(async (value) => {
                this.setState({showLoading: false});
                if(girdView){
                    props.setSalesShowGridView(true);
                }else if (listView) {
                    props.setSalesShowListView(true);
                }
            });
        }
        let { currPage } = props.fields;
        currPage.onChange(1);
        currPage.value = 1;
    }

    selectedSalesPageSize = e => {
        e.preventDefault();
        const { props } = this.props;
        const { salesShowGridView, salesShowListView, ItemsSalesOrder, SetReferenceSalesOrder } = props;
        const salesPageSize = e.target.value;
        const getPage = parseInt((this.refs.reletego.value != ''? this.refs.reletego.value: this.state.activePage));
        const userLogin = JSON.parse(sessionStorage.logindata);
        let salesSortingBy = '';

        switch (this.refs.salesSortingBy.value) {
            case 'netAmount':
              salesSortingBy = 'netAmount.' + 'USD';
              break;
            case 'price':
                salesSortingBy = 'price.' + 'USD';
                break;
            default:
                salesSortingBy = this.refs.salesSortingBy.value;
                break;
        }

        const salesSortingDirection = this.refs.salesSortingDirection.value;

        this.setState({activePage: 1});
        let params = {
            'page' : 1, 'sortBy': salesSortingBy, 'sortDirections': salesSortingDirection, 'pageSize' : salesPageSize, 'ItemsSalesOrder': ItemsSalesOrder,
            'SetReferenceSalesOrder': SetReferenceSalesOrder
        };

        const filters =  JSON.parse(sessionStorage.filters);
        params = GetGemstoneLotnumberFilter(filters, params);
        let girdView = salesShowGridView;
        let listView = salesShowListView;
        props.setSalesShowGridView(false);
        props.setSalesShowListView(false);
        this.setState({ showLoading: true });
        props.setCurrentSalesPage(1);
        props.setFirstSearch(2);
        if (props.ViewAsSet) {
            props.getSalesSetReferences(params).then(async (value) => {
                this.setState({showLoading: false});
                if(girdView){
                    props.setSalesShowGridView(true);
                }else if (listView) {
                    props.setSalesShowListView(true);
                }
            });
        }else{
            props.getSalesItems(params).then(async (value) => {
                this.setState({showLoading: false});
                if(girdView){
                    props.setSalesShowGridView(true);
                }else if (listView) {
                    props.setSalesShowListView(true);
                }
            });
        }
    }

    handleSelect(eventKey) {
        const { props } = this.props;
        const { salesShowGridView, salesShowListView, ItemsSalesOrder, SetReferenceSalesOrder } = props;
        this.setState({activePage: eventKey});
        const userLogin = JSON.parse(sessionStorage.logindata);
        let salesSortingBy = '';
        switch (this.refs.salesSortingBy.value) {
            case 'netAmount':
              salesSortingBy = 'netAmount.' + 'USD';
              break;
            case 'price':
              salesSortingBy = 'price.' + 'USD';
              break;
            default:
              salesSortingBy = this.refs.salesSortingBy.value;
              break;
        }
        const salesSortingDirection = this.refs.salesSortingDirection.value;
        const salesPageSize = this.refs.salesPageSize.value;
        let params = {
            'page' : eventKey, 'sortBy': salesSortingBy, 'sortDirections': salesSortingDirection, 'pageSize' : salesPageSize,
            'ItemsSalesOrder': ItemsSalesOrder, 'SetReferenceSalesOrder': SetReferenceSalesOrder
        };
        const filters =  JSON.parse(sessionStorage.filters);
        params = GetGemstoneLotnumberFilter(filters, params);
        let girdView = salesShowGridView;
        let listView = salesShowListView;
        props.setSalesShowGridView(false);
        props.setSalesShowListView(false);
        this.setState({ showLoading: true });
        props.setCurrentSalesPage(eventKey);
        props.setFirstSearch(2);
        if (props.ViewAsSet) {
            props.getSalesSetReferences(params).then(async (value) => {
                this.setState({showLoading: false});
                if(girdView){
                    props.setSalesShowGridView(true);
                }else if (listView) {
                    props.setSalesShowListView(true);
                }
            });
        }else{
            props.getSalesItems(params).then(async (value) => {
                this.setState({showLoading: false});
                if(girdView){
                    props.setSalesShowGridView(true);
                }else if (listView) {
                    props.setSalesShowListView(true);
                }
            });
        }
        let { currPage } = props.fields;
        currPage.onChange(eventKey);
    }

    handleGo(e){
        e.preventDefault();
        const { props } = this.props;
        const { salesShowGridView, salesShowListView, ItemsSalesOrder, SetReferenceSalesOrder, totalPages } = props;
        const getPage = parseInt((this.refs.reletego.value != ''? this.refs.reletego.value: this.state.activePage));
        const userLogin = JSON.parse(sessionStorage.logindata);
        if (Number(this.refs.reletego.value) > totalPages || Number(this.refs.reletego.value) < 1) {
            this.setState({isOpenMsgPageInvalid: true});
        }else{
            let salesSortingBy = '';
            switch (this.refs.salesSortingBy.value) {
                case 'netAmount':
                  salesSortingBy = 'netAmount.' + 'USD';
                  break;
                case 'price':
                  salesSortingBy = 'price.' + 'USD';
                  break;
                default:
                  salesSortingBy = this.refs.salesSortingBy.value;
                  break;
            }
            const salesSortingDirection = this.refs.salesSortingDirection.value;
            const salesPageSize = this.refs.salesPageSize.value;
            this.setState({activePage: getPage});
            let params = {
                'page' : getPage, 'sortBy': salesSortingBy, 'sortDirections': salesSortingDirection, 'pageSize' : salesPageSize,
                'ItemsSalesOrder': ItemsSalesOrder, 'SetReferenceSalesOrder': SetReferenceSalesOrder
            };
            const filters =  JSON.parse(sessionStorage.filters);
            params = GetGemstoneLotnumberFilter(filters, params);
            let girdView = salesShowGridView;
            let listView = salesShowListView;
            props.setSalesShowGridView(false);
            props.setSalesShowListView(false);
            props.setCurrentSalesPage(getPage);
            props.setFirstSearch(2);
            this.setState({ showLoading: true });
            if (props.ViewAsSet) {
                props.getSalesSetReferences(params).then(async (value) => {
                    this.setState({showLoading: false});
                    if(girdView){
                        props.setSalesShowGridView(true);
                    }else if (listView) {
                        props.setSalesShowListView(true);
                    }
                });
            }else{
                props.getSalesItems(params).then(async (value) => {
                    this.setState({showLoading: false});
                    if(girdView){
                        props.setSalesShowGridView(true);
                    }else if (listView) {
                        props.setSalesShowListView(true);
                    }
                });
            }
        }
    }

    renderPagination(){
        const { props } = this.props;
        const { fields: { currPage }, totalPages, currentSalesPage, items, handleSubmit, resetForm, submitting
        } = props;
        const page = this.state.activePage;
        return(
            <div>
                <Pagination prev next first last ellipsis boundaryLinks
                    items={totalPages} maxButtons={4}
                    activePage={currentSalesPage}
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
        const { props } = this.props;
        const { fields: { currPage }, totalPages, currentSalesPage,ViewAsSet, items, totalPublicPrice, totalUpdatedCost, allItems, maxPrice, minPrice,
                avrgPrice, handleSubmit, resetForm, submitting, totalNetAmount, totalDiscount, totalMargin
        } = props;
        let _totalUpdatedCost =  (totalUpdatedCost!=null) ? numberFormat(totalUpdatedCost) : 0;
        let _totalPublicPrice =  (totalPublicPrice!=null) ? numberFormat(totalPublicPrice) : 0;
        let _totalNetAmount =  (totalNetAmount!=null) ? totalNetAmount : 0;
        let _totalDiscount =  (totalDiscount!=null) ? totalDiscount : 0;
        let _totalMargin =  (totalMargin!=null) ? totalMargin : 0;
        const userLogin = JSON.parse(sessionStorage.logindata);

        return(
            <RenderClassTotals userLogin={userLogin} allItems={allItems} ViewAsSet={ViewAsSet} _totalPublicPrice = {_totalPublicPrice} maxPrice = {maxPrice}
                _totalUpdatedCost = {_totalUpdatedCost} minPrice = {minPrice} avrgPrice = {avrgPrice} _totalNetAmount = {_totalNetAmount}
                _totalDiscount = {_totalDiscount} _totalMargin = {_totalMargin} totalPublicPrice={totalPublicPrice} />
        );
    }

    onClickGrid(pageNumber) {
        const { ViewAsSet, context } = this.props;
        const token = sessionStorage.token;
        if(token){
            if (ViewAsSet) {
                context.router.push(`/setsalesdetail/${pageNumber.replace('/','-')}`);
            }else{
                context.router.push(`/salesproductdetail/${pageNumber}`);
            }
        }
    }

    renderAlertmsgPdf = _=> {
        const message = 'Please check your email for printing files.';
        const title = 'SALES SEARCH RESULTS';
        return(
            <Modalalertmsg isOpen={this.state.isOpenPrintPdfmsg} isClose={this.handleClosePdfmsg} props={this.props} message={message}  title={title}/>
        );
    }

    handleClosePdfmsg = _=>{
        this.setState({isOpenPrintPdfmsg: false});
    }

    renderAlertmsgPageInvalid = _=> {
        const message = 'Page is invalid.';
        const title = 'SALES SEARCH RESULTS';
        return(
            <Modalalertmsg isOpen={this.state.isOpenMsgPageInvalid} isClose={this.handleCloseMsgPageInvalid} props={this.props} message={message} title={title}/>
        );
    }

    handleCloseMsgPageInvalid = _=>{
        this.setState({isOpenMsgPageInvalid: false});
    }

    renderExportExcelDialog(){
        let that = this;
        // console.log('this-->',this);
        const userLogin = JSON.parse(sessionStorage.logindata);
        return(
            <RenderSalesExportExcelDialog that={this} state={this.state} userLogin={userLogin} checkFields={checkFields} labels={labels}
                onClickHideModal={this.hideModal} onClickConfirmExport={this.confirmExport} onChangedShowImages={this.selectedShowImages}
                onChangedSelectedAllFieldsExportExcel={this.selectedAllFieldsExportExcel} selectedAllFields={this.selectedAllFields}
                selectedNoAllFields={this.selectedNoAllFields} />
        );
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

    hideModal = (e) => {
        e.preventDefault();
        this.setState({ showImages: false })
        this.setState({ isOpen: false });
    }

    confirmExport(e){
        e.preventDefault();
        const that = this;
        const host = HOSTNAME || 'localhost';
        const ROOT_URL = (host != 'mol.mouawad.com')? `//${host}:${(ENVIRONMENT!='staging')?3005:4005}`: `//${host}`;
        const { props, salesShowGridView, salesShowListView } = this.props;
        const { items, exportItems, paramsSalesSearch,ItemsSalesOrder, SetReferenceSalesOrder } = props;
        const userLogin = JSON.parse(sessionStorage.logindata);
        const priceSalesRTP = GetSalesPricePermission(userLogin.permission.priceSales).priceSalesRTP;
        const priceSalesUCP = GetSalesPricePermission(userLogin.permission.priceSales).priceSalesUCP;
        const priceSalesCTP = GetSalesPricePermission(userLogin.permission.priceSales).priceSalesCTP;
        const priceSalesNSP = GetSalesPricePermission(userLogin.permission.priceSales).priceSalesNSP;
        const priceSalesMGP = GetSalesPricePermission(userLogin.permission.priceSales).priceSalesMGP;
        const priceSalesDSP = GetSalesPricePermission(userLogin.permission.priceSales).priceSalesDSP;
        let salesSortingBy = '';
        switch (this.refs.salesSortingBy.value) {
            case 'netAmount':
              salesSortingBy = 'netAmount.' + 'USD';
              break;
            case 'price':
                salesSortingBy = 'price.' + 'USD';
                break;
            default:
                salesSortingBy = this.refs.salesSortingBy.value;
                break;
        }
        const salesSortingDirection = this.refs.salesSortingDirection.value;
        let fields = {
            allFields: this.state.allFields, showImages: this.state.showImages, ingredients: this.state.ingredients, categoryName: this.state.categoryName,
            category: this.state.category, article: this.state.article, collection: this.state.collection, setReferenceNumber: this.state.setReferenceNumber,
            quantity: this.state.quantity, dominantStone: this.state.dominantStone, markup: this.state.markup, certificatedNumber: this.state.certificatedNumber,
            brand: this.state.brand, postedDate: this.state.postedDate, salesId: this.state.salesId, salesPersonName: this.state.salesPersonName,
            salesChannel: this.state.salesChannel, customer: this.state.customer, customerName: this.state.customerName, unit: this.state.unit,
            caratWt: this.state.caratWt,flourance: this.state.flourance,batch: this.state.batch, netWeight: this.state.netWeight, stoneQty: this.state.stoneQty,
            invoicedId: this.state.invoicedId, invoiceDate: this.state.invoiceDate, inventSizeId: this.state.inventSizeId, cut: this.state.cut,
            color: this.state.color, clarity: this.state.clarity, qty: this.state.qty, origin: this.state.origin, symmetry: this.state.symmetry,
            certificateDate: this.state.certificateDate, vendorCode: this.state.vendorCode, vendorName: this.state.vendorName, metalColor: this.state.metalColor,
            metalType: this.state.metalType, complication: this.state.complication, strapType: this.state.strapType,strapColor: this.state.strapColor,
            buckleType: this.state.buckleType, dialIndex: this.state.dialIndex, dialColor: this.state.dialColor,movement: this.state.movement,
            serial: this.state.serial, limitedEdition: this.state.limitedEdition,limitedEditionNumber: this.state.limitedEditionNumber,
            itemCreatedDate: this.state.itemCreatedDate
        };
        let params = {
            'page' : (props.currentSalesPage!=undefined?props.currentSalesPage:1), 'sortBy': salesSortingBy, 'sortDirections': salesSortingDirection,
            'pageSize' : (props.salesPageSize!=undefined?props.salesPageSize:16), 'fields': fields, 'price': userLogin.permission.priceSales, 'ROOT_URL': ROOT_URL,
            'userName': userLogin.username, 'userEmail': userLogin.email, 'typeFile': 'Sales','ItemsSalesOrder': ItemsSalesOrder,
            'SetReferenceSalesOrder': SetReferenceSalesOrder
        };
        // default search params
        const filters =  JSON.parse(sessionStorage.filters);

        params = GetGemstoneLotnumberFilter(filters, params);

        this.setState({ showLoading: true, isOpen: false });

        let girdView = salesShowGridView;
        let listView = salesShowListView;

        props.setSalesShowGridView(false);
        props.setSalesShowListView(false);

        console.log('params-->',params);
        props.exportSalesDatas(params).then((value) => {
            if(girdView){
                props.setSalesShowGridView(true);
            }else if (listView) {
                props.setSalesShowListView(true);
            }
            that.setState({ showLoading: false, isOpenDownload: true });
        });
    }

    selectedAllFieldsExportExcel = event => {
        const that = this;
        this.setState({ allFields: event.target.checked });
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

    selectedShowImages = event =>{
        this.setState({ showImages: event.target.checked })
    }

    selectedAllFields = _ =>{
        this.setState({ allFields:true });
    }

    selectedNoAllFields = _ =>{
        this.setState({ allFields:false });
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

    hideModalViewAsSet = (e) => {
        e.preventDefault();
        this.setState({ showImagesViewAsSet: false })
        this.setState({isOpenViewAsSet: false});
    }

    confirmExportViewAsSet = e => {
        e.preventDefault();
        const that = this;
        const host = HOSTNAME || 'localhost';
        const ROOT_URL = (host != 'mol.mouawad.com')? `//${host}:${(ENVIRONMENT!='staging')?3005:4005}`: `//${host}`;
        const { props, salesShowGridView, salesShowListView } = this.props;
        const { items, exportItems, paramsSalesSearch,ItemsSalesOrder, SetReferenceSalesOrder } = props;
        const userLogin = JSON.parse(sessionStorage.logindata);
        const priceSalesRTP = GetSalesPricePermission(userLogin.permission.priceSales).priceSalesRTP;
        const priceSalesUCP = GetSalesPricePermission(userLogin.permission.priceSales).priceSalesUCP;
        const priceSalesCTP = GetSalesPricePermission(userLogin.permission.priceSales).priceSalesCTP;
        const priceSalesNSP = GetSalesPricePermission(userLogin.permission.priceSales).priceSalesNSP;
        const priceSalesMGP = GetSalesPricePermission(userLogin.permission.priceSales).priceSalesMGP;
        const priceSalesDSP = GetSalesPricePermission(userLogin.permission.priceSales).priceSalesDSP;

        let salesSortingBy = '';

        switch (this.refs.salesSortingBy.value) {
            case 'price':
                salesSortingBy = 'price.' + 'USD';
                break;
            default:
                salesSortingBy = this.refs.salesSortingBy.value;
                break;
        }

        const salesSortingDirection = this.refs.salesSortingDirection.value;

        let fields = {
            allFieldsViewAsSet: this.state.allFieldsViewAsSet, showImagesViewAsSet: this.state.showImagesViewAsSet,
            totalActualCost: priceSalesCTP? this.state.totalActualCost: false, totalUpdatedCost: priceSalesUCP? this.state.totalUpdatedCost: false,
            totalPrice: priceSalesRTP? this.state.totalPrice: false, markup: this.state.markup, companyName: this.state.companyName,
            warehouseName: this.state.warehouseName, postedDate: this.state.postedDate
        };

        let params = {
            'page' : (props.currentSalesPage!=undefined)?props.currentSalesPage:1, 'sortBy': salesSortingBy, 'sortDirections': salesSortingDirection,
            'pageSize' : (props.salesPageSize!=undefined)?props.salesPageSize:16, 'fields': fields, 'price': userLogin.permission.priceSales,
            'ROOT_URL': ROOT_URL, 'userName': userLogin.username, 'userEmail': userLogin.email, 'typeFile': 'Sales'
        };

        // default search params

        const filters =  JSON.parse(sessionStorage.filters);

        params = GetGemstoneLotnumberFilter(filters, params);

        this.setState({ showLoading: true, isOpenViewAsSet: false });

        let girdView = salesShowGridView;
        let listView = salesShowListView;

        props.setSalesShowGridView(false);
        props.setSalesShowListView(false);

        props.exportSalesDatas(params).then(async (value) => {
            if(girdView){
                props.setSalesShowGridView(true);
            }else if (listView) {
                props.setSalesShowListView(true);
            }
            that.setState({ showLoading: false, isOpenDownload: true });
        });
    }

    renderExportExcelViewAsSetDialog = _=>{
        const that = this;
        const userLogin = JSON.parse(sessionStorage.logindata);
        return(
            <RenderExportExcelViewAsSetDialog that={this} userLogin={userLogin} checkFieldsViewAsSet ={checkFieldsViewAsSet } labelsViewAsSet={labelsViewAsSet}
                selectedAllFieldsViewAsSet={this.selectedAllFieldsViewAsSet} selectedNoAllFieldsViewAsSet={this.selectedNoAllFieldsViewAsSet}/>
        );
    }

    selectedAllFieldsViewAsSet = _ =>{
        this.setState({ allFieldsViewAsSet:true });
    }

    selectedNoAllFieldsViewAsSet = _ =>{
        this.setState({ allFieldsViewAsSet:false });
    }

    hideModalDownload = (e) => {
        e.preventDefault();
        const { props } = this.props;
        const { salesShowGridView,salesShowListView } = this.props;

        this.setState({ isOpenDownload: false });

        let girdView = salesShowGridView;
        let listView = salesShowListView;

        props.setSalesShowGridView(false);
        props.setSalesShowListView(false);

        if(girdView){
            props.setSalesShowGridView(true);
        }else if (listView) {
            props.setSalesShowListView(true);
        }
    }

    renderDownloadDialog = _=>{
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

    render(){
        const {
            props, onClickNewSalesSearch, onClickModifySalesSearch, onChangedSalesSortingBy, onChangedSalesSortingDirection, onClickGridViewResults,
            onClickListViewResults, hideModalNoResults, onClickHideModalNoResults, submitting
        } = this.props;
        const { items, salesPageSize, exportItems, salesShowGridView, salesShowListView, ViewAsSet } = props;
        return(
            <form role="form">
                {/* Header Search */}
                <div className="col-sm-12 bg-hearder bg-header-searchresult">
                    <div className="col-md-4 col-sm-12 ft-white m-nopadding">
                        <h1>SALES SEARCH RESULTS</h1>
                    </div>
                    <div className="col-md-8 col-sm-12 nopadding">
                        <div className="m-width-100 text-right maring-t15 float-r ip-font m-pt">
                            <div className="col-sm-4 col-xs-12 nopadding">
                                <div className="col-sm-6 col-xs-6 ft-white nopad-ipl">
                                    <button className="btn btn-searchresult" disabled={submitting} onClick={onClickNewSalesSearch}>New Search</button>
                                </div>
                                <div className="col-sm-6 col-xs-6 ft-white nopad-ipl">
                                    <button className="btn btn-searchresult" disabled={submitting} onClick={onClickModifySalesSearch}>Modify Search</button>
                                </div>
                            </div>
                            <div className="col-sm-2 col-xs-12 ft-white margin-t5">
                                <ControlLabel> <span className="fc-ddbe6a m-none">|</span> Sort By: </ControlLabel>
                            </div>
                            <div className="col-sm-2 col-xs-12 nopadding">
                                <div className="styled-select">
                                    {
                                        ViewAsSet
                                        ?
                                        <select className="form-searchresult" onChange={this.salesSortingBy} ref="salesSortingBy">
                                            <option key={'postedDate'} value={'postedDate'}>{'Updated Date'}</option>
                                            <option key={'totalNetAmount'} value={'totalNetAmount'}>{'Net Sales'}</option>
                                            <option key={'description'} value={'description'}>{'Description'}</option>
                                            <option key={'reference'} value={'reference'}>{'Set Reference Number'}</option>
                                        </select>
                                        :
                                        <select className="form-searchresult" onChange={this.salesSortingBy} ref="salesSortingBy">
                                            <option key={'postedDate'} value={'postedDate'}>{'Updated Date'}</option>
                                            <option key={'netAmount'} value={'netAmount'}>{'Net Sales'}</option>
                                            <option key={'reference'} value={'reference'}>{'Item Reference'}</option>
                                            <option key={'description'} value={'description'}>{'Description'}</option>
                                            <option key={'setReference'} value={'setReference'}>{'Set Reference Number'}</option>
                                            <option key={'invoicedId'} value={'invoicedId'}>{'Invoiced No.'}</option>
                                            <option key={'invoiceDate'} value={'invoiceDate'}>{'Invoice Date'}</option>
                                            <option key={'customer'} value={'customer'}>{'Customer ID'}</option>
                                            <option key={'customerName'} value={'customerName'}>{'Customer Name'}</option>
                                            <option key={'salesChannel'} value={'salesChannel'}>{'Channel'}</option>
                                            <option key={'site'} value={'site'}>{'Boutique Code'}</option>
                                        </select>
                                    }

                                </div>
                            </div>
                            <div className="col-sm-2 col-xs-12 nopadding padding-l10 m-pt-select">
                                <div className="styled-select">
                                    <select className="form-searchresult" onChange={this.salesSortingDirection}
                                        ref="salesSortingDirection">
                                        <option key={'desc'} value={'desc'}>{'Descending'}</option>
                                        <option key={'asc'} value={'asc'}>{'Ascending'}</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-sm-2 ft-white nopadding pd-10">
                                <div disabled={submitting} onClick={ onClickGridViewResults } >
                                    <div className={`icon-grid m-pt-mgl ${salesShowGridView ? 'icon-grid-active' : ''}` }></div>
                                </div>
                                <div disabled={submitting} onClick={ onClickListViewResults } >
                                    <div className={`icon-list m-pt-mgl ${salesShowListView ? 'icon-list-active' : ''}` }></div>
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
                                                    onChange={ this.selectedSalesPageSize } ref="salesPageSize">
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
                                <div className={`search-product  ${salesShowGridView ? '' : 'hidden'}` }>
                                    <GridSalesItemsView  items={items} onClickGrid={this.onClickGrid} ViewAsSet={ViewAsSet} stateItem={this.state} />
                                </div>
                                <div id="dvGridview" className="search-product hidden">
                                    <GridSalesItemsViewPrint  items={items} ViewAsSet={ViewAsSet} stateItem={this.state}/>
                                </div>
                                <div className={`col-sm-12 search-product list-search ${salesShowListView ? '' : 'hidden'}` }>
                                    <ListSalesItemsView key={'listView'} id={'listView'} items={items} salesPageSize={salesPageSize} onClickGrid={this.onClickGrid}
                                        onCheckedOneItemMyCatalog={this.checkedOneItemMyCatalog} ViewAsSet={ViewAsSet} stateItem={this.state} />
                                </div>
                                <div id="dvListview" className="col-sm-12 search-product hidden">
                                    <ListSalesItemsViewPrint items={items} salesPageSize={salesPageSize} ViewAsSet={ViewAsSet}  stateItem={this.state} />
                                </div>
                                <div id="dvListviewAll" className="col-sm-12 search-product hidden">
                                    <ListSalesItemsViewPrint items={items} salesPageSize={exportItems.length} ViewAsSet={ViewAsSet} stateItem={this.state} />
                                </div>
                                <div className={`${this.state.showLoading ? '' : 'hidden'}` }>
                                    <center>
                                        <br/><br/><br/><br/><br/><br/>
                                        <Loading type="spin" color="#202020" width="10%"/>
                                    </center>
                                    <br/><br/><br/><br/><br/><br/>
                                </div>
                                {/* End Grid Product */}
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
                {this.renderDialogPrintOptions()}
                {this.renderAlertmsgPdf()}
                {this.renderAlertmsgPageInvalid()}
                {this.renderExportExcelDialog()}
                {this.renderExportExcelViewAsSetDialog()}
                {this.renderDownloadDialog()}
            </form>
        )
    }
}
module.exports = SalesSearchResultItems;
