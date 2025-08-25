import React from "react";
import { X, Heart } from "lucide-react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";
import axios from "axios";

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, age, photoUrl, about, gender } = user;

  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    const res = await axios.post(
      BASE_URL + "/request/send/" + status + "/" + _id,
      {},
      { withCredentials: true }
    );
    dispatch(removeUserFromFeed(userId));
  };

  return (
    <div className="flex justify-center mt-10">
      <div className="relative w-80 h-[450px] rounded-2xl shadow-lg overflow-hidden">
        {/* Profile Image */}
        <img
          src={photoUrl}
          alt={`Profile photo of ${firstName}`}
          className="w-full h-full object-cover"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* User Info */}
        <div className="absolute bottom-12 left-0 w-full p-4 text-white ">
          <h2 className="text-2xl font-bold">
            {firstName} {lastName}, {age}, {gender}
          </h2>
          <p className="text-sm opacity-90 line-clamp-2">{about}</p>
        </div>

        {/* Tinder Action Buttons */}
        <div className="absolute bottom-1 left-0 w-full flex justify-center gap-6">
          {/* ❌ Reject Button */}
          <button
            className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shadow-lg hover:scale-110 transition cursor-pointer"
            onClick={() => handleSendRequest("ignored", _id)}
          >
            <X className="text-red-500 w-7 h-7" />
          </button>

          {/* ❤️ Like Button */}
          <button
            className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center shadow-lg hover:scale-110 transition cursor-pointer"
            onClick={() => handleSendRequest("interested", _id)}
          >
            <Heart className="text-green-500 w-7 h-7" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
