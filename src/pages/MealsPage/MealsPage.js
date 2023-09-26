import { useEffect, useState } from 'react';
import { applyColors } from "./utils/mealUtils";
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
  const [filterFrom, setFilterFrom] = useState('');
  const [filterTo, setFilterTo] = useState('');

  const sortMeals = (meals) => {
    return meals.sort((a, b) => {
      const dateA = new Date(a.dateAndTime);
      const dateB = new Date(b.dateAndTime);
      return dateB - dateA;
    });
  };

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
      let data = await response.json();
      data = sortMeals(data);
      data = applyColors(data, user.caloriesPerDay);
      setMeals(data);
      setOriginalMeals(data);
    } catch (error) {
      console.error('Error fetching meals:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
      fetchData();
      // setMeals((prevMeals) => prevMeals.filter((meal) => meal._id !== mealId));
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

  const handleUpdate = async (e) => {
    e.preventDefault();
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
      // const updatedMeal = await response.json();
      // setMeals(prevMeals => {
      //   const updatedMeals = prevMeals.map(meal =>
      //     meal._id === updatedMeal.meal._id ? updatedMeal.meal : meal
      //   );
      //   return applyColors(sortMeals(updatedMeals));
      // });
      fetchData();
      setMealToEdit(null);
    } catch (error) {
      console.error('Error updating meal:', error);
    }
  };

  const handleCancel = () => {
    setMealToEdit(null);
  };

  const handleFilter = (e) => {
    e.preventDefault();
    if (filterTo === "" && filterFrom === "" ) {
      return
    }
    let filteredMeals;
    if (filterFrom === "") {
      const dateTo = new Date(filterTo);
      dateTo.setDate(dateTo.getDate() + 1);
      filteredMeals = originalMeals.filter((meal) => {
        const mealDateToLocale = new Date(meal.dateAndTime).toLocaleString("en-US").split(', ')[0];
        const dateMeal = new Date(mealDateToLocale);
        return dateMeal <= dateTo;
      });
    } else if (filterTo === "") {
      const dateFrom = new Date(filterFrom)
      filteredMeals = originalMeals.filter((meal) => {
        const mealDateToLocale = new Date(meal.dateAndTime).toLocaleString("en-US").split(', ')[0];
        const dateMeal = new Date(mealDateToLocale);
        return dateMeal >= dateFrom;
      });
    }
    else {
      filteredMeals = originalMeals.filter((meal) => {
        const dateTo = new Date(filterTo);
        const dateFrom = new Date(filterFrom);
        dateTo.setDate(dateTo.getDate() + 1);
        const mealDateToLocale = new Date(meal.dateAndTime).toLocaleString("en-US").split(', ')[0];
        const dateMeal = new Date(mealDateToLocale);
        return dateMeal >= dateFrom && dateMeal <= dateTo;
      });
    }
    setMeals(filteredMeals);
  };

  const handleCancelFilter = () => {
    setFilterFrom('');
    setFilterTo('');
    fetchData();
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
    <div className="container is-flex is-flex-direction-column is-justify-content-center is-align-items-center mt-6 mb-6">
      <MealFilter
        filterFrom={filterFrom}
        filterTo={filterTo}
        onFilterChange={handleFilterChange}
        onFilter={handleFilter}
        onCancelFilter={handleCancelFilter}
      />
      <ul className="columns is-multiline p-6 is-centered">
        {meals.map((meal) => (
          <div key={meal._id}>
            {mealToEdit && mealToEdit._id === meal._id ? (
              <div className="column is-narrow">
                <li className="card">
                <form onSubmit={handleUpdate}>
                  <div className="card-content">
                  <div className="field">
                    <input
                      className="input is-small"
                      type="datetime-local"
                      onChange={(e) => handleInputChange(e, 'dateAndTime')}
                    />
                    </div>
                    <div className="field">
                      <input
                        className="input is-small"
                        type="text"
                        value={editedMeal.description}
                        onChange={(e) => handleInputChange(e, 'description')}
                      />
                    </div>
                    <div className="field">
                      <input
                        className="input is-small"
                        type="number"
                        value={editedMeal.calories}
                        onChange={(e) => handleInputChange(e, 'calories')}
                      />
                    </div>
                  </div>
                    <footer className="card-footer">
                      <button className="card-footer-item p-button" type="submit">Update</button>
                      <button className="card-footer-item p-button" type="button" onClick={handleCancel}>Cancel</button>
                  </footer>
                </form>
                </li>
              </div>
            ) : (
              <div className="column is-narrow">
                <li className="card">
                  <div className="card-content">
                      <p>Date: {new Date(meal.dateAndTime).toLocaleString("en-US").split(', ')[0]}</p>
                      <p>Time: {new Date(meal.dateAndTime).toLocaleString("en-US").split(', ')[1]}</p>
                    <div className={meal.color === 'red' ? 'has-text-danger' : meal.color === 'green' ? 'has-text-success' : ''}>
                      <p>{meal.description}</p>
                      <p>{meal.calories} calories</p>
                    </div>
                  </div>
                    <footer className="card-footer">
                      <p className="card-footer-item p-link" onClick={() => handleEdit(meal)}>Edit</p>
                      <p className="card-footer-item p-link" onClick={() => handleDelete(meal._id)}>Delete</p>
                    </footer>
                </li>
              </div>
            )}
          </div>
        ))}
      </ul>
      <p className="title is-4 pt-4">Total Calories: {totalCalories} calories</p>
    </div>
  );


}

export default MealsPage;