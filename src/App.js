import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startTime: 0,
      endTime: 0,
      countdownTimer: 0,
      errors: []
    }
    this.calculateCountdown = this.calculateCountdown.bind(this);
    this.calculateSeconds = this.calculateSeconds.bind(this);
    this.countdown = this.countdown.bind(this);
    this.formatTime = this.formatTime.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.setEndTime = this.setEndTime.bind(this);
    this.setStartTime = this.setStartTime.bind(this);
    this.validateTimeFormat = this.validateTimeFormat.bind(this);
    this.validateTimeLength = this.validateTimeLength.bind(this);
  }

  calculateCountdown(){
    let start = this.calculateSeconds(this.state.startTime)
    let end = this.calculateSeconds(this.state.endTime)
    return this.setState({ countdownTimer: end - start })
  }

  calculateSeconds(timeString) {
    let time = timeString.split(":")
    let totalTime = 0
    totalTime += Number(time[0]) * 3600
    totalTime += Number(time[1]) * 60
    totalTime += Number(time[2])
    return totalTime
  }

  countdown(){
    this.setState({ countdownTimer: this.state.countdownTimer - 1 })
  }

  formatTime(event) {
    if (event.target.value.length === 2) {
      return event.target.value += ":"
    } else if (event.target.value.length === 5) {
      return event.target.value += ":"
    }
  }

  handleFormSubmit(event) {
    event.preventDefault();
    if (this.validateTimeFormat(this.state.startTime) &&
        this.validateTimeFormat(this.state.endTime) &&
        this.validateTimeLength()) {
      this.calculateCountdown()
    }
  }

  setEndTime(event) {
    this.formatTime(event)
    this.setState({ endTime: event.target.value })
  }

  setStartTime(event) {
    this.formatTime(event)
    this.setState({ startTime: event.target.value })
  }

  validateTimeFormat(time) {
    let validationFormat = /^(?:2[0-3]|[01]?[0-9]):[0-5][0-9]:[0-5][0-9]$/;
    if (time === 0 || time.match(validationFormat) == null) {
      let newError = { timeInput: 'You must submit the time in the proper format (HH:MM:SS).' }
      this.setState({ errors: Object.assign(this.state.errors, newError) })
      return false
    } else {
      let errorState = this.state.errors
      delete errorState.startTime
      this.setState({ errors: errorState })
      return true
    }
  }

  validateTimeLength() {
    if (this.state.startTime > this.state.endTime) {
      let newError = { timeInput: 'End time must come after the start time.' }
      this.setState({ errors: Object.assign(this.state.errors, newError) })
      return false
    } else {
      let errorState = this.state.errors
      delete errorState.startTime
      this.setState({ errors: errorState })
      return true
    }
  }

  render() {
    if (this.state.countdownTimer > 0) {
      setTimeout(() => {
        this.countdown()
      }, 1000);
    }

    let errors;
    if (Object.keys(this.state.errors).length > 0) {
      errors = Object.values(this.state.errors).map(error => {
        return(<div className="error">{error}</div>)
      })
    }
    return (
      <div className="App">
        <h1>Simple Countdown Timer</h1>
        {errors}
        <form onSubmit={this.handleFormSubmit}>
          <table>
            <tr>
              <td>Start Time</td>
              <td>
                <input
                  name="start-time"
                  onChange={this.setStartTime}
                  type="text"
                  value={this.content}
                  placeholder="HH:MM:SS"
                  maxlength="8"
                />
              </td>
            </tr>
            <tr>
              <td>End Time</td>
              <td>
                <input
                  name="end-time"
                  onChange={this.setEndTime}
                  type="text"
                  value={this.content}
                  placeholder="HH:MM:SS"
                  maxlength="8"
                />
              </td>
            </tr>
          </table>
          <button type="submit">Start Countdown</button>
        </form>
        <h4>Seconds Remaining:</h4>
        <div className="countdown">
          {this.state.countdownTimer}
        </div>
      </div>
    );
  }
}

export default App;
