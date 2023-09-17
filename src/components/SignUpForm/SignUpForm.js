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
                    <label>Name</label>
                    <input
                        placeholder="Your name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                    <label>Email</label>
                    <input
                        placeholder="Email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <label>Password</label>
                    <input
                        placeholder="Password"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <label>Confirm</label>
                    <input
                        placeholder="Confirm password"
                        type="password"
                        name="confirm"
                        value={formData.confirm}
                        onChange={handleChange}
                        required
                    />
                    <button type="submit" disabled={disabled}>
                        Sign Up
                    </button>
                </form>
            </div>
            <p>&nbsp;{formData.error}</p>
        </div>
    );
}
