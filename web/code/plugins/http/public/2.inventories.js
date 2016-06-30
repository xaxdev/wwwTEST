webpackJsonp([2],{

/***/ 852:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.untouchWithKey = exports.untouch = exports.touchWithKey = exports.touch = exports.swapArrayValues = exports.stopSubmit = exports.stopAsyncValidation = exports.startSubmit = exports.startAsyncValidation = exports.reset = exports.propTypes = exports.initializeWithKey = exports.initialize = exports.getValues = exports.removeArrayValue = exports.reduxForm = exports.reducer = exports.focus = exports.destroy = exports.changeWithKey = exports.change = exports.blur = exports.addArrayValue = exports.actionTypes = undefined;

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(159);

	var _createAll2 = __webpack_require__(853);

	var _createAll3 = _interopRequireDefault(_createAll2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var isNative = typeof window !== 'undefined' && window.navigator && window.navigator.product && window.navigator.product === 'ReactNative';

	var _createAll = (0, _createAll3.default)(isNative, _react2.default, _reactRedux.connect);

	var actionTypes = _createAll.actionTypes;
	var addArrayValue = _createAll.addArrayValue;
	var blur = _createAll.blur;
	var change = _createAll.change;
	var changeWithKey = _createAll.changeWithKey;
	var destroy = _createAll.destroy;
	var focus = _createAll.focus;
	var reducer = _createAll.reducer;
	var reduxForm = _createAll.reduxForm;
	var removeArrayValue = _createAll.removeArrayValue;
	var getValues = _createAll.getValues;
	var initialize = _createAll.initialize;
	var initializeWithKey = _createAll.initializeWithKey;
	var propTypes = _createAll.propTypes;
	var reset = _createAll.reset;
	var startAsyncValidation = _createAll.startAsyncValidation;
	var startSubmit = _createAll.startSubmit;
	var stopAsyncValidation = _createAll.stopAsyncValidation;
	var stopSubmit = _createAll.stopSubmit;
	var swapArrayValues = _createAll.swapArrayValues;
	var touch = _createAll.touch;
	var touchWithKey = _createAll.touchWithKey;
	var untouch = _createAll.untouch;
	var untouchWithKey = _createAll.untouchWithKey;
	exports.actionTypes = actionTypes;
	exports.addArrayValue = addArrayValue;
	exports.blur = blur;
	exports.change = change;
	exports.changeWithKey = changeWithKey;
	exports.destroy = destroy;
	exports.focus = focus;
	exports.reducer = reducer;
	exports.reduxForm = reduxForm;
	exports.removeArrayValue = removeArrayValue;
	exports.getValues = getValues;
	exports.initialize = initialize;
	exports.initializeWithKey = initializeWithKey;
	exports.propTypes = propTypes;
	exports.reset = reset;
	exports.startAsyncValidation = startAsyncValidation;
	exports.startSubmit = startSubmit;
	exports.stopAsyncValidation = stopAsyncValidation;
	exports.stopSubmit = stopSubmit;
	exports.swapArrayValues = swapArrayValues;
	exports.touch = touch;
	exports.touchWithKey = touchWithKey;
	exports.untouch = untouch;
	exports.untouchWithKey = untouchWithKey;

/***/ },

/***/ 853:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.default = createAll;

	var _reducer = __webpack_require__(854);

	var _reducer2 = _interopRequireDefault(_reducer);

	var _createReduxForm = __webpack_require__(865);

	var _createReduxForm2 = _interopRequireDefault(_createReduxForm);

	var _mapValues = __webpack_require__(856);

	var _mapValues2 = _interopRequireDefault(_mapValues);

	var _bindActionData = __webpack_require__(872);

	var _bindActionData2 = _interopRequireDefault(_bindActionData);

	var _actions = __webpack_require__(871);

	var actions = _interopRequireWildcard(_actions);

	var _actionTypes = __webpack_require__(855);

	var actionTypes = _interopRequireWildcard(_actionTypes);

	var _createPropTypes = __webpack_require__(895);

	var _createPropTypes2 = _interopRequireDefault(_createPropTypes);

	var _getValuesFromState = __webpack_require__(859);

	var _getValuesFromState2 = _interopRequireDefault(_getValuesFromState);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// bind form as first parameter of action creators
	var boundActions = _extends({}, (0, _mapValues2.default)(_extends({}, actions, {
	  changeWithKey: function changeWithKey(key) {
	    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	      args[_key - 1] = arguments[_key];
	    }

	    return (0, _bindActionData2.default)(actions.change, { key: key }).apply(undefined, args);
	  },
	  initializeWithKey: function initializeWithKey(key) {
	    for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
	      args[_key2 - 1] = arguments[_key2];
	    }

	    return (0, _bindActionData2.default)(actions.initialize, { key: key }).apply(undefined, args);
	  },
	  reset: function reset(key) {
	    return (0, _bindActionData2.default)(actions.reset, { key: key })();
	  },
	  touchWithKey: function touchWithKey(key) {
	    for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
	      args[_key3 - 1] = arguments[_key3];
	    }

	    return (0, _bindActionData2.default)(actions.touch, { key: key }).apply(undefined, args);
	  },
	  untouchWithKey: function untouchWithKey(key) {
	    for (var _len4 = arguments.length, args = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
	      args[_key4 - 1] = arguments[_key4];
	    }

	    return (0, _bindActionData2.default)(actions.untouch, { key: key }).apply(undefined, args);
	  },
	  destroy: function destroy(key) {
	    return (0, _bindActionData2.default)(actions.destroy, { key: key })();
	  }
	}), function (action) {
	  return function (form) {
	    for (var _len5 = arguments.length, args = Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
	      args[_key5 - 1] = arguments[_key5];
	    }

	    return (0, _bindActionData2.default)(action, { form: form }).apply(undefined, args);
	  };
	}));

	var addArrayValue = boundActions.addArrayValue;
	var blur = boundActions.blur;
	var change = boundActions.change;
	var changeWithKey = boundActions.changeWithKey;
	var destroy = boundActions.destroy;
	var focus = boundActions.focus;
	var initialize = boundActions.initialize;
	var initializeWithKey = boundActions.initializeWithKey;
	var removeArrayValue = boundActions.removeArrayValue;
	var reset = boundActions.reset;
	var startAsyncValidation = boundActions.startAsyncValidation;
	var startSubmit = boundActions.startSubmit;
	var stopAsyncValidation = boundActions.stopAsyncValidation;
	var stopSubmit = boundActions.stopSubmit;
	var submitFailed = boundActions.submitFailed;
	var swapArrayValues = boundActions.swapArrayValues;
	var touch = boundActions.touch;
	var touchWithKey = boundActions.touchWithKey;
	var untouch = boundActions.untouch;
	var untouchWithKey = boundActions.untouchWithKey;

	function createAll(isReactNative, React, connect) {
	  return {
	    actionTypes: actionTypes,
	    addArrayValue: addArrayValue,
	    blur: blur,
	    change: change,
	    changeWithKey: changeWithKey,
	    destroy: destroy,
	    focus: focus,
	    getValues: _getValuesFromState2.default,
	    initialize: initialize,
	    initializeWithKey: initializeWithKey,
	    propTypes: (0, _createPropTypes2.default)(React),
	    reduxForm: (0, _createReduxForm2.default)(isReactNative, React, connect),
	    reducer: _reducer2.default,
	    removeArrayValue: removeArrayValue,
	    reset: reset,
	    startAsyncValidation: startAsyncValidation,
	    startSubmit: startSubmit,
	    stopAsyncValidation: stopAsyncValidation,
	    stopSubmit: stopSubmit,
	    submitFailed: submitFailed,
	    swapArrayValues: swapArrayValues,
	    touch: touch,
	    touchWithKey: touchWithKey,
	    untouch: untouch,
	    untouchWithKey: untouchWithKey
	  };
	}

/***/ },

/***/ 854:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.initialState = exports.globalErrorKey = undefined;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _initialState, _behaviors;

	var _actionTypes = __webpack_require__(855);

	var _mapValues = __webpack_require__(856);

	var _mapValues2 = _interopRequireDefault(_mapValues);

	var _read = __webpack_require__(857);

	var _read2 = _interopRequireDefault(_read);

	var _write = __webpack_require__(858);

	var _write2 = _interopRequireDefault(_write);

	var _getValuesFromState = __webpack_require__(859);

	var _getValuesFromState2 = _interopRequireDefault(_getValuesFromState);

	var _initializeState = __webpack_require__(861);

	var _initializeState2 = _interopRequireDefault(_initializeState);

	var _resetState = __webpack_require__(862);

	var _resetState2 = _interopRequireDefault(_resetState);

	var _setErrors = __webpack_require__(863);

	var _setErrors2 = _interopRequireDefault(_setErrors);

	var _fieldValue = __webpack_require__(860);

	var _normalizeFields = __webpack_require__(864);

	var _normalizeFields2 = _interopRequireDefault(_normalizeFields);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	var globalErrorKey = exports.globalErrorKey = '_error';

	var initialState = exports.initialState = (_initialState = {
	  _active: undefined,
	  _asyncValidating: false
	}, _initialState[globalErrorKey] = undefined, _initialState._initialized = false, _initialState._submitting = false, _initialState._submitFailed = false, _initialState);

	var behaviors = (_behaviors = {}, _behaviors[_actionTypes.ADD_ARRAY_VALUE] = function (state, _ref) {
	  var path = _ref.path;
	  var index = _ref.index;
	  var value = _ref.value;
	  var fields = _ref.fields;

	  var array = (0, _read2.default)(path, state);
	  var stateCopy = _extends({}, state);
	  var arrayCopy = array ? [].concat(array) : [];
	  var newValue = value !== null && typeof value === 'object' ? (0, _initializeState2.default)(value, fields || Object.keys(value)) : (0, _fieldValue.makeFieldValue)({ value: value });
	  if (index === undefined) {
	    arrayCopy.push(newValue);
	  } else {
	    arrayCopy.splice(index, 0, newValue);
	  }
	  return (0, _write2.default)(path, arrayCopy, stateCopy);
	}, _behaviors[_actionTypes.BLUR] = function (state, _ref2) {
	  var field = _ref2.field;
	  var value = _ref2.value;
	  var touch = _ref2.touch;

	  // remove _active from state
	  var _active = state._active;

	  var stateCopy = _objectWithoutProperties(state, ['_active']); // eslint-disable-line prefer-const


	  return (0, _write2.default)(field, function (previous) {
	    var result = _extends({}, previous);
	    if (value !== undefined) {
	      result.value = value;
	    }
	    if (touch) {
	      result.touched = true;
	    }
	    return (0, _fieldValue.makeFieldValue)(result);
	  }, stateCopy);
	}, _behaviors[_actionTypes.CHANGE] = function (state, _ref3) {
	  var field = _ref3.field;
	  var value = _ref3.value;
	  var touch = _ref3.touch;

	  return (0, _write2.default)(field, function (previous) {
	    var _previous$value = _extends({}, previous, { value: value });

	    var asyncError = _previous$value.asyncError;
	    var submitError = _previous$value.submitError;

	    var result = _objectWithoutProperties(_previous$value, ['asyncError', 'submitError']);

	    if (touch) {
	      result.touched = true;
	    }
	    return (0, _fieldValue.makeFieldValue)(result);
	  }, state);
	}, _behaviors[_actionTypes.DESTROY] = function () {
	  return undefined;
	}, _behaviors[_actionTypes.FOCUS] = function (state, _ref4) {
	  var field = _ref4.field;

	  var stateCopy = (0, _write2.default)(field, function (previous) {
	    return (0, _fieldValue.makeFieldValue)(_extends({}, previous, { visited: true }));
	  }, state);
	  stateCopy._active = field;
	  return stateCopy;
	}, _behaviors[_actionTypes.INITIALIZE] = function (state, _ref5) {
	  var _extends2;

	  var data = _ref5.data;
	  var fields = _ref5.fields;

	  return _extends({}, (0, _initializeState2.default)(data, fields, state), (_extends2 = {
	    _asyncValidating: false,
	    _active: undefined
	  }, _extends2[globalErrorKey] = undefined, _extends2._initialized = true, _extends2._submitting = false, _extends2._submitFailed = false, _extends2));
	}, _behaviors[_actionTypes.REMOVE_ARRAY_VALUE] = function (state, _ref6) {
	  var path = _ref6.path;
	  var index = _ref6.index;

	  var array = (0, _read2.default)(path, state);
	  var stateCopy = _extends({}, state);
	  var arrayCopy = array ? [].concat(array) : [];
	  if (index === undefined) {
	    arrayCopy.pop();
	  } else if (isNaN(index)) {
	    delete arrayCopy[index];
	  } else {
	    arrayCopy.splice(index, 1);
	  }
	  return (0, _write2.default)(path, arrayCopy, stateCopy);
	}, _behaviors[_actionTypes.RESET] = function (state) {
	  var _extends3;

	  return _extends({}, (0, _resetState2.default)(state), (_extends3 = {
	    _active: undefined,
	    _asyncValidating: false
	  }, _extends3[globalErrorKey] = undefined, _extends3._initialized = state._initialized, _extends3._submitting = false, _extends3._submitFailed = false, _extends3));
	}, _behaviors[_actionTypes.START_ASYNC_VALIDATION] = function (state, _ref7) {
	  var field = _ref7.field;

	  return _extends({}, state, {
	    _asyncValidating: field || true
	  });
	}, _behaviors[_actionTypes.START_SUBMIT] = function (state) {
	  return _extends({}, state, {
	    _submitting: true
	  });
	}, _behaviors[_actionTypes.STOP_ASYNC_VALIDATION] = function (state, _ref8) {
	  var _extends4;

	  var errors = _ref8.errors;

	  return _extends({}, (0, _setErrors2.default)(state, errors, 'asyncError'), (_extends4 = {
	    _asyncValidating: false
	  }, _extends4[globalErrorKey] = errors && errors[globalErrorKey], _extends4));
	}, _behaviors[_actionTypes.STOP_SUBMIT] = function (state, _ref9) {
	  var _extends5;

	  var errors = _ref9.errors;

	  return _extends({}, (0, _setErrors2.default)(state, errors, 'submitError'), (_extends5 = {}, _extends5[globalErrorKey] = errors && errors[globalErrorKey], _extends5._submitting = false, _extends5._submitFailed = !!(errors && Object.keys(errors).length), _extends5));
	}, _behaviors[_actionTypes.SUBMIT_FAILED] = function (state) {
	  return _extends({}, state, {
	    _submitFailed: true
	  });
	}, _behaviors[_actionTypes.SWAP_ARRAY_VALUES] = function (state, _ref10) {
	  var path = _ref10.path;
	  var indexA = _ref10.indexA;
	  var indexB = _ref10.indexB;

	  var array = (0, _read2.default)(path, state);
	  var arrayLength = array.length;
	  if (indexA === indexB || isNaN(indexA) || isNaN(indexB) || indexA >= arrayLength || indexB >= arrayLength) {
	    return state; // do nothing
	  }
	  var stateCopy = _extends({}, state);
	  var arrayCopy = [].concat(array);
	  arrayCopy[indexA] = array[indexB];
	  arrayCopy[indexB] = array[indexA];
	  return (0, _write2.default)(path, arrayCopy, stateCopy);
	}, _behaviors[_actionTypes.TOUCH] = function (state, _ref11) {
	  var fields = _ref11.fields;

	  return _extends({}, state, fields.reduce(function (accumulator, field) {
	    return (0, _write2.default)(field, function (value) {
	      return (0, _fieldValue.makeFieldValue)(_extends({}, value, { touched: true }));
	    }, accumulator);
	  }, state));
	}, _behaviors[_actionTypes.UNTOUCH] = function (state, _ref12) {
	  var fields = _ref12.fields;

	  return _extends({}, state, fields.reduce(function (accumulator, field) {
	    return (0, _write2.default)(field, function (value) {
	      if (value) {
	        var touched = value.touched;

	        var rest = _objectWithoutProperties(value, ['touched']);

	        return (0, _fieldValue.makeFieldValue)(rest);
	      }
	      return (0, _fieldValue.makeFieldValue)(value);
	    }, accumulator);
	  }, state));
	}, _behaviors);

	var reducer = function reducer() {
	  var state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];
	  var action = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	  var behavior = behaviors[action.type];
	  return behavior ? behavior(state, action) : state;
	};

	function formReducer() {
	  var _extends11;

	  var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	  var action = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	  var form = action.form;
	  var key = action.key;

	  var rest = _objectWithoutProperties(action, ['form', 'key']); // eslint-disable-line no-redeclare


	  if (!form) {
	    return state;
	  }
	  if (key) {
	    var _extends8, _extends9;

	    if (action.type === _actionTypes.DESTROY) {
	      var _extends7;

	      return _extends({}, state, (_extends7 = {}, _extends7[form] = state[form] && Object.keys(state[form]).reduce(function (accumulator, stateKey) {
	        var _extends6;

	        return stateKey === key ? accumulator : _extends({}, accumulator, (_extends6 = {}, _extends6[stateKey] = state[form][stateKey], _extends6));
	      }, {}), _extends7));
	    }
	    return _extends({}, state, (_extends9 = {}, _extends9[form] = _extends({}, state[form], (_extends8 = {}, _extends8[key] = reducer((state[form] || {})[key], rest), _extends8)), _extends9));
	  }
	  if (action.type === _actionTypes.DESTROY) {
	    return Object.keys(state).reduce(function (accumulator, formName) {
	      var _extends10;

	      return formName === form ? accumulator : _extends({}, accumulator, (_extends10 = {}, _extends10[formName] = state[formName], _extends10));
	    }, {});
	  }
	  return _extends({}, state, (_extends11 = {}, _extends11[form] = reducer(state[form], rest), _extends11));
	}

	/**
	 * Adds additional functionality to the reducer
	 */
	function decorate(target) {
	  target.plugin = function plugin(reducers) {
	    var _this = this;

	    // use 'function' keyword to enable 'this'
	    return decorate(function () {
	      var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	      var action = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	      var result = _this(state, action);
	      return _extends({}, result, (0, _mapValues2.default)(reducers, function (pluginReducer, key) {
	        return pluginReducer(result[key] || initialState, action);
	      }));
	    });
	  };

	  target.normalize = function normalize(normalizers) {
	    var _this2 = this;

	    // use 'function' keyword to enable 'this'
	    return decorate(function () {
	      var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	      var action = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	      var result = _this2(state, action);
	      return _extends({}, result, (0, _mapValues2.default)(normalizers, function (formNormalizers, form) {
	        var runNormalize = function runNormalize(previous, currentResult) {
	          var previousValues = (0, _getValuesFromState2.default)(_extends({}, initialState, previous));
	          var formResult = _extends({}, initialState, currentResult);
	          var values = (0, _getValuesFromState2.default)(formResult);
	          return (0, _normalizeFields2.default)(formNormalizers, formResult, previous, values, previousValues);
	        };
	        if (action.key) {
	          var _extends12;

	          return _extends({}, result[form], (_extends12 = {}, _extends12[action.key] = runNormalize(state[form][action.key], result[form][action.key]), _extends12));
	        }
	        return runNormalize(state[form], result[form]);
	      }));
	    });
	  };

	  return target;
	}

	exports.default = decorate(formReducer);

/***/ },

/***/ 855:
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	var ADD_ARRAY_VALUE = exports.ADD_ARRAY_VALUE = 'redux-form/ADD_ARRAY_VALUE';
	var BLUR = exports.BLUR = 'redux-form/BLUR';
	var CHANGE = exports.CHANGE = 'redux-form/CHANGE';
	var DESTROY = exports.DESTROY = 'redux-form/DESTROY';
	var FOCUS = exports.FOCUS = 'redux-form/FOCUS';
	var INITIALIZE = exports.INITIALIZE = 'redux-form/INITIALIZE';
	var REMOVE_ARRAY_VALUE = exports.REMOVE_ARRAY_VALUE = 'redux-form/REMOVE_ARRAY_VALUE';
	var RESET = exports.RESET = 'redux-form/RESET';
	var START_ASYNC_VALIDATION = exports.START_ASYNC_VALIDATION = 'redux-form/START_ASYNC_VALIDATION';
	var START_SUBMIT = exports.START_SUBMIT = 'redux-form/START_SUBMIT';
	var STOP_ASYNC_VALIDATION = exports.STOP_ASYNC_VALIDATION = 'redux-form/STOP_ASYNC_VALIDATION';
	var STOP_SUBMIT = exports.STOP_SUBMIT = 'redux-form/STOP_SUBMIT';
	var SUBMIT_FAILED = exports.SUBMIT_FAILED = 'redux-form/SUBMIT_FAILED';
	var SWAP_ARRAY_VALUES = exports.SWAP_ARRAY_VALUES = 'redux-form/SWAP_ARRAY_VALUES';
	var TOUCH = exports.TOUCH = 'redux-form/TOUCH';
	var UNTOUCH = exports.UNTOUCH = 'redux-form/UNTOUCH';

/***/ },

/***/ 856:
/***/ function(module, exports) {

	"use strict";

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.default = mapValues;
	/**
	 * Maps all the values in the given object through the given function and saves them, by key, to a result object
	 */
	function mapValues(obj, fn) {
	  return obj ? Object.keys(obj).reduce(function (accumulator, key) {
	    var _extends2;

	    return _extends({}, accumulator, (_extends2 = {}, _extends2[key] = fn(obj[key], key), _extends2));
	  }, {}) : obj;
	}

/***/ },

/***/ 857:
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	/**
	 * Reads any potentially deep value from an object using dot and array syntax
	 */
	var read = function read(path, object) {
	  if (!path || !object) {
	    return object;
	  }
	  var dotIndex = path.indexOf('.');
	  if (dotIndex === 0) {
	    return read(path.substring(1), object);
	  }
	  var openIndex = path.indexOf('[');
	  var closeIndex = path.indexOf(']');
	  if (dotIndex >= 0 && (openIndex < 0 || dotIndex < openIndex)) {
	    // iterate down object tree
	    return read(path.substring(dotIndex + 1), object[path.substring(0, dotIndex)]);
	  }
	  if (openIndex >= 0 && (dotIndex < 0 || openIndex < dotIndex)) {
	    if (closeIndex < 0) {
	      throw new Error('found [ but no ]');
	    }
	    var key = path.substring(0, openIndex);
	    var index = path.substring(openIndex + 1, closeIndex);
	    if (!index.length) {
	      return object[key];
	    }
	    if (openIndex === 0) {
	      return read(path.substring(closeIndex + 1), object[index]);
	    }
	    if (!object[key]) {
	      return undefined;
	    }
	    return read(path.substring(closeIndex + 1), object[key][index]);
	  }
	  return object[path];
	};

	exports.default = read;

/***/ },

/***/ 858:
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	/**
	 * Writes any potentially deep value from an object using dot and array syntax,
	 * and returns a new copy of the object.
	 */
	var write = function write(path, value, object) {
	  var _extends7;

	  var dotIndex = path.indexOf('.');
	  if (dotIndex === 0) {
	    return write(path.substring(1), value, object);
	  }
	  var openIndex = path.indexOf('[');
	  var closeIndex = path.indexOf(']');
	  if (dotIndex >= 0 && (openIndex < 0 || dotIndex < openIndex)) {
	    var _extends2;

	    // is dot notation
	    var key = path.substring(0, dotIndex);
	    return _extends({}, object, (_extends2 = {}, _extends2[key] = write(path.substring(dotIndex + 1), value, object[key] || {}), _extends2));
	  }
	  if (openIndex >= 0 && (dotIndex < 0 || openIndex < dotIndex)) {
	    var _ret = function () {
	      var _extends6;

	      // is array notation
	      if (closeIndex < 0) {
	        throw new Error('found [ but no ]');
	      }
	      var key = path.substring(0, openIndex);
	      var index = path.substring(openIndex + 1, closeIndex);
	      var array = object[key] || [];
	      var rest = path.substring(closeIndex + 1);
	      if (index) {
	        var _extends4;

	        // indexed array
	        if (rest.length) {
	          var _extends3;

	          // need to keep recursing
	          var dest = array[index] || {};
	          var arrayCopy = [].concat(array);
	          arrayCopy[index] = write(rest, value, dest);
	          return {
	            v: _extends({}, object || {}, (_extends3 = {}, _extends3[key] = arrayCopy, _extends3))
	          };
	        }
	        var copy = [].concat(array);
	        copy[index] = typeof value === 'function' ? value(copy[index]) : value;
	        return {
	          v: _extends({}, object || {}, (_extends4 = {}, _extends4[key] = copy, _extends4))
	        };
	      }
	      // indexless array
	      if (rest.length) {
	        var _extends5;

	        // need to keep recursing
	        if ((!array || !array.length) && typeof value === 'function') {
	          return {
	            v: object
	          }; // don't even set a value under [key]
	        }
	        var _arrayCopy = array.map(function (dest) {
	          return write(rest, value, dest);
	        });
	        return {
	          v: _extends({}, object || {}, (_extends5 = {}, _extends5[key] = _arrayCopy, _extends5))
	        };
	      }
	      var result = void 0;
	      if (Array.isArray(value)) {
	        result = value;
	      } else if (object[key]) {
	        result = array.map(function (dest) {
	          return typeof value === 'function' ? value(dest) : value;
	        });
	      } else if (typeof value === 'function') {
	        return {
	          v: object
	        }; // don't even set a value under [key]
	      } else {
	          result = value;
	        }
	      return {
	        v: _extends({}, object || {}, (_extends6 = {}, _extends6[key] = result, _extends6))
	      };
	    }();

	    if (typeof _ret === "object") return _ret.v;
	  }
	  return _extends({}, object, (_extends7 = {}, _extends7[path] = typeof value === 'function' ? value(object[path]) : value, _extends7));
	};

	exports.default = write;

/***/ },

/***/ 859:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _fieldValue = __webpack_require__(860);

	/**
	 * A different version of getValues() that does not need the fields array
	 */
	var getValuesFromState = function getValuesFromState(state) {
	  if (!state) {
	    return state;
	  }
	  var keys = Object.keys(state);
	  if (!keys.length) {
	    return undefined;
	  }
	  return keys.reduce(function (accumulator, key) {
	    var field = state[key];
	    if (field) {
	      if (field.hasOwnProperty && field.hasOwnProperty('value')) {
	        if (field.value !== undefined) {
	          accumulator[key] = field.value;
	        }
	      } else if (Array.isArray(field)) {
	        accumulator[key] = field.map(function (arrayField) {
	          return (0, _fieldValue.isFieldValue)(arrayField) ? arrayField.value : getValuesFromState(arrayField);
	        });
	      } else if (typeof field === 'object') {
	        var result = getValuesFromState(field);

	        if (result && Object.keys(result).length > 0) {
	          accumulator[key] = result;
	        }
	      }
	    }
	    return accumulator;
	  }, {});
	};

	exports.default = getValuesFromState;

/***/ },

/***/ 860:
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	exports.makeFieldValue = makeFieldValue;
	exports.isFieldValue = isFieldValue;
	var flag = '_isFieldValue';
	var isObject = function isObject(object) {
	  return typeof object === 'object';
	};

	function makeFieldValue(object) {
	  if (object && isObject(object)) {
	    Object.defineProperty(object, flag, { value: true });
	  }
	  return object;
	}

	function isFieldValue(object) {
	  return !!(object && isObject(object) && object[flag]);
	}

/***/ },

/***/ 861:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _fieldValue = __webpack_require__(860);

	var makeEntry = function makeEntry(value) {
	  return (0, _fieldValue.makeFieldValue)(value === undefined ? {} : { initial: value, value: value });
	};

	/**
	 * Sets the initial values into the state and returns a new copy of the state
	 */
	var initializeState = function initializeState(values, fields) {
	  var state = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

	  if (!fields) {
	    throw new Error('fields must be passed when initializing state');
	  }
	  if (!values || !fields.length) {
	    return state;
	  }
	  var initializeField = function initializeField(path, src, dest) {
	    var dotIndex = path.indexOf('.');
	    if (dotIndex === 0) {
	      return initializeField(path.substring(1), src, dest);
	    }
	    var openIndex = path.indexOf('[');
	    var closeIndex = path.indexOf(']');
	    var result = _extends({}, dest) || {};
	    if (dotIndex >= 0 && (openIndex < 0 || dotIndex < openIndex)) {
	      // is dot notation
	      var key = path.substring(0, dotIndex);
	      result[key] = src[key] && initializeField(path.substring(dotIndex + 1), src[key], result[key] || {});
	    } else if (openIndex >= 0 && (dotIndex < 0 || openIndex < dotIndex)) {
	      (function () {
	        // is array notation
	        if (closeIndex < 0) {
	          throw new Error('found \'[\' but no \']\': \'' + path + '\'');
	        }
	        var key = path.substring(0, openIndex);
	        var srcArray = src[key];
	        var destArray = result[key];
	        var rest = path.substring(closeIndex + 1);
	        if (Array.isArray(srcArray)) {
	          if (rest.length) {
	            // need to keep recursing
	            result[key] = srcArray.map(function (srcValue, srcIndex) {
	              return initializeField(rest, srcValue, destArray && destArray[srcIndex]);
	            });
	          } else {
	            result[key] = srcArray.map(function (srcValue) {
	              return makeEntry(srcValue);
	            });
	          }
	        } else {
	          result[key] = [];
	        }
	      })();
	    } else {
	      result[path] = makeEntry(src && src[path]);
	    }
	    return result;
	  };
	  return fields.reduce(function (accumulator, field) {
	    return initializeField(field, values, accumulator);
	  }, _extends({}, state));
	};

	exports.default = initializeState;

/***/ },

/***/ 862:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _fieldValue = __webpack_require__(860);

	var reset = function reset(value) {
	  return (0, _fieldValue.makeFieldValue)(value === undefined || value && value.initial === undefined ? {} : { initial: value.initial, value: value.initial });
	};

	/**
	 * Sets the initial values into the state and returns a new copy of the state
	 */
	var resetState = function resetState(values) {
	  return values ? Object.keys(values).reduce(function (accumulator, key) {
	    var value = values[key];
	    if (Array.isArray(value)) {
	      accumulator[key] = value.map(function (item) {
	        return (0, _fieldValue.isFieldValue)(item) ? reset(item) : resetState(item);
	      });
	    } else if (value) {
	      if ((0, _fieldValue.isFieldValue)(value)) {
	        accumulator[key] = reset(value);
	      } else if (typeof value === 'object' && value !== null) {
	        accumulator[key] = resetState(value);
	      } else {
	        accumulator[key] = value;
	      }
	    }
	    return accumulator;
	  }, {}) : values;
	};

	exports.default = resetState;

/***/ },

/***/ 863:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _fieldValue = __webpack_require__(860);

	var isMetaKey = function isMetaKey(key) {
	  return key[0] === '_';
	};

	/**
	 * Sets an error on a field deep in the tree, returning a new copy of the state
	 */
	var setErrors = function setErrors(state, errors, destKey) {
	  var clear = function clear() {
	    if (Array.isArray(state)) {
	      return state.map(function (stateItem, index) {
	        return setErrors(stateItem, errors && errors[index], destKey);
	      });
	    }
	    if (state && typeof state === 'object') {
	      var result = Object.keys(state).reduce(function (accumulator, key) {
	        var _extends2;

	        return isMetaKey(key) ? accumulator : _extends({}, accumulator, (_extends2 = {}, _extends2[key] = setErrors(state[key], errors && errors[key], destKey), _extends2));
	      }, state);
	      if ((0, _fieldValue.isFieldValue)(state)) {
	        (0, _fieldValue.makeFieldValue)(result);
	      }
	      return result;
	    }
	    return (0, _fieldValue.makeFieldValue)(state);
	  };
	  if (!errors) {
	    if (!state) {
	      return state;
	    }
	    if (state[destKey]) {
	      var copy = _extends({}, state);
	      delete copy[destKey];
	      return (0, _fieldValue.makeFieldValue)(copy);
	    }
	    return clear();
	  }
	  if (typeof errors === 'string') {
	    var _extends3;

	    return (0, _fieldValue.makeFieldValue)(_extends({}, state, (_extends3 = {}, _extends3[destKey] = errors, _extends3)));
	  }
	  if (Array.isArray(errors)) {
	    if (!state || Array.isArray(state)) {
	      var _ret = function () {
	        var copy = (state || []).map(function (stateItem, index) {
	          return setErrors(stateItem, errors[index], destKey);
	        });
	        errors.forEach(function (errorItem, index) {
	          return copy[index] = setErrors(copy[index], errorItem, destKey);
	        });
	        return {
	          v: copy
	        };
	      }();

	      if (typeof _ret === "object") return _ret.v;
	    }
	    return setErrors(state, errors[0], destKey); // use first error
	  }
	  if ((0, _fieldValue.isFieldValue)(state)) {
	    var _extends4;

	    return (0, _fieldValue.makeFieldValue)(_extends({}, state, (_extends4 = {}, _extends4[destKey] = errors, _extends4)));
	  }
	  var errorKeys = Object.keys(errors);
	  if (!errorKeys.length && !state) {
	    return state;
	  }
	  return errorKeys.reduce(function (accumulator, key) {
	    var _extends5;

	    return isMetaKey(key) ? accumulator : _extends({}, accumulator, (_extends5 = {}, _extends5[key] = setErrors(state && state[key], errors[key], destKey), _extends5));
	  }, clear() || {});
	};

	exports.default = setErrors;

/***/ },

/***/ 864:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.default = normalizeFields;

	var _fieldValue = __webpack_require__(860);

	function extractKey(field) {
	  var dotIndex = field.indexOf('.');
	  var openIndex = field.indexOf('[');
	  var closeIndex = field.indexOf(']');

	  if (openIndex > 0 && closeIndex !== openIndex + 1) {
	    throw new Error('found [ not followed by ]');
	  }

	  var isArray = openIndex > 0 && (dotIndex < 0 || openIndex < dotIndex);
	  var key = void 0;
	  var nestedPath = void 0;

	  if (isArray) {
	    key = field.substring(0, openIndex);
	    nestedPath = field.substring(closeIndex + 1);

	    if (nestedPath[0] === '.') {
	      nestedPath = nestedPath.substring(1);
	    }
	  } else if (dotIndex > 0) {
	    key = field.substring(0, dotIndex);
	    nestedPath = field.substring(dotIndex + 1);
	  } else {
	    key = field;
	  }

	  return { isArray: isArray, key: key, nestedPath: nestedPath };
	}

	function normalizeField(field, fullFieldPath, state, previousState, values, previousValues, normalizers) {
	  if (field.isArray) {
	    if (field.nestedPath) {
	      var _ret = function () {
	        var array = state && state[field.key] || [];
	        var previousArray = previousState && previousState[field.key] || [];
	        var nestedField = extractKey(field.nestedPath);

	        return {
	          v: array.map(function (nestedState, i) {
	            nestedState[nestedField.key] = normalizeField(nestedField, fullFieldPath, nestedState, previousArray[i], values, previousValues, normalizers);

	            return nestedState;
	          })
	        };
	      }();

	      if (typeof _ret === "object") return _ret.v;
	    }

	    var _normalizer = normalizers[fullFieldPath];

	    var result = _normalizer(state && state[field.key], previousState && previousState[field.key], values, previousValues);
	    return field.isArray ? result && result.map(_fieldValue.makeFieldValue) : result;
	  } else if (field.nestedPath) {
	    var nestedState = state && state[field.key] || {};
	    var nestedField = extractKey(field.nestedPath);

	    nestedState[nestedField.key] = normalizeField(nestedField, fullFieldPath, nestedState, previousState && previousState[field.key], values, previousValues, normalizers);

	    return nestedState;
	  }

	  var finalField = state && state[field.key] || {};
	  var normalizer = normalizers[fullFieldPath];

	  finalField.value = normalizer(finalField.value, previousState && previousState[field.key] && previousState[field.key].value, values, previousValues);

	  return (0, _fieldValue.makeFieldValue)(finalField);
	}

	function normalizeFields(normalizers, state, previousState, values, previousValues) {
	  var newState = Object.keys(normalizers).reduce(function (accumulator, field) {
	    var extracted = extractKey(field);

	    accumulator[extracted.key] = normalizeField(extracted, field, state, previousState, values, previousValues, normalizers);

	    return accumulator;
	  }, {});

	  return _extends({}, state, newState);
	}

/***/ },

/***/ 865:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createReduxFormConnector = __webpack_require__(866);

	var _createReduxFormConnector2 = _interopRequireDefault(_createReduxFormConnector);

	var _hoistNonReactStatics = __webpack_require__(183);

	var _hoistNonReactStatics2 = _interopRequireDefault(_hoistNonReactStatics);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * The decorator that is the main API to redux-form
	 */
	var createReduxForm = function createReduxForm(isReactNative, React, connect) {
	  var Component = React.Component;

	  var reduxFormConnector = (0, _createReduxFormConnector2.default)(isReactNative, React, connect);
	  return function (config, mapStateToProps, mapDispatchToProps, mergeProps, options) {
	    return function (WrappedComponent) {
	      var ReduxFormConnector = reduxFormConnector(WrappedComponent, mapStateToProps, mapDispatchToProps, mergeProps, options);
	      var configWithDefaults = _extends({
	        touchOnBlur: true,
	        touchOnChange: false,
	        destroyOnUnmount: true
	      }, config);

	      var ConnectedForm = function (_Component) {
	        _inherits(ConnectedForm, _Component);

	        function ConnectedForm() {
	          _classCallCheck(this, ConnectedForm);

	          return _possibleConstructorReturn(this, _Component.apply(this, arguments));
	        }

	        ConnectedForm.prototype.render = function render() {
	          var _this2 = this;

	          return React.createElement(ReduxFormConnector, _extends({}, configWithDefaults, this.props, {
	            submitPassback: function submitPassback(submit) {
	              return _this2.submit = submit;
	            } }));
	        };

	        return ConnectedForm;
	      }(Component);

	      return (0, _hoistNonReactStatics2.default)(ConnectedForm, WrappedComponent);
	    };
	  };
	};

	exports.default = createReduxForm;

/***/ },

/***/ 866:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _noGetters = __webpack_require__(867);

	var _noGetters2 = _interopRequireDefault(_noGetters);

	var _getDisplayName = __webpack_require__(869);

	var _getDisplayName2 = _interopRequireDefault(_getDisplayName);

	var _createHigherOrderComponent = __webpack_require__(870);

	var _createHigherOrderComponent2 = _interopRequireDefault(_createHigherOrderComponent);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * This component tracks props that affect how the form is mounted to the store. Normally these should not change,
	 * but if they do, the connected components below it need to be redefined.
	 */
	var createReduxFormConnector = function createReduxFormConnector(isReactNative, React, connect) {
	  return function (WrappedComponent, mapStateToProps, mapDispatchToProps, mergeProps, options) {
	    var Component = React.Component;
	    var PropTypes = React.PropTypes;

	    var ReduxFormConnector = function (_Component) {
	      _inherits(ReduxFormConnector, _Component);

	      function ReduxFormConnector(props) {
	        _classCallCheck(this, ReduxFormConnector);

	        var _this = _possibleConstructorReturn(this, _Component.call(this, props));

	        _this.cache = new _noGetters2.default(_this, {
	          ReduxForm: {
	            params: [
	            // props that effect how redux-form connects to the redux store
	            'reduxMountPoint', 'form', 'formKey', 'getFormState'],
	            fn: (0, _createHigherOrderComponent2.default)(props, isReactNative, React, connect, WrappedComponent, mapStateToProps, mapDispatchToProps, mergeProps, options)
	          }
	        });
	        return _this;
	      }

	      ReduxFormConnector.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
	        this.cache.componentWillReceiveProps(nextProps);
	      };

	      ReduxFormConnector.prototype.render = function render() {
	        var ReduxForm = this.cache.get('ReduxForm');
	        // remove some redux-form config-only props
	        var _props = this.props;
	        var reduxMountPoint = _props.reduxMountPoint;
	        var destroyOnUnmount = _props.destroyOnUnmount;
	        var form = _props.form;
	        var getFormState = _props.getFormState;
	        var touchOnBlur = _props.touchOnBlur;
	        var touchOnChange = _props.touchOnChange;

	        var passableProps = _objectWithoutProperties(_props, ['reduxMountPoint', 'destroyOnUnmount', 'form', 'getFormState', 'touchOnBlur', 'touchOnChange']); // eslint-disable-line no-redeclare


	        return React.createElement(ReduxForm, passableProps);
	      };

	      return ReduxFormConnector;
	    }(Component);

	    ReduxFormConnector.displayName = 'ReduxFormConnector(' + (0, _getDisplayName2.default)(WrappedComponent) + ')';
	    ReduxFormConnector.WrappedComponent = WrappedComponent;
	    ReduxFormConnector.propTypes = {
	      destroyOnUnmount: PropTypes.bool,
	      reduxMountPoint: PropTypes.string,
	      form: PropTypes.string.isRequired,
	      formKey: PropTypes.string,
	      getFormState: PropTypes.func,
	      touchOnBlur: PropTypes.bool,
	      touchOnChange: PropTypes.bool
	    };
	    ReduxFormConnector.defaultProps = {
	      reduxMountPoint: 'form',
	      getFormState: function getFormState(state, reduxMountPoint) {
	        return state[reduxMountPoint];
	      }
	    };
	    return ReduxFormConnector;
	  };
	};

	exports.default = createReduxFormConnector;

/***/ },

/***/ 867:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(868);


/***/ },

/***/ 868:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _deepEqual = __webpack_require__(196);

	var _deepEqual2 = _interopRequireDefault(_deepEqual);

	function intersects(array1, array2) {
	  return !!(array1 && array2 && array1.some(function (item) {
	    return ~array2.indexOf(item);
	  }));
	}

	var LazyCache = (function () {
	  function LazyCache(component, calculators) {
	    var _this = this;

	    _classCallCheck(this, LazyCache);

	    this.component = component;
	    this.allProps = [];
	    this.cache = Object.keys(calculators).reduce(function (accumulator, key) {
	      var _extends2;

	      var calculator = calculators[key];
	      var fn = calculator.fn;
	      var paramNames = calculator.params;
	      paramNames.forEach(function (param) {
	        if (! ~_this.allProps.indexOf(param)) {
	          _this.allProps.push(param);
	        }
	      });
	      return _extends({}, accumulator, (_extends2 = {}, _extends2[key] = {
	        value: undefined,
	        props: paramNames,
	        fn: fn
	      }, _extends2));
	    }, {});
	  }

	  LazyCache.prototype.get = function get(key) {
	    var component = this.component;
	    var _cache$key = this.cache[key];
	    var value = _cache$key.value;
	    var fn = _cache$key.fn;
	    var props = _cache$key.props;

	    if (value !== undefined) {
	      return value;
	    }
	    var params = props.map(function (prop) {
	      return component.props[prop];
	    });
	    var result = fn.apply(undefined, params);
	    this.cache[key].value = result;
	    return result;
	  };

	  LazyCache.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
	    var _this2 = this;

	    var component = this.component;

	    var diffProps = [];
	    this.allProps.forEach(function (prop) {
	      if (!_deepEqual2['default'](component.props[prop], nextProps[prop])) {
	        diffProps.push(prop);
	      }
	    });
	    if (diffProps.length) {
	      Object.keys(this.cache).forEach(function (key) {
	        if (intersects(diffProps, _this2.cache[key].props)) {
	          delete _this2.cache[key].value; // uncache value
	        }
	      });
	    }
	  };

	  return LazyCache;
	})();

	exports['default'] = LazyCache;
	module.exports = exports['default'];

/***/ },

/***/ 869:
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	exports.default = getDisplayName;
	function getDisplayName(Comp) {
	  return Comp.displayName || Comp.name || 'Component';
	}

/***/ },

/***/ 870:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _actions = __webpack_require__(871);

	var importedActions = _interopRequireWildcard(_actions);

	var _getDisplayName = __webpack_require__(869);

	var _getDisplayName2 = _interopRequireDefault(_getDisplayName);

	var _reducer = __webpack_require__(854);

	var _deepEqual = __webpack_require__(196);

	var _deepEqual2 = _interopRequireDefault(_deepEqual);

	var _bindActionData = __webpack_require__(872);

	var _bindActionData2 = _interopRequireDefault(_bindActionData);

	var _getValues = __webpack_require__(873);

	var _getValues2 = _interopRequireDefault(_getValues);

	var _isValid = __webpack_require__(874);

	var _isValid2 = _interopRequireDefault(_isValid);

	var _readFields = __webpack_require__(875);

	var _readFields2 = _interopRequireDefault(_readFields);

	var _handleSubmit2 = __webpack_require__(889);

	var _handleSubmit3 = _interopRequireDefault(_handleSubmit2);

	var _asyncValidation = __webpack_require__(890);

	var _asyncValidation2 = _interopRequireDefault(_asyncValidation);

	var _silenceEvents = __webpack_require__(891);

	var _silenceEvents2 = _interopRequireDefault(_silenceEvents);

	var _silenceEvent = __webpack_require__(892);

	var _silenceEvent2 = _interopRequireDefault(_silenceEvent);

	var _wrapMapDispatchToProps = __webpack_require__(893);

	var _wrapMapDispatchToProps2 = _interopRequireDefault(_wrapMapDispatchToProps);

	var _wrapMapStateToProps = __webpack_require__(894);

	var _wrapMapStateToProps2 = _interopRequireDefault(_wrapMapStateToProps);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * Creates a HOC that knows how to create redux-connected sub-components.
	 */
	var createHigherOrderComponent = function createHigherOrderComponent(config, isReactNative, React, connect, WrappedComponent, mapStateToProps, mapDispatchToProps, mergeProps, options) {
	  var Component = React.Component;
	  var PropTypes = React.PropTypes;

	  return function (reduxMountPoint, formName, formKey, getFormState) {
	    var ReduxForm = function (_Component) {
	      _inherits(ReduxForm, _Component);

	      function ReduxForm(props) {
	        _classCallCheck(this, ReduxForm);

	        // bind functions

	        var _this = _possibleConstructorReturn(this, _Component.call(this, props));

	        _this.asyncValidate = _this.asyncValidate.bind(_this);
	        _this.handleSubmit = _this.handleSubmit.bind(_this);
	        _this.fields = (0, _readFields2.default)(props, {}, {}, _this.asyncValidate, isReactNative);
	        var submitPassback = _this.props.submitPassback;

	        submitPassback(function () {
	          return _this.handleSubmit();
	        }); // wrapped in function to disallow params
	        return _this;
	      }

	      ReduxForm.prototype.componentWillMount = function componentWillMount() {
	        var _props = this.props;
	        var fields = _props.fields;
	        var form = _props.form;
	        var initialize = _props.initialize;
	        var initialValues = _props.initialValues;

	        if (initialValues && !form._initialized) {
	          initialize(initialValues, fields);
	        }
	      };

	      ReduxForm.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
	        if (!(0, _deepEqual2.default)(this.props.fields, nextProps.fields) || !(0, _deepEqual2.default)(this.props.form, nextProps.form, { strict: true })) {
	          this.fields = (0, _readFields2.default)(nextProps, this.props, this.fields, this.asyncValidate, isReactNative);
	        }
	        if (!(0, _deepEqual2.default)(this.props.initialValues, nextProps.initialValues)) {
	          this.props.initialize(nextProps.initialValues, nextProps.fields);
	        }
	      };

	      ReduxForm.prototype.componentWillUnmount = function componentWillUnmount() {
	        if (config.destroyOnUnmount) {
	          this.props.destroy();
	        }
	      };

	      ReduxForm.prototype.asyncValidate = function asyncValidate(name, value) {
	        var _this2 = this;

	        var _props2 = this.props;
	        var asyncValidate = _props2.asyncValidate;
	        var dispatch = _props2.dispatch;
	        var fields = _props2.fields;
	        var form = _props2.form;
	        var startAsyncValidation = _props2.startAsyncValidation;
	        var stopAsyncValidation = _props2.stopAsyncValidation;
	        var validate = _props2.validate;

	        var isSubmitting = !name;
	        if (asyncValidate) {
	          var _ret = function () {
	            var values = (0, _getValues2.default)(fields, form);
	            if (name) {
	              values[name] = value;
	            }
	            var syncErrors = validate(values, _this2.props);
	            var allPristine = _this2.fields._meta.allPristine;

	            var initialized = form._initialized;

	            // if blur validating, only run async validate if sync validation passes
	            // and submitting (not blur validation) or form is dirty or form was never initialized
	            var syncValidationPasses = isSubmitting || (0, _isValid2.default)(syncErrors[name]);
	            if (syncValidationPasses && (isSubmitting || !allPristine || !initialized)) {
	              return {
	                v: (0, _asyncValidation2.default)(function () {
	                  return asyncValidate(values, dispatch, _this2.props);
	                }, startAsyncValidation, stopAsyncValidation, name)
	              };
	            }
	          }();

	          if (typeof _ret === "object") return _ret.v;
	        }
	      };

	      ReduxForm.prototype.handleSubmit = function handleSubmit(submitOrEvent) {
	        var _this3 = this;

	        var _props3 = this.props;
	        var onSubmit = _props3.onSubmit;
	        var fields = _props3.fields;
	        var form = _props3.form;

	        var check = function check(submit) {
	          if (!submit || typeof submit !== 'function') {
	            throw new Error('You must either pass handleSubmit() an onSubmit function or pass onSubmit as a prop');
	          }
	          return submit;
	        };
	        return !submitOrEvent || (0, _silenceEvent2.default)(submitOrEvent) ?
	        // submitOrEvent is an event: fire submit
	        (0, _handleSubmit3.default)(check(onSubmit), (0, _getValues2.default)(fields, form), this.props, this.asyncValidate) :
	        // submitOrEvent is the submit function: return deferred submit thunk
	        (0, _silenceEvents2.default)(function () {
	          return (0, _handleSubmit3.default)(check(submitOrEvent), (0, _getValues2.default)(fields, form), _this3.props, _this3.asyncValidate);
	        });
	      };

	      ReduxForm.prototype.render = function render() {
	        var _this4 = this,
	            _ref;

	        var allFields = this.fields;
	        var _props4 = this.props;
	        var addArrayValue = _props4.addArrayValue;
	        var asyncBlurFields = _props4.asyncBlurFields;
	        var blur = _props4.blur;
	        var change = _props4.change;
	        var destroy = _props4.destroy;
	        var focus = _props4.focus;
	        var fields = _props4.fields;
	        var form = _props4.form;
	        var initialValues = _props4.initialValues;
	        var initialize = _props4.initialize;
	        var onSubmit = _props4.onSubmit;
	        var propNamespace = _props4.propNamespace;
	        var reset = _props4.reset;
	        var removeArrayValue = _props4.removeArrayValue;
	        var returnRejectedSubmitPromise = _props4.returnRejectedSubmitPromise;
	        var startAsyncValidation = _props4.startAsyncValidation;
	        var startSubmit = _props4.startSubmit;
	        var stopAsyncValidation = _props4.stopAsyncValidation;
	        var stopSubmit = _props4.stopSubmit;
	        var submitFailed = _props4.submitFailed;
	        var swapArrayValues = _props4.swapArrayValues;
	        var touch = _props4.touch;
	        var untouch = _props4.untouch;
	        var validate = _props4.validate;

	        var passableProps = _objectWithoutProperties(_props4, ['addArrayValue', 'asyncBlurFields', 'blur', 'change', 'destroy', 'focus', 'fields', 'form', 'initialValues', 'initialize', 'onSubmit', 'propNamespace', 'reset', 'removeArrayValue', 'returnRejectedSubmitPromise', 'startAsyncValidation', 'startSubmit', 'stopAsyncValidation', 'stopSubmit', 'submitFailed', 'swapArrayValues', 'touch', 'untouch', 'validate']); // eslint-disable-line no-redeclare


	        var _allFields$_meta = allFields._meta;
	        var allPristine = _allFields$_meta.allPristine;
	        var allValid = _allFields$_meta.allValid;
	        var errors = _allFields$_meta.errors;
	        var formError = _allFields$_meta.formError;
	        var values = _allFields$_meta.values;


	        var props = {
	          // State:
	          active: form._active,
	          asyncValidating: form._asyncValidating,
	          dirty: !allPristine,
	          error: formError,
	          errors: errors,
	          fields: allFields,
	          formKey: formKey,
	          invalid: !allValid,
	          pristine: allPristine,
	          submitting: form._submitting,
	          submitFailed: form._submitFailed,
	          valid: allValid,
	          values: values,

	          // Actions:
	          asyncValidate: (0, _silenceEvents2.default)(function () {
	            return _this4.asyncValidate();
	          }),
	          // ^ doesn't just pass this.asyncValidate to disallow values passing
	          destroyForm: (0, _silenceEvents2.default)(destroy),
	          handleSubmit: this.handleSubmit,
	          initializeForm: (0, _silenceEvents2.default)(function (initValues) {
	            return initialize(initValues, fields);
	          }),
	          resetForm: (0, _silenceEvents2.default)(reset),
	          touch: (0, _silenceEvents2.default)(function () {
	            return touch.apply(undefined, arguments);
	          }),
	          touchAll: (0, _silenceEvents2.default)(function () {
	            return touch.apply(undefined, fields);
	          }),
	          untouch: (0, _silenceEvents2.default)(function () {
	            return untouch.apply(undefined, arguments);
	          }),
	          untouchAll: (0, _silenceEvents2.default)(function () {
	            return untouch.apply(undefined, fields);
	          })
	        };
	        var passedProps = propNamespace ? (_ref = {}, _ref[propNamespace] = props, _ref) : props;
	        return React.createElement(WrappedComponent, _extends({}, passableProps, passedProps));
	      };

	      return ReduxForm;
	    }(Component);

	    ReduxForm.displayName = 'ReduxForm(' + (0, _getDisplayName2.default)(WrappedComponent) + ')';
	    ReduxForm.WrappedComponent = WrappedComponent;
	    ReduxForm.propTypes = {
	      // props:
	      asyncBlurFields: PropTypes.arrayOf(PropTypes.string),
	      asyncValidate: PropTypes.func,
	      dispatch: PropTypes.func.isRequired,
	      fields: PropTypes.arrayOf(PropTypes.string).isRequired,
	      form: PropTypes.object,
	      initialValues: PropTypes.any,
	      onSubmit: PropTypes.func,
	      propNamespace: PropTypes.string,
	      readonly: PropTypes.bool,
	      returnRejectedSubmitPromise: PropTypes.bool,
	      submitPassback: PropTypes.func.isRequired,
	      validate: PropTypes.func,

	      // actions:
	      addArrayValue: PropTypes.func.isRequired,
	      blur: PropTypes.func.isRequired,
	      change: PropTypes.func.isRequired,
	      destroy: PropTypes.func.isRequired,
	      focus: PropTypes.func.isRequired,
	      initialize: PropTypes.func.isRequired,
	      removeArrayValue: PropTypes.func.isRequired,
	      reset: PropTypes.func.isRequired,
	      startAsyncValidation: PropTypes.func.isRequired,
	      startSubmit: PropTypes.func.isRequired,
	      stopAsyncValidation: PropTypes.func.isRequired,
	      stopSubmit: PropTypes.func.isRequired,
	      submitFailed: PropTypes.func.isRequired,
	      swapArrayValues: PropTypes.func.isRequired,
	      touch: PropTypes.func.isRequired,
	      untouch: PropTypes.func.isRequired
	    };
	    ReduxForm.defaultProps = {
	      asyncBlurFields: [],
	      form: _reducer.initialState,
	      readonly: false,
	      returnRejectedSubmitPromise: false,
	      validate: function validate() {
	        return {};
	      }
	    };

	    // bind touch flags to blur and change
	    var unboundActions = _extends({}, importedActions, {
	      blur: (0, _bindActionData2.default)(importedActions.blur, {
	        touch: !!config.touchOnBlur
	      }),
	      change: (0, _bindActionData2.default)(importedActions.change, {
	        touch: !!config.touchOnChange
	      })
	    });

	    // make redux connector with or without form key
	    var decorate = formKey !== undefined && formKey !== null ? connect((0, _wrapMapStateToProps2.default)(mapStateToProps, function (state) {
	      var formState = getFormState(state, reduxMountPoint);
	      if (!formState) {
	        throw new Error('You need to mount the redux-form reducer at "' + reduxMountPoint + '"');
	      }
	      return formState && formState[formName] && formState[formName][formKey];
	    }), (0, _wrapMapDispatchToProps2.default)(mapDispatchToProps, (0, _bindActionData2.default)(unboundActions, {
	      form: formName,
	      key: formKey
	    })), mergeProps, options) : connect((0, _wrapMapStateToProps2.default)(mapStateToProps, function (state) {
	      var formState = getFormState(state, reduxMountPoint);
	      if (!formState) {
	        throw new Error('You need to mount the redux-form reducer at "' + reduxMountPoint + '"');
	      }
	      return formState && formState[formName];
	    }), (0, _wrapMapDispatchToProps2.default)(mapDispatchToProps, (0, _bindActionData2.default)(unboundActions, { form: formName })), mergeProps, options);

	    return decorate(ReduxForm);
	  };
	};

	exports.default = createHigherOrderComponent;

/***/ },

/***/ 871:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.untouch = exports.touch = exports.swapArrayValues = exports.submitFailed = exports.stopSubmit = exports.stopAsyncValidation = exports.startSubmit = exports.startAsyncValidation = exports.reset = exports.removeArrayValue = exports.initialize = exports.focus = exports.destroy = exports.change = exports.blur = exports.addArrayValue = undefined;

	var _actionTypes = __webpack_require__(855);

	var addArrayValue = exports.addArrayValue = function addArrayValue(path, value, index, fields) {
	  return { type: _actionTypes.ADD_ARRAY_VALUE, path: path, value: value, index: index, fields: fields };
	};

	var blur = exports.blur = function blur(field, value) {
	  return { type: _actionTypes.BLUR, field: field, value: value };
	};

	var change = exports.change = function change(field, value) {
	  return { type: _actionTypes.CHANGE, field: field, value: value };
	};

	var destroy = exports.destroy = function destroy() {
	  return { type: _actionTypes.DESTROY };
	};

	var focus = exports.focus = function focus(field) {
	  return { type: _actionTypes.FOCUS, field: field };
	};

	var initialize = exports.initialize = function initialize(data, fields) {
	  if (!Array.isArray(fields)) {
	    throw new Error('must provide fields array to initialize() action creator');
	  }
	  return { type: _actionTypes.INITIALIZE, data: data, fields: fields };
	};

	var removeArrayValue = exports.removeArrayValue = function removeArrayValue(path, index) {
	  return { type: _actionTypes.REMOVE_ARRAY_VALUE, path: path, index: index };
	};

	var reset = exports.reset = function reset() {
	  return { type: _actionTypes.RESET };
	};

	var startAsyncValidation = exports.startAsyncValidation = function startAsyncValidation(field) {
	  return { type: _actionTypes.START_ASYNC_VALIDATION, field: field };
	};

	var startSubmit = exports.startSubmit = function startSubmit() {
	  return { type: _actionTypes.START_SUBMIT };
	};

	var stopAsyncValidation = exports.stopAsyncValidation = function stopAsyncValidation(errors) {
	  return { type: _actionTypes.STOP_ASYNC_VALIDATION, errors: errors };
	};

	var stopSubmit = exports.stopSubmit = function stopSubmit(errors) {
	  return { type: _actionTypes.STOP_SUBMIT, errors: errors };
	};

	var submitFailed = exports.submitFailed = function submitFailed() {
	  return { type: _actionTypes.SUBMIT_FAILED };
	};

	var swapArrayValues = exports.swapArrayValues = function swapArrayValues(path, indexA, indexB) {
	  return { type: _actionTypes.SWAP_ARRAY_VALUES, path: path, indexA: indexA, indexB: indexB };
	};

	var touch = exports.touch = function touch() {
	  for (var _len = arguments.length, fields = Array(_len), _key = 0; _key < _len; _key++) {
	    fields[_key] = arguments[_key];
	  }

	  return { type: _actionTypes.TOUCH, fields: fields };
	};

	var untouch = exports.untouch = function untouch() {
	  for (var _len2 = arguments.length, fields = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	    fields[_key2] = arguments[_key2];
	  }

	  return { type: _actionTypes.UNTOUCH, fields: fields };
	};

/***/ },

/***/ 872:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.default = bindActionData;

	var _mapValues = __webpack_require__(856);

	var _mapValues2 = _interopRequireDefault(_mapValues);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Adds additional properties to the results of the function or map of functions passed
	 */
	function bindActionData(action, data) {
	  if (typeof action === 'function') {
	    return function () {
	      return _extends({}, action.apply(undefined, arguments), data);
	    };
	  }
	  if (typeof action === 'object') {
	    return (0, _mapValues2.default)(action, function (value) {
	      return bindActionData(value, data);
	    });
	  }
	  return action;
	}

/***/ },

/***/ 873:
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	var getValue = function getValue(field, state, dest) {
	  var dotIndex = field.indexOf('.');
	  var openIndex = field.indexOf('[');
	  var closeIndex = field.indexOf(']');
	  if (openIndex > 0 && closeIndex !== openIndex + 1) {
	    throw new Error('found [ not followed by ]');
	  }
	  if (openIndex > 0 && (dotIndex < 0 || openIndex < dotIndex)) {
	    (function () {
	      // array field
	      var key = field.substring(0, openIndex);
	      var rest = field.substring(closeIndex + 1);
	      if (rest[0] === '.') {
	        rest = rest.substring(1);
	      }
	      var array = state && state[key] || [];
	      if (rest) {
	        if (!dest[key]) {
	          dest[key] = [];
	        }
	        array.forEach(function (item, index) {
	          if (!dest[key][index]) {
	            dest[key][index] = {};
	          }
	          getValue(rest, item, dest[key][index]);
	        });
	      } else {
	        dest[key] = array.map(function (item) {
	          return item && item.value;
	        });
	      }
	    })();
	  } else if (dotIndex > 0) {
	    // subobject field
	    var key = field.substring(0, dotIndex);
	    var rest = field.substring(dotIndex + 1);
	    if (!dest[key]) {
	      dest[key] = {};
	    }
	    getValue(rest, state && state[key] || {}, dest[key]);
	  } else {
	    dest[field] = state[field] && state[field].value;
	  }
	};

	var getValues = function getValues(fields, state) {
	  return fields.reduce(function (accumulator, field) {
	    getValue(field, state, accumulator);
	    return accumulator;
	  }, {});
	};

	exports.default = getValues;

/***/ },

/***/ 874:
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	exports.default = isValid;
	function isValid(error) {
	  if (Array.isArray(error)) {
	    return error.reduce(function (valid, errorValue) {
	      return valid && isValid(errorValue);
	    }, true);
	  }
	  if (error && typeof error === 'object') {
	    return Object.keys(error).reduce(function (valid, key) {
	      return valid && isValid(error[key]);
	    }, true);
	  }
	  return !error;
	}

/***/ },

/***/ 875:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _readField = __webpack_require__(876);

	var _readField2 = _interopRequireDefault(_readField);

	var _write = __webpack_require__(858);

	var _write2 = _interopRequireDefault(_write);

	var _getValues = __webpack_require__(873);

	var _getValues2 = _interopRequireDefault(_getValues);

	var _removeField = __webpack_require__(888);

	var _removeField2 = _interopRequireDefault(_removeField);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Reads props and generates (or updates) field structure
	 */
	var readFields = function readFields(props, previousProps, myFields, asyncValidate, isReactNative) {
	  var fields = props.fields;
	  var form = props.form;
	  var validate = props.validate;

	  var previousFields = previousProps.fields;
	  var values = (0, _getValues2.default)(fields, form);
	  var syncErrors = validate(values, props);
	  var errors = {};
	  var formError = syncErrors._error || form._error;
	  var allValid = !formError;
	  var allPristine = true;
	  var tally = function tally(field) {
	    if (field.error) {
	      errors = (0, _write2.default)(field.name, field.error, errors);
	      allValid = false;
	    }
	    if (field.dirty) {
	      allPristine = false;
	    }
	  };
	  var fieldObjects = previousFields ? previousFields.reduce(function (accumulator, previousField) {
	    return ~fields.indexOf(previousField) ? accumulator : (0, _removeField2.default)(accumulator, previousField);
	  }, _extends({}, myFields)) : _extends({}, myFields);
	  fields.forEach(function (name) {
	    (0, _readField2.default)(form, name, undefined, fieldObjects, syncErrors, asyncValidate, isReactNative, props, tally);
	  });
	  Object.defineProperty(fieldObjects, '_meta', {
	    value: {
	      allPristine: allPristine,
	      allValid: allValid,
	      values: values,
	      errors: errors,
	      formError: formError
	    }
	  });
	  return fieldObjects;
	};
	exports.default = readFields;

/***/ },

/***/ 876:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createOnBlur = __webpack_require__(877);

	var _createOnBlur2 = _interopRequireDefault(_createOnBlur);

	var _createOnChange = __webpack_require__(880);

	var _createOnChange2 = _interopRequireDefault(_createOnChange);

	var _createOnDragStart = __webpack_require__(881);

	var _createOnDragStart2 = _interopRequireDefault(_createOnDragStart);

	var _createOnDrop = __webpack_require__(882);

	var _createOnDrop2 = _interopRequireDefault(_createOnDrop);

	var _createOnFocus = __webpack_require__(883);

	var _createOnFocus2 = _interopRequireDefault(_createOnFocus);

	var _silencePromise = __webpack_require__(884);

	var _silencePromise2 = _interopRequireDefault(_silencePromise);

	var _read = __webpack_require__(857);

	var _read2 = _interopRequireDefault(_read);

	var _updateField = __webpack_require__(886);

	var _updateField2 = _interopRequireDefault(_updateField);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function getSuffix(input, closeIndex) {
	  var suffix = input.substring(closeIndex + 1);
	  if (suffix[0] === '.') {
	    suffix = suffix.substring(1);
	  }
	  return suffix;
	}

	var getNextKey = function getNextKey(path) {
	  var dotIndex = path.indexOf('.');
	  var openIndex = path.indexOf('[');
	  if (openIndex > 0 && (dotIndex < 0 || openIndex < dotIndex)) {
	    return path.substring(0, openIndex);
	  }
	  return dotIndex > 0 ? path.substring(0, dotIndex) : path;
	};

	var readField = function readField(state, fieldName) {
	  var pathToHere = arguments.length <= 2 || arguments[2] === undefined ? '' : arguments[2];
	  var fields = arguments[3];
	  var syncErrors = arguments[4];
	  var asyncValidate = arguments[5];
	  var isReactNative = arguments[6];
	  var props = arguments[7];
	  var callback = arguments.length <= 8 || arguments[8] === undefined ? function () {
	    return null;
	  } : arguments[8];
	  var prefix = arguments.length <= 9 || arguments[9] === undefined ? '' : arguments[9];
	  var asyncBlurFields = props.asyncBlurFields;
	  var blur = props.blur;
	  var change = props.change;
	  var focus = props.focus;
	  var form = props.form;
	  var initialValues = props.initialValues;
	  var readonly = props.readonly;
	  var addArrayValue = props.addArrayValue;
	  var removeArrayValue = props.removeArrayValue;
	  var swapArrayValues = props.swapArrayValues;

	  var dotIndex = fieldName.indexOf('.');
	  var openIndex = fieldName.indexOf('[');
	  var closeIndex = fieldName.indexOf(']');
	  if (openIndex > 0 && closeIndex !== openIndex + 1) {
	    throw new Error('found [ not followed by ]');
	  }

	  if (openIndex > 0 && (dotIndex < 0 || openIndex < dotIndex)) {
	    var _ret = function () {
	      // array field
	      var key = fieldName.substring(0, openIndex);
	      var rest = getSuffix(fieldName, closeIndex);
	      var stateArray = state && state[key] || [];
	      var fullPrefix = prefix + fieldName.substring(0, closeIndex + 1);
	      var subfields = props.fields.reduce(function (accumulator, field) {
	        if (field.indexOf(fullPrefix) === 0) {
	          accumulator.push(field);
	        }
	        return accumulator;
	      }, []).map(function (field) {
	        return getSuffix(field, prefix.length + closeIndex);
	      });
	      var addMethods = function addMethods(dest) {
	        Object.defineProperty(dest, 'addField', {
	          value: function value(_value, index) {
	            return addArrayValue(pathToHere + key, _value, index, subfields);
	          }
	        });
	        Object.defineProperty(dest, 'removeField', {
	          value: function value(index) {
	            return removeArrayValue(pathToHere + key, index);
	          }
	        });
	        Object.defineProperty(dest, 'swapFields', {
	          value: function value(indexA, indexB) {
	            return swapArrayValues(pathToHere + key, indexA, indexB);
	          }
	        });
	        return dest;
	      };
	      if (!fields[key] || fields[key].length !== stateArray.length) {
	        fields[key] = fields[key] ? [].concat(fields[key]) : [];
	        addMethods(fields[key]);
	      }
	      var fieldArray = fields[key];
	      var changed = false;
	      stateArray.forEach(function (fieldState, index) {
	        if (rest && !fieldArray[index]) {
	          fieldArray[index] = {};
	          changed = true;
	        }
	        var dest = rest ? fieldArray[index] : {};
	        var nextPath = '' + pathToHere + key + '[' + index + ']' + (rest ? '.' : '');
	        var nextPrefix = '' + prefix + key + '[]' + (rest ? '.' : '');

	        var result = readField(fieldState, rest, nextPath, dest, syncErrors, asyncValidate, isReactNative, props, callback, nextPrefix);
	        if (!rest && fieldArray[index] !== result) {
	          // if nothing after [] in field name, assign directly to array
	          fieldArray[index] = result;
	          changed = true;
	        }
	      });
	      if (fieldArray.length > stateArray.length) {
	        // remove extra items that aren't in state array
	        fieldArray.splice(stateArray.length, fieldArray.length - stateArray.length);
	      }
	      return {
	        v: changed ? addMethods([].concat(fieldArray)) : fieldArray
	      };
	    }();

	    if (typeof _ret === "object") return _ret.v;
	  }
	  if (dotIndex > 0) {
	    // subobject field
	    var key = fieldName.substring(0, dotIndex);
	    var rest = fieldName.substring(dotIndex + 1);
	    var subobject = fields[key] || {};
	    var nextPath = pathToHere + key + '.';
	    var nextKey = getNextKey(rest);
	    var previous = subobject[nextKey];
	    var result = readField(state[key] || {}, rest, nextPath, subobject, syncErrors, asyncValidate, isReactNative, props, callback, nextPath);
	    if (result !== previous) {
	      var _extends2;

	      subobject = _extends({}, subobject, (_extends2 = {}, _extends2[nextKey] = result, _extends2));
	    }
	    fields[key] = subobject;
	    return subobject;
	  }
	  var name = pathToHere + fieldName;
	  var field = fields[fieldName] || {};
	  if (field.name !== name) {
	    var onChange = (0, _createOnChange2.default)(name, change, isReactNative);
	    var initialFormValue = (0, _read2.default)(name + '.initial', form);
	    var initialValue = initialFormValue || (0, _read2.default)(name, initialValues);
	    field.name = name;
	    field.defaultChecked = initialValue === true;
	    field.defaultValue = initialValue;
	    field.initialValue = initialValue;
	    if (!readonly) {
	      field.onBlur = (0, _createOnBlur2.default)(name, blur, isReactNative, ~asyncBlurFields.indexOf(name) && function (blurName, blurValue) {
	        return (0, _silencePromise2.default)(asyncValidate(blurName, blurValue));
	      });
	      field.onChange = onChange;
	      field.onDragStart = (0, _createOnDragStart2.default)(name, function () {
	        return field.value;
	      });
	      field.onDrop = (0, _createOnDrop2.default)(name, change);
	      field.onFocus = (0, _createOnFocus2.default)(name, focus);
	      field.onUpdate = onChange; // alias to support belle. https://github.com/nikgraf/belle/issues/58
	    }
	    field.valid = true;
	    field.invalid = false;
	    Object.defineProperty(field, '_isField', { value: true });
	  }

	  var fieldState = (fieldName ? state[fieldName] : state) || {};
	  var syncError = (0, _read2.default)(name, syncErrors);
	  var updated = (0, _updateField2.default)(field, fieldState, name === form._active, syncError);
	  if (fieldName || fields[fieldName] !== updated) {
	    fields[fieldName] = updated;
	  }
	  callback(updated);
	  return updated;
	};

	exports.default = readField;

/***/ },

/***/ 877:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _getValue = __webpack_require__(878);

	var _getValue2 = _interopRequireDefault(_getValue);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var createOnBlur = function createOnBlur(name, blur, isReactNative, afterBlur) {
	  return function (event) {
	    var value = (0, _getValue2.default)(event, isReactNative);
	    blur(name, value);
	    if (afterBlur) {
	      afterBlur(name, value);
	    }
	  };
	};
	exports.default = createOnBlur;

/***/ },

/***/ 878:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _isEvent = __webpack_require__(879);

	var _isEvent2 = _interopRequireDefault(_isEvent);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var getSelectedValues = function getSelectedValues(options) {
	  var result = [];
	  if (options) {
	    for (var index = 0; index < options.length; index++) {
	      var option = options[index];
	      if (option.selected) {
	        result.push(option.value);
	      }
	    }
	  }
	  return result;
	};

	var getValue = function getValue(event, isReactNative) {
	  if ((0, _isEvent2.default)(event)) {
	    if (!isReactNative && event.nativeEvent && event.nativeEvent.text !== undefined) {
	      return event.nativeEvent.text;
	    }
	    if (isReactNative && event.nativeEvent !== undefined) {
	      return event.nativeEvent.text;
	    }
	    var _event$target = event.target;
	    var type = _event$target.type;
	    var value = _event$target.value;
	    var checked = _event$target.checked;
	    var files = _event$target.files;
	    var dataTransfer = event.dataTransfer;

	    if (type === 'checkbox') {
	      return checked;
	    }
	    if (type === 'file') {
	      return files || dataTransfer && dataTransfer.files;
	    }
	    if (type === 'select-multiple') {
	      return getSelectedValues(event.target.options);
	    }
	    return value;
	  }
	  // not an event, so must be either our value or an object containing our value in the 'value' key
	  return event && typeof event === 'object' && event.value !== undefined ? event.value : // extract value from { value: value } structure. https://github.com/nikgraf/belle/issues/58
	  event;
	};

	exports.default = getValue;

/***/ },

/***/ 879:
/***/ function(module, exports) {

	"use strict";

	exports.__esModule = true;
	var isEvent = function isEvent(candidate) {
	  return !!(candidate && candidate.stopPropagation && candidate.preventDefault);
	};

	exports.default = isEvent;

/***/ },

/***/ 880:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _getValue = __webpack_require__(878);

	var _getValue2 = _interopRequireDefault(_getValue);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var createOnChange = function createOnChange(name, change, isReactNative) {
	  return function (event) {
	    return change(name, (0, _getValue2.default)(event, isReactNative));
	  };
	};
	exports.default = createOnChange;

/***/ },

/***/ 881:
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	var dataKey = exports.dataKey = 'value';
	var createOnDragStart = function createOnDragStart(name, getValue) {
	  return function (event) {
	    event.dataTransfer.setData(dataKey, getValue());
	  };
	};

	exports.default = createOnDragStart;

/***/ },

/***/ 882:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _createOnDragStart = __webpack_require__(881);

	var createOnDrop = function createOnDrop(name, change) {
	  return function (event) {
	    change(name, event.dataTransfer.getData(_createOnDragStart.dataKey));
	  };
	};
	exports.default = createOnDrop;

/***/ },

/***/ 883:
/***/ function(module, exports) {

	"use strict";

	exports.__esModule = true;
	var createOnFocus = function createOnFocus(name, focus) {
	  return function () {
	    return focus(name);
	  };
	};
	exports.default = createOnFocus;

/***/ },

/***/ 884:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _isPromise = __webpack_require__(885);

	var _isPromise2 = _interopRequireDefault(_isPromise);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var noop = function noop() {
	  return undefined;
	};

	var silencePromise = function silencePromise(promise) {
	  return (0, _isPromise2.default)(promise) ? promise.then(noop, noop) : promise;
	};

	exports.default = silencePromise;

/***/ },

/***/ 885:
/***/ function(module, exports) {

	module.exports = isPromise;

	function isPromise(obj) {
	  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
	}


/***/ },

/***/ 886:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _isPristine = __webpack_require__(887);

	var _isPristine2 = _interopRequireDefault(_isPristine);

	var _isValid = __webpack_require__(874);

	var _isValid2 = _interopRequireDefault(_isValid);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Updates a field object from the store values
	 */
	var updateField = function updateField(field, formField, active, syncError) {
	  var diff = {};

	  // update field value
	  if (field.value !== formField.value) {
	    diff.value = formField.value;
	    diff.checked = typeof formField.value === 'boolean' ? formField.value : undefined;
	  }

	  // update dirty/pristine
	  var pristine = (0, _isPristine2.default)(formField.value, formField.initial);
	  if (field.pristine !== pristine) {
	    diff.dirty = !pristine;
	    diff.pristine = pristine;
	  }

	  // update field error
	  var error = syncError || formField.submitError || formField.asyncError;
	  if (error !== field.error) {
	    diff.error = error;
	  }
	  var valid = (0, _isValid2.default)(error);
	  if (field.valid !== valid) {
	    diff.invalid = !valid;
	    diff.valid = valid;
	  }

	  if (active !== field.active) {
	    diff.active = active;
	  }
	  var touched = !!formField.touched;
	  if (touched !== field.touched) {
	    diff.touched = touched;
	  }
	  var visited = !!formField.visited;
	  if (visited !== field.visited) {
	    diff.visited = visited;
	  }

	  if ('initial' in formField && formField.initial !== field.initialValue) {
	    field.defaultChecked = formField.initial === true;
	    field.defaultValue = formField.initial;
	    field.initialValue = formField.initial;
	  }

	  return Object.keys(diff).length ? _extends({}, field, diff) : field;
	};
	exports.default = updateField;

/***/ },

/***/ 887:
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	exports.default = isPristine;
	function isPristine(initial, data) {
	  if (initial === data) {
	    return true;
	  }
	  if (typeof initial === 'boolean' || typeof data === 'boolean') {
	    return initial === data;
	  } else if (initial instanceof Date && data instanceof Date) {
	    return initial.getTime() === data.getTime();
	  } else if (initial && typeof initial === 'object') {
	    if (!data || typeof data !== 'object') {
	      return false;
	    }
	    var initialKeys = Object.keys(initial);
	    var dataKeys = Object.keys(data);
	    if (initialKeys.length !== dataKeys.length) {
	      return false;
	    }
	    for (var index = 0; index < dataKeys.length; index++) {
	      var key = dataKeys[index];
	      if (!isPristine(initial[key], data[key])) {
	        return false;
	      }
	    }
	  } else if (initial || data) {
	    // allow '' to equate to undefined or null
	    return initial === data;
	  }
	  return true;
	}

/***/ },

/***/ 888:
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var without = function without(object, key) {
	  var copy = _extends({}, object);
	  delete copy[key];
	  return copy;
	};

	var removeField = function removeField(fields, path) {
	  var dotIndex = path.indexOf('.');
	  var openIndex = path.indexOf('[');
	  var closeIndex = path.indexOf(']');
	  if (openIndex > 0 && closeIndex !== openIndex + 1) {
	    throw new Error('found [ not followed by ]');
	  }
	  if (openIndex > 0 && (dotIndex < 0 || openIndex < dotIndex)) {
	    var _ret = function () {
	      // array field
	      var key = path.substring(0, openIndex);
	      if (!Array.isArray(fields[key])) {
	        return {
	          v: without(fields, key)
	        };
	      }
	      var rest = path.substring(closeIndex + 1);
	      if (rest[0] === '.') {
	        rest = rest.substring(1);
	      }
	      if (rest) {
	        var _ret2 = function () {
	          var _extends2;

	          var copy = [];
	          fields[key].forEach(function (item, index) {
	            var result = removeField(item, rest);
	            if (Object.keys(result).length) {
	              copy[index] = result;
	            }
	          });
	          return {
	            v: {
	              v: copy.length ? _extends({}, fields, (_extends2 = {}, _extends2[key] = copy, _extends2)) : without(fields, key)
	            }
	          };
	        }();

	        if (typeof _ret2 === "object") return _ret2.v;
	      }
	      return {
	        v: without(fields, key)
	      };
	    }();

	    if (typeof _ret === "object") return _ret.v;
	  }
	  if (dotIndex > 0) {
	    var _extends3;

	    // subobject field
	    var key = path.substring(0, dotIndex);
	    var rest = path.substring(dotIndex + 1);
	    if (!fields[key]) {
	      return fields;
	    }
	    var result = removeField(fields[key], rest);
	    return Object.keys(result).length ? _extends({}, fields, (_extends3 = {}, _extends3[key] = removeField(fields[key], rest), _extends3)) : without(fields, key);
	  }
	  return without(fields, path);
	};

	exports.default = removeField;

/***/ },

/***/ 889:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _isPromise = __webpack_require__(885);

	var _isPromise2 = _interopRequireDefault(_isPromise);

	var _isValid = __webpack_require__(874);

	var _isValid2 = _interopRequireDefault(_isValid);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var handleSubmit = function handleSubmit(submit, values, props, asyncValidate) {
	  var dispatch = props.dispatch;
	  var fields = props.fields;
	  var startSubmit = props.startSubmit;
	  var stopSubmit = props.stopSubmit;
	  var submitFailed = props.submitFailed;
	  var returnRejectedSubmitPromise = props.returnRejectedSubmitPromise;
	  var touch = props.touch;
	  var validate = props.validate;

	  var syncErrors = validate(values, props);
	  touch.apply(undefined, fields); // touch all fields
	  if ((0, _isValid2.default)(syncErrors)) {
	    var doSubmit = function doSubmit() {
	      var result = submit(values, dispatch);
	      if ((0, _isPromise2.default)(result)) {
	        startSubmit();
	        return result.then(function (submitResult) {
	          stopSubmit();
	          return submitResult;
	        }, function (submitError) {
	          stopSubmit(submitError);
	          if (returnRejectedSubmitPromise) {
	            return Promise.reject(submitError);
	          }
	        });
	      }
	      return result;
	    };
	    var asyncValidateResult = asyncValidate();
	    return (0, _isPromise2.default)(asyncValidateResult) ?
	    // asyncValidateResult will be rejected if async validation failed
	    asyncValidateResult.then(doSubmit, function () {
	      submitFailed();
	      return returnRejectedSubmitPromise ? Promise.reject() : Promise.resolve();
	    }) : doSubmit(); // no async validation, so submit
	  }
	  submitFailed();

	  if (returnRejectedSubmitPromise) {
	    return Promise.reject(syncErrors);
	  }
	};

	exports.default = handleSubmit;

/***/ },

/***/ 890:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _isPromise = __webpack_require__(885);

	var _isPromise2 = _interopRequireDefault(_isPromise);

	var _isValid = __webpack_require__(874);

	var _isValid2 = _interopRequireDefault(_isValid);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var asyncValidation = function asyncValidation(fn, start, stop, field) {
	  start(field);
	  var promise = fn();
	  if (!(0, _isPromise2.default)(promise)) {
	    throw new Error('asyncValidate function passed to reduxForm must return a promise');
	  }
	  var handleErrors = function handleErrors(rejected) {
	    return function (errors) {
	      if (!(0, _isValid2.default)(errors)) {
	        stop(errors);
	        return Promise.reject();
	      } else if (rejected) {
	        stop();
	        throw new Error('Asynchronous validation promise was rejected without errors.');
	      }
	      stop();
	      return Promise.resolve();
	    };
	  };
	  return promise.then(handleErrors(false), handleErrors(true));
	};

	exports.default = asyncValidation;

/***/ },

/***/ 891:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _silenceEvent = __webpack_require__(892);

	var _silenceEvent2 = _interopRequireDefault(_silenceEvent);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var silenceEvents = function silenceEvents(fn) {
	  return function (event) {
	    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	      args[_key - 1] = arguments[_key];
	    }

	    return (0, _silenceEvent2.default)(event) ? fn.apply(undefined, args) : fn.apply(undefined, [event].concat(args));
	  };
	};

	exports.default = silenceEvents;

/***/ },

/***/ 892:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _isEvent = __webpack_require__(879);

	var _isEvent2 = _interopRequireDefault(_isEvent);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var silenceEvent = function silenceEvent(event) {
	  var is = (0, _isEvent2.default)(event);
	  if (is) {
	    event.preventDefault();
	  }
	  return is;
	};

	exports.default = silenceEvent;

/***/ },

/***/ 893:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _redux = __webpack_require__(166);

	var wrapMapDispatchToProps = function wrapMapDispatchToProps(mapDispatchToProps, actionCreators) {
	  if (mapDispatchToProps) {
	    if (typeof mapDispatchToProps === 'function') {
	      if (mapDispatchToProps.length > 1) {
	        return function (dispatch, ownProps) {
	          return _extends({
	            dispatch: dispatch
	          }, mapDispatchToProps(dispatch, ownProps), (0, _redux.bindActionCreators)(actionCreators, dispatch));
	        };
	      }
	      return function (dispatch) {
	        return _extends({
	          dispatch: dispatch
	        }, mapDispatchToProps(dispatch), (0, _redux.bindActionCreators)(actionCreators, dispatch));
	      };
	    }
	    return function (dispatch) {
	      return _extends({
	        dispatch: dispatch
	      }, (0, _redux.bindActionCreators)(mapDispatchToProps, dispatch), (0, _redux.bindActionCreators)(actionCreators, dispatch));
	    };
	  }
	  return function (dispatch) {
	    return _extends({
	      dispatch: dispatch
	    }, (0, _redux.bindActionCreators)(actionCreators, dispatch));
	  };
	};

	exports.default = wrapMapDispatchToProps;

/***/ },

/***/ 894:
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var wrapMapStateToProps = function wrapMapStateToProps(mapStateToProps, getForm) {
	  if (mapStateToProps) {
	    if (typeof mapStateToProps !== 'function') {
	      throw new Error('mapStateToProps must be a function');
	    }
	    if (mapStateToProps.length > 1) {
	      return function (state, ownProps) {
	        return _extends({}, mapStateToProps(state, ownProps), {
	          form: getForm(state)
	        });
	      };
	    }
	    return function (state) {
	      return _extends({}, mapStateToProps(state), {
	        form: getForm(state)
	      });
	    };
	  }
	  return function (state) {
	    return {
	      form: getForm(state)
	    };
	  };
	};

	exports.default = wrapMapStateToProps;

/***/ },

/***/ 895:
/***/ function(module, exports) {

	"use strict";

	exports.__esModule = true;
	var createPropTypes = function createPropTypes(_ref) {
	  var _ref$PropTypes = _ref.PropTypes;
	  var any = _ref$PropTypes.any;
	  var bool = _ref$PropTypes.bool;
	  var string = _ref$PropTypes.string;
	  var func = _ref$PropTypes.func;
	  var object = _ref$PropTypes.object;
	  return {
	    // State:
	    active: string, // currently active field
	    asyncValidating: bool.isRequired, // true if async validation is running
	    dirty: bool.isRequired, // true if any values are different from initialValues
	    error: any, // form-wide error from '_error' key in validation result
	    errors: object, // a map of errors corresponding to structure of form data (result of validation)
	    fields: object.isRequired, // the map of fields
	    formKey: any, // the form key if one was provided (used when doing multirecord forms)
	    invalid: bool.isRequired, // true if there are any validation errors
	    pristine: bool.isRequired, // true if the values are the same as initialValues
	    submitting: bool.isRequired, // true if the form is in the process of being submitted
	    submitFailed: bool.isRequired, // true if the form was submitted and failed for any reason
	    valid: bool.isRequired, // true if there are no validation errors
	    values: object.isRequired, // the values of the form as they will be submitted

	    // Actions:
	    asyncValidate: func.isRequired, // function to trigger async validation
	    destroyForm: func.isRequired, // action to destroy the form's data in Redux
	    handleSubmit: func.isRequired, // function to submit the form
	    initializeForm: func.isRequired, // action to initialize form data
	    resetForm: func.isRequired, // action to reset the form data to previously initialized values
	    touch: func.isRequired, // action to mark fields as touched
	    touchAll: func.isRequired, // action to mark ALL fields as touched
	    untouch: func.isRequired, // action to mark fields as untouched
	    untouchAll: func.isRequired // action to mark ALL fields as untouched
	  };
	};

	exports.default = createPropTypes;

/***/ },

/***/ 897:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(898);

/***/ },

/***/ 898:
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	* @providesModule shallowCompare
	*/

	'use strict';

	var shallowEqual = __webpack_require__(117);

	/**
	 * Does a shallow comparison for props and state.
	 * See ReactComponentWithPureRenderMixin
	 */
	function shallowCompare(instance, nextProps, nextState) {
	  return !shallowEqual(instance.props, nextProps) || !shallowEqual(instance.state, nextState);
	}

	module.exports = shallowCompare;

/***/ },

/***/ 899:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.get = get;
	exports.getSite = getSite;
	exports.getWarehouse = getWarehouse;

	var _options = __webpack_require__(900);

	var _options2 = _interopRequireDefault(_options);

	var _masterDataConstants = __webpack_require__(901);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	function get() {
	  // console.log('action get data-->',OPTIONS_DATA);
	  return {
	    type: _masterDataConstants.FETCH_OPTIONS,
	    datas: _options2.default
	  };
	}

	function getSite(compid) {
	  // console.log('compid-->',compid)

	  var options = _objectWithoutProperties(_options2.default, []);
	  // console.log('OPTIONS_DATA.locations-->',options.locations)


	  var sites = options.locations.filter(function (site) {
	    return site.comid == compid;
	  });
	  // console.log('sites-->',sites)
	  options.locations = sites;
	  return {
	    type: _masterDataConstants.SELECTED_COMPANY,
	    datas: options,
	    selected: compid
	  };
	}

	function getWarehouse(props) {
	  var siteid = props.siteid;
	  var options = props.options;
	  // console.log('props-->',props);
	  // console.log('options-->',options);
	  // console.log('siteid-->',siteid)

	  var optionsWare = _objectWithoutProperties(_options2.default, []);
	  // console.log('optionsWare-->',optionsWare.warehouses)


	  var warehouses = optionsWare.warehouses.filter(function (warehouse) {
	    return warehouse.locationid == siteid;
	  });
	  options.warehouses = warehouses;
	  // console.log('after options-->',options)
	  return {
	    type: _masterDataConstants.SELECTED_WAREHOUSES,
	    datas: options,
	    selected: siteid
	  };
	}

/***/ },

/***/ 900:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  roles: [{ id: 1, name: 'Admin' }, { id: 2, name: 'User' }],
	  currs: [{ id: 1, name: 'USD' }, { id: 2, name: 'AED' }, { id: 3, name: 'SAR' }, { id: 4, name: 'OMR' }, { id: 5, name: 'JOD' }, { id: 6, name: 'LBP' }],
	  companies: [{ id: 1, code: 'CSL', name: 'CSL' }, { id: 2, code: 'MAM', name: 'MAM' }, { id: 3, code: 'MAT', name: 'MAT' }, { id: 4, code: 'MDO', name: 'MDO' }, { id: 5, code: 'MJW', name: 'MJW' }, { id: 6, code: 'MME', name: 'MME' }, { id: 7, code: 'MMF', name: 'MMF' }, { id: 8, code: 'MMU', name: 'MMU' }, { id: 9, code: 'STS', name: 'STS' }],
	  locations: [{ id: 1, code: 'CSL-APS', name: 'CSL-APS', comid: 1 }, { id: 2, code: 'CSL-CNS', name: 'CSL-CNS', comid: 1 }, { id: 3, code: 'CSL.HO', name: 'CSL.HO', comid: 1 }, { id: 4, code: 'LEB.AB', name: 'Comptoir Suisse Lebanon', comid: 1 }, { id: 5, code: 'LEB.ABCD', name: 'CSL ABC Dbayeh Mall', comid: 1 }, { id: 6, code: 'LEB.CH', name: 'Chopard Gold Souk', comid: 1 }, { id: 7, code: 'LEB.DF', name: 'Beirut Airport Duty Free', comid: 1 }, { id: 8, code: 'LEB.GS', name: 'Mouawad Gold Souk', comid: 1 }, { id: 9, code: 'LEB.HU', name: 'Hublot Gold Souk', comid: 1 }, { id: 10, code: 'LEB.MVB', name: 'LEB.MVB', comid: 1 }, { id: 11, code: 'JOR.RO', name: 'Le Royal Hotel', comid: 2 }, { id: 12, code: 'MAM.APS', name: 'MAM.APS', comid: 2 }, { id: 13, code: 'MAM-CNS', name: 'MAM-CNS', comid: 2 }, { id: 14, code: 'MAM.HO', name: 'MAM.HO', comid: 2 }, { id: 15, code: 'MAT-CNS', name: 'MAT-CNS', comid: 3 }, { id: 16, code: 'MAT.HO', name: 'MAT.HO', comid: 3 }, { id: 17, code: 'SAU.AM', name: 'SAU.AM', comid: 3 }, { id: 18, code: 'SAU.JS', name: 'Mouawad Jameel Square', comid: 3 }, { id: 19, code: 'SAU.KC', name: 'SAU.KC', comid: 3 }, { id: 20, code: 'SAU.MAC', name: 'Mouawad Aknaz Center', comid: 3 }, { id: 21, code: 'MDO-APS', name: 'MDO-APS', comid: 4 }, { id: 22, code: 'MDO-CNS', name: 'MDO-CNS', comid: 4 }, { id: 23, code: 'MDO.HO', name: 'MDO.HO', comid: 4 }, { id: 24, code: 'QAT.LA', name: 'Mouawad Doha-Lagoona Mall', comid: 4 }, { id: 25, code: 'MJW-APS', name: 'MJW-APS', comid: 5 }, { id: 26, code: 'MJW-CNS', name: 'MJW-CNS', comid: 5 }, { id: 27, code: 'MJW.HO', name: 'MJW.HO', comid: 5 }, { id: 28, code: 'UAE.DM', name: 'Mouawad Dubai Mall', comid: 5 }, { id: 29, code: 'UAE.NT', name: 'Mouawad Nation Tower', comid: 5 }, { id: 30, code: 'MME.AT', name: 'MME.AT', comid: 6 }, { id: 31, code: 'MME.HO', name: 'MME.HO', comid: 6 }, { id: 32, code: 'MME-APS', name: 'MME-APS', comid: 6 }, { id: 33, code: 'MME-CNS', name: 'MME-CNS', comid: 6 }, { id: 34, code: 'MMF.APS', name: 'MMF.APS', comid: 7 }, { id: 35, code: 'MMF.CNS', name: 'MMF.CNS', comid: 7 }, { id: 36, code: 'MMF.HO', name: 'MMF.HO', comid: 7 }, { id: 37, code: 'MMU-APS', name: 'MMU-APS', comid: 8 }, { id: 38, code: 'MMU-CNS', name: 'MMU-CNS', comid: 8 }, { id: 39, code: 'MMU.HO', name: 'MMU.HO', comid: 8 }, { id: 40, code: 'OMA.OG', name: 'Mouawad Opera Galleria', comid: 8 }, { id: 41, code: 'STS.HO', name: 'STS.HO', comid: 9 }, { id: 42, code: 'STS-APS', name: 'STS-APS', comid: 9 }, { id: 43, code: 'STS.JEDTAH', name: 'STS.JEDTAH', comid: 9 }, { id: 44, code: 'STS.MKHAM', name: 'STS.MKHAM', comid: 9 }, { id: 45, code: 'STS.RUHAKN', name: 'STS.RUHAKN', comid: 9 }],
	  warehouses: [{ id: 1, code: 'CSL.APPR', name: 'CSL Approval Warehouse', locationid: 1 }, { id: 2, code: 'CSL.CONS', name: 'CSL Consignment Warehouse', locationid: 2 }, { id: 3, code: 'CSL.TRAN', name: 'CSL Transit Warehouse', locationid: 3 }, { id: 4, code: 'LEB.AB1', name: 'Comptoir Suisse Lebanon', locationid: 4 }, { id: 5, code: 'LEB.ABCD1', name: 'CSL ABC Dbayeh Mall', locationid: 5 }, { id: 6, code: 'LEB.CH', name: 'Chopard Gold Souk', locationid: 6 }, { id: 7, code: 'LEB.DF1', name: 'Beirut Airport Duty Free', locationid: 7 }, { id: 8, code: 'LEB.GS', name: 'Mouawad Gold Souk', locationid: 8 }, { id: 9, code: 'LEB.HU', name: 'Hublot Gold Souk', locationid: 9 }, { id: 10, code: 'LEB.MVB', name: 'Mouawad Grand Hill Hotel', locationid: 10 }, { id: 11, code: 'JOR.RO1', name: 'MAM Le Royal Hotel Mouawad Amman', locationid: 11 }, { id: 12, code: 'MAM.APPR', name: 'MAM Approval Warehouse', locationid: 12 }, { id: 13, code: 'MAM.CONS', name: 'MAM Consignment Warehouse', locationid: 13 }, { id: 14, code: 'MAM.TRAN', name: 'MAM Transit Warehouse', locationid: 14 }, { id: 15, code: 'MAT.APPR', name: 'MAT Approval Warehouse', locationid: 15 }, { id: 16, code: 'MAT.CONS', name: 'MAT Consigment Warehouse', locationid: 16 }, { id: 17, code: 'MAT.TRAN', name: 'MAT Transit Warehouse', locationid: 16 }, { id: 18, code: 'MGT.FACF01', name: 'OBJETSF', locationid: 16 }, { id: 19, code: 'MGT.FACG02', name: 'ATELIERSF - Semi-Finished', locationid: 16 }, { id: 20, code: 'MGT.FACG10', name: 'SCATRY01', locationid: 16 }, { id: 21, code: 'MGT.FACP01', name: 'Factory Pricer', locationid: 16 }, { id: 22, code: 'MGT.FACS05', name: 'Broken Stone', locationid: 16 }, { id: 23, code: 'MGT.FACS11', name: 'Precious & Semi Precious Stones', locationid: 16 }, { id: 24, code: 'MGT.FACSE1', name: 'Precious & Semi Precious Stones', locationid: 16 }, { id: 25, code: 'MGT.FACSE8', name: 'Semi Precious Stone (GP)', locationid: 16 }, { id: 26, code: 'MGT.FACW04', name: 'Watches Location 4', locationid: 16 }, { id: 27, code: 'MGT.HO1', name: 'Central Safe , Head Office', locationid: 16 }, { id: 28, code: 'MGT.HOBA', name: 'Head Office MBB Goods', locationid: 16 }, { id: 29, code: 'MGT.HOCTL', name: 'Control Department - MHS', locationid: 16 }, { id: 30, code: 'MGT.HOD', name: 'Lady,s Watches Counter', location: 16 }, { id: 31, code: 'MGT.HOEXAD', name: 'External Relation Administration', locationid: 16 }, { id: 32, code: 'MGT.HOHRD', name: 'Human Resource Department', locationid: 16 }, { id: 33, code: 'MGT.HOOBA', name: 'Object of Arts counter', locationid: 16 }, { id: 34, code: 'MZA6', name: 'S', locationid: 17 }, { id: 35, code: 'SAU.AM1', name: 'Alrashid Mall', locationid: 17 }, { id: 36, code: 'SAU.BA1', name: 'Administrator', locationid: 16 }, { id: 37, code: 'SAU.BA11', name: 'ROGER DUBUIS WATCHES', locationid: 16 }, { id: 38, code: 'SAU.BA12', name: 'Repairs', locationid: 16 }, { id: 39, code: 'SAU.BA6', name: 'Other Watches', locationid: 16 }, { id: 40, code: 'SAU.BA7', name: 'Roberge Watches', locationid: 16 }, { id: 41, code: 'SAU.Custom', name: 'Customs', locationid: 16 }, { id: 42, code: 'SAU.JS', name: 'Mouawad jameel Square', locationid: 18 }, { id: 43, code: 'SAU.JSRP', name: 'Royal Protocol GOC,s', locationid: 16 }, { id: 44, code: 'SAU.JSVIP', name: 'VIP Customers GOC,s', locationid: 16 }, { id: 45, code: 'SAU.KC', name: 'Kingdom Center', locationid: 19 }, { id: 46, code: 'SAU.MAC', name: 'Mouawad Aknaz Center', locationid: 20 }, { id: 47, code: 'SAU.MACRP', name: 'Royal Protocol GOC,s', locationid: 16 }, { id: 48, code: 'SAU.MACVIP', name: 'VIP Customers GOC,s', locationid: 16 }, { id: 49, code: 'SAU.MIS', name: 'General Warehouse, Jeddah', locationid: 16 }, { id: 50, code: 'SAU.OL1', name: 'Mouawad new Olaya Transit', locationid: 16 }, { id: 51, code: 'SAU.OLM2', name: 'Mouawad New Olaya M2', locationid: 16 }, { id: 52, code: 'SAU.OLSTA', name: 'Swiss Time Avenue, Riyadh', locationid: 16 }, { id: 53, code: 'SAU.YING', name: 'Ying Mashwara', locationid: 16 }, { id: 54, code: 'TRANSITR60', name: 'Riyadh 60 Administrator', locationid: 16 }, { id: 55, code: 'MDO.APPR', name: 'MDO Approval Warehouse', locationid: 21 }, { id: 56, code: 'MDO.CONS', name: 'MDO Consignment Warehouse', locationid: 22 }, { id: 57, code: 'MDO.TRAN', name: 'MDO Transit Warehouse', locationid: 23 }, { id: 58, code: 'QAT.FSH', name: 'Four Season Hotel', locationid: 23 }, { id: 59, code: 'QAT.LA', name: 'Mouawad Jewellery, Doha-Lagoona Mall', locationid: 24 }, { id: 60, code: 'MJW.APPR', name: 'MJW Approval Warehouse', locationid: 25 }, { id: 61, code: 'MJW.CONS', name: 'MJW Consignment Warehouse', locationid: 26 }, { id: 62, code: 'MJW.TRAN', name: 'MJW Transit Warehouse', locationid: 27 }, { id: 63, code: 'UAE.DM1', name: 'Mouawad Dubai Mall', locationid: 28 }, { id: 64, code: 'UAE.NT1', name: 'Mouawad Nation Tower', locationid: 29 }, { id: 65, code: 'BAH.MAL1', name: 'Diwan Al Malaki', locationid: 30 }, { id: 66, code: 'MAL.SH1', name: 'Mouawad Kuala Lumpur', locationid: 30 }, { id: 67, code: 'MBC.FAC1', name: 'Mouawad Bangkok for melting', locationid: 30 }, { id: 68, code: 'MBC.FAC2', name: 'Mouawad Bangkok for melting', locationid: 30 }, { id: 69, code: 'MBC.MEL', name: 'Mouawad Bangkok for melting', locationid: 30 }, { id: 70, code: 'MGT.HOBAH', name: 'Mouawad Bahrain (showroom closed)', locationid: 30 }, { id: 71, code: 'MGT.HOBRN', name: 'BRUNEI-R', locationid: 30 }, { id: 72, code: 'MGT.HORUZ', name: 'Ruzzone', locationid: 30 }, { id: 73, code: 'MJOR.RO1', name: 'Mouawad Amman', locationid: 31 }, { id: 74, code: 'MKUW.HL1', name: 'Mouawad Kuwait', locationid: 31 }, { id: 75, code: 'MLEB.AB1', name: 'Comptoir Suisse Lebanon', locationid: 31 }, { id: 76, code: 'MLEB.ABCD1', name: 'CSL ABC Dbayeh Mall', locationid: 31 }, { id: 77, code: 'MLEB.CH', name: 'Chopard Gold Souk', locationid: 31 }, { id: 78, code: 'MLEB.DF1', name: 'Beirut Airport Duty Free', locationid: 31 }, { id: 79, code: 'MLEB.GS', name: 'Mouawad Gold Souk', locationid: 31 }, { id: 80, code: 'MLEB.HU', name: 'Hublot Gold Souk', locationid: 31 }, { id: 81, code: 'MLEB.RMM', name: 'Robert Mouawad Museum', locationid: 31 }, { id: 82, code: 'MME.APPR', name: 'MME Approval Warehouse', locationid: 32 }, { id: 83, code: 'MME.CONS', name: 'MME Consigment Warehouse', locationid: 33 }, { id: 84, code: 'MME.MPM', name: 'Mr. Pascal Mouawad', locationid: 30 }, { id: 85, code: 'MME.Other', name: 'Other Company Stock', locationid: 31 }, { id: 86, code: 'MME.TRAN', name: 'MME Transit Warehouse', locationid: 30 }, { id: 87, code: 'MME.UAEFAC', name: 'Factory Consignment Stock', locationid: 30 }, { id: 88, code: 'MMM.FAC1', name: 'Manufacture Mouawad SA (ltd.)', locationid: 30 }, { id: 89, code: 'MOMA.KP1', name: 'Mouawad Muscat', locationid: 31 }, { id: 90, code: 'MOMA.OG1', name: 'Mouawad Opera Galleria', locationid: 31 }, { id: 91, code: 'MQAT.LA', name: 'Mouawad Jewellery, Doha-Lagoona Mall', locationid: 31 }, { id: 92, code: 'MSA.HO1', name: 'Mouawad Geneva', locationid: 30 }, { id: 93, code: 'MSA.HOEX1', name: 'MSA Geneva', locationid: 30 }, { id: 94, code: 'MSA.PF1', name: 'Mouawad SA - Port Franc', locationid: 30 }, { id: 95, code: 'MSAU.AM1', name: 'Khobar Showroom', locationid: 31 }, { id: 96, code: 'MSAU.BA11', name: 'ROGER DUBUIS WATCHES', locationid: 31 }, { id: 97, code: 'MSAU.BA12', name: 'Repairs', locationid: 31 }, { id: 98, code: 'MSAU.BA6', name: 'Other Watches', locationid: 31 }, { id: 99, code: 'MSAU.BA7', name: 'Roberge Watches', locationid: 31 }, { id: 100, code: 'MSAU.JS', name: 'Mouawad Jameel Square', locationid: 31 }, { id: 101, code: 'MSAU.MAC', name: 'Mouawad Aknaz Center', locationid: 31 }, { id: 102, code: 'MUAE.DM1', name: 'Mouawad Dubai Mall', locationid: 31 }, { id: 103, code: 'MUAE.NT1', name: 'Mouawad Nation Tower', locationid: 31 }, { id: 104, code: 'SIN.FH1', name: 'Mouawad Singapore', locationid: 30 }, { id: 105, code: 'UAE.AA1', name: 'Mr. Ahmad Alaily', locationid: 30 }, { id: 106, code: 'UAE.AT1', name: 'Mouawad Dubai Almas Tower', locationid: 30 }, { id: 107, code: 'UAE.CERT', name: 'Al Mas Certificates (LAB)', locationid: 30 }, { id: 108, code: 'UAE.HRD', name: 'Human Resource Department > Dubai', locationid: 30 }, { id: 109, code: 'UAE.JSA', name: 'Dubai Jewelry Safe 1', locationid: 30 }, { id: 110, code: 'UAE.JSA1', name: 'Dubai Jewelry Safe 1', locationid: 30 }, { id: 111, code: 'UAE.OSA', name: 'Dubai Object of Arts Safe', locationid: 30 }, { id: 112, code: 'UAE.WSA', name: 'Dubai Watches Safe', locationid: 30 }, { id: 113, code: 'USA.HO1', name: 'Mouawad USA', locationid: 30 }, { id: 114, code: 'USA.PGEM', name: 'Premier Gem Corp', locationid: 30 }, { id: 115, code: 'MMF.APPR', name: 'MMF Approval Warehouse', locationid: 34 }, { id: 116, code: 'MMF.CONS', name: 'MMF Consignment Warehouse', locationid: 35 }, { id: 117, code: 'MMF.FACP', name: 'Dubai Factory Pricing', locationid: 36 }, { id: 118, code: 'MMF.TRAN', name: 'MMF Transit Warehouse', locationid: 36 }, { id: 119, code: 'UAE.FAC01', name: 'Mouawad Mena Factory - Safe', locationid: 36 }, { id: 120, code: 'UAE.FAC02', name: 'Mouawad Mena Factory - OBJ', locationid: 36 }, { id: 121, code: 'UAE.FAC03', name: 'UAE Factory', locationid: 36 }, { id: 122, code: 'UAE.FAC04', name: 'UAE Factory', locationid: 36 }, { id: 123, code: 'MMU.APPR', name: 'MMU Approval Warehouse', locationid: 37 }, { id: 124, code: 'MMU.CONS', name: 'MMU Consignment Warehouse', locationid: 38 }, { id: 125, code: 'MMU.TRAN', name: 'MMU Transit Warehouse', locationid: 39 }, { id: 126, code: 'OMA.KP1', name: 'Mouawad Muscat', locationid: 39 }, { id: 127, code: 'OMA.OG1', name: 'MMU Mouawad Opera Galleria', locationid: 40 }, { id: 128, code: 'STS.ACT', name: 'STS-Actual', locationid: 41 }, { id: 129, code: 'STS.APPR', name: 'STS Approval Warehouse', locationid: 42 }, { id: 130, code: 'STS.DXB', name: 'STS-Dubai DXB', locationid: 41 }, { id: 131, code: 'STS.GVA01', name: 'STS - Geneva Exhibition', locationid: 41 }, { id: 132, code: 'STS.HK1', name: 'STS Hong Kong', locationid: 41 }, { id: 133, code: 'STS.HODXB1', name: 'STS - Dubai Head Office', locationid: 41 }, { id: 134, code: 'STS.HOJED1', name: 'STS - Jeddah Head Office', locationid: 41 }, { id: 135, code: 'STS.HOKP', name: 'STS - Head Office K.S.A Pricing', locationid: 41 }, { id: 136, code: 'STS.HORUH1', name: 'STS - Riyadh Head Office', locationid: 41 }, { id: 137, code: 'STS.JEDTAH', name: 'STS-Jeddah Tahlia Mall Showroom', locationid: 43 }, { id: 138, code: 'STS.MAL1', name: 'STS - MALAYSIA', locationid: 41 }, { id: 139, code: 'STS.MBCMEL', name: 'STS melting location', locationid: 41 }, { id: 140, code: 'STS.MKHAM1', name: 'STS - Khobar Al Rashed Mall Showroom', locationid: 44 }, { id: 141, code: 'STS.RUHAKN', name: 'STS - Riyadh Aknaz Centre Showroom', locationid: 45 }, { id: 142, code: 'STS.SIN1', name: 'STS - SINGAPORE', locationid: 41 }, { id: 143, code: 'STS.SOLD', name: 'STS-Sold SKU', locationid: 41 }, { id: 144, code: 'STS.TRAN', name: 'STS Transit Warehouse', locationid: 41 }, { id: 145, code: 'STS.UAETRB', name: 'STA Dubai Trebor Jewelry Stock', locationid: 41 }],
	  countries: [{ id: 1, name: 'British Virgin Islands' }, { id: 2, name: 'Hong Kong' }, { id: 3, name: 'Jordan' }, { id: 4, name: 'Kingdom of Saudi Arabia (KSA)' }, { id: 5, name: 'Kuwait' }, { id: 6, name: 'Lebanon' }, { id: 7, name: 'Malaysia' }, { id: 8, name: 'Oman' }, { id: 9, name: 'Qatar' }, { id: 10, name: 'Singapore' }, { id: 11, name: 'Switzerland' }, { id: 12, name: 'Thailand' }, { id: 13, name: 'United Arab Emirates' }, { id: 14, name: 'USA' }],
	  productGroups: [{ id: 1, code: 'STO', name: 'Stone' }, { id: 2, code: 'JLY', name: 'Jewelry' }, { id: 3, code: 'WAT', name: 'Watch' }, { id: 4, code: 'ACC', name: 'Accessory' }, { id: 5, code: 'OBA', name: 'Object Of Art' }, { id: 6, code: 'SPP', name: 'Spare Parts' }],
	  stoneType: [{ id: 1, name: 'Agate' }, { id: 2, name: 'Amethyst' }, { id: 3, name: 'Aquamarine' }, { id: 4, name: 'Brown Obsidian' }, { id: 5, name: 'Citrine' }, { id: 6, name: 'Diamond' }, { id: 7, name: 'Diamond Factory - Broken stones' }, { id: 8, name: 'Diamond on consignment with us (GOC)' }, { id: 9, name: 'Emerald' }, { id: 10, name: 'Emerald Factory - Broken stone' }, { id: 11, name: 'Emerald on consignment with us (GOC)' }, { id: 12, name: 'Garnet' }, { id: 13, name: 'Jadeite' }, { id: 14, name: 'Kunzite' }, { id: 15, name: 'Mother of Pearl' }, { id: 16, name: 'None' }, { id: 17, name: 'Onyx' }, { id: 18, name: 'Opal' }, { id: 19, name: 'Other' }, { id: 20, name: 'Pearl' }, { id: 21, name: 'Pearl on consignment with us (GOC)' }, { id: 22, name: 'Peridot' }, { id: 23, name: 'Prayer Beads GPY on consignment with us (GOC)' }, { id: 24, name: 'Prayer Beads Stone' }, { id: 25, name: 'Ruby' }, { id: 26, name: 'Ruby on consignment with us (GOC)' }, { id: 27, name: 'Sapphire' }, { id: 28, name: 'Sapphire Factory - Broken stone' }, { id: 29, name: 'Sapphire on consignment with us (GOC)' }, { id: 30, name: 'Semi Precious Stone' }, { id: 31, name: 'Semi Precious Stone - Broken stones' }, { id: 32, name: 'Semi-precious on consignment with us (GOC)' }, { id: 33, name: 'Spinel' }, { id: 34, name: 'Tanzanite' }, { id: 35, name: 'Topaz' }, { id: 36, name: 'Tourmaline' }, { id: 37, name: 'Tsavorite' }, { id: 38, name: 'Turquoise' }],
	  cutShape: [{ id: 1, name: 'Asscher' }, { id: 2, name: 'Baguette' }, { id: 3, name: 'Bead' }, { id: 4, name: 'Briolette' }, { id: 5, name: 'Cabochon' }, { id: 6, name: 'Cushion' }, { id: 7, name: 'Drop' }, { id: 8, name: 'Emerald Cut' }, { id: 9, name: 'Fancy' }, { id: 10, name: 'Half Moon' }, { id: 11, name: 'Heart' }, { id: 12, name: 'Hexagonal' }, { id: 13, name: 'Kite' }, { id: 14, name: 'Marquise' }, { id: 15, name: 'Octagonal' }, { id: 16, name: 'Oval' }, { id: 17, name: 'Pear' }, { id: 18, name: 'Princess Cut' }, { id: 19, name: 'Radiant' }, { id: 20, name: 'Rectangular' }, { id: 21, name: 'Rose Cut' }, { id: 22, name: 'Round' }, { id: 23, name: 'Single Cut' }, { id: 24, name: 'Square' }, { id: 25, name: 'Sugar Loaf' }, { id: 26, name: 'Taper' }, { id: 27, name: 'Triangle' }, { id: 28, name: 'Trilliant' }],
	  cutGrades: [{ id: 1, name: 'Excellent' }, { id: 2, name: 'Ideal' }, { id: 3, name: 'Very Good' }, { id: 4, name: 'Good' }, { id: 5, name: 'Fair' }, { id: 6, name: 'Poor' }],
	  colors: [{ id: 'AMB', name: 'Amber' }, { id: 'BEG', name: 'Beige' }, { id: 'BLK', name: 'Black' }, { id: 'BLU', name: 'Blue' }, { id: 'BRN', name: 'Brown' }, { id: 'BRN-FDRK', name: 'Brown Fancy Dark' }, { id: 'BRN-FLGT', name: 'Brown Fancy Light' }, { id: 'BRN-FNT', name: 'Brown Faint' }, { id: 'BRN-LGT', name: 'Brown Light' }, { id: 'BRN-VLGT', name: 'Brown Very Light' }, { id: 'CRM', name: 'Cream' }, { id: 'CU', name: 'Copper' }, { id: 'D', name: 'White' }, { id: 'D-E', name: 'White' }, { id: 'D-F', name: 'White' }, { id: 'DINT', name: 'Yellow' }, { id: 'DRK', name: 'Yellow' }, { id: 'DRK-BLU', name: 'Dark Blue' }, { id: 'E', name: 'White' }, { id: 'E-F', name: 'White' }, { id: 'F', name: 'White' }, { id: 'FC-BRN', name: 'Fancy Brown' }, { id: 'FC-BYEL', name: 'Fancy Brownish Yellow' }, { id: 'FCDPPPNK', name: 'Fancy Deep Purplish Pink' }, { id: 'FC-DYEL', name: 'Fancy Deep Yellow' }, { id: 'FC-IPNK', name: 'Fancy Intense Pink' }, { id: 'FC-IYEL', name: 'Fancy Intense Yellow' }, { id: 'FC-LPNK', name: 'Fancy Light Pink' }, { id: 'FC-LYEL', name: 'Fancy Light Yellow' }, { id: 'FC-OBRN', name: 'Fancy Orangey Brown' }, { id: 'FC-ORN', name: 'Fancy Orange' }, { id: 'FC-PNK', name: 'Fancy Pink' }, { id: 'FC-VBLU', name: 'Fancy Vivid Blue' }, { id: 'FC-VPNK', name: 'Fancy Vivid Pink' }, { id: 'FC-VRED', name: 'Fancy Vivid Red' }, { id: 'FC-VYEL', name: 'Fancy Vivid Yellow' }, { id: 'FCY', name: 'Fancy' }, { id: 'FC-YBRN', name: 'Fanc Yellowish Brown' }, { id: 'FC-YGRN', name: 'Fancy Yellowish Green' }, { id: 'FC-YORN', name: 'Fance Yellowish Orange' }, { id: 'FC-YPNK', name: 'Fancy Yellow Pink' }, { id: 'FCY-X-Y', name: 'Fancy' }, { id: 'FCY-YLW', name: 'Fancy Yellow' }, { id: 'FDEP', name: 'Yellow' }, { id: 'FDRK', name: 'Grey' }, { id: 'F-G', name: 'White' }, { id: 'F-H', name: 'White' }, { id: 'F-I', name: 'White' }, { id: 'FLGT', name: 'Yellow' }, { id: 'FVVD', name: 'Yellow' }, { id: 'G', name: 'White' }, { id: 'G-H', name: 'White' }, { id: 'G-I', name: 'Brown' }, { id: 'GLD', name: 'Gold' }, { id: 'GRN', name: 'Green' }, { id: 'GRY', name: 'Grey' }, { id: 'GRY-LGT', name: 'Grey Light' }, { id: 'GRY-VLGT', name: 'Grey Very Light' }, { id: 'H', name: 'White' }, { id: 'H-F', name: 'H-F' }, { id: 'H-G', name: 'White' }, { id: 'H-I', name: 'White' }, { id: 'H-J', name: 'White' }, { id: 'I', name: 'Yellow' }, { id: 'I-J', name: 'White' }, { id: 'I-K', name: 'White' }, { id: 'J', name: 'White' }, { id: 'J-K', name: 'White' }, { id: 'K', name: 'White' }, { id: 'K-L', name: 'White' }, { id: 'K-M', name: 'White' }, { id: 'K-N', name: 'White' }, { id: 'L', name: 'White' }, { id: 'LGT', name: 'Pink' }, { id: 'LGT-BLU', name: 'Light Blue' }, { id: 'M', name: 'Yellow' }, { id: 'MED', name: 'Yellow' }, { id: 'MED-BLK', name: 'Medium Black' }, { id: 'MED-BLU', name: 'Medium Blue' }, { id: 'MED-FCY', name: 'Medium Fancy' }, { id: 'MED-GRN', name: 'Medium Green' }, { id: 'MED-ORN', name: 'Medium Orange' }, { id: 'MED-PNK', name: 'Medium Pink' }, { id: 'MED-RED', name: 'Medium Red' }, { id: 'MED-VLT', name: 'Medium Violet' }, { id: 'MED-WHT', name: 'Medium White' }, { id: 'MIX', name: 'Mix Color' }, { id: 'N', name: 'White' }, { id: 'N-O', name: 'N-O' }, { id: 'O', name: 'White' }, { id: 'O-P', name: 'Yellow' }, { id: 'ORN', name: 'Orange' }, { id: 'PNK', name: 'Pink' }, { id: 'PPK', name: 'Purplish Pink' }, { id: 'P-Q', name: 'Yellow' }, { id: 'PRP', name: 'Purple' }, { id: 'Q-R', name: 'Yellow' }, { id: 'RED', name: 'Red' }, { id: 'R-S', name: 'Yellow' }, { id: 'S', name: 'White' }, { id: 'SLV', name: 'Silver' }, { id: 'S-T', name: 'Yellow' }, { id: 'T', name: 'White' }, { id: 'TTLB', name: 'White' }, { id: 'U', name: 'White' }, { id: 'U-V', name: 'U-V Range' }, { id: 'VLGT', name: 'Yellow' }, { id: 'VLT', name: 'Violet' }, { id: 'W', name: 'White' }, { id: 'WHT', name: 'White' }, { id: 'W-X', name: 'Yellow' }, { id: 'X-W', name: 'X-W' }, { id: 'X-Y', name: 'Yellow' }, { id: 'Y', name: 'White' }, { id: 'YEL', name: 'Yellow' }, { id: 'YELW', name: 'Yellowish White' }, { id: 'YELW-FCY', name: 'Yellowish White Fancy' }, { id: 'YELW-FDEP', name: 'Yellowish White Fancy Deep' }, { id: 'YELW-FDRK', name: 'Yellowish White Fancy Dark' }, { id: 'YELW-FLGT', name: 'Yellowish White Fancy Light' }, { id: 'YELW-LGT', name: 'Yellowish White Light' }, { id: 'YLW', name: 'Yellow' }, { id: 'Y-Z', name: 'Yellow' }, { id: 'Z', name: 'White' }],
	  colorGrades: [{ id: 0, name: 'Diamond White', disabled: true }, { id: 1, name: 'D' }, { id: 2, name: 'E' }, { id: 3, name: 'F' }, { id: 4, name: 'G' }, { id: 5, name: 'H' }, { id: 6, name: 'I' }, { id: 7, name: 'J' }, { id: 8, name: 'K' }, { id: 9, name: 'L' }, { id: 10, name: 'M' }, { id: 11, name: 'N' }, { id: 12, name: 'O' }, { id: 13, name: 'P' }, { id: 14, name: 'Q' }, { id: 15, name: 'R' }, { id: 16, name: 'S' }, { id: 17, name: 'T' }, { id: 18, name: 'U' }, { id: 19, name: 'V' }, { id: 20, name: 'W' }, { id: 21, name: 'X' }, { id: 22, name: 'Y' }, { id: 23, name: 'Z' }, { id: 24, name: 'TTLB' }, { id: 251, name: 'Diamond Fancy', disabled: true }, { id: 25, name: 'Faint' }, { id: 26, name: 'Very Light' }, { id: 27, name: 'Light' }, { id: 28, name: 'Fancy Light' }, { id: 29, name: 'Fancy' }, { id: 30, name: 'Fancy Dark' }, { id: 31, name: 'Fancy Intense' }, { id: 32, name: 'Fancy Vivid' }, { id: 33, name: 'Fancy Deep' }, { id: 341, name: 'Fancy', disabled: true }, { id: 34, name: 'Very Light' }, { id: 35, name: 'Light' }, { id: 36, name: 'Medium' }, { id: 37, name: 'Intense' }, { id: 38, name: 'Dark' }],
	  clarities: [{ id: 'FL', name: 'FL' }, { id: 'I1', name: 'I1' }, { id: 'I1-I2', name: 'I1-I2' }, { id: 'I1-I3', name: 'I1-I3' }, { id: 'I2', name: 'I2' }, { id: 'I3', name: 'I3' }, { id: 'IF', name: 'IF' }, { id: 'IF-VVS2', name: 'IF-VVS2' }, { id: 'SI1', name: 'SI1' }, { id: 'SI1-I1', name: 'SI1-I1' }, { id: 'SI1-I2', name: 'SI1-I2' }, { id: 'SI1-SI2', name: 'SI1-SI2' }, { id: 'SI2', name: 'SI2' }, { id: 'SI2-I1', name: 'SI2-I1' }, { id: 'SI2-SI1', name: 'SI2-SI1' }, { id: 'VS1', name: 'VS1' }, { id: '-VS1', name: '-VS1' }, { id: 'VS1-I1', name: 'VS1-I1' }, { id: 'VS1-I3', name: 'VS1-I3' }, { id: 'VS1-SI1', name: 'VS1-SI1' }, { id: 'VS1-SI2', name: 'VS1-SI2' }, { id: 'VS1-VS2', name: 'VS1-VS2' }, { id: 'VS1-VVS2', name: 'VS1-VVS2' }, { id: 'VS2', name: 'VS2' }, { id: 'VS2-I1', name: 'VS2-I1' }, { id: 'VS2-SI1', name: 'VS2-SI1' }, { id: 'VS2-SI2', name: 'VS2-SI2' }, { id: 'VS2-VS1', name: 'VS2-VS1' }, { id: 'VVS1', name: 'VVS1' }, { id: 'VVS1-I1', name: 'VVS1-I1' }, { id: 'VVS1-SI1', name: 'VVS1-SI1' }, { id: 'VVS1-SI2', name: 'VVS1-SI2' }, { id: 'VVS1-VS1', name: 'VVS1-VS1' }, { id: 'VVS1-VS2', name: 'VVS1-VS2' }, { id: 'VVS1-VVS2', name: 'VVS1-VVS2' }, { id: 'VVS2', name: 'VVS2' }, { id: 'VVS2-SI1', name: 'VVS2-SI1' }, { id: 'VVS2-SI2', name: 'VVS2-SI2' }, { id: 'VVS2-VS2', name: 'VVS2-VS2' }],
	  certificateLabs: [{ id: 'AGL', name: 'AGL' }, { id: 'AIGS', name: 'AIGS' }, { id: 'GIA', name: 'GIA' }, { id: 'GIT', name: 'GIT' }, { id: 'GRS', name: 'GRS' }, { id: 'Gubelin', name: 'Gubelin' }, { id: 'HRD', name: 'HRD' }, { id: 'IGI', name: 'IGI' }, { id: 'MOUAWAD', name: 'MOUAWAD' }, { id: 'SSEF', name: 'SSEF' }],
	  polishs: [{ id: 'Excellent', name: 'Excellent' }, { id: 'VeryGood', name: 'VeryGood' }, { id: 'Good', name: 'Good' }, { id: 'Fair', name: 'Fair' }, { id: 'Poor', name: 'Poor' }],
	  symmetries: [{ id: 'Excellent', name: 'Excellent' }, { id: 'VeryGood', name: 'VeryGood' }, { id: 'Good', name: 'Good' }, { id: 'Fair', name: 'Fair' }, { id: 'Poor', name: 'Poor' }],
	  treatments: [{ id: 'Amber', name: 'Amber' }, { id: 'Beige', name: 'Beige' }, { id: 'Black', name: 'Black' }, { id: 'Blue', name: 'Blue' }, { id: 'Bluish Green', name: 'Bluish Green' }, { id: 'Bronze', name: 'Bronze' }, { id: 'Brown', name: 'Brown' }, { id: 'Brownish Red', name: 'Brownish Red' }, { id: 'Cream', name: 'Cream' }, { id: 'Fancy', name: 'Fancy' }, { id: 'Gold', name: 'Gold' }, { id: 'Gray', name: 'Gray' }, { id: 'Green', name: 'Green' }, { id: 'Orange', name: 'Orange' }, { id: 'Pink', name: 'Pink' }, { id: 'Purplish Pink', name: 'Purplish Pink' }, { id: 'Purplish Red', name: 'Purplish Red' }, { id: 'Red', name: 'Red' }, { id: 'Remains', name: 'Remains' }, { id: 'Silver', name: 'Silver' }, { id: 'Violet', name: 'Violet' }, { id: 'White', name: 'White' }, { id: 'Yellow', name: 'Yellow' }, { id: 'Yellow Green', name: 'Yellow Green' }],
	  fluorescences: [{ id: 'Intense', name: 'Intense' }, { id: 'Strong', name: 'Strong' }, { id: 'Medium', name: 'Medium' }, { id: 'Slight', name: 'Slight' }],
	  origins: [],
	  jewelryCategories: [{ id: 'A', name: 'A	[	Wedding Ring	]' }, { id: 'ADC', name: 'ADC	[	Wedding Ring with a centre diamond	]' }, { id: 'AM', name: 'AM	[	Wedding-Ring Manufactured	]' }, { id: 'AQ', name: 'AQ	[	Wedding-Ring Semi-finished	]' }, { id: 'AY', name: 'AY	[	Wedding-Ring	]' }, { id: 'B', name: 'B	[	Bracelet	]' }, { id: 'BD', name: 'BD	[	Bracelet for Lady\'s Watch	]' }, { id: 'BDC', name: 'BDC	[	Bracelat with large centre diamond	]' }, { id: 'BDQ', name: 'BDQ	[	Lady\'s Bracelet Semi-finished purchase	]' }, { id: 'BDY', name: 'BDY	[	Bracelet for lady\'s watch con	]' }, { id: 'BH', name: 'BH	[	Bracelet for Gent\'s Watch	]' }, { id: 'BHQ', name: 'BHQ	[	Gent\'s Bracelet Semi-finished purchase	]' }, { id: 'BM', name: 'BM	[	Bracelet Manufactured	]' }, { id: 'BQ', name: 'BQ	[	BRACELET Semi-finished purchased	]' }, { id: 'BY', name: 'BY	[	Bracelet on consignment with us(GOC)	]' }, { id: 'C', name: 'C	[	Earrings	]' }, { id: 'CDC', name: 'CDC	[	Earring with Large Center Stone	]' }, { id: 'CDCY', name: 'CDCY	[	Earrings with Center Stone	]' }, { id: 'CM', name: 'CM	[	Earring Manufactured	]' }, { id: 'CQ', name: 'CQ	[	Earring Semi-finished purchase	]' }, { id: 'CY', name: 'CY	[	Earings on consignment with us (GOC)	]' }, { id: 'E', name: 'E	[	Set	]' }, { id: 'EC', name: 'EC	[	Etampe	]' }, { id: 'EMM', name: 'EMM	[	Set Manufactured	]' }, { id: 'EQ', name: 'EQ	[	Set Semi-finished purchase	]' }, { id: 'EY', name: 'EY	[	Set on consignment with us (GOC)	]' }, { id: 'G', name: 'G	[	Prayer Beads	]' }, { id: 'GM', name: 'GM	[	Prayer Beads Manufactured	]' }, { id: 'GQ', name: 'GQ	[	Prayer Beads Semi finished purchased	]' }, { id: 'GV', name: 'GV	[	Prayer Beads	]' }, { id: 'J', name: 'J	[	GUINEA (an English gold coin)	]' }, { id: 'M', name: 'M	[	Pendant	]' }, { id: 'MDC', name: 'MDC	[	Pendant with large centre diamond	]' }, { id: 'MDCY', name: 'MDCY	[	Pendant with Center Stone	]' }, { id: 'MM', name: 'MM	[	Pendant Manufactured	]' }, { id: 'MQ', name: 'MQ	[	Pendant Semi-finished purchase	]' }, { id: 'MTB', name: 'MTB	[	Motif Bracelet	]' }, { id: 'MY', name: 'MY	[	Pendant "Medallions" on consignment	]' }, { id: 'N', name: 'N	[	Necklace	]' }, { id: 'NDC', name: 'NDC	[	Necklace with large centre diamond	]' }, { id: 'NM', name: 'NM	[	Necklace Manufactured	]' }, { id: 'NQ', name: 'NQ	[	NECKLACE Semi-finished purchase	]' }, { id: 'NY', name: 'NY	[	Necklace on consignment with us (GOC)	]' }, { id: 'P', name: 'P	[	Cufflinks	]' }, { id: 'PDC', name: 'PDC	[	Cufflinks with large centre diamond	]' }, { id: 'PM', name: 'PM	[	Cufflinks Manufactured	]' }, { id: 'PQ', name: 'PQ	[	Cufflink Semi-finished puchase	]' }, { id: 'PV', name: 'PV	[	Cufflinks	]' }, { id: 'PY', name: 'PY	[	Cufflinks on consignment with us (GOC)	]' }, { id: 'R', name: 'R	[	Ladies Ring	]' }, { id: 'RDC', name: 'RDC	[	Ring Diamond with a large stone diamond	]' }, { id: 'RDCY', name: 'RDCY	[	Ladies ring with Center Stone	]' }, { id: 'RM', name: 'RM	[	Ladies Ring Manufactured	]' }, { id: 'RQ', name: 'RQ	[	Ladies Ringt Semi-finished purchase	]' }, { id: 'RQY', name: 'RQY	[	Lady Ring SF on consignment with us (GOC)	]' }, { id: 'RY', name: 'RY	[	Lady Ring on consignment with us (GOC)	]' }, { id: 'T', name: 'T	[	Brooch	]' }, { id: 'TDC', name: 'TDC	[	Brooch Diamond with a large stone	]' }, { id: 'TM', name: 'TM	[	Brooch Manufactured	]' }, { id: 'TQ', name: 'TQ	[	Brooch Semi-finished purchase	]' }, { id: 'TY', name: 'TY	[	Brooch on consignment with us (GOC)	]' }, { id: 'V', name: 'V	[	Gent\'s Ring	]' }, { id: 'VDC', name: 'VDC	[	Gen\'s Ring  with a large stone	]' }, { id: 'VM', name: 'VM	[	Gent\'s ring Manufactured	]' }, { id: 'VQ', name: 'VQ	[	Gent\'s ring Semi-finished purchase	]' }, { id: 'VY', name: 'VY	[	Gent\'s Ring on consignment with us (GOC)	]' }, { id: 'GFK', name: 'GFK	[	Gift Key Holder	]' }, { id: 'GFL', name: 'GFL	[	Gift Lighter	]' }, { id: 'GFO', name: 'GFO	[	Gift Pen	]' }, { id: 'Gift', name: 'Gift	[	Gift Jewelry	]' }, { id: 'GiftACC', name: 'GiftACC	[	Gift Account	]' }, { id: 'GiftOBA', name: 'GiftOBA	[	Gift Object Of Art	]' }, { id: 'GiftPerf', name: 'GiftPerf	[	Gift Perfurm	]' }, { id: 'GiftWAT', name: 'GiftWAT	[	Gift Watch	]' }],
	  collections: [{ id: 'Adornment 1', name: 'Adornment 1' }, { id: 'Adornment 2', name: 'Adornment 2' }, { id: 'Animal World', name: 'Animal World' }, { id: 'Aspen', name: 'Aspen' }, { id: 'Baby Line', name: 'Baby Line' }, { id: 'Big Bang', name: 'Big Bang' }, { id: 'Bijou Divine', name: 'Bijou Divine' }, { id: 'Business Card Holder', name: 'Business Card Holder' }, { id: 'Charity', name: 'Charity' }, { id: 'Charms', name: 'Charms' }, { id: 'Chopardissimo', name: 'Chopardissimo' }, { id: 'Classic Fusion', name: 'Classic Fusion' }, { id: 'Classic Pearl', name: 'Classic Pearl' }, { id: 'Clover', name: 'Clover' }, { id: 'Cocktail Ring', name: 'Cocktail Ring' }, { id: 'Coloured Diamond Classic', name: 'Coloured Diamond Classic' }, { id: 'Copacabana', name: 'Copacabana' }, { id: 'Croisette', name: 'Croisette' }, { id: 'Cross', name: 'Cross' }, { id: 'Delano', name: 'Delano' }, { id: 'Diamond Classic', name: 'Diamond Classic' }, { id: 'Diamond Scent', name: 'Diamond Scent' }, { id: 'Diamond Scent 125th Anniversary', name: 'Diamond Scent 125th Anniversary' }, { id: 'Diva', name: 'Diva' }, { id: 'Eleanor', name: 'Eleanor' }, { id: 'Engagement Ring', name: 'Engagement Ring' }, { id: 'Fantasia', name: 'Fantasia' }, { id: 'Flower of Eternity', name: 'Flower of Eternity' }, { id: 'Gemstone Classic', name: 'Gemstone Classic' }, { id: 'Geometric', name: 'Geometric' }, { id: 'Glamour', name: 'Glamour' }, { id: 'GOLDEN DIAMONDS', name: 'GOLDEN DIAMONDS' }, { id: 'Grande Ellipse (Watch)', name: 'Grande Ellipse (Watch)' }, { id: 'Grande Ellipse Accessories', name: 'Grande Ellipse Accessories' }, { id: 'Haifa', name: 'Haifa' }, { id: 'Haneen Kamel', name: 'Haneen Kamel' }, { id: 'Happy Amore', name: 'Happy Amore' }, { id: 'Happy Chopard', name: 'Happy Chopard' }, { id: 'Happy Darling', name: 'Happy Darling' }, { id: 'Happy Diamond', name: 'Happy Diamond' }, { id: 'Happy Heart', name: 'Happy Heart' }, { id: 'Happy Solitaire', name: 'Happy Solitaire' }, { id: 'Happy Spirit', name: 'Happy Spirit' }, { id: 'Happy Sport', name: 'Happy Sport' }, { id: 'Happy Sport -  Happy Fish', name: 'Happy Sport -  Happy Fish' }, { id: 'Happy Sun', name: 'Happy Sun' }, { id: 'Heidi Klum', name: 'Heidi Klum' }, { id: 'High Jewelry', name: 'High Jewelry' }, { id: 'Hilal', name: 'Hilal' }, { id: 'Hukom Ring Silver', name: 'Hukom Ring Silver' }, { id: 'ICE CUBE', name: 'ICE CUBE' }, { id: 'Imperial', name: 'Imperial' }, { id: 'Imperiale', name: 'Imperiale' }, { id: 'La Calssique', name: 'La Calssique' }, { id: 'La Classique', name: 'La Classique' }, { id: 'La Griffe', name: 'La Griffe' }, { id: 'Lace', name: 'Lace' }, { id: 'Lady Spike', name: 'Lady Spike' }, { id: 'Larme D\'Amour', name: 'Larme D\'Amour' }, { id: 'Lava', name: 'Lava' }, { id: 'Le Coeur', name: 'Le Coeur' }, { id: 'Leila', name: 'Leila' }, { id: 'Love M', name: 'Love M' }, { id: 'Masterpieces', name: 'Masterpieces' }, { id: 'Melody', name: 'Melody' }, { id: 'Micro Pave', name: 'Micro Pave' }, { id: 'Misbaha', name: 'Misbaha' }, { id: 'Mouawad Gemstones', name: 'Mouawad Gemstones' }, { id: 'Mouawad Key Holder', name: 'Mouawad Key Holder' }, { id: 'Mouawad Mural Wall Clock', name: 'Mouawad Mural Wall Clock' }, { id: 'Mouawad Ties', name: 'Mouawad Ties' }, { id: 'Oriana', name: 'Oriana' }, { id: 'Other Classics', name: 'Other Classics' }, { id: 'Papillon', name: 'Papillon' }, { id: 'Peacock', name: 'Peacock' }, { id: 'Perfume Mouawad Trigon', name: 'Perfume Mouawad Trigon' }, { id: 'Q\'uranic', name: 'Q\'uranic' }, { id: 'Rainbow', name: 'Rainbow' }, { id: 'ROLO', name: 'ROLO' }, { id: 'Rose Cut Classics', name: 'Rose Cut Classics' }, { id: 'Rosette', name: 'Rosette' }, { id: 'Rosette 125th Anniversary Gemstone Classic', name: 'Rosette 125th Anniversary Gemstone Classic' }, { id: 'Royale Rings', name: 'Royale Rings' }, { id: 'Sample Review', name: 'Sample Review' }, { id: 'Shehrazad', name: 'Shehrazad' }, { id: 'Silhouette', name: 'Silhouette' }, { id: 'So Happy', name: 'So Happy' }, { id: 'Sultan Rings', name: 'Sultan Rings' }, { id: 'Tassel', name: 'Tassel' }, { id: 'Touring', name: 'Touring' }, { id: 'Trebor Jewelry', name: 'Trebor Jewelry' }, { id: 'Trillium', name: 'Trillium' }, { id: 'Verona', name: 'Verona' }, { id: 'Versace Watches', name: 'Versace Watches' }, { id: 'Vie', name: 'Vie' }, { id: 'Wedding Band', name: 'Wedding Band' }, { id: 'Wedding Collection', name: 'Wedding Collection' }, { id: 'Xtravaganza', name: 'Xtravaganza' }],
	  brands: [{ id: 'Accurist', name: 'Accurist' }, { id: 'Alfred Dunhill', name: 'Alfred Dunhill' }, { id: 'Aquanautic', name: 'Aquanautic' }, { id: 'Aristo', name: 'Aristo' }, { id: 'Arteluce', name: 'Arteluce' }, { id: 'Audemars Piguet', name: 'Audemars Piguet' }, { id: 'Basile', name: 'Basile' }, { id: 'Baume & Mercier', name: 'Baume & Mercier' }, { id: 'Beauty', name: 'Beauty' }, { id: 'Bell & Ross', name: 'Bell & Ross' }, { id: 'Besco', name: 'Besco' }, { id: 'Blanc Pain', name: 'Blanc Pain' }, { id: 'Breguet', name: 'Breguet' }, { id: 'Bvlgari', name: 'Bvlgari' }, { id: 'Calibri', name: 'Calibri' }, { id: 'Carlo Ferrara', name: 'Carlo Ferrara' }, { id: 'Cartier', name: 'Cartier' }, { id: 'Carven', name: 'Carven' }, { id: 'Catamaran', name: 'Catamaran' }, { id: 'Charmex', name: 'Charmex' }, { id: 'Chopard', name: 'Chopard' }, { id: 'Corum', name: 'Corum' }, { id: 'Curtis And Co', name: 'Curtis And Co' }, { id: 'Cvstos', name: 'Cvstos' }, { id: 'Daniel Carlino', name: 'Daniel Carlino' }, { id: 'Daniel Roth', name: 'Daniel Roth' }, { id: 'Delaneau', name: 'Delaneau' }, { id: 'Dubey & Schaldenbrand', name: 'Dubey & Schaldenbrand' }, { id: 'Dupont', name: 'Dupont' }, { id: 'Ebel', name: 'Ebel' }, { id: 'Enigma', name: 'Enigma' }, { id: 'Forget', name: 'Forget' }, { id: 'Fralpa', name: 'Fralpa' }, { id: 'Frank Muller', name: 'Frank Muller' }, { id: 'Geneve', name: 'Geneve' }, { id: 'Gerald Genta', name: 'Gerald Genta' }, { id: 'Girard Perregaux', name: 'Girard Perregaux' }, { id: 'Graff', name: 'Graff' }, { id: 'Grisogono', name: 'Grisogono' }, { id: 'Hublot', name: 'Hublot' }, { id: 'Ikepod', name: 'Ikepod' }, { id: 'Jaeger Le Coultre', name: 'Jaeger Le Coultre' }, { id: 'Japy', name: 'Japy' }, { id: 'Jean D\'Eve', name: 'Jean D\'Eve' }, { id: 'Jean Marcel', name: 'Jean Marcel' }, { id: 'Jean Perret', name: 'Jean Perret' }, { id: 'Jean Richard', name: 'Jean Richard' }, { id: 'John Sterling', name: 'John Sterling' }, { id: 'Jorg Hysek', name: 'Jorg Hysek' }, { id: 'Juvenia', name: 'Juvenia' }, { id: 'Kern', name: 'Kern' }, { id: 'Kraus', name: 'Kraus' }, { id: 'Le Marquand', name: 'Le Marquand' }, { id: 'Le Roy', name: 'Le Roy' }, { id: 'Linde Werdelin', name: 'Linde Werdelin' }, { id: 'Longines', name: 'Longines' }, { id: 'Louis Erard', name: 'Louis Erard' }, { id: 'Lunette', name: 'Lunette' }, { id: 'Makkah', name: 'Makkah' }, { id: 'Martin Braun', name: 'Martin Braun' }, { id: 'Memotime', name: 'Memotime' }, { id: 'Michel Jordi', name: 'Michel Jordi' }, { id: 'Microma', name: 'Microma' }, { id: 'Milus', name: 'Milus' }, { id: 'Montana', name: 'Montana' }, { id: 'Montegrappa', name: 'Montegrappa' }, { id: 'Mouawad', name: 'Mouawad' }, { id: 'Movado', name: 'Movado' }, { id: 'North Eagles', name: 'North Eagles' }, { id: 'Omega', name: 'Omega' }, { id: 'Orion', name: 'Orion' }, { id: 'Parmigiani', name: 'Parmigiani' }, { id: 'Pascal Vincent', name: 'Pascal Vincent' }, { id: 'Patek Philippe', name: 'Patek Philippe' }, { id: 'Paul Laurin', name: 'Paul Laurin' }, { id: 'Paul Picot', name: 'Paul Picot' }, { id: 'Piaget', name: 'Piaget' }, { id: 'Pierre Kunz', name: 'Pierre Kunz' }, { id: 'Repossi', name: 'Repossi' }, { id: 'River', name: 'River' }, { id: 'Roamer', name: 'Roamer' }, { id: 'Roberge', name: 'Roberge' }, { id: 'Roger Dubuis', name: 'Roger Dubuis' }, { id: 'Rolex', name: 'Rolex' }, { id: 'Sarcar', name: 'Sarcar' }, { id: 'Schlegel & Plana', name: 'Schlegel & Plana' }, { id: 'Seiko', name: 'Seiko' }, { id: 'Sheaffer', name: 'Sheaffer' }, { id: 'Sigma', name: 'Sigma' }, { id: 'St. Moritz', name: 'St. Moritz' }, { id: 'Storm', name: 'Storm' }, { id: 'Swiss Army', name: 'Swiss Army' }, { id: 'Tabbah', name: 'Tabbah' }, { id: 'Technica', name: 'Technica' }, { id: 'Thix', name: 'Thix' }, { id: 'Thorr', name: 'Thorr' }, { id: 'Time Chain', name: 'Time Chain' }, { id: 'Trebor', name: 'Trebor' }, { id: 'U-Boat', name: 'U-Boat' }, { id: 'Ulysse Nardin', name: 'Ulysse Nardin' }, { id: 'Urwerk', name: 'Urwerk' }, { id: 'Vacheron Constantin', name: 'Vacheron Constantin' }, { id: 'Valise', name: 'Valise' }, { id: 'Van Cleef & Arpels', name: 'Van Cleef & Arpels' }, { id: 'Versace Sa.', name: 'Versace Sa.' }, { id: 'Vignando', name: 'Vignando' }, { id: 'Visconti', name: 'Visconti' }, { id: 'Vuarnet', name: 'Vuarnet' }, { id: 'Wilsa', name: 'Wilsa' }, { id: 'Yard-O-Led', name: 'Yard-O-Led' }, { id: 'Yves Saint Blaise', name: 'Yves Saint Blaise' }, { id: 'Zenith', name: 'Zenith' }],
	  ringSizes: [],
	  dominantStones: [],
	  metalTypes: [{ id: 'ALUMINIUM', name: 'Aluminium' }, { id: 'BRASS', name: 'Brass' }, { id: 'CARBONFIBRE', name: 'Carbonfibre' }, { id: 'GOLD', name: 'Gold' }, { id: 'GOLD+STEEL', name: 'Gold+Steel' }, { id: 'LEATHER', name: 'Leather' }, { id: 'MIX', name: 'Mix' }, { id: 'PALLADIUM', name: 'Palladium' }, { id: 'PLATINUM', name: 'Platinum' }, { id: 'PLATINUM+GOLD', name: 'Platinum+Gold' }, { id: 'ROSEGOLD', name: 'Rosegold' }, { id: 'RUBBER', name: 'Rubber' }, { id: 'SILVER', name: 'Silver' }, { id: 'STEEL', name: 'Steel' }],
	  metalColours: [{ id: 'BI - COLOR', name: 'Bi+Color' }, { id: 'BLACK', name: 'Black' }, { id: 'BLUE', name: 'Blue' }, { id: 'BROWN', name: 'Brown' }, { id: 'GREEN', name: 'Green' }, { id: 'MIX', name: 'Mix' }, { id: 'PINK', name: 'Pink' }, { id: 'RED', name: 'Red' }, { id: 'ROSE', name: 'Rose' }, { id: 'TRI+COLOR', name: 'Tri+Color' }, { id: 'WHITE', name: 'White' }, { id: 'WHITE+ROSE', name: 'White+Rose' }, { id: 'WHITE+YELLOW', name: 'White+Yellow' }, { id: 'YELLOW', name: 'Yellow' }, { id: 'YELLOW+ROSE', name: 'Yellow+Rose' }],
	  certificateAgencys: [],
	  watchCategories: [{ id: 'A', name: 'A	[	Wedding Ring	]' }, { id: 'ADC', name: 'ADC	[	Wedding Ring with a centre diamond	]' }, { id: 'AM', name: 'AM	[	Wedding-Ring Manufactured	]' }, { id: 'AQ', name: 'AQ	[	Wedding-Ring Semi-finished	]' }, { id: 'AY', name: 'AY	[	Wedding-Ring	]' }, { id: 'B', name: 'B	[	Bracelet	]' }, { id: 'BD', name: 'BD	[	Bracelet for Lady\'s Watch	]' }, { id: 'BDC', name: 'BDC	[	Bracelat with large centre diamond	]' }, { id: 'BDQ', name: 'BDQ	[	Lady\'s Bracelet Semi-finished purchase	]' }, { id: 'BDY', name: 'BDY	[	Bracelet for lady\'s watch con	]' }, { id: 'BH', name: 'BH	[	Bracelet for Gent\'s Watch	]' }, { id: 'BHQ', name: 'BHQ	[	Gent\'s Bracelet Semi-finished purchase	]' }, { id: 'BM', name: 'BM	[	Bracelet Manufactured	]' }, { id: 'BQ', name: 'BQ	[	BRACELET Semi-finished purchased	]' }, { id: 'BY', name: 'BY	[	Bracelet on consignment with us(GOC)	]' }, { id: 'C', name: 'C	[	Earrings	]' }, { id: 'CDC', name: 'CDC	[	Earring with Large Center Stone	]' }, { id: 'CDCY', name: 'CDCY	[	Earrings with Center Stone	]' }, { id: 'CM', name: 'CM	[	Earring Manufactured	]' }, { id: 'CQ', name: 'CQ	[	Earring Semi-finished purchase	]' }, { id: 'CY', name: 'CY	[	Earings on consignment with us (GOC)	]' }, { id: 'E', name: 'E	[	Set	]' }, { id: 'EC', name: 'EC	[	Etampe	]' }, { id: 'EMM', name: 'EMM	[	Set Manufactured	]' }, { id: 'EQ', name: 'EQ	[	Set Semi-finished purchase	]' }, { id: 'EY', name: 'EY	[	Set on consignment with us (GOC)	]' }, { id: 'G', name: 'G	[	Prayer Beads	]' }, { id: 'GM', name: 'GM	[	Prayer Beads Manufactured	]' }, { id: 'GQ', name: 'GQ	[	Prayer Beads Semi finished purchased	]' }, { id: 'GV', name: 'GV	[	Prayer Beads	]' }, { id: 'J', name: 'J	[	GUINEA (an English gold coin)	]' }, { id: 'M', name: 'M	[	Pendant	]' }, { id: 'MDC', name: 'MDC	[	Pendant with large centre diamond	]' }, { id: 'MDCY', name: 'MDCY	[	Pendant with Center Stone	]' }, { id: 'MM', name: 'MM	[	Pendant Manufactured	]' }, { id: 'MQ', name: 'MQ	[	Pendant Semi-finished purchase	]' }, { id: 'MTB', name: 'MTB	[	Motif Bracelet	]' }, { id: 'MY', name: 'MY	[	Pendant "Medallions" on consignment	]' }, { id: 'N', name: 'N	[	Necklace	]' }, { id: 'NDC', name: 'NDC	[	Necklace with large centre diamond	]' }, { id: 'NM', name: 'NM	[	Necklace Manufactured	]' }, { id: 'NQ', name: 'NQ	[	NECKLACE Semi-finished purchase	]' }, { id: 'NY', name: 'NY	[	Necklace on consignment with us (GOC)	]' }, { id: 'P', name: 'P	[	Cufflinks	]' }, { id: 'PDC', name: 'PDC	[	Cufflinks with large centre diamond	]' }, { id: 'PM', name: 'PM	[	Cufflinks Manufactured	]' }, { id: 'PQ', name: 'PQ	[	Cufflink Semi-finished puchase	]' }, { id: 'PV', name: 'PV	[	Cufflinks	]' }, { id: 'PY', name: 'PY	[	Cufflinks on consignment with us (GOC)	]' }, { id: 'R', name: 'R	[	Ladies Ring	]' }, { id: 'RDC', name: 'RDC	[	Ring Diamond with a large stone diamond	]' }, { id: 'RDCY', name: 'RDCY	[	Ladies ring with Center Stone	]' }, { id: 'RM', name: 'RM	[	Ladies Ring Manufactured	]' }, { id: 'RQ', name: 'RQ	[	Ladies Ringt Semi-finished purchase	]' }, { id: 'RQY', name: 'RQY	[	Lady Ring SF on consignment with us (GOC)	]' }, { id: 'RY', name: 'RY	[	Lady Ring on consignment with us (GOC)	]' }, { id: 'T', name: 'T	[	Brooch	]' }, { id: 'TDC', name: 'TDC	[	Brooch Diamond with a large stone	]' }, { id: 'TM', name: 'TM	[	Brooch Manufactured	]' }, { id: 'TQ', name: 'TQ	[	Brooch Semi-finished purchase	]' }, { id: 'TY', name: 'TY	[	Brooch on consignment with us (GOC)	]' }, { id: 'V', name: 'V	[	Gent\'s Ring	]' }, { id: 'VDC', name: 'VDC	[	Gen\'s Ring  with a large stone	]' }, { id: 'VM', name: 'VM	[	Gent\'s ring Manufactured	]' }, { id: 'VQ', name: 'VQ	[	Gent\'s ring Semi-finished purchase	]' }, { id: 'VY', name: 'VY	[	Gent\'s Ring on consignment with us (GOC)	]' }, { id: 'GFK', name: 'GFK	[	Gift Key Holder	]' }, { id: 'GFL', name: 'GFL	[	Gift Lighter	]' }, { id: 'GFO', name: 'GFO	[	Gift Pen	]' }, { id: 'Gift', name: 'Gift	[	Gift Jewelry	]' }, { id: 'GiftACC', name: 'GiftACC	[	Gift Account	]' }, { id: 'GiftOBA', name: 'GiftOBA	[	Gift Object Of Art	]' }, { id: 'GiftPerf', name: 'GiftPerf	[	Gift Perfurm	]' }, { id: 'GiftWAT', name: 'GiftWAT	[	Gift Watch	]' }],
	  movements: [{ id: 'ATM', name: 'ATM' }, { id: 'MANL', name: 'MANL' }, { id: 'MEC/ELR', name: 'MEC/ELR' }, { id: 'MEC/SELF', name: 'MEC/SELF' }, { id: 'QUAT', name: 'QUAT' }, { id: 'SELF', name: 'SELF' }, { id: 'SOL', name: 'SOL' }],
	  dialIndexs: [],
	  dialColors: [{ id: 'BLK', name: 'Black' }, { id: 'BLK/WHT', name: 'Black & White' }, { id: 'BLU', name: 'Blue' }, { id: 'BRN', name: 'Brown' }, { id: 'CHLT', name: 'Chocolate' }, { id: 'CRM', name: 'Cream' }, { id: 'GRY', name: 'Grey' }, { id: 'ORN', name: 'Orange' }, { id: 'PNK', name: 'Pink' }, { id: 'RED', name: 'Red' }, { id: 'SIL', name: 'Silver' }, { id: 'WHT', name: 'White' }, { id: 'YLW', name: 'Yellow' }],
	  dialMetals: [{ id: 'Carbon', name: 'Carbon' }, { id: 'Silver', name: 'Silver' }, { id: 'White Gold', name: 'White Gold' }, { id: 'Fiber', name: 'Fiber' }, { id: 'Pink Gold', name: 'Pink Gold' }, { id: 'Steel', name: 'Steel' }, { id: 'Yellow Gold', name: 'Yellow Gold' }, { id: 'Aluminium', name: 'Aluminium' }, { id: 'Gemstone', name: 'Gemstone' }, { id: 'MOP', name: 'MOP' }, { id: 'Onix', name: 'Onix' }, { id: 'Red Gold', name: 'Red Gold' }, { id: 'Rose Gold', name: 'Rose Gold' }],
	  buckleTypes: [{ id: 'Deployment', name: 'Deployment' }, { id: 'Simple', name: 'Simple' }],
	  strapTypes: [{ id: 'ALUM', name: 'Aluminium' }, { id: 'JENS', name: 'Jeans' }, { id: 'LETH', name: 'Leather' }, { id: 'NYON', name: 'Nylon' }, { id: 'PLST', name: 'Plastic' }, { id: 'RUBR', name: 'Rubber' }, { id: 'SAIN', name: 'Satin' }, { id: 'STL', name: 'Steel' }, { id: 'STL/RG', name: 'Steel-R/G' }, { id: 'STL/WG', name: 'Steel-W/G' }, { id: 'TIT/STL', name: 'Titan-Steel' }, { id: 'TITAN', name: 'Titanium' }, { id: 'WHTGLD', name: 'White Gold' }, { id: 'YELGLD', name: 'Yellow Gold' }],
	  strapColors: [{ id: 'Black', name: 'Black' }, { id: 'Blue', name: 'Blue' }, { id: 'Brown', name: 'Brown' }, { id: 'Fuchsia', name: 'Fuchsia' }, { id: 'Gray', name: 'Gray' }, { id: 'Red', name: 'Red' }, { id: 'White', name: 'White' }],
	  complications: [{ id: 'CHRG', name: 'CHRG' }, { id: 'CHRM', name: 'CHRM' }, { id: 'WATR', name: 'WATR' }]
	};

/***/ },

/***/ 901:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var FETCH_OPTIONS = exports.FETCH_OPTIONS = 'FETCH_OPTIONS';
	var SELECTED_COMPANY = exports.SELECTED_COMPANY = 'SELECTED_COMPANY';
	var SELECTED_WAREHOUSES = exports.SELECTED_WAREHOUSES = 'SELECTED_WAREHOUSES';

/***/ },

/***/ 950:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(159);

	var _inventory_main_filter = __webpack_require__(951);

	var _inventory_main_filter2 = _interopRequireDefault(_inventory_main_filter);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var InventorySearch = function (_Component) {
	  _inherits(InventorySearch, _Component);

	  function InventorySearch(props) {
	    _classCallCheck(this, InventorySearch);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(InventorySearch).call(this, props));

	    _this.handleSubmit = _this.handleSubmit.bind(_this);
	    return _this;
	  }

	  _createClass(InventorySearch, [{
	    key: 'handleSubmit',
	    value: function handleSubmit(data) {
	      console.log('data-->', data);
	    }
	  }, {
	    key: 'render',
	    value: function render() {

	      return _react2.default.createElement(_inventory_main_filter2.default, { onSubmit: this.handleSubmit });
	    }
	  }]);

	  return InventorySearch;
	}(_react.Component);

	InventorySearch.contextTypes = {
	  router: _react.PropTypes.object
	};


	module.exports = (0, _reactRedux.connect)()(InventorySearch);

/***/ },

/***/ 951:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reduxForm = __webpack_require__(852);

	var _reactRouter = __webpack_require__(185);

	var _redux = __webpack_require__(166);

	var _masterdataaction = __webpack_require__(899);

	var masterDataActions = _interopRequireWildcard(_masterdataaction);

	var _reactSelect = __webpack_require__(952);

	var _reactSelect2 = _interopRequireDefault(_reactSelect);

	var _reactBootstrap = __webpack_require__(541);

	var _reactAddonsShallowCompare = __webpack_require__(897);

	var _reactAddonsShallowCompare2 = _interopRequireDefault(_reactAddonsShallowCompare);

	var _inventory_header_filter = __webpack_require__(957);

	var HeaderFilter = _interopRequireWildcard(_inventory_header_filter);

	var _inventory_stone_filter = __webpack_require__(959);

	var _inventory_stone_filter2 = _interopRequireDefault(_inventory_stone_filter);

	var _inventory_jewelry_filter = __webpack_require__(1079);

	var _inventory_jewelry_filter2 = _interopRequireDefault(_inventory_jewelry_filter);

	var _inventory_watch_filter = __webpack_require__(1080);

	var _inventory_watch_filter2 = _interopRequireDefault(_inventory_watch_filter);

	var _inventory_gemstone_filter = __webpack_require__(1081);

	var _inventory_gemstone_filter2 = _interopRequireDefault(_inventory_gemstone_filter);

	__webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"../../../public/css/react-multi-select.css\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

	__webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"../../../public/css/input-calendar.css\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var child = _react2.default.createElement(HeaderFilter.default, { ref: 'foo' });

	var InventoryMainFilter = function (_Component) {
	  _inherits(InventoryMainFilter, _Component);

	  function InventoryMainFilter(props) {
	    _classCallCheck(this, InventoryMainFilter);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(InventoryMainFilter).call(this, props));

	    _this.resetForm = _this.resetForm.bind(_this);
	    _this.searchResult = _this.searchResult.bind(_this);
	    _this.advanceSearchClick = _this.advanceSearchClick.bind(_this);
	    _this.gemStoneSearchClick = _this.gemStoneSearchClick.bind(_this);

	    _this.state = {
	      hideAdvanceSearch: true,
	      hideStoneSearch: false,
	      hideJewelrySearch: true,
	      hideWatchSearch: true,
	      hideGemStoneSearch: true,
	      data: 'test'
	    };
	    return _this;
	  }

	  _createClass(InventoryMainFilter, [{
	    key: 'shouldComponentUpdate',
	    value: function shouldComponentUpdate(nextProps, nextState) {
	      return (0, _reactAddonsShallowCompare2.default)(this, nextProps, nextState);
	    }
	  }, {
	    key: 'gemStoneSearchClick',
	    value: function gemStoneSearchClick() {
	      if (this.state.hideGemStoneSearch) {
	        this.setState({ hideGemStoneSearch: false });
	      } else {
	        this.setState({ hideGemStoneSearch: true });
	      }
	    }
	  }, {
	    key: 'advanceSearchClick',
	    value: function advanceSearchClick() {
	      if (this.state.hideAdvanceSearch) {
	        this.setState({ hideAdvanceSearch: false });
	      } else {
	        this.setState({ hideAdvanceSearch: true });
	      }
	    }
	  }, {
	    key: 'stoneSearchClick',
	    value: function stoneSearchClick() {
	      this.setState({
	        hideStoneSearch: false,
	        hideJewelrySearch: true,
	        hideWatchSearch: true
	      });
	      // this.refs.gemstone.resetForm();
	    }
	  }, {
	    key: 'jewelrySearchClick',
	    value: function jewelrySearchClick() {
	      this.setState({
	        hideJewelrySearch: false,
	        hideStoneSearch: true,
	        hideWatchSearch: true
	      });
	    }
	  }, {
	    key: 'watchSearchClick',
	    value: function watchSearchClick() {
	      this.setState({
	        hideWatchSearch: false,
	        hideStoneSearch: true,
	        hideJewelrySearch: true
	      });
	    }
	  }, {
	    key: 'resetForm',
	    value: function resetForm(data) {
	      console.log('child-->', child);

	      // this.onUpdate('test');
	    }
	  }, {
	    key: 'searchResult',
	    value: function searchResult() {
	      this.context.router.push('/searchresult/');
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _props = this.props;
	      var _props$fields = _props.fields;
	      var header = _props$fields.header;
	      var stone = _props$fields.stone;
	      var jewelry = _props$fields.jewelry;
	      var watch = _props$fields.watch;
	      var gemstone = _props$fields.gemstone;
	      var handleSubmit = _props.handleSubmit;
	      var resetForm = _props.resetForm;
	      var submitting = _props.submitting;

	      var userLogin = JSON.parse(sessionStorage.logindata);

	      // console.log('sessionStorage-->',userLogin);
	      return _react2.default.createElement(
	        'form',
	        { role: 'form', onSubmit: handleSubmit },
	        _react2.default.createElement(
	          'div',
	          { id: 'page-wrapper' },
	          _react2.default.createElement(
	            'div',
	            { className: 'col-sm-12 bg-hearder' },
	            _react2.default.createElement(
	              'div',
	              { className: 'col-sm-6 m-width-60 ft-white m-nopadding' },
	              _react2.default.createElement(
	                'h1',
	                null,
	                'Inventory Report'
	              )
	            ),
	            _react2.default.createElement(
	              'div',
	              { className: 'col-sm-6 m-width-40 m-nopadding' },
	              _react2.default.createElement(
	                'div',
	                { className: 'text-right maring-t15' },
	                _react2.default.createElement(
	                  _reactRouter.Link,
	                  { to: '/searchresult', className: 'btn btn-primary btn-radius' },
	                  'Search'
	                ),
	                _react2.default.createElement(
	                  'button',
	                  { type: 'button', className: 'btn btn-primary btn-radius',
	                    disabled: submitting, onClick: this.resetForm },
	                  _react2.default.createElement('i', null),
	                  ' Reset'
	                )
	              )
	            )
	          ),
	          _react2.default.createElement(HeaderFilter.default, _extends({}, header, { ref: 'foo' })),
	          _react2.default.createElement(
	            'div',
	            { className: 'row' },
	            _react2.default.createElement(
	              'div',
	              { className: 'bg-while' },
	              _react2.default.createElement(
	                _reactRouter.Link,
	                { to: '/inventories/', onClick: this.advanceSearchClick, className: 'btn btn-primary btn-advance' },
	                'Advance Search ',
	                _react2.default.createElement('span', { className: 'glyphicon glyphicon-menu-down' })
	              )
	            )
	          ),
	          _react2.default.createElement(
	            'div',
	            { className: 'row ' + (this.state.hideAdvanceSearch ? 'hidden' : '') },
	            _react2.default.createElement(
	              'div',
	              { className: 'col-sm-12' },
	              _react2.default.createElement(
	                'div',
	                { className: 'panel' },
	                _react2.default.createElement(
	                  'div',
	                  { className: 'panel-body' },
	                  _react2.default.createElement(
	                    'div',
	                    { className: 'row margin-t-17 ' },
	                    _react2.default.createElement(
	                      _reactBootstrap.Tabs,
	                      { defaultActiveKey: 1, animation: false, id: 'uncontrolled-tab-example' },
	                      _react2.default.createElement(
	                        _reactBootstrap.Tab,
	                        { eventKey: 1, title: 'Stone' },
	                        _react2.default.createElement(_inventory_stone_filter2.default, _extends({}, stone, { ref: 'stone' }))
	                      ),
	                      _react2.default.createElement(
	                        _reactBootstrap.Tab,
	                        { eventKey: 2, title: 'Jewelry' },
	                        _react2.default.createElement(_inventory_jewelry_filter2.default, _extends({}, jewelry, { ref: 'jewelry' })),
	                        _react2.default.createElement(
	                          'div',
	                          { className: 'panel-body' },
	                          _react2.default.createElement(
	                            'div',
	                            { className: 'row gemstone-bar' },
	                            _react2.default.createElement(
	                              'h2',
	                              {
	                                disabled: submitting,
	                                onClick: this.gemStoneSearchClick },
	                              'Gemstone Search'
	                            )
	                          ),
	                          _react2.default.createElement(
	                            'div',
	                            null,
	                            _react2.default.createElement(_inventory_gemstone_filter2.default, _extends({}, gemstone, { ref: 'gemstone' }))
	                          )
	                        ),
	                        _react2.default.createElement(
	                          'div',
	                          { className: 'col-sm-12 text-center' },
	                          _react2.default.createElement(
	                            'button',
	                            { type: 'submit', className: 'btn btn-primary btn-radius' },
	                            'Search'
	                          ),
	                          _react2.default.createElement(
	                            'button',
	                            { type: 'button', className: 'btn btn-primary btn-radius', disabled: submitting, onClick: resetForm },
	                            _react2.default.createElement('i', null),
	                            ' Reset'
	                          )
	                        )
	                      ),
	                      _react2.default.createElement(
	                        _reactBootstrap.Tab,
	                        { eventKey: 3, title: 'Watch' },
	                        _react2.default.createElement(_inventory_watch_filter2.default, _extends({}, watch, { ref: 'watch' })),
	                        _react2.default.createElement(
	                          'div',
	                          { className: 'panel-body' },
	                          _react2.default.createElement(
	                            'div',
	                            { className: 'row gemstone-bar' },
	                            _react2.default.createElement(
	                              'h2',
	                              {
	                                disabled: submitting,
	                                onClick: this.gemStoneSearchClick },
	                              'Gemstone Search'
	                            )
	                          ),
	                          _react2.default.createElement(
	                            'div',
	                            null,
	                            _react2.default.createElement(_inventory_gemstone_filter2.default, _extends({}, gemstone, { ref: 'gemstone' }))
	                          )
	                        ),
	                        _react2.default.createElement(
	                          'div',
	                          { className: 'col-sm-12 text-center' },
	                          _react2.default.createElement(
	                            'button',
	                            { type: 'submit', className: 'btn btn-primary btn-radius' },
	                            'Search'
	                          ),
	                          _react2.default.createElement(
	                            'button',
	                            { type: 'button', className: 'btn btn-primary btn-radius', disabled: submitting, onClick: resetForm },
	                            _react2.default.createElement('i', null),
	                            ' Reset'
	                          )
	                        )
	                      )
	                    )
	                  )
	                )
	              )
	            )
	          )
	        )
	      );
	    }
	  }]);

	  return InventoryMainFilter;
	}(_react.Component);

	InventoryMainFilter.contextTypes = {
	  router: _react.PropTypes.object
	};


	InventoryMainFilter.propTypes = {
	  fields: _react.PropTypes.object.isRequired,
	  handleSubmit: _react.PropTypes.func.isRequired,
	  resetForm: _react.PropTypes.func.isRequired,
	  submitting: _react.PropTypes.bool.isRequired
	};

	module.exports = (0, _reduxForm.reduxForm)({
	  form: 'Inventory',
	  fields: ['header.itemreference', 'header.itemdescription', 'header.vendoritemreference', 'header.vendorname', 'header.certificatednumber', 'header.sku', 'header.location', 'header.warehouse', 'header.attachment', 'stone.stonetype', 'stone.cut', 'stone.stoneProductHierarchy', 'stone.lotnumber', 'stone.cutShape', 'stone.cutShape', 'stone.cutGrade', 'stone.color', 'stone.colorGrade', 'stone.clarity', 'stone.lotQuantityFrom', 'stone.lotQuantityTo', 'stone.totalCaratWeightFrom', 'stone.totalCaratWeightTo', 'stone.totalCostFrom', 'stone.totalCostTo', 'stone.totalUpdatedCostFrom', 'stone.totalUpdatedCostTo', 'stone.publicPriceFrom', 'stone.publicPriceTo', 'stone.markupFrom', 'stone.markupTo', 'stone.certificateNumber', 'stone.certificateLab', 'stone.cerDateFrom', 'stone.cerDateFrom', 'stone.cerDateTo', 'stone.polish', 'stone.symmetry', 'stone.treatment', 'stone.fluorescence', 'stone.origin', 'jewelry.jewelryProductHierarchy', 'jewelry.collection', 'jewelry.totalCostFrom', 'jewelry.totalCostTo', 'jewelry.totalUpdatedCostFrom', 'jewelry.totalUpdatedCostTo', 'jewelry.publicPriceFrom', 'jewelry.publicPriceTo', 'jewelry.markupFrom', 'jewelry.markupTo', 'jewelry.grossWeightFrom', 'jewelry.grossWeightTo', 'jewelry.setReferenceNumber', 'jewelry.jewelryCategory', 'jewelry.brand', 'jewelry.mustHave', 'jewelry.ringSize', 'jewelry.dominantStone', 'jewelry.metalType', 'jewelry.metalColour', 'gemstone.stonetype', 'gemstone.cut', 'gemstone.cutGrade', 'gemstone.color', 'gemstone.clarity', 'gemstone.stoneCostFrom', 'gemstone.stoneCostTo', 'gemstone.totalCaratWeightFrom', 'gemstone.totalCaratWeightTo', 'gemstone.quantityFrom', 'gemstone.quantityTo', 'gemstone.certificateNumber', 'gemstone.cerDateFrom', 'gemstone.cerDateTo', 'gemstone.polish', 'gemstone.symmetry', 'gemstone.treatment', 'gemstone.fluorescence', 'gemstone.origin', 'gemstone.certificateAgency', 'watch.watchProductHierarchy', 'watch.watchCategory', 'watch.collection', 'watch.brand', 'watch.mustHave', 'watch.metalType', 'watch.metalColour', 'watch.dominantStone', 'watch.limitedEdition', 'watch.limitedEditionNumber', 'watch.serialNumber', 'watch.movement', 'watch.totalCostFrom', 'watch.totalCostTo', 'watch.totalUpdatedCostFrom', 'watch.totalUpdatedCostTo', 'watch.publicPriceFrom', 'watch.publicPriceTo', 'watch.markupFrom', 'watch.markupFrom', 'watch.markupTo', 'watch.grossWeightFrom', 'watch.grossWeightTo', 'watch.proDateFrom', 'watch.proDateTo', 'watch.caseDimensionFrom', 'watch.caseDimensionTo', 'watch.preciousMetalWeightFrom', 'watch.preciousMetalWeightTo', 'watch.dialIndex', 'watch.dialColor', 'watch.dialMetal', 'watch.buckleType', 'watch.strapType', 'watch.strapColor', 'watch.complication']
	})(InventoryMainFilter);

/***/ },

/***/ 952:
/***/ function(module, exports, __webpack_require__) {

	/* disable some rules until we refactor more completely; fixing them now would
	   cause conflicts with some open PRs unnecessarily. */
	/* eslint react/jsx-sort-prop-types: 0, react/sort-comp: 0, react/prop-types: 0 */

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	var React = __webpack_require__(1);
	var ReactDOM = __webpack_require__(158);
	var Input = __webpack_require__(953);
	var classes = __webpack_require__(563);
	var Value = __webpack_require__(954);
	var SingleValue = __webpack_require__(955);
	var Option = __webpack_require__(956);

	var requestId = 0;

	var Select = React.createClass({

		displayName: 'Select',

		propTypes: {
			addLabelText: React.PropTypes.string, // placeholder displayed when you want to add a label on a multi-value input
			allowCreate: React.PropTypes.bool, // whether to allow creation of new entries
			asyncOptions: React.PropTypes.func, // function to call to get options
			autoload: React.PropTypes.bool, // whether to auto-load the default async options set
			backspaceRemoves: React.PropTypes.bool, // whether backspace removes an item if there is no text input
			cacheAsyncResults: React.PropTypes.bool, // whether to allow cache
			className: React.PropTypes.string, // className for the outer element
			clearAllText: React.PropTypes.string, // title for the "clear" control when multi: true
			clearValueText: React.PropTypes.string, // title for the "clear" control
			clearable: React.PropTypes.bool, // should it be possible to reset value
			delimiter: React.PropTypes.string, // delimiter to use to join multiple values
			disabled: React.PropTypes.bool, // whether the Select is disabled or not
			filterOption: React.PropTypes.func, // method to filter a single option  (option, filterString)
			filterOptions: React.PropTypes.func, // method to filter the options array: function ([options], filterString, [values])
			ignoreCase: React.PropTypes.bool, // whether to perform case-insensitive filtering
			inputProps: React.PropTypes.object, // custom attributes for the Input (in the Select-control) e.g: {'data-foo': 'bar'}
			isLoading: React.PropTypes.bool, // whether the Select is loading externally or not (such as options being loaded)
			labelKey: React.PropTypes.string, // path of the label value in option objects
			matchPos: React.PropTypes.string, // (any|start) match the start or entire string when filtering
			matchProp: React.PropTypes.string, // (any|label|value) which option property to filter on
			multi: React.PropTypes.bool, // multi-value input
			name: React.PropTypes.string, // field name, for hidden <input /> tag
			newOptionCreator: React.PropTypes.func, // factory to create new options when allowCreate set
			noResultsText: React.PropTypes.string, // placeholder displayed when there are no matching search results
			onBlur: React.PropTypes.func, // onBlur handler: function (event) {}
			onChange: React.PropTypes.func, // onChange handler: function (newValue) {}
			onFocus: React.PropTypes.func, // onFocus handler: function (event) {}
			onInputChange: React.PropTypes.func, // onInputChange handler: function (inputValue) {}
			onOptionLabelClick: React.PropTypes.func, // onCLick handler for value labels: function (value, event) {}
			optionComponent: React.PropTypes.func, // option component to render in dropdown
			optionRenderer: React.PropTypes.func, // optionRenderer: function (option) {}
			options: React.PropTypes.array, // array of options
			placeholder: React.PropTypes.string, // field placeholder, displayed when there's no value
			searchable: React.PropTypes.bool, // whether to enable searching feature or not
			searchingText: React.PropTypes.string, // message to display whilst options are loading via asyncOptions
			searchPromptText: React.PropTypes.string, // label to prompt for search input
			singleValueComponent: React.PropTypes.func, // single value component when multiple is set to false
			value: React.PropTypes.any, // initial field value
			valueComponent: React.PropTypes.func, // value component to render in multiple mode
			valueKey: React.PropTypes.string, // path of the label value in option objects
			valueRenderer: React.PropTypes.func // valueRenderer: function (option) {}
		},

		getDefaultProps: function getDefaultProps() {
			return {
				addLabelText: 'Add "{label}"?',
				allowCreate: false,
				asyncOptions: undefined,
				autoload: true,
				backspaceRemoves: true,
				cacheAsyncResults: true,
				className: undefined,
				clearAllText: 'Clear all',
				clearValueText: 'Clear value',
				clearable: true,
				delimiter: ',',
				disabled: false,
				ignoreCase: true,
				inputProps: {},
				isLoading: false,
				labelKey: 'label',
				matchPos: 'any',
				matchProp: 'any',
				name: undefined,
				newOptionCreator: undefined,
				noResultsText: 'No results found',
				onChange: undefined,
				onInputChange: undefined,
				onOptionLabelClick: undefined,
				optionComponent: Option,
				options: undefined,
				placeholder: 'Select...',
				searchable: true,
				searchingText: 'Searching...',
				searchPromptText: 'Type to search',
				singleValueComponent: SingleValue,
				value: undefined,
				valueComponent: Value,
				valueKey: 'value'
			};
		},

		getInitialState: function getInitialState() {
			return {
				/*
	    * set by getStateFromValue on componentWillMount:
	    * - value
	    * - values
	    * - filteredOptions
	    * - inputValue
	    * - placeholder
	    * - focusedOption
	   */
				isFocused: false,
				isLoading: false,
				isOpen: false,
				options: this.props.options
			};
		},

		componentWillMount: function componentWillMount() {
			var _this = this;

			this._optionsCache = {};
			this._optionsFilterString = '';
			this._closeMenuIfClickedOutside = function (event) {
				if (!_this.state.isOpen) {
					return;
				}
				var menuElem = ReactDOM.findDOMNode(_this.refs.selectMenuContainer);
				var controlElem = ReactDOM.findDOMNode(_this.refs.control);

				var eventOccuredOutsideMenu = _this.clickedOutsideElement(menuElem, event);
				var eventOccuredOutsideControl = _this.clickedOutsideElement(controlElem, event);

				// Hide dropdown menu if click occurred outside of menu
				if (eventOccuredOutsideMenu && eventOccuredOutsideControl) {
					_this.setState({
						isOpen: false
					}, _this._unbindCloseMenuIfClickedOutside);
				}
			};
			this._bindCloseMenuIfClickedOutside = function () {
				if (!document.addEventListener && document.attachEvent) {
					document.attachEvent('onclick', _this._closeMenuIfClickedOutside);
				} else {
					document.addEventListener('click', _this._closeMenuIfClickedOutside);
				}
			};
			this._unbindCloseMenuIfClickedOutside = function () {
				if (!document.removeEventListener && document.detachEvent) {
					document.detachEvent('onclick', _this._closeMenuIfClickedOutside);
				} else {
					document.removeEventListener('click', _this._closeMenuIfClickedOutside);
				}
			};
			this.setState(this.getStateFromValue(this.props.value));
		},

		componentDidMount: function componentDidMount() {
			if (this.props.asyncOptions && this.props.autoload) {
				this.autoloadAsyncOptions();
			}
		},

		componentWillUnmount: function componentWillUnmount() {
			clearTimeout(this._blurTimeout);
			clearTimeout(this._focusTimeout);
			if (this.state.isOpen) {
				this._unbindCloseMenuIfClickedOutside();
			}
		},

		componentWillReceiveProps: function componentWillReceiveProps(newProps) {
			var _this2 = this;

			var optionsChanged = false;
			if (JSON.stringify(newProps.options) !== JSON.stringify(this.props.options)) {
				optionsChanged = true;
				this.setState({
					options: newProps.options,
					filteredOptions: this.filterOptions(newProps.options)
				});
			}
			if (newProps.value !== this.state.value || newProps.placeholder !== this.props.placeholder || optionsChanged) {
				var setState = function setState(newState) {
					_this2.setState(_this2.getStateFromValue(newProps.value, newState && newState.options || newProps.options, newProps.placeholder));
				};
				if (this.props.asyncOptions) {
					this.loadAsyncOptions(newProps.value, {}, setState);
				} else {
					setState();
				}
			}
		},

		componentDidUpdate: function componentDidUpdate() {
			var _this3 = this;

			if (!this.props.disabled && this._focusAfterUpdate) {
				clearTimeout(this._blurTimeout);
				clearTimeout(this._focusTimeout);
				this._focusTimeout = setTimeout(function () {
					if (!_this3.isMounted()) return;
					_this3.getInputNode().focus();
					_this3._focusAfterUpdate = false;
				}, 50);
			}
			if (this._focusedOptionReveal) {
				if (this.refs.focused && this.refs.menu) {
					var focusedDOM = ReactDOM.findDOMNode(this.refs.focused);
					var menuDOM = ReactDOM.findDOMNode(this.refs.menu);
					var focusedRect = focusedDOM.getBoundingClientRect();
					var menuRect = menuDOM.getBoundingClientRect();

					if (focusedRect.bottom > menuRect.bottom || focusedRect.top < menuRect.top) {
						menuDOM.scrollTop = focusedDOM.offsetTop + focusedDOM.clientHeight - menuDOM.offsetHeight;
					}
				}
				this._focusedOptionReveal = false;
			}
		},

		focus: function focus() {
			this.getInputNode().focus();
		},

		clickedOutsideElement: function clickedOutsideElement(element, event) {
			var eventTarget = event.target ? event.target : event.srcElement;
			while (eventTarget != null) {
				if (eventTarget === element) return false;
				eventTarget = eventTarget.offsetParent;
			}
			return true;
		},

		getStateFromValue: function getStateFromValue(value, options, placeholder) {
			var _this4 = this;

			if (!options) {
				options = this.state.options;
			}
			if (!placeholder) {
				placeholder = this.props.placeholder;
			}

			// reset internal filter string
			this._optionsFilterString = '';

			var values = this.initValuesArray(value, options);
			var filteredOptions = this.filterOptions(options, values);

			var focusedOption;
			var valueForState = null;
			if (!this.props.multi && values.length) {
				focusedOption = values[0];
				valueForState = values[0][this.props.valueKey];
			} else {
				focusedOption = this.getFirstFocusableOption(filteredOptions);
				valueForState = values.map(function (v) {
					return v[_this4.props.valueKey];
				}).join(this.props.delimiter);
			}

			return {
				value: valueForState,
				values: values,
				inputValue: '',
				filteredOptions: filteredOptions,
				placeholder: !this.props.multi && values.length ? values[0][this.props.labelKey] : placeholder,
				focusedOption: focusedOption
			};
		},

		getFirstFocusableOption: function getFirstFocusableOption(options) {
			for (var optionIndex = 0; optionIndex < options.length; ++optionIndex) {
				if (!options[optionIndex].disabled) {
					return options[optionIndex];
				}
			}
		},

		initValuesArray: function initValuesArray(values, options) {
			var _this5 = this;

			if (!Array.isArray(values)) {
				if (typeof values === 'string') {
					values = values === '' ? [] : this.props.multi ? values.split(this.props.delimiter) : [values];
				} else {
					values = values !== undefined && values !== null ? [values] : [];
				}
			}
			return values.map(function (val) {
				if (typeof val === 'string' || typeof val === 'number') {
					var _ref;

					for (var key in options) {
						if (options.hasOwnProperty(key) && options[key] && (options[key][_this5.props.valueKey] === val || typeof options[key][_this5.props.valueKey] === 'number' && options[key][_this5.props.valueKey].toString() === val)) {
							return options[key];
						}
					}
					return _ref = {}, _defineProperty(_ref, _this5.props.valueKey, val), _defineProperty(_ref, _this5.props.labelKey, val), _ref;
				} else {
					return val;
				}
			});
		},

		setValue: function setValue(value, focusAfterUpdate) {
			if (focusAfterUpdate || focusAfterUpdate === undefined) {
				this._focusAfterUpdate = true;
			}
			var newState = this.getStateFromValue(value);
			newState.isOpen = false;
			this.fireChangeEvent(newState);
			this.setState(newState);
		},

		selectValue: function selectValue(value) {
			if (!this.props.multi) {
				this.setValue(value);
			} else if (value) {
				this.addValue(value);
			}
			this._unbindCloseMenuIfClickedOutside();
		},

		addValue: function addValue(value) {
			this.setValue(this.state.values.concat(value));
		},

		popValue: function popValue() {
			this.setValue(this.state.values.slice(0, this.state.values.length - 1));
		},

		removeValue: function removeValue(valueToRemove) {
			this.setValue(this.state.values.filter(function (value) {
				return value !== valueToRemove;
			}));
		},

		clearValue: function clearValue(event) {
			// if the event was triggered by a mousedown and not the primary
			// button, ignore it.
			if (event && event.type === 'mousedown' && event.button !== 0) {
				return;
			}
			event.stopPropagation();
			event.preventDefault();
			this.setValue(null);
		},

		resetValue: function resetValue() {
			this.setValue(this.state.value === '' ? null : this.state.value);
		},

		getInputNode: function getInputNode() {
			var input = this.refs.input;
			return this.props.searchable ? input : ReactDOM.findDOMNode(input);
		},

		fireChangeEvent: function fireChangeEvent(newState) {
			if (newState.value !== this.state.value && this.props.onChange) {
				this.props.onChange(newState.value, newState.values);
			}
		},

		handleMouseDown: function handleMouseDown(event) {
			// if the event was triggered by a mousedown and not the primary
			// button, or if the component is disabled, ignore it.
			if (this.props.disabled || event.type === 'mousedown' && event.button !== 0) {
				return;
			}
			event.stopPropagation();
			event.preventDefault();

			// for the non-searchable select, close the dropdown when button is clicked
			if (this.state.isOpen && !this.props.searchable) {
				this.setState({
					isOpen: false
				}, this._unbindCloseMenuIfClickedOutside);
				return;
			}

			if (this.state.isFocused) {
				this.setState({
					isOpen: true
				}, this._bindCloseMenuIfClickedOutside);
			} else {
				this._openAfterFocus = true;
				this.getInputNode().focus();
			}
		},

		handleMouseDownOnMenu: function handleMouseDownOnMenu(event) {
			// if the event was triggered by a mousedown and not the primary
			// button, or if the component is disabled, ignore it.
			if (this.props.disabled || event.type === 'mousedown' && event.button !== 0) {
				return;
			}
			event.stopPropagation();
			event.preventDefault();
		},

		handleMouseDownOnArrow: function handleMouseDownOnArrow(event) {
			// if the event was triggered by a mousedown and not the primary
			// button, or if the component is disabled, ignore it.
			if (this.props.disabled || event.type === 'mousedown' && event.button !== 0) {
				return;
			}
			// If not focused, handleMouseDown will handle it
			if (!this.state.isOpen) {
				return;
			}
			event.stopPropagation();
			event.preventDefault();
			this.setState({
				isOpen: false
			}, this._unbindCloseMenuIfClickedOutside);
		},

		handleInputFocus: function handleInputFocus(event) {
			var _this6 = this;

			var newIsOpen = this.state.isOpen || this._openAfterFocus;
			this.setState({
				isFocused: true,
				isOpen: newIsOpen
			}, function () {
				if (newIsOpen) {
					_this6._bindCloseMenuIfClickedOutside();
				} else {
					_this6._unbindCloseMenuIfClickedOutside();
				}
			});
			this._openAfterFocus = false;
			if (this.props.onFocus) {
				this.props.onFocus(event);
			}
		},

		handleInputBlur: function handleInputBlur(event) {
			var _this7 = this;

			var menuDOM = ReactDOM.findDOMNode(this.refs.menu);
			if (document.activeElement.isEqualNode(menuDOM)) {
				return;
			}
			this._blurTimeout = setTimeout(function () {
				if (_this7._focusAfterUpdate || !_this7.isMounted()) return;
				_this7.setState({
					inputValue: '',
					isFocused: false,
					isOpen: false
				});
			}, 50);
			if (this.props.onBlur) {
				this.props.onBlur(event);
			}
		},

		handleKeyDown: function handleKeyDown(event) {
			if (this.props.disabled) return;
			switch (event.keyCode) {
				case 8:
					// backspace
					if (!this.state.inputValue && this.props.backspaceRemoves) {
						event.preventDefault();
						this.popValue();
					}
					return;
				case 9:
					// tab
					if (event.shiftKey || !this.state.isOpen || !this.state.focusedOption) {
						return;
					}
					this.selectFocusedOption();
					break;
				case 13:
					// enter
					if (!this.state.isOpen) return;
					this.selectFocusedOption();
					break;
				case 27:
					// escape
					if (this.state.isOpen) {
						this.resetValue();
					} else if (this.props.clearable) {
						this.clearValue(event);
					}
					break;
				case 38:
					// up
					this.focusPreviousOption();
					break;
				case 40:
					// down
					this.focusNextOption();
					break;
				case 188:
					// ,
					if (this.props.allowCreate && this.props.multi) {
						event.preventDefault();
						event.stopPropagation();
						this.selectFocusedOption();
					} else {
						return;
					}
					break;
				default:
					return;
			}
			event.preventDefault();
		},

		// Ensures that the currently focused option is available in filteredOptions.
		// If not, returns the first available option.
		_getNewFocusedOption: function _getNewFocusedOption(filteredOptions) {
			for (var key in filteredOptions) {
				if (filteredOptions.hasOwnProperty(key) && filteredOptions[key] === this.state.focusedOption) {
					return filteredOptions[key];
				}
			}
			return this.getFirstFocusableOption(filteredOptions);
		},

		handleInputChange: function handleInputChange(event) {
			// assign an internal variable because we need to use
			// the latest value before setState() has completed.
			this._optionsFilterString = event.target.value;
			if (this.props.onInputChange) {
				this.props.onInputChange(event.target.value);
			}
			if (this.props.asyncOptions) {
				this.setState({
					isLoading: true,
					inputValue: event.target.value
				});
				this.loadAsyncOptions(event.target.value, {
					isLoading: false,
					isOpen: true
				}, this._bindCloseMenuIfClickedOutside);
			} else {
				var filteredOptions = this.filterOptions(this.state.options);
				this.setState({
					isOpen: true,
					inputValue: event.target.value,
					filteredOptions: filteredOptions,
					focusedOption: this._getNewFocusedOption(filteredOptions)
				}, this._bindCloseMenuIfClickedOutside);
			}
		},

		autoloadAsyncOptions: function autoloadAsyncOptions() {
			var _this8 = this;

			this.setState({
				isLoading: true
			});
			this.loadAsyncOptions('', { isLoading: false }, function () {
				// update with new options but don't focus
				_this8.setValue(_this8.props.value, false);
			});
		},

		loadAsyncOptions: function loadAsyncOptions(input, state, callback) {
			if (input === undefined) input = '';

			var _this9 = this;

			var thisRequestId = this._currentRequestId = requestId++;
			if (this.props.cacheAsyncResults) {
				for (var i = 0; i <= input.length; i++) {
					var cacheKey = input.slice(0, i);
					if (this._optionsCache[cacheKey] && (input === cacheKey || this._optionsCache[cacheKey].complete)) {
						var options = this._optionsCache[cacheKey].options;
						var filteredOptions = this.filterOptions(options);
						var newState = {
							options: options,
							filteredOptions: filteredOptions,
							focusedOption: this._getNewFocusedOption(filteredOptions)
						};
						for (var key in state) {
							if (state.hasOwnProperty(key)) {
								newState[key] = state[key];
							}
						}
						this.setState(newState);
						if (callback) callback.call(this, newState);
						return;
					}
				}
			}

			var optionsResponseHandler = function optionsResponseHandler(err, data) {
				if (err) throw err;
				if (_this9.props.cacheAsyncResults) {
					_this9._optionsCache[input] = data;
				}
				if (thisRequestId !== _this9._currentRequestId) {
					return;
				}
				var filteredOptions = _this9.filterOptions(data.options);
				var newState = {
					options: data.options,
					filteredOptions: filteredOptions,
					focusedOption: _this9._getNewFocusedOption(filteredOptions)
				};
				for (var key in state) {
					if (state.hasOwnProperty(key)) {
						newState[key] = state[key];
					}
				}
				_this9.setState(newState);
				if (callback) callback.call(_this9, newState);
			};

			var asyncOpts = this.props.asyncOptions(input, optionsResponseHandler);

			if (asyncOpts && typeof asyncOpts.then === 'function') {
				asyncOpts.then(function (data) {
					optionsResponseHandler(null, data);
				}, function (err) {
					optionsResponseHandler(err);
				});
			}
		},

		filterOptions: function filterOptions(options, values) {
			var _this10 = this;

			var filterValue = this._optionsFilterString;
			var exclude = (values || this.state.values).map(function (i) {
				return i[_this10.props.valueKey];
			});
			if (this.props.filterOptions) {
				return this.props.filterOptions.call(this, options, filterValue, exclude);
			} else {
				var filterOption = function filterOption(op) {
					if (this.props.multi && exclude.indexOf(op[this.props.valueKey]) > -1) return false;
					if (this.props.filterOption) return this.props.filterOption.call(this, op, filterValue);
					var valueTest = String(op[this.props.valueKey]);
					var labelTest = String(op[this.props.labelKey]);
					if (this.props.ignoreCase) {
						valueTest = valueTest.toLowerCase();
						labelTest = labelTest.toLowerCase();
						filterValue = filterValue.toLowerCase();
					}
					return !filterValue || this.props.matchPos === 'start' ? this.props.matchProp !== 'label' && valueTest.substr(0, filterValue.length) === filterValue || this.props.matchProp !== 'value' && labelTest.substr(0, filterValue.length) === filterValue : this.props.matchProp !== 'label' && valueTest.indexOf(filterValue) >= 0 || this.props.matchProp !== 'value' && labelTest.indexOf(filterValue) >= 0;
				};
				return (options || []).filter(filterOption, this);
			}
		},

		selectFocusedOption: function selectFocusedOption() {
			if (this.props.allowCreate && !this.state.focusedOption) {
				return this.selectValue(this.state.inputValue);
			}

			if (this.state.focusedOption) {
				return this.selectValue(this.state.focusedOption);
			}
		},

		focusOption: function focusOption(op) {
			this.setState({
				focusedOption: op
			});
		},

		focusNextOption: function focusNextOption() {
			this.focusAdjacentOption('next');
		},

		focusPreviousOption: function focusPreviousOption() {
			this.focusAdjacentOption('previous');
		},

		focusAdjacentOption: function focusAdjacentOption(dir) {
			this._focusedOptionReveal = true;
			var ops = this.state.filteredOptions.filter(function (op) {
				return !op.disabled;
			});
			if (!this.state.isOpen) {
				this.setState({
					isOpen: true,
					inputValue: '',
					focusedOption: this.state.focusedOption || ops[dir === 'next' ? 0 : ops.length - 1]
				}, this._bindCloseMenuIfClickedOutside);
				return;
			}
			if (!ops.length) {
				return;
			}
			var focusedIndex = -1;
			for (var i = 0; i < ops.length; i++) {
				if (this.state.focusedOption === ops[i]) {
					focusedIndex = i;
					break;
				}
			}
			var focusedOption = ops[0];
			if (dir === 'next' && focusedIndex > -1 && focusedIndex < ops.length - 1) {
				focusedOption = ops[focusedIndex + 1];
			} else if (dir === 'previous') {
				if (focusedIndex > 0) {
					focusedOption = ops[focusedIndex - 1];
				} else {
					focusedOption = ops[ops.length - 1];
				}
			}
			this.setState({
				focusedOption: focusedOption
			});
		},

		unfocusOption: function unfocusOption(op) {
			if (this.state.focusedOption === op) {
				this.setState({
					focusedOption: null
				});
			}
		},

		renderOptionLabel: function renderOptionLabel(op) {
			return op[this.props.labelKey];
		},

		buildMenu: function buildMenu() {
			var focusedValue = this.state.focusedOption ? this.state.focusedOption[this.props.valueKey] : null;
			var renderLabel = this.props.optionRenderer || this.renderOptionLabel;
			if (this.state.filteredOptions.length > 0) {
				focusedValue = focusedValue == null ? this.state.filteredOptions[0] : focusedValue;
			}
			// Add the current value to the filtered options in last resort
			var options = this.state.filteredOptions;
			if (this.props.allowCreate && this.state.inputValue.trim()) {
				var inputValue = this.state.inputValue;
				options = options.slice();
				var newOption = this.props.newOptionCreator ? this.props.newOptionCreator(inputValue) : {
					value: inputValue,
					label: inputValue,
					create: true
				};
				options.unshift(newOption);
			}
			var ops = Object.keys(options).map(function (key) {
				var op = options[key];
				var isSelected = this.state.value === op[this.props.valueKey];
				var isFocused = focusedValue === op[this.props.valueKey];
				var optionClass = classes({
					'Select-option': true,
					'is-selected': isSelected,
					'is-focused': isFocused,
					'is-disabled': op.disabled
				});
				var ref = isFocused ? 'focused' : null;
				var optionResult = React.createElement(this.props.optionComponent, {
					key: 'option-' + op[this.props.valueKey],
					className: optionClass,
					renderFunc: renderLabel,
					mouseDown: this.selectValue,
					mouseEnter: this.focusOption,
					mouseLeave: this.unfocusOption,
					addLabelText: this.props.addLabelText,
					option: op,
					ref: ref
				});
				return optionResult;
			}, this);

			if (ops.length) {
				return ops;
			} else {
				var noResultsText, promptClass;
				if (this.isLoading()) {
					promptClass = 'Select-searching';
					noResultsText = this.props.searchingText;
				} else if (this.state.inputValue || !this.props.asyncOptions) {
					promptClass = 'Select-noresults';
					noResultsText = this.props.noResultsText;
				} else {
					promptClass = 'Select-search-prompt';
					noResultsText = this.props.searchPromptText;
				}

				return React.createElement(
					'div',
					{ className: promptClass },
					noResultsText
				);
			}
		},

		handleOptionLabelClick: function handleOptionLabelClick(value, event) {
			if (this.props.onOptionLabelClick) {
				this.props.onOptionLabelClick(value, event);
			}
		},

		isLoading: function isLoading() {
			return this.props.isLoading || this.state.isLoading;
		},

		render: function render() {
			var selectClass = classes('Select', this.props.className, {
				'Select--multi': this.props.multi,
				'is-searchable': this.props.searchable,
				'is-open': this.state.isOpen,
				'is-focused': this.state.isFocused,
				'is-loading': this.isLoading(),
				'is-disabled': this.props.disabled,
				'has-value': this.state.value
			});
			var value = [];
			if (this.props.multi) {
				this.state.values.forEach(function (val) {
					var renderLabel = this.props.valueRenderer || this.renderOptionLabel;
					var onOptionLabelClick = this.handleOptionLabelClick.bind(this, val);
					var onRemove = this.removeValue.bind(this, val);
					var valueComponent = React.createElement(this.props.valueComponent, {
						key: val[this.props.valueKey],
						option: val,
						renderer: renderLabel,
						optionLabelClick: !!this.props.onOptionLabelClick,
						onOptionLabelClick: onOptionLabelClick,
						onRemove: onRemove,
						disabled: this.props.disabled
					});
					value.push(valueComponent);
				}, this);
			}

			if (!this.state.inputValue && (!this.props.multi || !value.length)) {
				var val = this.state.values[0] || null;
				if (this.props.valueRenderer && !!this.state.values.length) {
					value.push(React.createElement(Value, {
						key: 0,
						option: val,
						renderer: this.props.valueRenderer,
						disabled: this.props.disabled }));
				} else {
					var singleValueComponent = React.createElement(this.props.singleValueComponent, {
						key: 'placeholder',
						value: val,
						placeholder: this.state.placeholder
					});
					value.push(singleValueComponent);
				}
			}

			// loading spinner
			var loading = this.isLoading() ? React.createElement(
				'span',
				{ className: 'Select-loading-zone', 'aria-hidden': 'true' },
				React.createElement('span', { className: 'Select-loading' })
			) : null;

			// clear "x" button
			var clear = this.props.clearable && this.state.value && !this.props.disabled && !this.isLoading() ? React.createElement(
				'span',
				{ className: 'Select-clear-zone', title: this.props.multi ? this.props.clearAllText : this.props.clearValueText, 'aria-label': this.props.multi ? this.props.clearAllText : this.props.clearValueText, onMouseDown: this.clearValue, onTouchEnd: this.clearValue, onClick: this.clearValue },
				React.createElement('span', { className: 'Select-clear', dangerouslySetInnerHTML: { __html: '&times;' } })
			) : null;

			// indicator arrow
			var arrow = React.createElement(
				'span',
				{ className: 'Select-arrow-zone', onMouseDown: this.handleMouseDownOnArrow },
				React.createElement('span', { className: 'Select-arrow', onMouseDown: this.handleMouseDownOnArrow })
			);

			var menu;
			var menuProps;
			if (this.state.isOpen) {
				menuProps = {
					ref: 'menu',
					className: 'Select-menu',
					onMouseDown: this.handleMouseDownOnMenu
				};
				menu = React.createElement(
					'div',
					{ ref: 'selectMenuContainer', className: 'Select-menu-outer' },
					React.createElement(
						'div',
						menuProps,
						this.buildMenu()
					)
				);
			}

			var input;
			var inputProps = {
				ref: 'input',
				className: 'Select-input ' + (this.props.inputProps.className || ''),
				tabIndex: this.props.tabIndex || 0,
				onFocus: this.handleInputFocus,
				onBlur: this.handleInputBlur
			};
			for (var key in this.props.inputProps) {
				if (this.props.inputProps.hasOwnProperty(key) && key !== 'className') {
					inputProps[key] = this.props.inputProps[key];
				}
			}

			if (!this.props.disabled) {
				if (this.props.searchable) {
					input = React.createElement(Input, _extends({ value: this.state.inputValue, onChange: this.handleInputChange, minWidth: '5' }, inputProps));
				} else {
					input = React.createElement(
						'div',
						inputProps,
						' '
					);
				}
			} else if (!this.props.multi || !this.state.values.length) {
				input = React.createElement(
					'div',
					{ className: 'Select-input' },
					' '
				);
			}

			return React.createElement(
				'div',
				{ ref: 'wrapper', className: selectClass },
				React.createElement('input', { type: 'hidden', ref: 'value', name: this.props.name, value: this.state.value, disabled: this.props.disabled }),
				React.createElement(
					'div',
					{ className: 'Select-control', ref: 'control', onKeyDown: this.handleKeyDown, onMouseDown: this.handleMouseDown, onTouchEnd: this.handleMouseDown },
					value,
					input,
					loading,
					clear,
					arrow
				),
				menu
			);
		}
	});

	module.exports = Select;

/***/ },

/***/ 953:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var React = __webpack_require__(1);

	var sizerStyle = { position: 'absolute', visibility: 'hidden', height: 0, width: 0, overflow: 'scroll', whiteSpace: 'pre' };

	var nextFrame = typeof window !== 'undefined' ? (function () {
		return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) {
			window.setTimeout(callback, 1000 / 60);
		};
	})().bind(window) : undefined; // If window is undefined, then we can't define a nextFrame function

	var AutosizeInput = React.createClass({
		displayName: 'AutosizeInput',

		propTypes: {
			value: React.PropTypes.any, // field value
			defaultValue: React.PropTypes.any, // default field value
			onChange: React.PropTypes.func, // onChange handler: function(newValue) {}
			style: React.PropTypes.object, // css styles for the outer element
			className: React.PropTypes.string, // className for the outer element
			minWidth: React.PropTypes.oneOfType([// minimum width for input element
			React.PropTypes.number, React.PropTypes.string]),
			inputStyle: React.PropTypes.object, // css styles for the input element
			inputClassName: React.PropTypes.string // className for the input element
		},
		getDefaultProps: function getDefaultProps() {
			return {
				minWidth: 1
			};
		},
		getInitialState: function getInitialState() {
			return {
				inputWidth: this.props.minWidth
			};
		},
		componentDidMount: function componentDidMount() {
			this.copyInputStyles();
			this.updateInputWidth();
		},
		componentDidUpdate: function componentDidUpdate() {
			this.queueUpdateInputWidth();
		},
		copyInputStyles: function copyInputStyles() {
			if (!this.isMounted() || !window.getComputedStyle) {
				return;
			}
			var inputStyle = window.getComputedStyle(this.refs.input);
			if (!inputStyle) {
				return;
			}
			var widthNode = this.refs.sizer;
			widthNode.style.fontSize = inputStyle.fontSize;
			widthNode.style.fontFamily = inputStyle.fontFamily;
			widthNode.style.fontWeight = inputStyle.fontWeight;
			widthNode.style.fontStyle = inputStyle.fontStyle;
			widthNode.style.letterSpacing = inputStyle.letterSpacing;
			if (this.props.placeholder) {
				var placeholderNode = this.refs.placeholderSizer;
				placeholderNode.style.fontSize = inputStyle.fontSize;
				placeholderNode.style.fontFamily = inputStyle.fontFamily;
				placeholderNode.style.fontWeight = inputStyle.fontWeight;
				placeholderNode.style.fontStyle = inputStyle.fontStyle;
				placeholderNode.style.letterSpacing = inputStyle.letterSpacing;
			}
		},
		queueUpdateInputWidth: function queueUpdateInputWidth() {
			nextFrame(this.updateInputWidth);
		},
		updateInputWidth: function updateInputWidth() {
			if (!this.isMounted() || typeof this.refs.sizer.scrollWidth === 'undefined') {
				return;
			}
			var newInputWidth = undefined;
			if (this.props.placeholder) {
				newInputWidth = Math.max(this.refs.sizer.scrollWidth, this.refs.placeholderSizer.scrollWidth) + 2;
			} else {
				newInputWidth = this.refs.sizer.scrollWidth + 2;
			}
			if (newInputWidth < this.props.minWidth) {
				newInputWidth = this.props.minWidth;
			}
			if (newInputWidth !== this.state.inputWidth) {
				this.setState({
					inputWidth: newInputWidth
				});
			}
		},
		getInput: function getInput() {
			return this.refs.input;
		},
		focus: function focus() {
			this.refs.input.focus();
		},
		blur: function blur() {
			this.refs.input.blur();
		},
		select: function select() {
			this.refs.input.select();
		},
		render: function render() {
			var sizerValue = this.props.defaultValue || this.props.value || '';
			var wrapperStyle = this.props.style || {};
			if (!wrapperStyle.display) wrapperStyle.display = 'inline-block';
			var inputStyle = _extends({}, this.props.inputStyle);
			inputStyle.width = this.state.inputWidth + 'px';
			inputStyle.boxSizing = 'content-box';
			var placeholder = this.props.placeholder ? React.createElement(
				'div',
				{ ref: 'placeholderSizer', style: sizerStyle },
				this.props.placeholder
			) : null;
			return React.createElement(
				'div',
				{ className: this.props.className, style: wrapperStyle },
				React.createElement('input', _extends({}, this.props, { ref: 'input', className: this.props.inputClassName, style: inputStyle })),
				React.createElement(
					'div',
					{ ref: 'sizer', style: sizerStyle },
					sizerValue
				),
				placeholder
			);
		}
	});

	module.exports = AutosizeInput;

/***/ },

/***/ 954:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(1);
	var classes = __webpack_require__(563);

	var Value = React.createClass({

		displayName: 'Value',

		propTypes: {
			disabled: React.PropTypes.bool, // disabled prop passed to ReactSelect
			onOptionLabelClick: React.PropTypes.func, // method to handle click on value label
			onRemove: React.PropTypes.func, // method to handle remove of that value
			option: React.PropTypes.object.isRequired, // option passed to component
			optionLabelClick: React.PropTypes.bool, // indicates if onOptionLabelClick should be handled
			renderer: React.PropTypes.func // method to render option label passed to ReactSelect
		},

		blockEvent: function blockEvent(event) {
			event.stopPropagation();
		},

		handleOnRemove: function handleOnRemove(event) {
			if (!this.props.disabled) {
				this.props.onRemove(event);
			}
		},

		render: function render() {
			var label = this.props.option.label;
			if (this.props.renderer) {
				label = this.props.renderer(this.props.option);
			}

			if (!this.props.onRemove && !this.props.optionLabelClick) {
				return React.createElement(
					'div',
					{
						className: classes('Select-value', this.props.option.className),
						style: this.props.option.style,
						title: this.props.option.title
					},
					label
				);
			}

			if (this.props.optionLabelClick) {
				label = React.createElement(
					'a',
					{ className: classes('Select-item-label__a', this.props.option.className),
						onMouseDown: this.blockEvent,
						onTouchEnd: this.props.onOptionLabelClick,
						onClick: this.props.onOptionLabelClick,
						style: this.props.option.style,
						title: this.props.option.title },
					label
				);
			}

			return React.createElement(
				'div',
				{ className: classes('Select-item', this.props.option.className),
					style: this.props.option.style,
					title: this.props.option.title },
				React.createElement(
					'span',
					{ className: 'Select-item-icon',
						onMouseDown: this.blockEvent,
						onClick: this.handleOnRemove,
						onTouchEnd: this.handleOnRemove },
					'×'
				),
				React.createElement(
					'span',
					{ className: 'Select-item-label' },
					label
				)
			);
		}

	});

	module.exports = Value;

/***/ },

/***/ 955:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(1);
	var classes = __webpack_require__(563);

	var SingleValue = React.createClass({
		displayName: 'SingleValue',

		propTypes: {
			placeholder: React.PropTypes.string, // this is default value provided by React-Select based component
			value: React.PropTypes.object // selected option
		},
		render: function render() {
			var classNames = classes('Select-placeholder', this.props.value && this.props.value.className);
			return React.createElement(
				'div',
				{
					className: classNames,
					style: this.props.value && this.props.value.style,
					title: this.props.value && this.props.value.title
				},
				this.props.placeholder
			);
		}
	});

	module.exports = SingleValue;

/***/ },

/***/ 956:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(1);
	var classes = __webpack_require__(563);

	var Option = React.createClass({
		displayName: 'Option',

		propTypes: {
			addLabelText: React.PropTypes.string, // string rendered in case of allowCreate option passed to ReactSelect
			className: React.PropTypes.string, // className (based on mouse position)
			mouseDown: React.PropTypes.func, // method to handle click on option element
			mouseEnter: React.PropTypes.func, // method to handle mouseEnter on option element
			mouseLeave: React.PropTypes.func, // method to handle mouseLeave on option element
			option: React.PropTypes.object.isRequired, // object that is base for that option
			renderFunc: React.PropTypes.func // method passed to ReactSelect component to render label text
		},
		blockEvent: function blockEvent(event) {
			event.preventDefault();
			if (event.target.tagName !== 'A' || !('href' in event.target)) {
				return;
			}

			if (event.target.target) {
				window.open(event.target.href);
			} else {
				window.location.href = event.target.href;
			}
		},
		handleMouseDown: function handleMouseDown(e) {
			this.props.mouseDown(this.props.option, e);
		},
		handleMouseEnter: function handleMouseEnter(e) {
			this.props.mouseEnter(this.props.option, e);
		},
		handleMouseLeave: function handleMouseLeave(e) {
			this.props.mouseLeave(this.props.option, e);
		},
		render: function render() {
			var option = this.props.option;
			var label = option.create ? this.props.addLabelText.replace('{label}', option.label) : this.props.renderFunc(option);
			var optionClasses = classes(this.props.className, option.className);

			return option.disabled ? React.createElement(
				'div',
				{ className: optionClasses,
					onMouseDown: this.blockEvent,
					onClick: this.blockEvent },
				label
			) : React.createElement(
				'div',
				{ className: optionClasses,
					style: option.style,
					onMouseDown: this.handleMouseDown,
					onMouseEnter: this.handleMouseEnter,
					onMouseLeave: this.handleMouseLeave,
					onClick: this.handleMouseDown,
					title: option.title },
				label
			);
		}
	});

	module.exports = Option;

/***/ },

/***/ 957:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(159);

	var _reduxForm = __webpack_require__(852);

	var _reactRouter = __webpack_require__(185);

	var _redux = __webpack_require__(166);

	var _masterdataaction = __webpack_require__(899);

	var masterDataActions = _interopRequireWildcard(_masterdataaction);

	var _reactSelect = __webpack_require__(952);

	var _reactSelect2 = _interopRequireDefault(_reactSelect);

	var _PureInput = __webpack_require__(958);

	var _PureInput2 = _interopRequireDefault(_PureInput);

	var _reactAddonsShallowCompare = __webpack_require__(897);

	var _reactAddonsShallowCompare2 = _interopRequireDefault(_reactAddonsShallowCompare);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var InventoryHeaderFilter = function (_Component) {
	  _inherits(InventoryHeaderFilter, _Component);

	  function InventoryHeaderFilter(props) {
	    _classCallCheck(this, InventoryHeaderFilter);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(InventoryHeaderFilter).call(this, props));

	    _this.resetFilter = _this.resetFilter.bind(_this);
	    _this.handleWarehouseSelectChange = _this.handleWarehouseSelectChange.bind(_this);
	    _this.handleLocationSelectChange = _this.handleLocationSelectChange.bind(_this);

	    _this.state = {
	      WarehouseValue: [],
	      LocationValue: [],
	      hideAdvanceSearch: true,
	      hideStoneSearch: false,
	      hideJewelrySearch: true
	    };
	    return _this;
	  }

	  _createClass(InventoryHeaderFilter, [{
	    key: 'resetFilter',
	    value: function resetFilter() {
	      console.log('resetFilter-->');
	      return 'resetFilter';
	    }
	  }, {
	    key: 'myFunc',
	    value: function myFunc() {
	      return 'hello';
	    }
	  }, {
	    key: 'componentWillMount',
	    value: function componentWillMount() {
	      // console.log('componentWillMount-->');
	      // this.props.resetFilter();
	      this.props.optionsActions.get();
	    }
	    // shouldComponentUpdate(nextProps) {
	    //   return this.props.options !== nextProps.options||
	    //     this.props.itemreference !== nextProps.itemreference||
	    //     this.props.itemdescription !== nextProps.itemdescription||
	    //     this.props.vendoritemreference !== nextProps.vendoritemreference||
	    //     this.props.vendorname !== nextProps.vendorname||
	    //     this.props.certificatednumber !== nextProps.certificatednumber||
	    //     this.props.sku !== nextProps.sku||
	    //     this.props.attachment !== nextProps.attachment
	    //
	    // }

	  }, {
	    key: 'shouldComponentUpdate',
	    value: function shouldComponentUpdate(nextProps, nextState) {
	      return (0, _reactAddonsShallowCompare2.default)(this, nextProps, nextState);
	    }
	  }, {
	    key: 'handleWarehouseSelectChange',
	    value: function handleWarehouseSelectChange(WarehouseValue) {
	      var warehouse = this.props.warehouse;

	      warehouse.onChange(WarehouseValue);
	      this.setState({ WarehouseValue: WarehouseValue });
	      // var {reset} = this.props;
	      // reset = this.resetFilter();
	    }
	  }, {
	    key: 'handleLocationSelectChange',
	    value: function handleLocationSelectChange(LocationValue) {
	      var location = this.props.location;

	      location.onChange(LocationValue);
	      this.setState({ LocationValue: LocationValue });
	    }
	  }, {
	    key: 'advanceSearchClick',
	    value: function advanceSearchClick() {
	      if (this.state.hideAdvanceSearch) {
	        this.setState({ hideAdvanceSearch: false });
	      } else {
	        this.setState({ hideAdvanceSearch: true });
	      }
	    }
	  }, {
	    key: 'stoneSearchClick',
	    value: function stoneSearchClick() {
	      this.setState({ hideStoneSearch: false });
	      this.setState({ hideJewelrySearch: true });
	    }
	  }, {
	    key: 'jewelrySearchClick',
	    value: function jewelrySearchClick() {
	      this.setState({ hideJewelrySearch: false });
	      this.setState({ hideStoneSearch: true });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _props = this.props;
	      var itemreference = _props.itemreference;
	      var itemdescription = _props.itemdescription;
	      var vendoritemreference = _props.vendoritemreference;
	      var vendorname = _props.vendorname;
	      var certificatednumber = _props.certificatednumber;
	      var sku = _props.sku;
	      var location = _props.location;
	      var warehouse = _props.warehouse;
	      var attachment = _props.attachment;

	      var userLogin = JSON.parse(sessionStorage.logindata);
	      var dataDropDowntLocations = [];
	      var dataDropDowntWareHouse = [];
	      // console.log('this.props.options.warehouses-->',this.props.options.warehouses);
	      // console.log('this.props.options.locations-->',this.props.options.locations);
	      if (this.props.options.warehouses) {
	        dataDropDowntWareHouse.push(this.props.options.warehouses.map(function (warehouse) {
	          return { value: warehouse.id, label: warehouse.code };
	        }));
	        dataDropDowntWareHouse = dataDropDowntWareHouse[0];
	      }
	      if (this.props.options.locations) {
	        dataDropDowntLocations.push(this.props.options.locations.map(function (location) {
	          return { value: location.id, label: location.code };
	        }));
	        dataDropDowntLocations = dataDropDowntLocations[0];
	      }
	      // console.log('this.props-->',this.props);
	      // console.log('dataDropDowntLocations-->',dataDropDowntLocations);
	      return _react2.default.createElement(
	        'div',
	        null,
	        _react2.default.createElement(
	          'div',
	          { className: 'row' },
	          _react2.default.createElement(
	            'div',
	            { className: 'col-sm-12' },
	            _react2.default.createElement(
	              'div',
	              { className: 'panel panel-default' },
	              _react2.default.createElement(
	                'div',
	                { className: 'panel-body' },
	                _react2.default.createElement(
	                  'div',
	                  { className: 'row margin-ft' },
	                  _react2.default.createElement(
	                    'div',
	                    { className: 'col-sm-6 form-horizontal' },
	                    _react2.default.createElement(
	                      'div',
	                      { className: 'form-group' },
	                      _react2.default.createElement(
	                        'label',
	                        { className: 'col-sm-4 control-label' },
	                        'Item Reference'
	                      ),
	                      _react2.default.createElement(
	                        'div',
	                        { className: 'col-sm-7' },
	                        _react2.default.createElement(_PureInput2.default, { type: 'text', className: 'form-control', field: itemreference })
	                      )
	                    ),
	                    _react2.default.createElement(
	                      'div',
	                      { className: 'form-group' },
	                      _react2.default.createElement(
	                        'label',
	                        { className: 'col-sm-4 control-label' },
	                        'Item Description'
	                      ),
	                      _react2.default.createElement(
	                        'div',
	                        { className: 'col-sm-7' },
	                        _react2.default.createElement(_PureInput2.default, { type: 'text', className: 'form-control', field: itemdescription })
	                      )
	                    ),
	                    _react2.default.createElement(
	                      'div',
	                      { className: 'form-group' },
	                      _react2.default.createElement(
	                        'label',
	                        { className: 'col-sm-4 control-label' },
	                        'Vendor Item Reference'
	                      ),
	                      _react2.default.createElement(
	                        'div',
	                        { className: 'col-sm-7' },
	                        _react2.default.createElement(_PureInput2.default, { type: 'text', className: 'form-control', field: vendoritemreference })
	                      )
	                    ),
	                    _react2.default.createElement(
	                      'div',
	                      { className: 'form-group' },
	                      _react2.default.createElement(
	                        'label',
	                        { className: 'col-sm-4 control-label' },
	                        'Vendor Name'
	                      ),
	                      _react2.default.createElement(
	                        'div',
	                        { className: 'col-sm-7' },
	                        _react2.default.createElement(_PureInput2.default, { type: 'text', className: 'form-control', field: vendorname })
	                      )
	                    ),
	                    _react2.default.createElement(
	                      'div',
	                      { className: 'form-group' },
	                      _react2.default.createElement(
	                        'label',
	                        { className: 'col-sm-4 control-label' },
	                        'Certificated Number'
	                      ),
	                      _react2.default.createElement(
	                        'div',
	                        { className: 'col-sm-7' },
	                        _react2.default.createElement(_PureInput2.default, { type: 'text', className: 'form-control', field: certificatednumber })
	                      )
	                    )
	                  ),
	                  _react2.default.createElement(
	                    'div',
	                    { className: 'col-sm-6 form-horizontal' },
	                    _react2.default.createElement(
	                      'div',
	                      { className: 'form-group' },
	                      _react2.default.createElement(
	                        'label',
	                        { className: 'col-sm-4 control-label' },
	                        'SKU'
	                      ),
	                      _react2.default.createElement(
	                        'div',
	                        { className: 'col-sm-7' },
	                        _react2.default.createElement(_PureInput2.default, { type: 'text', className: 'form-control', field: sku })
	                      )
	                    ),
	                    _react2.default.createElement(
	                      'div',
	                      { className: 'form-group' },
	                      _react2.default.createElement(
	                        'label',
	                        { className: 'col-sm-4 control-label' },
	                        'Warehouse'
	                      ),
	                      _react2.default.createElement(
	                        'div',
	                        { className: 'col-sm-7' },
	                        _react2.default.createElement(_reactSelect2.default, { multi: true, simpleValue: true, value: this.state.WarehouseValue,
	                          placeholder: 'Select your Warehouse',
	                          options: dataDropDowntWareHouse,
	                          onChange: this.handleWarehouseSelectChange })
	                      )
	                    ),
	                    _react2.default.createElement(
	                      'div',
	                      { className: 'form-group' },
	                      _react2.default.createElement(
	                        'label',
	                        { className: 'col-sm-4 control-label' },
	                        'Location'
	                      ),
	                      _react2.default.createElement(
	                        'div',
	                        { className: 'col-sm-7' },
	                        _react2.default.createElement(_reactSelect2.default, { multi: true, simpleValue: true, value: this.state.LocationValue,
	                          placeholder: 'Select your Location',
	                          options: dataDropDowntLocations,
	                          onChange: this.handleLocationSelectChange })
	                      )
	                    ),
	                    _react2.default.createElement(
	                      'div',
	                      { className: 'form-group' },
	                      _react2.default.createElement(
	                        'label',
	                        { className: 'col-sm-4 control-label' },
	                        'Attachment'
	                      ),
	                      _react2.default.createElement(
	                        'div',
	                        { className: 'col-sm-7' },
	                        _react2.default.createElement('input', _extends({ type: 'file' }, attachment, { value: null }))
	                      )
	                    )
	                  )
	                )
	              )
	            )
	          )
	        )
	      );
	    }
	  }]);

	  return InventoryHeaderFilter;
	}(_react.Component);

	InventoryHeaderFilter.propTypes = {
	  itemreference: _react.PropTypes.object.isRequired,
	  itemdescription: _react.PropTypes.object.isRequired,
	  vendoritemreference: _react.PropTypes.object.isRequired,
	  vendorname: _react.PropTypes.object.isRequired,
	  certificatednumber: _react.PropTypes.object.isRequired,
	  sku: _react.PropTypes.object.isRequired,
	  attachment: _react.PropTypes.object.isRequired,
	  location: _react.PropTypes.object.isRequired,
	  warehouse: _react.PropTypes.object.isRequired,
	  resetFilter: _react.PropTypes.func
	};
	function mapStateToProps(state) {
	  // console.log('state-->',state);
	  return {
	    options: state.users.options,
	    selectedCompany: state.users.selectedCompany,
	    selectedWarehouses: state.users.selectedWarehouses
	  };
	}
	function mapDispatchToProps(dispatch) {
	  return {
	    optionsActions: (0, _redux.bindActionCreators)(Object.assign({}, masterDataActions), dispatch)
	  };
	}
	module.exports = (0, _reduxForm.reduxForm)({
	  form: 'HeaderFilter',
	  fields: []
	}, mapStateToProps, mapDispatchToProps)(InventoryHeaderFilter);

/***/ },

/***/ 958:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var PureInput = function (_Component) {
	  _inherits(PureInput, _Component);

	  function PureInput() {
	    _classCallCheck(this, PureInput);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(PureInput).apply(this, arguments));
	  }

	  _createClass(PureInput, [{
	    key: 'shouldComponentUpdate',
	    value: function shouldComponentUpdate(nextProps) {
	      return this.props.field !== nextProps.field;
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _props = this.props;
	      var field = _props.field;

	      var rest = _objectWithoutProperties(_props, ['field']);

	      return _react2.default.createElement('input', _extends({}, field, rest));
	    }
	  }]);

	  return PureInput;
	}(_react.Component);

	PureInput.propTypes = {
	  field: _react.PropTypes.object.isRequired
	};

	exports.default = PureInput;

/***/ },

/***/ 959:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(159);

	var _reduxForm = __webpack_require__(852);

	var _redux = __webpack_require__(166);

	var _masterdataaction = __webpack_require__(899);

	var masterDataActions = _interopRequireWildcard(_masterdataaction);

	var _reactSelect = __webpack_require__(952);

	var _reactSelect2 = _interopRequireDefault(_reactSelect);

	var _reactSelectBox = __webpack_require__(960);

	var _reactSelectBox2 = _interopRequireDefault(_reactSelectBox);

	var _reformoptiongroup = __webpack_require__(961);

	var _reformoptiongroup2 = _interopRequireDefault(_reformoptiongroup);

	var _moment = __webpack_require__(963);

	var _moment2 = _interopRequireDefault(_moment);

	var _reactAddonsShallowCompare = __webpack_require__(897);

	var _reactAddonsShallowCompare2 = _interopRequireDefault(_reactAddonsShallowCompare);

	var _reactInputCalendar = __webpack_require__(1066);

	var _reactInputCalendar2 = _interopRequireDefault(_reactInputCalendar);

	var _PureInput = __webpack_require__(958);

	var _PureInput2 = _interopRequireDefault(_PureInput);

	var _Tree = __webpack_require__(1076);

	var _Tree2 = _interopRequireDefault(_Tree);

	var _TreeNode = __webpack_require__(1077);

	var _TreeNode2 = _interopRequireDefault(_TreeNode);

	var _TreeData = __webpack_require__(1078);

	var _TreeData2 = _interopRequireDefault(_TreeData);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	//test


	var InventoryStoneFilter = function (_Component) {
	  _inherits(InventoryStoneFilter, _Component);

	  function InventoryStoneFilter(props) {
	    _classCallCheck(this, InventoryStoneFilter);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(InventoryStoneFilter).call(this, props));

	    var dateToday = new Date();
	    var fromdate = dateToday.getMonth() + 1 + '-' + dateToday.getDate() + '-' + dateToday.getFullYear();

	    _this.treeOnClick = _this.treeOnClick.bind(_this);
	    _this.handleStoneTypeSelectChange = _this.handleStoneTypeSelectChange.bind(_this);
	    _this.handleCutShapeSelectChange = _this.handleCutShapeSelectChange.bind(_this);
	    _this.handleCutGradeSelectChange = _this.handleCutGradeSelectChange.bind(_this);
	    _this.handleColorSelectChange = _this.handleColorSelectChange.bind(_this);
	    _this.handleColorGradeSelectChange = _this.handleColorGradeSelectChange.bind(_this);
	    _this.handleClaritiesSelectChange = _this.handleClaritiesSelectChange.bind(_this);
	    _this.handleCertificateLabsSelectChange = _this.handleCertificateLabsSelectChange.bind(_this);
	    _this.handleChangeStart = _this.handleChangeStart.bind(_this);
	    _this.handleChangeEnd = _this.handleChangeEnd.bind(_this);
	    _this.handlePolishSelectChange = _this.handlePolishSelectChange.bind(_this);
	    _this.handleSymmetrySelectChange = _this.handleSymmetrySelectChange.bind(_this);
	    _this.handleTreatmentSelectChange = _this.handleTreatmentSelectChange.bind(_this);
	    _this.handleFluorescenceSelectChange = _this.handleFluorescenceSelectChange.bind(_this);
	    _this.handleOriginSelectChange = _this.handleOriginSelectChange.bind(_this);
	    // console.log('moment-->',moment());
	    _this.state = {
	      colors: [],
	      data: _TreeData2.default,
	      StoneTypeValue: [],
	      CutShapeValue: [],
	      CutGradeValue: [],
	      ColorValue: [],
	      ColorGradeValue: [],
	      ClarityValue: [],
	      CertificateLabValue: [],
	      startDate: null,
	      endDate: null,
	      PolishValue: [],
	      SymmetryValue: [],
	      TreatmentValue: [],
	      FluorescenceValue: [],
	      OriginValue: []
	    };
	    return _this;
	  }

	  _createClass(InventoryStoneFilter, [{
	    key: 'componentWillMount',
	    value: function componentWillMount() {
	      // console.log('componentWillMount-->');
	      this.props.optionsActions.get();
	    }
	    // shouldComponentUpdate(nextProps) {
	    //   // console.log('nextProps-->',nextProps)
	    //   return this.props.lotnumber !== nextProps.lotnumber
	    //     || this.props.lotQuantityFrom !== nextProps.lotQuantityFrom
	    //     || this.props.lotQuantityTo !== nextProps.lotQuantityTo
	    //     || this.props.totalCaratWeightFrom !== nextProps.totalCaratWeightFrom
	    //     || this.props.totalCaratWeightTo !== nextProps.totalCaratWeightTo
	    //     || this.props.totalCostFrom !== nextProps.totalCostFrom
	    //     || this.props.totalCostTo !== nextProps.totalCostTo
	    //     || this.props.totalUpdatedCostFrom !== nextProps.totalUpdatedCostFrom
	    //     || this.props.totalUpdatedCostTo !== nextProps.totalUpdatedCostTo
	    //     || this.props.publicPriceFrom !== nextProps.publicPriceFrom
	    //     || this.props.publicPriceTo !== nextProps.publicPriceTo
	    //     || this.props.markupFrom !== nextProps.markupFrom
	    //     || this.props.markupTo !== nextProps.markupTo
	    //     || this.props.certificateNumber !== nextProps.certificateNumber
	    // }

	  }, {
	    key: 'shouldComponentUpdate',
	    value: function shouldComponentUpdate(nextProps, nextState) {
	      return (0, _reactAddonsShallowCompare2.default)(this, nextProps, nextState);
	    }
	  }, {
	    key: 'treeOnClick',
	    value: function treeOnClick(vals) {
	      // console.log('vals-->',vals);
	      var treeSelected = [];
	      var selectedData = vals.filter(function (val) {
	        var checkAllNodes = function checkAllNodes(node) {
	          if (node.children) {
	            if (node.checked === true) {
	              treeSelected.push(node);
	            }
	            node.children.forEach(checkAllNodes);
	          } else {
	            if (node.checked === true) {
	              treeSelected.push(node);
	            }
	          }
	        };
	        if (val.checked === true) {
	          treeSelected.push(val);
	        }

	        if (val.children) {
	          val.children.forEach(checkAllNodes);
	        }
	        return treeSelected;
	      });
	      // console.log('treeSelected-->',treeSelected);
	      var stoneProductHierarchy = this.props.stoneProductHierarchy;

	      stoneProductHierarchy.onChange(treeSelected);
	    }
	  }, {
	    key: 'handleStoneTypeSelectChange',
	    value: function handleStoneTypeSelectChange(StoneTypeValue) {
	      // console.log('StoneTypeValue-->',StoneTypeValue);
	      var stonetype = this.props.stonetype;

	      stonetype.onChange(StoneTypeValue);
	      this.setState({ StoneTypeValue: StoneTypeValue });
	    }
	  }, {
	    key: 'handleCutShapeSelectChange',
	    value: function handleCutShapeSelectChange(CutShapeValue) {
	      var cutShape = this.props.cutShape;

	      cutShape.onChange(CutShapeValue);
	      this.setState({ CutShapeValue: CutShapeValue });
	    }
	  }, {
	    key: 'handleCutGradeSelectChange',
	    value: function handleCutGradeSelectChange(CutGradeValue) {
	      // console.log('CutGradeValue-->',CutGradeValue);
	      var cutGrade = this.props.cutGrade;

	      cutGrade.onChange(CutGradeValue);
	      this.setState({ CutGradeValue: CutGradeValue });
	    }
	  }, {
	    key: 'handleColorSelectChange',
	    value: function handleColorSelectChange(ColorValue) {
	      var color = this.props.color;

	      color.onChange(ColorValue);
	      this.setState({ ColorValue: ColorValue });
	    }
	  }, {
	    key: 'handleColorGradeSelectChange',
	    value: function handleColorGradeSelectChange(ColorGradeValue) {
	      // console.log('ColorGradeValue-->',ColorGradeValue);
	      var colorGrade = this.props.colorGrade;

	      colorGrade.onChange(ColorGradeValue);
	      this.setState({ ColorGradeValue: ColorGradeValue });
	    }
	  }, {
	    key: 'handleClaritiesSelectChange',
	    value: function handleClaritiesSelectChange(ClarityValue) {
	      // console.log('ColorGradeValue-->',ColorGradeValue);
	      var clarity = this.props.clarity;

	      clarity.onChange(ClarityValue);
	      this.setState({ ClarityValue: ClarityValue });
	    }
	  }, {
	    key: 'handleCertificateLabsSelectChange',
	    value: function handleCertificateLabsSelectChange(CertificateLabValue) {
	      // console.log('ColorGradeValue-->',ColorGradeValue);
	      var certificateLab = this.props.certificateLab;

	      certificateLab.onChange(CertificateLabValue);
	      this.setState({ CertificateLabValue: CertificateLabValue });
	    }
	  }, {
	    key: 'handleChangeDate',
	    value: function handleChangeDate(_ref) {
	      var startDate = _ref.startDate;
	      var endDate = _ref.endDate;

	      // console.log('startDate-->',startDate)
	      // console.log('endDate-->',endDate)
	      // console.log('this.state.startDate-->',this.state.startDate)
	      // console.log('this.state.endDate-->',this.state.endDate)
	      var startDateM = typeof startDate !== 'undefined' ? (0, _moment2.default)(startDate, 'MM-DD-YYYY') : (0, _moment2.default)(this.state.startDate, 'MM-DD-YYYY');
	      var endDateM = typeof endDate !== 'undefined' ? (0, _moment2.default)(endDate, 'MM-DD-YYYY') : (0, _moment2.default)(this.state.endDate, 'MM-DD-YYYY');

	      if (startDateM.isAfter(endDateM)) {
	        var temp = startDate || this.state.startDate;
	        startDate = endDate || this.state.endDate;
	        endDate = temp;
	      }

	      this.setState({ startDate: startDate, endDate: endDate });
	    }
	  }, {
	    key: 'handleChangeStart',
	    value: function handleChangeStart(startDate) {
	      // console.log('handleChangeStart-->',startDate);
	      var cerDateFrom = this.props.cerDateFrom;

	      cerDateFrom.onChange(startDate);
	      this.setState({ startDate: startDate });
	      this.handleChangeDate({ startDate: startDate });
	      // this.render();
	    }
	  }, {
	    key: 'handleChangeEnd',
	    value: function handleChangeEnd(endDate) {
	      var cerDateTo = this.props.cerDateTo;

	      cerDateTo.onChange(endDate);
	      this.setState({ endDate: endDate });
	      this.handleChangeDate({ endDate: endDate });
	    }
	  }, {
	    key: 'handlePolishSelectChange',
	    value: function handlePolishSelectChange(PolishValue) {
	      // console.log('ColorGradeValue-->',ColorGradeValue);
	      var polish = this.props.polish;

	      polish.onChange(PolishValue);
	      this.setState({ PolishValue: PolishValue });
	    }
	  }, {
	    key: 'handleSymmetrySelectChange',
	    value: function handleSymmetrySelectChange(SymmetryValue) {
	      // console.log('ColorGradeValue-->',ColorGradeValue);
	      var symmetry = this.props.symmetry;

	      symmetry.onChange(SymmetryValue);
	      this.setState({ SymmetryValue: SymmetryValue });
	    }
	  }, {
	    key: 'handleTreatmentSelectChange',
	    value: function handleTreatmentSelectChange(TreatmentValue) {
	      // console.log('ColorGradeValue-->',ColorGradeValue);
	      var treatment = this.props.treatment;

	      treatment.onChange(TreatmentValue);
	      this.setState({ TreatmentValue: TreatmentValue });
	    }
	  }, {
	    key: 'handleFluorescenceSelectChange',
	    value: function handleFluorescenceSelectChange(FluorescenceValue) {
	      // console.log('ColorGradeValue-->',ColorGradeValue);
	      var fluorescence = this.props.fluorescence;

	      fluorescence.onChange(FluorescenceValue);
	      this.setState({ FluorescenceValue: FluorescenceValue });
	    }
	  }, {
	    key: 'handleOriginSelectChange',
	    value: function handleOriginSelectChange(OriginValue) {
	      // console.log('ColorGradeValue-->',ColorGradeValue);
	      var origin = this.props.origin;

	      origin.onChange(OriginValue);
	      this.setState({ OriginValue: OriginValue });
	    }
	  }, {
	    key: 'resetOther',
	    value: function resetOther() {
	      console.log('resetOther');
	    }
	  }, {
	    key: 'render',
	    value: function render() {

	      var ops = (0, _reformoptiongroup2.default)(this.props.options.colorGrades);
	      var _props = this.props;
	      var lotnumber = _props.lotnumber;
	      var lotQuantityFrom = _props.lotQuantityFrom;
	      var lotQuantityTo = _props.lotQuantityTo;
	      var totalCaratWeightFrom = _props.totalCaratWeightFrom;
	      var totalCaratWeightTo = _props.totalCaratWeightTo;
	      var totalCostFrom = _props.totalCostFrom;
	      var totalCostTo = _props.totalCostTo;
	      var totalUpdatedCostFrom = _props.totalUpdatedCostFrom;
	      var totalUpdatedCostTo = _props.totalUpdatedCostTo;
	      var publicPriceFrom = _props.publicPriceFrom;
	      var publicPriceTo = _props.publicPriceTo;
	      var markupFrom = _props.markupFrom;
	      var markupTo = _props.markupTo;
	      var certificateNumber = _props.certificateNumber;
	      var cerDateFrom = _props.cerDateFrom;
	      var cerDateTo = _props.cerDateTo;
	      var polish = _props.polish;
	      var symmetry = _props.symmetry;
	      var treatment = _props.treatment;
	      var fluorescence = _props.fluorescence;
	      var origin = _props.origin;
	      var resetForm = _props.resetForm;
	      var submitting = _props.submitting;

	      var dataDropDowntStoneType = [];
	      var dataDropDowntCutShape = [];
	      var dataDropDowntCutGrade = [];
	      var dataDropDowntColor = [];
	      var dataDropDowntColorGrade = [];
	      var dataDropDowntClarity = [];
	      var dataDropDowntCertificateLab = [];
	      var dataDropDowntPolish = [];
	      var dataDropDowntSymmetry = [];
	      var dataDropDowntTreatment = [];
	      var dataDropDowntFluorescence = [];
	      var dataDropDowntOrigin = [];

	      if (this.props.options.stoneType) {
	        dataDropDowntStoneType.push(this.props.options.stoneType.map(function (stoneType) {
	          return { value: stoneType.id, label: stoneType.name };
	        }));
	        dataDropDowntStoneType = dataDropDowntStoneType[0];
	      }
	      if (this.props.options.cutShape) {
	        dataDropDowntCutShape.push(this.props.options.cutShape.map(function (cutShape) {
	          return { value: cutShape.id, label: cutShape.name };
	        }));
	        dataDropDowntCutShape = dataDropDowntCutShape[0];
	      }
	      if (this.props.options.cutGrades) {
	        dataDropDowntCutGrade.push(this.props.options.cutGrades.map(function (cutGrade) {
	          return { value: cutGrade.id, label: cutGrade.name };
	        }));
	        dataDropDowntCutGrade = dataDropDowntCutGrade[0];
	      }
	      if (this.props.options.colors) {
	        dataDropDowntColor.push(this.props.options.colors.map(function (color) {
	          return { value: color.id, label: color.name };
	        }));
	        dataDropDowntColor = dataDropDowntColor[0];
	      }

	      if (this.props.options.colorGrades) {
	        dataDropDowntColorGrade.push(this.props.options.colorGrades.map(function (colorGrade) {
	          if (colorGrade.disabled) {
	            return { value: colorGrade.id, label: colorGrade.name, disabled: true };
	          } else {
	            return { value: colorGrade.id, label: colorGrade.name };
	          }
	        }));
	        dataDropDowntColorGrade = dataDropDowntColorGrade[0];
	      }
	      if (this.props.options.clarities) {
	        dataDropDowntClarity.push(this.props.options.clarities.map(function (clarity) {
	          return { value: clarity.id, label: clarity.name };
	        }));
	        dataDropDowntClarity = dataDropDowntClarity[0];
	      }
	      if (this.props.options.certificateLabs) {
	        dataDropDowntCertificateLab.push(this.props.options.certificateLabs.map(function (certificateLab) {
	          return { value: certificateLab.id, label: certificateLab.name };
	        }));
	        dataDropDowntCertificateLab = dataDropDowntCertificateLab[0];
	      }
	      if (this.props.options.polishs) {
	        dataDropDowntPolish.push(this.props.options.polishs.map(function (polish) {
	          return { value: polish.id, label: polish.name };
	        }));
	        dataDropDowntPolish = dataDropDowntPolish[0];
	      }
	      if (this.props.options.symmetries) {
	        dataDropDowntSymmetry.push(this.props.options.symmetries.map(function (symmetry) {
	          return { value: symmetry.id, label: symmetry.name };
	        }));
	        dataDropDowntSymmetry = dataDropDowntSymmetry[0];
	      }
	      if (this.props.options.treatments) {
	        dataDropDowntTreatment.push(this.props.options.treatments.map(function (treatment) {
	          return { value: treatment.id, label: treatment.name };
	        }));
	        dataDropDowntTreatment = dataDropDowntTreatment[0];
	      }
	      if (this.props.options.fluorescences) {
	        dataDropDowntFluorescence.push(this.props.options.fluorescences.map(function (fluorescence) {
	          return { value: fluorescence.id, label: fluorescence.name };
	        }));
	        dataDropDowntFluorescence = dataDropDowntFluorescence[0];
	      }
	      if (this.props.options.origins) {
	        dataDropDowntOrigin.push(this.props.options.origins.map(function (origin) {
	          return { value: origin.id, label: origin.name };
	        }));
	        dataDropDowntOrigin = dataDropDowntOrigin[0];
	      }
	      // console.log('this.state.ColorGradesValue-->',this.state.ColorGradesValue);
	      return _react2.default.createElement(
	        'div',
	        { className: 'panel panel-default' },
	        _react2.default.createElement(
	          'div',
	          { className: 'panel-body' },
	          _react2.default.createElement(
	            'div',
	            { className: 'row margin-ft' },
	            _react2.default.createElement(
	              'div',
	              { className: 'col-lg-6  form-horizontal' },
	              _react2.default.createElement(
	                'div',
	                { className: 'form-group' },
	                _react2.default.createElement(
	                  'label',
	                  { className: 'col-sm-4 control-label' },
	                  'Product Hierarchy'
	                ),
	                _react2.default.createElement(
	                  'div',
	                  { className: 'col-sm-7 bd-box' },
	                  _react2.default.createElement(_Tree2.default, { data: _TreeData2.default, onClick: this.treeOnClick })
	                )
	              ),
	              _react2.default.createElement(
	                'div',
	                { className: 'form-group' },
	                _react2.default.createElement(
	                  'label',
	                  { className: 'col-sm-4 control-label' },
	                  'Stone Type'
	                ),
	                _react2.default.createElement(
	                  'div',
	                  { className: 'col-sm-7' },
	                  _react2.default.createElement(_reactSelect2.default, { multi: true, simpleValue: true, value: this.state.StoneTypeValue,
	                    placeholder: 'Select your Stone Type',
	                    options: dataDropDowntStoneType,
	                    onChange: this.handleStoneTypeSelectChange })
	                )
	              ),
	              _react2.default.createElement(
	                'div',
	                { className: 'form-group' },
	                _react2.default.createElement(
	                  'label',
	                  { className: 'col-sm-4 control-label' },
	                  'Cut (Shape)'
	                ),
	                _react2.default.createElement(
	                  'div',
	                  { className: 'col-sm-7' },
	                  _react2.default.createElement(_reactSelect2.default, { multi: true, simpleValue: true, value: this.state.CutShapeValue,
	                    placeholder: 'Select your Cut (Shape)',
	                    options: dataDropDowntCutShape,
	                    onChange: this.handleCutShapeSelectChange })
	                )
	              ),
	              _react2.default.createElement(
	                'div',
	                { className: 'form-group' },
	                _react2.default.createElement(
	                  'label',
	                  { className: 'col-sm-4 control-label' },
	                  'Cut Grade'
	                ),
	                _react2.default.createElement(
	                  'div',
	                  { className: 'col-sm-7' },
	                  _react2.default.createElement(_reactSelect2.default, { multi: true, simpleValue: true, value: this.state.CutGradeValue,
	                    placeholder: 'Select your Cut Grade',
	                    options: dataDropDowntCutGrade,
	                    onChange: this.handleCutGradeSelectChange })
	                )
	              ),
	              _react2.default.createElement(
	                'div',
	                { className: 'form-group' },
	                _react2.default.createElement(
	                  'label',
	                  { className: 'col-sm-4 control-label' },
	                  'Color'
	                ),
	                _react2.default.createElement(
	                  'div',
	                  { className: 'col-sm-7' },
	                  _react2.default.createElement(_reactSelect2.default, { multi: true, simpleValue: true, value: this.state.ColorValue,
	                    placeholder: 'Select your Color',
	                    options: dataDropDowntColor,
	                    onChange: this.handleColorSelectChange })
	                )
	              ),
	              _react2.default.createElement(
	                'div',
	                { className: 'form-group' },
	                _react2.default.createElement(
	                  'label',
	                  { className: 'col-sm-4 control-label' },
	                  'Color Grade'
	                ),
	                _react2.default.createElement(
	                  'div',
	                  { className: 'col-sm-7' },
	                  _react2.default.createElement(_reactSelect2.default, { multi: true, simpleValue: true, value: this.state.ColorGradeValue,
	                    placeholder: 'Select your Color Grade',
	                    options: dataDropDowntColorGrade,
	                    onChange: this.handleColorGradeSelectChange })
	                )
	              ),
	              _react2.default.createElement(
	                'div',
	                { className: 'form-group' },
	                _react2.default.createElement(
	                  'label',
	                  { className: 'col-sm-4 control-label' },
	                  'Clarity'
	                ),
	                _react2.default.createElement(
	                  'div',
	                  { className: 'col-sm-7' },
	                  _react2.default.createElement(_reactSelect2.default, { multi: true, simpleValue: true, value: this.state.ClarityValue,
	                    placeholder: 'Select your Clarity',
	                    options: dataDropDowntClarity,
	                    onChange: this.handleClaritiesSelectChange })
	                )
	              ),
	              _react2.default.createElement(
	                'div',
	                { className: 'form-group' },
	                _react2.default.createElement(
	                  'label',
	                  { className: 'col-sm-4 control-label' },
	                  'Lot Number'
	                ),
	                _react2.default.createElement(
	                  'div',
	                  { className: 'col-sm-7' },
	                  _react2.default.createElement(_PureInput2.default, { type: 'text', className: 'form-control', field: lotnumber })
	                )
	              ),
	              _react2.default.createElement(
	                'div',
	                { className: 'form-group' },
	                _react2.default.createElement(
	                  'label',
	                  { className: 'col-sm-4 control-label' },
	                  'Lot Quantity'
	                ),
	                _react2.default.createElement(
	                  'div',
	                  { className: 'col-sm-7' },
	                  _react2.default.createElement(
	                    'label',
	                    { className: 'col-sm-2 control-label padding-l font-nor' },
	                    'From: '
	                  ),
	                  _react2.default.createElement(
	                    'div',
	                    { className: 'col-sm-4 nopadding' },
	                    _react2.default.createElement(_PureInput2.default, { type: 'text', className: 'form-control', field: lotQuantityFrom })
	                  ),
	                  _react2.default.createElement(
	                    'label',
	                    { className: 'col-sm-2 control-label font-nor m-margin-t10 m-nopadding' },
	                    'To: '
	                  ),
	                  _react2.default.createElement(
	                    'div',
	                    { className: 'col-sm-4 nopadding' },
	                    _react2.default.createElement(_PureInput2.default, { type: 'text', className: 'form-control', field: lotQuantityTo })
	                  )
	                )
	              ),
	              _react2.default.createElement(
	                'div',
	                { className: 'form-group' },
	                _react2.default.createElement(
	                  'label',
	                  { className: 'col-sm-4 control-label' },
	                  'Total Carat Weight'
	                ),
	                _react2.default.createElement(
	                  'div',
	                  { className: 'col-sm-7' },
	                  _react2.default.createElement(
	                    'label',
	                    { className: 'col-sm-2 control-label padding-l font-nor' },
	                    'From: '
	                  ),
	                  _react2.default.createElement(
	                    'div',
	                    { className: 'col-sm-4 nopadding' },
	                    _react2.default.createElement(_PureInput2.default, { type: 'text', className: 'form-control', field: totalCaratWeightFrom })
	                  ),
	                  _react2.default.createElement(
	                    'label',
	                    { className: 'col-sm-2 control-label font-nor m-margin-t10 m-nopadding' },
	                    'To: '
	                  ),
	                  _react2.default.createElement(
	                    'div',
	                    { className: 'col-sm-4 nopadding' },
	                    _react2.default.createElement(_PureInput2.default, { type: 'text', className: 'form-control', field: totalCaratWeightTo })
	                  )
	                )
	              )
	            ),
	            _react2.default.createElement(
	              'div',
	              { className: 'col-lg-6 form-horizontal' },
	              _react2.default.createElement(
	                'div',
	                { className: 'form-group' },
	                _react2.default.createElement(
	                  'label',
	                  { className: 'col-sm-4 control-label' },
	                  'Total Cost (USD)'
	                ),
	                _react2.default.createElement(
	                  'div',
	                  { className: 'col-sm-7' },
	                  _react2.default.createElement(
	                    'label',
	                    { className: 'col-sm-2 control-label padding-l font-nor' },
	                    'From: '
	                  ),
	                  _react2.default.createElement(
	                    'div',
	                    { className: 'col-sm-4 nopadding' },
	                    _react2.default.createElement(_PureInput2.default, { type: 'text', className: 'form-control', field: totalCostFrom })
	                  ),
	                  _react2.default.createElement(
	                    'label',
	                    { className: 'col-sm-2 control-label font-nor m-margin-t10 m-nopadding' },
	                    'To: '
	                  ),
	                  _react2.default.createElement(
	                    'div',
	                    { className: 'col-sm-4 nopadding' },
	                    _react2.default.createElement(_PureInput2.default, { type: 'text', className: 'form-control', field: totalCostTo })
	                  )
	                )
	              ),
	              _react2.default.createElement(
	                'div',
	                { className: 'form-group' },
	                _react2.default.createElement(
	                  'label',
	                  { className: 'col-sm-4 control-label' },
	                  'Total Updated Cost (USD)'
	                ),
	                _react2.default.createElement(
	                  'div',
	                  { className: 'col-sm-7' },
	                  _react2.default.createElement(
	                    'label',
	                    { className: 'col-sm-2 control-label padding-l font-nor' },
	                    'From: '
	                  ),
	                  _react2.default.createElement(
	                    'div',
	                    { className: 'col-sm-4 nopadding' },
	                    _react2.default.createElement(_PureInput2.default, { type: 'text', className: 'form-control', field: totalUpdatedCostFrom })
	                  ),
	                  _react2.default.createElement(
	                    'label',
	                    { className: 'col-sm-2 control-label font-nor m-margin-t10 m-nopadding' },
	                    'To: '
	                  ),
	                  _react2.default.createElement(
	                    'div',
	                    { className: 'col-sm-4 nopadding' },
	                    _react2.default.createElement(_PureInput2.default, { type: 'text', className: 'form-control', field: totalUpdatedCostTo })
	                  )
	                )
	              ),
	              _react2.default.createElement(
	                'div',
	                { className: 'form-group' },
	                _react2.default.createElement(
	                  'label',
	                  { className: 'col-sm-4 control-label' },
	                  'Public Price (USD)'
	                ),
	                _react2.default.createElement(
	                  'div',
	                  { className: 'col-sm-7' },
	                  _react2.default.createElement(
	                    'label',
	                    { className: 'col-sm-2 control-label padding-l font-nor' },
	                    'From: '
	                  ),
	                  _react2.default.createElement(
	                    'div',
	                    { className: 'col-sm-4 nopadding' },
	                    _react2.default.createElement(_PureInput2.default, { type: 'text', className: 'form-control', field: publicPriceFrom })
	                  ),
	                  _react2.default.createElement(
	                    'label',
	                    { className: 'col-sm-2 control-label font-nor m-margin-t10 m-nopadding' },
	                    'To: '
	                  ),
	                  _react2.default.createElement(
	                    'div',
	                    { className: 'col-sm-4 nopadding' },
	                    _react2.default.createElement(_PureInput2.default, { type: 'text', className: 'form-control', field: publicPriceTo })
	                  )
	                )
	              ),
	              _react2.default.createElement(
	                'div',
	                { className: 'form-group' },
	                _react2.default.createElement(
	                  'label',
	                  { className: 'col-sm-4 control-label' },
	                  'Markup %'
	                ),
	                _react2.default.createElement(
	                  'div',
	                  { className: 'col-sm-7' },
	                  _react2.default.createElement(
	                    'label',
	                    { className: 'col-sm-2 control-label padding-l font-nor' },
	                    'From: '
	                  ),
	                  _react2.default.createElement(
	                    'div',
	                    { className: 'col-sm-4 nopadding' },
	                    _react2.default.createElement(_PureInput2.default, { type: 'number', className: 'form-control', field: markupFrom })
	                  ),
	                  _react2.default.createElement(
	                    'label',
	                    { className: 'col-sm-2 control-label font-nor m-margin-t10 m-nopadding' },
	                    'To: '
	                  ),
	                  _react2.default.createElement(
	                    'div',
	                    { className: 'col-sm-4 nopadding' },
	                    _react2.default.createElement(_PureInput2.default, { type: 'number', className: 'form-control', field: markupTo })
	                  )
	                )
	              ),
	              _react2.default.createElement(
	                'div',
	                { className: 'form-group' },
	                _react2.default.createElement(
	                  'label',
	                  { className: 'col-sm-4 control-label' },
	                  'Certificate Number'
	                ),
	                _react2.default.createElement(
	                  'div',
	                  { className: 'col-sm-7' },
	                  _react2.default.createElement(_PureInput2.default, { type: 'text', className: 'form-control', field: certificateNumber })
	                )
	              ),
	              _react2.default.createElement(
	                'div',
	                { className: 'form-group' },
	                _react2.default.createElement(
	                  'label',
	                  { className: 'col-sm-4 control-label' },
	                  'Certificate Lab'
	                ),
	                _react2.default.createElement(
	                  'div',
	                  { className: 'col-sm-7' },
	                  _react2.default.createElement(_reactSelect2.default, { multi: true, simpleValue: true, value: this.state.CertificateLabValue,
	                    placeholder: 'Select your Certificate Lab',
	                    options: dataDropDowntCertificateLab,
	                    onChange: this.handleCertificateLabsSelectChange })
	                )
	              ),
	              _react2.default.createElement(
	                'div',
	                { className: 'form-group' },
	                _react2.default.createElement(
	                  'label',
	                  { className: 'col-sm-4 control-label' },
	                  'Certificate Date'
	                ),
	                _react2.default.createElement(
	                  'div',
	                  { className: 'col-sm-7' },
	                  _react2.default.createElement(
	                    'label',
	                    { className: 'col-sm-2 padding-l font-nor' },
	                    'From: '
	                  ),
	                  _react2.default.createElement(
	                    'div',
	                    { className: 'col-sm-10 nopadding' },
	                    _react2.default.createElement(_reactInputCalendar2.default, {
	                      format: 'MM-DD-YYYY',
	                      date: this.state.startDate,
	                      minDate: this.state.startDate,
	                      maxDate: this.state.endDate,
	                      closeOnSelect: true,
	                      onChange: this.handleChangeStart
	                    })
	                  ),
	                  _react2.default.createElement(
	                    'label',
	                    { className: 'col-sm-2 control-label padding-l font-nor m-margin-t10 m-nopadding' },
	                    'To: '
	                  ),
	                  _react2.default.createElement(
	                    'div',
	                    { className: 'col-sm-10 nopadding' },
	                    _react2.default.createElement(_reactInputCalendar2.default, {
	                      format: 'MM-DD-YYYY',
	                      date: this.state.endDate,
	                      minDate: this.state.startDate,
	                      maxDate: this.state.endDate,
	                      closeOnSelect: true,
	                      onChange: this.handleChangeEnd
	                    })
	                  )
	                )
	              ),
	              _react2.default.createElement(
	                'div',
	                { className: 'form-group' },
	                _react2.default.createElement(
	                  'label',
	                  { className: 'col-sm-4 control-label' },
	                  'Polish'
	                ),
	                _react2.default.createElement(
	                  'div',
	                  { className: 'col-sm-7' },
	                  _react2.default.createElement(_reactSelect2.default, { multi: true, simpleValue: true, value: this.state.PolishValue,
	                    placeholder: 'Select your Polish',
	                    options: dataDropDowntPolish,
	                    onChange: this.handlePolishSelectChange })
	                )
	              ),
	              _react2.default.createElement(
	                'div',
	                { className: 'form-group' },
	                _react2.default.createElement(
	                  'label',
	                  { className: 'col-sm-4 control-label' },
	                  'Symmetry'
	                ),
	                _react2.default.createElement(
	                  'div',
	                  { className: 'col-sm-7' },
	                  _react2.default.createElement(_reactSelect2.default, { multi: true, simpleValue: true, value: this.state.SymmetryValue,
	                    placeholder: 'Select your Symmetry',
	                    options: dataDropDowntSymmetry,
	                    onChange: this.handleSymmetrySelectChange })
	                )
	              ),
	              _react2.default.createElement(
	                'div',
	                { className: 'form-group' },
	                _react2.default.createElement(
	                  'label',
	                  { className: 'col-sm-4 control-label' },
	                  'Treatment'
	                ),
	                _react2.default.createElement(
	                  'div',
	                  { className: 'col-sm-7' },
	                  _react2.default.createElement(_reactSelect2.default, { multi: true, simpleValue: true, value: this.state.TreatmentValue,
	                    placeholder: 'Select your Treatment',
	                    options: dataDropDowntTreatment,
	                    onChange: this.handleTreatmentSelectChange })
	                )
	              ),
	              _react2.default.createElement(
	                'div',
	                { className: 'form-group' },
	                _react2.default.createElement(
	                  'label',
	                  { className: 'col-sm-4 control-label' },
	                  'Fluorescence'
	                ),
	                _react2.default.createElement(
	                  'div',
	                  { className: 'col-sm-7' },
	                  _react2.default.createElement(_reactSelect2.default, { multi: true, simpleValue: true, value: this.state.FluorescenceValue,
	                    placeholder: 'Select your Fluorescence',
	                    options: dataDropDowntFluorescence,
	                    onChange: this.handleFluorescenceSelectChange })
	                )
	              ),
	              _react2.default.createElement(
	                'div',
	                { className: 'form-group' },
	                _react2.default.createElement(
	                  'label',
	                  { className: 'col-sm-4 control-label' },
	                  'Origin'
	                ),
	                _react2.default.createElement(
	                  'div',
	                  { className: 'col-sm-7' },
	                  _react2.default.createElement(_reactSelect2.default, { multi: true, simpleValue: true, value: this.state.OriginValue,
	                    placeholder: 'Select your Origin',
	                    options: dataDropDowntOrigin,
	                    onChange: this.handleOriginSelectChange })
	                )
	              )
	            )
	          ),
	          _react2.default.createElement(
	            'div',
	            { className: 'col-sm-12 text-center' },
	            _react2.default.createElement(
	              'button',
	              { type: 'submit', className: 'btn btn-primary btn-radius' },
	              'Search'
	            ),
	            _react2.default.createElement(
	              'button',
	              { type: 'button', className: 'btn btn-primary btn-radius', disabled: submitting, onClick: resetForm },
	              _react2.default.createElement('i', null),
	              ' Reset'
	            )
	          )
	        )
	      );
	    }
	  }]);

	  return InventoryStoneFilter;
	}(_react.Component);

	function mapStateToProps(state) {
	  // console.log('state.users.options-->',state.users.options);
	  return {
	    options: state.users.options
	  };
	}
	function mapDispatchToProps(dispatch) {
	  return {
	    optionsActions: (0, _redux.bindActionCreators)(Object.assign({}, masterDataActions), dispatch)
	  };
	}
	InventoryStoneFilter.propTypes = {
	  stonetype: _react.PropTypes.object.isRequired,
	  cut: _react.PropTypes.object.isRequired,
	  stoneProductHierarchy: _react.PropTypes.object.isRequired,
	  lotnumber: _react.PropTypes.object.isRequired,
	  cutShape: _react.PropTypes.object.isRequired,
	  cutGrade: _react.PropTypes.object.isRequired,
	  color: _react.PropTypes.object.isRequired,
	  colorGrade: _react.PropTypes.object.isRequired,
	  clarity: _react.PropTypes.object.isRequired,
	  lotQuantityFrom: _react.PropTypes.object.isRequired,
	  lotQuantityTo: _react.PropTypes.object.isRequired,
	  totalCaratWeightFrom: _react.PropTypes.object.isRequired,
	  totalCaratWeightTo: _react.PropTypes.object.isRequired,
	  totalCostFrom: _react.PropTypes.object.isRequired,
	  totalCostTo: _react.PropTypes.object.isRequired,
	  totalUpdatedCostFrom: _react.PropTypes.object.isRequired,
	  totalUpdatedCostTo: _react.PropTypes.object.isRequired,
	  publicPriceFrom: _react.PropTypes.object.isRequired,
	  publicPriceTo: _react.PropTypes.object.isRequired,
	  markupFrom: _react.PropTypes.object.isRequired,
	  markupTo: _react.PropTypes.object.isRequired,
	  certificateNumber: _react.PropTypes.object.isRequired,
	  certificateLab: _react.PropTypes.object.isRequired,
	  cerDateFrom: _react.PropTypes.object.isRequired,
	  cerDateTo: _react.PropTypes.object.isRequired,
	  polish: _react.PropTypes.object.isRequired,
	  symmetry: _react.PropTypes.object.isRequired,
	  treatment: _react.PropTypes.object.isRequired,
	  fluorescence: _react.PropTypes.object.isRequired,
	  origin: _react.PropTypes.object.isRequired
	};
	module.exports = (0, _reduxForm.reduxForm)({
	  form: 'StoneFilter',
	  fields: []
	}, mapStateToProps, mapDispatchToProps)(InventoryStoneFilter);

/***/ },

/***/ 960:
/***/ function(module, exports, __webpack_require__) {

	"use strict"

	var React = __webpack_require__(1)

	var div = React.createElement.bind(null, 'div')
	var button = React.createElement.bind(null, 'button')
	var a = React.createElement.bind(null, 'a')
	var select = React.createElement.bind(null, 'select')
	var option = React.createElement.bind(null ,'option')
	var label = React.createElement.bind(null, 'label')

	var idInc = 0

	var keyHandlers = {
	  38: 'handleUpKey',
	  40: 'handleDownKey',
	  32: 'handleSpaceKey',
	  13: 'handleEnterKey',
	  27: 'handleEscKey',
	  74: 'handleDownKey',
	  75: 'handleUpKey'
	}

	function interceptEvent(event) {
	  if (event) {
	    event.preventDefault()
	    event.stopPropagation()
	  }
	}

	module.exports = React.createClass({displayName: 'exports',
	  getInitialState: function () {
	    return {
	      id: 'react-select-box-' + (++idInc),
	      open: false,
	      focusedIndex: -1,
	      pendingValue: []
	    }
	  },

	  getDefaultProps: function () {
	    return {
	      closeText: 'Close',
	      clearText: 'Remove selection'
	    }
	  },

	  changeOnClose: function () {
	    return this.isMultiple() && String(this.props.changeOnClose) === 'true'
	  },

	  updatePendingValue: function (value, cb) {
	    if (this.changeOnClose()) {
	      this.setState({pendingValue: value}, cb)
	      return true
	    }
	    return false
	  },

	  componentWillMount: function () {
	    this.updatePendingValue(this.props.value)
	  },

	  componentWillReceiveProps: function (next) {
	    this.updatePendingValue(next.value)
	  },

	  clickingOption: false,

	  blurTimeout: null,

	  handleFocus: function () {
	    clearTimeout(this.blurTimeout)
	  },

	  handleBlur: function () {
	    clearTimeout(this.blurTimeout)
	    this.blurTimeout = setTimeout(this.handleClose, 0)
	  },

	  handleMouseDown: function() {
	    this.clickingOption = true
	  },

	  handleChange: function (val, cb) {
	    return function (event) {
	      this.clickingOption = false
	      interceptEvent(event)
	      if (this.isMultiple()) {
	        var selected = []
	        if (val != null) {
	          selected = this.value().slice(0)
	          var index = selected.indexOf(val)
	          if (index !== -1) {
	            selected.splice(index, 1)
	          } else {
	            selected.push(val)
	          }
	        }
	        this.updatePendingValue(selected, cb) || this.props.onChange(selected)
	      } else {
	        this.updatePendingValue(val, cb) || this.props.onChange(val)
	        this.handleClose()
	        this.refs.button.getDOMNode().focus()
	      }
	    }.bind(this)
	  },

	  handleNativeChange: function (event) {
	    var val = event.target.value
	    if (this.isMultiple()) {
	      var children = [].slice.call(event.target.childNodes, 0)
	      val = children.reduce(function (memo, child) {
	        if (child.selected) {
	          memo.push(child.value)
	        }
	        return memo
	      }, [])
	    }
	    this.props.onChange(val)
	  },

	  handleClear: function (event) {
	    interceptEvent(event)
	    this.handleChange(null, function () {
	      // only called when change="true"
	      this.props.onChange(this.state.pendingValue)
	    })(event)
	  },

	  toggleOpenClose: function (event) {
	    interceptEvent(event)
	    this.setState({open: !this.state.open});
	    if(this.state.open) {
	      return this.setState({open: false})
	    }

	    this.handleOpen()
	  },

	  handleOpen: function (event) {
	    interceptEvent(event)
	    this.setState({open: true}, function () {
	      this.refs.menu.getDOMNode().focus()
	    })
	  },

	  handleClose: function (event) {
	    interceptEvent(event)
	    if(!this.clickingOption) {
	      this.setState({open: false, focusedIndex: -1})
	    }
	    if (this.changeOnClose()) {
	      this.props.onChange(this.state.pendingValue)
	    }
	  },


	  moveFocus: function (move) {
	    var len = React.Children.count(this.props.children)
	    var idx = (this.state.focusedIndex + move + len) % len
	    this.setState({focusedIndex: idx})
	  },

	  handleKeyDown: function (event) {
	    if (keyHandlers[event.which]) {
	      this[keyHandlers[event.which]](event)
	    }
	  },

	  handleUpKey: function (event) {
	    interceptEvent(event)
	    this.moveFocus(-1)
	  },

	  handleDownKey: function (event) {
	    interceptEvent(event)
	    if (!this.state.open) {
	      this.handleOpen(event)
	    }
	    this.moveFocus(1)
	  },

	  handleSpaceKey: function (event) {
	    interceptEvent(event)
	    if (!this.state.open) {
	      this.handleOpen(event)
	    } else if (this.state.focusedIndex !== -1) {
	      this.handleEnterKey()
	    }
	  },

	  handleEnterKey: function (event) {
	    if (this.state.focusedIndex !== -1) {
	      this.handleChange(this.options()[this.state.focusedIndex].value)(event)
	    }
	  },

	  handleEscKey: function (event) {
	    if (this.state.open) {
	      this.handleClose(event)
	    } else {
	      this.handleClear(event)
	    }
	  },

	  label: function () {
	    var selected = this.options()
	      .filter(function (option) {
	        return this.isSelected(option.value)
	      }.bind(this))
	      .map(function (option) {
	        return option.label
	      })
	    return selected.length > 0 ? selected.join(', ') : this.props.label
	  },

	  isMultiple: function () {
	    return String(this.props.multiple) === 'true'
	  },

	  options: function () {
	    var options = []
	    React.Children.forEach(this.props.children, function (option) {
	      options.push({
	        value: option.props.value,
	        label: option.props.children
	      })
	    })
	    return options
	  },

	  value: function () {
	    var value = this.changeOnClose() ?
	      this.state.pendingValue :
	      this.props.value

	    if (!this.isMultiple() || Array.isArray(value)) {
	      return value
	    } if (value != null) {
	      return [value]
	    }
	    return []
	  },

	  hasValue: function () {
	    if (this.isMultiple()) {
	      return this.value().length > 0
	    }
	    return this.value() != null
	  },

	  isSelected: function (value) {
	    if (this.isMultiple()) {
	      return this.value().indexOf(value) !== -1
	    }
	    return this.value() === value
	  },

	  render: function () {
	    var className = 'react-select-box-container'
	    if (this.props.className) {
	      className += ' ' + this.props.className
	    }
	    if (this.isMultiple()) {
	      className += ' react-select-box-multi'
	    }
	    if (!this.hasValue()) {
	      className += ' react-select-box-empty'
	    }
	    return (
	      div(
	        {
	          onKeyDown: this.handleKeyDown,
	          className: className
	        },
	        button(
	          {
	            id: this.state.id,
	            ref: 'button',
	            className: 'react-select-box',
	            onClick: this.toggleOpenClose,
	            onBlur: this.handleBlur,
	            tabIndex: '0',
	            'aria-hidden': true
	          },
	          div({className: 'react-select-box-label'}, this.label())
	        ),
	        this.renderOptionMenu(),
	        this.renderClearButton(),
	        this.renderNativeSelect()
	      )
	    )
	  },

	  renderNativeSelect: function () {
	    var id = this.state.id + '-native-select'
	    var multiple = this.isMultiple()
	    var empty = multiple ? null : option({key: '', value: ''}, 'No Selection')
	    var options = [empty].concat(this.props.children)
	    return div(
	      {className: 'react-select-box-native'},
	      label({htmlFor: id}, this.props.label),
	      select({
	        id: id,
	        multiple: multiple,
	        onKeyDown: function (e) { e.stopPropagation() },
	        value: this.props.value || (multiple ? [] : ''),
	        onChange: this.handleNativeChange
	      }, options)
	    )

	  },

	  renderOptionMenu: function () {
	    var className = 'react-select-box-options'
	    if (!this.state.open) {
	      className += ' react-select-box-hidden'
	    }
	    /*
	    var active = null
	    if (this.state.focusedIndex !== -1) {
	      active = this.state.id + '-' + this.state.focusedIndex
	    }
	    */
	    return div(
	      {
	        className: className,
	        onBlur: this.handleBlur,
	        onFocus: this.handleFocus,
	        'aria-hidden': true,
	        ref: 'menu',
	        tabIndex: 0
	      },
	      div(
	        {
	          className: 'react-select-box-off-screen'
	        },
	        this.options().map(this.renderOption)
	      ),
	      this.renderCloseButton()
	    )
	  },

	  renderOption: function (option, i) {
	    var className = 'react-select-box-option'
	    if (i === this.state.focusedIndex) {
	      className += ' react-select-box-option-focused'
	    }
	    if (this.isSelected(option.value)) {
	      className += ' react-select-box-option-selected'
	    }
	    return a(
	      {
	        id: this.state.id + '-' + i,
	        href: '#',
	        onClick: this.handleChange(option.value),
	        onMouseDown: this.handleMouseDown,
	        className: className,
	        tabIndex: -1,
	        key: option.value,
	        onBlur: this.handleBlur,
	        onFocus: this.handleFocus
	      },
	      option.label
	    )
	  },

	  renderClearButton: function () {
	    if (this.hasValue()) {
	      return button({
	        'aria-label': this.props.clearText,
	        className: 'react-select-box-clear',
	        onClick: this.handleClear
	      })
	    }
	  },

	  renderCloseButton: function () {
	    if (this.isMultiple() && this.props.closeText) {
	      return button(
	        {
	          onClick: this.handleClose,
	          className: 'react-select-box-close',
	          onBlur: this.handleBlur,
	          onFocus: this.handleFocus
	        },
	        this.props.closeText
	      )
	    }
	  }
	})


/***/ },

/***/ 961:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = TransformOptions;

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _underscore = __webpack_require__(962);

	var _underscore2 = _interopRequireDefault(_underscore);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function TransformOptions(options) {
	  // console.log('options-->',options);
	  var option = function option(value, label, render) {
	    var disabled = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];

	    return { value: value, label: label, render: render, disabled: disabled };
	  };
	  var transformOptions = function transformOptions(options) {
	    return _underscore2.default.reduce(options, function (res, el) {
	      var parent = option(el.text, el.text, _react2.default.createElement(
	        'strong',
	        null,
	        el.text
	      ), true);
	      var children = _underscore2.default.map(el.children, function (child) {
	        return _underscore2.default.assign({}, option(child.id, child.text, _react2.default.createElement(
	          'span',
	          { style: { paddingLeft: 10 } },
	          child.text
	        )), { parent: el.text });
	      });

	      return res.concat(parent).concat(children);
	    }, []);
	  };

	  return transformOptions(options);
	}

/***/ },

/***/ 962:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;//     Underscore.js 1.8.3
	//     http://underscorejs.org
	//     (c) 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	//     Underscore may be freely distributed under the MIT license.

	(function() {

	  // Baseline setup
	  // --------------

	  // Establish the root object, `window` in the browser, or `exports` on the server.
	  var root = this;

	  // Save the previous value of the `_` variable.
	  var previousUnderscore = root._;

	  // Save bytes in the minified (but not gzipped) version:
	  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

	  // Create quick reference variables for speed access to core prototypes.
	  var
	    push             = ArrayProto.push,
	    slice            = ArrayProto.slice,
	    toString         = ObjProto.toString,
	    hasOwnProperty   = ObjProto.hasOwnProperty;

	  // All **ECMAScript 5** native function implementations that we hope to use
	  // are declared here.
	  var
	    nativeIsArray      = Array.isArray,
	    nativeKeys         = Object.keys,
	    nativeBind         = FuncProto.bind,
	    nativeCreate       = Object.create;

	  // Naked function reference for surrogate-prototype-swapping.
	  var Ctor = function(){};

	  // Create a safe reference to the Underscore object for use below.
	  var _ = function(obj) {
	    if (obj instanceof _) return obj;
	    if (!(this instanceof _)) return new _(obj);
	    this._wrapped = obj;
	  };

	  // Export the Underscore object for **Node.js**, with
	  // backwards-compatibility for the old `require()` API. If we're in
	  // the browser, add `_` as a global object.
	  if (true) {
	    if (typeof module !== 'undefined' && module.exports) {
	      exports = module.exports = _;
	    }
	    exports._ = _;
	  } else {
	    root._ = _;
	  }

	  // Current version.
	  _.VERSION = '1.8.3';

	  // Internal function that returns an efficient (for current engines) version
	  // of the passed-in callback, to be repeatedly applied in other Underscore
	  // functions.
	  var optimizeCb = function(func, context, argCount) {
	    if (context === void 0) return func;
	    switch (argCount == null ? 3 : argCount) {
	      case 1: return function(value) {
	        return func.call(context, value);
	      };
	      case 2: return function(value, other) {
	        return func.call(context, value, other);
	      };
	      case 3: return function(value, index, collection) {
	        return func.call(context, value, index, collection);
	      };
	      case 4: return function(accumulator, value, index, collection) {
	        return func.call(context, accumulator, value, index, collection);
	      };
	    }
	    return function() {
	      return func.apply(context, arguments);
	    };
	  };

	  // A mostly-internal function to generate callbacks that can be applied
	  // to each element in a collection, returning the desired result — either
	  // identity, an arbitrary callback, a property matcher, or a property accessor.
	  var cb = function(value, context, argCount) {
	    if (value == null) return _.identity;
	    if (_.isFunction(value)) return optimizeCb(value, context, argCount);
	    if (_.isObject(value)) return _.matcher(value);
	    return _.property(value);
	  };
	  _.iteratee = function(value, context) {
	    return cb(value, context, Infinity);
	  };

	  // An internal function for creating assigner functions.
	  var createAssigner = function(keysFunc, undefinedOnly) {
	    return function(obj) {
	      var length = arguments.length;
	      if (length < 2 || obj == null) return obj;
	      for (var index = 1; index < length; index++) {
	        var source = arguments[index],
	            keys = keysFunc(source),
	            l = keys.length;
	        for (var i = 0; i < l; i++) {
	          var key = keys[i];
	          if (!undefinedOnly || obj[key] === void 0) obj[key] = source[key];
	        }
	      }
	      return obj;
	    };
	  };

	  // An internal function for creating a new object that inherits from another.
	  var baseCreate = function(prototype) {
	    if (!_.isObject(prototype)) return {};
	    if (nativeCreate) return nativeCreate(prototype);
	    Ctor.prototype = prototype;
	    var result = new Ctor;
	    Ctor.prototype = null;
	    return result;
	  };

	  var property = function(key) {
	    return function(obj) {
	      return obj == null ? void 0 : obj[key];
	    };
	  };

	  // Helper for collection methods to determine whether a collection
	  // should be iterated as an array or as an object
	  // Related: http://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength
	  // Avoids a very nasty iOS 8 JIT bug on ARM-64. #2094
	  var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
	  var getLength = property('length');
	  var isArrayLike = function(collection) {
	    var length = getLength(collection);
	    return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
	  };

	  // Collection Functions
	  // --------------------

	  // The cornerstone, an `each` implementation, aka `forEach`.
	  // Handles raw objects in addition to array-likes. Treats all
	  // sparse array-likes as if they were dense.
	  _.each = _.forEach = function(obj, iteratee, context) {
	    iteratee = optimizeCb(iteratee, context);
	    var i, length;
	    if (isArrayLike(obj)) {
	      for (i = 0, length = obj.length; i < length; i++) {
	        iteratee(obj[i], i, obj);
	      }
	    } else {
	      var keys = _.keys(obj);
	      for (i = 0, length = keys.length; i < length; i++) {
	        iteratee(obj[keys[i]], keys[i], obj);
	      }
	    }
	    return obj;
	  };

	  // Return the results of applying the iteratee to each element.
	  _.map = _.collect = function(obj, iteratee, context) {
	    iteratee = cb(iteratee, context);
	    var keys = !isArrayLike(obj) && _.keys(obj),
	        length = (keys || obj).length,
	        results = Array(length);
	    for (var index = 0; index < length; index++) {
	      var currentKey = keys ? keys[index] : index;
	      results[index] = iteratee(obj[currentKey], currentKey, obj);
	    }
	    return results;
	  };

	  // Create a reducing function iterating left or right.
	  function createReduce(dir) {
	    // Optimized iterator function as using arguments.length
	    // in the main function will deoptimize the, see #1991.
	    function iterator(obj, iteratee, memo, keys, index, length) {
	      for (; index >= 0 && index < length; index += dir) {
	        var currentKey = keys ? keys[index] : index;
	        memo = iteratee(memo, obj[currentKey], currentKey, obj);
	      }
	      return memo;
	    }

	    return function(obj, iteratee, memo, context) {
	      iteratee = optimizeCb(iteratee, context, 4);
	      var keys = !isArrayLike(obj) && _.keys(obj),
	          length = (keys || obj).length,
	          index = dir > 0 ? 0 : length - 1;
	      // Determine the initial value if none is provided.
	      if (arguments.length < 3) {
	        memo = obj[keys ? keys[index] : index];
	        index += dir;
	      }
	      return iterator(obj, iteratee, memo, keys, index, length);
	    };
	  }

	  // **Reduce** builds up a single result from a list of values, aka `inject`,
	  // or `foldl`.
	  _.reduce = _.foldl = _.inject = createReduce(1);

	  // The right-associative version of reduce, also known as `foldr`.
	  _.reduceRight = _.foldr = createReduce(-1);

	  // Return the first value which passes a truth test. Aliased as `detect`.
	  _.find = _.detect = function(obj, predicate, context) {
	    var key;
	    if (isArrayLike(obj)) {
	      key = _.findIndex(obj, predicate, context);
	    } else {
	      key = _.findKey(obj, predicate, context);
	    }
	    if (key !== void 0 && key !== -1) return obj[key];
	  };

	  // Return all the elements that pass a truth test.
	  // Aliased as `select`.
	  _.filter = _.select = function(obj, predicate, context) {
	    var results = [];
	    predicate = cb(predicate, context);
	    _.each(obj, function(value, index, list) {
	      if (predicate(value, index, list)) results.push(value);
	    });
	    return results;
	  };

	  // Return all the elements for which a truth test fails.
	  _.reject = function(obj, predicate, context) {
	    return _.filter(obj, _.negate(cb(predicate)), context);
	  };

	  // Determine whether all of the elements match a truth test.
	  // Aliased as `all`.
	  _.every = _.all = function(obj, predicate, context) {
	    predicate = cb(predicate, context);
	    var keys = !isArrayLike(obj) && _.keys(obj),
	        length = (keys || obj).length;
	    for (var index = 0; index < length; index++) {
	      var currentKey = keys ? keys[index] : index;
	      if (!predicate(obj[currentKey], currentKey, obj)) return false;
	    }
	    return true;
	  };

	  // Determine if at least one element in the object matches a truth test.
	  // Aliased as `any`.
	  _.some = _.any = function(obj, predicate, context) {
	    predicate = cb(predicate, context);
	    var keys = !isArrayLike(obj) && _.keys(obj),
	        length = (keys || obj).length;
	    for (var index = 0; index < length; index++) {
	      var currentKey = keys ? keys[index] : index;
	      if (predicate(obj[currentKey], currentKey, obj)) return true;
	    }
	    return false;
	  };

	  // Determine if the array or object contains a given item (using `===`).
	  // Aliased as `includes` and `include`.
	  _.contains = _.includes = _.include = function(obj, item, fromIndex, guard) {
	    if (!isArrayLike(obj)) obj = _.values(obj);
	    if (typeof fromIndex != 'number' || guard) fromIndex = 0;
	    return _.indexOf(obj, item, fromIndex) >= 0;
	  };

	  // Invoke a method (with arguments) on every item in a collection.
	  _.invoke = function(obj, method) {
	    var args = slice.call(arguments, 2);
	    var isFunc = _.isFunction(method);
	    return _.map(obj, function(value) {
	      var func = isFunc ? method : value[method];
	      return func == null ? func : func.apply(value, args);
	    });
	  };

	  // Convenience version of a common use case of `map`: fetching a property.
	  _.pluck = function(obj, key) {
	    return _.map(obj, _.property(key));
	  };

	  // Convenience version of a common use case of `filter`: selecting only objects
	  // containing specific `key:value` pairs.
	  _.where = function(obj, attrs) {
	    return _.filter(obj, _.matcher(attrs));
	  };

	  // Convenience version of a common use case of `find`: getting the first object
	  // containing specific `key:value` pairs.
	  _.findWhere = function(obj, attrs) {
	    return _.find(obj, _.matcher(attrs));
	  };

	  // Return the maximum element (or element-based computation).
	  _.max = function(obj, iteratee, context) {
	    var result = -Infinity, lastComputed = -Infinity,
	        value, computed;
	    if (iteratee == null && obj != null) {
	      obj = isArrayLike(obj) ? obj : _.values(obj);
	      for (var i = 0, length = obj.length; i < length; i++) {
	        value = obj[i];
	        if (value > result) {
	          result = value;
	        }
	      }
	    } else {
	      iteratee = cb(iteratee, context);
	      _.each(obj, function(value, index, list) {
	        computed = iteratee(value, index, list);
	        if (computed > lastComputed || computed === -Infinity && result === -Infinity) {
	          result = value;
	          lastComputed = computed;
	        }
	      });
	    }
	    return result;
	  };

	  // Return the minimum element (or element-based computation).
	  _.min = function(obj, iteratee, context) {
	    var result = Infinity, lastComputed = Infinity,
	        value, computed;
	    if (iteratee == null && obj != null) {
	      obj = isArrayLike(obj) ? obj : _.values(obj);
	      for (var i = 0, length = obj.length; i < length; i++) {
	        value = obj[i];
	        if (value < result) {
	          result = value;
	        }
	      }
	    } else {
	      iteratee = cb(iteratee, context);
	      _.each(obj, function(value, index, list) {
	        computed = iteratee(value, index, list);
	        if (computed < lastComputed || computed === Infinity && result === Infinity) {
	          result = value;
	          lastComputed = computed;
	        }
	      });
	    }
	    return result;
	  };

	  // Shuffle a collection, using the modern version of the
	  // [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
	  _.shuffle = function(obj) {
	    var set = isArrayLike(obj) ? obj : _.values(obj);
	    var length = set.length;
	    var shuffled = Array(length);
	    for (var index = 0, rand; index < length; index++) {
	      rand = _.random(0, index);
	      if (rand !== index) shuffled[index] = shuffled[rand];
	      shuffled[rand] = set[index];
	    }
	    return shuffled;
	  };

	  // Sample **n** random values from a collection.
	  // If **n** is not specified, returns a single random element.
	  // The internal `guard` argument allows it to work with `map`.
	  _.sample = function(obj, n, guard) {
	    if (n == null || guard) {
	      if (!isArrayLike(obj)) obj = _.values(obj);
	      return obj[_.random(obj.length - 1)];
	    }
	    return _.shuffle(obj).slice(0, Math.max(0, n));
	  };

	  // Sort the object's values by a criterion produced by an iteratee.
	  _.sortBy = function(obj, iteratee, context) {
	    iteratee = cb(iteratee, context);
	    return _.pluck(_.map(obj, function(value, index, list) {
	      return {
	        value: value,
	        index: index,
	        criteria: iteratee(value, index, list)
	      };
	    }).sort(function(left, right) {
	      var a = left.criteria;
	      var b = right.criteria;
	      if (a !== b) {
	        if (a > b || a === void 0) return 1;
	        if (a < b || b === void 0) return -1;
	      }
	      return left.index - right.index;
	    }), 'value');
	  };

	  // An internal function used for aggregate "group by" operations.
	  var group = function(behavior) {
	    return function(obj, iteratee, context) {
	      var result = {};
	      iteratee = cb(iteratee, context);
	      _.each(obj, function(value, index) {
	        var key = iteratee(value, index, obj);
	        behavior(result, value, key);
	      });
	      return result;
	    };
	  };

	  // Groups the object's values by a criterion. Pass either a string attribute
	  // to group by, or a function that returns the criterion.
	  _.groupBy = group(function(result, value, key) {
	    if (_.has(result, key)) result[key].push(value); else result[key] = [value];
	  });

	  // Indexes the object's values by a criterion, similar to `groupBy`, but for
	  // when you know that your index values will be unique.
	  _.indexBy = group(function(result, value, key) {
	    result[key] = value;
	  });

	  // Counts instances of an object that group by a certain criterion. Pass
	  // either a string attribute to count by, or a function that returns the
	  // criterion.
	  _.countBy = group(function(result, value, key) {
	    if (_.has(result, key)) result[key]++; else result[key] = 1;
	  });

	  // Safely create a real, live array from anything iterable.
	  _.toArray = function(obj) {
	    if (!obj) return [];
	    if (_.isArray(obj)) return slice.call(obj);
	    if (isArrayLike(obj)) return _.map(obj, _.identity);
	    return _.values(obj);
	  };

	  // Return the number of elements in an object.
	  _.size = function(obj) {
	    if (obj == null) return 0;
	    return isArrayLike(obj) ? obj.length : _.keys(obj).length;
	  };

	  // Split a collection into two arrays: one whose elements all satisfy the given
	  // predicate, and one whose elements all do not satisfy the predicate.
	  _.partition = function(obj, predicate, context) {
	    predicate = cb(predicate, context);
	    var pass = [], fail = [];
	    _.each(obj, function(value, key, obj) {
	      (predicate(value, key, obj) ? pass : fail).push(value);
	    });
	    return [pass, fail];
	  };

	  // Array Functions
	  // ---------------

	  // Get the first element of an array. Passing **n** will return the first N
	  // values in the array. Aliased as `head` and `take`. The **guard** check
	  // allows it to work with `_.map`.
	  _.first = _.head = _.take = function(array, n, guard) {
	    if (array == null) return void 0;
	    if (n == null || guard) return array[0];
	    return _.initial(array, array.length - n);
	  };

	  // Returns everything but the last entry of the array. Especially useful on
	  // the arguments object. Passing **n** will return all the values in
	  // the array, excluding the last N.
	  _.initial = function(array, n, guard) {
	    return slice.call(array, 0, Math.max(0, array.length - (n == null || guard ? 1 : n)));
	  };

	  // Get the last element of an array. Passing **n** will return the last N
	  // values in the array.
	  _.last = function(array, n, guard) {
	    if (array == null) return void 0;
	    if (n == null || guard) return array[array.length - 1];
	    return _.rest(array, Math.max(0, array.length - n));
	  };

	  // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
	  // Especially useful on the arguments object. Passing an **n** will return
	  // the rest N values in the array.
	  _.rest = _.tail = _.drop = function(array, n, guard) {
	    return slice.call(array, n == null || guard ? 1 : n);
	  };

	  // Trim out all falsy values from an array.
	  _.compact = function(array) {
	    return _.filter(array, _.identity);
	  };

	  // Internal implementation of a recursive `flatten` function.
	  var flatten = function(input, shallow, strict, startIndex) {
	    var output = [], idx = 0;
	    for (var i = startIndex || 0, length = getLength(input); i < length; i++) {
	      var value = input[i];
	      if (isArrayLike(value) && (_.isArray(value) || _.isArguments(value))) {
	        //flatten current level of array or arguments object
	        if (!shallow) value = flatten(value, shallow, strict);
	        var j = 0, len = value.length;
	        output.length += len;
	        while (j < len) {
	          output[idx++] = value[j++];
	        }
	      } else if (!strict) {
	        output[idx++] = value;
	      }
	    }
	    return output;
	  };

	  // Flatten out an array, either recursively (by default), or just one level.
	  _.flatten = function(array, shallow) {
	    return flatten(array, shallow, false);
	  };

	  // Return a version of the array that does not contain the specified value(s).
	  _.without = function(array) {
	    return _.difference(array, slice.call(arguments, 1));
	  };

	  // Produce a duplicate-free version of the array. If the array has already
	  // been sorted, you have the option of using a faster algorithm.
	  // Aliased as `unique`.
	  _.uniq = _.unique = function(array, isSorted, iteratee, context) {
	    if (!_.isBoolean(isSorted)) {
	      context = iteratee;
	      iteratee = isSorted;
	      isSorted = false;
	    }
	    if (iteratee != null) iteratee = cb(iteratee, context);
	    var result = [];
	    var seen = [];
	    for (var i = 0, length = getLength(array); i < length; i++) {
	      var value = array[i],
	          computed = iteratee ? iteratee(value, i, array) : value;
	      if (isSorted) {
	        if (!i || seen !== computed) result.push(value);
	        seen = computed;
	      } else if (iteratee) {
	        if (!_.contains(seen, computed)) {
	          seen.push(computed);
	          result.push(value);
	        }
	      } else if (!_.contains(result, value)) {
	        result.push(value);
	      }
	    }
	    return result;
	  };

	  // Produce an array that contains the union: each distinct element from all of
	  // the passed-in arrays.
	  _.union = function() {
	    return _.uniq(flatten(arguments, true, true));
	  };

	  // Produce an array that contains every item shared between all the
	  // passed-in arrays.
	  _.intersection = function(array) {
	    var result = [];
	    var argsLength = arguments.length;
	    for (var i = 0, length = getLength(array); i < length; i++) {
	      var item = array[i];
	      if (_.contains(result, item)) continue;
	      for (var j = 1; j < argsLength; j++) {
	        if (!_.contains(arguments[j], item)) break;
	      }
	      if (j === argsLength) result.push(item);
	    }
	    return result;
	  };

	  // Take the difference between one array and a number of other arrays.
	  // Only the elements present in just the first array will remain.
	  _.difference = function(array) {
	    var rest = flatten(arguments, true, true, 1);
	    return _.filter(array, function(value){
	      return !_.contains(rest, value);
	    });
	  };

	  // Zip together multiple lists into a single array -- elements that share
	  // an index go together.
	  _.zip = function() {
	    return _.unzip(arguments);
	  };

	  // Complement of _.zip. Unzip accepts an array of arrays and groups
	  // each array's elements on shared indices
	  _.unzip = function(array) {
	    var length = array && _.max(array, getLength).length || 0;
	    var result = Array(length);

	    for (var index = 0; index < length; index++) {
	      result[index] = _.pluck(array, index);
	    }
	    return result;
	  };

	  // Converts lists into objects. Pass either a single array of `[key, value]`
	  // pairs, or two parallel arrays of the same length -- one of keys, and one of
	  // the corresponding values.
	  _.object = function(list, values) {
	    var result = {};
	    for (var i = 0, length = getLength(list); i < length; i++) {
	      if (values) {
	        result[list[i]] = values[i];
	      } else {
	        result[list[i][0]] = list[i][1];
	      }
	    }
	    return result;
	  };

	  // Generator function to create the findIndex and findLastIndex functions
	  function createPredicateIndexFinder(dir) {
	    return function(array, predicate, context) {
	      predicate = cb(predicate, context);
	      var length = getLength(array);
	      var index = dir > 0 ? 0 : length - 1;
	      for (; index >= 0 && index < length; index += dir) {
	        if (predicate(array[index], index, array)) return index;
	      }
	      return -1;
	    };
	  }

	  // Returns the first index on an array-like that passes a predicate test
	  _.findIndex = createPredicateIndexFinder(1);
	  _.findLastIndex = createPredicateIndexFinder(-1);

	  // Use a comparator function to figure out the smallest index at which
	  // an object should be inserted so as to maintain order. Uses binary search.
	  _.sortedIndex = function(array, obj, iteratee, context) {
	    iteratee = cb(iteratee, context, 1);
	    var value = iteratee(obj);
	    var low = 0, high = getLength(array);
	    while (low < high) {
	      var mid = Math.floor((low + high) / 2);
	      if (iteratee(array[mid]) < value) low = mid + 1; else high = mid;
	    }
	    return low;
	  };

	  // Generator function to create the indexOf and lastIndexOf functions
	  function createIndexFinder(dir, predicateFind, sortedIndex) {
	    return function(array, item, idx) {
	      var i = 0, length = getLength(array);
	      if (typeof idx == 'number') {
	        if (dir > 0) {
	            i = idx >= 0 ? idx : Math.max(idx + length, i);
	        } else {
	            length = idx >= 0 ? Math.min(idx + 1, length) : idx + length + 1;
	        }
	      } else if (sortedIndex && idx && length) {
	        idx = sortedIndex(array, item);
	        return array[idx] === item ? idx : -1;
	      }
	      if (item !== item) {
	        idx = predicateFind(slice.call(array, i, length), _.isNaN);
	        return idx >= 0 ? idx + i : -1;
	      }
	      for (idx = dir > 0 ? i : length - 1; idx >= 0 && idx < length; idx += dir) {
	        if (array[idx] === item) return idx;
	      }
	      return -1;
	    };
	  }

	  // Return the position of the first occurrence of an item in an array,
	  // or -1 if the item is not included in the array.
	  // If the array is large and already in sort order, pass `true`
	  // for **isSorted** to use binary search.
	  _.indexOf = createIndexFinder(1, _.findIndex, _.sortedIndex);
	  _.lastIndexOf = createIndexFinder(-1, _.findLastIndex);

	  // Generate an integer Array containing an arithmetic progression. A port of
	  // the native Python `range()` function. See
	  // [the Python documentation](http://docs.python.org/library/functions.html#range).
	  _.range = function(start, stop, step) {
	    if (stop == null) {
	      stop = start || 0;
	      start = 0;
	    }
	    step = step || 1;

	    var length = Math.max(Math.ceil((stop - start) / step), 0);
	    var range = Array(length);

	    for (var idx = 0; idx < length; idx++, start += step) {
	      range[idx] = start;
	    }

	    return range;
	  };

	  // Function (ahem) Functions
	  // ------------------

	  // Determines whether to execute a function as a constructor
	  // or a normal function with the provided arguments
	  var executeBound = function(sourceFunc, boundFunc, context, callingContext, args) {
	    if (!(callingContext instanceof boundFunc)) return sourceFunc.apply(context, args);
	    var self = baseCreate(sourceFunc.prototype);
	    var result = sourceFunc.apply(self, args);
	    if (_.isObject(result)) return result;
	    return self;
	  };

	  // Create a function bound to a given object (assigning `this`, and arguments,
	  // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
	  // available.
	  _.bind = function(func, context) {
	    if (nativeBind && func.bind === nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
	    if (!_.isFunction(func)) throw new TypeError('Bind must be called on a function');
	    var args = slice.call(arguments, 2);
	    var bound = function() {
	      return executeBound(func, bound, context, this, args.concat(slice.call(arguments)));
	    };
	    return bound;
	  };

	  // Partially apply a function by creating a version that has had some of its
	  // arguments pre-filled, without changing its dynamic `this` context. _ acts
	  // as a placeholder, allowing any combination of arguments to be pre-filled.
	  _.partial = function(func) {
	    var boundArgs = slice.call(arguments, 1);
	    var bound = function() {
	      var position = 0, length = boundArgs.length;
	      var args = Array(length);
	      for (var i = 0; i < length; i++) {
	        args[i] = boundArgs[i] === _ ? arguments[position++] : boundArgs[i];
	      }
	      while (position < arguments.length) args.push(arguments[position++]);
	      return executeBound(func, bound, this, this, args);
	    };
	    return bound;
	  };

	  // Bind a number of an object's methods to that object. Remaining arguments
	  // are the method names to be bound. Useful for ensuring that all callbacks
	  // defined on an object belong to it.
	  _.bindAll = function(obj) {
	    var i, length = arguments.length, key;
	    if (length <= 1) throw new Error('bindAll must be passed function names');
	    for (i = 1; i < length; i++) {
	      key = arguments[i];
	      obj[key] = _.bind(obj[key], obj);
	    }
	    return obj;
	  };

	  // Memoize an expensive function by storing its results.
	  _.memoize = function(func, hasher) {
	    var memoize = function(key) {
	      var cache = memoize.cache;
	      var address = '' + (hasher ? hasher.apply(this, arguments) : key);
	      if (!_.has(cache, address)) cache[address] = func.apply(this, arguments);
	      return cache[address];
	    };
	    memoize.cache = {};
	    return memoize;
	  };

	  // Delays a function for the given number of milliseconds, and then calls
	  // it with the arguments supplied.
	  _.delay = function(func, wait) {
	    var args = slice.call(arguments, 2);
	    return setTimeout(function(){
	      return func.apply(null, args);
	    }, wait);
	  };

	  // Defers a function, scheduling it to run after the current call stack has
	  // cleared.
	  _.defer = _.partial(_.delay, _, 1);

	  // Returns a function, that, when invoked, will only be triggered at most once
	  // during a given window of time. Normally, the throttled function will run
	  // as much as it can, without ever going more than once per `wait` duration;
	  // but if you'd like to disable the execution on the leading edge, pass
	  // `{leading: false}`. To disable execution on the trailing edge, ditto.
	  _.throttle = function(func, wait, options) {
	    var context, args, result;
	    var timeout = null;
	    var previous = 0;
	    if (!options) options = {};
	    var later = function() {
	      previous = options.leading === false ? 0 : _.now();
	      timeout = null;
	      result = func.apply(context, args);
	      if (!timeout) context = args = null;
	    };
	    return function() {
	      var now = _.now();
	      if (!previous && options.leading === false) previous = now;
	      var remaining = wait - (now - previous);
	      context = this;
	      args = arguments;
	      if (remaining <= 0 || remaining > wait) {
	        if (timeout) {
	          clearTimeout(timeout);
	          timeout = null;
	        }
	        previous = now;
	        result = func.apply(context, args);
	        if (!timeout) context = args = null;
	      } else if (!timeout && options.trailing !== false) {
	        timeout = setTimeout(later, remaining);
	      }
	      return result;
	    };
	  };

	  // Returns a function, that, as long as it continues to be invoked, will not
	  // be triggered. The function will be called after it stops being called for
	  // N milliseconds. If `immediate` is passed, trigger the function on the
	  // leading edge, instead of the trailing.
	  _.debounce = function(func, wait, immediate) {
	    var timeout, args, context, timestamp, result;

	    var later = function() {
	      var last = _.now() - timestamp;

	      if (last < wait && last >= 0) {
	        timeout = setTimeout(later, wait - last);
	      } else {
	        timeout = null;
	        if (!immediate) {
	          result = func.apply(context, args);
	          if (!timeout) context = args = null;
	        }
	      }
	    };

	    return function() {
	      context = this;
	      args = arguments;
	      timestamp = _.now();
	      var callNow = immediate && !timeout;
	      if (!timeout) timeout = setTimeout(later, wait);
	      if (callNow) {
	        result = func.apply(context, args);
	        context = args = null;
	      }

	      return result;
	    };
	  };

	  // Returns the first function passed as an argument to the second,
	  // allowing you to adjust arguments, run code before and after, and
	  // conditionally execute the original function.
	  _.wrap = function(func, wrapper) {
	    return _.partial(wrapper, func);
	  };

	  // Returns a negated version of the passed-in predicate.
	  _.negate = function(predicate) {
	    return function() {
	      return !predicate.apply(this, arguments);
	    };
	  };

	  // Returns a function that is the composition of a list of functions, each
	  // consuming the return value of the function that follows.
	  _.compose = function() {
	    var args = arguments;
	    var start = args.length - 1;
	    return function() {
	      var i = start;
	      var result = args[start].apply(this, arguments);
	      while (i--) result = args[i].call(this, result);
	      return result;
	    };
	  };

	  // Returns a function that will only be executed on and after the Nth call.
	  _.after = function(times, func) {
	    return function() {
	      if (--times < 1) {
	        return func.apply(this, arguments);
	      }
	    };
	  };

	  // Returns a function that will only be executed up to (but not including) the Nth call.
	  _.before = function(times, func) {
	    var memo;
	    return function() {
	      if (--times > 0) {
	        memo = func.apply(this, arguments);
	      }
	      if (times <= 1) func = null;
	      return memo;
	    };
	  };

	  // Returns a function that will be executed at most one time, no matter how
	  // often you call it. Useful for lazy initialization.
	  _.once = _.partial(_.before, 2);

	  // Object Functions
	  // ----------------

	  // Keys in IE < 9 that won't be iterated by `for key in ...` and thus missed.
	  var hasEnumBug = !{toString: null}.propertyIsEnumerable('toString');
	  var nonEnumerableProps = ['valueOf', 'isPrototypeOf', 'toString',
	                      'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString'];

	  function collectNonEnumProps(obj, keys) {
	    var nonEnumIdx = nonEnumerableProps.length;
	    var constructor = obj.constructor;
	    var proto = (_.isFunction(constructor) && constructor.prototype) || ObjProto;

	    // Constructor is a special case.
	    var prop = 'constructor';
	    if (_.has(obj, prop) && !_.contains(keys, prop)) keys.push(prop);

	    while (nonEnumIdx--) {
	      prop = nonEnumerableProps[nonEnumIdx];
	      if (prop in obj && obj[prop] !== proto[prop] && !_.contains(keys, prop)) {
	        keys.push(prop);
	      }
	    }
	  }

	  // Retrieve the names of an object's own properties.
	  // Delegates to **ECMAScript 5**'s native `Object.keys`
	  _.keys = function(obj) {
	    if (!_.isObject(obj)) return [];
	    if (nativeKeys) return nativeKeys(obj);
	    var keys = [];
	    for (var key in obj) if (_.has(obj, key)) keys.push(key);
	    // Ahem, IE < 9.
	    if (hasEnumBug) collectNonEnumProps(obj, keys);
	    return keys;
	  };

	  // Retrieve all the property names of an object.
	  _.allKeys = function(obj) {
	    if (!_.isObject(obj)) return [];
	    var keys = [];
	    for (var key in obj) keys.push(key);
	    // Ahem, IE < 9.
	    if (hasEnumBug) collectNonEnumProps(obj, keys);
	    return keys;
	  };

	  // Retrieve the values of an object's properties.
	  _.values = function(obj) {
	    var keys = _.keys(obj);
	    var length = keys.length;
	    var values = Array(length);
	    for (var i = 0; i < length; i++) {
	      values[i] = obj[keys[i]];
	    }
	    return values;
	  };

	  // Returns the results of applying the iteratee to each element of the object
	  // In contrast to _.map it returns an object
	  _.mapObject = function(obj, iteratee, context) {
	    iteratee = cb(iteratee, context);
	    var keys =  _.keys(obj),
	          length = keys.length,
	          results = {},
	          currentKey;
	      for (var index = 0; index < length; index++) {
	        currentKey = keys[index];
	        results[currentKey] = iteratee(obj[currentKey], currentKey, obj);
	      }
	      return results;
	  };

	  // Convert an object into a list of `[key, value]` pairs.
	  _.pairs = function(obj) {
	    var keys = _.keys(obj);
	    var length = keys.length;
	    var pairs = Array(length);
	    for (var i = 0; i < length; i++) {
	      pairs[i] = [keys[i], obj[keys[i]]];
	    }
	    return pairs;
	  };

	  // Invert the keys and values of an object. The values must be serializable.
	  _.invert = function(obj) {
	    var result = {};
	    var keys = _.keys(obj);
	    for (var i = 0, length = keys.length; i < length; i++) {
	      result[obj[keys[i]]] = keys[i];
	    }
	    return result;
	  };

	  // Return a sorted list of the function names available on the object.
	  // Aliased as `methods`
	  _.functions = _.methods = function(obj) {
	    var names = [];
	    for (var key in obj) {
	      if (_.isFunction(obj[key])) names.push(key);
	    }
	    return names.sort();
	  };

	  // Extend a given object with all the properties in passed-in object(s).
	  _.extend = createAssigner(_.allKeys);

	  // Assigns a given object with all the own properties in the passed-in object(s)
	  // (https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
	  _.extendOwn = _.assign = createAssigner(_.keys);

	  // Returns the first key on an object that passes a predicate test
	  _.findKey = function(obj, predicate, context) {
	    predicate = cb(predicate, context);
	    var keys = _.keys(obj), key;
	    for (var i = 0, length = keys.length; i < length; i++) {
	      key = keys[i];
	      if (predicate(obj[key], key, obj)) return key;
	    }
	  };

	  // Return a copy of the object only containing the whitelisted properties.
	  _.pick = function(object, oiteratee, context) {
	    var result = {}, obj = object, iteratee, keys;
	    if (obj == null) return result;
	    if (_.isFunction(oiteratee)) {
	      keys = _.allKeys(obj);
	      iteratee = optimizeCb(oiteratee, context);
	    } else {
	      keys = flatten(arguments, false, false, 1);
	      iteratee = function(value, key, obj) { return key in obj; };
	      obj = Object(obj);
	    }
	    for (var i = 0, length = keys.length; i < length; i++) {
	      var key = keys[i];
	      var value = obj[key];
	      if (iteratee(value, key, obj)) result[key] = value;
	    }
	    return result;
	  };

	   // Return a copy of the object without the blacklisted properties.
	  _.omit = function(obj, iteratee, context) {
	    if (_.isFunction(iteratee)) {
	      iteratee = _.negate(iteratee);
	    } else {
	      var keys = _.map(flatten(arguments, false, false, 1), String);
	      iteratee = function(value, key) {
	        return !_.contains(keys, key);
	      };
	    }
	    return _.pick(obj, iteratee, context);
	  };

	  // Fill in a given object with default properties.
	  _.defaults = createAssigner(_.allKeys, true);

	  // Creates an object that inherits from the given prototype object.
	  // If additional properties are provided then they will be added to the
	  // created object.
	  _.create = function(prototype, props) {
	    var result = baseCreate(prototype);
	    if (props) _.extendOwn(result, props);
	    return result;
	  };

	  // Create a (shallow-cloned) duplicate of an object.
	  _.clone = function(obj) {
	    if (!_.isObject(obj)) return obj;
	    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
	  };

	  // Invokes interceptor with the obj, and then returns obj.
	  // The primary purpose of this method is to "tap into" a method chain, in
	  // order to perform operations on intermediate results within the chain.
	  _.tap = function(obj, interceptor) {
	    interceptor(obj);
	    return obj;
	  };

	  // Returns whether an object has a given set of `key:value` pairs.
	  _.isMatch = function(object, attrs) {
	    var keys = _.keys(attrs), length = keys.length;
	    if (object == null) return !length;
	    var obj = Object(object);
	    for (var i = 0; i < length; i++) {
	      var key = keys[i];
	      if (attrs[key] !== obj[key] || !(key in obj)) return false;
	    }
	    return true;
	  };


	  // Internal recursive comparison function for `isEqual`.
	  var eq = function(a, b, aStack, bStack) {
	    // Identical objects are equal. `0 === -0`, but they aren't identical.
	    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
	    if (a === b) return a !== 0 || 1 / a === 1 / b;
	    // A strict comparison is necessary because `null == undefined`.
	    if (a == null || b == null) return a === b;
	    // Unwrap any wrapped objects.
	    if (a instanceof _) a = a._wrapped;
	    if (b instanceof _) b = b._wrapped;
	    // Compare `[[Class]]` names.
	    var className = toString.call(a);
	    if (className !== toString.call(b)) return false;
	    switch (className) {
	      // Strings, numbers, regular expressions, dates, and booleans are compared by value.
	      case '[object RegExp]':
	      // RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')
	      case '[object String]':
	        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
	        // equivalent to `new String("5")`.
	        return '' + a === '' + b;
	      case '[object Number]':
	        // `NaN`s are equivalent, but non-reflexive.
	        // Object(NaN) is equivalent to NaN
	        if (+a !== +a) return +b !== +b;
	        // An `egal` comparison is performed for other numeric values.
	        return +a === 0 ? 1 / +a === 1 / b : +a === +b;
	      case '[object Date]':
	      case '[object Boolean]':
	        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
	        // millisecond representations. Note that invalid dates with millisecond representations
	        // of `NaN` are not equivalent.
	        return +a === +b;
	    }

	    var areArrays = className === '[object Array]';
	    if (!areArrays) {
	      if (typeof a != 'object' || typeof b != 'object') return false;

	      // Objects with different constructors are not equivalent, but `Object`s or `Array`s
	      // from different frames are.
	      var aCtor = a.constructor, bCtor = b.constructor;
	      if (aCtor !== bCtor && !(_.isFunction(aCtor) && aCtor instanceof aCtor &&
	                               _.isFunction(bCtor) && bCtor instanceof bCtor)
	                          && ('constructor' in a && 'constructor' in b)) {
	        return false;
	      }
	    }
	    // Assume equality for cyclic structures. The algorithm for detecting cyclic
	    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.

	    // Initializing stack of traversed objects.
	    // It's done here since we only need them for objects and arrays comparison.
	    aStack = aStack || [];
	    bStack = bStack || [];
	    var length = aStack.length;
	    while (length--) {
	      // Linear search. Performance is inversely proportional to the number of
	      // unique nested structures.
	      if (aStack[length] === a) return bStack[length] === b;
	    }

	    // Add the first object to the stack of traversed objects.
	    aStack.push(a);
	    bStack.push(b);

	    // Recursively compare objects and arrays.
	    if (areArrays) {
	      // Compare array lengths to determine if a deep comparison is necessary.
	      length = a.length;
	      if (length !== b.length) return false;
	      // Deep compare the contents, ignoring non-numeric properties.
	      while (length--) {
	        if (!eq(a[length], b[length], aStack, bStack)) return false;
	      }
	    } else {
	      // Deep compare objects.
	      var keys = _.keys(a), key;
	      length = keys.length;
	      // Ensure that both objects contain the same number of properties before comparing deep equality.
	      if (_.keys(b).length !== length) return false;
	      while (length--) {
	        // Deep compare each member
	        key = keys[length];
	        if (!(_.has(b, key) && eq(a[key], b[key], aStack, bStack))) return false;
	      }
	    }
	    // Remove the first object from the stack of traversed objects.
	    aStack.pop();
	    bStack.pop();
	    return true;
	  };

	  // Perform a deep comparison to check if two objects are equal.
	  _.isEqual = function(a, b) {
	    return eq(a, b);
	  };

	  // Is a given array, string, or object empty?
	  // An "empty" object has no enumerable own-properties.
	  _.isEmpty = function(obj) {
	    if (obj == null) return true;
	    if (isArrayLike(obj) && (_.isArray(obj) || _.isString(obj) || _.isArguments(obj))) return obj.length === 0;
	    return _.keys(obj).length === 0;
	  };

	  // Is a given value a DOM element?
	  _.isElement = function(obj) {
	    return !!(obj && obj.nodeType === 1);
	  };

	  // Is a given value an array?
	  // Delegates to ECMA5's native Array.isArray
	  _.isArray = nativeIsArray || function(obj) {
	    return toString.call(obj) === '[object Array]';
	  };

	  // Is a given variable an object?
	  _.isObject = function(obj) {
	    var type = typeof obj;
	    return type === 'function' || type === 'object' && !!obj;
	  };

	  // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp, isError.
	  _.each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error'], function(name) {
	    _['is' + name] = function(obj) {
	      return toString.call(obj) === '[object ' + name + ']';
	    };
	  });

	  // Define a fallback version of the method in browsers (ahem, IE < 9), where
	  // there isn't any inspectable "Arguments" type.
	  if (!_.isArguments(arguments)) {
	    _.isArguments = function(obj) {
	      return _.has(obj, 'callee');
	    };
	  }

	  // Optimize `isFunction` if appropriate. Work around some typeof bugs in old v8,
	  // IE 11 (#1621), and in Safari 8 (#1929).
	  if (typeof /./ != 'function' && typeof Int8Array != 'object') {
	    _.isFunction = function(obj) {
	      return typeof obj == 'function' || false;
	    };
	  }

	  // Is a given object a finite number?
	  _.isFinite = function(obj) {
	    return isFinite(obj) && !isNaN(parseFloat(obj));
	  };

	  // Is the given value `NaN`? (NaN is the only number which does not equal itself).
	  _.isNaN = function(obj) {
	    return _.isNumber(obj) && obj !== +obj;
	  };

	  // Is a given value a boolean?
	  _.isBoolean = function(obj) {
	    return obj === true || obj === false || toString.call(obj) === '[object Boolean]';
	  };

	  // Is a given value equal to null?
	  _.isNull = function(obj) {
	    return obj === null;
	  };

	  // Is a given variable undefined?
	  _.isUndefined = function(obj) {
	    return obj === void 0;
	  };

	  // Shortcut function for checking if an object has a given property directly
	  // on itself (in other words, not on a prototype).
	  _.has = function(obj, key) {
	    return obj != null && hasOwnProperty.call(obj, key);
	  };

	  // Utility Functions
	  // -----------------

	  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
	  // previous owner. Returns a reference to the Underscore object.
	  _.noConflict = function() {
	    root._ = previousUnderscore;
	    return this;
	  };

	  // Keep the identity function around for default iteratees.
	  _.identity = function(value) {
	    return value;
	  };

	  // Predicate-generating functions. Often useful outside of Underscore.
	  _.constant = function(value) {
	    return function() {
	      return value;
	    };
	  };

	  _.noop = function(){};

	  _.property = property;

	  // Generates a function for a given object that returns a given property.
	  _.propertyOf = function(obj) {
	    return obj == null ? function(){} : function(key) {
	      return obj[key];
	    };
	  };

	  // Returns a predicate for checking whether an object has a given set of
	  // `key:value` pairs.
	  _.matcher = _.matches = function(attrs) {
	    attrs = _.extendOwn({}, attrs);
	    return function(obj) {
	      return _.isMatch(obj, attrs);
	    };
	  };

	  // Run a function **n** times.
	  _.times = function(n, iteratee, context) {
	    var accum = Array(Math.max(0, n));
	    iteratee = optimizeCb(iteratee, context, 1);
	    for (var i = 0; i < n; i++) accum[i] = iteratee(i);
	    return accum;
	  };

	  // Return a random integer between min and max (inclusive).
	  _.random = function(min, max) {
	    if (max == null) {
	      max = min;
	      min = 0;
	    }
	    return min + Math.floor(Math.random() * (max - min + 1));
	  };

	  // A (possibly faster) way to get the current timestamp as an integer.
	  _.now = Date.now || function() {
	    return new Date().getTime();
	  };

	   // List of HTML entities for escaping.
	  var escapeMap = {
	    '&': '&amp;',
	    '<': '&lt;',
	    '>': '&gt;',
	    '"': '&quot;',
	    "'": '&#x27;',
	    '`': '&#x60;'
	  };
	  var unescapeMap = _.invert(escapeMap);

	  // Functions for escaping and unescaping strings to/from HTML interpolation.
	  var createEscaper = function(map) {
	    var escaper = function(match) {
	      return map[match];
	    };
	    // Regexes for identifying a key that needs to be escaped
	    var source = '(?:' + _.keys(map).join('|') + ')';
	    var testRegexp = RegExp(source);
	    var replaceRegexp = RegExp(source, 'g');
	    return function(string) {
	      string = string == null ? '' : '' + string;
	      return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
	    };
	  };
	  _.escape = createEscaper(escapeMap);
	  _.unescape = createEscaper(unescapeMap);

	  // If the value of the named `property` is a function then invoke it with the
	  // `object` as context; otherwise, return it.
	  _.result = function(object, property, fallback) {
	    var value = object == null ? void 0 : object[property];
	    if (value === void 0) {
	      value = fallback;
	    }
	    return _.isFunction(value) ? value.call(object) : value;
	  };

	  // Generate a unique integer id (unique within the entire client session).
	  // Useful for temporary DOM ids.
	  var idCounter = 0;
	  _.uniqueId = function(prefix) {
	    var id = ++idCounter + '';
	    return prefix ? prefix + id : id;
	  };

	  // By default, Underscore uses ERB-style template delimiters, change the
	  // following template settings to use alternative delimiters.
	  _.templateSettings = {
	    evaluate    : /<%([\s\S]+?)%>/g,
	    interpolate : /<%=([\s\S]+?)%>/g,
	    escape      : /<%-([\s\S]+?)%>/g
	  };

	  // When customizing `templateSettings`, if you don't want to define an
	  // interpolation, evaluation or escaping regex, we need one that is
	  // guaranteed not to match.
	  var noMatch = /(.)^/;

	  // Certain characters need to be escaped so that they can be put into a
	  // string literal.
	  var escapes = {
	    "'":      "'",
	    '\\':     '\\',
	    '\r':     'r',
	    '\n':     'n',
	    '\u2028': 'u2028',
	    '\u2029': 'u2029'
	  };

	  var escaper = /\\|'|\r|\n|\u2028|\u2029/g;

	  var escapeChar = function(match) {
	    return '\\' + escapes[match];
	  };

	  // JavaScript micro-templating, similar to John Resig's implementation.
	  // Underscore templating handles arbitrary delimiters, preserves whitespace,
	  // and correctly escapes quotes within interpolated code.
	  // NB: `oldSettings` only exists for backwards compatibility.
	  _.template = function(text, settings, oldSettings) {
	    if (!settings && oldSettings) settings = oldSettings;
	    settings = _.defaults({}, settings, _.templateSettings);

	    // Combine delimiters into one regular expression via alternation.
	    var matcher = RegExp([
	      (settings.escape || noMatch).source,
	      (settings.interpolate || noMatch).source,
	      (settings.evaluate || noMatch).source
	    ].join('|') + '|$', 'g');

	    // Compile the template source, escaping string literals appropriately.
	    var index = 0;
	    var source = "__p+='";
	    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
	      source += text.slice(index, offset).replace(escaper, escapeChar);
	      index = offset + match.length;

	      if (escape) {
	        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
	      } else if (interpolate) {
	        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
	      } else if (evaluate) {
	        source += "';\n" + evaluate + "\n__p+='";
	      }

	      // Adobe VMs need the match returned to produce the correct offest.
	      return match;
	    });
	    source += "';\n";

	    // If a variable is not specified, place data values in local scope.
	    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

	    source = "var __t,__p='',__j=Array.prototype.join," +
	      "print=function(){__p+=__j.call(arguments,'');};\n" +
	      source + 'return __p;\n';

	    try {
	      var render = new Function(settings.variable || 'obj', '_', source);
	    } catch (e) {
	      e.source = source;
	      throw e;
	    }

	    var template = function(data) {
	      return render.call(this, data, _);
	    };

	    // Provide the compiled source as a convenience for precompilation.
	    var argument = settings.variable || 'obj';
	    template.source = 'function(' + argument + '){\n' + source + '}';

	    return template;
	  };

	  // Add a "chain" function. Start chaining a wrapped Underscore object.
	  _.chain = function(obj) {
	    var instance = _(obj);
	    instance._chain = true;
	    return instance;
	  };

	  // OOP
	  // ---------------
	  // If Underscore is called as a function, it returns a wrapped object that
	  // can be used OO-style. This wrapper holds altered versions of all the
	  // underscore functions. Wrapped objects may be chained.

	  // Helper function to continue chaining intermediate results.
	  var result = function(instance, obj) {
	    return instance._chain ? _(obj).chain() : obj;
	  };

	  // Add your own custom functions to the Underscore object.
	  _.mixin = function(obj) {
	    _.each(_.functions(obj), function(name) {
	      var func = _[name] = obj[name];
	      _.prototype[name] = function() {
	        var args = [this._wrapped];
	        push.apply(args, arguments);
	        return result(this, func.apply(_, args));
	      };
	    });
	  };

	  // Add all of the Underscore functions to the wrapper object.
	  _.mixin(_);

	  // Add all mutator Array functions to the wrapper.
	  _.each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
	    var method = ArrayProto[name];
	    _.prototype[name] = function() {
	      var obj = this._wrapped;
	      method.apply(obj, arguments);
	      if ((name === 'shift' || name === 'splice') && obj.length === 0) delete obj[0];
	      return result(this, obj);
	    };
	  });

	  // Add all accessor Array functions to the wrapper.
	  _.each(['concat', 'join', 'slice'], function(name) {
	    var method = ArrayProto[name];
	    _.prototype[name] = function() {
	      return result(this, method.apply(this._wrapped, arguments));
	    };
	  });

	  // Extracts the result from a wrapped and chained object.
	  _.prototype.value = function() {
	    return this._wrapped;
	  };

	  // Provide unwrapping proxy for some methods used in engine operations
	  // such as arithmetic and JSON stringification.
	  _.prototype.valueOf = _.prototype.toJSON = _.prototype.value;

	  _.prototype.toString = function() {
	    return '' + this._wrapped;
	  };

	  // AMD registration happens at the end for compatibility with AMD loaders
	  // that may not enforce next-turn semantics on modules. Even though general
	  // practice for AMD registration is to be anonymous, underscore registers
	  // as a named module because, like jQuery, it is a base library that is
	  // popular enough to be bundled in a third party lib, but not be part of
	  // an AMD load request. Those cases could generate an error when an
	  // anonymous define() is called outside of a loader request.
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
	      return _;
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  }
	}.call(this));


/***/ },

/***/ 963:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {//! moment.js
	//! version : 2.13.0
	//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
	//! license : MIT
	//! momentjs.com

	;(function (global, factory) {
	     true ? module.exports = factory() :
	    typeof define === 'function' && define.amd ? define(factory) :
	    global.moment = factory()
	}(this, function () { 'use strict';

	    var hookCallback;

	    function utils_hooks__hooks () {
	        return hookCallback.apply(null, arguments);
	    }

	    // This is done to register the method called with moment()
	    // without creating circular dependencies.
	    function setHookCallback (callback) {
	        hookCallback = callback;
	    }

	    function isArray(input) {
	        return input instanceof Array || Object.prototype.toString.call(input) === '[object Array]';
	    }

	    function isDate(input) {
	        return input instanceof Date || Object.prototype.toString.call(input) === '[object Date]';
	    }

	    function map(arr, fn) {
	        var res = [], i;
	        for (i = 0; i < arr.length; ++i) {
	            res.push(fn(arr[i], i));
	        }
	        return res;
	    }

	    function hasOwnProp(a, b) {
	        return Object.prototype.hasOwnProperty.call(a, b);
	    }

	    function extend(a, b) {
	        for (var i in b) {
	            if (hasOwnProp(b, i)) {
	                a[i] = b[i];
	            }
	        }

	        if (hasOwnProp(b, 'toString')) {
	            a.toString = b.toString;
	        }

	        if (hasOwnProp(b, 'valueOf')) {
	            a.valueOf = b.valueOf;
	        }

	        return a;
	    }

	    function create_utc__createUTC (input, format, locale, strict) {
	        return createLocalOrUTC(input, format, locale, strict, true).utc();
	    }

	    function defaultParsingFlags() {
	        // We need to deep clone this object.
	        return {
	            empty           : false,
	            unusedTokens    : [],
	            unusedInput     : [],
	            overflow        : -2,
	            charsLeftOver   : 0,
	            nullInput       : false,
	            invalidMonth    : null,
	            invalidFormat   : false,
	            userInvalidated : false,
	            iso             : false,
	            parsedDateParts : [],
	            meridiem        : null
	        };
	    }

	    function getParsingFlags(m) {
	        if (m._pf == null) {
	            m._pf = defaultParsingFlags();
	        }
	        return m._pf;
	    }

	    var some;
	    if (Array.prototype.some) {
	        some = Array.prototype.some;
	    } else {
	        some = function (fun) {
	            var t = Object(this);
	            var len = t.length >>> 0;

	            for (var i = 0; i < len; i++) {
	                if (i in t && fun.call(this, t[i], i, t)) {
	                    return true;
	                }
	            }

	            return false;
	        };
	    }

	    function valid__isValid(m) {
	        if (m._isValid == null) {
	            var flags = getParsingFlags(m);
	            var parsedParts = some.call(flags.parsedDateParts, function (i) {
	                return i != null;
	            });
	            m._isValid = !isNaN(m._d.getTime()) &&
	                flags.overflow < 0 &&
	                !flags.empty &&
	                !flags.invalidMonth &&
	                !flags.invalidWeekday &&
	                !flags.nullInput &&
	                !flags.invalidFormat &&
	                !flags.userInvalidated &&
	                (!flags.meridiem || (flags.meridiem && parsedParts));

	            if (m._strict) {
	                m._isValid = m._isValid &&
	                    flags.charsLeftOver === 0 &&
	                    flags.unusedTokens.length === 0 &&
	                    flags.bigHour === undefined;
	            }
	        }
	        return m._isValid;
	    }

	    function valid__createInvalid (flags) {
	        var m = create_utc__createUTC(NaN);
	        if (flags != null) {
	            extend(getParsingFlags(m), flags);
	        }
	        else {
	            getParsingFlags(m).userInvalidated = true;
	        }

	        return m;
	    }

	    function isUndefined(input) {
	        return input === void 0;
	    }

	    // Plugins that add properties should also add the key here (null value),
	    // so we can properly clone ourselves.
	    var momentProperties = utils_hooks__hooks.momentProperties = [];

	    function copyConfig(to, from) {
	        var i, prop, val;

	        if (!isUndefined(from._isAMomentObject)) {
	            to._isAMomentObject = from._isAMomentObject;
	        }
	        if (!isUndefined(from._i)) {
	            to._i = from._i;
	        }
	        if (!isUndefined(from._f)) {
	            to._f = from._f;
	        }
	        if (!isUndefined(from._l)) {
	            to._l = from._l;
	        }
	        if (!isUndefined(from._strict)) {
	            to._strict = from._strict;
	        }
	        if (!isUndefined(from._tzm)) {
	            to._tzm = from._tzm;
	        }
	        if (!isUndefined(from._isUTC)) {
	            to._isUTC = from._isUTC;
	        }
	        if (!isUndefined(from._offset)) {
	            to._offset = from._offset;
	        }
	        if (!isUndefined(from._pf)) {
	            to._pf = getParsingFlags(from);
	        }
	        if (!isUndefined(from._locale)) {
	            to._locale = from._locale;
	        }

	        if (momentProperties.length > 0) {
	            for (i in momentProperties) {
	                prop = momentProperties[i];
	                val = from[prop];
	                if (!isUndefined(val)) {
	                    to[prop] = val;
	                }
	            }
	        }

	        return to;
	    }

	    var updateInProgress = false;

	    // Moment prototype object
	    function Moment(config) {
	        copyConfig(this, config);
	        this._d = new Date(config._d != null ? config._d.getTime() : NaN);
	        // Prevent infinite loop in case updateOffset creates new moment
	        // objects.
	        if (updateInProgress === false) {
	            updateInProgress = true;
	            utils_hooks__hooks.updateOffset(this);
	            updateInProgress = false;
	        }
	    }

	    function isMoment (obj) {
	        return obj instanceof Moment || (obj != null && obj._isAMomentObject != null);
	    }

	    function absFloor (number) {
	        if (number < 0) {
	            return Math.ceil(number);
	        } else {
	            return Math.floor(number);
	        }
	    }

	    function toInt(argumentForCoercion) {
	        var coercedNumber = +argumentForCoercion,
	            value = 0;

	        if (coercedNumber !== 0 && isFinite(coercedNumber)) {
	            value = absFloor(coercedNumber);
	        }

	        return value;
	    }

	    // compare two arrays, return the number of differences
	    function compareArrays(array1, array2, dontConvert) {
	        var len = Math.min(array1.length, array2.length),
	            lengthDiff = Math.abs(array1.length - array2.length),
	            diffs = 0,
	            i;
	        for (i = 0; i < len; i++) {
	            if ((dontConvert && array1[i] !== array2[i]) ||
	                (!dontConvert && toInt(array1[i]) !== toInt(array2[i]))) {
	                diffs++;
	            }
	        }
	        return diffs + lengthDiff;
	    }

	    function warn(msg) {
	        if (utils_hooks__hooks.suppressDeprecationWarnings === false &&
	                (typeof console !==  'undefined') && console.warn) {
	            console.warn('Deprecation warning: ' + msg);
	        }
	    }

	    function deprecate(msg, fn) {
	        var firstTime = true;

	        return extend(function () {
	            if (utils_hooks__hooks.deprecationHandler != null) {
	                utils_hooks__hooks.deprecationHandler(null, msg);
	            }
	            if (firstTime) {
	                warn(msg + '\nArguments: ' + Array.prototype.slice.call(arguments).join(', ') + '\n' + (new Error()).stack);
	                firstTime = false;
	            }
	            return fn.apply(this, arguments);
	        }, fn);
	    }

	    var deprecations = {};

	    function deprecateSimple(name, msg) {
	        if (utils_hooks__hooks.deprecationHandler != null) {
	            utils_hooks__hooks.deprecationHandler(name, msg);
	        }
	        if (!deprecations[name]) {
	            warn(msg);
	            deprecations[name] = true;
	        }
	    }

	    utils_hooks__hooks.suppressDeprecationWarnings = false;
	    utils_hooks__hooks.deprecationHandler = null;

	    function isFunction(input) {
	        return input instanceof Function || Object.prototype.toString.call(input) === '[object Function]';
	    }

	    function isObject(input) {
	        return Object.prototype.toString.call(input) === '[object Object]';
	    }

	    function locale_set__set (config) {
	        var prop, i;
	        for (i in config) {
	            prop = config[i];
	            if (isFunction(prop)) {
	                this[i] = prop;
	            } else {
	                this['_' + i] = prop;
	            }
	        }
	        this._config = config;
	        // Lenient ordinal parsing accepts just a number in addition to
	        // number + (possibly) stuff coming from _ordinalParseLenient.
	        this._ordinalParseLenient = new RegExp(this._ordinalParse.source + '|' + (/\d{1,2}/).source);
	    }

	    function mergeConfigs(parentConfig, childConfig) {
	        var res = extend({}, parentConfig), prop;
	        for (prop in childConfig) {
	            if (hasOwnProp(childConfig, prop)) {
	                if (isObject(parentConfig[prop]) && isObject(childConfig[prop])) {
	                    res[prop] = {};
	                    extend(res[prop], parentConfig[prop]);
	                    extend(res[prop], childConfig[prop]);
	                } else if (childConfig[prop] != null) {
	                    res[prop] = childConfig[prop];
	                } else {
	                    delete res[prop];
	                }
	            }
	        }
	        return res;
	    }

	    function Locale(config) {
	        if (config != null) {
	            this.set(config);
	        }
	    }

	    var keys;

	    if (Object.keys) {
	        keys = Object.keys;
	    } else {
	        keys = function (obj) {
	            var i, res = [];
	            for (i in obj) {
	                if (hasOwnProp(obj, i)) {
	                    res.push(i);
	                }
	            }
	            return res;
	        };
	    }

	    // internal storage for locale config files
	    var locales = {};
	    var globalLocale;

	    function normalizeLocale(key) {
	        return key ? key.toLowerCase().replace('_', '-') : key;
	    }

	    // pick the locale from the array
	    // try ['en-au', 'en-gb'] as 'en-au', 'en-gb', 'en', as in move through the list trying each
	    // substring from most specific to least, but move to the next array item if it's a more specific variant than the current root
	    function chooseLocale(names) {
	        var i = 0, j, next, locale, split;

	        while (i < names.length) {
	            split = normalizeLocale(names[i]).split('-');
	            j = split.length;
	            next = normalizeLocale(names[i + 1]);
	            next = next ? next.split('-') : null;
	            while (j > 0) {
	                locale = loadLocale(split.slice(0, j).join('-'));
	                if (locale) {
	                    return locale;
	                }
	                if (next && next.length >= j && compareArrays(split, next, true) >= j - 1) {
	                    //the next array item is better than a shallower substring of this one
	                    break;
	                }
	                j--;
	            }
	            i++;
	        }
	        return null;
	    }

	    function loadLocale(name) {
	        var oldLocale = null;
	        // TODO: Find a better way to register and load all the locales in Node
	        if (!locales[name] && (typeof module !== 'undefined') &&
	                module && module.exports) {
	            try {
	                oldLocale = globalLocale._abbr;
	                __webpack_require__(965)("./" + name);
	                // because defineLocale currently also sets the global locale, we
	                // want to undo that for lazy loaded locales
	                locale_locales__getSetGlobalLocale(oldLocale);
	            } catch (e) { }
	        }
	        return locales[name];
	    }

	    // This function will load locale and then set the global locale.  If
	    // no arguments are passed in, it will simply return the current global
	    // locale key.
	    function locale_locales__getSetGlobalLocale (key, values) {
	        var data;
	        if (key) {
	            if (isUndefined(values)) {
	                data = locale_locales__getLocale(key);
	            }
	            else {
	                data = defineLocale(key, values);
	            }

	            if (data) {
	                // moment.duration._locale = moment._locale = data;
	                globalLocale = data;
	            }
	        }

	        return globalLocale._abbr;
	    }

	    function defineLocale (name, config) {
	        if (config !== null) {
	            config.abbr = name;
	            if (locales[name] != null) {
	                deprecateSimple('defineLocaleOverride',
	                        'use moment.updateLocale(localeName, config) to change ' +
	                        'an existing locale. moment.defineLocale(localeName, ' +
	                        'config) should only be used for creating a new locale');
	                config = mergeConfigs(locales[name]._config, config);
	            } else if (config.parentLocale != null) {
	                if (locales[config.parentLocale] != null) {
	                    config = mergeConfigs(locales[config.parentLocale]._config, config);
	                } else {
	                    // treat as if there is no base config
	                    deprecateSimple('parentLocaleUndefined',
	                            'specified parentLocale is not defined yet');
	                }
	            }
	            locales[name] = new Locale(config);

	            // backwards compat for now: also set the locale
	            locale_locales__getSetGlobalLocale(name);

	            return locales[name];
	        } else {
	            // useful for testing
	            delete locales[name];
	            return null;
	        }
	    }

	    function updateLocale(name, config) {
	        if (config != null) {
	            var locale;
	            if (locales[name] != null) {
	                config = mergeConfigs(locales[name]._config, config);
	            }
	            locale = new Locale(config);
	            locale.parentLocale = locales[name];
	            locales[name] = locale;

	            // backwards compat for now: also set the locale
	            locale_locales__getSetGlobalLocale(name);
	        } else {
	            // pass null for config to unupdate, useful for tests
	            if (locales[name] != null) {
	                if (locales[name].parentLocale != null) {
	                    locales[name] = locales[name].parentLocale;
	                } else if (locales[name] != null) {
	                    delete locales[name];
	                }
	            }
	        }
	        return locales[name];
	    }

	    // returns locale data
	    function locale_locales__getLocale (key) {
	        var locale;

	        if (key && key._locale && key._locale._abbr) {
	            key = key._locale._abbr;
	        }

	        if (!key) {
	            return globalLocale;
	        }

	        if (!isArray(key)) {
	            //short-circuit everything else
	            locale = loadLocale(key);
	            if (locale) {
	                return locale;
	            }
	            key = [key];
	        }

	        return chooseLocale(key);
	    }

	    function locale_locales__listLocales() {
	        return keys(locales);
	    }

	    var aliases = {};

	    function addUnitAlias (unit, shorthand) {
	        var lowerCase = unit.toLowerCase();
	        aliases[lowerCase] = aliases[lowerCase + 's'] = aliases[shorthand] = unit;
	    }

	    function normalizeUnits(units) {
	        return typeof units === 'string' ? aliases[units] || aliases[units.toLowerCase()] : undefined;
	    }

	    function normalizeObjectUnits(inputObject) {
	        var normalizedInput = {},
	            normalizedProp,
	            prop;

	        for (prop in inputObject) {
	            if (hasOwnProp(inputObject, prop)) {
	                normalizedProp = normalizeUnits(prop);
	                if (normalizedProp) {
	                    normalizedInput[normalizedProp] = inputObject[prop];
	                }
	            }
	        }

	        return normalizedInput;
	    }

	    function makeGetSet (unit, keepTime) {
	        return function (value) {
	            if (value != null) {
	                get_set__set(this, unit, value);
	                utils_hooks__hooks.updateOffset(this, keepTime);
	                return this;
	            } else {
	                return get_set__get(this, unit);
	            }
	        };
	    }

	    function get_set__get (mom, unit) {
	        return mom.isValid() ?
	            mom._d['get' + (mom._isUTC ? 'UTC' : '') + unit]() : NaN;
	    }

	    function get_set__set (mom, unit, value) {
	        if (mom.isValid()) {
	            mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value);
	        }
	    }

	    // MOMENTS

	    function getSet (units, value) {
	        var unit;
	        if (typeof units === 'object') {
	            for (unit in units) {
	                this.set(unit, units[unit]);
	            }
	        } else {
	            units = normalizeUnits(units);
	            if (isFunction(this[units])) {
	                return this[units](value);
	            }
	        }
	        return this;
	    }

	    function zeroFill(number, targetLength, forceSign) {
	        var absNumber = '' + Math.abs(number),
	            zerosToFill = targetLength - absNumber.length,
	            sign = number >= 0;
	        return (sign ? (forceSign ? '+' : '') : '-') +
	            Math.pow(10, Math.max(0, zerosToFill)).toString().substr(1) + absNumber;
	    }

	    var formattingTokens = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g;

	    var localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g;

	    var formatFunctions = {};

	    var formatTokenFunctions = {};

	    // token:    'M'
	    // padded:   ['MM', 2]
	    // ordinal:  'Mo'
	    // callback: function () { this.month() + 1 }
	    function addFormatToken (token, padded, ordinal, callback) {
	        var func = callback;
	        if (typeof callback === 'string') {
	            func = function () {
	                return this[callback]();
	            };
	        }
	        if (token) {
	            formatTokenFunctions[token] = func;
	        }
	        if (padded) {
	            formatTokenFunctions[padded[0]] = function () {
	                return zeroFill(func.apply(this, arguments), padded[1], padded[2]);
	            };
	        }
	        if (ordinal) {
	            formatTokenFunctions[ordinal] = function () {
	                return this.localeData().ordinal(func.apply(this, arguments), token);
	            };
	        }
	    }

	    function removeFormattingTokens(input) {
	        if (input.match(/\[[\s\S]/)) {
	            return input.replace(/^\[|\]$/g, '');
	        }
	        return input.replace(/\\/g, '');
	    }

	    function makeFormatFunction(format) {
	        var array = format.match(formattingTokens), i, length;

	        for (i = 0, length = array.length; i < length; i++) {
	            if (formatTokenFunctions[array[i]]) {
	                array[i] = formatTokenFunctions[array[i]];
	            } else {
	                array[i] = removeFormattingTokens(array[i]);
	            }
	        }

	        return function (mom) {
	            var output = '', i;
	            for (i = 0; i < length; i++) {
	                output += array[i] instanceof Function ? array[i].call(mom, format) : array[i];
	            }
	            return output;
	        };
	    }

	    // format date using native date object
	    function formatMoment(m, format) {
	        if (!m.isValid()) {
	            return m.localeData().invalidDate();
	        }

	        format = expandFormat(format, m.localeData());
	        formatFunctions[format] = formatFunctions[format] || makeFormatFunction(format);

	        return formatFunctions[format](m);
	    }

	    function expandFormat(format, locale) {
	        var i = 5;

	        function replaceLongDateFormatTokens(input) {
	            return locale.longDateFormat(input) || input;
	        }

	        localFormattingTokens.lastIndex = 0;
	        while (i >= 0 && localFormattingTokens.test(format)) {
	            format = format.replace(localFormattingTokens, replaceLongDateFormatTokens);
	            localFormattingTokens.lastIndex = 0;
	            i -= 1;
	        }

	        return format;
	    }

	    var match1         = /\d/;            //       0 - 9
	    var match2         = /\d\d/;          //      00 - 99
	    var match3         = /\d{3}/;         //     000 - 999
	    var match4         = /\d{4}/;         //    0000 - 9999
	    var match6         = /[+-]?\d{6}/;    // -999999 - 999999
	    var match1to2      = /\d\d?/;         //       0 - 99
	    var match3to4      = /\d\d\d\d?/;     //     999 - 9999
	    var match5to6      = /\d\d\d\d\d\d?/; //   99999 - 999999
	    var match1to3      = /\d{1,3}/;       //       0 - 999
	    var match1to4      = /\d{1,4}/;       //       0 - 9999
	    var match1to6      = /[+-]?\d{1,6}/;  // -999999 - 999999

	    var matchUnsigned  = /\d+/;           //       0 - inf
	    var matchSigned    = /[+-]?\d+/;      //    -inf - inf

	    var matchOffset    = /Z|[+-]\d\d:?\d\d/gi; // +00:00 -00:00 +0000 -0000 or Z
	    var matchShortOffset = /Z|[+-]\d\d(?::?\d\d)?/gi; // +00 -00 +00:00 -00:00 +0000 -0000 or Z

	    var matchTimestamp = /[+-]?\d+(\.\d{1,3})?/; // 123456789 123456789.123

	    // any word (or two) characters or numbers including two/three word month in arabic.
	    // includes scottish gaelic two word and hyphenated months
	    var matchWord = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i;


	    var regexes = {};

	    function addRegexToken (token, regex, strictRegex) {
	        regexes[token] = isFunction(regex) ? regex : function (isStrict, localeData) {
	            return (isStrict && strictRegex) ? strictRegex : regex;
	        };
	    }

	    function getParseRegexForToken (token, config) {
	        if (!hasOwnProp(regexes, token)) {
	            return new RegExp(unescapeFormat(token));
	        }

	        return regexes[token](config._strict, config._locale);
	    }

	    // Code from http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript
	    function unescapeFormat(s) {
	        return regexEscape(s.replace('\\', '').replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (matched, p1, p2, p3, p4) {
	            return p1 || p2 || p3 || p4;
	        }));
	    }

	    function regexEscape(s) {
	        return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
	    }

	    var tokens = {};

	    function addParseToken (token, callback) {
	        var i, func = callback;
	        if (typeof token === 'string') {
	            token = [token];
	        }
	        if (typeof callback === 'number') {
	            func = function (input, array) {
	                array[callback] = toInt(input);
	            };
	        }
	        for (i = 0; i < token.length; i++) {
	            tokens[token[i]] = func;
	        }
	    }

	    function addWeekParseToken (token, callback) {
	        addParseToken(token, function (input, array, config, token) {
	            config._w = config._w || {};
	            callback(input, config._w, config, token);
	        });
	    }

	    function addTimeToArrayFromToken(token, input, config) {
	        if (input != null && hasOwnProp(tokens, token)) {
	            tokens[token](input, config._a, config, token);
	        }
	    }

	    var YEAR = 0;
	    var MONTH = 1;
	    var DATE = 2;
	    var HOUR = 3;
	    var MINUTE = 4;
	    var SECOND = 5;
	    var MILLISECOND = 6;
	    var WEEK = 7;
	    var WEEKDAY = 8;

	    var indexOf;

	    if (Array.prototype.indexOf) {
	        indexOf = Array.prototype.indexOf;
	    } else {
	        indexOf = function (o) {
	            // I know
	            var i;
	            for (i = 0; i < this.length; ++i) {
	                if (this[i] === o) {
	                    return i;
	                }
	            }
	            return -1;
	        };
	    }

	    function daysInMonth(year, month) {
	        return new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
	    }

	    // FORMATTING

	    addFormatToken('M', ['MM', 2], 'Mo', function () {
	        return this.month() + 1;
	    });

	    addFormatToken('MMM', 0, 0, function (format) {
	        return this.localeData().monthsShort(this, format);
	    });

	    addFormatToken('MMMM', 0, 0, function (format) {
	        return this.localeData().months(this, format);
	    });

	    // ALIASES

	    addUnitAlias('month', 'M');

	    // PARSING

	    addRegexToken('M',    match1to2);
	    addRegexToken('MM',   match1to2, match2);
	    addRegexToken('MMM',  function (isStrict, locale) {
	        return locale.monthsShortRegex(isStrict);
	    });
	    addRegexToken('MMMM', function (isStrict, locale) {
	        return locale.monthsRegex(isStrict);
	    });

	    addParseToken(['M', 'MM'], function (input, array) {
	        array[MONTH] = toInt(input) - 1;
	    });

	    addParseToken(['MMM', 'MMMM'], function (input, array, config, token) {
	        var month = config._locale.monthsParse(input, token, config._strict);
	        // if we didn't find a month name, mark the date as invalid.
	        if (month != null) {
	            array[MONTH] = month;
	        } else {
	            getParsingFlags(config).invalidMonth = input;
	        }
	    });

	    // LOCALES

	    var MONTHS_IN_FORMAT = /D[oD]?(\[[^\[\]]*\]|\s+)+MMMM?/;
	    var defaultLocaleMonths = 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_');
	    function localeMonths (m, format) {
	        return isArray(this._months) ? this._months[m.month()] :
	            this._months[MONTHS_IN_FORMAT.test(format) ? 'format' : 'standalone'][m.month()];
	    }

	    var defaultLocaleMonthsShort = 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_');
	    function localeMonthsShort (m, format) {
	        return isArray(this._monthsShort) ? this._monthsShort[m.month()] :
	            this._monthsShort[MONTHS_IN_FORMAT.test(format) ? 'format' : 'standalone'][m.month()];
	    }

	    function units_month__handleStrictParse(monthName, format, strict) {
	        var i, ii, mom, llc = monthName.toLocaleLowerCase();
	        if (!this._monthsParse) {
	            // this is not used
	            this._monthsParse = [];
	            this._longMonthsParse = [];
	            this._shortMonthsParse = [];
	            for (i = 0; i < 12; ++i) {
	                mom = create_utc__createUTC([2000, i]);
	                this._shortMonthsParse[i] = this.monthsShort(mom, '').toLocaleLowerCase();
	                this._longMonthsParse[i] = this.months(mom, '').toLocaleLowerCase();
	            }
	        }

	        if (strict) {
	            if (format === 'MMM') {
	                ii = indexOf.call(this._shortMonthsParse, llc);
	                return ii !== -1 ? ii : null;
	            } else {
	                ii = indexOf.call(this._longMonthsParse, llc);
	                return ii !== -1 ? ii : null;
	            }
	        } else {
	            if (format === 'MMM') {
	                ii = indexOf.call(this._shortMonthsParse, llc);
	                if (ii !== -1) {
	                    return ii;
	                }
	                ii = indexOf.call(this._longMonthsParse, llc);
	                return ii !== -1 ? ii : null;
	            } else {
	                ii = indexOf.call(this._longMonthsParse, llc);
	                if (ii !== -1) {
	                    return ii;
	                }
	                ii = indexOf.call(this._shortMonthsParse, llc);
	                return ii !== -1 ? ii : null;
	            }
	        }
	    }

	    function localeMonthsParse (monthName, format, strict) {
	        var i, mom, regex;

	        if (this._monthsParseExact) {
	            return units_month__handleStrictParse.call(this, monthName, format, strict);
	        }

	        if (!this._monthsParse) {
	            this._monthsParse = [];
	            this._longMonthsParse = [];
	            this._shortMonthsParse = [];
	        }

	        // TODO: add sorting
	        // Sorting makes sure if one month (or abbr) is a prefix of another
	        // see sorting in computeMonthsParse
	        for (i = 0; i < 12; i++) {
	            // make the regex if we don't have it already
	            mom = create_utc__createUTC([2000, i]);
	            if (strict && !this._longMonthsParse[i]) {
	                this._longMonthsParse[i] = new RegExp('^' + this.months(mom, '').replace('.', '') + '$', 'i');
	                this._shortMonthsParse[i] = new RegExp('^' + this.monthsShort(mom, '').replace('.', '') + '$', 'i');
	            }
	            if (!strict && !this._monthsParse[i]) {
	                regex = '^' + this.months(mom, '') + '|^' + this.monthsShort(mom, '');
	                this._monthsParse[i] = new RegExp(regex.replace('.', ''), 'i');
	            }
	            // test the regex
	            if (strict && format === 'MMMM' && this._longMonthsParse[i].test(monthName)) {
	                return i;
	            } else if (strict && format === 'MMM' && this._shortMonthsParse[i].test(monthName)) {
	                return i;
	            } else if (!strict && this._monthsParse[i].test(monthName)) {
	                return i;
	            }
	        }
	    }

	    // MOMENTS

	    function setMonth (mom, value) {
	        var dayOfMonth;

	        if (!mom.isValid()) {
	            // No op
	            return mom;
	        }

	        if (typeof value === 'string') {
	            if (/^\d+$/.test(value)) {
	                value = toInt(value);
	            } else {
	                value = mom.localeData().monthsParse(value);
	                // TODO: Another silent failure?
	                if (typeof value !== 'number') {
	                    return mom;
	                }
	            }
	        }

	        dayOfMonth = Math.min(mom.date(), daysInMonth(mom.year(), value));
	        mom._d['set' + (mom._isUTC ? 'UTC' : '') + 'Month'](value, dayOfMonth);
	        return mom;
	    }

	    function getSetMonth (value) {
	        if (value != null) {
	            setMonth(this, value);
	            utils_hooks__hooks.updateOffset(this, true);
	            return this;
	        } else {
	            return get_set__get(this, 'Month');
	        }
	    }

	    function getDaysInMonth () {
	        return daysInMonth(this.year(), this.month());
	    }

	    var defaultMonthsShortRegex = matchWord;
	    function monthsShortRegex (isStrict) {
	        if (this._monthsParseExact) {
	            if (!hasOwnProp(this, '_monthsRegex')) {
	                computeMonthsParse.call(this);
	            }
	            if (isStrict) {
	                return this._monthsShortStrictRegex;
	            } else {
	                return this._monthsShortRegex;
	            }
	        } else {
	            return this._monthsShortStrictRegex && isStrict ?
	                this._monthsShortStrictRegex : this._monthsShortRegex;
	        }
	    }

	    var defaultMonthsRegex = matchWord;
	    function monthsRegex (isStrict) {
	        if (this._monthsParseExact) {
	            if (!hasOwnProp(this, '_monthsRegex')) {
	                computeMonthsParse.call(this);
	            }
	            if (isStrict) {
	                return this._monthsStrictRegex;
	            } else {
	                return this._monthsRegex;
	            }
	        } else {
	            return this._monthsStrictRegex && isStrict ?
	                this._monthsStrictRegex : this._monthsRegex;
	        }
	    }

	    function computeMonthsParse () {
	        function cmpLenRev(a, b) {
	            return b.length - a.length;
	        }

	        var shortPieces = [], longPieces = [], mixedPieces = [],
	            i, mom;
	        for (i = 0; i < 12; i++) {
	            // make the regex if we don't have it already
	            mom = create_utc__createUTC([2000, i]);
	            shortPieces.push(this.monthsShort(mom, ''));
	            longPieces.push(this.months(mom, ''));
	            mixedPieces.push(this.months(mom, ''));
	            mixedPieces.push(this.monthsShort(mom, ''));
	        }
	        // Sorting makes sure if one month (or abbr) is a prefix of another it
	        // will match the longer piece.
	        shortPieces.sort(cmpLenRev);
	        longPieces.sort(cmpLenRev);
	        mixedPieces.sort(cmpLenRev);
	        for (i = 0; i < 12; i++) {
	            shortPieces[i] = regexEscape(shortPieces[i]);
	            longPieces[i] = regexEscape(longPieces[i]);
	            mixedPieces[i] = regexEscape(mixedPieces[i]);
	        }

	        this._monthsRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
	        this._monthsShortRegex = this._monthsRegex;
	        this._monthsStrictRegex = new RegExp('^(' + longPieces.join('|') + ')', 'i');
	        this._monthsShortStrictRegex = new RegExp('^(' + shortPieces.join('|') + ')', 'i');
	    }

	    function checkOverflow (m) {
	        var overflow;
	        var a = m._a;

	        if (a && getParsingFlags(m).overflow === -2) {
	            overflow =
	                a[MONTH]       < 0 || a[MONTH]       > 11  ? MONTH :
	                a[DATE]        < 1 || a[DATE]        > daysInMonth(a[YEAR], a[MONTH]) ? DATE :
	                a[HOUR]        < 0 || a[HOUR]        > 24 || (a[HOUR] === 24 && (a[MINUTE] !== 0 || a[SECOND] !== 0 || a[MILLISECOND] !== 0)) ? HOUR :
	                a[MINUTE]      < 0 || a[MINUTE]      > 59  ? MINUTE :
	                a[SECOND]      < 0 || a[SECOND]      > 59  ? SECOND :
	                a[MILLISECOND] < 0 || a[MILLISECOND] > 999 ? MILLISECOND :
	                -1;

	            if (getParsingFlags(m)._overflowDayOfYear && (overflow < YEAR || overflow > DATE)) {
	                overflow = DATE;
	            }
	            if (getParsingFlags(m)._overflowWeeks && overflow === -1) {
	                overflow = WEEK;
	            }
	            if (getParsingFlags(m)._overflowWeekday && overflow === -1) {
	                overflow = WEEKDAY;
	            }

	            getParsingFlags(m).overflow = overflow;
	        }

	        return m;
	    }

	    // iso 8601 regex
	    // 0000-00-00 0000-W00 or 0000-W00-0 + T + 00 or 00:00 or 00:00:00 or 00:00:00.000 + +00:00 or +0000 or +00)
	    var extendedIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?/;
	    var basicIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?/;

	    var tzRegex = /Z|[+-]\d\d(?::?\d\d)?/;

	    var isoDates = [
	        ['YYYYYY-MM-DD', /[+-]\d{6}-\d\d-\d\d/],
	        ['YYYY-MM-DD', /\d{4}-\d\d-\d\d/],
	        ['GGGG-[W]WW-E', /\d{4}-W\d\d-\d/],
	        ['GGGG-[W]WW', /\d{4}-W\d\d/, false],
	        ['YYYY-DDD', /\d{4}-\d{3}/],
	        ['YYYY-MM', /\d{4}-\d\d/, false],
	        ['YYYYYYMMDD', /[+-]\d{10}/],
	        ['YYYYMMDD', /\d{8}/],
	        // YYYYMM is NOT allowed by the standard
	        ['GGGG[W]WWE', /\d{4}W\d{3}/],
	        ['GGGG[W]WW', /\d{4}W\d{2}/, false],
	        ['YYYYDDD', /\d{7}/]
	    ];

	    // iso time formats and regexes
	    var isoTimes = [
	        ['HH:mm:ss.SSSS', /\d\d:\d\d:\d\d\.\d+/],
	        ['HH:mm:ss,SSSS', /\d\d:\d\d:\d\d,\d+/],
	        ['HH:mm:ss', /\d\d:\d\d:\d\d/],
	        ['HH:mm', /\d\d:\d\d/],
	        ['HHmmss.SSSS', /\d\d\d\d\d\d\.\d+/],
	        ['HHmmss,SSSS', /\d\d\d\d\d\d,\d+/],
	        ['HHmmss', /\d\d\d\d\d\d/],
	        ['HHmm', /\d\d\d\d/],
	        ['HH', /\d\d/]
	    ];

	    var aspNetJsonRegex = /^\/?Date\((\-?\d+)/i;

	    // date from iso format
	    function configFromISO(config) {
	        var i, l,
	            string = config._i,
	            match = extendedIsoRegex.exec(string) || basicIsoRegex.exec(string),
	            allowTime, dateFormat, timeFormat, tzFormat;

	        if (match) {
	            getParsingFlags(config).iso = true;

	            for (i = 0, l = isoDates.length; i < l; i++) {
	                if (isoDates[i][1].exec(match[1])) {
	                    dateFormat = isoDates[i][0];
	                    allowTime = isoDates[i][2] !== false;
	                    break;
	                }
	            }
	            if (dateFormat == null) {
	                config._isValid = false;
	                return;
	            }
	            if (match[3]) {
	                for (i = 0, l = isoTimes.length; i < l; i++) {
	                    if (isoTimes[i][1].exec(match[3])) {
	                        // match[2] should be 'T' or space
	                        timeFormat = (match[2] || ' ') + isoTimes[i][0];
	                        break;
	                    }
	                }
	                if (timeFormat == null) {
	                    config._isValid = false;
	                    return;
	                }
	            }
	            if (!allowTime && timeFormat != null) {
	                config._isValid = false;
	                return;
	            }
	            if (match[4]) {
	                if (tzRegex.exec(match[4])) {
	                    tzFormat = 'Z';
	                } else {
	                    config._isValid = false;
	                    return;
	                }
	            }
	            config._f = dateFormat + (timeFormat || '') + (tzFormat || '');
	            configFromStringAndFormat(config);
	        } else {
	            config._isValid = false;
	        }
	    }

	    // date from iso format or fallback
	    function configFromString(config) {
	        var matched = aspNetJsonRegex.exec(config._i);

	        if (matched !== null) {
	            config._d = new Date(+matched[1]);
	            return;
	        }

	        configFromISO(config);
	        if (config._isValid === false) {
	            delete config._isValid;
	            utils_hooks__hooks.createFromInputFallback(config);
	        }
	    }

	    utils_hooks__hooks.createFromInputFallback = deprecate(
	        'moment construction falls back to js Date. This is ' +
	        'discouraged and will be removed in upcoming major ' +
	        'release. Please refer to ' +
	        'https://github.com/moment/moment/issues/1407 for more info.',
	        function (config) {
	            config._d = new Date(config._i + (config._useUTC ? ' UTC' : ''));
	        }
	    );

	    function createDate (y, m, d, h, M, s, ms) {
	        //can't just apply() to create a date:
	        //http://stackoverflow.com/questions/181348/instantiating-a-javascript-object-by-calling-prototype-constructor-apply
	        var date = new Date(y, m, d, h, M, s, ms);

	        //the date constructor remaps years 0-99 to 1900-1999
	        if (y < 100 && y >= 0 && isFinite(date.getFullYear())) {
	            date.setFullYear(y);
	        }
	        return date;
	    }

	    function createUTCDate (y) {
	        var date = new Date(Date.UTC.apply(null, arguments));

	        //the Date.UTC function remaps years 0-99 to 1900-1999
	        if (y < 100 && y >= 0 && isFinite(date.getUTCFullYear())) {
	            date.setUTCFullYear(y);
	        }
	        return date;
	    }

	    // FORMATTING

	    addFormatToken('Y', 0, 0, function () {
	        var y = this.year();
	        return y <= 9999 ? '' + y : '+' + y;
	    });

	    addFormatToken(0, ['YY', 2], 0, function () {
	        return this.year() % 100;
	    });

	    addFormatToken(0, ['YYYY',   4],       0, 'year');
	    addFormatToken(0, ['YYYYY',  5],       0, 'year');
	    addFormatToken(0, ['YYYYYY', 6, true], 0, 'year');

	    // ALIASES

	    addUnitAlias('year', 'y');

	    // PARSING

	    addRegexToken('Y',      matchSigned);
	    addRegexToken('YY',     match1to2, match2);
	    addRegexToken('YYYY',   match1to4, match4);
	    addRegexToken('YYYYY',  match1to6, match6);
	    addRegexToken('YYYYYY', match1to6, match6);

	    addParseToken(['YYYYY', 'YYYYYY'], YEAR);
	    addParseToken('YYYY', function (input, array) {
	        array[YEAR] = input.length === 2 ? utils_hooks__hooks.parseTwoDigitYear(input) : toInt(input);
	    });
	    addParseToken('YY', function (input, array) {
	        array[YEAR] = utils_hooks__hooks.parseTwoDigitYear(input);
	    });
	    addParseToken('Y', function (input, array) {
	        array[YEAR] = parseInt(input, 10);
	    });

	    // HELPERS

	    function daysInYear(year) {
	        return isLeapYear(year) ? 366 : 365;
	    }

	    function isLeapYear(year) {
	        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
	    }

	    // HOOKS

	    utils_hooks__hooks.parseTwoDigitYear = function (input) {
	        return toInt(input) + (toInt(input) > 68 ? 1900 : 2000);
	    };

	    // MOMENTS

	    var getSetYear = makeGetSet('FullYear', true);

	    function getIsLeapYear () {
	        return isLeapYear(this.year());
	    }

	    // start-of-first-week - start-of-year
	    function firstWeekOffset(year, dow, doy) {
	        var // first-week day -- which january is always in the first week (4 for iso, 1 for other)
	            fwd = 7 + dow - doy,
	            // first-week day local weekday -- which local weekday is fwd
	            fwdlw = (7 + createUTCDate(year, 0, fwd).getUTCDay() - dow) % 7;

	        return -fwdlw + fwd - 1;
	    }

	    //http://en.wikipedia.org/wiki/ISO_week_date#Calculating_a_date_given_the_year.2C_week_number_and_weekday
	    function dayOfYearFromWeeks(year, week, weekday, dow, doy) {
	        var localWeekday = (7 + weekday - dow) % 7,
	            weekOffset = firstWeekOffset(year, dow, doy),
	            dayOfYear = 1 + 7 * (week - 1) + localWeekday + weekOffset,
	            resYear, resDayOfYear;

	        if (dayOfYear <= 0) {
	            resYear = year - 1;
	            resDayOfYear = daysInYear(resYear) + dayOfYear;
	        } else if (dayOfYear > daysInYear(year)) {
	            resYear = year + 1;
	            resDayOfYear = dayOfYear - daysInYear(year);
	        } else {
	            resYear = year;
	            resDayOfYear = dayOfYear;
	        }

	        return {
	            year: resYear,
	            dayOfYear: resDayOfYear
	        };
	    }

	    function weekOfYear(mom, dow, doy) {
	        var weekOffset = firstWeekOffset(mom.year(), dow, doy),
	            week = Math.floor((mom.dayOfYear() - weekOffset - 1) / 7) + 1,
	            resWeek, resYear;

	        if (week < 1) {
	            resYear = mom.year() - 1;
	            resWeek = week + weeksInYear(resYear, dow, doy);
	        } else if (week > weeksInYear(mom.year(), dow, doy)) {
	            resWeek = week - weeksInYear(mom.year(), dow, doy);
	            resYear = mom.year() + 1;
	        } else {
	            resYear = mom.year();
	            resWeek = week;
	        }

	        return {
	            week: resWeek,
	            year: resYear
	        };
	    }

	    function weeksInYear(year, dow, doy) {
	        var weekOffset = firstWeekOffset(year, dow, doy),
	            weekOffsetNext = firstWeekOffset(year + 1, dow, doy);
	        return (daysInYear(year) - weekOffset + weekOffsetNext) / 7;
	    }

	    // Pick the first defined of two or three arguments.
	    function defaults(a, b, c) {
	        if (a != null) {
	            return a;
	        }
	        if (b != null) {
	            return b;
	        }
	        return c;
	    }

	    function currentDateArray(config) {
	        // hooks is actually the exported moment object
	        var nowValue = new Date(utils_hooks__hooks.now());
	        if (config._useUTC) {
	            return [nowValue.getUTCFullYear(), nowValue.getUTCMonth(), nowValue.getUTCDate()];
	        }
	        return [nowValue.getFullYear(), nowValue.getMonth(), nowValue.getDate()];
	    }

	    // convert an array to a date.
	    // the array should mirror the parameters below
	    // note: all values past the year are optional and will default to the lowest possible value.
	    // [year, month, day , hour, minute, second, millisecond]
	    function configFromArray (config) {
	        var i, date, input = [], currentDate, yearToUse;

	        if (config._d) {
	            return;
	        }

	        currentDate = currentDateArray(config);

	        //compute day of the year from weeks and weekdays
	        if (config._w && config._a[DATE] == null && config._a[MONTH] == null) {
	            dayOfYearFromWeekInfo(config);
	        }

	        //if the day of the year is set, figure out what it is
	        if (config._dayOfYear) {
	            yearToUse = defaults(config._a[YEAR], currentDate[YEAR]);

	            if (config._dayOfYear > daysInYear(yearToUse)) {
	                getParsingFlags(config)._overflowDayOfYear = true;
	            }

	            date = createUTCDate(yearToUse, 0, config._dayOfYear);
	            config._a[MONTH] = date.getUTCMonth();
	            config._a[DATE] = date.getUTCDate();
	        }

	        // Default to current date.
	        // * if no year, month, day of month are given, default to today
	        // * if day of month is given, default month and year
	        // * if month is given, default only year
	        // * if year is given, don't default anything
	        for (i = 0; i < 3 && config._a[i] == null; ++i) {
	            config._a[i] = input[i] = currentDate[i];
	        }

	        // Zero out whatever was not defaulted, including time
	        for (; i < 7; i++) {
	            config._a[i] = input[i] = (config._a[i] == null) ? (i === 2 ? 1 : 0) : config._a[i];
	        }

	        // Check for 24:00:00.000
	        if (config._a[HOUR] === 24 &&
	                config._a[MINUTE] === 0 &&
	                config._a[SECOND] === 0 &&
	                config._a[MILLISECOND] === 0) {
	            config._nextDay = true;
	            config._a[HOUR] = 0;
	        }

	        config._d = (config._useUTC ? createUTCDate : createDate).apply(null, input);
	        // Apply timezone offset from input. The actual utcOffset can be changed
	        // with parseZone.
	        if (config._tzm != null) {
	            config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
	        }

	        if (config._nextDay) {
	            config._a[HOUR] = 24;
	        }
	    }

	    function dayOfYearFromWeekInfo(config) {
	        var w, weekYear, week, weekday, dow, doy, temp, weekdayOverflow;

	        w = config._w;
	        if (w.GG != null || w.W != null || w.E != null) {
	            dow = 1;
	            doy = 4;

	            // TODO: We need to take the current isoWeekYear, but that depends on
	            // how we interpret now (local, utc, fixed offset). So create
	            // a now version of current config (take local/utc/offset flags, and
	            // create now).
	            weekYear = defaults(w.GG, config._a[YEAR], weekOfYear(local__createLocal(), 1, 4).year);
	            week = defaults(w.W, 1);
	            weekday = defaults(w.E, 1);
	            if (weekday < 1 || weekday > 7) {
	                weekdayOverflow = true;
	            }
	        } else {
	            dow = config._locale._week.dow;
	            doy = config._locale._week.doy;

	            weekYear = defaults(w.gg, config._a[YEAR], weekOfYear(local__createLocal(), dow, doy).year);
	            week = defaults(w.w, 1);

	            if (w.d != null) {
	                // weekday -- low day numbers are considered next week
	                weekday = w.d;
	                if (weekday < 0 || weekday > 6) {
	                    weekdayOverflow = true;
	                }
	            } else if (w.e != null) {
	                // local weekday -- counting starts from begining of week
	                weekday = w.e + dow;
	                if (w.e < 0 || w.e > 6) {
	                    weekdayOverflow = true;
	                }
	            } else {
	                // default to begining of week
	                weekday = dow;
	            }
	        }
	        if (week < 1 || week > weeksInYear(weekYear, dow, doy)) {
	            getParsingFlags(config)._overflowWeeks = true;
	        } else if (weekdayOverflow != null) {
	            getParsingFlags(config)._overflowWeekday = true;
	        } else {
	            temp = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy);
	            config._a[YEAR] = temp.year;
	            config._dayOfYear = temp.dayOfYear;
	        }
	    }

	    // constant that refers to the ISO standard
	    utils_hooks__hooks.ISO_8601 = function () {};

	    // date from string and format string
	    function configFromStringAndFormat(config) {
	        // TODO: Move this to another part of the creation flow to prevent circular deps
	        if (config._f === utils_hooks__hooks.ISO_8601) {
	            configFromISO(config);
	            return;
	        }

	        config._a = [];
	        getParsingFlags(config).empty = true;

	        // This array is used to make a Date, either with `new Date` or `Date.UTC`
	        var string = '' + config._i,
	            i, parsedInput, tokens, token, skipped,
	            stringLength = string.length,
	            totalParsedInputLength = 0;

	        tokens = expandFormat(config._f, config._locale).match(formattingTokens) || [];

	        for (i = 0; i < tokens.length; i++) {
	            token = tokens[i];
	            parsedInput = (string.match(getParseRegexForToken(token, config)) || [])[0];
	            // console.log('token', token, 'parsedInput', parsedInput,
	            //         'regex', getParseRegexForToken(token, config));
	            if (parsedInput) {
	                skipped = string.substr(0, string.indexOf(parsedInput));
	                if (skipped.length > 0) {
	                    getParsingFlags(config).unusedInput.push(skipped);
	                }
	                string = string.slice(string.indexOf(parsedInput) + parsedInput.length);
	                totalParsedInputLength += parsedInput.length;
	            }
	            // don't parse if it's not a known token
	            if (formatTokenFunctions[token]) {
	                if (parsedInput) {
	                    getParsingFlags(config).empty = false;
	                }
	                else {
	                    getParsingFlags(config).unusedTokens.push(token);
	                }
	                addTimeToArrayFromToken(token, parsedInput, config);
	            }
	            else if (config._strict && !parsedInput) {
	                getParsingFlags(config).unusedTokens.push(token);
	            }
	        }

	        // add remaining unparsed input length to the string
	        getParsingFlags(config).charsLeftOver = stringLength - totalParsedInputLength;
	        if (string.length > 0) {
	            getParsingFlags(config).unusedInput.push(string);
	        }

	        // clear _12h flag if hour is <= 12
	        if (getParsingFlags(config).bigHour === true &&
	                config._a[HOUR] <= 12 &&
	                config._a[HOUR] > 0) {
	            getParsingFlags(config).bigHour = undefined;
	        }

	        getParsingFlags(config).parsedDateParts = config._a.slice(0);
	        getParsingFlags(config).meridiem = config._meridiem;
	        // handle meridiem
	        config._a[HOUR] = meridiemFixWrap(config._locale, config._a[HOUR], config._meridiem);

	        configFromArray(config);
	        checkOverflow(config);
	    }


	    function meridiemFixWrap (locale, hour, meridiem) {
	        var isPm;

	        if (meridiem == null) {
	            // nothing to do
	            return hour;
	        }
	        if (locale.meridiemHour != null) {
	            return locale.meridiemHour(hour, meridiem);
	        } else if (locale.isPM != null) {
	            // Fallback
	            isPm = locale.isPM(meridiem);
	            if (isPm && hour < 12) {
	                hour += 12;
	            }
	            if (!isPm && hour === 12) {
	                hour = 0;
	            }
	            return hour;
	        } else {
	            // this is not supposed to happen
	            return hour;
	        }
	    }

	    // date from string and array of format strings
	    function configFromStringAndArray(config) {
	        var tempConfig,
	            bestMoment,

	            scoreToBeat,
	            i,
	            currentScore;

	        if (config._f.length === 0) {
	            getParsingFlags(config).invalidFormat = true;
	            config._d = new Date(NaN);
	            return;
	        }

	        for (i = 0; i < config._f.length; i++) {
	            currentScore = 0;
	            tempConfig = copyConfig({}, config);
	            if (config._useUTC != null) {
	                tempConfig._useUTC = config._useUTC;
	            }
	            tempConfig._f = config._f[i];
	            configFromStringAndFormat(tempConfig);

	            if (!valid__isValid(tempConfig)) {
	                continue;
	            }

	            // if there is any input that was not parsed add a penalty for that format
	            currentScore += getParsingFlags(tempConfig).charsLeftOver;

	            //or tokens
	            currentScore += getParsingFlags(tempConfig).unusedTokens.length * 10;

	            getParsingFlags(tempConfig).score = currentScore;

	            if (scoreToBeat == null || currentScore < scoreToBeat) {
	                scoreToBeat = currentScore;
	                bestMoment = tempConfig;
	            }
	        }

	        extend(config, bestMoment || tempConfig);
	    }

	    function configFromObject(config) {
	        if (config._d) {
	            return;
	        }

	        var i = normalizeObjectUnits(config._i);
	        config._a = map([i.year, i.month, i.day || i.date, i.hour, i.minute, i.second, i.millisecond], function (obj) {
	            return obj && parseInt(obj, 10);
	        });

	        configFromArray(config);
	    }

	    function createFromConfig (config) {
	        var res = new Moment(checkOverflow(prepareConfig(config)));
	        if (res._nextDay) {
	            // Adding is smart enough around DST
	            res.add(1, 'd');
	            res._nextDay = undefined;
	        }

	        return res;
	    }

	    function prepareConfig (config) {
	        var input = config._i,
	            format = config._f;

	        config._locale = config._locale || locale_locales__getLocale(config._l);

	        if (input === null || (format === undefined && input === '')) {
	            return valid__createInvalid({nullInput: true});
	        }

	        if (typeof input === 'string') {
	            config._i = input = config._locale.preparse(input);
	        }

	        if (isMoment(input)) {
	            return new Moment(checkOverflow(input));
	        } else if (isArray(format)) {
	            configFromStringAndArray(config);
	        } else if (format) {
	            configFromStringAndFormat(config);
	        } else if (isDate(input)) {
	            config._d = input;
	        } else {
	            configFromInput(config);
	        }

	        if (!valid__isValid(config)) {
	            config._d = null;
	        }

	        return config;
	    }

	    function configFromInput(config) {
	        var input = config._i;
	        if (input === undefined) {
	            config._d = new Date(utils_hooks__hooks.now());
	        } else if (isDate(input)) {
	            config._d = new Date(input.valueOf());
	        } else if (typeof input === 'string') {
	            configFromString(config);
	        } else if (isArray(input)) {
	            config._a = map(input.slice(0), function (obj) {
	                return parseInt(obj, 10);
	            });
	            configFromArray(config);
	        } else if (typeof(input) === 'object') {
	            configFromObject(config);
	        } else if (typeof(input) === 'number') {
	            // from milliseconds
	            config._d = new Date(input);
	        } else {
	            utils_hooks__hooks.createFromInputFallback(config);
	        }
	    }

	    function createLocalOrUTC (input, format, locale, strict, isUTC) {
	        var c = {};

	        if (typeof(locale) === 'boolean') {
	            strict = locale;
	            locale = undefined;
	        }
	        // object construction must be done this way.
	        // https://github.com/moment/moment/issues/1423
	        c._isAMomentObject = true;
	        c._useUTC = c._isUTC = isUTC;
	        c._l = locale;
	        c._i = input;
	        c._f = format;
	        c._strict = strict;

	        return createFromConfig(c);
	    }

	    function local__createLocal (input, format, locale, strict) {
	        return createLocalOrUTC(input, format, locale, strict, false);
	    }

	    var prototypeMin = deprecate(
	         'moment().min is deprecated, use moment.max instead. https://github.com/moment/moment/issues/1548',
	         function () {
	             var other = local__createLocal.apply(null, arguments);
	             if (this.isValid() && other.isValid()) {
	                 return other < this ? this : other;
	             } else {
	                 return valid__createInvalid();
	             }
	         }
	     );

	    var prototypeMax = deprecate(
	        'moment().max is deprecated, use moment.min instead. https://github.com/moment/moment/issues/1548',
	        function () {
	            var other = local__createLocal.apply(null, arguments);
	            if (this.isValid() && other.isValid()) {
	                return other > this ? this : other;
	            } else {
	                return valid__createInvalid();
	            }
	        }
	    );

	    // Pick a moment m from moments so that m[fn](other) is true for all
	    // other. This relies on the function fn to be transitive.
	    //
	    // moments should either be an array of moment objects or an array, whose
	    // first element is an array of moment objects.
	    function pickBy(fn, moments) {
	        var res, i;
	        if (moments.length === 1 && isArray(moments[0])) {
	            moments = moments[0];
	        }
	        if (!moments.length) {
	            return local__createLocal();
	        }
	        res = moments[0];
	        for (i = 1; i < moments.length; ++i) {
	            if (!moments[i].isValid() || moments[i][fn](res)) {
	                res = moments[i];
	            }
	        }
	        return res;
	    }

	    // TODO: Use [].sort instead?
	    function min () {
	        var args = [].slice.call(arguments, 0);

	        return pickBy('isBefore', args);
	    }

	    function max () {
	        var args = [].slice.call(arguments, 0);

	        return pickBy('isAfter', args);
	    }

	    var now = function () {
	        return Date.now ? Date.now() : +(new Date());
	    };

	    function Duration (duration) {
	        var normalizedInput = normalizeObjectUnits(duration),
	            years = normalizedInput.year || 0,
	            quarters = normalizedInput.quarter || 0,
	            months = normalizedInput.month || 0,
	            weeks = normalizedInput.week || 0,
	            days = normalizedInput.day || 0,
	            hours = normalizedInput.hour || 0,
	            minutes = normalizedInput.minute || 0,
	            seconds = normalizedInput.second || 0,
	            milliseconds = normalizedInput.millisecond || 0;

	        // representation for dateAddRemove
	        this._milliseconds = +milliseconds +
	            seconds * 1e3 + // 1000
	            minutes * 6e4 + // 1000 * 60
	            hours * 1000 * 60 * 60; //using 1000 * 60 * 60 instead of 36e5 to avoid floating point rounding errors https://github.com/moment/moment/issues/2978
	        // Because of dateAddRemove treats 24 hours as different from a
	        // day when working around DST, we need to store them separately
	        this._days = +days +
	            weeks * 7;
	        // It is impossible translate months into days without knowing
	        // which months you are are talking about, so we have to store
	        // it separately.
	        this._months = +months +
	            quarters * 3 +
	            years * 12;

	        this._data = {};

	        this._locale = locale_locales__getLocale();

	        this._bubble();
	    }

	    function isDuration (obj) {
	        return obj instanceof Duration;
	    }

	    // FORMATTING

	    function offset (token, separator) {
	        addFormatToken(token, 0, 0, function () {
	            var offset = this.utcOffset();
	            var sign = '+';
	            if (offset < 0) {
	                offset = -offset;
	                sign = '-';
	            }
	            return sign + zeroFill(~~(offset / 60), 2) + separator + zeroFill(~~(offset) % 60, 2);
	        });
	    }

	    offset('Z', ':');
	    offset('ZZ', '');

	    // PARSING

	    addRegexToken('Z',  matchShortOffset);
	    addRegexToken('ZZ', matchShortOffset);
	    addParseToken(['Z', 'ZZ'], function (input, array, config) {
	        config._useUTC = true;
	        config._tzm = offsetFromString(matchShortOffset, input);
	    });

	    // HELPERS

	    // timezone chunker
	    // '+10:00' > ['10',  '00']
	    // '-1530'  > ['-15', '30']
	    var chunkOffset = /([\+\-]|\d\d)/gi;

	    function offsetFromString(matcher, string) {
	        var matches = ((string || '').match(matcher) || []);
	        var chunk   = matches[matches.length - 1] || [];
	        var parts   = (chunk + '').match(chunkOffset) || ['-', 0, 0];
	        var minutes = +(parts[1] * 60) + toInt(parts[2]);

	        return parts[0] === '+' ? minutes : -minutes;
	    }

	    // Return a moment from input, that is local/utc/zone equivalent to model.
	    function cloneWithOffset(input, model) {
	        var res, diff;
	        if (model._isUTC) {
	            res = model.clone();
	            diff = (isMoment(input) || isDate(input) ? input.valueOf() : local__createLocal(input).valueOf()) - res.valueOf();
	            // Use low-level api, because this fn is low-level api.
	            res._d.setTime(res._d.valueOf() + diff);
	            utils_hooks__hooks.updateOffset(res, false);
	            return res;
	        } else {
	            return local__createLocal(input).local();
	        }
	    }

	    function getDateOffset (m) {
	        // On Firefox.24 Date#getTimezoneOffset returns a floating point.
	        // https://github.com/moment/moment/pull/1871
	        return -Math.round(m._d.getTimezoneOffset() / 15) * 15;
	    }

	    // HOOKS

	    // This function will be called whenever a moment is mutated.
	    // It is intended to keep the offset in sync with the timezone.
	    utils_hooks__hooks.updateOffset = function () {};

	    // MOMENTS

	    // keepLocalTime = true means only change the timezone, without
	    // affecting the local hour. So 5:31:26 +0300 --[utcOffset(2, true)]-->
	    // 5:31:26 +0200 It is possible that 5:31:26 doesn't exist with offset
	    // +0200, so we adjust the time as needed, to be valid.
	    //
	    // Keeping the time actually adds/subtracts (one hour)
	    // from the actual represented time. That is why we call updateOffset
	    // a second time. In case it wants us to change the offset again
	    // _changeInProgress == true case, then we have to adjust, because
	    // there is no such time in the given timezone.
	    function getSetOffset (input, keepLocalTime) {
	        var offset = this._offset || 0,
	            localAdjust;
	        if (!this.isValid()) {
	            return input != null ? this : NaN;
	        }
	        if (input != null) {
	            if (typeof input === 'string') {
	                input = offsetFromString(matchShortOffset, input);
	            } else if (Math.abs(input) < 16) {
	                input = input * 60;
	            }
	            if (!this._isUTC && keepLocalTime) {
	                localAdjust = getDateOffset(this);
	            }
	            this._offset = input;
	            this._isUTC = true;
	            if (localAdjust != null) {
	                this.add(localAdjust, 'm');
	            }
	            if (offset !== input) {
	                if (!keepLocalTime || this._changeInProgress) {
	                    add_subtract__addSubtract(this, create__createDuration(input - offset, 'm'), 1, false);
	                } else if (!this._changeInProgress) {
	                    this._changeInProgress = true;
	                    utils_hooks__hooks.updateOffset(this, true);
	                    this._changeInProgress = null;
	                }
	            }
	            return this;
	        } else {
	            return this._isUTC ? offset : getDateOffset(this);
	        }
	    }

	    function getSetZone (input, keepLocalTime) {
	        if (input != null) {
	            if (typeof input !== 'string') {
	                input = -input;
	            }

	            this.utcOffset(input, keepLocalTime);

	            return this;
	        } else {
	            return -this.utcOffset();
	        }
	    }

	    function setOffsetToUTC (keepLocalTime) {
	        return this.utcOffset(0, keepLocalTime);
	    }

	    function setOffsetToLocal (keepLocalTime) {
	        if (this._isUTC) {
	            this.utcOffset(0, keepLocalTime);
	            this._isUTC = false;

	            if (keepLocalTime) {
	                this.subtract(getDateOffset(this), 'm');
	            }
	        }
	        return this;
	    }

	    function setOffsetToParsedOffset () {
	        if (this._tzm) {
	            this.utcOffset(this._tzm);
	        } else if (typeof this._i === 'string') {
	            this.utcOffset(offsetFromString(matchOffset, this._i));
	        }
	        return this;
	    }

	    function hasAlignedHourOffset (input) {
	        if (!this.isValid()) {
	            return false;
	        }
	        input = input ? local__createLocal(input).utcOffset() : 0;

	        return (this.utcOffset() - input) % 60 === 0;
	    }

	    function isDaylightSavingTime () {
	        return (
	            this.utcOffset() > this.clone().month(0).utcOffset() ||
	            this.utcOffset() > this.clone().month(5).utcOffset()
	        );
	    }

	    function isDaylightSavingTimeShifted () {
	        if (!isUndefined(this._isDSTShifted)) {
	            return this._isDSTShifted;
	        }

	        var c = {};

	        copyConfig(c, this);
	        c = prepareConfig(c);

	        if (c._a) {
	            var other = c._isUTC ? create_utc__createUTC(c._a) : local__createLocal(c._a);
	            this._isDSTShifted = this.isValid() &&
	                compareArrays(c._a, other.toArray()) > 0;
	        } else {
	            this._isDSTShifted = false;
	        }

	        return this._isDSTShifted;
	    }

	    function isLocal () {
	        return this.isValid() ? !this._isUTC : false;
	    }

	    function isUtcOffset () {
	        return this.isValid() ? this._isUTC : false;
	    }

	    function isUtc () {
	        return this.isValid() ? this._isUTC && this._offset === 0 : false;
	    }

	    // ASP.NET json date format regex
	    var aspNetRegex = /^(\-)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?\d*)?$/;

	    // from http://docs.closure-library.googlecode.com/git/closure_goog_date_date.js.source.html
	    // somewhat more in line with 4.4.3.2 2004 spec, but allows decimal anywhere
	    // and further modified to allow for strings containing both week and day
	    var isoRegex = /^(-)?P(?:(-?[0-9,.]*)Y)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)W)?(?:(-?[0-9,.]*)D)?(?:T(?:(-?[0-9,.]*)H)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)S)?)?$/;

	    function create__createDuration (input, key) {
	        var duration = input,
	            // matching against regexp is expensive, do it on demand
	            match = null,
	            sign,
	            ret,
	            diffRes;

	        if (isDuration(input)) {
	            duration = {
	                ms : input._milliseconds,
	                d  : input._days,
	                M  : input._months
	            };
	        } else if (typeof input === 'number') {
	            duration = {};
	            if (key) {
	                duration[key] = input;
	            } else {
	                duration.milliseconds = input;
	            }
	        } else if (!!(match = aspNetRegex.exec(input))) {
	            sign = (match[1] === '-') ? -1 : 1;
	            duration = {
	                y  : 0,
	                d  : toInt(match[DATE])        * sign,
	                h  : toInt(match[HOUR])        * sign,
	                m  : toInt(match[MINUTE])      * sign,
	                s  : toInt(match[SECOND])      * sign,
	                ms : toInt(match[MILLISECOND]) * sign
	            };
	        } else if (!!(match = isoRegex.exec(input))) {
	            sign = (match[1] === '-') ? -1 : 1;
	            duration = {
	                y : parseIso(match[2], sign),
	                M : parseIso(match[3], sign),
	                w : parseIso(match[4], sign),
	                d : parseIso(match[5], sign),
	                h : parseIso(match[6], sign),
	                m : parseIso(match[7], sign),
	                s : parseIso(match[8], sign)
	            };
	        } else if (duration == null) {// checks for null or undefined
	            duration = {};
	        } else if (typeof duration === 'object' && ('from' in duration || 'to' in duration)) {
	            diffRes = momentsDifference(local__createLocal(duration.from), local__createLocal(duration.to));

	            duration = {};
	            duration.ms = diffRes.milliseconds;
	            duration.M = diffRes.months;
	        }

	        ret = new Duration(duration);

	        if (isDuration(input) && hasOwnProp(input, '_locale')) {
	            ret._locale = input._locale;
	        }

	        return ret;
	    }

	    create__createDuration.fn = Duration.prototype;

	    function parseIso (inp, sign) {
	        // We'd normally use ~~inp for this, but unfortunately it also
	        // converts floats to ints.
	        // inp may be undefined, so careful calling replace on it.
	        var res = inp && parseFloat(inp.replace(',', '.'));
	        // apply sign while we're at it
	        return (isNaN(res) ? 0 : res) * sign;
	    }

	    function positiveMomentsDifference(base, other) {
	        var res = {milliseconds: 0, months: 0};

	        res.months = other.month() - base.month() +
	            (other.year() - base.year()) * 12;
	        if (base.clone().add(res.months, 'M').isAfter(other)) {
	            --res.months;
	        }

	        res.milliseconds = +other - +(base.clone().add(res.months, 'M'));

	        return res;
	    }

	    function momentsDifference(base, other) {
	        var res;
	        if (!(base.isValid() && other.isValid())) {
	            return {milliseconds: 0, months: 0};
	        }

	        other = cloneWithOffset(other, base);
	        if (base.isBefore(other)) {
	            res = positiveMomentsDifference(base, other);
	        } else {
	            res = positiveMomentsDifference(other, base);
	            res.milliseconds = -res.milliseconds;
	            res.months = -res.months;
	        }

	        return res;
	    }

	    function absRound (number) {
	        if (number < 0) {
	            return Math.round(-1 * number) * -1;
	        } else {
	            return Math.round(number);
	        }
	    }

	    // TODO: remove 'name' arg after deprecation is removed
	    function createAdder(direction, name) {
	        return function (val, period) {
	            var dur, tmp;
	            //invert the arguments, but complain about it
	            if (period !== null && !isNaN(+period)) {
	                deprecateSimple(name, 'moment().' + name  + '(period, number) is deprecated. Please use moment().' + name + '(number, period).');
	                tmp = val; val = period; period = tmp;
	            }

	            val = typeof val === 'string' ? +val : val;
	            dur = create__createDuration(val, period);
	            add_subtract__addSubtract(this, dur, direction);
	            return this;
	        };
	    }

	    function add_subtract__addSubtract (mom, duration, isAdding, updateOffset) {
	        var milliseconds = duration._milliseconds,
	            days = absRound(duration._days),
	            months = absRound(duration._months);

	        if (!mom.isValid()) {
	            // No op
	            return;
	        }

	        updateOffset = updateOffset == null ? true : updateOffset;

	        if (milliseconds) {
	            mom._d.setTime(mom._d.valueOf() + milliseconds * isAdding);
	        }
	        if (days) {
	            get_set__set(mom, 'Date', get_set__get(mom, 'Date') + days * isAdding);
	        }
	        if (months) {
	            setMonth(mom, get_set__get(mom, 'Month') + months * isAdding);
	        }
	        if (updateOffset) {
	            utils_hooks__hooks.updateOffset(mom, days || months);
	        }
	    }

	    var add_subtract__add      = createAdder(1, 'add');
	    var add_subtract__subtract = createAdder(-1, 'subtract');

	    function moment_calendar__calendar (time, formats) {
	        // We want to compare the start of today, vs this.
	        // Getting start-of-today depends on whether we're local/utc/offset or not.
	        var now = time || local__createLocal(),
	            sod = cloneWithOffset(now, this).startOf('day'),
	            diff = this.diff(sod, 'days', true),
	            format = diff < -6 ? 'sameElse' :
	                diff < -1 ? 'lastWeek' :
	                diff < 0 ? 'lastDay' :
	                diff < 1 ? 'sameDay' :
	                diff < 2 ? 'nextDay' :
	                diff < 7 ? 'nextWeek' : 'sameElse';

	        var output = formats && (isFunction(formats[format]) ? formats[format]() : formats[format]);

	        return this.format(output || this.localeData().calendar(format, this, local__createLocal(now)));
	    }

	    function clone () {
	        return new Moment(this);
	    }

	    function isAfter (input, units) {
	        var localInput = isMoment(input) ? input : local__createLocal(input);
	        if (!(this.isValid() && localInput.isValid())) {
	            return false;
	        }
	        units = normalizeUnits(!isUndefined(units) ? units : 'millisecond');
	        if (units === 'millisecond') {
	            return this.valueOf() > localInput.valueOf();
	        } else {
	            return localInput.valueOf() < this.clone().startOf(units).valueOf();
	        }
	    }

	    function isBefore (input, units) {
	        var localInput = isMoment(input) ? input : local__createLocal(input);
	        if (!(this.isValid() && localInput.isValid())) {
	            return false;
	        }
	        units = normalizeUnits(!isUndefined(units) ? units : 'millisecond');
	        if (units === 'millisecond') {
	            return this.valueOf() < localInput.valueOf();
	        } else {
	            return this.clone().endOf(units).valueOf() < localInput.valueOf();
	        }
	    }

	    function isBetween (from, to, units, inclusivity) {
	        inclusivity = inclusivity || '()';
	        return (inclusivity[0] === '(' ? this.isAfter(from, units) : !this.isBefore(from, units)) &&
	            (inclusivity[1] === ')' ? this.isBefore(to, units) : !this.isAfter(to, units));
	    }

	    function isSame (input, units) {
	        var localInput = isMoment(input) ? input : local__createLocal(input),
	            inputMs;
	        if (!(this.isValid() && localInput.isValid())) {
	            return false;
	        }
	        units = normalizeUnits(units || 'millisecond');
	        if (units === 'millisecond') {
	            return this.valueOf() === localInput.valueOf();
	        } else {
	            inputMs = localInput.valueOf();
	            return this.clone().startOf(units).valueOf() <= inputMs && inputMs <= this.clone().endOf(units).valueOf();
	        }
	    }

	    function isSameOrAfter (input, units) {
	        return this.isSame(input, units) || this.isAfter(input,units);
	    }

	    function isSameOrBefore (input, units) {
	        return this.isSame(input, units) || this.isBefore(input,units);
	    }

	    function diff (input, units, asFloat) {
	        var that,
	            zoneDelta,
	            delta, output;

	        if (!this.isValid()) {
	            return NaN;
	        }

	        that = cloneWithOffset(input, this);

	        if (!that.isValid()) {
	            return NaN;
	        }

	        zoneDelta = (that.utcOffset() - this.utcOffset()) * 6e4;

	        units = normalizeUnits(units);

	        if (units === 'year' || units === 'month' || units === 'quarter') {
	            output = monthDiff(this, that);
	            if (units === 'quarter') {
	                output = output / 3;
	            } else if (units === 'year') {
	                output = output / 12;
	            }
	        } else {
	            delta = this - that;
	            output = units === 'second' ? delta / 1e3 : // 1000
	                units === 'minute' ? delta / 6e4 : // 1000 * 60
	                units === 'hour' ? delta / 36e5 : // 1000 * 60 * 60
	                units === 'day' ? (delta - zoneDelta) / 864e5 : // 1000 * 60 * 60 * 24, negate dst
	                units === 'week' ? (delta - zoneDelta) / 6048e5 : // 1000 * 60 * 60 * 24 * 7, negate dst
	                delta;
	        }
	        return asFloat ? output : absFloor(output);
	    }

	    function monthDiff (a, b) {
	        // difference in months
	        var wholeMonthDiff = ((b.year() - a.year()) * 12) + (b.month() - a.month()),
	            // b is in (anchor - 1 month, anchor + 1 month)
	            anchor = a.clone().add(wholeMonthDiff, 'months'),
	            anchor2, adjust;

	        if (b - anchor < 0) {
	            anchor2 = a.clone().add(wholeMonthDiff - 1, 'months');
	            // linear across the month
	            adjust = (b - anchor) / (anchor - anchor2);
	        } else {
	            anchor2 = a.clone().add(wholeMonthDiff + 1, 'months');
	            // linear across the month
	            adjust = (b - anchor) / (anchor2 - anchor);
	        }

	        //check for negative zero, return zero if negative zero
	        return -(wholeMonthDiff + adjust) || 0;
	    }

	    utils_hooks__hooks.defaultFormat = 'YYYY-MM-DDTHH:mm:ssZ';
	    utils_hooks__hooks.defaultFormatUtc = 'YYYY-MM-DDTHH:mm:ss[Z]';

	    function toString () {
	        return this.clone().locale('en').format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
	    }

	    function moment_format__toISOString () {
	        var m = this.clone().utc();
	        if (0 < m.year() && m.year() <= 9999) {
	            if (isFunction(Date.prototype.toISOString)) {
	                // native implementation is ~50x faster, use it when we can
	                return this.toDate().toISOString();
	            } else {
	                return formatMoment(m, 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
	            }
	        } else {
	            return formatMoment(m, 'YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
	        }
	    }

	    function format (inputString) {
	        if (!inputString) {
	            inputString = this.isUtc() ? utils_hooks__hooks.defaultFormatUtc : utils_hooks__hooks.defaultFormat;
	        }
	        var output = formatMoment(this, inputString);
	        return this.localeData().postformat(output);
	    }

	    function from (time, withoutSuffix) {
	        if (this.isValid() &&
	                ((isMoment(time) && time.isValid()) ||
	                 local__createLocal(time).isValid())) {
	            return create__createDuration({to: this, from: time}).locale(this.locale()).humanize(!withoutSuffix);
	        } else {
	            return this.localeData().invalidDate();
	        }
	    }

	    function fromNow (withoutSuffix) {
	        return this.from(local__createLocal(), withoutSuffix);
	    }

	    function to (time, withoutSuffix) {
	        if (this.isValid() &&
	                ((isMoment(time) && time.isValid()) ||
	                 local__createLocal(time).isValid())) {
	            return create__createDuration({from: this, to: time}).locale(this.locale()).humanize(!withoutSuffix);
	        } else {
	            return this.localeData().invalidDate();
	        }
	    }

	    function toNow (withoutSuffix) {
	        return this.to(local__createLocal(), withoutSuffix);
	    }

	    // If passed a locale key, it will set the locale for this
	    // instance.  Otherwise, it will return the locale configuration
	    // variables for this instance.
	    function locale (key) {
	        var newLocaleData;

	        if (key === undefined) {
	            return this._locale._abbr;
	        } else {
	            newLocaleData = locale_locales__getLocale(key);
	            if (newLocaleData != null) {
	                this._locale = newLocaleData;
	            }
	            return this;
	        }
	    }

	    var lang = deprecate(
	        'moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.',
	        function (key) {
	            if (key === undefined) {
	                return this.localeData();
	            } else {
	                return this.locale(key);
	            }
	        }
	    );

	    function localeData () {
	        return this._locale;
	    }

	    function startOf (units) {
	        units = normalizeUnits(units);
	        // the following switch intentionally omits break keywords
	        // to utilize falling through the cases.
	        switch (units) {
	        case 'year':
	            this.month(0);
	            /* falls through */
	        case 'quarter':
	        case 'month':
	            this.date(1);
	            /* falls through */
	        case 'week':
	        case 'isoWeek':
	        case 'day':
	        case 'date':
	            this.hours(0);
	            /* falls through */
	        case 'hour':
	            this.minutes(0);
	            /* falls through */
	        case 'minute':
	            this.seconds(0);
	            /* falls through */
	        case 'second':
	            this.milliseconds(0);
	        }

	        // weeks are a special case
	        if (units === 'week') {
	            this.weekday(0);
	        }
	        if (units === 'isoWeek') {
	            this.isoWeekday(1);
	        }

	        // quarters are also special
	        if (units === 'quarter') {
	            this.month(Math.floor(this.month() / 3) * 3);
	        }

	        return this;
	    }

	    function endOf (units) {
	        units = normalizeUnits(units);
	        if (units === undefined || units === 'millisecond') {
	            return this;
	        }

	        // 'date' is an alias for 'day', so it should be considered as such.
	        if (units === 'date') {
	            units = 'day';
	        }

	        return this.startOf(units).add(1, (units === 'isoWeek' ? 'week' : units)).subtract(1, 'ms');
	    }

	    function to_type__valueOf () {
	        return this._d.valueOf() - ((this._offset || 0) * 60000);
	    }

	    function unix () {
	        return Math.floor(this.valueOf() / 1000);
	    }

	    function toDate () {
	        return this._offset ? new Date(this.valueOf()) : this._d;
	    }

	    function toArray () {
	        var m = this;
	        return [m.year(), m.month(), m.date(), m.hour(), m.minute(), m.second(), m.millisecond()];
	    }

	    function toObject () {
	        var m = this;
	        return {
	            years: m.year(),
	            months: m.month(),
	            date: m.date(),
	            hours: m.hours(),
	            minutes: m.minutes(),
	            seconds: m.seconds(),
	            milliseconds: m.milliseconds()
	        };
	    }

	    function toJSON () {
	        // new Date(NaN).toJSON() === null
	        return this.isValid() ? this.toISOString() : null;
	    }

	    function moment_valid__isValid () {
	        return valid__isValid(this);
	    }

	    function parsingFlags () {
	        return extend({}, getParsingFlags(this));
	    }

	    function invalidAt () {
	        return getParsingFlags(this).overflow;
	    }

	    function creationData() {
	        return {
	            input: this._i,
	            format: this._f,
	            locale: this._locale,
	            isUTC: this._isUTC,
	            strict: this._strict
	        };
	    }

	    // FORMATTING

	    addFormatToken(0, ['gg', 2], 0, function () {
	        return this.weekYear() % 100;
	    });

	    addFormatToken(0, ['GG', 2], 0, function () {
	        return this.isoWeekYear() % 100;
	    });

	    function addWeekYearFormatToken (token, getter) {
	        addFormatToken(0, [token, token.length], 0, getter);
	    }

	    addWeekYearFormatToken('gggg',     'weekYear');
	    addWeekYearFormatToken('ggggg',    'weekYear');
	    addWeekYearFormatToken('GGGG',  'isoWeekYear');
	    addWeekYearFormatToken('GGGGG', 'isoWeekYear');

	    // ALIASES

	    addUnitAlias('weekYear', 'gg');
	    addUnitAlias('isoWeekYear', 'GG');

	    // PARSING

	    addRegexToken('G',      matchSigned);
	    addRegexToken('g',      matchSigned);
	    addRegexToken('GG',     match1to2, match2);
	    addRegexToken('gg',     match1to2, match2);
	    addRegexToken('GGGG',   match1to4, match4);
	    addRegexToken('gggg',   match1to4, match4);
	    addRegexToken('GGGGG',  match1to6, match6);
	    addRegexToken('ggggg',  match1to6, match6);

	    addWeekParseToken(['gggg', 'ggggg', 'GGGG', 'GGGGG'], function (input, week, config, token) {
	        week[token.substr(0, 2)] = toInt(input);
	    });

	    addWeekParseToken(['gg', 'GG'], function (input, week, config, token) {
	        week[token] = utils_hooks__hooks.parseTwoDigitYear(input);
	    });

	    // MOMENTS

	    function getSetWeekYear (input) {
	        return getSetWeekYearHelper.call(this,
	                input,
	                this.week(),
	                this.weekday(),
	                this.localeData()._week.dow,
	                this.localeData()._week.doy);
	    }

	    function getSetISOWeekYear (input) {
	        return getSetWeekYearHelper.call(this,
	                input, this.isoWeek(), this.isoWeekday(), 1, 4);
	    }

	    function getISOWeeksInYear () {
	        return weeksInYear(this.year(), 1, 4);
	    }

	    function getWeeksInYear () {
	        var weekInfo = this.localeData()._week;
	        return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy);
	    }

	    function getSetWeekYearHelper(input, week, weekday, dow, doy) {
	        var weeksTarget;
	        if (input == null) {
	            return weekOfYear(this, dow, doy).year;
	        } else {
	            weeksTarget = weeksInYear(input, dow, doy);
	            if (week > weeksTarget) {
	                week = weeksTarget;
	            }
	            return setWeekAll.call(this, input, week, weekday, dow, doy);
	        }
	    }

	    function setWeekAll(weekYear, week, weekday, dow, doy) {
	        var dayOfYearData = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy),
	            date = createUTCDate(dayOfYearData.year, 0, dayOfYearData.dayOfYear);

	        this.year(date.getUTCFullYear());
	        this.month(date.getUTCMonth());
	        this.date(date.getUTCDate());
	        return this;
	    }

	    // FORMATTING

	    addFormatToken('Q', 0, 'Qo', 'quarter');

	    // ALIASES

	    addUnitAlias('quarter', 'Q');

	    // PARSING

	    addRegexToken('Q', match1);
	    addParseToken('Q', function (input, array) {
	        array[MONTH] = (toInt(input) - 1) * 3;
	    });

	    // MOMENTS

	    function getSetQuarter (input) {
	        return input == null ? Math.ceil((this.month() + 1) / 3) : this.month((input - 1) * 3 + this.month() % 3);
	    }

	    // FORMATTING

	    addFormatToken('w', ['ww', 2], 'wo', 'week');
	    addFormatToken('W', ['WW', 2], 'Wo', 'isoWeek');

	    // ALIASES

	    addUnitAlias('week', 'w');
	    addUnitAlias('isoWeek', 'W');

	    // PARSING

	    addRegexToken('w',  match1to2);
	    addRegexToken('ww', match1to2, match2);
	    addRegexToken('W',  match1to2);
	    addRegexToken('WW', match1to2, match2);

	    addWeekParseToken(['w', 'ww', 'W', 'WW'], function (input, week, config, token) {
	        week[token.substr(0, 1)] = toInt(input);
	    });

	    // HELPERS

	    // LOCALES

	    function localeWeek (mom) {
	        return weekOfYear(mom, this._week.dow, this._week.doy).week;
	    }

	    var defaultLocaleWeek = {
	        dow : 0, // Sunday is the first day of the week.
	        doy : 6  // The week that contains Jan 1st is the first week of the year.
	    };

	    function localeFirstDayOfWeek () {
	        return this._week.dow;
	    }

	    function localeFirstDayOfYear () {
	        return this._week.doy;
	    }

	    // MOMENTS

	    function getSetWeek (input) {
	        var week = this.localeData().week(this);
	        return input == null ? week : this.add((input - week) * 7, 'd');
	    }

	    function getSetISOWeek (input) {
	        var week = weekOfYear(this, 1, 4).week;
	        return input == null ? week : this.add((input - week) * 7, 'd');
	    }

	    // FORMATTING

	    addFormatToken('D', ['DD', 2], 'Do', 'date');

	    // ALIASES

	    addUnitAlias('date', 'D');

	    // PARSING

	    addRegexToken('D',  match1to2);
	    addRegexToken('DD', match1to2, match2);
	    addRegexToken('Do', function (isStrict, locale) {
	        return isStrict ? locale._ordinalParse : locale._ordinalParseLenient;
	    });

	    addParseToken(['D', 'DD'], DATE);
	    addParseToken('Do', function (input, array) {
	        array[DATE] = toInt(input.match(match1to2)[0], 10);
	    });

	    // MOMENTS

	    var getSetDayOfMonth = makeGetSet('Date', true);

	    // FORMATTING

	    addFormatToken('d', 0, 'do', 'day');

	    addFormatToken('dd', 0, 0, function (format) {
	        return this.localeData().weekdaysMin(this, format);
	    });

	    addFormatToken('ddd', 0, 0, function (format) {
	        return this.localeData().weekdaysShort(this, format);
	    });

	    addFormatToken('dddd', 0, 0, function (format) {
	        return this.localeData().weekdays(this, format);
	    });

	    addFormatToken('e', 0, 0, 'weekday');
	    addFormatToken('E', 0, 0, 'isoWeekday');

	    // ALIASES

	    addUnitAlias('day', 'd');
	    addUnitAlias('weekday', 'e');
	    addUnitAlias('isoWeekday', 'E');

	    // PARSING

	    addRegexToken('d',    match1to2);
	    addRegexToken('e',    match1to2);
	    addRegexToken('E',    match1to2);
	    addRegexToken('dd',   function (isStrict, locale) {
	        return locale.weekdaysMinRegex(isStrict);
	    });
	    addRegexToken('ddd',   function (isStrict, locale) {
	        return locale.weekdaysShortRegex(isStrict);
	    });
	    addRegexToken('dddd',   function (isStrict, locale) {
	        return locale.weekdaysRegex(isStrict);
	    });

	    addWeekParseToken(['dd', 'ddd', 'dddd'], function (input, week, config, token) {
	        var weekday = config._locale.weekdaysParse(input, token, config._strict);
	        // if we didn't get a weekday name, mark the date as invalid
	        if (weekday != null) {
	            week.d = weekday;
	        } else {
	            getParsingFlags(config).invalidWeekday = input;
	        }
	    });

	    addWeekParseToken(['d', 'e', 'E'], function (input, week, config, token) {
	        week[token] = toInt(input);
	    });

	    // HELPERS

	    function parseWeekday(input, locale) {
	        if (typeof input !== 'string') {
	            return input;
	        }

	        if (!isNaN(input)) {
	            return parseInt(input, 10);
	        }

	        input = locale.weekdaysParse(input);
	        if (typeof input === 'number') {
	            return input;
	        }

	        return null;
	    }

	    // LOCALES

	    var defaultLocaleWeekdays = 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_');
	    function localeWeekdays (m, format) {
	        return isArray(this._weekdays) ? this._weekdays[m.day()] :
	            this._weekdays[this._weekdays.isFormat.test(format) ? 'format' : 'standalone'][m.day()];
	    }

	    var defaultLocaleWeekdaysShort = 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_');
	    function localeWeekdaysShort (m) {
	        return this._weekdaysShort[m.day()];
	    }

	    var defaultLocaleWeekdaysMin = 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_');
	    function localeWeekdaysMin (m) {
	        return this._weekdaysMin[m.day()];
	    }

	    function day_of_week__handleStrictParse(weekdayName, format, strict) {
	        var i, ii, mom, llc = weekdayName.toLocaleLowerCase();
	        if (!this._weekdaysParse) {
	            this._weekdaysParse = [];
	            this._shortWeekdaysParse = [];
	            this._minWeekdaysParse = [];

	            for (i = 0; i < 7; ++i) {
	                mom = create_utc__createUTC([2000, 1]).day(i);
	                this._minWeekdaysParse[i] = this.weekdaysMin(mom, '').toLocaleLowerCase();
	                this._shortWeekdaysParse[i] = this.weekdaysShort(mom, '').toLocaleLowerCase();
	                this._weekdaysParse[i] = this.weekdays(mom, '').toLocaleLowerCase();
	            }
	        }

	        if (strict) {
	            if (format === 'dddd') {
	                ii = indexOf.call(this._weekdaysParse, llc);
	                return ii !== -1 ? ii : null;
	            } else if (format === 'ddd') {
	                ii = indexOf.call(this._shortWeekdaysParse, llc);
	                return ii !== -1 ? ii : null;
	            } else {
	                ii = indexOf.call(this._minWeekdaysParse, llc);
	                return ii !== -1 ? ii : null;
	            }
	        } else {
	            if (format === 'dddd') {
	                ii = indexOf.call(this._weekdaysParse, llc);
	                if (ii !== -1) {
	                    return ii;
	                }
	                ii = indexOf.call(this._shortWeekdaysParse, llc);
	                if (ii !== -1) {
	                    return ii;
	                }
	                ii = indexOf.call(this._minWeekdaysParse, llc);
	                return ii !== -1 ? ii : null;
	            } else if (format === 'ddd') {
	                ii = indexOf.call(this._shortWeekdaysParse, llc);
	                if (ii !== -1) {
	                    return ii;
	                }
	                ii = indexOf.call(this._weekdaysParse, llc);
	                if (ii !== -1) {
	                    return ii;
	                }
	                ii = indexOf.call(this._minWeekdaysParse, llc);
	                return ii !== -1 ? ii : null;
	            } else {
	                ii = indexOf.call(this._minWeekdaysParse, llc);
	                if (ii !== -1) {
	                    return ii;
	                }
	                ii = indexOf.call(this._weekdaysParse, llc);
	                if (ii !== -1) {
	                    return ii;
	                }
	                ii = indexOf.call(this._shortWeekdaysParse, llc);
	                return ii !== -1 ? ii : null;
	            }
	        }
	    }

	    function localeWeekdaysParse (weekdayName, format, strict) {
	        var i, mom, regex;

	        if (this._weekdaysParseExact) {
	            return day_of_week__handleStrictParse.call(this, weekdayName, format, strict);
	        }

	        if (!this._weekdaysParse) {
	            this._weekdaysParse = [];
	            this._minWeekdaysParse = [];
	            this._shortWeekdaysParse = [];
	            this._fullWeekdaysParse = [];
	        }

	        for (i = 0; i < 7; i++) {
	            // make the regex if we don't have it already

	            mom = create_utc__createUTC([2000, 1]).day(i);
	            if (strict && !this._fullWeekdaysParse[i]) {
	                this._fullWeekdaysParse[i] = new RegExp('^' + this.weekdays(mom, '').replace('.', '\.?') + '$', 'i');
	                this._shortWeekdaysParse[i] = new RegExp('^' + this.weekdaysShort(mom, '').replace('.', '\.?') + '$', 'i');
	                this._minWeekdaysParse[i] = new RegExp('^' + this.weekdaysMin(mom, '').replace('.', '\.?') + '$', 'i');
	            }
	            if (!this._weekdaysParse[i]) {
	                regex = '^' + this.weekdays(mom, '') + '|^' + this.weekdaysShort(mom, '') + '|^' + this.weekdaysMin(mom, '');
	                this._weekdaysParse[i] = new RegExp(regex.replace('.', ''), 'i');
	            }
	            // test the regex
	            if (strict && format === 'dddd' && this._fullWeekdaysParse[i].test(weekdayName)) {
	                return i;
	            } else if (strict && format === 'ddd' && this._shortWeekdaysParse[i].test(weekdayName)) {
	                return i;
	            } else if (strict && format === 'dd' && this._minWeekdaysParse[i].test(weekdayName)) {
	                return i;
	            } else if (!strict && this._weekdaysParse[i].test(weekdayName)) {
	                return i;
	            }
	        }
	    }

	    // MOMENTS

	    function getSetDayOfWeek (input) {
	        if (!this.isValid()) {
	            return input != null ? this : NaN;
	        }
	        var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
	        if (input != null) {
	            input = parseWeekday(input, this.localeData());
	            return this.add(input - day, 'd');
	        } else {
	            return day;
	        }
	    }

	    function getSetLocaleDayOfWeek (input) {
	        if (!this.isValid()) {
	            return input != null ? this : NaN;
	        }
	        var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;
	        return input == null ? weekday : this.add(input - weekday, 'd');
	    }

	    function getSetISODayOfWeek (input) {
	        if (!this.isValid()) {
	            return input != null ? this : NaN;
	        }
	        // behaves the same as moment#day except
	        // as a getter, returns 7 instead of 0 (1-7 range instead of 0-6)
	        // as a setter, sunday should belong to the previous week.
	        return input == null ? this.day() || 7 : this.day(this.day() % 7 ? input : input - 7);
	    }

	    var defaultWeekdaysRegex = matchWord;
	    function weekdaysRegex (isStrict) {
	        if (this._weekdaysParseExact) {
	            if (!hasOwnProp(this, '_weekdaysRegex')) {
	                computeWeekdaysParse.call(this);
	            }
	            if (isStrict) {
	                return this._weekdaysStrictRegex;
	            } else {
	                return this._weekdaysRegex;
	            }
	        } else {
	            return this._weekdaysStrictRegex && isStrict ?
	                this._weekdaysStrictRegex : this._weekdaysRegex;
	        }
	    }

	    var defaultWeekdaysShortRegex = matchWord;
	    function weekdaysShortRegex (isStrict) {
	        if (this._weekdaysParseExact) {
	            if (!hasOwnProp(this, '_weekdaysRegex')) {
	                computeWeekdaysParse.call(this);
	            }
	            if (isStrict) {
	                return this._weekdaysShortStrictRegex;
	            } else {
	                return this._weekdaysShortRegex;
	            }
	        } else {
	            return this._weekdaysShortStrictRegex && isStrict ?
	                this._weekdaysShortStrictRegex : this._weekdaysShortRegex;
	        }
	    }

	    var defaultWeekdaysMinRegex = matchWord;
	    function weekdaysMinRegex (isStrict) {
	        if (this._weekdaysParseExact) {
	            if (!hasOwnProp(this, '_weekdaysRegex')) {
	                computeWeekdaysParse.call(this);
	            }
	            if (isStrict) {
	                return this._weekdaysMinStrictRegex;
	            } else {
	                return this._weekdaysMinRegex;
	            }
	        } else {
	            return this._weekdaysMinStrictRegex && isStrict ?
	                this._weekdaysMinStrictRegex : this._weekdaysMinRegex;
	        }
	    }


	    function computeWeekdaysParse () {
	        function cmpLenRev(a, b) {
	            return b.length - a.length;
	        }

	        var minPieces = [], shortPieces = [], longPieces = [], mixedPieces = [],
	            i, mom, minp, shortp, longp;
	        for (i = 0; i < 7; i++) {
	            // make the regex if we don't have it already
	            mom = create_utc__createUTC([2000, 1]).day(i);
	            minp = this.weekdaysMin(mom, '');
	            shortp = this.weekdaysShort(mom, '');
	            longp = this.weekdays(mom, '');
	            minPieces.push(minp);
	            shortPieces.push(shortp);
	            longPieces.push(longp);
	            mixedPieces.push(minp);
	            mixedPieces.push(shortp);
	            mixedPieces.push(longp);
	        }
	        // Sorting makes sure if one weekday (or abbr) is a prefix of another it
	        // will match the longer piece.
	        minPieces.sort(cmpLenRev);
	        shortPieces.sort(cmpLenRev);
	        longPieces.sort(cmpLenRev);
	        mixedPieces.sort(cmpLenRev);
	        for (i = 0; i < 7; i++) {
	            shortPieces[i] = regexEscape(shortPieces[i]);
	            longPieces[i] = regexEscape(longPieces[i]);
	            mixedPieces[i] = regexEscape(mixedPieces[i]);
	        }

	        this._weekdaysRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
	        this._weekdaysShortRegex = this._weekdaysRegex;
	        this._weekdaysMinRegex = this._weekdaysRegex;

	        this._weekdaysStrictRegex = new RegExp('^(' + longPieces.join('|') + ')', 'i');
	        this._weekdaysShortStrictRegex = new RegExp('^(' + shortPieces.join('|') + ')', 'i');
	        this._weekdaysMinStrictRegex = new RegExp('^(' + minPieces.join('|') + ')', 'i');
	    }

	    // FORMATTING

	    addFormatToken('DDD', ['DDDD', 3], 'DDDo', 'dayOfYear');

	    // ALIASES

	    addUnitAlias('dayOfYear', 'DDD');

	    // PARSING

	    addRegexToken('DDD',  match1to3);
	    addRegexToken('DDDD', match3);
	    addParseToken(['DDD', 'DDDD'], function (input, array, config) {
	        config._dayOfYear = toInt(input);
	    });

	    // HELPERS

	    // MOMENTS

	    function getSetDayOfYear (input) {
	        var dayOfYear = Math.round((this.clone().startOf('day') - this.clone().startOf('year')) / 864e5) + 1;
	        return input == null ? dayOfYear : this.add((input - dayOfYear), 'd');
	    }

	    // FORMATTING

	    function hFormat() {
	        return this.hours() % 12 || 12;
	    }

	    function kFormat() {
	        return this.hours() || 24;
	    }

	    addFormatToken('H', ['HH', 2], 0, 'hour');
	    addFormatToken('h', ['hh', 2], 0, hFormat);
	    addFormatToken('k', ['kk', 2], 0, kFormat);

	    addFormatToken('hmm', 0, 0, function () {
	        return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2);
	    });

	    addFormatToken('hmmss', 0, 0, function () {
	        return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2) +
	            zeroFill(this.seconds(), 2);
	    });

	    addFormatToken('Hmm', 0, 0, function () {
	        return '' + this.hours() + zeroFill(this.minutes(), 2);
	    });

	    addFormatToken('Hmmss', 0, 0, function () {
	        return '' + this.hours() + zeroFill(this.minutes(), 2) +
	            zeroFill(this.seconds(), 2);
	    });

	    function meridiem (token, lowercase) {
	        addFormatToken(token, 0, 0, function () {
	            return this.localeData().meridiem(this.hours(), this.minutes(), lowercase);
	        });
	    }

	    meridiem('a', true);
	    meridiem('A', false);

	    // ALIASES

	    addUnitAlias('hour', 'h');

	    // PARSING

	    function matchMeridiem (isStrict, locale) {
	        return locale._meridiemParse;
	    }

	    addRegexToken('a',  matchMeridiem);
	    addRegexToken('A',  matchMeridiem);
	    addRegexToken('H',  match1to2);
	    addRegexToken('h',  match1to2);
	    addRegexToken('HH', match1to2, match2);
	    addRegexToken('hh', match1to2, match2);

	    addRegexToken('hmm', match3to4);
	    addRegexToken('hmmss', match5to6);
	    addRegexToken('Hmm', match3to4);
	    addRegexToken('Hmmss', match5to6);

	    addParseToken(['H', 'HH'], HOUR);
	    addParseToken(['a', 'A'], function (input, array, config) {
	        config._isPm = config._locale.isPM(input);
	        config._meridiem = input;
	    });
	    addParseToken(['h', 'hh'], function (input, array, config) {
	        array[HOUR] = toInt(input);
	        getParsingFlags(config).bigHour = true;
	    });
	    addParseToken('hmm', function (input, array, config) {
	        var pos = input.length - 2;
	        array[HOUR] = toInt(input.substr(0, pos));
	        array[MINUTE] = toInt(input.substr(pos));
	        getParsingFlags(config).bigHour = true;
	    });
	    addParseToken('hmmss', function (input, array, config) {
	        var pos1 = input.length - 4;
	        var pos2 = input.length - 2;
	        array[HOUR] = toInt(input.substr(0, pos1));
	        array[MINUTE] = toInt(input.substr(pos1, 2));
	        array[SECOND] = toInt(input.substr(pos2));
	        getParsingFlags(config).bigHour = true;
	    });
	    addParseToken('Hmm', function (input, array, config) {
	        var pos = input.length - 2;
	        array[HOUR] = toInt(input.substr(0, pos));
	        array[MINUTE] = toInt(input.substr(pos));
	    });
	    addParseToken('Hmmss', function (input, array, config) {
	        var pos1 = input.length - 4;
	        var pos2 = input.length - 2;
	        array[HOUR] = toInt(input.substr(0, pos1));
	        array[MINUTE] = toInt(input.substr(pos1, 2));
	        array[SECOND] = toInt(input.substr(pos2));
	    });

	    // LOCALES

	    function localeIsPM (input) {
	        // IE8 Quirks Mode & IE7 Standards Mode do not allow accessing strings like arrays
	        // Using charAt should be more compatible.
	        return ((input + '').toLowerCase().charAt(0) === 'p');
	    }

	    var defaultLocaleMeridiemParse = /[ap]\.?m?\.?/i;
	    function localeMeridiem (hours, minutes, isLower) {
	        if (hours > 11) {
	            return isLower ? 'pm' : 'PM';
	        } else {
	            return isLower ? 'am' : 'AM';
	        }
	    }


	    // MOMENTS

	    // Setting the hour should keep the time, because the user explicitly
	    // specified which hour he wants. So trying to maintain the same hour (in
	    // a new timezone) makes sense. Adding/subtracting hours does not follow
	    // this rule.
	    var getSetHour = makeGetSet('Hours', true);

	    // FORMATTING

	    addFormatToken('m', ['mm', 2], 0, 'minute');

	    // ALIASES

	    addUnitAlias('minute', 'm');

	    // PARSING

	    addRegexToken('m',  match1to2);
	    addRegexToken('mm', match1to2, match2);
	    addParseToken(['m', 'mm'], MINUTE);

	    // MOMENTS

	    var getSetMinute = makeGetSet('Minutes', false);

	    // FORMATTING

	    addFormatToken('s', ['ss', 2], 0, 'second');

	    // ALIASES

	    addUnitAlias('second', 's');

	    // PARSING

	    addRegexToken('s',  match1to2);
	    addRegexToken('ss', match1to2, match2);
	    addParseToken(['s', 'ss'], SECOND);

	    // MOMENTS

	    var getSetSecond = makeGetSet('Seconds', false);

	    // FORMATTING

	    addFormatToken('S', 0, 0, function () {
	        return ~~(this.millisecond() / 100);
	    });

	    addFormatToken(0, ['SS', 2], 0, function () {
	        return ~~(this.millisecond() / 10);
	    });

	    addFormatToken(0, ['SSS', 3], 0, 'millisecond');
	    addFormatToken(0, ['SSSS', 4], 0, function () {
	        return this.millisecond() * 10;
	    });
	    addFormatToken(0, ['SSSSS', 5], 0, function () {
	        return this.millisecond() * 100;
	    });
	    addFormatToken(0, ['SSSSSS', 6], 0, function () {
	        return this.millisecond() * 1000;
	    });
	    addFormatToken(0, ['SSSSSSS', 7], 0, function () {
	        return this.millisecond() * 10000;
	    });
	    addFormatToken(0, ['SSSSSSSS', 8], 0, function () {
	        return this.millisecond() * 100000;
	    });
	    addFormatToken(0, ['SSSSSSSSS', 9], 0, function () {
	        return this.millisecond() * 1000000;
	    });


	    // ALIASES

	    addUnitAlias('millisecond', 'ms');

	    // PARSING

	    addRegexToken('S',    match1to3, match1);
	    addRegexToken('SS',   match1to3, match2);
	    addRegexToken('SSS',  match1to3, match3);

	    var token;
	    for (token = 'SSSS'; token.length <= 9; token += 'S') {
	        addRegexToken(token, matchUnsigned);
	    }

	    function parseMs(input, array) {
	        array[MILLISECOND] = toInt(('0.' + input) * 1000);
	    }

	    for (token = 'S'; token.length <= 9; token += 'S') {
	        addParseToken(token, parseMs);
	    }
	    // MOMENTS

	    var getSetMillisecond = makeGetSet('Milliseconds', false);

	    // FORMATTING

	    addFormatToken('z',  0, 0, 'zoneAbbr');
	    addFormatToken('zz', 0, 0, 'zoneName');

	    // MOMENTS

	    function getZoneAbbr () {
	        return this._isUTC ? 'UTC' : '';
	    }

	    function getZoneName () {
	        return this._isUTC ? 'Coordinated Universal Time' : '';
	    }

	    var momentPrototype__proto = Moment.prototype;

	    momentPrototype__proto.add               = add_subtract__add;
	    momentPrototype__proto.calendar          = moment_calendar__calendar;
	    momentPrototype__proto.clone             = clone;
	    momentPrototype__proto.diff              = diff;
	    momentPrototype__proto.endOf             = endOf;
	    momentPrototype__proto.format            = format;
	    momentPrototype__proto.from              = from;
	    momentPrototype__proto.fromNow           = fromNow;
	    momentPrototype__proto.to                = to;
	    momentPrototype__proto.toNow             = toNow;
	    momentPrototype__proto.get               = getSet;
	    momentPrototype__proto.invalidAt         = invalidAt;
	    momentPrototype__proto.isAfter           = isAfter;
	    momentPrototype__proto.isBefore          = isBefore;
	    momentPrototype__proto.isBetween         = isBetween;
	    momentPrototype__proto.isSame            = isSame;
	    momentPrototype__proto.isSameOrAfter     = isSameOrAfter;
	    momentPrototype__proto.isSameOrBefore    = isSameOrBefore;
	    momentPrototype__proto.isValid           = moment_valid__isValid;
	    momentPrototype__proto.lang              = lang;
	    momentPrototype__proto.locale            = locale;
	    momentPrototype__proto.localeData        = localeData;
	    momentPrototype__proto.max               = prototypeMax;
	    momentPrototype__proto.min               = prototypeMin;
	    momentPrototype__proto.parsingFlags      = parsingFlags;
	    momentPrototype__proto.set               = getSet;
	    momentPrototype__proto.startOf           = startOf;
	    momentPrototype__proto.subtract          = add_subtract__subtract;
	    momentPrototype__proto.toArray           = toArray;
	    momentPrototype__proto.toObject          = toObject;
	    momentPrototype__proto.toDate            = toDate;
	    momentPrototype__proto.toISOString       = moment_format__toISOString;
	    momentPrototype__proto.toJSON            = toJSON;
	    momentPrototype__proto.toString          = toString;
	    momentPrototype__proto.unix              = unix;
	    momentPrototype__proto.valueOf           = to_type__valueOf;
	    momentPrototype__proto.creationData      = creationData;

	    // Year
	    momentPrototype__proto.year       = getSetYear;
	    momentPrototype__proto.isLeapYear = getIsLeapYear;

	    // Week Year
	    momentPrototype__proto.weekYear    = getSetWeekYear;
	    momentPrototype__proto.isoWeekYear = getSetISOWeekYear;

	    // Quarter
	    momentPrototype__proto.quarter = momentPrototype__proto.quarters = getSetQuarter;

	    // Month
	    momentPrototype__proto.month       = getSetMonth;
	    momentPrototype__proto.daysInMonth = getDaysInMonth;

	    // Week
	    momentPrototype__proto.week           = momentPrototype__proto.weeks        = getSetWeek;
	    momentPrototype__proto.isoWeek        = momentPrototype__proto.isoWeeks     = getSetISOWeek;
	    momentPrototype__proto.weeksInYear    = getWeeksInYear;
	    momentPrototype__proto.isoWeeksInYear = getISOWeeksInYear;

	    // Day
	    momentPrototype__proto.date       = getSetDayOfMonth;
	    momentPrototype__proto.day        = momentPrototype__proto.days             = getSetDayOfWeek;
	    momentPrototype__proto.weekday    = getSetLocaleDayOfWeek;
	    momentPrototype__proto.isoWeekday = getSetISODayOfWeek;
	    momentPrototype__proto.dayOfYear  = getSetDayOfYear;

	    // Hour
	    momentPrototype__proto.hour = momentPrototype__proto.hours = getSetHour;

	    // Minute
	    momentPrototype__proto.minute = momentPrototype__proto.minutes = getSetMinute;

	    // Second
	    momentPrototype__proto.second = momentPrototype__proto.seconds = getSetSecond;

	    // Millisecond
	    momentPrototype__proto.millisecond = momentPrototype__proto.milliseconds = getSetMillisecond;

	    // Offset
	    momentPrototype__proto.utcOffset            = getSetOffset;
	    momentPrototype__proto.utc                  = setOffsetToUTC;
	    momentPrototype__proto.local                = setOffsetToLocal;
	    momentPrototype__proto.parseZone            = setOffsetToParsedOffset;
	    momentPrototype__proto.hasAlignedHourOffset = hasAlignedHourOffset;
	    momentPrototype__proto.isDST                = isDaylightSavingTime;
	    momentPrototype__proto.isDSTShifted         = isDaylightSavingTimeShifted;
	    momentPrototype__proto.isLocal              = isLocal;
	    momentPrototype__proto.isUtcOffset          = isUtcOffset;
	    momentPrototype__proto.isUtc                = isUtc;
	    momentPrototype__proto.isUTC                = isUtc;

	    // Timezone
	    momentPrototype__proto.zoneAbbr = getZoneAbbr;
	    momentPrototype__proto.zoneName = getZoneName;

	    // Deprecations
	    momentPrototype__proto.dates  = deprecate('dates accessor is deprecated. Use date instead.', getSetDayOfMonth);
	    momentPrototype__proto.months = deprecate('months accessor is deprecated. Use month instead', getSetMonth);
	    momentPrototype__proto.years  = deprecate('years accessor is deprecated. Use year instead', getSetYear);
	    momentPrototype__proto.zone   = deprecate('moment().zone is deprecated, use moment().utcOffset instead. https://github.com/moment/moment/issues/1779', getSetZone);

	    var momentPrototype = momentPrototype__proto;

	    function moment__createUnix (input) {
	        return local__createLocal(input * 1000);
	    }

	    function moment__createInZone () {
	        return local__createLocal.apply(null, arguments).parseZone();
	    }

	    var defaultCalendar = {
	        sameDay : '[Today at] LT',
	        nextDay : '[Tomorrow at] LT',
	        nextWeek : 'dddd [at] LT',
	        lastDay : '[Yesterday at] LT',
	        lastWeek : '[Last] dddd [at] LT',
	        sameElse : 'L'
	    };

	    function locale_calendar__calendar (key, mom, now) {
	        var output = this._calendar[key];
	        return isFunction(output) ? output.call(mom, now) : output;
	    }

	    var defaultLongDateFormat = {
	        LTS  : 'h:mm:ss A',
	        LT   : 'h:mm A',
	        L    : 'MM/DD/YYYY',
	        LL   : 'MMMM D, YYYY',
	        LLL  : 'MMMM D, YYYY h:mm A',
	        LLLL : 'dddd, MMMM D, YYYY h:mm A'
	    };

	    function longDateFormat (key) {
	        var format = this._longDateFormat[key],
	            formatUpper = this._longDateFormat[key.toUpperCase()];

	        if (format || !formatUpper) {
	            return format;
	        }

	        this._longDateFormat[key] = formatUpper.replace(/MMMM|MM|DD|dddd/g, function (val) {
	            return val.slice(1);
	        });

	        return this._longDateFormat[key];
	    }

	    var defaultInvalidDate = 'Invalid date';

	    function invalidDate () {
	        return this._invalidDate;
	    }

	    var defaultOrdinal = '%d';
	    var defaultOrdinalParse = /\d{1,2}/;

	    function ordinal (number) {
	        return this._ordinal.replace('%d', number);
	    }

	    function preParsePostFormat (string) {
	        return string;
	    }

	    var defaultRelativeTime = {
	        future : 'in %s',
	        past   : '%s ago',
	        s  : 'a few seconds',
	        m  : 'a minute',
	        mm : '%d minutes',
	        h  : 'an hour',
	        hh : '%d hours',
	        d  : 'a day',
	        dd : '%d days',
	        M  : 'a month',
	        MM : '%d months',
	        y  : 'a year',
	        yy : '%d years'
	    };

	    function relative__relativeTime (number, withoutSuffix, string, isFuture) {
	        var output = this._relativeTime[string];
	        return (isFunction(output)) ?
	            output(number, withoutSuffix, string, isFuture) :
	            output.replace(/%d/i, number);
	    }

	    function pastFuture (diff, output) {
	        var format = this._relativeTime[diff > 0 ? 'future' : 'past'];
	        return isFunction(format) ? format(output) : format.replace(/%s/i, output);
	    }

	    var prototype__proto = Locale.prototype;

	    prototype__proto._calendar       = defaultCalendar;
	    prototype__proto.calendar        = locale_calendar__calendar;
	    prototype__proto._longDateFormat = defaultLongDateFormat;
	    prototype__proto.longDateFormat  = longDateFormat;
	    prototype__proto._invalidDate    = defaultInvalidDate;
	    prototype__proto.invalidDate     = invalidDate;
	    prototype__proto._ordinal        = defaultOrdinal;
	    prototype__proto.ordinal         = ordinal;
	    prototype__proto._ordinalParse   = defaultOrdinalParse;
	    prototype__proto.preparse        = preParsePostFormat;
	    prototype__proto.postformat      = preParsePostFormat;
	    prototype__proto._relativeTime   = defaultRelativeTime;
	    prototype__proto.relativeTime    = relative__relativeTime;
	    prototype__proto.pastFuture      = pastFuture;
	    prototype__proto.set             = locale_set__set;

	    // Month
	    prototype__proto.months            =        localeMonths;
	    prototype__proto._months           = defaultLocaleMonths;
	    prototype__proto.monthsShort       =        localeMonthsShort;
	    prototype__proto._monthsShort      = defaultLocaleMonthsShort;
	    prototype__proto.monthsParse       =        localeMonthsParse;
	    prototype__proto._monthsRegex      = defaultMonthsRegex;
	    prototype__proto.monthsRegex       = monthsRegex;
	    prototype__proto._monthsShortRegex = defaultMonthsShortRegex;
	    prototype__proto.monthsShortRegex  = monthsShortRegex;

	    // Week
	    prototype__proto.week = localeWeek;
	    prototype__proto._week = defaultLocaleWeek;
	    prototype__proto.firstDayOfYear = localeFirstDayOfYear;
	    prototype__proto.firstDayOfWeek = localeFirstDayOfWeek;

	    // Day of Week
	    prototype__proto.weekdays       =        localeWeekdays;
	    prototype__proto._weekdays      = defaultLocaleWeekdays;
	    prototype__proto.weekdaysMin    =        localeWeekdaysMin;
	    prototype__proto._weekdaysMin   = defaultLocaleWeekdaysMin;
	    prototype__proto.weekdaysShort  =        localeWeekdaysShort;
	    prototype__proto._weekdaysShort = defaultLocaleWeekdaysShort;
	    prototype__proto.weekdaysParse  =        localeWeekdaysParse;

	    prototype__proto._weekdaysRegex      = defaultWeekdaysRegex;
	    prototype__proto.weekdaysRegex       =        weekdaysRegex;
	    prototype__proto._weekdaysShortRegex = defaultWeekdaysShortRegex;
	    prototype__proto.weekdaysShortRegex  =        weekdaysShortRegex;
	    prototype__proto._weekdaysMinRegex   = defaultWeekdaysMinRegex;
	    prototype__proto.weekdaysMinRegex    =        weekdaysMinRegex;

	    // Hours
	    prototype__proto.isPM = localeIsPM;
	    prototype__proto._meridiemParse = defaultLocaleMeridiemParse;
	    prototype__proto.meridiem = localeMeridiem;

	    function lists__get (format, index, field, setter) {
	        var locale = locale_locales__getLocale();
	        var utc = create_utc__createUTC().set(setter, index);
	        return locale[field](utc, format);
	    }

	    function listMonthsImpl (format, index, field) {
	        if (typeof format === 'number') {
	            index = format;
	            format = undefined;
	        }

	        format = format || '';

	        if (index != null) {
	            return lists__get(format, index, field, 'month');
	        }

	        var i;
	        var out = [];
	        for (i = 0; i < 12; i++) {
	            out[i] = lists__get(format, i, field, 'month');
	        }
	        return out;
	    }

	    // ()
	    // (5)
	    // (fmt, 5)
	    // (fmt)
	    // (true)
	    // (true, 5)
	    // (true, fmt, 5)
	    // (true, fmt)
	    function listWeekdaysImpl (localeSorted, format, index, field) {
	        if (typeof localeSorted === 'boolean') {
	            if (typeof format === 'number') {
	                index = format;
	                format = undefined;
	            }

	            format = format || '';
	        } else {
	            format = localeSorted;
	            index = format;
	            localeSorted = false;

	            if (typeof format === 'number') {
	                index = format;
	                format = undefined;
	            }

	            format = format || '';
	        }

	        var locale = locale_locales__getLocale(),
	            shift = localeSorted ? locale._week.dow : 0;

	        if (index != null) {
	            return lists__get(format, (index + shift) % 7, field, 'day');
	        }

	        var i;
	        var out = [];
	        for (i = 0; i < 7; i++) {
	            out[i] = lists__get(format, (i + shift) % 7, field, 'day');
	        }
	        return out;
	    }

	    function lists__listMonths (format, index) {
	        return listMonthsImpl(format, index, 'months');
	    }

	    function lists__listMonthsShort (format, index) {
	        return listMonthsImpl(format, index, 'monthsShort');
	    }

	    function lists__listWeekdays (localeSorted, format, index) {
	        return listWeekdaysImpl(localeSorted, format, index, 'weekdays');
	    }

	    function lists__listWeekdaysShort (localeSorted, format, index) {
	        return listWeekdaysImpl(localeSorted, format, index, 'weekdaysShort');
	    }

	    function lists__listWeekdaysMin (localeSorted, format, index) {
	        return listWeekdaysImpl(localeSorted, format, index, 'weekdaysMin');
	    }

	    locale_locales__getSetGlobalLocale('en', {
	        ordinalParse: /\d{1,2}(th|st|nd|rd)/,
	        ordinal : function (number) {
	            var b = number % 10,
	                output = (toInt(number % 100 / 10) === 1) ? 'th' :
	                (b === 1) ? 'st' :
	                (b === 2) ? 'nd' :
	                (b === 3) ? 'rd' : 'th';
	            return number + output;
	        }
	    });

	    // Side effect imports
	    utils_hooks__hooks.lang = deprecate('moment.lang is deprecated. Use moment.locale instead.', locale_locales__getSetGlobalLocale);
	    utils_hooks__hooks.langData = deprecate('moment.langData is deprecated. Use moment.localeData instead.', locale_locales__getLocale);

	    var mathAbs = Math.abs;

	    function duration_abs__abs () {
	        var data           = this._data;

	        this._milliseconds = mathAbs(this._milliseconds);
	        this._days         = mathAbs(this._days);
	        this._months       = mathAbs(this._months);

	        data.milliseconds  = mathAbs(data.milliseconds);
	        data.seconds       = mathAbs(data.seconds);
	        data.minutes       = mathAbs(data.minutes);
	        data.hours         = mathAbs(data.hours);
	        data.months        = mathAbs(data.months);
	        data.years         = mathAbs(data.years);

	        return this;
	    }

	    function duration_add_subtract__addSubtract (duration, input, value, direction) {
	        var other = create__createDuration(input, value);

	        duration._milliseconds += direction * other._milliseconds;
	        duration._days         += direction * other._days;
	        duration._months       += direction * other._months;

	        return duration._bubble();
	    }

	    // supports only 2.0-style add(1, 's') or add(duration)
	    function duration_add_subtract__add (input, value) {
	        return duration_add_subtract__addSubtract(this, input, value, 1);
	    }

	    // supports only 2.0-style subtract(1, 's') or subtract(duration)
	    function duration_add_subtract__subtract (input, value) {
	        return duration_add_subtract__addSubtract(this, input, value, -1);
	    }

	    function absCeil (number) {
	        if (number < 0) {
	            return Math.floor(number);
	        } else {
	            return Math.ceil(number);
	        }
	    }

	    function bubble () {
	        var milliseconds = this._milliseconds;
	        var days         = this._days;
	        var months       = this._months;
	        var data         = this._data;
	        var seconds, minutes, hours, years, monthsFromDays;

	        // if we have a mix of positive and negative values, bubble down first
	        // check: https://github.com/moment/moment/issues/2166
	        if (!((milliseconds >= 0 && days >= 0 && months >= 0) ||
	                (milliseconds <= 0 && days <= 0 && months <= 0))) {
	            milliseconds += absCeil(monthsToDays(months) + days) * 864e5;
	            days = 0;
	            months = 0;
	        }

	        // The following code bubbles up values, see the tests for
	        // examples of what that means.
	        data.milliseconds = milliseconds % 1000;

	        seconds           = absFloor(milliseconds / 1000);
	        data.seconds      = seconds % 60;

	        minutes           = absFloor(seconds / 60);
	        data.minutes      = minutes % 60;

	        hours             = absFloor(minutes / 60);
	        data.hours        = hours % 24;

	        days += absFloor(hours / 24);

	        // convert days to months
	        monthsFromDays = absFloor(daysToMonths(days));
	        months += monthsFromDays;
	        days -= absCeil(monthsToDays(monthsFromDays));

	        // 12 months -> 1 year
	        years = absFloor(months / 12);
	        months %= 12;

	        data.days   = days;
	        data.months = months;
	        data.years  = years;

	        return this;
	    }

	    function daysToMonths (days) {
	        // 400 years have 146097 days (taking into account leap year rules)
	        // 400 years have 12 months === 4800
	        return days * 4800 / 146097;
	    }

	    function monthsToDays (months) {
	        // the reverse of daysToMonths
	        return months * 146097 / 4800;
	    }

	    function as (units) {
	        var days;
	        var months;
	        var milliseconds = this._milliseconds;

	        units = normalizeUnits(units);

	        if (units === 'month' || units === 'year') {
	            days   = this._days   + milliseconds / 864e5;
	            months = this._months + daysToMonths(days);
	            return units === 'month' ? months : months / 12;
	        } else {
	            // handle milliseconds separately because of floating point math errors (issue #1867)
	            days = this._days + Math.round(monthsToDays(this._months));
	            switch (units) {
	                case 'week'   : return days / 7     + milliseconds / 6048e5;
	                case 'day'    : return days         + milliseconds / 864e5;
	                case 'hour'   : return days * 24    + milliseconds / 36e5;
	                case 'minute' : return days * 1440  + milliseconds / 6e4;
	                case 'second' : return days * 86400 + milliseconds / 1000;
	                // Math.floor prevents floating point math errors here
	                case 'millisecond': return Math.floor(days * 864e5) + milliseconds;
	                default: throw new Error('Unknown unit ' + units);
	            }
	        }
	    }

	    // TODO: Use this.as('ms')?
	    function duration_as__valueOf () {
	        return (
	            this._milliseconds +
	            this._days * 864e5 +
	            (this._months % 12) * 2592e6 +
	            toInt(this._months / 12) * 31536e6
	        );
	    }

	    function makeAs (alias) {
	        return function () {
	            return this.as(alias);
	        };
	    }

	    var asMilliseconds = makeAs('ms');
	    var asSeconds      = makeAs('s');
	    var asMinutes      = makeAs('m');
	    var asHours        = makeAs('h');
	    var asDays         = makeAs('d');
	    var asWeeks        = makeAs('w');
	    var asMonths       = makeAs('M');
	    var asYears        = makeAs('y');

	    function duration_get__get (units) {
	        units = normalizeUnits(units);
	        return this[units + 's']();
	    }

	    function makeGetter(name) {
	        return function () {
	            return this._data[name];
	        };
	    }

	    var milliseconds = makeGetter('milliseconds');
	    var seconds      = makeGetter('seconds');
	    var minutes      = makeGetter('minutes');
	    var hours        = makeGetter('hours');
	    var days         = makeGetter('days');
	    var months       = makeGetter('months');
	    var years        = makeGetter('years');

	    function weeks () {
	        return absFloor(this.days() / 7);
	    }

	    var round = Math.round;
	    var thresholds = {
	        s: 45,  // seconds to minute
	        m: 45,  // minutes to hour
	        h: 22,  // hours to day
	        d: 26,  // days to month
	        M: 11   // months to year
	    };

	    // helper function for moment.fn.from, moment.fn.fromNow, and moment.duration.fn.humanize
	    function substituteTimeAgo(string, number, withoutSuffix, isFuture, locale) {
	        return locale.relativeTime(number || 1, !!withoutSuffix, string, isFuture);
	    }

	    function duration_humanize__relativeTime (posNegDuration, withoutSuffix, locale) {
	        var duration = create__createDuration(posNegDuration).abs();
	        var seconds  = round(duration.as('s'));
	        var minutes  = round(duration.as('m'));
	        var hours    = round(duration.as('h'));
	        var days     = round(duration.as('d'));
	        var months   = round(duration.as('M'));
	        var years    = round(duration.as('y'));

	        var a = seconds < thresholds.s && ['s', seconds]  ||
	                minutes <= 1           && ['m']           ||
	                minutes < thresholds.m && ['mm', minutes] ||
	                hours   <= 1           && ['h']           ||
	                hours   < thresholds.h && ['hh', hours]   ||
	                days    <= 1           && ['d']           ||
	                days    < thresholds.d && ['dd', days]    ||
	                months  <= 1           && ['M']           ||
	                months  < thresholds.M && ['MM', months]  ||
	                years   <= 1           && ['y']           || ['yy', years];

	        a[2] = withoutSuffix;
	        a[3] = +posNegDuration > 0;
	        a[4] = locale;
	        return substituteTimeAgo.apply(null, a);
	    }

	    // This function allows you to set a threshold for relative time strings
	    function duration_humanize__getSetRelativeTimeThreshold (threshold, limit) {
	        if (thresholds[threshold] === undefined) {
	            return false;
	        }
	        if (limit === undefined) {
	            return thresholds[threshold];
	        }
	        thresholds[threshold] = limit;
	        return true;
	    }

	    function humanize (withSuffix) {
	        var locale = this.localeData();
	        var output = duration_humanize__relativeTime(this, !withSuffix, locale);

	        if (withSuffix) {
	            output = locale.pastFuture(+this, output);
	        }

	        return locale.postformat(output);
	    }

	    var iso_string__abs = Math.abs;

	    function iso_string__toISOString() {
	        // for ISO strings we do not use the normal bubbling rules:
	        //  * milliseconds bubble up until they become hours
	        //  * days do not bubble at all
	        //  * months bubble up until they become years
	        // This is because there is no context-free conversion between hours and days
	        // (think of clock changes)
	        // and also not between days and months (28-31 days per month)
	        var seconds = iso_string__abs(this._milliseconds) / 1000;
	        var days         = iso_string__abs(this._days);
	        var months       = iso_string__abs(this._months);
	        var minutes, hours, years;

	        // 3600 seconds -> 60 minutes -> 1 hour
	        minutes           = absFloor(seconds / 60);
	        hours             = absFloor(minutes / 60);
	        seconds %= 60;
	        minutes %= 60;

	        // 12 months -> 1 year
	        years  = absFloor(months / 12);
	        months %= 12;


	        // inspired by https://github.com/dordille/moment-isoduration/blob/master/moment.isoduration.js
	        var Y = years;
	        var M = months;
	        var D = days;
	        var h = hours;
	        var m = minutes;
	        var s = seconds;
	        var total = this.asSeconds();

	        if (!total) {
	            // this is the same as C#'s (Noda) and python (isodate)...
	            // but not other JS (goog.date)
	            return 'P0D';
	        }

	        return (total < 0 ? '-' : '') +
	            'P' +
	            (Y ? Y + 'Y' : '') +
	            (M ? M + 'M' : '') +
	            (D ? D + 'D' : '') +
	            ((h || m || s) ? 'T' : '') +
	            (h ? h + 'H' : '') +
	            (m ? m + 'M' : '') +
	            (s ? s + 'S' : '');
	    }

	    var duration_prototype__proto = Duration.prototype;

	    duration_prototype__proto.abs            = duration_abs__abs;
	    duration_prototype__proto.add            = duration_add_subtract__add;
	    duration_prototype__proto.subtract       = duration_add_subtract__subtract;
	    duration_prototype__proto.as             = as;
	    duration_prototype__proto.asMilliseconds = asMilliseconds;
	    duration_prototype__proto.asSeconds      = asSeconds;
	    duration_prototype__proto.asMinutes      = asMinutes;
	    duration_prototype__proto.asHours        = asHours;
	    duration_prototype__proto.asDays         = asDays;
	    duration_prototype__proto.asWeeks        = asWeeks;
	    duration_prototype__proto.asMonths       = asMonths;
	    duration_prototype__proto.asYears        = asYears;
	    duration_prototype__proto.valueOf        = duration_as__valueOf;
	    duration_prototype__proto._bubble        = bubble;
	    duration_prototype__proto.get            = duration_get__get;
	    duration_prototype__proto.milliseconds   = milliseconds;
	    duration_prototype__proto.seconds        = seconds;
	    duration_prototype__proto.minutes        = minutes;
	    duration_prototype__proto.hours          = hours;
	    duration_prototype__proto.days           = days;
	    duration_prototype__proto.weeks          = weeks;
	    duration_prototype__proto.months         = months;
	    duration_prototype__proto.years          = years;
	    duration_prototype__proto.humanize       = humanize;
	    duration_prototype__proto.toISOString    = iso_string__toISOString;
	    duration_prototype__proto.toString       = iso_string__toISOString;
	    duration_prototype__proto.toJSON         = iso_string__toISOString;
	    duration_prototype__proto.locale         = locale;
	    duration_prototype__proto.localeData     = localeData;

	    // Deprecations
	    duration_prototype__proto.toIsoString = deprecate('toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)', iso_string__toISOString);
	    duration_prototype__proto.lang = lang;

	    // Side effect imports

	    // FORMATTING

	    addFormatToken('X', 0, 0, 'unix');
	    addFormatToken('x', 0, 0, 'valueOf');

	    // PARSING

	    addRegexToken('x', matchSigned);
	    addRegexToken('X', matchTimestamp);
	    addParseToken('X', function (input, array, config) {
	        config._d = new Date(parseFloat(input, 10) * 1000);
	    });
	    addParseToken('x', function (input, array, config) {
	        config._d = new Date(toInt(input));
	    });

	    // Side effect imports


	    utils_hooks__hooks.version = '2.13.0';

	    setHookCallback(local__createLocal);

	    utils_hooks__hooks.fn                    = momentPrototype;
	    utils_hooks__hooks.min                   = min;
	    utils_hooks__hooks.max                   = max;
	    utils_hooks__hooks.now                   = now;
	    utils_hooks__hooks.utc                   = create_utc__createUTC;
	    utils_hooks__hooks.unix                  = moment__createUnix;
	    utils_hooks__hooks.months                = lists__listMonths;
	    utils_hooks__hooks.isDate                = isDate;
	    utils_hooks__hooks.locale                = locale_locales__getSetGlobalLocale;
	    utils_hooks__hooks.invalid               = valid__createInvalid;
	    utils_hooks__hooks.duration              = create__createDuration;
	    utils_hooks__hooks.isMoment              = isMoment;
	    utils_hooks__hooks.weekdays              = lists__listWeekdays;
	    utils_hooks__hooks.parseZone             = moment__createInZone;
	    utils_hooks__hooks.localeData            = locale_locales__getLocale;
	    utils_hooks__hooks.isDuration            = isDuration;
	    utils_hooks__hooks.monthsShort           = lists__listMonthsShort;
	    utils_hooks__hooks.weekdaysMin           = lists__listWeekdaysMin;
	    utils_hooks__hooks.defineLocale          = defineLocale;
	    utils_hooks__hooks.updateLocale          = updateLocale;
	    utils_hooks__hooks.locales               = locale_locales__listLocales;
	    utils_hooks__hooks.weekdaysShort         = lists__listWeekdaysShort;
	    utils_hooks__hooks.normalizeUnits        = normalizeUnits;
	    utils_hooks__hooks.relativeTimeThreshold = duration_humanize__getSetRelativeTimeThreshold;
	    utils_hooks__hooks.prototype             = momentPrototype;

	    var _moment = utils_hooks__hooks;

	    return _moment;

	}));
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(964)(module)))

/***/ },

/***/ 964:
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },

/***/ 965:
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./af": 966,
		"./af.js": 966,
		"./ar": 967,
		"./ar-ma": 968,
		"./ar-ma.js": 968,
		"./ar-sa": 969,
		"./ar-sa.js": 969,
		"./ar-tn": 970,
		"./ar-tn.js": 970,
		"./ar.js": 967,
		"./az": 971,
		"./az.js": 971,
		"./be": 972,
		"./be.js": 972,
		"./bg": 973,
		"./bg.js": 973,
		"./bn": 974,
		"./bn.js": 974,
		"./bo": 975,
		"./bo.js": 975,
		"./br": 976,
		"./br.js": 976,
		"./bs": 977,
		"./bs.js": 977,
		"./ca": 978,
		"./ca.js": 978,
		"./cs": 979,
		"./cs.js": 979,
		"./cv": 980,
		"./cv.js": 980,
		"./cy": 981,
		"./cy.js": 981,
		"./da": 982,
		"./da.js": 982,
		"./de": 983,
		"./de-at": 984,
		"./de-at.js": 984,
		"./de.js": 983,
		"./dv": 985,
		"./dv.js": 985,
		"./el": 986,
		"./el.js": 986,
		"./en-au": 987,
		"./en-au.js": 987,
		"./en-ca": 988,
		"./en-ca.js": 988,
		"./en-gb": 989,
		"./en-gb.js": 989,
		"./en-ie": 990,
		"./en-ie.js": 990,
		"./en-nz": 991,
		"./en-nz.js": 991,
		"./eo": 992,
		"./eo.js": 992,
		"./es": 993,
		"./es.js": 993,
		"./et": 994,
		"./et.js": 994,
		"./eu": 995,
		"./eu.js": 995,
		"./fa": 996,
		"./fa.js": 996,
		"./fi": 997,
		"./fi.js": 997,
		"./fo": 998,
		"./fo.js": 998,
		"./fr": 999,
		"./fr-ca": 1000,
		"./fr-ca.js": 1000,
		"./fr-ch": 1001,
		"./fr-ch.js": 1001,
		"./fr.js": 999,
		"./fy": 1002,
		"./fy.js": 1002,
		"./gd": 1003,
		"./gd.js": 1003,
		"./gl": 1004,
		"./gl.js": 1004,
		"./he": 1005,
		"./he.js": 1005,
		"./hi": 1006,
		"./hi.js": 1006,
		"./hr": 1007,
		"./hr.js": 1007,
		"./hu": 1008,
		"./hu.js": 1008,
		"./hy-am": 1009,
		"./hy-am.js": 1009,
		"./id": 1010,
		"./id.js": 1010,
		"./is": 1011,
		"./is.js": 1011,
		"./it": 1012,
		"./it.js": 1012,
		"./ja": 1013,
		"./ja.js": 1013,
		"./jv": 1014,
		"./jv.js": 1014,
		"./ka": 1015,
		"./ka.js": 1015,
		"./kk": 1016,
		"./kk.js": 1016,
		"./km": 1017,
		"./km.js": 1017,
		"./ko": 1018,
		"./ko.js": 1018,
		"./ky": 1019,
		"./ky.js": 1019,
		"./lb": 1020,
		"./lb.js": 1020,
		"./lo": 1021,
		"./lo.js": 1021,
		"./lt": 1022,
		"./lt.js": 1022,
		"./lv": 1023,
		"./lv.js": 1023,
		"./me": 1024,
		"./me.js": 1024,
		"./mk": 1025,
		"./mk.js": 1025,
		"./ml": 1026,
		"./ml.js": 1026,
		"./mr": 1027,
		"./mr.js": 1027,
		"./ms": 1028,
		"./ms-my": 1029,
		"./ms-my.js": 1029,
		"./ms.js": 1028,
		"./my": 1030,
		"./my.js": 1030,
		"./nb": 1031,
		"./nb.js": 1031,
		"./ne": 1032,
		"./ne.js": 1032,
		"./nl": 1033,
		"./nl.js": 1033,
		"./nn": 1034,
		"./nn.js": 1034,
		"./pa-in": 1035,
		"./pa-in.js": 1035,
		"./pl": 1036,
		"./pl.js": 1036,
		"./pt": 1037,
		"./pt-br": 1038,
		"./pt-br.js": 1038,
		"./pt.js": 1037,
		"./ro": 1039,
		"./ro.js": 1039,
		"./ru": 1040,
		"./ru.js": 1040,
		"./se": 1041,
		"./se.js": 1041,
		"./si": 1042,
		"./si.js": 1042,
		"./sk": 1043,
		"./sk.js": 1043,
		"./sl": 1044,
		"./sl.js": 1044,
		"./sq": 1045,
		"./sq.js": 1045,
		"./sr": 1046,
		"./sr-cyrl": 1047,
		"./sr-cyrl.js": 1047,
		"./sr.js": 1046,
		"./ss": 1048,
		"./ss.js": 1048,
		"./sv": 1049,
		"./sv.js": 1049,
		"./sw": 1050,
		"./sw.js": 1050,
		"./ta": 1051,
		"./ta.js": 1051,
		"./te": 1052,
		"./te.js": 1052,
		"./th": 1053,
		"./th.js": 1053,
		"./tl-ph": 1054,
		"./tl-ph.js": 1054,
		"./tlh": 1055,
		"./tlh.js": 1055,
		"./tr": 1056,
		"./tr.js": 1056,
		"./tzl": 1057,
		"./tzl.js": 1057,
		"./tzm": 1058,
		"./tzm-latn": 1059,
		"./tzm-latn.js": 1059,
		"./tzm.js": 1058,
		"./uk": 1060,
		"./uk.js": 1060,
		"./uz": 1061,
		"./uz.js": 1061,
		"./vi": 1062,
		"./vi.js": 1062,
		"./x-pseudo": 1063,
		"./x-pseudo.js": 1063,
		"./zh-cn": 1064,
		"./zh-cn.js": 1064,
		"./zh-tw": 1065,
		"./zh-tw.js": 1065
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 965;


/***/ },

/***/ 966:
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : afrikaans (af)
	//! author : Werner Mollentze : https://github.com/wernerm

	;(function (global, factory) {
	    true ? factory(__webpack_require__(963)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var af = moment.defineLocale('af', {
	        months : 'Januarie_Februarie_Maart_April_Mei_Junie_Julie_Augustus_September_Oktober_November_Desember'.split('_'),
	        monthsShort : 'Jan_Feb_Mar_Apr_Mei_Jun_Jul_Aug_Sep_Okt_Nov_Des'.split('_'),
	        weekdays : 'Sondag_Maandag_Dinsdag_Woensdag_Donderdag_Vrydag_Saterdag'.split('_'),
	        weekdaysShort : 'Son_Maa_Din_Woe_Don_Vry_Sat'.split('_'),
	        weekdaysMin : 'So_Ma_Di_Wo_Do_Vr_Sa'.split('_'),
	        meridiemParse: /vm|nm/i,
	        isPM : function (input) {
	            return /^nm$/i.test(input);
	        },
	        meridiem : function (hours, minutes, isLower) {
	            if (hours < 12) {
	                return isLower ? 'vm' : 'VM';
	            } else {
	                return isLower ? 'nm' : 'NM';
	            }
	        },
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY HH:mm',
	            LLLL : 'dddd, D MMMM YYYY HH:mm'
	        },
	        calendar : {
	            sameDay : '[Vandag om] LT',
	            nextDay : '[Môre om] LT',
	            nextWeek : 'dddd [om] LT',
	            lastDay : '[Gister om] LT',
	            lastWeek : '[Laas] dddd [om] LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'oor %s',
	            past : '%s gelede',
	            s : '\'n paar sekondes',
	            m : '\'n minuut',
	            mm : '%d minute',
	            h : '\'n uur',
	            hh : '%d ure',
	            d : '\'n dag',
	            dd : '%d dae',
	            M : '\'n maand',
	            MM : '%d maande',
	            y : '\'n jaar',
	            yy : '%d jaar'
	        },
	        ordinalParse: /\d{1,2}(ste|de)/,
	        ordinal : function (number) {
	            return number + ((number === 1 || number === 8 || number >= 20) ? 'ste' : 'de'); // Thanks to Joris Röling : https://github.com/jjupiter
	        },
	        week : {
	            dow : 1, // Maandag is die eerste dag van die week.
	            doy : 4  // Die week wat die 4de Januarie bevat is die eerste week van die jaar.
	        }
	    });

	    return af;

	}));

/***/ },

/***/ 967:
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! Locale: Arabic (ar)
	//! Author: Abdel Said: https://github.com/abdelsaid
	//! Changes in months, weekdays: Ahmed Elkhatib
	//! Native plural forms: forabi https://github.com/forabi

	;(function (global, factory) {
	    true ? factory(__webpack_require__(963)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var symbolMap = {
	        '1': '١',
	        '2': '٢',
	        '3': '٣',
	        '4': '٤',
	        '5': '٥',
	        '6': '٦',
	        '7': '٧',
	        '8': '٨',
	        '9': '٩',
	        '0': '٠'
	    }, numberMap = {
	        '١': '1',
	        '٢': '2',
	        '٣': '3',
	        '٤': '4',
	        '٥': '5',
	        '٦': '6',
	        '٧': '7',
	        '٨': '8',
	        '٩': '9',
	        '٠': '0'
	    }, pluralForm = function (n) {
	        return n === 0 ? 0 : n === 1 ? 1 : n === 2 ? 2 : n % 100 >= 3 && n % 100 <= 10 ? 3 : n % 100 >= 11 ? 4 : 5;
	    }, plurals = {
	        s : ['أقل من ثانية', 'ثانية واحدة', ['ثانيتان', 'ثانيتين'], '%d ثوان', '%d ثانية', '%d ثانية'],
	        m : ['أقل من دقيقة', 'دقيقة واحدة', ['دقيقتان', 'دقيقتين'], '%d دقائق', '%d دقيقة', '%d دقيقة'],
	        h : ['أقل من ساعة', 'ساعة واحدة', ['ساعتان', 'ساعتين'], '%d ساعات', '%d ساعة', '%d ساعة'],
	        d : ['أقل من يوم', 'يوم واحد', ['يومان', 'يومين'], '%d أيام', '%d يومًا', '%d يوم'],
	        M : ['أقل من شهر', 'شهر واحد', ['شهران', 'شهرين'], '%d أشهر', '%d شهرا', '%d شهر'],
	        y : ['أقل من عام', 'عام واحد', ['عامان', 'عامين'], '%d أعوام', '%d عامًا', '%d عام']
	    }, pluralize = function (u) {
	        return function (number, withoutSuffix, string, isFuture) {
	            var f = pluralForm(number),
	                str = plurals[u][pluralForm(number)];
	            if (f === 2) {
	                str = str[withoutSuffix ? 0 : 1];
	            }
	            return str.replace(/%d/i, number);
	        };
	    }, months = [
	        'كانون الثاني يناير',
	        'شباط فبراير',
	        'آذار مارس',
	        'نيسان أبريل',
	        'أيار مايو',
	        'حزيران يونيو',
	        'تموز يوليو',
	        'آب أغسطس',
	        'أيلول سبتمبر',
	        'تشرين الأول أكتوبر',
	        'تشرين الثاني نوفمبر',
	        'كانون الأول ديسمبر'
	    ];

	    var ar = moment.defineLocale('ar', {
	        months : months,
	        monthsShort : months,
	        weekdays : 'الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت'.split('_'),
	        weekdaysShort : 'أحد_إثنين_ثلاثاء_أربعاء_خميس_جمعة_سبت'.split('_'),
	        weekdaysMin : 'ح_ن_ث_ر_خ_ج_س'.split('_'),
	        weekdaysParseExact : true,
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'D/\u200FM/\u200FYYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY HH:mm',
	            LLLL : 'dddd D MMMM YYYY HH:mm'
	        },
	        meridiemParse: /ص|م/,
	        isPM : function (input) {
	            return 'م' === input;
	        },
	        meridiem : function (hour, minute, isLower) {
	            if (hour < 12) {
	                return 'ص';
	            } else {
	                return 'م';
	            }
	        },
	        calendar : {
	            sameDay: '[اليوم عند الساعة] LT',
	            nextDay: '[غدًا عند الساعة] LT',
	            nextWeek: 'dddd [عند الساعة] LT',
	            lastDay: '[أمس عند الساعة] LT',
	            lastWeek: 'dddd [عند الساعة] LT',
	            sameElse: 'L'
	        },
	        relativeTime : {
	            future : 'بعد %s',
	            past : 'منذ %s',
	            s : pluralize('s'),
	            m : pluralize('m'),
	            mm : pluralize('m'),
	            h : pluralize('h'),
	            hh : pluralize('h'),
	            d : pluralize('d'),
	            dd : pluralize('d'),
	            M : pluralize('M'),
	            MM : pluralize('M'),
	            y : pluralize('y'),
	            yy : pluralize('y')
	        },
	        preparse: function (string) {
	            return string.replace(/\u200f/g, '').replace(/[١٢٣٤٥٦٧٨٩٠]/g, function (match) {
	                return numberMap[match];
	            }).replace(/،/g, ',');
	        },
	        postformat: function (string) {
	            return string.replace(/\d/g, function (match) {
	                return symbolMap[match];
	            }).replace(/,/g, '،');
	        },
	        week : {
	            dow : 6, // Saturday is the first day of the week.
	            doy : 12  // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return ar;

	}));

/***/ },

/***/ 968:
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Moroccan Arabic (ar-ma)
	//! author : ElFadili Yassine : https://github.com/ElFadiliY
	//! author : Abdel Said : https://github.com/abdelsaid

	;(function (global, factory) {
	    true ? factory(__webpack_require__(963)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var ar_ma = moment.defineLocale('ar-ma', {
	        months : 'يناير_فبراير_مارس_أبريل_ماي_يونيو_يوليوز_غشت_شتنبر_أكتوبر_نونبر_دجنبر'.split('_'),
	        monthsShort : 'يناير_فبراير_مارس_أبريل_ماي_يونيو_يوليوز_غشت_شتنبر_أكتوبر_نونبر_دجنبر'.split('_'),
	        weekdays : 'الأحد_الإتنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت'.split('_'),
	        weekdaysShort : 'احد_اتنين_ثلاثاء_اربعاء_خميس_جمعة_سبت'.split('_'),
	        weekdaysMin : 'ح_ن_ث_ر_خ_ج_س'.split('_'),
	        weekdaysParseExact : true,
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY HH:mm',
	            LLLL : 'dddd D MMMM YYYY HH:mm'
	        },
	        calendar : {
	            sameDay: '[اليوم على الساعة] LT',
	            nextDay: '[غدا على الساعة] LT',
	            nextWeek: 'dddd [على الساعة] LT',
	            lastDay: '[أمس على الساعة] LT',
	            lastWeek: 'dddd [على الساعة] LT',
	            sameElse: 'L'
	        },
	        relativeTime : {
	            future : 'في %s',
	            past : 'منذ %s',
	            s : 'ثوان',
	            m : 'دقيقة',
	            mm : '%d دقائق',
	            h : 'ساعة',
	            hh : '%d ساعات',
	            d : 'يوم',
	            dd : '%d أيام',
	            M : 'شهر',
	            MM : '%d أشهر',
	            y : 'سنة',
	            yy : '%d سنوات'
	        },
	        week : {
	            dow : 6, // Saturday is the first day of the week.
	            doy : 12  // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return ar_ma;

	}));

/***/ },

/***/ 969:
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Arabic Saudi Arabia (ar-sa)
	//! author : Suhail Alkowaileet : https://github.com/xsoh

	;(function (global, factory) {
	    true ? factory(__webpack_require__(963)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var symbolMap = {
	        '1': '١',
	        '2': '٢',
	        '3': '٣',
	        '4': '٤',
	        '5': '٥',
	        '6': '٦',
	        '7': '٧',
	        '8': '٨',
	        '9': '٩',
	        '0': '٠'
	    }, numberMap = {
	        '١': '1',
	        '٢': '2',
	        '٣': '3',
	        '٤': '4',
	        '٥': '5',
	        '٦': '6',
	        '٧': '7',
	        '٨': '8',
	        '٩': '9',
	        '٠': '0'
	    };

	    var ar_sa = moment.defineLocale('ar-sa', {
	        months : 'يناير_فبراير_مارس_أبريل_مايو_يونيو_يوليو_أغسطس_سبتمبر_أكتوبر_نوفمبر_ديسمبر'.split('_'),
	        monthsShort : 'يناير_فبراير_مارس_أبريل_مايو_يونيو_يوليو_أغسطس_سبتمبر_أكتوبر_نوفمبر_ديسمبر'.split('_'),
	        weekdays : 'الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت'.split('_'),
	        weekdaysShort : 'أحد_إثنين_ثلاثاء_أربعاء_خميس_جمعة_سبت'.split('_'),
	        weekdaysMin : 'ح_ن_ث_ر_خ_ج_س'.split('_'),
	        weekdaysParseExact : true,
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY HH:mm',
	            LLLL : 'dddd D MMMM YYYY HH:mm'
	        },
	        meridiemParse: /ص|م/,
	        isPM : function (input) {
	            return 'م' === input;
	        },
	        meridiem : function (hour, minute, isLower) {
	            if (hour < 12) {
	                return 'ص';
	            } else {
	                return 'م';
	            }
	        },
	        calendar : {
	            sameDay: '[اليوم على الساعة] LT',
	            nextDay: '[غدا على الساعة] LT',
	            nextWeek: 'dddd [على الساعة] LT',
	            lastDay: '[أمس على الساعة] LT',
	            lastWeek: 'dddd [على الساعة] LT',
	            sameElse: 'L'
	        },
	        relativeTime : {
	            future : 'في %s',
	            past : 'منذ %s',
	            s : 'ثوان',
	            m : 'دقيقة',
	            mm : '%d دقائق',
	            h : 'ساعة',
	            hh : '%d ساعات',
	            d : 'يوم',
	            dd : '%d أيام',
	            M : 'شهر',
	            MM : '%d أشهر',
	            y : 'سنة',
	            yy : '%d سنوات'
	        },
	        preparse: function (string) {
	            return string.replace(/[١٢٣٤٥٦٧٨٩٠]/g, function (match) {
	                return numberMap[match];
	            }).replace(/،/g, ',');
	        },
	        postformat: function (string) {
	            return string.replace(/\d/g, function (match) {
	                return symbolMap[match];
	            }).replace(/,/g, '،');
	        },
	        week : {
	            dow : 6, // Saturday is the first day of the week.
	            doy : 12  // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return ar_sa;

	}));

/***/ },

/***/ 970:
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale  : Tunisian Arabic (ar-tn)

	;(function (global, factory) {
	    true ? factory(__webpack_require__(963)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var ar_tn = moment.defineLocale('ar-tn', {
	        months: 'جانفي_فيفري_مارس_أفريل_ماي_جوان_جويلية_أوت_سبتمبر_أكتوبر_نوفمبر_ديسمبر'.split('_'),
	        monthsShort: 'جانفي_فيفري_مارس_أفريل_ماي_جوان_جويلية_أوت_سبتمبر_أكتوبر_نوفمبر_ديسمبر'.split('_'),
	        weekdays: 'الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت'.split('_'),
	        weekdaysShort: 'أحد_إثنين_ثلاثاء_أربعاء_خميس_جمعة_سبت'.split('_'),
	        weekdaysMin: 'ح_ن_ث_ر_خ_ج_س'.split('_'),
	        weekdaysParseExact : true,
	        longDateFormat: {
	            LT: 'HH:mm',
	            LTS: 'HH:mm:ss',
	            L: 'DD/MM/YYYY',
	            LL: 'D MMMM YYYY',
	            LLL: 'D MMMM YYYY HH:mm',
	            LLLL: 'dddd D MMMM YYYY HH:mm'
	        },
	        calendar: {
	            sameDay: '[اليوم على الساعة] LT',
	            nextDay: '[غدا على الساعة] LT',
	            nextWeek: 'dddd [على الساعة] LT',
	            lastDay: '[أمس على الساعة] LT',
	            lastWeek: 'dddd [على الساعة] LT',
	            sameElse: 'L'
	        },
	        relativeTime: {
	            future: 'في %s',
	            past: 'منذ %s',
	            s: 'ثوان',
	            m: 'دقيقة',
	            mm: '%d دقائق',
	            h: 'ساعة',
	            hh: '%d ساعات',
	            d: 'يوم',
	            dd: '%d أيام',
	            M: 'شهر',
	            MM: '%d أشهر',
	            y: 'سنة',
	            yy: '%d سنوات'
	        },
	        week: {
	            dow: 1, // Monday is the first day of the week.
	            doy: 4 // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return ar_tn;

	}));

/***/ },

/***/ 971:
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : azerbaijani (az)
	//! author : topchiyev : https://github.com/topchiyev

	;(function (global, factory) {
	    true ? factory(__webpack_require__(963)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var suffixes = {
	        1: '-inci',
	        5: '-inci',
	        8: '-inci',
	        70: '-inci',
	        80: '-inci',
	        2: '-nci',
	        7: '-nci',
	        20: '-nci',
	        50: '-nci',
	        3: '-üncü',
	        4: '-üncü',
	        100: '-üncü',
	        6: '-ncı',
	        9: '-uncu',
	        10: '-uncu',
	        30: '-uncu',
	        60: '-ıncı',
	        90: '-ıncı'
	    };

	    var az = moment.defineLocale('az', {
	        months : 'yanvar_fevral_mart_aprel_may_iyun_iyul_avqust_sentyabr_oktyabr_noyabr_dekabr'.split('_'),
	        monthsShort : 'yan_fev_mar_apr_may_iyn_iyl_avq_sen_okt_noy_dek'.split('_'),
	        weekdays : 'Bazar_Bazar ertəsi_Çərşənbə axşamı_Çərşənbə_Cümə axşamı_Cümə_Şənbə'.split('_'),
	        weekdaysShort : 'Baz_BzE_ÇAx_Çər_CAx_Cüm_Şən'.split('_'),
	        weekdaysMin : 'Bz_BE_ÇA_Çə_CA_Cü_Şə'.split('_'),
	        weekdaysParseExact : true,
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'DD.MM.YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY HH:mm',
	            LLLL : 'dddd, D MMMM YYYY HH:mm'
	        },
	        calendar : {
	            sameDay : '[bugün saat] LT',
	            nextDay : '[sabah saat] LT',
	            nextWeek : '[gələn həftə] dddd [saat] LT',
	            lastDay : '[dünən] LT',
	            lastWeek : '[keçən həftə] dddd [saat] LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : '%s sonra',
	            past : '%s əvvəl',
	            s : 'birneçə saniyyə',
	            m : 'bir dəqiqə',
	            mm : '%d dəqiqə',
	            h : 'bir saat',
	            hh : '%d saat',
	            d : 'bir gün',
	            dd : '%d gün',
	            M : 'bir ay',
	            MM : '%d ay',
	            y : 'bir il',
	            yy : '%d il'
	        },
	        meridiemParse: /gecə|səhər|gündüz|axşam/,
	        isPM : function (input) {
	            return /^(gündüz|axşam)$/.test(input);
	        },
	        meridiem : function (hour, minute, isLower) {
	            if (hour < 4) {
	                return 'gecə';
	            } else if (hour < 12) {
	                return 'səhər';
	            } else if (hour < 17) {
	                return 'gündüz';
	            } else {
	                return 'axşam';
	            }
	        },
	        ordinalParse: /\d{1,2}-(ıncı|inci|nci|üncü|ncı|uncu)/,
	        ordinal : function (number) {
	            if (number === 0) {  // special case for zero
	                return number + '-ıncı';
	            }
	            var a = number % 10,
	                b = number % 100 - a,
	                c = number >= 100 ? 100 : null;
	            return number + (suffixes[a] || suffixes[b] || suffixes[c]);
	        },
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 7  // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return az;

	}));

/***/ },

/***/ 972:
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : belarusian (be)
	//! author : Dmitry Demidov : https://github.com/demidov91
	//! author: Praleska: http://praleska.pro/
	//! Author : Menelion Elensúle : https://github.com/Oire

	;(function (global, factory) {
	    true ? factory(__webpack_require__(963)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    function plural(word, num) {
	        var forms = word.split('_');
	        return num % 10 === 1 && num % 100 !== 11 ? forms[0] : (num % 10 >= 2 && num % 10 <= 4 && (num % 100 < 10 || num % 100 >= 20) ? forms[1] : forms[2]);
	    }
	    function relativeTimeWithPlural(number, withoutSuffix, key) {
	        var format = {
	            'mm': withoutSuffix ? 'хвіліна_хвіліны_хвілін' : 'хвіліну_хвіліны_хвілін',
	            'hh': withoutSuffix ? 'гадзіна_гадзіны_гадзін' : 'гадзіну_гадзіны_гадзін',
	            'dd': 'дзень_дні_дзён',
	            'MM': 'месяц_месяцы_месяцаў',
	            'yy': 'год_гады_гадоў'
	        };
	        if (key === 'm') {
	            return withoutSuffix ? 'хвіліна' : 'хвіліну';
	        }
	        else if (key === 'h') {
	            return withoutSuffix ? 'гадзіна' : 'гадзіну';
	        }
	        else {
	            return number + ' ' + plural(format[key], +number);
	        }
	    }

	    var be = moment.defineLocale('be', {
	        months : {
	            format: 'студзеня_лютага_сакавіка_красавіка_траўня_чэрвеня_ліпеня_жніўня_верасня_кастрычніка_лістапада_снежня'.split('_'),
	            standalone: 'студзень_люты_сакавік_красавік_травень_чэрвень_ліпень_жнівень_верасень_кастрычнік_лістапад_снежань'.split('_')
	        },
	        monthsShort : 'студ_лют_сак_крас_трав_чэрв_ліп_жнів_вер_каст_ліст_снеж'.split('_'),
	        weekdays : {
	            format: 'нядзелю_панядзелак_аўторак_сераду_чацвер_пятніцу_суботу'.split('_'),
	            standalone: 'нядзеля_панядзелак_аўторак_серада_чацвер_пятніца_субота'.split('_'),
	            isFormat: /\[ ?[Вв] ?(?:мінулую|наступную)? ?\] ?dddd/
	        },
	        weekdaysShort : 'нд_пн_ат_ср_чц_пт_сб'.split('_'),
	        weekdaysMin : 'нд_пн_ат_ср_чц_пт_сб'.split('_'),
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'DD.MM.YYYY',
	            LL : 'D MMMM YYYY г.',
	            LLL : 'D MMMM YYYY г., HH:mm',
	            LLLL : 'dddd, D MMMM YYYY г., HH:mm'
	        },
	        calendar : {
	            sameDay: '[Сёння ў] LT',
	            nextDay: '[Заўтра ў] LT',
	            lastDay: '[Учора ў] LT',
	            nextWeek: function () {
	                return '[У] dddd [ў] LT';
	            },
	            lastWeek: function () {
	                switch (this.day()) {
	                case 0:
	                case 3:
	                case 5:
	                case 6:
	                    return '[У мінулую] dddd [ў] LT';
	                case 1:
	                case 2:
	                case 4:
	                    return '[У мінулы] dddd [ў] LT';
	                }
	            },
	            sameElse: 'L'
	        },
	        relativeTime : {
	            future : 'праз %s',
	            past : '%s таму',
	            s : 'некалькі секунд',
	            m : relativeTimeWithPlural,
	            mm : relativeTimeWithPlural,
	            h : relativeTimeWithPlural,
	            hh : relativeTimeWithPlural,
	            d : 'дзень',
	            dd : relativeTimeWithPlural,
	            M : 'месяц',
	            MM : relativeTimeWithPlural,
	            y : 'год',
	            yy : relativeTimeWithPlural
	        },
	        meridiemParse: /ночы|раніцы|дня|вечара/,
	        isPM : function (input) {
	            return /^(дня|вечара)$/.test(input);
	        },
	        meridiem : function (hour, minute, isLower) {
	            if (hour < 4) {
	                return 'ночы';
	            } else if (hour < 12) {
	                return 'раніцы';
	            } else if (hour < 17) {
	                return 'дня';
	            } else {
	                return 'вечара';
	            }
	        },
	        ordinalParse: /\d{1,2}-(і|ы|га)/,
	        ordinal: function (number, period) {
	            switch (period) {
	            case 'M':
	            case 'd':
	            case 'DDD':
	            case 'w':
	            case 'W':
	                return (number % 10 === 2 || number % 10 === 3) && (number % 100 !== 12 && number % 100 !== 13) ? number + '-і' : number + '-ы';
	            case 'D':
	                return number + '-га';
	            default:
	                return number;
	            }
	        },
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 7  // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return be;

	}));

/***/ },

/***/ 973:
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : bulgarian (bg)
	//! author : Krasen Borisov : https://github.com/kraz

	;(function (global, factory) {
	    true ? factory(__webpack_require__(963)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var bg = moment.defineLocale('bg', {
	        months : 'януари_февруари_март_април_май_юни_юли_август_септември_октомври_ноември_декември'.split('_'),
	        monthsShort : 'янр_фев_мар_апр_май_юни_юли_авг_сеп_окт_ное_дек'.split('_'),
	        weekdays : 'неделя_понеделник_вторник_сряда_четвъртък_петък_събота'.split('_'),
	        weekdaysShort : 'нед_пон_вто_сря_чет_пет_съб'.split('_'),
	        weekdaysMin : 'нд_пн_вт_ср_чт_пт_сб'.split('_'),
	        longDateFormat : {
	            LT : 'H:mm',
	            LTS : 'H:mm:ss',
	            L : 'D.MM.YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY H:mm',
	            LLLL : 'dddd, D MMMM YYYY H:mm'
	        },
	        calendar : {
	            sameDay : '[Днес в] LT',
	            nextDay : '[Утре в] LT',
	            nextWeek : 'dddd [в] LT',
	            lastDay : '[Вчера в] LT',
	            lastWeek : function () {
	                switch (this.day()) {
	                case 0:
	                case 3:
	                case 6:
	                    return '[В изминалата] dddd [в] LT';
	                case 1:
	                case 2:
	                case 4:
	                case 5:
	                    return '[В изминалия] dddd [в] LT';
	                }
	            },
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'след %s',
	            past : 'преди %s',
	            s : 'няколко секунди',
	            m : 'минута',
	            mm : '%d минути',
	            h : 'час',
	            hh : '%d часа',
	            d : 'ден',
	            dd : '%d дни',
	            M : 'месец',
	            MM : '%d месеца',
	            y : 'година',
	            yy : '%d години'
	        },
	        ordinalParse: /\d{1,2}-(ев|ен|ти|ви|ри|ми)/,
	        ordinal : function (number) {
	            var lastDigit = number % 10,
	                last2Digits = number % 100;
	            if (number === 0) {
	                return number + '-ев';
	            } else if (last2Digits === 0) {
	                return number + '-ен';
	            } else if (last2Digits > 10 && last2Digits < 20) {
	                return number + '-ти';
	            } else if (lastDigit === 1) {
	                return number + '-ви';
	            } else if (lastDigit === 2) {
	                return number + '-ри';
	            } else if (lastDigit === 7 || lastDigit === 8) {
	                return number + '-ми';
	            } else {
	                return number + '-ти';
	            }
	        },
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 7  // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return bg;

	}));

/***/ },

/***/ 974:
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Bengali (bn)
	//! author : Kaushik Gandhi : https://github.com/kaushikgandhi

	;(function (global, factory) {
	    true ? factory(__webpack_require__(963)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var symbolMap = {
	        '1': '১',
	        '2': '২',
	        '3': '৩',
	        '4': '৪',
	        '5': '৫',
	        '6': '৬',
	        '7': '৭',
	        '8': '৮',
	        '9': '৯',
	        '0': '০'
	    },
	    numberMap = {
	        '১': '1',
	        '২': '2',
	        '৩': '3',
	        '৪': '4',
	        '৫': '5',
	        '৬': '6',
	        '৭': '7',
	        '৮': '8',
	        '৯': '9',
	        '০': '0'
	    };

	    var bn = moment.defineLocale('bn', {
	        months : 'জানুয়ারী_ফেবুয়ারী_মার্চ_এপ্রিল_মে_জুন_জুলাই_অগাস্ট_সেপ্টেম্বর_অক্টোবর_নভেম্বর_ডিসেম্বর'.split('_'),
	        monthsShort : 'জানু_ফেব_মার্চ_এপর_মে_জুন_জুল_অগ_সেপ্ট_অক্টো_নভ_ডিসেম্'.split('_'),
	        weekdays : 'রবিবার_সোমবার_মঙ্গলবার_বুধবার_বৃহস্পত্তিবার_শুক্রবার_শনিবার'.split('_'),
	        weekdaysShort : 'রবি_সোম_মঙ্গল_বুধ_বৃহস্পত্তি_শুক্র_শনি'.split('_'),
	        weekdaysMin : 'রব_সম_মঙ্গ_বু_ব্রিহ_শু_শনি'.split('_'),
	        longDateFormat : {
	            LT : 'A h:mm সময়',
	            LTS : 'A h:mm:ss সময়',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY, A h:mm সময়',
	            LLLL : 'dddd, D MMMM YYYY, A h:mm সময়'
	        },
	        calendar : {
	            sameDay : '[আজ] LT',
	            nextDay : '[আগামীকাল] LT',
	            nextWeek : 'dddd, LT',
	            lastDay : '[গতকাল] LT',
	            lastWeek : '[গত] dddd, LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : '%s পরে',
	            past : '%s আগে',
	            s : 'কয়েক সেকেন্ড',
	            m : 'এক মিনিট',
	            mm : '%d মিনিট',
	            h : 'এক ঘন্টা',
	            hh : '%d ঘন্টা',
	            d : 'এক দিন',
	            dd : '%d দিন',
	            M : 'এক মাস',
	            MM : '%d মাস',
	            y : 'এক বছর',
	            yy : '%d বছর'
	        },
	        preparse: function (string) {
	            return string.replace(/[১২৩৪৫৬৭৮৯০]/g, function (match) {
	                return numberMap[match];
	            });
	        },
	        postformat: function (string) {
	            return string.replace(/\d/g, function (match) {
	                return symbolMap[match];
	            });
	        },
	        meridiemParse: /রাত|সকাল|দুপুর|বিকাল|রাত/,
	        meridiemHour : function (hour, meridiem) {
	            if (hour === 12) {
	                hour = 0;
	            }
	            if ((meridiem === 'রাত' && hour >= 4) ||
	                    (meridiem === 'দুপুর' && hour < 5) ||
	                    meridiem === 'বিকাল') {
	                return hour + 12;
	            } else {
	                return hour;
	            }
	        },
	        meridiem : function (hour, minute, isLower) {
	            if (hour < 4) {
	                return 'রাত';
	            } else if (hour < 10) {
	                return 'সকাল';
	            } else if (hour < 17) {
	                return 'দুপুর';
	            } else if (hour < 20) {
	                return 'বিকাল';
	            } else {
	                return 'রাত';
	            }
	        },
	        week : {
	            dow : 0, // Sunday is the first day of the week.
	            doy : 6  // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return bn;

	}));

/***/ },

/***/ 975:
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : tibetan (bo)
	//! author : Thupten N. Chakrishar : https://github.com/vajradog

	;(function (global, factory) {
	    true ? factory(__webpack_require__(963)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var symbolMap = {
	        '1': '༡',
	        '2': '༢',
	        '3': '༣',
	        '4': '༤',
	        '5': '༥',
	        '6': '༦',
	        '7': '༧',
	        '8': '༨',
	        '9': '༩',
	        '0': '༠'
	    },
	    numberMap = {
	        '༡': '1',
	        '༢': '2',
	        '༣': '3',
	        '༤': '4',
	        '༥': '5',
	        '༦': '6',
	        '༧': '7',
	        '༨': '8',
	        '༩': '9',
	        '༠': '0'
	    };

	    var bo = moment.defineLocale('bo', {
	        months : 'ཟླ་བ་དང་པོ_ཟླ་བ་གཉིས་པ_ཟླ་བ་གསུམ་པ_ཟླ་བ་བཞི་པ_ཟླ་བ་ལྔ་པ_ཟླ་བ་དྲུག་པ_ཟླ་བ་བདུན་པ_ཟླ་བ་བརྒྱད་པ_ཟླ་བ་དགུ་པ_ཟླ་བ་བཅུ་པ_ཟླ་བ་བཅུ་གཅིག་པ_ཟླ་བ་བཅུ་གཉིས་པ'.split('_'),
	        monthsShort : 'ཟླ་བ་དང་པོ_ཟླ་བ་གཉིས་པ_ཟླ་བ་གསུམ་པ_ཟླ་བ་བཞི་པ_ཟླ་བ་ལྔ་པ_ཟླ་བ་དྲུག་པ_ཟླ་བ་བདུན་པ_ཟླ་བ་བརྒྱད་པ_ཟླ་བ་དགུ་པ_ཟླ་བ་བཅུ་པ_ཟླ་བ་བཅུ་གཅིག་པ_ཟླ་བ་བཅུ་གཉིས་པ'.split('_'),
	        weekdays : 'གཟའ་ཉི་མ་_གཟའ་ཟླ་བ་_གཟའ་མིག་དམར་_གཟའ་ལྷག་པ་_གཟའ་ཕུར་བུ_གཟའ་པ་སངས་_གཟའ་སྤེན་པ་'.split('_'),
	        weekdaysShort : 'ཉི་མ་_ཟླ་བ་_མིག་དམར་_ལྷག་པ་_ཕུར་བུ_པ་སངས་_སྤེན་པ་'.split('_'),
	        weekdaysMin : 'ཉི་མ་_ཟླ་བ་_མིག་དམར་_ལྷག་པ་_ཕུར་བུ_པ་སངས་_སྤེན་པ་'.split('_'),
	        longDateFormat : {
	            LT : 'A h:mm',
	            LTS : 'A h:mm:ss',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY, A h:mm',
	            LLLL : 'dddd, D MMMM YYYY, A h:mm'
	        },
	        calendar : {
	            sameDay : '[དི་རིང] LT',
	            nextDay : '[སང་ཉིན] LT',
	            nextWeek : '[བདུན་ཕྲག་རྗེས་མ], LT',
	            lastDay : '[ཁ་སང] LT',
	            lastWeek : '[བདུན་ཕྲག་མཐའ་མ] dddd, LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : '%s ལ་',
	            past : '%s སྔན་ལ',
	            s : 'ལམ་སང',
	            m : 'སྐར་མ་གཅིག',
	            mm : '%d སྐར་མ',
	            h : 'ཆུ་ཚོད་གཅིག',
	            hh : '%d ཆུ་ཚོད',
	            d : 'ཉིན་གཅིག',
	            dd : '%d ཉིན་',
	            M : 'ཟླ་བ་གཅིག',
	            MM : '%d ཟླ་བ',
	            y : 'ལོ་གཅིག',
	            yy : '%d ལོ'
	        },
	        preparse: function (string) {
	            return string.replace(/[༡༢༣༤༥༦༧༨༩༠]/g, function (match) {
	                return numberMap[match];
	            });
	        },
	        postformat: function (string) {
	            return string.replace(/\d/g, function (match) {
	                return symbolMap[match];
	            });
	        },
	        meridiemParse: /མཚན་མོ|ཞོགས་ཀས|ཉིན་གུང|དགོང་དག|མཚན་མོ/,
	        meridiemHour : function (hour, meridiem) {
	            if (hour === 12) {
	                hour = 0;
	            }
	            if ((meridiem === 'མཚན་མོ' && hour >= 4) ||
	                    (meridiem === 'ཉིན་གུང' && hour < 5) ||
	                    meridiem === 'དགོང་དག') {
	                return hour + 12;
	            } else {
	                return hour;
	            }
	        },
	        meridiem : function (hour, minute, isLower) {
	            if (hour < 4) {
	                return 'མཚན་མོ';
	            } else if (hour < 10) {
	                return 'ཞོགས་ཀས';
	            } else if (hour < 17) {
	                return 'ཉིན་གུང';
	            } else if (hour < 20) {
	                return 'དགོང་དག';
	            } else {
	                return 'མཚན་མོ';
	            }
	        },
	        week : {
	            dow : 0, // Sunday is the first day of the week.
	            doy : 6  // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return bo;

	}));

/***/ },

/***/ 976:
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : breton (br)
	//! author : Jean-Baptiste Le Duigou : https://github.com/jbleduigou

	;(function (global, factory) {
	    true ? factory(__webpack_require__(963)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    function relativeTimeWithMutation(number, withoutSuffix, key) {
	        var format = {
	            'mm': 'munutenn',
	            'MM': 'miz',
	            'dd': 'devezh'
	        };
	        return number + ' ' + mutation(format[key], number);
	    }
	    function specialMutationForYears(number) {
	        switch (lastNumber(number)) {
	        case 1:
	        case 3:
	        case 4:
	        case 5:
	        case 9:
	            return number + ' bloaz';
	        default:
	            return number + ' vloaz';
	        }
	    }
	    function lastNumber(number) {
	        if (number > 9) {
	            return lastNumber(number % 10);
	        }
	        return number;
	    }
	    function mutation(text, number) {
	        if (number === 2) {
	            return softMutation(text);
	        }
	        return text;
	    }
	    function softMutation(text) {
	        var mutationTable = {
	            'm': 'v',
	            'b': 'v',
	            'd': 'z'
	        };
	        if (mutationTable[text.charAt(0)] === undefined) {
	            return text;
	        }
	        return mutationTable[text.charAt(0)] + text.substring(1);
	    }

	    var br = moment.defineLocale('br', {
	        months : 'Genver_C\'hwevrer_Meurzh_Ebrel_Mae_Mezheven_Gouere_Eost_Gwengolo_Here_Du_Kerzu'.split('_'),
	        monthsShort : 'Gen_C\'hwe_Meu_Ebr_Mae_Eve_Gou_Eos_Gwe_Her_Du_Ker'.split('_'),
	        weekdays : 'Sul_Lun_Meurzh_Merc\'her_Yaou_Gwener_Sadorn'.split('_'),
	        weekdaysShort : 'Sul_Lun_Meu_Mer_Yao_Gwe_Sad'.split('_'),
	        weekdaysMin : 'Su_Lu_Me_Mer_Ya_Gw_Sa'.split('_'),
	        weekdaysParseExact : true,
	        longDateFormat : {
	            LT : 'h[e]mm A',
	            LTS : 'h[e]mm:ss A',
	            L : 'DD/MM/YYYY',
	            LL : 'D [a viz] MMMM YYYY',
	            LLL : 'D [a viz] MMMM YYYY h[e]mm A',
	            LLLL : 'dddd, D [a viz] MMMM YYYY h[e]mm A'
	        },
	        calendar : {
	            sameDay : '[Hiziv da] LT',
	            nextDay : '[Warc\'hoazh da] LT',
	            nextWeek : 'dddd [da] LT',
	            lastDay : '[Dec\'h da] LT',
	            lastWeek : 'dddd [paset da] LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'a-benn %s',
	            past : '%s \'zo',
	            s : 'un nebeud segondennoù',
	            m : 'ur vunutenn',
	            mm : relativeTimeWithMutation,
	            h : 'un eur',
	            hh : '%d eur',
	            d : 'un devezh',
	            dd : relativeTimeWithMutation,
	            M : 'ur miz',
	            MM : relativeTimeWithMutation,
	            y : 'ur bloaz',
	            yy : specialMutationForYears
	        },
	        ordinalParse: /\d{1,2}(añ|vet)/,
	        ordinal : function (number) {
	            var output = (number === 1) ? 'añ' : 'vet';
	            return number + output;
	        },
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return br;

	}));

/***/ },

/***/ 977:
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : bosnian (bs)
	//! author : Nedim Cholich : https://github.com/frontyard
	//! based on (hr) translation by Bojan Marković

	;(function (global, factory) {
	    true ? factory(__webpack_require__(963)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    function translate(number, withoutSuffix, key) {
	        var result = number + ' ';
	        switch (key) {
	        case 'm':
	            return withoutSuffix ? 'jedna minuta' : 'jedne minute';
	        case 'mm':
	            if (number === 1) {
	                result += 'minuta';
	            } else if (number === 2 || number === 3 || number === 4) {
	                result += 'minute';
	            } else {
	                result += 'minuta';
	            }
	            return result;
	        case 'h':
	            return withoutSuffix ? 'jedan sat' : 'jednog sata';
	        case 'hh':
	            if (number === 1) {
	                result += 'sat';
	            } else if (number === 2 || number === 3 || number === 4) {
	                result += 'sata';
	            } else {
	                result += 'sati';
	            }
	            return result;
	        case 'dd':
	            if (number === 1) {
	                result += 'dan';
	            } else {
	                result += 'dana';
	            }
	            return result;
	        case 'MM':
	            if (number === 1) {
	                result += 'mjesec';
	            } else if (number === 2 || number === 3 || number === 4) {
	                result += 'mjeseca';
	            } else {
	                result += 'mjeseci';
	            }
	            return result;
	        case 'yy':
	            if (number === 1) {
	                result += 'godina';
	            } else if (number === 2 || number === 3 || number === 4) {
	                result += 'godine';
	            } else {
	                result += 'godina';
	            }
	            return result;
	        }
	    }

	    var bs = moment.defineLocale('bs', {
	        months : 'januar_februar_mart_april_maj_juni_juli_august_septembar_oktobar_novembar_decembar'.split('_'),
	        monthsShort : 'jan._feb._mar._apr._maj._jun._jul._aug._sep._okt._nov._dec.'.split('_'),
	        monthsParseExact: true,
	        weekdays : 'nedjelja_ponedjeljak_utorak_srijeda_četvrtak_petak_subota'.split('_'),
	        weekdaysShort : 'ned._pon._uto._sri._čet._pet._sub.'.split('_'),
	        weekdaysMin : 'ne_po_ut_sr_če_pe_su'.split('_'),
	        weekdaysParseExact : true,
	        longDateFormat : {
	            LT : 'H:mm',
	            LTS : 'H:mm:ss',
	            L : 'DD. MM. YYYY',
	            LL : 'D. MMMM YYYY',
	            LLL : 'D. MMMM YYYY H:mm',
	            LLLL : 'dddd, D. MMMM YYYY H:mm'
	        },
	        calendar : {
	            sameDay  : '[danas u] LT',
	            nextDay  : '[sutra u] LT',
	            nextWeek : function () {
	                switch (this.day()) {
	                case 0:
	                    return '[u] [nedjelju] [u] LT';
	                case 3:
	                    return '[u] [srijedu] [u] LT';
	                case 6:
	                    return '[u] [subotu] [u] LT';
	                case 1:
	                case 2:
	                case 4:
	                case 5:
	                    return '[u] dddd [u] LT';
	                }
	            },
	            lastDay  : '[jučer u] LT',
	            lastWeek : function () {
	                switch (this.day()) {
	                case 0:
	                case 3:
	                    return '[prošlu] dddd [u] LT';
	                case 6:
	                    return '[prošle] [subote] [u] LT';
	                case 1:
	                case 2:
	                case 4:
	                case 5:
	                    return '[prošli] dddd [u] LT';
	                }
	            },
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'za %s',
	            past   : 'prije %s',
	            s      : 'par sekundi',
	            m      : translate,
	            mm     : translate,
	            h      : translate,
	            hh     : translate,
	            d      : 'dan',
	            dd     : translate,
	            M      : 'mjesec',
	            MM     : translate,
	            y      : 'godinu',
	            yy     : translate
	        },
	        ordinalParse: /\d{1,2}\./,
	        ordinal : '%d.',
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 7  // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return bs;

	}));

/***/ },

/***/ 978:
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : catalan (ca)
	//! author : Juan G. Hurtado : https://github.com/juanghurtado

	;(function (global, factory) {
	    true ? factory(__webpack_require__(963)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var ca = moment.defineLocale('ca', {
	        months : 'gener_febrer_març_abril_maig_juny_juliol_agost_setembre_octubre_novembre_desembre'.split('_'),
	        monthsShort : 'gen._febr._mar._abr._mai._jun._jul._ag._set._oct._nov._des.'.split('_'),
	        monthsParseExact : true,
	        weekdays : 'diumenge_dilluns_dimarts_dimecres_dijous_divendres_dissabte'.split('_'),
	        weekdaysShort : 'dg._dl._dt._dc._dj._dv._ds.'.split('_'),
	        weekdaysMin : 'Dg_Dl_Dt_Dc_Dj_Dv_Ds'.split('_'),
	        weekdaysParseExact : true,
	        longDateFormat : {
	            LT : 'H:mm',
	            LTS : 'H:mm:ss',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY H:mm',
	            LLLL : 'dddd D MMMM YYYY H:mm'
	        },
	        calendar : {
	            sameDay : function () {
	                return '[avui a ' + ((this.hours() !== 1) ? 'les' : 'la') + '] LT';
	            },
	            nextDay : function () {
	                return '[demà a ' + ((this.hours() !== 1) ? 'les' : 'la') + '] LT';
	            },
	            nextWeek : function () {
	                return 'dddd [a ' + ((this.hours() !== 1) ? 'les' : 'la') + '] LT';
	            },
	            lastDay : function () {
	                return '[ahir a ' + ((this.hours() !== 1) ? 'les' : 'la') + '] LT';
	            },
	            lastWeek : function () {
	                return '[el] dddd [passat a ' + ((this.hours() !== 1) ? 'les' : 'la') + '] LT';
	            },
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'en %s',
	            past : 'fa %s',
	            s : 'uns segons',
	            m : 'un minut',
	            mm : '%d minuts',
	            h : 'una hora',
	            hh : '%d hores',
	            d : 'un dia',
	            dd : '%d dies',
	            M : 'un mes',
	            MM : '%d mesos',
	            y : 'un any',
	            yy : '%d anys'
	        },
	        ordinalParse: /\d{1,2}(r|n|t|è|a)/,
	        ordinal : function (number, period) {
	            var output = (number === 1) ? 'r' :
	                (number === 2) ? 'n' :
	                (number === 3) ? 'r' :
	                (number === 4) ? 't' : 'è';
	            if (period === 'w' || period === 'W') {
	                output = 'a';
	            }
	            return number + output;
	        },
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return ca;

	}));

/***/ },

/***/ 979:
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : czech (cs)
	//! author : petrbela : https://github.com/petrbela

	;(function (global, factory) {
	    true ? factory(__webpack_require__(963)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var months = 'leden_únor_březen_duben_květen_červen_červenec_srpen_září_říjen_listopad_prosinec'.split('_'),
	        monthsShort = 'led_úno_bře_dub_kvě_čvn_čvc_srp_zář_říj_lis_pro'.split('_');
	    function plural(n) {
	        return (n > 1) && (n < 5) && (~~(n / 10) !== 1);
	    }
	    function translate(number, withoutSuffix, key, isFuture) {
	        var result = number + ' ';
	        switch (key) {
	        case 's':  // a few seconds / in a few seconds / a few seconds ago
	            return (withoutSuffix || isFuture) ? 'pár sekund' : 'pár sekundami';
	        case 'm':  // a minute / in a minute / a minute ago
	            return withoutSuffix ? 'minuta' : (isFuture ? 'minutu' : 'minutou');
	        case 'mm': // 9 minutes / in 9 minutes / 9 minutes ago
	            if (withoutSuffix || isFuture) {
	                return result + (plural(number) ? 'minuty' : 'minut');
	            } else {
	                return result + 'minutami';
	            }
	            break;
	        case 'h':  // an hour / in an hour / an hour ago
	            return withoutSuffix ? 'hodina' : (isFuture ? 'hodinu' : 'hodinou');
	        case 'hh': // 9 hours / in 9 hours / 9 hours ago
	            if (withoutSuffix || isFuture) {
	                return result + (plural(number) ? 'hodiny' : 'hodin');
	            } else {
	                return result + 'hodinami';
	            }
	            break;
	        case 'd':  // a day / in a day / a day ago
	            return (withoutSuffix || isFuture) ? 'den' : 'dnem';
	        case 'dd': // 9 days / in 9 days / 9 days ago
	            if (withoutSuffix || isFuture) {
	                return result + (plural(number) ? 'dny' : 'dní');
	            } else {
	                return result + 'dny';
	            }
	            break;
	        case 'M':  // a month / in a month / a month ago
	            return (withoutSuffix || isFuture) ? 'měsíc' : 'měsícem';
	        case 'MM': // 9 months / in 9 months / 9 months ago
	            if (withoutSuffix || isFuture) {
	                return result + (plural(number) ? 'měsíce' : 'měsíců');
	            } else {
	                return result + 'měsíci';
	            }
	            break;
	        case 'y':  // a year / in a year / a year ago
	            return (withoutSuffix || isFuture) ? 'rok' : 'rokem';
	        case 'yy': // 9 years / in 9 years / 9 years ago
	            if (withoutSuffix || isFuture) {
	                return result + (plural(number) ? 'roky' : 'let');
	            } else {
	                return result + 'lety';
	            }
	            break;
	        }
	    }

	    var cs = moment.defineLocale('cs', {
	        months : months,
	        monthsShort : monthsShort,
	        monthsParse : (function (months, monthsShort) {
	            var i, _monthsParse = [];
	            for (i = 0; i < 12; i++) {
	                // use custom parser to solve problem with July (červenec)
	                _monthsParse[i] = new RegExp('^' + months[i] + '$|^' + monthsShort[i] + '$', 'i');
	            }
	            return _monthsParse;
	        }(months, monthsShort)),
	        shortMonthsParse : (function (monthsShort) {
	            var i, _shortMonthsParse = [];
	            for (i = 0; i < 12; i++) {
	                _shortMonthsParse[i] = new RegExp('^' + monthsShort[i] + '$', 'i');
	            }
	            return _shortMonthsParse;
	        }(monthsShort)),
	        longMonthsParse : (function (months) {
	            var i, _longMonthsParse = [];
	            for (i = 0; i < 12; i++) {
	                _longMonthsParse[i] = new RegExp('^' + months[i] + '$', 'i');
	            }
	            return _longMonthsParse;
	        }(months)),
	        weekdays : 'neděle_pondělí_úterý_středa_čtvrtek_pátek_sobota'.split('_'),
	        weekdaysShort : 'ne_po_út_st_čt_pá_so'.split('_'),
	        weekdaysMin : 'ne_po_út_st_čt_pá_so'.split('_'),
	        longDateFormat : {
	            LT: 'H:mm',
	            LTS : 'H:mm:ss',
	            L : 'DD.MM.YYYY',
	            LL : 'D. MMMM YYYY',
	            LLL : 'D. MMMM YYYY H:mm',
	            LLLL : 'dddd D. MMMM YYYY H:mm'
	        },
	        calendar : {
	            sameDay: '[dnes v] LT',
	            nextDay: '[zítra v] LT',
	            nextWeek: function () {
	                switch (this.day()) {
	                case 0:
	                    return '[v neděli v] LT';
	                case 1:
	                case 2:
	                    return '[v] dddd [v] LT';
	                case 3:
	                    return '[ve středu v] LT';
	                case 4:
	                    return '[ve čtvrtek v] LT';
	                case 5:
	                    return '[v pátek v] LT';
	                case 6:
	                    return '[v sobotu v] LT';
	                }
	            },
	            lastDay: '[včera v] LT',
	            lastWeek: function () {
	                switch (this.day()) {
	                case 0:
	                    return '[minulou neděli v] LT';
	                case 1:
	                case 2:
	                    return '[minulé] dddd [v] LT';
	                case 3:
	                    return '[minulou středu v] LT';
	                case 4:
	                case 5:
	                    return '[minulý] dddd [v] LT';
	                case 6:
	                    return '[minulou sobotu v] LT';
	                }
	            },
	            sameElse: 'L'
	        },
	        relativeTime : {
	            future : 'za %s',
	            past : 'před %s',
	            s : translate,
	            m : translate,
	            mm : translate,
	            h : translate,
	            hh : translate,
	            d : translate,
	            dd : translate,
	            M : translate,
	            MM : translate,
	            y : translate,
	            yy : translate
	        },
	        ordinalParse : /\d{1,2}\./,
	        ordinal : '%d.',
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return cs;

	}));

/***/ },

/***/ 980:
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : chuvash (cv)
	//! author : Anatoly Mironov : https://github.com/mirontoli

	;(function (global, factory) {
	    true ? factory(__webpack_require__(963)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var cv = moment.defineLocale('cv', {
	        months : 'кӑрлач_нарӑс_пуш_ака_май_ҫӗртме_утӑ_ҫурла_авӑн_юпа_чӳк_раштав'.split('_'),
	        monthsShort : 'кӑр_нар_пуш_ака_май_ҫӗр_утӑ_ҫур_авн_юпа_чӳк_раш'.split('_'),
	        weekdays : 'вырсарникун_тунтикун_ытларикун_юнкун_кӗҫнерникун_эрнекун_шӑматкун'.split('_'),
	        weekdaysShort : 'выр_тун_ытл_юн_кӗҫ_эрн_шӑм'.split('_'),
	        weekdaysMin : 'вр_тн_ыт_юн_кҫ_эр_шм'.split('_'),
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'DD-MM-YYYY',
	            LL : 'YYYY [ҫулхи] MMMM [уйӑхӗн] D[-мӗшӗ]',
	            LLL : 'YYYY [ҫулхи] MMMM [уйӑхӗн] D[-мӗшӗ], HH:mm',
	            LLLL : 'dddd, YYYY [ҫулхи] MMMM [уйӑхӗн] D[-мӗшӗ], HH:mm'
	        },
	        calendar : {
	            sameDay: '[Паян] LT [сехетре]',
	            nextDay: '[Ыран] LT [сехетре]',
	            lastDay: '[Ӗнер] LT [сехетре]',
	            nextWeek: '[Ҫитес] dddd LT [сехетре]',
	            lastWeek: '[Иртнӗ] dddd LT [сехетре]',
	            sameElse: 'L'
	        },
	        relativeTime : {
	            future : function (output) {
	                var affix = /сехет$/i.exec(output) ? 'рен' : /ҫул$/i.exec(output) ? 'тан' : 'ран';
	                return output + affix;
	            },
	            past : '%s каялла',
	            s : 'пӗр-ик ҫеккунт',
	            m : 'пӗр минут',
	            mm : '%d минут',
	            h : 'пӗр сехет',
	            hh : '%d сехет',
	            d : 'пӗр кун',
	            dd : '%d кун',
	            M : 'пӗр уйӑх',
	            MM : '%d уйӑх',
	            y : 'пӗр ҫул',
	            yy : '%d ҫул'
	        },
	        ordinalParse: /\d{1,2}-мӗш/,
	        ordinal : '%d-мӗш',
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 7  // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return cv;

	}));

/***/ },

/***/ 981:
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Welsh (cy)
	//! author : Robert Allen

	;(function (global, factory) {
	    true ? factory(__webpack_require__(963)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var cy = moment.defineLocale('cy', {
	        months: 'Ionawr_Chwefror_Mawrth_Ebrill_Mai_Mehefin_Gorffennaf_Awst_Medi_Hydref_Tachwedd_Rhagfyr'.split('_'),
	        monthsShort: 'Ion_Chwe_Maw_Ebr_Mai_Meh_Gor_Aws_Med_Hyd_Tach_Rhag'.split('_'),
	        weekdays: 'Dydd Sul_Dydd Llun_Dydd Mawrth_Dydd Mercher_Dydd Iau_Dydd Gwener_Dydd Sadwrn'.split('_'),
	        weekdaysShort: 'Sul_Llun_Maw_Mer_Iau_Gwe_Sad'.split('_'),
	        weekdaysMin: 'Su_Ll_Ma_Me_Ia_Gw_Sa'.split('_'),
	        weekdaysParseExact : true,
	        // time formats are the same as en-gb
	        longDateFormat: {
	            LT: 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L: 'DD/MM/YYYY',
	            LL: 'D MMMM YYYY',
	            LLL: 'D MMMM YYYY HH:mm',
	            LLLL: 'dddd, D MMMM YYYY HH:mm'
	        },
	        calendar: {
	            sameDay: '[Heddiw am] LT',
	            nextDay: '[Yfory am] LT',
	            nextWeek: 'dddd [am] LT',
	            lastDay: '[Ddoe am] LT',
	            lastWeek: 'dddd [diwethaf am] LT',
	            sameElse: 'L'
	        },
	        relativeTime: {
	            future: 'mewn %s',
	            past: '%s yn ôl',
	            s: 'ychydig eiliadau',
	            m: 'munud',
	            mm: '%d munud',
	            h: 'awr',
	            hh: '%d awr',
	            d: 'diwrnod',
	            dd: '%d diwrnod',
	            M: 'mis',
	            MM: '%d mis',
	            y: 'blwyddyn',
	            yy: '%d flynedd'
	        },
	        ordinalParse: /\d{1,2}(fed|ain|af|il|ydd|ed|eg)/,
	        // traditional ordinal numbers above 31 are not commonly used in colloquial Welsh
	        ordinal: function (number) {
	            var b = number,
	                output = '',
	                lookup = [
	                    '', 'af', 'il', 'ydd', 'ydd', 'ed', 'ed', 'ed', 'fed', 'fed', 'fed', // 1af to 10fed
	                    'eg', 'fed', 'eg', 'eg', 'fed', 'eg', 'eg', 'fed', 'eg', 'fed' // 11eg to 20fed
	                ];
	            if (b > 20) {
	                if (b === 40 || b === 50 || b === 60 || b === 80 || b === 100) {
	                    output = 'fed'; // not 30ain, 70ain or 90ain
	                } else {
	                    output = 'ain';
	                }
	            } else if (b > 0) {
	                output = lookup[b];
	            }
	            return number + output;
	        },
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return cy;

	}));

/***/ },

/***/ 982:
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : danish (da)
	//! author : Ulrik Nielsen : https://github.com/mrbase

	;(function (global, factory) {
	    true ? factory(__webpack_require__(963)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var da = moment.defineLocale('da', {
	        months : 'januar_februar_marts_april_maj_juni_juli_august_september_oktober_november_december'.split('_'),
	        monthsShort : 'jan_feb_mar_apr_maj_jun_jul_aug_sep_okt_nov_dec'.split('_'),
	        weekdays : 'søndag_mandag_tirsdag_onsdag_torsdag_fredag_lørdag'.split('_'),
	        weekdaysShort : 'søn_man_tir_ons_tor_fre_lør'.split('_'),
	        weekdaysMin : 'sø_ma_ti_on_to_fr_lø'.split('_'),
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'DD/MM/YYYY',
	            LL : 'D. MMMM YYYY',
	            LLL : 'D. MMMM YYYY HH:mm',
	            LLLL : 'dddd [d.] D. MMMM YYYY HH:mm'
	        },
	        calendar : {
	            sameDay : '[I dag kl.] LT',
	            nextDay : '[I morgen kl.] LT',
	            nextWeek : 'dddd [kl.] LT',
	            lastDay : '[I går kl.] LT',
	            lastWeek : '[sidste] dddd [kl] LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'om %s',
	            past : '%s siden',
	            s : 'få sekunder',
	            m : 'et minut',
	            mm : '%d minutter',
	            h : 'en time',
	            hh : '%d timer',
	            d : 'en dag',
	            dd : '%d dage',
	            M : 'en måned',
	            MM : '%d måneder',
	            y : 'et år',
	            yy : '%d år'
	        },
	        ordinalParse: /\d{1,2}\./,
	        ordinal : '%d.',
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return da;

	}));

/***/ },

/***/ 983:
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : german (de)
	//! author : lluchs : https://github.com/lluchs
	//! author: Menelion Elensúle: https://github.com/Oire
	//! author : Mikolaj Dadela : https://github.com/mik01aj

	;(function (global, factory) {
	    true ? factory(__webpack_require__(963)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    function processRelativeTime(number, withoutSuffix, key, isFuture) {
	        var format = {
	            'm': ['eine Minute', 'einer Minute'],
	            'h': ['eine Stunde', 'einer Stunde'],
	            'd': ['ein Tag', 'einem Tag'],
	            'dd': [number + ' Tage', number + ' Tagen'],
	            'M': ['ein Monat', 'einem Monat'],
	            'MM': [number + ' Monate', number + ' Monaten'],
	            'y': ['ein Jahr', 'einem Jahr'],
	            'yy': [number + ' Jahre', number + ' Jahren']
	        };
	        return withoutSuffix ? format[key][0] : format[key][1];
	    }

	    var de = moment.defineLocale('de', {
	        months : 'Januar_Februar_März_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember'.split('_'),
	        monthsShort : 'Jan._Febr._Mrz._Apr._Mai_Jun._Jul._Aug._Sept._Okt._Nov._Dez.'.split('_'),
	        monthsParseExact : true,
	        weekdays : 'Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag'.split('_'),
	        weekdaysShort : 'So._Mo._Di._Mi._Do._Fr._Sa.'.split('_'),
	        weekdaysMin : 'So_Mo_Di_Mi_Do_Fr_Sa'.split('_'),
	        weekdaysParseExact : true,
	        longDateFormat : {
	            LT: 'HH:mm',
	            LTS: 'HH:mm:ss',
	            L : 'DD.MM.YYYY',
	            LL : 'D. MMMM YYYY',
	            LLL : 'D. MMMM YYYY HH:mm',
	            LLLL : 'dddd, D. MMMM YYYY HH:mm'
	        },
	        calendar : {
	            sameDay: '[heute um] LT [Uhr]',
	            sameElse: 'L',
	            nextDay: '[morgen um] LT [Uhr]',
	            nextWeek: 'dddd [um] LT [Uhr]',
	            lastDay: '[gestern um] LT [Uhr]',
	            lastWeek: '[letzten] dddd [um] LT [Uhr]'
	        },
	        relativeTime : {
	            future : 'in %s',
	            past : 'vor %s',
	            s : 'ein paar Sekunden',
	            m : processRelativeTime,
	            mm : '%d Minuten',
	            h : processRelativeTime,
	            hh : '%d Stunden',
	            d : processRelativeTime,
	            dd : processRelativeTime,
	            M : processRelativeTime,
	            MM : processRelativeTime,
	            y : processRelativeTime,
	            yy : processRelativeTime
	        },
	        ordinalParse: /\d{1,2}\./,
	        ordinal : '%d.',
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return de;

	}));

/***/ },

/***/ 984:
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : austrian german (de-at)
	//! author : lluchs : https://github.com/lluchs
	//! author: Menelion Elensúle: https://github.com/Oire
	//! author : Martin Groller : https://github.com/MadMG
	//! author : Mikolaj Dadela : https://github.com/mik01aj

	;(function (global, factory) {
	    true ? factory(__webpack_require__(963)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    function processRelativeTime(number, withoutSuffix, key, isFuture) {
	        var format = {
	            'm': ['eine Minute', 'einer Minute'],
	            'h': ['eine Stunde', 'einer Stunde'],
	            'd': ['ein Tag', 'einem Tag'],
	            'dd': [number + ' Tage', number + ' Tagen'],
	            'M': ['ein Monat', 'einem Monat'],
	            'MM': [number + ' Monate', number + ' Monaten'],
	            'y': ['ein Jahr', 'einem Jahr'],
	            'yy': [number + ' Jahre', number + ' Jahren']
	        };
	        return withoutSuffix ? format[key][0] : format[key][1];
	    }

	    var de_at = moment.defineLocale('de-at', {
	        months : 'Jänner_Februar_März_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember'.split('_'),
	        monthsShort : 'Jän._Febr._Mrz._Apr._Mai_Jun._Jul._Aug._Sept._Okt._Nov._Dez.'.split('_'),
	        monthsParseExact : true,
	        weekdays : 'Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag'.split('_'),
	        weekdaysShort : 'So._Mo._Di._Mi._Do._Fr._Sa.'.split('_'),
	        weekdaysMin : 'So_Mo_Di_Mi_Do_Fr_Sa'.split('_'),
	        weekdaysParseExact : true,
	        longDateFormat : {
	            LT: 'HH:mm',
	            LTS: 'HH:mm:ss',
	            L : 'DD.MM.YYYY',
	            LL : 'D. MMMM YYYY',
	            LLL : 'D. MMMM YYYY HH:mm',
	            LLLL : 'dddd, D. MMMM YYYY HH:mm'
	        },
	        calendar : {
	            sameDay: '[heute um] LT [Uhr]',
	            sameElse: 'L',
	            nextDay: '[morgen um] LT [Uhr]',
	            nextWeek: 'dddd [um] LT [Uhr]',
	            lastDay: '[gestern um] LT [Uhr]',
	            lastWeek: '[letzten] dddd [um] LT [Uhr]'
	        },
	        relativeTime : {
	            future : 'in %s',
	            past : 'vor %s',
	            s : 'ein paar Sekunden',
	            m : processRelativeTime,
	            mm : '%d Minuten',
	            h : processRelativeTime,
	            hh : '%d Stunden',
	            d : processRelativeTime,
	            dd : processRelativeTime,
	            M : processRelativeTime,
	            MM : processRelativeTime,
	            y : processRelativeTime,
	            yy : processRelativeTime
	        },
	        ordinalParse: /\d{1,2}\./,
	        ordinal : '%d.',
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return de_at;

	}));

/***/ },

/***/ 985:
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : dhivehi (dv)
	//! author : Jawish Hameed : https://github.com/jawish

	;(function (global, factory) {
	    true ? factory(__webpack_require__(963)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var months = [
	        'ޖެނުއަރީ',
	        'ފެބްރުއަރީ',
	        'މާރިޗު',
	        'އޭޕްރީލު',
	        'މޭ',
	        'ޖޫން',
	        'ޖުލައި',
	        'އޯގަސްޓު',
	        'ސެޕްޓެމްބަރު',
	        'އޮކްޓޯބަރު',
	        'ނޮވެމްބަރު',
	        'ޑިސެމްބަރު'
	    ], weekdays = [
	        'އާދިއްތަ',
	        'ހޯމަ',
	        'އަންގާރަ',
	        'ބުދަ',
	        'ބުރާސްފަތި',
	        'ހުކުރު',
	        'ހޮނިހިރު'
	    ];

	    var dv = moment.defineLocale('dv', {
	        months : months,
	        monthsShort : months,
	        weekdays : weekdays,
	        weekdaysShort : weekdays,
	        weekdaysMin : 'އާދި_ހޯމަ_އަން_ބުދަ_ބުރާ_ހުކު_ހޮނި'.split('_'),
	        longDateFormat : {

	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'D/M/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY HH:mm',
	            LLLL : 'dddd D MMMM YYYY HH:mm'
	        },
	        meridiemParse: /މކ|މފ/,
	        isPM : function (input) {
	            return 'މފ' === input;
	        },
	        meridiem : function (hour, minute, isLower) {
	            if (hour < 12) {
	                return 'މކ';
	            } else {
	                return 'މފ';
	            }
	        },
	        calendar : {
	            sameDay : '[މިއަދު] LT',
	            nextDay : '[މާދަމާ] LT',
	            nextWeek : 'dddd LT',
	            lastDay : '[އިއްޔެ] LT',
	            lastWeek : '[ފާއިތުވި] dddd LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'ތެރޭގައި %s',
	            past : 'ކުރިން %s',
	            s : 'ސިކުންތުކޮޅެއް',
	            m : 'މިނިޓެއް',
	            mm : 'މިނިޓު %d',
	            h : 'ގަޑިއިރެއް',
	            hh : 'ގަޑިއިރު %d',
	            d : 'ދުވަހެއް',
	            dd : 'ދުވަސް %d',
	            M : 'މަހެއް',
	            MM : 'މަސް %d',
	            y : 'އަހަރެއް',
	            yy : 'އަހަރު %d'
	        },
	        preparse: function (string) {
	            return string.replace(/،/g, ',');
	        },
	        postformat: function (string) {
	            return string.replace(/,/g, '،');
	        },
	        week : {
	            dow : 7,  // Sunday is the first day of the week.
	            doy : 12  // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return dv;

	}));

/***/ },

/***/ 986:
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : modern greek (el)
	//! author : Aggelos Karalias : https://github.com/mehiel

	;(function (global, factory) {
	    true ? factory(__webpack_require__(963)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';

	    function isFunction(input) {
	        return input instanceof Function || Object.prototype.toString.call(input) === '[object Function]';
	    }


	    var el = moment.defineLocale('el', {
	        monthsNominativeEl : 'Ιανουάριος_Φεβρουάριος_Μάρτιος_Απρίλιος_Μάιος_Ιούνιος_Ιούλιος_Αύγουστος_Σεπτέμβριος_Οκτώβριος_Νοέμβριος_Δεκέμβριος'.split('_'),
	        monthsGenitiveEl : 'Ιανουαρίου_Φεβρουαρίου_Μαρτίου_Απριλίου_Μαΐου_Ιουνίου_Ιουλίου_Αυγούστου_Σεπτεμβρίου_Οκτωβρίου_Νοεμβρίου_Δεκεμβρίου'.split('_'),
	        months : function (momentToFormat, format) {
	            if (/D/.test(format.substring(0, format.indexOf('MMMM')))) { // if there is a day number before 'MMMM'
	                return this._monthsGenitiveEl[momentToFormat.month()];
	            } else {
	                return this._monthsNominativeEl[momentToFormat.month()];
	            }
	        },
	        monthsShort : 'Ιαν_Φεβ_Μαρ_Απρ_Μαϊ_Ιουν_Ιουλ_Αυγ_Σεπ_Οκτ_Νοε_Δεκ'.split('_'),
	        weekdays : 'Κυριακή_Δευτέρα_Τρίτη_Τετάρτη_Πέμπτη_Παρασκευή_Σάββατο'.split('_'),
	        weekdaysShort : 'Κυρ_Δευ_Τρι_Τετ_Πεμ_Παρ_Σαβ'.split('_'),
	        weekdaysMin : 'Κυ_Δε_Τρ_Τε_Πε_Πα_Σα'.split('_'),
	        meridiem : function (hours, minutes, isLower) {
	            if (hours > 11) {
	                return isLower ? 'μμ' : 'ΜΜ';
	            } else {
	                return isLower ? 'πμ' : 'ΠΜ';
	            }
	        },
	        isPM : function (input) {
	            return ((input + '').toLowerCase()[0] === 'μ');
	        },
	        meridiemParse : /[ΠΜ]\.?Μ?\.?/i,
	        longDateFormat : {
	            LT : 'h:mm A',
	            LTS : 'h:mm:ss A',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY h:mm A',
	            LLLL : 'dddd, D MMMM YYYY h:mm A'
	        },
	        calendarEl : {
	            sameDay : '[Σήμερα {}] LT',
	            nextDay : '[Αύριο {}] LT',
	            nextWeek : 'dddd [{}] LT',
	            lastDay : '[Χθες {}] LT',
	            lastWeek : function () {
	                switch (this.day()) {
	                    case 6:
	                        return '[το προηγούμενο] dddd [{}] LT';
	                    default:
	                        return '[την προηγούμενη] dddd [{}] LT';
	                }
	            },
	            sameElse : 'L'
	        },
	        calendar : function (key, mom) {
	            var output = this._calendarEl[key],
	                hours = mom && mom.hours();
	            if (isFunction(output)) {
	                output = output.apply(mom);
	            }
	            return output.replace('{}', (hours % 12 === 1 ? 'στη' : 'στις'));
	        },
	        relativeTime : {
	            future : 'σε %s',
	            past : '%s πριν',
	            s : 'λίγα δευτερόλεπτα',
	            m : 'ένα λεπτό',
	            mm : '%d λεπτά',
	            h : 'μία ώρα',
	            hh : '%d ώρες',
	            d : 'μία μέρα',
	            dd : '%d μέρες',
	            M : 'ένας μήνας',
	            MM : '%d μήνες',
	            y : 'ένας χρόνος',
	            yy : '%d χρόνια'
	        },
	        ordinalParse: /\d{1,2}η/,
	        ordinal: '%dη',
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4st is the first week of the year.
	        }
	    });

	    return el;

	}));

/***/ },

/***/ 987:
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : australian english (en-au)

	;(function (global, factory) {
	    true ? factory(__webpack_require__(963)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var en_au = moment.defineLocale('en-au', {
	        months : 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
	        monthsShort : 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
	        weekdays : 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
	        weekdaysShort : 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
	        weekdaysMin : 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
	        longDateFormat : {
	            LT : 'h:mm A',
	            LTS : 'h:mm:ss A',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY h:mm A',
	            LLLL : 'dddd, D MMMM YYYY h:mm A'
	        },
	        calendar : {
	            sameDay : '[Today at] LT',
	            nextDay : '[Tomorrow at] LT',
	            nextWeek : 'dddd [at] LT',
	            lastDay : '[Yesterday at] LT',
	            lastWeek : '[Last] dddd [at] LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'in %s',
	            past : '%s ago',
	            s : 'a few seconds',
	            m : 'a minute',
	            mm : '%d minutes',
	            h : 'an hour',
	            hh : '%d hours',
	            d : 'a day',
	            dd : '%d days',
	            M : 'a month',
	            MM : '%d months',
	            y : 'a year',
	            yy : '%d years'
	        },
	        ordinalParse: /\d{1,2}(st|nd|rd|th)/,
	        ordinal : function (number) {
	            var b = number % 10,
	                output = (~~(number % 100 / 10) === 1) ? 'th' :
	                (b === 1) ? 'st' :
	                (b === 2) ? 'nd' :
	                (b === 3) ? 'rd' : 'th';
	            return number + output;
	        },
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return en_au;

	}));

/***/ },

/***/ 988:
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : canadian english (en-ca)
	//! author : Jonathan Abourbih : https://github.com/jonbca

	;(function (global, factory) {
	    true ? factory(__webpack_require__(963)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var en_ca = moment.defineLocale('en-ca', {
	        months : 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
	        monthsShort : 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
	        weekdays : 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
	        weekdaysShort : 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
	        weekdaysMin : 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
	        longDateFormat : {
	            LT : 'h:mm A',
	            LTS : 'h:mm:ss A',
	            L : 'YYYY-MM-DD',
	            LL : 'MMMM D, YYYY',
	            LLL : 'MMMM D, YYYY h:mm A',
	            LLLL : 'dddd, MMMM D, YYYY h:mm A'
	        },
	        calendar : {
	            sameDay : '[Today at] LT',
	            nextDay : '[Tomorrow at] LT',
	            nextWeek : 'dddd [at] LT',
	            lastDay : '[Yesterday at] LT',
	            lastWeek : '[Last] dddd [at] LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'in %s',
	            past : '%s ago',
	            s : 'a few seconds',
	            m : 'a minute',
	            mm : '%d minutes',
	            h : 'an hour',
	            hh : '%d hours',
	            d : 'a day',
	            dd : '%d days',
	            M : 'a month',
	            MM : '%d months',
	            y : 'a year',
	            yy : '%d years'
	        },
	        ordinalParse: /\d{1,2}(st|nd|rd|th)/,
	        ordinal : function (number) {
	            var b = number % 10,
	                output = (~~(number % 100 / 10) === 1) ? 'th' :
	                (b === 1) ? 'st' :
	                (b === 2) ? 'nd' :
	                (b === 3) ? 'rd' : 'th';
	            return number + output;
	        }
	    });

	    return en_ca;

	}));

/***/ },

/***/ 989:
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : great britain english (en-gb)
	//! author : Chris Gedrim : https://github.com/chrisgedrim

	;(function (global, factory) {
	    true ? factory(__webpack_require__(963)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var en_gb = moment.defineLocale('en-gb', {
	        months : 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
	        monthsShort : 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
	        weekdays : 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
	        weekdaysShort : 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
	        weekdaysMin : 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY HH:mm',
	            LLLL : 'dddd, D MMMM YYYY HH:mm'
	        },
	        calendar : {
	            sameDay : '[Today at] LT',
	            nextDay : '[Tomorrow at] LT',
	            nextWeek : 'dddd [at] LT',
	            lastDay : '[Yesterday at] LT',
	            lastWeek : '[Last] dddd [at] LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'in %s',
	            past : '%s ago',
	            s : 'a few seconds',
	            m : 'a minute',
	            mm : '%d minutes',
	            h : 'an hour',
	            hh : '%d hours',
	            d : 'a day',
	            dd : '%d days',
	            M : 'a month',
	            MM : '%d months',
	            y : 'a year',
	            yy : '%d years'
	        },
	        ordinalParse: /\d{1,2}(st|nd|rd|th)/,
	        ordinal : function (number) {
	            var b = number % 10,
	                output = (~~(number % 100 / 10) === 1) ? 'th' :
	                (b === 1) ? 'st' :
	                (b === 2) ? 'nd' :
	                (b === 3) ? 'rd' : 'th';
	            return number + output;
	        },
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return en_gb;

	}));

/***/ },

/***/ 990:
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Irish english (en-ie)
	//! author : Chris Cartlidge : https://github.com/chriscartlidge

	;(function (global, factory) {
	    true ? factory(__webpack_require__(963)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var en_ie = moment.defineLocale('en-ie', {
	        months : 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
	        monthsShort : 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
	        weekdays : 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
	        weekdaysShort : 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
	        weekdaysMin : 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'DD-MM-YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY HH:mm',
	            LLLL : 'dddd D MMMM YYYY HH:mm'
	        },
	        calendar : {
	            sameDay : '[Today at] LT',
	            nextDay : '[Tomorrow at] LT',
	            nextWeek : 'dddd [at] LT',
	            lastDay : '[Yesterday at] LT',
	            lastWeek : '[Last] dddd [at] LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'in %s',
	            past : '%s ago',
	            s : 'a few seconds',
	            m : 'a minute',
	            mm : '%d minutes',
	            h : 'an hour',
	            hh : '%d hours',
	            d : 'a day',
	            dd : '%d days',
	            M : 'a month',
	            MM : '%d months',
	            y : 'a year',
	            yy : '%d years'
	        },
	        ordinalParse: /\d{1,2}(st|nd|rd|th)/,
	        ordinal : function (number) {
	            var b = number % 10,
	                output = (~~(number % 100 / 10) === 1) ? 'th' :
	                (b === 1) ? 'st' :
	                (b === 2) ? 'nd' :
	                (b === 3) ? 'rd' : 'th';
	            return number + output;
	        },
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return en_ie;

	}));

/***/ },

/***/ 991:
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : New Zealand english (en-nz)

	;(function (global, factory) {
	    true ? factory(__webpack_require__(963)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var en_nz = moment.defineLocale('en-nz', {
	        months : 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
	        monthsShort : 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
	        weekdays : 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
	        weekdaysShort : 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
	        weekdaysMin : 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
	        longDateFormat : {
	            LT : 'h:mm A',
	            LTS : 'h:mm:ss A',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY h:mm A',
	            LLLL : 'dddd, D MMMM YYYY h:mm A'
	        },
	        calendar : {
	            sameDay : '[Today at] LT',
	            nextDay : '[Tomorrow at] LT',
	            nextWeek : 'dddd [at] LT',
	            lastDay : '[Yesterday at] LT',
	            lastWeek : '[Last] dddd [at] LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'in %s',
	            past : '%s ago',
	            s : 'a few seconds',
	            m : 'a minute',
	            mm : '%d minutes',
	            h : 'an hour',
	            hh : '%d hours',
	            d : 'a day',
	            dd : '%d days',
	            M : 'a month',
	            MM : '%d months',
	            y : 'a year',
	            yy : '%d years'
	        },
	        ordinalParse: /\d{1,2}(st|nd|rd|th)/,
	        ordinal : function (number) {
	            var b = number % 10,
	                output = (~~(number % 100 / 10) === 1) ? 'th' :
	                (b === 1) ? 'st' :
	                (b === 2) ? 'nd' :
	                (b === 3) ? 'rd' : 'th';
	            return number + output;
	        },
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return en_nz;

	}));

/***/ },

/***/ 992:
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : esperanto (eo)
	//! author : Colin Dean : https://github.com/colindean
	//! komento: Mi estas malcerta se mi korekte traktis akuzativojn en tiu traduko.
	//!          Se ne, bonvolu korekti kaj avizi min por ke mi povas lerni!

	;(function (global, factory) {
	    true ? factory(__webpack_require__(963)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var eo = moment.defineLocale('eo', {
	        months : 'januaro_februaro_marto_aprilo_majo_junio_julio_aŭgusto_septembro_oktobro_novembro_decembro'.split('_'),
	        monthsShort : 'jan_feb_mar_apr_maj_jun_jul_aŭg_sep_okt_nov_dec'.split('_'),
	        weekdays : 'Dimanĉo_Lundo_Mardo_Merkredo_Ĵaŭdo_Vendredo_Sabato'.split('_'),
	        weekdaysShort : 'Dim_Lun_Mard_Merk_Ĵaŭ_Ven_Sab'.split('_'),
	        weekdaysMin : 'Di_Lu_Ma_Me_Ĵa_Ve_Sa'.split('_'),
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'YYYY-MM-DD',
	            LL : 'D[-an de] MMMM, YYYY',
	            LLL : 'D[-an de] MMMM, YYYY HH:mm',
	            LLLL : 'dddd, [la] D[-an de] MMMM, YYYY HH:mm'
	        },
	        meridiemParse: /[ap]\.t\.m/i,
	        isPM: function (input) {
	            return input.charAt(0).toLowerCase() === 'p';
	        },
	        meridiem : function (hours, minutes, isLower) {
	            if (hours > 11) {
	                return isLower ? 'p.t.m.' : 'P.T.M.';
	            } else {
	                return isLower ? 'a.t.m.' : 'A.T.M.';
	            }
	        },
	        calendar : {
	            sameDay : '[Hodiaŭ je] LT',
	            nextDay : '[Morgaŭ je] LT',
	            nextWeek : 'dddd [je] LT',
	            lastDay : '[Hieraŭ je] LT',
	            lastWeek : '[pasinta] dddd [je] LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'je %s',
	            past : 'antaŭ %s',
	            s : 'sekundoj',
	            m : 'minuto',
	            mm : '%d minutoj',
	            h : 'horo',
	            hh : '%d horoj',
	            d : 'tago',//ne 'diurno', ĉar estas uzita por proksimumo
	            dd : '%d tagoj',
	            M : 'monato',
	            MM : '%d monatoj',
	            y : 'jaro',
	            yy : '%d jaroj'
	        },
	        ordinalParse: /\d{1,2}a/,
	        ordinal : '%da',
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 7  // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return eo;

	}));

/***/ },

/***/ 993:
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : spanish (es)
	//! author : Julio Napurí : https://github.com/julionc

	;(function (global, factory) {
	    true ? factory(__webpack_require__(963)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var monthsShortDot = 'ene._feb._mar._abr._may._jun._jul._ago._sep._oct._nov._dic.'.split('_'),
	        monthsShort = 'ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic'.split('_');

	    var es = moment.defineLocale('es', {
	        months : 'enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre'.split('_'),
	        monthsShort : function (m, format) {
	            if (/-MMM-/.test(format)) {
	                return monthsShort[m.month()];
	            } else {
	                return monthsShortDot[m.month()];
	            }
	        },
	        monthsParseExact : true,
	        weekdays : 'domingo_lunes_martes_miércoles_jueves_viernes_sábado'.split('_'),
	        weekdaysShort : 'dom._lun._mar._mié._jue._vie._sáb.'.split('_'),
	        weekdaysMin : 'do_lu_ma_mi_ju_vi_sá'.split('_'),
	        weekdaysParseExact : true,
	        longDateFormat : {
	            LT : 'H:mm',
	            LTS : 'H:mm:ss',
	            L : 'DD/MM/YYYY',
	            LL : 'D [de] MMMM [de] YYYY',
	            LLL : 'D [de] MMMM [de] YYYY H:mm',
	            LLLL : 'dddd, D [de] MMMM [de] YYYY H:mm'
	        },
	        calendar : {
	            sameDay : function () {
	                return '[hoy a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
	            },
	            nextDay : function () {
	                return '[mañana a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
	            },
	            nextWeek : function () {
	                return 'dddd [a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
	            },
	            lastDay : function () {
	                return '[ayer a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
	            },
	            lastWeek : function () {
	                return '[el] dddd [pasado a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
	            },
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'en %s',
	            past : 'hace %s',
	            s : 'unos segundos',
	            m : 'un minuto',
	            mm : '%d minutos',
	            h : 'una hora',
	            hh : '%d horas',
	            d : 'un día',
	            dd : '%d días',
	            M : 'un mes',
	            MM : '%d meses',
	            y : 'un año',
	            yy : '%d años'
	        },
	        ordinalParse : /\d{1,2}º/,
	        ordinal : '%dº',
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return es;

	}));

/***/ },

/***/ 994:
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : estonian (et)
	//! author : Henry Kehlmann : https://github.com/madhenry
	//! improvements : Illimar Tambek : https://github.com/ragulka

	;(function (global, factory) {
	    true ? factory(__webpack_require__(963)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    function processRelativeTime(number, withoutSuffix, key, isFuture) {
	        var format = {
	            's' : ['mõne sekundi', 'mõni sekund', 'paar sekundit'],
	            'm' : ['ühe minuti', 'üks minut'],
	            'mm': [number + ' minuti', number + ' minutit'],
	            'h' : ['ühe tunni', 'tund aega', 'üks tund'],
	            'hh': [number + ' tunni', number + ' tundi'],
	            'd' : ['ühe päeva', 'üks päev'],
	            'M' : ['kuu aja', 'kuu aega', 'üks kuu'],
	            'MM': [number + ' kuu', number + ' kuud'],
	            'y' : ['ühe aasta', 'aasta', 'üks aasta'],
	            'yy': [number + ' aasta', number + ' aastat']
	        };
	        if (withoutSuffix) {
	            return format[key][2] ? format[key][2] : format[key][1];
	        }
	        return isFuture ? format[key][0] : format[key][1];
	    }

	    var et = moment.defineLocale('et', {
	        months        : 'jaanuar_veebruar_märts_aprill_mai_juuni_juuli_august_september_oktoober_november_detsember'.split('_'),
	        monthsShort   : 'jaan_veebr_märts_apr_mai_juuni_juuli_aug_sept_okt_nov_dets'.split('_'),
	        weekdays      : 'pühapäev_esmaspäev_teisipäev_kolmapäev_neljapäev_reede_laupäev'.split('_'),
	        weekdaysShort : 'P_E_T_K_N_R_L'.split('_'),
	        weekdaysMin   : 'P_E_T_K_N_R_L'.split('_'),
	        longDateFormat : {
	            LT   : 'H:mm',
	            LTS : 'H:mm:ss',
	            L    : 'DD.MM.YYYY',
	            LL   : 'D. MMMM YYYY',
	            LLL  : 'D. MMMM YYYY H:mm',
	            LLLL : 'dddd, D. MMMM YYYY H:mm'
	        },
	        calendar : {
	            sameDay  : '[Täna,] LT',
	            nextDay  : '[Homme,] LT',
	            nextWeek : '[Järgmine] dddd LT',
	            lastDay  : '[Eile,] LT',
	            lastWeek : '[Eelmine] dddd LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : '%s pärast',
	            past   : '%s tagasi',
	            s      : processRelativeTime,
	            m      : processRelativeTime,
	            mm     : processRelativeTime,
	            h      : processRelativeTime,
	            hh     : processRelativeTime,
	            d      : processRelativeTime,
	            dd     : '%d päeva',
	            M      : processRelativeTime,
	            MM     : processRelativeTime,
	            y      : processRelativeTime,
	            yy     : processRelativeTime
	        },
	        ordinalParse: /\d{1,2}\./,
	        ordinal : '%d.',
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return et;

	}));

/***/ },

/***/ 995:
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : euskara (eu)
	//! author : Eneko Illarramendi : https://github.com/eillarra

	;(function (global, factory) {
	    true ? factory(__webpack_require__(963)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var eu = moment.defineLocale('eu', {
	        months : 'urtarrila_otsaila_martxoa_apirila_maiatza_ekaina_uztaila_abuztua_iraila_urria_azaroa_abendua'.split('_'),
	        monthsShort : 'urt._ots._mar._api._mai._eka._uzt._abu._ira._urr._aza._abe.'.split('_'),
	        monthsParseExact : true,
	        weekdays : 'igandea_astelehena_asteartea_asteazkena_osteguna_ostirala_larunbata'.split('_'),
	        weekdaysShort : 'ig._al._ar._az._og._ol._lr.'.split('_'),
	        weekdaysMin : 'ig_al_ar_az_og_ol_lr'.split('_'),
	        weekdaysParseExact : true,
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'YYYY-MM-DD',
	            LL : 'YYYY[ko] MMMM[ren] D[a]',
	            LLL : 'YYYY[ko] MMMM[ren] D[a] HH:mm',
	            LLLL : 'dddd, YYYY[ko] MMMM[ren] D[a] HH:mm',
	            l : 'YYYY-M-D',
	            ll : 'YYYY[ko] MMM D[a]',
	            lll : 'YYYY[ko] MMM D[a] HH:mm',
	            llll : 'ddd, YYYY[ko] MMM D[a] HH:mm'
	        },
	        calendar : {
	            sameDay : '[gaur] LT[etan]',
	            nextDay : '[bihar] LT[etan]',
	            nextWeek : 'dddd LT[etan]',
	            lastDay : '[atzo] LT[etan]',
	            lastWeek : '[aurreko] dddd LT[etan]',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : '%s barru',
	            past : 'duela %s',
	            s : 'segundo batzuk',
	            m : 'minutu bat',
	            mm : '%d minutu',
	            h : 'ordu bat',
	            hh : '%d ordu',
	            d : 'egun bat',
	            dd : '%d egun',
	            M : 'hilabete bat',
	            MM : '%d hilabete',
	            y : 'urte bat',
	            yy : '%d urte'
	        },
	        ordinalParse: /\d{1,2}\./,
	        ordinal : '%d.',
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 7  // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return eu;

	}));

/***/ },

/***/ 996:
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Persian (fa)
	//! author : Ebrahim Byagowi : https://github.com/ebraminio

	;(function (global, factory) {
	    true ? factory(__webpack_require__(963)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var symbolMap = {
	        '1': '۱',
	        '2': '۲',
	        '3': '۳',
	        '4': '۴',
	        '5': '۵',
	        '6': '۶',
	        '7': '۷',
	        '8': '۸',
	        '9': '۹',
	        '0': '۰'
	    }, numberMap = {
	        '۱': '1',
	        '۲': '2',
	        '۳': '3',
	        '۴': '4',
	        '۵': '5',
	        '۶': '6',
	        '۷': '7',
	        '۸': '8',
	        '۹': '9',
	        '۰': '0'
	    };

	    var fa = moment.defineLocale('fa', {
	        months : 'ژانویه_فوریه_مارس_آوریل_مه_ژوئن_ژوئیه_اوت_سپتامبر_اکتبر_نوامبر_دسامبر'.split('_'),
	        monthsShort : 'ژانویه_فوریه_مارس_آوریل_مه_ژوئن_ژوئیه_اوت_سپتامبر_اکتبر_نوامبر_دسامبر'.split('_'),
	        weekdays : 'یک\u200cشنبه_دوشنبه_سه\u200cشنبه_چهارشنبه_پنج\u200cشنبه_جمعه_شنبه'.split('_'),
	        weekdaysShort : 'یک\u200cشنبه_دوشنبه_سه\u200cشنبه_چهارشنبه_پنج\u200cشنبه_جمعه_شنبه'.split('_'),
	        weekdaysMin : 'ی_د_س_چ_پ_ج_ش'.split('_'),
	        weekdaysParseExact : true,
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY HH:mm',
	            LLLL : 'dddd, D MMMM YYYY HH:mm'
	        },
	        meridiemParse: /قبل از ظهر|بعد از ظهر/,
	        isPM: function (input) {
	            return /بعد از ظهر/.test(input);
	        },
	        meridiem : function (hour, minute, isLower) {
	            if (hour < 12) {
	                return 'قبل از ظهر';
	            } else {
	                return 'بعد از ظهر';
	            }
	        },
	        calendar : {
	            sameDay : '[امروز ساعت] LT',
	            nextDay : '[فردا ساعت] LT',
	            nextWeek : 'dddd [ساعت] LT',
	            lastDay : '[دیروز ساعت] LT',
	            lastWeek : 'dddd [پیش] [ساعت] LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'در %s',
	            past : '%s پیش',
	            s : 'چندین ثانیه',
	            m : 'یک دقیقه',
	            mm : '%d دقیقه',
	            h : 'یک ساعت',
	            hh : '%d ساعت',
	            d : 'یک روز',
	            dd : '%d روز',
	            M : 'یک ماه',
	            MM : '%d ماه',
	            y : 'یک سال',
	            yy : '%d سال'
	        },
	        preparse: function (string) {
	            return string.replace(/[۰-۹]/g, function (match) {
	                return numberMap[match];
	            }).replace(/،/g, ',');
	        },
	        postformat: function (string) {
	            return string.replace(/\d/g, function (match) {
	                return symbolMap[match];
	            }).replace(/,/g, '،');
	        },
	        ordinalParse: /\d{1,2}م/,
	        ordinal : '%dم',
	        week : {
	            dow : 6, // Saturday is the first day of the week.
	            doy : 12 // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return fa;

	}));

/***/ },

/***/ 997:
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : finnish (fi)
	//! author : Tarmo Aidantausta : https://github.com/bleadof

	;(function (global, factory) {
	    true ? factory(__webpack_require__(963)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var numbersPast = 'nolla yksi kaksi kolme neljä viisi kuusi seitsemän kahdeksan yhdeksän'.split(' '),
	        numbersFuture = [
	            'nolla', 'yhden', 'kahden', 'kolmen', 'neljän', 'viiden', 'kuuden',
	            numbersPast[7], numbersPast[8], numbersPast[9]
	        ];
	    function translate(number, withoutSuffix, key, isFuture) {
	        var result = '';
	        switch (key) {
	        case 's':
	            return isFuture ? 'muutaman sekunnin' : 'muutama sekunti';
	        case 'm':
	            return isFuture ? 'minuutin' : 'minuutti';
	        case 'mm':
	            result = isFuture ? 'minuutin' : 'minuuttia';
	            break;
	        case 'h':
	            return isFuture ? 'tunnin' : 'tunti';
	        case 'hh':
	            result = isFuture ? 'tunnin' : 'tuntia';
	            break;
	        case 'd':
	            return isFuture ? 'päivän' : 'päivä';
	        case 'dd':
	            result = isFuture ? 'päivän' : 'päivää';
	            break;
	        case 'M':
	            return isFuture ? 'kuukauden' : 'kuukausi';
	        case 'MM':
	            result = isFuture ? 'kuukauden' : 'kuukautta';
	            break;
	        case 'y':
	            return isFuture ? 'vuoden' : 'vuosi';
	        case 'yy':
	            result = isFuture ? 'vuoden' : 'vuotta';
	            break;
	        }
	        result = verbalNumber(number, isFuture) + ' ' + result;
	        return result;
	    }
	    function verbalNumber(number, isFuture) {
	        return number < 10 ? (isFuture ? numbersFuture[number] : numbersPast[number]) : number;
	    }

	    var fi = moment.defineLocale('fi', {
	        months : 'tammikuu_helmikuu_maaliskuu_huhtikuu_toukokuu_kesäkuu_heinäkuu_elokuu_syyskuu_lokakuu_marraskuu_joulukuu'.split('_'),
	        monthsShort : 'tammi_helmi_maalis_huhti_touko_kesä_heinä_elo_syys_loka_marras_joulu'.split('_'),
	        weekdays : 'sunnuntai_maanantai_tiistai_keskiviikko_torstai_perjantai_lauantai'.split('_'),
	        weekdaysShort : 'su_ma_ti_ke_to_pe_la'.split('_'),
	        weekdaysMin : 'su_ma_ti_ke_to_pe_la'.split('_'),
	        longDateFormat : {
	            LT : 'HH.mm',
	            LTS : 'HH.mm.ss',
	            L : 'DD.MM.YYYY',
	            LL : 'Do MMMM[ta] YYYY',
	            LLL : 'Do MMMM[ta] YYYY, [klo] HH.mm',
	            LLLL : 'dddd, Do MMMM[ta] YYYY, [klo] HH.mm',
	            l : 'D.M.YYYY',
	            ll : 'Do MMM YYYY',
	            lll : 'Do MMM YYYY, [klo] HH.mm',
	            llll : 'ddd, Do MMM YYYY, [klo] HH.mm'
	        },
	        calendar : {
	            sameDay : '[tänään] [klo] LT',
	            nextDay : '[huomenna] [klo] LT',
	            nextWeek : 'dddd [klo] LT',
	            lastDay : '[eilen] [klo] LT',
	            lastWeek : '[viime] dddd[na] [klo] LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : '%s päästä',
	            past : '%s sitten',
	            s : translate,
	            m : translate,
	            mm : translate,
	            h : translate,
	            hh : translate,
	            d : translate,
	            dd : translate,
	            M : translate,
	            MM : translate,
	            y : translate,
	            yy : translate
	        },
	        ordinalParse: /\d{1,2}\./,
	        ordinal : '%d.',
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return fi;

	}));

/***/ },

/***/ 998:
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : faroese (fo)
	//! author : Ragnar Johannesen : https://github.com/ragnar123

	;(function (global, factory) {
	    true ? factory(__webpack_require__(963)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var fo = moment.defineLocale('fo', {
	        months : 'januar_februar_mars_apríl_mai_juni_juli_august_september_oktober_november_desember'.split('_'),
	        monthsShort : 'jan_feb_mar_apr_mai_jun_jul_aug_sep_okt_nov_des'.split('_'),
	        weekdays : 'sunnudagur_mánadagur_týsdagur_mikudagur_hósdagur_fríggjadagur_leygardagur'.split('_'),
	        weekdaysShort : 'sun_mán_týs_mik_hós_frí_ley'.split('_'),
	        weekdaysMin : 'su_má_tý_mi_hó_fr_le'.split('_'),
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY HH:mm',
	            LLLL : 'dddd D. MMMM, YYYY HH:mm'
	        },
	        calendar : {
	            sameDay : '[Í dag kl.] LT',
	            nextDay : '[Í morgin kl.] LT',
	            nextWeek : 'dddd [kl.] LT',
	            lastDay : '[Í gjár kl.] LT',
	            lastWeek : '[síðstu] dddd [kl] LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'um %s',
	            past : '%s síðani',
	            s : 'fá sekund',
	            m : 'ein minutt',
	            mm : '%d minuttir',
	            h : 'ein tími',
	            hh : '%d tímar',
	            d : 'ein dagur',
	            dd : '%d dagar',
	            M : 'ein mánaði',
	            MM : '%d mánaðir',
	            y : 'eitt ár',
	            yy : '%d ár'
	        },
	        ordinalParse: /\d{1,2}\./,
	        ordinal : '%d.',
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return fo;

	}));

/***/ },

/***/ 999:
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : french (fr)
	//! author : John Fischer : https://github.com/jfroffice

	;(function (global, factory) {
	    true ? factory(__webpack_require__(963)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var fr = moment.defineLocale('fr', {
	        months : 'janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre'.split('_'),
	        monthsShort : 'janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.'.split('_'),
	        monthsParseExact : true,
	        weekdays : 'dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi'.split('_'),
	        weekdaysShort : 'dim._lun._mar._mer._jeu._ven._sam.'.split('_'),
	        weekdaysMin : 'Di_Lu_Ma_Me_Je_Ve_Sa'.split('_'),
	        weekdaysParseExact : true,
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY HH:mm',
	            LLLL : 'dddd D MMMM YYYY HH:mm'
	        },
	        calendar : {
	            sameDay: '[Aujourd\'hui à] LT',
	            nextDay: '[Demain à] LT',
	            nextWeek: 'dddd [à] LT',
	            lastDay: '[Hier à] LT',
	            lastWeek: 'dddd [dernier à] LT',
	            sameElse: 'L'
	        },
	        relativeTime : {
	            future : 'dans %s',
	            past : 'il y a %s',
	            s : 'quelques secondes',
	            m : 'une minute',
	            mm : '%d minutes',
	            h : 'une heure',
	            hh : '%d heures',
	            d : 'un jour',
	            dd : '%d jours',
	            M : 'un mois',
	            MM : '%d mois',
	            y : 'un an',
	            yy : '%d ans'
	        },
	        ordinalParse: /\d{1,2}(er|)/,
	        ordinal : function (number) {
	            return number + (number === 1 ? 'er' : '');
	        },
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return fr;

	}));

/***/ },

/***/ 1000:
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : canadian french (fr-ca)
	//! author : Jonathan Abourbih : https://github.com/jonbca

	;(function (global, factory) {
	    true ? factory(__webpack_require__(963)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var fr_ca = moment.defineLocale('fr-ca', {
	        months : 'janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre'.split('_'),
	        monthsShort : 'janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.'.split('_'),
	        monthsParseExact : true,
	        weekdays : 'dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi'.split('_'),
	        weekdaysShort : 'dim._lun._mar._mer._jeu._ven._sam.'.split('_'),
	        weekdaysMin : 'Di_Lu_Ma_Me_Je_Ve_Sa'.split('_'),
	        weekdaysParseExact : true,
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'YYYY-MM-DD',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY HH:mm',
	            LLLL : 'dddd D MMMM YYYY HH:mm'
	        },
	        calendar : {
	            sameDay: '[Aujourd\'hui à] LT',
	            nextDay: '[Demain à] LT',
	            nextWeek: 'dddd [à] LT',
	            lastDay: '[Hier à] LT',
	            lastWeek: 'dddd [dernier à] LT',
	            sameElse: 'L'
	        },
	        relativeTime : {
	            future : 'dans %s',
	            past : 'il y a %s',
	            s : 'quelques secondes',
	            m : 'une minute',
	            mm : '%d minutes',
	            h : 'une heure',
	            hh : '%d heures',
	            d : 'un jour',
	            dd : '%d jours',
	            M : 'un mois',
	            MM : '%d mois',
	            y : 'un an',
	            yy : '%d ans'
	        },
	        ordinalParse: /\d{1,2}(er|e)/,
	        ordinal : function (number) {
	            return number + (number === 1 ? 'er' : 'e');
	        }
	    });

	    return fr_ca;

	}));

/***/ },

/***/ 1001:
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : swiss french (fr)
	//! author : Gaspard Bucher : https://github.com/gaspard

	;(function (global, factory) {
	    true ? factory(__webpack_require__(963)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var fr_ch = moment.defineLocale('fr-ch', {
	        months : 'janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre'.split('_'),
	        monthsShort : 'janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.'.split('_'),
	        monthsParseExact : true,
	        weekdays : 'dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi'.split('_'),
	        weekdaysShort : 'dim._lun._mar._mer._jeu._ven._sam.'.split('_'),
	        weekdaysMin : 'Di_Lu_Ma_Me_Je_Ve_Sa'.split('_'),
	        weekdaysParseExact : true,
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'DD.MM.YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY HH:mm',
	            LLLL : 'dddd D MMMM YYYY HH:mm'
	        },
	        calendar : {
	            sameDay: '[Aujourd\'hui à] LT',
	            nextDay: '[Demain à] LT',
	            nextWeek: 'dddd [à] LT',
	            lastDay: '[Hier à] LT',
	            lastWeek: 'dddd [dernier à] LT',
	            sameElse: 'L'
	        },
	        relativeTime : {
	            future : 'dans %s',
	            past : 'il y a %s',
	            s : 'quelques secondes',
	            m : 'une minute',
	            mm : '%d minutes',
	            h : 'une heure',
	            hh : '%d heures',
	            d : 'un jour',
	            dd : '%d jours',
	            M : 'un mois',
	            MM : '%d mois',
	            y : 'un an',
	            yy : '%d ans'
	        },
	        ordinalParse: /\d{1,2}(er|e)/,
	        ordinal : function (number) {
	            return number + (number === 1 ? 'er' : 'e');
	        },
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return fr_ch;

	}));

/***/ },

/***/ 1002:
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : frisian (fy)
	//! author : Robin van der Vliet : https://github.com/robin0van0der0v

	;(function (global, factory) {
	    true ? factory(__webpack_require__(963)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var monthsShortWithDots = 'jan._feb._mrt._apr._mai_jun._jul._aug._sep._okt._nov._des.'.split('_'),
	        monthsShortWithoutDots = 'jan_feb_mrt_apr_mai_jun_jul_aug_sep_okt_nov_des'.split('_');

	    var fy = moment.defineLocale('fy', {
	        months : 'jannewaris_febrewaris_maart_april_maaie_juny_july_augustus_septimber_oktober_novimber_desimber'.split('_'),
	        monthsShort : function (m, format) {
	            if (/-MMM-/.test(format)) {
	                return monthsShortWithoutDots[m.month()];
	            } else {
	                return monthsShortWithDots[m.month()];
	            }
	        },
	        monthsParseExact : true,
	        weekdays : 'snein_moandei_tiisdei_woansdei_tongersdei_freed_sneon'.split('_'),
	        weekdaysShort : 'si._mo._ti._wo._to._fr._so.'.split('_'),
	        weekdaysMin : 'Si_Mo_Ti_Wo_To_Fr_So'.split('_'),
	        weekdaysParseExact : true,
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'DD-MM-YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY HH:mm',
	            LLLL : 'dddd D MMMM YYYY HH:mm'
	        },
	        calendar : {
	            sameDay: '[hjoed om] LT',
	            nextDay: '[moarn om] LT',
	            nextWeek: 'dddd [om] LT',
	            lastDay: '[juster om] LT',
	            lastWeek: '[ôfrûne] dddd [om] LT',
	            sameElse: 'L'
	        },
	        relativeTime : {
	            future : 'oer %s',
	            past : '%s lyn',
	            s : 'in pear sekonden',
	            m : 'ien minút',
	            mm : '%d minuten',
	            h : 'ien oere',
	            hh : '%d oeren',
	            d : 'ien dei',
	            dd : '%d dagen',
	            M : 'ien moanne',
	            MM : '%d moannen',
	            y : 'ien jier',
	            yy : '%d jierren'
	        },
	        ordinalParse: /\d{1,2}(ste|de)/,
	        ordinal : function (number) {
	            return number + ((number === 1 || number === 8 || number >= 20) ? 'ste' : 'de');
	        },
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return fy;

	}));

/***/ },

/***/ 1003:
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : great britain scottish gealic (gd)
	//! author : Jon Ashdown : https://github.com/jonashdown

	;(function (global, factory) {
	    true ? factory(__webpack_require__(963)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var months = [
	        'Am Faoilleach', 'An Gearran', 'Am Màrt', 'An Giblean', 'An Cèitean', 'An t-Ògmhios', 'An t-Iuchar', 'An Lùnastal', 'An t-Sultain', 'An Dàmhair', 'An t-Samhain', 'An Dùbhlachd'
	    ];

	    var monthsShort = ['Faoi', 'Gear', 'Màrt', 'Gibl', 'Cèit', 'Ògmh', 'Iuch', 'Lùn', 'Sult', 'Dàmh', 'Samh', 'Dùbh'];

	    var weekdays = ['Didòmhnaich', 'Diluain', 'Dimàirt', 'Diciadain', 'Diardaoin', 'Dihaoine', 'Disathairne'];

	    var weekdaysShort = ['Did', 'Dil', 'Dim', 'Dic', 'Dia', 'Dih', 'Dis'];

	    var weekdaysMin = ['Dò', 'Lu', 'Mà', 'Ci', 'Ar', 'Ha', 'Sa'];

	    var gd = moment.defineLocale('gd', {
	        months : months,
	        monthsShort : monthsShort,
	        monthsParseExact : true,
	        weekdays : weekdays,
	        weekdaysShort : weekdaysShort,
	        weekdaysMin : weekdaysMin,
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY HH:mm',
	            LLLL : 'dddd, D MMMM YYYY HH:mm'
	        },
	        calendar : {
	            sameDay : '[An-diugh aig] LT',
	            nextDay : '[A-màireach aig] LT',
	            nextWeek : 'dddd [aig] LT',
	            lastDay : '[An-dè aig] LT',
	            lastWeek : 'dddd [seo chaidh] [aig] LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'ann an %s',
	            past : 'bho chionn %s',
	            s : 'beagan diogan',
	            m : 'mionaid',
	            mm : '%d mionaidean',
	            h : 'uair',
	            hh : '%d uairean',
	            d : 'latha',
	            dd : '%d latha',
	            M : 'mìos',
	            MM : '%d mìosan',
	            y : 'bliadhna',
	            yy : '%d bliadhna'
	        },
	        ordinalParse : /\d{1,2}(d|na|mh)/,
	        ordinal : function (number) {
	            var output = number === 1 ? 'd' : number % 10 === 2 ? 'na' : 'mh';
	            return number + output;
	        },
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return gd;

	}));

/***/ },

/***/ 1004:
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : galician (gl)
	//! author : Juan G. Hurtado : https://github.com/juanghurtado

	;(function (global, factory) {
	    true ? factory(__webpack_require__(963)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var gl = moment.defineLocale('gl', {
	        months : 'Xaneiro_Febreiro_Marzo_Abril_Maio_Xuño_Xullo_Agosto_Setembro_Outubro_Novembro_Decembro'.split('_'),
	        monthsShort : 'Xan._Feb._Mar._Abr._Mai._Xuñ._Xul._Ago._Set._Out._Nov._Dec.'.split('_'),
	        monthsParseExact: true,
	        weekdays : 'Domingo_Luns_Martes_Mércores_Xoves_Venres_Sábado'.split('_'),
	        weekdaysShort : 'Dom._Lun._Mar._Mér._Xov._Ven._Sáb.'.split('_'),
	        weekdaysMin : 'Do_Lu_Ma_Mé_Xo_Ve_Sá'.split('_'),
	        weekdaysParseExact : true,
	        longDateFormat : {
	            LT : 'H:mm',
	            LTS : 'H:mm:ss',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY H:mm',
	            LLLL : 'dddd D MMMM YYYY H:mm'
	        },
	        calendar : {
	            sameDay : function () {
	                return '[hoxe ' + ((this.hours() !== 1) ? 'ás' : 'á') + '] LT';
	            },
	            nextDay : function () {
	                return '[mañá ' + ((this.hours() !== 1) ? 'ás' : 'á') + '] LT';
	            },
	            nextWeek : function () {
	                return 'dddd [' + ((this.hours() !== 1) ? 'ás' : 'a') + '] LT';
	            },
	            lastDay : function () {
	                return '[onte ' + ((this.hours() !== 1) ? 'á' : 'a') + '] LT';
	            },
	            lastWeek : function () {
	                return '[o] dddd [pasado ' + ((this.hours() !== 1) ? 'ás' : 'a') + '] LT';
	            },
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : function (str) {
	                if (str === 'uns segundos') {
	                    return 'nuns segundos';
	                }
	                return 'en ' + str;
	            },
	            past : 'hai %s',
	            s : 'uns segundos',
	            m : 'un minuto',
	            mm : '%d minutos',
	            h : 'unha hora',
	            hh : '%d horas',
	            d : 'un día',
	            dd : '%d días',
	            M : 'un mes',
	            MM : '%d meses',
	            y : 'un ano',
	            yy : '%d anos'
	        },
	        ordinalParse : /\d{1,2}º/,
	        ordinal : '%dº',
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 7  // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return gl;

	}));

/***/ },

/***/ 1005:
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Hebrew (he)
	//! author : Tomer Cohen : https://github.com/tomer
	//! author : Moshe Simantov : https://github.com/DevelopmentIL
	//! author : Tal Ater : https://github.com/TalAter

	;(function (global, factory) {
	    true ? factory(__webpack_require__(963)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var he = moment.defineLocale('he', {
	        months : 'ינואר_פברואר_מרץ_אפריל_מאי_יוני_יולי_אוגוסט_ספטמבר_אוקטובר_נובמבר_דצמבר'.split('_'),
	        monthsShort : 'ינו׳_פבר׳_מרץ_אפר׳_מאי_יוני_יולי_אוג׳_ספט׳_אוק׳_נוב׳_דצמ׳'.split('_'),
	        weekdays : 'ראשון_שני_שלישי_רביעי_חמישי_שישי_שבת'.split('_'),
	        weekdaysShort : 'א׳_ב׳_ג׳_ד׳_ה׳_ו׳_ש׳'.split('_'),
	        weekdaysMin : 'א_ב_ג_ד_ה_ו_ש'.split('_'),
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'DD/MM/YYYY',
	            LL : 'D [ב]MMMM YYYY',
	            LLL : 'D [ב]MMMM YYYY HH:mm',
	            LLLL : 'dddd, D [ב]MMMM YYYY HH:mm',
	            l : 'D/M/YYYY',
	            ll : 'D MMM YYYY',
	            lll : 'D MMM YYYY HH:mm',
	            llll : 'ddd, D MMM YYYY HH:mm'
	        },
	        calendar : {
	            sameDay : '[היום ב־]LT',
	            nextDay : '[מחר ב־]LT',
	            nextWeek : 'dddd [בשעה] LT',
	            lastDay : '[אתמול ב־]LT',
	            lastWeek : '[ביום] dddd [האחרון בשעה] LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'בעוד %s',
	            past : 'לפני %s',
	            s : 'מספר שניות',
	            m : 'דקה',
	            mm : '%d דקות',
	            h : 'שעה',
	            hh : function (number) {
	                if (number === 2) {
	                    return 'שעתיים';
	                }
	                return number + ' שעות';
	            },
	            d : 'יום',
	            dd : function (number) {
	                if (number === 2) {
	                    return 'יומיים';
	                }
	                return number + ' ימים';
	            },
	            M : 'חודש',
	            MM : function (number) {
	                if (number === 2) {
	                    return 'חודשיים';
	                }
	                return number + ' חודשים';
	            },
	            y : 'שנה',
	            yy : function (number) {
	                if (number === 2) {
	                    return 'שנתיים';
	                } else if (number % 10 === 0 && number !== 10) {
	                    return number + ' שנה';
	                }
	                return number + ' שנים';
	            }
	        },
	        meridiemParse: /אחה"צ|לפנה"צ|אחרי הצהריים|לפני הצהריים|לפנות בוקר|בבוקר|בערב/i,
	        isPM : function (input) {
	            return /^(אחה"צ|אחרי הצהריים|בערב)$/.test(input);
	        },
	        meridiem : function (hour, minute, isLower) {
	            if (hour < 5) {
	                return 'לפנות בוקר';
	            } else if (hour < 10) {
	                return 'בבוקר';
	            } else if (hour < 12) {
	                return isLower ? 'לפנה"צ' : 'לפני הצהריים';
	            } else if (hour < 18) {
	                return isLower ? 'אחה"צ' : 'אחרי הצהריים';
	            } else {
	                return 'בערב';
	            }
	        }
	    });

	    return he;

	}));

/***/ },

/***/ 1006:
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : hindi (hi)
	//! author : Mayank Singhal : https://github.com/mayanksinghal

	;(function (global, factory) {
	    true ? factory(__webpack_require__(963)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var symbolMap = {
	        '1': '१',
	        '2': '२',
	        '3': '३',
	        '4': '४',
	        '5': '५',
	        '6': '६',
	        '7': '७',
	        '8': '८',
	        '9': '९',
	        '0': '०'
	    },
	    numberMap = {
	        '१': '1',
	        '२': '2',
	        '३': '3',
	        '४': '4',
	        '५': '5',
	        '६': '6',
	        '७': '7',
	        '८': '8',
	        '९': '9',
	        '०': '0'
	    };

	    var hi = moment.defineLocale('hi', {
	        months : 'जनवरी_फ़रवरी_मार्च_अप्रैल_मई_जून_जुलाई_अगस्त_सितम्बर_अक्टूबर_नवम्बर_दिसम्बर'.split('_'),
	        monthsShort : 'जन._फ़र._मार्च_अप्रै._मई_जून_जुल._अग._सित._अक्टू._नव._दिस.'.split('_'),
	        monthsParseExact: true,
	        weekdays : 'रविवार_सोमवार_मंगलवार_बुधवार_गुरूवार_शुक्रवार_शनिवार'.split('_'),
	        weekdaysShort : 'रवि_सोम_मंगल_बुध_गुरू_शुक्र_शनि'.split('_'),
	        weekdaysMin : 'र_सो_मं_बु_गु_शु_श'.split('_'),
	        longDateFormat : {
	            LT : 'A h:mm बजे',
	            LTS : 'A h:mm:ss बजे',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY, A h:mm बजे',
	            LLLL : 'dddd, D MMMM YYYY, A h:mm बजे'
	        },
	        calendar : {
	            sameDay : '[आज] LT',
	            nextDay : '[कल] LT',
	            nextWeek : 'dddd, LT',
	            lastDay : '[कल] LT',
	            lastWeek : '[पिछले] dddd, LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : '%s में',
	            past : '%s पहले',
	            s : 'कुछ ही क्षण',
	            m : 'एक मिनट',
	            mm : '%d मिनट',
	            h : 'एक घंटा',
	            hh : '%d घंटे',
	            d : 'एक दिन',
	            dd : '%d दिन',
	            M : 'एक महीने',
	            MM : '%d महीने',
	            y : 'एक वर्ष',
	            yy : '%d वर्ष'
	        },
	        preparse: function (string) {
	            return string.replace(/[१२३४५६७८९०]/g, function (match) {
	                return numberMap[match];
	            });
	        },
	        postformat: function (string) {
	            return string.replace(/\d/g, function (match) {
	                return symbolMap[match];
	            });
	        },
	        // Hindi notation for meridiems are quite fuzzy in practice. While there exists
	        // a rigid notion of a 'Pahar' it is not used as rigidly in modern Hindi.
	        meridiemParse: /रात|सुबह|दोपहर|शाम/,
	        meridiemHour : function (hour, meridiem) {
	            if (hour === 12) {
	                hour = 0;
	            }
	            if (meridiem === 'रात') {
	                return hour < 4 ? hour : hour + 12;
	            } else if (meridiem === 'सुबह') {
	                return hour;
	            } else if (meridiem === 'दोपहर') {
	                return hour >= 10 ? hour : hour + 12;
	            } else if (meridiem === 'शाम') {
	                return hour + 12;
	            }
	        },
	        meridiem : function (hour, minute, isLower) {
	            if (hour < 4) {
	                return 'रात';
	            } else if (hour < 10) {
	                return 'सुबह';
	            } else if (hour < 17) {
	                return 'दोपहर';
	            } else if (hour < 20) {
	                return 'शाम';
	            } else {
	                return 'रात';
	            }
	        },
	        week : {
	            dow : 0, // Sunday is the first day of the week.
	            doy : 6  // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return hi;

	}));

/***/ },

/***/ 1007:
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : hrvatski (hr)
	//! author : Bojan Marković : https://github.com/bmarkovic

	;(function (global, factory) {
	    true ? factory(__webpack_require__(963)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    function translate(number, withoutSuffix, key) {
	        var result = number + ' ';
	        switch (key) {
	        case 'm':
	            return withoutSuffix ? 'jedna minuta' : 'jedne minute';
	        case 'mm':
	            if (number === 1) {
	                result += 'minuta';
	            } else if (number === 2 || number === 3 || number === 4) {
	                result += 'minute';
	            } else {
	                result += 'minuta';
	            }
	            return result;
	        case 'h':
	            return withoutSuffix ? 'jedan sat' : 'jednog sata';
	        case 'hh':
	            if (number === 1) {
	                result += 'sat';
	            } else if (number === 2 || number === 3 || number === 4) {
	                result += 'sata';
	            } else {
	                result += 'sati';
	            }
	            return result;
	        case 'dd':
	            if (number === 1) {
	                result += 'dan';
	            } else {
	                result += 'dana';
	            }
	            return result;
	        case 'MM':
	            if (number === 1) {
	                result += 'mjesec';
	            } else if (number === 2 || number === 3 || number === 4) {
	                result += 'mjeseca';
	            } else {
	                result += 'mjeseci';
	            }
	            return result;
	        case 'yy':
	            if (number === 1) {
	                result += 'godina';
	            } else if (number === 2 || number === 3 || number === 4) {
	                result += 'godine';
	            } else {
	                result += 'godina';
	            }
	            return result;
	        }
	    }

	    var hr = moment.defineLocale('hr', {
	        months : {
	            format: 'siječnja_veljače_ožujka_travnja_svibnja_lipnja_srpnja_kolovoza_rujna_listopada_studenoga_prosinca'.split('_'),
	            standalone: 'siječanj_veljača_ožujak_travanj_svibanj_lipanj_srpanj_kolovoz_rujan_listopad_studeni_prosinac'.split('_')
	        },
	        monthsShort : 'sij._velj._ožu._tra._svi._lip._srp._kol._ruj._lis._stu._pro.'.split('_'),
	        monthsParseExact: true,
	        weekdays : 'nedjelja_ponedjeljak_utorak_srijeda_četvrtak_petak_subota'.split('_'),
	        weekdaysShort : 'ned._pon._uto._sri._čet._pet._sub.'.split('_'),
	        weekdaysMin : 'ne_po_ut_sr_če_pe_su'.split('_'),
	        weekdaysParseExact : true,
	        longDateFormat : {
	            LT : 'H:mm',
	            LTS : 'H:mm:ss',
	            L : 'DD. MM. YYYY',
	            LL : 'D. MMMM YYYY',
	            LLL : 'D. MMMM YYYY H:mm',
	            LLLL : 'dddd, D. MMMM YYYY H:mm'
	        },
	        calendar : {
	            sameDay  : '[danas u] LT',
	            nextDay  : '[sutra u] LT',
	            nextWeek : function () {
	                switch (this.day()) {
	                case 0:
	                    return '[u] [nedjelju] [u] LT';
	                case 3:
	                    return '[u] [srijedu] [u] LT';
	                case 6:
	                    return '[u] [subotu] [u] LT';
	                case 1:
	                case 2:
	                case 4:
	                case 5:
	                    return '[u] dddd [u] LT';
	                }
	            },
	            lastDay  : '[jučer u] LT',
	            lastWeek : function () {
	                switch (this.day()) {
	                case 0:
	                case 3:
	                    return '[prošlu] dddd [u] LT';
	                case 6:
	                    return '[prošle] [subote] [u] LT';
	                case 1:
	                case 2:
	                case 4:
	                case 5:
	                    return '[prošli] dddd [u] LT';
	                }
	            },
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'za %s',
	            past   : 'prije %s',
	            s      : 'par sekundi',
	            m      : translate,
	            mm     : translate,
	            h      : translate,
	            hh     : translate,
	            d      : 'dan',
	            dd     : translate,
	            M      : 'mjesec',
	            MM     : translate,
	            y      : 'godinu',
	            yy     : translate
	        },
	        ordinalParse: /\d{1,2}\./,
	        ordinal : '%d.',
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 7  // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return hr;

	}));

/***/ },

/***/ 1008:
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : hungarian (hu)
	//! author : Adam Brunner : https://github.com/adambrunner

	;(function (global, factory) {
	    true ? factory(__webpack_require__(963)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var weekEndings = 'vasárnap hétfőn kedden szerdán csütörtökön pénteken szombaton'.split(' ');
	    function translate(number, withoutSuffix, key, isFuture) {
	        var num = number,
	            suffix;
	        switch (key) {
	        case 's':
	            return (isFuture || withoutSuffix) ? 'néhány másodperc' : 'néhány másodperce';
	        case 'm':
	            return 'egy' + (isFuture || withoutSuffix ? ' perc' : ' perce');
	        case 'mm':
	            return num + (isFuture || withoutSuffix ? ' perc' : ' perce');
	        case 'h':
	            return 'egy' + (isFuture || withoutSuffix ? ' óra' : ' órája');
	        case 'hh':
	            return num + (isFuture || withoutSuffix ? ' óra' : ' órája');
	        case 'd':
	            return 'egy' + (isFuture || withoutSuffix ? ' nap' : ' napja');
	        case 'dd':
	            return num + (isFuture || withoutSuffix ? ' nap' : ' napja');
	        case 'M':
	            return 'egy' + (isFuture || withoutSuffix ? ' hónap' : ' hónapja');
	        case 'MM':
	            return num + (isFuture || withoutSuffix ? ' hónap' : ' hónapja');
	        case 'y':
	            return 'egy' + (isFuture || withoutSuffix ? ' év' : ' éve');
	        case 'yy':
	            return num + (isFuture || withoutSuffix ? ' év' : ' éve');
	        }
	        return '';
	    }
	    function week(isFuture) {
	        return (isFuture ? '' : '[múlt] ') + '[' + weekEndings[this.day()] + '] LT[-kor]';
	    }

	    var hu = moment.defineLocale('hu', {
	        months : 'január_február_március_április_május_június_július_augusztus_szeptember_október_november_december'.split('_'),
	        monthsShort : 'jan_feb_márc_ápr_máj_jún_júl_aug_szept_okt_nov_dec'.split('_'),
	        weekdays : 'vasárnap_hétfő_kedd_szerda_csütörtök_péntek_szombat'.split('_'),
	        weekdaysShort : 'vas_hét_kedd_sze_csüt_pén_szo'.split('_'),
	        weekdaysMin : 'v_h_k_sze_cs_p_szo'.split('_'),
	        longDateFormat : {
	            LT : 'H:mm',
	            LTS : 'H:mm:ss',
	            L : 'YYYY.MM.DD.',
	            LL : 'YYYY. MMMM D.',
	            LLL : 'YYYY. MMMM D. H:mm',
	            LLLL : 'YYYY. MMMM D., dddd H:mm'
	        },
	        meridiemParse: /de|du/i,
	        isPM: function (input) {
	            return input.charAt(1).toLowerCase() === 'u';
	        },
	        meridiem : function (hours, minutes, isLower) {
	            if (hours < 12) {
	                return isLower === true ? 'de' : 'DE';
	            } else {
	                return isLower === true ? 'du' : 'DU';
	            }
	        },
	        calendar : {
	            sameDay : '[ma] LT[-kor]',
	            nextDay : '[holnap] LT[-kor]',
	            nextWeek : function () {
	                return week.call(this, true);
	            },
	            lastDay : '[tegnap] LT[-kor]',
	            lastWeek : function () {
	                return week.call(this, false);
	            },
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : '%s múlva',
	            past : '%s',
	            s : translate,
	            m : translate,
	            mm : translate,
	            h : translate,
	            hh : translate,
	            d : translate,
	            dd : translate,
	            M : translate,
	            MM : translate,
	            y : translate,
	            yy : translate
	        },
	        ordinalParse: /\d{1,2}\./,
	        ordinal : '%d.',
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 7  // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return hu;

	}));

/***/ },

/***/ 1009:
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Armenian (hy-am)
	//! author : Armendarabyan : https://github.com/armendarabyan

	;(function (global, factory) {
	    true ? factory(__webpack_require__(963)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var hy_am = moment.defineLocale('hy-am', {
	        months : {
	            format: 'հունվարի_փետրվարի_մարտի_ապրիլի_մայիսի_հունիսի_հուլիսի_օգոստոսի_սեպտեմբերի_հոկտեմբերի_նոյեմբերի_դեկտեմբերի'.split('_'),
	            standalone: 'հունվար_փետրվար_մարտ_ապրիլ_մայիս_հունիս_հուլիս_օգոստոս_սեպտեմբեր_հոկտեմբեր_նոյեմբեր_դեկտեմբեր'.split('_')
	        },
	        monthsShort : 'հնվ_փտր_մրտ_ապր_մյս_հնս_հլս_օգս_սպտ_հկտ_նմբ_դկտ'.split('_'),
	        weekdays : 'կիրակի_երկուշաբթի_երեքշաբթի_չորեքշաբթի_հինգշաբթի_ուրբաթ_շաբաթ'.split('_'),
	        weekdaysShort : 'կրկ_երկ_երք_չրք_հնգ_ուրբ_շբթ'.split('_'),
	        weekdaysMin : 'կրկ_երկ_երք_չրք_հնգ_ուրբ_շբթ'.split('_'),
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'DD.MM.YYYY',
	            LL : 'D MMMM YYYY թ.',
	            LLL : 'D MMMM YYYY թ., HH:mm',
	            LLLL : 'dddd, D MMMM YYYY թ., HH:mm'
	        },
	        calendar : {
	            sameDay: '[այսօր] LT',
	            nextDay: '[վաղը] LT',
	            lastDay: '[երեկ] LT',
	            nextWeek: function () {
	                return 'dddd [օրը ժամը] LT';
	            },
	            lastWeek: function () {
	                return '[անցած] dddd [օրը ժամը] LT';
	            },
	            sameElse: 'L'
	        },
	        relativeTime : {
	            future : '%s հետո',
	            past : '%s առաջ',
	            s : 'մի քանի վայրկյան',
	            m : 'րոպե',
	            mm : '%d րոպե',
	            h : 'ժամ',
	            hh : '%d ժամ',
	            d : 'օր',
	            dd : '%d օր',
	            M : 'ամիս',
	            MM : '%d ամիս',
	            y : 'տարի',
	            yy : '%d տարի'
	        },
	        meridiemParse: /գիշերվա|առավոտվա|ցերեկվա|երեկոյան/,
	        isPM: function (input) {
	            return /^(ցերեկվա|երեկոյան)$/.test(input);
	        },
	        meridiem : function (hour) {
	            if (hour < 4) {
	                return 'գիշերվա';
	            } else if (hour < 12) {
	                return 'առավոտվա';
	            } else if (hour < 17) {
	                return 'ցերեկվա';
	            } else {
	                return 'երեկոյան';
	            }
	        },
	        ordinalParse: /\d{1,2}|\d{1,2}-(ին|րդ)/,
	        ordinal: function (number, period) {
	            switch (period) {
	            case 'DDD':
	            case 'w':
	            case 'W':
	            case 'DDDo':
	                if (number === 1) {
	                    return number + '-ին';
	                }
	                return number + '-րդ';
	            default:
	                return number;
	            }
	        },
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 7  // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return hy_am;

	}));

/***/ },

/***/ 1010:
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Bahasa Indonesia (id)
	//! author : Mohammad Satrio Utomo : https://github.com/tyok
	//! reference: http://id.wikisource.org/wiki/Pedoman_Umum_Ejaan_Bahasa_Indonesia_yang_Disempurnakan

	;(function (global, factory) {
	    true ? factory(__webpack_require__(963)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var id = moment.defineLocale('id', {
	        months : 'Januari_Februari_Maret_April_Mei_Juni_Juli_Agustus_September_Oktober_November_Desember'.split('_'),
	        monthsShort : 'Jan_Feb_Mar_Apr_Mei_Jun_Jul_Ags_Sep_Okt_Nov_Des'.split('_'),
	        weekdays : 'Minggu_Senin_Selasa_Rabu_Kamis_Jumat_Sabtu'.split('_'),
	        weekdaysShort : 'Min_Sen_Sel_Rab_Kam_Jum_Sab'.split('_'),
	        weekdaysMin : 'Mg_Sn_Sl_Rb_Km_Jm_Sb'.split('_'),
	        longDateFormat : {
	            LT : 'HH.mm',
	            LTS : 'HH.mm.ss',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY [pukul] HH.mm',
	            LLLL : 'dddd, D MMMM YYYY [pukul] HH.mm'
	        },
	        meridiemParse: /pagi|siang|sore|malam/,
	        meridiemHour : function (hour, meridiem) {
	            if (hour === 12) {
	                hour = 0;
	            }
	            if (meridiem === 'pagi') {
	                return hour;
	            } else if (meridiem === 'siang') {
	                return hour >= 11 ? hour : hour + 12;
	            } else if (meridiem === 'sore' || meridiem === 'malam') {
	                return hour + 12;
	            }
	        },
	        meridiem : function (hours, minutes, isLower) {
	            if (hours < 11) {
	                return 'pagi';
	            } else if (hours < 15) {
	                return 'siang';
	            } else if (hours < 19) {
	                return 'sore';
	            } else {
	                return 'malam';
	            }
	        },
	        calendar : {
	            sameDay : '[Hari ini pukul] LT',
	            nextDay : '[Besok pukul] LT',
	            nextWeek : 'dddd [pukul] LT',
	            lastDay : '[Kemarin pukul] LT',
	            lastWeek : 'dddd [lalu pukul] LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'dalam %s',
	            past : '%s yang lalu',
	            s : 'beberapa detik',
	            m : 'semenit',
	            mm : '%d menit',
	            h : 'sejam',
	            hh : '%d jam',
	            d : 'sehari',
	            dd : '%d hari',
	            M : 'sebulan',
	            MM : '%d bulan',
	            y : 'setahun',
	            yy : '%d tahun'
	        },
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 7  // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return id;

	}));

/***/ },

/***/ 1011:
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : icelandic (is)
	//! author : Hinrik Örn Sigurðsson : https://github.com/hinrik

	;(function (global, factory) {
	    true ? factory(__webpack_require__(963)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    function plural(n) {
	        if (n % 100 === 11) {
	            return true;
	        } else if (n % 10 === 1) {
	            return false;
	        }
	        return true;
	    }
	    function translate(number, withoutSuffix, key, isFuture) {
	        var result = number + ' ';
	        switch (key) {
	        case 's':
	            return withoutSuffix || isFuture ? 'nokkrar sekúndur' : 'nokkrum sekúndum';
	        case 'm':
	            return withoutSuffix ? 'mínúta' : 'mínútu';
	        case 'mm':
	            if (plural(number)) {
	                return result + (withoutSuffix || isFuture ? 'mínútur' : 'mínútum');
	            } else if (withoutSuffix) {
	                return result + 'mínúta';
	            }
	            return result + 'mínútu';
	        case 'hh':
	            if (plural(number)) {
	                return result + (withoutSuffix || isFuture ? 'klukkustundir' : 'klukkustundum');
	            }
	            return result + 'klukkustund';
	        case 'd':
	            if (withoutSuffix) {
	                return 'dagur';
	            }
	            return isFuture ? 'dag' : 'degi';
	        case 'dd':
	            if (plural(number)) {
	                if (withoutSuffix) {
	                    return result + 'dagar';
	                }
	                return result + (isFuture ? 'daga' : 'dögum');
	            } else if (withoutSuffix) {
	                return result + 'dagur';
	            }
	            return result + (isFuture ? 'dag' : 'degi');
	        case 'M':
	            if (withoutSuffix) {
	                return 'mánuður';
	            }
	            return isFuture ? 'mánuð' : 'mánuði';
	        case 'MM':
	            if (plural(number)) {
	                if (withoutSuffix) {
	                    return result + 'mánuðir';
	                }
	                return result + (isFuture ? 'mánuði' : 'mánuðum');
	            } else if (withoutSuffix) {
	                return result + 'mánuður';
	            }
	            return result + (isFuture ? 'mánuð' : 'mánuði');
	        case 'y':
	            return withoutSuffix || isFuture ? 'ár' : 'ári';
	        case 'yy':
	            if (plural(number)) {
	                return result + (withoutSuffix || isFuture ? 'ár' : 'árum');
	            }
	            return result + (withoutSuffix || isFuture ? 'ár' : 'ári');
	        }
	    }

	    var is = moment.defineLocale('is', {
	        months : 'janúar_febrúar_mars_apríl_maí_júní_júlí_ágúst_september_október_nóvember_desember'.split('_'),
	        monthsShort : 'jan_feb_mar_apr_maí_jún_júl_ágú_sep_okt_nóv_des'.split('_'),
	        weekdays : 'sunnudagur_mánudagur_þriðjudagur_miðvikudagur_fimmtudagur_föstudagur_laugardagur'.split('_'),
	        weekdaysShort : 'sun_mán_þri_mið_fim_fös_lau'.split('_'),
	        weekdaysMin : 'Su_Má_Þr_Mi_Fi_Fö_La'.split('_'),
	        longDateFormat : {
	            LT : 'H:mm',
	            LTS : 'H:mm:ss',
	            L : 'DD.MM.YYYY',
	            LL : 'D. MMMM YYYY',
	            LLL : 'D. MMMM YYYY [kl.] H:mm',
	            LLLL : 'dddd, D. MMMM YYYY [kl.] H:mm'
	        },
	        calendar : {
	            sameDay : '[í dag kl.] LT',
	            nextDay : '[á morgun kl.] LT',
	            nextWeek : 'dddd [kl.] LT',
	            lastDay : '[í gær kl.] LT',
	            lastWeek : '[síðasta] dddd [kl.] LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'eftir %s',
	            past : 'fyrir %s síðan',
	            s : translate,
	            m : translate,
	            mm : translate,
	            h : 'klukkustund',
	            hh : translate,
	            d : translate,
	            dd : translate,
	            M : translate,
	            MM : translate,
	            y : translate,
	            yy : translate
	        },
	        ordinalParse: /\d{1,2}\./,
	        ordinal : '%d.',
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return is;

	}));

/***/ },

/***/ 1012:
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : italian (it)
	//! author : Lorenzo : https://github.com/aliem
	//! author: Mattia Larentis: https://github.com/nostalgiaz

	;(function (global, factory) {
	    true ? factory(__webpack_require__(963)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var it = moment.defineLocale('it', {
	        months : 'gennaio_febbraio_marzo_aprile_maggio_giugno_luglio_agosto_settembre_ottobre_novembre_dicembre'.split('_'),
	        monthsShort : 'gen_feb_mar_apr_mag_giu_lug_ago_set_ott_nov_dic'.split('_'),
	        weekdays : 'Domenica_Lunedì_Martedì_Mercoledì_Giovedì_Venerdì_Sabato'.split('_'),
	        weekdaysShort : 'Dom_Lun_Mar_Mer_Gio_Ven_Sab'.split('_'),
	        weekdaysMin : 'Do_Lu_Ma_Me_Gi_Ve_Sa'.split('_'),
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY HH:mm',
	            LLLL : 'dddd, D MMMM YYYY HH:mm'
	        },
	        calendar : {
	            sameDay: '[Oggi alle] LT',
	            nextDay: '[Domani alle] LT',
	            nextWeek: 'dddd [alle] LT',
	            lastDay: '[Ieri alle] LT',
	            lastWeek: function () {
	                switch (this.day()) {
	                    case 0:
	                        return '[la scorsa] dddd [alle] LT';
	                    default:
	                        return '[lo scorso] dddd [alle] LT';
	                }
	            },
	            sameElse: 'L'
	        },
	        relativeTime : {
	            future : function (s) {
	                return ((/^[0-9].+$/).test(s) ? 'tra' : 'in') + ' ' + s;
	            },
	            past : '%s fa',
	            s : 'alcuni secondi',
	            m : 'un minuto',
	            mm : '%d minuti',
	            h : 'un\'ora',
	            hh : '%d ore',
	            d : 'un giorno',
	            dd : '%d giorni',
	            M : 'un mese',
	            MM : '%d mesi',
	            y : 'un anno',
	            yy : '%d anni'
	        },
	        ordinalParse : /\d{1,2}º/,
	        ordinal: '%dº',
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return it;

	}));

/***/ },

/***/ 1013:
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : japanese (ja)
	//! author : LI Long : https://github.com/baryon

	;(function (global, factory) {
	    true ? factory(__webpack_require__(963)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var ja = moment.defineLocale('ja', {
	        months : '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
	        monthsShort : '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
	        weekdays : '日曜日_月曜日_火曜日_水曜日_木曜日_金曜日_土曜日'.split('_'),
	        weekdaysShort : '日_月_火_水_木_金_土'.split('_'),
	        weekdaysMin : '日_月_火_水_木_金_土'.split('_'),
	        longDateFormat : {
	            LT : 'Ah時m分',
	            LTS : 'Ah時m分s秒',
	            L : 'YYYY/MM/DD',
	            LL : 'YYYY年M月D日',
	            LLL : 'YYYY年M月D日Ah時m分',
	            LLLL : 'YYYY年M月D日Ah時m分 dddd'
	        },
	        meridiemParse: /午前|午後/i,
	        isPM : function (input) {
	            return input === '午後';
	        },
	        meridiem : function (hour, minute, isLower) {
	            if (hour < 12) {
	                return '午前';
	            } else {
	                return '午後';
	            }
	        },
	        calendar : {
	            sameDay : '[今日] LT',
	            nextDay : '[明日] LT',
	            nextWeek : '[来週]dddd LT',
	            lastDay : '[昨日] LT',
	            lastWeek : '[前週]dddd LT',
	            sameElse : 'L'
	        },
	        ordinalParse : /\d{1,2}日/,
	        ordinal : function (number, period) {
	            switch (period) {
	            case 'd':
	            case 'D':
	            case 'DDD':
	                return number + '日';
	            default:
	                return number;
	            }
	        },
	        relativeTime : {
	            future : '%s後',
	            past : '%s前',
	            s : '数秒',
	            m : '1分',
	            mm : '%d分',
	            h : '1時間',
	            hh : '%d時間',
	            d : '1日',
	            dd : '%d日',
	            M : '1ヶ月',
	            MM : '%dヶ月',
	            y : '1年',
	            yy : '%d年'
	        }
	    });

	    return ja;

	}));

/***/ },

/***/ 1014:
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Boso Jowo (jv)
	//! author : Rony Lantip : https://github.com/lantip
	//! reference: http://jv.wikipedia.org/wiki/Basa_Jawa

	;(function (global, factory) {
	    true ? factory(__webpack_require__(963)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var jv = moment.defineLocale('jv', {
	        months : 'Januari_Februari_Maret_April_Mei_Juni_Juli_Agustus_September_Oktober_Nopember_Desember'.split('_'),
	        monthsShort : 'Jan_Feb_Mar_Apr_Mei_Jun_Jul_Ags_Sep_Okt_Nop_Des'.split('_'),
	        weekdays : 'Minggu_Senen_Seloso_Rebu_Kemis_Jemuwah_Septu'.split('_'),
	        weekdaysShort : 'Min_Sen_Sel_Reb_Kem_Jem_Sep'.split('_'),
	        weekdaysMin : 'Mg_Sn_Sl_Rb_Km_Jm_Sp'.split('_'),
	        longDateFormat : {
	            LT : 'HH.mm',
	            LTS : 'HH.mm.ss',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY [pukul] HH.mm',
	            LLLL : 'dddd, D MMMM YYYY [pukul] HH.mm'
	        },
	        meridiemParse: /enjing|siyang|sonten|ndalu/,
	        meridiemHour : function (hour, meridiem) {
	            if (hour === 12) {
	                hour = 0;
	            }
	            if (meridiem === 'enjing') {
	                return hour;
	            } else if (meridiem === 'siyang') {
	                return hour >= 11 ? hour : hour + 12;
	            } else if (meridiem === 'sonten' || meridiem === 'ndalu') {
	                return hour + 12;
	            }
	        },
	        meridiem : function (hours, minutes, isLower) {
	            if (hours < 11) {
	                return 'enjing';
	            } else if (hours < 15) {
	                return 'siyang';
	            } else if (hours < 19) {
	                return 'sonten';
	            } else {
	                return 'ndalu';
	            }
	        },
	        calendar : {
	            sameDay : '[Dinten puniko pukul] LT',
	            nextDay : '[Mbenjang pukul] LT',
	            nextWeek : 'dddd [pukul] LT',
	            lastDay : '[Kala wingi pukul] LT',
	            lastWeek : 'dddd [kepengker pukul] LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'wonten ing %s',
	            past : '%s ingkang kepengker',
	            s : 'sawetawis detik',
	            m : 'setunggal menit',
	            mm : '%d menit',
	            h : 'setunggal jam',
	            hh : '%d jam',
	            d : 'sedinten',
	            dd : '%d dinten',
	            M : 'sewulan',
	            MM : '%d wulan',
	            y : 'setaun',
	            yy : '%d taun'
	        },
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 7  // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return jv;

	}));

/***/ },

/***/ 1015:
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Georgian (ka)
	//! author : Irakli Janiashvili : https://github.com/irakli-janiashvili

	;(function (global, factory) {
	    true ? factory(__webpack_require__(963)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var ka = moment.defineLocale('ka', {
	        months : {
	            standalone: 'იანვარი_თებერვალი_მარტი_აპრილი_მაისი_ივნისი_ივლისი_აგვისტო_სექტემბერი_ოქტომბერი_ნოემბერი_დეკემბერი'.split('_'),
	            format: 'იანვარს_თებერვალს_მარტს_აპრილის_მაისს_ივნისს_ივლისს_აგვისტს_სექტემბერს_ოქტომბერს_ნოემბერს_დეკემბერს'.split('_')
	        },
	        monthsShort : 'იან_თებ_მარ_აპრ_მაი_ივნ_ივლ_აგვ_სექ_ოქტ_ნოე_დეკ'.split('_'),
	        weekdays : {
	            standalone: 'კვირა_ორშაბათი_სამშაბათი_ოთხშაბათი_ხუთშაბათი_პარასკევი_შაბათი'.split('_'),
	            format: 'კვირას_ორშაბათს_სამშაბათს_ოთხშაბათს_ხუთშაბათს_პარასკევს_შაბათს'.split('_'),
	            isFormat: /(წინა|შემდეგ)/
	        },
	        weekdaysShort : 'კვი_ორშ_სამ_ოთხ_ხუთ_პარ_შაბ'.split('_'),
	        weekdaysMin : 'კვ_ორ_სა_ოთ_ხუ_პა_შა'.split('_'),
	        longDateFormat : {
	            LT : 'h:mm A',
	            LTS : 'h:mm:ss A',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY h:mm A',
	            LLLL : 'dddd, D MMMM YYYY h:mm A'
	        },
	        calendar : {
	            sameDay : '[დღეს] LT[-ზე]',
	            nextDay : '[ხვალ] LT[-ზე]',
	            lastDay : '[გუშინ] LT[-ზე]',
	            nextWeek : '[შემდეგ] dddd LT[-ზე]',
	            lastWeek : '[წინა] dddd LT-ზე',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : function (s) {
	                return (/(წამი|წუთი|საათი|წელი)/).test(s) ?
	                    s.replace(/ი$/, 'ში') :
	                    s + 'ში';
	            },
	            past : function (s) {
	                if ((/(წამი|წუთი|საათი|დღე|თვე)/).test(s)) {
	                    return s.replace(/(ი|ე)$/, 'ის წინ');
	                }
	                if ((/წელი/).test(s)) {
	                    return s.replace(/წელი$/, 'წლის წინ');
	                }
	            },
	            s : 'რამდენიმე წამი',
	            m : 'წუთი',
	            mm : '%d წუთი',
	            h : 'საათი',
	            hh : '%d საათი',
	            d : 'დღე',
	            dd : '%d დღე',
	            M : 'თვე',
	            MM : '%d თვე',
	            y : 'წელი',
	            yy : '%d წელი'
	        },
	        ordinalParse: /0|1-ლი|მე-\d{1,2}|\d{1,2}-ე/,
	        ordinal : function (number) {
	            if (number === 0) {
	                return number;
	            }
	            if (number === 1) {
	                return number + '-ლი';
	            }
	            if ((number < 20) || (number <= 100 && (number % 20 === 0)) || (number % 100 === 0)) {
	                return 'მე-' + number;
	            }
	            return number + '-ე';
	        },
	        week : {
	            dow : 1,
	            doy : 7
	        }
	    });

	    return ka;

	}));

/***/ },

/***/ 1016:
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : kazakh (kk)
	//! authors : Nurlan Rakhimzhanov : https://github.com/nurlan

	;(function (global, factory) {
	    true ? factory(__webpack_require__(963)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var suffixes = {
	        0: '-ші',
	        1: '-ші',
	        2: '-ші',
	        3: '-ші',
	        4: '-ші',
	        5: '-ші',
	        6: '-шы',
	        7: '-ші',
	        8: '-ші',
	        9: '-шы',
	        10: '-шы',
	        20: '-шы',
	        30: '-шы',
	        40: '-шы',
	        50: '-ші',
	        60: '-шы',
	        70: '-ші',
	        80: '-ші',
	        90: '-шы',
	        100: '-ші'
	    };

	    var kk = moment.defineLocale('kk', {
	        months : 'қаңтар_ақпан_наурыз_сәуір_мамыр_маусым_шілде_тамыз_қыркүйек_қазан_қараша_желтоқсан'.split('_'),
	        monthsShort : 'қаң_ақп_нау_сәу_мам_мау_шіл_там_қыр_қаз_қар_жел'.split('_'),
	        weekdays : 'жексенбі_дүйсенбі_сейсенбі_сәрсенбі_бейсенбі_жұма_сенбі'.split('_'),
	        weekdaysShort : 'жек_дүй_сей_сәр_бей_жұм_сен'.split('_'),
	        weekdaysMin : 'жк_дй_сй_ср_бй_жм_сн'.split('_'),
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'DD.MM.YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY HH:mm',
	            LLLL : 'dddd, D MMMM YYYY HH:mm'
	        },
	        calendar : {
	            sameDay : '[Бүгін сағат] LT',
	            nextDay : '[Ертең сағат] LT',
	            nextWeek : 'dddd [сағат] LT',
	            lastDay : '[Кеше сағат] LT',
	            lastWeek : '[Өткен аптаның] dddd [сағат] LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : '%s ішінде',
	            past : '%s бұрын',
	            s : 'бірнеше секунд',
	            m : 'бір минут',
	            mm : '%d минут',
	            h : 'бір сағат',
	            hh : '%d сағат',
	            d : 'бір күн',
	            dd : '%d күн',
	            M : 'бір ай',
	            MM : '%d ай',
	            y : 'бір жыл',
	            yy : '%d жыл'
	        },
	        ordinalParse: /\d{1,2}-(ші|шы)/,
	        ordinal : function (number) {
	            var a = number % 10,
	                b = number >= 100 ? 100 : null;
	            return number + (suffixes[number] || suffixes[a] || suffixes[b]);
	        },
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 7  // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return kk;

	}));

/***/ },

/***/ 1017:
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : khmer (km)
	//! author : Kruy Vanna : https://github.com/kruyvanna

	;(function (global, factory) {
	    true ? factory(__webpack_require__(963)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var km = moment.defineLocale('km', {
	        months: 'មករា_កុម្ភៈ_មីនា_មេសា_ឧសភា_មិថុនា_កក្កដា_សីហា_កញ្ញា_តុលា_វិច្ឆិកា_ធ្នូ'.split('_'),
	        monthsShort: 'មករា_កុម្ភៈ_មីនា_មេសា_ឧសភា_មិថុនា_កក្កដា_សីហា_កញ្ញា_តុលា_វិច្ឆិកា_ធ្នូ'.split('_'),
	        weekdays: 'អាទិត្យ_ច័ន្ទ_អង្គារ_ពុធ_ព្រហស្បតិ៍_សុក្រ_សៅរ៍'.split('_'),
	        weekdaysShort: 'អាទិត្យ_ច័ន្ទ_អង្គារ_ពុធ_ព្រហស្បតិ៍_សុក្រ_សៅរ៍'.split('_'),
	        weekdaysMin: 'អាទិត្យ_ច័ន្ទ_អង្គារ_ពុធ_ព្រហស្បតិ៍_សុក្រ_សៅរ៍'.split('_'),
	        longDateFormat: {
	            LT: 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L: 'DD/MM/YYYY',
	            LL: 'D MMMM YYYY',
	            LLL: 'D MMMM YYYY HH:mm',
	            LLLL: 'dddd, D MMMM YYYY HH:mm'
	        },
	        calendar: {
	            sameDay: '[ថ្ងៃនេះ ម៉ោង] LT',
	            nextDay: '[ស្អែក ម៉ោង] LT',
	            nextWeek: 'dddd [ម៉ោង] LT',
	            lastDay: '[ម្សិលមិញ ម៉ោង] LT',
	            lastWeek: 'dddd [សប្តាហ៍មុន] [ម៉ោង] LT',
	            sameElse: 'L'
	        },
	        relativeTime: {
	            future: '%sទៀត',
	            past: '%sមុន',
	            s: 'ប៉ុន្មានវិនាទី',
	            m: 'មួយនាទី',
	            mm: '%d នាទី',
	            h: 'មួយម៉ោង',
	            hh: '%d ម៉ោង',
	            d: 'មួយថ្ងៃ',
	            dd: '%d ថ្ងៃ',
	            M: 'មួយខែ',
	            MM: '%d ខែ',
	            y: 'មួយឆ្នាំ',
	            yy: '%d ឆ្នាំ'
	        },
	        week: {
	            dow: 1, // Monday is the first day of the week.
	            doy: 4 // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return km;

	}));

/***/ },

/***/ 1018:
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : korean (ko)
	//!
	//! authors
	//!
	//! - Kyungwook, Park : https://github.com/kyungw00k
	//! - Jeeeyul Lee <jeeeyul@gmail.com>

	;(function (global, factory) {
	    true ? factory(__webpack_require__(963)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var ko = moment.defineLocale('ko', {
	        months : '1월_2월_3월_4월_5월_6월_7월_8월_9월_10월_11월_12월'.split('_'),
	        monthsShort : '1월_2월_3월_4월_5월_6월_7월_8월_9월_10월_11월_12월'.split('_'),
	        weekdays : '일요일_월요일_화요일_수요일_목요일_금요일_토요일'.split('_'),
	        weekdaysShort : '일_월_화_수_목_금_토'.split('_'),
	        weekdaysMin : '일_월_화_수_목_금_토'.split('_'),
	        longDateFormat : {
	            LT : 'A h시 m분',
	            LTS : 'A h시 m분 s초',
	            L : 'YYYY.MM.DD',
	            LL : 'YYYY년 MMMM D일',
	            LLL : 'YYYY년 MMMM D일 A h시 m분',
	            LLLL : 'YYYY년 MMMM D일 dddd A h시 m분'
	        },
	        calendar : {
	            sameDay : '오늘 LT',
	            nextDay : '내일 LT',
	            nextWeek : 'dddd LT',
	            lastDay : '어제 LT',
	            lastWeek : '지난주 dddd LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : '%s 후',
	            past : '%s 전',
	            s : '몇 초',
	            ss : '%d초',
	            m : '일분',
	            mm : '%d분',
	            h : '한 시간',
	            hh : '%d시간',
	            d : '하루',
	            dd : '%d일',
	            M : '한 달',
	            MM : '%d달',
	            y : '일 년',
	            yy : '%d년'
	        },
	        ordinalParse : /\d{1,2}일/,
	        ordinal : '%d일',
	        meridiemParse : /오전|오후/,
	        isPM : function (token) {
	            return token === '오후';
	        },
	        meridiem : function (hour, minute, isUpper) {
	            return hour < 12 ? '오전' : '오후';
	        }
	    });

	    return ko;

	}));

/***/ },

/***/ 1019:
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : kyrgyz (ky)
	//! author : Chyngyz Arystan uulu : https://github.com/chyngyz

	;(function (global, factory) {
	    true ? factory(__webpack_require__(963)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';



	    var suffixes = {
	        0: '-чү',
	        1: '-чи',
	        2: '-чи',
	        3: '-чү',
	        4: '-чү',
	        5: '-чи',
	        6: '-чы',
	        7: '-чи',
	        8: '-чи',
	        9: '-чу',
	        10: '-чу',
	        20: '-чы',
	        30: '-чу',
	        40: '-чы',
	        50: '-чү',
	        60: '-чы',
	        70: '-чи',
	        80: '-чи',
	        90: '-чу',
	        100: '-чү'
	    };

	    var ky = moment.defineLocale('ky', {
	        months : 'январь_февраль_март_апрель_май_июнь_июль_август_сентябрь_октябрь_ноябрь_декабрь'.split('_'),
	        monthsShort : 'янв_фев_март_апр_май_июнь_июль_авг_сен_окт_ноя_дек'.split('_'),
	        weekdays : 'Жекшемби_Дүйшөмбү_Шейшемби_Шаршемби_Бейшемби_Жума_Ишемби'.split('_'),
	        weekdaysShort : 'Жек_Дүй_Шей_Шар_Бей_Жум_Ише'.split('_'),
	        weekdaysMin : 'Жк_Дй_Шй_Шр_Бй_Жм_Иш'.split('_'),
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'DD.MM.YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY HH:mm',
	            LLLL : 'dddd, D MMMM YYYY HH:mm'
	        },
	        calendar : {
	            sameDay : '[Бүгүн саат] LT',
	            nextDay : '[Эртең саат] LT',
	            nextWeek : 'dddd [саат] LT',
	            lastDay : '[Кече саат] LT',
	            lastWeek : '[Өткен аптанын] dddd [күнү] [саат] LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : '%s ичинде',
	            past : '%s мурун',
	            s : 'бирнече секунд',
	            m : 'бир мүнөт',
	            mm : '%d мүнөт',
	            h : 'бир саат',
	            hh : '%d саат',
	            d : 'бир күн',
	            dd : '%d күн',
	            M : 'бир ай',
	            MM : '%d ай',
	            y : 'бир жыл',
	            yy : '%d жыл'
	        },
	        ordinalParse: /\d{1,2}-(чи|чы|чү|чу)/,
	        ordinal : function (number) {
	            var a = number % 10,
	                b = number >= 100 ? 100 : null;
	            return number + (suffixes[number] || suffixes[a] || suffixes[b]);
	        },
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 7  // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return ky;

	}));

/***/ },

/***/ 1020:
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Luxembourgish (lb)
	//! author : mweimerskirch : https://github.com/mweimerskirch, David Raison : https://github.com/kwisatz

	;(function (global, factory) {
	    true ? factory(__webpack_require__(963)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    function processRelativeTime(number, withoutSuffix, key, isFuture) {
	        var format = {
	            'm': ['eng Minutt', 'enger Minutt'],
	            'h': ['eng Stonn', 'enger Stonn'],
	            'd': ['een Dag', 'engem Dag'],
	            'M': ['ee Mount', 'engem Mount'],
	            'y': ['ee Joer', 'engem Joer']
	        };
	        return withoutSuffix ? format[key][0] : format[key][1];
	    }
	    function processFutureTime(string) {
	        var number = string.substr(0, string.indexOf(' '));
	        if (eifelerRegelAppliesToNumber(number)) {
	            return 'a ' + string;
	        }
	        return 'an ' + string;
	    }
	    function processPastTime(string) {
	        var number = string.substr(0, string.indexOf(' '));
	        if (eifelerRegelAppliesToNumber(number)) {
	            return 'viru ' + string;
	        }
	        return 'virun ' + string;
	    }
	    /**
	     * Returns true if the word before the given number loses the '-n' ending.
	     * e.g. 'an 10 Deeg' but 'a 5 Deeg'
	     *
	     * @param number {integer}
	     * @returns {boolean}
	     */
	    function eifelerRegelAppliesToNumber(number) {
	        number = parseInt(number, 10);
	        if (isNaN(number)) {
	            return false;
	        }
	        if (number < 0) {
	            // Negative Number --> always true
	            return true;
	        } else if (number < 10) {
	            // Only 1 digit
	            if (4 <= number && number <= 7) {
	                return true;
	            }
	            return false;
	        } else if (number < 100) {
	            // 2 digits
	            var lastDigit = number % 10, firstDigit = number / 10;
	            if (lastDigit === 0) {
	                return eifelerRegelAppliesToNumber(firstDigit);
	            }
	            return eifelerRegelAppliesToNumber(lastDigit);
	        } else if (number < 10000) {
	            // 3 or 4 digits --> recursively check first digit
	            while (number >= 10) {
	                number = number / 10;
	            }
	            return eifelerRegelAppliesToNumber(number);
	        } else {
	            // Anything larger than 4 digits: recursively check first n-3 digits
	            number = number / 1000;
	            return eifelerRegelAppliesToNumber(number);
	        }
	    }

	    var lb = moment.defineLocale('lb', {
	        months: 'Januar_Februar_Mäerz_Abrëll_Mee_Juni_Juli_August_September_Oktober_November_Dezember'.split('_'),
	        monthsShort: 'Jan._Febr._Mrz._Abr._Mee_Jun._Jul._Aug._Sept._Okt._Nov._Dez.'.split('_'),
	        monthsParseExact : true,
	        weekdays: 'Sonndeg_Méindeg_Dënschdeg_Mëttwoch_Donneschdeg_Freideg_Samschdeg'.split('_'),
	        weekdaysShort: 'So._Mé._Dë._Më._Do._Fr._Sa.'.split('_'),
	        weekdaysMin: 'So_Mé_Dë_Më_Do_Fr_Sa'.split('_'),
	        weekdaysParseExact : true,
	        longDateFormat: {
	            LT: 'H:mm [Auer]',
	            LTS: 'H:mm:ss [Auer]',
	            L: 'DD.MM.YYYY',
	            LL: 'D. MMMM YYYY',
	            LLL: 'D. MMMM YYYY H:mm [Auer]',
	            LLLL: 'dddd, D. MMMM YYYY H:mm [Auer]'
	        },
	        calendar: {
	            sameDay: '[Haut um] LT',
	            sameElse: 'L',
	            nextDay: '[Muer um] LT',
	            nextWeek: 'dddd [um] LT',
	            lastDay: '[Gëschter um] LT',
	            lastWeek: function () {
	                // Different date string for 'Dënschdeg' (Tuesday) and 'Donneschdeg' (Thursday) due to phonological rule
	                switch (this.day()) {
	                    case 2:
	                    case 4:
	                        return '[Leschten] dddd [um] LT';
	                    default:
	                        return '[Leschte] dddd [um] LT';
	                }
	            }
	        },
	        relativeTime : {
	            future : processFutureTime,
	            past : processPastTime,
	            s : 'e puer Sekonnen',
	            m : processRelativeTime,
	            mm : '%d Minutten',
	            h : processRelativeTime,
	            hh : '%d Stonnen',
	            d : processRelativeTime,
	            dd : '%d Deeg',
	            M : processRelativeTime,
	            MM : '%d Méint',
	            y : processRelativeTime,
	            yy : '%d Joer'
	        },
	        ordinalParse: /\d{1,2}\./,
	        ordinal: '%d.',
	        week: {
	            dow: 1, // Monday is the first day of the week.
	            doy: 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return lb;

	}));

/***/ },

/***/ 1021:
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : lao (lo)
	//! author : Ryan Hart : https://github.com/ryanhart2

	;(function (global, factory) {
	    true ? factory(__webpack_require__(963)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var lo = moment.defineLocale('lo', {
	        months : 'ມັງກອນ_ກຸມພາ_ມີນາ_ເມສາ_ພຶດສະພາ_ມິຖຸນາ_ກໍລະກົດ_ສິງຫາ_ກັນຍາ_ຕຸລາ_ພະຈິກ_ທັນວາ'.split('_'),
	        monthsShort : 'ມັງກອນ_ກຸມພາ_ມີນາ_ເມສາ_ພຶດສະພາ_ມິຖຸນາ_ກໍລະກົດ_ສິງຫາ_ກັນຍາ_ຕຸລາ_ພະຈິກ_ທັນວາ'.split('_'),
	        weekdays : 'ອາທິດ_ຈັນ_ອັງຄານ_ພຸດ_ພະຫັດ_ສຸກ_ເສົາ'.split('_'),
	        weekdaysShort : 'ທິດ_ຈັນ_ອັງຄານ_ພຸດ_ພະຫັດ_ສຸກ_ເສົາ'.split('_'),
	        weekdaysMin : 'ທ_ຈ_ອຄ_ພ_ພຫ_ສກ_ສ'.split('_'),
	        weekdaysParseExact : true,
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY HH:mm',
	            LLLL : 'ວັນdddd D MMMM YYYY HH:mm'
	        },
	        meridiemParse: /ຕອນເຊົ້າ|ຕອນແລງ/,
	        isPM: function (input) {
	            return input === 'ຕອນແລງ';
	        },
	        meridiem : function (hour, minute, isLower) {
	            if (hour < 12) {
	                return 'ຕອນເຊົ້າ';
	            } else {
	                return 'ຕອນແລງ';
	            }
	        },
	        calendar : {
	            sameDay : '[ມື້ນີ້ເວລາ] LT',
	            nextDay : '[ມື້ອື່ນເວລາ] LT',
	            nextWeek : '[ວັນ]dddd[ໜ້າເວລາ] LT',
	            lastDay : '[ມື້ວານນີ້ເວລາ] LT',
	            lastWeek : '[ວັນ]dddd[ແລ້ວນີ້ເວລາ] LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'ອີກ %s',
	            past : '%sຜ່ານມາ',
	            s : 'ບໍ່ເທົ່າໃດວິນາທີ',
	            m : '1 ນາທີ',
	            mm : '%d ນາທີ',
	            h : '1 ຊົ່ວໂມງ',
	            hh : '%d ຊົ່ວໂມງ',
	            d : '1 ມື້',
	            dd : '%d ມື້',
	            M : '1 ເດືອນ',
	            MM : '%d ເດືອນ',
	            y : '1 ປີ',
	            yy : '%d ປີ'
	        },
	        ordinalParse: /(ທີ່)\d{1,2}/,
	        ordinal : function (number) {
	            return 'ທີ່' + number;
	        }
	    });

	    return lo;

	}));

/***/ },

/***/ 1022:
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Lithuanian (lt)
	//! author : Mindaugas Mozūras : https://github.com/mmozuras

	;(function (global, factory) {
	    true ? factory(__webpack_require__(963)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var units = {
	        'm' : 'minutė_minutės_minutę',
	        'mm': 'minutės_minučių_minutes',
	        'h' : 'valanda_valandos_valandą',
	        'hh': 'valandos_valandų_valandas',
	        'd' : 'diena_dienos_dieną',
	        'dd': 'dienos_dienų_dienas',
	        'M' : 'mėnuo_mėnesio_mėnesį',
	        'MM': 'mėnesiai_mėnesių_mėnesius',
	        'y' : 'metai_metų_metus',
	        'yy': 'metai_metų_metus'
	    };
	    function translateSeconds(number, withoutSuffix, key, isFuture) {
	        if (withoutSuffix) {
	            return 'kelios sekundės';
	        } else {
	            return isFuture ? 'kelių sekundžių' : 'kelias sekundes';
	        }
	    }
	    function translateSingular(number, withoutSuffix, key, isFuture) {
	        return withoutSuffix ? forms(key)[0] : (isFuture ? forms(key)[1] : forms(key)[2]);
	    }
	    function special(number) {
	        return number % 10 === 0 || (number > 10 && number < 20);
	    }
	    function forms(key) {
	        return units[key].split('_');
	    }
	    function translate(number, withoutSuffix, key, isFuture) {
	        var result = number + ' ';
	        if (number === 1) {
	            return result + translateSingular(number, withoutSuffix, key[0], isFuture);
	        } else if (withoutSuffix) {
	            return result + (special(number) ? forms(key)[1] : forms(key)[0]);
	        } else {
	            if (isFuture) {
	                return result + forms(key)[1];
	            } else {
	                return result + (special(number) ? forms(key)[1] : forms(key)[2]);
	            }
	        }
	    }
	    var lt = moment.defineLocale('lt', {
	        months : {
	            format: 'sausio_vasario_kovo_balandžio_gegužės_birželio_liepos_rugpjūčio_rugsėjo_spalio_lapkričio_gruodžio'.split('_'),
	            standalone: 'sausis_vasaris_kovas_balandis_gegužė_birželis_liepa_rugpjūtis_rugsėjis_spalis_lapkritis_gruodis'.split('_')
	        },
	        monthsShort : 'sau_vas_kov_bal_geg_bir_lie_rgp_rgs_spa_lap_grd'.split('_'),
	        weekdays : {
	            format: 'sekmadienį_pirmadienį_antradienį_trečiadienį_ketvirtadienį_penktadienį_šeštadienį'.split('_'),
	            standalone: 'sekmadienis_pirmadienis_antradienis_trečiadienis_ketvirtadienis_penktadienis_šeštadienis'.split('_'),
	            isFormat: /dddd HH:mm/
	        },
	        weekdaysShort : 'Sek_Pir_Ant_Tre_Ket_Pen_Šeš'.split('_'),
	        weekdaysMin : 'S_P_A_T_K_Pn_Š'.split('_'),
	        weekdaysParseExact : true,
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'YYYY-MM-DD',
	            LL : 'YYYY [m.] MMMM D [d.]',
	            LLL : 'YYYY [m.] MMMM D [d.], HH:mm [val.]',
	            LLLL : 'YYYY [m.] MMMM D [d.], dddd, HH:mm [val.]',
	            l : 'YYYY-MM-DD',
	            ll : 'YYYY [m.] MMMM D [d.]',
	            lll : 'YYYY [m.] MMMM D [d.], HH:mm [val.]',
	            llll : 'YYYY [m.] MMMM D [d.], ddd, HH:mm [val.]'
	        },
	        calendar : {
	            sameDay : '[Šiandien] LT',
	            nextDay : '[Rytoj] LT',
	            nextWeek : 'dddd LT',
	            lastDay : '[Vakar] LT',
	            lastWeek : '[Praėjusį] dddd LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'po %s',
	            past : 'prieš %s',
	            s : translateSeconds,
	            m : translateSingular,
	            mm : translate,
	            h : translateSingular,
	            hh : translate,
	            d : translateSingular,
	            dd : translate,
	            M : translateSingular,
	            MM : translate,
	            y : translateSingular,
	            yy : translate
	        },
	        ordinalParse: /\d{1,2}-oji/,
	        ordinal : function (number) {
	            return number + '-oji';
	        },
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return lt;

	}));

/***/ },

/***/ 1023:
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : latvian (lv)
	//! author : Kristaps Karlsons : https://github.com/skakri
	//! author : Jānis Elmeris : https://github.com/JanisE

	;(function (global, factory) {
	    true ? factory(__webpack_require__(963)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var units = {
	        'm': 'minūtes_minūtēm_minūte_minūtes'.split('_'),
	        'mm': 'minūtes_minūtēm_minūte_minūtes'.split('_'),
	        'h': 'stundas_stundām_stunda_stundas'.split('_'),
	        'hh': 'stundas_stundām_stunda_stundas'.split('_'),
	        'd': 'dienas_dienām_diena_dienas'.split('_'),
	        'dd': 'dienas_dienām_diena_dienas'.split('_'),
	        'M': 'mēneša_mēnešiem_mēnesis_mēneši'.split('_'),
	        'MM': 'mēneša_mēnešiem_mēnesis_mēneši'.split('_'),
	        'y': 'gada_gadiem_gads_gadi'.split('_'),
	        'yy': 'gada_gadiem_gads_gadi'.split('_')
	    };
	    /**
	     * @param withoutSuffix boolean true = a length of time; false = before/after a period of time.
	     */
	    function format(forms, number, withoutSuffix) {
	        if (withoutSuffix) {
	            // E.g. "21 minūte", "3 minūtes".
	            return number % 10 === 1 && number !== 11 ? forms[2] : forms[3];
	        } else {
	            // E.g. "21 minūtes" as in "pēc 21 minūtes".
	            // E.g. "3 minūtēm" as in "pēc 3 minūtēm".
	            return number % 10 === 1 && number !== 11 ? forms[0] : forms[1];
	        }
	    }
	    function relativeTimeWithPlural(number, withoutSuffix, key) {
	        return number + ' ' + format(units[key], number, withoutSuffix);
	    }
	    function relativeTimeWithSingular(number, withoutSuffix, key) {
	        return format(units[key], number, withoutSuffix);
	    }
	    function relativeSeconds(number, withoutSuffix) {
	        return withoutSuffix ? 'dažas sekundes' : 'dažām sekundēm';
	    }

	    var lv = moment.defineLocale('lv', {
	        months : 'janvāris_februāris_marts_aprīlis_maijs_jūnijs_jūlijs_augusts_septembris_oktobris_novembris_decembris'.split('_'),
	        monthsShort : 'jan_feb_mar_apr_mai_jūn_jūl_aug_sep_okt_nov_dec'.split('_'),
	        weekdays : 'svētdiena_pirmdiena_otrdiena_trešdiena_ceturtdiena_piektdiena_sestdiena'.split('_'),
	        weekdaysShort : 'Sv_P_O_T_C_Pk_S'.split('_'),
	        weekdaysMin : 'Sv_P_O_T_C_Pk_S'.split('_'),
	        weekdaysParseExact : true,
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'DD.MM.YYYY.',
	            LL : 'YYYY. [gada] D. MMMM',
	            LLL : 'YYYY. [gada] D. MMMM, HH:mm',
	            LLLL : 'YYYY. [gada] D. MMMM, dddd, HH:mm'
	        },
	        calendar : {
	            sameDay : '[Šodien pulksten] LT',
	            nextDay : '[Rīt pulksten] LT',
	            nextWeek : 'dddd [pulksten] LT',
	            lastDay : '[Vakar pulksten] LT',
	            lastWeek : '[Pagājušā] dddd [pulksten] LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'pēc %s',
	            past : 'pirms %s',
	            s : relativeSeconds,
	            m : relativeTimeWithSingular,
	            mm : relativeTimeWithPlural,
	            h : relativeTimeWithSingular,
	            hh : relativeTimeWithPlural,
	            d : relativeTimeWithSingular,
	            dd : relativeTimeWithPlural,
	            M : relativeTimeWithSingular,
	            MM : relativeTimeWithPlural,
	            y : relativeTimeWithSingular,
	            yy : relativeTimeWithPlural
	        },
	        ordinalParse: /\d{1,2}\./,
	        ordinal : '%d.',
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return lv;

	}));

/***/ },

/***/ 1024:
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Montenegrin (me)
	//! author : Miodrag Nikač <miodrag@restartit.me> : https://github.com/miodragnikac

	;(function (global, factory) {
	    true ? factory(__webpack_require__(963)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var translator = {
	        words: { //Different grammatical cases
	            m: ['jedan minut', 'jednog minuta'],
	            mm: ['minut', 'minuta', 'minuta'],
	            h: ['jedan sat', 'jednog sata'],
	            hh: ['sat', 'sata', 'sati'],
	            dd: ['dan', 'dana', 'dana'],
	            MM: ['mjesec', 'mjeseca', 'mjeseci'],
	            yy: ['godina', 'godine', 'godina']
	        },
	        correctGrammaticalCase: function (number, wordKey) {
	            return number === 1 ? wordKey[0] : (number >= 2 && number <= 4 ? wordKey[1] : wordKey[2]);
	        },
	        translate: function (number, withoutSuffix, key) {
	            var wordKey = translator.words[key];
	            if (key.length === 1) {
	                return withoutSuffix ? wordKey[0] : wordKey[1];
	            } else {
	                return number + ' ' + translator.correctGrammaticalCase(number, wordKey);
	            }
	        }
	    };

	    var me = moment.defineLocale('me', {
	        months: 'januar_februar_mart_april_maj_jun_jul_avgust_septembar_oktobar_novembar_decembar'.split('_'),
	        monthsShort: 'jan._feb._mar._apr._maj_jun_jul_avg._sep._okt._nov._dec.'.split('_'),
	        monthsParseExact : true,
	        weekdays: 'nedjelja_ponedjeljak_utorak_srijeda_četvrtak_petak_subota'.split('_'),
	        weekdaysShort: 'ned._pon._uto._sri._čet._pet._sub.'.split('_'),
	        weekdaysMin: 'ne_po_ut_sr_če_pe_su'.split('_'),
	        weekdaysParseExact : true,
	        longDateFormat: {
	            LT: 'H:mm',
	            LTS : 'H:mm:ss',
	            L: 'DD. MM. YYYY',
	            LL: 'D. MMMM YYYY',
	            LLL: 'D. MMMM YYYY H:mm',
	            LLLL: 'dddd, D. MMMM YYYY H:mm'
	        },
	        calendar: {
	            sameDay: '[danas u] LT',
	            nextDay: '[sjutra u] LT',

	            nextWeek: function () {
	                switch (this.day()) {
	                case 0:
	                    return '[u] [nedjelju] [u] LT';
	                case 3:
	                    return '[u] [srijedu] [u] LT';
	                case 6:
	                    return '[u] [subotu] [u] LT';
	                case 1:
	                case 2:
	                case 4:
	                case 5:
	                    return '[u] dddd [u] LT';
	                }
	            },
	            lastDay  : '[juče u] LT',
	            lastWeek : function () {
	                var lastWeekDays = [
	                    '[prošle] [nedjelje] [u] LT',
	                    '[prošlog] [ponedjeljka] [u] LT',
	                    '[prošlog] [utorka] [u] LT',
	                    '[prošle] [srijede] [u] LT',
	                    '[prošlog] [četvrtka] [u] LT',
	                    '[prošlog] [petka] [u] LT',
	                    '[prošle] [subote] [u] LT'
	                ];
	                return lastWeekDays[this.day()];
	            },
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'za %s',
	            past   : 'prije %s',
	            s      : 'nekoliko sekundi',
	            m      : translator.translate,
	            mm     : translator.translate,
	            h      : translator.translate,
	            hh     : translator.translate,
	            d      : 'dan',
	            dd     : translator.translate,
	            M      : 'mjesec',
	            MM     : translator.translate,
	            y      : 'godinu',
	            yy     : translator.translate
	        },
	        ordinalParse: /\d{1,2}\./,
	        ordinal : '%d.',
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 7  // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return me;

	}));

/***/ },

/***/ 1025:
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : macedonian (mk)
	//! author : Borislav Mickov : https://github.com/B0k0

	;(function (global, factory) {
	    true ? factory(__webpack_require__(963)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var mk = moment.defineLocale('mk', {
	        months : 'јануари_февруари_март_април_мај_јуни_јули_август_септември_октомври_ноември_декември'.split('_'),
	        monthsShort : 'јан_фев_мар_апр_мај_јун_јул_авг_сеп_окт_ное_дек'.split('_'),
	        weekdays : 'недела_понеделник_вторник_среда_четврток_петок_сабота'.split('_'),
	        weekdaysShort : 'нед_пон_вто_сре_чет_пет_саб'.split('_'),
	        weekdaysMin : 'нe_пo_вт_ср_че_пе_сa'.split('_'),
	        longDateFormat : {
	            LT : 'H:mm',
	            LTS : 'H:mm:ss',
	            L : 'D.MM.YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY H:mm',
	            LLLL : 'dddd, D MMMM YYYY H:mm'
	        },
	        calendar : {
	            sameDay : '[Денес во] LT',
	            nextDay : '[Утре во] LT',
	            nextWeek : '[Во] dddd [во] LT',
	            lastDay : '[Вчера во] LT',
	            lastWeek : function () {
	                switch (this.day()) {
	                case 0:
	                case 3:
	                case 6:
	                    return '[Изминатата] dddd [во] LT';
	                case 1:
	                case 2:
	                case 4:
	                case 5:
	                    return '[Изминатиот] dddd [во] LT';
	                }
	            },
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'после %s',
	            past : 'пред %s',
	            s : 'неколку секунди',
	            m : 'минута',
	            mm : '%d минути',
	            h : 'час',
	            hh : '%d часа',
	            d : 'ден',
	            dd : '%d дена',
	            M : 'месец',
	            MM : '%d месеци',
	            y : 'година',
	            yy : '%d години'
	        },
	        ordinalParse: /\d{1,2}-(ев|ен|ти|ви|ри|ми)/,
	        ordinal : function (number) {
	            var lastDigit = number % 10,
	                last2Digits = number % 100;
	            if (number === 0) {
	                return number + '-ев';
	            } else if (last2Digits === 0) {
	                return number + '-ен';
	            } else if (last2Digits > 10 && last2Digits < 20) {
	                return number + '-ти';
	            } else if (lastDigit === 1) {
	                return number + '-ви';
	            } else if (lastDigit === 2) {
	                return number + '-ри';
	            } else if (lastDigit === 7 || lastDigit === 8) {
	                return number + '-ми';
	            } else {
	                return number + '-ти';
	            }
	        },
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 7  // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return mk;

	}));

/***/ },

/***/ 1026:
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : malayalam (ml)
	//! author : Floyd Pink : https://github.com/floydpink

	;(function (global, factory) {
	    true ? factory(__webpack_require__(963)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var ml = moment.defineLocale('ml', {
	        months : 'ജനുവരി_ഫെബ്രുവരി_മാർച്ച്_ഏപ്രിൽ_മേയ്_ജൂൺ_ജൂലൈ_ഓഗസ്റ്റ്_സെപ്റ്റംബർ_ഒക്ടോബർ_നവംബർ_ഡിസംബർ'.split('_'),
	        monthsShort : 'ജനു._ഫെബ്രു._മാർ._ഏപ്രി._മേയ്_ജൂൺ_ജൂലൈ._ഓഗ._സെപ്റ്റ._ഒക്ടോ._നവം._ഡിസം.'.split('_'),
	        monthsParseExact : true,
	        weekdays : 'ഞായറാഴ്ച_തിങ്കളാഴ്ച_ചൊവ്വാഴ്ച_ബുധനാഴ്ച_വ്യാഴാഴ്ച_വെള്ളിയാഴ്ച_ശനിയാഴ്ച'.split('_'),
	        weekdaysShort : 'ഞായർ_തിങ്കൾ_ചൊവ്വ_ബുധൻ_വ്യാഴം_വെള്ളി_ശനി'.split('_'),
	        weekdaysMin : 'ഞാ_തി_ചൊ_ബു_വ്യാ_വെ_ശ'.split('_'),
	        longDateFormat : {
	            LT : 'A h:mm -നു',
	            LTS : 'A h:mm:ss -നു',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY, A h:mm -നു',
	            LLLL : 'dddd, D MMMM YYYY, A h:mm -നു'
	        },
	        calendar : {
	            sameDay : '[ഇന്ന്] LT',
	            nextDay : '[നാളെ] LT',
	            nextWeek : 'dddd, LT',
	            lastDay : '[ഇന്നലെ] LT',
	            lastWeek : '[കഴിഞ്ഞ] dddd, LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : '%s കഴിഞ്ഞ്',
	            past : '%s മുൻപ്',
	            s : 'അൽപ നിമിഷങ്ങൾ',
	            m : 'ഒരു മിനിറ്റ്',
	            mm : '%d മിനിറ്റ്',
	            h : 'ഒരു മണിക്കൂർ',
	            hh : '%d മണിക്കൂർ',
	            d : 'ഒരു ദിവസം',
	            dd : '%d ദിവസം',
	            M : 'ഒരു മാസം',
	            MM : '%d മാസം',
	            y : 'ഒരു വർഷം',
	            yy : '%d വർഷം'
	        },
	        meridiemParse: /രാത്രി|രാവിലെ|ഉച്ച കഴിഞ്ഞ്|വൈകുന്നേരം|രാത്രി/i,
	        meridiemHour : function (hour, meridiem) {
	            if (hour === 12) {
	                hour = 0;
	            }
	            if ((meridiem === 'രാത്രി' && hour >= 4) ||
	                    meridiem === 'ഉച്ച കഴിഞ്ഞ്' ||
	                    meridiem === 'വൈകുന്നേരം') {
	                return hour + 12;
	            } else {
	                return hour;
	            }
	        },
	        meridiem : function (hour, minute, isLower) {
	            if (hour < 4) {
	                return 'രാത്രി';
	            } else if (hour < 12) {
	                return 'രാവിലെ';
	            } else if (hour < 17) {
	                return 'ഉച്ച കഴിഞ്ഞ്';
	            } else if (hour < 20) {
	                return 'വൈകുന്നേരം';
	            } else {
	                return 'രാത്രി';
	            }
	        }
	    });

	    return ml;

	}));

/***/ },

/***/ 1027:
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Marathi (mr)
	//! author : Harshad Kale : https://github.com/kalehv
	//! author : Vivek Athalye : https://github.com/vnathalye

	;(function (global, factory) {
	    true ? factory(__webpack_require__(963)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var symbolMap = {
	        '1': '१',
	        '2': '२',
	        '3': '३',
	        '4': '४',
	        '5': '५',
	        '6': '६',
	        '7': '७',
	        '8': '८',
	        '9': '९',
	        '0': '०'
	    },
	    numberMap = {
	        '१': '1',
	        '२': '2',
	        '३': '3',
	        '४': '4',
	        '५': '5',
	        '६': '6',
	        '७': '7',
	        '८': '8',
	        '९': '9',
	        '०': '0'
	    };

	    function relativeTimeMr(number, withoutSuffix, string, isFuture)
	    {
	        var output = '';
	        if (withoutSuffix) {
	            switch (string) {
	                case 's': output = 'काही सेकंद'; break;
	                case 'm': output = 'एक मिनिट'; break;
	                case 'mm': output = '%d मिनिटे'; break;
	                case 'h': output = 'एक तास'; break;
	                case 'hh': output = '%d तास'; break;
	                case 'd': output = 'एक दिवस'; break;
	                case 'dd': output = '%d दिवस'; break;
	                case 'M': output = 'एक महिना'; break;
	                case 'MM': output = '%d महिने'; break;
	                case 'y': output = 'एक वर्ष'; break;
	                case 'yy': output = '%d वर्षे'; break;
	            }
	        }
	        else {
	            switch (string) {
	                case 's': output = 'काही सेकंदां'; break;
	                case 'm': output = 'एका मिनिटा'; break;
	                case 'mm': output = '%d मिनिटां'; break;
	                case 'h': output = 'एका तासा'; break;
	                case 'hh': output = '%d तासां'; break;
	                case 'd': output = 'एका दिवसा'; break;
	                case 'dd': output = '%d दिवसां'; break;
	                case 'M': output = 'एका महिन्या'; break;
	                case 'MM': output = '%d महिन्यां'; break;
	                case 'y': output = 'एका वर्षा'; break;
	                case 'yy': output = '%d वर्षां'; break;
	            }
	        }
	        return output.replace(/%d/i, number);
	    }

	    var mr = moment.defineLocale('mr', {
	        months : 'जानेवारी_फेब्रुवारी_मार्च_एप्रिल_मे_जून_जुलै_ऑगस्ट_सप्टेंबर_ऑक्टोबर_नोव्हेंबर_डिसेंबर'.split('_'),
	        monthsShort: 'जाने._फेब्रु._मार्च._एप्रि._मे._जून._जुलै._ऑग._सप्टें._ऑक्टो._नोव्हें._डिसें.'.split('_'),
	        monthsParseExact : true,
	        weekdays : 'रविवार_सोमवार_मंगळवार_बुधवार_गुरूवार_शुक्रवार_शनिवार'.split('_'),
	        weekdaysShort : 'रवि_सोम_मंगळ_बुध_गुरू_शुक्र_शनि'.split('_'),
	        weekdaysMin : 'र_सो_मं_बु_गु_शु_श'.split('_'),
	        longDateFormat : {
	            LT : 'A h:mm वाजता',
	            LTS : 'A h:mm:ss वाजता',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY, A h:mm वाजता',
	            LLLL : 'dddd, D MMMM YYYY, A h:mm वाजता'
	        },
	        calendar : {
	            sameDay : '[आज] LT',
	            nextDay : '[उद्या] LT',
	            nextWeek : 'dddd, LT',
	            lastDay : '[काल] LT',
	            lastWeek: '[मागील] dddd, LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future: '%sमध्ये',
	            past: '%sपूर्वी',
	            s: relativeTimeMr,
	            m: relativeTimeMr,
	            mm: relativeTimeMr,
	            h: relativeTimeMr,
	            hh: relativeTimeMr,
	            d: relativeTimeMr,
	            dd: relativeTimeMr,
	            M: relativeTimeMr,
	            MM: relativeTimeMr,
	            y: relativeTimeMr,
	            yy: relativeTimeMr
	        },
	        preparse: function (string) {
	            return string.replace(/[१२३४५६७८९०]/g, function (match) {
	                return numberMap[match];
	            });
	        },
	        postformat: function (string) {
	            return string.replace(/\d/g, function (match) {
	                return symbolMap[match];
	            });
	        },
	        meridiemParse: /रात्री|सकाळी|दुपारी|सायंकाळी/,
	        meridiemHour : function (hour, meridiem) {
	            if (hour === 12) {
	                hour = 0;
	            }
	            if (meridiem === 'रात्री') {
	                return hour < 4 ? hour : hour + 12;
	            } else if (meridiem === 'सकाळी') {
	                return hour;
	            } else if (meridiem === 'दुपारी') {
	                return hour >= 10 ? hour : hour + 12;
	            } else if (meridiem === 'सायंकाळी') {
	                return hour + 12;
	            }
	        },
	        meridiem: function (hour, minute, isLower) {
	            if (hour < 4) {
	                return 'रात्री';
	            } else if (hour < 10) {
	                return 'सकाळी';
	            } else if (hour < 17) {
	                return 'दुपारी';
	            } else if (hour < 20) {
	                return 'सायंकाळी';
	            } else {
	                return 'रात्री';
	            }
	        },
	        week : {
	            dow : 0, // Sunday is the first day of the week.
	            doy : 6  // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return mr;

	}));

/***/ },

/***/ 1028:
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Bahasa Malaysia (ms-MY)
	//! author : Weldan Jamili : https://github.com/weldan

	;(function (global, factory) {
	    true ? factory(__webpack_require__(963)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var ms = moment.defineLocale('ms', {
	        months : 'Januari_Februari_Mac_April_Mei_Jun_Julai_Ogos_September_Oktober_November_Disember'.split('_'),
	        monthsShort : 'Jan_Feb_Mac_Apr_Mei_Jun_Jul_Ogs_Sep_Okt_Nov_Dis'.split('_'),
	        weekdays : 'Ahad_Isnin_Selasa_Rabu_Khamis_Jumaat_Sabtu'.split('_'),
	        weekdaysShort : 'Ahd_Isn_Sel_Rab_Kha_Jum_Sab'.split('_'),
	        weekdaysMin : 'Ah_Is_Sl_Rb_Km_Jm_Sb'.split('_'),
	        longDateFormat : {
	            LT : 'HH.mm',
	            LTS : 'HH.mm.ss',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY [pukul] HH.mm',
	            LLLL : 'dddd, D MMMM YYYY [pukul] HH.mm'
	        },
	        meridiemParse: /pagi|tengahari|petang|malam/,
	        meridiemHour: function (hour, meridiem) {
	            if (hour === 12) {
	                hour = 0;
	            }
	            if (meridiem === 'pagi') {
	                return hour;
	            } else if (meridiem === 'tengahari') {
	                return hour >= 11 ? hour : hour + 12;
	            } else if (meridiem === 'petang' || meridiem === 'malam') {
	                return hour + 12;
	            }
	        },
	        meridiem : function (hours, minutes, isLower) {
	            if (hours < 11) {
	                return 'pagi';
	            } else if (hours < 15) {
	                return 'tengahari';
	            } else if (hours < 19) {
	                return 'petang';
	            } else {
	                return 'malam';
	            }
	        },
	        calendar : {
	            sameDay : '[Hari ini pukul] LT',
	            nextDay : '[Esok pukul] LT',
	            nextWeek : 'dddd [pukul] LT',
	            lastDay : '[Kelmarin pukul] LT',
	            lastWeek : 'dddd [lepas pukul] LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'dalam %s',
	            past : '%s yang lepas',
	            s : 'beberapa saat',
	            m : 'seminit',
	            mm : '%d minit',
	            h : 'sejam',
	            hh : '%d jam',
	            d : 'sehari',
	            dd : '%d hari',
	            M : 'sebulan',
	            MM : '%d bulan',
	            y : 'setahun',
	            yy : '%d tahun'
	        },
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 7  // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return ms;

	}));

/***/ },

/***/ 1029:
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Bahasa Malaysia (ms-MY)
	//! author : Weldan Jamili : https://github.com/weldan

	;(function (global, factory) {
	    true ? factory(__webpack_require__(963)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var ms_my = moment.defineLocale('ms-my', {
	        months : 'Januari_Februari_Mac_April_Mei_Jun_Julai_Ogos_September_Oktober_November_Disember'.split('_'),
	        monthsShort : 'Jan_Feb_Mac_Apr_Mei_Jun_Jul_Ogs_Sep_Okt_Nov_Dis'.split('_'),
	        weekdays : 'Ahad_Isnin_Selasa_Rabu_Khamis_Jumaat_Sabtu'.split('_'),
	        weekdaysShort : 'Ahd_Isn_Sel_Rab_Kha_Jum_Sab'.split('_'),
	        weekdaysMin : 'Ah_Is_Sl_Rb_Km_Jm_Sb'.split('_'),
	        longDateFormat : {
	            LT : 'HH.mm',
	            LTS : 'HH.mm.ss',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY [pukul] HH.mm',
	            LLLL : 'dddd, D MMMM YYYY [pukul] HH.mm'
	        },
	        meridiemParse: /pagi|tengahari|petang|malam/,
	        meridiemHour: function (hour, meridiem) {
	            if (hour === 12) {
	                hour = 0;
	            }
	            if (meridiem === 'pagi') {
	                return hour;
	            } else if (meridiem === 'tengahari') {
	                return hour >= 11 ? hour : hour + 12;
	            } else if (meridiem === 'petang' || meridiem === 'malam') {
	                return hour + 12;
	            }
	        },
	        meridiem : function (hours, minutes, isLower) {
	            if (hours < 11) {
	                return 'pagi';
	            } else if (hours < 15) {
	                return 'tengahari';
	            } else if (hours < 19) {
	                return 'petang';
	            } else {
	                return 'malam';
	            }
	        },
	        calendar : {
	            sameDay : '[Hari ini pukul] LT',
	            nextDay : '[Esok pukul] LT',
	            nextWeek : 'dddd [pukul] LT',
	            lastDay : '[Kelmarin pukul] LT',
	            lastWeek : 'dddd [lepas pukul] LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'dalam %s',
	            past : '%s yang lepas',
	            s : 'beberapa saat',
	            m : 'seminit',
	            mm : '%d minit',
	            h : 'sejam',
	            hh : '%d jam',
	            d : 'sehari',
	            dd : '%d hari',
	            M : 'sebulan',
	            MM : '%d bulan',
	            y : 'setahun',
	            yy : '%d tahun'
	        },
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 7  // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return ms_my;

	}));

/***/ },

/***/ 1030:
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Burmese (my)
	//! author : Squar team, mysquar.com

	;(function (global, factory) {
	    true ? factory(__webpack_require__(963)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var symbolMap = {
	        '1': '၁',
	        '2': '၂',
	        '3': '၃',
	        '4': '၄',
	        '5': '၅',
	        '6': '၆',
	        '7': '၇',
	        '8': '၈',
	        '9': '၉',
	        '0': '၀'
	    }, numberMap = {
	        '၁': '1',
	        '၂': '2',
	        '၃': '3',
	        '၄': '4',
	        '၅': '5',
	        '၆': '6',
	        '၇': '7',
	        '၈': '8',
	        '၉': '9',
	        '၀': '0'
	    };

	    var my = moment.defineLocale('my', {
	        months: 'ဇန်နဝါရီ_ဖေဖော်ဝါရီ_မတ်_ဧပြီ_မေ_ဇွန်_ဇူလိုင်_သြဂုတ်_စက်တင်ဘာ_အောက်တိုဘာ_နိုဝင်ဘာ_ဒီဇင်ဘာ'.split('_'),
	        monthsShort: 'ဇန်_ဖေ_မတ်_ပြီ_မေ_ဇွန်_လိုင်_သြ_စက်_အောက်_နို_ဒီ'.split('_'),
	        weekdays: 'တနင်္ဂနွေ_တနင်္လာ_အင်္ဂါ_ဗုဒ္ဓဟူး_ကြာသပတေး_သောကြာ_စနေ'.split('_'),
	        weekdaysShort: 'နွေ_လာ_ဂါ_ဟူး_ကြာ_သော_နေ'.split('_'),
	        weekdaysMin: 'နွေ_လာ_ဂါ_ဟူး_ကြာ_သော_နေ'.split('_'),

	        longDateFormat: {
	            LT: 'HH:mm',
	            LTS: 'HH:mm:ss',
	            L: 'DD/MM/YYYY',
	            LL: 'D MMMM YYYY',
	            LLL: 'D MMMM YYYY HH:mm',
	            LLLL: 'dddd D MMMM YYYY HH:mm'
	        },
	        calendar: {
	            sameDay: '[ယနေ.] LT [မှာ]',
	            nextDay: '[မနက်ဖြန်] LT [မှာ]',
	            nextWeek: 'dddd LT [မှာ]',
	            lastDay: '[မနေ.က] LT [မှာ]',
	            lastWeek: '[ပြီးခဲ့သော] dddd LT [မှာ]',
	            sameElse: 'L'
	        },
	        relativeTime: {
	            future: 'လာမည့် %s မှာ',
	            past: 'လွန်ခဲ့သော %s က',
	            s: 'စက္ကန်.အနည်းငယ်',
	            m: 'တစ်မိနစ်',
	            mm: '%d မိနစ်',
	            h: 'တစ်နာရီ',
	            hh: '%d နာရီ',
	            d: 'တစ်ရက်',
	            dd: '%d ရက်',
	            M: 'တစ်လ',
	            MM: '%d လ',
	            y: 'တစ်နှစ်',
	            yy: '%d နှစ်'
	        },
	        preparse: function (string) {
	            return string.replace(/[၁၂၃၄၅၆၇၈၉၀]/g, function (match) {
	                return numberMap[match];
	            });
	        },
	        postformat: function (string) {
	            return string.replace(/\d/g, function (match) {
	                return symbolMap[match];
	            });
	        },
	        week: {
	            dow: 1, // Monday is the first day of the week.
	            doy: 4 // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return my;

	}));

/***/ },

/***/ 1031:
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : norwegian bokmål (nb)
	//! authors : Espen Hovlandsdal : https://github.com/rexxars
	//!           Sigurd Gartmann : https://github.com/sigurdga

	;(function (global, factory) {
	    true ? factory(__webpack_require__(963)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var nb = moment.defineLocale('nb', {
	        months : 'januar_februar_mars_april_mai_juni_juli_august_september_oktober_november_desember'.split('_'),
	        monthsShort : 'jan._feb._mars_april_mai_juni_juli_aug._sep._okt._nov._des.'.split('_'),
	        monthsParseExact : true,
	        weekdays : 'søndag_mandag_tirsdag_onsdag_torsdag_fredag_lørdag'.split('_'),
	        weekdaysShort : 'sø._ma._ti._on._to._fr._lø.'.split('_'),
	        weekdaysMin : 'sø_ma_ti_on_to_fr_lø'.split('_'),
	        weekdaysParseExact : true,
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'DD.MM.YYYY',
	            LL : 'D. MMMM YYYY',
	            LLL : 'D. MMMM YYYY [kl.] HH:mm',
	            LLLL : 'dddd D. MMMM YYYY [kl.] HH:mm'
	        },
	        calendar : {
	            sameDay: '[i dag kl.] LT',
	            nextDay: '[i morgen kl.] LT',
	            nextWeek: 'dddd [kl.] LT',
	            lastDay: '[i går kl.] LT',
	            lastWeek: '[forrige] dddd [kl.] LT',
	            sameElse: 'L'
	        },
	        relativeTime : {
	            future : 'om %s',
	            past : '%s siden',
	            s : 'noen sekunder',
	            m : 'ett minutt',
	            mm : '%d minutter',
	            h : 'en time',
	            hh : '%d timer',
	            d : 'en dag',
	            dd : '%d dager',
	            M : 'en måned',
	            MM : '%d måneder',
	            y : 'ett år',
	            yy : '%d år'
	        },
	        ordinalParse: /\d{1,2}\./,
	        ordinal : '%d.',
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return nb;

	}));

/***/ },

/***/ 1032:
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : nepali/nepalese
	//! author : suvash : https://github.com/suvash

	;(function (global, factory) {
	    true ? factory(__webpack_require__(963)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var symbolMap = {
	        '1': '१',
	        '2': '२',
	        '3': '३',
	        '4': '४',
	        '5': '५',
	        '6': '६',
	        '7': '७',
	        '8': '८',
	        '9': '९',
	        '0': '०'
	    },
	    numberMap = {
	        '१': '1',
	        '२': '2',
	        '३': '3',
	        '४': '4',
	        '५': '5',
	        '६': '6',
	        '७': '7',
	        '८': '8',
	        '९': '9',
	        '०': '0'
	    };

	    var ne = moment.defineLocale('ne', {
	        months : 'जनवरी_फेब्रुवरी_मार्च_अप्रिल_मई_जुन_जुलाई_अगष्ट_सेप्टेम्बर_अक्टोबर_नोभेम्बर_डिसेम्बर'.split('_'),
	        monthsShort : 'जन._फेब्रु._मार्च_अप्रि._मई_जुन_जुलाई._अग._सेप्ट._अक्टो._नोभे._डिसे.'.split('_'),
	        monthsParseExact : true,
	        weekdays : 'आइतबार_सोमबार_मङ्गलबार_बुधबार_बिहिबार_शुक्रबार_शनिबार'.split('_'),
	        weekdaysShort : 'आइत._सोम._मङ्गल._बुध._बिहि._शुक्र._शनि.'.split('_'),
	        weekdaysMin : 'आ._सो._मं._बु._बि._शु._श.'.split('_'),
	        weekdaysParseExact : true,
	        longDateFormat : {
	            LT : 'Aको h:mm बजे',
	            LTS : 'Aको h:mm:ss बजे',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY, Aको h:mm बजे',
	            LLLL : 'dddd, D MMMM YYYY, Aको h:mm बजे'
	        },
	        preparse: function (string) {
	            return string.replace(/[१२३४५६७८९०]/g, function (match) {
	                return numberMap[match];
	            });
	        },
	        postformat: function (string) {
	            return string.replace(/\d/g, function (match) {
	                return symbolMap[match];
	            });
	        },
	        meridiemParse: /राति|बिहान|दिउँसो|साँझ/,
	        meridiemHour : function (hour, meridiem) {
	            if (hour === 12) {
	                hour = 0;
	            }
	            if (meridiem === 'राति') {
	                return hour < 4 ? hour : hour + 12;
	            } else if (meridiem === 'बिहान') {
	                return hour;
	            } else if (meridiem === 'दिउँसो') {
	                return hour >= 10 ? hour : hour + 12;
	            } else if (meridiem === 'साँझ') {
	                return hour + 12;
	            }
	        },
	        meridiem : function (hour, minute, isLower) {
	            if (hour < 3) {
	                return 'राति';
	            } else if (hour < 12) {
	                return 'बिहान';
	            } else if (hour < 16) {
	                return 'दिउँसो';
	            } else if (hour < 20) {
	                return 'साँझ';
	            } else {
	                return 'राति';
	            }
	        },
	        calendar : {
	            sameDay : '[आज] LT',
	            nextDay : '[भोलि] LT',
	            nextWeek : '[आउँदो] dddd[,] LT',
	            lastDay : '[हिजो] LT',
	            lastWeek : '[गएको] dddd[,] LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : '%sमा',
	            past : '%s अगाडि',
	            s : 'केही क्षण',
	            m : 'एक मिनेट',
	            mm : '%d मिनेट',
	            h : 'एक घण्टा',
	            hh : '%d घण्टा',
	            d : 'एक दिन',
	            dd : '%d दिन',
	            M : 'एक महिना',
	            MM : '%d महिना',
	            y : 'एक बर्ष',
	            yy : '%d बर्ष'
	        },
	        week : {
	            dow : 0, // Sunday is the first day of the week.
	            doy : 6  // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return ne;

	}));

/***/ },

/***/ 1033:
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : dutch (nl)
	//! author : Joris Röling : https://github.com/jjupiter

	;(function (global, factory) {
	    true ? factory(__webpack_require__(963)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var monthsShortWithDots = 'jan._feb._mrt._apr._mei_jun._jul._aug._sep._okt._nov._dec.'.split('_'),
	        monthsShortWithoutDots = 'jan_feb_mrt_apr_mei_jun_jul_aug_sep_okt_nov_dec'.split('_');

	    var nl = moment.defineLocale('nl', {
	        months : 'januari_februari_maart_april_mei_juni_juli_augustus_september_oktober_november_december'.split('_'),
	        monthsShort : function (m, format) {
	            if (/-MMM-/.test(format)) {
	                return monthsShortWithoutDots[m.month()];
	            } else {
	                return monthsShortWithDots[m.month()];
	            }
	        },
	        monthsParseExact : true,
	        weekdays : 'zondag_maandag_dinsdag_woensdag_donderdag_vrijdag_zaterdag'.split('_'),
	        weekdaysShort : 'zo._ma._di._wo._do._vr._za.'.split('_'),
	        weekdaysMin : 'Zo_Ma_Di_Wo_Do_Vr_Za'.split('_'),
	        weekdaysParseExact : true,
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'DD-MM-YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY HH:mm',
	            LLLL : 'dddd D MMMM YYYY HH:mm'
	        },
	        calendar : {
	            sameDay: '[vandaag om] LT',
	            nextDay: '[morgen om] LT',
	            nextWeek: 'dddd [om] LT',
	            lastDay: '[gisteren om] LT',
	            lastWeek: '[afgelopen] dddd [om] LT',
	            sameElse: 'L'
	        },
	        relativeTime : {
	            future : 'over %s',
	            past : '%s geleden',
	            s : 'een paar seconden',
	            m : 'één minuut',
	            mm : '%d minuten',
	            h : 'één uur',
	            hh : '%d uur',
	            d : 'één dag',
	            dd : '%d dagen',
	            M : 'één maand',
	            MM : '%d maanden',
	            y : 'één jaar',
	            yy : '%d jaar'
	        },
	        ordinalParse: /\d{1,2}(ste|de)/,
	        ordinal : function (number) {
	            return number + ((number === 1 || number === 8 || number >= 20) ? 'ste' : 'de');
	        },
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return nl;

	}));

/***/ },

/***/ 1034:
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : norwegian nynorsk (nn)
	//! author : https://github.com/mechuwind

	;(function (global, factory) {
	    true ? factory(__webpack_require__(963)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var nn = moment.defineLocale('nn', {
	        months : 'januar_februar_mars_april_mai_juni_juli_august_september_oktober_november_desember'.split('_'),
	        monthsShort : 'jan_feb_mar_apr_mai_jun_jul_aug_sep_okt_nov_des'.split('_'),
	        weekdays : 'sundag_måndag_tysdag_onsdag_torsdag_fredag_laurdag'.split('_'),
	        weekdaysShort : 'sun_mån_tys_ons_tor_fre_lau'.split('_'),
	        weekdaysMin : 'su_må_ty_on_to_fr_lø'.split('_'),
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'DD.MM.YYYY',
	            LL : 'D. MMMM YYYY',
	            LLL : 'D. MMMM YYYY [kl.] H:mm',
	            LLLL : 'dddd D. MMMM YYYY [kl.] HH:mm'
	        },
	        calendar : {
	            sameDay: '[I dag klokka] LT',
	            nextDay: '[I morgon klokka] LT',
	            nextWeek: 'dddd [klokka] LT',
	            lastDay: '[I går klokka] LT',
	            lastWeek: '[Føregåande] dddd [klokka] LT',
	            sameElse: 'L'
	        },
	        relativeTime : {
	            future : 'om %s',
	            past : '%s sidan',
	            s : 'nokre sekund',
	            m : 'eit minutt',
	            mm : '%d minutt',
	            h : 'ein time',
	            hh : '%d timar',
	            d : 'ein dag',
	            dd : '%d dagar',
	            M : 'ein månad',
	            MM : '%d månader',
	            y : 'eit år',
	            yy : '%d år'
	        },
	        ordinalParse: /\d{1,2}\./,
	        ordinal : '%d.',
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return nn;

	}));

/***/ },

/***/ 1035:
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : punjabi india (pa-in)
	//! author : Harpreet Singh : https://github.com/harpreetkhalsagtbit

	;(function (global, factory) {
	    true ? factory(__webpack_require__(963)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var symbolMap = {
	        '1': '੧',
	        '2': '੨',
	        '3': '੩',
	        '4': '੪',
	        '5': '੫',
	        '6': '੬',
	        '7': '੭',
	        '8': '੮',
	        '9': '੯',
	        '0': '੦'
	    },
	    numberMap = {
	        '੧': '1',
	        '੨': '2',
	        '੩': '3',
	        '੪': '4',
	        '੫': '5',
	        '੬': '6',
	        '੭': '7',
	        '੮': '8',
	        '੯': '9',
	        '੦': '0'
	    };

	    var pa_in = moment.defineLocale('pa-in', {
	        // There are months name as per Nanakshahi Calender but they are not used as rigidly in modern Punjabi.
	        months : 'ਜਨਵਰੀ_ਫ਼ਰਵਰੀ_ਮਾਰਚ_ਅਪ੍ਰੈਲ_ਮਈ_ਜੂਨ_ਜੁਲਾਈ_ਅਗਸਤ_ਸਤੰਬਰ_ਅਕਤੂਬਰ_ਨਵੰਬਰ_ਦਸੰਬਰ'.split('_'),
	        monthsShort : 'ਜਨਵਰੀ_ਫ਼ਰਵਰੀ_ਮਾਰਚ_ਅਪ੍ਰੈਲ_ਮਈ_ਜੂਨ_ਜੁਲਾਈ_ਅਗਸਤ_ਸਤੰਬਰ_ਅਕਤੂਬਰ_ਨਵੰਬਰ_ਦਸੰਬਰ'.split('_'),
	        weekdays : 'ਐਤਵਾਰ_ਸੋਮਵਾਰ_ਮੰਗਲਵਾਰ_ਬੁਧਵਾਰ_ਵੀਰਵਾਰ_ਸ਼ੁੱਕਰਵਾਰ_ਸ਼ਨੀਚਰਵਾਰ'.split('_'),
	        weekdaysShort : 'ਐਤ_ਸੋਮ_ਮੰਗਲ_ਬੁਧ_ਵੀਰ_ਸ਼ੁਕਰ_ਸ਼ਨੀ'.split('_'),
	        weekdaysMin : 'ਐਤ_ਸੋਮ_ਮੰਗਲ_ਬੁਧ_ਵੀਰ_ਸ਼ੁਕਰ_ਸ਼ਨੀ'.split('_'),
	        longDateFormat : {
	            LT : 'A h:mm ਵਜੇ',
	            LTS : 'A h:mm:ss ਵਜੇ',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY, A h:mm ਵਜੇ',
	            LLLL : 'dddd, D MMMM YYYY, A h:mm ਵਜੇ'
	        },
	        calendar : {
	            sameDay : '[ਅਜ] LT',
	            nextDay : '[ਕਲ] LT',
	            nextWeek : 'dddd, LT',
	            lastDay : '[ਕਲ] LT',
	            lastWeek : '[ਪਿਛਲੇ] dddd, LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : '%s ਵਿੱਚ',
	            past : '%s ਪਿਛਲੇ',
	            s : 'ਕੁਝ ਸਕਿੰਟ',
	            m : 'ਇਕ ਮਿੰਟ',
	            mm : '%d ਮਿੰਟ',
	            h : 'ਇੱਕ ਘੰਟਾ',
	            hh : '%d ਘੰਟੇ',
	            d : 'ਇੱਕ ਦਿਨ',
	            dd : '%d ਦਿਨ',
	            M : 'ਇੱਕ ਮਹੀਨਾ',
	            MM : '%d ਮਹੀਨੇ',
	            y : 'ਇੱਕ ਸਾਲ',
	            yy : '%d ਸਾਲ'
	        },
	        preparse: function (string) {
	            return string.replace(/[੧੨੩੪੫੬੭੮੯੦]/g, function (match) {
	                return numberMap[match];
	            });
	        },
	        postformat: function (string) {
	            return string.replace(/\d/g, function (match) {
	                return symbolMap[match];
	            });
	        },
	        // Punjabi notation for meridiems are quite fuzzy in practice. While there exists
	        // a rigid notion of a 'Pahar' it is not used as rigidly in modern Punjabi.
	        meridiemParse: /ਰਾਤ|ਸਵੇਰ|ਦੁਪਹਿਰ|ਸ਼ਾਮ/,
	        meridiemHour : function (hour, meridiem) {
	            if (hour === 12) {
	                hour = 0;
	            }
	            if (meridiem === 'ਰਾਤ') {
	                return hour < 4 ? hour : hour + 12;
	            } else if (meridiem === 'ਸਵੇਰ') {
	                return hour;
	            } else if (meridiem === 'ਦੁਪਹਿਰ') {
	                return hour >= 10 ? hour : hour + 12;
	            } else if (meridiem === 'ਸ਼ਾਮ') {
	                return hour + 12;
	            }
	        },
	        meridiem : function (hour, minute, isLower) {
	            if (hour < 4) {
	                return 'ਰਾਤ';
	            } else if (hour < 10) {
	                return 'ਸਵੇਰ';
	            } else if (hour < 17) {
	                return 'ਦੁਪਹਿਰ';
	            } else if (hour < 20) {
	                return 'ਸ਼ਾਮ';
	            } else {
	                return 'ਰਾਤ';
	            }
	        },
	        week : {
	            dow : 0, // Sunday is the first day of the week.
	            doy : 6  // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return pa_in;

	}));

/***/ },

/***/ 1036:
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : polish (pl)
	//! author : Rafal Hirsz : https://github.com/evoL

	;(function (global, factory) {
	    true ? factory(__webpack_require__(963)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var monthsNominative = 'styczeń_luty_marzec_kwiecień_maj_czerwiec_lipiec_sierpień_wrzesień_październik_listopad_grudzień'.split('_'),
	        monthsSubjective = 'stycznia_lutego_marca_kwietnia_maja_czerwca_lipca_sierpnia_września_października_listopada_grudnia'.split('_');
	    function plural(n) {
	        return (n % 10 < 5) && (n % 10 > 1) && ((~~(n / 10) % 10) !== 1);
	    }
	    function translate(number, withoutSuffix, key) {
	        var result = number + ' ';
	        switch (key) {
	        case 'm':
	            return withoutSuffix ? 'minuta' : 'minutę';
	        case 'mm':
	            return result + (plural(number) ? 'minuty' : 'minut');
	        case 'h':
	            return withoutSuffix  ? 'godzina'  : 'godzinę';
	        case 'hh':
	            return result + (plural(number) ? 'godziny' : 'godzin');
	        case 'MM':
	            return result + (plural(number) ? 'miesiące' : 'miesięcy');
	        case 'yy':
	            return result + (plural(number) ? 'lata' : 'lat');
	        }
	    }

	    var pl = moment.defineLocale('pl', {
	        months : function (momentToFormat, format) {
	            if (format === '') {
	                // Hack: if format empty we know this is used to generate
	                // RegExp by moment. Give then back both valid forms of months
	                // in RegExp ready format.
	                return '(' + monthsSubjective[momentToFormat.month()] + '|' + monthsNominative[momentToFormat.month()] + ')';
	            } else if (/D MMMM/.test(format)) {
	                return monthsSubjective[momentToFormat.month()];
	            } else {
	                return monthsNominative[momentToFormat.month()];
	            }
	        },
	        monthsShort : 'sty_lut_mar_kwi_maj_cze_lip_sie_wrz_paź_lis_gru'.split('_'),
	        weekdays : 'niedziela_poniedziałek_wtorek_środa_czwartek_piątek_sobota'.split('_'),
	        weekdaysShort : 'nie_pon_wt_śr_czw_pt_sb'.split('_'),
	        weekdaysMin : 'Nd_Pn_Wt_Śr_Cz_Pt_So'.split('_'),
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'DD.MM.YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY HH:mm',
	            LLLL : 'dddd, D MMMM YYYY HH:mm'
	        },
	        calendar : {
	            sameDay: '[Dziś o] LT',
	            nextDay: '[Jutro o] LT',
	            nextWeek: '[W] dddd [o] LT',
	            lastDay: '[Wczoraj o] LT',
	            lastWeek: function () {
	                switch (this.day()) {
	                case 0:
	                    return '[W zeszłą niedzielę o] LT';
	                case 3:
	                    return '[W zeszłą środę o] LT';
	                case 6:
	                    return '[W zeszłą sobotę o] LT';
	                default:
	                    return '[W zeszły] dddd [o] LT';
	                }
	            },
	            sameElse: 'L'
	        },
	        relativeTime : {
	            future : 'za %s',
	            past : '%s temu',
	            s : 'kilka sekund',
	            m : translate,
	            mm : translate,
	            h : translate,
	            hh : translate,
	            d : '1 dzień',
	            dd : '%d dni',
	            M : 'miesiąc',
	            MM : translate,
	            y : 'rok',
	            yy : translate
	        },
	        ordinalParse: /\d{1,2}\./,
	        ordinal : '%d.',
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return pl;

	}));

/***/ },

/***/ 1037:
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : portuguese (pt)
	//! author : Jefferson : https://github.com/jalex79

	;(function (global, factory) {
	    true ? factory(__webpack_require__(963)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var pt = moment.defineLocale('pt', {
	        months : 'Janeiro_Fevereiro_Março_Abril_Maio_Junho_Julho_Agosto_Setembro_Outubro_Novembro_Dezembro'.split('_'),
	        monthsShort : 'Jan_Fev_Mar_Abr_Mai_Jun_Jul_Ago_Set_Out_Nov_Dez'.split('_'),
	        weekdays : 'Domingo_Segunda-Feira_Terça-Feira_Quarta-Feira_Quinta-Feira_Sexta-Feira_Sábado'.split('_'),
	        weekdaysShort : 'Dom_Seg_Ter_Qua_Qui_Sex_Sáb'.split('_'),
	        weekdaysMin : 'Dom_2ª_3ª_4ª_5ª_6ª_Sáb'.split('_'),
	        weekdaysParseExact : true,
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'DD/MM/YYYY',
	            LL : 'D [de] MMMM [de] YYYY',
	            LLL : 'D [de] MMMM [de] YYYY HH:mm',
	            LLLL : 'dddd, D [de] MMMM [de] YYYY HH:mm'
	        },
	        calendar : {
	            sameDay: '[Hoje às] LT',
	            nextDay: '[Amanhã às] LT',
	            nextWeek: 'dddd [às] LT',
	            lastDay: '[Ontem às] LT',
	            lastWeek: function () {
	                return (this.day() === 0 || this.day() === 6) ?
	                    '[Último] dddd [às] LT' : // Saturday + Sunday
	                    '[Última] dddd [às] LT'; // Monday - Friday
	            },
	            sameElse: 'L'
	        },
	        relativeTime : {
	            future : 'em %s',
	            past : 'há %s',
	            s : 'segundos',
	            m : 'um minuto',
	            mm : '%d minutos',
	            h : 'uma hora',
	            hh : '%d horas',
	            d : 'um dia',
	            dd : '%d dias',
	            M : 'um mês',
	            MM : '%d meses',
	            y : 'um ano',
	            yy : '%d anos'
	        },
	        ordinalParse: /\d{1,2}º/,
	        ordinal : '%dº',
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return pt;

	}));

/***/ },

/***/ 1038:
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : brazilian portuguese (pt-br)
	//! author : Caio Ribeiro Pereira : https://github.com/caio-ribeiro-pereira

	;(function (global, factory) {
	    true ? factory(__webpack_require__(963)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var pt_br = moment.defineLocale('pt-br', {
	        months : 'Janeiro_Fevereiro_Março_Abril_Maio_Junho_Julho_Agosto_Setembro_Outubro_Novembro_Dezembro'.split('_'),
	        monthsShort : 'Jan_Fev_Mar_Abr_Mai_Jun_Jul_Ago_Set_Out_Nov_Dez'.split('_'),
	        weekdays : 'Domingo_Segunda-feira_Terça-feira_Quarta-feira_Quinta-feira_Sexta-feira_Sábado'.split('_'),
	        weekdaysShort : 'Dom_Seg_Ter_Qua_Qui_Sex_Sáb'.split('_'),
	        weekdaysMin : 'Dom_2ª_3ª_4ª_5ª_6ª_Sáb'.split('_'),
	        weekdaysParseExact : true,
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'DD/MM/YYYY',
	            LL : 'D [de] MMMM [de] YYYY',
	            LLL : 'D [de] MMMM [de] YYYY [às] HH:mm',
	            LLLL : 'dddd, D [de] MMMM [de] YYYY [às] HH:mm'
	        },
	        calendar : {
	            sameDay: '[Hoje às] LT',
	            nextDay: '[Amanhã às] LT',
	            nextWeek: 'dddd [às] LT',
	            lastDay: '[Ontem às] LT',
	            lastWeek: function () {
	                return (this.day() === 0 || this.day() === 6) ?
	                    '[Último] dddd [às] LT' : // Saturday + Sunday
	                    '[Última] dddd [às] LT'; // Monday - Friday
	            },
	            sameElse: 'L'
	        },
	        relativeTime : {
	            future : 'em %s',
	            past : '%s atrás',
	            s : 'poucos segundos',
	            m : 'um minuto',
	            mm : '%d minutos',
	            h : 'uma hora',
	            hh : '%d horas',
	            d : 'um dia',
	            dd : '%d dias',
	            M : 'um mês',
	            MM : '%d meses',
	            y : 'um ano',
	            yy : '%d anos'
	        },
	        ordinalParse: /\d{1,2}º/,
	        ordinal : '%dº'
	    });

	    return pt_br;

	}));

/***/ },

/***/ 1039:
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : romanian (ro)
	//! author : Vlad Gurdiga : https://github.com/gurdiga
	//! author : Valentin Agachi : https://github.com/avaly

	;(function (global, factory) {
	    true ? factory(__webpack_require__(963)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    function relativeTimeWithPlural(number, withoutSuffix, key) {
	        var format = {
	                'mm': 'minute',
	                'hh': 'ore',
	                'dd': 'zile',
	                'MM': 'luni',
	                'yy': 'ani'
	            },
	            separator = ' ';
	        if (number % 100 >= 20 || (number >= 100 && number % 100 === 0)) {
	            separator = ' de ';
	        }
	        return number + separator + format[key];
	    }

	    var ro = moment.defineLocale('ro', {
	        months : 'ianuarie_februarie_martie_aprilie_mai_iunie_iulie_august_septembrie_octombrie_noiembrie_decembrie'.split('_'),
	        monthsShort : 'ian._febr._mart._apr._mai_iun._iul._aug._sept._oct._nov._dec.'.split('_'),
	        monthsParseExact: true,
	        weekdays : 'duminică_luni_marți_miercuri_joi_vineri_sâmbătă'.split('_'),
	        weekdaysShort : 'Dum_Lun_Mar_Mie_Joi_Vin_Sâm'.split('_'),
	        weekdaysMin : 'Du_Lu_Ma_Mi_Jo_Vi_Sâ'.split('_'),
	        longDateFormat : {
	            LT : 'H:mm',
	            LTS : 'H:mm:ss',
	            L : 'DD.MM.YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY H:mm',
	            LLLL : 'dddd, D MMMM YYYY H:mm'
	        },
	        calendar : {
	            sameDay: '[azi la] LT',
	            nextDay: '[mâine la] LT',
	            nextWeek: 'dddd [la] LT',
	            lastDay: '[ieri la] LT',
	            lastWeek: '[fosta] dddd [la] LT',
	            sameElse: 'L'
	        },
	        relativeTime : {
	            future : 'peste %s',
	            past : '%s în urmă',
	            s : 'câteva secunde',
	            m : 'un minut',
	            mm : relativeTimeWithPlural,
	            h : 'o oră',
	            hh : relativeTimeWithPlural,
	            d : 'o zi',
	            dd : relativeTimeWithPlural,
	            M : 'o lună',
	            MM : relativeTimeWithPlural,
	            y : 'un an',
	            yy : relativeTimeWithPlural
	        },
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 7  // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return ro;

	}));

/***/ },

/***/ 1040:
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : russian (ru)
	//! author : Viktorminator : https://github.com/Viktorminator
	//! Author : Menelion Elensúle : https://github.com/Oire
	//! author : Коренберг Марк : https://github.com/socketpair

	;(function (global, factory) {
	    true ? factory(__webpack_require__(963)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    function plural(word, num) {
	        var forms = word.split('_');
	        return num % 10 === 1 && num % 100 !== 11 ? forms[0] : (num % 10 >= 2 && num % 10 <= 4 && (num % 100 < 10 || num % 100 >= 20) ? forms[1] : forms[2]);
	    }
	    function relativeTimeWithPlural(number, withoutSuffix, key) {
	        var format = {
	            'mm': withoutSuffix ? 'минута_минуты_минут' : 'минуту_минуты_минут',
	            'hh': 'час_часа_часов',
	            'dd': 'день_дня_дней',
	            'MM': 'месяц_месяца_месяцев',
	            'yy': 'год_года_лет'
	        };
	        if (key === 'm') {
	            return withoutSuffix ? 'минута' : 'минуту';
	        }
	        else {
	            return number + ' ' + plural(format[key], +number);
	        }
	    }
	    var monthsParse = [/^янв/i, /^фев/i, /^мар/i, /^апр/i, /^ма[йя]/i, /^июн/i, /^июл/i, /^авг/i, /^сен/i, /^окт/i, /^ноя/i, /^дек/i];

	    // http://new.gramota.ru/spravka/rules/139-prop : § 103
	    // Сокращения месяцев: http://new.gramota.ru/spravka/buro/search-answer?s=242637
	    // CLDR data:          http://www.unicode.org/cldr/charts/28/summary/ru.html#1753
	    var ru = moment.defineLocale('ru', {
	        months : {
	            format: 'января_февраля_марта_апреля_мая_июня_июля_августа_сентября_октября_ноября_декабря'.split('_'),
	            standalone: 'январь_февраль_март_апрель_май_июнь_июль_август_сентябрь_октябрь_ноябрь_декабрь'.split('_')
	        },
	        monthsShort : {
	            // по CLDR именно "июл." и "июн.", но какой смысл менять букву на точку ?
	            format: 'янв._февр._мар._апр._мая_июня_июля_авг._сент._окт._нояб._дек.'.split('_'),
	            standalone: 'янв._февр._март_апр._май_июнь_июль_авг._сент._окт._нояб._дек.'.split('_')
	        },
	        weekdays : {
	            standalone: 'воскресенье_понедельник_вторник_среда_четверг_пятница_суббота'.split('_'),
	            format: 'воскресенье_понедельник_вторник_среду_четверг_пятницу_субботу'.split('_'),
	            isFormat: /\[ ?[Вв] ?(?:прошлую|следующую|эту)? ?\] ?dddd/
	        },
	        weekdaysShort : 'вс_пн_вт_ср_чт_пт_сб'.split('_'),
	        weekdaysMin : 'вс_пн_вт_ср_чт_пт_сб'.split('_'),
	        monthsParse : monthsParse,
	        longMonthsParse : monthsParse,
	        shortMonthsParse : monthsParse,
	        monthsRegex: /^(сентябр[яь]|октябр[яь]|декабр[яь]|феврал[яь]|январ[яь]|апрел[яь]|августа?|ноябр[яь]|сент\.|февр\.|нояб\.|июнь|янв.|июль|дек.|авг.|апр.|марта|мар[.т]|окт.|июн[яь]|июл[яь]|ма[яй])/i,
	        monthsShortRegex: /^(сентябр[яь]|октябр[яь]|декабр[яь]|феврал[яь]|январ[яь]|апрел[яь]|августа?|ноябр[яь]|сент\.|февр\.|нояб\.|июнь|янв.|июль|дек.|авг.|апр.|марта|мар[.т]|окт.|июн[яь]|июл[яь]|ма[яй])/i,
	        monthsStrictRegex: /^(сентябр[яь]|октябр[яь]|декабр[яь]|феврал[яь]|январ[яь]|апрел[яь]|августа?|ноябр[яь]|марта?|июн[яь]|июл[яь]|ма[яй])/i,
	        monthsShortStrictRegex: /^(нояб\.|февр\.|сент\.|июль|янв\.|июн[яь]|мар[.т]|авг\.|апр\.|окт\.|дек\.|ма[яй])/i,
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'DD.MM.YYYY',
	            LL : 'D MMMM YYYY г.',
	            LLL : 'D MMMM YYYY г., HH:mm',
	            LLLL : 'dddd, D MMMM YYYY г., HH:mm'
	        },
	        calendar : {
	            sameDay: '[Сегодня в] LT',
	            nextDay: '[Завтра в] LT',
	            lastDay: '[Вчера в] LT',
	            nextWeek: function (now) {
	                if (now.week() !== this.week()) {
	                    switch (this.day()) {
	                    case 0:
	                        return '[В следующее] dddd [в] LT';
	                    case 1:
	                    case 2:
	                    case 4:
	                        return '[В следующий] dddd [в] LT';
	                    case 3:
	                    case 5:
	                    case 6:
	                        return '[В следующую] dddd [в] LT';
	                    }
	                } else {
	                    if (this.day() === 2) {
	                        return '[Во] dddd [в] LT';
	                    } else {
	                        return '[В] dddd [в] LT';
	                    }
	                }
	            },
	            lastWeek: function (now) {
	                if (now.week() !== this.week()) {
	                    switch (this.day()) {
	                    case 0:
	                        return '[В прошлое] dddd [в] LT';
	                    case 1:
	                    case 2:
	                    case 4:
	                        return '[В прошлый] dddd [в] LT';
	                    case 3:
	                    case 5:
	                    case 6:
	                        return '[В прошлую] dddd [в] LT';
	                    }
	                } else {
	                    if (this.day() === 2) {
	                        return '[Во] dddd [в] LT';
	                    } else {
	                        return '[В] dddd [в] LT';
	                    }
	                }
	            },
	            sameElse: 'L'
	        },
	        relativeTime : {
	            future : 'через %s',
	            past : '%s назад',
	            s : 'несколько секунд',
	            m : relativeTimeWithPlural,
	            mm : relativeTimeWithPlural,
	            h : 'час',
	            hh : relativeTimeWithPlural,
	            d : 'день',
	            dd : relativeTimeWithPlural,
	            M : 'месяц',
	            MM : relativeTimeWithPlural,
	            y : 'год',
	            yy : relativeTimeWithPlural
	        },
	        meridiemParse: /ночи|утра|дня|вечера/i,
	        isPM : function (input) {
	            return /^(дня|вечера)$/.test(input);
	        },
	        meridiem : function (hour, minute, isLower) {
	            if (hour < 4) {
	                return 'ночи';
	            } else if (hour < 12) {
	                return 'утра';
	            } else if (hour < 17) {
	                return 'дня';
	            } else {
	                return 'вечера';
	            }
	        },
	        ordinalParse: /\d{1,2}-(й|го|я)/,
	        ordinal: function (number, period) {
	            switch (period) {
	            case 'M':
	            case 'd':
	            case 'DDD':
	                return number + '-й';
	            case 'D':
	                return number + '-го';
	            case 'w':
	            case 'W':
	                return number + '-я';
	            default:
	                return number;
	            }
	        },
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 7  // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return ru;

	}));

/***/ },

/***/ 1041:
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Northern Sami (se)
	//! authors : Bård Rolstad Henriksen : https://github.com/karamell

	;(function (global, factory) {
	    true ? factory(__webpack_require__(963)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';



	    var se = moment.defineLocale('se', {
	        months : 'ođđajagemánnu_guovvamánnu_njukčamánnu_cuoŋománnu_miessemánnu_geassemánnu_suoidnemánnu_borgemánnu_čakčamánnu_golggotmánnu_skábmamánnu_juovlamánnu'.split('_'),
	        monthsShort : 'ođđj_guov_njuk_cuo_mies_geas_suoi_borg_čakč_golg_skáb_juov'.split('_'),
	        weekdays : 'sotnabeaivi_vuossárga_maŋŋebárga_gaskavahkku_duorastat_bearjadat_lávvardat'.split('_'),
	        weekdaysShort : 'sotn_vuos_maŋ_gask_duor_bear_láv'.split('_'),
	        weekdaysMin : 's_v_m_g_d_b_L'.split('_'),
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'DD.MM.YYYY',
	            LL : 'MMMM D. [b.] YYYY',
	            LLL : 'MMMM D. [b.] YYYY [ti.] HH:mm',
	            LLLL : 'dddd, MMMM D. [b.] YYYY [ti.] HH:mm'
	        },
	        calendar : {
	            sameDay: '[otne ti] LT',
	            nextDay: '[ihttin ti] LT',
	            nextWeek: 'dddd [ti] LT',
	            lastDay: '[ikte ti] LT',
	            lastWeek: '[ovddit] dddd [ti] LT',
	            sameElse: 'L'
	        },
	        relativeTime : {
	            future : '%s geažes',
	            past : 'maŋit %s',
	            s : 'moadde sekunddat',
	            m : 'okta minuhta',
	            mm : '%d minuhtat',
	            h : 'okta diimmu',
	            hh : '%d diimmut',
	            d : 'okta beaivi',
	            dd : '%d beaivvit',
	            M : 'okta mánnu',
	            MM : '%d mánut',
	            y : 'okta jahki',
	            yy : '%d jagit'
	        },
	        ordinalParse: /\d{1,2}\./,
	        ordinal : '%d.',
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return se;

	}));

/***/ },

/***/ 1042:
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Sinhalese (si)
	//! author : Sampath Sitinamaluwa : https://github.com/sampathsris

	;(function (global, factory) {
	    true ? factory(__webpack_require__(963)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    /*jshint -W100*/
	    var si = moment.defineLocale('si', {
	        months : 'ජනවාරි_පෙබරවාරි_මාර්තු_අප්‍රේල්_මැයි_ජූනි_ජූලි_අගෝස්තු_සැප්තැම්බර්_ඔක්තෝබර්_නොවැම්බර්_දෙසැම්බර්'.split('_'),
	        monthsShort : 'ජන_පෙබ_මාර්_අප්_මැයි_ජූනි_ජූලි_අගෝ_සැප්_ඔක්_නොවැ_දෙසැ'.split('_'),
	        weekdays : 'ඉරිදා_සඳුදා_අඟහරුවාදා_බදාදා_බ්‍රහස්පතින්දා_සිකුරාදා_සෙනසුරාදා'.split('_'),
	        weekdaysShort : 'ඉරි_සඳු_අඟ_බදා_බ්‍රහ_සිකු_සෙන'.split('_'),
	        weekdaysMin : 'ඉ_ස_අ_බ_බ්‍ර_සි_සෙ'.split('_'),
	        weekdaysParseExact : true,
	        longDateFormat : {
	            LT : 'a h:mm',
	            LTS : 'a h:mm:ss',
	            L : 'YYYY/MM/DD',
	            LL : 'YYYY MMMM D',
	            LLL : 'YYYY MMMM D, a h:mm',
	            LLLL : 'YYYY MMMM D [වැනි] dddd, a h:mm:ss'
	        },
	        calendar : {
	            sameDay : '[අද] LT[ට]',
	            nextDay : '[හෙට] LT[ට]',
	            nextWeek : 'dddd LT[ට]',
	            lastDay : '[ඊයේ] LT[ට]',
	            lastWeek : '[පසුගිය] dddd LT[ට]',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : '%sකින්',
	            past : '%sකට පෙර',
	            s : 'තත්පර කිහිපය',
	            m : 'මිනිත්තුව',
	            mm : 'මිනිත්තු %d',
	            h : 'පැය',
	            hh : 'පැය %d',
	            d : 'දිනය',
	            dd : 'දින %d',
	            M : 'මාසය',
	            MM : 'මාස %d',
	            y : 'වසර',
	            yy : 'වසර %d'
	        },
	        ordinalParse: /\d{1,2} වැනි/,
	        ordinal : function (number) {
	            return number + ' වැනි';
	        },
	        meridiemParse : /පෙර වරු|පස් වරු|පෙ.ව|ප.ව./,
	        isPM : function (input) {
	            return input === 'ප.ව.' || input === 'පස් වරු';
	        },
	        meridiem : function (hours, minutes, isLower) {
	            if (hours > 11) {
	                return isLower ? 'ප.ව.' : 'පස් වරු';
	            } else {
	                return isLower ? 'පෙ.ව.' : 'පෙර වරු';
	            }
	        }
	    });

	    return si;

	}));

/***/ },

/***/ 1043:
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : slovak (sk)
	//! author : Martin Minka : https://github.com/k2s
	//! based on work of petrbela : https://github.com/petrbela

	;(function (global, factory) {
	    true ? factory(__webpack_require__(963)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var months = 'január_február_marec_apríl_máj_jún_júl_august_september_október_november_december'.split('_'),
	        monthsShort = 'jan_feb_mar_apr_máj_jún_júl_aug_sep_okt_nov_dec'.split('_');
	    function plural(n) {
	        return (n > 1) && (n < 5);
	    }
	    function translate(number, withoutSuffix, key, isFuture) {
	        var result = number + ' ';
	        switch (key) {
	        case 's':  // a few seconds / in a few seconds / a few seconds ago
	            return (withoutSuffix || isFuture) ? 'pár sekúnd' : 'pár sekundami';
	        case 'm':  // a minute / in a minute / a minute ago
	            return withoutSuffix ? 'minúta' : (isFuture ? 'minútu' : 'minútou');
	        case 'mm': // 9 minutes / in 9 minutes / 9 minutes ago
	            if (withoutSuffix || isFuture) {
	                return result + (plural(number) ? 'minúty' : 'minút');
	            } else {
	                return result + 'minútami';
	            }
	            break;
	        case 'h':  // an hour / in an hour / an hour ago
	            return withoutSuffix ? 'hodina' : (isFuture ? 'hodinu' : 'hodinou');
	        case 'hh': // 9 hours / in 9 hours / 9 hours ago
	            if (withoutSuffix || isFuture) {
	                return result + (plural(number) ? 'hodiny' : 'hodín');
	            } else {
	                return result + 'hodinami';
	            }
	            break;
	        case 'd':  // a day / in a day / a day ago
	            return (withoutSuffix || isFuture) ? 'deň' : 'dňom';
	        case 'dd': // 9 days / in 9 days / 9 days ago
	            if (withoutSuffix || isFuture) {
	                return result + (plural(number) ? 'dni' : 'dní');
	            } else {
	                return result + 'dňami';
	            }
	            break;
	        case 'M':  // a month / in a month / a month ago
	            return (withoutSuffix || isFuture) ? 'mesiac' : 'mesiacom';
	        case 'MM': // 9 months / in 9 months / 9 months ago
	            if (withoutSuffix || isFuture) {
	                return result + (plural(number) ? 'mesiace' : 'mesiacov');
	            } else {
	                return result + 'mesiacmi';
	            }
	            break;
	        case 'y':  // a year / in a year / a year ago
	            return (withoutSuffix || isFuture) ? 'rok' : 'rokom';
	        case 'yy': // 9 years / in 9 years / 9 years ago
	            if (withoutSuffix || isFuture) {
	                return result + (plural(number) ? 'roky' : 'rokov');
	            } else {
	                return result + 'rokmi';
	            }
	            break;
	        }
	    }

	    var sk = moment.defineLocale('sk', {
	        months : months,
	        monthsShort : monthsShort,
	        weekdays : 'nedeľa_pondelok_utorok_streda_štvrtok_piatok_sobota'.split('_'),
	        weekdaysShort : 'ne_po_ut_st_št_pi_so'.split('_'),
	        weekdaysMin : 'ne_po_ut_st_št_pi_so'.split('_'),
	        longDateFormat : {
	            LT: 'H:mm',
	            LTS : 'H:mm:ss',
	            L : 'DD.MM.YYYY',
	            LL : 'D. MMMM YYYY',
	            LLL : 'D. MMMM YYYY H:mm',
	            LLLL : 'dddd D. MMMM YYYY H:mm'
	        },
	        calendar : {
	            sameDay: '[dnes o] LT',
	            nextDay: '[zajtra o] LT',
	            nextWeek: function () {
	                switch (this.day()) {
	                case 0:
	                    return '[v nedeľu o] LT';
	                case 1:
	                case 2:
	                    return '[v] dddd [o] LT';
	                case 3:
	                    return '[v stredu o] LT';
	                case 4:
	                    return '[vo štvrtok o] LT';
	                case 5:
	                    return '[v piatok o] LT';
	                case 6:
	                    return '[v sobotu o] LT';
	                }
	            },
	            lastDay: '[včera o] LT',
	            lastWeek: function () {
	                switch (this.day()) {
	                case 0:
	                    return '[minulú nedeľu o] LT';
	                case 1:
	                case 2:
	                    return '[minulý] dddd [o] LT';
	                case 3:
	                    return '[minulú stredu o] LT';
	                case 4:
	                case 5:
	                    return '[minulý] dddd [o] LT';
	                case 6:
	                    return '[minulú sobotu o] LT';
	                }
	            },
	            sameElse: 'L'
	        },
	        relativeTime : {
	            future : 'za %s',
	            past : 'pred %s',
	            s : translate,
	            m : translate,
	            mm : translate,
	            h : translate,
	            hh : translate,
	            d : translate,
	            dd : translate,
	            M : translate,
	            MM : translate,
	            y : translate,
	            yy : translate
	        },
	        ordinalParse: /\d{1,2}\./,
	        ordinal : '%d.',
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return sk;

	}));

/***/ },

/***/ 1044:
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : slovenian (sl)
	//! author : Robert Sedovšek : https://github.com/sedovsek

	;(function (global, factory) {
	    true ? factory(__webpack_require__(963)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    function processRelativeTime(number, withoutSuffix, key, isFuture) {
	        var result = number + ' ';
	        switch (key) {
	        case 's':
	            return withoutSuffix || isFuture ? 'nekaj sekund' : 'nekaj sekundami';
	        case 'm':
	            return withoutSuffix ? 'ena minuta' : 'eno minuto';
	        case 'mm':
	            if (number === 1) {
	                result += withoutSuffix ? 'minuta' : 'minuto';
	            } else if (number === 2) {
	                result += withoutSuffix || isFuture ? 'minuti' : 'minutama';
	            } else if (number < 5) {
	                result += withoutSuffix || isFuture ? 'minute' : 'minutami';
	            } else {
	                result += withoutSuffix || isFuture ? 'minut' : 'minutami';
	            }
	            return result;
	        case 'h':
	            return withoutSuffix ? 'ena ura' : 'eno uro';
	        case 'hh':
	            if (number === 1) {
	                result += withoutSuffix ? 'ura' : 'uro';
	            } else if (number === 2) {
	                result += withoutSuffix || isFuture ? 'uri' : 'urama';
	            } else if (number < 5) {
	                result += withoutSuffix || isFuture ? 'ure' : 'urami';
	            } else {
	                result += withoutSuffix || isFuture ? 'ur' : 'urami';
	            }
	            return result;
	        case 'd':
	            return withoutSuffix || isFuture ? 'en dan' : 'enim dnem';
	        case 'dd':
	            if (number === 1) {
	                result += withoutSuffix || isFuture ? 'dan' : 'dnem';
	            } else if (number === 2) {
	                result += withoutSuffix || isFuture ? 'dni' : 'dnevoma';
	            } else {
	                result += withoutSuffix || isFuture ? 'dni' : 'dnevi';
	            }
	            return result;
	        case 'M':
	            return withoutSuffix || isFuture ? 'en mesec' : 'enim mesecem';
	        case 'MM':
	            if (number === 1) {
	                result += withoutSuffix || isFuture ? 'mesec' : 'mesecem';
	            } else if (number === 2) {
	                result += withoutSuffix || isFuture ? 'meseca' : 'mesecema';
	            } else if (number < 5) {
	                result += withoutSuffix || isFuture ? 'mesece' : 'meseci';
	            } else {
	                result += withoutSuffix || isFuture ? 'mesecev' : 'meseci';
	            }
	            return result;
	        case 'y':
	            return withoutSuffix || isFuture ? 'eno leto' : 'enim letom';
	        case 'yy':
	            if (number === 1) {
	                result += withoutSuffix || isFuture ? 'leto' : 'letom';
	            } else if (number === 2) {
	                result += withoutSuffix || isFuture ? 'leti' : 'letoma';
	            } else if (number < 5) {
	                result += withoutSuffix || isFuture ? 'leta' : 'leti';
	            } else {
	                result += withoutSuffix || isFuture ? 'let' : 'leti';
	            }
	            return result;
	        }
	    }

	    var sl = moment.defineLocale('sl', {
	        months : 'januar_februar_marec_april_maj_junij_julij_avgust_september_oktober_november_december'.split('_'),
	        monthsShort : 'jan._feb._mar._apr._maj._jun._jul._avg._sep._okt._nov._dec.'.split('_'),
	        monthsParseExact: true,
	        weekdays : 'nedelja_ponedeljek_torek_sreda_četrtek_petek_sobota'.split('_'),
	        weekdaysShort : 'ned._pon._tor._sre._čet._pet._sob.'.split('_'),
	        weekdaysMin : 'ne_po_to_sr_če_pe_so'.split('_'),
	        weekdaysParseExact : true,
	        longDateFormat : {
	            LT : 'H:mm',
	            LTS : 'H:mm:ss',
	            L : 'DD. MM. YYYY',
	            LL : 'D. MMMM YYYY',
	            LLL : 'D. MMMM YYYY H:mm',
	            LLLL : 'dddd, D. MMMM YYYY H:mm'
	        },
	        calendar : {
	            sameDay  : '[danes ob] LT',
	            nextDay  : '[jutri ob] LT',

	            nextWeek : function () {
	                switch (this.day()) {
	                case 0:
	                    return '[v] [nedeljo] [ob] LT';
	                case 3:
	                    return '[v] [sredo] [ob] LT';
	                case 6:
	                    return '[v] [soboto] [ob] LT';
	                case 1:
	                case 2:
	                case 4:
	                case 5:
	                    return '[v] dddd [ob] LT';
	                }
	            },
	            lastDay  : '[včeraj ob] LT',
	            lastWeek : function () {
	                switch (this.day()) {
	                case 0:
	                    return '[prejšnjo] [nedeljo] [ob] LT';
	                case 3:
	                    return '[prejšnjo] [sredo] [ob] LT';
	                case 6:
	                    return '[prejšnjo] [soboto] [ob] LT';
	                case 1:
	                case 2:
	                case 4:
	                case 5:
	                    return '[prejšnji] dddd [ob] LT';
	                }
	            },
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'čez %s',
	            past   : 'pred %s',
	            s      : processRelativeTime,
	            m      : processRelativeTime,
	            mm     : processRelativeTime,
	            h      : processRelativeTime,
	            hh     : processRelativeTime,
	            d      : processRelativeTime,
	            dd     : processRelativeTime,
	            M      : processRelativeTime,
	            MM     : processRelativeTime,
	            y      : processRelativeTime,
	            yy     : processRelativeTime
	        },
	        ordinalParse: /\d{1,2}\./,
	        ordinal : '%d.',
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 7  // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return sl;

	}));

/***/ },

/***/ 1045:
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Albanian (sq)
	//! author : Flakërim Ismani : https://github.com/flakerimi
	//! author: Menelion Elensúle: https://github.com/Oire (tests)
	//! author : Oerd Cukalla : https://github.com/oerd (fixes)

	;(function (global, factory) {
	    true ? factory(__webpack_require__(963)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var sq = moment.defineLocale('sq', {
	        months : 'Janar_Shkurt_Mars_Prill_Maj_Qershor_Korrik_Gusht_Shtator_Tetor_Nëntor_Dhjetor'.split('_'),
	        monthsShort : 'Jan_Shk_Mar_Pri_Maj_Qer_Kor_Gus_Sht_Tet_Nën_Dhj'.split('_'),
	        weekdays : 'E Diel_E Hënë_E Martë_E Mërkurë_E Enjte_E Premte_E Shtunë'.split('_'),
	        weekdaysShort : 'Die_Hën_Mar_Mër_Enj_Pre_Sht'.split('_'),
	        weekdaysMin : 'D_H_Ma_Më_E_P_Sh'.split('_'),
	        weekdaysParseExact : true,
	        meridiemParse: /PD|MD/,
	        isPM: function (input) {
	            return input.charAt(0) === 'M';
	        },
	        meridiem : function (hours, minutes, isLower) {
	            return hours < 12 ? 'PD' : 'MD';
	        },
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY HH:mm',
	            LLLL : 'dddd, D MMMM YYYY HH:mm'
	        },
	        calendar : {
	            sameDay : '[Sot në] LT',
	            nextDay : '[Nesër në] LT',
	            nextWeek : 'dddd [në] LT',
	            lastDay : '[Dje në] LT',
	            lastWeek : 'dddd [e kaluar në] LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'në %s',
	            past : '%s më parë',
	            s : 'disa sekonda',
	            m : 'një minutë',
	            mm : '%d minuta',
	            h : 'një orë',
	            hh : '%d orë',
	            d : 'një ditë',
	            dd : '%d ditë',
	            M : 'një muaj',
	            MM : '%d muaj',
	            y : 'një vit',
	            yy : '%d vite'
	        },
	        ordinalParse: /\d{1,2}\./,
	        ordinal : '%d.',
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return sq;

	}));

/***/ },

/***/ 1046:
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Serbian-latin (sr)
	//! author : Milan Janačković<milanjanackovic@gmail.com> : https://github.com/milan-j

	;(function (global, factory) {
	    true ? factory(__webpack_require__(963)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var translator = {
	        words: { //Different grammatical cases
	            m: ['jedan minut', 'jedne minute'],
	            mm: ['minut', 'minute', 'minuta'],
	            h: ['jedan sat', 'jednog sata'],
	            hh: ['sat', 'sata', 'sati'],
	            dd: ['dan', 'dana', 'dana'],
	            MM: ['mesec', 'meseca', 'meseci'],
	            yy: ['godina', 'godine', 'godina']
	        },
	        correctGrammaticalCase: function (number, wordKey) {
	            return number === 1 ? wordKey[0] : (number >= 2 && number <= 4 ? wordKey[1] : wordKey[2]);
	        },
	        translate: function (number, withoutSuffix, key) {
	            var wordKey = translator.words[key];
	            if (key.length === 1) {
	                return withoutSuffix ? wordKey[0] : wordKey[1];
	            } else {
	                return number + ' ' + translator.correctGrammaticalCase(number, wordKey);
	            }
	        }
	    };

	    var sr = moment.defineLocale('sr', {
	        months: 'januar_februar_mart_april_maj_jun_jul_avgust_septembar_oktobar_novembar_decembar'.split('_'),
	        monthsShort: 'jan._feb._mar._apr._maj_jun_jul_avg._sep._okt._nov._dec.'.split('_'),
	        monthsParseExact: true,
	        weekdays: 'nedelja_ponedeljak_utorak_sreda_četvrtak_petak_subota'.split('_'),
	        weekdaysShort: 'ned._pon._uto._sre._čet._pet._sub.'.split('_'),
	        weekdaysMin: 'ne_po_ut_sr_če_pe_su'.split('_'),
	        weekdaysParseExact : true,
	        longDateFormat: {
	            LT: 'H:mm',
	            LTS : 'H:mm:ss',
	            L: 'DD. MM. YYYY',
	            LL: 'D. MMMM YYYY',
	            LLL: 'D. MMMM YYYY H:mm',
	            LLLL: 'dddd, D. MMMM YYYY H:mm'
	        },
	        calendar: {
	            sameDay: '[danas u] LT',
	            nextDay: '[sutra u] LT',
	            nextWeek: function () {
	                switch (this.day()) {
	                case 0:
	                    return '[u] [nedelju] [u] LT';
	                case 3:
	                    return '[u] [sredu] [u] LT';
	                case 6:
	                    return '[u] [subotu] [u] LT';
	                case 1:
	                case 2:
	                case 4:
	                case 5:
	                    return '[u] dddd [u] LT';
	                }
	            },
	            lastDay  : '[juče u] LT',
	            lastWeek : function () {
	                var lastWeekDays = [
	                    '[prošle] [nedelje] [u] LT',
	                    '[prošlog] [ponedeljka] [u] LT',
	                    '[prošlog] [utorka] [u] LT',
	                    '[prošle] [srede] [u] LT',
	                    '[prošlog] [četvrtka] [u] LT',
	                    '[prošlog] [petka] [u] LT',
	                    '[prošle] [subote] [u] LT'
	                ];
	                return lastWeekDays[this.day()];
	            },
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'za %s',
	            past   : 'pre %s',
	            s      : 'nekoliko sekundi',
	            m      : translator.translate,
	            mm     : translator.translate,
	            h      : translator.translate,
	            hh     : translator.translate,
	            d      : 'dan',
	            dd     : translator.translate,
	            M      : 'mesec',
	            MM     : translator.translate,
	            y      : 'godinu',
	            yy     : translator.translate
	        },
	        ordinalParse: /\d{1,2}\./,
	        ordinal : '%d.',
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 7  // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return sr;

	}));

/***/ },

/***/ 1047:
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Serbian-cyrillic (sr-cyrl)
	//! author : Milan Janačković<milanjanackovic@gmail.com> : https://github.com/milan-j

	;(function (global, factory) {
	    true ? factory(__webpack_require__(963)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var translator = {
	        words: { //Different grammatical cases
	            m: ['један минут', 'једне минуте'],
	            mm: ['минут', 'минуте', 'минута'],
	            h: ['један сат', 'једног сата'],
	            hh: ['сат', 'сата', 'сати'],
	            dd: ['дан', 'дана', 'дана'],
	            MM: ['месец', 'месеца', 'месеци'],
	            yy: ['година', 'године', 'година']
	        },
	        correctGrammaticalCase: function (number, wordKey) {
	            return number === 1 ? wordKey[0] : (number >= 2 && number <= 4 ? wordKey[1] : wordKey[2]);
	        },
	        translate: function (number, withoutSuffix, key) {
	            var wordKey = translator.words[key];
	            if (key.length === 1) {
	                return withoutSuffix ? wordKey[0] : wordKey[1];
	            } else {
	                return number + ' ' + translator.correctGrammaticalCase(number, wordKey);
	            }
	        }
	    };

	    var sr_cyrl = moment.defineLocale('sr-cyrl', {
	        months: 'јануар_фебруар_март_април_мај_јун_јул_август_септембар_октобар_новембар_децембар'.split('_'),
	        monthsShort: 'јан._феб._мар._апр._мај_јун_јул_авг._сеп._окт._нов._дец.'.split('_'),
	        monthsParseExact: true,
	        weekdays: 'недеља_понедељак_уторак_среда_четвртак_петак_субота'.split('_'),
	        weekdaysShort: 'нед._пон._уто._сре._чет._пет._суб.'.split('_'),
	        weekdaysMin: 'не_по_ут_ср_че_пе_су'.split('_'),
	        weekdaysParseExact : true,
	        longDateFormat: {
	            LT: 'H:mm',
	            LTS : 'H:mm:ss',
	            L: 'DD. MM. YYYY',
	            LL: 'D. MMMM YYYY',
	            LLL: 'D. MMMM YYYY H:mm',
	            LLLL: 'dddd, D. MMMM YYYY H:mm'
	        },
	        calendar: {
	            sameDay: '[данас у] LT',
	            nextDay: '[сутра у] LT',
	            nextWeek: function () {
	                switch (this.day()) {
	                case 0:
	                    return '[у] [недељу] [у] LT';
	                case 3:
	                    return '[у] [среду] [у] LT';
	                case 6:
	                    return '[у] [суботу] [у] LT';
	                case 1:
	                case 2:
	                case 4:
	                case 5:
	                    return '[у] dddd [у] LT';
	                }
	            },
	            lastDay  : '[јуче у] LT',
	            lastWeek : function () {
	                var lastWeekDays = [
	                    '[прошле] [недеље] [у] LT',
	                    '[прошлог] [понедељка] [у] LT',
	                    '[прошлог] [уторка] [у] LT',
	                    '[прошле] [среде] [у] LT',
	                    '[прошлог] [четвртка] [у] LT',
	                    '[прошлог] [петка] [у] LT',
	                    '[прошле] [суботе] [у] LT'
	                ];
	                return lastWeekDays[this.day()];
	            },
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'за %s',
	            past   : 'пре %s',
	            s      : 'неколико секунди',
	            m      : translator.translate,
	            mm     : translator.translate,
	            h      : translator.translate,
	            hh     : translator.translate,
	            d      : 'дан',
	            dd     : translator.translate,
	            M      : 'месец',
	            MM     : translator.translate,
	            y      : 'годину',
	            yy     : translator.translate
	        },
	        ordinalParse: /\d{1,2}\./,
	        ordinal : '%d.',
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 7  // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return sr_cyrl;

	}));

/***/ },

/***/ 1048:
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : siSwati (ss)
	//! author : Nicolai Davies<mail@nicolai.io> : https://github.com/nicolaidavies

	;(function (global, factory) {
	    true ? factory(__webpack_require__(963)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';



	    var ss = moment.defineLocale('ss', {
	        months : "Bhimbidvwane_Indlovana_Indlov'lenkhulu_Mabasa_Inkhwekhweti_Inhlaba_Kholwane_Ingci_Inyoni_Imphala_Lweti_Ingongoni".split('_'),
	        monthsShort : 'Bhi_Ina_Inu_Mab_Ink_Inh_Kho_Igc_Iny_Imp_Lwe_Igo'.split('_'),
	        weekdays : 'Lisontfo_Umsombuluko_Lesibili_Lesitsatfu_Lesine_Lesihlanu_Umgcibelo'.split('_'),
	        weekdaysShort : 'Lis_Umb_Lsb_Les_Lsi_Lsh_Umg'.split('_'),
	        weekdaysMin : 'Li_Us_Lb_Lt_Ls_Lh_Ug'.split('_'),
	        weekdaysParseExact : true,
	        longDateFormat : {
	            LT : 'h:mm A',
	            LTS : 'h:mm:ss A',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY h:mm A',
	            LLLL : 'dddd, D MMMM YYYY h:mm A'
	        },
	        calendar : {
	            sameDay : '[Namuhla nga] LT',
	            nextDay : '[Kusasa nga] LT',
	            nextWeek : 'dddd [nga] LT',
	            lastDay : '[Itolo nga] LT',
	            lastWeek : 'dddd [leliphelile] [nga] LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'nga %s',
	            past : 'wenteka nga %s',
	            s : 'emizuzwana lomcane',
	            m : 'umzuzu',
	            mm : '%d emizuzu',
	            h : 'lihora',
	            hh : '%d emahora',
	            d : 'lilanga',
	            dd : '%d emalanga',
	            M : 'inyanga',
	            MM : '%d tinyanga',
	            y : 'umnyaka',
	            yy : '%d iminyaka'
	        },
	        meridiemParse: /ekuseni|emini|entsambama|ebusuku/,
	        meridiem : function (hours, minutes, isLower) {
	            if (hours < 11) {
	                return 'ekuseni';
	            } else if (hours < 15) {
	                return 'emini';
	            } else if (hours < 19) {
	                return 'entsambama';
	            } else {
	                return 'ebusuku';
	            }
	        },
	        meridiemHour : function (hour, meridiem) {
	            if (hour === 12) {
	                hour = 0;
	            }
	            if (meridiem === 'ekuseni') {
	                return hour;
	            } else if (meridiem === 'emini') {
	                return hour >= 11 ? hour : hour + 12;
	            } else if (meridiem === 'entsambama' || meridiem === 'ebusuku') {
	                if (hour === 0) {
	                    return 0;
	                }
	                return hour + 12;
	            }
	        },
	        ordinalParse: /\d{1,2}/,
	        ordinal : '%d',
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return ss;

	}));

/***/ },

/***/ 1049:
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : swedish (sv)
	//! author : Jens Alm : https://github.com/ulmus

	;(function (global, factory) {
	    true ? factory(__webpack_require__(963)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var sv = moment.defineLocale('sv', {
	        months : 'januari_februari_mars_april_maj_juni_juli_augusti_september_oktober_november_december'.split('_'),
	        monthsShort : 'jan_feb_mar_apr_maj_jun_jul_aug_sep_okt_nov_dec'.split('_'),
	        weekdays : 'söndag_måndag_tisdag_onsdag_torsdag_fredag_lördag'.split('_'),
	        weekdaysShort : 'sön_mån_tis_ons_tor_fre_lör'.split('_'),
	        weekdaysMin : 'sö_må_ti_on_to_fr_lö'.split('_'),
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'YYYY-MM-DD',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY [kl.] HH:mm',
	            LLLL : 'dddd D MMMM YYYY [kl.] HH:mm',
	            lll : 'D MMM YYYY HH:mm',
	            llll : 'ddd D MMM YYYY HH:mm'
	        },
	        calendar : {
	            sameDay: '[Idag] LT',
	            nextDay: '[Imorgon] LT',
	            lastDay: '[Igår] LT',
	            nextWeek: '[På] dddd LT',
	            lastWeek: '[I] dddd[s] LT',
	            sameElse: 'L'
	        },
	        relativeTime : {
	            future : 'om %s',
	            past : 'för %s sedan',
	            s : 'några sekunder',
	            m : 'en minut',
	            mm : '%d minuter',
	            h : 'en timme',
	            hh : '%d timmar',
	            d : 'en dag',
	            dd : '%d dagar',
	            M : 'en månad',
	            MM : '%d månader',
	            y : 'ett år',
	            yy : '%d år'
	        },
	        ordinalParse: /\d{1,2}(e|a)/,
	        ordinal : function (number) {
	            var b = number % 10,
	                output = (~~(number % 100 / 10) === 1) ? 'e' :
	                (b === 1) ? 'a' :
	                (b === 2) ? 'a' :
	                (b === 3) ? 'e' : 'e';
	            return number + output;
	        },
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return sv;

	}));

/***/ },

/***/ 1050:
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : swahili (sw)
	//! author : Fahad Kassim : https://github.com/fadsel

	;(function (global, factory) {
	    true ? factory(__webpack_require__(963)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var sw = moment.defineLocale('sw', {
	        months : 'Januari_Februari_Machi_Aprili_Mei_Juni_Julai_Agosti_Septemba_Oktoba_Novemba_Desemba'.split('_'),
	        monthsShort : 'Jan_Feb_Mac_Apr_Mei_Jun_Jul_Ago_Sep_Okt_Nov_Des'.split('_'),
	        weekdays : 'Jumapili_Jumatatu_Jumanne_Jumatano_Alhamisi_Ijumaa_Jumamosi'.split('_'),
	        weekdaysShort : 'Jpl_Jtat_Jnne_Jtan_Alh_Ijm_Jmos'.split('_'),
	        weekdaysMin : 'J2_J3_J4_J5_Al_Ij_J1'.split('_'),
	        weekdaysParseExact : true,
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'DD.MM.YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY HH:mm',
	            LLLL : 'dddd, D MMMM YYYY HH:mm'
	        },
	        calendar : {
	            sameDay : '[leo saa] LT',
	            nextDay : '[kesho saa] LT',
	            nextWeek : '[wiki ijayo] dddd [saat] LT',
	            lastDay : '[jana] LT',
	            lastWeek : '[wiki iliyopita] dddd [saat] LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : '%s baadaye',
	            past : 'tokea %s',
	            s : 'hivi punde',
	            m : 'dakika moja',
	            mm : 'dakika %d',
	            h : 'saa limoja',
	            hh : 'masaa %d',
	            d : 'siku moja',
	            dd : 'masiku %d',
	            M : 'mwezi mmoja',
	            MM : 'miezi %d',
	            y : 'mwaka mmoja',
	            yy : 'miaka %d'
	        },
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 7  // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return sw;

	}));

/***/ },

/***/ 1051:
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : tamil (ta)
	//! author : Arjunkumar Krishnamoorthy : https://github.com/tk120404

	;(function (global, factory) {
	    true ? factory(__webpack_require__(963)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var symbolMap = {
	        '1': '௧',
	        '2': '௨',
	        '3': '௩',
	        '4': '௪',
	        '5': '௫',
	        '6': '௬',
	        '7': '௭',
	        '8': '௮',
	        '9': '௯',
	        '0': '௦'
	    }, numberMap = {
	        '௧': '1',
	        '௨': '2',
	        '௩': '3',
	        '௪': '4',
	        '௫': '5',
	        '௬': '6',
	        '௭': '7',
	        '௮': '8',
	        '௯': '9',
	        '௦': '0'
	    };

	    var ta = moment.defineLocale('ta', {
	        months : 'ஜனவரி_பிப்ரவரி_மார்ச்_ஏப்ரல்_மே_ஜூன்_ஜூலை_ஆகஸ்ட்_செப்டெம்பர்_அக்டோபர்_நவம்பர்_டிசம்பர்'.split('_'),
	        monthsShort : 'ஜனவரி_பிப்ரவரி_மார்ச்_ஏப்ரல்_மே_ஜூன்_ஜூலை_ஆகஸ்ட்_செப்டெம்பர்_அக்டோபர்_நவம்பர்_டிசம்பர்'.split('_'),
	        weekdays : 'ஞாயிற்றுக்கிழமை_திங்கட்கிழமை_செவ்வாய்கிழமை_புதன்கிழமை_வியாழக்கிழமை_வெள்ளிக்கிழமை_சனிக்கிழமை'.split('_'),
	        weekdaysShort : 'ஞாயிறு_திங்கள்_செவ்வாய்_புதன்_வியாழன்_வெள்ளி_சனி'.split('_'),
	        weekdaysMin : 'ஞா_தி_செ_பு_வி_வெ_ச'.split('_'),
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY, HH:mm',
	            LLLL : 'dddd, D MMMM YYYY, HH:mm'
	        },
	        calendar : {
	            sameDay : '[இன்று] LT',
	            nextDay : '[நாளை] LT',
	            nextWeek : 'dddd, LT',
	            lastDay : '[நேற்று] LT',
	            lastWeek : '[கடந்த வாரம்] dddd, LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : '%s இல்',
	            past : '%s முன்',
	            s : 'ஒரு சில விநாடிகள்',
	            m : 'ஒரு நிமிடம்',
	            mm : '%d நிமிடங்கள்',
	            h : 'ஒரு மணி நேரம்',
	            hh : '%d மணி நேரம்',
	            d : 'ஒரு நாள்',
	            dd : '%d நாட்கள்',
	            M : 'ஒரு மாதம்',
	            MM : '%d மாதங்கள்',
	            y : 'ஒரு வருடம்',
	            yy : '%d ஆண்டுகள்'
	        },
	        ordinalParse: /\d{1,2}வது/,
	        ordinal : function (number) {
	            return number + 'வது';
	        },
	        preparse: function (string) {
	            return string.replace(/[௧௨௩௪௫௬௭௮௯௦]/g, function (match) {
	                return numberMap[match];
	            });
	        },
	        postformat: function (string) {
	            return string.replace(/\d/g, function (match) {
	                return symbolMap[match];
	            });
	        },
	        // refer http://ta.wikipedia.org/s/1er1
	        meridiemParse: /யாமம்|வைகறை|காலை|நண்பகல்|எற்பாடு|மாலை/,
	        meridiem : function (hour, minute, isLower) {
	            if (hour < 2) {
	                return ' யாமம்';
	            } else if (hour < 6) {
	                return ' வைகறை';  // வைகறை
	            } else if (hour < 10) {
	                return ' காலை'; // காலை
	            } else if (hour < 14) {
	                return ' நண்பகல்'; // நண்பகல்
	            } else if (hour < 18) {
	                return ' எற்பாடு'; // எற்பாடு
	            } else if (hour < 22) {
	                return ' மாலை'; // மாலை
	            } else {
	                return ' யாமம்';
	            }
	        },
	        meridiemHour : function (hour, meridiem) {
	            if (hour === 12) {
	                hour = 0;
	            }
	            if (meridiem === 'யாமம்') {
	                return hour < 2 ? hour : hour + 12;
	            } else if (meridiem === 'வைகறை' || meridiem === 'காலை') {
	                return hour;
	            } else if (meridiem === 'நண்பகல்') {
	                return hour >= 10 ? hour : hour + 12;
	            } else {
	                return hour + 12;
	            }
	        },
	        week : {
	            dow : 0, // Sunday is the first day of the week.
	            doy : 6  // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return ta;

	}));

/***/ },

/***/ 1052:
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : telugu (te)
	//! author : Krishna Chaitanya Thota : https://github.com/kcthota

	;(function (global, factory) {
	    true ? factory(__webpack_require__(963)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var te = moment.defineLocale('te', {
	        months : 'జనవరి_ఫిబ్రవరి_మార్చి_ఏప్రిల్_మే_జూన్_జూలై_ఆగస్టు_సెప్టెంబర్_అక్టోబర్_నవంబర్_డిసెంబర్'.split('_'),
	        monthsShort : 'జన._ఫిబ్ర._మార్చి_ఏప్రి._మే_జూన్_జూలై_ఆగ._సెప్._అక్టో._నవ._డిసె.'.split('_'),
	        monthsParseExact : true,
	        weekdays : 'ఆదివారం_సోమవారం_మంగళవారం_బుధవారం_గురువారం_శుక్రవారం_శనివారం'.split('_'),
	        weekdaysShort : 'ఆది_సోమ_మంగళ_బుధ_గురు_శుక్ర_శని'.split('_'),
	        weekdaysMin : 'ఆ_సో_మం_బు_గు_శు_శ'.split('_'),
	        longDateFormat : {
	            LT : 'A h:mm',
	            LTS : 'A h:mm:ss',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY, A h:mm',
	            LLLL : 'dddd, D MMMM YYYY, A h:mm'
	        },
	        calendar : {
	            sameDay : '[నేడు] LT',
	            nextDay : '[రేపు] LT',
	            nextWeek : 'dddd, LT',
	            lastDay : '[నిన్న] LT',
	            lastWeek : '[గత] dddd, LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : '%s లో',
	            past : '%s క్రితం',
	            s : 'కొన్ని క్షణాలు',
	            m : 'ఒక నిమిషం',
	            mm : '%d నిమిషాలు',
	            h : 'ఒక గంట',
	            hh : '%d గంటలు',
	            d : 'ఒక రోజు',
	            dd : '%d రోజులు',
	            M : 'ఒక నెల',
	            MM : '%d నెలలు',
	            y : 'ఒక సంవత్సరం',
	            yy : '%d సంవత్సరాలు'
	        },
	        ordinalParse : /\d{1,2}వ/,
	        ordinal : '%dవ',
	        meridiemParse: /రాత్రి|ఉదయం|మధ్యాహ్నం|సాయంత్రం/,
	        meridiemHour : function (hour, meridiem) {
	            if (hour === 12) {
	                hour = 0;
	            }
	            if (meridiem === 'రాత్రి') {
	                return hour < 4 ? hour : hour + 12;
	            } else if (meridiem === 'ఉదయం') {
	                return hour;
	            } else if (meridiem === 'మధ్యాహ్నం') {
	                return hour >= 10 ? hour : hour + 12;
	            } else if (meridiem === 'సాయంత్రం') {
	                return hour + 12;
	            }
	        },
	        meridiem : function (hour, minute, isLower) {
	            if (hour < 4) {
	                return 'రాత్రి';
	            } else if (hour < 10) {
	                return 'ఉదయం';
	            } else if (hour < 17) {
	                return 'మధ్యాహ్నం';
	            } else if (hour < 20) {
	                return 'సాయంత్రం';
	            } else {
	                return 'రాత్రి';
	            }
	        },
	        week : {
	            dow : 0, // Sunday is the first day of the week.
	            doy : 6  // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return te;

	}));

/***/ },

/***/ 1053:
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : thai (th)
	//! author : Kridsada Thanabulpong : https://github.com/sirn

	;(function (global, factory) {
	    true ? factory(__webpack_require__(963)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var th = moment.defineLocale('th', {
	        months : 'มกราคม_กุมภาพันธ์_มีนาคม_เมษายน_พฤษภาคม_มิถุนายน_กรกฎาคม_สิงหาคม_กันยายน_ตุลาคม_พฤศจิกายน_ธันวาคม'.split('_'),
	        monthsShort : 'มกรา_กุมภา_มีนา_เมษา_พฤษภา_มิถุนา_กรกฎา_สิงหา_กันยา_ตุลา_พฤศจิกา_ธันวา'.split('_'),
	        monthsParseExact: true,
	        weekdays : 'อาทิตย์_จันทร์_อังคาร_พุธ_พฤหัสบดี_ศุกร์_เสาร์'.split('_'),
	        weekdaysShort : 'อาทิตย์_จันทร์_อังคาร_พุธ_พฤหัส_ศุกร์_เสาร์'.split('_'), // yes, three characters difference
	        weekdaysMin : 'อา._จ._อ._พ._พฤ._ศ._ส.'.split('_'),
	        weekdaysParseExact : true,
	        longDateFormat : {
	            LT : 'H นาฬิกา m นาที',
	            LTS : 'H นาฬิกา m นาที s วินาที',
	            L : 'YYYY/MM/DD',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY เวลา H นาฬิกา m นาที',
	            LLLL : 'วันddddที่ D MMMM YYYY เวลา H นาฬิกา m นาที'
	        },
	        meridiemParse: /ก่อนเที่ยง|หลังเที่ยง/,
	        isPM: function (input) {
	            return input === 'หลังเที่ยง';
	        },
	        meridiem : function (hour, minute, isLower) {
	            if (hour < 12) {
	                return 'ก่อนเที่ยง';
	            } else {
	                return 'หลังเที่ยง';
	            }
	        },
	        calendar : {
	            sameDay : '[วันนี้ เวลา] LT',
	            nextDay : '[พรุ่งนี้ เวลา] LT',
	            nextWeek : 'dddd[หน้า เวลา] LT',
	            lastDay : '[เมื่อวานนี้ เวลา] LT',
	            lastWeek : '[วัน]dddd[ที่แล้ว เวลา] LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'อีก %s',
	            past : '%sที่แล้ว',
	            s : 'ไม่กี่วินาที',
	            m : '1 นาที',
	            mm : '%d นาที',
	            h : '1 ชั่วโมง',
	            hh : '%d ชั่วโมง',
	            d : '1 วัน',
	            dd : '%d วัน',
	            M : '1 เดือน',
	            MM : '%d เดือน',
	            y : '1 ปี',
	            yy : '%d ปี'
	        }
	    });

	    return th;

	}));

/***/ },

/***/ 1054:
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Tagalog/Filipino (tl-ph)
	//! author : Dan Hagman

	;(function (global, factory) {
	    true ? factory(__webpack_require__(963)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var tl_ph = moment.defineLocale('tl-ph', {
	        months : 'Enero_Pebrero_Marso_Abril_Mayo_Hunyo_Hulyo_Agosto_Setyembre_Oktubre_Nobyembre_Disyembre'.split('_'),
	        monthsShort : 'Ene_Peb_Mar_Abr_May_Hun_Hul_Ago_Set_Okt_Nob_Dis'.split('_'),
	        weekdays : 'Linggo_Lunes_Martes_Miyerkules_Huwebes_Biyernes_Sabado'.split('_'),
	        weekdaysShort : 'Lin_Lun_Mar_Miy_Huw_Biy_Sab'.split('_'),
	        weekdaysMin : 'Li_Lu_Ma_Mi_Hu_Bi_Sab'.split('_'),
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'MM/D/YYYY',
	            LL : 'MMMM D, YYYY',
	            LLL : 'MMMM D, YYYY HH:mm',
	            LLLL : 'dddd, MMMM DD, YYYY HH:mm'
	        },
	        calendar : {
	            sameDay: '[Ngayon sa] LT',
	            nextDay: '[Bukas sa] LT',
	            nextWeek: 'dddd [sa] LT',
	            lastDay: '[Kahapon sa] LT',
	            lastWeek: 'dddd [huling linggo] LT',
	            sameElse: 'L'
	        },
	        relativeTime : {
	            future : 'sa loob ng %s',
	            past : '%s ang nakalipas',
	            s : 'ilang segundo',
	            m : 'isang minuto',
	            mm : '%d minuto',
	            h : 'isang oras',
	            hh : '%d oras',
	            d : 'isang araw',
	            dd : '%d araw',
	            M : 'isang buwan',
	            MM : '%d buwan',
	            y : 'isang taon',
	            yy : '%d taon'
	        },
	        ordinalParse: /\d{1,2}/,
	        ordinal : function (number) {
	            return number;
	        },
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return tl_ph;

	}));

/***/ },

/***/ 1055:
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Klingon (tlh)
	//! author : Dominika Kruk : https://github.com/amaranthrose

	;(function (global, factory) {
	    true ? factory(__webpack_require__(963)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var numbersNouns = 'pagh_wa’_cha’_wej_loS_vagh_jav_Soch_chorgh_Hut'.split('_');

	    function translateFuture(output) {
	        var time = output;
	        time = (output.indexOf('jaj') !== -1) ?
	    	time.slice(0, -3) + 'leS' :
	    	(output.indexOf('jar') !== -1) ?
	    	time.slice(0, -3) + 'waQ' :
	    	(output.indexOf('DIS') !== -1) ?
	    	time.slice(0, -3) + 'nem' :
	    	time + ' pIq';
	        return time;
	    }

	    function translatePast(output) {
	        var time = output;
	        time = (output.indexOf('jaj') !== -1) ?
	    	time.slice(0, -3) + 'Hu’' :
	    	(output.indexOf('jar') !== -1) ?
	    	time.slice(0, -3) + 'wen' :
	    	(output.indexOf('DIS') !== -1) ?
	    	time.slice(0, -3) + 'ben' :
	    	time + ' ret';
	        return time;
	    }

	    function translate(number, withoutSuffix, string, isFuture) {
	        var numberNoun = numberAsNoun(number);
	        switch (string) {
	            case 'mm':
	                return numberNoun + ' tup';
	            case 'hh':
	                return numberNoun + ' rep';
	            case 'dd':
	                return numberNoun + ' jaj';
	            case 'MM':
	                return numberNoun + ' jar';
	            case 'yy':
	                return numberNoun + ' DIS';
	        }
	    }

	    function numberAsNoun(number) {
	        var hundred = Math.floor((number % 1000) / 100),
	    	ten = Math.floor((number % 100) / 10),
	    	one = number % 10,
	    	word = '';
	        if (hundred > 0) {
	            word += numbersNouns[hundred] + 'vatlh';
	        }
	        if (ten > 0) {
	            word += ((word !== '') ? ' ' : '') + numbersNouns[ten] + 'maH';
	        }
	        if (one > 0) {
	            word += ((word !== '') ? ' ' : '') + numbersNouns[one];
	        }
	        return (word === '') ? 'pagh' : word;
	    }

	    var tlh = moment.defineLocale('tlh', {
	        months : 'tera’ jar wa’_tera’ jar cha’_tera’ jar wej_tera’ jar loS_tera’ jar vagh_tera’ jar jav_tera’ jar Soch_tera’ jar chorgh_tera’ jar Hut_tera’ jar wa’maH_tera’ jar wa’maH wa’_tera’ jar wa’maH cha’'.split('_'),
	        monthsShort : 'jar wa’_jar cha’_jar wej_jar loS_jar vagh_jar jav_jar Soch_jar chorgh_jar Hut_jar wa’maH_jar wa’maH wa’_jar wa’maH cha’'.split('_'),
	        monthsParseExact : true,
	        weekdays : 'lojmItjaj_DaSjaj_povjaj_ghItlhjaj_loghjaj_buqjaj_ghInjaj'.split('_'),
	        weekdaysShort : 'lojmItjaj_DaSjaj_povjaj_ghItlhjaj_loghjaj_buqjaj_ghInjaj'.split('_'),
	        weekdaysMin : 'lojmItjaj_DaSjaj_povjaj_ghItlhjaj_loghjaj_buqjaj_ghInjaj'.split('_'),
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'DD.MM.YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY HH:mm',
	            LLLL : 'dddd, D MMMM YYYY HH:mm'
	        },
	        calendar : {
	            sameDay: '[DaHjaj] LT',
	            nextDay: '[wa’leS] LT',
	            nextWeek: 'LLL',
	            lastDay: '[wa’Hu’] LT',
	            lastWeek: 'LLL',
	            sameElse: 'L'
	        },
	        relativeTime : {
	            future : translateFuture,
	            past : translatePast,
	            s : 'puS lup',
	            m : 'wa’ tup',
	            mm : translate,
	            h : 'wa’ rep',
	            hh : translate,
	            d : 'wa’ jaj',
	            dd : translate,
	            M : 'wa’ jar',
	            MM : translate,
	            y : 'wa’ DIS',
	            yy : translate
	        },
	        ordinalParse: /\d{1,2}\./,
	        ordinal : '%d.',
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return tlh;

	}));

/***/ },

/***/ 1056:
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : turkish (tr)
	//! authors : Erhan Gundogan : https://github.com/erhangundogan,
	//!           Burak Yiğit Kaya: https://github.com/BYK

	;(function (global, factory) {
	    true ? factory(__webpack_require__(963)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var suffixes = {
	        1: '\'inci',
	        5: '\'inci',
	        8: '\'inci',
	        70: '\'inci',
	        80: '\'inci',
	        2: '\'nci',
	        7: '\'nci',
	        20: '\'nci',
	        50: '\'nci',
	        3: '\'üncü',
	        4: '\'üncü',
	        100: '\'üncü',
	        6: '\'ncı',
	        9: '\'uncu',
	        10: '\'uncu',
	        30: '\'uncu',
	        60: '\'ıncı',
	        90: '\'ıncı'
	    };

	    var tr = moment.defineLocale('tr', {
	        months : 'Ocak_Şubat_Mart_Nisan_Mayıs_Haziran_Temmuz_Ağustos_Eylül_Ekim_Kasım_Aralık'.split('_'),
	        monthsShort : 'Oca_Şub_Mar_Nis_May_Haz_Tem_Ağu_Eyl_Eki_Kas_Ara'.split('_'),
	        weekdays : 'Pazar_Pazartesi_Salı_Çarşamba_Perşembe_Cuma_Cumartesi'.split('_'),
	        weekdaysShort : 'Paz_Pts_Sal_Çar_Per_Cum_Cts'.split('_'),
	        weekdaysMin : 'Pz_Pt_Sa_Ça_Pe_Cu_Ct'.split('_'),
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'DD.MM.YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY HH:mm',
	            LLLL : 'dddd, D MMMM YYYY HH:mm'
	        },
	        calendar : {
	            sameDay : '[bugün saat] LT',
	            nextDay : '[yarın saat] LT',
	            nextWeek : '[haftaya] dddd [saat] LT',
	            lastDay : '[dün] LT',
	            lastWeek : '[geçen hafta] dddd [saat] LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : '%s sonra',
	            past : '%s önce',
	            s : 'birkaç saniye',
	            m : 'bir dakika',
	            mm : '%d dakika',
	            h : 'bir saat',
	            hh : '%d saat',
	            d : 'bir gün',
	            dd : '%d gün',
	            M : 'bir ay',
	            MM : '%d ay',
	            y : 'bir yıl',
	            yy : '%d yıl'
	        },
	        ordinalParse: /\d{1,2}'(inci|nci|üncü|ncı|uncu|ıncı)/,
	        ordinal : function (number) {
	            if (number === 0) {  // special case for zero
	                return number + '\'ıncı';
	            }
	            var a = number % 10,
	                b = number % 100 - a,
	                c = number >= 100 ? 100 : null;
	            return number + (suffixes[a] || suffixes[b] || suffixes[c]);
	        },
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 7  // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return tr;

	}));

/***/ },

/***/ 1057:
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : talossan (tzl)
	//! author : Robin van der Vliet : https://github.com/robin0van0der0v with the help of Iustì Canun

	;(function (global, factory) {
	    true ? factory(__webpack_require__(963)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';



	    // After the year there should be a slash and the amount of years since December 26, 1979 in Roman numerals.
	    // This is currently too difficult (maybe even impossible) to add.
	    var tzl = moment.defineLocale('tzl', {
	        months : 'Januar_Fevraglh_Març_Avrïu_Mai_Gün_Julia_Guscht_Setemvar_Listopäts_Noemvar_Zecemvar'.split('_'),
	        monthsShort : 'Jan_Fev_Mar_Avr_Mai_Gün_Jul_Gus_Set_Lis_Noe_Zec'.split('_'),
	        weekdays : 'Súladi_Lúneçi_Maitzi_Márcuri_Xhúadi_Viénerçi_Sáturi'.split('_'),
	        weekdaysShort : 'Súl_Lún_Mai_Már_Xhú_Vié_Sát'.split('_'),
	        weekdaysMin : 'Sú_Lú_Ma_Má_Xh_Vi_Sá'.split('_'),
	        longDateFormat : {
	            LT : 'HH.mm',
	            LTS : 'HH.mm.ss',
	            L : 'DD.MM.YYYY',
	            LL : 'D. MMMM [dallas] YYYY',
	            LLL : 'D. MMMM [dallas] YYYY HH.mm',
	            LLLL : 'dddd, [li] D. MMMM [dallas] YYYY HH.mm'
	        },
	        meridiemParse: /d\'o|d\'a/i,
	        isPM : function (input) {
	            return 'd\'o' === input.toLowerCase();
	        },
	        meridiem : function (hours, minutes, isLower) {
	            if (hours > 11) {
	                return isLower ? 'd\'o' : 'D\'O';
	            } else {
	                return isLower ? 'd\'a' : 'D\'A';
	            }
	        },
	        calendar : {
	            sameDay : '[oxhi à] LT',
	            nextDay : '[demà à] LT',
	            nextWeek : 'dddd [à] LT',
	            lastDay : '[ieiri à] LT',
	            lastWeek : '[sür el] dddd [lasteu à] LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'osprei %s',
	            past : 'ja%s',
	            s : processRelativeTime,
	            m : processRelativeTime,
	            mm : processRelativeTime,
	            h : processRelativeTime,
	            hh : processRelativeTime,
	            d : processRelativeTime,
	            dd : processRelativeTime,
	            M : processRelativeTime,
	            MM : processRelativeTime,
	            y : processRelativeTime,
	            yy : processRelativeTime
	        },
	        ordinalParse: /\d{1,2}\./,
	        ordinal : '%d.',
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    function processRelativeTime(number, withoutSuffix, key, isFuture) {
	        var format = {
	            's': ['viensas secunds', '\'iensas secunds'],
	            'm': ['\'n míut', '\'iens míut'],
	            'mm': [number + ' míuts', '' + number + ' míuts'],
	            'h': ['\'n þora', '\'iensa þora'],
	            'hh': [number + ' þoras', '' + number + ' þoras'],
	            'd': ['\'n ziua', '\'iensa ziua'],
	            'dd': [number + ' ziuas', '' + number + ' ziuas'],
	            'M': ['\'n mes', '\'iens mes'],
	            'MM': [number + ' mesen', '' + number + ' mesen'],
	            'y': ['\'n ar', '\'iens ar'],
	            'yy': [number + ' ars', '' + number + ' ars']
	        };
	        return isFuture ? format[key][0] : (withoutSuffix ? format[key][0] : format[key][1]);
	    }

	    return tzl;

	}));

/***/ },

/***/ 1058:
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Morocco Central Atlas Tamaziɣt (tzm)
	//! author : Abdel Said : https://github.com/abdelsaid

	;(function (global, factory) {
	    true ? factory(__webpack_require__(963)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var tzm = moment.defineLocale('tzm', {
	        months : 'ⵉⵏⵏⴰⵢⵔ_ⴱⵕⴰⵢⵕ_ⵎⴰⵕⵚ_ⵉⴱⵔⵉⵔ_ⵎⴰⵢⵢⵓ_ⵢⵓⵏⵢⵓ_ⵢⵓⵍⵢⵓⵣ_ⵖⵓⵛⵜ_ⵛⵓⵜⴰⵏⴱⵉⵔ_ⴽⵟⵓⴱⵕ_ⵏⵓⵡⴰⵏⴱⵉⵔ_ⴷⵓⵊⵏⴱⵉⵔ'.split('_'),
	        monthsShort : 'ⵉⵏⵏⴰⵢⵔ_ⴱⵕⴰⵢⵕ_ⵎⴰⵕⵚ_ⵉⴱⵔⵉⵔ_ⵎⴰⵢⵢⵓ_ⵢⵓⵏⵢⵓ_ⵢⵓⵍⵢⵓⵣ_ⵖⵓⵛⵜ_ⵛⵓⵜⴰⵏⴱⵉⵔ_ⴽⵟⵓⴱⵕ_ⵏⵓⵡⴰⵏⴱⵉⵔ_ⴷⵓⵊⵏⴱⵉⵔ'.split('_'),
	        weekdays : 'ⴰⵙⴰⵎⴰⵙ_ⴰⵢⵏⴰⵙ_ⴰⵙⵉⵏⴰⵙ_ⴰⴽⵔⴰⵙ_ⴰⴽⵡⴰⵙ_ⴰⵙⵉⵎⵡⴰⵙ_ⴰⵙⵉⴹⵢⴰⵙ'.split('_'),
	        weekdaysShort : 'ⴰⵙⴰⵎⴰⵙ_ⴰⵢⵏⴰⵙ_ⴰⵙⵉⵏⴰⵙ_ⴰⴽⵔⴰⵙ_ⴰⴽⵡⴰⵙ_ⴰⵙⵉⵎⵡⴰⵙ_ⴰⵙⵉⴹⵢⴰⵙ'.split('_'),
	        weekdaysMin : 'ⴰⵙⴰⵎⴰⵙ_ⴰⵢⵏⴰⵙ_ⴰⵙⵉⵏⴰⵙ_ⴰⴽⵔⴰⵙ_ⴰⴽⵡⴰⵙ_ⴰⵙⵉⵎⵡⴰⵙ_ⴰⵙⵉⴹⵢⴰⵙ'.split('_'),
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS: 'HH:mm:ss',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY HH:mm',
	            LLLL : 'dddd D MMMM YYYY HH:mm'
	        },
	        calendar : {
	            sameDay: '[ⴰⵙⴷⵅ ⴴ] LT',
	            nextDay: '[ⴰⵙⴽⴰ ⴴ] LT',
	            nextWeek: 'dddd [ⴴ] LT',
	            lastDay: '[ⴰⵚⴰⵏⵜ ⴴ] LT',
	            lastWeek: 'dddd [ⴴ] LT',
	            sameElse: 'L'
	        },
	        relativeTime : {
	            future : 'ⴷⴰⴷⵅ ⵙ ⵢⴰⵏ %s',
	            past : 'ⵢⴰⵏ %s',
	            s : 'ⵉⵎⵉⴽ',
	            m : 'ⵎⵉⵏⵓⴺ',
	            mm : '%d ⵎⵉⵏⵓⴺ',
	            h : 'ⵙⴰⵄⴰ',
	            hh : '%d ⵜⴰⵙⵙⴰⵄⵉⵏ',
	            d : 'ⴰⵙⵙ',
	            dd : '%d oⵙⵙⴰⵏ',
	            M : 'ⴰⵢoⵓⵔ',
	            MM : '%d ⵉⵢⵢⵉⵔⵏ',
	            y : 'ⴰⵙⴳⴰⵙ',
	            yy : '%d ⵉⵙⴳⴰⵙⵏ'
	        },
	        week : {
	            dow : 6, // Saturday is the first day of the week.
	            doy : 12  // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return tzm;

	}));

/***/ },

/***/ 1059:
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Morocco Central Atlas Tamaziɣt in Latin (tzm-latn)
	//! author : Abdel Said : https://github.com/abdelsaid

	;(function (global, factory) {
	    true ? factory(__webpack_require__(963)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var tzm_latn = moment.defineLocale('tzm-latn', {
	        months : 'innayr_brˤayrˤ_marˤsˤ_ibrir_mayyw_ywnyw_ywlywz_ɣwšt_šwtanbir_ktˤwbrˤ_nwwanbir_dwjnbir'.split('_'),
	        monthsShort : 'innayr_brˤayrˤ_marˤsˤ_ibrir_mayyw_ywnyw_ywlywz_ɣwšt_šwtanbir_ktˤwbrˤ_nwwanbir_dwjnbir'.split('_'),
	        weekdays : 'asamas_aynas_asinas_akras_akwas_asimwas_asiḍyas'.split('_'),
	        weekdaysShort : 'asamas_aynas_asinas_akras_akwas_asimwas_asiḍyas'.split('_'),
	        weekdaysMin : 'asamas_aynas_asinas_akras_akwas_asimwas_asiḍyas'.split('_'),
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY HH:mm',
	            LLLL : 'dddd D MMMM YYYY HH:mm'
	        },
	        calendar : {
	            sameDay: '[asdkh g] LT',
	            nextDay: '[aska g] LT',
	            nextWeek: 'dddd [g] LT',
	            lastDay: '[assant g] LT',
	            lastWeek: 'dddd [g] LT',
	            sameElse: 'L'
	        },
	        relativeTime : {
	            future : 'dadkh s yan %s',
	            past : 'yan %s',
	            s : 'imik',
	            m : 'minuḍ',
	            mm : '%d minuḍ',
	            h : 'saɛa',
	            hh : '%d tassaɛin',
	            d : 'ass',
	            dd : '%d ossan',
	            M : 'ayowr',
	            MM : '%d iyyirn',
	            y : 'asgas',
	            yy : '%d isgasn'
	        },
	        week : {
	            dow : 6, // Saturday is the first day of the week.
	            doy : 12  // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return tzm_latn;

	}));

/***/ },

/***/ 1060:
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : ukrainian (uk)
	//! author : zemlanin : https://github.com/zemlanin
	//! Author : Menelion Elensúle : https://github.com/Oire

	;(function (global, factory) {
	    true ? factory(__webpack_require__(963)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    function plural(word, num) {
	        var forms = word.split('_');
	        return num % 10 === 1 && num % 100 !== 11 ? forms[0] : (num % 10 >= 2 && num % 10 <= 4 && (num % 100 < 10 || num % 100 >= 20) ? forms[1] : forms[2]);
	    }
	    function relativeTimeWithPlural(number, withoutSuffix, key) {
	        var format = {
	            'mm': withoutSuffix ? 'хвилина_хвилини_хвилин' : 'хвилину_хвилини_хвилин',
	            'hh': withoutSuffix ? 'година_години_годин' : 'годину_години_годин',
	            'dd': 'день_дні_днів',
	            'MM': 'місяць_місяці_місяців',
	            'yy': 'рік_роки_років'
	        };
	        if (key === 'm') {
	            return withoutSuffix ? 'хвилина' : 'хвилину';
	        }
	        else if (key === 'h') {
	            return withoutSuffix ? 'година' : 'годину';
	        }
	        else {
	            return number + ' ' + plural(format[key], +number);
	        }
	    }
	    function weekdaysCaseReplace(m, format) {
	        var weekdays = {
	            'nominative': 'неділя_понеділок_вівторок_середа_четвер_п’ятниця_субота'.split('_'),
	            'accusative': 'неділю_понеділок_вівторок_середу_четвер_п’ятницю_суботу'.split('_'),
	            'genitive': 'неділі_понеділка_вівторка_середи_четверга_п’ятниці_суботи'.split('_')
	        },
	        nounCase = (/(\[[ВвУу]\]) ?dddd/).test(format) ?
	            'accusative' :
	            ((/\[?(?:минулої|наступної)? ?\] ?dddd/).test(format) ?
	                'genitive' :
	                'nominative');
	        return weekdays[nounCase][m.day()];
	    }
	    function processHoursFunction(str) {
	        return function () {
	            return str + 'о' + (this.hours() === 11 ? 'б' : '') + '] LT';
	        };
	    }

	    var uk = moment.defineLocale('uk', {
	        months : {
	            'format': 'січня_лютого_березня_квітня_травня_червня_липня_серпня_вересня_жовтня_листопада_грудня'.split('_'),
	            'standalone': 'січень_лютий_березень_квітень_травень_червень_липень_серпень_вересень_жовтень_листопад_грудень'.split('_')
	        },
	        monthsShort : 'січ_лют_бер_квіт_трав_черв_лип_серп_вер_жовт_лист_груд'.split('_'),
	        weekdays : weekdaysCaseReplace,
	        weekdaysShort : 'нд_пн_вт_ср_чт_пт_сб'.split('_'),
	        weekdaysMin : 'нд_пн_вт_ср_чт_пт_сб'.split('_'),
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'DD.MM.YYYY',
	            LL : 'D MMMM YYYY р.',
	            LLL : 'D MMMM YYYY р., HH:mm',
	            LLLL : 'dddd, D MMMM YYYY р., HH:mm'
	        },
	        calendar : {
	            sameDay: processHoursFunction('[Сьогодні '),
	            nextDay: processHoursFunction('[Завтра '),
	            lastDay: processHoursFunction('[Вчора '),
	            nextWeek: processHoursFunction('[У] dddd ['),
	            lastWeek: function () {
	                switch (this.day()) {
	                case 0:
	                case 3:
	                case 5:
	                case 6:
	                    return processHoursFunction('[Минулої] dddd [').call(this);
	                case 1:
	                case 2:
	                case 4:
	                    return processHoursFunction('[Минулого] dddd [').call(this);
	                }
	            },
	            sameElse: 'L'
	        },
	        relativeTime : {
	            future : 'за %s',
	            past : '%s тому',
	            s : 'декілька секунд',
	            m : relativeTimeWithPlural,
	            mm : relativeTimeWithPlural,
	            h : 'годину',
	            hh : relativeTimeWithPlural,
	            d : 'день',
	            dd : relativeTimeWithPlural,
	            M : 'місяць',
	            MM : relativeTimeWithPlural,
	            y : 'рік',
	            yy : relativeTimeWithPlural
	        },
	        // M. E.: those two are virtually unused but a user might want to implement them for his/her website for some reason
	        meridiemParse: /ночі|ранку|дня|вечора/,
	        isPM: function (input) {
	            return /^(дня|вечора)$/.test(input);
	        },
	        meridiem : function (hour, minute, isLower) {
	            if (hour < 4) {
	                return 'ночі';
	            } else if (hour < 12) {
	                return 'ранку';
	            } else if (hour < 17) {
	                return 'дня';
	            } else {
	                return 'вечора';
	            }
	        },
	        ordinalParse: /\d{1,2}-(й|го)/,
	        ordinal: function (number, period) {
	            switch (period) {
	            case 'M':
	            case 'd':
	            case 'DDD':
	            case 'w':
	            case 'W':
	                return number + '-й';
	            case 'D':
	                return number + '-го';
	            default:
	                return number;
	            }
	        },
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 7  // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return uk;

	}));

/***/ },

/***/ 1061:
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : uzbek (uz)
	//! author : Sardor Muminov : https://github.com/muminoff

	;(function (global, factory) {
	    true ? factory(__webpack_require__(963)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var uz = moment.defineLocale('uz', {
	        months : 'январ_феврал_март_апрел_май_июн_июл_август_сентябр_октябр_ноябр_декабр'.split('_'),
	        monthsShort : 'янв_фев_мар_апр_май_июн_июл_авг_сен_окт_ноя_дек'.split('_'),
	        weekdays : 'Якшанба_Душанба_Сешанба_Чоршанба_Пайшанба_Жума_Шанба'.split('_'),
	        weekdaysShort : 'Якш_Душ_Сеш_Чор_Пай_Жум_Шан'.split('_'),
	        weekdaysMin : 'Як_Ду_Се_Чо_Па_Жу_Ша'.split('_'),
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY HH:mm',
	            LLLL : 'D MMMM YYYY, dddd HH:mm'
	        },
	        calendar : {
	            sameDay : '[Бугун соат] LT [да]',
	            nextDay : '[Эртага] LT [да]',
	            nextWeek : 'dddd [куни соат] LT [да]',
	            lastDay : '[Кеча соат] LT [да]',
	            lastWeek : '[Утган] dddd [куни соат] LT [да]',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'Якин %s ичида',
	            past : 'Бир неча %s олдин',
	            s : 'фурсат',
	            m : 'бир дакика',
	            mm : '%d дакика',
	            h : 'бир соат',
	            hh : '%d соат',
	            d : 'бир кун',
	            dd : '%d кун',
	            M : 'бир ой',
	            MM : '%d ой',
	            y : 'бир йил',
	            yy : '%d йил'
	        },
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 7  // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return uz;

	}));

/***/ },

/***/ 1062:
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : vietnamese (vi)
	//! author : Bang Nguyen : https://github.com/bangnk

	;(function (global, factory) {
	    true ? factory(__webpack_require__(963)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var vi = moment.defineLocale('vi', {
	        months : 'tháng 1_tháng 2_tháng 3_tháng 4_tháng 5_tháng 6_tháng 7_tháng 8_tháng 9_tháng 10_tháng 11_tháng 12'.split('_'),
	        monthsShort : 'Th01_Th02_Th03_Th04_Th05_Th06_Th07_Th08_Th09_Th10_Th11_Th12'.split('_'),
	        monthsParseExact : true,
	        weekdays : 'chủ nhật_thứ hai_thứ ba_thứ tư_thứ năm_thứ sáu_thứ bảy'.split('_'),
	        weekdaysShort : 'CN_T2_T3_T4_T5_T6_T7'.split('_'),
	        weekdaysMin : 'CN_T2_T3_T4_T5_T6_T7'.split('_'),
	        weekdaysParseExact : true,
	        meridiemParse: /sa|ch/i,
	        isPM : function (input) {
	            return /^ch$/i.test(input);
	        },
	        meridiem : function (hours, minutes, isLower) {
	            if (hours < 12) {
	                return isLower ? 'sa' : 'SA';
	            } else {
	                return isLower ? 'ch' : 'CH';
	            }
	        },
	        longDateFormat : {
	            LT : 'HH:mm',
	            LTS : 'HH:mm:ss',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM [năm] YYYY',
	            LLL : 'D MMMM [năm] YYYY HH:mm',
	            LLLL : 'dddd, D MMMM [năm] YYYY HH:mm',
	            l : 'DD/M/YYYY',
	            ll : 'D MMM YYYY',
	            lll : 'D MMM YYYY HH:mm',
	            llll : 'ddd, D MMM YYYY HH:mm'
	        },
	        calendar : {
	            sameDay: '[Hôm nay lúc] LT',
	            nextDay: '[Ngày mai lúc] LT',
	            nextWeek: 'dddd [tuần tới lúc] LT',
	            lastDay: '[Hôm qua lúc] LT',
	            lastWeek: 'dddd [tuần rồi lúc] LT',
	            sameElse: 'L'
	        },
	        relativeTime : {
	            future : '%s tới',
	            past : '%s trước',
	            s : 'vài giây',
	            m : 'một phút',
	            mm : '%d phút',
	            h : 'một giờ',
	            hh : '%d giờ',
	            d : 'một ngày',
	            dd : '%d ngày',
	            M : 'một tháng',
	            MM : '%d tháng',
	            y : 'một năm',
	            yy : '%d năm'
	        },
	        ordinalParse: /\d{1,2}/,
	        ordinal : function (number) {
	            return number;
	        },
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return vi;

	}));

/***/ },

/***/ 1063:
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : pseudo (x-pseudo)
	//! author : Andrew Hood : https://github.com/andrewhood125

	;(function (global, factory) {
	    true ? factory(__webpack_require__(963)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var x_pseudo = moment.defineLocale('x-pseudo', {
	        months : 'J~áñúá~rý_F~ébrú~árý_~Márc~h_Áp~ríl_~Máý_~Júñé~_Júl~ý_Áú~gúst~_Sép~témb~ér_Ó~ctób~ér_Ñ~óvém~bér_~Décé~mbér'.split('_'),
	        monthsShort : 'J~áñ_~Féb_~Már_~Ápr_~Máý_~Júñ_~Júl_~Áúg_~Sép_~Óct_~Ñóv_~Déc'.split('_'),
	        monthsParseExact : true,
	        weekdays : 'S~úñdá~ý_Mó~ñdáý~_Túé~sdáý~_Wéd~ñésd~áý_T~húrs~dáý_~Fríd~áý_S~átúr~dáý'.split('_'),
	        weekdaysShort : 'S~úñ_~Móñ_~Túé_~Wéd_~Thú_~Frí_~Sát'.split('_'),
	        weekdaysMin : 'S~ú_Mó~_Tú_~Wé_T~h_Fr~_Sá'.split('_'),
	        weekdaysParseExact : true,
	        longDateFormat : {
	            LT : 'HH:mm',
	            L : 'DD/MM/YYYY',
	            LL : 'D MMMM YYYY',
	            LLL : 'D MMMM YYYY HH:mm',
	            LLLL : 'dddd, D MMMM YYYY HH:mm'
	        },
	        calendar : {
	            sameDay : '[T~ódá~ý át] LT',
	            nextDay : '[T~ómó~rró~w át] LT',
	            nextWeek : 'dddd [át] LT',
	            lastDay : '[Ý~ést~érdá~ý át] LT',
	            lastWeek : '[L~ást] dddd [át] LT',
	            sameElse : 'L'
	        },
	        relativeTime : {
	            future : 'í~ñ %s',
	            past : '%s á~gó',
	            s : 'á ~féw ~sécó~ñds',
	            m : 'á ~míñ~úté',
	            mm : '%d m~íñú~tés',
	            h : 'á~ñ hó~úr',
	            hh : '%d h~óúrs',
	            d : 'á ~dáý',
	            dd : '%d d~áýs',
	            M : 'á ~móñ~th',
	            MM : '%d m~óñt~hs',
	            y : 'á ~ýéár',
	            yy : '%d ý~éárs'
	        },
	        ordinalParse: /\d{1,2}(th|st|nd|rd)/,
	        ordinal : function (number) {
	            var b = number % 10,
	                output = (~~(number % 100 / 10) === 1) ? 'th' :
	                (b === 1) ? 'st' :
	                (b === 2) ? 'nd' :
	                (b === 3) ? 'rd' : 'th';
	            return number + output;
	        },
	        week : {
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return x_pseudo;

	}));

/***/ },

/***/ 1064:
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : chinese (zh-cn)
	//! author : suupic : https://github.com/suupic
	//! author : Zeno Zeng : https://github.com/zenozeng

	;(function (global, factory) {
	    true ? factory(__webpack_require__(963)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var zh_cn = moment.defineLocale('zh-cn', {
	        months : '一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月'.split('_'),
	        monthsShort : '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
	        weekdays : '星期日_星期一_星期二_星期三_星期四_星期五_星期六'.split('_'),
	        weekdaysShort : '周日_周一_周二_周三_周四_周五_周六'.split('_'),
	        weekdaysMin : '日_一_二_三_四_五_六'.split('_'),
	        longDateFormat : {
	            LT : 'Ah点mm分',
	            LTS : 'Ah点m分s秒',
	            L : 'YYYY-MM-DD',
	            LL : 'YYYY年MMMD日',
	            LLL : 'YYYY年MMMD日Ah点mm分',
	            LLLL : 'YYYY年MMMD日ddddAh点mm分',
	            l : 'YYYY-MM-DD',
	            ll : 'YYYY年MMMD日',
	            lll : 'YYYY年MMMD日Ah点mm分',
	            llll : 'YYYY年MMMD日ddddAh点mm分'
	        },
	        meridiemParse: /凌晨|早上|上午|中午|下午|晚上/,
	        meridiemHour: function (hour, meridiem) {
	            if (hour === 12) {
	                hour = 0;
	            }
	            if (meridiem === '凌晨' || meridiem === '早上' ||
	                    meridiem === '上午') {
	                return hour;
	            } else if (meridiem === '下午' || meridiem === '晚上') {
	                return hour + 12;
	            } else {
	                // '中午'
	                return hour >= 11 ? hour : hour + 12;
	            }
	        },
	        meridiem : function (hour, minute, isLower) {
	            var hm = hour * 100 + minute;
	            if (hm < 600) {
	                return '凌晨';
	            } else if (hm < 900) {
	                return '早上';
	            } else if (hm < 1130) {
	                return '上午';
	            } else if (hm < 1230) {
	                return '中午';
	            } else if (hm < 1800) {
	                return '下午';
	            } else {
	                return '晚上';
	            }
	        },
	        calendar : {
	            sameDay : function () {
	                return this.minutes() === 0 ? '[今天]Ah[点整]' : '[今天]LT';
	            },
	            nextDay : function () {
	                return this.minutes() === 0 ? '[明天]Ah[点整]' : '[明天]LT';
	            },
	            lastDay : function () {
	                return this.minutes() === 0 ? '[昨天]Ah[点整]' : '[昨天]LT';
	            },
	            nextWeek : function () {
	                var startOfWeek, prefix;
	                startOfWeek = moment().startOf('week');
	                prefix = this.diff(startOfWeek, 'days') >= 7 ? '[下]' : '[本]';
	                return this.minutes() === 0 ? prefix + 'dddAh点整' : prefix + 'dddAh点mm';
	            },
	            lastWeek : function () {
	                var startOfWeek, prefix;
	                startOfWeek = moment().startOf('week');
	                prefix = this.unix() < startOfWeek.unix()  ? '[上]' : '[本]';
	                return this.minutes() === 0 ? prefix + 'dddAh点整' : prefix + 'dddAh点mm';
	            },
	            sameElse : 'LL'
	        },
	        ordinalParse: /\d{1,2}(日|月|周)/,
	        ordinal : function (number, period) {
	            switch (period) {
	            case 'd':
	            case 'D':
	            case 'DDD':
	                return number + '日';
	            case 'M':
	                return number + '月';
	            case 'w':
	            case 'W':
	                return number + '周';
	            default:
	                return number;
	            }
	        },
	        relativeTime : {
	            future : '%s内',
	            past : '%s前',
	            s : '几秒',
	            m : '1 分钟',
	            mm : '%d 分钟',
	            h : '1 小时',
	            hh : '%d 小时',
	            d : '1 天',
	            dd : '%d 天',
	            M : '1 个月',
	            MM : '%d 个月',
	            y : '1 年',
	            yy : '%d 年'
	        },
	        week : {
	            // GB/T 7408-1994《数据元和交换格式·信息交换·日期和时间表示法》与ISO 8601:1988等效
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return zh_cn;

	}));

/***/ },

/***/ 1065:
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : traditional chinese (zh-tw)
	//! author : Ben : https://github.com/ben-lin

	;(function (global, factory) {
	    true ? factory(__webpack_require__(963)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var zh_tw = moment.defineLocale('zh-tw', {
	        months : '一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月'.split('_'),
	        monthsShort : '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
	        weekdays : '星期日_星期一_星期二_星期三_星期四_星期五_星期六'.split('_'),
	        weekdaysShort : '週日_週一_週二_週三_週四_週五_週六'.split('_'),
	        weekdaysMin : '日_一_二_三_四_五_六'.split('_'),
	        longDateFormat : {
	            LT : 'Ah點mm分',
	            LTS : 'Ah點m分s秒',
	            L : 'YYYY年MMMD日',
	            LL : 'YYYY年MMMD日',
	            LLL : 'YYYY年MMMD日Ah點mm分',
	            LLLL : 'YYYY年MMMD日ddddAh點mm分',
	            l : 'YYYY年MMMD日',
	            ll : 'YYYY年MMMD日',
	            lll : 'YYYY年MMMD日Ah點mm分',
	            llll : 'YYYY年MMMD日ddddAh點mm分'
	        },
	        meridiemParse: /早上|上午|中午|下午|晚上/,
	        meridiemHour : function (hour, meridiem) {
	            if (hour === 12) {
	                hour = 0;
	            }
	            if (meridiem === '早上' || meridiem === '上午') {
	                return hour;
	            } else if (meridiem === '中午') {
	                return hour >= 11 ? hour : hour + 12;
	            } else if (meridiem === '下午' || meridiem === '晚上') {
	                return hour + 12;
	            }
	        },
	        meridiem : function (hour, minute, isLower) {
	            var hm = hour * 100 + minute;
	            if (hm < 900) {
	                return '早上';
	            } else if (hm < 1130) {
	                return '上午';
	            } else if (hm < 1230) {
	                return '中午';
	            } else if (hm < 1800) {
	                return '下午';
	            } else {
	                return '晚上';
	            }
	        },
	        calendar : {
	            sameDay : '[今天]LT',
	            nextDay : '[明天]LT',
	            nextWeek : '[下]ddddLT',
	            lastDay : '[昨天]LT',
	            lastWeek : '[上]ddddLT',
	            sameElse : 'L'
	        },
	        ordinalParse: /\d{1,2}(日|月|週)/,
	        ordinal : function (number, period) {
	            switch (period) {
	            case 'd' :
	            case 'D' :
	            case 'DDD' :
	                return number + '日';
	            case 'M' :
	                return number + '月';
	            case 'w' :
	            case 'W' :
	                return number + '週';
	            default :
	                return number;
	            }
	        },
	        relativeTime : {
	            future : '%s內',
	            past : '%s前',
	            s : '幾秒',
	            m : '1分鐘',
	            mm : '%d分鐘',
	            h : '1小時',
	            hh : '%d小時',
	            d : '1天',
	            dd : '%d天',
	            M : '1個月',
	            MM : '%d個月',
	            y : '1年',
	            yy : '%d年'
	        }
	    });

	    return zh_tw;

	}));

/***/ },

/***/ 1066:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1067);

/***/ },

/***/ 1067:
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(1);
	var cs = __webpack_require__(563);
	var moment = __webpack_require__(963);
	__webpack_require__(1068);
	var DaysView = __webpack_require__(1069);
	var MonthsView = __webpack_require__(1072);
	var YearsView = __webpack_require__(1073);
	var Utils = __webpack_require__(1074);

	var _keyDownActions = Utils.keyDownActions;

	function toDate(date) {
	  if (date instanceof Date) {
	    return date;
	  }
	  return new Date(date);
	}

	module.exports = React.createClass({displayName: "exports",

	    propTypes: {
	        closeOnSelect: React.PropTypes.bool,
	        computableFormat: React.PropTypes.string,
	        date: React.PropTypes.any,
	        minDate: React.PropTypes.any,
	        maxDate: React.PropTypes.any,
	        format: React.PropTypes.string,
	        inputFieldId: React.PropTypes.string,
	        inputFieldClass: React.PropTypes.string,
	        minView: React.PropTypes.number,
	        onBlur: React.PropTypes.func,
	        onChange: React.PropTypes.func,
	        placeholder: React.PropTypes.string,
	        hideTouchKeyboard: React.PropTypes.bool,
	        hideIcon: React.PropTypes.bool,
	    },

	    getInitialState: function() {
	        var date = this.props.date ? moment(toDate(this.props.date)) : null,
	            minDate = this.props.minDate ? moment(toDate(this.props.minDate)) : null,
	            maxDate = this.props.maxDate ? moment(toDate(this.props.maxDate)) : null,
	            inputFieldId = this.props.inputFieldId ? this.props.inputFieldId : null,
	            inputFieldClass = this.props.inputFieldClass ? this.props.inputFieldClass : 'input-calendar-value',
	            format = this.props.format || 'MM-DD-YYYY',
	            minView = parseInt(this.props.minView, 10) || 0,
	            computableFormat = this.props.computableFormat || 'MM-DD-YYYY';

	        return {
	            date: date,
	            minDate: minDate,
	            maxDate: maxDate,
	            format: format,
	            computableFormat: computableFormat,
	            inputValue: date ? date.format(format) : null,
	            views: ['days', 'months', 'years'],
	            minView: minView,
	            currentView: minView || 0,
	            isVisible: false
	        };
	    },

	    componentDidMount: function() {
	        document.addEventListener('click', this.documentClick);
	    },

	    componentWillUnmount: function() {
	        document.removeEventListener('click', this.documentClick);
	    },

	    componentWillReceiveProps: function(nextProps) {
	        this.setState({
	            date: nextProps.date ? moment(toDate(nextProps.date)) : this.state.date,
	            inputValue: nextProps.date ? moment(toDate(nextProps.date)).format(this.state.format) : null
	        });
	    },

	    keyDown: function (e) {
	        _keyDownActions.call(this, e.keyCode);
	    },

	    checkIfDateDisabled: function (date) {
	        if (this.state.minDate && date.isBefore(this.state.minDate)) {
	            return true;
	        }

	        if (this.state.maxDate && date.isAfter(this.state.maxDate)) {
	            return true;
	        }

	        return false;
	    },

	    nextView: function () {
	        if (this.checkIfDateDisabled(this.state.date)) {
	            return;
	        }

	        this.setState({
	            currentView: ++this.state.currentView
	        });
	    },

	    prevView: function (date) {
	        if (this.state.minDate && date.isBefore(this.state.minDate)) {
	            date = this.state.minDate.clone();
	        }

	        if (this.state.maxDate && date.isAfter(this.state.maxDate)) {
	            date = this.state.maxDate.clone();
	        }

	        if (this.state.currentView === this.state.minView) {
	            this.setState({
	                date: date,
	                inputValue: date.format(this.state.format),
	                isVisible: false
	            });

	            if (this.props.onChange) {
	                this.props.onChange(date.format(this.state.computableFormat));
	            }

	        } else {
	            this.setState({
	                date: date,
	                currentView: --this.state.currentView
	            });
	        }
	    },

	    setDate: function (date, isDayView) {
	        if (this.checkIfDateDisabled(date)) {
	            return;
	        }

	        this.setState({
	            date: date,
	            inputValue: date.format(this.state.format),
	            isVisible: this.props.closeOnSelect && isDayView ? !this.state.isVisible : this.state.isVisible
	        });

	        if (this.props.onChange) {
	            this.props.onChange(date.format(this.state.computableFormat));
	        }
	    },

	    changeDate: function (e) {
	        this.setState({
	            inputValue: e.target.value
	        })
	    },

	    inputBlur: function (e) {
	        var date = this.state.inputValue,
	            newDate = null,
	            computableDate = null,
	            format = this.state.format;

	        if (date) {
	            // format, with strict parsing true, so we catch bad dates
	            newDate = moment(date, format, true);

	            // if the new date didn't match our format, see if the native
	            // js date can parse it
	            if (!newDate.isValid()) {
	                var d = new Date(date);

	                // if native js cannot parse, just make a new date
	                if (isNaN(d.getTime())) {
	                    d = new Date();
	                }

	                newDate = moment(d);
	            }

	            computableDate = newDate.format(this.state.computableFormat);
	        }

	        this.setState({
	            date: newDate,
	            inputValue: newDate ? newDate.format(format) : null
	        });

	        if (this.props.onChange) {
	            this.props.onChange(computableDate);
	        }

	        if (this.props.onBlur) {
	            this.props.onBlur(e, computableDate);
	        }
	    },

	    //small hack for hide calendar
	    isCalendar: false,

	    documentClick: function () {
	        if (!this.isCalendar) {
	            this.setVisibility(false);
	        }
	        this.isCalendar = false;
	    },

	    calendarClick: function () {
	        this.isCalendar = true;
	    },

	    todayClick: function () {
	        var today = moment().startOf('day');

	        if (this.checkIfDateDisabled(today)) return;

	        this.setState({
	            date: today,
	            inputValue: today.format(this.state.format),
	            currentView: this.state.minView
	        });

	        if (this.props.onChange) {
	            this.props.onChange(today.format(this.state.computableFormat));
	        }
	    },

	    toggleClick: function () {
	        this.isCalendar = true;
	        this.setVisibility();
	    },

	    setVisibility: function (val) {
	        var value = val !== undefined ? val : !this.state.isVisible;
	        var eventMethod = value ? 'addEventListener' : 'removeEventListener';
	        document[eventMethod]('keydown', this.keyDown);

	        if(this.state.isVisible !== value){
	            this.setState({
	                isVisible: value
	            });
	        }
	    },

	    render: function () {

	        // its ok for this.state.date to be null, but we should never
	        // pass null for the date into the calendar pop up, as we want
	        // it to just start on todays date if there is no date set
	        var calendarDate = this.state.date || moment();

	        var view;
	        switch (this.state.currentView) {
	            case 0:
	                view = React.createElement(DaysView, {
	                    date: calendarDate, 
	                    minDate: this.state.minDate, 
	                    maxDate: this.state.maxDate, 
	                    setDate: this.setDate, 
	                    nextView: this.nextView});
	                break;
	            case 1:
	                view = React.createElement(MonthsView, {
	                    date: calendarDate, 
	                    minDate: this.state.minDate, 
	                    maxDate: this.state.maxDate, 
	                    setDate: this.setDate, 
	                    nextView: this.nextView, 
	                    prevView: this.prevView});
	                break;
	            case 2:
	                view = React.createElement(YearsView, {
	                    date: calendarDate, 
	                    minDate: this.state.minDate, 
	                    maxDate: this.state.maxDate, 
	                    setDate: this.setDate, 
	                    prevView: this.prevView});
	                break;
	        }

	        var todayText = 'Today';
	        if(moment.locale() === 'de')
	          todayText = 'Heute';

	        var calendarClass = cs({
	            'input-calendar-wrapper': true,
	            'icon-hidden': this.props.hideIcon
	        });

	        var calendar = !this.state.isVisible ? '' :
	            React.createElement("div", {className: calendarClass, onClick: this.calendarClick}, 
	                view, 
	                React.createElement("span", {
	                  className: "today-btn" + (this.checkIfDateDisabled(moment().startOf('day')) ? " disabled" : ""), 
	                  onClick: this.todayClick}, 
	                  todayText
	                )
	            );

	        var iconClass = cs({
	            'fa': true,
	            'fa-calendar': !this.state.isVisible,
	            'fa-calendar-o': this.state.isVisible
	        });

	        var readOnly = false;

	        if(this.props.hideTouchKeyboard) {
	            // do not break server side rendering:
	            try {
	                if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
	                    readOnly = true;
	                }
	            } catch (e) {

	            }
	        }

		// Do not show calendar icon if hideIcon is true
		var calendarIcon = this.props.hideIcon ? '' :
			React.createElement("span", {onClick: this.toggleClick, className: "icon-wrapper calendar-icon"}, 
			React.createElement("i", {className: iconClass})
		);

	        return (
	            React.createElement("div", {className: "input-calendar"}, 
	                React.createElement("input", {type: "text", 
	                    id: this.props.inputFieldId, 
	                    className: this.props.inputFieldClass, 
	                    value: this.state.inputValue, 
	                    onBlur: this.inputBlur, 
	                    onChange: this.changeDate, 
	                    onFocus: this.props.openOnInputFocus ? this.toggleClick : '', 
	                    placeholder: this.props.placeholder, 
	                    readOnly: readOnly}), 

			calendarIcon, 
	                calendar
	            )
	        );
	    }

	});


/***/ },

/***/ 1068:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (root, factory) {
	  if (true) {
	    // AMD. Register as an anonymous module unless amdModuleId is set
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(963)], __WEBPACK_AMD_DEFINE_RESULT__ = function (a0) {
	      return (root['DateRange'] = factory(a0));
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports === 'object') {
	    // Node. Does not work with strict CommonJS, but
	    // only CommonJS-like environments that support module.exports,
	    // like Node.
	    module.exports = factory(require("moment"));
	  } else {
	    root['DateRange'] = factory(moment);
	  }
	}(this, function (moment) {

	//-----------------------------------------------------------------------------
	// Contstants
	//-----------------------------------------------------------------------------



	var INTERVALS = {
	  year:   true,
	  month:  true,
	  week:   true,
	  day:    true,
	  hour:   true,
	  minute: true,
	  second: true
	};


	//-----------------------------------------------------------------------------
	// Date Ranges
	//-----------------------------------------------------------------------------

	/**
	 * DateRange class to store ranges and query dates.
	 *
	 * @constructor
	 * @param {(Moment|Date)} start Start of interval
	 * @param {(Moment|Date)} end End of interval
	 *//**
	 * DateRange class to store ranges and query dates.
	 *
	 * @constructor
	 * @param {!Array} range Array containing start and end dates.
	 *//**
	 * DateRange class to store ranges and query dates.
	 *
	 * @constructor
	 * @param {!String} range String formatted as an IS0 8601 time interval
	 */
	function DateRange(start, end) {
	  var parts;
	  var s = start;
	  var e = end;

	  if (arguments.length === 1 || end === undefined) {
	    if (typeof start === 'object' && start.length === 2) {
	      s = start[0];
	      e = start[1];
	    }
	    else if (typeof start === 'string') {
	      parts = start.split('/');
	      s = parts[0];
	      e = parts[1];
	    }
	  }

	  this.start = (s === null) ? moment(-8640000000000000) : moment(s);
	  this.end   = (e === null) ? moment(8640000000000000) : moment(e);
	}

	/**
	 * Constructor for prototype.
	 *
	 * @type {DateRange}
	 */
	DateRange.prototype.constructor = DateRange;

	/**
	 * Deep clone range.
	 *
	 * @return {!DateRange}
	 */
	DateRange.prototype.clone = function() {
	  return moment().range(this.start, this.end);
	};

	/**
	 * Determine if the current interval contains a given moment/date/range.
	 *
	 * @param {(Moment|Date|DateRange)} other Date to check
	 * @param {!boolean} exclusive True if the to value is exclusive
	 *
	 * @return {!boolean}
	 */
	DateRange.prototype.contains = function(other, exclusive) {
	  var start = this.start;
	  var end   = this.end;

	  if (other instanceof DateRange) {
	    return start <= other.start && (end > other.end || (end.isSame(other.end) && !exclusive));
	  }
	  else {
	    return start <= other && (end > other || (end.isSame(other) && !exclusive));
	  }
	};

	/**
	 * Determine if the current date range overlaps a given date range.
	 *
	 * @param {!DateRange} range Date range to check
	 *
	 * @return {!boolean}
	 */
	DateRange.prototype.overlaps = function(range) {
	  return this.intersect(range) !== null;
	};

	/**
	 * Determine the intersecting periods from one or more date ranges.
	 *
	 * @param {!DateRange} other A date range to intersect with this one
	 *
	 * @return {DateRange} Returns the intersecting date or `null` if the ranges do
	 *                     not intersect
	 */
	DateRange.prototype.intersect = function(other) {
	  var start = this.start;
	  var end   = this.end;

	  if ((start <= other.start) && (other.start < end) && (end < other.end)) {
	    return new DateRange(other.start, end);
	  }
	  else if ((other.start < start) && (start < other.end) && (other.end <= end)) {
	    return new DateRange(start, other.end);
	  }
	  else if ((other.start < start) && (start <= end) && (end < other.end)) {
	    return this;
	  }
	  else if ((start <= other.start) && (other.start <= other.end) && (other.end <= end)) {
	    return other;
	  }

	  return null;
	};

	/**
	 * Merge date ranges if they intersect.
	 *
	 * @param {!DateRange} other A date range to add to this one
	 *
	 * @return {DateRange} Returns the new `DateRange` or `null` if they do not
	 *                     overlap
	 */
	DateRange.prototype.add = function(other) {
	  if (this.overlaps(other)) {
	    return new DateRange(moment.min(this.start, other.start), moment.max(this.end, other.end));
	  }

	  return null;
	};

	/**
	 * Subtract one range from another.
	 *
	 * @param {!DateRange} other A date range to substract from this one
	 *
	 * @return {!Array<DateRange>}
	 */
	DateRange.prototype.subtract = function(other) {
	  var start = this.start;
	  var end   = this.end;

	  if (this.intersect(other) === null) {
	    return [this];
	  }
	  else if ((other.start <= start) && (start < end) && (end <= other.end)) {
	    return [];
	  }
	  else if ((other.start <= start) && (start < other.end) && (other.end < end)) {
	    return [new DateRange(other.end, end)];
	  }
	  else if ((start < other.start) && (other.start < end) && (end <= other.end)) {
	    return [new DateRange(start, other.start)];
	  }
	  else if ((start < other.start) && (other.start < other.end) && (other.end < end)) {
	    return [new DateRange(start, other.start), new DateRange(other.end, end)];
	  }
	  else if ((start < other.start) && (other.start < end) && (other.end < end)) {
	    return [new DateRange(start, other.start), new DateRange(other.start, end)];
	  }
	};

	/**
	 * Build a n array of dates.
	 *
	 * @param {(!DateRange|String)} range Date range to be used for iteration or
	 *                                    shorthand string (shorthands:
	 *                                    http://momentjs.com/docs/#/manipulating/add/)
	 * @param {!boolean} exclusive Indicate that the end of the range should not
	 *                             be included in the iter.
	 *
	 * @return {!Array}
	 */
	DateRange.prototype.toArray = function(by, exclusive) {
	  var acc = [];
	  this.by(by, function(unit) {
	    acc.push(unit);
	  }, exclusive);
	  return acc;
	};

	/**
	 * Iterate over the date range by a given date range, executing a function
	 * for each sub-range.
	 *
	 * @param {(!DateRange|String)} range Date range to be used for iteration or
	 *                                    shorthand string (shorthands:
	 *                                    http://momentjs.com/docs/#/manipulating/add/)
	 * @param {!DateRange~by} hollaback Callback
	 * @param {!boolean} exclusive Indicate that the end of the range should not
	 *                             be included in the iter.
	 *
	 * @return {DateRange} `this`
	 */
	DateRange.prototype.by = function(range, hollaback, exclusive) {
	  if (typeof range === 'string') {
	    _byString.call(this, range, hollaback, exclusive);
	  }
	  else {
	    _byRange.call(this, range, hollaback, exclusive);
	  }
	  return this;
	};


	/**
	 * Callback executed for each sub-range.
	 *
	 * @callback DateRange~by
	 *
	 * @param {!Moment} current Current moment object for iteration
	 */

	/**
	 * @private
	 */
	function _byString(interval, hollaback, exclusive) {
	  var current = moment(this.start);

	  while (this.contains(current, exclusive)) {
	    hollaback.call(this, current.clone());
	    current.add(1, interval);
	  }
	}

	/**
	 * @private
	 */
	function _byRange(interval, hollaback, exclusive) {
	  var div = this / interval;
	  var l = Math.floor(div);

	  if (l === Infinity) { return; }
	  if (l === div && exclusive) {
	    l--;
	  }

	  for (var i = 0; i <= l; i++) {
	    hollaback.call(this, moment(this.start.valueOf() + interval.valueOf() * i));
	  }
	}

	/**
	 * Date range formatted as an [ISO8601 Time
	 * Interval](http://en.wikipedia.org/wiki/ISO_8601#Time_intervals).
	 *
	 * @return {!String}
	 */
	DateRange.prototype.toString = function() {
	  return this.start.format() + '/' + this.end.format();
	};

	/**
	 * Date range in milliseconds. Allows basic coercion math of date ranges.
	 *
	 * @return {!number}
	 */
	DateRange.prototype.valueOf = function() {
	  return this.end - this.start;
	};

	/**
	 * Center date of the range.
	 *
	 * @return {!Moment}
	 */
	DateRange.prototype.center = function() {
	  var center = this.start + this.diff() / 2;
	  return moment(center);
	};

	/**
	 * Date range toDate
	 *
	 * @return {!Array<Date>}
	 */
	DateRange.prototype.toDate = function() {
	  return [this.start.toDate(), this.end.toDate()];
	};

	/**
	 * Determine if this date range is the same as another.
	 *
	 * @param {!DateRange} other Another date range to compare to
	 *
	 * @return {!boolean}
	 */
	DateRange.prototype.isSame = function(other) {
	  return this.start.isSame(other.start) && this.end.isSame(other.end);
	};

	/**
	 * The difference of the end vs start.
	 *
	 * @param {number} unit Unit of difference, if no unit is passed in
	 *                      milliseconds are returned. E.g.: `"days"`, `"months"`,
	 *                      etc...
	 *
	 * @return {!number}
	 */
	DateRange.prototype.diff = function(unit) {
	  return this.end.diff(this.start, unit);
	};


	//-----------------------------------------------------------------------------
	// Moment Extensions
	//-----------------------------------------------------------------------------

	/**
	 * Build a date range.
	 *
	 * @param {(Moment|Date)} start Start of range
	 * @param {(Moment|Date)} end End of range
	 *
	 * @this {Moment}
	 *
	 * @return {!DateRange}
	 */
	moment.range = function(start, end) {
	  if (start in INTERVALS) {
	    return new DateRange(moment(this).startOf(start), moment(this).endOf(start));
	  }
	  else {
	    return new DateRange(start, end);
	  }
	};

	/**
	 * Expose constructor
	 *
	 * @const
	 */
	moment.range.constructor = DateRange;

	/**
	 * @deprecated
	 */
	moment.fn.range = moment.range;

	/**
	 * Check if the current moment is within a given date range.
	 *
	 * @param {!DateRange} range Date range to check
	 *
	 * @this {Moment}
	 *
	 * @return {!boolean}
	 */
	moment.fn.within = function(range) {
	  return range.contains(this._d);
	};


	//-----------------------------------------------------------------------------
	// Export
	//-----------------------------------------------------------------------------



	return DateRange;

	}));


/***/ },

/***/ 1069:
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(1);
	var cs = __webpack_require__(563);
	var moment = __webpack_require__(963);
	__webpack_require__(1068);
	var Cell = __webpack_require__(1070);
	var ViewHeader = __webpack_require__(1071);

	module.exports = React.createClass({displayName: "exports",

	    propTypes: {
	        date: React.PropTypes.object.isRequired,
	        minDate: React.PropTypes.any,
	        maxDate: React.PropTypes.any,
	        setDate: React.PropTypes.func,
	        nextView: React.PropTypes.func
	    },

	    getDaysTitles: function () {
	        if(moment.locale() === 'de') {
	          return 'Mo_Di_Mi_Do_Fr_Sa_So'.split('_').map(function (item) {
	              return {
	                  val: item,
	                  label: item
	              };
	          });
	        }

	        return moment.weekdaysMin().map(function (item) {
	            return {
	                val: item,
	                label: item
	            };
	        });
	    },

	    next: function() {
	        var nextDate = this.props.date.clone().add(1, 'months');

	        if (this.props.maxDate && nextDate.isAfter(this.props.maxDate)) {
	            nextDate = this.props.maxDate;
	        }

	        this.props.setDate(nextDate);
	    },

	    prev: function() {
	        var prevDate = this.props.date.clone().subtract(1, 'months');

	        if (this.props.minDate && prevDate.isBefore(this.props.minDate)) {
	            prevDate = this.props.minDate;
	        }

	        this.props.setDate(prevDate);
	    },

	    cellClick: function (e) {
	        var cell = e.target,
	            date = parseInt(cell.innerHTML, 10),
	            newDate = this.props.date ? this.props.date.clone() : moment();

	        if (isNaN(date)) {
	            return;
	        }

	        if (cell.className.indexOf('prev') > -1 ) {
	            newDate.subtract(1, 'months');
	        } else if (cell.className.indexOf('next') > -1) {
	            newDate.add(1, 'months');
	        }

	        newDate.date(date);
	        this.props.setDate(newDate, true);
	    },


	    getDays: function () {
	        var now = this.props.date ? this.props.date : moment(),
	            start = now.clone().startOf('month').weekday(0),
	            end = now.clone().endOf('month').weekday(6),
	            minDate = this.props.minDate,
	            maxDate = this.props.maxDate,
	            month = now.month(),
	            today = moment(),
	            currDay = now.date(),
	            year = now.year(),
	            days = [];

	        moment()
	            .range(start, end)
	            .by('days', function(day) {
	                days.push({
	                    label: day.format('D'),
	                    prev: (day.month() < month && !(day.year() > year)) || day.year() < year ,
	                    next: day.month() > month || day.year() > year,
	                    disabled: day.isBefore(minDate) || day.isAfter(maxDate),
	                    curr: day.date() === currDay && day.month() === month,
	                    today: day.date() === today.date() && day.month() === today.month()
	                });
	            });

	        return days;
	    },

	    render: function () {
	        var titles = this.getDaysTitles().map(function (item, i) {
	            return React.createElement(Cell, {value: item.label, classes: "day title", key: i})
	        });

	        var days = this.getDays().map(function (item, i) {
	            var _class = cs({
	                'day': true,
	                'next': item.next,
	                'prev': item.prev,
	                'disabled': item.disabled,
	                'current': item.curr,
	                'today': item.today
	            });
	            return React.createElement(Cell, {value: item.label, classes: _class, key: i})
	        });

	        var currentDate = this.props.date ? this.props.date.format('MMMM') : moment().format('MMMM');

	        return (
	            React.createElement("div", {className: "view days-view", onKeyDown: this.keyDown}, 
	                React.createElement(ViewHeader, {
	                    prev: this.prev, 
	                    next: this.next, 
	                    data: currentDate, 
	                    titleAction: this.props.nextView}), 

	                React.createElement("div", {className: "days-title"}, titles), 
	                React.createElement("div", {className: "days", onClick: this.cellClick}, days)
	            )
	        );
	    }

	});


/***/ },

/***/ 1070:
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(1);
	var moment = __webpack_require__(963);
	__webpack_require__(1068);

	module.exports = React.createClass({displayName: "exports",

	    propTypes: {
	        value: React.PropTypes.string,
	        classes: React.PropTypes.string
	    },

	    render: function () {
	        var classes = this.props.classes + ' cell';

	        return (
	            React.createElement("div", {className: classes}, this.props.value)
	        );
	    }

	});


/***/ },

/***/ 1071:
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(1);

	module.exports = React.createClass({displayName: "exports",

	    propTypes: {
	        next: React.PropTypes.func,
	        prev: React.PropTypes.func,
	        titleAction: React.PropTypes.func,
	        data: React.PropTypes.string
	    },

	    render: function () {
	        var prop = this.props;

	        return (
	            React.createElement("div", {className: "navigation-wrapper"}, 
	                React.createElement("span", {onClick: prop.prev, className: "icon"}, React.createElement("i", {className: "fa fa-angle-left"})), 
	                React.createElement("span", {onClick: prop.titleAction, className: "navigation-title"}, prop.data), 
	                React.createElement("span", {onClick: prop.next, className: "icon"}, React.createElement("i", {className: "fa fa-angle-right"}))
	            )
	        );
	    }

	});


/***/ },

/***/ 1072:
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(1);
	var cs = __webpack_require__(563);
	var moment = __webpack_require__(963);
	__webpack_require__(1068);
	var Cell = __webpack_require__(1070);
	var ViewHeader = __webpack_require__(1071);

	module.exports = React.createClass({displayName: "exports",

	    propTypes: {
	        date: React.PropTypes.object.isRequired,
	        minDate: React.PropTypes.any,
	        maxDate: React.PropTypes.any
	    },

	    checkIfMonthDisabled: function (month) {
	        var now = this.props.date;

	        return now.clone().month(month).endOf('month').isBefore(this.props.minDate) ||
	            now.clone().month(month).startOf('month').isAfter(this.props.maxDate);
	    },

	    next: function() {
	        var nextDate = this.props.date.clone().add(1, 'years');

	        if (this.props.maxDate && nextDate.isAfter(this.props.maxDate)) {
	            nextDate = this.props.maxDate;
	        }

	        this.props.setDate(nextDate);
	    },

	    prev: function() {
	        var prevDate = this.props.date.clone().subtract(1, 'years');

	        if (this.props.minDate && prevDate.isBefore(this.props.minDate)) {
	            prevDate = this.props.minDate;
	        }

	        this.props.setDate(prevDate);
	    },

	    cellClick: function (e) {
	        var month = e.target.innerHTML;
	        var date = this.props.date.clone().month(month);

	        if (this.checkIfMonthDisabled(month)) {
	            return;
	        }

	        this.props.prevView(date);
	    },

	    getMonth: function () {
	        var now = this.props.date,
	            month = now.month();

	        return moment.monthsShort().map(function (item, i) {
	            return {
	                label: item,
	                disabled: this.checkIfMonthDisabled(i),
	                curr: i === month
	            };
	        }.bind(this));
	    },

	    render: function () {
	        var months = this.getMonth().map(function (item, i) {
	            var _class = cs({
	                'month': true,
	                'disabled': item.disabled,
	                'current': item.curr
	            });
	            return React.createElement(Cell, {value: item.label, classes: _class, key: i})
	        });

	        var currentDate = this.props.date.format('YYYY');

	        return (
	            React.createElement("div", {className: "months-view"}, 
	                React.createElement(ViewHeader, {
	                    prev: this.prev, 
	                    next: this.next, 
	                    data: currentDate, 
	                    titleAction: this.props.nextView}), 

	                React.createElement("div", {className: "months", onClick: this.cellClick}, months)
	            )
	        );
	    }

	});


/***/ },

/***/ 1073:
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(1);
	var cs = __webpack_require__(563);
	var moment = __webpack_require__(963);
	__webpack_require__(1068);
	var Cell = __webpack_require__(1070);
	var ViewHeader = __webpack_require__(1071);

	module.exports = React.createClass({displayName: "exports",

	    propTypes: {
	        date: React.PropTypes.object,
	        minDate: React.PropTypes.any,
	        maxDate: React.PropTypes.any,
	        changeView: React.PropTypes.func
	    },

	    years: [],

	    checkIfYearDisabled: function (year) {
	        return year.clone().endOf('year').isBefore(this.props.minDate) ||
	            year.clone().startOf('year').isAfter(this.props.maxDate);
	    },

	    next: function() {
	        var nextDate = this.props.date.clone().add(10, 'years');

	        if (this.props.maxDate && nextDate.isAfter(this.props.maxDate)) {
	            nextDate = this.props.maxDate;
	        }

	        this.props.setDate(nextDate);
	    },

	    prev: function() {
	        var prevDate = this.props.date.clone().subtract(10, 'years');

	        if (this.props.minDate && prevDate.isBefore(this.props.minDate)) {
	            prevDate = this.props.minDate;
	        }

	        this.props.setDate(prevDate);
	    },

	    rangeCheck: function (currYear) {
	        if (this.years.length === 0) {
	            return false;
	        }

	        return this.years[0].label <= currYear && this.years[this.years.length-1].label >= currYear;
	    },

	    getYears: function () {
	        var now = this.props.date,
	            start = now.clone().subtract(5, 'year'),
	            end = now.clone().add(6, 'year'),
	            currYear = now.year(),
	            items = [],
	            inRange = this.rangeCheck(currYear);

	        if (this.years.length > 0 && inRange) {
	            return this.years;
	        }

	        moment()
	            .range(start, end)
	            .by('years', function(year) {
	                items.push({
	                    label: year.format('YYYY'),
	                    disabled: this.checkIfYearDisabled(year),
	                    curr: currYear === year.year()
	                });
	            }.bind(this));

	        this.years = items;
	        return items;
	    },

	    cellClick: function (e) {
	        var year = parseInt(e.target.innerHTML, 10);
	        var date = this.props.date.clone().year(year);

	        if (this.checkIfYearDisabled(date)) {
	            return;
	        }

	        this.props.prevView(date);
	    },


	    render: function () {
	        var years = this.getYears();
	        var currYear = this.props.date.year();

	        var yearsCells = years.map(function (item, i) {
	            var _class = cs({
	                'year': true,
	                'disabled': item.disabled,
	                'current': item.label == currYear
	            });
	            return React.createElement(Cell, {value: item.label, classes: _class, key: i})
	        });

	        var currentDate = [years[0].label, years[years.length-1].label].join('-');

	        return (
	            React.createElement("div", {className: "years-view"}, 
	                React.createElement(ViewHeader, {
	                    prev: this.prev, 
	                    next: this.next, 
	                    data: currentDate}), 

	                React.createElement("div", {className: "years", onClick: this.cellClick}, yearsCells)
	            )
	        );
	    }

	});


/***/ },

/***/ 1074:
/***/ function(module, exports, __webpack_require__) {

	var Const = __webpack_require__(1075);

	var _keyDownViewHelper = [
	    {
	        prev: false,
	        next: true,
	        exit: true,
	        unit: 'day',
	        upDown: 7
	    },
	    {
	        prev: true,
	        next: true,
	        unit: 'months',
	        upDown: 3
	    },
	    {
	        prev: true,
	        next: false,
	        unit: 'years',
	        upDown: 3
	    }
	];

	module.exports = {

	    keyDownActions: function (code) {
	        var _viewHelper = _keyDownViewHelper[this.state.currentView];
	        var unit = _viewHelper.unit;

	        switch (code) {
	            case Const.keys.left:
	                this.setDate(this.state.date.subtract(1, unit));
	                break;
	            case Const.keys.right:
	                this.setDate(this.state.date.add(1, unit));
	                break;
	            case Const.keys.up:
	                this.setDate(this.state.date.subtract(_viewHelper.upDown, unit));
	                break;
	            case Const.keys.down:
	                this.setDate(this.state.date.add(_viewHelper.upDown, unit));
	                break;
	            case Const.keys.enter:
	                if (_viewHelper.prev)
	                    this.prevView(this.state.date);

	                if (_viewHelper.exit)
	                    this.setState({isVisible: false});

	                break;
	            case Const.keys.esc:
	                this.setState({isVisible: false });
	                break;
	        }
	    }

	};

/***/ },

/***/ 1075:
/***/ function(module, exports) {

	module.exports = {
	    keys: {
	        backspace: 8,
	        enter: 13,
	        esc: 27,
	        left: 37,
	        up: 38,
	        right: 39,
	        down: 40
	    }
	};

/***/ },

/***/ 1076:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var TreeNode = __webpack_require__(1077);

	var Tree = _react2.default.createClass({
	  displayName: 'Tree',

	  /* jshint ignore:start */
	  getInitialState: function getInitialState() {
	    return {
	      data: this.props.data
	    };
	  },

	  handleChange: function handleChange(evt) {
	    // console.log('evt-->',evt.target.checked);
	    // console.log('evt.target.getAttribute-->',evt.target.getAttribute('data-key'));
	    var checked = evt.target.checked;
	    var key = evt.target.getAttribute('data-key');
	    var traverseNodes = function traverseNodes(node) {
	      if (node.id === key) {
	        node.checked = checked;
	        if (node.children) {
	          node.children.forEach(checkAllNodes);
	        }
	      }

	      if (node.children) {
	        node.children.forEach(traverseNodes);
	      }
	    };

	    var checkAllNodes = function checkAllNodes(node) {
	      node.checked = checked;
	      if (node.children) {
	        node.children.forEach(checkAllNodes);
	      }
	    };

	    // var dataSource = Object.create(this.state.data);
	    // dataSource.forEach(traverseNodes);
	    // this.setState({ data: dataSource });

	    this.state.data.forEach(traverseNodes);
	    this.setState(this.state.data);

	    if (this.props.onClick) {
	      this.props.onClick(this.state.data);
	    }
	  },
	  render: function render() {
	    return _react2.default.createElement(
	      'ul',
	      { className: 'checkbox-tree' },
	      this.state.data.map(function (node, i) {
	        return _react2.default.createElement(TreeNode, {
	          key: node.id,
	          node: node,
	          handleChange: this.handleChange
	        });
	      }, this)
	    );
	  }
	  /* jshint ignore:end */
	});

	module.exports = Tree;

/***/ },

/***/ 1077:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var TreeNode = _react2.default.createClass({
	  displayName: 'TreeNode',

	  /* jshint ignore:start */
	  getInitialState: function getInitialState() {
	    return {
	      collapsed: true
	    };
	  },

	  handleClick: function handleClick() {
	    this.setState({
	      collapsed: !this.state.collapsed
	    });
	  },

	  render: function render() {
	    var containerClass = this.state.collapsed ? 'collapsed' : '';
	    var node = this.props.node;
	    var childNodes;

	    if (node.children) {
	      childNodes = node.children.map(function (child, index) {
	        return _react2.default.createElement(
	          'ul',
	          { key: [node.id, index].join('/') },
	          _react2.default.createElement(TreeNode, {
	            key: node.id,
	            node: child,
	            handleChange: this.props.handleChange
	          })
	        );
	      }, this);
	    }

	    return _react2.default.createElement(
	      'li',
	      { className: containerClass },
	      _react2.default.createElement(
	        'span',
	        { onClick: this.handleClick, onTouchEnd: this.handleClick },
	        node.children === undefined ? '' : this.state.collapsed ? String.fromCharCode(43) : String.fromCharCode(8722)
	      ),
	      _react2.default.createElement('input', {
	        type: 'checkbox',
	        checked: node.checked || false,
	        onChange: this.props.handleChange,
	        'data-key': node.id
	      }),
	      _react2.default.createElement(
	        'span',
	        { onClick: this.handleClick, onTouchEnd: this.handleClick },
	        node.label
	      ),
	      childNodes
	    );
	  }
	  /* jshint ignore:end */
	});

	module.exports = TreeNode;

/***/ },

/***/ 1078:
/***/ function(module, exports) {

	'use strict';

	module.exports = [{ id: 'A', label: 'A' }, { id: 'B', label: 'B' }, { id: 'C', label: 'C',
	  children: [{ id: 'C-A', label: 'C-A' }, { id: 'C-B', label: 'C-B' }, { id: 'C-C', label: 'C-C',
	    children: [{ id: 'C-C-A', label: 'C-C-A' }, { id: 'C-C-B', label: 'C-C-B' }, { id: 'C-C-C', label: 'C-C-C' }]
	  }]
	}, { id: 'D', label: 'D' }];

/***/ },

/***/ 1079:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reduxForm = __webpack_require__(852);

	var _reactRouter = __webpack_require__(185);

	var _redux = __webpack_require__(166);

	var _reactSelect = __webpack_require__(952);

	var _reactSelect2 = _interopRequireDefault(_reactSelect);

	var _reactAddonsShallowCompare = __webpack_require__(897);

	var _reactAddonsShallowCompare2 = _interopRequireDefault(_reactAddonsShallowCompare);

	var _masterdataaction = __webpack_require__(899);

	var masterDataActions = _interopRequireWildcard(_masterdataaction);

	var _PureInput = __webpack_require__(958);

	var _PureInput2 = _interopRequireDefault(_PureInput);

	var _Tree = __webpack_require__(1076);

	var _Tree2 = _interopRequireDefault(_Tree);

	var _TreeData = __webpack_require__(1078);

	var _TreeData2 = _interopRequireDefault(_TreeData);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var InventoryJewelryFilter = function (_Component) {
	  _inherits(InventoryJewelryFilter, _Component);

	  function InventoryJewelryFilter(props) {
	    _classCallCheck(this, InventoryJewelryFilter);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(InventoryJewelryFilter).call(this, props));

	    _this.treeOnClick = _this.treeOnClick.bind(_this);
	    _this.handleJewelryCategorySelectChange = _this.handleJewelryCategorySelectChange.bind(_this);
	    _this.handleCollectionSelectChange = _this.handleCollectionSelectChange.bind(_this);
	    _this.handleBrandSelectChange = _this.handleBrandSelectChange.bind(_this);
	    _this.handleMustHaveSelectChange = _this.handleMustHaveSelectChange.bind(_this);
	    _this.handleRingSizeSelectChange = _this.handleRingSizeSelectChange.bind(_this);
	    _this.handleDominantStoneSelectChange = _this.handleDominantStoneSelectChange.bind(_this);
	    _this.handleMetalTypeSelectChange = _this.handleMetalTypeSelectChange.bind(_this);
	    _this.handleMetalColourSelectChange = _this.handleMetalColourSelectChange.bind(_this);

	    _this.state = {
	      JewelryCategoryValue: [],
	      CollectionValue: [],
	      BrandValue: [],
	      MustHaveValue: [],
	      RingSizeValue: [],
	      DominantStoneValue: [],
	      MetalTypeValue: [],
	      MetalColourValue: []
	    };
	    return _this;
	  }

	  _createClass(InventoryJewelryFilter, [{
	    key: 'componentWillMount',
	    value: function componentWillMount() {
	      // console.log('componentWillMount-->');
	      this.props.optionsActions.get();
	    }
	    // shouldComponentUpdate(nextProps) {
	    //   return this.props.collection !== nextProps.collection
	    //         || this.props.totalCostFrom !== nextProps.totalCostFrom
	    //         || this.props.totalCostTo !== nextProps.totalCostTo
	    //         || this.props.totalUpdatedCostFrom !== nextProps.totalUpdatedCostFrom
	    //         || this.props.totalUpdatedCostTo !== nextProps.totalUpdatedCostTo
	    //         || this.props.publicPriceFrom !== nextProps.publicPriceFrom
	    //         || this.props.publicPriceTo !== nextProps.publicPriceTo
	    //         || this.props.markupFrom !== nextProps.markupFrom
	    //         || this.props.markupTo !== nextProps.markupTo
	    //         || this.props.grossWeightFrom !== nextProps.grossWeightFrom
	    //         || this.props.grossWeightTo !== nextProps.grossWeightTo
	    //         || this.props.setReferenceNumber !== nextProps.setReferenceNumber
	    // }

	  }, {
	    key: 'shouldComponentUpdate',
	    value: function shouldComponentUpdate(nextProps, nextState) {
	      return (0, _reactAddonsShallowCompare2.default)(this, nextProps, nextState);
	    }
	  }, {
	    key: 'treeOnClick',
	    value: function treeOnClick(vals) {
	      // console.log('vals-->',vals);
	      var treeSelected = [];
	      var selectedData = vals.filter(function (val) {
	        var checkAllNodes = function checkAllNodes(node) {
	          if (node.children) {
	            if (node.checked === true) {
	              treeSelected.push(node);
	            }
	            node.children.forEach(checkAllNodes);
	          } else {
	            if (node.checked === true) {
	              treeSelected.push(node);
	            }
	          }
	        };
	        if (val.checked === true) {
	          treeSelected.push(val);
	        }

	        if (val.children) {
	          val.children.forEach(checkAllNodes);
	        }
	        return treeSelected;
	      });
	      // console.log('treeSelected-->',treeSelected);
	      var jewelryProductHierarchy = this.props.jewelryProductHierarchy;

	      jewelryProductHierarchy.onChange(treeSelected);
	    }
	  }, {
	    key: 'handleJewelryCategorySelectChange',
	    value: function handleJewelryCategorySelectChange(JewelryCategoryValue) {
	      // console.log('ColorGradeValue-->',ColorGradeValue);
	      var jewelryCategory = this.props.jewelryCategory;

	      jewelryCategory.onChange(JewelryCategoryValue);
	      this.setState({ JewelryCategoryValue: JewelryCategoryValue });
	    }
	  }, {
	    key: 'handleCollectionSelectChange',
	    value: function handleCollectionSelectChange(CollectionValue) {
	      // console.log('ColorGradeValue-->',ColorGradeValue);
	      var collection = this.props.collection;

	      collection.onChange(CollectionValue);
	      this.setState({ CollectionValue: CollectionValue });
	    }
	  }, {
	    key: 'handleBrandSelectChange',
	    value: function handleBrandSelectChange(BrandValue) {
	      // console.log('ColorGradeValue-->',ColorGradeValue);
	      var brand = this.props.brand;

	      brand.onChange(BrandValue);
	      this.setState({ BrandValue: BrandValue });
	    }
	  }, {
	    key: 'handleMustHaveSelectChange',
	    value: function handleMustHaveSelectChange(MustHaveValue) {
	      // console.log('ColorGradeValue-->',ColorGradeValue);
	      var mustHave = this.props.mustHave;

	      mustHave.onChange(MustHaveValue);
	      this.setState({ MustHaveValue: MustHaveValue });
	    }
	  }, {
	    key: 'handleRingSizeSelectChange',
	    value: function handleRingSizeSelectChange(RingSizeValue) {
	      // console.log('ColorGradeValue-->',ColorGradeValue);
	      var mustHave = this.props.mustHave;

	      mustHave.onChange(RingSizeValue);
	      this.setState({ RingSizeValue: RingSizeValue });
	    }
	  }, {
	    key: 'handleDominantStoneSelectChange',
	    value: function handleDominantStoneSelectChange(DominantStoneValue) {
	      // console.log('ColorGradeValue-->',ColorGradeValue);
	      var dominantStone = this.props.dominantStone;

	      dominantStone.onChange(DominantStoneValue);
	      this.setState({ DominantStoneValue: DominantStoneValue });
	    }
	  }, {
	    key: 'handleMetalTypeSelectChange',
	    value: function handleMetalTypeSelectChange(MetalTypeValue) {
	      // console.log('ColorGradeValue-->',ColorGradeValue);
	      var metalType = this.props.metalType;

	      metalType.onChange(MetalTypeValue);
	      this.setState({ MetalTypeValue: MetalTypeValue });
	    }
	  }, {
	    key: 'handleMetalColourSelectChange',
	    value: function handleMetalColourSelectChange(MetalColourValue) {
	      // console.log('ColorGradeValue-->',ColorGradeValue);
	      var metalColour = this.props.metalColour;

	      metalColour.onChange(MetalColourValue);
	      this.setState({ MetalColourValue: MetalColourValue });
	    }
	  }, {
	    key: 'resetOther',
	    value: function resetOther() {
	      console.log('resetOther');
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var musthaves = [{ value: 'Yes', label: 'Yes' }, { value: 'No', label: 'No' }];
	      var _props = this.props;
	      var collection = _props.collection;
	      var totalCostFrom = _props.totalCostFrom;
	      var totalCostTo = _props.totalCostTo;
	      var totalUpdatedCostFrom = _props.totalUpdatedCostFrom;
	      var totalUpdatedCostTo = _props.totalUpdatedCostTo;
	      var publicPriceFrom = _props.publicPriceFrom;
	      var publicPriceTo = _props.publicPriceTo;
	      var markupFrom = _props.markupFrom;
	      var markupTo = _props.markupTo;
	      var grossWeightFrom = _props.grossWeightFrom;
	      var grossWeightTo = _props.grossWeightTo;
	      var setReferenceNumber = _props.setReferenceNumber;
	      var brand = _props.brand;
	      var mustHave = _props.mustHave;
	      var ringSize = _props.ringSize;
	      var dominantStone = _props.dominantStone;
	      var metalType = _props.metalType;
	      var metalColour = _props.metalColour;
	      var resetForm = _props.resetForm;
	      var submitting = _props.submitting;


	      var dataDropDowntJewelryCategory = [];
	      var dataDropDowntCollection = [];
	      var dataDropDowntBrand = [];
	      var dataDropDowntRingSize = [];
	      var dataDropDowntDominantStone = [];
	      var dataDropDowntMetalType = [];
	      var dataDropDowntMetalColour = [];

	      if (this.props.options.jewelryCategories) {
	        dataDropDowntJewelryCategory.push(this.props.options.jewelryCategories.map(function (jewelryCategory) {
	          return { value: jewelryCategory.id, label: jewelryCategory.name };
	        }));
	        dataDropDowntJewelryCategory = dataDropDowntJewelryCategory[0];
	      }
	      if (this.props.options.collections) {
	        dataDropDowntCollection.push(this.props.options.collections.map(function (collection) {
	          return { value: collection.id, label: collection.name };
	        }));
	        dataDropDowntCollection = dataDropDowntCollection[0];
	      }
	      if (this.props.options.brands) {
	        dataDropDowntBrand.push(this.props.options.brands.map(function (brand) {
	          return { value: brand.id, label: brand.name };
	        }));
	        dataDropDowntBrand = dataDropDowntBrand[0];
	      }
	      if (this.props.options.ringSizes) {
	        dataDropDowntRingSize.push(this.props.options.ringSizes.map(function (ringSize) {
	          return { value: ringSize.id, label: ringSize.name };
	        }));
	        dataDropDowntRingSize = dataDropDowntRingSize[0];
	      }
	      if (this.props.options.dominantStones) {
	        dataDropDowntDominantStone.push(this.props.options.dominantStones.map(function (dominantStone) {
	          return { value: dominantStone.id, label: dominantStone.name };
	        }));
	        dataDropDowntDominantStone = dataDropDowntDominantStone[0];
	      }
	      if (this.props.options.metalTypes) {
	        dataDropDowntMetalType.push(this.props.options.metalTypes.map(function (metalType) {
	          return { value: metalType.id, label: metalType.name };
	        }));
	        dataDropDowntMetalType = dataDropDowntMetalType[0];
	      }
	      if (this.props.options.metalColours) {
	        dataDropDowntMetalColour.push(this.props.options.metalColours.map(function (metalColour) {
	          return { value: metalColour.id, label: metalColour.name };
	        }));
	        dataDropDowntMetalColour = dataDropDowntMetalColour[0];
	      }

	      // console.log('musthaves-->',musthaves);

	      return _react2.default.createElement(
	        'div',
	        { className: 'panel panel-default' },
	        _react2.default.createElement(
	          'div',
	          { className: 'panel-body' },
	          _react2.default.createElement(
	            'div',
	            { className: 'row margin-ft' },
	            _react2.default.createElement(
	              'div',
	              { className: 'col-lg-6 form-horizontal' },
	              _react2.default.createElement(
	                'div',
	                { className: 'form-group' },
	                _react2.default.createElement(
	                  'label',
	                  { className: 'col-sm-4 control-label' },
	                  'Product Hierarchy'
	                ),
	                _react2.default.createElement(
	                  'div',
	                  { className: 'col-sm-7 bd-box' },
	                  _react2.default.createElement(_Tree2.default, { data: _TreeData2.default, onClick: this.treeOnClick })
	                )
	              ),
	              _react2.default.createElement(
	                'div',
	                { className: 'form-group' },
	                _react2.default.createElement(
	                  'label',
	                  { className: 'col-sm-4 control-label' },
	                  'Jewelry Category'
	                ),
	                _react2.default.createElement(
	                  'div',
	                  { className: 'col-sm-7' },
	                  _react2.default.createElement(_reactSelect2.default, { multi: true, simpleValue: true, value: this.state.JewelryCategoryValue,
	                    placeholder: 'Select your Jewelry Category',
	                    options: dataDropDowntJewelryCategory,
	                    onChange: this.handleJewelryCategorySelectChange })
	                )
	              ),
	              _react2.default.createElement(
	                'div',
	                { className: 'form-group' },
	                _react2.default.createElement(
	                  'label',
	                  { className: 'col-sm-4 control-label' },
	                  'Collection'
	                ),
	                _react2.default.createElement(
	                  'div',
	                  { className: 'col-sm-7' },
	                  _react2.default.createElement(_reactSelect2.default, { multi: true, simpleValue: true, value: this.state.CollectionValue,
	                    placeholder: 'Select your Collection',
	                    options: dataDropDowntCollection,
	                    onChange: this.handleCollectionSelectChange })
	                )
	              ),
	              _react2.default.createElement(
	                'div',
	                { className: 'form-group' },
	                _react2.default.createElement(
	                  'label',
	                  { className: 'col-sm-4 control-label' },
	                  'Brand'
	                ),
	                _react2.default.createElement(
	                  'div',
	                  { className: 'col-sm-7' },
	                  _react2.default.createElement(_reactSelect2.default, { multi: true, simpleValue: true, value: this.state.BrandValue,
	                    placeholder: 'Select your Brand',
	                    options: dataDropDowntBrand,
	                    onChange: this.handleBrandSelectChange })
	                )
	              ),
	              _react2.default.createElement(
	                'div',
	                { className: 'form-group' },
	                _react2.default.createElement(
	                  'label',
	                  { className: 'col-sm-4 control-label' },
	                  'Must Have'
	                ),
	                _react2.default.createElement(
	                  'div',
	                  { className: 'col-sm-7' },
	                  _react2.default.createElement(_reactSelect2.default, { multi: true, simpleValue: true, value: this.state.MustHaveValue,
	                    placeholder: 'Select your MustHave',
	                    options: musthaves,
	                    onChange: this.handleMustHaveSelectChange })
	                )
	              ),
	              _react2.default.createElement(
	                'div',
	                { className: 'form-group' },
	                _react2.default.createElement(
	                  'label',
	                  { className: 'col-sm-4 control-label' },
	                  'Ring Size'
	                ),
	                _react2.default.createElement(
	                  'div',
	                  { className: 'col-sm-7' },
	                  _react2.default.createElement(_reactSelect2.default, { multi: true, simpleValue: true, value: this.state.RingSizeValue,
	                    placeholder: 'Select your Ring Size',
	                    options: dataDropDowntRingSize,
	                    onChange: this.handleRingSizeSelectChange })
	                )
	              )
	            ),
	            _react2.default.createElement(
	              'div',
	              { className: 'col-lg-6 form-horizontal' },
	              _react2.default.createElement(
	                'div',
	                { className: 'form-group' },
	                _react2.default.createElement(
	                  'label',
	                  { className: 'col-sm-4 control-label' },
	                  'Total Cost (USD)'
	                ),
	                _react2.default.createElement(
	                  'div',
	                  { className: 'col-sm-7' },
	                  _react2.default.createElement(
	                    'label',
	                    { className: 'col-sm-2 control-label padding-l font-nor' },
	                    'From: '
	                  ),
	                  _react2.default.createElement(
	                    'div',
	                    { className: 'col-sm-4 nopadding' },
	                    _react2.default.createElement(_PureInput2.default, { type: 'number', className: 'form-control', field: totalCostFrom })
	                  ),
	                  _react2.default.createElement(
	                    'label',
	                    { className: 'col-sm-2 control-label font-nor m-margin-t10 m-nopadding' },
	                    'To: '
	                  ),
	                  _react2.default.createElement(
	                    'div',
	                    { className: 'col-sm-4 nopadding' },
	                    _react2.default.createElement(_PureInput2.default, { type: 'number', className: 'form-control', field: totalCostTo })
	                  )
	                )
	              ),
	              _react2.default.createElement(
	                'div',
	                { className: 'form-group' },
	                _react2.default.createElement(
	                  'label',
	                  { className: 'col-sm-4 control-label' },
	                  'Total Updated Cost (USD)'
	                ),
	                _react2.default.createElement(
	                  'div',
	                  { className: 'col-sm-7' },
	                  _react2.default.createElement(
	                    'label',
	                    { className: 'col-sm-2 control-label padding-l font-nor' },
	                    'From: '
	                  ),
	                  _react2.default.createElement(
	                    'div',
	                    { className: 'col-sm-4 nopadding' },
	                    _react2.default.createElement(_PureInput2.default, { type: 'number', className: 'form-control', field: totalUpdatedCostFrom })
	                  ),
	                  _react2.default.createElement(
	                    'label',
	                    { className: 'col-sm-2 control-label font-nor m-margin-t10 m-nopadding' },
	                    'To: '
	                  ),
	                  _react2.default.createElement(
	                    'div',
	                    { className: 'col-sm-4 nopadding' },
	                    _react2.default.createElement(_PureInput2.default, { type: 'number', className: 'form-control', field: totalUpdatedCostTo })
	                  )
	                )
	              ),
	              _react2.default.createElement(
	                'div',
	                { className: 'form-group' },
	                _react2.default.createElement(
	                  'label',
	                  { className: 'col-sm-4 control-label' },
	                  'Public Price (USD)'
	                ),
	                _react2.default.createElement(
	                  'div',
	                  { className: 'col-sm-7' },
	                  _react2.default.createElement(
	                    'label',
	                    { className: 'col-sm-2 control-label padding-l font-nor' },
	                    'From: '
	                  ),
	                  _react2.default.createElement(
	                    'div',
	                    { className: 'col-sm-4 nopadding' },
	                    _react2.default.createElement(_PureInput2.default, { type: 'number', className: 'form-control', field: publicPriceFrom })
	                  ),
	                  _react2.default.createElement(
	                    'label',
	                    { className: 'col-sm-2 control-label font-nor m-margin-t10 m-nopadding' },
	                    'To: '
	                  ),
	                  _react2.default.createElement(
	                    'div',
	                    { className: 'col-sm-4 nopadding' },
	                    _react2.default.createElement(_PureInput2.default, { type: 'number', className: 'form-control', field: publicPriceTo })
	                  )
	                )
	              ),
	              _react2.default.createElement(
	                'div',
	                { className: 'form-group' },
	                _react2.default.createElement(
	                  'label',
	                  { className: 'col-sm-4 control-label' },
	                  'Markup %'
	                ),
	                _react2.default.createElement(
	                  'div',
	                  { className: 'col-sm-7' },
	                  _react2.default.createElement(
	                    'label',
	                    { className: 'col-sm-2 control-label padding-l font-nor' },
	                    'From: '
	                  ),
	                  _react2.default.createElement(
	                    'div',
	                    { className: 'col-sm-4 nopadding' },
	                    _react2.default.createElement(_PureInput2.default, { type: 'number', className: 'form-control', field: markupFrom })
	                  ),
	                  _react2.default.createElement(
	                    'label',
	                    { className: 'col-sm-2 control-label font-nor m-margin-t10 m-nopadding' },
	                    'To: '
	                  ),
	                  _react2.default.createElement(
	                    'div',
	                    { className: 'col-sm-4 nopadding' },
	                    _react2.default.createElement(_PureInput2.default, { type: 'number', className: 'form-control', field: markupTo })
	                  )
	                )
	              ),
	              _react2.default.createElement(
	                'div',
	                { className: 'form-group' },
	                _react2.default.createElement(
	                  'label',
	                  { className: 'col-sm-4 control-label' },
	                  'Gross Weight (Grams)'
	                ),
	                _react2.default.createElement(
	                  'div',
	                  { className: 'col-sm-7' },
	                  _react2.default.createElement(
	                    'label',
	                    { className: 'col-sm-2 control-label padding-l font-nor' },
	                    'From: '
	                  ),
	                  _react2.default.createElement(
	                    'div',
	                    { className: 'col-sm-4 nopadding' },
	                    _react2.default.createElement(_PureInput2.default, { type: 'number', className: 'form-control', field: grossWeightFrom })
	                  ),
	                  _react2.default.createElement(
	                    'label',
	                    { className: 'col-sm-2 control-label font-nor m-margin-t10 m-nopadding' },
	                    'To: '
	                  ),
	                  _react2.default.createElement(
	                    'div',
	                    { className: 'col-sm-4 nopadding' },
	                    _react2.default.createElement(_PureInput2.default, { type: 'number', className: 'form-control', field: grossWeightTo })
	                  )
	                )
	              ),
	              _react2.default.createElement(
	                'div',
	                { className: 'form-group' },
	                _react2.default.createElement(
	                  'label',
	                  { className: 'col-sm-4 control-label' },
	                  'Set Reference Number'
	                ),
	                _react2.default.createElement(
	                  'div',
	                  { className: 'col-sm-7' },
	                  _react2.default.createElement(_PureInput2.default, { type: 'text', className: 'form-control', field: setReferenceNumber })
	                )
	              ),
	              _react2.default.createElement(
	                'div',
	                { className: 'form-group' },
	                _react2.default.createElement(
	                  'label',
	                  { className: 'col-sm-4 control-label' },
	                  'Dominant Stone'
	                ),
	                _react2.default.createElement(
	                  'div',
	                  { className: 'col-sm-7' },
	                  _react2.default.createElement(_reactSelect2.default, { multi: true, simpleValue: true, value: this.state.DominantStoneValue,
	                    placeholder: 'Select your Dominant Stone',
	                    options: dataDropDowntDominantStone,
	                    onChange: this.handleDominantStoneSelectChange })
	                )
	              ),
	              _react2.default.createElement(
	                'div',
	                { className: 'form-group' },
	                _react2.default.createElement(
	                  'label',
	                  { className: 'col-sm-4 control-label' },
	                  'Metal Type'
	                ),
	                _react2.default.createElement(
	                  'div',
	                  { className: 'col-sm-7' },
	                  _react2.default.createElement(_reactSelect2.default, { multi: true, simpleValue: true, value: this.state.MetalTypeValue,
	                    placeholder: 'Select your Metal Type',
	                    options: dataDropDowntMetalType,
	                    onChange: this.handleMetalTypeSelectChange })
	                )
	              ),
	              _react2.default.createElement(
	                'div',
	                { className: 'form-group' },
	                _react2.default.createElement(
	                  'label',
	                  { className: 'col-sm-4 control-label' },
	                  'Metal Colour'
	                ),
	                _react2.default.createElement(
	                  'div',
	                  { className: 'col-sm-7' },
	                  _react2.default.createElement(_reactSelect2.default, { multi: true, simpleValue: true, value: this.state.MetalColourValue,
	                    placeholder: 'Select your Metal Colour',
	                    options: dataDropDowntMetalColour,
	                    onChange: this.handleMetalColourSelectChange })
	                )
	              )
	            )
	          )
	        )
	      );
	    }
	  }]);

	  return InventoryJewelryFilter;
	}(_react.Component);

	function mapStateToProps(state) {
	  // console.log('state.users.options-->',state.users.options);
	  return {
	    options: state.users.options
	  };
	}
	function mapDispatchToProps(dispatch) {
	  return {
	    optionsActions: (0, _redux.bindActionCreators)(Object.assign({}, masterDataActions), dispatch)
	  };
	}
	InventoryJewelryFilter.propTypes = {
	  jewelryProductHierarchy: _react.PropTypes.object.isRequired,
	  jewelryCategory: _react.PropTypes.object.isRequired,
	  collection: _react.PropTypes.object.isRequired,
	  totalCostFrom: _react.PropTypes.object.isRequired,
	  totalCostTo: _react.PropTypes.object.isRequired,
	  totalUpdatedCostFrom: _react.PropTypes.object.isRequired,
	  totalUpdatedCostTo: _react.PropTypes.object.isRequired,
	  publicPriceFrom: _react.PropTypes.object.isRequired,
	  publicPriceTo: _react.PropTypes.object.isRequired,
	  markupFrom: _react.PropTypes.object.isRequired,
	  markupTo: _react.PropTypes.object.isRequired,
	  grossWeightFrom: _react.PropTypes.object.isRequired,
	  grossWeightTo: _react.PropTypes.object.isRequired,
	  setReferenceNumber: _react.PropTypes.object.isRequired,
	  brand: _react.PropTypes.object.isRequired,
	  mustHave: _react.PropTypes.object.isRequired,
	  ringSize: _react.PropTypes.object.isRequired,
	  dominantStone: _react.PropTypes.object.isRequired,
	  metalType: _react.PropTypes.object.isRequired,
	  metalColour: _react.PropTypes.object.isRequired
	};

	module.exports = (0, _reduxForm.reduxForm)({
	  form: 'JewelryFilter',
	  fields: []
	}, mapStateToProps, mapDispatchToProps)(InventoryJewelryFilter);

/***/ },

/***/ 1080:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reduxForm = __webpack_require__(852);

	var _reactRouter = __webpack_require__(185);

	var _redux = __webpack_require__(166);

	var _reactSelect = __webpack_require__(952);

	var _reactSelect2 = _interopRequireDefault(_reactSelect);

	var _reactAddonsShallowCompare = __webpack_require__(897);

	var _reactAddonsShallowCompare2 = _interopRequireDefault(_reactAddonsShallowCompare);

	var _masterdataaction = __webpack_require__(899);

	var masterDataActions = _interopRequireWildcard(_masterdataaction);

	var _PureInput = __webpack_require__(958);

	var _PureInput2 = _interopRequireDefault(_PureInput);

	var _Tree = __webpack_require__(1076);

	var _Tree2 = _interopRequireDefault(_Tree);

	var _TreeData = __webpack_require__(1078);

	var _TreeData2 = _interopRequireDefault(_TreeData);

	var _moment = __webpack_require__(963);

	var _moment2 = _interopRequireDefault(_moment);

	var _reactInputCalendar = __webpack_require__(1066);

	var _reactInputCalendar2 = _interopRequireDefault(_reactInputCalendar);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	//test


	var InventoryWatchFilter = function (_Component) {
	  _inherits(InventoryWatchFilter, _Component);

	  function InventoryWatchFilter(props) {
	    _classCallCheck(this, InventoryWatchFilter);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(InventoryWatchFilter).call(this, props));

	    var dateToday = new Date();
	    var fromdate = dateToday.getMonth() + 1 + '-' + dateToday.getDate() + '-' + dateToday.getFullYear();

	    _this.treeOnClick = _this.treeOnClick.bind(_this);
	    _this.handleWatchCategorySelectChange = _this.handleWatchCategorySelectChange.bind(_this);
	    _this.handleCollectionSelectChange = _this.handleCollectionSelectChange.bind(_this);
	    _this.handleBrandSelectChange = _this.handleBrandSelectChange.bind(_this);
	    _this.handleMustHaveSelectChange = _this.handleMustHaveSelectChange.bind(_this);
	    _this.handleMetalTypeSelectChange = _this.handleMetalTypeSelectChange.bind(_this);
	    _this.handleMetalColourSelectChange = _this.handleMetalColourSelectChange.bind(_this);
	    _this.handleDominantStoneSelectChange = _this.handleDominantStoneSelectChange.bind(_this);
	    _this.handleLimitedEditionSelectChange = _this.handleLimitedEditionSelectChange.bind(_this);
	    _this.handleMovementSelectChange = _this.handleMovementSelectChange.bind(_this);
	    _this.handleChangeStart = _this.handleChangeStart.bind(_this);
	    _this.handleChangeEnd = _this.handleChangeEnd.bind(_this);
	    _this.handleDialIndexSelectChange = _this.handleDialIndexSelectChange.bind(_this);
	    _this.handleDialColorSelectChange = _this.handleDialColorSelectChange.bind(_this);
	    _this.handleDialMetalSelectChange = _this.handleDialMetalSelectChange.bind(_this);
	    _this.handleBuckleTypeSelectChange = _this.handleBuckleTypeSelectChange.bind(_this);
	    _this.handleStrapTypeSelectChange = _this.handleStrapTypeSelectChange.bind(_this);
	    _this.handleStrapColorSelectChange = _this.handleStrapColorSelectChange.bind(_this);
	    _this.handleComplicationSelectChange = _this.handleComplicationSelectChange.bind(_this);

	    _this.state = {
	      watchCategoryValue: [],
	      collectionValue: [],
	      brandValue: [],
	      mustHaveValue: [],
	      metalTypeValue: [],
	      metalColourValue: [],
	      dominantStoneValue: [],
	      limitedEditionValue: [],
	      movementValue: [],
	      startDate: null,
	      endDate: null,
	      dialIndexValue: [],
	      dialColorValue: [],
	      dialMetalValue: [],
	      buckleTypeValue: [],
	      strapTypeValue: [],
	      strapColorValue: [],
	      complicationValue: []
	    };
	    return _this;
	  }

	  _createClass(InventoryWatchFilter, [{
	    key: 'componentWillMount',
	    value: function componentWillMount() {
	      // console.log('componentWillMount-->');
	      this.props.optionsActions.get();
	    }
	    // shouldComponentUpdate(nextProps) {
	    //   return this.props.limitedEditionNumber !== nextProps.limitedEditionNumber
	    //         || this.props.serialNumber !== nextProps.serialNumber
	    //         || this.props.totalCostFrom !== nextProps.totalCostFrom
	    //         || this.props.totalCostTo !== nextProps.totalCostTo
	    //         || this.props.totalUpdatedCostFrom !== nextProps.totalUpdatedCostFrom
	    //         || this.props.totalUpdatedCostTo !== nextProps.totalUpdatedCostTo
	    //         || this.props.publicPriceFrom !== nextProps.publicPriceFrom
	    //         || this.props.publicPriceTo !== nextProps.publicPriceTo
	    //         || this.props.markupFrom !== nextProps.markupFrom
	    //         || this.props.markupTo !== nextProps.markupTo
	    //         || this.props.grossWeightFrom !== nextProps.grossWeightFrom
	    //         || this.props.grossWeightTo !== nextProps.grossWeightTo
	    //         || this.props.caseDimensionFrom !== nextProps.caseDimensionFrom
	    //         || this.props.caseDimensionTo !== nextProps.caseDimensionTo
	    //         || this.props.preciousMetalWeightFrom !== nextProps.preciousMetalWeightFrom
	    //         || this.props.preciousMetalWeightTo !== nextProps.preciousMetalWeightTo
	    // }

	  }, {
	    key: 'shouldComponentUpdate',
	    value: function shouldComponentUpdate(nextProps, nextState) {
	      return (0, _reactAddonsShallowCompare2.default)(this, nextProps, nextState);
	    }
	  }, {
	    key: 'treeOnClick',
	    value: function treeOnClick(vals) {
	      // console.log('vals-->',vals);
	      var treeSelected = [];
	      var selectedData = vals.filter(function (val) {
	        var checkAllNodes = function checkAllNodes(node) {
	          if (node.children) {
	            if (node.checked === true) {
	              treeSelected.push(node);
	            }
	            node.children.forEach(checkAllNodes);
	          } else {
	            if (node.checked === true) {
	              treeSelected.push(node);
	            }
	          }
	        };
	        if (val.checked === true) {
	          treeSelected.push(val);
	        }

	        if (val.children) {
	          val.children.forEach(checkAllNodes);
	        }
	        return treeSelected;
	      });
	      // console.log('treeSelected-->',treeSelected);
	      var watchProductHierarchy = this.props.watchProductHierarchy;

	      watchProductHierarchy.onChange(treeSelected);
	    }
	  }, {
	    key: 'handleWatchCategorySelectChange',
	    value: function handleWatchCategorySelectChange(watchCategoryValue) {
	      // console.log('ColorGradeValue-->',ColorGradeValue);
	      var watchCategory = this.props.watchCategory;

	      watchCategory.onChange(watchCategoryValue);
	      this.setState({ watchCategoryValue: watchCategoryValue });
	    }
	  }, {
	    key: 'handleCollectionSelectChange',
	    value: function handleCollectionSelectChange(collectionValue) {
	      // console.log('ColorGradeValue-->',ColorGradeValue);
	      var collection = this.props.collection;

	      collection.onChange(collectionValue);
	      this.setState({ collectionValue: collectionValue });
	    }
	  }, {
	    key: 'handleBrandSelectChange',
	    value: function handleBrandSelectChange(brandValue) {
	      // console.log('ColorGradeValue-->',ColorGradeValue);
	      var brand = this.props.brand;

	      brand.onChange(brandValue);
	      this.setState({ brandValue: brandValue });
	    }
	  }, {
	    key: 'handleMustHaveSelectChange',
	    value: function handleMustHaveSelectChange(mustHaveValue) {
	      // console.log('ColorGradeValue-->',ColorGradeValue);
	      var mustHave = this.props.mustHave;

	      mustHave.onChange(mustHaveValue);
	      this.setState({ mustHaveValue: mustHaveValue });
	    }
	  }, {
	    key: 'handleMetalTypeSelectChange',
	    value: function handleMetalTypeSelectChange(metalTypeValue) {
	      // console.log('ColorGradeValue-->',ColorGradeValue);
	      var metalType = this.props.metalType;

	      metalType.onChange(metalTypeValue);
	      this.setState({ metalTypeValue: metalTypeValue });
	    }
	  }, {
	    key: 'handleMetalColourSelectChange',
	    value: function handleMetalColourSelectChange(metalColourValue) {
	      // console.log('ColorGradeValue-->',ColorGradeValue);
	      var metalColour = this.props.metalColour;

	      metalColour.onChange(metalColourValue);
	      this.setState({ metalColourValue: metalColourValue });
	    }
	  }, {
	    key: 'handleDominantStoneSelectChange',
	    value: function handleDominantStoneSelectChange(dominantStoneValue) {
	      // console.log('ColorGradeValue-->',ColorGradeValue);
	      var dominantStone = this.props.dominantStone;

	      dominantStone.onChange(dominantStoneValue);
	      this.setState({ dominantStoneValue: dominantStoneValue });
	    }
	  }, {
	    key: 'handleLimitedEditionSelectChange',
	    value: function handleLimitedEditionSelectChange(limitedEditionValue) {
	      // console.log('ColorGradeValue-->',ColorGradeValue);
	      var limitedEdition = this.props.limitedEdition;

	      limitedEdition.onChange(limitedEditionValue);
	      this.setState({ limitedEditionValue: limitedEditionValue });
	    }
	  }, {
	    key: 'handleMovementSelectChange',
	    value: function handleMovementSelectChange(movementValue) {
	      // console.log('ColorGradeValue-->',ColorGradeValue);
	      var movement = this.props.movement;

	      movement.onChange(movementValue);
	      this.setState({ movementValue: movementValue });
	    }
	  }, {
	    key: 'handleChangeDate',
	    value: function handleChangeDate(_ref) {
	      var startDate = _ref.startDate;
	      var endDate = _ref.endDate;

	      var startDateM = typeof startDate !== 'undefined' ? (0, _moment2.default)(startDate, 'MM-DD-YYYY') : (0, _moment2.default)(this.state.startDate, 'MM-DD-YYYY');
	      var endDateM = typeof endDate !== 'undefined' ? (0, _moment2.default)(endDate, 'MM-DD-YYYY') : (0, _moment2.default)(this.state.endDate, 'MM-DD-YYYY');

	      if (startDateM.isAfter(endDateM)) {
	        var temp = startDate || this.state.startDate;
	        startDate = endDate || this.state.endDate;
	        endDate = temp;
	      }

	      this.setState({ startDate: startDate, endDate: endDate });
	    }
	  }, {
	    key: 'handleChangeStart',
	    value: function handleChangeStart(startDate) {
	      // console.log('handleChangeStart-->',startDate);
	      var proDateFrom = this.props.proDateFrom;

	      proDateFrom.onChange(startDate);
	      this.setState({ startDate: startDate });
	      this.handleChangeDate({ startDate: startDate });
	      // this.render();
	    }
	  }, {
	    key: 'handleChangeEnd',
	    value: function handleChangeEnd(endDate) {
	      var proDateTo = this.props.proDateTo;

	      proDateTo.onChange(endDate);
	      this.setState({ endDate: endDate });
	      this.handleChangeDate({ endDate: endDate });
	    }
	  }, {
	    key: 'handleDialIndexSelectChange',
	    value: function handleDialIndexSelectChange(dialIndexValuetValue) {
	      // console.log('ColorGradeValue-->',ColorGradeValue);
	      var dialIndex = this.props.dialIndex;

	      dialIndex.onChange(dialIndexValuetValue);
	      this.setState({ dialIndexValuetValue: dialIndexValuetValue });
	    }
	  }, {
	    key: 'handleDialColorSelectChange',
	    value: function handleDialColorSelectChange(dialColorValue) {
	      // console.log('ColorGradeValue-->',ColorGradeValue);
	      var dialColor = this.props.dialColor;

	      dialColor.onChange(dialColorValue);
	      this.setState({ dialColorValue: dialColorValue });
	    }
	  }, {
	    key: 'handleDialMetalSelectChange',
	    value: function handleDialMetalSelectChange(dialMetalValue) {
	      // console.log('ColorGradeValue-->',ColorGradeValue);
	      var dialMetal = this.props.dialMetal;

	      dialMetal.onChange(dialMetalValue);
	      this.setState({ dialMetalValue: dialMetalValue });
	    }
	  }, {
	    key: 'handleBuckleTypeSelectChange',
	    value: function handleBuckleTypeSelectChange(buckleTypeValue) {
	      // console.log('ColorGradeValue-->',ColorGradeValue);
	      var buckleType = this.props.buckleType;

	      buckleType.onChange(buckleTypeValue);
	      this.setState({ buckleTypeValue: buckleTypeValue });
	    }
	  }, {
	    key: 'handleStrapTypeSelectChange',
	    value: function handleStrapTypeSelectChange(strapTypeValue) {
	      // console.log('ColorGradeValue-->',ColorGradeValue);
	      var strapType = this.props.strapType;

	      strapType.onChange(strapTypeValue);
	      this.setState({ strapTypeValue: strapTypeValue });
	    }
	  }, {
	    key: 'handleStrapColorSelectChange',
	    value: function handleStrapColorSelectChange(strapColorValue) {
	      // console.log('ColorGradeValue-->',ColorGradeValue);
	      var strapColor = this.props.strapColor;

	      strapColor.onChange(strapColorValue);
	      this.setState({ strapColorValue: strapColorValue });
	    }
	  }, {
	    key: 'handleComplicationSelectChange',
	    value: function handleComplicationSelectChange(complicationValue) {
	      // console.log('ColorGradeValue-->',ColorGradeValue);
	      var complication = this.props.complication;

	      complication.onChange(complicationValue);
	      this.setState({ complicationValue: complicationValue });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var yesNo = [{ value: 'Yes', label: 'Yes' }, { value: 'No', label: 'No' }];
	      var _props = this.props;
	      var limitedEditionNumber = _props.limitedEditionNumber;
	      var serialNumber = _props.serialNumber;
	      var totalCostFrom = _props.totalCostFrom;
	      var totalCostTo = _props.totalCostTo;
	      var totalUpdatedCostFrom = _props.totalUpdatedCostFrom;
	      var totalUpdatedCostTo = _props.totalUpdatedCostTo;
	      var publicPriceFrom = _props.publicPriceFrom;
	      var publicPriceTo = _props.publicPriceTo;
	      var markupFrom = _props.markupFrom;
	      var markupTo = _props.markupTo;
	      var grossWeightFrom = _props.grossWeightFrom;
	      var grossWeightTo = _props.grossWeightTo;
	      var caseDimensionFrom = _props.caseDimensionFrom;
	      var caseDimensionTo = _props.caseDimensionTo;
	      var preciousMetalWeightFrom = _props.preciousMetalWeightFrom;
	      var preciousMetalWeightTo = _props.preciousMetalWeightTo;


	      var dataDropDowntWatchCategory = [];
	      var dataDropDowntCollection = [];
	      var dataDropDowntBrand = [];
	      var dataDropDowntMetalType = [];
	      var dataDropDowntMetalColour = [];
	      var dataDropDowntDominantStone = [];
	      var dataDropDowntMovement = [];
	      var dataDropDowntDialIndex = [];
	      var dataDropDowntDialColor = [];
	      var dataDropDowntDialMetal = [];
	      var dataDropDowntBuckleType = [];
	      var dataDropDowntStrapType = [];
	      var dataDropDowntStrapColor = [];
	      var dataDropDowntComplication = [];

	      if (this.props.options.watchCategories) {
	        dataDropDowntWatchCategory.push(this.props.options.watchCategories.map(function (watchCategory) {
	          return { value: watchCategory.id, label: watchCategory.name };
	        }));
	        dataDropDowntWatchCategory = dataDropDowntWatchCategory[0];
	      }
	      if (this.props.options.collections) {
	        dataDropDowntCollection.push(this.props.options.collections.map(function (collection) {
	          return { value: collection.id, label: collection.name };
	        }));
	        dataDropDowntCollection = dataDropDowntCollection[0];
	      }
	      if (this.props.options.brands) {
	        dataDropDowntBrand.push(this.props.options.brands.map(function (brand) {
	          return { value: brand.id, label: brand.name };
	        }));
	        dataDropDowntBrand = dataDropDowntBrand[0];
	      }
	      if (this.props.options.metalTypes) {
	        dataDropDowntMetalType.push(this.props.options.metalTypes.map(function (metalType) {
	          return { value: metalType.id, label: metalType.name };
	        }));
	        dataDropDowntMetalType = dataDropDowntMetalType[0];
	      }
	      if (this.props.options.metalColours) {
	        dataDropDowntMetalColour.push(this.props.options.metalColours.map(function (metalColour) {
	          return { value: metalColour.id, label: metalColour.name };
	        }));
	        dataDropDowntMetalColour = dataDropDowntMetalColour[0];
	      }
	      if (this.props.options.dominantStones) {
	        dataDropDowntDominantStone.push(this.props.options.dominantStones.map(function (dominantStone) {
	          return { value: dominantStone.id, label: dominantStone.name };
	        }));
	        dataDropDowntDominantStone = dataDropDowntDominantStone[0];
	      }
	      if (this.props.options.movements) {
	        dataDropDowntMovement.push(this.props.options.movements.map(function (movement) {
	          return { value: movement.id, label: movement.name };
	        }));
	        dataDropDowntMovement = dataDropDowntMovement[0];
	      }
	      if (this.props.options.dialIndexs) {
	        dataDropDowntDialIndex.push(this.props.options.dialIndexs.map(function (dialIndex) {
	          return { value: dialIndex.id, label: dialIndex.name };
	        }));
	        dataDropDowntDialIndex = dataDropDowntDialIndex[0];
	      }
	      if (this.props.options.dialColors) {
	        dataDropDowntDialColor.push(this.props.options.dialColors.map(function (dialColor) {
	          return { value: dialColor.id, label: dialColor.name };
	        }));
	        dataDropDowntDialColor = dataDropDowntDialColor[0];
	      }
	      if (this.props.options.dialMetals) {
	        dataDropDowntDialMetal.push(this.props.options.dialMetals.map(function (dialMetal) {
	          return { value: dialMetal.id, label: dialMetal.name };
	        }));
	        dataDropDowntDialMetal = dataDropDowntDialMetal[0];
	      }
	      if (this.props.options.buckleTypes) {
	        dataDropDowntBuckleType.push(this.props.options.buckleTypes.map(function (buckleType) {
	          return { value: buckleType.id, label: buckleType.name };
	        }));
	        dataDropDowntBuckleType = dataDropDowntBuckleType[0];
	      }
	      if (this.props.options.strapTypes) {
	        dataDropDowntStrapType.push(this.props.options.strapTypes.map(function (strapType) {
	          return { value: strapType.id, label: strapType.name };
	        }));
	        dataDropDowntStrapType = dataDropDowntStrapType[0];
	      }
	      if (this.props.options.strapColors) {
	        dataDropDowntStrapColor.push(this.props.options.strapColors.map(function (strapColor) {
	          return { value: strapColor.id, label: strapColor.name };
	        }));
	        dataDropDowntStrapColor = dataDropDowntStrapColor[0];
	      }
	      if (this.props.options.complications) {
	        dataDropDowntComplication.push(this.props.options.complications.map(function (complication) {
	          return { value: complication.id, label: complication.name };
	        }));
	        dataDropDowntComplication = dataDropDowntComplication[0];
	      }
	      return _react2.default.createElement(
	        'div',
	        { className: 'panel panel-default' },
	        _react2.default.createElement(
	          'div',
	          { className: 'panel-body' },
	          _react2.default.createElement(
	            'div',
	            { className: 'row margin-ft' },
	            _react2.default.createElement(
	              'div',
	              { className: 'col-lg-6 form-horizontal' },
	              _react2.default.createElement(
	                'div',
	                { className: 'form-group' },
	                _react2.default.createElement(
	                  'label',
	                  { className: 'col-sm-4 control-label' },
	                  'Product Hierarchy'
	                ),
	                _react2.default.createElement(
	                  'div',
	                  { className: 'col-sm-7 bd-box' },
	                  _react2.default.createElement(_Tree2.default, { data: _TreeData2.default, onClick: this.treeOnClick })
	                )
	              ),
	              _react2.default.createElement(
	                'div',
	                { className: 'form-group' },
	                _react2.default.createElement(
	                  'label',
	                  { className: 'col-sm-4 control-label' },
	                  'Watch Category'
	                ),
	                _react2.default.createElement(
	                  'div',
	                  { className: 'col-sm-7' },
	                  _react2.default.createElement(_reactSelect2.default, { multi: true, simpleValue: true, value: this.state.watchCategoryValue,
	                    placeholder: 'Select your Watch Category',
	                    options: dataDropDowntWatchCategory,
	                    onChange: this.handleWatchCategorySelectChange })
	                )
	              ),
	              _react2.default.createElement(
	                'div',
	                { className: 'form-group' },
	                _react2.default.createElement(
	                  'label',
	                  { className: 'col-sm-4 control-label' },
	                  'Collection'
	                ),
	                _react2.default.createElement(
	                  'div',
	                  { className: 'col-sm-7' },
	                  _react2.default.createElement(_reactSelect2.default, { multi: true, simpleValue: true, value: this.state.collectionValue,
	                    placeholder: 'Select your Collection',
	                    options: dataDropDowntCollection,
	                    onChange: this.handleCollectionSelectChange })
	                )
	              ),
	              _react2.default.createElement(
	                'div',
	                { className: 'form-group' },
	                _react2.default.createElement(
	                  'label',
	                  { className: 'col-sm-4 control-label' },
	                  'Brand'
	                ),
	                _react2.default.createElement(
	                  'div',
	                  { className: 'col-sm-7' },
	                  _react2.default.createElement(_reactSelect2.default, { multi: true, simpleValue: true, value: this.state.brandValue,
	                    placeholder: 'Select your Brand',
	                    options: dataDropDowntBrand,
	                    onChange: this.handleBrandSelectChange })
	                )
	              ),
	              _react2.default.createElement(
	                'div',
	                { className: 'form-group' },
	                _react2.default.createElement(
	                  'label',
	                  { className: 'col-sm-4 control-label' },
	                  'Must Have'
	                ),
	                _react2.default.createElement(
	                  'div',
	                  { className: 'col-sm-7' },
	                  _react2.default.createElement(_reactSelect2.default, { multi: true, simpleValue: true, value: this.state.mustHaveValue,
	                    placeholder: 'Select your MustHave',
	                    options: yesNo,
	                    onChange: this.handleMustHaveSelectChange })
	                )
	              ),
	              _react2.default.createElement(
	                'div',
	                { className: 'form-group' },
	                _react2.default.createElement(
	                  'label',
	                  { className: 'col-sm-4 control-label' },
	                  'Metal Type'
	                ),
	                _react2.default.createElement(
	                  'div',
	                  { className: 'col-sm-7' },
	                  _react2.default.createElement(_reactSelect2.default, { multi: true, simpleValue: true, value: this.state.metalTypeValue,
	                    placeholder: 'Select your Metal Type',
	                    options: dataDropDowntMetalType,
	                    onChange: this.handleMetalTypeSelectChange })
	                )
	              ),
	              _react2.default.createElement(
	                'div',
	                { className: 'form-group' },
	                _react2.default.createElement(
	                  'label',
	                  { className: 'col-sm-4 control-label' },
	                  'Metal Colour'
	                ),
	                _react2.default.createElement(
	                  'div',
	                  { className: 'col-sm-7' },
	                  _react2.default.createElement(_reactSelect2.default, { multi: true, simpleValue: true, value: this.state.metalColourValue,
	                    placeholder: 'Select your Metal Colour',
	                    options: dataDropDowntMetalColour,
	                    onChange: this.handleMetalColourSelectChange })
	                )
	              ),
	              _react2.default.createElement(
	                'div',
	                { className: 'form-group' },
	                _react2.default.createElement(
	                  'label',
	                  { className: 'col-sm-4 control-label' },
	                  'Dominant Stone'
	                ),
	                _react2.default.createElement(
	                  'div',
	                  { className: 'col-sm-7' },
	                  _react2.default.createElement(_reactSelect2.default, { multi: true, simpleValue: true, value: this.state.dominantStoneValue,
	                    placeholder: 'Select your Dominant Stone',
	                    options: dataDropDowntDominantStone,
	                    onChange: this.handleDominantStoneSelectChange })
	                )
	              ),
	              _react2.default.createElement(
	                'div',
	                { className: 'form-group' },
	                _react2.default.createElement(
	                  'label',
	                  { className: 'col-sm-4 control-label' },
	                  'Limited Edition'
	                ),
	                _react2.default.createElement(
	                  'div',
	                  { className: 'col-sm-7' },
	                  _react2.default.createElement(_reactSelect2.default, { multi: true, simpleValue: true, value: this.state.limitedEditionValue,
	                    placeholder: 'Select your Limited Edition',
	                    options: yesNo,
	                    onChange: this.handleLimitedEditionSelectChange })
	                )
	              ),
	              _react2.default.createElement(
	                'div',
	                { className: 'form-group' },
	                _react2.default.createElement(
	                  'label',
	                  { className: 'col-sm-4 control-label' },
	                  'Limited Edition Number'
	                ),
	                _react2.default.createElement(
	                  'div',
	                  { className: 'col-sm-7' },
	                  _react2.default.createElement(_PureInput2.default, { type: 'text', className: 'form-control', field: limitedEditionNumber })
	                )
	              ),
	              _react2.default.createElement(
	                'div',
	                { className: 'form-group' },
	                _react2.default.createElement(
	                  'label',
	                  { className: 'col-sm-4 control-label' },
	                  'Serial Number'
	                ),
	                _react2.default.createElement(
	                  'div',
	                  { className: 'col-sm-7' },
	                  _react2.default.createElement(_PureInput2.default, { type: 'text', className: 'form-control', field: serialNumber })
	                )
	              ),
	              _react2.default.createElement(
	                'div',
	                { className: 'form-group' },
	                _react2.default.createElement(
	                  'label',
	                  { className: 'col-sm-4 control-label' },
	                  'Movement'
	                ),
	                _react2.default.createElement(
	                  'div',
	                  { className: 'col-sm-7' },
	                  _react2.default.createElement(_reactSelect2.default, { multi: true, simpleValue: true, value: this.state.movementValue,
	                    placeholder: 'Select your Movement',
	                    options: dataDropDowntMovement,
	                    onChange: this.handleMovementSelectChange })
	                )
	              )
	            ),
	            _react2.default.createElement(
	              'div',
	              { className: 'col-lg-6 form-horizontal' },
	              _react2.default.createElement(
	                'div',
	                { className: 'form-group' },
	                _react2.default.createElement(
	                  'label',
	                  { className: 'col-sm-4 control-label' },
	                  'Total Cost (USD)'
	                ),
	                _react2.default.createElement(
	                  'div',
	                  { className: 'col-sm-7' },
	                  _react2.default.createElement(
	                    'label',
	                    { className: 'col-sm-2 control-label padding-l font-nor' },
	                    'From: '
	                  ),
	                  _react2.default.createElement(
	                    'div',
	                    { className: 'col-sm-4 nopadding' },
	                    _react2.default.createElement(_PureInput2.default, { type: 'number', className: 'form-control', field: totalCostFrom })
	                  ),
	                  _react2.default.createElement(
	                    'label',
	                    { className: 'col-sm-2 control-label font-nor m-margin-t10 m-nopadding' },
	                    'To: '
	                  ),
	                  _react2.default.createElement(
	                    'div',
	                    { className: 'col-sm-4 nopadding' },
	                    _react2.default.createElement(_PureInput2.default, { type: 'number', className: 'form-control', field: totalCostTo })
	                  )
	                )
	              ),
	              _react2.default.createElement(
	                'div',
	                { className: 'form-group' },
	                _react2.default.createElement(
	                  'label',
	                  { className: 'col-sm-4 control-label' },
	                  'Total Updated Cost (USD)'
	                ),
	                _react2.default.createElement(
	                  'div',
	                  { className: 'col-sm-7' },
	                  _react2.default.createElement(
	                    'label',
	                    { className: 'col-sm-2 control-label padding-l font-nor' },
	                    'From: '
	                  ),
	                  _react2.default.createElement(
	                    'div',
	                    { className: 'col-sm-4 nopadding' },
	                    _react2.default.createElement(_PureInput2.default, { type: 'number', className: 'form-control', field: totalUpdatedCostFrom })
	                  ),
	                  _react2.default.createElement(
	                    'label',
	                    { className: 'col-sm-2 control-label font-nor m-margin-t10 m-nopadding' },
	                    'To: '
	                  ),
	                  _react2.default.createElement(
	                    'div',
	                    { className: 'col-sm-4 nopadding' },
	                    _react2.default.createElement(_PureInput2.default, { type: 'number', className: 'form-control', field: totalUpdatedCostTo })
	                  )
	                )
	              ),
	              _react2.default.createElement(
	                'div',
	                { className: 'form-group' },
	                _react2.default.createElement(
	                  'label',
	                  { className: 'col-sm-4 control-label' },
	                  'Public Price (USD)'
	                ),
	                _react2.default.createElement(
	                  'div',
	                  { className: 'col-sm-7' },
	                  _react2.default.createElement(
	                    'label',
	                    { className: 'col-sm-2 control-label padding-l font-nor' },
	                    'From: '
	                  ),
	                  _react2.default.createElement(
	                    'div',
	                    { className: 'col-sm-4 nopadding' },
	                    _react2.default.createElement(_PureInput2.default, { type: 'number', className: 'form-control', field: publicPriceFrom })
	                  ),
	                  _react2.default.createElement(
	                    'label',
	                    { className: 'col-sm-2 control-label font-nor m-margin-t10 m-nopadding' },
	                    'To: '
	                  ),
	                  _react2.default.createElement(
	                    'div',
	                    { className: 'col-sm-4 nopadding' },
	                    _react2.default.createElement(_PureInput2.default, { type: 'number', className: 'form-control', field: publicPriceTo })
	                  )
	                )
	              ),
	              _react2.default.createElement(
	                'div',
	                { className: 'form-group' },
	                _react2.default.createElement(
	                  'label',
	                  { className: 'col-sm-4 control-label' },
	                  'Markup %'
	                ),
	                _react2.default.createElement(
	                  'div',
	                  { className: 'col-sm-7' },
	                  _react2.default.createElement(
	                    'label',
	                    { className: 'col-sm-2 control-label padding-l font-nor' },
	                    'From: '
	                  ),
	                  _react2.default.createElement(
	                    'div',
	                    { className: 'col-sm-4 nopadding' },
	                    _react2.default.createElement(_PureInput2.default, { type: 'number', className: 'form-control', field: markupFrom })
	                  ),
	                  _react2.default.createElement(
	                    'label',
	                    { className: 'col-sm-2 control-label font-nor m-margin-t10 m-nopadding' },
	                    'To: '
	                  ),
	                  _react2.default.createElement(
	                    'div',
	                    { className: 'col-sm-4 nopadding' },
	                    _react2.default.createElement(_PureInput2.default, { type: 'number', className: 'form-control', field: markupTo })
	                  )
	                )
	              ),
	              _react2.default.createElement(
	                'div',
	                { className: 'form-group' },
	                _react2.default.createElement(
	                  'label',
	                  { className: 'col-sm-4 control-label' },
	                  'Gross Weight (Grams)'
	                ),
	                _react2.default.createElement(
	                  'div',
	                  { className: 'col-sm-7' },
	                  _react2.default.createElement(
	                    'label',
	                    { className: 'col-sm-2 control-label padding-l font-nor' },
	                    'From: '
	                  ),
	                  _react2.default.createElement(
	                    'div',
	                    { className: 'col-sm-4 nopadding' },
	                    _react2.default.createElement(_PureInput2.default, { type: 'number', className: 'form-control', field: grossWeightFrom })
	                  ),
	                  _react2.default.createElement(
	                    'label',
	                    { className: 'col-sm-2 control-label font-nor m-margin-t10 m-nopadding' },
	                    'To: '
	                  ),
	                  _react2.default.createElement(
	                    'div',
	                    { className: 'col-sm-4 nopadding' },
	                    _react2.default.createElement(_PureInput2.default, { type: 'number', className: 'form-control', field: grossWeightTo })
	                  )
	                )
	              ),
	              _react2.default.createElement(
	                'div',
	                { className: 'form-group' },
	                _react2.default.createElement(
	                  'label',
	                  { className: 'col-sm-4 control-label' },
	                  'Production Date'
	                ),
	                _react2.default.createElement(
	                  'div',
	                  { className: 'col-sm-7' },
	                  _react2.default.createElement(
	                    'label',
	                    { className: 'col-sm-2 padding-l font-nor' },
	                    'From: '
	                  ),
	                  _react2.default.createElement(
	                    'div',
	                    { className: 'col-sm-10 nopadding' },
	                    _react2.default.createElement(_reactInputCalendar2.default, {
	                      format: 'MM-DD-YYYY',
	                      date: this.state.startDate,
	                      minDate: this.state.startDate,
	                      maxDate: this.state.endDate,
	                      closeOnSelect: true,
	                      onChange: this.handleChangeStart
	                    })
	                  ),
	                  _react2.default.createElement(
	                    'label',
	                    { className: 'col-sm-2 control-label padding-l font-nor m-margin-t10 m-nopadding' },
	                    'To: '
	                  ),
	                  _react2.default.createElement(
	                    'div',
	                    { className: 'col-sm-10 nopadding' },
	                    _react2.default.createElement(_reactInputCalendar2.default, {
	                      format: 'MM-DD-YYYY',
	                      date: this.state.endDate,
	                      minDate: this.state.startDate,
	                      maxDate: this.state.endDate,
	                      closeOnSelect: true,
	                      onChange: this.handleChangeEnd
	                    })
	                  )
	                )
	              ),
	              _react2.default.createElement(
	                'div',
	                { className: 'form-group' },
	                _react2.default.createElement(
	                  'label',
	                  { className: 'col-sm-4 control-label' },
	                  'Case Dimension'
	                ),
	                _react2.default.createElement(
	                  'div',
	                  { className: 'col-sm-7' },
	                  _react2.default.createElement(
	                    'label',
	                    { className: 'col-sm-2 control-label padding-l font-nor' },
	                    'From: '
	                  ),
	                  _react2.default.createElement(
	                    'div',
	                    { className: 'col-sm-4 nopadding' },
	                    _react2.default.createElement(_PureInput2.default, { type: 'number', className: 'form-control', field: caseDimensionFrom })
	                  ),
	                  _react2.default.createElement(
	                    'label',
	                    { className: 'col-sm-2 control-label font-nor m-margin-t10 m-nopadding' },
	                    'To: '
	                  ),
	                  _react2.default.createElement(
	                    'div',
	                    { className: 'col-sm-4 nopadding' },
	                    _react2.default.createElement(_PureInput2.default, { type: 'number', className: 'form-control', field: caseDimensionTo })
	                  )
	                )
	              ),
	              _react2.default.createElement(
	                'div',
	                { className: 'form-group' },
	                _react2.default.createElement(
	                  'label',
	                  { className: 'col-sm-4 control-label' },
	                  'Precious Metal Weight'
	                ),
	                _react2.default.createElement(
	                  'div',
	                  { className: 'col-sm-7' },
	                  _react2.default.createElement(
	                    'label',
	                    { className: 'col-sm-2 control-label padding-l font-nor' },
	                    'From: '
	                  ),
	                  _react2.default.createElement(
	                    'div',
	                    { className: 'col-sm-4 nopadding' },
	                    _react2.default.createElement(_PureInput2.default, { type: 'number', className: 'form-control', field: preciousMetalWeightFrom })
	                  ),
	                  _react2.default.createElement(
	                    'label',
	                    { className: 'col-sm-2 control-label font-nor m-margin-t10 m-nopadding' },
	                    'To: '
	                  ),
	                  _react2.default.createElement(
	                    'div',
	                    { className: 'col-sm-4 nopadding' },
	                    _react2.default.createElement(_PureInput2.default, { type: 'number', className: 'form-control', field: preciousMetalWeightTo })
	                  )
	                )
	              ),
	              _react2.default.createElement(
	                'div',
	                { className: 'form-group' },
	                _react2.default.createElement(
	                  'label',
	                  { className: 'col-sm-4 control-label' },
	                  'Dial Index'
	                ),
	                _react2.default.createElement(
	                  'div',
	                  { className: 'col-sm-7' },
	                  _react2.default.createElement(_reactSelect2.default, { multi: true, simpleValue: true, value: this.state.dialIndexValue,
	                    placeholder: 'Select your Dial Index',
	                    options: dataDropDowntDialIndex,
	                    onChange: this.handleDialIndexSelectChange })
	                )
	              ),
	              _react2.default.createElement(
	                'div',
	                { className: 'form-group' },
	                _react2.default.createElement(
	                  'label',
	                  { className: 'col-sm-4 control-label' },
	                  'Dial Color'
	                ),
	                _react2.default.createElement(
	                  'div',
	                  { className: 'col-sm-7' },
	                  _react2.default.createElement(_reactSelect2.default, { multi: true, simpleValue: true, value: this.state.dialColorValue,
	                    placeholder: 'Select your Dial Color',
	                    options: dataDropDowntDialColor,
	                    onChange: this.handleDialColorSelectChange })
	                )
	              ),
	              _react2.default.createElement(
	                'div',
	                { className: 'form-group' },
	                _react2.default.createElement(
	                  'label',
	                  { className: 'col-sm-4 control-label' },
	                  'Dial Metal'
	                ),
	                _react2.default.createElement(
	                  'div',
	                  { className: 'col-sm-7' },
	                  _react2.default.createElement(_reactSelect2.default, { multi: true, simpleValue: true, value: this.state.dialMetalValue,
	                    placeholder: 'Select your Dial Metal',
	                    options: dataDropDowntDialMetal,
	                    onChange: this.handleDialMetalSelectChange })
	                )
	              ),
	              _react2.default.createElement(
	                'div',
	                { className: 'form-group' },
	                _react2.default.createElement(
	                  'label',
	                  { className: 'col-sm-4 control-label' },
	                  'Buckle Type'
	                ),
	                _react2.default.createElement(
	                  'div',
	                  { className: 'col-sm-7' },
	                  _react2.default.createElement(_reactSelect2.default, { multi: true, simpleValue: true, value: this.state.buckleTypeValue,
	                    placeholder: 'Select your Buckle Type',
	                    options: dataDropDowntBuckleType,
	                    onChange: this.handleBuckleTypeSelectChange })
	                )
	              ),
	              _react2.default.createElement(
	                'div',
	                { className: 'form-group' },
	                _react2.default.createElement(
	                  'label',
	                  { className: 'col-sm-4 control-label' },
	                  'Strap Type'
	                ),
	                _react2.default.createElement(
	                  'div',
	                  { className: 'col-sm-7' },
	                  _react2.default.createElement(_reactSelect2.default, { multi: true, simpleValue: true, value: this.state.strapTypeValue,
	                    placeholder: 'Select your Strap Type',
	                    options: dataDropDowntStrapType,
	                    onChange: this.handleStrapTypeSelectChange })
	                )
	              ),
	              _react2.default.createElement(
	                'div',
	                { className: 'form-group' },
	                _react2.default.createElement(
	                  'label',
	                  { className: 'col-sm-4 control-label' },
	                  'Strap Color'
	                ),
	                _react2.default.createElement(
	                  'div',
	                  { className: 'col-sm-7' },
	                  _react2.default.createElement(_reactSelect2.default, { multi: true, simpleValue: true, value: this.state.strapColorValue,
	                    placeholder: 'Select your Strap Color',
	                    options: dataDropDowntStrapColor,
	                    onChange: this.handleStrapColorSelectChange })
	                )
	              ),
	              _react2.default.createElement(
	                'div',
	                { className: 'form-group' },
	                _react2.default.createElement(
	                  'label',
	                  { className: 'col-sm-4 control-label' },
	                  'Complication'
	                ),
	                _react2.default.createElement(
	                  'div',
	                  { className: 'col-sm-7' },
	                  _react2.default.createElement(_reactSelect2.default, { multi: true, simpleValue: true, value: this.state.complicationValue,
	                    placeholder: 'Select your Complication',
	                    options: dataDropDowntComplication,
	                    onChange: this.handleComplicationSelectChange })
	                )
	              )
	            )
	          )
	        )
	      );
	    }
	  }]);

	  return InventoryWatchFilter;
	}(_react.Component);

	function mapStateToProps(state) {
	  // console.log('state.users.options-->',state.users.options);
	  return {
	    options: state.users.options
	  };
	}
	function mapDispatchToProps(dispatch) {
	  return {
	    optionsActions: (0, _redux.bindActionCreators)(Object.assign({}, masterDataActions), dispatch)
	  };
	}
	InventoryWatchFilter.propTypes = {
	  watchProductHierarchy: _react.PropTypes.object.isRequired,
	  watchCategory: _react.PropTypes.object.isRequired,
	  collection: _react.PropTypes.object.isRequired,
	  brand: _react.PropTypes.object.isRequired,
	  mustHave: _react.PropTypes.object.isRequired,
	  metalType: _react.PropTypes.object.isRequired,
	  metalColour: _react.PropTypes.object.isRequired,
	  dominantStone: _react.PropTypes.object.isRequired,
	  limitedEdition: _react.PropTypes.object.isRequired,
	  limitedEditionNumber: _react.PropTypes.object.isRequired,
	  serialNumber: _react.PropTypes.object.isRequired,
	  movement: _react.PropTypes.object.isRequired,
	  totalCostFrom: _react.PropTypes.object.isRequired,
	  totalCostTo: _react.PropTypes.object.isRequired,
	  totalUpdatedCostFrom: _react.PropTypes.object.isRequired,
	  totalUpdatedCostTo: _react.PropTypes.object.isRequired,
	  publicPriceFrom: _react.PropTypes.object.isRequired,
	  publicPriceTo: _react.PropTypes.object.isRequired,
	  markupFrom: _react.PropTypes.object.isRequired,
	  markupTo: _react.PropTypes.object.isRequired,
	  grossWeightFrom: _react.PropTypes.object.isRequired,
	  grossWeightTo: _react.PropTypes.object.isRequired,
	  proDateFrom: _react.PropTypes.object.isRequired,
	  proDateTo: _react.PropTypes.object.isRequired,
	  caseDimensionFrom: _react.PropTypes.object.isRequired,
	  caseDimensionTo: _react.PropTypes.object.isRequired,
	  preciousMetalWeightFrom: _react.PropTypes.object.isRequired,
	  preciousMetalWeightTo: _react.PropTypes.object.isRequired,
	  dialIndex: _react.PropTypes.object.isRequired,
	  dialColor: _react.PropTypes.object.isRequired,
	  dialMetal: _react.PropTypes.object.isRequired,
	  buckleType: _react.PropTypes.object.isRequired,
	  strapType: _react.PropTypes.object.isRequired,
	  strapColor: _react.PropTypes.object.isRequired,
	  complication: _react.PropTypes.object.isRequired
	};
	module.exports = (0, _reduxForm.reduxForm)({
	  form: 'Inventory',
	  fields: []
	}, mapStateToProps, mapDispatchToProps)(InventoryWatchFilter);

/***/ },

/***/ 1081:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(159);

	var _reduxForm = __webpack_require__(852);

	var _redux = __webpack_require__(166);

	var _masterdataaction = __webpack_require__(899);

	var masterDataActions = _interopRequireWildcard(_masterdataaction);

	var _reactSelect = __webpack_require__(952);

	var _reactSelect2 = _interopRequireDefault(_reactSelect);

	var _reactSelectBox = __webpack_require__(960);

	var _reactSelectBox2 = _interopRequireDefault(_reactSelectBox);

	var _reformoptiongroup = __webpack_require__(961);

	var _reformoptiongroup2 = _interopRequireDefault(_reformoptiongroup);

	var _moment = __webpack_require__(963);

	var _moment2 = _interopRequireDefault(_moment);

	var _reactAddonsShallowCompare = __webpack_require__(897);

	var _reactAddonsShallowCompare2 = _interopRequireDefault(_reactAddonsShallowCompare);

	var _reactInputCalendar = __webpack_require__(1066);

	var _reactInputCalendar2 = _interopRequireDefault(_reactInputCalendar);

	var _PureInput = __webpack_require__(958);

	var _PureInput2 = _interopRequireDefault(_PureInput);

	var _Tree = __webpack_require__(1076);

	var _Tree2 = _interopRequireDefault(_Tree);

	var _TreeNode = __webpack_require__(1077);

	var _TreeNode2 = _interopRequireDefault(_TreeNode);

	var _TreeData = __webpack_require__(1078);

	var _TreeData2 = _interopRequireDefault(_TreeData);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	//test


	var InventoryGemStoneFilter = function (_Component) {
	  _inherits(InventoryGemStoneFilter, _Component);

	  function InventoryGemStoneFilter(props) {
	    _classCallCheck(this, InventoryGemStoneFilter);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(InventoryGemStoneFilter).call(this, props));

	    var dateToday = new Date();
	    var fromdate = dateToday.getMonth() + 1 + '-' + dateToday.getDate() + '-' + dateToday.getFullYear();
	    _this.handleStoneTypeSelectChange = _this.handleStoneTypeSelectChange.bind(_this);
	    _this.handleCutSelectChange = _this.handleCutSelectChange.bind(_this);
	    _this.handleCutGradeSelectChange = _this.handleCutGradeSelectChange.bind(_this);
	    _this.handleColorSelectChange = _this.handleColorSelectChange.bind(_this);
	    _this.handleClaritiesSelectChange = _this.handleClaritiesSelectChange.bind(_this);
	    _this.handleCertificateAgencySelectChange = _this.handleCertificateAgencySelectChange.bind(_this);
	    _this.handleChangeStart = _this.handleChangeStart.bind(_this);
	    _this.handleChangeEnd = _this.handleChangeEnd.bind(_this);
	    _this.handleOriginSelectChange = _this.handleOriginSelectChange.bind(_this);
	    _this.handlePolishSelectChange = _this.handlePolishSelectChange.bind(_this);
	    _this.handleSymmetrySelectChange = _this.handleSymmetrySelectChange.bind(_this);
	    _this.handleTreatmentSelectChange = _this.handleTreatmentSelectChange.bind(_this);
	    _this.handleFluorescenceSelectChange = _this.handleFluorescenceSelectChange.bind(_this);
	    // console.log('moment-->',moment());
	    _this.state = {
	      colors: [],
	      data: _TreeData2.default,
	      StoneTypeValue: [],
	      CutValue: [],
	      CutGradeValue: [],
	      ColorValue: [],
	      ClarityValue: [],
	      startDate: null,
	      endDate: null,
	      PolishValue: [],
	      SymmetryValue: [],
	      TreatmentValue: [],
	      FluorescenceValue: [],
	      OriginValue: [],
	      CertificateAgencyValue: []
	    };
	    return _this;
	  }

	  _createClass(InventoryGemStoneFilter, [{
	    key: 'componentWillMount',
	    value: function componentWillMount() {
	      // console.log('componentWillMount-->');
	      this.props.optionsActions.get();
	    }
	    // shouldComponentUpdate(nextProps) {
	    //   // console.log('nextProps-->',nextProps)
	    //   return this.props.stoneCostFrom !== nextProps.stoneCostFrom
	    //     || this.props.stoneCostTo !== nextProps.stoneCostTo
	    //     || this.props.totalCaratWeightFrom !== nextProps.totalCaratWeightFrom
	    //     || this.props.totalCaratWeightTo !== nextProps.totalCaratWeightTo
	    //     || this.props.quantityFrom !== nextProps.quantityFrom
	    //     || this.props.quantityTo !== nextProps.quantityTo
	    //     || this.props.certificateNumber !== nextProps.certificateNumber
	    // }

	  }, {
	    key: 'shouldComponentUpdate',
	    value: function shouldComponentUpdate(nextProps, nextState) {
	      return (0, _reactAddonsShallowCompare2.default)(this, nextProps, nextState);
	    }
	  }, {
	    key: 'handleStoneTypeSelectChange',
	    value: function handleStoneTypeSelectChange(StoneTypeValue) {
	      // console.log('StoneTypeValue-->',StoneTypeValue);
	      var stonetype = this.props.stonetype;

	      stonetype.onChange(StoneTypeValue);
	      this.setState({ StoneTypeValue: StoneTypeValue });
	    }
	  }, {
	    key: 'handleCutSelectChange',
	    value: function handleCutSelectChange(CutValue) {
	      var cut = this.props.cut;

	      cut.onChange(CutValue);
	      this.setState({ CutValue: CutValue });
	    }
	  }, {
	    key: 'handleCutGradeSelectChange',
	    value: function handleCutGradeSelectChange(CutGradeValue) {
	      // console.log('CutGradeValue-->',CutGradeValue);
	      var cutGrade = this.props.cutGrade;

	      cutGrade.onChange(CutGradeValue);
	      this.setState({ CutGradeValue: CutGradeValue });
	    }
	  }, {
	    key: 'handleColorSelectChange',
	    value: function handleColorSelectChange(ColorValue) {
	      var color = this.props.color;

	      color.onChange(ColorValue);
	      this.setState({ ColorValue: ColorValue });
	    }
	  }, {
	    key: 'handleClaritiesSelectChange',
	    value: function handleClaritiesSelectChange(ClarityValue) {
	      // console.log('ColorGradeValue-->',ColorGradeValue);
	      var clarity = this.props.clarity;

	      clarity.onChange(ClarityValue);
	      this.setState({ ClarityValue: ClarityValue });
	    }
	  }, {
	    key: 'handleChangeDate',
	    value: function handleChangeDate(_ref) {
	      var startDate = _ref.startDate;
	      var endDate = _ref.endDate;

	      // console.log('startDate-->',startDate)
	      // console.log('endDate-->',endDate)
	      // console.log('this.state.startDate-->',this.state.startDate)
	      // console.log('this.state.endDate-->',this.state.endDate)
	      var startDateM = typeof startDate !== 'undefined' ? (0, _moment2.default)(startDate, 'MM-DD-YYYY') : (0, _moment2.default)(this.state.startDate, 'MM-DD-YYYY');
	      var endDateM = typeof endDate !== 'undefined' ? (0, _moment2.default)(endDate, 'MM-DD-YYYY') : (0, _moment2.default)(this.state.endDate, 'MM-DD-YYYY');

	      if (startDateM.isAfter(endDateM)) {
	        var temp = startDate || this.state.startDate;
	        startDate = endDate || this.state.endDate;
	        endDate = temp;
	      }

	      this.setState({ startDate: startDate, endDate: endDate });
	    }
	  }, {
	    key: 'handleChangeStart',
	    value: function handleChangeStart(startDate) {
	      // console.log('handleChangeStart-->',startDate);
	      var cerDateFrom = this.props.cerDateFrom;

	      cerDateFrom.onChange(startDate);
	      this.setState({ startDate: startDate });
	      this.handleChangeDate({ startDate: startDate });
	      // this.render();
	    }
	  }, {
	    key: 'handleChangeEnd',
	    value: function handleChangeEnd(endDate) {
	      var cerDateTo = this.props.cerDateTo;

	      cerDateTo.onChange(endDate);
	      this.setState({ endDate: endDate });
	      this.handleChangeDate({ endDate: endDate });
	    }
	  }, {
	    key: 'handlePolishSelectChange',
	    value: function handlePolishSelectChange(PolishValue) {
	      // console.log('ColorGradeValue-->',ColorGradeValue);
	      var polish = this.props.polish;

	      polish.onChange(PolishValue);
	      this.setState({ PolishValue: PolishValue });
	    }
	  }, {
	    key: 'handleSymmetrySelectChange',
	    value: function handleSymmetrySelectChange(SymmetryValue) {
	      // console.log('ColorGradeValue-->',ColorGradeValue);
	      var symmetry = this.props.symmetry;

	      symmetry.onChange(SymmetryValue);
	      this.setState({ SymmetryValue: SymmetryValue });
	    }
	  }, {
	    key: 'handleTreatmentSelectChange',
	    value: function handleTreatmentSelectChange(TreatmentValue) {
	      // console.log('ColorGradeValue-->',ColorGradeValue);
	      var treatment = this.props.treatment;

	      treatment.onChange(TreatmentValue);
	      this.setState({ TreatmentValue: TreatmentValue });
	    }
	  }, {
	    key: 'handleFluorescenceSelectChange',
	    value: function handleFluorescenceSelectChange(FluorescenceValue) {
	      // console.log('ColorGradeValue-->',ColorGradeValue);
	      var fluorescence = this.props.fluorescence;

	      fluorescence.onChange(FluorescenceValue);
	      this.setState({ FluorescenceValue: FluorescenceValue });
	    }
	  }, {
	    key: 'handleOriginSelectChange',
	    value: function handleOriginSelectChange(OriginValue) {
	      // console.log('ColorGradeValue-->',ColorGradeValue);
	      var origin = this.props.origin;

	      origin.onChange(OriginValue);
	      this.setState({ OriginValue: OriginValue });
	    }
	  }, {
	    key: 'handleCertificateAgencySelectChange',
	    value: function handleCertificateAgencySelectChange(CertificateAgencyValue) {
	      // console.log('ColorGradeValue-->',ColorGradeValue);
	      var certificateAgency = this.props.certificateAgency;

	      certificateAgency.onChange(CertificateAgencyValue);
	      this.setState({ CertificateAgencyValue: CertificateAgencyValue });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _props = this.props;
	      var stoneCostFrom = _props.stoneCostFrom;
	      var stoneCostTo = _props.stoneCostTo;
	      var totalCaratWeightFrom = _props.totalCaratWeightFrom;
	      var totalCaratWeightTo = _props.totalCaratWeightTo;
	      var quantityFrom = _props.quantityFrom;
	      var quantityTo = _props.quantityTo;
	      var certificateNumber = _props.certificateNumber;
	      var resetForm = _props.resetForm;
	      var submitting = _props.submitting;

	      var dataDropDowntStoneType = [];
	      var dataDropDowntCut = [];
	      var dataDropDowntCutGrade = [];
	      var dataDropDowntColor = [];
	      var dataDropDowntClarity = [];
	      var dataDropDowntPolish = [];
	      var dataDropDowntSymmetry = [];
	      var dataDropDowntTreatment = [];
	      var dataDropDowntFluorescence = [];
	      var dataDropDowntOrigin = [];
	      var dataDropDowntCertificateAgency = [];

	      if (this.props.options.stoneType) {
	        dataDropDowntStoneType.push(this.props.options.stoneType.map(function (stoneType) {
	          return { value: stoneType.id, label: stoneType.name };
	        }));
	        dataDropDowntStoneType = dataDropDowntStoneType[0];
	      }
	      if (this.props.options.cutShape) {
	        dataDropDowntCut.push(this.props.options.cutShape.map(function (cutShape) {
	          return { value: cutShape.id, label: cutShape.name };
	        }));
	        dataDropDowntCut = dataDropDowntCut[0];
	      }
	      if (this.props.options.cutGrades) {
	        dataDropDowntCutGrade.push(this.props.options.cutGrades.map(function (cutGrade) {
	          return { value: cutGrade.id, label: cutGrade.name };
	        }));
	        dataDropDowntCutGrade = dataDropDowntCutGrade[0];
	      }
	      if (this.props.options.colors) {
	        dataDropDowntColor.push(this.props.options.colors.map(function (color) {
	          return { value: color.id, label: color.name };
	        }));
	        dataDropDowntColor = dataDropDowntColor[0];
	      }

	      if (this.props.options.clarities) {
	        dataDropDowntClarity.push(this.props.options.clarities.map(function (clarity) {
	          return { value: clarity.id, label: clarity.name };
	        }));
	        dataDropDowntClarity = dataDropDowntClarity[0];
	      }

	      if (this.props.options.polishs) {
	        dataDropDowntPolish.push(this.props.options.polishs.map(function (polish) {
	          return { value: polish.id, label: polish.name };
	        }));
	        dataDropDowntPolish = dataDropDowntPolish[0];
	      }
	      if (this.props.options.symmetries) {
	        dataDropDowntSymmetry.push(this.props.options.symmetries.map(function (symmetry) {
	          return { value: symmetry.id, label: symmetry.name };
	        }));
	        dataDropDowntSymmetry = dataDropDowntSymmetry[0];
	      }
	      if (this.props.options.treatments) {
	        dataDropDowntTreatment.push(this.props.options.treatments.map(function (treatment) {
	          return { value: treatment.id, label: treatment.name };
	        }));
	        dataDropDowntTreatment = dataDropDowntTreatment[0];
	      }
	      if (this.props.options.fluorescences) {
	        dataDropDowntFluorescence.push(this.props.options.fluorescences.map(function (fluorescence) {
	          return { value: fluorescence.id, label: fluorescence.name };
	        }));
	        dataDropDowntFluorescence = dataDropDowntFluorescence[0];
	      }
	      if (this.props.options.origins) {
	        dataDropDowntOrigin.push(this.props.options.origins.map(function (origin) {
	          return { value: origin.id, label: origin.name };
	        }));
	        dataDropDowntOrigin = dataDropDowntOrigin[0];
	      }
	      if (this.props.options.certificateAgencys) {
	        dataDropDowntCertificateAgency.push(this.props.options.certificateAgencys.map(function (certificateAgency) {
	          return { value: certificateAgency.id, label: certificateAgency.name };
	        }));
	        dataDropDowntCertificateAgency = dataDropDowntCertificateAgency[0];
	      }
	      return _react2.default.createElement(
	        'div',
	        { className: 'maring-t30' },
	        _react2.default.createElement(
	          'div',
	          { className: 'row margin-ft' },
	          _react2.default.createElement(
	            'div',
	            { className: 'col-lg-6 form-horizontal' },
	            _react2.default.createElement(
	              'div',
	              { className: 'form-group' },
	              _react2.default.createElement(
	                'label',
	                { className: 'col-sm-4 control-label' },
	                'Stone Type'
	              ),
	              _react2.default.createElement(
	                'div',
	                { className: 'col-sm-7' },
	                _react2.default.createElement(_reactSelect2.default, { multi: true, simpleValue: true, value: this.state.StoneTypeValue,
	                  placeholder: 'Select your Stone Type',
	                  options: dataDropDowntStoneType,
	                  onChange: this.handleStoneTypeSelectChange })
	              )
	            ),
	            _react2.default.createElement(
	              'div',
	              { className: 'form-group' },
	              _react2.default.createElement(
	                'label',
	                { className: 'col-sm-4 control-label' },
	                'Cut'
	              ),
	              _react2.default.createElement(
	                'div',
	                { className: 'col-sm-7' },
	                _react2.default.createElement(_reactSelect2.default, { multi: true, simpleValue: true, value: this.state.CutValue,
	                  placeholder: 'Select your Cut',
	                  options: dataDropDowntCut,
	                  onChange: this.handleCutSelectChange })
	              )
	            ),
	            _react2.default.createElement(
	              'div',
	              { className: 'form-group' },
	              _react2.default.createElement(
	                'label',
	                { className: 'col-sm-4 control-label' },
	                'Cut Grade'
	              ),
	              _react2.default.createElement(
	                'div',
	                { className: 'col-sm-7' },
	                _react2.default.createElement(_reactSelect2.default, { multi: true, simpleValue: true, value: this.state.CutGradeValue,
	                  placeholder: 'Select your Cut Grade',
	                  options: dataDropDowntCutGrade,
	                  onChange: this.handleCutGradeSelectChange })
	              )
	            ),
	            _react2.default.createElement(
	              'div',
	              { className: 'form-group' },
	              _react2.default.createElement(
	                'label',
	                { className: 'col-sm-4 control-label' },
	                'Color'
	              ),
	              _react2.default.createElement(
	                'div',
	                { className: 'col-sm-7' },
	                _react2.default.createElement(_reactSelect2.default, { multi: true, simpleValue: true, value: this.state.ColorValue,
	                  placeholder: 'Select your Color',
	                  options: dataDropDowntColor,
	                  onChange: this.handleColorSelectChange })
	              )
	            ),
	            _react2.default.createElement(
	              'div',
	              { className: 'form-group' },
	              _react2.default.createElement(
	                'label',
	                { className: 'col-sm-4 control-label' },
	                'Clarity'
	              ),
	              _react2.default.createElement(
	                'div',
	                { className: 'col-sm-7' },
	                _react2.default.createElement(_reactSelect2.default, { multi: true, simpleValue: true, value: this.state.ClarityValue,
	                  placeholder: 'Select your Clarity',
	                  options: dataDropDowntClarity,
	                  onChange: this.handleClaritiesSelectChange })
	              )
	            ),
	            _react2.default.createElement(
	              'div',
	              { className: 'form-group' },
	              _react2.default.createElement(
	                'label',
	                { className: 'col-sm-4 control-label' },
	                'Certificate Number'
	              ),
	              _react2.default.createElement(
	                'div',
	                { className: 'col-sm-7' },
	                _react2.default.createElement(_PureInput2.default, { type: 'text', className: 'form-control', field: certificateNumber })
	              )
	            ),
	            _react2.default.createElement(
	              'div',
	              { className: 'form-group' },
	              _react2.default.createElement(
	                'label',
	                { className: 'col-sm-4 control-label' },
	                'Certificate Agency'
	              ),
	              _react2.default.createElement(
	                'div',
	                { className: 'col-sm-7' },
	                _react2.default.createElement(_reactSelect2.default, { multi: true, simpleValue: true, value: this.state.CertificateAgencyValue,
	                  placeholder: 'Select your Certificate Agency',
	                  options: dataDropDowntCertificateAgency,
	                  onChange: this.handleCertificateAgencySelectChange })
	              )
	            ),
	            _react2.default.createElement(
	              'div',
	              { className: 'form-group' },
	              _react2.default.createElement(
	                'label',
	                { className: 'col-sm-4 control-label' },
	                'Certificate Date'
	              ),
	              _react2.default.createElement(
	                'div',
	                { className: 'col-sm-7' },
	                _react2.default.createElement(
	                  'label',
	                  { className: 'col-sm-2 padding-l font-nor' },
	                  'From: '
	                ),
	                _react2.default.createElement(
	                  'div',
	                  { className: 'col-sm-10 nopadding' },
	                  _react2.default.createElement(_reactInputCalendar2.default, {
	                    format: 'MM-DD-YYYY',
	                    date: this.state.startDate,
	                    minDate: this.state.startDate,
	                    maxDate: this.state.endDate,
	                    closeOnSelect: true,
	                    onChange: this.handleChangeStart
	                  })
	                ),
	                _react2.default.createElement(
	                  'label',
	                  { className: 'col-sm-2 control-label padding-l font-nor m-margin-t10 m-nopadding' },
	                  'To: '
	                ),
	                _react2.default.createElement(
	                  'div',
	                  { className: 'col-sm-10 nopadding' },
	                  _react2.default.createElement(_reactInputCalendar2.default, {
	                    format: 'MM-DD-YYYY',
	                    date: this.state.endDate,
	                    minDate: this.state.startDate,
	                    maxDate: this.state.endDate,
	                    closeOnSelect: true,
	                    onChange: this.handleChangeEnd
	                  })
	                )
	              )
	            )
	          ),
	          _react2.default.createElement(
	            'div',
	            { className: 'col-lg-6 form-horizontal' },
	            _react2.default.createElement(
	              'div',
	              { className: 'form-group' },
	              _react2.default.createElement(
	                'label',
	                { className: 'col-sm-4 control-label' },
	                'Stone Cost (USD)'
	              ),
	              _react2.default.createElement(
	                'div',
	                { className: 'col-sm-7' },
	                _react2.default.createElement(
	                  'label',
	                  { className: 'col-sm-2 control-label padding-l font-nor' },
	                  'From: '
	                ),
	                _react2.default.createElement(
	                  'div',
	                  { className: 'col-sm-4 nopadding' },
	                  _react2.default.createElement(_PureInput2.default, { type: 'text', className: 'form-control', field: stoneCostFrom })
	                ),
	                _react2.default.createElement(
	                  'label',
	                  { className: 'col-sm-2 control-label font-nor m-margin-t10 m-nopadding' },
	                  'To: '
	                ),
	                _react2.default.createElement(
	                  'div',
	                  { className: 'col-sm-4 nopadding' },
	                  _react2.default.createElement(_PureInput2.default, { type: 'text', className: 'form-control', field: stoneCostTo })
	                )
	              )
	            ),
	            _react2.default.createElement(
	              'div',
	              { className: 'form-group' },
	              _react2.default.createElement(
	                'label',
	                { className: 'col-sm-4 control-label' },
	                'Quantity of Stone(s)'
	              ),
	              _react2.default.createElement(
	                'div',
	                { className: 'col-sm-7' },
	                _react2.default.createElement(
	                  'label',
	                  { className: 'col-sm-2 control-label padding-l font-nor' },
	                  'From: '
	                ),
	                _react2.default.createElement(
	                  'div',
	                  { className: 'col-sm-4 nopadding' },
	                  _react2.default.createElement(_PureInput2.default, { type: 'text', className: 'form-control', field: quantityFrom })
	                ),
	                _react2.default.createElement(
	                  'label',
	                  { className: 'col-sm-2 control-label font-nor m-margin-t10 m-nopadding' },
	                  'To: '
	                ),
	                _react2.default.createElement(
	                  'div',
	                  { className: 'col-sm-4 nopadding' },
	                  _react2.default.createElement(_PureInput2.default, { type: 'text', className: 'form-control', field: quantityTo })
	                )
	              )
	            ),
	            _react2.default.createElement(
	              'div',
	              { className: 'form-group' },
	              _react2.default.createElement(
	                'label',
	                { className: 'col-sm-4 control-label' },
	                'Total Carat Weight'
	              ),
	              _react2.default.createElement(
	                'div',
	                { className: 'col-sm-7' },
	                _react2.default.createElement(
	                  'label',
	                  { className: 'col-sm-2 control-label padding-l font-nor' },
	                  'From: '
	                ),
	                _react2.default.createElement(
	                  'div',
	                  { className: 'col-sm-4 nopadding' },
	                  _react2.default.createElement(_PureInput2.default, { type: 'text', className: 'form-control', field: totalCaratWeightFrom })
	                ),
	                _react2.default.createElement(
	                  'label',
	                  { className: 'col-sm-2 control-label font-nor m-margin-t10 m-nopadding' },
	                  'To: '
	                ),
	                _react2.default.createElement(
	                  'div',
	                  { className: 'col-sm-4 nopadding' },
	                  _react2.default.createElement(_PureInput2.default, { type: 'text', className: 'form-control', field: totalCaratWeightTo })
	                )
	              )
	            ),
	            _react2.default.createElement(
	              'div',
	              { className: 'form-group' },
	              _react2.default.createElement(
	                'label',
	                { className: 'col-sm-4 control-label' },
	                'Origin'
	              ),
	              _react2.default.createElement(
	                'div',
	                { className: 'col-sm-7' },
	                _react2.default.createElement(_reactSelect2.default, { multi: true, simpleValue: true, value: this.state.OriginValue,
	                  placeholder: 'Select your Origin',
	                  options: dataDropDowntOrigin,
	                  onChange: this.handleOriginSelectChange })
	              )
	            ),
	            _react2.default.createElement(
	              'div',
	              { className: 'form-group' },
	              _react2.default.createElement(
	                'label',
	                { className: 'col-sm-4 control-label' },
	                'Polish'
	              ),
	              _react2.default.createElement(
	                'div',
	                { className: 'col-sm-7' },
	                _react2.default.createElement(_reactSelect2.default, { multi: true, simpleValue: true, value: this.state.PolishValue,
	                  placeholder: 'Select your Polish',
	                  options: dataDropDowntPolish,
	                  onChange: this.handlePolishSelectChange })
	              )
	            ),
	            _react2.default.createElement(
	              'div',
	              { className: 'form-group' },
	              _react2.default.createElement(
	                'label',
	                { className: 'col-sm-4 control-label' },
	                'Symmetry'
	              ),
	              _react2.default.createElement(
	                'div',
	                { className: 'col-sm-7' },
	                _react2.default.createElement(_reactSelect2.default, { multi: true, simpleValue: true, value: this.state.SymmetryValue,
	                  placeholder: 'Select your Symmetry',
	                  options: dataDropDowntSymmetry,
	                  onChange: this.handleSymmetrySelectChange })
	              )
	            ),
	            _react2.default.createElement(
	              'div',
	              { className: 'form-group' },
	              _react2.default.createElement(
	                'label',
	                { className: 'col-sm-4 control-label' },
	                'Treatment'
	              ),
	              _react2.default.createElement(
	                'div',
	                { className: 'col-sm-7' },
	                _react2.default.createElement(_reactSelect2.default, { multi: true, simpleValue: true, value: this.state.TreatmentValue,
	                  placeholder: 'Select your Treatment',
	                  options: dataDropDowntTreatment,
	                  onChange: this.handleTreatmentSelectChange })
	              )
	            ),
	            _react2.default.createElement(
	              'div',
	              { className: 'form-group' },
	              _react2.default.createElement(
	                'label',
	                { className: 'col-sm-4 control-label' },
	                'Fluorescence'
	              ),
	              _react2.default.createElement(
	                'div',
	                { className: 'col-sm-7' },
	                _react2.default.createElement(_reactSelect2.default, { multi: true, simpleValue: true, value: this.state.FluorescenceValue,
	                  placeholder: 'Select your Fluorescence',
	                  options: dataDropDowntFluorescence,
	                  onChange: this.handleFluorescenceSelectChange })
	              )
	            )
	          )
	        )
	      );
	    }
	  }]);

	  return InventoryGemStoneFilter;
	}(_react.Component);

	function mapStateToProps(state) {
	  // console.log('state.users.options-->',state.users.options);
	  return {
	    options: state.users.options
	  };
	}
	function mapDispatchToProps(dispatch) {
	  return {
	    optionsActions: (0, _redux.bindActionCreators)(Object.assign({}, masterDataActions), dispatch)
	  };
	}
	InventoryGemStoneFilter.propTypes = {
	  stonetype: _react.PropTypes.object.isRequired,
	  cut: _react.PropTypes.object.isRequired,
	  cutGrade: _react.PropTypes.object.isRequired,
	  color: _react.PropTypes.object.isRequired,
	  clarity: _react.PropTypes.object.isRequired,
	  stoneCostFrom: _react.PropTypes.object.isRequired,
	  stoneCostTo: _react.PropTypes.object.isRequired,
	  totalCaratWeightFrom: _react.PropTypes.object.isRequired,
	  totalCaratWeightTo: _react.PropTypes.object.isRequired,
	  quantityFrom: _react.PropTypes.object.isRequired,
	  quantityTo: _react.PropTypes.object.isRequired,
	  certificateNumber: _react.PropTypes.object.isRequired,
	  cerDateFrom: _react.PropTypes.object.isRequired,
	  cerDateTo: _react.PropTypes.object.isRequired,
	  polish: _react.PropTypes.object.isRequired,
	  symmetry: _react.PropTypes.object.isRequired,
	  treatment: _react.PropTypes.object.isRequired,
	  fluorescence: _react.PropTypes.object.isRequired,
	  origin: _react.PropTypes.object.isRequired,
	  certificateAgency: _react.PropTypes.object.isRequired
	};
	module.exports = (0, _reduxForm.reduxForm)({
	  form: 'GemStoneFilter',
	  fields: []
	}, mapStateToProps, mapDispatchToProps)(InventoryGemStoneFilter);

/***/ }

});