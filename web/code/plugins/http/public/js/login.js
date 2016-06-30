webpackJsonp([1],{

/***/ 813:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _login_form = __webpack_require__(814);

	var _login_form2 = _interopRequireDefault(_login_form);

	var _loginaction = __webpack_require__(228);

	var loginAction = _interopRequireWildcard(_loginaction);

	var _reactRedux = __webpack_require__(529);

	var _reactRouter = __webpack_require__(159);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Login = function (_Component) {
	  _inherits(Login, _Component);

	  function Login(props) {
	    _classCallCheck(this, Login);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Login).call(this, props));

	    _this.handleSubmit = _this.handleSubmit.bind(_this);
	    return _this;
	  }

	  _createClass(Login, [{
	    key: 'componentWillMount',
	    value: function componentWillMount() {
	      var token = sessionStorage.token;
	      if (token) {
	        this.context.router.push('/inventories');
	      }
	    }
	  }, {
	    key: 'handleSubmit',
	    value: function handleSubmit(data) {
	      var _this2 = this;

	      this.props.login(data).then(function () {
	        if (_this2.props.logindata.loginstatus == true) {
	          _this2.context.router.push('/inventories');
	        }
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'div',
	        { className: 'wrapper body-login' },
	        _react2.default.createElement(_login_form2.default, { onSubmit: this.handleSubmit, msg: this.props.logindata.msg })
	      );
	    }
	  }]);

	  return Login;
	}(_react.Component);

	Login.contextTypes = {
	  router: _react.PropTypes.object,
	  invalid: _react.PropTypes.bool
	};

	function mapStateToProps(state) {
	  return { logindata: state.login };
	}

	module.exports = (0, _reactRedux.connect)(mapStateToProps, loginAction)(Login);

/***/ },

/***/ 814:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reduxForm = __webpack_require__(815);

	var _validatelogin = __webpack_require__(859);

	var _validatelogin2 = _interopRequireDefault(_validatelogin);

	var _reactRouter = __webpack_require__(159);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Loginform = function (_Component) {
	  _inherits(Loginform, _Component);

	  function Loginform() {
	    _classCallCheck(this, Loginform);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(Loginform).apply(this, arguments));
	  }

	  _createClass(Loginform, [{
	    key: 'render',
	    value: function render() {
	      var _props = this.props;
	      var _props$fields = _props.fields;
	      var username = _props$fields.username;
	      var password = _props$fields.password;
	      var handleSubmit = _props.handleSubmit;
	      var invalid = _props.invalid;

	      return _react2.default.createElement(
	        'form',
	        { onSubmit: handleSubmit, className: 'form-signin' },
	        _react2.default.createElement(
	          'div',
	          { className: 'login' },
	          _react2.default.createElement('div', { className: 'logo' }),
	          _react2.default.createElement(
	            'div',
	            { className: 'form-group ' + (username.touched && username.invalid ? 'has-danger' : '') },
	            _react2.default.createElement('input', _extends({ type: 'text', className: 'login-height form-control' }, username, { placeholder: 'Username' })),
	            _react2.default.createElement(
	              'div',
	              { className: 'text-help' },
	              username.touched ? username.error : ''
	            )
	          ),
	          _react2.default.createElement(
	            'div',
	            { className: 'form-group ' + (password.touched && password.invalid ? 'has-danger' : '') },
	            _react2.default.createElement('input', _extends({ type: 'password', className: 'login-height form-control' }, password, { placeholder: 'Password' })),
	            _react2.default.createElement(
	              'div',
	              { className: 'text-help' },
	              password.touched ? password.error : ''
	            )
	          ),
	          _react2.default.createElement(
	            'div',
	            { className: '' + (this.props.msg != '' ? 'text-danger' : '') },
	            this.props.msg != '' ? this.props.msg : ''
	          ),
	          _react2.default.createElement(
	            'button',
	            { type: 'submit', className: 'btn btn-lg btn-login btn-block', disabled: invalid },
	            'LOGIN'
	          ),
	          _react2.default.createElement(
	            'div',
	            { className: 'maring-t30 text-center forgot' },
	            _react2.default.createElement(
	              _reactRouter.Link,
	              { to: '/forgotpassword' },
	              'Forgot Password'
	            )
	          )
	        )
	      );
	    }
	  }]);

	  return Loginform;
	}(_react.Component);

	module.exports = (0, _reduxForm.reduxForm)({ // <----- THIS IS THE IMPORTANT PART!
	  form: 'Loginform',
	  fields: ['username', 'password'],
	  validate: _validatelogin2.default
	}, null)(Loginform);

/***/ },

/***/ 859:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = validate;
	function validate(values) {

	  var errors = {};
	  if (!values.username) {
	    errors.username = 'Please input username';
	  }

	  if (!values.password) {
	    errors.password = 'Please input password';
	  }
	  return errors;
	}

/***/ }

});