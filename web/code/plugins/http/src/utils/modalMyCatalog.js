import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Modal, ModalClose } from 'react-modal-bootstrap';
import { reduxForm } from 'redux-form';
// import validateCatalog from './validatecatalog';
let _ = require('lodash');

class ModalMyCatalog extends Component {

    constructor(props) {

        super(props);

  }

  hideModalAddMyCatalog = (e) => {
    e.preventDefault();
    // console.log('hi');
    // this.setState({isOpenAddMyCatalog: false});
    let { isOpen } = this.props;

    isOpen = false;

  }

  render() {
    const { props } = this.props;
    // console.log('props-->',props);
    const { fields: {
              oldCatalogName,newCatalogName,validateCatalogName
          } } = props;
    const { listCatalogName,isOpen, isClose, handleSubmitCatalog, onSubmit } = this.props;
    // console.log('validateCatalogName-->',validateCatalogName.error);
    return(
          <div  className="addMyCatalog">
            <Modal isOpen={isOpen} >
              <div className="modal-header">
                <ModalClose onClick={isClose}/>
                <h1 className="modal-title">ADD TO CATALOG</h1>
              </div>
              <div className="modal-body">
                Add this item to:
                <br/>
                <div className="col-sm-12">
                  <div className="col-sm-6">
                      <label className="col-sm-6 control-label">Catalog exits</label>
                  </div>
                  <div className="col-sm-6">
                      <select className="form-control" {...oldCatalogName}>
                        <option key={''} value={''}>{'Please selected'}</option>
                          {listCatalogName.map(catName =>
                              {
                                  return(<option key={catName._id} value={catName._id}>{catName.catalog}</option>);
                              })
                          }
                      </select>
                  </div>
                </div>
                <div className="col-md-12">
                    <div className="col-sm-6">
                        <label className="col-sm-6 control-label">Or New Catalog</label>
                    </div>
                    <div className="col-sm-6">
                        <input type="text" className="form-control" {...newCatalogName}/>
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
