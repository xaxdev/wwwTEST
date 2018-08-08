import React, { Component, PropTypes } from 'react';
import { Button,FormControl,Pagination, ControlLabel, DropdownButton, MenuItem } from 'react-bootstrap';
import { Modal, ModalClose } from 'react-modal-bootstrap';

class SalesSearchResultOnItem extends Component {
    constructor(props) {
        super(props);

        this.salesSortingBy = this.salesSortingBy.bind(this);
        this.salesSortingDirection = this.salesSortingDirection.bind(this);
        this.hideModalNoResults = this.hideModalNoResults.bind(this);

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
            'page' : 1, 'sortBy': salesSortingBy, 'sortDirections': salesSortingDirection, 'pageSize' : salesPageSize,
            'ItemsSalesOrder': null, 'SetReferenceSalesOrder': null
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
            // await props.getCatalogNameSetItem();
            // await props.getSetCatalogName();
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
            'page' : 1, 'sortBy': salesSortingBy, 'sortDirections': salesSortingDirection, 'pageSize' : salesPageSize,
            'ItemsSalesOrder': null, 'SetReferenceSalesOrder': null
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
            // await props.getCatalogNameSetItem();
            // await props.getSetCatalogName();
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
    gridViewResults(){
        const { props } = this.props;
        props.setShowGridView(true);
        props.setShowListView(false);
    }
    hideModalNoResults = (e) => {
        e.preventDefault();
        const {
            props, context
        } = this.props;
        this.setState({isOpenNoResults: false});
        this.setState({showLoading: true});

        props.modifySearch(props.paramsSalesSearch);

        const token = sessionStorage.token;

        let modalOpen = jQuery('.modal-open');
        modalOpen.removeClass();
        if(token){
            context.router.push('/salesreport');
        }
    }
    render(){
        const {
            props, state, onClickNewSalesSearch, onClickModifySalesSearch, onClickGridViewResults, onClickListViewResults, submitting
        } = this.props;
        return(
            <form role="form">
                {/* Header Search */}
                <div className="col-sm-12 bg-hearder bg-header-searchresult">
                    <div className="col-md-4 col-sm-12 ft-white m-nopadding">
                        <h1>SALES SEARCH RESULTS</h1>
                    </div>
                    <div className="col-md-8 col-sm-12 nopadding">
                        <div className="m-width-100 text-right maring-t15 float-r ip-font ipp-margin m-pt">
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
                                    <select className="form-searchresult" onChange={this.salesSortingBy} ref="salesSortingBy" >
                                        <option key={'postedDate'} value={'postedDate'}>{'Updated Date'}</option>
                                        <option key={'netAmount'} value={'netAmount'}>{'Net Sales'}</option>
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
                                <div disabled={submitting} onClick={ onClickGridViewResults }>
                                    <div className="bd-white m-pt-mgl"></div>
                                </div>
                                <div disabled={submitting} onClick={ onClickListViewResults } >
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
        )
    }
}
module.exports = SalesSearchResultOnItem;
