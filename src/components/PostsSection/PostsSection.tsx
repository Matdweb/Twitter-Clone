import { useAppSelector } from '@/redux/hook';
import TwitterHeader from '../Header/TwitterHeader';
import CreatePost from './CreatePost';

function PostsSection() {
    const responsiveMenu = useAppSelector(state => state.responsiveMenu);
    return (
        <section className={`${responsiveMenu ? `min-w-full` : `w-1/3`} min-h-screen border-l border-r border-primary-gray dark:border-primary-dark-gray grow`}>
            <TwitterHeader section='Home' />
            <CreatePost />
        </section>
    )
}

export default PostsSection