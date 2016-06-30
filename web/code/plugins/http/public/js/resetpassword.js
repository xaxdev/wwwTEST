webpackJsonp([7],{

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

/***/ },

/***/ 1118:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _resetpassword_form = __webpack_require__(1119);

	var _resetpassword_form2 = _interopRequireDefault(_resetpassword_form);

	var _loginaction = __webpack_require__(228);

	var loginaction = _interopRequireWildcard(_loginaction);

	var _reactRedux = __webpack_require__(529);

	var _reactRouter = __webpack_require__(159);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Resetpassword = function (_Component) {
	  _inherits(Resetpassword, _Component);

	  function Resetpassword(props) {
	    _classCallCheck(this, Resetpassword);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Resetpassword).call(this, props));

	    _this.handleSubmit = _this.handleSubmit.bind(_this);
	    return _this;
	  }

	  _createClass(Resetpassword, [{
	    key: 'componentWillMount',
	    value: function componentWillMount() {
	      var token = this.props.params.token;
	      if (token) {
	        this.props.validatetokenreset(token);
	      }
	    }
	  }, {
	    key: 'handleSubmit',
	    value: function handleSubmit(data) {
	      var _this2 = this;

	      this.props.sendreset(data);

	      setTimeout(function () {
	        if (_this2.props.logindata.loginstatus == true) {
	          _this2.context.router.push('/inventories');
	        }
	      }, 100);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'div',
	        { className: 'wrapper body-login' },
	        _react2.default.createElement(_resetpassword_form2.default, { onSubmit: this.handleSubmit, resetmsg: this.props.logindata.msg })
	      );
	    }
	  }]);

	  return Resetpassword;
	}(_react.Component);

	Resetpassword.contextTypes = {
	  router: _react.PropTypes.object,
	  invalid: _react.PropTypes.bool
	};

	function mapStateToProps(state) {
	  return { logindata: state.login };
	}

	module.exports = (0, _reactRedux.connect)(mapStateToProps, loginaction)(Resetpassword);

/***/ },

/***/ 1119:
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

	var Resetpasswordform = function (_Component) {
	  _inherits(Resetpasswordform, _Component);

	  function Resetpasswordform() {
	    _classCallCheck(this, Resetpasswordform);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(Resetpasswordform).apply(this, arguments));
	  }

	  _createClass(Resetpasswordform, [{
	    key: 'render',
	    value: function render() {
	      var _props = this.props;
	      var _props$fields = _props.fields;
	      var username = _props$fields.username;
	      var password = _props$fields.password;
	      var handleSubmit = _props.handleSubmit;
	      var invalid = _props.invalid;
	      var resetmsg = _props.resetmsg;

	      return _react2.default.createElement(
	        'form',
	        { onSubmit: handleSubmit, className: 'form-signin' },
	        _react2.default.createElement(
	          'div',
	          { className: 'login' },
	          _react2.default.createElement('div', { className: 'logo' }),
	          _react2.default.createElement(
	            'h2',
	            { className: 'fc-fff' },
	            'Reset Password'
	          ),
	          _react2.default.createElement(
	            'div',
	            { className: 'form-group ' + (username.touched && username.invalid ? 'has-danger' : '') },
	            _react2.default.createElement(
	              'label',
	              null,
	              'Username'
	            ),
	            _react2.default.createElement('input', _extends({ type: 'text', className: 'form-control' }, username, { disabled: true, placeholder: 'Username' })),
	            _react2.default.createElement(
	              'div',
	              { className: 'text-help' },
	              username.touched ? username.error : ''
	            )
	          ),
	          _react2.default.createElement(
	            'div',
	            { className: 'form-group ' + (password.touched && password.invalid ? 'has-danger' : '') },
	            _react2.default.createElement(
	              'label',
	              null,
	              'Password'
	            ),
	            _react2.default.createElement('input', _extends({ type: 'password', className: 'form-control' }, password, { placeholder: 'Password' })),
	            _react2.default.createElement(
	              'div',
	              { className: 'text-help' },
	              password.touched ? password.error : ''
	            )
	          ),
	          _react2.default.createElement(
	            'div',
	            { className: 'margin-t50' },
	            _react2.default.createElement(
	              'div',
	              { className: '' + (resetmsg != '' ? 'text-success' : '') },
	              resetmsg != '' ? resetmsg : ''
	            ),
	            _react2.default.createElement(
	              'button',
	              { type: 'submit', className: 'btn btn-lg btn-primary btn-block', disabled: invalid },
	              'Reset'
	            )
	          )
	        )
	      );
	    }
	  }]);

	  return Resetpasswordform;
	}(_react.Component);

	function mapStateToProps(state) {
	  return {
	    initialValues: state.login.logindata,
	    resetdata: state.login.logindata
	  };
	}

	module.exports = (0, _reduxForm.reduxForm)({ // <----- THIS IS THE IMPORTANT PART!
	  form: 'Loginform',
	  fields: ['username', 'password'],
	  validate: _validatelogin2.default
	}, mapStateToProps)(Resetpasswordform);

/***/ }

});