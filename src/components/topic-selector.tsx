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
                <BrandLogo className={"text-4xl"}/>
                <div className="relative w-full max-w-3xl overflow-hidden rounded-xl border border-gray-800 bg-gray-900 shadow-2xl">
                    {/* Close button */}

                    {/* Header */}
                    <div className="border-b border-gray-800 p-6">
                        <div className="flex items-center gap-3">
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

