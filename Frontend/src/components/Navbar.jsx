import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav className="bg-[#FFF4E0] border-b-[3px] border-[#111111] px-6 md:px-12 py-5 flex justify-between items-center">

            <Link to="/" className="text-2xl font-bold">
                CODE<span className="text-[#FF5C39]">-A-NOVA</span>
            </Link>

            <div className="hidden md:flex gap-8 font-bold">
                <Link to="/" className="hover:text-[#FF5C39]">Home</Link>
                <a href="/#about" className="hover:text-[#FF5C39]">About</a>
                <Link to="/contact" className="hover:text-[#FF5C39]">Contact</Link>
            </div>

            <div className="flex gap-3">
                <Link
                    to="/login"
                    className="brutal-button px-4 py-2 font-bold bg-white"
                >
                    Login
                </Link>

                <Link
                    to="/signup"
                    className="brutal-button px-4 py-2 font-bold bg-[#FF5C39]"
                >
                    Sign Up ↗
                </Link>
            </div>

        </nav>
    );
}

export default Navbar;