'use client'
import React from 'react'
import { Provider as ReduxProvider } from "react-redux"
import { store } from '@/redux/store'
import { SessionProvider } from 'next-auth/react';
import { EdgeStoreProvider } from '@/lib/edgestore/EdgeStoreProvider';

interface Props { children: React.ReactNode };

function Providers({ children }: Props) {

    return (
        <ReduxProvider store={store}>
            <SessionProvider>
                <EdgeStoreProvider>
                    {children}
                </EdgeStoreProvider>
            </SessionProvider>
        </ReduxProvider>
    )
}

export default Providers