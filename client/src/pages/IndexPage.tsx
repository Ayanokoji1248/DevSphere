import { useNavigate } from "react-router-dom";

const IndexPage = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-black text-white min-h-screen">
            <Header navigate={navigate} />
            <Hero navigate={navigate} />
            <Features />
            <Footer />
        </div>
    );
};


interface HeaderProps {
    navigate: (path: string) => void;
}

const Header = ({ navigate }: HeaderProps) => (
    <header className="flex justify-between items-center p-6 border-b border-gray-800">
        <h1 className="text-2xl font-bold">Dev Sphere</h1>
        <button
            onClick={() => navigate("/register")}
            className="bg-blue-400 text-black font-bold py-3 px-6 rounded-lg hover:bg-blue-500 transition"
        >
            Login
        </button>
    </header>
);

const Hero = ({ navigate }: HeaderProps) => (
    <section className="text-center py-32 px-6 bg-gradient-to-b from-black to-gray-900">
        <h2 className="text-5xl font-bold mb-4">Welcome to Dev Sphere</h2>
        <p className="text-xl mb-8">
            Explore projects, collaborate with developers, and grow your skills.
        </p>
        <button
            onClick={() => navigate("/register")}
            className="bg-blue-400 text-black font-bold py-3 px-6 rounded-lg hover:bg-blue-500 transition"
        >
            Get Started
        </button>
    </section>
);

const Features = () => (
    <section className="flex justify-center flex-wrap gap-8 py-24 px-6">
        <div className="bg-gray-800 p-8 rounded-xl w-64 text-center hover:translate-y-2 transform transition">
            <h3 className="text-2xl font-semibold mb-3">Project Showcase</h3>
            <p>Display your best work and get feedback from the community.</p>
        </div>
        <div className="bg-gray-800 p-8 rounded-xl w-64 text-center hover:translate-y-2 transform transition">
            <h3 className="text-2xl font-semibold mb-3">Developer Network</h3>
            <p>Connect with like-minded developers to collaborate and learn.</p>
        </div>
        <div className="bg-gray-800 p-8 rounded-xl w-64 text-center hover:translate-y-2 transform transition">
            <h3 className="text-2xl font-semibold mb-3">Resources</h3>
            <p>Access tutorials, guides, and articles to enhance your skills.</p>
        </div>
    </section>
);

const Footer = () => (
    <footer className="text-center p-6 bg-gray-900 border-t border-gray-800">
        &copy; 2025 Dev Sphere. All rights reserved.
    </footer>
);

export default IndexPage;
