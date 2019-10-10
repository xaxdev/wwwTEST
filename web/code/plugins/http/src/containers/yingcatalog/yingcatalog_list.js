import React, { Component, PropTypes }from 'react';
import { reduxForm } from 'redux-form';
import RenderAddNewCatalog from './render_add_new_catalog';
import YingCatalogNameList  from '../../components/mycatalog/ying_catalog_name_list';
import YingCatalogDetail from './yingcatalog_detail'
import RenderConfirmDelete from '../../utils/modalConfirmDelete'
import * as yingsetaction from '../../actions/yingsetaction'
import LoadingModal from './loading';

const SelectField = require('./SelectField');
const SearchField = require('./SearchField');
const Pagination = require('./Pagination');

class YingCatalog extends Component {
    constructor(props) {
        super(props)

        this.onPageLengthChange = this.onPageLengthChange.bind(this)
        this.onFilterCatalogName = this.onFilterCatalogName.bind(this)
        this.onChangePage = this.onChangePage.bind(this)

        this.state = {
            isOpenAddNewCatalogDialog: false,
            pageLength: 5,
            pageLengthOptions: [ 5, 20, 50 ],
            searchName: '',
            currentPage: 0,
            isOpenConfirmDeleteDialog: false,
            deleteId: null
        }
    }

    static contextTypes = {
        router: PropTypes.object
    }

    componentWillMount = _=>{
        const params = {
            page: this.state.currentPage + 1,
            pageSize: this.state.pageLength
        }
        this.props.getYingName(params)
    }

    onPageLengthChange = (value)=>{
        const params = {
            page: this.state.currentPage + 1,
            pageSize: value,
            name: this.state.searchName
        }
        this.props.getYingName(params);
        this.setState({pageLength: Number(value)});
    }

    onFilterCatalogName = (value) =>{
        if (value != '') {
            const params = {
                page: this.state.currentPage + 1,
                pageSize: this.state.pageLength,
                name: value,
            }
            this.props.getSomeYingCatalogName(params);
        } else {
            const params = {
                page: this.state.currentPage + 1,
                pageSize: this.state.pageLength
            }
            this.props.getYingName(params);
        }
        this.setState({searchName: value});
    }

    onChangePage = (pageNumber, event)=> {    
        const params = {
            page: pageNumber + 1,   // Init pagination = 0
            pageSize: this.state.pageLength,
            name: this.state.searchName
        }
        this.props.getYingName(params);   
        
        this.setState({currentPage: pageNumber});   // Set pagination, Init pagination = 0
    }

    clickAddNewCatalog = _ =>{
        this.setState({ isOpenAddNewCatalogDialog: true })
    }

    addedNewCatalog = (e) => {
        e.preventDefault()
        const { fields: { yingCatalogName } } = this.props;
        
        let params = {
            name: yingCatalogName.value
        }

        this.props.addYingName(params)
        .then(async (value) => {
            let paramsGet = {
                page: this.state.currentPage + 1,
                pageSize: this.state.pageLength
            }
            this.setState({ isOpenAddNewCatalogDialog: false })
            yingCatalogName.onChange('')
            this.props.getYingName(paramsGet)
        })
    }

    yingCatalogDetail = (id, isShared)=>{
        this.context.router.push(`/yingcatalog/detail/${id}/${isShared}`);
    }

    renderCatalogNameDialog(){
        return(<RenderAddNewCatalog that={this}/>)
    }

    hideCatalogNameDialog = async (e) => {
        this.setState({ isOpenAddNewCatalogDialog: false })
    }

    onDeleteCatalog = (id)=>{
        this.setState({
            deleteId: id,
            isOpenConfirmDeleteDialog: true
        })
    }

    confirmDeleteCatalog = async () =>{
        const id = this.state.deleteId;
        const params = {
            id,
            page: this.state.currentPage + 1,
            pageSize: this.state.pageLength
        }
        await this.props.deleteYingCatalogName(params)
        await this.props.getYingName(params)
        this.setState({ isOpenConfirmDeleteDialog: false })
    }

    hideConfirmDeleteDialog = () =>{
        this.setState({ isOpenConfirmDeleteDialog: false })
    }

