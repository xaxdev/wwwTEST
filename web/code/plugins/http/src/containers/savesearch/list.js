import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { reduxForm, reset } from 'redux-form';
import { connect } from 'react-redux';
import * as saveSearchAction from '../../actions/savesearchaction';
import * as inventoryActions from '../../actions/inventoryactions';
import SaveSearchList  from '../../components/savesearch/savesearch_list';
import Modalalertmsg from '../../utils/modalalertmsg';

const Loading = require('react-loading');

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
        // console.log('this.props.criteriaSaveSearch-->',this.props.criteriaSaveSearch);
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
            //  console.log(this.props.listSaveSearch);
             return (
                 <div>
                     <div className="col-sm-12 bg-hearder bg-header-inventories">
                        <div className="col-sm-6 m-width-60 ft-white m-nopadding">
                            <h1>List of Saved Searches</h1>
                        </div>
                      </div>
                      <div className="col-sm-12  panel panel-default">
                         <div className="panel-body">
                            <SaveSearchList saveSearches = {this.props.listSaveSearch}
                                criteriaSaveSearch = {this.props.criteriaSaveSearch}
                                shareSaveSearch = {this.props.saveSearchAction.shareSaveSearch}
                                getSaveCriteria = {this.props.saveSearchAction.getSaveCriteria}
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
  // console.log('state list form-->',state);
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
  };
}

function mapDispatchToProps(dispatch) {
  return {
    inventoryActions: bindActionCreators(Object.assign({}, inventoryActions), dispatch),
    // itemActions: bindActionCreators(Object.assign({}, itemactions), dispatch),
    // masterDataActions: bindActionCreators(Object.assign({}, masterDataActions), dispatch),
    saveSearchAction: bindActionCreators(Object.assign({}, saveSearchAction), dispatch)
  }
}

// module.exports = connect(mapStateToProps, mapDispatchToProps)(SaveSearch)
module.exports = reduxForm({
  form: 'SaveSearch',
  fields: ['reference','description','venderReference','vendorName',
            'certificatedNumber','sku','location','warehouse','attachment',
            'stoneType','cut','stoneProductHierarchy','lotNumber',
            'cutGrade','color','colorGrade','clarity','lotQuantityFrom','lotQuantityTo',
            'totalCaratWeightFrom','totalCaratWeightTo','totalCostFrom','totalCostTo',
            'totalUpdatedCostFrom','totalUpdatedCostTo','publicPriceFrom','publicPriceTo',
            'markupFrom','markupTo', 'certificatedNumber','certificateAgency','cerDateFrom',
            'cerDateTo','polish','symmetry','treatment','fluorescence','origin',
            'jewelryProductHierarchy','collection','totalCostFrom','totalCostTo',
            'totalUpdatedCostFrom','totalUpdatedCostTo','publicPriceFrom','publicPriceTo',
            'markupFrom','markupTo','grossWeightFrom','grossWeightTo','setReference',
            'jewelryCategory','brand','mustHave','ringSize','dominantStone',
            'metalType','metalColour',
            'gemstone_stoneType','gemstone_cut','gemstone_cutGrade','gemstone_color','gemstone_clarity','gemstone_stoneCostFrom',
            'gemstone_stoneCostTo','gemstone_totalCaratWeightFrom','gemstone_totalCaratWeightTo','gemstone_quantityFrom',
            'gemstone_quantityTo','gemstone_certificatedNumber','gemstone_cerDateFrom','gemstone_cerDateTo','gemstone_polish',
            'gemstone_symmetry','gemstone_treatment','gemstone_fluorescence','gemstone_origin','gemstone_certificateAgency',
            'watchProductHierarchy','watchCategory','collection','brand','mustHave','metalType',
            'metalColour','dominantStone','limitedEdition','limitedEditionNumber','serialNumber',
            'movement','totalCostFrom','totalCostTo','totalUpdatedCostFrom','totalUpdatedCostTo',
            'publicPriceFrom','publicPriceTo','markupFrom','markupFrom','markupTo','grossWeightFrom',
            'grossWeightTo','proDateFrom','proDateTo','caseDimensionFrom','caseDimensionTo',
            'preciousMetalWeightFrom','preciousMetalWeightTo','dialIndex','dialColor','dialMetal',
            'buckleType','strapType','strapColor','complication',
            'accessoryProductHierarchy','accessoryType',
            'obaProductHierarchy','obaDimension',
            'sparePartProductHierarchy','sparePartType','searchName','validateSearchName'
          ]
},mapStateToProps,mapDispatchToProps)(SaveSearch);
