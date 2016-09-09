import React, {Component, PropTypes} from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import moment from 'moment';
import range from 'lodash/range';
import {scrollbarSize} from '../utils';
const style = require('./Weekdays.scss');


export default class Weekdays extends Component {
	static propTypes = {
		locale: PropTypes.object,
		format: PropTypes.string,
		theme: PropTypes.object
	};
	shouldComponentUpdate(nextProps) {
		return shallowCompare(this, nextProps);
	}
	render() {
		let {format,theme} = this.props;
		let textColor = theme.weekDay ? theme.weekDay.textColor : theme.textColor.active;

		return (
			<ul className={style.root} style={{backgroundColor: theme.weekdayColor, color: textColor, paddingRight: scrollbarSize}} aria-hidden={true}>
				{range(0,7).map((val, index) => {
					return (
						<li key={`Weekday-${index}`} className={style.day}>{moment().weekday(index).format(format || 'ddd')}</li>
					);
				})}
			</ul>
		);
	}
}
