import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { DataTable } from '../../utils/dataTableSaveSearch/index';
import ShareModal from './share_model';
import * as setcriteria from './setstate';
let Loading = require('react-loading');

class SaveSearchList extends Component {
    constructor(props) {
      super(props);

    //   this.searchSaveCriteria = this.searchSaveCriteria.bind(this);

      this.state = {
        isOpen: false,
        initialPageLength:20,
        userStatus:null,
        userData:[],
        currentPage: 0,
        pageLength: 5,
        totalPages:0
      };
    }
    static contextTypes = {

      router: PropTypes.object
    }
    searchSaveCriteria = (id) =>{
        const that = this;
        const { props } = this.props;
        let { filters, paramsSearch, activeTabCategory, isAdvance, submitAction } = props;
        // console.log('props-->',props);
        let params = {id:id}
        this.props.getSaveCriteria(params)
                    .then((value) => {
                        // console.log('get criteria save search.');
                        // console.log(this.props.criteriaSaveSearch);
                        (async () => {
                            if (this.props.criteriaSaveSearch != null) {
                                sessionStorage.setItem('filters', this.props.criteriaSaveSearch.criteria);
                                const criterias = JSON.parse(this.props.criteriaSaveSearch.criteria);
                                let data = null;
                                data = await setcriteria.setstate(props,criterias);
                                // await console.log('data-->',data);
                                // console.log('filters-->',filters);
                                if(filters.length != 0){
                                 await props.saveSearchAction.setParams(paramsSearch)
                                 await sessionStorage.setItem('paramsSearch', JSON.stringify(paramsSearch));
                                //   filters.splice(0, filters.length);
                                }else{
                                //   // if not have filters is mean new search
                                //   // set params by new criterias
                                  await props.saveSearchAction.setParams(data);
                                  await sessionStorage.setItem('paramsSearch', JSON.stringify(data));
                                }
                                that.context.router.push('/searchresult');
                            }
                        })()
                    });
    }

    renderAction = (val,row) =>{
        // console.log('this-->',this);
        // console.log('val-->',val);
        // console.log('row-->',row);
        return(
          <div>
            <a><div className={`${row.shared ? 'hidden' : 'icon-edit'}`} onClick={this.deleteCatalog}></div></a>
            <a><div className="icon-search" onClick={this.searchSaveCriteria.bind(this,row._id)}></div></a>
            <ShareModal key={ row._id } saveSearch={ row }
                shareSaveSearch={this.props.shareSaveSearch}/>
            <a><div className={`${row.shared ? 'hidden' : 'icon-del'}`} onClick={this.deleteCatalog}></div></a>
          </div>
        );
    }

    render (){
        let lists = null;
        const { saveSearches } = this.props;
        if (saveSearches.length != 0){
            lists = saveSearches.map(function (col, idx) {
                        let id = idx + 1;
                        let status = !col.shared ? 'Owner' : 'Shared'
                        return {...col, id:id, status:status}
                    });
        }
        const tableColumns = [
          { title: 'Id', prop: 'id' },
          { title: 'Search Name', prop: 'name' },
          { title: 'Status', prop: 'status' },
          { title: 'Action', render: this.renderAction }
        ];
        if(lists.length != 0){
            return (
              <div>
                <DataTable
                  className="col-sm-12"
                  keys={[ 'id','name', 'status' ]}
                  columns={tableColumns}
                  initialData={lists}
                  initialPageLength={this.state.initialPageLength}
                  initialSortBy={{ prop: 'id', order: 'ascending' }}
                  pageLengthOptions={[ 5, 20, 50 ]}
                />
              </div>
            );
        }else{
            return (
                    <div >
                      <center>
                        <br/><br/><br/><br/><br/><br/>
                          <Loading type="spin" color="#202020" width="10%"/>
                      </center>
                      <br/><br/><br/><br/><br/><br/>
                    </div>
                );
        }
    }
}

module.exports = SaveSearchList
