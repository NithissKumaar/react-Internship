import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{ padding: "10px", background: "#ddd" }}>

      <Link to="/dashboard">Dashboard</Link>

      {" | "}

      <Link to="/users">Users</Link>

    </nav>
  );
}

export default Navbar;