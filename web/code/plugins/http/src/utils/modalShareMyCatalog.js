import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Modal, ModalClose } from 'react-modal-bootstrap';
import { reduxForm } from 'redux-form';
import shallowCompare from 'react-addons-shallow-compare';
import Select from 'react-select';
import * as usersActions from '../../../http/src/actions/usersaction';
// import validateCatalog from './validatecatalog';
let _ = require('lodash');
import '../../../http/public/css/react-multi-select.css';

class ModalShareMyCatalog extends Component {

    constructor(props) {
        super(props);

        this.handleEmailSelectChange = this.handleEmailSelectChange.bind(this);

  }
  componentDidMount = _=>{
    this.props.fetchUsers();
  }

  hideModalAddMyCatalog = (e) => {
    e.preventDefault();
    // console.log('hi');
    // this.setState({isOpenAddMyCatalog: false});
    let { isOpen } = this.props;

    isOpen = false;

  }

  handleEmailSelectChange = (EmailSelectValue) =>{
    //   console.log('EmailSelectValue-->',EmailSelectValue);
      const { props } = this.props;
      const { fields: {
                shareCatalogTo, validateEmailTo
            } } = props;

      shareCatalogTo.onChange(EmailSelectValue);
    //   console.log('shareCatalogTo-->',shareCatalogTo.value);
      this.props.setDataSendEmailTo(EmailSelectValue);
  }

  render() {

    const { props, ShareEmailToValue } = this.props;
    const { fields: {
              shareCatalogTo, validateEmailTo
          } } = props;
    const { isOpen, isClose, handleSubmitShareCatalog, onSubmit } = this.props;
    // console.log(ShareEmailToValue);
    let dataEmail = [];
    if (this.props.users.length != 0) {
        dataEmail.push(this.props.users.map((user) => {
            return ({value: user.email,label:user.email + ' [' + user.username + ']'});
        }));
        dataEmail = dataEmail[0];
    }

    return(
          <div  className="addMyCatalog">
            <Modal isOpen={isOpen} >
              <div className="modal-header">
                <ModalClose onClick={isClose}/>
                <h1 className="modal-title">Please input email</h1>
              </div>
              <div className="modal-body">
                <br/>
                <div className="col-md-12 maring-b10">
                    <div className="col-sm-6">
                        <label className="col-sm-12 control-label">E-mail</label>
                    </div>
                    <div className="col-sm-6">
                        <Select multi simpleValue value={ShareEmailToValue}
                          placeholder="Please input E-mail."
                          options={dataEmail}
                          onChange={this.handleEmailSelectChange}/>
                    </div>
                </div>
              </div>
              <div className="modal-footer">
                  <button type="button" className="btn btn-default btn-radius" disabled={!validateEmailTo.error} onClick={onSubmit}>
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
// module.exports = ModalShareMyCatalog;
function mapStateToProps(state) {
  // console.log('state list form-->',state);
  return {
      users: state.users.datas,
      ShareEmailToValue: state.users.ShareEmailToValue
  };
}

module.exports = connect(mapStateToProps, usersActions)(ModalShareMyCatalog)
