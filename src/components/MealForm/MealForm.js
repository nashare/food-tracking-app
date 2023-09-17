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

  const disabled = formData.dateAndTime === "" || formData.calories === "" || formData.description === "";

  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <label className="label">Date and Time:</label>
        <div class="control">
        <input
          className="input is-medium"
          type="datetime-local"
          name="dateAndTime"
          value={formData.dateAndTime}
          onChange={handleChange}
          required
        />
        </div>
      </div>
      <div className="field">
        <label className="label">Description:</label>
        <div class="control">
        <input
          className="input is-medium"
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
        </div>
      </div>
      <div className="field">
        <label className="label">Calories:</label>
        <div class="control">
        <input
          className="input is-medium"
          type="number"
          name="calories"
          value={formData.calories}
          onChange={handleChange}
          min="0"
          required
        />
        </div>
      </div>
      <div className="field has-text-centered">
        <button className="button is-medium is-info mt-3" type="submit" disabled={disabled}>Add Meal</button>
      </div>
    </form>
  );
}

export default MealForm;

