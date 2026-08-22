import { useState } from "react";
import { Link } from "react-router-dom";
import "./Signup.css";

// Define the environment variable at the top
const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

function Signup() {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            username: userName,
            email: email,
            password: password
        };

        console.log(data);

        // Replace http://127.0.0.1:8000 with ${API_URL}
        const response = await fetch(
            `${API_URL}/footballapp/register/`,
            {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(data)
            }
        );

        const result = await response.json();

        if (response.ok) {
            console.log("User registered Successfully!");
            console.log(result);
        } else {
            console.log("Registration Failed");
            console.log(result);
        }
    };

    return (
        <div className="signup-page">
            <div className="signup-card">

                <div className="signup-header">
                    <div className="signup-icon">⚽</div>

                    <h1>Create Account</h1>

                    <p>
                        Create your football dashboard account
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="signup-form">

                    <div className="signup-form-group">
                        <label>Username</label>

                        <input
                            type="text"
                            placeholder="Enter your username"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="signup-form-group">
                        <label>Email</label>

                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="signup-form-group">
                        <label>Password</label>

                        <input
                            type="password"
                            placeholder="Create a password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="signup-button">
                        Sign Up
                    </button>

                </form>

                <div className="login-link">
                    <span>Already have an account?</span>

                    <Link to="/login">
                        Log In
                    </Link>
                </div>

            </div>
        </div>
    );
}

export default Signup;