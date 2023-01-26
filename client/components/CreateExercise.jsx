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

class CreateExercise extends Component {
  constructor(props) {
    super(props)
    this.state = {
      muscleGroup: '',
      exercise: '',
      sets: [],
      exerciseList: [],
      instructions: '',
      reps: '',
      weight: '',
    }
    //Why did we use the bind method up here?
    this.changeHandler = this.changeHandler.bind(this)
  }

  //we're using the lifecycle method in the frontend to trigger a fetch request to the api of an existing database
  //we will be rendering this data directly to the frontend
  //componentDidUpdate async method is invoked immediately after updating occurs in the first dropdown
  async componentDidUpdate(prevProps, prevState) {
    if (
      //checking if the muscle group has been picked and if it hasn't been picked before
      //if that condition is true we use the try/catch to invoke the fetchExercises function
      //and set the fetched list of data in the state using the setState method
      this.state.muscleGroup &&
      this.state.muscleGroup !== prevState.muscleGroup
    ) {
      try {
        const fetchedList = await this.fetchExercises()
        // console.log(fetchedList)
        //we're setting the value of exerciseList in our state to the fetched data from the existing database
        this.setState({ exerciseList: fetchedList })
      } catch (err) {
        console.log(err)
      }
    }
  }

  //A class method that is making a GET request to the url to fetch the data and returning the data as a json
  fetchExercises = async () => {
    const url = `https://api.api-ninjas.com/v1/exercises?muscle=${this.state.muscleGroup}`
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'X-Api-Key': `jLAUBjaFSGdj7SzkO5+c2g==655STcyVwNbD4RAK`,
      },
    })
    const data = await response.json()
    // console.log(data)
    return data
  }

  //A class method that is accepting an event and a key(to determine which key to update in the state)
  //This is used in the input & select elemetns(of the form)
  //it is fired everytime there's a change in the input fields
  //we're taking the inputted value from the event.target.value(which is the inputted value)
  //we're setting it to the specific key(argument) in the state
  changeHandler(event, key) {
    this.setState({ [key]: event.target.value })
  }

  //A class method that is setting the value of reps and weight entries to the setObject
  //setObject is then passed into an array along with the older sets objects(using the spread operator)
  //we store that array into a variable called newSets
  //update the state sets property to the value of newSets
  addSet = () => {
    const setObj = {}
    setObj.reps = this.state.reps
    setObj.weight = this.state.weight
    const newSets = [...this.state.sets, setObj]
    this.setState({ sets: newSets })
  }

  //A class method that is used to map array elements and render them to the 1st dropdown
  renderDropdownOptions = () => {
    return muscleGroupArr.map((muscleObj) => {
      return (
        <option
          className="options"
          key={muscleObj.id} //when you use map in react to map elements, react want's you to use a unique key attribute to prevent unnecessary re-renders
          value={muscleObj.value} //we're accessing the value of muscle group string to be used to fetch the data and render in the 2nd dropdown
        >
          {/* accessing the displayText property to be rendered to the 2nd dropdown */}
          {muscleObj.displayText}
        </option>
      )
    })
  }

  renderPickExercise = () => {
    const nameList = this.state.exerciseList.map((dataObj) => {
      return (
        <option
          className="options"
          key={`${dataObj.name}${dataObj.type}`}
          value={dataObj.name}
        >
          {dataObj.name}
        </option>
      )
    })
    return nameList
  }

  renderCompletedSets = () => {
    return this.state.sets.map((setObj) => {
      return (
        <div className="set-circle">
          <div>Reps:{setObj.reps}</div>
          <div>Weight:{setObj.weight}</div>
        </div>
      )
    })
  }

  //post request and submit
  postExercise = async (body) => {
    const url = `/api/exercises`
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/JSON',
      },
      body: JSON.stringify(body),
    })
    const data = await response.json()
    // console.log(data)
    return data
  }

  submitExercise = async () => {
    const body = {}
    body.date = new Date()
    body.muscleGroup = this.state.muscleGroup
    body.exerciseName = this.state.exercise
    body.sets = this.state.sets
    try {
      const response = await this.postExercise(body)
      const data = response.json()
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    console.log(this.state)
    return (
      <div className="form-container">
        <h2>Let's create your workout for today!</h2>
        <form className="form" onSubmit={(e) => e.preventDefault()}>
          {/* dropdown1 */}
          <div className="common-class-name">
            <label htmlFor="dropdown-1">Pick a muscle group</label>
            <select
              id="dropdown-1"
              onChange={(e) => this.changeHandler(e, 'muscleGroup')}
              value={this.state.muscleGroup}
            >
              <option>Choose an option</option>
              {this.renderDropdownOptions()}
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
              {this.renderPickExercise()}
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
          </div>
          {/* weight */}
          <div className="common-class-name">
            <label htmlFor="weight">Enter Weight(lbs):</label>
            <input
              type="number"
              name="weight"
              value={this.state.weight}
              onChange={(e) => this.changeHandler(e, 'weight')}
            />
          </div>
          <button type="button" onClick={this.addSet}>
            Add Set
          </button>
        </form>
        <div className="sets-flexed">{this.renderCompletedSets()}</div>
        <button type="button" onClick={this.submitExercise}>
          Submit Exercise
        </button>
      </div>
    )
  }
}

export default CreateExercise
