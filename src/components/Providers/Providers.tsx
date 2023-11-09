'use client'
import React from 'react'
import { Provider as ReduxProvider } from "react-redux"
import { store } from '@/redux/store'
import { SessionProvider } from 'next-auth/react';

interface Props { children: React.ReactNode };

function Providers({ children }: Props) {
    return (
        <ReduxProvider store={store}>
            <SessionProvider>
                {children}
            </SessionProvider>
        </ReduxProvider>
    )
}

export default Providers