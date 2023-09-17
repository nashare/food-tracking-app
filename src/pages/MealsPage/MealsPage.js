import { useEffect, useState } from 'react';
import MealFilter from "../../components/MealFilter/MealFilter";


function MealsPage({ user }) {
  const [meals, setMeals] = useState([]);
  const [originalMeals, setOriginalMeals] = useState([]);
  const [mealToEdit, setMealToEdit] = useState(null);
  const [editedMeal, setEditedMeal] = useState({
    dateAndTime: '',
    description: '',
    calories: '',
  });
  const currentDate = new Date().toISOString().split('T')[0];
  const [filterFrom, setFilterFrom] = useState('');
  const [filterTo, setFilterTo] = useState(currentDate);

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
        setOriginalMeals(data);
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
    let filteredMeals;
    if (filterFrom === "") {
      const toDate = new Date(filterTo).toISOString().split('T')[0];
      filteredMeals = originalMeals.filter((meal) => {
        const mealDate = new Date(meal.dateAndTime).toISOString().split('T')[0];
        return mealDate <= toDate;
      });
    } else {
      const fromDate = new Date(filterFrom).toISOString().split('T')[0];
      const toDate = new Date(filterTo).toISOString().split('T')[0];
      filteredMeals = originalMeals.filter((meal) => {
        const mealDate = new Date(meal.dateAndTime).toISOString().split('T')[0];
        return mealDate >= fromDate && mealDate <= toDate;
      });
    }

    setMeals(filteredMeals);
  };

  const handleCancelFilter = () => {
    setFilterFrom('');
    setFilterTo(currentDate);
    setMeals(originalMeals);
  };

  const handleFilterChange = (field, value) => {
    if (field === 'filterFrom') {
      setFilterFrom(value);
    } else if (field === 'filterTo') {
      setFilterTo(value);
    }
  };

  const totalCalories = meals.reduce((total, meal) => total + meal.calories, 0);

  return (
    <div>
        <MealFilter
        filterFrom={filterFrom}
        filterTo={filterTo}
        onFilterChange={handleFilterChange}
        onFilter={handleFilter}
        onCancelFilter={handleCancelFilter}
      />
      <ul>
        {meals.map((meal) => (
          <div key={meal._id}>
            <li className={meal.color === 'red' ? 'red-meal' : meal.color === 'green' ? 'green-meal' : ''}>
              {meal.dateAndTime.split('T')[0]}, {meal.dateAndTime.split('T')[1].slice(0,8)}, {meal.description} - {meal.calories} calories
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
      <p>Total Calories: {totalCalories} calories</p>
    </div>
  );
}

export default MealsPage;
