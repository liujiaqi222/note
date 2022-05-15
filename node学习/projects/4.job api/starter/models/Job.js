const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  company: {
    type: String,
    require: [true, 'Please provide company name'],
    maxlength: 20,
  },
  position: {
    type: String,
    require: [true, 'Please provide position name'],
    maxlength: 100,
  },
  status: {
    type: String,
    enum: ['interview', 'decline', 'pending'],
    default: 'pending'
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please provide user id']

  }
}, {
  // The timestamps option tells mongoose to assign createdAt and updatedAt fields to your schema. 
  timestamps: true
})

module.exports = mongoose.model('Job', JobSchema)