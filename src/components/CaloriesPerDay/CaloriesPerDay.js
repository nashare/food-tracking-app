import { useState, useEffect } from 'react';

export default function CaloriesPerDay({ user, setUser }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedCaloriesPerDay, setEditedCaloriesPerDay] = useState(user.caloriesPerDay);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    useEffect(() => {
        setEditedCaloriesPerDay(localStorage.getItem('caloriesPerDay'));
    }, [user]);
    
    const handleSaveClick = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('/api/users', {
                method: 'PATCH',
                headers: {
                    Authorization: token,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ caloriesPerDay: editedCaloriesPerDay }),
            });
            if (!response.ok) {
                throw new Error('Failed to update meal');
            }
            const data = await response.json();
            setUser(data);
            localStorage.setItem('caloriesPerDay', data.caloriesPerDay);
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating meal:', error);
        }
    };

    const handleCancelClick = () => {
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
                        Your calories per day value is: {editedCaloriesPerDay}
                        <button onClick={handleEditClick}>Edit</button>
                    </div>
                )}
            </div>
        </div>
    );
}
