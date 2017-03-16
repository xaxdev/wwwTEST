import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as saveSearchAction from '../../actions/savesearchaction';
import SaveSearchList  from '../../components/savesearch/savesearch_list';
import Modalalertmsg from '../../utils/modalalertmsg';

const Loading = require('react-loading');

class SaveSearch extends Component {
    componentDidMount(){
      this.props.getListsSaveSearch();
    }

    handleClosemsgSaveSearch = _=> {
        this.props.setCloseAlertMsg(100);
    }

    renderAlertmsgSharedSaveSearch = _=> {
        const { saveSearchStatus, saveSearchStatusCode, saveSearchMsgError} = this.props;

        const title = 'SHARED SAVE SEARCHES';
        let isOpen = saveSearchStatusCode >= 200 ? true : false;
        console.log('isOpen-->',isOpen);

        return(<Modalalertmsg isOpen={isOpen} isClose={this.handleClosemsgSaveSearch}
            props={this.props} message={saveSearchMsgError}  title={title}/>);
    }

    render(){
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
                            <SaveSearchList saveSearches={this.props.listSaveSearch}
                                shareSaveSearch={this.props.shareSaveSearch}
                                saveSearchStatus={this.props.saveSearchStatus}
                                saveSearchMsgError={this.props.saveSearchMsgError}
                                saveSearchStatusCode={this.props.saveSearchStatusCode}/>
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
  };
}

module.exports = connect(mapStateToProps, saveSearchAction)(SaveSearch)
