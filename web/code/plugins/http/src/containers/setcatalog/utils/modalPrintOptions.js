import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Modal, ModalClose } from 'react-modal-bootstrap';
import { reduxForm } from 'redux-form';
import shallowCompare from 'react-addons-shallow-compare';
import Select from 'react-select';
import numberFormat from '../../../utils/convertNumberformat';
let _ = require('lodash');
import '../../../../public/css/react-multi-select.css';

class ModalPrintOptions extends Component {

    constructor(props) {
        super(props);

    }

    hideModalAddMyCatalog = (e) => {
        e.preventDefault();
        let { isOpen } = this.props;
        isOpen = false;
    }

    render() {
        const { props, isOpen, isClose, onSubmit } = this.props;
        const { fields: { printPage, printPrice }, listSetCatalogItems } = props;
        const totalPages = numberFormat(!!listSetCatalogItems?listSetCatalogItems.total_pages:0);
        return(
              <div  className="addMyCatalog">
                <Modal isOpen={isOpen} >
                  <div className="modal-header">
                    <ModalClose onClick={isClose}/>
                    <h1 className="modal-title">MY CATALOG</h1>
                  </div>
                  <div className="modal-body bg-gray">
                    <div className="col-md-6 col-sm-6 col-xs-6 maring-b10 nopadding">
                      <b>Please select a print choices.</b>
                    </div>
                    <div className="col-md-6 col-sm-6 col-xs-6 pull-right maring-b10 text-right">
                      <b>{`Total: ${totalPages}`}</b>
                    </div>
                  </div>
                  <div className="modal-body">
                    <div className="col-md-12 maring-b10 nopadding">
                      <div className="col-sm-5 col-xs-5 nopadding">
                        <div className="col-sm-2 col-xs-2 nopadding"><b>Page</b></div>
                        <div className="col-sm-8 col-xs-8 nopadding">
                              <div className="radio">
                                  <input type="radio" {...printPage} value="all"
                                      checked={printPage.value === 'all'}
                                  />
                                  <label className="select"></label>
                                  <span className="margin-l10 text-vertical">All</span>
                              </div>
                              <div className="radio">
                                  <input type="radio" {...printPage} value="current"
                                      checked={printPage.value === 'current'}
                                  />
                                  <label className="select"></label>
                                  <span className="margin-l10 text-vertical">Current Page</span>
                              </div>
                        </div>
                      </div>
                      <div className="col-sm-1 col-xs-1">
                        <div className="border-line-right"></div>
                      </div>
                      <div className="col-sm-6 col-xs-6 nopadding">
                        <div className="col-sm-2 col-xs-2"><b>Price</b></div>
                        <div className="col-sm-10 col-xs-10">
                            <div className="radio">
                                <input type="radio" {...printPrice} value="all"
                                    checked={printPrice.value === 'all'}
                                />
                                <label className="select"></label>
                                <span className="margin-l10 text-vertical">All</span>
                            </div>
                            <div className="radio">
                                <input type="radio" {...printPrice} value="updated"
                                    checked={printPrice.value === 'updated'}
                                />
                                <label className="select"></label>
                                <span className="margin-l10 text-vertical">Updated Cost</span>
                            </div>
                            <div className="radio">
                                <input type="radio" {...printPrice} value="public"
                                    checked={printPrice.value === 'public'}
                                />
                                <label className="select"></label>
                                <span className="margin-l10 text-vertical">Retail Price</span>
                            </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                      <button type="button" className="btn btn-default btn-radius" onClick={onSubmit}>
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
module.exports = ModalPrintOptions;
