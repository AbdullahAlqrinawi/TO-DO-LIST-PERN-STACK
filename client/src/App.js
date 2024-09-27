import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import Main from "./pages/Home/Main";

const routes = (
  <Router>
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/dashboard" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/SignUp" element={<SignUp />} />
    </Routes>
  </Router>
);

function App() {
  return (
    <div>
      {routes}
    </div>
  );
}

export default App;
