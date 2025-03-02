"use client";

import React, { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {FaStar} from "react-icons/fa6";

export const StarModal = () => {

    const modalRef = useRef<HTMLDivElement>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const onClose = () => {
        setIsModalOpen(false);
    }

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        if (isModalOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isModalOpen, onClose]);
    // Close on escape key
    useEffect(() => {
        const handleEscKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        if (isModalOpen) {
            document.addEventListener('keydown', handleEscKey);
        }

        return () => {
            document.removeEventListener('keydown', handleEscKey);
        };
    }, [isModalOpen, onClose]);

    const modalContent = (
        <>
            <p className="mb-3">Great job exploring different ways to divide 87 by 3! Here are some hints to guide your next steps:</p>
            <h4 className="font-semibold text-purple-200 mt-4 mb-2">Hints:</h4>
            <ul className="space-y-2 list-disc pl-5">
                <li><strong>Double-check your groups:</strong> Are all your splits adding up to 87 correctly?</li>
                <li><strong>Look for patterns:</strong> Which method seems easiest for you to understand? Can you find a faster way?</li>
                <li><strong>Verify quotients:</strong> Each split should evenly divide among 3. Are all groups balanced?</li>
                <li><strong>Try a new approach:</strong> Could breaking 87 into different numbers make division simpler?</li>
            </ul>
            <div className="mt-4 p-3 bg-white/10 rounded-lg">
                <p className="text-sm italic">Tip: Think about how you can break numbers into parts that are easy to divide by 3!</p>
            </div>
        </>
    );


    return (
        <div>
            <div onClick={() => setIsModalOpen(true)}
                 className="flex items-center gap-4">
                <div className="relative">
                    <div
                        className="w-10 h-10 bg-gradient-to-br from-purple-600 via-indigo-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-purple-500/20 animate-[wiggle_3s_ease-in-out_infinite] overflow-hidden cursor-pointer hover:brightness-110 transition-all"
                    >
                        <FaStar className="w-5 h-5 text-white drop-shadow-md animate-[spin_6s_linear_infinite]" />
                        <div className="absolute inset-0 rounded-lg bg-purple-500 opacity-20 animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite]"></div>
                    </div>
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-300 rounded-full animate-ping" style={{animationDelay: '0.2s'}}></div>
                    <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-blue-300 rounded-full animate-ping" style={{animationDelay: '0.5s'}}></div>
                    <div className="absolute -top-1 -left-2 w-1.5 h-1.5 bg-purple-300 rounded-full animate-ping" style={{animationDelay: '0.8s'}}></div>
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-400/40 to-blue-400/40 animate-pulse"></div>
                </div>
            </div>

            <AnimatePresence >
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-start justify-end pointer-events-none pr-20 pt-20">
                        <motion.div
                            ref={modalRef}
                            initial={{ opacity: 0, x: 100, y: -100 }}
                            animate={{ opacity: 1, x: 0, y: 0 }}
                            exit={{ opacity: 0, x: 100, y: -100 }}
                            transition={{ type: "spring", damping: 20, stiffness: 300 }}
                            className="relative pointer-events-auto w-full max-w-md"
                        >
                            {/* Chat bubble with pointer */}

                            <div className="relative bg-gradient-to-br from-purple-600 to-blue-800 rounded-2xl border-6 border-gray-800 p-4 shadow-xl text-white overflow-hidden">
                                {/* Improved pointer to the star */}
                                <div className="absolute -top-3 right-0 w-6 h-6 transform translate-x-16 -translate-y-1">
                                    <div className="w-6 h-6 rotate-3 bg-purple-600 transform -translate-y-3 translate-x-3"></div>
                                </div>

                                {/* Header with title and close button */}
                                <div className="flex justify-between items-center mb-3">
                                    <h3 className="font-bold text-lg">ChalkAI Tips</h3>
                                    <button
                                        onClick={onClose}
                                        className="p-1 rounded-full hover:bg-white/20 transition-colors"
                                        aria-label="Close"
                                    >
                                        <X size={18} />
                                    </button>
                                </div>

                                {/* Scrollable content area */}
                                <div className="max-h-[70vh] overflow-y-auto pr-1 custom-scrollbar">
                                    <div className="prose prose-invert max-w-none">
                                        {modalContent}
                                    </div>
                                </div>

                                {/* Visual elements for a chat bubble feel */}
                                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                                <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full blur-xl -mr-10 -mt-10"></div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};