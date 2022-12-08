import React, { Component } from 'react'
// import { Link, withRouter } from 'react-router-dom'

class Exercises extends Component {
  constructor(props) {
    super(props)
    this.state = {
      exerciseList: [],
    }
  }
  async componentDidMount() {
    try {
      const response = await fetch('/api/')
      const data = await response.json()
      this.setState({ exerciseList: data })
    } catch (err) {
      console.log('exercises.getExercises error ', err)
    }
  }

  renderCompletedExercises = () => {
    return this.state.exerciseList.map((obj) => {
      return (
        <div className="exercise-card">
          <div>Date:{obj.date}</div>
          <div>Exercise Name: {obj.exerciseName}</div>
          <div>Muscle Group: {obj.muscleGroup}</div>
          {this.renderCompletedSets(obj.sets)}
        </div>
      )
    })
  }

  renderCompletedSets = (sets) => {
    return sets.map((setObj) => {
      return (
        <div className="completed-set">
          <div>Reps:{setObj.reps}</div>
          <div>Weight:{setObj.weight}</div>
        </div>
      )
    })
  }

  render() {
    // console.log(this.state.exerciseList)
    return (
      <div className="parent-exercises">{this.renderCompletedExercises()}</div>
    )
  }
}

export default Exercises
