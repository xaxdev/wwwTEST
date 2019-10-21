import React, { Component } from 'react';
import { Modal, ModalClose } from 'react-modal-bootstrap';

class ModalAlertMsgYingPdf extends Component {
    constructor(props) {
        super(props);
    }

    onChange = (e) =>{
        const target = e.target;
        const { pdfLanguage} = this.props;
        pdfLanguage.onChange(target.value)
    }

    render() {
        const { isOpen, isClose, message:{messageOne, messageTwo}, title, onSubmit, pdfLanguage} = this.props;
        
        return(
            <div  className="addMyCatalog">
                <Modal isOpen={isOpen} >
                    <div className="modal-header">
                        <ModalClose onClick={isClose}/>
                        <h1 className="modal-title">{title}</h1>
                    </div>
                    <div className="modal-body">
                        <div className="text-center maring-t20 font-b">
                            {messageOne}
                            <br/>
                            {messageTwo}
                        </div>
                        <div className="text-center maring-t20 font-b">
                            <label className="pure-checkbox" >
                                <input type="radio" {...pdfLanguage} name="eng" value="eng" checked={pdfLanguage.value === 'eng'}
                                    onChange={this.onChange}/> English
                            </label>
                            &nbsp;&nbsp;
                            <label className="pure-checkbox" >
                                <input type="radio" {...pdfLanguage} name="arb" value="arb" checked={pdfLanguage.value === 'arb'}
                                    onChange={this.onChange}/> Arabic
                            </label>
                        </div>
                    </div>
                    <div className="modal-footer maring-t20">
                        <button type="button" className="btn btn-default btn-radius" disabled={pdfLanguage.value == undefined? true: false} 
                            onClick={onSubmit}>
                            Yes
                        </button>
                        <button type="button" className="btn btn-default btn-radius" onClick={isClose}>
                            No
                        </button>
                    </div>
                </Modal>
            </div>
        );
    }
}
module.exports = ModalAlertMsgYingPdf
