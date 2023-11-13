import { useAppSelector } from '@/redux/hook';

interface Props {
    responsiveMenu: boolean,
    toggleResponsiveMenu: () => void
}

function PostsSection({ responsiveMenu, toggleResponsiveMenu }: Props) {

    const windowWidth = useAppSelector(state => state.windowWidth);

    return (
        <section className={`${responsiveMenu ? `min-w-[100%]` : `w-1/3`} w-1/3 min-h-screen outline outline-2 outline-black dark:outline-white rounded-md p-1 m-1 grow`}>
            {windowWidth <= 640 && !responsiveMenu ? <div className='w-16 h-16 outline outline-2 outline-black dark:outline-white rounded-full cursor-pointer flex justify-center items-center' onClick={() => toggleResponsiveMenu()}>
                On
            </div>
                : ''}
            <h2 className='font-primary-title-roboto'>Posts</h2>
        </section>
    )
}

export default PostsSection