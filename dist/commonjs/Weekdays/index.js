'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

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

var _reactAddonsShallowCompare = require('react-addons-shallow-compare');

var _reactAddonsShallowCompare2 = _interopRequireDefault(_reactAddonsShallowCompare);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _range = require('lodash/range');

var _range2 = _interopRequireDefault(_range);

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var style = {
	'root': 'Cal__Weekdays__root',
	'day': 'Cal__Weekdays__day'
};

var Weekdays = function (_Component) {
	(0, _inherits3.default)(Weekdays, _Component);

	function Weekdays() {
		(0, _classCallCheck3.default)(this, Weekdays);
		return (0, _possibleConstructorReturn3.default)(this, (Weekdays.__proto__ || (0, _getPrototypeOf2.default)(Weekdays)).apply(this, arguments));
	}

	(0, _createClass3.default)(Weekdays, [{
		key: 'shouldComponentUpdate',
		value: function shouldComponentUpdate(nextProps) {
			return (0, _reactAddonsShallowCompare2.default)(this, nextProps);
		}
	}, {
		key: 'render',
		value: function render() {
			var _props = this.props;
			var format = _props.format;
			var theme = _props.theme;

			var textColor = theme.weekDay ? theme.weekDay.textColor : theme.textColor.active;

			return _react2.default.createElement(
				'ul',
				{ className: style.root, style: { backgroundColor: theme.weekdayColor, color: textColor, paddingRight: _utils.scrollbarSize }, 'aria-hidden': true },
				(0, _range2.default)(0, 7).map(function (val, index) {
					return _react2.default.createElement(
						'li',
						{ key: 'Weekday-' + index, className: style.day },
						(0, _moment2.default)().weekday(index).format(format || 'ddd')
					);
				})
			);
		}
	}]);
	return Weekdays;
}(_react.Component);

Weekdays.propTypes = {
	locale: _react.PropTypes.object,
	format: _react.PropTypes.string,
	theme: _react.PropTypes.object
};
exports.default = Weekdays;