import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Modal, ModalClose } from 'react-modal-bootstrap';
import { reduxForm } from 'redux-form';
import shallowCompare from 'react-addons-shallow-compare';
import Select from 'react-select';
// import validateCatalog from './validatecatalog';
let _ = require('lodash');

class ModalSaveSearch extends Component {

    constructor(props) {
        super(props);

    }
    componentDidMount(){
        const { props } = this.props;
        const isNotOwnerSharedSearch = props.searchResult.criteriaSaveSearch != null
                                        ? props.searchResult.criteriaSaveSearch.shared
                                        : false ;
        const { fields: { searchName, validateSearchName } } = props;
        // console.log('componentDidMount-->',props.searchResult.idEditSaveSearch);
        // console.log('componentDidMount-->',props.searchResult.nameEditSaveSearch);
        if (props.searchResult.idEditSaveSearch != null) {
            if (isNotOwnerSharedSearch) {
                searchName.onChange('');
            } else {
                searchName.onChange(props.searchResult.nameEditSaveSearch);
            }
        }
    }

  render() {
    //   console.log(this.props);
    const { props } = this.props;
    const isNotOwnerSharedSearch = props.searchResult.criteriaSaveSearch != null
                                    ? props.searchResult.criteriaSaveSearch.shared
                                    : false ;
    const { fields: { searchName, validateSearchName } } = props;
    const { isOpen, isClose, onSubmit } = this.props;
    // console.log(validateSearchName);

    return(
          <div  className="addMyCatalog">
            <Modal isOpen={isOpen} >
              <div className="modal-header">
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
                        <input disabled={`${props.searchResult.idEditSaveSearch != null
                                            ? isNotOwnerSharedSearch ? '' : 'disabled'
                                            : ''}`}
                            type="text" className="form-control" {...searchName}/>
                    </div>
                </div>
              </div>
              <div className="modal-footer">
                  <button type="button" className="btn btn-default btn-radius" disabled={validateSearchName.error}
                        onClick={onSubmit}>Submit
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
module.exports = ModalSaveSearch;
