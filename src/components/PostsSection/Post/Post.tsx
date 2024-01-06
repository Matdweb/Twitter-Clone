'use client'
import { bottomPostOptions } from "./BottomPostOptions";
import UserImage from "../../UserImage";
import { useEffect, useState } from "react";
import type { Post } from "@/types/posts/Posts";
import Image from "next/image";
import PostOption from "./PostOption";
import Loader from "@/components/Loaders/Loader";
import { useAppSelector, useAppDispatch } from "@/redux/hook";
import { toggleLikeUserPost } from "@/redux/features/userSlice";
import { toggleLikePost } from "@/redux/features/postsSlice";
import { FaRetweet } from "react-icons/fa6";
import Retweet from "./Retweet";
import RetweetModal from "@/components/Modals/RetweetModal";
import CommentModal from "@/components/Modals/CommentModal";
import { useRouter } from "next/navigation";

interface Props {
    key?: number,
    postContent: Post,
    onLoad: () => void,
    options?: boolean
}

function Post({ postContent, onLoad, options = true }: Props) {
    const user = useAppSelector((state) => state.userReducer.user);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const dispatch = useAppDispatch();
    const router = useRouter();

    const [name, setName] = useState<string>('Unauthenticated');
    const [username, setUsername] = useState<string>('username');
    const [userId, setUserId] = useState<string>('');
    const [retweetModal, setRetweetModal] = useState<boolean>(false);
    const [commentModal, setCommentModal] = useState<boolean>(false);

    const handleClick = (optionName: string) => {
        if (user) {
            if (optionName === 'likes') {
                handleLikePost();
            } else if (optionName === 'retweets') {
                if (!postContent.retweets.active) {
                    setRetweetModal(true);
                }
            } else if (optionName === 'comments') {
                setCommentModal(true);
            }
        }
    }

    const handleLikePost = () => {
        //toggle like in redux state 
        dispatch(toggleLikePost({
            userId: user?._id || '',
            postId: postContent.id
        }));
        //toggle like in data base and redux if necessary
        if (postContent.id > 100) {
            dispatch(toggleLikeUserPost({
                userId: user?._id || '',
                post: {
                    id: postContent.id,
                    userId: postContent.userId
                }
            }));
        }
    }

    const handleLoadImage = () => {
        onLoad();
        setIsLoading(false);
    }

    const handleRedirectToPostPage = () => {
        router.push(`/home/user/${postContent.retweet ? userId : postContent.userId}/post/${postContent.id}`)
    }

    const handleRedirectToUserPage = () => {
        router.push(`/home/user/${postContent.retweet ? userId : postContent.userId}/profile`)
    }

    const handleDisabledOptions = () => {
        if (!user) {
            router.push('/')
        } else if (!options) {
            handleRedirectToPostPage();
        }
    }

    useEffect(() => {
        setName(user?.name || "Unauthenticated");
        setUsername(user?.username || "");
        setUserId(user?._id || '')
    }, [user])

    return (
        <section className='w-full h-full min-h-[8rem] overflow-visible p-5 flex justify-start items-start flex-row flex-nowrap border-b border-primary-gray dark:border-primary-dark-gray transition-all'>
            <div className='w-12 h-full'>
                <UserImage
                    className='w-10 h-10'
                    username={postContent.retweet ? name : postContent.name}
                    userId={postContent.retweet ? userId : postContent.userId}
                />
            </div>
            <div className='w-full h-full ml-4 flex justify-between items-start flex-col flex-nowrap'>
                <div className='flex justify-start items-center flex-row flex-nowrap mb-1 cursor-pointer' onClick={handleRedirectToUserPage}>
                    <p className='font-bold mr-1'>
                        {
                            postContent.retweet ?
                                name.length > 10 ?
                                    name.slice(0, 10) + "..."
                                    :
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
                        <>
                            <p>
                                {postContent.extraComment || ""}
                            </p>
                            <div className='w-full max-w-[30rem] scale-90 flex justify-end items-center'>
                                <Retweet postContent={postContent} />
                            </div>
                        </>
                        :
                        <>
                            <p className='cursor-pointer' onClick={() => handleRedirectToPostPage()}>
                                {postContent.title}
                                {postContent.body}
                            </p>

                            {
                                postContent.imageURL &&
                                <>
                                    {
                                        isLoading &&
                                        <div className='w-full h-[20rem] flex justify-center items-center'>
                                            <Loader className="w-12 h-12" />
                                        </div>
                                    }

                                    <Image src={postContent.imageURL} width={500} height={0} className='mt-4 rounded-3xl' alt="post-image" onLoad={() => handleLoadImage()} />
                                </>
                            }
                        </>
                }
                <div className={`w-full max-w-[16rem] sm:max-w-[29rem] flex justify-between items-center flex-row flex-nowrap mt-5 text-primary-dark-gray dark:text-primary-gray ${!options || !user || postContent.retweet ? `opacity-40 cursor-not-allowed` : ''}`} onClick={handleDisabledOptions}>
                    {bottomPostOptions.map((option) => {
                        return (
                            <PostOption
                                key={option.id}
                                option={option}
                                post={postContent}
                                handleClick={() => !(postContent.retweet) && options ? handleClick(option.name) : ''}
                            />
                        )
                    })}
                </div>
                {
                    retweetModal &&
                    <RetweetModal
                        postContent={postContent}
                        toggleModal={() => setRetweetModal(false)}
                    />
                }
                {
                    commentModal &&
                    <CommentModal
                        postContent={postContent}
                        toggleModal={() => setCommentModal(false)}
                    />
                }
            </div>
        </section>
    )
}

export default Post
