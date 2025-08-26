import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { FiX } from "react-icons/fi"
import { useNavigate, useParams } from "react-router-dom"
import { MainContext } from "../ContextMain"

function SharePrompt() {
    const navigate = useNavigate()
    const { backendUrl } = useContext(MainContext)
    const [showdata, SetShowData] = useState(null)

    const { id } = useParams()



    useEffect(() => {
        axios.get(`${backendUrl}/share/sharedata/${id}`, {
            withCredentials: true
        })
            .then((success) => {
                SetShowData(success.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    return (
        <div className="flex items-center w-full  h-[100vh] border-2 p-4">
            <div style={{
                background: "var(--Prompt-card-bg)/80",
                color: "var(--text-color)"
            }} className="fixed px-4 inset-0 flex items-center justify-center  backdrop-blur-xs z-100">
                <div style={{
                    background: "var(--Prompt-card-bg)",
                    color: "var(--text-color)"
                }} className=" w-[500px] max-h-[80vh] overflow-y-auto rounded-xl p-6 shadow-lg animate-scale-up">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold">Prompt Details</h2>
                        <button onClick={() => navigate(-1)}
                            className="p-1 hover:bg-gray-200 rounded-full cursor-pointer"
                        >
                            <FiX size={20} />
                        </button>
                    </div>

                    {/* Prompt Section */}
                    <div className="mb-4">
                        <h3 className="font-medium ">Title:</h3>
                        <p >{showdata?.title}</p>
                    </div>

                    <div className="mb-4">
                        <h3 className="font-medium ">Prompt:</h3>
                        <p >{showdata?.prompt}</p>
                    </div>
                    <div className="mb-4">

                        <h3 className="font-medium ">response:</h3>
                        <p >{showdata?.response}</p>

                    </div>

                    <div className="mb-4">
                        <h3 className="font-medium ">Notes:</h3>
                        <p >{showdata?.notes ? data.notes : "No Notes availble"}</p>
                    </div>

                    {/* Footer with Close + Copy Button */}
                    <div className="flex justify-end gap-3 mt-6">

                        <button onClick={() => navigate(-1)}
                            className="px-4 py-2 bg-gray-800 cursor-pointer text-white rounded-md hover:bg-gray-900 transition"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>

        </div >
    )
}

export default SharePrompt
