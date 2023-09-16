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

async function deleteMeal(req, res) {
    try {
        const mealId = req.params.mealId;
        await Meal.findByIdAndRemove(mealId);
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting meal:', error);
        res.status(500).json({ error: 'An error occurred while deleting the meal' });
    }
}

async function update(req, res) {
    try {
        const mealId = req.params.mealId;
        const meal = await Meal.findById(mealId);
        if (!meal) {
            return res.status(404).json({ error: 'Meal not found' });
        }
        if (meal.user.toString() !== req.user._id) {
            return res.status(403).json({ error: 'You are not authorized to update this meal' });
        }
        meal.dateAndTime = req.body.dateAndTime;
        meal.description = req.body.description;
        meal.calories = req.body.calories;
        await meal.save();
        res.status(200).json({ message: 'Meal updated successfully', meal });
    } catch (error) {
        console.error('Error updating meal:', error);
        res.status(500).json({ error: 'An error occurred while updating the meal' });
    }
}

module.exports = {
    create,
    get,
    delete: deleteMeal,
    update
}