import axios from "axios";
import { createContext, useState } from "react"
import { ToastContainer, toast } from 'react-toastify';


const MainContext = createContext()


function ContextMain(props) {
    const [isDark, setIsDark] = useState("light");
    const [rotating, setRotating] = useState(false);
    const [User, SetUser] = useState(null)
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [shareLink, setShareLink] = useState(null);
    const notify = (msg, flag) => toast(msg, { type: flag });


    const scrollToSection = (title) => {
        if (title === "faq") {
            const faqSection = document.getElementById("faq");
            faqSection.scrollIntoView({ behavior: "smooth" });
        } else {
            const PriceSection = document.getElementById("price");
            PriceSection.scrollIntoView({ behavior: "smooth" });
        }
    };


    const findUserData = () => {
        axios.get(backendUrl + "/dashboard", { withCredentials: true })
            .then((success) => {
                localStorage.setItem("Auth", true)
                SetUser(success.data.user);
            })
            .catch((err) => {
                notify(err?.response?.data?.message || "Something went wrong", "error");

            });
    };


    const toggleTheme = (value) => {
        setRotating(true);
        setTimeout(() => {
            setIsDark(value);
            document.documentElement.setAttribute("data-theme", value);
            localStorage.setItem("theme", value);
            setRotating(false);
        }, 300);
    };





    return (
        <MainContext.Provider value={{ scrollToSection, toggleTheme, findUserData, isDark, rotating, User, notify, setIsDark, backendUrl, SetUser }}>
            <ToastContainer />
            {props.children}
        </MainContext.Provider>
    )
}

export { MainContext }
export default ContextMain