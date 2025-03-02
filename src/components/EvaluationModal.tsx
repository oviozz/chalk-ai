import type React from "react"
import { CheckCircle, XCircle, AlertTriangle, Book, ArrowRight, X, Award } from "lucide-react"
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeRaw from "rehype-raw";
import rehypeKatex from "rehype-katex";
import ReactMarkdown from "react-markdown";

interface RawEvaluation {
    analysis?: string
    errors?: string | string[]
    improvements?: string | string[]
    concepts_to_review?: string | string[]
}

interface EvaluationData {
    problem: string
    evaluation: RawEvaluation | string
    correct: boolean
    score: number
    submission_time: string
    grade?: string
}

interface EvaluationModalProps {
    evaluation: EvaluationData | null
    isOpen: boolean
    onClose: () => void,
    next_lesson: () => void
}

const EvaluationModal: React.FC<EvaluationModalProps> = ({ evaluation, isOpen, onClose , next_lesson }) => {
    if (!isOpen || !evaluation) return null

    const {
        problem,
        evaluation: raw_evaluation,
        correct,
        score,
        submission_time,
        grade = calculateGrade(score),
    } = evaluation

    // Parse the raw evaluation
    const {
        analysis = "Your work has been evaluated.",
        errors = [],
        improvements = [],
        concepts_to_review = [],
    } = typeof raw_evaluation === "string" ? { analysis: raw_evaluation } : raw_evaluation || {}

    // Format submission time
    const formattedTime = new Date(submission_time).toLocaleString()

    // Get appropriate icon and style for grade
    const getGradeStyle = (grade: string) => {
        switch (grade) {
            case "A":
                return {
                    color: "text-green-400",
                    bg: "bg-green-900/40",
                    icon: <CheckCircle className="h-6 w-6 text-green-400" />,
                }
            case "B":
                return { color: "text-blue-400", bg: "bg-blue-900/40", icon: <CheckCircle className="h-6 w-6 text-blue-400" /> }
            case "C":
                return {
                    color: "text-yellow-400",
                    bg: "bg-yellow-900/40",
                    icon: <AlertTriangle className="h-6 w-6 text-yellow-400" />,
                }
            case "D":
                return {
                    color: "text-orange-400",
                    bg: "bg-orange-900/40",
                    icon: <AlertTriangle className="h-6 w-6 text-orange-400" />,
                }
            default:
                return { color: "text-red-400", bg: "bg-red-900/40", icon: <XCircle className="h-6 w-6 text-red-400" /> }
        }
    }

    const gradeStyle = getGradeStyle(grade)

    return (
        <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 dark"
            onClick={(e) => e.target === e.currentTarget && onClose()}
        >
            <div className="bg-gray-900 rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col animate-in fade-in-0 zoom-in-95 duration-200 border border-gray-800">
                {/* Header */}
                <div className="px-6 py-4 border-b border-gray-800 flex justify-between items-center bg-gradient-to-r from-purple-950/50 to-blue-950/50">
                    <div className="flex items-center gap-2">
                        <Award className="text-purple-400 h-5 w-5" />
                        <h2 className="text-xl font-bold text-gray-100">Evaluation Results</h2>
                    </div>
                    <button onClick={onClose} className="rounded-full p-1 hover:bg-gray-700 transition-colors" aria-label="Close">
                        <X className="h-5 w-5 text-gray-400" />
                    </button>
                </div>

                {/* Content - scrollable area */}
                <div className="p-6 overflow-y-auto bg-gray-900 text-gray-200">
                    {/* Metadata */}
                    <div className="mb-6">
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-gray-400 mb-1">Submitted: {formattedTime}</p>
                            <span
                                className={`text-xs px-3 py-1 rounded-full font-medium ${correct ? "bg-green-900/60 text-green-300" : "bg-orange-900/60 text-orange-300"}`}
                            >
                {correct ? "Correct Solution" : "Needs Improvement"}
              </span>
                        </div>
                        <h3 className="text-lg font-medium text-gray-100 mt-2 border-l-4 border-purple-500 pl-3">
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
                        </h3>
                    </div>

                    {/* Score and Grade Card */}
                    <div className="mb-8 bg-gradient-to-r from-gray-800 to-blue-950 p-4 rounded-lg border border-blue-900 shadow-md">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center">
                                <div className="h-20 w-20 rounded-full bg-blue-700 flex items-center justify-center mr-4 shadow-lg">
                                    <span className="text-3xl font-bold text-white">{score}</span>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-300 uppercase tracking-wide font-medium">Score</p>
                                    <p className="text-sm text-gray-400">out of 10</p>
                                </div>
                            </div>

                            <div className="flex items-center">
                                <div
                                    className={`h-20 w-20 rounded-full flex items-center justify-center mr-4 shadow-lg ${gradeStyle.bg}`}
                                >
                                    <span className={`text-3xl font-bold ${gradeStyle.color}`}>{grade}</span>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-300 uppercase tracking-wide font-medium">Grade</p>
                                    <div className="flex items-center gap-1 mt-1">
                                        {gradeStyle.icon}
                                        <p className="text-sm text-gray-300">{correct ? "Well done!" : "Keep improving"}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Analysis */}
                    <div className="mb-8">
                        <h4 className="font-semibold mb-3 text-gray-200 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-purple-900/60 flex items-center justify-center text-purple-300">
                1
              </span>
                            Analysis
                        </h4>
                        <div className="pl-10">
                            <p className="text-gray-300 leading-relaxed">{analysis}</p>
                        </div>
                    </div>

                    {/* Errors if any */}
                    {errors && (typeof errors === "string" ? errors.length > 0 : errors.length > 0) && (
                        <div className="mb-8">
                            <h4 className="font-semibold mb-3 text-gray-200 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-orange-900/60 flex items-center justify-center text-orange-300">
                  2
                </span>
                                <AlertTriangle size={18} className="mr-1 text-orange-400" />
                                Errors Identified
                            </h4>
                            <div className="bg-orange-950/40 p-4 rounded-lg border border-orange-900/60 ml-10">
                                {typeof errors === "string" ? (
                                    <p className="text-gray-300">{errors}</p>
                                ) : (
                                    <ul className="list-disc list-inside text-gray-300 space-y-2">
                                        {errors.map((error, index) => (
                                            <li key={index} className="leading-relaxed">
                                                {error}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Improvements */}
                    <div className="mb-8">
                        <h4 className="font-semibold mb-3 text-gray-200 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-blue-900/60 flex items-center justify-center text-blue-300">
                3
              </span>
                            Suggestions for Improvement
                        </h4>
                        <div className="pl-10">
                            {typeof improvements === "string" ? (
                                <p className="text-gray-300">{improvements}</p>
                            ) : (
                                <ul className="list-disc list-inside text-gray-300 space-y-2">
                                    {improvements && improvements.length > 0 ? (
                                        improvements.map((item, index) => (
                                            <li key={index} className="leading-relaxed">
                                                {item}
                                            </li>
                                        ))
                                    ) : (
                                        <p className="text-gray-400 italic">No specific improvements suggested.</p>
                                    )}
                                </ul>
                            )}
                        </div>
                    </div>

                    {/* Concepts to review */}
                    <div>
                        <h4 className="font-semibold mb-3 text-gray-200 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-green-900/60 flex items-center justify-center text-green-300">
                4
              </span>
                            <Book size={18} className="mr-1 text-green-400" />
                            Concepts to Review
                        </h4>
                        <div className="pl-10">
                            {typeof concepts_to_review === "string" ? (
                                <p className="text-gray-300">{concepts_to_review}</p>
                            ) : (
                                <div className="flex flex-wrap gap-2">
                                    {concepts_to_review && concepts_to_review.length > 0 ? (
                                        concepts_to_review.map((concept, index) => (
                                            <span
                                                key={index}
                                                className="bg-blue-900/60 text-blue-300 px-3 py-1 rounded-full text-sm font-medium shadow-sm"
                                            >
                        {concept}
                      </span>
                                        ))
                                    ) : (
                                        <p className="text-gray-400 italic">No specific concepts to review.</p>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-gray-800 flex justify-end bg-gray-850">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-700 text-gray-200 rounded-md mr-2 hover:bg-gray-600 transition-colors"
                    >
                        Close
                    </button>
                    <button
                        onClick={() => {
                            onClose();
                            next_lesson();
                        }}
                        className="px-4 py-2 bg-gradient-to-r from-blue-700 to-purple-700 text-white rounded-md flex items-center hover:opacity-90 transition-colors shadow-md">
                        Close Whiteboard <ArrowRight size={16} className="ml-2" />
                    </button>
                </div>
            </div>
        </div>
    )
}

// Helper function to calculate grade from score if not provided
function calculateGrade(score: number): string {
    if (score >= 9) return "A"
    if (score >= 8) return "B"
    if (score >= 7) return "C"
    if (score >= 6) return "D"
    return "F"
}

export default EvaluationModal

