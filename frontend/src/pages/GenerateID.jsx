import Footer from "../components/Footer";
import Header from "../components/Header";

export default function GenerateID() {
    return (
        <div>
            <Header />
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-6">Generate ID Card</h1>
                <p>ID Card Generator page will be here.</p>
            </div>
            <Footer />
        </div>
    );
}