import React, { useContext, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Input from "../../components/Input/Input";
import { validateEmail } from "../../utils/helper";
import axios from "axios";
import { API_PATHS } from "../../utils/apiPaths";
import { userContext } from "../../context/userContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { user, updateUser } = useContext(userContext); // Get the context

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Enter a valid email address");
      return;
    }
    if (!password) {
      setError("Please enter the password");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:7000/api/users/login", {
        email,
        password,
      });

      const { token } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(userData); 
        // Ensure updateUser exists before calling
        if (updateUser) {
          updateUser(userData);
          console.log('User updated in context:', userData);
        } else {
          console.error('updateUser function missing in context');
        }
        setEmail("");
        setPassword("");
        setError(null);
        navigate("/");
      } else {
        setError("Invalid authentication response");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError(
        error.response?.data?.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
      <div className="bg-gray-900 w-full flex h-screen p-10 justify-center">
        <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center card">
        <h3 className="text-xl font-semibold text-white">Welcome Back</h3>
        <p className="text-xs text-slate-300 mt-[5px] mb-6">
          Please enter your details to log in
        </p>
        <form onSubmit={handleSubmit}>
          <Input
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label="Email Address"
            placeholder="john@gmail.com"
            type="email"
          />
          <Input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label="Password"
            placeholder="Min 8 characters"
            type="password"
          />

          {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

          <button 
            type="submit" 
            className="btn-primary" 
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'LOGIN'}
          </button>
          <p className="text-[13px] text-slate-300 mt-3">
            Don't have an account?{" "}
            <Link className="font-medium text-primary underline" to="/signUp">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
      </div>
  );
};

export default Login;
