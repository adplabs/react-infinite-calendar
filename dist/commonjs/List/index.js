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

var _reactVirtualized = require('react-virtualized');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _utils = require('../utils');

var _Month = require('../Month');

var _Month2 = _interopRequireDefault(_Month);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var style = {
	'root': 'Cal__List__root',
	'scrolling': 'Cal__List__scrolling'
};

var List = function (_Component) {
	(0, _inherits3.default)(List, _Component);

	function List() {
		var _ref;

		var _temp, _this, _ret;

		(0, _classCallCheck3.default)(this, List);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = List.__proto__ || (0, _getPrototypeOf2.default)(List)).call.apply(_ref, [this].concat(args))), _this), _this.cache = {}, _this.state = {}, _this.memoize = function (param) {
			if (!this.cache[param]) {
				var result = (0, _utils.getMonth)(param); //custom function
				this.cache[param] = result;
			}
			return this.cache[param];
		}, _this.monthHeights = [], _this.getMonthHeight = function (_ref2) {
			var index = _ref2.index;

			if (!_this.monthHeights[index]) {
				var _this$props = _this.props;
				var locale = _this$props.locale;
				var months = _this$props.months;
				var rowHeight = _this$props.rowHeight;

				var date = months[index];
				var weeks = (0, _utils.getWeeksInMonth)(date, locale);
				var height = weeks * rowHeight;
				_this.monthHeights[index] = height;
			}

			return _this.monthHeights[index];
		}, _this.getMonthIndex = function (date) {
			var min = _this.props.min.date;
			var index = date.diff(min, 'months');

			return index;
		}, _this.getDateOffset = function (date) {
			var _this$props2 = _this.props;
			var min = _this$props2.min;
			var rowHeight = _this$props2.rowHeight;

			var weeks = date.clone().startOf('month').diff(min.date.clone().startOf('month'), 'weeks');

			return weeks * rowHeight;
		}, _this.getCurrentOffset = function () {
			if (_this.scrollEl) {
				return _this.scrollEl.scrollTop;
			}
		}, _this.scrollToDate = function (date) {
			var offset = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

			var offsetTop = _this.getDateOffset(date);
			_this.scrollTo(offsetTop + offset);
		}, _this.scrollTo = function () {
			var scrollTop = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];

			if (_this.scrollEl) {
				_this.scrollEl.scrollTop = scrollTop;
			}
		}, _this.renderMonth = function (_ref3) {
			var index = _ref3.index;
			var isScrolling = _ref3.isScrolling;
			var _this$props3 = _this.props;
			var disabledDates = _this$props3.disabledDates;
			var disabledDays = _this$props3.disabledDays;
			var locale = _this$props3.locale;
			var months = _this$props3.months;
			var maxDate = _this$props3.maxDate;
			var minDate = _this$props3.minDate;
			var onDaySelect = _this$props3.onDaySelect;
			var rowHeight = _this$props3.rowHeight;
			var selectedDate = _this$props3.selectedDate;
			var showOverlay = _this$props3.showOverlay;
			var theme = _this$props3.theme;
			var today = _this$props3.today;

			var _this$memoize = _this.memoize(months[index]);

			var date = _this$memoize.date;
			var rows = _this$memoize.rows;


			return _react2.default.createElement(_Month2.default, {
				key: 'Month-' + index,
				selectedDate: selectedDate,
				displayDate: date,
				disabledDates: disabledDates,
				disabledDays: disabledDays,
				maxDate: maxDate,
				minDate: minDate,
				onDaySelect: onDaySelect,
				rows: rows,
				rowHeight: rowHeight,
				isScrolling: isScrolling,
				showOverlay: showOverlay,
				today: today,
				theme: theme,
				locale: locale
			});
		}, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
	}

	(0, _createClass3.default)(List, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			var vs = this.refs.VirtualScroll;
			var grid = vs && vs.Grid;

			this.scrollEl = grid && grid._scrollingContainer;
		}
	}, {
		key: 'render',
		value: function render() {
			var _props = this.props;
			var height = _props.height;
			var isScrolling = _props.isScrolling;
			var onScroll = _props.onScroll;
			var overscanMonthCount = _props.overscanMonthCount;
			var months = _props.months;
			var rowHeight = _props.rowHeight;
			var selectedDate = _props.selectedDate;
			var today = _props.today;
			var width = _props.width;

			if (!this._initScrollTop) this._initScrollTop = this.getDateOffset(selectedDate && selectedDate.date || today.date);
			if (typeof width == 'string' && width.indexOf('%') !== -1) {
				width = window.innerWidth * parseInt(width.replace('%', ''), 10) / 100; // See https://github.com/bvaughn/react-virtualized/issues/229
			}

			return _react2.default.createElement(_reactVirtualized.VirtualScroll, {
				ref: 'VirtualScroll',
				width: width,
				height: height,
				rowCount: months.length,
				rowHeight: this.getMonthHeight,
				estimatedRowSize: rowHeight * 5,
				rowRenderer: this.renderMonth,
				onScroll: onScroll,
				scrollTop: this._initScrollTop,
				className: (0, _classnames2.default)(style.root, (0, _defineProperty3.default)({}, style.scrolling, isScrolling)),
				style: { lineHeight: rowHeight + 'px' },
				overscanRowCount: overscanMonthCount
			});
		}
	}]);
	return List;
}(_react.Component);

List.propTypes = {
	width: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string]),
	height: _react.PropTypes.number,
	rowHeight: _react.PropTypes.number,
	selectedDate: _react.PropTypes.object,
	disabledDates: _react.PropTypes.arrayOf(_react.PropTypes.string),
	disabledDays: _react.PropTypes.arrayOf(_react.PropTypes.number),
	months: _react.PropTypes.arrayOf(_react.PropTypes.object),
	onDaySelect: _react.PropTypes.func,
	onScroll: _react.PropTypes.func,
	overscanMonthCount: _react.PropTypes.number,
	isScrolling: _react.PropTypes.bool,
	today: _utils.validParsedDate,
	min: _utils.validParsedDate,
	minDate: _utils.validParsedDate,
	maxDate: _utils.validParsedDate,
	showOverlay: _react.PropTypes.bool,
	theme: _react.PropTypes.object,
	locale: _react.PropTypes.object
};
exports.default = List;