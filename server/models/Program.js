import mongoose from 'mongoose'
const programSchema = new mongoose.Schema({
    name: String,
  result: [Number],
  days: [
    {
      dayId: Number,
      dayName: String,
      dayMeditation: { type: mongoose.Schema.Types.ObjectId, ref: 'Meditation' },
    },
  ],
});

  export default mongoose.model('Program', programSchema) 