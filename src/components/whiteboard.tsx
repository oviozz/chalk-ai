"use client";

import { useEffect, useCallback, useRef, useState } from 'react';
import { Undo2, Redo2, Eraser, Sparkles, Send, Lightbulb } from 'lucide-react';
import useWhiteboard from "@/hooks/useWhiteboard";
import { FaPenFancy } from "react-icons/fa";
import { FiImage } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { FaStar, FaWandMagicSparkles } from "react-icons/fa6";
import {StarModal} from "@/components/star-modal";

export default function Whiteboard() {
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

    // Add state for modal
    const [isModalOpen, setIsModalOpen] = useState(false);

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

    // Sample modal content
    const modalContent = (
        <>
            <p className="mb-3">Welcome to ChalkAI! This interactive whiteboard helps you learn and practice concepts with AI assistance.</p>

            <h4 className="font-semibold text-purple-200 mt-4 mb-2">Tools & Features:</h4>
            <ul className="space-y-2 list-disc pl-5">
                <li><strong>Drawing Tools:</strong> Use the pen tool to draw and illustrate your work</li>
                <li><strong>Images:</strong> Add images to your whiteboard by clicking the image icon</li>
                <li><strong>AI Assistance:</strong> Get hints, check your work, or submit for review</li>
                <li><strong>Color & Size:</strong> Customize your pen color and thickness</li>
            </ul>

            <div className="mt-4 p-3 bg-white/10 rounded-lg">
                <p className="text-sm italic">Tip: You can also paste images directly from your clipboard!</p>
            </div>
        </>
    );

    return (
        <div className="relative h-screen w-screen bg-amber-950 p-4">
            <div className="absolute inset-0 m-4 bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAIklEQVQIW2NkQAKrVq36zwjjgzhhYWGMYAEYB8RmROaABADeOQ8CXl/xfgAAAABJRU5ErkJggg==')] rounded-lg p-2">
                <div className="relative h-full w-full bg-gray-900 rounded-lg border-2 border-gray-800 shadow-2xl">

                    {/* Header */}
                    <div className="absolute top-0 left-0 right-0 flex justify-between items-center p-4">
                        <div className="flex items-center gap-3 group">
                            {/* Logo Container with animated gradient background */}
                            <div className="relative overflow-hidden rounded-lg w-10 h-10 flex items-center justify-center bg-gradient-to-br from-purple-600 to-blue-600 shadow-lg">
                                {/* Animated chalk icon */}
                                <div className="relative flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                                    <div className="absolute w-6 h-6 bg-white rounded-full opacity-20 animate-pulse"></div>
                                    <span className="text-white text-lg font-bold relative z-10">
                                        <FaWandMagicSparkles/>
                                    </span>
                                </div>

                                {/* Subtle sparkle effects */}
                                <div className="absolute top-1 right-1 w-1 h-1 bg-white rounded-full opacity-70 animate-ping"></div>
                                <div className="absolute bottom-2 left-1 w-1 h-1 bg-white rounded-full opacity-70 animate-ping" style={{animationDelay: '0.5s'}}></div>

                                {/* Light beam effect on hover */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-purple-400 to-blue-300 opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                            </div>

                            {/* Text with animated underline effect */}
                            <div className="relative">
                                <h1 className="text-2xl font-extrabold text-white font-chalk tracking-wide drop-shadow-lg">
                                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-blue-300">Chalk</span>
                                    <span className="text-white ml-1">AI</span>
                                </h1>
                                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-blue-400 group-hover:w-full transition-all duration-500 rounded-full shadow-sm shadow-purple-500/50"></div>
                            </div>
                        </div>

                        <div onClick={() => setIsModalOpen(true)}
                            className="flex items-center gap-4">
                            <div className="relative">
                                {/* Main star button with continuous spinning animation - Updated with onClick */}
                                <div
                                    className="w-10 h-10 bg-gradient-to-br from-purple-600 via-indigo-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-purple-500/20 animate-[wiggle_3s_ease-in-out_infinite] overflow-hidden cursor-pointer hover:brightness-110 transition-all"
                                >
                                    {/* Spinning star */}
                                    <FaStar className="w-5 h-5 text-white drop-shadow-md animate-[spin_6s_linear_infinite]" />

                                    {/* Continuous pinging effect */}
                                    <div className="absolute inset-0 rounded-lg bg-purple-500 opacity-20 animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite]"></div>
                                </div>

                                {/* Continuous radial particles */}
                                <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-300 rounded-full animate-ping" style={{animationDelay: '0.2s'}}></div>
                                <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-blue-300 rounded-full animate-ping" style={{animationDelay: '0.5s'}}></div>
                                <div className="absolute -top-1 -left-2 w-1.5 h-1.5 bg-purple-300 rounded-full animate-ping" style={{animationDelay: '0.8s'}}></div>

                                {/* Light burst effect */}
                                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-400/40 to-blue-400/40 animate-pulse"></div>
                            </div>
                        </div>

                    </div>

                    {/* AI Buttons */}
                    <div className="absolute bottom-4 right-4 flex flex-col gap-3">
                        <Button size={"lg"} className="px-4 py-2 bg-gray-800/90 backdrop-blur-sm rounded-full text-white text-sm font-chalk hover:bg-gray-700 transition-all flex items-center gap-2 shadow-lg hover:shadow-purple-500/20">
                            <Lightbulb className="w-4 h-4" /> Ask for Hint
                        </Button>
                        <Button size={"lg"} className="px-4 py-2 bg-gray-800/90 backdrop-blur-sm rounded-full text-white text-sm font-chalk hover:bg-gray-700 transition-all flex items-center gap-2 shadow-lg hover:shadow-blue-500/20">
                            <Sparkles className="w-4 h-4" /> Check Work
                        </Button>
                        <Button size={"lg"} className="px-4 py-2 bg-gradient-to-br from-purple-600 to-blue-600 backdrop-blur-sm rounded-full text-white text-sm font-chalk hover:opacity-90 transition-all flex items-center gap-2 shadow-lg shadow-purple-500/30">
                            <Send className="w-4 h-4" /> Submit Work
                        </Button>
                    </div>

                    {/* Left Toolbar */}
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 flex flex-col gap-3 bg-gray-800/90 backdrop-blur-sm p-2.5 rounded-xl shadow-xl">
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
                                <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 text-xs text-white font-chalk">
                                    {strokeWidth}px
                                </span>
                            </div>
                        </div>

                        <div className="h-px bg-gray-600 my-1" />

                        <div className="flex flex-col gap-2">
                            <button
                                onClick={() => setSelectedTool('pen')}
                                className={`p-2 rounded-lg transition-all flex items-center justify-center ${
                                    selectedTool === 'pen'
                                        ? 'bg-purple-500/20 text-purple-400 shadow-inner shadow-purple-500/30'
                                        : 'text-white hover:bg-gray-700/50 hover:text-purple-300'
                                }`}
                            >
                                <FaPenFancy className="w-5 h-5" />
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
                                <FiImage className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="h-px bg-gray-600 my-1" />

                        <div className="flex flex-col gap-2">
                            <button
                                onClick={undo}
                                disabled={historyIndex === 0}
                                className="p-2 rounded-lg hover:bg-gray-700/50 disabled:opacity-30 transition-all text-white flex items-center justify-center"
                            >
                                <Undo2 className="w-5 h-5" strokeWidth={3} />
                            </button>
                            <button
                                onClick={redo}
                                disabled={historyIndex === history.length - 1}
                                className="p-2 rounded-lg hover:bg-gray-700/50 disabled:opacity-30 transition-all text-white flex items-center justify-center"
                            >
                                <Redo2 className="w-5 h-5" strokeWidth={3} />
                            </button>
                            <button
                                onClick={clearCanvas}
                                className="p-2 rounded-lg hover:bg-gray-700/50 text-red-400 transition-all flex items-center justify-center"
                            >
                                <Eraser className="w-5 h-5" strokeWidth={3} />
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

                            // Check images in reverse order (top-most first)
                            [...images].reverse().forEach(image => {
                                if (mouseX >= image.x && mouseX <= image.x + image.width &&
                                    mouseY >= image.y && mouseY <= image.y + image.height) {

                                    const handleSize = 8;
                                    const handles = {
                                        nw: [image.x - handleSize/2, image.y - handleSize/2],
                                        ne: [image.x + image.width - handleSize/2, image.y - handleSize/2],
                                        sw: [image.x - handleSize/2, image.y + image.height - handleSize/2],
                                        se: [image.x + image.width - handleSize/2, image.y + image.height - handleSize/2]
                                    };

                                    // Check resize handles first
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

                                    // If clicking on image body
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

                    {/* Add the modal component */}
                    <StarModal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        content={modalContent}
                    />
                </div>
            </div>
        </div>
    );
}