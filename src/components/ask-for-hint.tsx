"use client"

import { Lightbulb } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useStarModalStore } from "@/lib/store/useStarModalStore"
import { useMutation } from "@tanstack/react-query"
import { cn } from "@/lib/utils"
import useScreenshot from "@/hooks/useScreenshot";

export default function AskForHint({ problem }: { problem: string }) {

    const { open, setIsPending, isPending } = useStarModalStore()
    const { screenshotBlog } = useScreenshot();

    const { mutate } = useMutation({
        mutationFn: async () => {
            setIsPending(true)
            try {
                open(null)

                const formData = new FormData()
                const screenshotBlob = await screenshotBlog()
                formData.append("file", screenshotBlob, "screenshot.png")

                formData.append("problem", problem)

                const response = await fetch(`http://localhost:8000/give-hint`, {
                    method: "POST",
                    body: formData,
                })

                if (!response.ok) throw new Error("Request failed")

                const result = await response.json()
                open(result.hint)
            } catch (error) {
                open(String(error))
                throw error
            }
        },
        onSettled: () => setIsPending(false),
    })

    return (
        <Button
            onClick={() => mutate()}
            disabled={!problem.trim() || isPending}
            size={"lg"}
            className={cn(
                "px-4 py-2 bg-gray-800/90 backdrop-blur-sm rounded-full text-white text-base font-chalk hover:bg-gray-700 transition-all flex items-center gap-2 shadow-lg hover:shadow-purple-500/20",
                isPending && "animate-pulse",
            )}
        >
            <Lightbulb className="w-4 h-4" />
            Ask for Hint
        </Button>
    )
}

