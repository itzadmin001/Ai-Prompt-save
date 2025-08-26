import { TbArrowBadgeRightFilled } from "react-icons/tb"
import { FcGoogle } from "react-icons/fc";
import { FaEnvelope, FaLock, FaMoon } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { MdSunny } from "react-icons/md";
import { useContext, useState } from "react";
import { MainContext } from "../ContextMain";
import axios from "axios"
import { connectSocket } from "../Sockets/Socket";

function SignUp() {
    const { toggleTheme, isDark, rotating, notify, backendUrl, findUserData, SetUser } = useContext(MainContext);

    const navigate = useNavigate()

    const SignUpHandler = (e) => {
        e.preventDefault()

        const data = {
            email: e.target.email.value,
            password: e.target.password.value,
            confirmPassword: e.target.confirmPassword.value
        }

        if (!data.email || !data.password || !data.confirmPassword) {
            return
        }
        if (data.password !== data.confirmPassword) {
            return
        }

        axios.post(backendUrl + "/user", data, {
            withCredentials: true
        })
            .then((success) => {
                console.log(success)
                if (success.status === 201) {
                    notify(success.data.msg, "success")
                    localStorage.setItem("Auth", true)
                    findUserData()
                    connectSocket();
                    console.log(success)
                    navigate("/dashboard");
                }
            }).catch((err) => {
                console.log(err)
            })
        e.target.reset()


    }


    return (
        <div className="w-full flex h-[100vh] bg-gray-900 text-white">

            <div className="w-full lg:block hidden" >
                <div className="flex items-center gap-2 h-full text-5xl font-bold justify-center">
                    <TbArrowBadgeRightFilled className=" border-10 text-8xl rounded-3xl" />
                    <h1>PromptSave</h1>
                </div>

            </div>

            <div className="lg:w-3/7 relative w-full flex h-screen justify-center items-center bg-gray-50 text-black">
                <div className="w-full max-w-md py-6 px-2">
                    {/* Heading */}\

                    <h1 className="text-4xl font-semibold mt-10 text-gray-800 mb-6  ">Sign Up</h1>

                    {/* Google Signup */}
                    <button className="flex cursor-pointer items-center justify-center w-full bg-gray-900 text-white py-3 px-4 rounded-xl hover:bg-gray-800 transition">
                        <FcGoogle className="text-2xl mr-2" />
                        Google
                    </button>

                    {/* Divider */}
                    <div className="flex items-center my-8">
                        <hr className="flex-grow border-gray-300" />
                        <span className="mx-3 text-gray-500 text-sm">OR</span>
                        <hr className="flex-grow border-gray-300" />
                    </div>

                    {/* Form */}
                    <form className="space-y-6" onSubmit={SignUpHandler}>
                        {/* Email */}
                        <div className="flex items-center border border-gray-300 rounded-lg px-3 py-4">
                            <FaEnvelope className="text-gray-500 mr-2" />
                            <input
                                type="email"
                                placeholder="Your Email"
                                name="email"
                                className="w-full outline-none bg-transparent"
                            />
                        </div>

                        {/* Password */}
                        <div className="flex items-center border border-gray-200 rounded-lg px-3 py-4">
                            <FaLock className="text-gray-500 mr-2" />
                            <input
                                type="password"
                                placeholder="Your Password"
                                name="password"
                                className="w-full outline-none bg-transparent"
                            />
                        </div>

                        {/* Confirm Password */}
                        <div className="flex items-center border border-gray-200 rounded-lg px-3 py-4">
                            <FaLock className="text-gray-500 mr-2" />
                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                className="w-full outline-none bg-transparent"
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="cursor-pointer w-full bg-gray-900 text-white py-3 rounded-xl font-semibold hover:bg-gray-800 transition"
                        >
                            Sign Up
                        </button>
                    </form>

                    {/* Footer */}
                    <p className="mt-4 text-sm text-gray-600 text-center">
                        Already have an account?{" "}
                        <Link to="/login" className="text-purple-600 hover:underline">
                            Sign In
                        </Link>
                    </p>
                    <p className="mt-2 text-sm text-purple-600 text-center hover:underline">
                        <Link to="/">Back to home</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default SignUp
