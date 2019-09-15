const mongoose = require('mongoose');

const woodSchema = mongoose.Schema({
  name: {
    required: true,
    type: String,
    unique: 1,  
    maxlength: 30
  }
})

const Wood = mongoose.model('Wood', woodSchema);

module.exports = { Wood } 