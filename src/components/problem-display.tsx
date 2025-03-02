
"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { ChevronDown, ChevronUp, BookOpen, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeRaw from "rehype-raw"
import remarkMath from "remark-math"
import rehypeKatex from "rehype-katex"
import "katex/dist/katex.min.css"

type ProblemDisplayProps = {
    problem: string
}

export default function ProblemDisplay({ problem }: ProblemDisplayProps) {

    const [expanded, setExpanded] = useState(false)
    const [isOverflowing, setIsOverflowing] = useState(false)
    const contentRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        // Check if content overflows the collapsed container
        if (contentRef.current) {
            setIsOverflowing(contentRef.current.scrollHeight > 60)
        }
    }, [])

    const toggleExpanded = () => {
        setExpanded(!expanded)
    }

    // Handle click on collapse button
    const handleCollapseClick = (e: React.MouseEvent) => {
        e.stopPropagation()
        setExpanded(false)
    }

    return (
        <motion.div
            className="absolute -top-0.5 left-0 right-0 z-20 max-w-2xl mx-auto rounded-xl origin-top"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
        >
            <div
                className={`
                  w-full cursor-pointer transition-all duration-300
                  overflow-hidden
                  bg-amber-950
                  backdrop-blur-md rounded-b-xl shadow-amber-900/30
                  border-b-2 border-amber-800/50
                `}
                onClick={toggleExpanded}
            >
                {/* Tab handle at bottom */}
                <div className="absolute -bottom-0 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="bg-amber-900 rounded-t-lg px-3 py-1 shadow-md flex items-center gap-2 border-x border-b border-amber-800/50">
                        <BookOpen className="w-4 h-4 text-amber-300" />
                        <span className="text-amber-200 text-xs font-bold">Problem</span>
                        {expanded ? (
                            <ChevronUp className="w-4 h-4 text-amber-400" />
                        ) : (
                            <ChevronDown className="w-4 h-4 text-amber-400" />
                        )}
                    </div>
                </div>

                {/* Header with dotted texture */}
                <div className="h-4 w-full bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAIklEQVQIW2NkQAKrVq36zwjjgzhhYWGMYAEYB8RmROaABADeOQ8CXl/xfgAAAABJRU5ErkJggg==')] opacity-20"></div>

                <h2 className="text-amber-100 text-center font-bold text-xl">Generated Problem Statement</h2>

                <AnimatePresence initial={false}>
                    <motion.div
                        key={expanded ? "expanded" : "collapsed"}
                        initial={{ height: expanded ? 0 : "auto" }}
                        animate={{
                            height: expanded ? "auto" : isOverflowing ? "60px" : "auto",
                        }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="relative"
                    >
                        <div className="absolute top-2 right-2 z-10">
                            {expanded && (
                                <motion.button
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="h-6 w-6 rounded-full bg-amber-800/50 flex items-center justify-center hover:bg-amber-700 transition-colors"
                                    onClick={handleCollapseClick}
                                >
                                    <X className="w-4 h-4 text-amber-200" />
                                </motion.button>
                            )}
                        </div>

                        <div
                            ref={contentRef}
                            className={`
                                px-5 pb-5 pt-3 text-amber-100
                                ${expanded ? "max-h-[500px] overflow-y-auto" : "max-h-[60px] overflow-hidden"}
                                scrollbar-thin scrollbar-thumb-amber-700 scrollbar-track-amber-900/30
                                markdown-content
                              `}
                            style={{
                                fontFamily: "'Kalam', cursive",
                                fontSize: "17px",
                                lineHeight: "1.5",
                            }}
                        >
                            <ReactMarkdown
                                remarkPlugins={[remarkGfm, remarkMath]}
                                rehypePlugins={[rehypeRaw, rehypeKatex]}
                                components={{
                                    // Customize how different markdown elements are rendered
                                    h1: ({ node, ...props }) => <h1 className="text-xl font-bold my-3 text-amber-200" {...props} />,
                                    h2: ({ node, ...props }) => <h2 className="text-lg font-bold my-2 text-amber-200" {...props} />,
                                    h3: ({ node, ...props }) => <h3 className="text-md font-bold my-2 text-amber-200" {...props} />,
                                    p: ({ node, ...props }) => <p className="my-2" {...props} />,
                                    ul: ({ node, ...props }) => <ul className="list-disc pl-5 my-2" {...props} />,
                                    ol: ({ node, ...props }) => <ol className="list-decimal pl-5 my-2" {...props} />,
                                    li: ({ node, ...props }) => <li className="my-1" {...props} />,
                                    a: ({ node, ...props }) => <a className="text-amber-300 underline hover:text-amber-200" {...props} />,
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
                                    table: ({ node, ...props }) => <table className="border-collapse w-full my-3" {...props} />,
                                    th: ({ node, ...props }) => (
                                        <th className="border border-amber-800 px-2 py-1 bg-amber-900/30" {...props} />
                                    ),
                                    td: ({ node, ...props }) => <td className="border border-amber-800 px-2 py-1" {...props} />,
                                }}
                            >
                                {problem}
                            </ReactMarkdown>
                        </div>

                        {/* Gradient overlay for collapsed state */}
                        {!expanded && isOverflowing && (
                            <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-amber-950/90 to-transparent pointer-events-none"></div>
                        )}
                    </motion.div>
                </AnimatePresence>

                {/* Bottom decorative line */}
                <div className="h-1 w-full bg-gradient-to-r from-amber-900/0 via-amber-700/30 to-amber-900/0"></div>
            </div>
        </motion.div>
    )
}

