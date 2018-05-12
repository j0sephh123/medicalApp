const mongoose = require('mongoose');

const drugSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    group: { type: mongoose.Schema.Types.ObjectId, ref: 'Group', required: true },
    name: { type: String, required: true },
    dose: { type: String, required: false }
});

module.exports = mongoose.model('Drug', drugSchema);