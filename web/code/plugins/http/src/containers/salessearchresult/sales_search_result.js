import React, { Component, PropTypes }from 'react';
import { reduxForm, reset } from 'redux-form';
import * as itemactions from '../../actions/itemactions';
import GetGemstoneLotnumberFilter from './utils/get_gemlot_filter';
import SalesSearchResultLoader from './sales_search_results_loader';
import SalesSearchResultOnItem from './sales_search_results_noitem';
import SalesSearchResultItems from './sales_search_results_items';

const _ = require('lodash');
const Loading = require('react-loading');
const sortBy = require('lodash.sortby');

const fields = [ 'currPage','oldCatalogName','newCatalogName','validateCatalogName','printPage','oldSetCatalogName','newSetCatalogName' ];

class SalesSearchResult extends Component {
    constructor(props) {
        super(props);

        this.newSalesSearch = this.newSalesSearch.bind(this);
        this.modifySalesSearch = this.modifySalesSearch.bind(this);
        this.selectedSalesPageSize = this.selectedSalesPageSize.bind(this);

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

    componentWillMount() {
        const { ItemsSalesOrder, SetReferenceSalesOrder } = this.props;
        const userLogin = JSON.parse(sessionStorage.logindata);
        let salesSortingBy = '';
        switch (this.props.salesSortingBy) {
            case 'price':
              salesSortingBy = 'price.' + userLogin.currency;
              break;
            default:
              salesSortingBy = this.props.salesSortingBy;
              break;
        }
        let params = {
            'page' : this.props.currentSalesPage, 'sortBy': salesSortingBy, 'sortDirections': this.props.salesSortDirection, 'pageSize' : this.props.salesPageSize,
            'ItemsSalesOrder': ItemsSalesOrder,'SetReferenceSalesOrder': SetReferenceSalesOrder
        };  // default search params

        const filters =  JSON.parse(sessionStorage.filters);
        params = GetGemstoneLotnumberFilter(filters, params);
        console.log('params-->',params);
        const paramsSalesSearchStorage =  JSON.parse(sessionStorage.paramsSalesSearch);
        this.props.setSalesParams(paramsSalesSearchStorage)
        this.props.getSalesItems(params);
    }

    newSalesSearch = e => {
        e.preventDefault();
        (async() => {
            const token = sessionStorage.token;
            await this.props.setSalesSortingBy('postedDate');
            await this.props.setSalesSortDirection('desc');
            await this.props.setSalesPageSize(16);
            await this.props.setSalesShowGridView(true);
            await this.props.setSalesShowListView(false);
            let paramsSalesSearch = this.props.paramsSalesSearch;
            let keys = Object.keys(paramsSalesSearch);
            keys.forEach((key) => {
                paramsSalesSearch[key] = '';
            })
            await this.props.newSalesSearch();
            await this.props.setSalesParams(paramsSalesSearch);
            await sessionStorage.setItem('paramsSalesSearch', JSON.stringify(paramsSalesSearch));
            if(token){
                this.context.router.push('/salesreport');
            }
        })()
    }

    modifySalesSearch = e => {
        e.preventDefault();
        (async() => {
            const token = sessionStorage.token;
            this.props.setSalesSortingBy('postedDate');
            this.props.setSalesSortDirection('desc');
            this.props.setSalesPageSize(16);
            this.props.setSalesShowGridView(true);
            this.props.setSalesShowListView(false);
            this.setState({showLoading: false});
            await this.props.modifySalesSearch(this.props.paramsSalesSearch);
            if(token){
                this.context.router.push('/salesreport');
            }
        })()
    }

    selectedSalesPageSize = e => {
        e.preventDefault();
        const salesPageSize = e.target.value;
        const getPage = parseInt((this.refs.reletego.value != ''? this.refs.reletego.value: this.state.activePage));
        const userLogin = JSON.parse(sessionStorage.logindata);
        const { salesShowGridView,salesShowListView,ItemsOrder,SetReferencdOrder } = this.props;
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
            'page' : 1, 'sortBy': salesSortingBy, 'sortDirections': salesSortingDirection, 'pageSize' : salesPageSize,
            'ItemsOrder': ItemsOrder, 'SetReferencdOrder': SetReferencdOrder
        };

        const filters =  JSON.parse(sessionStorage.filters);
        params = GetGemstoneLotnumberFilter(filters, params);
        let girdView = salesShowGridView;
        let listView = salesShowListView;
        this.props.setSalesShowGridView(false);
        this.props.setSalesShowListView(false);
        this.setState({ showLoading: true });
        this.props.setSalesPageSize(salesPageSize);
        this.props.getSalesItems(params).then(async (value) => {
            this.setState({showLoading: false});
            if(girdView){
                this.props.setSalesShowGridView(true);
            }else if (listView) {
                this.props.setSalesShowListView(true);
            }
        });
    }

