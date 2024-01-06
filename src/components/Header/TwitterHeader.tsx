'use client'
import { useAppSelector, useAppDispatch } from '@/redux/hook';
import { toggleResponsiveMenu } from '@/redux/features/responsiveMenuSlice';
import UserImage from '../UserImage';
import TwitterIcon from '../TwitterIcon';
import { BsStars } from "react-icons/bs";
import { FaArrowRight } from 'react-icons/fa';

function TwitterHeader({ section }: { section: string }) {
    const responsiveMenu = useAppSelector(state => state.responsiveMenu);
    const windowWidth = useAppSelector(state => state.windowWidth);
    const user = useAppSelector(state => state.userReducer.user);
    const dispatch = useAppDispatch();

    return (
        <header className='h-14 py-1.5 w-full fixed sm:static flex justify-between items-center flex-row flex-nowrap border-b border-primary-gray dark:border-primary-dark-gray bg-white dark:bg-black z-40'>
            {
                responsiveMenu ?
                    <div
                        className='w-8 h-8 ml-1 outline outline-black dark:outline-white rounded-full flex justify-center items-center cursor-pointer'
                        onClick={() => dispatch(toggleResponsiveMenu())}
                    >
                        <FaArrowRight style={{ fontSize: "1rem" }} />
                    </div>
                    :
                    <div className='w-9 h-9 outline outline-2 outline-offset-2 outline-black dark:outline-white cursor-pointer ml-5 rounded-full flex justify-center items-center'>
                        <UserImage
                            className='w-full h-full '
                            onClick={() => windowWidth <= 640 && dispatch(toggleResponsiveMenu())}
                            username={user?.name}
                        />
                    </div>
            }
            {
                windowWidth < 640 ?
                    <TwitterIcon fontSize="1.6rem" />
                    :
                    <h3 className='font-primary-title-bold'>{section}</h3>
            }
            <BsStars style={{ fontSize: "1.6rem", color: "theme(colors.primary.blue)", marginRight: "1.25rem" }} />
        </header>
    )
}

export default TwitterHeader