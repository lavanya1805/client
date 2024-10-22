// UserProfile.jsx
import React from "react";
import "./UserProfile.css";
import { UilTimes } from "@iconscout/react-unicons";

const UserProfile = ({ person, onClose, following, handleFollow }) => {
  const defaultProfile = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Ccircle cx='12' cy='8' r='4' fill='%23ccc'/%3E%3Cpath fill='%23ccc' d='M12 14c-6.1 0-8 4-8 4v2h16v-2s-1.9-4-8-4z'/%3E%3C/svg%3E";
  const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <div className="profile-modal-overlay">
      <div className="profile-modal">
        <button className="close-button" onClick={onClose}>
          <UilTimes />
        </button>
        
        <div className="profile-header">
          <img
            src={person.profilePicture ? publicFolder + person.profilePicture : defaultProfile}
            alt="profile"
            className="profile-image"
          />
          <h2>{person.firstname} {person.lastname}</h2>
          <p className="profile-username">@{person.username}</p>
          <button
            className={following ? "button fc-button UnfollowButton" : "button fc-button"}
            onClick={handleFollow}
          >
            {following ? "Unfollow" : "Follow"}
          </button>
        </div>

        <div className="profile-details">
          <div className="profile-stat">
            <span className="stat-value">{person.followers?.length || 0}</span>
            <span className="stat-label">Followers</span>
          </div>
          <div className="profile-stat">
            <span className="stat-value">{person.following?.length || 0}</span>
            <span className="stat-label">Following</span>
          </div>
        </div>

        <div className="profile-info">
          {person.about && (
            <div className="info-section">
              <h3>About</h3>
              <p>{person.about}</p>
            </div>
          )}
          {person.worksAt && (
            <div className="info-section">
              <h3>Works at</h3>
              <p>{person.worksAt}</p>
            </div>
          )}
          {person.livesin && (
            <div className="info-section">
              <h3>Lives in</h3>
              <p>{person.livesin}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;