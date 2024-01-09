'use client'
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import RobotWorkingGif from '../../public/assets/gif/network-robot-assistant-working-on-laptop.gif'
import { useAppDispatch, useAppSelector } from "@/redux/hook"
import { toggleResponsiveMenu } from "@/redux/features/responsiveMenuSlice"
import Loader from "./Loaders/Loader"

function WorkInProgressGif() {
    const responsiveMenu = useAppSelector(state => state.responsiveMenu);
    const dispatch = useAppDispatch();
    const [isHover, setIsHover] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    return (
        <section className={`w-full h-screen mt-14 sm:mt-0 ${responsiveMenu && `cursor-pointer opacity-50`} flex justify-start items-center flex-col flex-nowrap overflow-x-hidden`} onClick={() => responsiveMenu && dispatch(toggleResponsiveMenu())}>
            {
                isLoading &&
                <div className='w-full h-[15rem] flex justify-center items-center'>
                    <Loader className="w-12 h-12" />
                </div>
            }
            <Image
                src={RobotWorkingGif}
                width={300}
                height={300}
                alt='Work in progress page GIF'
                className='scale-100 sm:scale-150 mt-4'
                onLoad={() => setIsLoading(false)}
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
            />

            <div className={`w-full scale-75 p-4 pb-0 opacity-0 ${isHover && `opacity-100`}`}>
                Illustration by <Link className='text-primary-blue' href="https://icons8.com/illustrations/author/Go8GMpKPAq1W">Polina M.</Link> from <Link className='text-primary-blue' href="https://icons8.com/illustrations">Ouch!</Link>
            </div>

            <div className='w-3/4 flex justify-center items-center p-3'>
                <h2 className='text-4xl sm:text-[2.5rem] font-bold mt-5 text-center w-full'>We are sorry :( <br /><br /> This page is still in progress</h2>
            </div>
        </section>
    )
}

export default WorkInProgressGif;