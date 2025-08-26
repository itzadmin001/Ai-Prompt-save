import { TbArrowBadgeRightFilled } from "react-icons/tb";
import { Link } from "react-router-dom";
import { FaGithub, FaInstagram, FaLinkedin, FaXTwitter } from "react-icons/fa6";

function Footer() {
    return (
        <footer style={{
            background: "var(--bg-color)",
            color: "var(--text-color)",

        }} className="w-full  border-t border-gray-200 font-sans px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-6">

            {/* Logo */}
            <div className="flex items-center  text-xl font-bold cursor-pointer" onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
            }}>
                <TbArrowBadgeRightFilled size={24} />
                <span>promptsave</span>
            </div>

            {/* Navigation Links */}
            <nav className="flex flex-wrap items-center justify-center sm:gap-6 gap-2  text-base font-medium">
                <Link className="hover:text-blue-600 transition sm:text-xl text-sm">© 2025 PromptSave. All Rights Reserved</Link>
                <Link to="/terms" className="hover:text-blue-600 transition">Terms & Conditions</Link>
                <Link to="/privacy" className="hover:text-blue-600 transition">Privacy Policy</Link>
                <Link to="/imprint" className="hover:text-blue-600 transition">Imprint</Link>
                <Link to="/register" className="hover:text-blue-600 transition">Register</Link>
            </nav>

            {/* Social Media */}
            <div className="flex items-center gap-5 ">
                <Link href="https://github.com/itzadmin001" target="_blank" rel="noopener noreferrer" title="GitHub">
                    <FaGithub size={22} className="hover:text-black transition" />
                </Link>
                <Link href="https://instagram.com/itz__admin__01" target="_blank" rel="noopener noreferrer" title="Instagram">
                    <FaInstagram size={22} className="hover:text-pink-500 transition" />
                </Link>
                <Link href="https://www.linkedin.com/in/yogesh-kumar-558b4b26b/" target="_blank" rel="noopener noreferrer" title="LinkedIn">
                    <FaLinkedin size={22} className="hover:text-blue-600 transition" />
                </Link>
                <Link href="https://x.com/YogeshK63827" target="_blank" rel="noopener noreferrer" title="X (Twitter)">
                    <FaXTwitter size={22} className="hover:text-black transition" />
                </Link>
            </div>
        </footer>
    );
}

export default Footer;
