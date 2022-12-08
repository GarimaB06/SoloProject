const mongoose = require('mongoose')

const MONGO_URI = ''
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'exercises',
  })
  .then(() => console.log('Connected to Mongo DB.'))
  .catch((err) => console.log(err))

const Schema = mongoose.Schema

const exerciseSchema = new Schema({
  date: Date,
  muscleGroup: String,
  exerciseName: String,
  sets: [
    {
      weight: Number,
      reps: Number,
    },
  ],
})

const Exercise = mongoose.model('exercise', exerciseSchema)

module.exports = {
  Exercise,
}
