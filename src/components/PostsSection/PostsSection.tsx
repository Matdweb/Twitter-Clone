import { useAppSelector, useAppDispatch } from '@/redux/hook';
import { toggleResponsiveMenu } from '@/redux/features/responsiveMenuSlice';
import UserImage from '../UserImage';
import TwitterIcon from '../TwitterIcon';
import { BsStars } from "react-icons/bs";
import { FaArrowRight } from 'react-icons/fa';

function PostsSection() {
    const responsiveMenu = useAppSelector(state => state.responsiveMenu);
    const windowWidth = useAppSelector(state => state.windowWidth);
    const dispatch = useAppDispatch();

    return (
        <section className={`${responsiveMenu ? `min-w-full` : `w-1/3`} min-h-screen outline outline-2 outline-black dark:outline-white rounded-md p-1 m-1 grow`}>
            <header className='h-11 w-full flex justify-between items-center flex-row flex-nowrap'>
                {
                    responsiveMenu ?
                        <div className='w-8 h-8 bg-black dark:bg-white rounded-full flex justify-center items-center'>
                            <FaArrowRight style={{fontSize: "1rem"}} />
                        </div>
                        :
                        <UserImage className='w-8 h-8 outline outline-2 outline-offset-2 outline-black dark:outline-white cursor-pointer ml-5' onClick={() => dispatch(toggleResponsiveMenu())} />
                }
                <TwitterIcon fontSize="1.6rem" />
                <BsStars style={{ fontSize: "1.6rem", color: "theme(colors.primary.blue)", marginRight: "1.25rem" }} />
            </header>
            <h2 className='font-primary-title-roboto'>Posts</h2>
            <p>{windowWidth}</p>
        </section>
    )
}

export default PostsSection