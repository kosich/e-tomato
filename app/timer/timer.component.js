// @flow
import React, { Component } from 'react';
import { Link } from 'react-router';
import moment from 'moment';
import 'moment-duration-format';
import styles from './timer.component.css';


const UPDATE_INTERVAL = 200;

const MINUTE = 1000 * 60;
const MIN_25 = MINUTE * 25;
const MIN_5  = MINUTE *  5;

export default class Timer extends Component {

  constructor(props) {
    super(props);
    this.state = { ms: MIN_25 };
  }

  componentDidMount() {
    this.play();
  }

  componentWillUnmount() {
    this.pause();
  }


  play() {
    if (this.interval) {
      return;
    }

    if (this.state.ms <= 0){
      this.state = { ms: MIN_25 };
    }

    this.offset = Date.now();
    this.interval = setInterval(()=>{ this.on_tick() }, UPDATE_INTERVAL);
    this.update_view(this.state.ms);
  }

  pause() {
    if (!this.interval) {
      return;
    }

    clearInterval(this.interval)
    delete this.interval;
    this.update_view(this.state.ms);
  }

  reset() {
    this.pause();
    delete this.offset;
    this.update_view(MIN_25);
  }

  on_tick() {
    const now = Date.now();
    const ms_diff = now - this.offset;
    const ms = this.state.ms - ms_diff;
    this.offset = now;
    this.update_view(ms);

    if (ms <= 0){
      this.pause();
    }
  }

  update_view(ms){
    const time = get_formatted_time(ms);
    this.setState({ ms, time });
  }


  render() {
    let button;
    if (this.interval){
      button = <span onClick={ this.pause.bind(this)} >pause</span>;
    } else {
      button = <span onClick={ this.play.bind(this) } >play</span>;
    }

    return (
      <div>
        <div className={styles.container}>
          <h3>Hello, Olena!</h3>

          <h2>{this.state.time}</h2>

          <div>
            {button}
            <span onClick={ this.reset.bind(this)} >reset</span>
          </div>
        </div>
      </div>
    );
  }
}

function get_formatted_time(ms) {
  const MINUTES_ONLY_FORMAT = 'm';
  const MINUTES_ANS_SECONDS_FORMAT = 'm:ss';

  let format;
  if (ms < MINUTE){ // show seconds only if < 1 minute
    format = MINUTES_ANS_SECONDS_FORMAT;
  } else {
    format = MINUTES_ONLY_FORMAT;
  }

  return moment.duration(ms).format(format);
}

