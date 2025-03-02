"use client"

import type React from "react"

import { useState } from "react"
import { X, ArrowRight, PenSquare, Calculator, Atom, Globe, School, Plus, ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import BrandLogo from "@/components/brand-logo";

type TopicSelectorProps = {
    onClose: () => void
    onSelectTopic: (category: string, topic: string) => void
}

type Category = {
    id: string
    name: string
    icon: React.ReactNode
    topics: string[]
    color: string
}

export default function TopicSelector({ onClose, onSelectTopic }: TopicSelectorProps) {
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
    const [customPrompt, setCustomPrompt] = useState("")
    const [isHovering, setIsHovering] = useState<string | null>(null)

    const categories: Category[] = [
        {
            id: "math",
            name: "Mathematics",
            icon: <Calculator className="h-5 w-5" />,
            color: "from-blue-600 to-blue-400",
            topics: ["Algebra", "Geometry", "Calculus", "Statistics", "Trigonometry", "Number Theory"],
        },
        {
            id: "science",
            name: "Science",
            icon: <Atom className="h-5 w-5" />,
            color: "from-emerald-600 to-emerald-400",
            topics: ["Chemistry", "Physics", "Biology", "Astronomy", "Earth Science", "Environmental Science"],
        },
        {
            id: "social",
            name: "Social Studies",
            icon: <Globe className="h-5 w-5" />,
            color: "from-amber-600 to-amber-400",
            topics: ["History", "Geography", "Economics", "Civics", "World Cultures", "Political Science"],
        },
        {
            id: "language",
            name: "Language Arts",
            icon: <PenSquare className="h-5 w-5" />,
            color: "from-purple-600 to-purple-400",
            topics: ["Grammar", "Vocabulary", "Reading Comprehension", "Writing", "Literature", "Poetry"],
        },
    ]

    const handleSelectTopic = (topic: string) => {
        if (!selectedCategory || !topic) return
        onSelectTopic(selectedCategory.id, topic)
        onClose()
    }

    const handleSubmitCustom = () => {
        if (customPrompt.trim()) {
            onSelectTopic("custom", customPrompt)
            onClose()
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
            <div className={"flex flex-col items-center gap-4"}>
                <BrandLogo className={"text-3xl"}/>
                <div className="relative w-full max-w-3xl overflow-hidden rounded-xl border border-gray-800 bg-gray-900 shadow-2xl">
                    {/* Close button */}
                    <button
                        onClick={onClose}
                        className="absolute right-4 top-4 rounded-full p-1.5 text-gray-400 transition-colors hover:bg-gray-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                        aria-label="Close"
                    >
                        <X className="h-5 w-5" />
                    </button>

                    {/* Header */}
                    <div className="border-b border-gray-800 p-6">
                        <div className="flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 shadow-lg">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="h-6 w-6 text-white"
                                >
                                    <path d="M11.7 2.805a.75.75 0 0 1 .6 0A60.65 60.65 0 0 1 22.83 8.72a.75.75 0 0 1-.231 1.337 49.948 49.948 0 0 0-9.902 3.912l-.003.002c-.114.06-.227.119-.34.18a.75.75 0 0 1-.707 0A50.88 50.88 0 0 0 7.5 12.173v-.224c0-.131.067-.248.172-.311a54.615 54.615 0 0 1 4.653-2.52.75.75 0 0 0-.65-1.352 56.123 56.123 0 0 0-4.78 2.589 1.858 1.858 0 0 0-.859 1.228 49.803 49.803 0 0 0-4.634-1.527.75.75 0 0 1-.231-1.337A60.653 60.653 0 0 1 11.7 2.805Z" />
                                    <path d="M13.06 15.473a48.45 48.45 0 0 1 7.666-3.282c.134 1.414.22 2.843.255 4.284a.75.75 0 0 1-.46.71 47.87 47.87 0 0 0-8.105 4.342.75.75 0 0 1-.832 0 47.87 47.87 0 0 0-8.104-4.342.75.75 0 0 1-.461-.71c.035-1.442.121-2.87.255-4.286.921.304 1.83.634 2.726.99v1.27a1.5 1.5 0 0 0-.14 2.508c-.09.38-.222.753-.397 1.11.452.213.901.434 1.346.661a6.727 6.727 0 0 0 .551-1.607 1.5 1.5 0 0 0 .14-2.67v-.645a48.549 48.549 0 0 1 3.44 1.667 2.25 2.25 0 0 0 2.12 0Z" />
                                    <path d="M4.462 19.462c.42-.419.753-.89 1-1.395.453.214.902.435 1.347.662a6.742 6.742 0 0 1-1.286 1.794.75.75 0 0 1-1.06-1.06Z" />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-bold text-white">What would you like to practice?</h2>
                        </div>
                    </div>

                    <div className="p-6">
                        {!selectedCategory ? (
                            /* Category Selection */
                            <div className="space-y-6">
                                <p className="text-gray-300">Select a subject area or create your own practice problem:</p>

                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    {categories.map((category) => (
                                        <button
                                            key={category.id}
                                            className={cn(
                                                "group flex items-start gap-4 rounded-xl border border-gray-700 bg-gray-800/50 p-4 text-left transition-all hover:border-gray-600 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500",
                                                isHovering === category.id && "border-gray-600 bg-gray-800",
                                            )}
                                            onClick={() => setSelectedCategory(category)}
                                            onMouseEnter={() => setIsHovering(category.id)}
                                            onMouseLeave={() => setIsHovering(null)}
                                        >
                                            <div
                                                className={cn(
                                                    "flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br shadow-lg",
                                                    category.color,
                                                )}
                                            >
                                                {category.icon}
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-bold text-white">{category.name}</h3>
                                                <p className="mt-1 text-sm text-gray-400">
                                                    {category.topics.slice(0, 3).join(", ")}
                                                    <span className="text-gray-500"> & more</span>
                                                </p>
                                                <div
                                                    className={cn(
                                                        "mt-2 flex items-center gap-1 text-sm font-medium text-purple-400 opacity-0 transition-opacity",
                                                        isHovering === category.id && "opacity-100",
                                                    )}
                                                >
                                                    <span>Browse topics</span>
                                                    <ArrowRight className="h-3.5 w-3.5" />
                                                </div>
                                            </div>
                                        </button>
                                    ))}

                                    <div className="md:col-span-2">
                                        <div className="rounded-xl border-2 border-dashed border-gray-700 bg-gray-800/30 p-4">
                                            <div className="mb-4 flex items-center gap-3">
                                                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 shadow-lg">
                                                    <Plus className="h-5 w-5 text-white" strokeWidth={3} />
                                                </div>
                                                <h3 className="text-xl font-bold text-white">Create Your Own Practice Problem</h3>
                                            </div>

                                            <Textarea
                                                value={customPrompt}
                                                onChange={(e) => setCustomPrompt(e.target.value)}
                                                placeholder="Describe the problem or concept you want to practice..."
                                                className="min-h-[100px] w-full resize-none rounded-lg border border-gray-700 bg-gray-800 p-3 text-white placeholder:text-gray-500 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                                            />

                                            <div className="mt-4 flex justify-end">
                                                <Button
                                                    onClick={handleSubmitCustom}
                                                    disabled={!customPrompt.trim()}
                                                    className="gap-2 bg-gradient-to-br from-purple-600 to-blue-600 text-white transition-opacity hover:opacity-90 disabled:opacity-50"
                                                >
                                                    Create problem
                                                    <ArrowRight className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            /* Topic Selection */
                            <div>
                                <div className="mb-6 flex items-center gap-3">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => setSelectedCategory(null)}
                                        className="flex items-center gap-1 text-gray-400 hover:bg-gray-800 hover:text-white"
                                    >
                                        <ChevronLeft className="h-4 w-4" />
                                        <span>Back</span>
                                    </Button>
                                    <div className="h-6 w-px bg-gray-700"></div>
                                    <div className="flex items-center gap-2">
                                        <div
                                            className={cn(
                                                "flex h-6 w-6 items-center justify-center rounded-lg bg-gradient-to-br",
                                                selectedCategory.color,
                                            )}
                                        >
                                            {selectedCategory.icon}
                                        </div>
                                        <h3 className="text-lg font-bold text-white">{selectedCategory.name}</h3>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
                                    {selectedCategory.topics.map((topic) => (
                                        <button
                                            key={topic}
                                            className="flex items-center gap-3 rounded-xl border border-gray-700 bg-gray-800/50 p-4 text-left transition-all hover:border-gray-600 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                            onClick={() => handleSelectTopic(topic)}
                                        >
                                            <div
                                                className={cn(
                                                    "flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br opacity-80",
                                                    selectedCategory.color,
                                                )}
                                            >
                                                <School className="h-5 w-5 text-white" />
                                            </div>
                                            <span className="font-medium text-white">{topic}</span>
                                        </button>
                                    ))}

                                    <button
                                        className="flex items-center gap-3 rounded-xl border border-dashed border-gray-700 bg-gray-800/30 p-4 text-left transition-all hover:border-gray-600 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        onClick={() => {
                                            setSelectedCategory(null)
                                            setTimeout(() => {
                                                const textarea = document.querySelector("textarea")
                                                if (textarea) textarea.focus()
                                            }, 100)
                                        }}
                                    >
                                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-blue-600 opacity-80">
                                            <Plus className="h-5 w-5 text-white" />
                                        </div>
                                        <span className="font-medium text-gray-300">Create custom</span>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

