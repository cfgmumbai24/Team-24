import React, { useState } from "react";
import logo from "../cluster_user/logo.png";
import "../auth/SignIn.css";
import config from "../config/config";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const superUserRoles = {
    ADMIN: "ADMIN",
    SUB_ADMIN: "SUB_ADMIN",
    CLUSTER_USER: "CLUSTER_USER",
  };

  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.name === "username") {
      setEmail(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const data = {
        email,
        password,
      };

      const response = await axios.post(
        `${config.BACKEND_URL}/super-user/login`,
        {
          ...data,
        }
      );
      toast("Wow so easy!");
      localStorage.setItem("token", response.data.data.token);
      console.log(response.data);
      const role = response.data.data.user.role;

      switch (role) {
        case superUserRoles.ADMIN:
          navigate("/admin");
          break;
        case superUserRoles.SUB_ADMIN:
          navigate("/subadmin");
          break;
        case superUserRoles.CLUSTER_USER:
          navigate("/cluster-user");
          break;
        default:
          navigate("/");
          break;
      }
    } catch (error) {
      // show case error
      toast("Enter valid credentials!");
      throw new Error(error);
    } finally {
      setIsLoading(false);
    }
    storeCredentials(email, password);
  };

  const storeCredentials = (email, password) => {
    console.log(`Email: ${email}, Password: ${password}`);

    setEmail("");
    setPassword("");
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>JANARDAN PRASAD MEMORIAL SOCIETY</h1>
        <div className="user-info">
          <div className="user-icon">UA</div>
          <div className="user-name">User ABC</div>
        </div>
      </header>
      <main className="signin-container">
        <h2>Sign In</h2>
        <form className="signin-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              id="email"
              name="username"
              value={email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="signin-button">
            Sign In
          </button>
        </form>
      </main>
    </div>
  );
}

export default SignInPage;
