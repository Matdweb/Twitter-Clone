'use client'
import { bottomPostOptions } from "./BottomPostOptions";
import UserImage from "../../UserImage";
import { useState } from "react";
import type { Post } from "@/types/posts/Posts";
import Image from "next/image";
import PostOption from "./PostOption";
import type { PostOptions } from "@/types/posts/PostOptions";

interface Props {
    key?: number,
    postContent: Post,
    onLoad: () => void
}

function Post({ postContent, onLoad }: Props) {
    const [bottomOptions, setBottomOptions] = useState<PostOptions[]>(bottomPostOptions);

    const handleClick = (idClicked: number) => {
        const options = bottomOptions.map(({ id, active, ...rest }) => {
            if (idClicked === id) {
                return {
                    id,
                    active: !active,
                    ...rest
                }
            } else {
                return {
                    id,
                    active,
                    ...rest
                }
            }
        });
        setBottomOptions([...options])
    }

    return (
        <section className='w-full h-full min-h-[8rem] overflow-visible p-5 flex justify-start items-start flex-row flex-nowrap border-b border-primary-gray dark:border-primary-dark-gray'>
            <div className='w-12 h-full'>
                <UserImage className='w-full h-10' username="Name" />
            </div>
            <div className='w-full h-full ml-4 flex justify-between items-start flex-col flex-nowrap'>
                <div className='flex justify-start items-center flex-row flex-nowrap mb-1'>
                    <p className='font-bold mr-1'>Name</p>
                    <p className='font-gray-text'>@username</p>
                </div>
                <p>
                    {postContent.title}
                    <br />
                    <br />
                    {postContent.body}
                </p>
                <Image src={postContent.imageURL || ""} width={500} height={300} className='mt-4 rounded-3xl' alt="post-image" onLoad={() => onLoad()} />
                <div className='w-full max-w-[16rem] sm:max-w-[29rem] flex justify-between items-center flex-row flex-nowrap mt-5 text-primary-dark-gray dark:text-primary-gray'>
                    {bottomOptions.map((option) => {
                        return (
                            <PostOption
                                key={option.id}
                                option={option}
                                likes={postContent.likes}
                                comments={postContent.comments}
                                retweets={postContent.retweets}
                                handleClick={() => handleClick(option.id)}
                            />
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

export default Post