export default function MainPage() {
    return (
        <div>
            <header>
                <h1>Welcome to the Meal Tracker</h1>
                <p>Your personal meal management application!</p>
            </header>

            <section id="getting-started">
                <h2>Getting Started</h2>
                <p>To use the Meal Tracker, you can create an account and log in. Once you're logged in, you gain access to a set of powerful features that help you manage your daily meals and caloric intake effectively.</p>
            </section>

            <section id="meal-management">
                <h2>Meal Management</h2>

                <h3>List of Meals</h3>
                <ul>
                    <li>You can view a list of all your meals, including their date, time, description, and the number of calories.</li>
                    <li>Easily track and manage your daily food consumption.</li>
                </ul>

                <h3>Add New Meals</h3>
                <ul>
                    <li>Create new meal entries by specifying the date, time, description, and the number of calories manually.</li>
                    <li>Keep a detailed record of your dietary habits.</li>
                </ul>

                <h3>Edit Meals</h3>
                <ul>
                    <li>Update any meal's details, such as date, time, description, and calorie count.</li>
                    <li>Make adjustments whenever you need to.</li>
                </ul>

                <h3>Delete Meals</h3>
                <ul>
                    <li>Remove unwanted meal entries from your list.</li>
                    <li>Keep your meal history clean and organized.</li>
                </ul>
            </section>

            <section id="meal-filtering">
                <h2>Meal Filtering</h2>
                <p>Filter your meals by specifying a date range, allowing you to see your caloric intake for a specific period. Get insights into your eating habits on specific days.</p>
            </section>

            <section id="user-settings">
                <h2>User Settings</h2>

                <h3>Expected Calories Per Day</h3>
                <ul>
                    <li>Set your expected number of calories per day in the user settings.</li>
                    <li>Use this value to monitor whether you're meeting your daily caloric goals.</li>
                </ul>
            </section>

            <section id="color-coded-meals">
                <h2>Color-Coded Meals</h2>
                <p>Your meals are color-coded for quick visual reference. Meals turn green if your total daily caloric intake is below your expected calories per day. Meals turn red if you've exceeded your daily caloric goal, serving as a helpful reminder to stay on track.</p>
            </section>

            <section id="technical-details">
                <h2>Technical Details</h2>
                <ul>
                    <li>The Meal Tracker is a single-page application (SPA), ensuring a smooth and seamless user experience without the need for page refreshes.</li>
                    <li>All actions, including adding, editing, and deleting meals, are performed using API calls for real-time updates.</li>
                    <li>We have implemented a backend API to manage data storage, enabling secure and efficient data handling.</li>
                </ul>
            </section>
        </div>
    );
}
