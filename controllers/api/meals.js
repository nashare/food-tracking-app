const Meal = require('../../models/meal'); 

async function create(req, res) {
    try {
        const { dateAndTime, description, calories } = req.body;
        const userId = req.user._id;
        const newMeal = new Meal({
            dateAndTime,
            description,
            calories,
            user: userId,
        });

        await newMeal.save();

        res.status(201).json({ message: 'Meal created successfully', meal: newMeal });
    } catch (error) {
        console.error('Error creating meal:', error);
        res.status(500).json({ error: 'An error occurred while creating the meal' });
    }
}

async function get(req, res) {
    try {
        const userId = req.params.userId;
        const meals = await Meal.find({ user: userId });
        res.json(meals);
    } catch (error) {
        console.error('Error fetching meals:', error);
        res.status(500).json({
            error: 'An error occurred while fetching meals'
    })
}
}

module.exports = {
    create,
    get,
}