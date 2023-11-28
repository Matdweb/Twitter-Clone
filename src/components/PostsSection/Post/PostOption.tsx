'use client'
import { useAppSelector } from "@/redux/hook"
import type { PostOptions } from "@/types/posts/PostOptions"

interface Props {
    option: PostOptions
}

interface Props {
    likes: number,
    comments: [],
    retweets: number,
    handleClick: () => void
}

function PostOption({
    option: { id, name, icons, active, clickable },
    likes,
    comments,
    retweets,
    handleClick
}: Props) {

    const windowWidth = useAppSelector(state => state.windowWidth);
    const Icon = icons[0];
    const ActiveIcon = icons.length > 1 ? icons[1] : null;

    return (
        <div
            key={id}
            className={`${(name === "stats" || name === "share") && windowWidth < 640 ? `hidden` : ''} `}
            onClick={() => { clickable && handleClick() }}
        >
            <div className='flex justify-start items-center flex-row flex-nowrap cursor-pointer'>
                    {
                        active && ActiveIcon ?
                            <ActiveIcon.Icon style={ActiveIcon.style} className="animate-bounce" />
                            :
                            <Icon.Icon style={Icon.style} />
                    }
                {
                    active != undefined &&
                    <p className='ml-2 text-primary-dark-gray dark:text-primary-gray'>
                        {name === "likes" && likes}
                        {name === "comments" && comments.length}
                        {name === "retweets" && retweets}
                    </p>
                }
            </div>
        </div>
    )
}

export default PostOption