'use client'
import React, { useEffect, useState } from 'react'
import TwitterHeader from '@/components/Header/TwitterHeader'
import Post from '@/components/PostsSection/Post/Post';
import Comments from '@/components/PostsSection/Comments/Comments';
import type { Post as PostType } from '@/types/posts/Posts'
import { useAppSelector, useAppDispatch } from '@/redux/hook';
import Link from 'next/link';
import { findPost } from '@/redux/features/userSlice';
import Loader from '@/components/Loaders/Loader';

function Page({ params }: { params: { id: number } }) {
    const [postContent, setPostContent] = useState<PostType | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const posts = useAppSelector((state) => state.postsReducer.posts);
    const dispatch = useAppDispatch();

    const handlePost = async () => {
        const postId = params.id;
        if (postId <= 100) {
            const post = posts.find((post) => {
                return post.id == postId
            });

            setPostContent(post || null);
        } else if (postId > 100) {
            setIsLoading(true);
            const data = await dispatch(findPost(postId));
            setPostContent(data.payload as PostType);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        handlePost();
    }, [posts]);

    return (
        <>
            <TwitterHeader section='Post' />
            <section className='pt-16 sm:pt-3'>
                <Link href='/home' className='px-4 underline'>Back</Link>
                {
                    postContent ?
                        <>
                            {
                                isLoading &&
                                <div className='w-full h-[20rem] flex justify-center items-center'>
                                    <Loader className="w-12 h-12" />
                                </div>
                            }
                            <Post
                                postContent={postContent}
                                onLoad={() => {}}
                                options={true}
                            />
                            <Comments
                                comments={postContent.comments}
                            />
                        </>

                        :
                        <h2 className='font-primary-title-roboto mt-7 ml-5'>We &apos; re sorry, we lost your post :(</h2>
                }
            </section>
        </>
    )
}

export default Page