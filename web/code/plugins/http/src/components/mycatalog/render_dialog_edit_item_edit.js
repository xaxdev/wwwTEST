import React, { Component } from 'react'
import { Modal, ModalClose } from 'react-modal-bootstrap'
import numberFormat from '../../utils/convertNumberformat';

import 'react-dual-listbox/lib/react-dual-listbox.css';

class RenderDialogEditItemEdit extends Component {
    constructor() {
        super()

        this.state = {
            disableDescription: false,
            isChangedLanguage: false
        }

    }

    componentDidMount = _ => {

    }

    changedPrice = (e) =>{
        const { that } = this.props;
        const { fields: { price} } = that.props;
        price.onChange(e.target.value)
        that.props.setEditItemDetails(true)
    }

    changedDescription = (e) =>{
        const { that } = this.props;
        const { fields: { description} } = that.props;
        description.onChange(e.target.value)
        that.props.setEditItemDetails(true)
    }

    onChange = (e) =>{
        const target = e.target;
        const { that } = this.props;
        const { fields: { itemDescriptionLanguage}} = that.props;
        itemDescriptionLanguage.onChange(target.value)
        this.setState({isChangedLanguage: true})
    }

    render(){
        const { that } = this.props;
        const { fields: { description, price, itemDescriptionLanguage }, yingCatalogDetail, editItemReference, isEditItemDetails, itemDetail } = that.props;
        
        if (!isEditItemDetails) {
            if (!!yingCatalogDetail) {
                const { items } = yingCatalogDetail
                
                if (items.length != 0) {
                    const [filterItem] = items.filter(item=>item.reference == editItemReference)
                    if (!!filterItem) {
                        const { description, priceInHomeCurrency, itemDescriptionLanguage } = filterItem;
                        initData(that.props.fields, description, priceInHomeCurrency, itemDescriptionLanguage, this.state.isChangedLanguage)  
                    }
                }
            } else {
                if (editItemReference != '') {
                    if (itemDetail != null) {
                        const { reference } = itemDetail
                        if (reference == editItemReference) {
                            const { description, priceInHomeCurrency, itemDescriptionLanguage } = itemDetail;
                            initData(that.props.fields, description, priceInHomeCurrency, itemDescriptionLanguage, this.state.isChangedLanguage)  
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
                                <label><b>Please select language.</b></label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-11 relete_item col-sm-6  m-nopadding">
                                <label className="pure-checkbox" >
                                    <input type="radio" {...itemDescriptionLanguage} name="eng" value="eng" checked={itemDescriptionLanguage.value === 'eng'}
                                        onChange={this.onChange}/> English
                                </label>
                                &nbsp;&nbsp;
                                <label className="pure-checkbox" >
                                    <input type="radio" {...itemDescriptionLanguage} name="arb" value="arb" checked={itemDescriptionLanguage.value === 'arb'}
                                        onChange={this.onChange}/> Arabic
                                </label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-11 relete_item col-sm-6  m-nopadding">
                                <label><b>Item Description</b></label>
                                {itemDescriptionLanguage.value === 'arb'
                                    ? <input type="text" className="form-control" {...description} disabled={this.state.disableDescription} dir="rtl"
                                        onChange={this.changedDescription}/>
                                    : <input type="text" className="form-control" {...description} disabled={this.state.disableDescription}
                                        onChange={this.changedDescription}/>
                                }
                                
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-11 relete_item col-sm-6  m-nopadding">
                                <label><b>Retail Price (USD)</b></label>
                                <input type="text" className="form-control" {...price} onChange={this.changedPrice}/>
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

module.exports = RenderDialogEditItemEdit

const initData = (fields, _description, _priceInHomeCurrency, _itemDescriptionLanguage, isChangedLanguage)=>{   
    const { description, price, itemDescriptionLanguage } = fields;
    
    description.onChange(_description);
    price.onChange(numberFormat(_priceInHomeCurrency));
    if (!isChangedLanguage) {
        itemDescriptionLanguage.onChange(_itemDescriptionLanguage);
    }
}