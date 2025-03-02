"use client";
import { useState } from "react";
import Whiteboard from "@/components/whiteboard";
import LandingPage from "@/components/Landingpage";

export default function Home() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <div>
            {isLoggedIn ? (
                <Whiteboard />
            ) : (
                <LandingPage onLogin={() => setIsLoggedIn(true)} />
            )}
        </div>
    );
}
