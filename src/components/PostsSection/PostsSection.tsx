import { useAppSelector } from '@/redux/hook';
import TwitterHeader from '../Header/TwitterHeader';
import CreatePost from './CreatePost';

function PostsSection() {
    const responsiveMenu = useAppSelector(state => state.responsiveMenu);
    return (
        <section className={`${responsiveMenu ? `min-w-full` : `w-1/3`} min-h-screen outline outline-2 outline-black dark:outline-white rounded-md p-1 m-1 grow`}>
            <TwitterHeader section='Home' />
            <CreatePost />
        </section>
    )
}

export default PostsSection