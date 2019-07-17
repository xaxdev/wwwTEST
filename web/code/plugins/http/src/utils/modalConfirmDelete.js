import React, { Component } from 'react';
import { Modal, ModalClose } from 'react-modal-bootstrap';

class ModalMyCatalog extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { isOpen, isClose, onSubmit, message, title } = this.props;
        
        return(
            <div  className="addMyCatalog">
                <Modal isOpen={isOpen} >
                    <div className="modal-header">
                        <ModalClose onClick={isClose}/>
                        <h1 className="modal-title">{title}</h1>
                    </div>
                    <div className="modal-body">
                        <div className="text-center maring-t20 font-b">{message}</div>
                        <br/>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-default btn-radius" onClick={onSubmit}>
                            Yes
                        </button>
                        <button type="button" className="btn btn-default btn-radius" onClick={isClose}>
                            No
                        </button>
                        </div>
                </Modal>
            </div>
        )
    }
}
module.exports = ModalMyCatalog;
