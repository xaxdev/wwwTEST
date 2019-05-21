import React,{ Component, PropTypes } from 'react';
import Forgotform from '../../components/login/forgotpassword_form';
import * as forgotaction from '../../actions/forgotaction';
import { connect } from 'react-redux';

class Forgotpassword extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.clearforgotpassword = this.clearforgotpassword.bind(this);
    }
    handleSubmit(data) {
        this.props.forgotpassword(data);
    }
    clearforgotpassword() {
        this.props.clearforgotpassword();
        this.context.router.push('/');
    }
    render() {
        return (
            <div className="wrapper body-login">
                <Forgotform onSubmit={this.handleSubmit} msg={this.props.forgotdata.msg} clearforgotpassword={this.clearforgotpassword} forgotstatus={this.props.forgotdata.forgotstatus}/>
            </div>
        );
    }
}

Forgotpassword.contextTypes = {
    router: PropTypes.object
};

function mapStateToProps(state) {
    return { forgotdata: state.forgot };
}

module.exports = connect(mapStateToProps,forgotaction)(Forgotpassword)
