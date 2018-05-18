import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Modal, ModalClose } from 'react-modal-bootstrap';
import { DataTable } from '../../utils/dataTableSaveSearch/index';
import ShareModal from './share_modal';
import * as setcriteria from './setstate';
import ModalConfirmDelete from './modalConfirmDelete';
let Loading = require('react-loading');

class SaveSearchList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
            initialPageLength:10,
            userStatus:null,
            userData:[],
            currentPage: 0,
            pageLength: 5,
            totalPages:0,
            isOpenDeleteSaveSearch: false,
            isOpenAlertMessage: true,
            showLoading: false
        };
    }
    static contextTypes = {
        router: PropTypes.object
    }
    searchSaveCriteria = (id) => {
        const that = this;
        const { props } = this.props;
        let { filters, paramsSearch } = props;
        let params = {id:id}

        this.setState({ showLoading: true });

        this.props.getSaveCriteria(params).then((value) => {
            (async () => {
                if (this.props.criteriaSaveSearch != null) {
                    sessionStorage.setItem('filters', this.props.criteriaSaveSearch.criteria);
                    const criterias = JSON.parse(this.props.criteriaSaveSearch.criteria);
                    let data = null;
                    data = await setcriteria.setstate(props,criterias);
                    if(filters.length != 0){
                        await props.saveSearchAction.setParams(paramsSearch)
                        await sessionStorage.setItem('paramsSearch', JSON.stringify(paramsSearch));
                    }else{
                        // if not have filters is mean new search
                        // set params by new criterias
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
    editeSaveCriteria = (id) => {
        const that = this;
        const { props } = this.props;
        let { filters, paramsSearch } = props;
        let params = {id:id}

        this.setState({showLoading: true});

        this.props.getSaveCriteria(params).then((value) => {
            (async () => {
                if (this.props.criteriaSaveSearch != null) {
                    sessionStorage.setItem('filters', this.props.criteriaSaveSearch.criteria);
                    const criterias = JSON.parse(this.props.criteriaSaveSearch.criteria);
                    let data = null;
                    data = await setcriteria.setstate(props,criterias);
                    if(filters.length != 0){
                        await props.saveSearchAction.setParams(paramsSearch)
                        await sessionStorage.setItem('paramsSearch', JSON.stringify(paramsSearch));
                    }else{
                        // if not have filters is mean new search
                        // set params by new criterias
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
    confirmDeleteSaveSearch = async (id) => {
        await this.props.setIdDeleteSaveSearch(id);
        this.setState({isOpenDeleteSaveSearch: true});
    }
    deleteSaveSearch = async _=> {
        const { props } = this.props;
        const { IdDeleteSaveSearch } = props;
        let params = {id:IdDeleteSaveSearch};
        await this.props.deleteSaveSearch(params);
        await this.props.getListsSaveSearch();
        this.setState({isOpenDeleteSaveSearch: false});
    }
    handleCloseDelete = _=> {
        this.setState({isOpenDeleteSaveSearch: false});
    }
    renderModalConfirmDelete = _=> {
        const title = 'DELETE ONHAND SAVED SEARCH';
        const msg = 'Are you sure!';
        return(
            <div>
                <ModalConfirmDelete onSubmit={this.deleteSaveSearch} isOpen={this.state.isOpenDeleteSaveSearch}
                    isClose={this.handleCloseDelete} props={this.props} message={msg} title={title}/>
            </div>
        );
    }
    renderAction = (val,row) => {
        return(
            <div className="savesearch">
                <a>
                    <div className={`${row.shared ? 'icon-edit fa' : 'icon-edit'}`}
                        onClick={row.shared ? '' : this.editeSaveCriteria.bind(this,row._id)}>
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
                    <div className={`${row.shared ? 'icon-del fa' : 'icon-del'}`}
                        onClick={row.shared ? '' : this.confirmDeleteSaveSearch.bind(this,row._id)}>
                    </div>
                </a>
            </div>
        );
    }

    isCloseAlertMessage = _=> {
        this.setState({ isOpenAlertMessage: false });
    }

    render() {
        let lists = [];
        const { saveSearches } = this.props;
        if (saveSearches.onhand.length != 0){
            lists = saveSearches.onhand.map(function (col, idx) {
                let id = idx + 1;
                let status = !col.shared ? 'Owner' : 'Shared'
                return {...col, id: id, status: status}
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
                    <div className={`${this.state.showLoading ? '' : 'hidden'}` }>
                        <center>
                            <br/><br/><br/><br/><br/><br/>
                            <Loading type="spin" color="#202020" width="10%"/>
                        </center>
                        <br/><br/><br/><br/><br/><br/>
                    </div>
                    <DataTable
                        className={`${!this.state.showLoading ? 'col-sm-12' : 'hidden'}` }
                        keys={[ 'id','name', 'status' ]}
                        columns={tableColumns}
                        initialData={lists}
                        initialPageLength={this.state.initialPageLength}
                        initialSortBy={{ prop: 'id', order: 'ascending' }}
                        pageLengthOptions={[ 5, 10, 20 ]} />
                    {this.renderModalConfirmDelete()}
                </div>
            );
        }else{
            return (
                <div  className="alertMessage">
                    <Modal isOpen={this.state.isOpenAlertMessage} >
                        <div className="modal-header">
                            <ModalClose onClick={this.isCloseAlertMessage}/>
                            <h1 className="modal-title">ONHAND SAVED SEARCHES</h1>
                        </div>
                        <div className="modal-body">
                            <div className="text-center maring-t20 font-b">
                                No Results.
                            </div>
                        </div>
                        <div className="modal-footer maring-t20">
                            <button type="button" className="btn btn-default btn-radius"
                                onClick={this.isCloseAlertMessage}> Ok
                            </button>
                        </div>
                    </Modal>
                </div>
            );
        }
    }
}

module.exports = SaveSearchList
