import React, { Component } from 'react';
import { connect } from 'react-redux';
import shallowCompare from 'react-addons-shallow-compare';
import RenderViewSetDetailHeaderEdit from './render_view_set_detail_header_edit'
import RenderViewSetDetailItemEdit from './render_view_set_detail_item_edit'
import RenderViewSetDetailAddress from './render_view_set_detail_address'
import RenderDialogAddItem from './render_dialog_add_item'
import RenderDialogEditItemEdit from './render_dialog_edit_item_edit'
import * as yingsetaction from '../../actions/yingsetaction';

class RenderViewItemDetailEdit extends Component {
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
        return(<RenderDialogEditItemEdit that={this}/>)
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
        const { fields: { description, price, itemDescriptionLanguage, netVatPrice, changedSize, setCurrency }, listItem } = this.props; 
        const limitNum = changedSize.value != 0 ? changedSize.value: 100;
        
        const newListItem = listItem.map(
            editItemData(
                reference
                , description.value.substring(0, limitNum)
                , Number(price.value.replace(/,/g,''))
                , itemDescriptionLanguage.value
                , Number(!netVatPrice.value?0 :netVatPrice.value.replace(/,/g,''))
                , setCurrency
            )
        )
        this.props.setItemList(newListItem)
        this.props.setEditItemDetails(false)
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
        const {
            editItemDetail, fields, listItem, setDetailAddress, setDetailRemark, yingCatalogDetail, yingCatalogDetailStatus, displayCurrency
        } = this.props;        
        return(
            <div hidden={!editItemDetail}>
                <RenderViewSetDetailHeaderEdit fields={fields} listItem={listItem} yingCatalogDetail={yingCatalogDetail}
                    yingCatalogDetailStatus={yingCatalogDetailStatus} props={this.props} displayCurrency={displayCurrency}/>
                <RenderViewSetDetailItemEdit onClickAddItem={this.onClickAddItem} listItem={listItem} onClickEditItem={this.onClickEditItem}
                    onClickDeleteItem={this.onClickDeleteItem} yingCatalogDetail={yingCatalogDetail} yingCatalogDetailStatus={yingCatalogDetailStatus}
                    displayCurrency={displayCurrency}/>
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
        displayCurrency: state.myCatalog.displayCurrency,
	}
}

module.exports = connect(mapStateToProps, yingsetaction)(RenderViewItemDetailEdit);

const editItemData = (reference, newDescription, newPrice, newItemDescriptionLanguage, newNetVatPrice, setCurrency) => item =>{
    let { description,  priceInHomeCurrency, itemDescriptionLanguage, netVatPrice, priceInCurrency} = item;
    switch (setCurrency.value) {
        case 'USD':
            priceInCurrency = {...priceInCurrency, 'USD': newPrice}       
            break;
        case 'CHF':
            priceInCurrency = {...priceInCurrency, 'CHF': newPrice}       
            break;
        case 'JOD':
            priceInCurrency = {...priceInCurrency, 'JOD': newPrice}       
            break;
        case 'KWD':
            priceInCurrency = {...priceInCurrency, 'KWD': newPrice}       
            break;
        case 'OMR':
            priceInCurrency = {...priceInCurrency, 'OMR': newPrice}       
            break;
        case 'QAR':
            priceInCurrency = {...priceInCurrency, 'QAR': newPrice}       
            break;
        case 'SAR':
            priceInCurrency = {...priceInCurrency, 'SAR': newPrice}       
            break;
    
        default:
            break;
    }
    let newItem = {}
    if (item.reference == reference) {
        newItem = {
            ...item
            , description: newDescription != ''? newDescription: description
            , priceInHomeCurrency: newPrice != ''? newPrice: priceInHomeCurrency
            , itemDescriptionLanguage: newItemDescriptionLanguage != ''? newItemDescriptionLanguage: itemDescriptionLanguage
            , netVatPrice: newNetVatPrice != ''? newNetVatPrice: netVatPrice
            , priceInCurrency
        }
    } else {
        newItem = {...item}
    }
    return newItem
}