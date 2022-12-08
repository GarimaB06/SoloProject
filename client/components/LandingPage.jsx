import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import CreateExercise from './CreateExercise'
import Exercises from './Exercises'
import '../stylesheets/styles.scss'

class LandingPage extends React.Component {
  render() {
    return (
      <div>
        <header>Welcome to your Create Workout App</header>
        <div className="landing-page">
          <CreateExercise />
          <Exercises />
          <div className="motivational-quote">Let's keep sweating!</div>
        </div>
      </div>
    )
  }
}

export default LandingPage
