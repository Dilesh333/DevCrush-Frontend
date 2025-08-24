import React, { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { connect, useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionsSlice";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;
  if (connections.length === 0)
    return (
      <>
        <div className="flex justify-center mt-10">
          <h1 className="text-xl font-semibold text-red-800">
            No connections Found
          </h1>
        </div>
      </>
    );

  return (
    <>
      <div className="flex justify-center mt-10">
        <h1 className="text-2xl font-semibold">Connections</h1>
      </div>
      {connections.map((connection) => {
        const { firstName, lastName, age, photoUrl, gender, about } =
          connection;

        return (
          <div className="flex justify-center my-5 ">
            <div className="card card-dash bg-base-200 rounded-4xl w-[600px] ">
              <div className="card-body flex flex-row items-center gap-4 ">
                <div className="avatar">
                  <div className="w-20 rounded-full">
                    <img src= {photoUrl} />
                  </div>
                </div>

                <div>
                  <h2 className="card-title">{firstName + " " + lastName}</h2>
                  <p>
                    {about}
                  </p>
                  <div className="card-actions justify-start mt-2"></div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Connections;
