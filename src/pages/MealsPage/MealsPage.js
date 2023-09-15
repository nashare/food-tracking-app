import { useEffect, useState } from 'react';

function MealsPage({user}) {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`/api/meals/${user}`, {
          method: 'GET',
          headers: {
            Authorization: token,
          }
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

  return (
    <div>
      <ul>
        {meals.map((meal) => (
          <div>
            <li key={meal.id}>{meal.dateAndTime}, {meal.description} - {meal.calories} calories</li>
          <br></br>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default MealsPage;
