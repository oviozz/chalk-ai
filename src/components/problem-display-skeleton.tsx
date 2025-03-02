
"use client"

import { motion } from "framer-motion"
import { BookOpen } from "lucide-react"

export default function ProblemDisplaySkeleton() {
    return (
        <motion.div
            className="absolute -top-0.5 left-0 right-0 z-20 max-w-2xl mx-auto rounded-xl origin-top"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
        >
            <div
                className={`
          w-full transition-all duration-300
          overflow-hidden
          bg-amber-950
          backdrop-blur-md rounded-b-xl shadow-amber-900/30
          border-b-2 border-amber-800/50
        `}
            >
                {/* Tab handle at bottom */}
                <div className="absolute -bottom-0 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="bg-amber-900 rounded-t-lg px-3 py-1 shadow-md flex items-center gap-2 border-x border-b border-amber-800/50">
                        <BookOpen className="w-4 h-4 text-amber-300" />
                        <span className="text-amber-200 text-xs font-bold">Problem</span>
                        <div className="w-4 h-4 bg-amber-400/30 rounded-sm animate-pulse"></div>
                    </div>
                </div>

                {/* Header with dotted texture */}
                <div className="h-4 w-full bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAIklEQVQIW2NkQAKrVq36zwjjgzhhYWGMYAEYB8RmROaABADeOQ8CXl/xfgAAAABJRU5ErkJggg==')] opacity-20"></div>

                <h2 className="text-amber-100 text-center font-bold text-xl flex items-center justify-center gap-2">
                    <span>Generating Problem</span>
                    <div className="flex gap-1">
                        <span className="animate-bounce inline-block w-2 h-2 bg-amber-300 rounded-full" style={{ animationDelay: "0ms" }}></span>
                        <span className="animate-bounce inline-block w-2 h-2 bg-amber-300 rounded-full" style={{ animationDelay: "150ms" }}></span>
                        <span className="animate-bounce inline-block w-2 h-2 bg-amber-300 rounded-full" style={{ animationDelay: "300ms" }}></span>
                    </div>
                </h2>

                <div className="px-5 pb-5 pt-3">
                    <div className="flex flex-col gap-3" style={{ fontFamily: "'Kalam', cursive" }}>
                        {/* Skeleton paragraph lines */}
                        <div className="h-4 bg-amber-900/50 rounded-md w-full animate-pulse"></div>
                        <div className="h-4 bg-amber-900/50 rounded-md w-11/12 animate-pulse"></div>
                        <div className="h-4 bg-amber-900/50 rounded-md w-full animate-pulse"></div>
                        <div className="h-4 bg-amber-900/50 rounded-md w-10/12 animate-pulse"></div>

                        {/* Skeleton list item */}
                        <div className="flex gap-2 items-center ml-3">
                            <div className="h-3 w-3 rounded-full bg-amber-900/70 animate-pulse"></div>
                            <div className="h-4 bg-amber-900/50 rounded-md w-9/12 animate-pulse"></div>
                        </div>

                        {/* More paragraph lines */}
                        <div className="h-4 bg-amber-900/50 rounded-md w-full animate-pulse"></div>
                        <div className="h-4 bg-amber-900/50 rounded-md w-10/12 animate-pulse"></div>
                    </div>
                </div>

                {/* Gradient overlay */}
                <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-amber-950/90 to-transparent pointer-events-none"></div>

                {/* Bottom decorative line */}
                <div className="h-1 w-full bg-gradient-to-r from-amber-900/0 via-amber-700/30 to-amber-900/0"></div>
            </div>
        </motion.div>
    )
}