import React, { Component } from 'react';
import {Modal, ModalClose} from 'react-modal-bootstrap';
class UsersModal extends Component {
    constructor(props) {
        super(props);

        this.openModal = this.openModal.bind(this);
        
        this.state = {
            isOpen: false
        };
    }
    openModal(){
        this.setState({ isOpen: true });
    };

    hideModal = () => {
        this.setState({ isOpen: false });
    };

    confirmDisableModal = () => {
        this.setState({ isOpen: false });
        this.props.disableUser(this.props.user.id,!this.props.user.status)
    };

    render (){
        return(
            <div key={this.props.user.id}>
                <button className="btn btn-primary pull-xs-right btn-radius" onClick={this.openModal}>
                    { this.props.user.status ? 'Disable User ':'Active User ' }
                </button>
                <Modal isOpen={this.state.isOpen} onRequestHide={this.hideModal}>
                    <div className="modal-header">
                        <ModalClose onClick={this.hideModal}/>
                        <h1 className="modal-title">{ this.props.user.status ? 'Disable User ':'Active User ' }</h1>
                    </div>
                    <div className="modal-body">
                        <h3>Are you sure!</h3>
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-default btn-radius" onClick={this.hideModal}>
                            No
                        </button>
                        <button className="btn btn-primary btn-radius" onClick={this.confirmDisableModal } key={this.props.user.id}>
                            Yes
                        </button>
                    </div>
                </Modal>
            </div>
        );
    }
}

module.exports = UsersModal