    render(){
        const { totalPages, salesShowGridView, salesShowListView, ViewAsSet, currentPage, allItems, salesPageSize, exportItems, totalPublicPrice,
            totalUpdatedCost, handleSubmit, resetForm, submitting, ItemsSalesOrder, SetReferenceSalesOrder, salesSortingBy, sortDirection } = this.props;
        const userLogin = JSON.parse(sessionStorage.logindata);
        const { items } = this.props;
        const numbers = document.querySelectorAll('input[type="number"]');

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
                <SalesSearchResultLoader/>
            );
        }else{
            if(allItems.length == 0){
                return(
                    <SalesSearchResultOnItem props={this.props} onClickNewSalesSearch={this.newSalesSearch} onClickModifySalesSearch={this.modifySalesSearch}
                        state={this.state} onClickGridViewResults={this.gridViewResults} onClickListViewResults={this.listViewResults}
                        hideModalNoResults={this.hideModalNoResults}
                        onClickHideModalNoResults={this.hideModalNoResults} submitting={submitting}/>
                );
            }else{
                return(
                    <SalesSearchResultItems props={this.props} onClickNewSalesSearch={this.newSalesSearch} onClickModifySalesSearch={this.modifySalesSearch}
                        state={this.state} onClickGridViewResults={this.gridViewResults} onClickListViewResults={this.listViewResults}
                        onClickHideModalNoResults={this.hideModalNoResults} hideModalNoResults={this.hideModalNoResults} submitting={submitting}
                        ItemsSalesOrder={ItemsSalesOrder} SetReferenceSalesOrder={SetReferenceSalesOrder} salesShowGridView={salesShowGridView}
                        salesShowListView={salesShowListView} ViewAsSet={ViewAsSet}/>
                )
            }
        }
    }
}

function mapStateToProps(state) {
    return {
        salesSortingBy: state.searchResult.SalesSortingBy,
        currentSalesPage: state.searchResult.currentSalesPage,
        salesSortDirection: state.searchResult.SalesSortDirection,
        salesPageSize: state.searchResult.SalesPageSize,
        ItemsSalesOrder: state.searchResult.itemsSalesOrder,
        SetReferenceSalesOrder: state.searchResult.setReferenceSalesOrder,
        items: state.searchResult.datas,
        allItems: state.searchResult.allItems,
        salesShowGridView: state.searchResult.SalesShowGridView,
        salesShowListView: state.searchResult.SalesShowListView,
        SetReferenceSalesOrder: state.searchResult.setReferenceSalesOrder,
        paramsSalesSearch: state.searchResult.paramsSalesSearch,
        totalPages: state.searchResult.totalpage,
        totalPublicPrice: state.searchResult.totalpublicprice,
        totalUpdatedCost: state.searchResult.totalupdatedcost,
        maxPrice: state.searchResult.maxPrice,
        minPrice: state.searchResult.minPrice,
        avrgPrice: state.searchResult.avrgPrice
    }
}
SalesSearchResult.contextTypes = {
    router: PropTypes.object
};
module.exports = reduxForm({
    form: 'SalesSearchResult',
    fields: fields
},mapStateToProps,itemactions)(SalesSearchResult)
