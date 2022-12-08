const mongoose = require('mongoose')

const MONGO_URI = ''

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'workouts',
  })
  .then(() => console.log('Connected to Mongo DB.'))
  .catch((err) => console.log(err))

const Schema = mongoose.Schema

const workoutSchema = new Schema({
  date: Date,
  // workoutNumber: Number,
  exercises: [
    {
      exerciseName: String,
      muscleGroup: String,
      sets: [
        {
          reps: Number,
          weight: Number,
        },
      ],
    },
  ],
})

const Workout = mongoose.model('workout', workoutSchema)

module.exports = {
  Workout,
}
