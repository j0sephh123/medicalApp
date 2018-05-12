const mongoose = require('mongoose');

const groupSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    mechanismOfAction: { type: String, default: 'mechanism of action goes here' },
});

module.exports = mongoose.model('Group', groupSchema);