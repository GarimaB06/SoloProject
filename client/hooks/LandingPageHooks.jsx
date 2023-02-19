import React, {useState} from 'react'
import Exercises from '../hooks/ExercisesHooks'
import '../stylesheets/styles.scss'
import CreateExerciseHooks from '../hooks/CreateExerciseHooks'

function LandingPageHooks() {
  const [toggleRefetch, setToggleRefetch] = useState(true)

  return(
    <div>
        <header>
            Welcome to your Create Workout App
        </header>
        <div className='landing-page'>
            <CreateExerciseHooks toggleRefetch = {toggleRefetch} setToggleRefetch = {setToggleRefetch}/>
            <Exercises toggleRefetch = {toggleRefetch} setToggleRefetch = {setToggleRefetch}/>
          
        </div>
        <footer className='motivational-quote'>
            Booyaaakashaaa
        </footer>
    </div>
  )
}

export default LandingPageHooks  