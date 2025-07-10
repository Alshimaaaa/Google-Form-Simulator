import { useNavigate } from "react-router-dom";
import "../Style/Nav.css";
function PublicNav() {

  return (
    <nav className="nav">
      <ul className="nav-list">
        <a className="title">Form App</a>
        <li><a href="/">Home</a></li>
      </ul>
    </nav>
  );
}

function PrivateNav() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/");
  };

  return (
    <nav className="nav">
        
      <ul className="nav-list">
        <a className="title">Form App</a>
        <div className="nav-links">
        <li><a href="/home">Home</a></li>
        <li><a href="/" onClick={handleLogout}>Log Out</a></li>
        </div>
      </ul>
    </nav>
  );
}

// Export both
export { PublicNav, PrivateNav };
