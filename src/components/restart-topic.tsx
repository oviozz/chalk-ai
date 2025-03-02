import {X} from "lucide-react";

type RestartTopicProps = {
    clearTopic: () => void,
    topic: {
        topicID: string
    } | null
}
export default function RestartTopic({topic, clearTopic}: RestartTopicProps){

    return (
        <div className={"absolute bottom-2 left-2 "}>
            <div className={"flex items-center gap-1 text-white font-bold text-2xl"}>
                Current Topic: {topic?.topicID.toUpperCase()}
                <X
                    onClick={clearTopic}
                    className={"text-red-500 w-9 h-9"}
                    strokeWidth={3}
                />
            </div>
        </div>
    )

}