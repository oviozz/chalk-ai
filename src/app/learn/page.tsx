
"use client";
import Whiteboard from "@/components/whiteboard";
import TopicSelector from "@/components/topic-selector";
import {useState} from "react";

export type TopicType = {
    topicID: string,
    prompt: string
}

export default function Home() {

    const [showTopicSelector, setShowTopicSelector] = useState(true);
    const [selectedTopic, setSelectedTopic] = useState<TopicType | null>(null);

    const clearTopic = () => {
        setSelectedTopic(null);
        setShowTopicSelector(true);
    }

    const markdownText = ``



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
                problem_generated={markdownText}
            />
        </div>
    );
}
