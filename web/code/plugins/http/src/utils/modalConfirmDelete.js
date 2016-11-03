import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Modal, ModalClose } from 'react-modal-bootstrap';
import { reduxForm } from 'redux-form';
import shallowCompare from 'react-addons-shallow-compare';
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
    const { fields: {
              oldCatalogName,newCatalogName,validateCatalogName
          } } = props;
    const { isOpen, isClose, handleSubmitCatalog, onSubmit } = this.props;

    return(
          <div  className="addMyCatalog">
            <Modal isOpen={isOpen} >
              <div className="modal-header">
                <ModalClose onClick={isClose}/>
                <h1 className="modal-title">Delete Item</h1>
              </div>
              <div className="modal-body">
                Are you sure you want to delete this item?
                <br/>
              </div>
              <div className="modal-footer">
                  <button type="button" className="btn btn-default btn-radius" onClick={onSubmit}>
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
module.exports = ModalMyCatalog;
