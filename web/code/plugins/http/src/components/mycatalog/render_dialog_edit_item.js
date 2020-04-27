import React, { Component } from 'react'
import { Modal, ModalClose } from 'react-modal-bootstrap'
import numberFormat from '../../utils/convertNumberformat';

import 'react-dual-listbox/lib/react-dual-listbox.css';

class RenderDialogEditItem extends Component {
    constructor() {
        super()

    }

    changedPrice = (e) =>{
        const { that } = this.props;
        const { fields: { price} } = that.props;
        price.onChange(e.target.value)
        that.props.setEditItemDetails(true)
    }

    changedDescription = (e) =>{
        const { that } = this.props;
        const { fields: { description}} = that.props;
        description.onChange(e.target.value)
        that.props.setEditItemDetails(true)
    }

    changedNetVatPrice = (e) =>{
        const { that } = this.props;
        const { fields: { netVatPrice} } = that.props;
        netVatPrice.onChange(e.target.value)
        that.props.setEditItemDetails(true)
    }

    render(){
        const { that } = this.props;
        const { fields: { description, price, netVatPrice}, yingCatalogDetail, editItemReference, isEditItemDetails, itemDetail, listItem } = that.props;

        const userLogin = JSON.parse(sessionStorage.logindata);
        const { currency } = userLogin

        let displaySetCurrency = currency
        
        if (!isEditItemDetails) {
            if (!!yingCatalogDetail) {
                const { items } = yingCatalogDetail
                
                if (items.length != 0) {
                    const [filterItem] = items.filter(item=>item.reference == editItemReference)
                    if (!!filterItem) {
                        const { description, priceInHomeCurrency } = filterItem;
                        initData(that.props.fields, description, priceInHomeCurrency)  
                    }
                    displaySetCurrency = displayCurrency == '' 
                        ? (yingCatalogDetail.setCurrency == '' || yingCatalogDetail.setCurrency == undefined) ? currency: yingCatalogDetail.setCurrency
                        : displayCurrency
                }
            } else {
                if (editItemReference != '') {
                    if (itemDetail != null) {
                        const { reference } = itemDetail
                        if (reference == editItemReference) {
                            const { description, priceInHomeCurrency } = itemDetail;
                            initData(that.props.fields, description, priceInHomeCurrency)  
                        }
                    }
                }
            }   
        } else {
            if (description.value == undefined) {
                if (editItemReference != '') {
                    if (listItem.length != 0) {
                        const [filterItem] = listItem.filter(item=>item.reference == editItemReference)
                        if (!!filterItem) {
                            const { description, priceInHomeCurrency } = filterItem;
                            initData(that.props.fields, description, priceInHomeCurrency)  
                        }
                    }
                }   
            }
            if (description.value == '' && price.value == '') {
                if (editItemReference != '') {
                    if (listItem.length != 0) {
                        const [filterItem] = listItem.filter(item=>item.reference == editItemReference)
                        if (!!filterItem) {
                            const { description, priceInHomeCurrency } = filterItem;
                            initData(that.props.fields, description, priceInHomeCurrency)  
                        }
                    }
                }   
            }
        }

        return(
            <div className="">
                <Modal isOpen={that.state.isOpenEditItemDialog} onRequestHide={that.hideEditItemDialog}>
                    <div className="modal-header">
                        <ModalClose onClick={that.hideAddItemDialog}/>
                        <h1 className="modal-title">Add New Item</h1>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            <div className="col-md-11 relete_item col-sm-6  m-nopadding">
                                <label><b>Item Description</b></label>
                                <input type="text" className="form-control" {...description}  onChange={this.changedDescription}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-11 relete_item col-sm-6  m-nopadding">
                                <label><b>{`Retail Price (${displaySetCurrency})`}</b></label>
                                <input type="text" className="form-control" {...price} onChange={this.changedPrice}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-11 relete_item col-sm-6  m-nopadding">
                                <label><b>{`Net + VAT (${displaySetCurrency})`}</b></label>
                                <input type="text" className="form-control" {...netVatPrice} onChange={this.changedNetVatPrice}/>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <div className="text-center maring-t20 font-b">
                            <button id="export" className="btn btn-default btn-radius" onClick={that.saveEditItem.bind(this,editItemReference)}>
                                Save
                            </button>
                            <button className="btn btn-default btn-radius" onClick={that.hideEditItemDialog}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </Modal>
            </div>
        )
    }
}

module.exports = RenderDialogEditItem

const initData = (fields, _description, _priceInHomeCurrency)=>{   
    const { description, price } = fields;
    description.onChange(_description);
    price.onChange(numberFormat(_priceInHomeCurrency));
}

const editItemData = (reference, newDescription, newPrice) => item =>{
    const { description,  priceInHomeCurrency} = item;
    let newItem = {}
    if (item.reference == reference) {
        newItem = {...item, description: newDescription != ''? newDescription: description, priceInHomeCurrency: newPrice != ''? newPrice: priceInHomeCurrency}
    } else {
        newItem = {...item}
    }
    return newItem
}