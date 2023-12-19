'use client'
import { bottomPostOptions } from "./BottomPostOptions";
import UserImage from "../../UserImage";
import { useEffect, useState } from "react";
import type { Post } from "@/types/posts/Posts";
import Image from "next/image";
import PostOption from "./PostOption";
import Loader from "@/components/Loaders/Loader";
import { useAppSelector, useAppDispatch } from "@/redux/hook";
import { toggleLikePost } from "@/redux/features/postsSlice";
import { toggleRetweetPost } from "@/redux/features/postsSlice";
import { addUserPost } from "@/redux/features/userSlice";
import { FaRetweet } from "react-icons/fa6";
import Retweet from "./Retweet";

interface Props {
    key?: number,
    postContent: Post,
    onLoad: () => void
}

function Post({ postContent, onLoad }: Props) {
    const user = useAppSelector((state) => state.userReducer.user);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const dispatch = useAppDispatch();

    const [name, setName] = useState<string>('Unauthenticated');
    const [username, setUsername] = useState<string>('username');

    const handleClick = (idClicked: number, name: string) => {
        if (name === 'likes') {
            handleLikePost(idClicked);
        } else if (name === 'retweets') {
            handleRetweetPost(idClicked)
        }
    }

    const handleLikePost = (id: number) => {
        dispatch(toggleLikePost(id));
    }

    const handleRetweetPost = (id: number) => {
        dispatch(toggleRetweetPost(id));
        dispatch(addUserPost(postContent));
    }

    const handleLoadImage = () => {
        onLoad();
        setIsLoading(false);
    }

    useEffect(() => {
        setName(user?.name || "Unauthenticated");
        setUsername(user?.username || "");
    }, [user])

    return (
        <section className='w-full h-full min-h-[8rem] overflow-visible p-5 flex justify-start items-start flex-row flex-nowrap border-b border-primary-gray dark:border-primary-dark-gray'>
            <div className='w-12 h-full'>
                <UserImage className='w-10 h-10' username={postContent.name} />
            </div>
            <div className='w-full h-full ml-4 flex justify-between items-start flex-col flex-nowrap'>
                <div className='flex justify-start items-center flex-row flex-nowrap mb-1'>
                    <p className='font-bold mr-1'>
                        {
                            postContent.retweet ?
                                name
                                :
                                postContent.name
                        }
                    </p>
                    <p className='font-gray-text'>
                        @
                        {
                            postContent.retweet ?
                                username
                                :
                                postContent.username
                        }
                    </p>
                    {
                        postContent.retweet &&
                        <div className='ml-5 opacity-60 flex justify-start items-center flex-row flex-nowrap'>
                            <FaRetweet style={{ fontSize: "1.2rem" }} />
                            <p className='font-bold ml-2'>Retweeted</p>
                        </div>
                    }
                </div>
                {
                    postContent.retweet ?
                        <div className='w-full scale-90 flex justify-end items-center'>
                            <Retweet postContent={postContent} />
                        </div>
                        :
                        <>
                            <p>
                                {postContent.title}
                                <br />
                                <br />
                                {postContent.body}
                            </p>
                            {
                                isLoading &&
                                <div className='w-full h-[20rem] flex justify-center items-center'>
                                    <Loader className="w-12 h-12" />
                                </div>
                            }
                            <Image src={postContent.imageURL || ""} width={500} height={0} className='mt-4 rounded-3xl' alt="post-image" onLoad={() => handleLoadImage()} />
                        </>
                }
                <div className='w-full max-w-[16rem] sm:max-w-[29rem] flex justify-between items-center flex-row flex-nowrap mt-5 text-primary-dark-gray dark:text-primary-gray'>
                    {bottomPostOptions.map((option) => {
                        return (
                            <PostOption
                                key={option.id}
                                option={option}
                                post={postContent}
                                handleClick={() => handleClick(postContent.id, option.name)}
                            />
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

export default Post