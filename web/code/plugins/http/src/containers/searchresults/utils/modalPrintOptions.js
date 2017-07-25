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
        const { fields: { printPage }, totalPages } = props;
        const totalPage = numberFormat(totalPages);
        return(
              <div  className="addMyCatalog">
                <Modal isOpen={isOpen} >
                  <div className="modal-header">
                    <ModalClose onClick={isClose}/>
                    <h1 className="modal-title">SEARCH RESULTS</h1>
                  </div>
                  <div className="modal-body">
                    <div className="col-md-6 maring-b10">
                      Please select a print choices.
                    </div>
                    <div className="col-md-6 pull-right maring-b10">
                      {`Total: ${totalPage}`}
                    </div>
                  </div>
                  <div className="modal-body">
                    Page
                    <br/>
                    <div className="col-md-12 maring-b10">
                        <div className="col-sm-3">
                            <div>
                                <input type="radio" {...printPage} value="all"
                                    checked={printPage.value === 'all'}
                                /> All
                            </div>
                            <div>
                                <input type="radio" {...printPage} value="current"
                                    checked={printPage.value === 'current'}
                                /> Current Page
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
