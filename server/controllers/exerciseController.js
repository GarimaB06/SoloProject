const models = require('../models/models')

const exerciseController = {}

exerciseController.getExercises = async (req, res, next) => {
  try {
    const exercisesCompleted = await models.Exercise.find().exec()
    res.locals.exercises = exercisesCompleted
    return next()
  } catch (err) {
    return next({
      log: 'problem getting your completed exercises',
      message: { error: err },
    })
  }
}

exerciseController.addExercise = async (req, res, next) => {
  const newExercise = new models.Exercise(req.body)
  newExercise.save(function (err) {
    if (err) {
      return next({
        log: 'problem adding exercise, Keep sweatin!',
        message: { error: err },
      })
    } else {
      res.locals.exercise = newExercise
      return next()
    }
  })
}

exerciseController.deleteExercise = async (req, res, next) => {
  try {
    await models.Exercise.deleteOne({ _id: req.params.id })
    // console.log(req.params)
    return next()
  } catch (err) {
    return next({
      log: 'problem deleting your exercise, keep sweatin!',
      message: { error: err },
    })
  }
}

module.exports = exerciseController
