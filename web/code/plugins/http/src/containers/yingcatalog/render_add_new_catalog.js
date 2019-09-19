import React, { Component } from 'react'
import { Modal, ModalClose } from 'react-modal-bootstrap'

import 'react-dual-listbox/lib/react-dual-listbox.css';

class RenderAddNewCatalog extends Component {
    constructor() {
        super()
    }

    render(){
        const { that } = this.props;
        const { fields: { yingCatalogName } } = that.props;
        return(
            <div className="">
                <Modal isOpen={that.state.isOpenAddNewCatalogDialog} onRequestHide={that.hideCatalogNameDialog}>
                    <div className="modal-header">
                        <ModalClose onClick={that.hideCatalogNameDialog}/>
                        <h1 className="modal-title">Add New Catalog</h1>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            <div className="col-md-11 relete_item col-sm-6  m-nopadding">
                                <label><b>Catalog Name</b></label>
                                <input type="text" className="form-control" {...yingCatalogName} />
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <div className="text-center maring-t20 font-b">
                            <button id="export" className="btn btn-default btn-radius" onClick={that.addedNewCatalog}>
                                Save
                            </button>
                            <button className="btn btn-default btn-radius" onClick={that.hideCatalogNameDialog}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </Modal>
            </div>
        )
    }
}

module.exports = RenderAddNewCatalog