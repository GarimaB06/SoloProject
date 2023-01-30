import React, {useState, useEffect} from "react";
// import CreateWorkout from "../components/CreateWorkout";


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

  const CreateWorkout = () => {
    const [state, setState] = useState({
        reps: '',
        weight: '',
        muscleGroup: '',
        exercise: '',
      })

    useEffect(()=>{
        console.log(state)
    })  
    const fetchExercises = async () => {
        const url = `https://api.api-ninjas.com/v1/exercises?muscle=${state.muscleGroup}`
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'X-Api-Key': `jLAUBjaFSGdj7SzkO5+c2g==655STcyVwNbD4RAK`,
          },
        })
        const data = await response.json()
        console.log(data)
    }

    const changeHandler = (entry, key) =>{
        console.log(entry, key)
        setState({...state, [key]: entry.target.value })
    }
    
    const onCreateRep = () => {
        console.log(state.reps)
    }

    const onCreateWeight =() => {
        console.log(state.weight)
    }
   const onCreateMuscleGroup = () => {
        console.log(state.muscleGroup)
    }
    
    const onCreateExercise = () => {
        console.log(state.exercise)
    }

    const renderOptions = () => {
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

    return(
          <div className="form-container">
            <h2>Let's create your workout for today!</h2>
            <form className="form" onSubmit={onSubmitTest}>
              {/* dropdown1 */}
              <div className="common-class-name">
                <label htmlFor="dropdown-1">Pick a muscle group</label>
                <select
                  id="dropdown-1"
                  onChange={(e) => changeHandler(e, 'muscleGroup')}
                  value={state.muscleGroup}
                >
                  <option>Choose an option</option>
                  {renderOptions()}
                </select>
              </div>
              {/* dropdown-2 */}
              <div className="common-class-name">
                <label htmlFor="dropdown-2">Pick an exercise</label>
                <select
                  id="dropdown-2"
                  value={state.exercise}
                  onChange={(e) => changeHandler(e, 'exercise')}
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
                  value={state.reps}
                  onChange={(e) => changeHandler(e, 'reps')}
                />
                <button onClick={onCreateRep}>Submit Reps</button>
              </div>
              {/* weight */}
              <div className="common-class-name">
                <label htmlFor="weight">Enter Weight:</label>
                <input
                  type="number"
                  name="weight"
                  value={state.weight}
                  onChange={(e) => changeHandler(e, 'weight')}
                />
                <button onClick={onCreateWeight}>Submit Weight</button>
              </div>
            </form>
          </div>
      )
  }

  export default CreateWorkout