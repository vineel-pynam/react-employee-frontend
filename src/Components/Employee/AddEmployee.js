import { Button } from "@mui/material";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { FiSave } from "react-icons/fi";
import { RiArrowGoBackLine } from "react-icons/ri";

import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import "./add-employee.css";

const AddEmployee = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const moveBack = () => {
    props.history.push("/");
  };

  const saveForm = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const jsonObj = {
      firstName,
      lastName,
      email,
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonObj),
    };

    try {
      const response = await fetch(
        "https://vineel-employee-app.herokuapp.com/api/v1/add/employee",
        options
      );
      const status = await response.status;

      if (status === 200) {
        toast.success("Hurrah! Employee Added");
        setFirstName("");
        setLastName("");
        setEmail("");
        setIsLoading(false);
      } else {
        toast.error("Unable To Add Employee");
      }
    } catch (e) {
      toast.error("Unable To Add Employee");
    }
  };

  return (
    <div className="form-container">
      <h1>Add Employee</h1>

      <form className="form">
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          id="firstName"
          placeholder="Enter FirstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />

        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          id="lastName"
          placeholder="Enter LastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />

        <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="email"
          placeholder="Enter Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="button-group">
          <Button
            variant="contained"
            sx={{
              marginRight: "10px",
              minWidth: "100px",
            }}
            size="medium"
            onClick={saveForm}
          >
            {isLoading ? (
              <div
                style={{
                  marginRight: "5px",
                  marginLeft: "0px",
                }}
              >
                <Loader type="TailSpin" color="white" height={12} width={12} />
              </div>
            ) : (
              <FiSave style={{ marginRight: "5px" }} />
            )}
            {isLoading ? <>saving...</> : <>save</>}
          </Button>
          <Button
            variant="contained"
            sx={{
              minWidth: "100px",
            }}
            size="medium"
            color="error"
            onClick={moveBack}
          >
            <RiArrowGoBackLine
              style={{ marginRight: "5px", fontSize: "13px" }}
            />
            Go Back
          </Button>
        </div>
      </form>

      <ToastContainer
        theme="dark"
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default AddEmployee;
