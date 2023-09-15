import { useState } from 'react';

function MealForm() {
  const [formData, setFormData] = useState({
    dateAndTime: '',
    description: '',
    calories: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch('/api/meals/new', {
        method: 'POST',
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          dateAndTime: formData.dateAndTime,
          description: formData.description,
          calories: formData.calories,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create meal');
      }
    } catch (error) {
      console.error('Error creating meal:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Date and Time:</label>
        <input
          type="datetime-local"
          name="dateAndTime"
          value={formData.dateAndTime}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Description:</label>
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Calories:</label>
        <input
          type="number"
          name="calories"
          value={formData.calories}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <button type="submit">Add Meal</button>
      </div>
    </form>
  );
}

export default MealForm;

