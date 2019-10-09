import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as relatedItemAction from '../../actions/relateditemaction';
import RelatedItemList  from '../../components/relateditem/relateditemlist';
import RenderAddRelatedItem from './render_add_related_item';
import ModalAlertMsg from '../../utils/modalalertmsg';
import LoadingModal from './loading';

const Loading = require('react-loading');
const SelectField = require('./SelectField');
const SearchField = require('./SearchField');
const Pagination = require('./Pagination');

let listRelateItem = []
class RelatedItem extends Component {
    constructor(props) {
        super(props);

        this.onPageLengthChange = this.onPageLengthChange.bind(this)
        this.onFilterListName = this.onFilterListName.bind(this)
        this.onFilterReference = this.onFilterReference.bind(this)
        this.onChangePage = this.onChangePage.bind(this)
        this.clickAddRelatedItem = this.clickAddRelatedItem.bind(this)
        this.addedRelatedItem = this.addedRelatedItem.bind(this)
        this.handleCloseMsg = this.handleCloseMsg.bind(this)
        this.onCheckedAllItems = this.onCheckedAllItems.bind(this)
        this.selectedRelateItem = this.selectedRelateItem.bind(this)
        this.exportExcel = this.exportExcel.bind(this)

        this.state = {
            pageLength: 5,
            pageLengthOptions: [ 5, 20, 50 ],
            searchName: '',
            searchReference: '',
            currentPage: 0,
            isOpenDialog: false,
            isOpenDialogMsg: true,
            isOpenDialogAddedSuccess: true,
            isOpenDialogExport: false,
            isOpenDialogExportSuccess: false
        };
    }
    componentDidMount(){
        const params = {
            page: this.state.currentPage + 1,
            pageSize: this.state.pageLength
        }
        this.props.getAllRelatedItem(params);
    }
    onPageLengthChange = (value)=>{
        const params = {
            page: this.state.currentPage + 1,
            pageSize: value,
            name: this.state.searchName,
            reference: this.state.searchReference
        }
        this.props.getSomeRelatedItem(params);
        this.setState({pageLength: Number(value)});
    }
    onFilterListName = (value)=>{
        if (value != '') {
            const params = {
                page: this.state.currentPage + 1,
                pageSize: this.state.pageLength,
                name: value,
                reference: this.state.searchReference
            }
            this.props.getSomeRelatedItem(params);
        } else {
            const params = {
                page: this.state.currentPage + 1,
                pageSize: this.state.pageLength
            }
            this.props.getAllRelatedItem(params);
        }
        this.setState({searchName: value});
    }
    onFilterReference = (value)=>{
        if (value != '') {
            const params = {
                page: this.state.currentPage + 1,
                pageSize: this.state.pageLength,
                name: this.state.searchName,
                reference: value
            }
            this.props.getSomeRelatedItem(params);   
        } else {
            const params = {
                page: this.state.currentPage + 1,
                pageSize: this.state.pageLength
            }
            this.props.getAllRelatedItem(params);
        }
        
        this.setState({searchReference: value});
    }
    onChangePage = (pageNumber, event)=> {    
        const params = {
            page: pageNumber + 1,   // Init pagination = 0
            pageSize: this.state.pageLength,
            name: this.state.searchName,
            reference: this.state.searchReference
        }
        this.props.getSomeRelatedItem(params);   
        
        this.setState({currentPage: pageNumber});   // Set pagination, Init pagination = 0
    }

    onCheckedAllItems = async e =>{
        const { listAllRelatedItem } = this.props
        listRelateItem = [];
        if (e.target.checked) {
            listAllRelatedItem.map((item) => {
                listRelateItem.push(item.id)
            })
            await this.props.setRelatedItemSelected('All')
        } else{
            listRelateItem = [];
            await this.props.setRelatedItemSelected(null)
        }
        
    }

