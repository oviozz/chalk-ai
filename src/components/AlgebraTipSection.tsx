"use client";

import React, { useState } from 'react';
import { useStarModalStore } from '@/lib/store/useStarModalStore';

export default function AlgebraTipSection() {

    const { open, setIsPending } = useStarModalStore();

    const loadTips = async () => {
        setIsPending(true);
        open(null);

        try {
            await new Promise(resolve => setTimeout(resolve, 9500));

            // Update with actual content
            const newContent = (
                <>
                    <p className="mb-3">Here are your personalized math tips:</p>
                    <h4 className="font-semibold text-purple-200 mt-4 mb-2">Algebra Tips:</h4>
                    <ul className="space-y-2 list-disc pl-5">
                        <li><strong>Simplify first:</strong> Always look for terms you can combine before solving.</li>
                        <li><strong>Check your work:</strong> Substitute your answer back into the original equation.</li>
                        <li><strong>Look for patterns:</strong> Many problems follow similar structures.</li>
                    </ul>
                </>
            );

            open(newContent);
        } catch (error) {
            console.error('Error loading tips:', error);
            open(<p>Sorry, there was an error loading your tips. Please try again.</p>);
        } finally {
            // Turn off loading state
            setIsPending(false);
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Math Learning Dashboard</h1>

            <div className="flex space-x-4 items-center">
                <button
                    onClick={loadTips}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                >
                    Load Math Tips
                </button>
            </div>
        </div>
    );
}