import React, { Component, PropTypes } from 'react';
import { reduxForm, reset } from 'redux-form';
import { Modal, ModalClose } from 'react-modal-bootstrap';

import DualListBox from 'react-dual-listbox';
import 'react-dual-listbox/lib/react-dual-listbox.css';

const options = [
    { value: 'reference', label: 'Item Reference' },
    { value: 'description', label: 'Item Description' },
    { value: 'sku', label: 'SKU' },
    { value: 'company', label: 'Company' },
    { value: 'warehouse', label: 'Location' },
    { value: 'size', label: 'Size' },
    { value: 'jewelsWeight', label: 'Jewelry Weight' },
    { value: 'grossWeight', label: 'Item Weight (Grams)' },
    { value: 'stoneDetail', label: 'Stone Detail' },
    { value: 'priceUSD', label: 'Price' },
    { value: 'categoryName', label: 'Category Name' },
    { value: 'category', label: 'Category' },
    { value: 'article', label: 'Article' },
];

class RenderChangeTitleListBox extends Component {
    constructor() {
        super();

        this.onChange = this.onChange.bind(this);

        this.state = {
            selected: []
        };

    }
    onChange = (selected) => {
        // handle selected values here
        console.log('selectedValues-->',selected);
        this.setState({ selected });
    }
    render(){
        const { that, userLogin, checkFields, labels, selectedAllFields, selectedNoAllFields } = this.props;
        const { selected } = this.state;
        let checkAll = true;

        return(
            <div className="popexport">
                <Modal isOpen={that.state.isOpenChangeTitle} onRequestHide={that.hideChangeTitle}>
                    <div className="modal-header">
                        <ModalClose onClick={that.hideChangeTitle}/>
                        <h1 className="modal-title">Changed Title</h1>
                    </div>
                    <div className="modal-body">
                        <h3>Please select field for title.</h3>
                        <br/>
                        <DualListBox canFilter options={options} selected={selected} onChange={this.onChange} />
                    </div>
                    <div className="modal-footer">
                        <button id="export" className="btn btn-default btn-radius" onClick={that.confirmExport}>
                            Changed
                        </button>
                        <button className="btn btn-default btn-radius" onClick={that.hideChangeTitle}>
                            Cancel
                        </button>
                    </div>
                </Modal>
            </div>
        );
    }
}

module.exports = RenderChangeTitleListBox
