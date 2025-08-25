import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequests } from "../utils/requestsSlice";
import { X, Heart } from "lucide-react";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);

  const reviewRequest = async (status, _id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequests(_id));
    } catch (error) {
      console.error(error);
    }
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/recieved", {
        withCredentials: true,
      });
      dispatch(addRequests(res?.data?.data));
    } catch (error) {}
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return;
  if (requests.length === 0)
    return (
      <>
        <div className="flex justify-center mt-10">
          <h1 className="text-xl font-semibold text-red-800">
            No Connections Requests Found
          </h1>
        </div>
      </>
    );

  return (
    <>
      <div className="flex justify-center mt-10">
        <h1 className="text-2xl font-semibold">Connection Requests</h1>
      </div>
      {requests.map((request) => {
        const { _id, firstName, lastName, age, photoUrl, gender, about } =
          request.fromUserId;

        return (
          <div key={_id} className="flex justify-center my-5 ">
            <div className="card card-dash bg-base-200 rounded-4xl w-[600px] ">
              <div className="card-body flex flex-row items-center gap-4 ">
                <div className="avatar">
                  <div className="w-20 rounded-full">
                    <img src={photoUrl} />
                  </div>
                </div>

                <div>
                  <h2 className="card-title">{firstName + " " + lastName}</h2>
                  <p className="mr-30 line-clamp-3">{about}</p>
                  <div className="card-actions justify-start mt-2"></div>
                </div>

                <div className="absolute   w-full flex justify-end right-8 gap-6">
                  {/* ❌ Reject Button */}
                  <button className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shadow-lg hover:scale-110 transition cursor-pointer">
                    <X
                      className="text-red-500 w-7 h-7"
                      onClick={() => reviewRequest("rejected", request._id)}
                    />
                  </button>

                  {/* ❤️ Like Button */}
                  <button className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center shadow-lg hover:scale-110 transition cursor-pointer">
                    <Heart
                      className="text-green-500 w-7 h-7"
                      onClick={() => reviewRequest("accepted", request._id)}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Requests;
