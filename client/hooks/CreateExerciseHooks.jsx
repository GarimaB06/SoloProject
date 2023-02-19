import React, {useState, useEffect, useId} from 'react'

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

  function CreateExercise(props) {
    const { toggleRefetch, setToggleRefetch} = props
     const [state, setState] = useState({
        muscleGroup: '',
        exercise: '',
        sets: [],
        exerciseList: [],
        instructions: '',
        reps: '',
        weight: '',
      })

      useEffect(()=>{
        const fetchData = async () =>{
          try {
              const fetchedList = await fetchExercises()
              setState({...state, exerciseList: fetchedList })
            } catch (err) {
              console.log(err)
            }
        }
        fetchData()
      },[state.muscleGroup])

      //either move this above useEffect or turn it into a function notation
      const fetchExercises = async () => {
        const url = `https://api.api-ninjas.com/v1/exercises?muscle=${state.muscleGroup}`
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'X-Api-Key': `jLAUBjaFSGdj7SzkO5+c2g==655STcyVwNbD4RAK`,
          },
        })
        // console.log(response)
        const data = await response.json()
        return data
      }

      const changeHandler = (entry, key) =>{
        setState({...state, [key]: entry.target.value })
        if (key === 'exercise') {
        }
      }

      const addSet = () =>{
        const setObj = {}
        setObj.reps = state.reps
        setObj.weight = state.weight
        const newSets = [...state.sets, setObj]
        setState({...state, sets: newSets })
      }

      const renderDropdownOptions = () => {
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

      const renderPickExercise = () => {
        const nameList = state.exerciseList.map((dataObj) => {
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

      const renderCompletedSets = () => {
        return state.sets.map((setObj) => {
          // const id = useId()
          return (
            <div className="set-circle">
              <div>Reps:{setObj.reps}</div>
              <div>Weight:{setObj.weight}</div>
            </div>
          )
        })
      }

    const postExercise = async (body) => {
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
    
      const submitExercise = async () => {
        const body = {}
        body.date = new Date()
        body.muscleGroup = state.muscleGroup
        body.exerciseName = state.exercise
        body.sets = state.sets
        try {
          const response = await postExercise(body)
          // const data = response.json()
          if(response){
            setToggleRefetch(!toggleRefetch)
          }
        } catch (err) {
          console.log(err)
        }
      }

      return (
        <div className="form-container">
          <h2>Let's create your workout for today!</h2>
          <form className="form" onSubmit={(e) => e.preventDefault()}>
            {/* dropdown1 */}
            <div className="common-class-name">
              <label htmlFor="dropdown-1">Pick a muscle group</label>
              <select
                id="dropdown-1"
                onChange={(e) => changeHandler(e, 'muscleGroup')}
                value={state.muscleGroup}
              >
                <option>Choose an option</option>
                {renderDropdownOptions()}
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
                {renderPickExercise()}
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
            </div>
            {/* weight */}
            <div className="common-class-name">
              <label htmlFor="weight">Enter Weight(lbs):</label>
              <input
                type="number"
                name="weight"
                value={state.weight}
                onChange={(e) => changeHandler(e, 'weight')}
              />
            </div>
            <button type="button" onClick={addSet}>
              Add Set
            </button>
          </form>
          <div className="sets-flexed">{renderCompletedSets()}</div>
          <button type="button" onClick={submitExercise}>
            Submit Exercise
          </button>
        </div>
      ) 
  }

  export default CreateExercise