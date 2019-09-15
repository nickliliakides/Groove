const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const siteSchema = Schema({
  featured: {
    required: true,
    type: Array,
    default: []
  },
  siteInfo: {
    required: true,
    type: Array,
    default: []
  }
});

const Site = mongoose.model('Site', siteSchema);

module.exports = { Site } 