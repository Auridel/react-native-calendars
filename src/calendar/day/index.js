import get from 'lodash/get';
import omit from 'lodash/omit';
import PropTypes from 'prop-types';
import XDate from 'xdate';
import memoize from 'memoize-one';
import React, {Component} from 'react';
import {shouldUpdate} from '../../componentUpdater';
import {formatNumbers, isToday} from '../../dateutils';
import {xdateToData} from '../../interface';
import {SELECT_DATE_SLOT} from '../../testIDs';
import BasicDay from './basic';
import PeriodDay from './period';
const basicDayPropsTypes = omit(BasicDay.propTypes, 'date');
export default class Day extends Component {
  static displayName = 'IGNORE';
  static propTypes = {
    ...basicDayPropsTypes,
    /** The day to render */
    day: PropTypes.object,
    /** Provide custom day rendering component */
    dayComponent: PropTypes.any
  };
  shouldComponentUpdate(nextProps) {
    return shouldUpdate(this.props, nextProps, [
      'day',
      'dayComponent',
      'state',
      'markingType',
      'marking',
      'onPress',
      'onLongPress'
    ]);
  }
  getMarkingLabel(marking) {
    let label = '';
    if (marking) {
      if (marking.accessibilityLabel) {
        return marking.accessibilityLabel;
      }
      if (marking.selected) {
        label += 'selected ';
        if (!marking.marked) {
          label += 'You have no entries for this day ';
        }
      }
      if (marking.marked) {
        label += 'You have entries for this day ';
      }
      if (marking.startingDay) {
        label += 'period start ';
      }
      if (marking.endingDay) {
        label += 'period end ';
      }
      if (marking.disabled || marking.disableTouchEvent) {
        label += 'disabled ';
      }
    }
    return label;
  }
  getAccessibilityLabel = memoize((day, marking, isToday) => {
    const today = get(XDate, 'locales[XDate.defaultLocale].today');
    const formatAccessibilityLabel = get(XDate, 'locales[XDate.defaultLocale].formatAccessibilityLabel');
    const markingLabel = this.getMarkingLabel(marking);
    if (formatAccessibilityLabel) {
      return `${isToday ? today : ''} ${day.toString(formatAccessibilityLabel)} ${markingLabel}`;
    }
    return `${isToday ? 'today' : ''} ${day.toString('dddd d MMMM yyyy')} ${markingLabel}`;
  });
  getDayComponent() {
    const {dayComponent, markingType} = this.props;
    if (dayComponent) {
      return dayComponent;
    }
    return markingType === 'period' ? PeriodDay : BasicDay;
  }
  render() {
    const {day, marking} = this.props;
    const date = day && xdateToData(new XDate(day));
    const _isToday = day ? isToday(new XDate(day)) : undefined;
    const Component = this.getDayComponent();
    const dayProps = omit(this.props, 'day');
    const accessibilityLabel = this.getAccessibilityLabel(day, marking, _isToday);
    return (
      <Component
        {...dayProps}
        date={date}
        testID={`${SELECT_DATE_SLOT}-${date?.dateString}`}
        accessibilityLabel={accessibilityLabel}
      >
        {formatNumbers(date ? day?.getDate() : day)}
      </Component>
    );
  }
}
