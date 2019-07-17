import React, { Component } from 'react';
import { Modal, ModalClose } from 'react-modal-bootstrap';

class ModalAlertMsg extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { isOpen, isClose, message, title} = this.props;
        return(
            <div  className="addMyCatalog">
                <Modal isOpen={isOpen} >
                    <div className="modal-header">
                        <ModalClose onClick={isClose}/>
                        <h1 className="modal-title">{title}</h1>
                    </div>
                    <div className="modal-body">
                        <div className="text-center maring-t20 font-b">
                            {message}
                        </div>
                    </div>
                    <div className="modal-footer maring-t20">
                        <button type="button" className="btn btn-default btn-radius" onClick={isClose}>
                            Ok
                        </button>
                    </div>
                </Modal>
            </div>
        );
    }
}
module.exports = ModalAlertMsg
