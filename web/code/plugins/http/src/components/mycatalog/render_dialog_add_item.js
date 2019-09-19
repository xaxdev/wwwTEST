import React, { Component } from 'react'
import { Modal, ModalClose } from 'react-modal-bootstrap'

import 'react-dual-listbox/lib/react-dual-listbox.css';

class RenderDialogAddItem extends Component {
    constructor() {
        super()
    }

    render(){
        const { that } = this.props;
        const { fields: { reference } } = that.props;
        
        return(
            <div className="">
                <Modal isOpen={that.state.isOpenAddItemDialog} onRequestHide={that.hideAddItemDialog}>
                    <div className="modal-header">
                        <ModalClose onClick={that.hideAddItemDialog}/>
                        <h1 className="modal-title">Add New Item</h1>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            <div className="col-md-11 relete_item col-sm-6  m-nopadding">
                                <label><b>Item Reference</b></label>
                                <input type="text" className="form-control" {...reference} />
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <div className="text-center maring-t20 font-b">
                            <button id="export" className="btn btn-default btn-radius" onClick={that.addedNewItem}>
                                Save
                            </button>
                            <button className="btn btn-default btn-radius" onClick={that.hideAddItemDialog}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </Modal>
            </div>
        )
    }
}

module.exports = RenderDialogAddItem