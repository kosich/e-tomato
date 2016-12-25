// @flow
import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './timer.component.css';


export default class Timer extends Component {
  render() {
    return (
      <div>
        <div className={styles.container}>
          <h2>Hello, Lena!</h2>
        </div>
      </div>
    );
  }
}
