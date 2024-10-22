import React, { useState, useRef } from "react";
import "./PostShare.css";
import { UilScenery, UilPlayCircle, UilLocationPoint, UilSchedule, UilTimes } from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import { uploadImage, uploadPost } from "../../actions/UploadAction";

const PostShare = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer.authData);
  const loading = useSelector((state) => state.postReducer.uploading);
  const [image, setImage] = useState(null);
  const [showScheduler, setShowScheduler] = useState(false);
  const [scheduledTime, setScheduledTime] = useState("");
  const desc = useRef();
  const imageRef = useRef(); // Added this line - was missing
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

  // Handle Image Change
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage(img);
    }
  };

  const getMinDateTime = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() + 1); // Minimum 1 minute from now
    return now.toISOString().slice(0, 16);
  };

  const handleScheduleClick = () => {
    setShowScheduler(!showScheduler);
  };

  const handleScheduleChange = (e) => {
    setScheduledTime(e.target.value);
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!desc.current.value.trim()) {
      alert("Please write something!");
      return;
    }

    //post data
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };

    if (scheduledTime) {
      newPost.scheduledTime = new Date(scheduledTime).toISOString();
      newPost.status = "scheduled";
    }

    if (image) {
      const data = new FormData();
      const fileName = Date.now() + image.name;
      data.append("name", fileName);
      data.append("file", image);
      newPost.image = fileName;
      try {
        await dispatch(uploadImage(data));
      } catch (err) {
        console.log(err);
      }
    }

    dispatch(uploadPost(newPost));
    resetShare();


    // try {
    //   await dispatch(uploadPost({ ...newPost, scheduled: !!scheduledTime }));
    //   resetShare();
    // } catch (error) {
    //   console.error("Error uploading post:", error);
    // }
  };

  const resetShare = () => {
    setImage(null);
    setScheduledTime("");
    setShowScheduler(false);
    desc.current.value = "";
  };

  return (
    <div className="PostShare">
      <img
        src={user.profilePicture ? serverPublic + user.profilePicture : serverPublic + "defaultProfile.png"}
        alt="Profile"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = serverPublic + "defaultProfile.png";
        }}
      />
      <div>
        <input
          type="text"
          placeholder="What's happening?"
          required
          ref={desc}
        />
        
        <div className="postOptions">
          <div
            className="option"
            style={{ color: "var(--photo)" }}
            onClick={() => imageRef.current.click()}
          >
            <UilScenery />
            Photo
          </div>

          <div className="option" style={{ color: "var(--video)" }}>
            <UilPlayCircle />
            Video
          </div>

          <div className="option" style={{ color: "var(--location)" }}>
            <UilLocationPoint />
            Location
          </div>

          <div 
            className="option" 
            style={{ color: "var(--schedule)" }}
            onClick={handleScheduleClick}
          >
            <UilSchedule />
            Schedule
          </div>

          <button
            className="button ps-button"
            onClick={handleUpload}
            disabled={loading}
          >
            {loading ? "Uploading..." : scheduledTime ? "Schedule" : "Share"}
          </button>
        </div>

        <div style={{ display: "none" }}>
          <input
            type="file"
            ref={imageRef}
            onChange={onImageChange}
            accept="image/*"
          />
        </div>

        {showScheduler && (
        <div className="scheduleContainer">
          <input
            type="datetime-local"
            value={scheduledTime}
            min={getMinDateTime()}
            onChange={handleScheduleChange}
            className="scheduleInput"
          />
          <span className="scheduleHint">
            {scheduledTime ? 
              `Post will be published on ${new Date(scheduledTime).toLocaleString()}` : 
              "Select time to schedule post"}
          </span>
        </div>
      )}

        {image && (
          <div className="previewImage">
            <UilTimes onClick={() => setImage(null)} />
            <img src={URL.createObjectURL(image)} alt="preview" />
          </div>
        )}
      </div>
    </div>
  );
};

export default PostShare;