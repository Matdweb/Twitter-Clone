'use client'
import { useAppSelector, useAppDispatch } from '@/redux/hook';
import { fecthPosts } from '@/redux/features/postsSlice';
import { toggleResponsiveMenu } from '@/redux/features/responsiveMenuSlice';
import TwitterHeader from '../Header/TwitterHeader';
import CreatePost from './CreatePost/CreatePost';
import Post from './Post/Post';
import { useEffect } from 'react';

function PostsSection() {
    const responsiveMenu = useAppSelector(state => state.responsiveMenu);
    const isLoading = useAppSelector(state => state.postsReducer.isLoading);
    const error = useAppSelector(state => state.postsReducer.error);
    const posts = useAppSelector(state => state.postsReducer.posts);
    const dispatch = useAppDispatch();

    const handleRequest = () => {
        //fetchPost uses the lastPostId to fecth the missing posts from that point
        const lastPostId = posts.length > 0 ? posts[posts.length - 1].id : 0;
        dispatch(fecthPosts(lastPostId));
    }

    useEffect(() => {
        handleRequest();
    }, []);

    return (
        <>
            <TwitterHeader section='Home' />
            <CreatePost className='hidden sm:flex' />

            <section className={`pt-14 sm:pt-0 ${responsiveMenu && `opacity-50`}`} onClick={() => responsiveMenu && dispatch(toggleResponsiveMenu())}>
                {posts.map((post) => {
                    return (
                        <Post
                            key={post.id}
                            postContent={post}
                            onLoad={() => post.id === posts.length && handleRequest()}
                        />
                    )
                })}
            </section>
            {isLoading && <p className='m-4'>Loading...</p>}
            {error && <p className='m-4'>There was an loading the posts :(</p>}
        </>
    )
}

export default PostsSection