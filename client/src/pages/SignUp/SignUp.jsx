import React, { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import PasswordInput from '../../components/Input/PasswordInput';
import ConfirmPasswordInput from '../../components/Input/ConfirmPasswordInput'; 
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { validEmail } from '../../utils/helper';

const API_BASE_URL = 'http://localhost:5000';

function SignUp() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignUp = async (event) => {
    event.preventDefault();

    const { name, email, password, confirmPassword } = formData;

    if (!validEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!name) {
      setError("Name is required");
      return;
    }

    if (!password) {
      setError("Password is required");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const response = await axios.post(`${API_BASE_URL}/auth/register`, { email, password, name });
      setMessage("Registration successful!"); 
      localStorage.setItem("token", response.data.token); 

      navigate("/dashboard");
    } catch (error) {
      setError("Registration failed: " + (error.response?.data?.error || "Something went wrong."));
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
            <div className="bg-white border border-gray-300 rounded-lg p-6 max-w-md shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] max-md:mx-auto">
              <form className="space-y-4" onSubmit={handleSignUp}>
                <div className="mb-8">
                  <h3 className="text-gray-800 text-2xl">Sign Up</h3>
                </div>

                <div>
                  <label className="text-gray-800 text-sm mb-2 block">Name</label>
                  <input
                    value={formData.name}
                    onChange={handleChange}
                    name="name"
                    type="text"
                    required
                    className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-lg outline-darkTeal"
                    placeholder="Enter Name"
                  />
                </div>

                <div>
                  <label className="text-gray-800 text-sm mb-2 block">Email</label>
                  <input
                    value={formData.email}
                    onChange={handleChange}
                    name="email"
                    type="email"
                    required
                    className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-lg outline-darkTeal"
                    placeholder="Enter email"
                  />
                </div>

                <PasswordInput
                  value={formData.password}
                  onChange={handleChange}
                  name="password"
                />

                <ConfirmPasswordInput
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  name="confirmPassword"
                />

                {error && <p className='text-red-500 text-sm pb-1'>{error}</p>}
                {message && <p className="text-green-500 text-sm pb-1">{message}</p>} 

                <div className="!mt-8">
                  <button
                    type="submit"
                    className="w-full shadow-xl py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-darkTeal hover:bg-hoverTeal focus:outline-none"
                    disabled={loading}
                  >
                    {loading ? "Creating Account..." : "Create Account"}
                  </button>
                </div>

                <p className="text-sm !mt-8 text-center text-gray-800">
                  Already have an account{' '}
                  <Link to="/Login" className="text-darkTeal font-semibold hover:underline ml-1 whitespace-nowrap">
                    Log in here
                  </Link>
                </p>
              </form>
            </div>
            <div className="hidden md:block lg:h-[500px] md:h-[400px] max-md:mt-8">
              <img
                src={"https://img.freepik.com/free-vector/button-style-concept-illustration_114360-4274.jpg?t=st=1727309835~exp=1727313435~hmac=f2922dce983eb9c25ebd70e08fa1a3b4c0c7366017f06a6750087e002c3f1cbc&w=740"}
                className="w-full h-full mx-auto block object-cover"
                alt="Signup Illustration"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;
