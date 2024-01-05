'use client'
import type { Post } from "@/types/posts/Posts"
import FormInput from "../Form/FormInput"
import { useState } from "react"
import { TfiCommentAlt } from "react-icons/tfi";
import Comments from "../PostsSection/Comments/Comments";
import { useAppDispatch } from "@/redux/hook";
import { addComment } from "@/redux/features/postsSlice";
import Loader from "../Loaders/Loader";

interface Props {
    toggleModal: () => void,
    postContent: Post
}

function CommentModal({ postContent, toggleModal }: Props) {

    const [comment, setComment] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const dispatch = useAppDispatch();

    const handleCommentPost = async () => {
        if (comment.length > 0) {
            setIsLoading(true);
            const newComment = {
                id: 0,
                body: comment,
                username: "username",
                userId: '0',
            }
            const data = await dispatch(addComment({
                userId: postContent.userId,
                postId: postContent.id,
                comment: newComment
            }));

            if (data) {
                setIsLoading(false);
                setComment('');
            }
        }

    }

    return (
        <section className='w-screen h-screen top-0 left-0 fixed flex justify-end items-center flex-col z-50 rounded-xl'>
            <div className='opacity-60 bg-black w-full h-full' onClick={() => toggleModal()}></div>
            <div className="w-full max-h-[60%] flex justify-end items-start flex-col p-5 bg-white dark:bg-black">
                <div className='p-3 flex justify-start items-center flex-row flex-nowrap mb-2'>
                    <h3 className='font-primary-title-bold'>Comments ... </h3>
                    <TfiCommentAlt style={{ fontSize: "2rem", marginLeft: "1rem" }} />
                </div>

                <Comments comments={postContent.comments} />

                <FormInput
                    className='focus-visible:outline-black'
                    type="text"
                    placeholder="Add a comment ..."
                    value={comment}
                    style={{ marginTop: "3rem" }}
                    autoComplete="comment"
                    onChange={(e) => setComment(e.target.value)}
                />
                <button
                    className='btn-secondary p-4 text-white dark:text-black dark:bg-white w-full'
                    onClick={() => handleCommentPost()}
                >
                    {
                        isLoading ?
                            <div className='w-full flex justify-center items-center'>
                                <Loader className='w-10 h-10' />
                            </div>
                            :
                            'Comment'
                    }
                </button>
            </div>
        </section >
    )
}

export default CommentModal