    selectedRelateItem = async (e) =>{
        const { relatedItemSelected } = this.props
        const id = e.target.value
        
        if (e.target.checked) {
            listRelateItem.push(id)
            await this.props.setRelatedItemSelected(id)
        } else{
            listRelateItem = listRelateItem.filter(itemId => itemId !== id);
            if (relatedItemSelected != null) {
                await this.props.setRelatedItemSelected(null)    
            } else {
                await this.props.setRelatedItemSelected(id)
            }
        }
    }

    renderTitleDialog(){
        return(
            <RenderAddRelatedItem that={this} />
        );
    }

    renderDialogAddedSuccess= (statusCode) =>{
        const { message } = this.props
        const title = 'Added Related Item.'
        if (statusCode == 201) {
            return(
                <ModalAlertMsg isOpen={this.state.isOpenDialogAddedSuccess} isClose={this.handleCloseMsgAddedSuccess} message={message} title={title}/>
            );    
        }
    }

    clickAddRelatedItem(){
        const { fields: { relatedItemInput } } = this.props;
        relatedItemInput.onChange('')
        this.props.setRelatedItemSource([])
        this.setState({ isOpenDialog: true })
    }

    hideAddRelatedItem = async (e) => {
        this.setState({ isOpenDialog: false })
    }

    handleCloseMsg = _=>{
        const params = {
            page: this.state.currentPage + 1,
            pageSize: this.state.pageLength
        }
        this.props.getAllRelatedItem(params)
        this.setState({isOpenDialogMsg: false});
    }

    handleCloseMsgAddedSuccess = _=>{
        this.setState({isOpenDialogAddedSuccess: false});
    }

    addedRelatedItem = async (e) => {
        e.preventDefault()
        const { fields: { relatedListName, relatedItemInput }, relatedItem } = this.props;
        let relatedItemOrder = []
        relatedItem.map((item,index) => {
            relatedItemOrder.push({'reference':item, 'order': index+1})
        })

        let params = {
            page: this.state.currentPage + 1,
            pageSize: this.state.pageLength,
            name: relatedListName.value,
            items: relatedItemOrder
        }

        this.props.addedRelatedItem(params)
        .then(async (value) => {
            this.setState({ isOpenDialog: false })
            this.setState({ isOpenDialogMsg: true })
            relatedListName.onChange('')
            relatedItemInput.onChange('')
            this.props.setRelatedItem([])
            this.props.setRelatedItemSource([])
        })
    }

    renderDialogExport = () =>{
        const title = 'Export Excel'
        const message = 'Please select related item.'
        return(
            <ModalAlertMsg isOpen={this.state.isOpenDialogExport} isClose={this.handleCloseMsgExport} message={message} title={title}/>
        );
    }

    renderDialogExportSuccess = () =>{
        const title = 'Export Excel'
        const message = 'Please check your email for excel files.'
        return(
            <ModalAlertMsg isOpen={this.state.isOpenDialogExportSuccess} isClose={this.handleCloseMsgExportSuccess} message={message} title={title}/>
        );
    }

    exportExcel(e){
        const { relatedItemSelected } = this.props

        const host = HOSTNAME || 'localhost';
        const ROOT_URL = (host != 'mol.mouawad.com')? `//${host}:${(ENVIRONMENT!='staging')?3005:4005}`: `//${host}`;
        const checkAllItem = relatedItemSelected == 'All'? true: false
        const userLogin = JSON.parse(sessionStorage.logindata)
        const { email, username } = userLogin

        const params = {
            page: this.state.currentPage + 1,
            pageSize: this.state.pageLength,
            ROOT_URL,
            listRelateItem,
            checkAllItem,
            email,
            username
        }
        
        if (listRelateItem.length > 0) {
            this.props.exportRelateItem(params)
            this.setState({isOpenDialogExportSuccess: true});
        } else {
            this.setState({isOpenDialogExport: true});
        }
    }

    handleCloseMsgExport = _=>{
        this.setState({isOpenDialogExport: false});
    }

