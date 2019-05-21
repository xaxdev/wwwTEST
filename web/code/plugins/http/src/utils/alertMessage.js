import React, { Component } from 'react';
import {Modal, ModalClose} from 'react-modal-bootstrap';
class AlertMessage extends Component {
    constructor(props) {
        super(props);

        this.openModal = this.openModal.bind(this);
        this.state = {
            isOpen: true
        };
    }

    openModal(){
        this.setState({isOpen: true});
    };

    hideModal = () => {
        this.setState({ isOpen: false });
    };

    render (){
        return(
            <div key={this.props.statusCode}>
                <Modal isOpen={this.state.isOpen} onRequestHide={this.hideModal}>
                    <div className="modal-header">
                        <ModalClose onClick={this.hideModal}/>
                        <h1 className="modal-title">Message</h1>
                    </div>
                    <div className="modal-body">
                        <h3>Category have been changed!</h3>
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-default btn-radius" onClick={this.confirmModal}>
                           Ok
                        </button>
                        <button className="btn btn-default btn-radius" onClick={this.hideModal}>
                            Cancel
                        </button>
                    </div>
                </Modal>
            </div>
        );
    }
}

export default AlertMessage;