    render() {
        const { yingCatalogName, totalPages } = this.props

        if (!yingCatalogName || yingCatalogName.length == 0) {
            if (yingCatalogName.length == 0) {
                return(
                    <div>
                        <div className="col-sm-12 bg-hearder bg-header-inventories">
                            <div className="col-sm-6 m-width-60 ft-white m-nopadding">
                                <h1>List of Catalog</h1>
                            </div>
                            <div className="col-sm-6 m-width-40 m-nopadding text-right maring-t15">
                                <button className="btn btn-primary btn-radius" type="button" onClick={this.clickAddNewCatalog}>Add New Catalog</button>
                            </div>
                        </div>
                        <div className="col-sm-12  panel panel-default">
                            <div className="panel-body">
                                Not has Ying Catalog's data.
                            </div>
                        </div>
                        {this.renderCatalogNameDialog()}
                    </div>
                )   
            } else {
                return(
                    <div>
                        <div className="col-sm-12 bg-hearder bg-header-inventories">
                            <div className="col-sm-6 m-width-60 ft-white m-nopadding">
                                <h1>List of Catalog</h1>
                            </div>
                            <div className="col-sm-6 m-width-40 m-nopadding text-right maring-t15">
                                <button className="btn btn-primary btn-radius" type="button" onClick={this.clickAddNewCatalog}>Add New Catalog</button>
                            </div>
                        </div>
                        <div className="col-sm-12  panel panel-default">
                            <div className="panel-body">
                                <LoadingModal/>
                            </div>
                        </div>
                        {this.renderCatalogNameDialog()}
                    </div>
                )
            }
        } else {
            return(
                <div>
                    <div className="col-sm-12 bg-hearder bg-header-inventories">
                        <div className="col-sm-6 m-width-60 ft-white m-nopadding">
                            <h1>List of Catalog</h1>
                        </div>
                        <div className="col-sm-6 m-width-40 m-nopadding text-right maring-t15">
                            <button className="btn btn-primary btn-radius" type="button" onClick={this.clickAddNewCatalog}>Add New Catalog</button>
                        </div>
                    </div>
                    <div className="col-sm-12  panel panel-default">
                        <div className="row m-user">
                            <div className="col-md-5 col-sm-6 search-group m-nopadding">
                                {
                                    React.createElement(SelectField, {
                                        id: 'page-menu',
                                        label: 'Page size:',
                                        value: this.state.pageLength,
                                        options: this.state.pageLengthOptions,
                                        onChange: this.onPageLengthChange
                                    })
                                }
                                {
                                    React.createElement(SearchField, {
                                        id: 'search-field',
                                        label: 'List Name:',
                                        value: this.state.searchName,
                                        onChange: this.onFilterCatalogName
                                    })
                                }
                            </div>
                            {
                                React.createElement(
                                    'div',
                                    { className: 'col-md-7 col-sm-6 col-xs-12 m-nopadding maring-b10' },
                                    React.createElement(Pagination, {
                                        className: 'pagination pull-right',
                                        currentPage: this.state.currentPage,
                                        totalPages: totalPages,
                                        onChangePage: this.onChangePage
                                    })
                                )
                            }
                        </div>
                        <div className="panel-body">
                            <YingCatalogNameList  yingCatalogName={yingCatalogName} yingCatalogDetail={this.yingCatalogDetail} 
                                onDeleteCatalog={this.onDeleteCatalog}/>
                        </div>
                        {
                            React.createElement(
                                'div',
                                { className: 'col-sm-12 col-xs-12 m-nopadding nopadding' },
                                React.createElement(Pagination, {
                                    className: 'pagination pull-right',
                                    currentPage: this.state.currentPage,
                                    totalPages: totalPages,
                                    onChangePage: this.onChangePage
                                })
                            )
                        }
                    </div>
                    {this.renderCatalogNameDialog()}
                    <RenderConfirmDelete isOpen={this.state.isOpenConfirmDeleteDialog} isClose={this.hideConfirmDeleteDialog} 
                        onSubmit={this.confirmDeleteCatalog} message={'Are you sure you want to delete this Catalog?'}
                        title={'Delete Catalog'}/>
                </div>
            )
        }
    }
}

function mapStateToProps(state) {
    return {
        yingCatalogName: state.myCatalog.yingCatalogName,
        totalPages: state.myCatalog.totalPages,
    }
}

module.exports = reduxForm(
    {
        form: 'YingCatalog',
        fields: ['yingCatalogName']
    }, mapStateToProps, yingsetaction
)(YingCatalog)