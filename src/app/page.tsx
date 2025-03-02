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

    const markdownText = `
Consider the function $ f(x) = \\frac{x^2 - 4}{x - 2} $.

1. Determine the limit $ \\lim_{x \\to 2} f(x) $.
2. Is the function $ f(x) $ continuous at $ x = 2 $? Justify your answer.

Now, if we define a new function $ g(x) $ such that:

$$
g(x) =
\\begin{cases} 
f(x) & \\text{if } x \\neq 2 \\\\ 
k & \\text{if } x = 2 
\\end{cases}
$$

where $ k $ is a constant.

3. For what value of $ k $ will $ g(x) $ be continuous at $ x = 2 $?
`;



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
