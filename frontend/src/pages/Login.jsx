import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./Login.css";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      navigate("/", { replace: true });
    }

    // Check for saved credentials
    const savedEmail = localStorage.getItem("rememberedEmail");
    if (savedEmail) {
      setForm(prev => ({ ...prev, email: savedEmail }));
      setRememberMe(true);
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setError("");
  };

  const validateForm = () => {
    if (!form.email.trim() || !form.password.trim()) {
      setError("Email and password are required");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setError("Please enter a valid email address");
      return false;
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }

    return true;
  };

  const handleSocialLogin = (provider) => {
    setError(`Connecting with ${provider}... (Feature in development)`);
    console.log(`Social login with ${provider}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) return;

    setLoading(true);

    try {
      // Save email if remember me is checked
      if (rememberMe) {
        localStorage.setItem("rememberedEmail", form.email);
      } else {
        localStorage.removeItem("rememberedEmail");
      }

      const res = await fetch("http://localhost:5050/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
        }
        if (data.token) {
          localStorage.setItem("token", data.token);
        }

        // Show success message
        setError("success:Login successful! Redirecting...");
        setTimeout(() => {
          navigate("/", { replace: true });
        }, 1500);
      } else {
        setError(data.error || data.message || "Login failed. Please check your credentials.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Unable to connect to server. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
  const handleForgotPassword = () => {
    if (form.email) {
      setError(`info:Password reset link will be sent to ${form.email} (Feature in development)`);
    } else {
      setError("Please enter your email address first");
    }
  };

  // Check if error message is success/info type
  const getMessageType = (message) => {
    if (message.startsWith("success:")) return "success";
    if (message.startsWith("info:")) return "info";
    return "error";
  };

  const getMessageText = (message) => {
    if (message.startsWith("success:")) return message.replace("success:", "");
    if (message.startsWith("info:")) return message.replace("info:", "");
    return message;
  };

  return (
    <div className="login-page">
      <Header />

      <main className="container">
        <section className="login-section active">
          <div className="section-title">
            <h2>Welcome Back</h2>
            <p>Sign in to your account to access the ID Card Generator</p>
          </div>

          <div className="login-form-container">
            {/* Left Column - Login Form */}
            <div className="form-column">
              <form onSubmit={handleSubmit} className="login-form">
                <div className="form-group">
                  <label htmlFor="email">
                    <i className="fas fa-envelope icon-left"></i>
                    Email Address
                  </label>
                  <div className="input-with-icon">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="Enter your email address"
                      required
                      disabled={loading}
                      className="icon-input"
                    />
                    <i className="fas fa-user input-icon-right"></i>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="password">
                    <i className="fas fa-lock icon-left"></i>
                    Password
                  </label>
                  <div className="input-with-icon">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      value={form.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      required
                      disabled={loading}
                      className="icon-input"
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      disabled={loading}
                    >
                      <i className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                    </button>
                  </div>
                </div>

                <div className="form-options">
                  <div className="remember-me">
                    <input
                      type="checkbox"
                      id="remember"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      disabled={loading}
                    />
                    <label htmlFor="remember">Remember me</label>
                  </div>
                  <button
                    type="button"
                    className="forgot-password-btn"
                    onClick={handleForgotPassword}
                    disabled={loading}
                  >
                    Forgot password?
                  </button>
                </div>

                {error && (
                  <div className={`alert-message ${getMessageType(error)}`}>
                    <i className={`fas ${getMessageType(error) === "success" ? "fa-check-circle" :
                      getMessageType(error) === "info" ? "fa-info-circle" : "fa-exclamation-circle"}`}></i>
                    <span>{getMessageText(error)}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className={`btn login-btn ${loading ? "loading" : ""}`}
                >
                  {loading ? (
                    <>
                      <i className="fas fa-spinner fa-spin"></i>
                      Signing in...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-sign-in-alt"></i>
                      Sign In
                    </>
                  )}
                </button>

                <div className="divider">
                  <span>Or continue with</span>
                </div>

                <div className="social-login">
                  <button
                    type="button"
                    className="social-btn google-btn"
                    onClick={() => handleSocialLogin("Google")}
                    disabled={loading}
                  >
                    <i className="fab fa-google"></i>
                    Google
                  </button>
                  <button
                    type="button"
                    className="social-btn github-btn"
                    onClick={() => handleSocialLogin("GitHub")}
                    disabled={loading}
                  >
                    <i className="fab fa-github"></i>
                    GitHub
                  </button>
                </div>

                <div className="register-link">
                  <p>
                    Don't have an account?{" "}
                    <Link to="/register" className="register-now">
                      Sign up now
                    </Link>
                  </p>
                </div>
              </form>
            </div>

            {/* Right Column - Features Preview */}
            <div className="login-preview">
              <div className="preview-header">
                <h3><i className="fas fa-star"></i> Why Login?</h3>
                <p className="preview-subtitle">Unlock premium features</p>
              </div>

              <div className="features-list">
                <div className="feature-item">
                  <div className="feature-icon">
                    <i className="fas fa-save"></i>
                  </div>
                  <div className="feature-content">
                    <h4>Save Your Work</h4>
                    <p>Store and access your generated ID cards anytime</p>
                  </div>
                </div>

                <div className="feature-item">
                  <div className="feature-icon">
                    <i className="fas fa-history"></i>
                  </div>
                  <div className="feature-content">
                    <h4>Access History</h4>
                    <p>View and manage previously created cards</p>
                  </div>
                </div>

                <div className="feature-item">
                  <div className="feature-icon">
                    <i className="fas fa-bolt"></i>
                  </div>
                  <div className="feature-content">
                    <h4>Quick Templates</h4>
                    <p>Use saved templates for faster generation</p>
                  </div>
                </div>

                <div className="feature-item">
                  <div className="feature-icon">
                    <i className="fas fa-shield-alt"></i>
                  </div>
                  <div className="feature-content">
                    <h4>Secure Storage</h4>
                    <p>Your data is encrypted and protected</p>
                  </div>
                </div>
              </div>

              <div className="security-note">
                <i className="fas fa-shield"></i>
                <span>Your login information is securely encrypted</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}