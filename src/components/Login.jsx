import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("dilesh@gmail.com");
  const [password, setPassword] = useState("Dilesh@123");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        {
          withCredentials: true,
        }
      );
      dispatch(addUser(res.data));
      return navigate("/");
    } catch (error) {
      setError(error?.response?.data || "Something went wrong");
      
    }
  };

  return (
    <div className="flex justify-center my-20">
      <div className="card card-dash bg-base-200 w-96">
        <div className="card-body gap-4 flex items-center">
          <h2 className="card-title">Login</h2>
          <input
            type="text"
            placeholder="Email Id"
            value={emailId}
            className="input"
            onChange={(e) => setEmailId(e.target.value)}
          />
          <input
            type="text"
            placeholder="Password"
            value={password}
            className="input my-2"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div>
            <p className="text-red-500 text-sm font-semibold">{error}</p>
          </div>
          <div className="card-actions justify-end">
            <button
              className="btn btn-primary text-xl px-5"
              onClick={handleLogin}
            >
              LogIn
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
