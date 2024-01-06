'use client'
import type { Post } from "@/types/posts/Posts";
import UserImage from "@/components/UserImage";
import Image from "next/image";
import Loader from "@/components/Loaders/Loader";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface Props {
    key?: number,
    postContent: Post,
    onLoad?: () => void
}

function Retweet({ postContent }: Props) {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const router = useRouter();

    const handleRedirectToUserPage = () => {
        router.push(`/home/user/${postContent.userId}/profile`)
    }

    return (
        <section className='w-full h-full min-h-[8rem] overflow-visible p-5 flex justify-start items-start flex-row flex-nowrap border-b border-primary-gray dark:border-primary-dark-gray rounded-3xl border-2'>
            <div className='w-12 h-full'>
                <UserImage className='w-10 h-10' username={postContent.name} userId={postContent.userId} />
            </div>
            <div className='w-full h-full ml-4 flex justify-between items-start flex-col flex-nowrap'>
                <div className='flex justify-start items-center flex-row flex-nowrap mb-1 cursor-pointer' onClick={handleRedirectToUserPage}>
                    <p className='font-bold mr-1'>{postContent.name}</p>
                    <p className='font-gray-text'>{postContent.username}</p>
                </div>
                <p>
                    {postContent.title}
                    {postContent.body}
                </p>
                {
                    postContent.imageURL &&
                    <>
                        {
                            isLoading &&
                            <div className='w-full h-[12rem] flex justify-center items-center'>
                                <Loader className="w-12 h-12" />
                            </div>
                        }

                        <Image src={postContent.imageURL || ""} width={300} height={0} className='mt-4 rounded-3xl' alt="post-image" onLoad={() => setIsLoading(false)} />
                    </>
                }
            </div>
        </section>
    )
}

export default Retweet