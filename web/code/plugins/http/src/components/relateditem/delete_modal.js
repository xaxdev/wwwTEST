import React, { Component } from 'react';
import {Modal, ModalClose} from 'react-modal-bootstrap';
class DeleteModal extends Component {
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
        const { deleteRelatedItem, params } = this.props
        const param = {
            ...params,
            id: this.props.id,
            status: !this.props.status
        }
        this.setState({ isOpen: false });
        deleteRelatedItem(param)
    };

    render (){
        return(
            <div key={this.props.id} className="img-center">
                <button className="btn btn-primary pull-xs-right btn-radius" onClick={this.openModal}>
                    { this.props.status ? 'Delete Related Items ':'Active Related Items ' }
                </button>
                <Modal isOpen={this.state.isOpen} onRequestHide={this.hideModal}>
                    <div className="modal-header">
                        <ModalClose onClick={this.hideModal}/>
                        <h1 className="modal-title">{ this.props.status ? 'Delete Related Items ':'Active Related Items ' }</h1>
                    </div>
                    <div className="modal-body">
                        <h3>Are you sure!</h3>
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-default btn-radius" onClick={this.hideModal}>
                            No
                        </button>
                        <button className="btn btn-primary btn-radius" onClick={this.confirmDisableModal } key={this.props.id}>
                            Yes
                        </button>
                    </div>
                </Modal>
            </div>
        );
    }
}

module.exports = DeleteModal
