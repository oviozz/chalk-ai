
// lib/store/useStarModalStore.ts
import { create } from 'zustand';
import { ReactNode } from 'react';

interface StarModalState {
    isOpen: boolean;
    content: ReactNode | null;
    isPending: boolean;
    open: (content: ReactNode) => void;
    close: () => void;
    toggle: (content?: ReactNode) => void;
    setIsPending: (isPending: boolean) => void;
}

export const useStarModalStore = create<StarModalState>((set) => ({
    isOpen: false,
    content: null,
    isPending: false,
    open: (content) => set({ isOpen: true, content }),
    close: () => set({ isOpen: false }),
    toggle: (content) => set((state) => ({
        isOpen: !state.isOpen,
        content: content !== undefined ? (state.isOpen ? state.content : content) : state.content
    })),
    setIsPending: (isPending) => set({ isPending })
}));