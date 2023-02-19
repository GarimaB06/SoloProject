import React, {useState, useEffect, useId} from "react";

function Exercises(props) {
  const {toggleRefetch, setToggleRefetch} = props
    const [exerciseList, setExerciseList] = useState([])
    useEffect(()=>{
        const fetchExercises = async () =>{
            try{
                const response = await fetch('/api/')
                const data = await response.json()
                setExerciseList(data)
            } catch(err){
                console.log('exercises.getExercises data',err)
            }
        }
      fetchExercises()
    }, [toggleRefetch])

const deleteExercise = async (id) => {
    const url = `/api/exercises/${id}`
    const response = await fetch(url, {
      method: 'DELETE',
    })
    const data = await response.json()
    if(data) setToggleRefetch(!toggleRefetch)
    return data
}

 const renderCompletedExercises = () => {
    return exerciseList.map((obj) => {
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
          {renderCompletedSets(obj.sets)}
          <button
            className="delete-btn"
            onClick={() => {
            deleteExercise(obj._id)
            }}
          >
            Delete
          </button>
        </div>
      )
    })
  }

const renderCompletedSets = (sets) => {
    return sets.map((setObj) => {
        return (
        <div key={setObj._id} className="completed-set">
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

return (
  <div className="parent-exercises">{renderCompletedExercises()}</div>
)
}
export default Exercises