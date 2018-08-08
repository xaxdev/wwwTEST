import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import InventoryFilter  from '../../components/inventory/inventory_filter';
import * as itemactions from '../../actions/itemactions';
import Modalalertmsg from '../../utils/modalalertmsg';
import GetFilterSearch from './utils/get_filter_search';
import GetFilterSave from './utils/get_filter_save';

const Loading = require('react-loading');

class InventorySearch extends Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }
    static contextTypes = {
        router: PropTypes.object
    }

    handleSubmit = (data) => {
        const that = this;
        let { filters, submitAction, IdEditSaveSearch } = this.props;
        const isNotOwnerSharedSearch = this.props.searchResult.criteriaSaveSearch != null
                                      ? this.props.searchResult.criteriaSaveSearch.shared
                                      : false;

        const userLogin = JSON.parse(sessionStorage.logindata);

        let saveSearchName = data.searchName;
        let jlyHierarchy = false;
        let watHierarchy = false;
        let stoHierarchy = false;
        let accHierarchy = false;
        let obaHierarchy = false;
        let sppHierarchy = false;
        // check modify search or new search
        // if have filters is mean modify search

        delete data.searchName;

        this.props.setCurrentPage(1);

        switch (submitAction) {
            case 'save':
                filters = GetFilterSave(this, data, userLogin, filters, jlyHierarchy, watHierarchy, stoHierarchy,
                    accHierarchy, obaHierarchy, sppHierarchy
                );

                const findjlyHierarchy = filters.find((item) => {return item.jlyHierarchy != undefined});
                const findwatHierarchy = filters.find((item) => {return item.watHierarchy != undefined});
                const findstoHierarchy = filters.find((item) => {return item.stoHierarchy != undefined});
                const findaccHierarchy = filters.find((item) => {return item.accHierarchy != undefined});
                const findobaHierarchy = filters.find((item) => {return item.obaHierarchy != undefined});
                const findsppHierarchy = filters.find((item) => {return item.sppHierarchy != undefined});

                if(findjlyHierarchy != undefined){
                    filters.push({'jewelryProductHierarchy':data.jewelryProductHierarchy})
                }
                if(findwatHierarchy != undefined){
                    filters.push({'watchProductHierarchy':data.watchProductHierarchy})
                }
                if(findstoHierarchy != undefined){
                    filters.push({'stoneProductHierarchy':data.stoneProductHierarchy})
                }
                if(findaccHierarchy != undefined){
                    filters.push({'accessoryProductHierarchy':data.accessoryProductHierarchy})
                }
                if(findobaHierarchy != undefined){
                    filters.push({'obaProductHierarchy':data.obaProductHierarchy})
                }
                if(findsppHierarchy != undefined){
                    filters.push({'sparePartProductHierarchy':data.sparePartProductHierarchy})
                }

                let paramsSaveSearch = {};
                if (IdEditSaveSearch != null) {
                    if (isNotOwnerSharedSearch) {
                        paramsSaveSearch = {...paramsSaveSearch,
                            name:saveSearchName,
                            criteria:JSON.stringify(filters)};
                    } else {
                        paramsSaveSearch = {...paramsSaveSearch,
                            id: IdEditSaveSearch,
                            name:saveSearchName,
                            criteria:JSON.stringify(filters)};
                    }
                } else {
                    paramsSaveSearch = {...paramsSaveSearch,
                        name:saveSearchName,
                        criteria:JSON.stringify(filters)};
                }
                // paramsSaveSearch = {...paramsSaveSearch, name:saveSearchName, criteria:JSON.stringify(filters)}
                // console.log('paramsSaveSearch-->',paramsSaveSearch);
                this.props.saveSearchCriteria(paramsSaveSearch);
                break;
            case 'search':
                filters = GetFilterSearch(this, data, userLogin, filters, jlyHierarchy, watHierarchy, stoHierarchy,
                    accHierarchy, obaHierarchy, sppHierarchy
                );
                sessionStorage.setItem('filters', JSON.stringify(filters));
                this.context.router.push('/searchresult');
                break;
            default:
        }
    }

  handleClosemsgSaveSearch = _=> {
      this.props.setCloseAlertMsg(100);
  }

  renderAlertmsgSaveSearch = _=> {
      const { saveSearchStatus, saveSearchStatusCode, saveSearchMsgError} = this.props;

      const title = 'SAVE SEARCHES';
      let isOpen = saveSearchStatusCode >= 200 ? true : false;

      return(<Modalalertmsg isOpen={isOpen} isClose={this.handleClosemsgSaveSearch}
          props={this.props} message={saveSearchMsgError}  title={title}/>);
  }

  render(){
      return (
          <div>
            <InventoryFilter onSubmit={this.handleSubmit}/>
            {this.renderAlertmsgSaveSearch()}
          </div>
      );
  }
}
function mapStateToProps(state) {
  // console.log('InventorySearch state-->',state);
  return {
    searchResult:state.searchResult,
    activeTabCategory: state.searchResult.activeTabCategory,
    isAdvance: state.searchResult.IsAdvance,
    filters: state.searchResult.filters,
    paramsSearch: state.searchResult.paramsSearch,
    submitAction: state.searchResult.SubmitAction,
    saveSearchStatus: state.searchResult.saveSearchStatus,
    saveSearchMsgError: state.searchResult.msg,
    saveSearchStatusCode: state.searchResult.saveSearchStatusCode,
    IdEditSaveSearch: state.searchResult.idEditSaveSearch,
  };
}

module.exports = connect(mapStateToProps,itemactions)(InventorySearch);
