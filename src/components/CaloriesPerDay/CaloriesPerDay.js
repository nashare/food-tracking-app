import { useState } from 'react';

export default function CaloriesPerDay({ user, setUser, isEditing, setIsEditing }) {
    const [editedCaloriesPerDay, setEditedCaloriesPerDay] = useState(user.caloriesPerDay);

    const handleSaveClick = async (e) => {
        e.preventDefault();
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
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating meal:', error);
        }
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
                            <div className="control">
                                <input className="input is-small" type="number" min="0" value={editedCaloriesPerDay} onChange={handleInputChange} required />
                            </div>
                            <div className="control is-flex is-align-items-center">
                                <i className="fa-solid fa-check" onClick={handleSaveClick}></i>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div>
                        <i className="fa-solid fa-pen"></i>
                        &nbsp;{editedCaloriesPerDay} calories per day
                    </div>
                )}
            </div>
        </div>
    );
}

