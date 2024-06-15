import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './RegisterCard.css';

const RegisterCard = () => {
    // State to store form inputs
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    // Handle form submission
    const handleRegister = async (event) => {
        event.preventDefault(); // Prevent the default form submission

        try {
            // Replace with your registration API URL
            const response = await fetch('/api/v1/user/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: `${firstName} ${lastName}`,
                    email,
                    password,
                }),
            });

            const result = await response.json();

            if (response.ok) {
                // Navigate to login page or dashboard
                navigate('/account/login');
            } else {
                alert(result.message || 'Registration failed');
            }
        } catch (error) {
            console.error('Registration error:', error);
            alert('Registration failed due to an unexpected error');
        }
    };

    return ( 
        <div className="register__card__container">
            <div className="register__card">
                <div className="register__header">
                    <h1>Create Account</h1>
                </div>
                <form className="register__inputs" onSubmit={handleRegister}>
                    <div className="fname__input__container reg__input__container">
                        <label className="fname__label input__label">First name</label>
                        <input 
                            type="text" 
                            className="fname__input register__input" 
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="lname__input__container reg__input__container">
                        <label className="lname__label input__label">Last name</label>
                        <input 
                            type="text" 
                            className="lname__input register__input" 
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="email__input__container reg__input__container">
                        <label className="email__label input__label">Email</label>
                        <input 
                            type="email" 
                            className="email__input register__input" 
                            placeholder='example@gmail.com' 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="password__input__container reg__input__container">
                        <label className="password__label input__label">Password</label>
                        <input 
                            type="password" 
                            className="password__input register__input" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="register__button__container">
                        <button type="submit" className="register__button">Create Account</button>
                    </div>
                </form>
                <div className="register__other__actions">
                    <div className="register__login__account">Already have account? <Link to="/account/login">Login</Link></div>
                </div>
            </div>
        </div>
    );
}
 
export default RegisterCard;
