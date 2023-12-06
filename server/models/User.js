import mongoose from 'mongoose'
const Joi = require("joi")

const UserSchema = new mongoose.Schema({
    email: {type: String , required: true},
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
    finishedProgramDays: [{
      type: String,
      default: null,
    }]
  });

  const validate = (data) => {
    const schema = Joi.object({
      email: Joi.string().email().required().label("Email")
    })
    return schema.validate(data)
  }

  module.exports = {validate}

export default mongoose.model('User', UserSchema)  