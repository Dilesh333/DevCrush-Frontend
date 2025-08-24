import React from "react";

const UserCard = ({ user }) => {
  const { firstName, lastName, age, photoUrl, about, gender } = user;

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

        {/* Text at bottom */}
        <div className="absolute bottom-10 left-0 w-full p-4 text-white">
          <h2 className="text-2xl font-bold">
            {firstName} {lastName}, {age}, {gender}
          </h2>
          <p className="text-sm opacity-90">{about}</p>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
