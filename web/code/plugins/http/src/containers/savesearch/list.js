import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { reduxForm, reset } from 'redux-form';
import { connect } from 'react-redux';
import * as saveSearchAction from '../../actions/savesearchaction';
import * as inventoryActions from '../../actions/inventoryactions';
import OnHandSaveSearchList  from '../../components/savesearch/onhand_savesearch_list';
import SalesSaveSearchList  from '../../components/savesearch/sales_savesearch_list';
import Modalalertmsg from '../../utils/modalalertmsg';

const Loading = require('react-loading');

const fields = [
    'reference','description','venderReference','vendorName','certificatedNumber','sku','location','warehouse','attachment','stoneType','cut','cutGrade','color',
    'stoneProductHierarchy','lotNumber','colorGrade','clarity','lotQuantityFrom','lotQuantityTo','totalCaratWeightFrom','totalCaratWeightTo','totalCostFrom',
    'totalCostTo','totalUpdatedCostFrom','totalUpdatedCostTo','publicPriceFrom','publicPriceTo','markupFrom','markupTo', 'certificatedNumber','certificateAgency',
    'cerDateFrom','cerDateTo','polish','symmetry','treatment','fluorescence','origin','jewelryProductHierarchy','collection','totalCostFrom','totalCostTo',
    'totalUpdatedCostFrom','totalUpdatedCostTo','publicPriceFrom','publicPriceTo','markupFrom','markupTo','grossWeightFrom','grossWeightTo','setReference',
    'jewelryCategory','brand','mustHave','ringSize','dominantStone','metalType','metalColour','gemstone_stoneType','gemstone_cut','gemstone_cutGrade',
    'gemstone_color','gemstone_clarity','gemstone_stoneCostFrom','gemstone_stoneCostTo','gemstone_totalCaratWeightFrom','gemstone_totalCaratWeightTo',
    'gemstone_quantityFrom','gemstone_quantityTo','gemstone_certificatedNumber','gemstone_cerDateFrom','gemstone_cerDateTo','gemstone_polish','collection',
    'gemstone_symmetry','gemstone_treatment','gemstone_fluorescence','gemstone_origin','gemstone_certificateAgency','watchProductHierarchy','watchCategory',
    'brand','mustHave','metalType','dialColor','metalColour','dominantStone','limitedEdition','limitedEditionNumber','serialNumber','dialIndex','movement',
    'totalCostFrom','totalCostTo','totalUpdatedCostFrom','totalUpdatedCostTo','complication','publicPriceFrom','publicPriceTo','markupFrom','markupFrom',
    'markupTo','grossWeightFrom','grossWeightTo','proDateFrom','proDateTo','caseDimensionFrom','caseDimensionTo','dialMetal','preciousMetalWeightFrom',
    'preciousMetalWeightTo','buckleType','strapType','strapColor','accessoryProductHierarchy','accessoryType','obaProductHierarchy','obaDimension',
    'searchName','sparePartProductHierarchy','sparePartType','validateSearchName','viewAsSet'
]

class SaveSearch extends Component {
    componentDidMount(){
        this.props.saveSearchAction.getListsSaveSearch();
    }

    handleClosemsgSaveSearch = _=> {
        this.props.saveSearchAction.setCloseAlertMsg(100);
    }

    renderAlertmsgSharedSaveSearch = _=> {
        const { saveSearchStatus, saveSearchStatusCode, saveSearchMsgError} = this.props;

        const title = 'SHARED SAVE SEARCHES';
        let isOpen = saveSearchStatusCode >= 200 ? true : false;

        return(<Modalalertmsg isOpen={isOpen} isClose={this.handleClosemsgSaveSearch}
            props={this.props} message={saveSearchMsgError}  title={title}/>);
    }

