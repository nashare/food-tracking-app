export default function MainPage() {
    return (
        <div className="section is-small">
            <h1 className="title  has-text-centered">Welcome to the Food Tracker - Your personal meal management application!</h1>
            <h2 className="subtitle my-2"><i class="fa-solid fa-circle-check"></i>&nbsp; Getting Started</h2>
                <p className="my-1">To use the Food Tracker, you can create an account and log in. Once you're logged in, you gain access to a set of powerful features that help you manage your daily meals and caloric intake effectively.</p>

            <section className="container">
                <h2 className="subtitle my-2"><i class="fa-solid fa-circle-check"></i>&nbsp; Add New Meals</h2>
                <p className="my-1">Keep a detailed record of your dietary habits. Create new meal entries by specifying the date, time, description, and the number of calories manually.</p>
            </section>

            <section>
                <h2 className="subtitle my-2"><i class="fa-solid fa-circle-check"></i>&nbsp; List of Meals</h2>
                <p className="my-1">You can view a list of all your meals, update any meal's details, or remove unwanted meals.</p>
            </section>

            <section>
                <h2 className="subtitle my-2"><i class="fa-solid fa-circle-check"></i>&nbsp; Meal Filtering</h2>
                <p className="my-1">Filter your meals by specifying a date range, allowing you to see your caloric intake for a specific period. Get insights into your eating habits on specific days.</p>
            </section>

            <section>
                <h2 className="subtitle my-2"><i class="fa-solid fa-circle-check"></i>&nbsp; User Settings</h2>
                <p className="my-1">Set your expected number of calories per day in the user settings.</p>
            </section>

            <section>
                <h2 className="subtitle my-2"><i class="fa-solid fa-circle-check"></i>&nbsp; Color-Coded Meals</h2>
                <p className="my-1">Your meals are color-coded for quick visual reference. Meals turn green if your total daily caloric intake is below your expected calories per day. Meals turn red if you've exceeded your daily caloric goal, serving as a helpful reminder to stay on track.</p>
            </section>
        </div>
    );
}
