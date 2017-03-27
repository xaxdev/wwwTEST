import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Modal, ModalClose } from 'react-modal-bootstrap';
import { reduxForm } from 'redux-form';
import shallowCompare from 'react-addons-shallow-compare';
// import validateCatalog from './validatecatalog';
let _ = require('lodash');

class ModalConfirmDelete extends Component {
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
    const { isOpen, isClose, onSubmit, message, title } = this.props;

    return(
          <div  className="addMyCatalog">
            <Modal isOpen={isOpen} >
              <div className="modal-header">
                <ModalClose onClick={isClose}/>
                <h1 className="modal-title">{title}</h1>
              </div>
              <div className="modal-body">
                <div className="text-center maring-t20 font-b">{message}</div>
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
module.exports = ModalConfirmDelete;
