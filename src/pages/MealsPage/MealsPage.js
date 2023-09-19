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
          <div className="column is-narrow" >
            <li className="card" key={meal._id}>
              <div className="card-content">              
              <p>
                Date: {meal.dateAndTime.split('T')[0]}
              </p>
              <p>
                Time: {meal.dateAndTime.split('T')[1].slice(0, 5)}
              </p>
              <div className={meal.color === 'red' ? 'has-text-danger' : meal.color === 'green' ? 'has-text-success' : ''}>
                <p>{meal.description}</p>
                <p>{meal.calories} calories</p>
              </div>
              </div>
            <footer className="card-footer">
                <p className="card-footer-item" onClick={() => handleEdit(meal)}>Edit</p>
                <p className="card-footer-item" onClick={() => handleDelete(meal._id)}>Delete</p>
            </footer>
            </li>
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
      <p className="title is-4 pt-4">Total Calories: {totalCalories} calories</p>
    </div>
  );
}

export default MealsPage;
