import React, { useState } from 'react';

export default function CaloriesPerDay({ user }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedCaloriesPerDay, setEditedCaloriesPerDay] = useState(user.caloriesPerDay);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        // Perform your logic to save the edited value
        // For example, you can make an API request here to update the value in the backend
        // Once saved, update the local state and set isEditing to false
        // In this example, we're just updating the local state for demonstration
        setIsEditing(false);
        user.caloriesPerDay = editedCaloriesPerDay;
    };

    const handleCancelClick = () => {
        // Cancel the edit and reset the edited value
        setIsEditing(false);
        setEditedCaloriesPerDay(user.caloriesPerDay);
    };

    const handleInputChange = (e) => {
        setEditedCaloriesPerDay(e.target.value);
    };

    return (
        <div>
            <div>
                {isEditing ? (
                    <div>
                        <input
                            type="number"
                            value={editedCaloriesPerDay}
                            onChange={handleInputChange}
                        />
                        <button onClick={handleSaveClick}>Save</button>
                        <button onClick={handleCancelClick}>Cancel</button>
                    </div>
                ) : (
                    <div>
                        Your calories per day value is: {user.caloriesPerDay}
                        <button onClick={handleEditClick}>Edit</button>
                    </div>
                )}
            </div>
        </div>
    );
}
