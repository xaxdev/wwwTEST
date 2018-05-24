import React, { Component, PropTypes } from 'react';
import { Button,FormControl,Pagination, ControlLabel, DropdownButton, MenuItem } from 'react-bootstrap';
import { Modal, ModalClose } from 'react-modal-bootstrap';
import RenderClassTotals from './utils/render_total';
import GetGemstoneLotnumberFilter from './utils/get_gemlot_filter';
import numberFormat from '../../utils/convertNumberformat';
import GridItemsView from '../../components/searchresults/griditemview';
import GridItemsViewPrint from '../../components/searchresults/griditemviewPrint';
import ListItemsView from '../../components/searchresults/listitemview';
import ListItemsViewPrint from '../../components/searchresults/listitemviewPrint';

const Loading = require('react-loading');

class SalesSearchResultOnItem extends Component {
    constructor(props) {
        super(props);

        this.salesSortingBy = this.salesSortingBy.bind(this);
        this.salesSortingDirection = this.salesSortingDirection.bind(this);
        this.selectedSalesPageSize = this.selectedSalesPageSize.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleGo = this.handleGo.bind(this);

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
    salesSortingBy = e => {
        e.preventDefault();
        const { props, state } = this.props;
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
        const { props, state, salesShowGridView, salesShowListView } = this.props;
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
        const { props, state, salesShowGridView, salesShowListView, ItemsSalesOrder, SetReferenceSalesOrder } = this.props;
        const pageSize = e.target.value;
        const getPage = parseInt((this.refs.reletego.value != ''? this.refs.reletego.value: state.activePage));
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
            'page' : 1, 'sortBy': salesSortingBy, 'sortDirections': salesSortingDirection, 'pageSize' : pageSize, 'ItemsSalesOrder': ItemsSalesOrder,
            'SetReferenceSalesOrder': SetReferenceSalesOrder
        };

        const filters =  JSON.parse(sessionStorage.filters);
        params = GetGemstoneLotnumberFilter(filters, params);
        let girdView = salesShowGridView;
        let listView = salesShowListView;
        props.setSalesShowGridView(false);
        props.setSalesShowListView(false);
        this.setState({ showLoading: true });
        props.setSalesPageSize(pageSize);
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
        const { props, state, salesShowGridView, salesShowListView, ItemsSalesOrder, SetReferenceSalesOrder } = this.props;
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
        const { props, state, salesShowGridView, salesShowListView, ItemsSalesOrder, SetReferenceSalesOrder, totalPages } = this.props;
        const getPage = parseInt((this.refs.reletego.value != ''? this.refs.reletego.value: state.activePage));
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
        const { props, state } = this.props;
        const { fields: { currPage }, totalPages, currentSalesPage, items, handleSubmit, resetForm, submitting
        } = props;
        const page = state.activePage;
        return(
            <div>
                <Pagination prev next first last ellipsis boundaryLinks
                    items={totalPages} maxButtons={4}
                    activePage={state.activePage}
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
        const { props, state } = this.props;
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
    render(){
        const {
            props, state, onClickNewSalesSearch, onClickModifySalesSearch, onChangedSalesSortingBy, onChangedSalesSortingDirection, onClickGridViewResults,
            onClickListViewResults, hideModalNoResults, onClickHideModalNoResults, submitting, salesShowGridView, salesShowListView, ViewAsSet
        } = this.props;
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
            </form>
        )
    }
}
module.exports = SalesSearchResultOnItem;
