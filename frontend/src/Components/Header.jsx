import { TbArrowBadgeRightFilled } from "react-icons/tb";
import { MdSunny, MdMenuOpen, MdClose } from "react-icons/md";
import { FaMoon } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { MainContext } from "../ContextMain";

function Header() {
    const { scrollToSection, toggleTheme, isDark, rotating } = useContext(MainContext);
    const [isOpen, setIsOpen] = useState(false);
    const Navigate = useNavigate()

    const menu = [
        {
            name: "FAQ",
            path: "/faq",
            onclick: () => scrollToSection("faq"),
        },
        {
            name: "Pricing",
            path: "/prices",
            onclick: () => scrollToSection("price"),
        },
        {
            name: "Register",
            path: "/register",
        },
    ];

    useEffect(() => {
        if (!isOpen) return;

        const handleClickOutside = () => {
            setIsOpen(false);
        };

        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [isOpen]);


    return (
        <div style={{
            background: "var(--bg-color)/20",
            color: "var(--text-color)",
        }} className="w-full py-6 px-8 flex duration-300 items-center fixed top-0 justify-between  backdrop-blur-md z-50 shadow-sm">
            {/* Logo */}
            <div
                className="text-xl flex items-center gap-1 font-bold cursor-pointer"
                onClick={() => {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                }}
            >
                <TbArrowBadgeRightFilled className=" border-3 text-2xl rounded-md" />
                <h1>PromptSave</h1>
            </div>

            {/* Right Section */}
            <div className="flex items-center md:gap-4 gap-2">
                {isDark === "dark" ? (
                    <FaMoon
                        onClick={() => toggleTheme("light")}
                        size={22}
                        className={`cursor-pointer transition-transform duration-700 ${rotating ? "rotate-90" : ""
                            }`}
                    />

                ) : (
                    <MdSunny
                        onClick={() => toggleTheme("dark")}
                        size={28}
                        className={`cursor-pointer transition-transform duration-700 ${rotating ? "-rotate-90" : ""
                            }`}
                    />
                )}

                {/* Desktop Menu */}
                <ul className="md:flex hidden items-center gap-6">
                    {menu.map((item, i) => (
                        <Link to={item.path}
                            onClick={item.onclick ? item.onclick : undefined}
                            key={i}
                        >
                            {item.name}
                        </Link>
                    ))}
                </ul>

                {/* Mobile Menu Button */}
                <MdMenuOpen
                    className="cursor-pointer md:hidden"
                    size={34}
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsOpen(true);
                    }}
                />

                {/* Desktop Login */}
                <button style={{
                    background: "var(--Button-bg-color)",
                    color: "var(--Button-text-color)"
                }} onClick={() => Navigate("/login")} className="md:block cursor-pointer hidden py-2 px-10 bg-black text-white font-semibold duration-500 rounded-lg">
                    Login
                </button>
            </div>

            {/* Mobile Dropdown Menu */}
            {isOpen && (
                <div style={{
                    background: "var(--bg-color)",
                    color: "var(--text-color)",
                }} className="absolute top-0 left-0 w-full bg-white shadow-md z-50 animate-slide-down">
                    <div onClick={(e) => e.stopPropagation()} className="flex justify-between items-center p-4 border-b">
                        <div onClick={() => {
                            window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                            className="text-xl flex items-center font-bold cursor-pointer"
                        >
                            <TbArrowBadgeRightFilled />
                            <h1>PromptSave</h1>
                        </div>
                        <MdClose
                            size={28}
                            className="cursor-pointer"
                            onClick={() => setIsOpen(false)}
                        />
                    </div>

                    <div className="flex flex-col gap-4 p-6">
                        {menu.map((item, i) => (
                            <Link
                                key={i}
                                onClick={() => {
                                    if (item.onclick) item.onclick();
                                    setIsOpen(false);
                                }}
                                className=" text-lg hover:text-blue-300 transition"
                            >
                                {item.name}
                            </Link>
                        ))}

                        <button onClick={() => Navigate("/login")} style={{
                            background: "var(--text-color)",
                            color: "var(--bg-color)",

                        }} className=" cursor-pointer  font-semibold w-full py-3 px-10 rounded-lg mt-4">
                            Login
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Header;
