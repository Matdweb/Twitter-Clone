'use client'
import React, { useEffect, useState } from 'react'
import { useAppSelector, useAppDispatch } from '@/redux/hook';
import { useSession } from 'next-auth/react';
import { setWindowWidth } from '@/redux/features/windowWidthSlice';
import SideMenu from '@/components/SideMenu/SideMenu';
import PopularTrendsSection from '@/components/TrendsSection/PopularTrendsSection';
import TweetButton from '@/components/Buttons/TweetButton';
import { fetchUser } from '@/redux/features/userSlice';
import TwitterIcon from '@/components/TwitterIcon';

function HomeLayout({
    children
}: {
    children: React.ReactNode
}) {
    const windowWidth = useAppSelector(state => state.windowWidth);
    const responsiveMenu = useAppSelector(state => state.responsiveMenu);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const { data: session } = useSession();
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setWindowWidth(window.innerWidth));
    });

    useEffect(() => {
        if (session?.user) {
            dispatch(fetchUser(session?.user?.email || ""))
        }

    }, [session?.user])

    useEffect(() => {
        const handleResize = () => {
            dispatch(setWindowWidth(window.innerWidth));
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [])

    return (
        <>
            {
                isLoading &&
                <section className='w-screen h-screen absolute bg-white dark:bg-black flex justify-center items-center z-50'>
                    <TwitterIcon fontSize="5rem" />
                </section>
            }
            <section className='w-full max-w-[93rem] m-auto max-h-screen min-h-screen bg-white dark:bg-black flex justify-start items-start overflow-x-hidden overflow-y-hidden' onLoad={()=> setIsLoading(false)}>
                <SideMenu />

                <section className={`${responsiveMenu ? `min-w-full border-l` : `w-1/3`} max-h-screen min-h-screen border-primary grow overflow-y-scroll`}>
                    {children}
                </section>


                {windowWidth > 768 &&
                    <PopularTrendsSection />
                }

                {!responsiveMenu && windowWidth < 640 ? <TweetButton className='fixed w-12 h-12 scale-110 bottom-0 right-0 m-3' /> : ''}
            </section>
        </>
    )
}

export default HomeLayout