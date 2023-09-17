import SignUpForm from "../../components/SignUpForm/SignUpForm";
import { Link } from "react-router-dom";

export default function MainPage({ setUser }) {
    return (
        <div>
            <h1>Please Sign Up</h1>
            <h3>Alredy have an account? Please&nbsp;
                <Link to="/login">log in here</Link>
            </h3>
            <SignUpForm setUser={setUser} />
        </div>
    );
}