import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { followUser, unfollowUser } from "../../actions/UserAction";
import UserProfile from "../UserProfile/UserProfile";
import "./User.css";

const User = ({ person }) => {
  const defaultProfile = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Ccircle cx='12' cy='8' r='4' fill='%23ccc'/%3E%3Cpath fill='%23ccc' d='M12 14c-6.1 0-8 4-8 4v2h16v-2s-1.9-4-8-4z'/%3E%3C/svg%3E";
  const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user } = useSelector((state) => state.authReducer.authData);
  const dispatch = useDispatch();

  const [following, setFollowing] = useState(
    person.followers?.includes(user._id)
  );

  const [showProfile, setShowProfile] = useState(false);

  const handleFollow = (e) => {
    e.stopPropagation(); // Prevent modal from opening when clicking follow button
    following
      ? dispatch(unfollowUser(person._id, user))
      : dispatch(followUser(person._id, user));
    setFollowing((prev) => !prev);
  };

  return (
    <>
    <div className="follower">
      <div className="follower-left">
        <img
          src={person.profilePicture ? publicFolder + person.profilePicture : defaultProfile}
          alt="profile"
          className="followerImage"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = defaultProfile;
          }}
        />
        <div className="name">
          <span className="fullname">{person.firstname} {person.lastname}</span>
          <span className="username">@{person.username}</span>
        </div>
      </div>
      <button
        className={following ? "button fc-button UnfollowButton" : "button fc-button"}
        onClick={handleFollow}
      >
        {following ? "Unfollow" : "Follow"}
      </button>
    </div>
    {showProfile && (
        <UserProfile
          person={person}
          onClose={() => setShowProfile(false)}
          following={following}
          handleFollow={handleFollow}
        />
      )}
    </>
  );
};

export default User;