    render(){
        const userLogin = JSON.parse(sessionStorage.logindata);
        const { permission } = userLogin;

        if (!this.props.listSaveSearch) {
          return (
              <div >
                  <center>
                      <br/><br/><br/><br/><br/><br/>
                      <Loading type="spin" color="#202020" width="10%"/>
                  </center>
                  <br/><br/><br/><br/><br/><br/>
              </div>
          );
         }else{
             return (
                 <div>
                     <div className={`col-sm-12 bg-hearder bg-header-inventories ${permission.userType != 'Sales'?'':'hidden'}`}>
                         <div className="col-sm-6 m-width-60 ft-white m-nopadding">
                            <h1>LIST OF INVENTORY SAVED SEARCHES</h1>
                         </div>
                     </div>
                     <div className={`col-sm-12  panel panel-default ${permission.userType != 'Sales'?'':'hidden'}`}>
                         <div className="panel-body">
                             <OnHandSaveSearchList saveSearches = {this.props.listSaveSearch}
                                criteriaSaveSearch = {this.props.criteriaSaveSearch}
                                shareSaveSearch = {this.props.saveSearchAction.shareSaveSearch}
                                getSaveCriteria = {this.props.saveSearchAction.getSaveCriteria}
                                deleteSaveSearch = {this.props.saveSearchAction.deleteSaveSearch}
                                setIdDeleteSaveSearch = {this.props.saveSearchAction.setIdDeleteSaveSearch}
                                getListsSaveSearch = {this.props.saveSearchAction.getListsSaveSearch}
                                props = {this.props}/>
                         </div>
                     </div>
                     <div className={`col-sm-12 maring-t15 bg-hearder bg-header-inventories ${permission.userType != 'OnHand'?'':'hidden'}`}>
                         <div className="col-sm-6 m-width-60 ft-white m-nopadding">
                            <h1>LIST OF SALES SAVED SEARCHES</h1>
                         </div>
                     </div>
                     <div className={`col-sm-12  panel panel-default ${permission.userType != 'OnHand'?'':'hidden'}`}>
                         <div className="panel-body">
                             <SalesSaveSearchList saveSearches = {this.props.listSaveSearch}
                                criteriaSalesSaveSearch = {this.props.criteriaSalesSaveSearch}
                                shareSalesSaveSearch = {this.props.saveSearchAction.shareSalesSaveSearch}
                                getSalesSaveCriteria = {this.props.saveSearchAction.getSalesSaveCriteria}
                                deleteSalesSaveSearch = {this.props.saveSearchAction.deleteSalesSaveSearch}
                                setIdDeleteSalesSaveSearch = {this.props.saveSearchAction.setIdDeleteSalesSaveSearch}
                                getListsSaveSearch = {this.props.saveSearchAction.getListsSaveSearch}
                                props = {this.props}/>
                         </div>
                     </div>
                     {this.renderAlertmsgSharedSaveSearch()}
                 </div>
             );
         }
    }
}

function mapStateToProps(state) {
    return {
        listSaveSearch: state.searchResult.listSaveSearch,
        saveSearchStatus: state.searchResult.saveSearchStatus,
        saveSearchMsgError: state.searchResult.msg,
        saveSearchStatusCode: state.searchResult.saveSearchStatusCode,
        criteriaSaveSearch: state.searchResult.criteriaSaveSearch,
        paramsSearch: state.searchResult.paramsSearch,
        filters: state.searchResult.filters,
        activeTabCategory: state.searchResult.activeTabCategory,
        isAdvance: state.searchResult.IsAdvance,
        submitAction: state.searchResult.SubmitAction,
        IdDeleteSaveSearch: state.searchResult.idDeleteSaveSearch,
        IdEditSaveSearch: state.searchResult.idEditSaveSearch,
        NameEditSaveSearch: state.searchResult.nameEditSaveSearch,
        criteriaSalesSaveSearch: state.searchResult.criteriaSalesSaveSearch,
        IdDeleteSalesSaveSearch: state.searchResult.idDeleteSalesSaveSearch,
        paramsSalesSearch: state.searchResult.paramsSalesSearch,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        inventoryActions: bindActionCreators(Object.assign({}, inventoryActions), dispatch),
        saveSearchAction: bindActionCreators(Object.assign({}, saveSearchAction), dispatch)
    }
}
// module.exports = connect(mapStateToProps, mapDispatchToProps)(SaveSearch)
module.exports = reduxForm(
    {
        form: 'SaveSearch',
        fields: fields
    }, mapStateToProps, mapDispatchToProps
)(SaveSearch);
