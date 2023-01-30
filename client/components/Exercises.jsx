import React, { Component } from 'react'

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

  deleteExercise = async (id) => {
    const url = `/api/exercises/${id}`
    const response = await fetch(url, {
      method: 'DELETE',
    })
    const data = await response.json()
    console.log(data)
    return data
  }

  renderCompletedExercises = () => {
    return this.state.exerciseList.map((obj) => {
      return (
        <div className="exercise-card" key={obj._id}>
          <div>
            <strong>Date :</strong>
            {new Date(obj.date).toDateString()}
          </div>
          <div>
            <strong>Exercise Name :</strong>
            {obj.exerciseName}
          </div>
          <div className="card-muscle-group">
            <strong>Muscle Group :</strong>
            {obj.muscleGroup}
          </div>
          {this.renderCompletedSets(obj.sets)}
          {/* <button onClick={this.deleteExercise}>Delete</button> */}
          <button
            className="delete-btn"
            onClick={() => {
              this.deleteExercise(obj._id)
            }}
          >
            Delete
          </button>
        </div>
      )
    })
  }

  renderCompletedSets = (sets) => {
    return sets.map((setObj) => {
      return (
        <div className="completed-set">
          <div>
            <strong>Reps :</strong>
            {setObj.reps}
          </div>
          <div>
            <strong>Weight :</strong>
            {setObj.weight}
          </div>
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
