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
                        <div className="field has-addons is-grouped">
                            <div class="control">
                                <input className="input is-small" type="number" min="0" value={editedCaloriesPerDay} onChange={handleInputChange} required />
                            </div>
                            <div class="control is-flex is-align-items-center">
                                <i class="fa-solid fa-check" onClick={handleSaveClick}></i>
                            </div>
                            <div class="control is-flex is-align-items-center">
                                <i class="fa-solid fa-xmark" onClick={handleCancelClick}></i>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div>
                        <i class="fa-solid fa-pen" onClick={handleEditClick}></i>
                            &nbsp;{editedCaloriesPerDay} calories per day
                    </div>
                )}
            </div>
        </div>
    );
}
