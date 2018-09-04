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
                    <div className="modal-body bg-gray">
                        <div className="col-md-6 col-sm-6 col-xs-6 maring-b10 nopadding">
                            <b>Please select a print choices.</b>
                        </div>
                        <div className="col-md-6 col-sm-6 col-xs-6 pull-right maring-b10 text-right">
                            <b>{`Total: ${totalPage}`}</b>
                        </div>
                    </div>
                    <div className="modal-body">
                        <div className="col-md-12 maring-b10">
                            <div className="col-sm-4 col-xs-4 nopadding"></div>
                            <div className="col-sm-1 col-xs-1 nopadding"><b>Page</b></div>
                            <div className="col-sm-7 col-xs-7 nopadding">
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
