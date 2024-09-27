import React from 'react';
import { Link } from 'react-router-dom';

function Main() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-white">

      <div className="container mx-auto flex flex-col items-center justify-center py-16 md:py-24 lg:py-32">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          
          
          <div className="text-center md:text-left space-y-6">
            <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-800">
              Organize Your Life with   DO-IT
              List
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              Stay on top of your tasks and boost your productivity. Login or sign up to get started today.
            </p>
            
            <div className="flex space-x-6 justify-center md:justify-start">
              <Link to="/login">
                <button className="bg-darkTeal text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-hoverTeal transition duration-300 transform hover:scale-105">
                  Login
                </button>
              </Link>
              <Link to="/SignUp">
                <button className="bg-darkTeal text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-hoverTeal transition duration-300 transform hover:scale-105">
                Sign up
                </button>
              </Link>
            </div>
          </div>

          <div className="flex justify-center">
            <img 
              src="https://img.freepik.com/free-vector/team-checklist-concept-illustration_114360-10325.jpg?t=st=1727309768~exp=1727313368~hmac=4a0aaedfa01bb847e508f0f59b686d0e4d8aeef70d6d0c108b5aa95d75e6dc59&w=740"
              alt="App Illustration"
              className="w-80 h-80 object-cover shadow-lg rounded-lg transform hover:scale-105 transition duration-300"
              loading="lazy" 
            />
          </div>

        </div>
      </div>
    </div>
  );
}

export default Main;
