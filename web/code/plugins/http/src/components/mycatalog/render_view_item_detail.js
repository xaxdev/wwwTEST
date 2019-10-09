import React, { Component } from 'react';
import { connect } from 'react-redux';
import shallowCompare from 'react-addons-shallow-compare';
import RenderViewSetDetailHeader from './render_view_set_detail_header'
import RenderViewSetDetailItem from './render_view_set_detail_item'
import RenderViewSetDetailAddress from './render_view_set_detail_address'
import RenderDialogAddItem from './render_dialog_add_item'
import RenderDialogEditItem from './render_dialog_edit_item'
import * as yingsetaction from '../../actions/yingsetaction';

class RenderViewItemDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpenAddItemDialog: false,
            isOpenEditItemDialog: false,
            address: null,
            remark: null
        }
    }

    shouldComponentUpdate = (nextProps, nextState)=> {
        const { listItem, isDeletedItem } = this.props;        
        const { itemDetail } = nextProps;

        if (!isDeletedItem) {
            if (itemDetail != null) {
                const findItem = listItem.findIndex(item=>item.reference === itemDetail.reference)
                if (findItem == -1) {
                    listItem.push(itemDetail)
                    this.props.setItemList(listItem)
                } 
            }   
        }

        return shallowCompare(this, nextProps, nextState);
    }

    renderAddItemDialog = _=>{
        return(<RenderDialogAddItem that={this}/>)
    }

    renderEditItemDialog = _=>{
        return(<RenderDialogEditItem that={this}/>)
    }

    onClickAddItem = _=>{
        const { fields: { reference } } = this.props;
        reference.onChange('')
        this.setState({isOpenAddItemDialog: true})
        this.props.setYingEditItemReference(null)
    }

    hideAddItemDialog = _=>{
        this.setState({isOpenAddItemDialog: false})
    }

    addedNewItem = _=>{
        const { fields: { reference } } = this.props;
        const params = {
            reference: reference.value
        }
        this.props.getItemDetail(params)
        .then(()=>{
            this.props.setYingDeletedItem(false)
            this.props.setYingEditItemReference(null)
            this.setState({isOpenAddItemDialog: false})
        })
    }

    onClickEditItem = (id)=>{
        const { fields: { description, price } } = this.props;
        description.onChange('')
        price.onChange('')
        this.setState({isOpenEditItemDialog: true})
        this.props.setYingDeletedItem(false)
        this.props.setYingEditItemReference(id)
        
    }

    hideEditItemDialog = _=>{
        this.setState({isOpenEditItemDialog: false})
    }

    saveEditItem = (reference)=>{
        const { fields: { description, price }, listItem } = this.props;
        const newListItem = listItem.map(editItemData(reference, description.value, Number(price.value.replace(/,/g,''))))
        this.props.setItemList(newListItem)
        this.setState({isOpenEditItemDialog: false})
    }

    onClickDeleteItem = async (id)=>{
        const { listItem } = this.props;
        const newListItem = listItem.filter(item=>item.reference !== id)
        await this.props.setYingDeletedItem(true)
        await this.props.setYingEditItemReference(null)
        this.props.setItemList(newListItem)
    }

    addressOnChanged = (e)=>{
        this.props.setYingSetDetailAddress(e.target.value)
    }

    remarkOnChanged = (e)=>{
        this.props.setYingSetDetailRemark(e.target.value)
    }

    render = _ => {
        const { addItemDetail, fields, listItem, setDetailAddress, setDetailRemark } = this.props;
        return(
            <div hidden={!addItemDetail}>
                <RenderViewSetDetailHeader fields={fields} listItem={listItem} props={this.props}/>
                <RenderViewSetDetailItem onClickAddItem={this.onClickAddItem} listItem={listItem} onClickEditItem={this.onClickEditItem}
                    onClickDeleteItem={this.onClickDeleteItem}/>
                <RenderViewSetDetailAddress stateAddress={setDetailAddress} stateRemark={setDetailRemark} addressOnChanged={this.addressOnChanged} 
                    remarkOnChanged={this.remarkOnChanged} />
                {this.renderAddItemDialog()}
                {this.renderEditItemDialog()}
            </div>
        )
    }
}

function mapStateToProps(state) {
	return {
        productdetail: state.productdetail.detail,
        itemDetail: state.myCatalog.yingItemDetail,
        listItem: state.myCatalog.listItem,
        isDeletedItem: state.myCatalog.isDeletedItem,
        editItemReference: state.myCatalog.editItemReference,
        setDetailAddress: state.myCatalog.setDetailAddress,
        setDetailRemark: state.myCatalog.setDetailRemark,
        isEditItemDetails: state.myCatalog.isEditItemDetails,
	}
}

module.exports = connect(mapStateToProps, yingsetaction)(RenderViewItemDetail);

const editItemData = (reference, newDescription, newPrice) => item =>{
    const { description,  priceInUSD} = item;
    let newItem = {}
    if (item.reference == reference) {
        newItem = {...item, description: newDescription != ''? newDescription: description, priceInUSD: newPrice != ''? newPrice: priceInUSD}
    } else {
        newItem = {...item}
    }
    return newItem
}