import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Check if user is logged in
        const userData = localStorage.getItem("user");
        if (userData) {
            try {
                setUser(JSON.parse(userData));
                setIsLoggedIn(true);
            } catch {
                localStorage.removeItem("user");
            }
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        window.location.href = "/";
    };

    return (
        <header>
            <div className="container">
                <div className="header-content">
                    <div className="logo">
                        <i className="fas fa-id-card"></i>
                        <h1>ID_Generator</h1>
                    </div>

                    <nav>
                        <ul className="nav-menu">
                            <li>
                                <Link to="/" className="nav-link">
                                    Home
                                </Link>
                            </li>

                            {isLoggedIn ? (
                                <>
                                    <li>
                                        <Link to="/dashboard" className="nav-link">
                                            Dashboard
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/generate" className="nav-link">
                                            Generate ID
                                        </Link>
                                    </li>
                                    <li>
                                        <span className="user-greeting">
                                            Hi, {user?.name || "User"}
                                        </span>
                                    </li>
                                    <li>
                                        <button onClick={handleLogout} className="logout-btn">
                                            Logout
                                        </button>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li>
                                        <Link to="/login" className="nav-link">
                                            Login
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/register" className="nav-link">
                                            Register
                                        </Link>
                                    </li>
                                </>
                            )}
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
}