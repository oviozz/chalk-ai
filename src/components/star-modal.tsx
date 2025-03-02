"use client"

import { useRef, useEffect } from "react"
import { X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { FaStar } from "react-icons/fa6"
import { useStarModalStore } from "@/lib/store/useStarModalStore"
import remarkGfm from "remark-gfm"
import remarkMath from "remark-math"
import rehypeRaw from "rehype-raw"
import rehypeKatex from "rehype-katex"
import ReactMarkdown from "react-markdown"

export const StarModal = () => {
    const modalRef = useRef<HTMLDivElement>(null)
    const { isOpen, content, isPending, close, open } = useStarModalStore()

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node) && !isPending) {
                close()
            }
        }

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside)
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [isOpen, close])

    // Close on escape key
    useEffect(() => {
        const handleEscKey = (event: KeyboardEvent) => {
            if (event.key === "Escape" && !isPending) {
                close()
            }
        }

        if (isOpen) {
            document.addEventListener("keydown", handleEscKey)
        }

        return () => {
            document.removeEventListener("keydown", handleEscKey)
        }
    }, [isOpen, close])

    // Default content if none provided
    const defaultContent = <p>Tips and hints will appear here.</p>

    return (
        <>
            {/* The Star Button - Always visible */}
            <button disabled={isPending} onClick={() => open(content || defaultContent)} className="flex items-center gap-4">
                <div className="relative">
                    <div
                        className={`w-11 h-11 bg-gradient-to-br from-purple-600 via-indigo-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-purple-500/20 ${isPending ? "animate-[spin_1s_linear_infinite]" : "animate-[wiggle_3s_ease-in-out_infinite]"} overflow-hidden cursor-pointer hover:brightness-110 transition-all`}
                    >
                        <FaStar
                            className={`w-7 h-7 text-white drop-shadow-md ${isPending ? "animate-[spin_0.7s_linear_infinite]" : "animate-[spin_6s_linear_infinite]"}`}
                            style={{ animationDirection: isPending ? "reverse" : "normal" }}
                        />
                        <div
                            className={`absolute inset-0 rounded-lg bg-purple-500 opacity-20 ${isPending ? "animate-[ping_1s_cubic-bezier(0,0,0.2,1)_infinite]" : "animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite]"}`}
                        ></div>
                    </div>
                    <div
                        className={`absolute -top-1 -right-1 w-2 h-2 bg-yellow-300 rounded-full ${isPending ? "animate-ping" : "animate-ping"}`}
                        style={{ animationDelay: "0.2s", animationDuration: isPending ? "0.6s" : "1.5s" }}
                    ></div>
                    <div
                        className={`absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-blue-300 rounded-full ${isPending ? "animate-ping" : "animate-ping"}`}
                        style={{ animationDelay: "0.5s", animationDuration: isPending ? "0.5s" : "1.5s" }}
                    ></div>
                    <div
                        className={`absolute -top-1 -left-2 w-1.5 h-1.5 bg-purple-300 rounded-full ${isPending ? "animate-ping" : "animate-ping"}`}
                        style={{ animationDelay: "0.8s", animationDuration: isPending ? "0.7s" : "1.5s" }}
                    ></div>
                    <div
                        className={`absolute inset-0 rounded-lg bg-gradient-to-r from-purple-400/40 to-blue-400/40 ${isPending ? "animate-[pulse_0.5s_ease-in-out_infinite]" : "animate-pulse"}`}
                    ></div>
                </div>
            </button>

            {/* The Modal */}
            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-50 flex items-start justify-end pointer-events-none pr-20 pt-20">
                        <motion.div
                            ref={modalRef}
                            initial={{ opacity: 0, x: 100, y: -100 }}
                            animate={{ opacity: 1, x: 0, y: 0 }}
                            exit={{ opacity: 0, x: 100, y: -100 }}
                            transition={{ type: "spring", damping: 20, stiffness: 300 }}
                            className="relative pointer-events-auto w-full max-w-md"
                        >
                            {/* Chat bubble with pointer */}
                            <div className="relative bg-gradient-to-br from-purple-600 to-blue-800 rounded-2xl border-4 border-white p-4 shadow-xl text-white overflow-hidden">
                                {/* Improved pointer to the star */}
                                <div className="absolute -top-3 right-0 w-6 h-6 transform translate-x-16 -translate-y-1">
                                    <div className="w-6 h-6 rotate-3 bg-purple-600 transform -translate-y-3 translate-x-3"></div>
                                </div>

                                {/* Header with title and close button */}
                                <div className="flex justify-between items-center mb-3">
                                    <h3 className="font-bold text-lg">Your Tutor - Chalk AI</h3>
                                    <button
                                        disabled={isPending}
                                        onClick={close}
                                        className="p-1 rounded-full hover:bg-white/20 transition-colors"
                                        aria-label="Close"
                                    >
                                        <X size={18} />
                                    </button>
                                </div>

                                {/* Scrollable content area */}
                                <div className="max-h-[70vh] overflow-y-auto pr-1 custom-scrollbar">
                                    <div className="prose prose-invert max-w-none">
                                        <AnimatePresence mode="wait">
                                            {isPending ? (
                                                <motion.div
                                                    key="skeleton"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    transition={{ duration: 0.2 }}
                                                    className="relative"
                                                >
                                                    {/* Magic circle animation */}
                                                    <div className="absolute inset-0 flex items-center justify-center">
                                                        {/* Particles */}
                                                        <div className="absolute w-full h-full">
                                                            {[...Array(8)].map((_, i) => (
                                                                <div
                                                                    key={i}
                                                                    className="absolute w-1.5 h-1.5 bg-white rounded-full"
                                                                    style={{
                                                                        top: `${50 + 40 * Math.sin((Math.PI * 2 * i) / 8)}%`,
                                                                        left: `${50 + 40 * Math.cos((Math.PI * 2 * i) / 8)}%`,
                                                                        animationDelay: `${i * 0.1}s`,
                                                                        animation: "ping 1.5s cubic-bezier(0,0,0.2,1) infinite",
                                                                    }}
                                                                ></div>
                                                            ))}
                                                        </div>
                                                    </div>

                                                    {/* Text placeholder with magical effect */}
                                                    <div className="space-y-3 pt-4">
                                                        <div className="h-4 bg-gradient-to-r from-white/10 via-white/30 to-white/10 rounded animate-pulse w-3/4"></div>
                                                        <div
                                                            className="h-4 bg-gradient-to-r from-white/10 via-white/30 to-white/10 rounded animate-pulse"
                                                            style={{ animationDelay: "0.2s" }}
                                                        ></div>
                                                        <div
                                                            className="h-4 bg-gradient-to-r from-white/10 via-white/30 to-white/10 rounded animate-pulse w-5/6"
                                                            style={{ animationDelay: "0.4s" }}
                                                        ></div>
                                                        <div
                                                            className="h-4 bg-gradient-to-r from-white/10 via-white/30 to-white/10 rounded animate-pulse w-2/6"
                                                            style={{ animationDelay: "0.4s" }}
                                                        ></div>
                                                        <div
                                                            className="h-4 bg-gradient-to-r from-white/10 via-white/30 to-white/10 rounded animate-pulse w-5/9"
                                                            style={{ animationDelay: "0.4s" }}
                                                        ></div>
                                                        <div
                                                            className="h-4 bg-gradient-to-r from-white/10 via-white/30 to-white/10 rounded animate-pulse w-5/6"
                                                            style={{ animationDelay: "0.4s" }}
                                                        ></div>

                                                        <div className="flex justify-center my-3">
                                                            <div className="text-base text-white/70 animate-pulse">Summoning knowledge...</div>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            ) : (
                                                <motion.div
                                                    key="content"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    transition={{ duration: 0.2 }}
                                                >
                                                    <ReactMarkdown
                                                        remarkPlugins={[remarkGfm, remarkMath]}
                                                        rehypePlugins={[rehypeRaw, rehypeKatex]}
                                                        components={{
                                                            // Customize how different markdown elements are rendered
                                                            h1: ({ node, ...props }) => (
                                                                <h1 className="text-xl font-bold my-3 text-amber-200" {...props} />
                                                            ),
                                                            h2: ({ node, ...props }) => (
                                                                <h2 className="text-lg font-bold my-2 text-amber-200" {...props} />
                                                            ),
                                                            h3: ({ node, ...props }) => (
                                                                <h3 className="text-md font-bold my-2 text-amber-200" {...props} />
                                                            ),
                                                            p: ({ node, ...props }) => <p className="my-2" {...props} />,
                                                            ul: ({ node, ...props }) => <ul className="list-disc pl-5 my-2" {...props} />,
                                                            ol: ({ node, ...props }) => <ol className="list-decimal pl-5 my-2" {...props} />,
                                                            li: ({ node, ...props }) => <li className="my-1" {...props} />,
                                                            a: ({ node, ...props }) => (
                                                                <a className="text-amber-300 underline hover:text-amber-200" {...props} />
                                                            ),
                                                            blockquote: ({ node, ...props }) => (
                                                                <blockquote className="border-l-4 border-amber-700 pl-4 italic my-2" {...props} />
                                                            ),
                                                            code: ({ node, inline, ...props }) =>
                                                                inline ? (
                                                                    <code className="bg-amber-900/30 px-1 rounded text-amber-200" {...props} />
                                                                ) : (
                                                                    <code
                                                                        className="block bg-amber-900/30 p-2 rounded my-2 text-amber-200 overflow-x-auto"
                                                                        {...props}
                                                                    />
                                                                ),
                                                            pre: ({ node, ...props }) => (
                                                                <pre className="bg-amber-900/30 p-2 rounded my-2 overflow-x-auto" {...props} />
                                                            ),
                                                            hr: ({ node, ...props }) => <hr className="border-amber-800/50 my-4" {...props} />,
                                                            table: ({ node, ...props }) => (
                                                                <table className="border-collapse w-full my-3" {...props} />
                                                            ),
                                                            th: ({ node, ...props }) => (
                                                                <th className="border border-amber-800 px-2 py-1 bg-amber-900/30" {...props} />
                                                            ),
                                                            td: ({ node, ...props }) => (
                                                                <td className="border border-amber-800 px-2 py-1" {...props} />
                                                            ),
                                                        }}
                                                    >
                                                        {typeof content === "string" ? content : JSON.stringify(content)}
                                                    </ReactMarkdown>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>

                                {/* Visual elements for a chat bubble feel */}
                                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                                <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full blur-xl -mr-10 -mt-10"></div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    )
}

export default StarModal

