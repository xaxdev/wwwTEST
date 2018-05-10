import React,{ Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import Loginform from '../../components/login/login_form';
import * as loginAction from '../../actions/loginaction';
import * as itemActions from '../../actions/itemactions';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class Login extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            showloading: false
        };
    }
    componentWillMount() {
        const token = sessionStorage.token;
        if(token){
            this.context.router.push('/inventories');
        }
    }
    handleSubmit(data) {

        this.setState({
            showloading: true
        });
        this.props.loginAction.login(data)
        .then(() => {
            this.setState({
                showloading: false
            });
            if(this.props.logindata.loginstatus == true){
                const { permission } = JSON.parse(sessionStorage.logindata);
                this.props.itemActions.newSearch();
                if (permission.userType == 'Sales') {
                    this.context.router.push('/salesreport');
                }else{
                    this.context.router.push('/inventories');
                }
            }
        });
    }
    render() {
        return (
            <div className={`wrapper body-login ${this.props.logindata.loginstatus ? 'hidden' : ''}` }>
                <Loginform onSubmit={this.handleSubmit} msg={this.props.logindata.msg} loading={this.state.showloading}/>
            </div>
        );
    }
}

Login.contextTypes = {
    router: PropTypes.object,
    invalid: PropTypes.bool
};

function mapStateToProps(state) {
    return { logindata: state.login };
}
function mapDispatchToProps(dispatch) {
    return {
        loginAction: bindActionCreators(Object.assign({}, loginAction), dispatch),
        itemActions: bindActionCreators(Object.assign({}, itemActions), dispatch)
    }
}
module.exports = connect(mapStateToProps, mapDispatchToProps)(Login)
