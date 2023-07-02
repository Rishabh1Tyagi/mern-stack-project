import React, { useState } from "react";
import styles from "./contact.module.css";
import axios from "axios";

const Contact = () => {
  const [fromValues, setFormValues] = React.useState({
    firstname: "",
    lastname: "",
    email: "",
    dob: "",
    streetOne: "",
    streetTwo: "",
    permanentStreet1: "",
    permanentStreetTwo: "",
  });
  const [inputFields, setInputFields] = useState([
    {
      fileName: "",
      typeofFile: "",
      uploadDocumet: "",
    },
  ]);
  const [errMsg, setErrMsg] = useState("");
  const [response, setResponse] = useState("");

  const handleInput = (event) => {
    const newState = {
      ...fromValues,
      [event.target.name]: event.target.value,
    };
    setFormValues(newState);
    console.log(newState);
  };

  const handleFormChange = (index, event) => {
    let data = [...inputFields];
    data[index][event.target.name] = event.target.value;
    setInputFields(data);
  };

  const addFields = () => {
    let newfield = {
      fileName: "",
      typeofFile: "",
      uploadDocumet: "",
    };

    setInputFields([...inputFields, newfield]);
  };
  const removeFields = (index) => {
    let data = [...inputFields];
    data.splice(index, 1);
    setInputFields(data);
  };

  const handleSubmit = async () => {
    try {
      if (fromValues.firstname.length === 0) {
        setErrMsg("First Name must not be empty");
      } else if (fromValues.lastname.length === 0) {
        setErrMsg("Last Name must not be empty");
      } else if (fromValues.email.length === 0) {
        setErrMsg("Email must not be empty");
      } else if (fromValues.dob <= 18) {
        setErrMsg("Minimum Age Should be 18 Years");
      } else if (fromValues.streetOne.length === 0) {
        setErrMsg("Street 1 must not be empty");
      } else if (fromValues.streetTwo.length === 0) {
        setErrMsg("Street 2 must not be empty");
      } else {
        const bodyData = {
          basicInfo: fromValues,
          uploadDocs: inputFields,
        };
        const { data, status } = await axios.post(
          "http://localhost:8000/api/contact/register",
          bodyData
        );
        console.log(data, status, "user sign up");
        setResponse(data);
        if (status === 200) {
          window.location.reload();
        }
      }
    } catch (e) {
      console.log(e, "err");
      setErrMsg(`Error ${JSON.parse(JSON.stringify(e)).status}`);
    }
  };

  return (
    <>
      <div className={styles.outer}>
        <div className={styles.main}>
          <div>
            <label>
              First Name
              <sup>*</sup>
            </label>
            <input
              type="text"
              placeholder="Enter Your First Name here.."
              name="firstname"
              value={fromValues.firstname}
              onChange={handleInput}
              required
            />
          </div>
          <div>
            <label>
              Last Name<sup>*</sup>
            </label>
            <input
              type="text"
              placeholder="Enter Your Last Name here.."
              name="lastname"
              value={fromValues.lastname}
              onChange={handleInput}
              required
            />
          </div>
        </div>

        <div className={styles.main}>
          <div>
            <label>
              E-mail<sup>*</sup>
            </label>
            <input
              type="email"
              placeholder="ex: myname@example.com"
              name="email"
              value={fromValues.email}
              onChange={handleInput}
              required
            />
          </div>

          <div className={styles.dob}>
            <label>
              Date of Birth<sup>*</sup>
            </label>
            <input
              type="date"
              placeholder="Date of Birth"
              name="dob"
              value={fromValues.dob}
              onChange={handleInput}
              required
            />
            <p>(Min. age should be 18 years)</p>
          </div>
        </div>

        <div className={styles.mains}>
          <div>
            <label>Residential Address</label>
            <p>
              Street 1<sup>*</sup>
            </p>
            <input
              type="text"
              name="streetOne"
              value={fromValues.streetOne}
              onChange={handleInput}
              required
            />
          </div>

          <div className={styles.street_two}>
            <p>
              Street 2<sup>*</sup>
            </p>
            <input
              type="text"
              name="streetTwo"
              value={fromValues.streetTwo}
              onChange={handleInput}
              required
            />
          </div>
        </div>

        <div className={styles.checkboxs}>
          <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />
          <label for="vehicle1">Same as Residential Address</label>
        </div>
        <div className={styles.mains}>
          <div>
            <label>Permanent Address</label>
            <p>Street 1</p>
            <input
              type="text"
              name="permanentStreet1"
              value={fromValues.permanentStreet1}
              onChange={handleInput}
            />
          </div>

          <div className={styles.street_two}>
            <p>Street 2</p>
            <input
              type="text"
              name="permanentStreetTwo"
              value={fromValues.permanentStreetTwo}
              onChange={handleInput}
            />
          </div>
        </div>
      </div>
      <div style={{ display: "grid", placeItems: "center" }}>
        <label
          style={{
            marginRight: "33rem",
          }}
        >
          Upload Documents
        </label>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "80%",
            marginLeft: "-2.8rem",
          }}
        >
          {inputFields.map((input, index) => (
            <div key={index}>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <input
                  type="text"
                  name="fileName"
                  placeholder="File Name"
                  value={input.name}
                  style={{ width: "200px" }}
                  onChange={(event) => handleFormChange(index, event)}
                  required
                />
                <input
                  type="text"
                  name="typeofFile"
                  placeholder="Type of File"
                  value={input.age}
                  style={{ width: "200px", marginLeft: "10px" }}
                  onChange={(event) => handleFormChange(index, event)}
                  required
                />
                <label
                  htmlFor="file-upload"
                  className={styles.custom_file_upload}
                >
                  <i className="fa fa-cloud-upload"></i>Upload Document
                </label>
                <input
                  id="file-upload"
                  type="file"
                  name="uploadDocumet"
                  placeholder="Dob"
                  value={input.dob}
                  onChange={(event) => handleFormChange(index, event)}
                  required
                />
                <i
                  onClick={addFields}
                  className="fa fa-plus-square"
                  style={{
                    fontSize: "26px",
                    marginLeft: "10px",
                    cursor: "pointer",
                    marginTop: "10px",
                  }}
                ></i>
                {index ? (
                  <i
                    onClick={() => removeFields(index)}
                    className="fa fa-trash"
                    style={{
                      fontSize: "36px",
                      cursor: "pointer",
                      marginLeft: "10px",
                    }}
                  ></i>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: "grid", placeItems: "center" }}>
        <button onClick={handleSubmit}>Submit</button>
      </div>
      {errMsg && <p style={{ color: "red" }}>{errMsg}</p>}
    </>
  );
};

export default Contact;
