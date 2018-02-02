import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Modal, ModalClose } from 'react-modal-bootstrap';
import { reduxForm } from 'redux-form';
import shallowCompare from 'react-addons-shallow-compare';
let _ = require('lodash');

class ModalMyCatalog extends Component {

    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return shallowCompare(this, nextProps, nextState);
    }

    hideModalAddMyCatalog = (e) => {
        e.preventDefault();

        let { isOpen } = this.props;
        isOpen = false;
    }

    render() {
        const { props } = this.props;
        const { fields: {
                  oldCatalogName,newCatalogName,validateCatalogName,oldSetCatalogName,newSetCatalogName
              } } = props;
        const { listCatalogName, listSetCatalogName,isOpen, isClose, handleSubmitCatalog, onSubmit } = this.props;
        let nameDisable = false;
        let nameSetDisable = false;

        if(oldCatalogName.value){
            nameDisable = true
        }
        if(oldSetCatalogName.value){
            nameSetDisable = true
        }

        return(
            <div  className="addMyCatalog">
              <Modal isOpen={isOpen} >
                <div className="modal-header">
                  <ModalClose onClick={isClose}/>
                  <h1 className="modal-title">ADD TO CATALOG</h1>
                </div>
                <div className="modal-body">
                  <b>Add this item to:</b>
                  <br/>
                  <div className="col-sm-12 maring-b10 maring-t10">
                    <div className="col-sm-6">
                        <label className="col-sm-12 control-label">Catalog exists</label>
                    </div>
                    <div className="col-sm-6">
                        <select className="form-control" {...oldCatalogName} >
                          <option key={''} value={''}>{'Please selected'}</option>
                            {listCatalogName.map(catName =>
                                {
                                    return(!catName.shared ? <option key={catName._id} value={catName._id}>{catName.catalog}</option>: <option className="hidden" key={catName._id} value={catName._id}>{catName.catalog}</option>);
                                })
                            }
                        </select>
                    </div>
                  </div>
                  <div className="col-md-12 maring-b10">
                      <div className="col-sm-6">
                          <label className="col-sm-12 control-label">Or New Catalog</label>
                      </div>
                      <div className="col-sm-6">
                          <input type="text" className="form-control" {...newCatalogName} disabled={nameDisable}/>
                      </div>
                  </div>
                  <div className="col-sm-12 maring-b10 maring-t10">
                    <div className="col-sm-6">
                        <label className="col-sm-12 control-label">Set Catalog exists</label>
                    </div>
                    <div className="col-sm-6">
                        <select className="form-control" {...oldSetCatalogName} >
                          <option key={''} value={''}>{'Please selected'}</option>
                            {listSetCatalogName.map(setCatName =>
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
                          <input type="text" className="form-control" {...newSetCatalogName} disabled={nameSetDisable}/>
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
module.exports = ModalMyCatalog;
