import { useState } from "react";
import { Link } from "react-router-dom";
import
 "./Login.css";
const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';
function Login() {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            username: userName,
            password: password
        };

       const response = await fetch(
            `${API_URL}/footballapp/login/`,
            {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(data)
            }
        );

        const result = await response.json();
        console.log(result);

        if (response.ok) {
            localStorage.setItem("access", result.access);
            localStorage.setItem("refresh", result.refresh);
            window.location.href = "/";
        } else {
            console.log("Login Unsuccessful");
            console.log(result);
        }
    };

    return (
        <div className="login-page">
            <div className="login-card">

                <div className="login-header">
                    <div className="login-icon">⚽</div>
                    <h1>Welcome Back</h1>
                    <p>Sign in to your football dashboard</p>
                </div>

                <form onSubmit={handleSubmit} className="login-form">

                    <div className="form-group">
                        <label>Username</label>
                        <input
                            type="text"
                            placeholder="Enter your username"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="login-button">
                        Login
                    </button>

                </form>

                <div className="signup-link">
                    <span>Don't have an account?</span>
                    <Link to="/signup">Sign Up</Link>
                </div>

            </div>
        </div>
    );
}

export default Login;
