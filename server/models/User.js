import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    email: String,
    password: String,
    username: String,
    image: { type: String, default: '' },
    level: {
      type: Number,
      default: 0, 
    },
    rewards: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reward'
      }], // Tablica nagród
    savedMeditations: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'SavedMeditation'
    }],
    
    result: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Result',
      default: null, // Set the default value to null
    }],
    mood: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Mood',
      },
    ],
    finishedMeditations: {
      type: Number,
      default: 0, 
    },
    finishedDifferentMeditations: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Meditation'
    }],
    finishedProgramDays: [
      {
        dayName: {
          type: String,
          required: true,
        },
        timestamp: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  });

export default mongoose.model('User', UserSchema)  