'use client'
import type { Post } from "@/types/posts/Posts"
import FormInput from "../Form/FormInput"
import { useState } from "react"
import { TfiCommentAlt } from "react-icons/tfi";

interface Props {
    toggleModal: () => void,
    postContent: Post
}

function CommentModal({ postContent, toggleModal }: Props) {

    const [comment, setComment] = useState<string>('');

    const handleCommentPost = () => {

    }

    return (
        <section className='w-screen h-screen top-0 left-0 fixed flex justify-end items-center flex-col z-50 rounded-xl'>
            <div className='opacity-60 bg-black w-full h-full' onClick={() => toggleModal()}></div>
            <div className="w-full min-h-[20rem] flex justify-start items-start flex-col p-5 bg-white dark:bg-black">
                <div className='p-3 flex justify-start items-center flex-row flex-nowrap mb-5'>
                    <h3 className='font-primary-title-bold'>Comment ... </h3>
                    <TfiCommentAlt style={{ fontSize: "2rem", marginLeft: "1rem" }} />
                </div>

                <FormInput
                    className='focus-visible:outline-black'
                    type="text"
                    placeholder="Add a comment ..."
                    value={comment}
                    autoComplete="comment"
                    onChange={(e) => setComment(e.target.value)}
                />
                <button
                    className='btn-secondary p-4 text-white dark:text-black dark:bg-white w-full'
                    onClick={() => handleCommentPost()}
                >
                    Comment
                </button>
            </div>
        </section >
    )
}

export default CommentModal