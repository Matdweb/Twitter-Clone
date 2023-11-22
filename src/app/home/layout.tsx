'use client'
import React, { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '@/redux/hook';
import { setWindowWidth } from '@/redux/features/windowWidthSlice';
import SideMenu from '@/components/SideMenu/SideMenu';
import PopularTrendsSection from '@/components/TrendsSection/PopularTrendsSection';
import TweetButton from '@/components/Buttons/TweetButton';

function HomeLayout({
    children
}: {
    children: React.ReactNode
}) {
    const windowWidth = useAppSelector(state => state.windowWidth);
    const responsiveMenu = useAppSelector(state => state.responsiveMenu);
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

            {!responsiveMenu && windowWidth < 640 ? <TweetButton className='fixed w-12 h-12 scale-110 bottom-0 right-0 m-3' /> : ''}
        </section>
    )
}

export default HomeLayout