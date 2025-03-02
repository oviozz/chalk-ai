
"use client";

import { createContext, useContext } from 'react';

type WhiteboardContextType = {
    captureWhiteboard: () => string | null;
};

export const WhiteboardContext = createContext<WhiteboardContextType>({
    captureWhiteboard: () => null,
});

export const useWhiteboardContext = () => useContext(WhiteboardContext);