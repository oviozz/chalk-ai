
"use client";
import { useState } from "react";
import LandingPage from "@/components/Landingpage";

export type TopicType = {
    topicID: string,
    prompt: string
}

export default function Home() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <div>
            <LandingPage onLogin={() => setIsLoggedIn(true)} />
        </div>
    );
}
