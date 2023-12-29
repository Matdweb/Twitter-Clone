'use client'
import { ChangeEvent, useEffect } from "react";
import { useState, useRef } from "react";
import UserImage from "../../UserImage"
import { bottomCreatePostOptions } from "./BottomCreatePostOptions";
import { useAppSelector, useAppDispatch } from "@/redux/hook";
import Image from "next/image";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useEdgeStore } from "@/lib/edgestore/EdgeStoreProvider";
import createNewPost from "@/lib/createNewPost";
import { addUserPost } from "@/redux/features/userSlice";
import { addPost } from "@/redux/features/postsSlice";
import Loader from "@/components/Loaders/Loader";
import { Post } from "@/types/posts/Posts";

function CreatePost({ className }: { className?: string }) {
    const textArea = useRef<HTMLTextAreaElement>(null);
    const user = useAppSelector(state => state.userReducer.user);
    const [postText, setPostText] = useState<string>('');
    const [image, setImage] = useState<File>();
    const [imagePreviewUrl, setImagePreviewUrl] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { edgestore } = useEdgeStore();
    const dispatch = useAppDispatch();

    const resizeTextArea = () => {
        textArea.current ? textArea.current.style.height = "auto" : '';
        textArea.current ? textArea.current.style.height = textArea.current?.scrollHeight + "px" : '';
    }

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        resizeTextArea();
        setPostText(e.target.value);
    }

    const handleImagePreview = (e: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0] || undefined;

        if (selectedFile) {
            setImage(selectedFile);
            // Read the file as a data URL
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreviewUrl(reader.result as string);
            };
            reader.readAsDataURL(selectedFile);
        }
    }

    const handleRemoveImage = () => {
        setImage(undefined);
        setImagePreviewUrl('');
    }

    const handleCreatePost = async () => {
        setIsLoading(true);
        const imageUrl = await handleUploadImage();
        const post = createNewPost(user, postText, imageUrl);

        const data = await dispatch(addUserPost(post));
        if(data){
            dispatch(addPost(data.payload as Post))
        }
        
        setPostText('');
        handleRemoveImage();
        setIsLoading(false);
    }

    const handleUploadImage = async () => {
        if (image) {
            const { url } = await edgestore.publicImages.upload({ file: image });
            return url;
        } else {
            return "";
        }
    }

    return (
        <section className={`w-full h-full min-h-[10rem] overflow-visible p-5 mt-14 sm:mt-0 flex justify-start items-start flex-row flex-nowrap border-b border-primary-gray dark:border-primary-dark-gray ${className}`}>
            <div className='w-12 h-full flex-shrink-0'>
                <UserImage className='w-10 h-10' username={user?.name} />
            </div>
            <div className='w-5/6 sm:w-full h-full ml-1 sm:ml-4 flex justify-between items-start flex-col flex-nowrap flex-shrink'>
                <textarea
                    name="post_text"
                    id="post_text_area"
                    placeholder="What’s happening"
                    value={postText}
                    className='w-full h-6 mt-2 bg-transparent focus:outline-none resize-none'
                    onChange={(e) => handleChange(e)}
                    ref={textArea}
                />
                {
                    imagePreviewUrl &&
                    <>
                        <div className='w-full relative top-5 flex justify-end items-center' onClick={() => handleRemoveImage()}>
                            <IoIosCloseCircleOutline
                                style={{
                                    fontSize: "1.5rem",
                                    cursor: "pointer",
                                    marginRight: ".7rem"
                                }}
                            />
                        </div>
                        <Image src={imagePreviewUrl} width={500} height={0} className='mt-4 rounded-3xl' alt="post-image" />
                    </>
                }
                <div className='w-full flex justify-end sm:justify-between items-end sm:items-center flex-col sm:flex-row flex-wrap mt-12'>
                    <div className='text-primary-blue w-52 flex justify-between items-center'>
                        {bottomCreatePostOptions.map(({ Icon, id, htmlfor, aria, style }) => {
                            return (
                                <label key={id} htmlFor={htmlfor} aria-description={aria}>
                                    <Icon style={style} />
                                </label>
                            )
                        })}
                    </div>
                    <input
                        id="postImage"
                        type='file'
                        className='hidden'
                        onChange={handleImagePreview}
                    />
                    <button
                        disabled={postText || imagePreviewUrl ? false : true}
                        className='btn-primary px-4 py-2 mt-4 sm:mt-0 text-white shadow-md w-full sm:w-20'
                        onClick={handleCreatePost}
                    >
                        {
                            isLoading ?
                                <div className='w-full flex justify-center items-center'>
                                    <Loader className=' w-7 h-7' />
                                </div>
                                :
                                "Tweet"
                        }
                    </button>
                </div>
            </div>
        </section>
    )
}

export default CreatePost