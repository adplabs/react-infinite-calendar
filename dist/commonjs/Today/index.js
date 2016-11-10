'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var style = {
	'root': 'Cal__Today__root',
	'show': 'Cal__Today__show',
	'chevron': 'Cal__Today__chevron',
	'chevronUp': 'Cal__Today__chevronUp',
	'chevronDown': 'Cal__Today__chevronDown'
};

var Today = function (_Component) {
	(0, _inherits3.default)(Today, _Component);

	function Today() {
		var _ref;

		var _temp, _this, _ret;

		(0, _classCallCheck3.default)(this, Today);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Today.__proto__ || (0, _getPrototypeOf2.default)(Today)).call.apply(_ref, [this].concat(args))), _this), _this.scrollToToday = function () {
			var scrollToDate = _this.props.scrollToDate;


			scrollToDate((0, _moment2.default)(), -40);
		}, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
	}

	(0, _createClass3.default)(Today, [{
		key: 'shouldComponentUpdate',
		value: function shouldComponentUpdate(nextProps) {
			var _props = this.props,
			    locale = _props.locale,
			    show = _props.show,
			    theme = _props.theme;

			return nextProps.locale !== locale || nextProps.show !== show || nextProps.theme !== theme;
		}
	}, {
		key: 'render',
		value: function render() {
			var _classNames;

			var _props2 = this.props,
			    locale = _props2.locale,
			    show = _props2.show,
			    theme = _props2.theme;

			return _react2.default.createElement(
				'div',
				{ className: (0, _classnames2.default)(style.root, (_classNames = {}, (0, _defineProperty3.default)(_classNames, style.show, show), (0, _defineProperty3.default)(_classNames, style.chevronUp, show === 1), (0, _defineProperty3.default)(_classNames, style.chevronDown, show === -1), _classNames)), style: { color: theme.floatingNav.color, backgroundColor: theme.floatingNav.background }, onClick: this.scrollToToday, ref: 'node' },
				_react2.default.createElement(
					'div',
					{ className: style.wrapper },
					locale.todayLabel.long,
					_react2.default.createElement('img', { className: style.chevron, width: '14', src: 'data:image/svg+xml;utf8,<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="512px" height="512px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"><path fill="' + (theme.floatingNav.chevron || theme.floatingNav.color) + '" d="M256,298.3L256,298.3L256,298.3l174.2-167.2c4.3-4.2,11.4-4.1,15.8,0.2l30.6,29.9c4.4,4.3,4.5,11.3,0.2,15.5L264.1,380.9 c-2.2,2.2-5.2,3.2-8.1,3c-3,0.1-5.9-0.9-8.1-3L35.2,176.7c-4.3-4.2-4.2-11.2,0.2-15.5L66,131.3c4.4-4.3,11.5-4.4,15.8-0.2L256,298.3 z"/></svg>' })
				)
			);
		}
	}]);
	return Today;
}(_react.Component);

Today.propTypes = {
	locale: _react.PropTypes.object,
	scrollToDate: _react.PropTypes.func,
	show: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.bool]),
	theme: _react.PropTypes.object
};
exports.default = Today;