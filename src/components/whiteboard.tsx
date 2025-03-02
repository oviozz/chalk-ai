// Whiteboard.tsx
"use client";

import {useEffect, useCallback, useRef} from 'react';
import {Undo2, Redo2, Eraser, Sparkles, Send} from 'lucide-react';
import useWhiteboard from "@/hooks/useWhiteboard";
import {FaPenFancy} from "react-icons/fa";
import {FiImage} from "react-icons/fi";
import {Button} from "@/components/ui/button";
import {StarModal} from "@/components/star-modal";
import BrandLogo from "@/components/brand-logo";
import {TopicType} from "@/app/page";
import ProblemDisplay from "@/components/problem-display";
import ProblemDisplaySkeleton from "@/components/problem-display-skeleton";
import AskForHint from "@/components/ask-for-hint";
import RestartTopic from "@/components/restart-topic";
import CheckWork from "@/components/check-work";
import SubmitWork from "@/components/submit-work";

type WhiteboardProps = {
    topic: TopicType | null,
    clearTopic: () => void,
    problem_generated: string,
    problem_loading: boolean,
}
export default function Whiteboard({topic, clearTopic, problem_generated, problem_loading}: WhiteboardProps) {
    const {
        canvasRef,
        selectedTool,
        setSelectedTool,
        color,
        setColor,
        strokeWidth,
        setStrokeWidth,
        undo,
        redo,
        clearCanvas,
        handleMouseDown,
        handleMouseMove,
        handleMouseUp,
        historyIndex,
        history,
        addImage,
        handleImageMouseDown,
        images,
        selectedImageId,
        setSelectedImageId,
    } = useWhiteboard();

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleResize = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }, []);

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const handlePaste = (e: ClipboardEvent) => {
            const items = e.clipboardData?.items;
            if (!items) return;

            for (const item of items) {
                if (item.type.indexOf('image') === 0) {
                    const blob = item.getAsFile();
                    if (blob) {
                        const reader = new FileReader();
                        reader.onload = (e) => {
                            if (e.target?.result) {
                                addImage(e.target.result as string);
                            }
                        };
                        reader.readAsDataURL(blob);
                    }
                }
            }
        };

        window.addEventListener('paste', handlePaste);
        return () => window.removeEventListener('paste', handlePaste);
    }, [addImage]);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                if (e.target?.result) {
                    addImage(e.target.result as string);
                }
            };
            reader.readAsDataURL(file);
        }
    };


    return (
        <div className="relative h-screen w-screen bg-amber-950 p-4">
            <div
                className="absolute inset-0 m-4 bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAIklEQVQIW2NkQAKrVq36zwjjgzhhYWGMYAEYB8RmROaABADeOQ8CXl/xfgAAAABJRU5ErkJggg==')] rounded-lg p-2">
                <div className="relative h-full w-full bg-gray-900 rounded-lg border-2 border-gray-800 shadow-2xl">
                    {/* Header */}
                    <div className="absolute top-0 left-0 right-0 flex justify-between items-center p-4">
                        <BrandLogo/>
                        <StarModal/>
                    </div>

                    {problem_loading || !problem_generated ? <ProblemDisplaySkeleton/> :
                        <ProblemDisplay problem={problem_generated}/>}

                    {/* AI Buttons */}
                    <div className="absolute bottom-4 right-4 flex flex-col gap-3">
                        <AskForHint problem={problem_generated}/>
                        <CheckWork problem={problem_generated} />
                        <SubmitWork problem={problem_generated} clear_topic={clearTopic} />
                    </div>

                    {/* Left Toolbar */}
                    <div
                        className="absolute left-4 top-1/2 -translate-y-1/2 flex flex-col gap-3 bg-gray-800/90 backdrop-blur-sm p-2.5 rounded-xl shadow-xl">
                        <div className="flex flex-col gap-3 items-center">
                            <input
                                type="color"
                                value={color}
                                onChange={e => setColor(e.target.value)}
                                className="w-7 h-7 rounded-lg cursor-pointer border-2 border-gray-600 bg-gray-700 hover:border-purple-500 transition-colors"
                                aria-label="Select color"
                            />
                            <div className="relative w-24">
                                <input
                                    type="range"
                                    min="1"
                                    max="20"
                                    value={strokeWidth}
                                    onChange={e => setStrokeWidth(Number(e.target.value))}
                                    className="w-full slider-thumb-purple"
                                />
                                <span
                                    className="absolute -bottom-3 left-1/2 -translate-x-1/2 text-xs text-white font-chalk">
                                    {strokeWidth}px
                                </span>
                            </div>
                        </div>

                        <div className="h-px bg-gray-600 my-1"/>

                        <div className="flex flex-col gap-2">
                            <button
                                onClick={() => setSelectedTool('pen')}
                                className={`p-2 rounded-lg transition-all flex items-center justify-center ${
                                    selectedTool === 'pen'
                                        ? 'bg-purple-500/20 text-purple-400 shadow-inner shadow-purple-500/30'
                                        : 'text-white hover:bg-gray-700/50 hover:text-purple-300'
                                }`}
                            >
                                <FaPenFancy className="w-5 h-5"/>
                            </button>
                            <button
                                onClick={() => {
                                    setSelectedTool('image');
                                    fileInputRef.current?.click();
                                }}
                                className={`p-2 rounded-lg transition-all flex items-center justify-center ${
                                    selectedTool === 'image'
                                        ? 'bg-blue-500/20 text-blue-400 shadow-inner shadow-blue-500/30'
                                        : 'text-white hover:bg-gray-700/50 hover:text-blue-300'
                                }`}
                            >
                                <FiImage className="w-5 h-5"/>
                            </button>
                        </div>

                        <div className="h-px bg-gray-600 my-1"/>

                        <div className="flex flex-col gap-2">
                            <button
                                onClick={undo}
                                disabled={historyIndex === 0}
                                className="p-2 rounded-lg hover:bg-gray-700/50 disabled:opacity-30 transition-all text-white flex items-center justify-center"
                            >
                                <Undo2 className="w-5 h-5" strokeWidth={3}/>
                            </button>
                            <button
                                onClick={redo}
                                disabled={historyIndex === history.length - 1}
                                className="p-2 rounded-lg hover:bg-gray-700/50 disabled:opacity-30 transition-all text-white flex items-center justify-center"
                            >
                                <Redo2 className="w-5 h-5" strokeWidth={3}/>
                            </button>
                            <button
                                onClick={clearCanvas}
                                className="p-2 rounded-lg hover:bg-gray-700/50 text-red-400 transition-all flex items-center justify-center"
                            >
                                <Eraser className="w-5 h-5" strokeWidth={3}/>
                            </button>
                        </div>
                    </div>

                    {/* Canvas */}
                    <canvas
                        ref={canvasRef}
                        className="w-full h-full cursor-crosshair"
                        onMouseDown={(e) => {
                            const rect = canvasRef.current?.getBoundingClientRect();
                            if (!rect) return;

                            const mouseX = e.clientX - rect.left;
                            const mouseY = e.clientY - rect.top;

                            let clickedImage = false;

                            [...images].reverse().forEach(image => {
                                if (mouseX >= image.x && mouseX <= image.x + image.width &&
                                    mouseY >= image.y && mouseY <= image.y + image.height) {

                                    const handleSize = 8;
                                    const handles = {
                                        nw: [image.x - handleSize / 2, image.y - handleSize / 2],
                                        ne: [image.x + image.width - handleSize / 2, image.y - handleSize / 2],
                                        sw: [image.x - handleSize / 2, image.y + image.height - handleSize / 2],
                                        se: [image.x + image.width - handleSize / 2, image.y + image.height - handleSize / 2]
                                    };

                                    let handle: 'nw' | 'ne' | 'sw' | 'se' | undefined;
                                    Object.entries(handles).forEach(([key, [x, y]]) => {
                                        if (mouseX >= x && mouseX <= x + handleSize &&
                                            mouseY >= y && mouseY <= y + handleSize) {
                                            handle = key as typeof handle;
                                        }
                                    });

                                    if (handle) {
                                        handleImageMouseDown(e, image, handle);
                                        clickedImage = true;
                                        return;
                                    }

                                    if (!handle) {
                                        handleImageMouseDown(e, image);
                                        clickedImage = true;
                                        return;
                                    }
                                }
                            });

                            if (!clickedImage) {
                                setSelectedImageId(null);
                                handleMouseDown(e);
                            }
                        }}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseUp}
                    />

                    <input
                        type="file"
                        ref={fileInputRef}
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                    />

                    <RestartTopic
                        clearTopic={() => {
                            clearTopic()
                            clearCanvas()
                        }}
                        topic={topic}/>

                </div>
            </div>
        </div>
    );
}