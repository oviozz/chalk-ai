"use client";

import React, { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface StarModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    content: React.ReactNode;
}

export const StarModal: React.FC<StarModalProps> = ({
                                                        isOpen,
                                                        onClose,
                                                        title = "ChalkAI Tips",
                                                        content
                                                    }) => {
    const modalRef = useRef<HTMLDivElement>(null);

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);

    // Close on escape key
    useEffect(() => {
        const handleEscKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscKey);
        }

        return () => {
            document.removeEventListener('keydown', handleEscKey);
        };
    }, [isOpen, onClose]);

    return (
        <AnimatePresence >
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-start justify-end pointer-events-none">
                    <motion.div
                        ref={modalRef}
                        initial={{ opacity: 0, scale: 0.8, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: -20 }}
                        transition={{ type: "spring", damping: 20, stiffness: 300 }}
                        className="relative pointer-events-auto max-w-md mx-auto w-full sm:mr-15 sm:mt-18 px-5 mt-24"
                    >
                        {/* Chat bubble with pointer */}
                        <div className="relative bg-gradient-to-br from-purple-600 to-blue-800 rounded-2xl border-6 border-gray-800 p-4 shadow-xl text-white overflow-hidden">
                            {/* Improved pointer to the star */}
                            <div className="absolute -top-3 right-0 w-6 h-6 transform translate-x-16 -translate-y-1">
                                <div className="w-6 h-6 rotate-45 bg-purple-600 transform -translate-y-3 translate-x-3"></div>
                            </div>

                            {/* Header with title and close button */}
                            <div className="flex justify-between items-center mb-3">
                                <h3 className="font-bold text-lg">{title}</h3>
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
                                    {content}
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
    );
};