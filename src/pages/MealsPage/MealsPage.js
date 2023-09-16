import { useEffect, useState } from 'react';

function MealsPage({ user }) {
  const [meals, setMeals] = useState([]);
  const [mealToEdit, setMealToEdit] = useState(null);
  const [editedMeal, setEditedMeal] = useState({
    dateAndTime: '',
    description: '',
    calories: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`/api/meals/${user}`, {
          method: 'GET',
          headers: {
            Authorization: token,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch meals');
        }
        const data = await response.json();
        setMeals(data);
      } catch (error) {
        console.error('Error fetching meals:', error);
      }
    };
    fetchData();
  }, [user]);

  const handleDelete = async (mealId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/meals/${mealId}`, {
        method: 'DELETE',
        headers: {
          Authorization: token,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to delete meal');
      }
      setMeals((prevMeals) => prevMeals.filter((meal) => meal._id !== mealId));
    } catch (error) {
      console.error('Error deleting meal:', error);
    }
  };

  const handleEdit = (meal) => {
    setMealToEdit(meal);
    setEditedMeal({
      dateAndTime: meal.dateAndTime,
      description: meal.description,
      calories: meal.calories,
    });
  };

  const handleInputChange = (e, field) => {
    setEditedMeal((prevEditedMeal) => ({
      ...prevEditedMeal,
      [field]: e.target.value,
    }));
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/meals/edit/${mealToEdit._id}`, {
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
      setMealToEdit(null);
    } catch (error) {
      console.error('Error updating meal:', error);
    }
  };

  const handleCancel = () => {
    setMealToEdit(null);
  };

  return (
    <div>
      <ul>
        {meals.map((meal) => (
          <div key={meal._id}>
            <li>
              {meal.dateAndTime}, {meal.description} - {meal.calories} calories
            </li>
            <button onClick={() => handleEdit(meal)}>Edit</button>
            <button onClick={() => handleDelete(meal._id)}>Delete</button>
            <br></br>
            {mealToEdit && mealToEdit._id === meal._id && (
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
                  <button type="button" onClick={handleCancel}>Cancel</button>
                </form>
              </div>
            )}
          </div>
        ))}
      </ul>
    </div>
  );
}

export default MealsPage;
