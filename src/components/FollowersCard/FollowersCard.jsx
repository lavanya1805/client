import React, { useEffect, useState } from "react";
import "./FollowersCard.css";
import User from "../User/User";
import { getAllUsers } from "../../api/UserRequests";
import { useSelector } from "react-redux";

const FollowersCard = () => {
  const [persons, setPersons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useSelector((state) => state.authReducer.authData);

  useEffect(() => {
    const fetchPersons = async () => {
      setLoading(true);
      try {
        const { data } = await getAllUsers();
        setPersons(data);
        setError(null);
      } catch (error) {
        console.error("Error fetching users:", error);
        setError("Failed to load users");
      } finally {
        setLoading(false);
      }
    };
    fetchPersons();
  }, []);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="FollowersCard">
      <h3>People you may know</h3>
      {persons.map((person) => {
        if (person._id !== user._id) {
          return <User person={person} key={person._id} />;
        }
        return null;
      })}
    </div>
  );
};

export default FollowersCard;