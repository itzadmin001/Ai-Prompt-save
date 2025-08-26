import { FaCircle, FaFolder, FaPalette, FaSearch, FaShareAlt, FaInfinity, FaPenFancy, FaRegFileAlt, FaChevronDown, FaRegImage, FaCheck } from "react-icons/fa";
import { MdOutlineEditNote } from "react-icons/md";
import { FaRegCirclePlay } from "react-icons/fa6";
import { FiCheckCircle } from "react-icons/fi";
import { useContext, useEffect, useRef, useState } from "react";
import { MainContext } from "../ContextMain";
import { useNavigate } from "react-router-dom";

function Home() {
    const { User, findUserData } = useContext(MainContext)
    const Navigate = useNavigate()




    return (
        <div style={{
            background: "var(--bg-color)",
            color: "var(--text-color)",

        }} className=" duration-300" >
            <HeroComponents />
            <AllTools />
            <FavoriteModels />
            <HowIsWork />
            <Plans />
            <FAQ />
        </div>
    )
}


const HeroComponents = () => {
    return (
        <section className="w-full min-h-[80vh] flex flex-col md:flex-row items-center justify-between px-8 ">
            {/* Left Content */}
            <div className="md:w-1/2 text-center md:text-left  md:mt-0 mt-30">
                <h1 className="sm:text-5xl text-4xl md:text-5xl font-bold leading-tight">
                    Organize Your AI Prompts Like <br /> Never Before
                </h1>
                <p className="mt-4 sm:text-xl text-sm ">
                    Store, organize, and share your AI prompts across all your favorite models.
                    Create folders, add placeholders, and collaborate with the community.
                </p>

                <div className="mt-8 flex items-center md:justify-start justify-center  gap-4 ">
                    <button style={{
                        background: "var(--Button-bg-color)",
                        color: "var(--Button-text-color)"
                    }} className="duration-300  cursor-pointer  px-6 py-3 rounded-lg font-medium hover:opacity-90 transition">
                        Start for Free
                    </button>
                    <button style={{
                        background: "var(--Button-bg-color)",
                        color: "var(--Button-text-color)"
                    }} className=" duration-300 cursor-pointer  px-6 py-3 rounded-lg font-medium hover:opacity-90 transition">
                        See How It Works
                    </button>
                </div>

                <p className="mt-4 sm:text-sm text-xs ">
                    No credit card required • Free plan available
                </p>
            </div>

            {/* Right Content (Card) */}
            <div className="mt-12 md:mt-0  rounded-xl shadow-lg md:w-1/2 w-full p-6 border-[1px] border-gray-200 ">
                {/* Window bar */}
                <div className="flex items-center gap-2 pb-4 border-b-[1px] border-gray-200">
                    <FaCircle className="text-red-500 text-xs" />
                    <FaCircle className="text-yellow-400 text-xs" />
                    <FaCircle className="text-green-500 text-xs" />
                    <span className="ml-auto text-sm ">PromptSave.ai</span>
                </div>

                {/* Prompts */}
                <div className="mt-4 space-y-8 ">
                    {/* ChatGPT */}
                    <div className="flex items-center gap-4">
                        <div className="w-3 h-3 bg-black rounded-sm"></div>
                        <p className="text-sm ">ChatGPT</p>
                        <div className="ml-auto sm:text-sm text-xs  ">
                            Write a poem about &#123;subject&#125; in the style of &#123;author&#125;
                        </div>
                    </div>

                    {/* Midjourney */}
                    <div className="flex items-center gap-4">
                        <div className="w-3 h-3 bg-blue-600 rounded-sm"></div>
                        <p className="text-sm ">Midjourney</p>
                        <div className="ml-auto sm:text-sm text-xs  ">
                            Create an image of &#123;scene&#125; with &#123;style&#125; aesthetic
                        </div>
                    </div>

                    {/* Claude */}
                    <div className="flex items-center gap-4">
                        <div className="w-3 h-3 bg-orange-400 rounded-sm"></div>
                        <p className="text-sm ">Claude</p>
                        <div className="ml-auto sm:text-sm text-xs ">
                            Explain &#123;concept&#125; as if I’m &#123;level&#125;
                        </div>
                    </div>

                    {/* Gemini */}
                    <div className="flex items-center gap-4">
                        <div className="w-3 h-3 bg-pink-500 rounded-sm"></div>
                        <p className="text-sm ">Gemini</p>
                        <div className="ml-auto sm:text-sm text-xs ">
                            Explain &#123;concept&#125; as if I’m &#123;level&#125;
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}


const AllTools = () => {

    const tools = [
        {
            icon: <FaFolder className="text-2xl " />,
            title: "Organized in Libraries",
            description: "Keep your prompts neatly organized in libraries for different projects, models, or use cases."
        },
        {
            icon: <MdOutlineEditNote className="text-2xl " />,
            title: "Customizable Templates",
            description: "Create reusable prompt templates with placeholders that you can fill in later."
        },
        {
            icon: <FaPalette className="text-2xl " />,
            title: "Color Coding",
            description: "Color code your prompts for easy visual organization and identification."
        },
        {
            icon: <FaShareAlt className="text-2xl " />,
            title: "Public Sharing",
            description: "Share your best prompts with the community or keep them private - you decide."
        },
        {
            icon: <FaSearch className="text-2xl " />,
            title: "Powerful Search",
            description: "Find the perfect prompt quickly with our powerful search functionality."
        },
        {
            icon: <FaInfinity className="text-2xl " />,
            title: "Unlimited Prompts",
            description: "Create unlimited prompts across unlimited folders with no storage restrictions."
        },
        {
            icon: <FaPenFancy className="text-2xl " />,
            title: "Prompt Engineering Insights",
            description: "Prompt engineering is valuable, but people lose their best prompts in notes/apps."
        },
        {
            icon: <FaPenFancy className="text-2xl " />,
            title: "Collaboration Tools",
            description: "Work together with your team on prompt creation, editing, and testing in real time."
        }
    ];


    return (
        <section className="py-16 px-8 md:px-20">
            {/* Heading */}
            <div className="text-center mb-12">
                <h2 className="text-4xl  font-bold">All the Tools You Need</h2>
                <p className="mt-3 sm:text-xl text-sm  max-w-2xl mx-auto">
                    PromptSave gives you everything needed to create, organize, and share AI prompts for all your favorite models in one place.
                </p>
            </div>

            {/* Tools Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {tools.map((tool, index) => (
                    <div
                        style={{
                            background: "var(--model-div-bg)",
                        }}
                        key={index}
                        className=" rounded-xl p-6 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 cursor-pointer"
                    >
                        <div className="w-16 h-16 flex items-center justify-center text-black bg-gray-100 rounded-lg mb-4">
                            {tool.icon}
                        </div>
                        <h3 className="text-xl font-bold">{tool.title}</h3>
                        <p className=" mt-2 text-lg">{tool.description}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}


const FavoriteModels = () => {


    const categories = [
        {
            icon: <FaRegFileAlt className="text-xl" />,
            title: "Text Generation",
            models: ["ChatGPT", "Claude", "Google Gemini", "Grok", "DeepSeek", "Llama"]
        },
        {
            icon: <FaRegImage className="text-xl" />,
            title: "Image Generation",
            models: ["DALL-E", "Midjourney", "Stable Diffusion", "Ideogram", "Leonardo", "Craiyon"]
        },
        {
            icon: <FaRegCirclePlay className="text-xl" />,
            title: "Video Generation",
            models: ["Sora", "Pika", "Runway", "Flux", "Gen-2", "Gen-1"]
        }
    ];


    return (
        <section className="w-full min-h-[80vh] py-16 px-8 md:px-20  ">
            {/* Heading */}
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold">Works With All Your Favorite AI Models</h2>
                <p className="mt-3  max-w-2xl mx-auto">
                    PromptSave supports prompts for a wide range of AI models, so you can organize all your creative work in one place.
                </p>
            </div>

            {/* Cards */}
            <div className="flex flex-col items-center justify-center gap-10 sm:flex-row">
                {categories.map((cat, idx) => (
                    <div style={{
                        background: "var(--model-div-bg)"
                    }}
                        key={idx}
                        className="md:w-[18vw] w-full  rounded-xl shadow-md hover:shadow-lg hover:-translate-y-2 transition-all duration-300"
                    >
                        {/* Header */}
                        <div className="flex items-center gap-2 px-6 py-4 border-b">
                            {cat.icon}
                            <h3 className="font-semibold">{cat.title}</h3>
                        </div>

                        {/* Models List */}
                        <div className=" px-6 py-4 space-y-4">
                            {cat.models.map((model, i) => (
                                <div key={i} className="flex items-center gap-2">
                                    <FiCheckCircle className="text-green-500" />
                                    <span>{model}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}


const HowIsWork = () => {



    const steps = [
        {
            number: "01",
            title: "Create Your Library",
            description: "Sign up and start creating libraries to organize your prompts by project, model, or category."
        },
        {
            number: "02",
            title: "Add Your Prompts",
            description: "Write or paste your favorite prompts, add placeholders for variables, and assign colors for visual organization."
        },
        {
            number: "03",
            title: "Use & Share",
            description: "Copy prompts directly to your AI tools or share them publicly to help others."
        }
    ];


    return (
        <section className="py-16 px-8 md:px-20 ">
            {/* Heading */}
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold">How It Works</h2>
                <p className="mt-3 text-xl  max-w-2xl mx-auto">
                    Getting started with PromptSave is quick and easy. Here's how it works:
                </p>
            </div>

            {/* Steps */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {steps.map((step, idx) => (
                    <div style={{
                        background: "var(--model-div-bg)"
                    }}
                        key={idx}
                        className="relative bg-white border rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300"
                    >
                        {/* Number circle */}
                        <div className="absolute -top-5 -left-4 w-12 h-12 bg-black text-white rounded-full flex items-center justify-center font-bold text-sm">
                            {step.number}
                        </div>
                        <h3 className="font-semibold mt-4 text-xl">{step.title}</h3>
                        <p className=" mt-2 text-sm">{step.description}</p>
                    </div>
                ))}
            </div>

            {/* Button */}
            <div className="text-center mt-10">
                <button style={{
                    background: "var(--Button-bg-color)",
                    color: "var(--Button-text-color)"
                }} className=" cursor-pointer  px-6 py-4 rounded-lg font-medium hover:opacity-80 transition">
                    Get Started Now
                </button>
            </div>
        </section>
    )
}


const Plans = () => {
    const [isYearly, setIsYearly] = useState(false);


    const monthlyPlans = [
        {
            title: "Starter",
            subtitle: "Ideal for Beginners",
            price: "€0.00",
            period: "",
            features: [
                "Save up to 10 Prompts",
                "Create Prompt Libraries",
                "Add Variables",
                "Tag Management",
                "Color Coding",
                "Prompt Sharing via Link",
            ],
        },
        {
            title: "Pro (Monthly)",
            subtitle: "For Regular Users",
            price: "€3.99",
            period: "/month",
            features: [
                "Everything in Starter",
                "Unlimited Prompts",
                "Technical Support",
            ],
        },
    ];

    const yearlyPlans = [
        {
            title: "Starter Yearly",
            subtitle: "Ideal for Beginners",
            price: "€0.00",
            period: "",
            features: [
                "Save up to 10 Prompts",
                "Create Prompt Libraries",
                "Add Variables",
                "Tag Management",
                "Color Coding",
                "Prompt Sharing via Link",
            ],
        },
        {
            title: "Pro (Yearly)",
            subtitle: "For Regular Users",
            price: "€39.99",
            period: "/year",
            features: [
                "Everything in Starter",
                "Unlimited Prompts",
                "Technical Support",
            ],
        },
    ];

    const plans = isYearly ? yearlyPlans : monthlyPlans;

    return (
        <section id="price" className="w-full min-h-[100vh] bg-[#1e1e1e] py-16 px-6">
            <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold">
                    Our plans. Specially designed for you.
                </h2>

                {/* Toggle */}
                <div className="mt-5 bg-[#2a2a2a] inline-flex rounded-full p-1">
                    <button
                        onClick={() => setIsYearly(false)}
                        className={`px-4 py-2 rounded-full cursor-pointer transition-all ${!isYearly ? "bg-[#3a3a3a]" : ""
                            }`}
                    >
                        Monthly
                    </button>
                    <button
                        onClick={() => setIsYearly(true)}
                        className={`px-4 py-2 rounded-full cursor-pointer transition-all ${isYearly ? "bg-[#3a3a3a]" : ""
                            }`}
                    >
                        Yearly
                    </button>
                </div>
            </div>

            {/* Plans */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {plans.map((plan, idx) => (
                    <div style={{
                        background: "var(--model-div-bg)"
                    }}
                        key={idx}
                        className=" rounded-xl overflow-hidden shadow-lg flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-6 text-center ">
                            <h3 className="text-xl font-bold">{plan.title}</h3>
                            <p className=" mt-1">{plan.subtitle}</p>
                            <div className="text-3xl font-bold mt-6">
                                {plan.price}
                                <span className="text-base font-normal">{plan.period}</span>
                            </div>
                        </div>

                        {/* Features */}
                        <div className="p-6 flex-1">
                            <p className="font-medium mb-3">Includes :</p>
                            <ul className="space-y-6">
                                {plan.features.map((feature, i) => (
                                    <li key={i} className="flex items-center gap-2">
                                        <FaCheck className="text-green-500" /> {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Button */}
                        <div className="p-6 pt-0"  >
                            <button style={{
                                background: "var(--Button-bg-color)",
                                color: "var(--Button-text-color)"
                            }} className="w-full bg-[#0b1120] hover:bg-[#131b2f] text-white py-4 rounded-lg font-medium transition">
                                Get Started
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}


const FAQ = () => {
    const faqRef = useRef(null);
    const [openIndex, setOpenIndex] = useState(null);
    const scrollToFaq = () => {
        faqRef.current.scrollIntoView({ behavior: "smooth" });
    };
    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };



    const faqs = [
        {
            question: "What is PromptSave?",
            answer:
                "PromptSave is a platform to save, organize, and share AI prompts efficiently, boosting creativity and productivity.",
        },
        {
            question: "How do the prompt placeholders work?",
            answer:
                "Prompt placeholders allow you to insert dynamic content inside your prompts without rewriting the whole text.",
        },
        {
            question: "How can I organize my prompts in PromptSave?",
            answer:
                "You can categorize your prompts into folders, add tags, and search quickly using keywords.",
        },
        {
            question: "How does sharing a prompt work?",
            answer:
                "You can share prompts via a unique link or make them public in the PromptSave community.",
        },
        {
            question: "How do I get started with PromptSave?",
            answer:
                "Sign up for free, start saving your favorite prompts, and organize them into collections.",
        },
    ];

    return (
        <section id="faq" className="px-6 md:px-16 py-20 ">
            {/* Black CTA Section */}
            <div className=" md:w-3/4 w-full mx-auto text-center bg-black rounded-xl p-20 mb-14" style={{
                background: "var(--faq-bg-color)",
                color: "var(--faq-text-color)"
            }}>
                <h2 className=" text-xl md:text-3xl  font-semibold mb-4">
                    Ready to Organize Your Prompt Collection?
                </h2>
                <p className=" mb-8 sm:text-xl text-sm">
                    Join AI enthusiasts who are saving time and boosting creativity with organized prompts.
                </p>
                <button style={{
                    background: "var(--Button-text-color)",
                    color: "var(--Button-bg-color)"
                }} className=" cursor-pointer  px-6 py-4 rounded-lg font-medium hover:bg-gray-200 transition">
                    Get Started Free
                </button>
            </div>

            {/* FAQ Section */}
            <h2 className="text-center text-3xl font-bold mb-6">FAQs</h2>
            <div className="max-w-6xl mx-auto space-y-4">
                {faqs.map((faq, index) => (
                    <div
                        key={index}
                        className="border-b border-gray-200 pb-3 cursor-pointer"
                        onClick={() => toggleFAQ(index)}
                    >
                        <div className="flex justify-between items-center hover:underline  ">
                            <h3 className="md:text-lg font-medium">{faq.question}</h3>
                            <FaChevronDown
                                className={`transition-transform duration-500 ${openIndex === index ? "rotate-180" : ""
                                    }`}
                            />
                        </div>
                        <div
                            className={`overflow-hidden transition-all duration-500 ease-in-out ${openIndex === index ? "max-h-40 mt-2" : "max-h-0"
                                }`}
                        >
                            <p className=" md:text-xl text-xs ">{faq.answer}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}



export default Home
