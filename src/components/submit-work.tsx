
"use client";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import EvaluationModal from "./EvaluationModal";
import useScreenshot from "@/hooks/useScreenshot";

type SubmitWorkProps = {
    clear_topic: () => void,
    problem: string
}
export default function SubmitWork({ problem, clear_topic }: SubmitWorkProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [evaluation, setEvaluation] = useState(null);
    const { screenshotBlog } = useScreenshot();

    const { mutate, isPending } = useMutation({
        mutationFn: async () => {
            try {
                // Capture screenshot of the work
                const blob = await screenshotBlog();

                // Create form data
                const formData = new FormData();
                formData.append("file", blob, "screenshot.png");
                formData.append("problem", problem);

                // Send to backend
                const response = await fetch(`http://localhost:8000/submit-work`, {
                    method: "POST",
                    body: formData,
                });

                if (!response.ok) {
                    throw new Error("Failed to submit work for evaluation");
                }

                // Get the evaluation results
                const result = await response.json();

                // Set the evaluation data and open modal
                setEvaluation(result);
                setIsModalOpen(true);
                return result;
            } catch (error) {
                console.error("Error submitting work:", error);
                throw error;
            }
        }
    });

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <div className="flex items-center justify-center">
                <Button
                    onClick={() => mutate()}
                    disabled={!problem.trim() || isPending}
                    size="lg"
                    className={cn(
                        "px-6 py-3 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full text-white text-base font-medium hover:opacity-90 transition-all flex items-center gap-2 shadow-lg shadow-purple-500/30",
                        isPending && "opacity-80"
                    )}
                >
                    {isPending ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Evaluating...
                        </>
                    ) : (
                        <>
                            <Send className="w-5 h-5" />
                            Submit Work
                        </>
                    )}
                </Button>
            </div>

            {/* Overlay loading indicator for screenshot capture */}
            {isPending && (
                <div className="fixed inset-0 flex items-center justify-center z-40 backdrop-blur-sm">
                    <div className="bg-purple-500 border-4 border-gray-100 font-bold text-white p-8 rounded-xl flex flex-col items-center">
                        <Loader2 className="h-10 w-10 animate-spin mb-4" />
                        <h3 className="text-xl font-extrabold">Evaluating your work...</h3>
                        <p className="mt-2 text-center">
                            We're analyzing your solution and preparing feedback.
                        </p>
                    </div>
                </div>
            )}

            <EvaluationModal
                next_lesson={clear_topic}
                evaluation={evaluation}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
            />
        </>
    );
}