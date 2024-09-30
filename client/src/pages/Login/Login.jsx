import React, { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import PasswordInput from '../../components/Input/PasswordInput';
import { Link, useNavigate } from 'react-router-dom';
import { validEmail } from '../../utils/helper';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(""); 
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validEmail(formData.email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!formData.password) {
      setError("Password is required");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, formData);
      
      localStorage.setItem("token", response.data.token);

      navigate("/dashboard");
    } catch (error) {
      setError(error.response?.data?.error || "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="font-[sans-serif] bg-custom">
        <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
          <div className="grid md:grid-cols-2 items-center gap-4 max-w-6xl w-full">
            <div className="bg-white border border-gray-300 rounded-lg p-6 max-w-md shadow-md max-md:mx-auto">
              <form className="space-y-4" onSubmit={handleSubmit}>
                <h3 className="text-gray-800 text-2xl">Login</h3>
                <label className="text-gray-800 text-sm mb-2 block">Email</label>
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  required
                  className="w-full text-sm outline-darkTeal text-gray-800 border border-gray-300 px-4 py-3 rounded-lg"
                  placeholder="Enter email"
                />
                <PasswordInput value={formData.password} onChange={(e) => handleChange(e)} />
                
                {error && <p className='text-red-500 text-sm pb-1'>{error}</p>}

                <button type="submit" className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-darkTeal hover:bg-hoverTeal" disabled={loading}>
                  {loading ? "Logging in..." : "Log in"}
                </button>

                <p className="text-sm text-center text-gray-800">
                  Don't have an account?{" "}
                  <Link to="/SignUp" className="text-darkTeal font-semibold hover:underline">
                    Register here
                  </Link>
                </p>
              </form>
            </div>

            <div className="hidden md:block">
              <img 
                src="https://img.freepik.com/free-vector/kanban-method-concept-illustration_114360-9907.jpg?t=st=1727309698~exp=1727313298~hmac=1f0ac6e235862e3b8c996a500ba53fa4a652be9938cc1ff1578ee5b91419965f&w=740"
                className="w-full h-full object-cover"
                alt="Login Illustration"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
