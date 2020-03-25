import React, { Component } from 'react';
import { Modal, ModalClose } from 'react-modal-bootstrap';
const Loading = require('react-loading');
import '../../../../public/css/react-multi-select.css';

class ModalLoader extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { isOpen } = this.props;

        return(
            <div  className="addMyCatalog">
                <Modal isOpen={isOpen} >
                    <div>
                        <center>
                            <br/><br/>
                            <h3>Please wait....</h3>
                            <br/><br/><br/><br/><br/><br/>
                            <Loading type="spin" color="#202020" width="20%"/>
                        </center>
                        <br/><br/><br/><br/><br/><br/>
                    </div>
                </Modal>
            </div>
        );
    }
}
module.exports = ModalLoader;
