import React, { Component } from 'react'
import { Modal, ModalClose } from 'react-modal-bootstrap'
import numberFormat from '../../utils/convertNumberformat';

import 'react-dual-listbox/lib/react-dual-listbox.css';

class RenderDialogEditItemEdit extends Component {
    constructor() {
        super()

        this.state = {
            disableDescription: false,
            isChangedLanguage: false,
            sizeDescription: 0
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

    changedSize = (e) =>{
        const { that } = this.props;
        const { fields: { changedSize} } = that.props;
        changedSize.onChange(Number(e.target.value))
        this.setState({sizeDescription: Number(e.target.value)})
    }

    changedDescription = (e) =>{
        const { that } = this.props;
        const { fields: { description, changedSize} } = that.props;
        const limitNum = this.state.sizeDescription != 0 ? this.state.sizeDescription: 100;
        let textDescription = e.target.value
        console.log({textDescription});
        console.log('textDescription.length-->',textDescription.length);
        
        if (textDescription.length > limitNum) {
            textDescription = textDescription.substring(0, limitNum);
            console.log({textDescription});
            console.log('textDescription.length-->',textDescription.length);
            description.onChange(textDescription)
            that.props.setEditItemDetails(true)
        } else {
            changedSize.onChange(0)
            description.onChange(e.target.value)
            that.props.setEditItemDetails(true)
        }
    }

    changedNetVatPrice = (e) =>{
        const { that } = this.props;
        const { fields: { netVatPrice} } = that.props;
        netVatPrice.onChange(e.target.value)
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
        const { fields: { description, price, itemDescriptionLanguage, netVatPrice }, 
            yingCatalogDetail, editItemReference, isEditItemDetails, itemDetail, displayCurrency
        } = that.props;
        const userLogin = JSON.parse(sessionStorage.logindata);
        const { currency } = userLogin

        let displaySetCurrency = currency
        
        if (!isEditItemDetails) {
            if (!!yingCatalogDetail) {
                const { items } = yingCatalogDetail
                
                if (items.length != 0) {
                    displaySetCurrency = displayCurrency == '' 
                        ? (yingCatalogDetail.setCurrency == '' || yingCatalogDetail.setCurrency == undefined) ? currency: yingCatalogDetail.setCurrency
                        : displayCurrency
                    const [filterItem] = items.filter(item=>item.reference == editItemReference)
                    if (!!filterItem) {
                        const { description, priceInCurrency, itemDescriptionLanguage, netVatPrice } = filterItem;
                        initData(that.props.fields, description, priceInCurrency[displaySetCurrency], itemDescriptionLanguage, this.state.isChangedLanguage, netVatPrice)  
                    }
                    
                }
            } else {
                if (editItemReference != '') {
                    displaySetCurrency = that.props.displayCurrency || 'USD'
                    if (itemDetail != null) {
                        const { reference } = itemDetail
                        if (reference == editItemReference) {
                            const { description, priceInCurrency, itemDescriptionLanguage, netVatPrice } = itemDetail;
                            initData(that.props.fields, description, priceInCurrency[displaySetCurrency], itemDescriptionLanguage, this.state.isChangedLanguage, netVatPrice)  
                        }
                    }
                }
            }   
        } else {
            if (!!yingCatalogDetail) {
                displaySetCurrency = displayCurrency == '' 
                    ? (yingCatalogDetail.setCurrency == '' || yingCatalogDetail.setCurrency == undefined) ? currency: yingCatalogDetail.setCurrency
                    : displayCurrency
            } else {
                if (editItemReference != '') {
                    displaySetCurrency = that.props.displayCurrency || 'USD'
                }
            }
        }

        return(
            <div className="">
                <Modal isOpen={that.state.isOpenEditItemDialog} onRequestHide={that.hideEditItemDialog}>
                    <div className="modal-header">
                        <ModalClose onClick={that.hideEditItemDialog}/>
                        <h1 className="modal-title">Edit Item</h1>
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
                                <label><b>Please select size of description.</b></label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-11 relete_item col-sm-6  m-nopadding">
                                <select className="form-control " onChange={this.changedSize}>
                                    <option key={''} value={''}>{'Please select Size'}</option>
                                    <option key="100" value="100">100</option>
                                    <option key="90" value="90">90</option>
                                    <option key="80" value="80">80</option>
                                    <option key="70" value="70">70</option>
                                    <option key="60" value="60">60</option>
                                </select>
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
                            <button id="export" className="btn btn-default btn-radius" onClick={that.saveEditItem.bind(this, editItemReference)}>
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

const initData = (fields, _description, _priceInHomeCurrency, _itemDescriptionLanguage, isChangedLanguage, _netVatPrice)=>{   
    const { description, price, itemDescriptionLanguage, netVatPrice } = fields;
    
    description.onChange(_description);
    price.onChange(numberFormat(_priceInHomeCurrency));
    if (!isChangedLanguage) {
        itemDescriptionLanguage.onChange(_itemDescriptionLanguage);
    }
    netVatPrice.onChange(numberFormat(_netVatPrice));
}