import MealForm from "../../components/MealForm/MealForm";

export default function NewMealPage() {
  return (
    <div className="container is-flex is-flex-direction-column is-justify-content-center is-align-items-center">
    <h1 className="title is-3 pt-6">Add a new meal</h1>
    <MealForm />
    </div>
  );
}