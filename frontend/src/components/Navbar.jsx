import { Link } from 'react-router-dom';
import "../Navbar.css"

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/" className="logo-link">OptaCloud</Link>
        </div>
        <ul className="navbar-links">
          <li>
            <Link to="/" className="nav-link">Home</Link>
          </li>
          <li>
            <Link to="/saved-addresses" className="nav-link">Saved Addresses</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
