import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component, PropTypes } from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import moment from 'moment';
import range from 'lodash/range';
import { scrollbarSize } from '../utils';
var style = {
	'root': 'Cal__Weekdays__root',
	'day': 'Cal__Weekdays__day'
};

var Weekdays = function (_Component) {
	_inherits(Weekdays, _Component);

	function Weekdays() {
		_classCallCheck(this, Weekdays);

		return _possibleConstructorReturn(this, (Weekdays.__proto__ || _Object$getPrototypeOf(Weekdays)).apply(this, arguments));
	}

	_createClass(Weekdays, [{
		key: 'shouldComponentUpdate',
		value: function shouldComponentUpdate(nextProps) {
			return shallowCompare(this, nextProps);
		}
	}, {
		key: 'render',
		value: function render() {
			var _props = this.props,
			    format = _props.format,
			    theme = _props.theme;

			var textColor = theme.weekDay ? theme.weekDay.textColor : theme.textColor.active;

			return React.createElement(
				'ul',
				{ className: style.root, style: { backgroundColor: theme.weekdayColor, color: textColor, paddingRight: scrollbarSize }, 'aria-hidden': true },
				range(0, 7).map(function (val, index) {
					return React.createElement(
						'li',
						{ key: 'Weekday-' + index, className: style.day },
						moment().weekday(index).format(format || 'ddd')
					);
				})
			);
		}
	}]);

	return Weekdays;
}(Component);

Weekdays.propTypes = {
	locale: PropTypes.object,
	format: PropTypes.string,
	theme: PropTypes.object
};
export default Weekdays;