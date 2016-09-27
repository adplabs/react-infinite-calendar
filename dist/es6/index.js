import _extends from 'babel-runtime/helpers/extends';
import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _Object$assign from 'babel-runtime/core-js/object/assign';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import moment from 'moment';
import debounce from 'lodash/debounce';
import range from 'lodash/range';
import { getScrollSpeed, getMonthsForYear, keyCodes, parseDate, validDate, validDisplay, validLayout } from './utils';
import defaultLocale from './locale';
import defaultTheme from './theme';
import Today from './Today';
import Header from './Header';
import List from './List';
import Weekdays from './Weekdays';
import Years from './Years';

var containerStyle = {
	'root': 'Cal__Container__root',
	'landscape': 'Cal__Container__landscape',
	'wrapper': 'Cal__Container__wrapper',
	'listWrapper': 'Cal__Container__listWrapper'
};
var dayStyle = {
	'root': 'Cal__Day__root',
	'enabled': 'Cal__Day__enabled',
	'highlighted': 'Cal__Day__highlighted',
	'today': 'Cal__Day__today',
	'disabled': 'Cal__Day__disabled',
	'selected': 'Cal__Day__selected',
	'month': 'Cal__Day__month',
	'year': 'Cal__Day__year',
	'selection': 'Cal__Day__selection',
	'day': 'Cal__Day__day'
};
var style = {
	container: containerStyle,
	day: dayStyle
};

