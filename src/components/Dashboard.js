
import { Link } from "react-router-dom";
function Dashboard() {
    return (
      <div>
        <h1>My Dashboard</h1>
        <nav>
          <Link to="home">My Orders</Link>
          <Link to="details">My Details</Link>
          <Link to="settings">Settings</Link>
        </nav>
      </div>
    );
  }
  export default Dashboard;