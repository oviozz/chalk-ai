import React, { useState } from 'react';
import { FaWandMagicSparkles } from 'react-icons/fa6';
import Image from 'next/image';

interface LandingPageProps {
    onLogin: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onLogin }) => {
    const [isPressed, setIsPressed] = useState(false);
    const [inputText, setInputText] = useState('');
    const [isPressed1, setIsPressed1] = useState(false);
    const [isPressed3, setIsPressed3] = useState(false);

    return (
        <div className="min-h-screen relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 -z-10">
                {/* First gradient blob */}
                <div className="absolute top-0 left-0 w-[800px] h-[800px] rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 blur-[120px] animate-blob"></div>
                
                {/* Second gradient blob */}
                <div className="absolute top-1/2 right-0 w-[600px] h-[600px] rounded-full bg-gradient-to-l from-pink-500/20 to-purple-500/20 blur-[120px] animate-blob animation-delay-2000"></div>
                
                {/* Third gradient blob */}
                <div className="absolute bottom-0 left-1/3 w-[700px] h-[700px] rounded-full bg-gradient-to-t from-blue-500/20 to-purple-500/20 blur-[120px] animate-blob animation-delay-4000"></div>
            </div>

            {/* Header */}
            <header className="flex justify-between items-center p-4 bg-white shadow-sm">
                {/* Logo */}
                <div className="text-2xl font-bold text-purple-600">
                    Chalk AI
                </div>

                {/* Navigation */}
                <nav className="flex space-x-8">
                    <button 
                        onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                        className="text-lg hover:text-blue-600 transition-colors"
                    >
                        Features
                    </button>
                    <button className="text-lg hover:text-blue-600 transition-colors">
                        Testimonials
                    </button>
                    <button className="text-lg hover:text-blue-600 transition-colors">
                        Billing
                    </button>
                </nav>

                {/* Login Button */}
                <button 
                    onClick={onLogin}
                    className="px-6 py-2 font-bold text-l bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-md 
                    hover:from-purple-700 hover:to-purple-900 
                    transition-all duration-300 
                    transform hover:-translate-y-[2px] hover:shadow-lg
                    hover:shadow-purple-500/30"
                >
                    Login
                </button>
            </header>

            {/* Main Content Area */}
            <main className="container mx-auto mt-12 px-4 space-y-16">
                <div 
                    className={`
                        w-full 
                        h-[600px] 
                        bg-gray-100 
                        rounded-lg 
                        shadow-lg 
                        transition-all 
                        duration-300 
                        cursor-pointer
                        border-2
                        border-gray-200
                        ${isPressed ? 'transform translate-y-1 shadow-md' : 'hover:shadow-xl hover:-translate-y-1'}
                    `}
                    onMouseDown={() => setIsPressed(true)}
                    onMouseUp={() => setIsPressed(false)}
                    onMouseLeave={() => setIsPressed(false)}
                >
                    <div className="flex items-center justify-center h-full text-gray-500 text-xl">
                        Demo Window - Click to interact
                    </div>
                </div>

                {/* Heading Section */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold mb-4 bg-clip-text hover:text-transparent hover:bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 transition-all duration-300 cursor-pointer">
                        Your Personal AI Tutor
                    </h2>
                    <div className="flex items-center justify-center gap-2">
                        <span className="text-gray-600">powered by</span>
                        <Image
                            src="/assets/ElevenLabs_logo_2.png"
                            alt="ElevenLabs Logo"
                            width={180}
                            height={50}
                            className="object-contain"
                        />
                    </div>
                </div>

                {/* Interactive Cards Section */}
                <div className="relative">
                    {/* Gradient Background */}
                    <div className="absolute -z-10 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-purple-500/30 to-blue-500/30 blur-[100px] animate-pulse left-1/2 -translate-x-1/2" />

                    {/* Cards Container */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                        {/* Text Chat Card */}
                        <div 
                            className={`
                                bg-white/80 
                                backdrop-blur-sm 
                                rounded-2xl 
                                shadow-xl 
                                p-8
                                transition-all
                                duration-300
                                cursor-pointer
                                ${isPressed1 ? 'transform translate-y-1 shadow-md' : 'hover:shadow-xl hover:-translate-y-1'}
                            `}
                            onMouseDown={() => setIsPressed1(true)}
                            onMouseUp={() => setIsPressed1(false)}
                            onMouseLeave={() => setIsPressed1(false)}
                        >
                            <div className="flex flex-col items-center mb-8">
                                <div className="relative flex items-center justify-center transform hover:scale-110 transition-transform duration-300 mb-4">
                                    <div className="absolute w-6 h-6 bg-white rounded-full opacity-20 animate-pulse"></div>
                                    <span className="text-purple-600 text-2xl font-bold relative z-10">
                                        <FaWandMagicSparkles/>
                                    </span>
                                </div>
                                <h2 className="text-2xl font-bold text-gray-800">Text Chat</h2>
                            </div>

                            <div className="space-y-4">
                                <textarea 
                                    className="w-full h-32 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    placeholder="e.g. What is the Pythagorean Theorem?"
                                    value={inputText}
                                    onChange={(e) => setInputText(e.target.value)}
                                />
                                <button className="w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                                    Enter
                                </button>
                            </div>
                        </div>

                        {/* Voice Chat Card */}
                        <div 
                            className={`
                                bg-white/80 
                                backdrop-blur-sm 
                                rounded-2xl 
                                shadow-xl 
                                p-8
                                transition-all
                                duration-300
                                cursor-pointer
                                ${isPressed3 ? 'transform translate-y-1 shadow-md' : 'hover:shadow-xl hover:-translate-y-1'}
                            `}
                            onMouseDown={() => setIsPressed3(true)}
                            onMouseUp={() => setIsPressed3(false)}
                            onMouseLeave={() => setIsPressed3(false)}
                        >
                            <div className="flex flex-col items-center mb-8">
                                <div className="relative flex items-center justify-center transform hover:scale-110 transition-transform duration-300 mb-4">
                                    <div className="absolute w-6 h-6 bg-white rounded-full opacity-20 animate-pulse"></div>
                                    <span className="text-blue-600 text-2xl font-bold relative z-10">
                                        <FaWandMagicSparkles/>
                                    </span>
                                </div>
                                <h2 className="text-2xl font-bold text-gray-800">Voice Chat</h2>
                            </div>

                            <div className="flex flex-col items-center justify-center space-y-4">
                                <small className="text-sm text-gray-500">Powered by ElevenLabs</small>
                                <button className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                    Start Voice Chat
                                </button>
                                <small className="text-xs text-gray-500">
                                    The app requires microphone access to work.
                                </small>
                            </div>
                        </div>
                    </div>
                </div>

                        

                {/* Trusted By Section */}
                <div className="text-center mb-12">
                    <h3 className="text-2xl font-semibold text-gray-700 mb-6">Trusted by students from</h3>
                    <div className="flex justify-center items-center gap-12">
                        <Image
                            src="/assets/Cal-State-Long-Beach-W.png"
                            alt="Cal State Long Beach Logo"
                            width={200}
                            height={80}
                            className="object-contain opacity-80 hover:opacity-100 transition-opacity grayscale hover:grayscale-0 transition-all duration-300"
                        />
                        <Image
                            src="/assets/UCLA_Bruins_script.svg.png"
                            alt="UCLA Logo"
                            width={200}
                            height={80}
                            className="object-contain opacity-80 hover:opacity-100 transition-opacity grayscale hover:grayscale-0 transition-all duration-300"
                        />
                    </div>
                </div>

                {/* Features Section */}
                <div id="features" className="text-center mb-12">
                    <h3 className="text-3xl font-bold text-gray-800 mb-8">Features</h3>
                    <div className="flex flex-col gap-12 max-w-5xl mx-auto">
                        {/* Card 1 - AI Co-Pilot */}
                        <div className="p-8 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-[0_0_30px_-5px_rgba(147,51,234,0.3)] transition-shadow">
                            <h4 className="text-2xl font-semibold mb-6">Your AI Powered Co-Pilot</h4>
                            <div 
                                className={`
                                    w-full 
                                    h-[400px] 
                                    bg-gray-100 
                                    rounded-lg 
                                    shadow-lg 
                                    transition-all 
                                    duration-300 
                                    cursor-pointer
                                    border-2
                                    border-gray-200
                                    ${isPressed1 ? 'transform translate-y-1 shadow-md' : 'hover:shadow-xl hover:-translate-y-1'}
                                `}
                                onMouseDown={() => setIsPressed1(true)}
                                onMouseUp={() => setIsPressed1(false)}
                                onMouseLeave={() => setIsPressed1(false)}
                            >
                                <div className="flex items-center justify-center h-full text-gray-500 text-xl">
                                    Demo Window - Click to interact
                                </div>
                            </div>
                        </div>

                        {/* Card 2 - Sample Questions */}
                        <div className="p-8 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-[0_0_30px_-5px_rgba(147,51,234,0.3)] transition-shadow">
                            <h4 className="text-2xl font-semibold mb-6">Generate Sample Questions on Demand</h4>
                            <div 
                                className={`
                                    w-full 
                                    h-[400px] 
                                    bg-gray-100 
                                    rounded-lg 
                                    shadow-lg 
                                    transition-all 
                                    duration-300 
                                    cursor-pointer
                                    border-2
                                    border-gray-200
                                    ${isPressed1 ? 'transform translate-y-1 shadow-md' : 'hover:shadow-xl hover:-translate-y-1'}
                                `}
                                onMouseDown={() => setIsPressed(true)}
                                onMouseUp={() => setIsPressed(false)}
                                onMouseLeave={() => setIsPressed(false)}
                            >
                                <div className="flex items-center justify-center h-full text-gray-500 text-xl relative z-[2]">
                                    Demo Window - Click to interact
                                </div>
                            </div>
                        </div>

                        {/* Card 3 - Check Answers */}
                        <div className="p-8 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-[0_0_30px_-5px_rgba(147,51,234,0.3)] transition-shadow">
                            <h4 className="text-2xl font-semibold mb-6">Check and Submit Answers with Feedback</h4>
                            <div 
                                className={`
                                    w-full 
                                    h-[400px] 
                                    bg-gray-100 
                                    rounded-lg 
                                    shadow-lg 
                                    transition-all 
                                    duration-300 
                                    cursor-pointer
                                    border-2
                                    border-gray-200
                                    ${isPressed1 ? 'transform translate-y-1 shadow-md' : 'hover:shadow-xl hover:-translate-y-1'}
                                `}
                                onMouseDown={() => setIsPressed3(true)}
                                onMouseUp={() => setIsPressed3(false)}
                                onMouseLeave={() => setIsPressed3(false)}
                            >
                                <div className="flex items-center justify-center h-full text-gray-500 text-xl relative z-[2]">
                                    Demo Window - Click to interact
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default LandingPage;
