const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const paymentSchema = Schema({
  user: {
    type: Object,
    default: {}
  },
  data: {
    type: Object,
    default: {}
  },
  product: {
    type: Array,
    defult: []
  }
});

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = { Payment } 