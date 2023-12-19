'use client'
import { ChangeEvent, useState } from "react"
import FormInput from "../Form/FormInput"
import { FaRetweet } from 'react-icons/fa'
import { HiOutlinePencil } from "react-icons/hi2";
import { useAppDispatch } from "@/redux/hook";
import { toggleRetweetPost } from "@/redux/features/postsSlice";
import { addUserPost } from "@/redux/features/userSlice";
import type { Post } from "@/types/posts/Posts";

interface Props {
    toggleModal: () => void,
    postContent: Post
}

function RetweetModal({ postContent, toggleModal }: Props) {

    const [comment, setComment] = useState<string>('');
    const [isComment, setIsComment] = useState<boolean>(false);

    const dispatch = useAppDispatch();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setComment(e.target.value);
    }

    const handleRetweetPost = () => {
        toggleModal();
        dispatch(toggleRetweetPost(postContent.id));

        if (comment) {
            postContent = { ...postContent, extraComment: comment }
        }

        dispatch(addUserPost(postContent));
    }

    return (
        <section className='w-screen h-screen top-0 left-0 fixed flex justify-end items-center flex-col z-30 rounded-xl'>
            <div className='opacity-60 bg-black w-full h-full' onClick={() => toggleModal()}></div>
            <div className="w-full h-96 flex justify-start items-start flex-col p-5 bg-white dark:bg-black">
                <div
                    className='p-3 flex justify-start items-center flex-row flex-nowrap hover:opacity-60 cursor-pointer'
                    onClick={() => handleRetweetPost()}
                >
                    <FaRetweet style={{ fontSize: "1.2rem" }} />
                    <p className='ml-4 font-primary-text'>Retweet</p>
                </div>
                <div
                    className='p-3 flex justify-start items-center flex-row flex-nowrap hover:opacity-60 mb-4 cursor-pointer'
                    onClick={() => setIsComment(!isComment)}
                >
                    <HiOutlinePencil style={{ fontSize: "1.2rem" }} />
                    <p className='ml-4 font-primary-text'>Retweet with comment</p>
                </div>
                {
                    isComment &&
                    <>
                        <FormInput
                            className='focus-visible:outline-black'
                            type="text"
                            placeholder="Tell yout thoughts ..."
                            value={comment}
                            autoComplete="comment"
                            onChange={handleChange}
                        />
                        <button
                            className='btn-secondary bg-black p-4 text-white dark:text-black dark:bg-white w-full'
                            onClick={() => handleRetweetPost()}
                        >
                            Tweet
                        </button>
                    </>
                }
            </div>
        </section>
    )
}

export default RetweetModal