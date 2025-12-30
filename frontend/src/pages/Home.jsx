import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Home() {
    return (
        <div className="home-page">
            <Header />

            <section className="hero">
                <div className="container">
                    <h2>Professional ID Card Solutions</h2>
                    <p>Create stunning, secure, and professional ID cards for your organization with our easy-to-use platform</p>
                    <Link to="/generate" className="btn">Generate Now</Link>
                </div>
            </section>

            <main className="container">
                <section className="active">
                    <div className="section-title">
                        <h2>Why Choose Our ID Card Generator?</h2>
                        <p>We provide the most comprehensive ID card solutions for businesses, schools, and organizations</p>
                    </div>

                    <div className="features">
                        <div className="feature-card">
                            <i className="fas fa-bolt"></i>
                            <h3>Quick & Easy</h3>
                            <p>Create professional ID cards in minutes with our intuitive interface</p>
                        </div>

                        <div className="feature-card">
                            <i className="fas fa-shield-alt"></i>
                            <h3>Secure & Reliable</h3>
                            <p>Advanced security features to protect your organization's identity</p>
                        </div>

                        <div className="feature-card">
                            <i className="fas fa-palette"></i>
                            <h3>Fully Customizable</h3>
                            <p>Design ID cards that match your organization's brand and style</p>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}