import React, { Component, PropTypes } from 'react';
import { Button,FormControl,Pagination, ControlLabel, DropdownButton, MenuItem } from 'react-bootstrap';
import { Modal, ModalClose } from 'react-modal-bootstrap';
import moment from 'moment-timezone';
import RenderClassTotals from './utils/render_total';
import GetGemstoneLotnumberFilter from './utils/get_gemlot_filter';
import ModalPrintOptions from './utils/modalPrintOptions';
import numberFormat from '../../utils/convertNumberformat';
import GenSalesTemplateHtml from '../../utils/genTemplatePdfSalesSearchResult';
import GridSalesItemsView from '../../components/salessearchresults/gridsalesitemview';
import ListSalesItemsView from '../../components/salessearchresults/listsalesitemview';
import GridSalesItemsViewPrint from '../../components/salessearchresults/gridsalesitemviewprint';

const Loading = require('react-loading');

class SalesSearchResultOnItem extends Component {
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

        this.state = {
            activePage: this.props.currentSalesPage, isExport: false, isOpen: false, isOpenDownload: false, allFields: false, isOpenNoResults: true,
            showImages: false,ingredients: false, categoryName: false, category: false,article: false, collection: false, setReferenceNumber: false, cut: false,
            color: false,clarity: false,caratWt: false, unit: false, qty: false, origin: false, symmetry: false, flourance: false, batch: false, netWeight: false,
            stoneQty: false, dominantStone: false, markup: false, certificatedNumber: false, certificateDate: false, vendorCode: false, vendorName: false,
            metalColor: false, metalType: false, brand: false, complication: false, strapType: false, strapColor: false, buckleType: false, dialIndex: false,
            dialColor: false, movement: false, serial: false, limitedEdition: false, limitedEditionNumber: false, itemCreatedDate:false,showLoading: false,
            isOpenAddMyCatalog: false, enabledMyCatalog:false, isOpenAddMyCatalogmsg: false, isOpenPrintPdfmsg: false, isOpenMsgPageInvalid: false, markup: false,
            checkAllItems: false, allFieldsViewAsSet: false, showImagesViewAsSet: false, isOpenViewAsSet: false, totalActualCost: false, totalUpdatedCost: false,
            totalPrice: false, companyName: false, warehouseName: false, createdDate: false, isOpenPrintOptions: false
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
                if(o.value == that.props.salesSortingBy){
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
                if(o.value == that.props.sortDirection){
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
                if(o.value == that.props.salesPageSize){
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
            'dvTotal1': dvTotal1, 'dvTotal2': dvTotal2, 'dvGridview': dvGridview, 'dvListview': dvListview, 'printPage':printPage, 'items': exportItems,
            'userLogin': userLogin, 'ViewAsSet': ViewAsSet, 'dvListviewAll': dvListviewAll, 'env': env_web
        };
        let htmlTemplate = '';
        if (printPage.value != 'all') {
            htmlTemplate = GenSalesTemplateHtml(salesShowGridView, salesShowListView, ROOT_URL, imagesReplace, dv);
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
                case 'price':
                  salesSortingBy = 'price.' + userLogin.currency;
                  break;
                default:
                  salesSortingBy = this.refs.salesSortingBy.value;
                  break;
            }
            const salesSortingDirection = this.refs.salesSortingDirection.value;
            const salesPageSize = this.refs.salesPageSize.value;
            const userPermissionPrice = userLogin.permission.price;
            let viewType = '';
            if (salesShowGridView) {
                viewType = 'grid';
            } else {
                viewType = 'list';
            }
            let params = {
                'page' : 1, 'sortBy': salesSortingBy, 'sortDirections': salesSortingDirection, 'pageSize' : salesPageSize,
                'ItemsOrder': ItemsOrder, 'SetReferencdOrder': SetReferencdOrder,'userName': `${userLogin.username}_${exportDate}`,
                'userEmail': userLogin.email,'ROOT_URL': ROOT_URL, 'env': env_web, 'viewType': viewType,
                'userPermissionPrice': userPermissionPrice
            };
            const filters =  JSON.parse(sessionStorage.filters);
            params = GetGemstoneLotnumberFilter(filters, params);

            await props.getAllPDF(params).then((value) => {
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
            case 'price':
                salesSortingBy = 'price.' + userLogin.currency;
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
        props.getSalesItems(params).then(async (value) => {
            this.setState({showLoading: false});
            if(girdView){
                props.setSalesShowGridView(true);
            }else if (listView) {
                props.setSalesShowListView(true);
            }
        });
        let { currPage } = props.fields;
        currPage.onChange(1);
        currPage.value = 1;
    }
    salesSortingDirection = e => {
        e.preventDefault();
        const { props, salesShowGridView, salesShowListView } = this.props;
        const salesSortingDirection = e.target.value;
        const { searchResult } = props;
        const userLogin = JSON.parse(sessionStorage.logindata);
        let salesSortingBy = '';
        switch (this.refs.salesSortingBy.value) {
            case 'price':
                salesSortingBy = 'price.' + userLogin.currency;
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
        props.setSortDirection(e.target.value);
        props.getSalesItems(params).then(async (value) => {
            this.setState({showLoading: false});
            if(girdView){
                props.setSalesShowGridView(true);
            }else if (listView) {
                props.setSalesShowListView(true);
            }
        });
        let { currPage } = props.fields;
        currPage.onChange(1);
        currPage.value = 1;
    }
    selectedSalesPageSize = e => {
        e.preventDefault();
        const { props, salesShowGridView, salesShowListView, ItemsSalesOrder, SetReferenceSalesOrder } = this.props;
        const salesPageSize = e.target.value;
        const getPage = parseInt((this.refs.reletego.value != ''? this.refs.reletego.value: this.state.activePage));
        const userLogin = JSON.parse(sessionStorage.logindata);
        let salesSortingBy = '';

        switch (this.refs.salesSortingBy.value) {
            case 'price':
                salesSortingBy = 'price.' + userLogin.currency;
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
        props.setSalesPageSize(salesPageSize);
        props.getSalesItems(params).then(async (value) => {
            this.setState({showLoading: false});
            if(girdView){
                props.setSalesShowGridView(true);
            }else if (listView) {
                props.setSalesShowListView(true);
            }
        });
    }
    handleSelect(eventKey) {
        const { props, salesShowGridView, salesShowListView, ItemsSalesOrder, SetReferenceSalesOrder } = this.props;
        this.setState({activePage: eventKey});
        const userLogin = JSON.parse(sessionStorage.logindata);
        let salesSortingBy = '';
        switch (this.refs.salesSortingBy.value) {
            case 'price':
              salesSortingBy = 'price.' + userLogin.currency;
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
        props.getSalesItems(params).then(async (value) => {
            this.setState({showLoading: false});
            if(girdView){
                props.setSalesShowGridView(true);
            }else if (listView) {
                props.setSalesShowListView(true);
            }
        });
        let { currPage } = props.fields;
        currPage.onChange(eventKey);
    }

    handleGo(e){
        e.preventDefault();
        const { props, salesShowGridView, salesShowListView, ItemsSalesOrder, SetReferenceSalesOrder, totalPages } = this.props;
        const getPage = parseInt((this.refs.reletego.value != ''? this.refs.reletego.value: this.state.activePage));
        const userLogin = JSON.parse(sessionStorage.logindata);
        if (Number(this.refs.reletego.value) > totalPages || Number(this.refs.reletego.value) < 1) {
            this.setState({isOpenMsgPageInvalid: true});
        }else{
            let salesSortingBy = '';
            switch (this.refs.salesSortingBy.value) {
                case 'price':
                  salesSortingBy = 'price.' + userLogin.currency;
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
            this.setState({ showLoading: true });
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
    renderPagination(){
        const { props } = this.props;
        const { fields: { currPage }, totalPages, currentSalesPage, items, handleSubmit, resetForm, submitting
        } = props;
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
        const { props } = this.props;
        const { fields: { currPage }, totalPages, currentSalesPage,ViewAsSet, items, totalPublicPrice, totalUpdatedCost,
                allItems, maxPrice, minPrice, avrgPrice, handleSubmit, resetForm, submitting
        } = props;
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

    render(){
        const {
            props, onClickNewSalesSearch, onClickModifySalesSearch, onChangedSalesSortingBy, onChangedSalesSortingDirection, onClickGridViewResults,
            onClickListViewResults, hideModalNoResults, onClickHideModalNoResults, submitting, salesShowGridView, salesShowListView, ViewAsSet
        } = this.props;
        const { items, salesPageSize } = props;
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
                                    <select className="form-searchresult" onChange={this.salesSortingBy}
                                        ref="salesSortingBy">
                                        <option key={'postedDate'} value={'postedDate'}>{'Updated Date'}</option>
                                        <option key={'price'} value={'price'}>{'Retail Price'}</option>
                                        <option key={'reference'} value={'reference'}>{'Item Reference'}</option>
                                        <option key={'description'} value={'description'}>{'Description'}</option>
                                        <option key={'setReference'} value={'setReference'}>{'Set Reference Number'}</option>
                                    </select>
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
                                {/*<div id="dvListview" className="col-sm-12 search-product hidden">
                                    <ListItemsViewPrint items={items} pageSize={pageSize} onClickGrid={this.onClickGrid}
                                        ViewAsSet={ViewAsSet} stateItem={this.state} chkAllItems={chkAllItems}
                                        listMyCatalog={listMyCatalog}/>
                                </div>
                                <div id="dvListviewAll" className="col-sm-12 search-product hidden">
                                    <ListItemsViewPrint items={items} pageSize={exportItems.length}
                                          onClickGrid={this.onClickGrid} ViewAsSet={ViewAsSet} stateItem={this.state}
                                          chkAllItems={chkAllItems} listMyCatalog={listMyCatalog}/>
                                </div>*/}
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
            </form>
        )
    }
}
module.exports = SalesSearchResultOnItem;
