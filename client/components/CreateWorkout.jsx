import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'

const muscleGroupArr = [
  { id: 'abdominals-1', value: 'abdominals', displayText: 'abdominals' },
  { id: 'abductors-2', value: 'abductors', displayText: 'abductors' },
  { id: 'adductors-3', value: 'adductors', displayText: 'adductors' },
  { id: 'biceps-4', value: 'biceps', displayText: 'biceps' },
  { id: 'calves-5', value: 'calves', displayText: 'calves' },
  { id: 'chest-6', value: 'chest', displayText: 'chest' },
  { id: 'forearms-7', value: 'forearms', displayText: 'forearms' },
  { id: 'glutes-8', value: 'glutes', displayText: 'glutes' },
  { id: 'hamstrings-9', value: 'hamstrings', displayText: 'hamstrings' },
  { id: 'lats-10', value: 'lats', displayText: 'lats' },
  { id: 'lower_back-11', value: 'lower_back', displayText: 'lower back' },
  { id: 'middle_back-12', value: 'middle_back', displayText: 'middle back' },
  { id: 'neck-13', value: 'neck', displayText: 'neck' },
  { id: 'quadriceps-14', value: 'quadriceps', displayText: 'quadriceps' },
  { id: 'traps-15', value: 'traps', displayText: 'traps' },
  { id: 'triceps-16', value: 'triceps', displayText: 'triceps' },
]

class CreateWorkout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      reps: '',
      weight: '',
      muscleGroup: '',
      exercise: '',
    }
    this.changeHandler = this.changeHandler.bind(this)
    this.onCreateRep = this.onCreateRep.bind(this)
    this.onCreateWeight = this.onCreateWeight.bind(this)
    this.onCreateMuscleGroup = this.onCreateMuscleGroup.bind(this)
    this.onCreateExercise = this.onCreateExercise.bind(this)
  }

  componentDidUpdate() {
    console.log(this.state)
  }

  fetchExercises = async () => {
    const url = `https://api.api-ninjas.com/v1/exercises?muscle=${this.state.muscleGroup}`
    // const url = `https://api.api-ninjas.com/v1/exercises?muscle=triceps`
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'X-Api-Key': `jLAUBjaFSGdj7SzkO5+c2g==655STcyVwNbD4RAK`,
      },
    })
    const data = await response.json()
    console.log(data)
  }

  changeHandler(entry, key) {
    console.log(entry, key)
    this.setState({ [key]: entry.target.value })
  }

  onCreateRep() {
    console.log(this.state.reps)
  }

  onCreateWeight() {
    console.log(this.state.weight)
  }

  onCreateMuscleGroup() {
    console.log(this.state.muscleGroup)
  }

  onCreateExercise() {
    console.log(this.state.exercise)
  }

  //rendering options using a function
  renderOptions = () => {
    return muscleGroupArr.map((muscleObj) => {
      return (
        <option
          className="options"
          key={muscleObj.id}
          id={muscleObj.id}
          value={muscleObj.value}
        >
          {muscleObj.displayText}
        </option>
      )
    })
  }

  render() {
    return (
      <div className="form-container">
        <h2>Let's create your workout for today!</h2>
        <form className="form" onSubmit={this.onSubmitTest}>
          {/* dropdown1 */}
          <div className="common-class-name">
            <label htmlFor="dropdown-1">Pick a muscle group</label>
            <select
              id="dropdown-1"
              onChange={(e) => this.changeHandler(e, 'muscleGroup')}
              value={this.state.muscleGroup}
            >
              <option>Choose an option</option>
              {this.renderOptions()}
            </select>
          </div>
          {/* dropdown-2 */}
          <div className="common-class-name">
            <label htmlFor="dropdown-2">Pick an exercise</label>
            <select
              id="dropdown-2"
              value={this.state.exercise}
              onChange={(e) => this.changeHandler(e, 'exercise')}
            >
              <option>Choose an option</option>
            </select>
          </div>
          {/* reps  */}
          <div className="common-class-name">
            <label htmlFor="reps">Enter Reps:</label>
            <input
              type="number"
              name="reps"
              value={this.state.reps}
              onChange={(e) => this.changeHandler(e, 'reps')}
            />
            <button onClick={this.onCreateRep}>Submit Reps</button>
          </div>
          {/* weight */}
          <div className="common-class-name">
            <label htmlFor="weight">Enter Weight:</label>
            <input
              type="number"
              name="weight"
              value={this.state.weight}
              onChange={(e) => this.changeHandler(e, 'weight')}
            />
            <button onClick={this.onCreateWeight}>Submit Weight</button>
          </div>
        </form>
      </div>
    )
  }
}

export default CreateWorkout
