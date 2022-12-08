const express = require('express')

const exerciseController = require('../controllers/exerciseController.js')

const router = express.Router()

router.get('/', exerciseController.getExercises, (req, res) => {
  return res.status(200).json(res.locals.exercises)
})

router.post('/exercises', exerciseController.addExercise, (req, res) => {
  return res.status(200).json(res.locals.exercise)
})
// router.patch('/', (req, res) => {})
// router.delete('/', (req, res) => {})

module.exports = router
