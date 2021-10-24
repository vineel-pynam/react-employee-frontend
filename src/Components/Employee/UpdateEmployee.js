import { Button } from "@mui/material";
import { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import { FiSave } from "react-icons/fi";
import { RiArrowGoBackLine } from "react-icons/ri";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "./add-employee.css";

class UpdateEmployee extends Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    isLoading: false,
  };

  onFirstNameChange = (e) => {
    this.setState({ firstName: e.target.value });
  };

  onLastNameChange = (e) => {
    this.setState({ lastName: e.target.value });
  };

  onEmailChange = (e) => {
    this.setState({ email: e.target.value });
  };

  moveBack = () => {
    this.props.history.push("/");
  };

  saveForm = async (e) => {
    e.preventDefault();
    this.setState({ isLoading: true });
    const { firstName, lastName, email } = this.state;
    const jsonObj = {
      firstName,
      lastName,
      email,
    };

    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonObj),
    };

    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    const apiUrl = `https://vineel-employee-app.herokuapp.com/api/v1/update/employees/${id}`;

    try {
      const response = await fetch(apiUrl, options);
      const status = await response.status;

      if (status === 200) {
        toast.success("Hurrah! Employee Updated");
        this.setState({
          firstName: "",
          lastName: "",
          email: "",
          isLoading: false,
        });
      } else {
        toast.error("Unable To Update Employee");
      }
    } catch (e) {
      toast.error("Unable To Update Employee");
    }
  };

  render() {
    const { firstName, lastName, email, isLoading } = this.state;
    return (
      <div className="form-container">
        <h1>Update Employee</h1>

        <form className="form">
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            placeholder="Enter FirstName"
            value={firstName}
            onChange={this.onFirstNameChange}
          />

          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            placeholder="Enter LastName"
            value={lastName}
            onChange={this.onLastNameChange}
          />

          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            placeholder="Enter Email Address"
            value={email}
            onChange={this.onEmailChange}
          />

          <div className="button-group">
            <Button
              variant="contained"
              sx={{
                marginRight: "10px",
                minWidth: "100px",
              }}
              size="medium"
              onClick={this.saveForm}
            >
              {isLoading ? (
                <div
                  style={{
                    marginRight: "5px",
                    marginLeft: "0px",
                  }}
                >
                  <Loader
                    type="TailSpin"
                    color="white"
                    height={12}
                    width={12}
                  />
                </div>
              ) : (
                <FiSave style={{ marginRight: "5px" }} />
              )}
              {isLoading ? <>updating...</> : <>Update</>}
            </Button>
            <Button
              variant="contained"
              sx={{
                minWidth: "100px",
              }}
              size="medium"
              color="error"
              onClick={this.moveBack}
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
  }
}

export default UpdateEmployee;
