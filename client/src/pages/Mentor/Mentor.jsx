import React, { useContext, useEffect, useState } from "react";

import "./mentor.css";

const Mentor = (props) => {
  const [query, setQuery] = useState(null);
  const [picture, setPicture] = useState(null);
  const [name, setName] = useState(null);
  const [open, setOpen] = useState(false);
  const [acceptClicked, setAcceptClicked] = useState(false);
  const [rejectClicked, setRejectClicked] = useState(false);
  const handleAccept = () => {
    console.log("Accepted!");
    window.open(
      "https://www.spatial.io/s/Coherse-Meeting-Room-644beb62b5a8fb95ae80009f?share=8499940146633707102",
      "_blank"
    );
    localStorage.removeItem("query");
    setOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("name");
    localStorage.removeItem("picture");
    window.open(`${process.env.REACT_APP_API_URL}/auth/logout`, "_self");
  };

  useEffect(() => {
    const storedPicture = localStorage.getItem("picture");
    const storedData = localStorage.getItem("query");
    const storedName = localStorage.getItem("name");
    console.log(`Picture : ${picture}`);
    console.log(`UseEffect : ${storedData}`);
    setQuery(storedData);
    setPicture(storedPicture);
    setName(storedName);
  }, []);

  const handleReject = () => {
    console.log("Rejected!");
    const confirmReject = window.confirm(
      "Are you sure you want to reject this?"
    );
    if (confirmReject) {
      setQuery(null);
      localStorage.removeItem("query");
      setOpen(false);
    }
  };
  const handleCancel = () => {
    console.log("Cancel!");
    setRejectClicked(false);
  };
  return (
    <div className="dashboard">
      <div className="number-container">
        <div className="number-left">
          <h2>Dashboard</h2>
        </div>
        <div className="number-right">
          <img src={picture} alt="Profile Pic" className="number-profile-pic" />
          <h3 className="number-user-name">{name}</h3>
          <button className="number-logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
      {/* Right Side */}
      <div className="dashboard-right">
        <div className="dashboard-query">
          {/* Query Title */}
          {query !== null ? (
            <>
              <div className="dashboard-query-title">
                <h2>{query}</h2>
              </div>

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
            </>
          ) : (
            <p>As of now there is no request...</p>
          )}

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
