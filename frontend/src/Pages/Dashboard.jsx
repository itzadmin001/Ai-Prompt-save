import { TbArrowBadgeRightFilled } from "react-icons/tb";
import { RiMenu2Line } from "react-icons/ri";
import { BsSearch } from "react-icons/bs";
import { CiUser } from "react-icons/ci";
import { useContext, useEffect, useRef, useState } from "react";
import { FiX, FiFolder } from "react-icons/fi";
import { MainContext } from "../ContextMain";
import { FaMoon, FaRegFolder } from "react-icons/fa";
import { MdSunny, MdDelete, MdClose } from "react-icons/md";
import { IoHome } from "react-icons/io5";
import { FiPlus } from "react-icons/fi";
import PromptCard from "../Components/PromptCard";
import CreatePrompt from "../Components/CreatePrompt";
import { IoMdClose } from "react-icons/io";
import axios from "axios"
import { useNavigate } from "react-router-dom"
import LoadingPage from "../Components/LoadingPage";
import { connectSocket, getSocket } from "../Sockets/Socket";

function Dashboard() {
    const { toggleTheme, isDark, rotating, User, SetUser, backendUrl, findUserData, notify } = useContext(MainContext);
    const [LeftSideMenu, SetLeftSideMenu] = useState(false);
    const [CreatePromptDiv, SetcreatPromptDiv] = useState(false);
    const [openCreateLibrary, setOpenCreateLibrary] = useState(false);
    const [libraryNames, setLibraryNames] = useState([]);
    const [newLibrary, setNewLibrary] = useState("");
    const [UserProfile, SetUserProfile] = useState(false)
    const [query, setQuery] = useState("");
    const [OpenSearch, SetOpenSearch] = useState(false)
    const [Loading, SetLoding] = useState(true)
    const [showFilters, setShowFilters] = useState(false);
    const [FilterData, SetFilterData] = useState("All")
    const [folderPrompts, setFolderPrompts] = useState([]);



    useEffect(() => {
        findUserData()

    }, [])



    const socket = getSocket();
    const navigate = useNavigate()

    const handleCreateLibrary = (e) => {
        e.preventDefault();
        socket.emit("newLibrary", { newLibrary })
        SetLoding(true)
    };
    const LogoutHandler = (e) => {
        axios.get(backendUrl + "/user/logout", {
            withCredentials: true
        })
            .then((success) => {
                navigate("/")
                localStorage.setItem("Auth", false)
                SetUser(null)
            }).catch((err) => {
                console.log(err)
            })

    }


    const handleFilterClick = async (folder) => {
        SetFilterData(folder);

        if (folder === "All") {
            setFolderPrompts([]); // clear so User.prompts will be shown
            return;
        }

        try {
            const selectedFolder = User.folder.find(f => f.folder === folder);
            if (!selectedFolder) return;
            const res = await axios.get(backendUrl + `/user/folderdata/${selectedFolder._id}`, {
                withCredentials: true
            });
            setFolderPrompts(res.data?.folder?.prompt);
        } catch (error) {
            console.error(error);
        }
    };

    const promptsToShow = FilterData === "All" ? User?.prompts : folderPrompts;

    useEffect(() => {
        if (!socket) return;
        const ReciveLiabraryHandler = (data) => {
            if (data.status == 201) {
                setOpenCreateLibrary(false)
                setNewLibrary("")
                SetLoding(false)
                notify(data.message, "success")
                findUserData()
            }
        }
        socket.on("libraryUpdated", ReciveLiabraryHandler)
        return () => socket.off("libraryUpdated", ReciveLiabraryHandler)
    }, [])


    useEffect(() => {
        const getUser = JSON.parse(localStorage.getItem("Auth"))
        if (getUser) {
            if (User) {
                connectSocket();
                SetLoding(false)
            }
        } else navigate("/login")
    }, [User]);


    const DeleteLiabraryHandler = (id) => {
        socket.emit("deleteLiabrary", { id })
        findUserData()
    };


    useEffect(() => {
        if (LeftSideMenu || CreatePromptDiv) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [LeftSideMenu, CreatePromptDiv]);

    if (Loading) return <LoadingPage />


    return (
        <section className="w-full duration-300 h-[100vh] overflow-auto" style={{
            background: "var(--bg-color)",
            color: "var(--text-color)",

        }}>
            <div className="w-full min-h-full flex" >
                {/* LEFT SIDEBAR */}
                <div style={{
                    background: "var(--bg-color)",
                    color: "var(--text-color)",

                }}
                    className={`
            bg-gray-100 duration-300 fixed md:static top-0 left-0 h-[100vh] z-60 
             ${LeftSideMenu
                            ? "translate-x-0 w-[70%] md:w-0 md:overflow-hidden"
                            : "-translate-x-full md:translate-x-0 md:w-1/4"}
          `}
                >
                    {/* Close button for mobile */}
                    <div className="flex justify-between items-center px-5 py-4 border-b border-gray-400" >
                        <div
                            className="text-xl flex items-center gap-1 font-semibold cursor-pointer"
                            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                        >
                            <TbArrowBadgeRightFilled className="border-4 text-3xl rounded-md" />
                            <h1>PromptSave</h1>
                        </div>
                        {/* Close button visible only on mobile */}
                        <IoMdClose
                            className="md:hidden cursor-pointer text-2xl hover:text-red-500"
                            onClick={() => SetLeftSideMenu(false)}
                        />
                    </div>

                    <div className="px-4" >
                        <div className="flex items-center px-4 py-2 gap-2 mt-5  rounded-xl " style={{
                            background: "var(--Prompt-div-bg)",
                            color: "var(--text-color)"
                        }}>
                            <IoHome />
                            <h1>All Prompts</h1>
                        </div>

                        <div className="px-4">
                            <div className="flex items-center justify-between mt-5 text-xl">
                                <h1 className="uppercase text-sm text-gray-700">Libraries</h1>
                                <div
                                    className="p-2 rounded-full duration-300 hover:bg-gray-200 cursor-pointer"
                                    onClick={() => setOpenCreateLibrary(true)}
                                >
                                    <FiPlus />
                                </div>
                            </div>
                            <ul className="mt-5">

                                {User?.folder?.map((name, index) => (

                                    <div
                                        key={name._id}
                                        className="flex items-center justify-between gap-2 py-2 px-6 cursor-pointer"
                                    >
                                        <div className="flex items-center gap-2">
                                            <FaRegFolder size={20} />
                                            <li>{name.folder}</li>
                                        </div>
                                        <div
                                            className="cursor-pointer hover:text-red-300"
                                            onClick={() => DeleteLiabraryHandler(name._id)}
                                        >
                                            <MdDelete size={20} />
                                        </div>
                                    </div>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* BACKDROP for mobile when sidebar is open */}
                {LeftSideMenu && (
                    <div
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
                        onClick={() => SetLeftSideMenu(false)}
                    ></div>
                )}

                {/* CREATE LIBRARY MODAL */}
                {openCreateLibrary && (
                    <div className="fixed inset-0 flex items-center px-5 justify-center bg-black/40 backdrop-blur-sm z-60">
                        <div style={{
                            background: "var(--Prompt-div-bg)",
                            color: "var(--text-color)"
                        }} className=" w-[400px] rounded-xl shadow-lg p-6 relative">
                            <div className="flex justify-between items-center border-b pb-3">
                                <h2 className="text-lg font-semibold">Create New Library</h2>
                                <IoMdClose
                                    className="cursor-pointer text-xl hover:text-red-500"
                                    onClick={() => setOpenCreateLibrary(false)}
                                />
                            </div>

                            <div className="mt-4 " >
                                <label className="text-sm font-medium text-gray-700">Library Name</label>
                                <input
                                    type="text"
                                    value={newLibrary}
                                    onChange={(e) => setNewLibrary(e.target.value)}
                                    placeholder="Enter library name"
                                    className="w-full mt-2 border rounded-lg p-2 outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div className="flex justify-end gap-3 mt-5">
                                <button
                                    onClick={() => setOpenCreateLibrary(false)}
                                    className="flex items-center cursor-pointer gap-1 px-4 py-2 dark:bg-white rounded-lg dark:text-black hover:bg-gray-300"
                                >
                                    ✖ Close
                                </button>
                                <button
                                    onClick={handleCreateLibrary}
                                    className="flex items-center gap-1 px-4 py-2 dark:bg-white dark:text-black rounded-lg hover:bg-gray-700 cursor-pointer"
                                >
                                    ✔ Create
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* RIGHT CONTENT */}
                <div className={`${LeftSideMenu ? "md:w-full" : ""} w-full duration-500`}>
                    <div className="flex items-center justify-between p-4 px-6 text-2xl border-b border-gray-400">
                        <div>
                            <RiMenu2Line
                                className="cursor-pointer"
                                onClick={() => SetLeftSideMenu(!LeftSideMenu)}
                            />
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="cursor-pointer" onClick={() => SetOpenSearch(true)}>
                                <BsSearch className="text-xl " />
                            </div>
                            {OpenSearch && (
                                <div className="fixed inset-0 flex items-center justify-center bg-black/30 dark:bg-black/50 z-60">
                                    <div className="mt-10 w-[90%] sm:w-[400px] md:w-[500px] lg:w-[600px] 
                          flex items-center gap-2 px-3 py-2 
                          bg-white dark:bg-gray-800 
                          rounded-2xl shadow-md border border-gray-200 dark:border-gray-700">

                                        <BsSearch className="text-gray-500 dark:text-gray-300" size={20} />
                                        <input
                                            type="text"
                                            value={query}
                                            onChange={(e) => setQuery(e.target.value)}
                                            placeholder="Search prompts by tags..."
                                            className="w-full bg-transparent outline-none 
                         text-gray-800 dark:text-gray-100 
                         placeholder-gray-500 dark:placeholder-gray-400"
                                        />
                                        <MdClose
                                            className="cursor-pointer text-gray-500 dark:text-gray-300 hover:text-red-500"
                                            size={22}
                                            onClick={() => SetOpenSearch(false)}
                                        />
                                    </div>
                                </div>
                            )}
                            <div>
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
                                        size={22}
                                        className={`cursor-pointer transition-transform duration-700 ${rotating ? "-rotate-90" : ""
                                            }`}
                                    />
                                )}
                            </div>
                            <div className="relative">
                                {/* User Icon */}
                                <div style={{
                                    background: "var(--Prompt-div-bg)",
                                    color: "var(--text-color)"
                                }}
                                    className="p-2 bg-gray-200 rounded-full cursor-pointer"
                                    onClick={() => SetUserProfile(!UserProfile)}
                                >
                                    <CiUser size={16} />
                                </div>

                                {/* Dropdown Menu */}
                                {UserProfile && (
                                    <div style={{
                                        background: "var(--Prompt-card-bg)",
                                        color: "var(--text-color)"
                                    }} className="absolute right-0 mt-2 w-56  shadow-lg rounded-lg border z-50">
                                        {/* Header with Close Button */}
                                        <div className="flex justify-between items-center p-3 border-b">
                                            <div className="cursor-pointer">
                                                <p className="text-sm font-semibold">My Account</p>
                                                <p className="text-xs text-gray-500">{User?.email}</p>
                                            </div>
                                            <button
                                                onClick={() => SetUserProfile(false)}
                                                className="p-1 hover:bg-gray-100 rounded-full cursor-pointer"
                                            >
                                                <MdClose size={18} />
                                            </button>
                                        </div>

                                        {/* Menu Items */}
                                        <div className="flex flex-col p-2 text-sm" >
                                            <button className="flex  cursor-pointer items-center gap-2 p-2 hover:bg-gray-200 dark:hover:bg-black/50  rounded">
                                                <CiUser size={16} /> Profile
                                            </button>
                                            <button onClick={LogoutHandler} className="flex cursor-pointer items-center gap-2 p-2 rounded text-red-500 hover:bg-gray-200 dark:hover:bg-black/50">
                                                Logout
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="w-full h-full">
                        <div className="mt-10 p-10 w-full flex items-center justify-between">
                            <h1 className="text-2xl font-semibold">All Prompt</h1>
                            <div className="relative">
                                {/* Main Buttons */}
                                <div className="flex items-center gap-2">
                                    <h1
                                        style={{
                                            background: "var(--Button-bg-color)",
                                            color: "var(--Button-text-color)"
                                        }}
                                        className="py-2 px-4 border border-gray-800 rounded-sm cursor-pointer hover:bg-slate-200 duration-200"
                                        onClick={() => setShowFilters(true)}
                                    >
                                        Filters
                                    </h1>
                                    <div
                                        style={{
                                            background: "var(--Button-bg-color)",
                                            color: "var(--Button-text-color)"
                                        }}
                                        onClick={() => SetcreatPromptDiv(true)}
                                        className="py-2 px-4 border border-gray-800 rounded-sm cursor-pointer hover:bg-slate-200 duration-200"
                                    >
                                        <FiPlus size={20} />
                                    </div>
                                </div>

                                {/* Filter Dropdown / Popup */}
                                {showFilters && (
                                    <div
                                        className="absolute top-12 right-10  shadow-lg border border-gray-300 rounded-md w-64 p-4 z-50"
                                    >
                                        <div className="flex justify-between items-center mb-3">
                                            <h2 className="text-lg font-semibold">Select Folder</h2>
                                            <FiX
                                                className="cursor-pointer hover:text-red-500"
                                                onClick={() => setShowFilters(false)}
                                                size={20}
                                            />
                                        </div>
                                        <div className="flex flex-col gap-2 ">
                                            <div className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-700 cursor-pointer" onClick={() => SetFilterData("All")}>
                                                <FiFolder className="text-blue-600" />
                                                <h1 >All</h1>
                                            </div>
                                            {User?.folder.map(folder => (
                                                <div onClick={() => handleFilterClick(folder.folder)}
                                                    key={folder._id}
                                                    className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-700 cursor-pointer"
                                                >
                                                    <FiFolder className="text-blue-600" />
                                                    <span>{folder.folder}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        {CreatePromptDiv && <CreatePrompt onClose={() => SetcreatPromptDiv(false)} SetcreatPromptDiv={SetcreatPromptDiv} />}
                        <div className="px-4 grid items-center md:justify-center 2xl:grid-cols-4 xl:grid-cols-3 sm:grid-cols-2 gap-4">
                            {
                                promptsToShow && promptsToShow.length > 0 ? (
                                    promptsToShow.map((item, i) => (
                                        <PromptCard data={item} key={i} User={User} />
                                    ))
                                ) : (
                                    <p className="text-gray-500  text-center">No prompts found in this folder.</p>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Dashboard;
