import { useState } from 'react';
import { signUp } from '../../utilities/users-service';
import { useNavigate } from 'react-router-dom';

export default function SignUpForm({ setUser }) {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirm: '',
        error: '',
    });

    const handleChange = (evt) => {
        setFormData({
            ...formData,
            [evt.target.name]: evt.target.value,
            error: '',
        });
    };

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        try {
            const { confirm, error, ...userData } = formData;
            const user = await signUp(userData);
            if (user) {
                setUser(user);
                navigate('/');
            }
        } catch {
            setFormData({ ...formData, error: 'Sign Up Failed - Try Again' });
        }
    };

    const disabled = formData.password !== formData.confirm;

    return (
        <div>
            <div>
                <form autoComplete="off" onSubmit={handleSubmit}>
                    <div className="field">
                        <p className="control has-icons-left">
                            <input className="input is-medium" type="text" name="name" placeholder="Your name" value={formData.name} onChange={handleChange} required />
                            <span className="icon is-small is-left">
                                <i className="fas fa-user"></i>
                            </span>
                        </p>
                    </div>
                    <div className="field">
                        <p className="control has-icons-left">
                            <input className="input is-medium" type="text" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                            <span className="icon is-small is-left">
                                <i className="fas fa-envelope"></i>
                            </span>
                        </p>
                    </div>
                    <div className="field">
                        <p className="control has-icons-left">
                            <input className="input is-medium" type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
                            <span className="icon is-small is-left">
                                <i className="fas fa-lock"></i>
                            </span>
                        </p>
                    </div>
                    <div className="field">
                        <p className="control has-icons-left">
                            <input className="input is-medium" type="password" name="confirm" placeholder="Confirm password" value={formData.confirm} onChange={handleChange} required />
                            <span className="icon is-small is-left">
                                <i className="fas fa-lock"></i>
                            </span>
                        </p>
                    </div>
                    <div className="field has-text-centered">
                        <button className="button is-medium is-info mt-3" type="submit" disabled={disabled}>Sign Up</button>
                    </div>
                </form>
            </div>
            <p className="has-text-danger-dark has-text-centered mt-4 is-size-5">{formData.error}</p>
        </div>
    );
}
