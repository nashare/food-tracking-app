import SignUpForm from "../../components/SignUpForm/SignUpForm";
import { Link } from "react-router-dom";

export default function MainPage({ setUser }) {
    return (
        <div className="container is-flex is-flex-direction-column is-justify-content-center is-align-items-center">
            <h1 className="title is-3 pt-6">Please Sign Up</h1>
            <h3 className="title is-6">Alredy have an account? Please&nbsp;
                <Link to="/login">log in here</Link>
            </h3>
            <SignUpForm setUser={setUser} />
        </div>
    );
}