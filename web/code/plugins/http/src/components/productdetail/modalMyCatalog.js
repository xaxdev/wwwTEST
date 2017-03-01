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

  handleChange = () => {
    const { props } = this.props;
    // console.log('props-->',props);
    const { fields: {
              oldCatalogName,newCatalogName,validateCatalogName
          } } = props;
  }

  render() {
    const { props } = this.props;
    // console.log('props-->',props);
    const { fields: {
              oldCatalogName,newCatalogName,validateCatalogName
          } } = props;
    const { listCatalogName,isOpen, isClose, handleSubmitCatalog, onSubmit } = this.props;
    let nameDisable = false;

    if(oldCatalogName.value){
      nameDisable = true
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
                <div className="col-md-12 maring-b10">
                    <div className="col-sm-6">
                        <label className="col-sm-12 control-label">Or New Catalog</label>
                    </div>
                    <div className="col-sm-6">
                        <input type="text" className="form-control" {...newCatalogName} disabled={nameDisable}/>
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
