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
        const { that, props, isOpen, isClose, onSubmit,checkFields, labels } = this.props;
        const { fields: { printPageWord, printPrice }, listSetCatalogItems } = props;
        const totalPages = numberFormat(!!listSetCatalogItems?listSetCatalogItems.total_pages:0);
        const userLogin = JSON.parse(sessionStorage.logindata);
        return(
            <div className="addMyCatalog popupword">
                <Modal isOpen={isOpen} >
                    <div className="modal-header">
                        <ModalClose onClick={isClose}/>
                        <h1 className="modal-title">EXPORT SET CATALOG</h1>
                    </div>
                    <div className="modal-body bg-gray text-center">
                        <div className="col-md-12 col-sm-12 col-xs-12 maring-b10 nopadding">
                            <b>Please choose additional fields for export.</b>
                        </div>
                    </div>
                    <div className="modal-body col-md-12 col-sm-12 col-xs-12">
                        <div className="col-sm-1"></div>
                        <div className="col-sm-6 checkbox checkbox-warning">
                            <div className="maring-b10">
                                <input type="checkbox" disabled={userLogin.permission.price != 'All'? true : false}
                                    checked={that.state.allFields} onChange={event => {
                                        that.setState({ allFields: event.target.checked });
                                        if (event.target.checked) {
                                            checkFields.map(function(field, index){
                                                that.setState({ [field]: true });
                                            });
                                        } else {
                                            checkFields.map(function(field, index){
                                                that.setState({ [field]: false });
                                            });
                                        }
                                    }
                                }/>
                                <label className="control-label-word checkbox1">Select All</label>
                            </div>
                            <div className={`${(userLogin.permission.price == 'Updated' || userLogin.permission.price == 'All') ?
                                '' : 'hidden'}`}>
                                <input type="checkbox" checked={that.state.updatedCost} onChange={event => {
                                        that.setState({ updatedCost: event.target.checked });
                                        if (!event.target.checked) {
                                            that.setState({ allFields: false });
                                        }
                                    }
                                }/>
                                <label className="control-label-word checkbox1">Total Updated Cost Price (USD)</label>
                            </div>
                        </div>
                        <div className="col-sm-5 checkbox checkbox-warning">
                            <div className="maring-b10">
                            <div className={`${(userLogin.permission.price == 'All') ? '' : 'hidden'}`}>
                                <input type="checkbox" checked={that.state.groupCost} onChange={event => {
                                        that.setState({ groupCost: event.target.checked });
                                        if (!event.target.checked) {
                                            that.setState({ allFields: false });
                                        }
                                    }
                                }/>
                                <label className="control-label-word checkbox1">Total Initial Cost (USD)</label>
                            </div>
                            </div>
                            <div className="maring-b10">
                            <div className={`${(userLogin.permission.price == 'Public' || userLogin.permission.price == 'Updated'
                                || userLogin.permission.price == 'All') ? '' : 'hidden'}`}>
                                <input type="checkbox" checked={that.state.sellingCost} onChange={event => {
                                        that.setState({ sellingCost: event.target.checked });
                                        if (!event.target.checked) {
                                            that.setState({ allFields: false });
                                        }
                                    }
                                }/>
                                <label className="control-label-word checkbox1">Total Selling Cost Price (USD)</label>
                            </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-body col-md-12 col-sm-12 col-xs-12 bg-gray">
                        <div className="col-md-6 col-sm-6 col-xs-6 maring-b10 nopadding">
                            <b>Please select a print choices.</b>
                        </div>
                        <div className="col-md-6 col-sm-6 col-xs-6 pull-right maring-b10 text-right">
                            <b>{`Total: ${totalPages}`}</b>
                        </div>
                    </div>
                    <div className="modal-body col-md-12 col-sm-12 col-xs-12">
                        <div className="col-md-12 col-sm-12 col-xs-12 maring-b10 nopadding">
                            <div className="col-md-12 col-sm-12 col-xs-12 nopadding">
                                <div className="col-md-5 col-sm-5 col-xs-5 text-right"><b>Page</b></div>
                                <div className="col-sm-7 col-xs-7">
                                    <div className="radio">
                                        <input type="radio" {...printPageWord} value="all"
                                            checked={printPageWord.value === 'all'}
                                        />
                                        <label className="select"></label>
                                        <span className="margin-l10 text-vertical">All</span>
                                    </div>
                                    <div className="radio">
                                        <input type="radio" {...printPageWord} value="current"
                                            checked={printPageWord.value === 'current'}
                                        />
                                        <label className="select"></label>
                                        <span className="margin-l10 text-vertical">Current Page</span>
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
