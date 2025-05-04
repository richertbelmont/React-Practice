import { Link } from "react-router-dom";
import "../css/Navbar.css";
import { useAuth } from "../contexts/AuthContext";


function NavBar() {
    const { user, logout } = useAuth();

    return <nav className="navbar">
        <div className="navbar-brand">
            <Link to="/">Movie App</Link>
        </div>
        <div className="navbar-links">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/favorites" className="nav-link">Favorites</Link>
            {user ? (
        <>
                <span className="nav-link">Hi, {user.name}</span>
                <button className="nav-link" onClick={logout}>Logout</button>
                </>
                    ) : (
                <>
                <Link to="/login" className="nav-link">Login</Link>
                <Link to="/register" className="nav-link">Register</Link>
                </>
            )}
        </div>
    </nav>
}

export default NavBar