import axios from "axios";
import React, { useState } from "react";

const Login = () => {
  const [emailId, setEmailId] = useState("virat@gmail.com");
  const [password, setPassword] = useState("Virat@123");

    const handleLogin = async () => {
       try {
            const res = await axios.post("http://localhost:3000/login", {
            emailId,
            password
        },{
            withCredentials:true
        })
       } catch (error) {
        console.log(error); 
        
       }
    } 

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
          <div className="card-actions justify-end">
            <button className="btn btn-primary text-xl px-5" onClick={handleLogin}>LogIn</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
