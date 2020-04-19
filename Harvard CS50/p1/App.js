import React from 'react';
import { StyleSheet, Text, View, Button, TouchableWithoutFeedback, StatusBar } from 'react-native';
import vibrate from './utils/vibrate.js'

// Add zeros to numers < 10
const formatTime = time => `${time}`.padStart(2, '0')

// Seconds to mins and secs
const secondsToTime = seconds => {
  return {
    mins: formatTime(Math.floor(seconds/60)), 
    secs: formatTime(seconds % 60)
  }
}

const WORK_DURATION = 15 // 25 min
const BREAK_DURATION = 10 // 25 min

export default class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      time_remaining: WORK_DURATION,
      status: 'initial', // 'initial' is the white screen shown before the user has interacted with anything
      active: false, // active means time is counting down
      break: false // break time (5min) is active
    }
  }

  toggleTimer = () => {
    if (!this.state.active){
      console.log("Start")
      // Change status of 'initial' after any input
      if (this.state.status === 'initial'){
        this.setState({status: "started"})
      } 
      // Toggle active state and start counting down
      this.setState({active: true})
      this.interval = setInterval(this.countdown, 1000)
    } else {
      console.log("Stop")
      // Remove interval and toggle active state
      clearInterval(this.interval)
      this.setState({ active: false})
    }
  }

  resetTimer = () => {
    console.log("Reset")
    // Clear intervals and reset variables to initial state of the app
    clearInterval(this.interval)
    this.setState({ time_remaining: WORK_DURATION, status:"initial", active: false, break: false})
  }

  countdown = () => {
    if(this.state.time_remaining < 1){
      // Switch between 5 minutes of free time / 25 min of work when timer reaches 0 
      vibrate()
      if (!this.state.break){
        this.setState(prevState => ({ time_remaining: BREAK_DURATION, break: !prevState.break}))
      } else {
        this.setState(prevState => ({ time_remaining: WORK_DURATION, break: !prevState.break}))
      }
    } else {
      // Decrease timer by 1 sec
      this.setState(prevState => ({ time_remaining: prevState.time_remaining - 1}))
    }
  }

  // Function to find background color
  bgColor = () => {
    if (this.state.status === "initial") return styles.white // initial
    else if (!this.state.active) return styles.paused // clock paused
    else if (!this.state.break) return styles.work // clock active and work time on
    else if (this.state.break) return styles.free // clock active and break time on
  }

  render() {
    return (
      <View style={[styles.container, this.bgColor() ]}>
        <View style={styles.timerContainer}>
          <Text style={styles.timer}>{secondsToTime(this.state.time_remaining).mins}:{secondsToTime(this.state.time_remaining).secs}</Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableWithoutFeedback onPress={this.toggleTimer}>
            <View style={styles.toggleButton}>
              <Text style={styles.buttonText}>Toggle</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={this.resetTimer}>
            <View style={styles.resetButton}>
              <Text style={styles.buttonText}>Reset</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timer:{
    fontSize: 85,
    justifyContent: 'center',
    color: '#333',
  },
  timerContainer:{
    flex: 1,
    justifyContent: 'flex-end'
  },
  work:{
    backgroundColor: '#e25c55',
  },
  paused:{
    backgroundColor: '#e8c721',
  },
  free:{
    backgroundColor: '#40bf60',
  },
  toggleButton: {
    backgroundColor: '#00000008',
    alignItems: 'center',
    alignSelf: 'stretch',
    paddingVertical: 35,
  },
  resetButton: {
    backgroundColor: '#0000000F',
    alignItems: 'center',
    alignSelf: 'stretch',
    paddingVertical: 35,
  },
  buttonContainer:{
    alignSelf: 'stretch',
    flex: 1,
    justifyContent: 'flex-end'
  },
  buttonText: {
    fontSize: 20,
    fontFamily: 'Roboto',
    color: '#333'
  },
});