var InfiniteCalendar = function (_Component) {
	_inherits(InfiniteCalendar, _Component);

	function InfiniteCalendar(props) {
		_classCallCheck(this, InfiniteCalendar);

		// Initialize
		var _this = _possibleConstructorReturn(this, (InfiniteCalendar.__proto__ || _Object$getPrototypeOf(InfiniteCalendar)).call(this));

		_this.onDaySelect = function (selectedDate, e) {
			var shouldHeaderAnimate = arguments.length <= 2 || arguments[2] === undefined ? _this.props.shouldHeaderAnimate : arguments[2];
			var _this$props = _this.props;
			var afterSelect = _this$props.afterSelect;
			var beforeSelect = _this$props.beforeSelect;
			var onSelect = _this$props.onSelect;


			if (!beforeSelect || typeof beforeSelect == 'function' && beforeSelect(selectedDate)) {
				if (typeof onSelect == 'function') {
					onSelect(selectedDate, e);
				}

				_this.setState({
					selectedDate: selectedDate,
					shouldHeaderAnimate: shouldHeaderAnimate,
					highlightedDate: selectedDate.clone()
				}, function () {
					_this.clearHighlight();
					if (typeof afterSelect == 'function') {
						afterSelect(selectedDate);
					}
				});
			}
		};

		_this.getCurrentOffset = function () {
			return _this.scrollTop;
		};

		_this.getDateOffset = function (date) {
			return _this.list && _this.list.getDateOffset(date);
		};

		_this.scrollTo = function (offset) {
			return _this.list && _this.list.scrollTo(offset);
		};

		_this.scrollToDate = function () {
			var date = arguments.length <= 0 || arguments[0] === undefined ? moment() : arguments[0];
			var offset = arguments[1];

			return _this.list && _this.list.scrollToDate(date, offset);
		};

		_this.getScrollSpeed = getScrollSpeed();

		_this.onScroll = function (_ref) {
			var scrollTop = _ref.scrollTop;
			var _this$props2 = _this.props;
			var onScroll = _this$props2.onScroll;
			var showOverlay = _this$props2.showOverlay;
			var showTodayHelper = _this$props2.showTodayHelper;
			var isScrolling = _this.state.isScrolling;

			var scrollSpeed = _this.scrollSpeed = Math.abs(_this.getScrollSpeed(scrollTop));
			_this.scrollTop = scrollTop;

			// We only want to display the months overlay if the user is rapidly scrolling
			if (showOverlay && scrollSpeed >= 50 && !isScrolling) {
				_this.setState({
					isScrolling: true
				});
			}

			if (showTodayHelper) {
				_this.updateTodayHelperPosition(scrollSpeed);
			}
			if (typeof onScroll == 'function') {
				onScroll(scrollTop);
			}
			_this.onScrollEnd();
		};

		_this.onScrollEnd = debounce(function () {
			var _this$props3 = _this.props;
			var onScrollEnd = _this$props3.onScrollEnd;
			var showTodayHelper = _this$props3.showTodayHelper;
			var isScrolling = _this.state.isScrolling;


			if (isScrolling) _this.setState({ isScrolling: false });
			if (showTodayHelper) _this.updateTodayHelperPosition(0);
			if (typeof onScrollEnd == 'function') onScrollEnd(_this.scrollTop);
		}, 150);

		_this.updateTodayHelperPosition = function (scrollSpeed) {
			var date = _this.today.date;
			if (!_this.todayOffset) _this.todayOffset = _this.getDateOffset(date); //scrollTop offset of the month "today" is in

			var scrollTop = _this.scrollTop;
			var showToday = _this.state.showToday;
			var _this$props4 = _this.props;
			var height = _this$props4.height;
			var rowHeight = _this$props4.rowHeight;
			var todayHelperRowOffset = _this$props4.todayHelperRowOffset;

			var newState = void 0;
			var dayOffset = Math.ceil((date.date() - 7 + moment(date).startOf("month").day()) / 7) * rowHeight; //offset of "today" within its month

			if (scrollTop >= _this.todayOffset + dayOffset + rowHeight * (todayHelperRowOffset + 1)) {
				if (showToday !== 1) newState = 1; //today is above the fold
			} else if (scrollTop + height <= _this.todayOffset + dayOffset + rowHeight - rowHeight * (todayHelperRowOffset + 1)) {
				if (showToday !== -1) newState = -1; //today is below the fold
			} else if (showToday && scrollSpeed <= 1) {
				newState = false;
			}

			if (scrollTop == 0) {
				newState = false;
			}

			if (newState != null) {
				_this.setState({ showToday: newState });
			}
		};

		_this.handleKeyDown = function (e) {
			var _this$props5 = _this.props;
			var maxDate = _this$props5.maxDate;
			var minDate = _this$props5.minDate;
			var onKeyDown = _this$props5.onKeyDown;
			var _this$state = _this.state;
			var display = _this$state.display;
			var selectedDate = _this$state.selectedDate;
			var highlightedDate = _this$state.highlightedDate;
			var showToday = _this$state.showToday;

			var delta = 0;

			if (typeof onKeyDown == 'function') {
				onKeyDown(e);
			}
			if ([keyCodes.left, keyCodes.up, keyCodes.right, keyCodes.down].indexOf(e.keyCode) > -1 && typeof e.preventDefault == 'function') {
				e.preventDefault();
			}

			if (!selectedDate) {
				selectedDate = moment();
			}

			if (display == 'days') {
				if (!highlightedDate) {
					highlightedDate = selectedDate.clone();
					_this.setState({ highlightedDate: highlightedDate });
				}

				switch (e.keyCode) {
					case keyCodes.enter:
						_this.onDaySelect(moment(highlightedDate), e);
						return;
					case keyCodes.left:
						delta = -1;
						break;
					case keyCodes.right:
						delta = +1;
						break;
					case keyCodes.down:
						delta = +7;
						break;
					case keyCodes.up:
						delta = -7;
						break;
				}

				if (delta) {
					var rowHeight = _this.props.rowHeight;

					var newHighlightedDate = moment(highlightedDate).add(delta, 'days');

					// Make sure the new highlighted date isn't before min / max
					if (newHighlightedDate.isBefore(minDate)) {
						newHighlightedDate = moment(minDate);
					} else if (newHighlightedDate.isAfter(maxDate)) {
						newHighlightedDate = moment(maxDate);
					}

					// Update the highlight indicator
					_this.clearHighlight();

					// Scroll the view
					if (!_this.currentOffset) _this.currentOffset = _this.getCurrentOffset();
					var currentOffset = _this.currentOffset;
					var monthOffset = _this.getDateOffset(newHighlightedDate);
					var navOffset = showToday ? 36 : 0;

					var highlightedEl = _this.highlightedEl = _this.node.querySelector('[data-date=\'' + newHighlightedDate.format('YYYYMMDD') + '\']');

					// Edge-case: if the user tries to use the keyboard when the new highlighted date isn't rendered because it's too far off-screen
					// We need to scroll to the month of the new highlighted date so it renders
					if (!highlightedEl) {
						_this.scrollTo(monthOffset - navOffset);
						return;
					}

					highlightedEl.classList.add(style.day.highlighted);

					var dateOffset = highlightedEl.offsetTop - rowHeight;
					var newOffset = monthOffset + dateOffset;

					if (currentOffset !== newOffset) {
						_this.currentOffset = newOffset;
						_this.scrollTo(newOffset - navOffset);
					}

					// Update the reference to the currently highlighted date
					_this.setState({
						highlightedDate: newHighlightedDate
					});
				}
			} else if (display == 'years' && _this.refs.years) {
				_this.refs.years.handleKeyDown(e);
			}
		};

		_this.setDisplay = function (display) {
			_this.setState({ display: display });
		};

		_this.updateLocale(props.locale);
		_this.updateYears(props);
		_this.state = {
			selectedDate: _this.parseSelectedDate(props.selectedDate),
			display: props.display,
			shouldHeaderAnimate: props.shouldHeaderAnimate
		};
		return _this;
	}

	_createClass(InfiniteCalendar, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			var _props = this.props;
			var autoFocus = _props.autoFocus;
			var keyboardSupport = _props.keyboardSupport;

			this.node = this.refs.node;
			this.list = this.refs.List;

			if (keyboardSupport && autoFocus) {
				this.node.focus();
			}
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(next) {
			var _props2 = this.props;
			var min = _props2.min;
			var minDate = _props2.minDate;
			var max = _props2.max;
			var maxDate = _props2.maxDate;
			var locale = _props2.locale;
			var selectedDate = _props2.selectedDate;
			var shouldScrollAfterSelect = _props2.shouldScrollAfterSelect;
			var display = this.state.display;


			if (next.locale !== locale) {
				this.updateLocale(next.locale);
			}
			if (next.min !== min || next.minDate !== minDate || next.max !== max || next.maxDate !== maxDate) {
				this.updateYears(next);
			}
			if (next.selectedDate !== selectedDate) {
				var parsed = this.parseSelectedDate(next.selectedDate);
				this.setState({
					selectedDate: parsed
				});
				if (shouldScrollAfterSelect && parsed) this.scrollToDate(parsed, -this.props.rowHeight * 2);
			} else if (next.minDate !== minDate || next.maxDate !== maxDate) {
				// Need to make sure the currently selected date is not before the new minDate or after maxDate
				var _selectedDate = this.parseSelectedDate(this.state.selectedDate);
				if (!_selectedDate.isSame(this.state.selectedDate, 'day')) {
					this.setState({
						selectedDate: _selectedDate
					});
				}
			}
			if (next.display !== display) {
				this.setState({
					display: next.display
				});
			}
		}
	}, {
		key: 'parseSelectedDate',
		value: function parseSelectedDate(selectedDate) {
			if (selectedDate) {
				selectedDate = moment(selectedDate);

				// Selected Date should not be before min date or after max date
				if (selectedDate.isBefore(this._minDate)) {
					return this._minDate;
				} else if (selectedDate.isAfter(this._maxDate)) {
					return this._maxDate;
				}
			}

			return selectedDate;
		}
	}, {
		key: 'updateYears',
		value: function updateYears() {
			var props = arguments.length <= 0 || arguments[0] === undefined ? this.props : arguments[0];

			var min = this._min = moment(props.min);
			var max = this._max = moment(props.max);
			this._minDate = moment(props.minDate);
			this._maxDate = moment(props.maxDate);

			this.years = range(min.year(), max.year() + 1).map(function (year) {
				return getMonthsForYear(year, min, max);
			});
			this.months = [].concat.apply([], this.years);
		}
	}, {
		key: 'updateLocale',
		value: function updateLocale(locale) {
			locale = this.getLocale(locale);
			moment.updateLocale(locale.name, locale);
			moment.locale(locale.name);
		}
	}, {
		key: 'getDisabledDates',
		value: function getDisabledDates(disabledDates) {
			return disabledDates && disabledDates.map(function (date) {
				return moment(date).format('YYYYMMDD');
			});
		}
	}, {
		key: 'getLocale',
		value: function getLocale() {
			var customLocale = arguments.length <= 0 || arguments[0] === undefined ? this.props.locale : arguments[0];

			return _Object$assign({}, defaultLocale, customLocale);
		}
	}, {
		key: 'getTheme',
		value: function getTheme() {
			var customTheme = arguments.length <= 0 || arguments[0] === undefined ? this.props.theme : arguments[0];

			return _Object$assign({}, defaultTheme, customTheme);
		}
	}, {
		key: 'clearHighlight',
		value: function clearHighlight() {
			if (this.highlightedEl) {
				this.highlightedEl.classList.remove(style.day.highlighted);
				this.highlightedEl = null;
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var _props3 = this.props;
			var className = _props3.className;
			var disabledDays = _props3.disabledDays;
			var height = _props3.height;
			var hideYearsOnSelect = _props3.hideYearsOnSelect;
			var keyboardSupport = _props3.keyboardSupport;
			var layout = _props3.layout;
			var overscanMonthCount = _props3.overscanMonthCount;
			var min = _props3.min;
			var minDate = _props3.minDate;
			var max = _props3.max;
			var maxDate = _props3.maxDate;
			var showTodayHelper = _props3.showTodayHelper;
			var showHeader = _props3.showHeader;
			var tabIndex = _props3.tabIndex;
			var weekdayFormat = _props3.weekdayFormat;
			var width = _props3.width;

			var other = _objectWithoutProperties(_props3, ['className', 'disabledDays', 'height', 'hideYearsOnSelect', 'keyboardSupport', 'layout', 'overscanMonthCount', 'min', 'minDate', 'max', 'maxDate', 'showTodayHelper', 'showHeader', 'tabIndex', 'weekdayFormat', 'width']);

			var disabledDates = this.getDisabledDates(this.props.disabledDates);
			var locale = this.getLocale();
			var theme = this.getTheme();
			var _state = this.state;
			var display = _state.display;
			var isScrolling = _state.isScrolling;
			var selectedDate = _state.selectedDate;
			var showToday = _state.showToday;
			var shouldHeaderAnimate = _state.shouldHeaderAnimate;

			var today = this.today = parseDate(moment());

			// Selected date should not be disabled
			if (selectedDate && (disabledDates && disabledDates.indexOf(selectedDate.format('YYYYMMDD')) !== -1 || disabledDays && disabledDays.indexOf(selectedDate.day()) !== -1)) {
				selectedDate = null;
			}

			return React.createElement(
				'div',
				{ tabIndex: tabIndex, onKeyDown: keyboardSupport && this.handleKeyDown, className: classNames(className, style.container.root, _defineProperty({}, style.container.landscape, layout == 'landscape')), style: { color: theme.textColor.default, width: width }, 'aria-label': 'Calendar', ref: 'node' },
				showHeader && React.createElement(Header, { selectedDate: selectedDate, shouldHeaderAnimate: shouldHeaderAnimate, layout: layout, theme: theme, locale: locale, scrollToDate: this.scrollToDate, setDisplay: this.setDisplay, display: display }),
				React.createElement(
					'div',
					{ className: style.container.wrapper },
					React.createElement(Weekdays, { theme: theme, format: weekdayFormat }),
					React.createElement(
						'div',
						{ className: style.container.listWrapper },
						showTodayHelper && React.createElement(Today, { scrollToDate: this.scrollToDate, show: showToday, today: today, theme: theme, locale: locale }),
						React.createElement(List, _extends({
							ref: 'List'
						}, other, {
							width: width,
							height: height,
							selectedDate: parseDate(selectedDate),
							disabledDates: disabledDates,
							disabledDays: disabledDays,
							months: this.months,
							onDaySelect: this.onDaySelect,
							onScroll: this.onScroll,
							isScrolling: isScrolling,
							today: today,
							min: parseDate(min),
							minDate: parseDate(minDate),
							maxDate: parseDate(maxDate),
							theme: theme,
							locale: locale,
							overscanMonthCount: overscanMonthCount
						}))
					),
					display == 'years' && React.createElement(Years, {
						ref: 'years',
						width: width,
						height: height,
						onDaySelect: this.onDaySelect,
						minDate: minDate,
						maxDate: maxDate,
						selectedDate: selectedDate,
						theme: theme,
						years: range(moment(min).year(), moment(max).year() + 1),
						setDisplay: this.setDisplay,
						scrollToDate: this.scrollToDate,
						hideYearsOnSelect: hideYearsOnSelect
					})
				)
			);
		}
	}]);

	return InfiniteCalendar;
}(Component);

