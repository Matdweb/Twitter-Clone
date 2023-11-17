'use client'
import React, { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '@/redux/hook';
import { setWindowWidth } from '@/redux/features/windowWidthSlice';
import SideMenu from '@/components/SideMenu/SideMenu';
import PopularTrendsSection from '@/components/TrendsSection/PopularTrendsSection';

function HomeLayout({
    children
}: {
    children: React.ReactNode
}) {
    const windowWidth = useAppSelector(state => state.windowWidth);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setWindowWidth(window.innerWidth));
    });

    useEffect(() => {
        const handleResize = () => {
            dispatch(setWindowWidth(window.innerWidth));
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [])

    return (
        <section className='w-full min-h-screen bg-white dark:bg-black flex justify-start items-start overflow-x-hidden'>
            <SideMenu />

            {children}

            {windowWidth > 768 &&
                <PopularTrendsSection />
            }

        </section>
    )
}

export default HomeLayout