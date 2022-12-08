import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import CreateWorkout from './CreateWorkout'

class Workouts extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  async componentDidMount() {
    try {
      const response = await fetch('/api/')
      const data = await response.json()
      // console.log(data)
    } catch (err) {
      console.log('Workouts.getWorkouts error ', err)
    }
  }

  render() {
    return <div>Hello I'm in Workouts!</div>
  }
}

export default Workouts
