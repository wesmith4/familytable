// This component copied from the React JS tutorial (I thought it was useful)

import React from 'react';

const dateStyle = {
  'font-weight': 300,
  'font-size': '3.5rem'
}

const timeStyle = {
  'font-weight': 200,
  'font-size': '3rem'
}

class Clock extends React.Component {

  constructor(props) {
    super();
    this.state = {date: new Date()};
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({date: new Date()});
  }

  render() {
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'November', 'December'];
    let weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let date = this.state.date
    let weekday = weekdays[date.getDay()];
    let month = months[date.getMonth()];
    let timeElements = date.toLocaleTimeString().split(' ');
    timeElements[0] = timeElements[0].slice(0,-3);

    return (
      <div>
        <h4 className="display-3" style={dateStyle}>{weekday}, {month} {date.getDate()}, {date.getFullYear()}</h4>
        <h5 className="display-4" style={timeStyle}>{timeElements.join(' ')}</h5>
      </div>
    )
  }
}

export default Clock;
