import { useEffect, useState } from 'react';

function MealsPage({ userId }) {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`/api/meals/${userId}`, {
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
  }, [userId]);

  return (
    <div>
      <ul>
        {meals.map((meal) => (
          <li key={meal.dateAndTime}>{meal.description} - {meal.calories} calories</li>
        ))}
      </ul>
    </div>
  );
}

export default MealsPage;
