import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./edit.css";
import Message from "../../components/message/Message";
import Header from "../../components/header/Header";

export default function Edit() {
  // For navigation during button click
  const navigate = useNavigate();
  // Extract the ID from the browser url
  const { id } = useParams();
  // Our member state information
  const [member, setMember] = useState({
    memberId: "",
    firstName: "",
    lastName: "",
    course: "",
    address: "",
    rfidBadgeNumber: "",
    imagePic: "",
  });
  // The profile picture file
  const [file, setFile] = useState(null);
  // Messages used to display if successful or error during updating
  const [message, setMessage] = useState({
    show: false,
    msg: "",
    type: "",
  });

  // Get the member information by passing the ID into our MongoDB Atlas database
  useEffect(() => {
    const getMember = async () => {
      const res = await axios.get("http://localhost:5000/api/members/" + id);
      setMember(res.data);
    };
    getMember();
  }, [id]);

  // Update our state object
  const updateMember = (e) => {
    const fieldName = e.target.name;
    setMember((currentMember) => ({
      ...currentMember,
      [fieldName]: e.target.value,
    }));
  };

  // Function to show or hide messages
  const showMessage = (show = false, type = "", msg = "") => {
    setMessage({ show, type, msg });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const studenData = new FormData();
    studenData.append("memberId", member.memberId);
    studenData.append("firstName", member.firstName);
    studenData.append("lastName", member.lastName);
    studenData.append("course", member.course);
    studenData.append("address", member.address);
    studenData.append("expireAt", member.expireAt);
    studenData.append("rfidBadgeNumber", member.rfidBadgeNumber);
    if (file) {
      studenData.append("file", file);
    }
    try {
      await axios.put(
        "http://localhost:5000/api/members/" + member._id,
        studenData
      );
      showMessage(true, "info", "Successfully edited member information");
    } catch (error) {
      showMessage(true, "error", error);
    }
  };

  // The user interface for the Edit page
  return (
    <>
      <Header />
      <div className="header">
        <h1>Edit Member</h1>
      </div>
      <section className="managePage">
        <form className="editForm" onSubmit={handleSubmit}>
          <div className="fields">
            <div className="imgColumn">
              <img
                src={
                  file
                    ? URL.createObjectURL(file)
                    : member.imagePic
                    ? `http://localhost:5000/${member.imagePic}`
                    : "http://localhost:5000/images/defaultPic.png"
                }
                alt="Profile Pic"
              />
              <label htmlFor="fileInput" className="fileUploadLabel">
                <i className="fa-solid fa-circle-plus addProfileIcon"></i>Add
                Profile Pic
              </label>
              <input
                type="file"
                id="fileInput"
                onChange={(e) => setFile(e.target.files[0])}
                style={{ display: "none" }}
              />
            </div>
            <div className="fieldsColumn">
              <div className="fieldRow">
                <label htmlFor="memberId" className="fieldLabel">
                  Member ID
                </label>
                <input
                  type="text"
                  name="memberId"
                  id="memberId"
                  value={member.memberId}
                  onChange={updateMember}
                  className="editInputs"
                />
              </div>
              <div className="fieldRow">
                <label htmlFor="firstName" className="fieldLabel">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  value={member.firstName}
                  onChange={updateMember}
                  className="editInputs"
                />
              </div>
              <div className="fieldRow">
                <label htmlFor="lastName" className="fieldLabel">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  value={member.lastName}
                  onChange={updateMember}
                  className="editInputs"
                />
              </div>
              <div className="fieldRow">
                <label htmlFor="course" className="fieldLabel">
                  Course
                </label>
                <input
                  type="text"
                  name="course"
                  id="course"
                  value={member.course}
                  onChange={updateMember}
                  className="editInputs"
                />
              </div>
              <div className="fieldRow">
                <label htmlFor="address" className="fieldLabel">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  value={member.address}
                  onChange={updateMember}
                  className="editInputs"
                />
              </div>
              <div className="fieldRow">
                <label htmlFor="address" className="fieldLabel">
                  Expire
                </label>
                <input
                  type="Datetime-local"
                  name="expireAt"
                  id="expireAt"
                  value={member.expireAt}
                  onChange={updateMember}
                  className="editInputs"
                />
              </div>

              <div className="fieldRow">
                <label htmlFor="rfidBadgeNumber" className="fieldLabel">
                  RFID Badge Number
                </label>
                <input
                  type="text"
                  name="rfidBadgeNumber"
                  id="rfidBadgeNumber"
                  value={member.rfidBadgeNumber}
                  onChange={updateMember}
                  className="editInputs"
                />
              </div>
            </div>
          </div>

          <div className="btnContainer">
            <button type="submit" className="bottomButton">
              Edit
            </button>
            <button
              type="button"
              className="bottomButton"
              onClick={() => navigate("/")}
            >
              Back
            </button>
          </div>
          <div>
            {message.show && (
              <Message {...message} removeMessage={showMessage} />
            )}
          </div>
        </form>
      </section>
    </>
  );
}
