import { useContext } from "react";
import { useState, useEffect } from "react";
import { BsThreeDots } from "react-icons/bs";
import { FiX, FiCopy, FiCheck } from "react-icons/fi";
import { MdDriveFileRenameOutline, MdOutlineDriveFileMoveRtl } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import { FaShareSquare } from "react-icons/fa";
import { FaRegFolder } from "react-icons/fa";
import axios from "axios";
import { MainContext } from "../ContextMain";
function PromptCard({ data, User }) {

    const [OpenPrompt, SetOpenPrompt] = useState(false);
    const { backendUrl, notify, findUserData } = useContext(MainContext)
    const [copied, setCopied] = useState(false);
    const [ResponseCopied, SetresponseCopied] = useState(false)
    const [BsThreeDotsMenu, SetBsThreeDotsMenu] = useState(false)
    const [MoveFolder, SetMoveFolder] = useState(false)
    const [isRenaming, setIsRenaming] = useState(false);
    const [shareLink, setShareLink] = useState(null);
    const [copiedLink, setCopiedLink] = useState(false);

    // Disable body scroll when modal is open
    useEffect(() => {
        if (OpenPrompt) document.body.style.overflow = "hidden";
        else document.body.style.overflow = "auto";
    }, [OpenPrompt]);

    const handleCopyPrompt = (value) => {
        if (value == "response") {
            navigator.clipboard.writeText(data?.response).then(() => {
                SetresponseCopied(true);
                setTimeout(() => SetresponseCopied(false), 2000);
            });
        } else {
            navigator.clipboard.writeText(data.title).then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            });
        }
    };

    const MovetoFolderHanlder = (folderId, promptId) => {
        const data = {
            folderId: folderId,
            promptId: promptId
        }
        axios.post(backendUrl + `/user/folder/`, data, {
            withCredentials: true
        })
            .then((success) => {
                notify(success.data.msg, "success")

            }).catch((err) => {
            })
    }


    const lightColors = [
        "#FDE68A", // amber-200
        "#BFDBFE", // blue-200
        "#FBCFE8", // pink-200
        "#BBF7D0", // green-200
        "#FECACA", // red-200
        "#DDD6FE", // purple-200
        "#A5F3FC", // cyan-200
        "#1E3A8A", // dark blue
        "#B91C1C", // dark red
        "#065F46", // dark green
        "#6B21A8"  // dark purple
    ];

    const deletePromptHandler = (id) => {
        SetBsThreeDotsMenu(false)
        axios.get(backendUrl + `/user/promptdelete/${id}`, {
            withCredentials: true
        })
            .then((success) => {
                findUserData()
                notify(success.data.msg, "success")
            }).catch((err) => {
            })
    }

    const RenamePromptHandler = (id) => {
        SetBsThreeDotsMenu(false)
        axios.get(backendUrl + `/user/renameprompt/${id}`, {
            withCredentials: true
        })
            .then((success) => {
                findUserData()
                notify(success.data.msg, "success")
            }).catch((err) => {
            })
    }


    const UrlShareHandler = (id) => {

        axios.get(backendUrl + `/share/${id}`, {
            withCredentials: true
        })
            .then((success) => {
                setShareLink(success.data.link);
                console.log(success)
                notify(success.data.message, "success")
            }).catch((err) => {
                console.log(err)
            })

    }

    const copyToClipboard = () => {
        if (shareLink) {
            navigator.clipboard.writeText(shareLink);
            setCopiedLink(true);
            setTimeout(() => {
                setCopiedLink(false)
                setShareLink(null)

            }
                , 200);
        }
    };

    return (
        <>
            {/* CARD */}
            <div style={{
                background: "var(--Prompt-card-bg)",
                color: "var(--text-color)"
            }}
                onClick={() => {
                    SetBsThreeDotsMenu(false)
                    SetOpenPrompt(true)
                    SetMoveFolder(false)
                }}
                className=" w-full duration-500 h-50 bg-white/40  cursor-pointer shadow-xl rounded-xl p-4 flex flex-col justify-between gap-3 relative hover:shadow-2xl transition"
            >
                <div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <span className={`h-3 w-3 rounded-full `} style={{ backgroundColor: data?.color }}></span>
                            <h1 className="font-semibold ">{data?.title}</h1>
                        </div>
                        <div className="relative inline-block">
                            <BsThreeDots
                                className="text-gray-500 cursor-pointer text-xl"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    SetBsThreeDotsMenu(!BsThreeDotsMenu);
                                }}
                            />

                            {BsThreeDotsMenu && (
                                <div style={{
                                    background: "var(--Prompt-card-bg)",
                                    color: "var(--text-color)"
                                }} className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg py-2 z-50">
                                    <div className="flex items-center px-2 gap-2 hover:bg-gray-700" onClick={(e) => {
                                        e.stopPropagation()
                                        SetBsThreeDotsMenu(false);
                                        RenamePromptHandler(data._id)
                                    }}>
                                        <MdDriveFileRenameOutline className="text-xl" />
                                        <div className=" py-2  cursor-pointer">Rename</div>
                                    </div>
                                    <div className="flex items-center px-2 gap-2 hover:bg-gray-700" onClick={(e) => {
                                        e.stopPropagation()
                                        SetBsThreeDotsMenu(false);
                                        SetMoveFolder(true)
                                    }}>
                                        <MdOutlineDriveFileMoveRtl className="text-xl" />
                                        <div className="py-2  cursor-pointer">Move</div>
                                    </div>
                                    <div className=" flex items-center px-2 gap-2 hover:bg-gray-700" onClick={(e) => {
                                        e.stopPropagation()
                                        deletePromptHandler(data._id)
                                    }}>
                                        <MdDeleteOutline className="text-xl" />
                                        <div className="py-2  cursor-pointer text-red-600">Delete</div>
                                    </div>
                                </div>
                            )}
                            {
                                MoveFolder && (
                                    <div style={{
                                        background: "var(--Prompt-card-bg)",
                                        color: "var(--text-color)"
                                    }} className="mt-2 ml-6 w-40 bg-gray-50 border rounded shadow p-2 absolute top-0 right-0" onClick={(e) => e.stopPropagation()}>
                                        {User ? (
                                            User.folder?.map((folder) => (
                                                <div key={folder._id} className=" flex items-center gap-2 px-2 py-1 hover:bg-gray-600 cursor-pointer rounded">
                                                    <FaRegFolder />
                                                    <div
                                                        key={folder._id}
                                                        className=""
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            MovetoFolderHanlder(folder._id, data._id)
                                                            SetMoveFolder(false);
                                                        }}
                                                    >

                                                        {folder.folder}
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="text-gray-500 text-sm">No folder found</div>
                                        )}
                                    </div>
                                )

                            }
                        </div>
                    </div>
                    <p className="text-gray-500 text-sm mt-5">{data?.prompt}</p>

                </div>
                <div className="flex flex-wrap gap-2">
                    {data?.tags.map((tag, index) => (

                        <span style={{
                            background: lightColors[index % lightColors.length],
                        }}
                            key={index}
                            className="px-3 py-1 text-xs rounded-md text-gray-900"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
                <div className="w-full flex flex-col items-center  justify-center">
                    {shareLink && (
                        // Overlay for background blur
                        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-90">
                            {/* Centered Modal Box */}
                            <div className="bg-white p-4 rounded-xl shadow-lg w-[300px] flex flex-col items-center justify-center gap-4">
                                <p className="text-center break-words text-sm font-medium w-full">
                                    Share Link:
                                    <br />
                                    <span className="text-blue-700">{shareLink}</span>
                                </p>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        SetOpenPrompt(false);
                                        copyToClipboard();
                                    }}
                                    className="py-2 px-4 bg-blue-800 hover:bg-blue-600 duration-200 text-white rounded-lg cursor-pointer w-full text-center"
                                >
                                    {copied ? "Copied!" : "Copy"}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>


            {/* MODAL */}
            {OpenPrompt && (
                <div style={{
                    background: "var(--Prompt-card-bg)/80",
                    color: "var(--text-color)"
                }} className="fixed px-4 inset-0 flex items-center justify-center  backdrop-blur-xs z-100">
                    <div style={{
                        background: "var(--Prompt-card-bg)",
                        color: "var(--text-color)"
                    }} className=" w-[500px] max-h-[80vh] overflow-y-auto rounded-xl p-6 shadow-lg animate-scale-up">
                        {/* Header */}
                        <div className=" relative flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold">Prompt Details</h2>
                            <div className=" flex items-center gap-2">
                                <FaShareSquare className=" cursor-pointer" onClick={(e) => {
                                    e.stopPropagation()
                                    SetOpenPrompt(false)
                                    UrlShareHandler(data._id)
                                }} />
                                <button
                                    onClick={() => SetOpenPrompt(false)}
                                    className="p-1 hover:bg-gray-200 rounded-full cursor-pointer"
                                >
                                    <FiX size={20} />
                                </button>
                            </div>
                        </div>


                        {/* Prompt Section */}
                        <div className="mb-4">
                            <h3 className="font-medium ">Title:</h3>
                            <p >{data?.title}</p>
                        </div>

                        <div className="mb-4">
                            <h3 className="font-medium ">Prompt:</h3>
                            <p >{data?.prompt}</p>
                        </div>
                        <div className="mb-4">

                            <h3 className="font-medium ">response:</h3>
                            <p >{data.response}</p>

                        </div>

                        <div className="mb-4">
                            <h3 className="font-medium ">Notes:</h3>
                            <p >{data.notes ? data.notes : "No Notes availble"}</p>
                        </div>

                        {/* Footer with Close + Copy Button */}
                        <div className="flex justify-end gap-3 mt-6">
                            <button
                                onClick={() => handleCopyPrompt("response")}
                                className="flex items-center gap-1 px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 cursor-pointer transition"
                            >
                                {ResponseCopied ? <FiCheck /> : <FiCopy />}
                                {ResponseCopied ? "Copied!" : "Copy Response "}
                            </button>
                            <button
                                onClick={() => handleCopyPrompt("prompt")}
                                className="flex items-center gap-1 px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 cursor-pointer transition"
                            >
                                {copied ? <FiCheck /> : <FiCopy />}
                                {copied ? "Copied!" : "Copy Prompt Only"}
                            </button>
                            <button
                                onClick={() => SetOpenPrompt(false)}
                                className="px-4 py-2 bg-gray-800 cursor-pointer text-white rounded-md hover:bg-gray-900 transition"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default PromptCard;
