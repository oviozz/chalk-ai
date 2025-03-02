"use client";
import { useState } from "react";
import Whiteboard from "@/components/whiteboard";
import LandingPage from "@/components/Landingpage";
import TopicSelector from "@/components/topic-selector";

export type TopicType = {
    topicID: string,
    prompt: string
}

export default function Home() {
    // Authentication state
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    
    // Topic selection state
    const [showTopicSelector, setShowTopicSelector] = useState(true);
    const [selectedTopic, setSelectedTopic] = useState<TopicType | null>(null);

    const clearTopic = () => {
        setSelectedTopic(null);
        setShowTopicSelector(true);
    }

    const markdownText = ``

    return (
        <div>
            {!isLoggedIn ? (
                <LandingPage onLogin={() => setIsLoggedIn(true)} />
            ) : (
                <>
                    {(!selectedTopic?.topicID || !selectedTopic?.prompt) && (
                        <TopicSelector
                            onClose={() => setShowTopicSelector(false)}
                            onSelectTopic={(topicID: string, prompt: string) => setSelectedTopic({
                                topicID,
                                prompt
                            })}
                        />
                    )}
                    <Whiteboard
                        clearTopic={clearTopic}
                        topic={selectedTopic}
                        problem_generated={markdownText}
                    />
                </>
            )}
        </div>
    );
}
