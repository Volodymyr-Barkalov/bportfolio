import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const Navbar = ({ menuOpen, setMenuOpen }) => {
    const { user, logout } = useAuth();

    useEffect(() => {
        document.body.style.overflow = menuOpen ? "hidden" : ""
    }, [menuOpen]);
    return (
        <nav className="fixed top-0 w-full z-40 bg-[rgba(10, 10, 10, 0.8)] backdrop-blur-lg border-b border-white/10 shadow-lg">
            <div className="max-w-5xl mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    <a href="#home" className="font-mono text-xl font-bold text-white">

                        vobar<span className="text-blue-500">.dev</span> {" "}
                    </a>

                    <div className="w-7 h-5 relative cursor-pointer z-40 md:hidden"
                        onClick={() => setMenuOpen((prev) => !prev)}>
                        &#9776;
                    </div>

                    <div className="hidden md:flex items-center space-x-8">
                        <a href="#home" className="text-gray-300 hover:text-white transition-colors">
                            Home
                        </a>
                        <a href="#about" className="text-gray-300 hover:text-white transition-colors">
                            About
                        </a>
                        <a href="#posts" className="text-gray-300 hover:text-white transition-colors">
                            Posts
                        </a>
                        <a href="#playground" className="text-gray-300 hover:text-white transition-colors">
                            Playground
                        </a>
                        <a href="#contact" className="text-gray-300 hover:text-white transition-colors">
                            Contact
                        </a>

                        {user ? (
                            <div className="flex items-center gap-4">
                                <Link
                                    to="/admin"
                                    className="text-sm px-4 py-1.5 rounded border border-blue-500/50 text-blue-400 hover:border-blue-400 hover:text-blue-300 transition-colors"
                                >
                                    Admin
                                </Link>
                                <button
                                    onClick={logout}
                                    className="text-sm text-gray-500 hover:text-red-400 transition-colors cursor-pointer"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <Link
                                to="/login"
                                className="text-sm px-4 py-1.5 rounded border border-white/20 text-gray-300 hover:border-white/40 hover:text-white transition-colors"
                            >
                                Login
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );

}
