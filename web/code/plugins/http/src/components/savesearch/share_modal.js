import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Modal, ModalClose } from 'react-modal-bootstrap';
import Select from 'react-select';
import * as usersActions from '../../actions/usersaction';
import validateEmail from '../../utils/validateemail';

import '../../../public/css/react-multi-select.css';

class ShareModal extends Component {
    constructor(props) {
        super(props);

        this.openModal = this.openModal.bind(this);
        this.handleEmailSelectChange = this.handleEmailSelectChange.bind(this);

        this.state = {
            isOpen: false
        };
    }
    componentDidMount = _=>{
        this.props.fetchShareUsers();
    }
    openModal(){
        this.setState({ isOpen: true });
    };

    hideModal = () => {
        this.setState({ isOpen: false });
    };
    handleEmailSelectChange = (EmailSelectValue) =>{
        const { fields: { shareTo, validateEmailTo }, ShareEmailToValue } = this.props;

        shareTo.onChange(EmailSelectValue);
        this.props.setDataSendEmailTo(EmailSelectValue);
    }
    confirmDisableModal = () => {
        const { fields: { shareTo, validateEmailTo }, ShareEmailToValue } = this.props;
        this.setState({isOpen: false});
        let emails = [];
        let paramEmails = [];
        let params = {};
        if (!!shareTo.value) {
            emails = shareTo.value.replace(/\s/g, '').split(/,|;/);
            paramEmails = emails.map((email) => {
                return {'email':email};
            });
        }
        params.id = this.props.saveSearch._id;
        params.users = paramEmails;

        this.props.shareSaveSearch(params)
        .then((response)=>{
            this.setState({isOpenShareMyCatalog: false});
            this.props.setDataSendEmailTo('');
            shareTo.onChange('');
            shareTo.value = '';
        })
    };
    render (){
        const { fields: { validateEmailTo }, ShareEmailToValue } = this.props;
        let dataEmail = [];

        if (!!this.props.users ) {
            if (this.props.users.length != 0) {
                dataEmail.push(this.props.users.map((user) => {
                    return ({value: user.email,label:user.email + ' [' + user.username + ']'});
                }));
                dataEmail = dataEmail[0];
            }
        }
        return(
            <div key={this.props.saveSearch._id}>
                <a>
                    <div className={`${this.props.saveSearch.shared ? 'icon-share fa' : 'icon-share'}`}
                        onClick={this.props.saveSearch.shared ? '' : this.openModal}></div>
                </a>
                <Modal isOpen={this.state.isOpen} >
                    <div className="modal-header">
                        <ModalClose onClick={this.hideModal}/>
                        <h1 className="modal-title">Please input email</h1>
                    </div>
                    <div className="modal-body">
                        <br/>
                        <div className="col-md-12 maring-b10 margin-t7">
                            <div className="col-sm-3">
                                <label className="col-sm-12 control-label">E-mail</label>
                            </div>
                            <div className="col-sm-8">
                                <Select multi simpleValue value={ShareEmailToValue}
                                    placeholder="Please input E-mail."
                                    options={dataEmail}
                                    onChange={this.handleEmailSelectChange}/>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-default btn-radius"
                            disabled={!validateEmailTo.error}
                            onClick={this.confirmDisableModal}>Submit
                        </button>
                        <button type="button" className="btn btn-default btn-radius" onClick={this.hideModal}>
                            Close
                        </button>
                    </div>
                </Modal>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        users: state.users.datas,
        ShareEmailToValue: state.users.ShareEmailToValue
    };
}

module.exports = reduxForm({
    form: 'ShareModal',
    fields: ['shareTo','validateEmailTo'],
    validate: validateEmail
},mapStateToProps,usersActions)(ShareModal)
