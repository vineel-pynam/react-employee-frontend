import "./index.css";
import { FiAperture } from "react-icons/fi";

const Header = () => {
  return (
    <div className="header-container">
      <FiAperture style={{ fontSize: "25px", marginRight: "10px" }} />
      <h1 className="header-h1">Employee Management</h1>
    </div>
  );
};

export default Header;
