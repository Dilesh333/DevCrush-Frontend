import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [isLoginForm, setIsLoginForm] = useState(true);

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

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data))
      return navigate("/profile");
    } catch (error) {
      setError(error?.response?.data || "Something went wrong");
    }
  };

  return (
    <div className="flex justify-center my-15">
      <div className="card card-dash bg-base-200 w-96">
        <div className="card-body gap-4 flex items-center">
          <h2 className="card-title">{isLoginForm ? "Login" : "Sign Up"}</h2>

          {!isLoginForm && (
            <>
              {" "}
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                className="input"
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                className="input my-2"
                onChange={(e) => setLastName(e.target.value)}
              />{" "}
            </>
          )}

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
              onClick={isLoginForm ? handleLogin : handleSignUp}
            >
              {isLoginForm ? "LogIn" : "Sign Up"}
            </button>
          </div>
          <p
            className="mt-3"
            onClick={() => {
              setIsLoginForm((value) => !value);
            }}
          >
            {isLoginForm ? (
              <>
                New User?{" "}
                <span className="text-blue-400 font-semibold cursor-pointer">
                  Sign Up
                </span>
              </>
            ) : (
              <>
                Existing User?{" "}
                <span className="text-blue-400 font-semibold cursor-pointer">
                  Login
                </span>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
