import React, { useState } from 'react';

function Meal({ meal, onDelete, onEdit }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedMeal, setEditedMeal] = useState({
        dateAndTime: meal.dateAndTime,
        description: meal.description,
        calories: meal.calories,
    });

    const handleInputChange = (e, field) => {
        setEditedMeal((prevEditedMeal) => ({
            ...prevEditedMeal,
            [field]: e.target.value,
        }));
    };

    const handleUpdate = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`/api/meals/edit/${meal._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: token,
                },
                body: JSON.stringify(editedMeal),
            });

            if (!response.ok) {
                throw new Error('Failed to update meal');
            }
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating meal:', error);
        }
    };

    return (
        <div key={meal._id}>
            <li>
                {meal.dateAndTime}, {meal.description} - {meal.calories} calories
            </li>
            <button onClick={() => onEdit(meal)}>Edit</button>
            <button onClick={() => onDelete(meal._id)}>Delete</button>
            <br></br>
            {isEditing && (
                <div>
                    <form onSubmit={handleUpdate}>
                        <input
                            type="text"
                            value={editedMeal.dateAndTime}
                            onChange={(e) => handleInputChange(e, 'dateAndTime')}
                        />
                        <input
                            type="text"
                            value={editedMeal.description}
                            onChange={(e) => handleInputChange(e, 'description')}
                        />
                        <input
                            type="text"
                            value={editedMeal.calories}
                            onChange={(e) => handleInputChange(e, 'calories')}
                        />
                        <button type="submit">Update</button>
                        <button type="button" onClick={() => setIsEditing(false)}>
                            Cancel
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default Meal;
