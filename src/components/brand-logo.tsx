
import {FaWandMagicSparkles} from "react-icons/fa6";
import {cn} from "@/lib/utils";

export default function BrandLogo({className}: {className?: string}){

    return (
        <div className="flex items-center gap-3 group">
            <div className="relative overflow-hidden rounded-lg w-10 h-10 flex items-center justify-center bg-gradient-to-br from-purple-600 to-blue-600 shadow-lg">
                <div className="relative flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                    <div className="absolute w-6 h-6 bg-white rounded-full opacity-20 animate-pulse"></div>
                    <span className="text-white text-lg font-bold relative z-10">
                        <FaWandMagicSparkles/>
                    </span>
                </div>
                <div className="absolute top-1 right-1 w-1 h-1 bg-white rounded-full opacity-70 animate-ping"></div>
                <div className="absolute bottom-2 left-1 w-1 h-1 bg-white rounded-full opacity-70 animate-ping" style={{animationDelay: '0.5s'}}></div>
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-400 to-blue-300 opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
            </div>
            <div className="relative">
                <h1 className={cn("text-2xl font-extrabold text-white font-chalk tracking-wide drop-shadow-lg", className)}>
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-blue-300">Chalk</span>
                    <span className="text-white ml-1">AI</span>
                </h1>
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-blue-400 group-hover:w-full transition-all duration-500 rounded-full shadow-sm shadow-purple-500/50"></div>
            </div>
        </div>
    )

}