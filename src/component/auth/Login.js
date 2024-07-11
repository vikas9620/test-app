import React, { useState } from "react";
import 'tailwindcss/tailwind.css';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password || !category) {
      setError("All fields are required.");
      return;
    }
    if (!validateEmail(email)) {
      setError("Invalid email format.");
      return;
    }

    if (email === "testuser@gmail.com" && password === "testuser@2021") {
      onLogin(category);
    } else {
      setError("Invalid credentials.");
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="md:w-1/2 bg-cover bg-center h-64 md:h-auto" style={{ backgroundImage: 'url("https://elearningindustry.com/wp-content/uploads/2017/12/5-advantages-of-online-mock-tests-1.png")' }}>
      </div>
      <div className="flex flex-1 items-center justify-center bg-white">
        <div className="login p-4 md:p-8 rounded shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4 md:mb-6">Login</h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Category:</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full px-3 py-2 border rounded">
                <option value="">Select Category</option>
                <option value="sports">Sports</option>
                <option value="arts">Arts</option>
                <option value="history">History</option>
                <option value="physics">Physics</option>
              </select>
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-700">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
