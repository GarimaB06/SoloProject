const models = require('../models/models')

const workoutController = {}

workoutController.getWorkouts = async (req, res, next) => {
  try {
    const workoutsCompleted = await models.Workout.find().exec()
    res.locals.workouts = workoutsCompleted
    return next()
  } catch (err) {
    return next({
      log: 'problem getting your completed workouts',
      message: { error: err },
    })
  }
}

module.exports = workoutController
