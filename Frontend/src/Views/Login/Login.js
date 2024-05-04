// Import React and other necessary libraries
import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Login.css';  // Import the CSS module

const Login = () => {
    const [data, setData] = useState({ email: "", password: "" ,role:""});
    const [error, setError] = useState("");

    const handleChange = ({ target: { name, value } }) => {
        setData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = "http://localhost:8080/api/auth";
            const { data: res } = await axios.post(url, data);
            localStorage.setItem("token", res.data);
            window.location = "/";  // Or redirect using react-router
        } catch (error) {
            if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                setError(error.response.data.message);
            }
        }
    };

    return (
        <div className=".wrapper">
            <form onSubmit={handleSubmit}>
                <p className="formLogin">Login to Your Account</p>
                <div className="inputBox">
                    <input
                        type="email"
                        placeholder="Email"
                        name="email"
                        required
                        onChange={handleChange}
                        value={data.email}
                        className="input"
                    />
                </div>
                <div className="inputBox">
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        required
                        onChange={handleChange}
                        value={data.password}
                        className="input"
                    />
                </div>
                <div className="inputBox">
							<select
								name="role"
								onChange={handleChange}
								value={data.role}
								className="input"
							>
								<option className='Client' value={"Client"} >Client</option>
								<option className='Staff' value={"Staff"} >Staff</option>
							</select>


						</div>
                {error && <div className="errorMsg">{error}</div>}
                <button type="submit" className="btn">Sign In</button>
                <div className="registerLink">
                    <p>Don’t have an account? <Link to="/SignIn" className="link">Register</Link></p>
                </div>
            </form>
        </div>
    );
};

export default Login;
