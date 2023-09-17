import LoginForm from "../../components/LoginForm/LoginForm";
import { Link } from "react-router-dom";


export default function LogInPage({ setUser }) {
    return (
        <div>
            <h1>Please Login</h1>
            <h3>Don't have an account? Please&nbsp;
                <Link to="/signup">sign up here</Link>
            </h3>
            <LoginForm setUser={setUser} />
        </div>
    );
}
