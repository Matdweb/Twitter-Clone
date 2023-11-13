'use client'
import React, { useEffect } from 'react'
import { useState } from 'react'
import ModeToggleButton from '@/components/ModeToggleButton';
import { useAppSelector, useAppDispatch } from '@/redux/hook';
import { setWindowWidth } from '@/redux/features/windowWidthSlice';
import SideMenu from '@/components/SideMenu';
import PostsSection from '@/components/PostsSection';
import PopularTrendsSection from '@/components/PopularTrendsSection';

function Home() {
  const [responsiveMenu, setResponsiveMenu] = useState<boolean>(false);
  const windowWidth = useAppSelector(state => state.windowWidth);
  const dispatch = useAppDispatch();

  const toggleResponsiveMenu = () => {
    setResponsiveMenu(!responsiveMenu);
  }

  useEffect(() => {
    dispatch(setWindowWidth(window.innerWidth));
  });

  useEffect(() => {
    console.log(windowWidth);
    const handleResize = () => {
      dispatch(setWindowWidth(window.innerWidth));
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [])

  return (
    <>
      <section className='w-full min-h-screen bg-white dark:bg-black text-black dark:text-white flex justify-start items-start p-4'>

        <SideMenu
          responsiveMenu={responsiveMenu}
          toggleResponsiveMenu={toggleResponsiveMenu}
        />

        <PostsSection
          responsiveMenu={responsiveMenu}
          toggleResponsiveMenu={toggleResponsiveMenu}
        />

        {windowWidth > 768 &&
          <PopularTrendsSection />
        }

      </section>
      <ModeToggleButton className='absolute scale-75 bottom-0 right-0 m-8' />
    </>
  )
}

export default Home