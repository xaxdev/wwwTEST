import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { DataTable } from '../../utils/dataTableSaveSearch/index';
import ShareModal from './share_model';
import * as setcriteria from './setstate';
import ModalConfirmDelete from './modalConfirmDelete';
let Loading = require('react-loading');

class SaveSearchList extends Component {
    constructor(props) {
      super(props);

    //   this.searchSaveCriteria = this.searchSaveCriteria.bind(this);
    //   this.handleSubmitDeleteCatalog = this.handleSubmitDeleteCatalog.bind(this);

      this.state = {
        isOpen: false,
        initialPageLength:20,
        userStatus:null,
        userData:[],
        currentPage: 0,
        pageLength: 5,
        totalPages:0,
        isOpenDeleteSaveSearch: false,
      };
    }
    static contextTypes = {

      router: PropTypes.object
    }
    searchSaveCriteria = (id) =>{
        const that = this;
        const { props } = this.props;
        let { filters, paramsSearch } = props;
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
                                let editParams = {id:id, name:this.props.criteriaSaveSearch.name}
                                await props.saveSearchAction.setIdEditSaveSearch(editParams);
                                that.context.router.push('/searchresult');
                            }
                        })()
                    });
    }
    editeSaveCriteria = (id) =>{
        const that = this;
        const { props } = this.props;
        let { filters, paramsSearch } = props;
        // console.log('props-->',props);
        let params = {id:id}
        this.props.getSaveCriteria(params)
                    .then((value) => {
                        // console.log('get criteria save search.');
                        console.log(this.props.criteriaSaveSearch);
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
                                let editParams = {id:id, name:this.props.criteriaSaveSearch.name}
                                await props.saveSearchAction.setIdEditSaveSearch(editParams);
                                that.context.router.push('/inventories');
                            }
                        })()
                    });
    }
    confirmDeleteSaveSearch = async (id) =>{
        await this.props.setIdDeleteSaveSearch(id);
        this.setState({isOpenDeleteSaveSearch: true});
    }
    deleteSaveSearch = async _=>{
        const { props } = this.props;
        const { IdDeleteSaveSearch } = props;
        // console.log(IdDeleteSaveSearch);
        let params = {id:IdDeleteSaveSearch};
        await this.props.deleteSaveSearch(params);
        await this.props.getListsSaveSearch();
        this.setState({isOpenDeleteSaveSearch: false});
    }
    handleCloseDelete = _=>{
        this.setState({isOpenDeleteSaveSearch: false});
    }
    renderModalConfirmDelete = _=> {
        const title = 'DELETE SAVED SEARCH';
        const msg = 'Are you sure!';
        return(
            <div>
                <ModalConfirmDelete onSubmit={this.deleteSaveSearch} isOpen={this.state.isOpenDeleteSaveSearch}
                    isClose={this.handleCloseDelete} props={this.props} message={msg} title={title}/>
            </div>
        );
    }
    renderAction = (val,row) =>{
        // console.log('this-->',this);
        // console.log('val-->',val);
        // console.log('row-->',row);
        return(
          <div>
                <a>
                    <div className={`${row.shared ? 'hidden' : 'icon-edit'}`}
                        onClick={this.editeSaveCriteria.bind(this,row._id)}>
                    </div>
                </a>
                <a>
                    <div className="icon-search"
                        onClick={this.searchSaveCriteria.bind(this,row._id)}>
                    </div>
                </a>
                <ShareModal key={ row._id } saveSearch={ row }
                    shareSaveSearch={this.props.shareSaveSearch}/>
                <a>
                    <div className={`${row.shared ? 'hidden' : 'icon-del'}`}
                        onClick={this.confirmDeleteSaveSearch.bind(this,row._id)}>
                    </div>
                </a>
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
        }else{
            lists.length = 0;
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
                {this.renderModalConfirmDelete()}
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
