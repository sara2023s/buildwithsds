'use client';

import React, { createContext, useContext, useState } from 'react';

type CursorType = 'default' | 'hover' | 'text';

interface CursorContextType {
    cursorType: CursorType;
    setCursorType: (type: CursorType) => void;
}

const CursorContext = createContext<CursorContextType>({
    cursorType: 'default',
    setCursorType: () => { },
});

export const useCursor = () => useContext(CursorContext);

export function CursorProvider({ children }: { children: React.ReactNode }) {
    const [cursorType, setCursorType] = useState<CursorType>('default');

    return (
        <CursorContext.Provider value={{ cursorType, setCursorType }}>
            {children}
        </CursorContext.Provider>
    );
}
