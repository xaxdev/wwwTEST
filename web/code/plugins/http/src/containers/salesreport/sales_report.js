import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import SalesReportMain  from '../../components/salesreport/salesreport_main';
import * as itemactions from '../../actions/itemactions';
import Modalalertmsg from '../../utils/modalalertmsg';
import GetFilterSearch from './utils/get_filter_search';
import GetFilterSalesSave from './utils/get_filter_save';

class SalesReport extends Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    static contextTypes = {
        router: PropTypes.object
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
                filters = GetFilterSalesSave(this, data, userLogin, filters, jlySalesHierarchy, watSalesHierarchy, stoSalesHierarchy,
                    accSalesHierarchy, obaSalesHierarchy, sppSalesHierarchy
                );

                const findjlySalesHierarchy = filters.find((item) => {return item.jlySalesHierarchy != undefined});
                const findwatSalesHierarchy = filters.find((item) => {return item.watSalesHierarchy != undefined});
                const findstoSalesHierarchy = filters.find((item) => {return item.stoSalesHierarchy != undefined});
                const findaccSalesHierarchy = filters.find((item) => {return item.accSalesHierarchy != undefined});
                const findobaSalesHierarchy = filters.find((item) => {return item.obaSalesHierarchy != undefined});
                const findsppSalesHierarchy = filters.find((item) => {return item.sppSalesHierarchy != undefined});

                if(findjlySalesHierarchy != undefined){
                    filters.push({'jewelryProductSalesHierarchy':data.jewelryProductSalesHierarchy})
                }
                if(findwatSalesHierarchy != undefined){
                    filters.push({'watchProductSalesHierarchy':data.watchProductSalesHierarchy})
                }
                if(findstoSalesHierarchy != undefined){
                    filters.push({'stoneProductSalesHierarchy':data.stoneProductSalesHierarchy})
                }
                if(findaccSalesHierarchy != undefined){
                    filters.push({'accessoryProductSalesHierarchy':data.accessoryProductSalesHierarchy})
                }
                if(findobaSalesHierarchy != undefined){
                    filters.push({'obaProductSalesHierarchy':data.obaProductSalesHierarchy})
                }
                if(findsppSalesHierarchy != undefined){
                    filters.push({'sparePartProductSalesHierarchy':data.sparePartProductSalesHierarchy})
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
                filters = GetFilterSearch(this, data, userLogin, filters, jlySalesHierarchy, watSalesHierarchy, stoSalesHierarchy, accSalesHierarchy,
                    obaSalesHierarchy, sppSalesHierarchy
                );
                sessionStorage.setItem('filters', JSON.stringify(filters));
                this.context.router.push('/salessearchresult');
                break;
            default:
        }
    }

    handleClosemsgSalesSaveSearch = _=> {
        this.props.setCloseAlertMsgSales(100);
    }

    renderAlertmsgSaveSearch = _=> {
        const { saveSalesSearchStatus, saveSalesSearchStatusCode, saveSalesSearchMsgError} = this.props;

        const title = 'SALES SAVED SEARCHES';
        let isOpen = saveSalesSearchStatusCode >= 200 ? true : false;

        return(<Modalalertmsg isOpen={isOpen} isClose={this.handleClosemsgSalesSaveSearch}
            props={this.props} message={saveSalesSearchMsgError}  title={title}/>);
    }

    render(){
        return (
            <div>
                <SalesReportMain onSubmit={this.handleSubmit}/>
                {this.renderAlertmsgSaveSearch()}
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
        saveSalesSearchStatus: state.searchResult.saveSalesSearchStatus,
        saveSalesSearchMsgError: state.searchResult.msgSales,
        saveSalesSearchStatusCode: state.searchResult.saveSalesSearchStatusCode,
        idEditSalesSaveSearch: state.searchResult.idEditSalesSaveSearch,
        activeTabSalesCategory: state.searchResult.activeTabSalesCategory,
    }
}
module.exports = connect(mapStateToProps,itemactions)(SalesReport);
