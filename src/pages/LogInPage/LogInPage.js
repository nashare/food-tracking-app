import LoginForm from "../../components/LoginForm/LoginForm";
import { Link } from "react-router-dom";


export default function LogInPage({ setUser }) {
    return (
        <div className="container is-flex is-flex-direction-column is-justify-content-center is-align-items-center">
            <h1 className="title is-3 pt-6">Please Login</h1>
            <h3 className="title is-6">Don't have an account? Please&nbsp;
                <Link to="/signup">sign up here</Link>
            </h3>
            <LoginForm setUser={setUser} />
        </div>
    );
}
