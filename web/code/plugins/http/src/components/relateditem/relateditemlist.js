import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import RenderEditRelatedItem from './render_edit_related_item';
import RelatedItemRows from './related_item_rows';
import LoadingModal from './loading';
import * as relatedItemAction from '../../actions/relateditemaction';
import ModalAlertMsg from '../../utils/modalalertmsg';


class RelatedItemList extends Component {
    constructor(props) {
        super(props);

        this.editRelatedItemClick = this.editRelatedItemClick.bind(this)
        this.editRelatedItem = this.editRelatedItem.bind(this)

        this.state = {
            pageLength: 5,
            pageLengthOptions: [ 5, 20, 50 ],
            searchName: '',
            searchReference: '',
            initialPageLength: 20,
            currentPage: 0,
            isOpenDialog: false,
            isOpenDialogMsg: true,
            isOpenDialogEditSuccess: true
        };
    }

    editRelatedItemClick = async (e) =>{
        const { id } = e.target
        await this.props.getRelatedItemId(id);
        const { fields: { relatedListName }, relatedItemEdit } = this.props
        const { name, items } = relatedItemEdit
        relatedListName.onChange(name)
        if (items != undefined) {
            const mapItem = item => {
                return { value: item.reference, label: item.reference }
            }
            let listItem = items.map(mapItem)
            await this.props.setRelatedItemSource([...listItem])
            await this.props.setRelatedItemId(id);
            this.setState({ isOpenDialog: true })     
        }
    }

    clickAddRelatedItem(){
        this.setState({ isOpenDialog: true })
    }

    hideAddRelatedItem = async (e) => {
        this.setState({ isOpenDialog: false })
    }

    renderTitleDialog(){
        return(
            <RenderEditRelatedItem that={this} />
        );
    }

    renderDialogEditSuccess = (statusCode) =>{
        const message = 'Edit Related Item is success.'
        const title = 'Edit Related Item.'
        if (statusCode == 205) {
            return(
                <ModalAlertMsg isOpen={this.state.isOpenDialogEditSuccess} isClose={this.handleCloseMsgEditSuccess} message={message} title={title}/>
            );    
        }
    }

    editRelatedItem = async (e) => {
        e.preventDefault()
        const { fields: { relatedListName, relatedItemInput }, relatedItem, relatedItemId } = this.props;
        
        let relatedItemOrder = []
        relatedItem.map((item,index) => {
            relatedItemOrder.push({'reference':item, 'order': index+1})
        })

        let params = {
            page: this.state.currentPage + 1,
            pageSize: this.state.pageLength,
            name: relatedListName.value,
            items: relatedItemOrder,
            id: relatedItemId
        }

        await this.props.editRelatedItem(params)
        .then(async (value) => {
            
            this.setState({ isOpenDialog: false })
            this.setState({isOpenDialogEditSuccess: true});
            relatedListName.onChange('')
            relatedItemInput.onChange('')
            this.props.setRelatedItem([])
            this.props.setRelatedItemSource([])  
        })
    }

    handleCloseMsg = _=>{
        const params = {
            page: this.state.currentPage + 1,
            pageSize: this.state.pageLength
        }
        this.props.getAllRelatedItem(params)
        this.setState({isOpenDialogMsg: false});
    }

    handleCloseMsgEditSuccess = _=>{
        this.setState({isOpenDialogEditSuccess: false});
    }

    render = _=>{
        let { relatedItems, statusCode, message, relatedItemSelected, listRelateItem, selectedRelateItem } = this.props
        let { items } = relatedItems;

        (async _ => {
            if (relatedItems.length > 0) {
                await relatedItems.map(async(col,index)=>{
                    let { items } = col
                    let reference = [];
                    await items.map((field,i)=>{
                        reference.push(field.reference)
                    })
                    col.reference = reference.join(',')
                })
            } 
        })()

        const params = {
            page: this.state.currentPage + 1,
            pageSize: this.state.pageLength
        }

        if(relatedItems.length != 0){
            return (
                <div>
                    <table className="table table-bordered table-searchresult table-searchset">
                        <thead>
                            <tr>
                                <th><span></span></th>
                                <th><span>Id</span></th>
                                <th><span>List Name</span></th>
                                <th><span>Item Reference</span></th>
                                <th><span>Order</span></th>
                                <th><span>Edit</span></th>
                                <th><span>Delete</span></th>
                            </tr>
                        </thead>
                        {relatedItems.map((row) => {
                            return(
                                <RelatedItemRows key={row._id} row={row} editRelatedItemClick={this.editRelatedItemClick}  listRelateItem={listRelateItem}
                                    deleteRelatedItem={this.props.deleteRelatedItem} params={params} selectedRelateItem = {selectedRelateItem}
                                />
                            );  
                        })}
                    </table>
                    {this.renderTitleDialog()}
                    {this.renderDialogEditSuccess(statusCode)}
                </div>
            )
        }else{
            if (statusCode == 400) {
                const title = 'Error Message'
                return(<ModalAlertMsg isOpen={this.state.isOpenDialogMsg} isClose={this.handleCloseMsg} message={message} title={title} />);
            } else {
                return (
                    <LoadingModal/>
                )
            }
        }
    }
}

function mapStateToProps(state) {
    return {
        relatedItem: state.relatedItem.relatedItem,
        relatedItemSource: state.relatedItem.relatedItemSource,
        relatedItemId: state.relatedItem.relatedItemId,
        relatedItemEdit: state.relatedItem.relatedItemEdit,
        message: state.relatedItem.message,
        statusCode: state.relatedItem.statusCode,
        relatedItemSelected: state.relatedItem.relatedItemSelected
    };
}

module.exports = reduxForm(
    {
        form: 'RelatedItemList',
        fields: ['relatedListName', 'relatedItemInput']
    }, mapStateToProps, relatedItemAction
)(RelatedItemList);