    handleCloseMsgExportSuccess = _=>{
        this.setState({isOpenDialogExportSuccess: false});
    }
    
    render(){
        const { listPageRelatedItem, totalPages, statusCode, message, relatedItemSelected } = this.props

        if (!listPageRelatedItem || listPageRelatedItem.length == 0) {
            if (statusCode == 400) {
                const title = 'Error Message'
                return(<ModalAlertMsg isOpen={this.state.isOpenDialogMsg} isClose={this.handleCloseMsg} message={message} title={title} />);
            } else if (statusCode == 200) {
                return (
                    <div>
                        <div className="col-sm-12 bg-hearder bg-header-inventories">
                            <div className="col-sm-6 m-width-60 ft-white m-nopadding">
                                <h1>List of Related Items</h1>
                            </div>
                            <div className="col-sm-6 m-width-40 m-nopadding text-right maring-t15">
                                <button className="btn btn-primary btn-radius" type="button" onClick={this.clickAddRelatedItem}>Add Related Items</button>
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
                                            onChange: this.onFilterListName
                                        })
                                    }
                                    {
                                        React.createElement(SearchField, {
                                            id: 'search-field',
                                            label: 'Item Reference:',
                                            value: this.state.searchReference,
                                            onChange: this.onFilterReference
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
                                <h3>No Data</h3>
                            </div>
                       </div>
                        {this.renderTitleDialog()}
                        {this.renderDialogAddedSuccess(statusCode)}
                        {this.renderDialogExport()}
                        {this.renderDialogExportSuccess()}
                    </div>
                );
            } else {
                return (
                    <LoadingModal/>
                )
            }
        }else{
            return (
                <div>
                    <div className="col-sm-12 bg-hearder bg-header-inventories">
                        <div className="col-sm-6 m-width-60 ft-white m-nopadding">
                            <h1>List of Related Items</h1>
                        </div>
                        <div className="col-sm-6 m-width-40 m-nopadding text-right maring-t15">
                            <button className="btn btn-primary btn-radius" type="button" onClick={this.clickAddRelatedItem}>Add Related Items</button>
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
                                        onChange: this.onFilterListName
                                    })
                                }
                                {
                                    React.createElement(SearchField, {
                                        id: 'search-field',
                                        label: 'Item Reference:',
                                        value: this.state.searchReference,
                                        onChange: this.onFilterReference
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
                        <div className="checkbox checkbox-warning check-navi">
                            <input type="checkbox" id="checkAllItems" className="styled" type="checkbox" name="all" checked={this.state.checkAllItems}
                                onChange={this.onCheckedAllItems} />
                            <label className="checkbox1">Select All</label>
                        </div>
                        <a>
                            <div className="icon-excel" onClick={ this.exportExcel }></div>
                        </a>
                        <div className="panel-body">
                            <RelatedItemList relatedItems={ listPageRelatedItem } relatedItemSelected={relatedItemSelected} 
                                listRelateItem ={listRelateItem} selectedRelateItem = {this.selectedRelateItem} />
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
                   {this.renderTitleDialog()}
                   {this.renderDialogAddedSuccess(statusCode)}
                   {this.renderDialogExport()}
                   {this.renderDialogExportSuccess()}
                </div>
            );
        }
    }
}

function mapStateToProps(state) {
    return {
        listAllRelatedItem: state.relatedItem.listAllRelatedItem,
        listPageRelatedItem: state.relatedItem.listPageRelatedItem,
        totalPages: state.relatedItem.totalPages,
        relatedItem: state.relatedItem.relatedItem,
        relatedItemSource: state.relatedItem.relatedItemSource,
        message: state.relatedItem.message,
        statusCode: state.relatedItem.statusCode,
        relatedItemSelected: state.relatedItem.relatedItemSelected
    };
}

module.exports = reduxForm(
    {
        form: 'RelatedItem',
        fields: ['relatedListName', 'relatedItemInput']
    }, mapStateToProps, relatedItemAction
)(RelatedItem);