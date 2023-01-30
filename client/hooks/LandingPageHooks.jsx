import React from 'react'
import Exercises from '../components/Exercises'
import '../stylesheets/styles.scss'
import CreateExerciseHooks from '../hooks/CreateExerciseHooks'

function LandingPageHooks() {
  return(
    <div>
        <header>
            Welcome to your Create Workout App
        </header>
        <div className='landing-page'>
            <CreateExerciseHooks/>
            <Exercises/>
        </div>
        <footer className='motivational-quote'>
            Booyaaakashaaa
        </footer>
    </div>
  )
}

export default LandingPageHooks  