InfiniteCalendar.defaultProps = {
	width: 400,
	height: 500,
	rowHeight: 56,
	overscanMonthCount: 4,
	todayHelperRowOffset: 4,
	layout: 'portrait',
	display: 'days',
	selectedDate: new Date(),
	min: { year: 1980, month: 0, day: 0 },
	minDate: { year: 1980, month: 0, day: 0 },
	max: { year: 2050, month: 11, day: 31 },
	maxDate: { year: 2050, month: 11, day: 31 },
	keyboardSupport: true,
	autoFocus: true,
	shouldHeaderAnimate: true,
	shouldScrollAfterSelect: true,
	showOverlay: true,
	showTodayHelper: true,
	showHeader: true,
	tabIndex: 1,
	locale: {},
	theme: {},
	hideYearsOnSelect: true
};
InfiniteCalendar.propTypes = {
	selectedDate: validDate,
	min: validDate,
	max: validDate,
	minDate: validDate,
	maxDate: validDate,
	locale: PropTypes.object,
	theme: PropTypes.object,
	weekdayFormat: PropTypes.string,
	width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	height: PropTypes.number,
	rowHeight: PropTypes.number,
	className: PropTypes.string,
	overscanMonthCount: PropTypes.number,
	todayHelperRowOffset: PropTypes.number,
	disabledDays: PropTypes.arrayOf(PropTypes.number),
	disabledDates: PropTypes.arrayOf(validDate),
	beforeSelect: PropTypes.func,
	onSelect: PropTypes.func,
	afterSelect: PropTypes.func,
	onScroll: PropTypes.func,
	onScrollEnd: PropTypes.func,
	keyboardSupport: PropTypes.bool,
	autoFocus: PropTypes.bool,
	onKeyDown: PropTypes.func,
	tabIndex: PropTypes.number,
	layout: validLayout,
	display: validDisplay,
	hideYearsOnSelect: PropTypes.bool,
	shouldHeaderAnimate: PropTypes.bool,
	shouldScrollAfterSelect: PropTypes.bool,
	showOverlay: PropTypes.bool,
	showTodayHelper: PropTypes.bool,
	showHeader: PropTypes.bool
};
export default InfiniteCalendar;