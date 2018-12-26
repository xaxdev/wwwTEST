import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Modal, ModalClose } from 'react-modal-bootstrap';
import { reduxForm } from 'redux-form';
import shallowCompare from 'react-addons-shallow-compare';
import Select from 'react-select';
let _ = require('lodash');

class ModalSalesSaveSearch extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount(){
        const { props } = this.props;
        const isNotOwnerSharedSalesSearch = props.searchResult.criteriaSalesSaveSearch != null
                                        ? props.searchResult.criteriaSalesSaveSearch.shared
                                        : false ;
        const { fields: { searchName, validateSearchName } } = props;

        if (props.searchResult.idEditSalesSaveSearch != null) {
            if (isNotOwnerSharedSalesSearch) {
                searchName.onChange('');
            } else {
                searchName.onChange(props.searchResult.nameEditSalesSaveSearch);
            }
        }
    }
    render() {
        const { props } = this.props;
        const isNotOwnerSharedSalesSearch = props.searchResult.criteriaSalesSaveSearch != null
                                        ? props.searchResult.criteriaSalesSaveSearch.shared
                                        : false ;
        const { fields: { searchName, validateSearchName } } = props;
        const { isOpen, isClose, onSubmit } = this.props;

        return(
            <div  className="addMyCatalog">
                <Modal isOpen={isOpen} >
                    <div className="modal-header bg_title_sale">
                        <ModalClose onClick={isClose}/>
                        <h1 className="modal-title">SAVE SEARCHS</h1>
                    </div>
                    <div className="modal-body">
                        <b>Please enter search name:</b>
                        <br/>
                        <div className="col-md-12 maring-b10 margin-t7">
                            <div className="col-sm-5">
                                <label className="col-sm-12 control-label">Search Name:</label>
                            </div>
                            <div className="col-sm-7">
                                <input disabled={`${props.searchResult.idEditSalesSaveSearch != null
                                                    ? isNotOwnerSharedSalesSearch ? '' : 'disabled'
                                                    : ''}`}
                                    type="text" className="form-control" {...searchName}/>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-default btn-radius"
                              disabled={validateSearchName.error}
                              onClick={onSubmit}>
                              {`${props.searchResult.idEditSalesSaveSearch != null
                                                  ? isNotOwnerSharedSalesSearch ? 'Save' : 'Update'
                                                  : 'Save'}`}
                        </button>
                        {/*<button type="button" className="btn btn-default btn-radius"
                              onClick={onSubmit}>Submit
                        </button>*/}
                        <button type="button" className="btn btn-default btn-radius" onClick={isClose}>
                            Close
                        </button>
                    </div>
                </Modal>
            </div>
        );
    }
}
module.exports = ModalSalesSaveSearch;
