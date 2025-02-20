import React, {Component} from 'react';
// @ts-expect-error
import hoistNonReactStatic from 'hoist-non-react-statics';
import CalendarContext from './Context';
function asCalendarConsumer(WrappedComponent) {
  class CalendarConsumer extends Component {
    contentRef;
    saveRef = r => {
      this.contentRef = r;
    };
    render() {
      return (
        <CalendarContext.Consumer>
          {context => <WrappedComponent ref={this.contentRef} context={context} {...this.props} />}
        </CalendarContext.Consumer>
      );
    }
  }
  hoistNonReactStatic(CalendarConsumer, WrappedComponent);
  return CalendarConsumer;
}
export default asCalendarConsumer;
