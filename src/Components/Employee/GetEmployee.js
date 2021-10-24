import { Button } from "@mui/material";
import { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import { RiArrowGoBackLine } from "react-icons/ri";

import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import "./card.css";

class GetEmployee extends Component {
  state = {
    employee: { id: "", firstName: "", lastName: "", email: "" },
    isLoading: true,
  };

  componentDidMount() {
    this.getEmployeeData();
  }

  getEmployeeData = async () => {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;

    const apiUrl = `https://vineel-employee-app.herokuapp.com/api/v1/employees/${id}`;

    try {
      const response = await fetch(apiUrl);
      const status = await response.status;
      const data = await response.json();
      if (status === 200) {
        this.setState({ employee: data, isLoading: false });
      } else {
        toast.error("Unable to find employee!");
      }
    } catch (e) {
      toast.error("Unable to find employee!");
    }
  };

  moveBack = () => {
    this.props.history.push("/");
  };

  render() {
    const { employee, isLoading } = this.state;

    // Loding
    if (isLoading === true) {
      const style = {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        alignItem: "center",
        justifyContent: "center",
        padding: "30px",
      };
      return (
        <div style={style}>
          <Loader type="Bars" color="#212121" height={50} width={80} />
        </div>
      );
    }

    return (
      <div className="employee-details-container">
        <div className="card">
          <img
            src="https://us.123rf.com/450wm/jemastock/jemastock1904/jemastock190423095/121013955-young-man-with-beard-face-cartoon-vector-illustration-graphic-design.jpg?ver=6"
            alt="Profile pic"
          />
          <h1>
            {employee.firstName} {employee.lastName}
          </h1>
          <p className="email">{employee.email}</p>
          <p>
            It takes monumental improvement for us to change how we live our
            lives. Design is the way we access that improvement
          </p>

          <div className="button-group">
            <Button
              variant="contained"
              sx={{
                minWidth: "100px",
                marginTop: "20px",
                backgroundColor: "#263238",
              }}
              size="medium"
              color="warning"
              onClick={this.moveBack}
            >
              <RiArrowGoBackLine
                style={{
                  marginRight: "5px",
                  fontSize: "13px",
                }}
              />
              Go Back
            </Button>
          </div>
        </div>

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

export default GetEmployee;
