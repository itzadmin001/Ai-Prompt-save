import React, { useContext, useState } from "react";
import { FiX } from "react-icons/fi";
import { getSocket } from "../Sockets/Socket";
import { MainContext } from "../ContextMain";
import axios from "axios";
import LoadingPage from "./LoadingPage";

function CreatePrompt({ onClose, SetcreatPromptDiv }) {
    const { notify, backendUrl, findUserData } = useContext(MainContext)
    const [selectedColor, setSelectedColor] = useState(null);
    const [showNotes, setShowNotes] = useState(false);
    const [manualresponse, SetManualResponse] = useState(false)
    const [tags, setTags] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const socket = getSocket();
    const [Loading, SetLoading] = useState(false)


    const colors = [
        "#FFB6B6",
        "#FFD966",
        "#B6FFB6",
        "#C4C4C4",
        "#FF9FCF",
        "#FFA500",
        "#008080",
        "#4B0082",
        "#32CD32",
        "#FF4500",
        "#1E90FF",
        "#8B4513",
    ];



    const CreatePromptHandler = (e) => {
        e.preventDefault()
        SetLoading(true)
        const data = {
            title: e.target.title.value,
            color: selectedColor,
            tags: tags,
            notes: e.target.notes?.value || "",
            prompt: e.target.prompt.value,
            response: e.target.response?.value || ""
        }
        if (!data.color || !data.tags || !data.title || !data.prompt) {
            notify("all fields are required!", "error")
            SetLoading(false)
            return;
        }

        axios.post(backendUrl + "/prompt", data, {
            withCredentials: true
        })
            .then((success) => {
                console.log(success)
                notify(success.data.msg, "success")
                findUserData()
                e.target.reset()
                SetLoading(false)
                SetcreatPromptDiv(false)
            })
            .catch((err) => {
                notify(err.response?.data.message, "error")
                console.log(err)
                SetLoading(false)
            })
    }





    const handleKeyDown = (e) => {
        if (e.key === "Enter" && inputValue.trim() !== "") {
            e.preventDefault();
            if (!tags.includes(inputValue.trim())) {
                setTags([...tags, inputValue.trim()]);
            }
            setInputValue("");
        }
    };

    const removeTag = (index) => {
        setTags(tags.filter((_, i) => i !== index));
    };

    if (Loading) return <LoadingPage />
    return (
        <div className="fixed px-4 inset-0 flex items-center justify-center dark:bg-black/80 z-80">
            {/* Modal Box */}
            <form onSubmit={CreatePromptHandler} style={{
                background: "var(--Prompt-card-bg)",
                color: "var(--text-color)"
            }} className=" lg:w-1/2 rounded-lg shadow-lg p-6 animate-scale-up">
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Create New Prompt</h2>
                    <button onClick={onClose} className="p-1  rounded-full cursor-pointer dark:hover:bg-gray-900 bg-gray-400 dark:text-white text-black ">
                        <FiX size={20} />
                    </button>
                </div>

                {/* Prompt Title */}
                <label className="font-medium">Title</label>
                <input
                    type="text"
                    placeholder="Enter prompt title"
                    className="w-full p-2 border rounded-md mb-4"
                    name="title"
                    required
                />

                {/* Color Picker */}
                <label className="font-medium">Choose Color</label>
                <div className="flex gap-2 mb-4 flex-wrap mt-1">
                    {colors.map((color, index) => (
                        <div
                            key={index}
                            onClick={() => setSelectedColor(color)}
                            className={`w-6 h-6 rounded-full cursor-pointer border-2 ${selectedColor === color ? "border-black" : "border-transparent"
                                }`}
                            style={{ backgroundColor: color }}
                        ></div>
                    ))}
                </div>

                <div className="w-full font-medium ">
                    <span>Prompt</span>
                    <label className="inline-flex w-full ">
                        <input
                            placeholder="Type your prompt here..."
                            className="w-full p-4 border rounded-md mb-4"
                            name="prompt"
                        />
                    </label>
                </div>
                {/* Tags */}
                <div className="mb-4">
                    <label className="font-medium">Tags</label>
                    <div className="flex flex-wrap items-center gap-2 border rounded-md p-2">
                        {tags.map((tag, index) => (
                            <span
                                key={index}
                                className="bg-gray-300 px-2 py-1 rounded-md flex items-center gap-1"
                            >
                                {tag}
                                <button
                                    type="button"
                                    onClick={() => removeTag(index)}
                                    className="ml-1 text-xs font-bold cursor-pointer"
                                >
                                    ✕
                                </button>
                            </span>
                        ))}
                        <input
                            type="text"
                            placeholder="Search or create a tag..."
                            className="flex-1 p-2 outline-none"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                    </div>
                </div>

                {/* Notes Toggle Button */}
                <div className="mb-4">
                    <label className="inline-flex items-center mb-5 cursor-pointer">
                        <span className=" px-2 text-sm font-medium text-gray-900 dark:text-gray-500" >Note:</span>
                        <input type="checkbox" value="" className="sr-only peer" onChange={(e) => {
                            setShowNotes(e.target.checked);
                        }} />
                        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
                    </label>
                </div>
                {showNotes && (
                    <textarea
                        placeholder="Type your notes here..."
                        className="w-full p-2 border rounded-md mb-4"
                        name="notes"
                    />
                )}



                {/* Response Mode togle */}
                <div className="mb-2 flex gap-2">
                    <label className="inline-flex  items-center mb-5 cursor-pointer">
                        <p className="text-sm text-red-500 px-2">Do You have a response? click Yes:</p>
                        <span className=" px-2 text-sm font-medium text-gray-900 dark:text-gray-500" >No</span>
                        <input type="checkbox" value="" className="sr-only peer" onChange={(e) => {
                            SetManualResponse(e.target.checked);
                        }} />
                        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
                        <span className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-500" >Yes</span>

                    </label>
                </div>

                {/* Show Prompt textarea only in Manual Mode */}
                {manualresponse == true && (
                    <>
                        <label className="font-medium">Response</label>
                        <textarea
                            placeholder="Type your Response here..."
                            className="w-full p-2 border rounded-md mb-4"
                            name="response"
                        />
                    </>
                )}
                {/* Buttons */}
                <div className="flex justify-end gap-2">
                    <button style={{
                        background: "var(--Button-bg-color)",
                        color: "var(--Button-text-color)"
                    }}
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-200 rounded-md cursor-pointer dark:bg-gray-800"
                    >
                        Close
                    </button>
                    <button style={{
                        background: "var(--Button-bg-color)",
                        color: "var(--Button-text-color)"
                    }}
                        className="px-4 py-2 bg-gray-800 cursor-pointer text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                    // Disable until title is entered
                    >
                        Create Prompt
                    </button>
                </div>
            </form>
        </div>
    );
}

export default CreatePrompt;
