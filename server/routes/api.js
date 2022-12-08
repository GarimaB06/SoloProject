const express = require('express')

const workoutController = require('../controllers/workoutController.js')

const router = express.Router()

router.get('/', workoutController.getWorkouts, (req, res) => {
  return res.status(200).json(res.locals.workouts)
})

// router.post('/', (req, res) => {})
// router.patch('/', (req, res) => {})
// router.delete('/', (req, res) => {})

module.exports = router
