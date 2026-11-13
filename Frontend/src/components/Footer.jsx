import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer className="bg-[#111111] text-[#FFF4E0] px-8 md:px-16 py-12 border-t-[5px] border-[#FF5C39]">

            <div className="flex flex-col md:flex-row justify-between gap-10">

                <div>
                    <h2 className="text-3xl display-font">
                        CODE-A-NOVA<span className="text-[#FF5C39]">.</span>
                    </h2>
                    <p className="mt-3 text-gray-400">
                        Think boldly. Build differently. Innovate endlessly.
                    </p>
                </div>

                <div className="flex gap-8 font-semibold">
                    <Link to="/" className="hover:text-[#FFD23F]">Home</Link>
                    <Link to="/contact" className="hover:text-[#FFD23F]">Contact</Link>
                    <Link to="/signup" className="hover:text-[#FFD23F]">Register</Link>
                </div>

            </div>

            <div className="border-t border-gray-700 mt-10 pt-6 text-sm text-gray-400">
                © {new Date().getFullYear()} Code-A-Nova. All rights reserved.
            </div>

        </footer>
    );
}

export default Footer;