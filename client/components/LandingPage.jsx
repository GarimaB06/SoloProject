import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import CreateWorkout from './CreateWorkout'
import Workouts from './Workouts'
import '../stylesheets/styles.scss'

class LandingPage extends React.Component {
  render() {
    return (
      <div>
        <header>Welcome to your Create Workout App</header>
        <div className="landing-page">
          <CreateWorkout />
          <Workouts />
        </div>
      </div>
    )
  }
}

export default LandingPage
