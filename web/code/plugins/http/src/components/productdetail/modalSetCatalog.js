import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Modal, ModalClose } from 'react-modal-bootstrap';
import { reduxForm } from 'redux-form';

let _ = require('lodash');

class ModalSetCatalog extends Component {

    constructor(props) {
        super(props);
    }
    render() {
        const { props } = this.props;
        const { fields: { oldSetCatalogName,newSetCatalogName,validateCatalogName } } = props;
        const { listCatalogName,isOpen, isClose, handleSubmitCatalog, onSubmit } = this.props;
        let nameDisable = false;

        if(oldSetCatalogName.value){
            nameDisable = true
        }

        return(
            <div  className="addMyCatalog">
                <Modal isOpen={isOpen} >
                    <div className="modal-header">
                        <ModalClose onClick={isClose}/>
                        <h1 className="modal-title">ADD TO SET CATALOG</h1>
                    </div>
                    <div className="modal-body">
                        <b>Add this Set to:</b>
                        <br/>
                        <div className="col-sm-12 maring-b10 maring-t10">
                            <div className="col-sm-6">
                                <label className="col-sm-12 control-label">Set Catalog exists</label>
                            </div>
                            <div className="col-sm-6">
                                <select className="form-control" {...oldSetCatalogName}>
                                  <option key={''} value={''}>{'Please selected'}</option>
                                    {listCatalogName.map(setCatName =>
                                        {
                                            return(!setCatName.shared ? <option key={setCatName._id} value={setCatName._id}>{setCatName.setCatalog}</option>: <option className="hidden" key={setCatName._id} value={setCatName._id}>{setCatName.setCatalog}</option>);
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                        <div className="col-md-12 maring-b10">
                            <div className="col-sm-6">
                                <label className="col-sm-12 control-label">Or New Set Catalog</label>
                            </div>
                            <div className="col-sm-6">
                                <input type="text" className="form-control" {...newSetCatalogName} disabled={nameDisable}/>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-default btn-radius" disabled={!validateCatalogName.error} onClick={onSubmit}>
                            Submit
                        </button>
                        <button type="button" className="btn btn-default btn-radius" onClick={isClose}>
                            Close
                        </button>
                    </div>
                </Modal>
            </div>
        );
    }
}
module.exports = ModalSetCatalog;
