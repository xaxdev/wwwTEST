import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Modal, ModalClose } from 'react-modal-bootstrap';
import { reduxForm } from 'redux-form';
import ProductGalleryCOA from './productGalleryCOA';
let _ = require('lodash');

class ModalShowCOA extends Component {

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
      const { imagesCOA, isOpen, isClose, handleSubmitCatalog, onSubmit } = this.props;

      return(
            <div  className="addMyCatalog">
              <Modal isOpen={isOpen} >
                <div className="modal-body">
                    <ModalClose onClick={isClose}/>
                    <div>
                      <ProductGalleryCOA imagegallery={imagesCOA}/>
                    </div>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-default btn-radius" onClick={isClose}>
                        Close
                    </button>
                </div>
              </Modal>
            </div>
      );
  }
}
module.exports = ModalShowCOA;
