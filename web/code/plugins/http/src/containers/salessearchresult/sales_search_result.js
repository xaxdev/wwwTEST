import React, { Component, PropTypes }from 'react';
import { reduxForm, reset } from 'redux-form';
import * as itemactions from '../../actions/itemactions';
import GetGemstoneLotnumberFilter from './utils/get_gemlot_filter';
import SalesSearchResultLoader from './sales_search_results_loader';
import SalesSearchResultOnItem from './sales_search_results_noitem';

const _ = require('lodash');
const Loading = require('react-loading');
const sortBy = require('lodash.sortby');

const fields = [ 'currPage','oldCatalogName','newCatalogName','validateCatalogName','printPage','oldSetCatalogName','newSetCatalogName' ];

class SalesSearchResult extends Component {
    constructor(props) {
        super(props);

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
        // const paramsSearchStorage =  JSON.parse(sessionStorage.paramsSearch);
        // this.props.setParams(paramsSearchStorage)
        this.props.getSalesItems(params).then(async (value) => {
            // await this.props.getCatalogNameSetItem();
            // await this.props.getSetCatalogName();
        });
    }

    render(){
        const { totalPages, showGridView, showListView, ViewAsSet, currentPage, allItems, pageSize, exportItems, totalPublicPrice, totalUpdatedCost,
                handleSubmit, resetForm, submitting, ItemsSalesOrder, sortingBy, sortDirection } = this.props;
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
                    <SearchResultOnItem props={this.props} onClickNewSearch={this.newSearch} onClickModifySearch={this.modifySearch}
                        onChangedSortingBy={this.sortingBy} onChangedSortingDirection={this.sortingDirection} onClickGridViewResults={this.gridViewResults}
                        onClickListViewResults={this.listViewResults} hideModalNoResults={this.hideModalNoResults}
                        onClickHideModalNoResults={this.hideModalNoResults}/>
                );
            }else{
                return(
                    <div>
                        SalesSearchResult
                    </div>
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
        allItems: state.searchResult.allItems
    }
}
SalesSearchResult.contextTypes = {
    router: PropTypes.object
};
module.exports = reduxForm({
    form: 'SalesSearchResult',
    fields: fields
},mapStateToProps,itemactions)(SalesSearchResult)
