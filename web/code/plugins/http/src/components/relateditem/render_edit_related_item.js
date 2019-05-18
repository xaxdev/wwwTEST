import React, { Component, PropTypes } from 'react'
import { Modal, ModalClose } from 'react-modal-bootstrap'

import DualListBox from 'react-dual-listbox';
import 'react-dual-listbox/lib/react-dual-listbox.css';

class RenderAddRelatedItem extends Component {
    constructor() {
        super();

        this.onChange = this.onChange.bind(this);
        this.keyItem = this.keyItem.bind(this);

        this.state = {
            selected: [],
            maxColumn: false
        };

    }

    onChange = (selected) => {
        const { that } = this.props;
        that.props.setRelatedItem(selected)
    }
    
    keyItem = (event) => {
        const { that } = this.props
        const { relatedItemSource } = that.props

        if (event.key === 'Enter') {
            const data = event.target.value
            const listData = data.split(',')
            const mapItem = item => {
                return { value: item, label: item }
            }
            let listItem = listData.map(mapItem)
            
            const concatAndDeDuplicateObjects = (p, ...arrs) => [ ...new Set( [].concat(...arrs).map(a => JSON.stringify(a)) ) ].map(a => JSON.parse(a))

            listItem = concatAndDeDuplicateObjects('value', listItem, relatedItemSource);

            that.props.setRelatedItemSource([...listItem])
        }
    }
    render(){
        const { that } = this.props;
        const { fields: { relatedListName, relatedItemInput }, relatedItem, relatedItemSource, relatedItemEdit } = that.props
        if (relatedItemEdit != null) {
            return(
                <div className="popexport">
                    <Modal isOpen={that.state.isOpenDialog} onRequestHide={that.hideAddRelatedItem}>
                        <div className="modal-header">
                            <ModalClose onClick={that.hideAddRelatedItem}/>
                            <h1 className="modal-title">Edit Related Details</h1>
                        </div>
                        <div className="modal-body">
                            <div className="col-md-5 relete_item col-sm-6  m-nopadding">
                                <label><b>List Name</b></label>
                                <input type="text" className="form-control" {...relatedListName}/>
                            </div>
                            <div className="col-md-12 relete_item maring-t10 nopadding">
                                <div className="col-md-5 col-sm-6  m-nopadding">
                                    <label><b>Please Enter Item Reference</b></label>
                                    <input type="text" className="form-control" onKeyPress={this.keyItem} {...relatedItemInput}/>
                                </div>
                            </div>
                            <div className="col-md-12 maring-t10">
                                <DualListBox name="moons" canFilter options={relatedItemSource} onChange={this.onChange} selected={relatedItem}
                                    preserveSelectOrder showOrderButtons />
                            </div>
                            <div className="col-xs-offset-3 col-sm-6">
                                <div className="text-center mg-tb">
                                </div>
                            </div>
                        </div>

                        <div className="modal-footer">
                            <div className="col-sm-12">
                                <button id="export" className="btn btn-default btn-radius" onClick={that.editRelatedItem}>
                                    Save
                                </button>
                                <button className="btn btn-default btn-radius" onClick={that.hideAddRelatedItem}>
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </Modal>
                </div>
            );
        }else{
            return(
                <div className="popexport"></div>
            )
        }
    }
}

module.exports = RenderAddRelatedItem
