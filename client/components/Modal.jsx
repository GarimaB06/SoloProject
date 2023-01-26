import React, { Component } from 'react'
import '../stylesheets/modal.scss'

const Modal = (props) => {
  // console.log(props.visible)
  if (props.visible) {
    return (
      <div className="modal">
        <div className="modal-content">{props.children} </div>
        <button onClick={props.closeModal}>X</button>
      </div>
    )
  }
  return null
}

export default Modal
