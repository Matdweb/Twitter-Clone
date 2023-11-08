'use client'
import React from 'react'
import { Provider } from "react-redux"
import { store } from '../redux/store'
import { SessionProvider } from 'next-auth/react'

interface Props { children: React.ReactNode };

function Providers({ children }: Props) {
    return (
        <Provider store={store}>
            <SessionProvider>
                {children}
            </SessionProvider>
        </Provider>
    )
}

export default Providers