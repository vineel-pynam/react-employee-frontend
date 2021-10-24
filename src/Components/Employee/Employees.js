import { Component } from "react";
import Loader from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";

import EmployeeTable from "./EmployeeTable";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

const apiStatusConstants = {
  success: "SUCCESS",
  failure: "FAILURE",
  pending: "PENDING",
};

class Employees extends Component {
  state = {
    employees: [],
    isLoading: true,
    apiStatus: apiStatusConstants.pending,
  };

  componentDidMount() {
    this.getEmployeeData(true);
  }

  getEmployeeData = async (flag) => {
    try {
      const response = await fetch(
        "https://vineel-employee-app.herokuapp.com/api/v1/employees"
      );
      const status = await response.status;
      const data = await response.json();
      if (status === 200) {
        if (flag === true) {
          toast.success("Successfully Fetched Data");
        }
        this.setState({
          employees: data,
          isLoading: false,
          apiStatus: apiStatusConstants.success,
        });
      } else {
        toast.error("Unable To Fetch");
      }
    } catch (error) {
      toast.error("Unable To Fetch");
    }
  };

  deleteEmployeeById = async (id) => {
    const options = {
      method: "DELETE",
    };

    const apiUrl = `https://vineel-employee-app.herokuapp.com/api/v1/delete/employees/${id}`;

    try {
      const response = await fetch(apiUrl, options);
      const status = await response.status;
      if (status === 200) {
        toast.success("Succesfully Deleted!");
        this.getEmployeeData(false);
      } else {
        toast.error("Unable To Delete!");
      }
    } catch (e) {
      toast.error("Unable To Delete!");
    }
  };

  render() {
    const { employees, isLoading } = this.state;

    return (
      <div className="body-container">
        {isLoading ? (
          <Loader type="Bars" color="#212121" height={50} width={50} />
        ) : (
          <EmployeeTable
            employees={employees}
            deleteFunction={this.deleteEmployeeById}
          />
        )}

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

export default Employees;
