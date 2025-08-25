import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res.data));
    } catch {
      console.log(error);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (!feed) return;
  if (feed <= 0)
    return (
      <>
        <div className="flex justify-center mt-10">
          <h1 className="text-xl font-semibold">No New User Found</h1>
        </div>
      </>
    );
  return (
    feed && (
      <div>
        <UserCard user={feed[0]} />
      </div>
    )
  );
};

export default Feed;
