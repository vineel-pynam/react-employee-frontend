import { Button } from "@mui/material";
import { Link } from "react-router-dom";

import {
  BsFillGeoFill,
  BsFillCursorFill,
  BsFillBucketFill,
} from "react-icons/bs";

const Employee = (props) => {
  const { employee, deleteFunction } = props;
  const { id, firstName, lastName, email } = employee;

  const deleteById = (id) => {
    deleteFunction(id);
  };

  return (
    <tr>
      <td>{id}</td>
      <td>{firstName}</td>
      <td>{lastName}</td>
      <td>{email}</td>
      <td>
        <div className="button-group">
          <Link to={`/employee/${id}`}>
            <Button
              variant="contained"
              size="small"
              sx={{ marginRight: "5px" }}
            >
              <BsFillCursorFill
                style={{ marginRight: "2px", fontSize: "10px" }}
              />
              View
            </Button>
          </Link>

          <Link to={`/update-employee/${id}`}>
            <Button
              variant="contained"
              size="small"
              sx={{ marginRight: "5px" }}
              color="warning"
            >
              <BsFillGeoFill style={{ marginRight: "2px", fontSize: "10px" }} />
              Update
            </Button>
          </Link>

          <Button
            variant="contained"
            size="small"
            color="error"
            onClick={() => deleteById(id)}
          >
            <BsFillBucketFill
              style={{
                marginRight: "5px",
                fontSize: "10px",
              }}
            />
            Delete
          </Button>
        </div>
      </td>
    </tr>
  );
};

export default Employee;
