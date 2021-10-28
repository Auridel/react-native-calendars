import XDate from 'xdate';
import React, {Component} from 'react';
// @ts-expect-error
import {ExpandableCalendar, Timeline, CalendarProvider} from 'react-native-calendars';
import {sameDate} from '../../../src/dateutils';

const EVENTS = [
  {
    start: '2021-10-26 01:30:00',
    end: '2021-10-26 02:30:00',
    title: 'Dr. Mariana Joseph',
    summary: '3412 Piedmont Rd NE, GA 3032',
    color: '#e6add8'
  },
  {
    start: '2021-10-27 00:30:00',
    end: '2021-10-27 01:30:00',
    title: 'Visit Grand Mother',
    summary: 'Visit Grand Mother and bring some fruits.',
    color: '#ade6d8'
  },
  {
    start: '2021-10-27 02:30:00',
    end: '2021-10-27 03:20:00',
    title: 'Meeting with Prof. Behjet Zuhaira',
    summary: 'Meeting with Prof. Behjet at 130 in her office.',
    color: '#e6add8'
  },
  {
    start: '2021-10-27 04:10:00',
    end: '2021-10-27 04:40:00',
    title: 'Tea Time with Dr. Hasan',
    summary: 'Tea Time with Dr. Hasan, Talk about Project'
  },
  {
    start: '2021-10-27 01:05:00',
    end: '2021-10-27 01:35:00',
    title: 'Dr. Mariana Joseph',
    summary: '3412 Piedmont Rd NE, GA 3032'
  },
  {
    start: '2021-10-27 14:30:00',
    end: '2021-10-27 16:30:00',
    title: 'Meeting Some Friends in ARMED',
    summary: 'Arsalan, Hasnaat, Talha, Waleed, Bilal',
    color: '#d8ade6'
  },
  {
    start: '2021-10-28 01:40:00',
    end: '2021-10-28 02:25:00',
    title: 'Meet Sir Khurram Iqbal',
    summary: 'Computer Science Dept. Comsats Islamabad',
    color: '#e6bcad'
  },
  {
    start: '2021-10-28 04:10:00',
    end: '2021-10-28 04:40:00',
    title: 'Tea Time with Colleagues',
    summary: 'WeRplay'
  },
  {
    start: '2021-10-28 00:45:00',
    end: '2021-10-28 01:45:00',
    title: 'Lets Play Apex Legends',
    summary: 'with Boys at Work'
  },
  {
    start: '2021-10-28 11:30:00',
    end: '2021-10-28 12:30:00',
    title: 'Dr. Mariana Joseph',
    summary: '3412 Piedmont Rd NE, GA 3032'
  },
  {
    start: '2021-10-30 12:10:00',
    end: '2021-10-30 13:45:00',
    title: 'Merge Request to React Native Calendars',
    summary: 'Merge Timeline Calendar to React Native Calendars'
  }
];

export default class TimelineCalendarScreen extends Component {
  state = {
    currentDate: '2021-10-28'
  };

  marked = {
    '2021-10-26': {marked: true},
    '2021-10-27': {marked: true},
    '2021-10-28': {marked: true},
    '2021-10-30': {marked: true}
  };

  onDateChanged = date => {
    // console.warn('TimelineCalendarScreen onDateChanged: ', date);
    // fetch and set data for date + week ahead
    this.setState({currentDate: date});
  };

  onMonthChange = (/* month, updateSource */) => {
    // console.warn('TimelineCalendarScreen onMonthChange: ', month, updateSource);
  };

  render() {
    return (
      <CalendarProvider
        date={this.state.currentDate}
        onDateChanged={this.onDateChanged}
        onMonthChange={this.onMonthChange}
        showTodayButton
        disabledOpacity={0.6}
      >
        <ExpandableCalendar
          firstDay={1}
          leftArrowImageSource={require('../img/previous.png')}
          rightArrowImageSource={require('../img/next.png')}
          markedDates={this.marked}
        />
        <Timeline
          format24h={true}
          eventTapped={e => e}
          events={EVENTS.filter(event => sameDate(new XDate(event.start), new XDate(this.state.currentDate)))}
          selectedDate={new Date(this.state.currentDate)}
          styles={{
            lineHalf: {
              // borderStyle: 'dashed',
              // borderWidth: 1,
              backgroundColor: 'transparent',
              // borderBottomWidth: 0,
              borderRadius: 1,
              borderStyle: 'dashed',
              borderWidth: 1,
              margin: 0,
              marginBottom: 0
            },
            lineNow: {
              backgroundColor: '#32C96C'
            },
            currentTime: {
              color: '#32C96C'
            }
          }}
          // scrollToFirst={true}
          // start={0}
          // end={24}
        />
      </CalendarProvider>
    );
  }
}
