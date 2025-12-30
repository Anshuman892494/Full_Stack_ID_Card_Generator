import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./Dashboard.css";

export default function Dashboard() {
    const navigate = useNavigate();

    // Get user from localStorage
    const user = JSON.parse(localStorage.getItem("user") || '{}');

    // Stats data
    const stats = [
        { label: "Generated IDs", value: "12", icon: "fa-id-card", color: "blue" },
        { label: "Templates Saved", value: "5", icon: "fa-layer-group", color: "green" },
        { label: "Downloads", value: "24", icon: "fa-download", color: "purple" },
        { label: "Storage Used", value: "45%", icon: "fa-database", color: "orange" },
    ];

    // Recent activities
    const activities = [
        { action: "Generated ID", person: "John Doe", time: "2 hours ago", icon: "fa-plus-circle", color: "blue" },
        { action: "Updated Template", person: "Default Template", time: "Yesterday", icon: "fa-edit", color: "green" },
        { action: "Downloaded ID", person: "Student ID", time: "3 days ago", icon: "fa-download", color: "purple" },
        { action: "Created Account", person: "New User", time: "1 week ago", icon: "fa-user-plus", color: "orange" },
    ];

    // Quick links
    const quickLinks = [
        { title: "Create New ID", description: "Generate a new ID card", icon: "fa-plus", link: "/generate", color: "primary" },
        { title: "My Templates", description: "View saved templates", icon: "fa-layer-group", link: "#", color: "success" },
        { title: "Account Settings", description: "Update profile & security", icon: "fa-user-cog", link: "/update-password", color: "warning" },
        { title: "Help & Support", description: "Get help & documentation", icon: "fa-question-circle", link: "#", color: "info" },
    ];

    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        navigate("/login");
    };

    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <div className="dashboard-page">
            <Header />

            <main className="container">
                {/* Dashboard Header */}
                <div className="dashboard-header">
                    <div className="welcome-section">
                        <h1>Welcome back, <span className="user-name">{user.name || "User"}</span>! 👋</h1>
                        <p className="welcome-text">Here's what's happening with your ID cards today.</p>
                    </div>
                    <button onClick={handleLogout} className="logout-btn">
                        <i className="fas fa-sign-out-alt"></i> Logout
                    </button>
                </div>

                {/* Stats Cards */}
                <div className="stats-grid">
                    {stats.map((stat, index) => (
                        <div key={index} className={`stat-card stat-${stat.color}`}>
                            <div className="stat-icon">
                                <i className={`fas ${stat.icon}`}></i>
                            </div>
                            <div className="stat-content">
                                <div className="stat-value">{stat.value}</div>
                                <div className="stat-label">{stat.label}</div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Quick Actions */}
                <div className="section-title">
                    <h2>Quick Actions</h2>
                    <p>Get started with these actions</p>
                </div>

                <div className="quick-actions-grid">
                    {quickLinks.map((link, index) => (
                        <Link key={index} to={link.link} className={`quick-action-card action-${link.color}`}>
                            <div className="action-icon">
                                <i className={`fas ${link.icon}`}></i>
                            </div>
                            <div className="action-content">
                                <h3>{link.title}</h3>
                                <p>{link.description}</p>
                            </div>
                            <i className="fas fa-chevron-right arrow-icon"></i>
                        </Link>
                    ))}
                </div>

                <div className="dashboard-content">
                    {/* Recent Activity */}
                    <div className="recent-activity">
                        <h3 className="section-subtitle">
                            <i className="fas fa-history"></i> Recent Activity
                        </h3>
                        <div className="activity-list">
                            {activities.map((activity, index) => (
                                <div key={index} className="activity-item">
                                    <div className={`activity-icon icon-${activity.color}`}>
                                        <i className={`fas ${activity.icon}`}></i>
                                    </div>
                                    <div className="activity-details">
                                        <div className="activity-action">{activity.action}</div>
                                        <div className="activity-person">{activity.person}</div>
                                    </div>
                                    <div className="activity-time">{activity.time}</div>
                                </div>
                            ))}
                        </div>
                        <button className="view-all-btn">
                            View All Activity <i className="fas fa-arrow-right"></i>
                        </button>
                    </div>

                    {/* User Info */}
                    <div className="user-info-card">
                        <h3 className="section-subtitle">
                            <i className="fas fa-user-circle"></i> Account Information
                        </h3>
                        <div className="user-details">
                            <div className="detail-item">
                                <div className="detail-label">
                                    <i className="fas fa-user"></i> Full Name
                                </div>
                                <div className="detail-value">{user.name || "Not set"}</div>
                            </div>
                            <div className="detail-item">
                                <div className="detail-label">
                                    <i className="fas fa-envelope"></i> Email
                                </div>
                                <div className="detail-value">{user.email || "Not set"}</div>
                            </div>
                            <div className="detail-item">
                                <div className="detail-label">
                                    <i className="fas fa-badge"></i> Account Type
                                </div>
                                <div className="detail-value">
                                    <span className="account-badge">Free Account</span>
                                </div>
                            </div>
                            <div className="detail-item">
                                <div className="detail-label">
                                    <i className="fas fa-calendar-alt"></i> Member Since
                                </div>
                                <div className="detail-value">
                                    {formatDate(user.createdAt)}
                                </div>
                            </div>
                        </div>
                        <div className="upgrade-banner">
                            <div className="upgrade-content">
                                <div className="upgrade-icon">
                                    <i className="fas fa-crown"></i>
                                </div>
                                <div>
                                    <h4>Upgrade to Pro</h4>
                                    <p>Unlock unlimited ID cards, premium templates, and priority support</p>
                                </div>
                            </div>
                            <button className="upgrade-btn">Upgrade Now</button>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}