import React, { Component } from 'react'
import CreateExercise from './CreateExercise'
import Modal from './Modal'
import Exercises from './Exercises'
import '../stylesheets/styles.scss'

class LandingPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modalVisible: false,
    }
  }
  render() {
    return (
      <div>
        <header>Welcome to your Create Workout App</header>
        <div className="landing-page">
          <Modal
            visible={this.state.modalVisible}
            closeModal={() => {
              this.setState({ modalVisible: false })
            }}
          >
            <CreateExercise />
          </Modal>
          <CreateExercise />
          <Exercises />
          <button
            onClick={() => {
              this.setState({ modalVisible: !this.state.modalVisible })
            }}
            className="motivational-quote"
          >
            Let's keep sweating!
          </button>
        </div>
      </div>
    )
  }
}

export default LandingPage
