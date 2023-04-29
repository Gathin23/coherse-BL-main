import React, { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";

import "./mentor.css";

const Mentor = (props) => {
  const user = props.user;
  const [open, setOpen] = useState(false);
  const [acceptClicked, setAcceptClicked] = useState(false);
  const [rejectClicked, setRejectClicked] = useState(false);
  const sharedQuery = useContext(AppContext);
  const handleAccept = () => {
    console.log("Accepted!");
    window.open("https://www.spatial.io/s/Coherse-Meeting-Room-644beb62b5a8fb95ae80009f?share=8499940146633707102", "_blank");
    setOpen(false);
  };

  const handleReject = () => {
    console.log("Rejected!");
    const confirmReject = window.confirm(
      "Are you sure you want to reject this?"
    );
    if (confirmReject) {
      setOpen(false);
    }
  };
  const handleCancel = () => {
    console.log("Cancel!");
    setRejectClicked(false);
  };
  return (
    <div className="dashboard">
      {/* Left Side */}
      <div className="dashboard-details">
        {/* User Details */}
        <div className="dashboard-user">
          <img
            src={user.picture}
            alt="Profile Pic"
            className="dashboard-profile-pic"
          />
          <h3 className="dashboard-user-name">{user.name}</h3>
        </div>

        {/* Dashboard Details */}
        <div className="dashboard-info">
          <h2>Dashboard Details</h2>  
          <p>Details go here...</p>
        </div>
      </div>
      {/* Right Side */}
      <div className="dashboard-right">
        <div className="dashboard-query">
          {/* Query Title */}
          <div className="dashboard-query-title">
            <h2>{sharedQuery}</h2>
          </div>

          {/* Accept/Reject Buttons */}
          <div className="dashboard-query-actions">
            <button
              className="dashboard-query-action-btn"
              onClick={handleAccept}
              disabled={acceptClicked || rejectClicked}
            >
              Accept
            </button>
            <button
              className="dashboard-query-action-btn"
              onClick={handleReject}
              disabled={acceptClicked || rejectClicked}
            >
              Reject
            </button>
          </div>

          {/* Reject Popup */}
          {rejectClicked && (
            <div className="dashboard-popup">
              <h3>Are you sure you want to reject this?</h3>
              <div className="dashboard-popup-actions">
                <button
                  className="dashboard-popup-action-btn"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
                <button
                  className="dashboard-popup-action-btn"
                  onClick={() => setRejectClicked(false)}
                >
                  Reject
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Mentor;
