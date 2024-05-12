// Import React and other necessary libraries
import React, { useState } from "react";
import axios from "axios";
import { Link, redirect } from "react-router-dom";
import "./Login.css"; // Import the CSS module
import {
  createToBD,
  deleteByIDToBD,
  selectToBD,
  urlLogin,
  redirectRegister,
  SuccessAlert,
  ErrorAlert,
} from "../../GlobalVariables";

const Login = () => {
  const [data, setData] = useState({ email: "", password: "", role: "" });
  const [error, setError] = useState("");

  const handleChange = ({ target: { name, value } }) => {
    setData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data: res } = await axios.post(urlLogin, data);
      localStorage.setItem("token", res.data);
      window.location = "/"; // Or redirect using react-router
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(<ErrorAlert message={error.response.data.message} />);
      }
    }
  };

  return (
    <div className="login_container">
      <div className="login_form_container">
        <div className="left">
          <h1>No tienes cuenta</h1>
          <Link to={redirectRegister}>
            <button type="button" className="white_btn">
              Registrarse
            </button>
          </Link>
        </div>
        <div className="right">
          <form className="form_container" onSubmit={handleSubmit}>
            <h1>Inicia sesión en tu cuenta</h1>
            <input
              type="email"
              placeholder="Correo Electrónico"
              name="email"
              onChange={handleChange}
              value={data.email}
              required
              className="input"
            />
            <input
              type="password"
              placeholder="Contraseña"
              name="password"
              onChange={handleChange}
              value={data.password}
              required
              className="input"
            />
            <div className="inputBox">
              <select
                name="role"
                onChange={handleChange}
                value={data.role}
                className="input"
              >
                <option value={"Client"}>Cliente</option>
                <option value={"Staff"}>Personal</option>
              </select>
            </div>
            {error && <div className="errorMsg">{error}</div>}
            <button type="submit" className="form_btn">
              Iniciar sesión
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
