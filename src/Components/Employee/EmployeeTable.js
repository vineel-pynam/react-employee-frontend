import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import Employee from "./Employee";

import { BsPlus } from "react-icons/bs";

const EmployeeTable = (props) => {
  const { employees, deleteFunction } = props;
  return (
    <div className="employee-container">
      <div className="top-links">
        <Link to="/add-employee">
          <Button variant="contained">
            <BsPlus style={{ fontSize: "18px" }} /> Add Employee
          </Button>
        </Link>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((item) => (
            <Employee
              key={item.id}
              employee={item}
              deleteFunction={deleteFunction}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;
