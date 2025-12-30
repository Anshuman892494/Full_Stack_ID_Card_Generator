export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer>
            <div className="container">
                <div className="footer-content">
                    <div className="logo">
                        <i className="fas fa-id-card"></i>
                        <h1>ProID Studio</h1>
                    </div>
                    <p>Professional ID Card Solutions for Organizations</p>
                    <p>&copy; {currentYear} ID_Generator. All rights reserved | Version 2.1.0.</p>
                </div>
            </div>
        </footer>
    );
}