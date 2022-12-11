import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./queryfilter.css";

export default function QueryFilter({ searchMember, getMembers }) {
  // State information for the filter by MemberId or RFID or both
  const [memberId, setMemberId] = useState("");
  const [rfid, setRfId] = useState("");
  // For page navigation during button click
  const navigate = useNavigate();

  // Clear the input text
  const clearSearch = () => {
    setMemberId("");
    setRfId("");
    getMembers();
  };

  // Display the filter jsx
  return (
    <div className="filter">
      <div className="filterFields">
        <label htmlFor="memberId" className="filterLabel">
          Member ID
        </label>
        <input
          name="memberId"
          className="filterInputs"
          type="text"
          placeholder="Enter Member ID"
          value={memberId}
          onChange={(e) => setMemberId(e.target.value)}
        />
      </div>
      <div className="filterFields">
        <label htmlFor="rfid" className="filterLabel">
          RFID Number
        </label>
        <input
          name="rfid"
          className="filterInputs"
          type="text"
          placeholder="Enter RFID"
          value={rfid}
          onChange={(e) => setRfId(e.target.value)}
        />
      </div>
      <div className="filterFields">
        <div className="btn-container">
          <button
            type="button"
            className="queryBtn"
            onClick={() => searchMember(memberId, rfid)}
          >
            Search Member
          </button>
          <button type="button" className="queryBtn" onClick={clearSearch}>
            Clear Search
          </button>
          <button
            type="button"
            className="queryBtn"
            onClick={() => navigate("/add")}
          >
            Add Member
          </button>
        </div>
      </div>
    </div>
  );
}
