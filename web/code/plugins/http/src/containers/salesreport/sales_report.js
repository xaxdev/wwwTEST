import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import SalesReportMain  from '../../components/salesreport/salesreport_main';
import * as itemactions from '../../actions/itemactions';
import GetFilterSearch from './utils/get_filter_search';
import GetFilterSave from './utils/get_filter_save';

class SalesReport extends Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = (data) => {
        console.log('data-->', data);
        const that = this;
        let { filters, submitAction, idEditSalesSaveSearch } = this.props;

        const isNotOwnerSharedSearch = this.props.searchResult.criteriaSalesSaveSearch != null
                                      ? this.props.searchResult.criteriaSalesSaveSearch.shared
                                      : false;

        const userLogin = JSON.parse(sessionStorage.logindata);

        let saveSalesSearchName = data.searchName;
        let jlySalesHierarchy = false;
        let watSalesHierarchy = false;
        let stoSalesHierarchy = false;
        let accSalesHierarchy = false;
        let obaSalesHierarchy = false;
        let sppSalesHierarchy = false;
        // check modify search or new search
        // if have filters is mean modify search

        delete data.searchName;

        this.props.setCurrentPage(1);

        switch (submitAction) {
            case 'save':
                filters = GetFilterSave(this, data, userLogin, filters, jlySalesHierarchy, watSalesHierarchy, stoSalesHierarchy,
                    accSalesHierarchy, obaSalesHierarchy, sppSalesHierarchy
                );
                if(jlySalesHierarchy){
                    filters.push({'jewelrySalesProductHierarchy':data.jewelrySalesProductHierarchy})
                }
                if(watSalesHierarchy){
                    filters.push({'watchSalesProductHierarchy':data.watchSalesProductHierarchy})
                }
                if(stoSalesHierarchy){
                    filters.push({'stoneSalesProductHierarchy':data.stoneSalesProductHierarchy})
                }
                if(accSalesHierarchy){
                    filters.push({'accessorySalesProductHierarchy':data.accessorySalesProductHierarchy})
                }
                if(obaSalesHierarchy){
                    filters.push({'obaSalesProductHierarchy':data.obaSalesProductHierarchy})
                }
                if(sppSalesHierarchy){
                    filters.push({'sparePartSalesProductHierarchy':data.sparePartSalesProductHierarchy})
                }
                let paramsSalesSaveSearch = {};
                if (idEditSalesSaveSearch != null) {
                    if (isNotOwnerSharedSearch) {
                        paramsSalesSaveSearch = {...paramsSalesSaveSearch,
                            name:saveSalesSearchName,
                            criteria:JSON.stringify(filters)};
                    } else {
                        paramsSalesSaveSearch = {...paramsSalesSaveSearch,
                            id: idEditSalesSaveSearch,
                            name:saveSalesSearchName,
                            criteria:JSON.stringify(filters)};
                    }
                } else {
                    paramsSalesSaveSearch = {...paramsSalesSaveSearch,
                        name:saveSalesSearchName,
                        criteria:JSON.stringify(filters)};
                }
                // paramsSalesSaveSearch = {...paramsSalesSaveSearch, name:saveSalesSearchName, criteria:JSON.stringify(filters)}
                // console.log('paramsSalesSaveSearch-->',paramsSalesSaveSearch);
                this.props.saveSearchSalesCriteria(paramsSalesSaveSearch);
                break;
            case 'search':
                filters = GetFilterSearch(this, data, userLogin, filters, jlySalesHierarchy, watSalesHierarchy, stoSalesHierarchy,
                    accSalesHierarchy, obaSalesHierarchy, sppSalesHierarchy
                );
                sessionStorage.setItem('filters', JSON.stringify(filters));
                this.context.router.push('/searchresult');
                break;
            default:
        }
    }

    render(){
        return (
            <div>
                <SalesReportMain onSubmit={this.handleSubmit}/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        searchResult:state.searchResult,
        activeTabCategory: state.searchResult.activeTabCategory,
        salesIsAdvance: state.searchResult.SalesIsAdvance,
        filters: state.searchResult.filters,
        paramsSalesSearch: state.searchResult.paramsSalesSearch,
        submitAction: state.searchResult.SubmitAction,
        saveSearchStatus: state.searchResult.saveSearchStatus,
        saveSearchMsgError: state.searchResult.msg,
        saveSearchStatusCode: state.searchResult.saveSearchStatusCode,
        idEditSalesSaveSearch: state.searchResult.idEditSalesSaveSearch,
        activeTabSalesCategory: state.searchResult.activeTabSalesCategory,
    }
}
module.exports = connect(mapStateToProps,itemactions)(SalesReport);
