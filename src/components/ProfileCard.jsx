import React from "react";

const ProfileCard = () => {
  return (
    <>
      <div className="flex justify-center items-center mt-10">
        <div className="card card-dash bg-base-200 w-96">
          <div className="card-body flex items-center">
            <h2 className="card-title text-lg">Edit Profile</h2>
           <div className="flex flex-col gap-2 w-full my-2">
             <input type="text" className="input" placeholder="First Name" onChange={(e) => e.target.value}/>
            <input type="text" className="input" placeholder="LastName" />
            <input type="text" className="input" placeholder="Photo URL" />
            <input type="text" className="input" placeholder="Age" />
            <input
              type="text"
              className="input"
              placeholder="Gender"
              list="browsers"
            />
            <datalist id="browsers">
              <option value="Male"></option>
              <option value="Female"></option>
              <option value="Others"></option>
            </datalist>
            <textarea className="textarea" placeholder="About"></textarea>
           </div>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Save Profile</button>
            </div>
          </div>
        </div>
      </div>
      
    </>

  );
};

export default ProfileCard;
