
"use client";
import Whiteboard from "@/components/whiteboard";
import TopicSelector from "@/components/topic-selector";
import {useState} from "react";
import {useQuery} from "@tanstack/react-query";

export type TopicType = {
    topicID: string,
    prompt: string
}


export default function Home() {

    const [showTopicSelector, setShowTopicSelector] = useState(true);
    const [selectedTopic, setSelectedTopic] = useState<TopicType | null>(null);

    const {data: generated_problem, isPending} = useQuery({
        queryKey: ["generate-problem"],
        queryFn: async () => {
            const response = await fetch(`http://localhost:8000/generate-problem?topic=${selectedTopic?.topicID}-${selectedTopic?.prompt}`);
            const data = await response.json();
            return data?.problem;
        },
        enabled: (!!selectedTopic?.topicID && !!selectedTopic.prompt)
    })

    const clearTopic = () => {
        setSelectedTopic(null);
        setShowTopicSelector(true);
    }

    return (
        <div>
            { (!selectedTopic?.topicID || !selectedTopic?.prompt) && (
                <TopicSelector
                    onClose={() => setShowTopicSelector(false)}
                    onSelectTopic={(topicID: string, prompt: string) => setSelectedTopic({
                        topicID, prompt
                    })}
                />
            )}
            <Whiteboard
                clearTopic={clearTopic}
                topic={selectedTopic}
                problem_generated={generated_problem || ""}
                problem_loading={isPending}
            />
        </div>
    );
}
