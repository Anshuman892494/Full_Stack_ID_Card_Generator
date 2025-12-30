import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./Register.css";

export default function Register() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        organization: "",
        phone: ""
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [agreed, setAgreed] = useState(false);
    const navigate = useNavigate();

    // Check if user is already logged in
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            navigate("/dashboard");
        }
    }, [navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
        setError("");
    };

    const validateForm = () => {
        // Clear previous errors
        setError("");

        // 🔐 EMAIL VALIDATION
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const allowedDomains = ["gmail.com", "outlook.com", "yahoo.com"];

        // 🔐 STRONG PASSWORD VALIDATION (from working example)
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

        // Name validation
        if (!form.name.trim()) {
            setError("Name is required");
            return false;
        }

        // Email format validation
        if (!emailRegex.test(form.email)) {
            setError("Please enter a valid email address");
            return false;
        }

        // ✅ SAFE DOMAIN CHECK (FIX from working example)
        const emailDomain = form.email.split("@")[1];
        if (!emailDomain || !allowedDomains.includes(emailDomain)) {
            setError("Please use a valid email provider (gmail, outlook, yahoo)");
            return false;
        }

        // Password validation from working example
        if (!passwordRegex.test(form.password)) {
            setError(
                "Password must be at least 8 characters and include uppercase, lowercase, number, and special character"
            );
            return false;
        }

        // Password match validation
        if (form.password !== form.confirmPassword) {
            setError("Passwords do not match");
            return false;
        }

        // Terms agreement validation
        if (!agreed) {
            setError("You must agree to the terms and conditions");
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!validateForm()) return;

        setLoading(true);

        try {
            // Prepare data for API call
            const userData = {
                name: form.name.trim(),
                email: form.email.trim(),
                password: form.password,
                organization: form.organization.trim(),
                phone: form.phone.trim()
            };

            // API call to register user
            const response = await fetch(
                `${process.env.REACT_APP_API_URL || "http://localhost:5050"}/api/auth/register`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(userData),
                }
            );

            const data = await response.json();

            if (response.ok && data.success) {
                // Store token if returned
                if (data.token) {
                    localStorage.setItem("token", data.token);
                    localStorage.setItem("user", JSON.stringify(data.user));
                }

                // Show success message
                alert("Registration successful! Redirecting to login...");

                // Redirect to login page
                navigate("/login");
            } else {
                setError(data.message || "Registration failed");
            }
        } catch (err) {
            console.error("Registration error:", err);
            setError("Network error! Is your backend running?");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Header />

            <main className="container">
                <section className="active" style={{ padding: '3rem 0' }}>
                    <div className="section-title">
                        <h2>Create Your Account</h2>
                        <p>Join thousands of organizations using our ID Card Generator</p>
                    </div>

                    <div className="form-section">
                        <div className="form-container" style={{
                            gridTemplateColumns: '1fr 1fr',
                            maxWidth: '1000px',
                            margin: '0 auto'
                        }}>
                            {/* Left Column - Form */}
                            <div className="form-column">
                                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                        <div className="form-group">
                                            <label htmlFor="name" style={{ fontWeight: '600', color: '#09758a', marginBottom: '0.5rem' }}>
                                                <i className="fas fa-user"></i> Full Name *
                                            </label>
                                            <input
                                                id="name"
                                                name="name"
                                                type="text"
                                                value={form.name}
                                                onChange={handleChange}
                                                placeholder="Enter your full name"
                                                required
                                                disabled={loading}
                                                autoComplete="off"
                                                style={{
                                                    width: '100%',
                                                    padding: '0.8rem',
                                                    border: '1px solid #ddd',
                                                    borderRadius: '4px',
                                                    fontSize: '1rem',
                                                    backgroundColor: loading ? '#f5f5f5' : 'white'
                                                }}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="email" style={{ fontWeight: '600', color: '#09758a', marginBottom: '0.5rem' }}>
                                                <i className="fas fa-envelope"></i> Email Address *
                                            </label>
                                            <input
                                                id="email"
                                                name="email"
                                                type="email"
                                                value={form.email}
                                                onChange={handleChange}
                                                placeholder="Enter your email"
                                                required
                                                disabled={loading}
                                                autoComplete="off"
                                                autoCorrect="off"
                                                autoCapitalize="none"
                                                spellCheck="false"
                                                style={{
                                                    width: '100%',
                                                    padding: '0.8rem',
                                                    border: '1px solid #ddd',
                                                    borderRadius: '4px',
                                                    fontSize: '1rem',
                                                    backgroundColor: loading ? '#f5f5f5' : 'white'
                                                }}
                                            />
                                        </div>
                                    </div>

                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                        <div className="form-group">
                                            <label htmlFor="password" style={{ fontWeight: '600', color: '#09758a', marginBottom: '0.5rem' }}>
                                                <i className="fas fa-lock"></i> Password *
                                            </label>
                                            <input
                                                id="password"
                                                name="password"
                                                type="password"
                                                value={form.password}
                                                onChange={handleChange}
                                                placeholder="Min. 8 chars: A-Z, a-z, 0-9, special char"
                                                required
                                                disabled={loading}
                                                autoComplete="new-password"
                                                style={{
                                                    width: '100%',
                                                    padding: '0.8rem',
                                                    border: '1px solid #ddd',
                                                    borderRadius: '4px',
                                                    fontSize: '1rem',
                                                    backgroundColor: loading ? '#f5f5f5' : 'white'
                                                }}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="confirmPassword" style={{ fontWeight: '600', color: '#09758a', marginBottom: '0.5rem' }}>
                                                <i className="fas fa-lock"></i> Confirm Password *
                                            </label>
                                            <input
                                                id="confirmPassword"
                                                name="confirmPassword"
                                                type="password"
                                                value={form.confirmPassword}
                                                onChange={handleChange}
                                                placeholder="Confirm your password"
                                                required
                                                disabled={loading}
                                                autoComplete="new-password"
                                                style={{
                                                    width: '100%',
                                                    padding: '0.8rem',
                                                    border: '1px solid #ddd',
                                                    borderRadius: '4px',
                                                    fontSize: '1rem',
                                                    backgroundColor: loading ? '#f5f5f5' : 'white'
                                                }}
                                            />
                                        </div>
                                    </div>

                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                        <div className="form-group">
                                            <label htmlFor="organization" style={{ fontWeight: '600', color: '#09758a', marginBottom: '0.5rem' }}>
                                                <i className="fas fa-building"></i> Organization
                                            </label>
                                            <input
                                                id="organization"
                                                name="organization"
                                                type="text"
                                                value={form.organization}
                                                onChange={handleChange}
                                                placeholder="Your company/school name"
                                                disabled={loading}
                                                autoComplete="off"
                                                style={{
                                                    width: '100%',
                                                    padding: '0.8rem',
                                                    border: '1px solid #ddd',
                                                    borderRadius: '4px',
                                                    fontSize: '1rem',
                                                    backgroundColor: loading ? '#f5f5f5' : 'white'
                                                }}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="phone" style={{ fontWeight: '600', color: '#09758a', marginBottom: '0.5rem' }}>
                                                <i className="fas fa-phone"></i> Phone Number
                                            </label>
                                            <input
                                                id="phone"
                                                name="phone"
                                                type="tel"
                                                value={form.phone}
                                                onChange={handleChange}
                                                placeholder="Your phone number"
                                                disabled={loading}
                                                autoComplete="off"
                                                style={{
                                                    width: '100%',
                                                    padding: '0.8rem',
                                                    border: '1px solid #ddd',
                                                    borderRadius: '4px',
                                                    fontSize: '1rem',
                                                    backgroundColor: loading ? '#f5f5f5' : 'white'
                                                }}
                                            />
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: '1rem 0' }}>
                                        <input
                                            type="checkbox"
                                            id="agree"
                                            checked={agreed}
                                            onChange={(e) => setAgreed(e.target.checked)}
                                            disabled={loading}
                                            style={{ cursor: loading ? 'not-allowed' : 'pointer' }}
                                        />
                                        <label htmlFor="agree" style={{ cursor: loading ? 'not-allowed' : 'pointer' }}>
                                            I agree to the <Link to="/terms" style={{ color: '#04675b' }}>Terms of Service</Link> and <Link to="/privacy" style={{ color: '#04675b' }}>Privacy Policy</Link> *
                                        </label>
                                    </div>

                                    {error && (
                                        <div style={{
                                            background: '#fee',
                                            color: '#c33',
                                            padding: '1rem',
                                            borderRadius: '6px',
                                            borderLeft: '4px solid #c33',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.75rem'
                                        }}>
                                            <i className="fas fa-exclamation-circle"></i> {error}
                                        </div>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        style={{
                                            width: '100%',
                                            padding: '1rem',
                                            background: '#04675b',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '50px',
                                            fontSize: '1rem',
                                            fontWeight: '600',
                                            cursor: loading ? 'not-allowed' : 'pointer',
                                            opacity: loading ? 0.7 : 1,
                                            transition: 'all 0.3s ease'
                                        }}
                                    >
                                        {loading ? (
                                            <>
                                                <i className="fas fa-spinner fa-spin"></i> Creating Account...
                                            </>
                                        ) : (
                                            <>
                                                <i className="fas fa-user-plus"></i> Create Account
                                            </>
                                        )}
                                    </button>

                                    <div style={{ textAlign: 'center', marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid #ddd' }}>
                                        <p>
                                            Already have an account? <Link to="/login" style={{ color: '#04675b', fontWeight: '600' }}>Sign in here</Link>
                                        </p>
                                    </div>
                                </form>
                            </div>

                            {/* Right Column - Benefits */}
                            <div style={{
                                background: 'linear-gradient(135deg, #04675b 0%, #09758a 100%)',
                                borderRadius: '10px',
                                padding: '2rem',
                                color: 'white',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center'
                            }}>
                                <h3 style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '1.8rem' }}>
                                    <i className="fas fa-gift" style={{ marginRight: '0.5rem' }}></i> Benefits of Registration
                                </h3>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                                        <i className="fas fa-save" style={{ fontSize: '1.5rem', color: '#1ee5ff', marginTop: '0.25rem' }}></i>
                                        <div>
                                            <h4 style={{ marginBottom: '0.25rem', fontSize: '1.1rem' }}>Save & Manage Templates</h4>
                                            <p style={{ color: 'rgba(255, 255, 255, 0.85)', margin: 0, fontSize: '0.95rem' }}>
                                                Store your custom ID card designs for future use
                                            </p>
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                                        <i className="fas fa-cloud" style={{ fontSize: '1.5rem', color: '#1ee5ff', marginTop: '0.25rem' }}></i>
                                        <div>
                                            <h4 style={{ marginBottom: '0.25rem', fontSize: '1.1rem' }}>Cloud Storage</h4>
                                            <p style={{ color: 'rgba(255, 255, 255, 0.85)', margin: 0, fontSize: '0.95rem' }}>
                                                Access your ID cards from any device, anywhere
                                            </p>
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                                        <i className="fas fa-bolt" style={{ fontSize: '1.5rem', color: '#1ee5ff', marginTop: '0.25rem' }}></i>
                                        <div>
                                            <h4 style={{ marginBottom: '0.25rem', fontSize: '1.1rem' }}>Faster Generation</h4>
                                            <p style={{ color: 'rgba(255, 255, 255, 0.85)', margin: 0, fontSize: '0.95rem' }}>
                                                Quickly generate multiple IDs with saved profiles
                                            </p>
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                                        <i className="fas fa-shield-alt" style={{ fontSize: '1.5rem', color: '#1ee5ff', marginTop: '0.25rem' }}></i>
                                        <div>
                                            <h4 style={{ marginBottom: '0.25rem', fontSize: '1.1rem' }}>Enhanced Security</h4>
                                            <p style={{ color: 'rgba(255, 255, 255, 0.85)', margin: 0, fontSize: '0.95rem' }}>
                                                Your data is encrypted and protected
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div style={{ marginTop: '2rem', padding: '1rem', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '6px' }}>
                                    <p style={{ margin: 0, textAlign: 'center', fontSize: '0.9rem' }}>
                                        <i className="fas fa-info-circle" style={{ marginRight: '0.5rem' }}></i>
                                        Your information is secured with industry-standard encryption
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}