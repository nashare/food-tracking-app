const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mealSchema = new Schema({
    dateAndTime: {
        type: Date,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    calories: {
        type: Number,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});

const Meal = mongoose.model('Meal', mealSchema);

module.exports = Meal;