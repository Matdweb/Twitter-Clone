'use client'
import type { PostOptions } from "@/types/posts/PostOptions"
import type { Post } from "@/types/posts/Posts"
import { useEffect, useState } from "react";
import { useAppSelector } from "@/redux/hook";

interface Props {
    option: PostOptions
}

interface Props {
    post: Post,
    handleClick: () => void
}

function PostOption({
    option: { id, name, icons, clickable },
    post,
    handleClick
}: Props) {
    const user = useAppSelector(state => state.userReducer.user);
    const Icon = icons[0];
    const ActiveIcon = icons.length > 1 ? icons[1] : null;

    const { likes, retweets, comments } = post;

    const likeIsActive = () => {
        return likes.userIds.includes(user?._id || '');
    }

    const [isActive, setIsActive] = useState<boolean>(false);

    useEffect(() => {
        setIsActive(
            name === 'likes'
                ?
                likeIsActive() :
                name === 'retweets'
                    ?
                    retweets.active
                    :
                    false);
    }, [post, user])

    return (
        <div
            key={id}
            className={`${(name === "stats" || name === "share") && `hidden sm:inline`} `}
            onClick={() => { clickable && handleClick() }}
        >
            <div className='flex justify-start items-center flex-row flex-nowrap cursor-pointer'>

                {
                    isActive && ActiveIcon ?
                        <ActiveIcon.Icon style={ActiveIcon.style} className={name === 'likes' ? 'animate-ping' : ''} />
                        :
                        <Icon.Icon style={Icon.style} />
                }

                {
                    clickable &&
                    <p className='ml-2 text-primary-dark-gray dark:text-primary-gray'>
                        {name === "likes" && likes.amount}
                        {name === "comments" && comments.length}
                        {name === "retweets" && retweets.amount}
                    </p>
                }
            </div>
        </div>
    )
}

export default PostOption