import { useAppSelector, useAppDispatch } from '@/redux/hook';
import { toggleResponsiveMenu } from '@/redux/features/responsiveMenuSlice';

function PostsSection() {
    const responsiveMenu = useAppSelector(state => state.responsiveMenu);
    const windowWidth = useAppSelector(state => state.windowWidth);
    const dispatch = useAppDispatch();

    return (
        <section className={`${responsiveMenu ? `min-w-[100%]` : `w-1/3`} min-h-screen outline outline-2 outline-black dark:outline-white rounded-md p-1 m-1 grow`}>
            {windowWidth <= 640 && !responsiveMenu ? <div className='w-16 h-16 outline outline-2 outline-black dark:outline-white rounded-full cursor-pointer flex justify-center items-center' onClick={() => dispatch(toggleResponsiveMenu())}>
                On
            </div>
                : ''}
            <h2 className='font-primary-title-roboto'>Posts</h2>
            <p>{windowWidth}</p>
        </section>
    )
}

export default PostsSection