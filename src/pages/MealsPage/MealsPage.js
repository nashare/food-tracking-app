import { useEffect, useState } from 'react';

function MealsPage({ user }) {
  const [meals, setMeals] = useState([]);
  const [mealToEdit, setMealToEdit] = useState(null);
  const [editedMeal, setEditedMeal] = useState({
    dateAndTime: '',
    description: '',
    calories: '',
  });
  const [filterFrom, setFilterFrom] = useState('');
  const [filterTo, setFilterTo] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`/api/meals/${user._id}`, {
          method: 'GET',
          headers: {
            Authorization: token,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch meals');
        }
        const data = await response.json();
        data.sort((a, b) => {
          const dateA = new Date(a.dateAndTime);
          const dateB = new Date(b.dateAndTime);
          return dateB - dateA;
        });
        let i = 0;
        while (i < data.length) {
          let caloriesCounter = data[i].calories;
          let c = i+1;
          while (c < data.length && data[c].dateAndTime.slice(0, 10) === data[i].dateAndTime.slice(0, 10)) {
            caloriesCounter += data[c].calories
            c++;
          }
          if (caloriesCounter > localStorage.getItem('caloriesPerDay')) {
            for (let m = i; m < c; m++) {
              data[m].color = "red";
            }
          } else {
            for (let m = i; m < c; m++) {
              data[m].color = "green";
            }
          }
          i = c;
        }
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

  const handleFilter = () => {
    const filteredMeals = meals.filter((meal) => {
      const mealDate = new Date(meal.dateAndTime);
      const fromDate = new Date(filterFrom);
      const toDate = new Date(filterTo);

      // Check if the meal date is within the selected range.
      return mealDate >= fromDate && mealDate <= toDate;
    });

    // Update the state with the filtered meals.
    setMeals(filteredMeals);
  };

  return (
    <div>
      <div>
        {/* Date filtering inputs */}
        <input
          type="date"
          placeholder="From Date"
          value={filterFrom}
          onChange={(e) => setFilterFrom(e.target.value)}
        />
        <input
          type="date"
          placeholder="To Date"
          value={filterTo}
          onChange={(e) => setFilterTo(e.target.value)}
        />
        <button onClick={handleFilter}>Filter</button>
      </div>
      <ul>
        {meals.map((meal) => (
          <div key={meal._id}>
            <li className={meal.color === 'red' ? 'red-meal' : meal.color === 'green' ? 'green-meal' : ''}>
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
