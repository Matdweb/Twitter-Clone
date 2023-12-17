'use client'
import { useState, useRef } from "react";
import UserImage from "../../UserImage"
import { bottomCreatePostOptions } from "./BottomCreatePostOptions";
import { useAppSelector } from "@/redux/hook";

function CreatePost() {
    const textArea = useRef<HTMLTextAreaElement>(null);
    const [postText, setPostText] = useState<string>('');
    const user = useAppSelector(state => state.userReducer.user);

    const resizeTextArea = () => {
        textArea.current ? textArea.current.style.height = "auto" : '';
        textArea.current ? textArea.current.style.height = textArea.current?.scrollHeight + "px" : '';
    }

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        resizeTextArea();
        setPostText(e.target.value);
    }

    return (
        <section className='w-full h-full min-h-[10rem] overflow-visible p-5 hidden sm:flex justify-start items-start flex-row flex-nowrap border-b border-primary-gray dark:border-primary-dark-gray'>
            <div className='w-12 h-full'>
                <UserImage className='w-10 h-10' username={user?.name} />
            </div>
            <div className='w-full h-full ml-4 flex justify-between items-start flex-col flex-nowrap'>
                <textarea
                    name="post_text"
                    id="post_text_area"
                    placeholder="What’s happening"
                    value={postText}
                    className='w-full h-6 mt-2 bg-transparent focus:outline-none resize-none'
                    onChange={(e) => handleChange(e)}
                    ref={textArea}
                />
                <div className='w-full flex justify-between items-center flex-row flex-nowrap mt-12'>
                    <div className='text-primary-blue w-52 flex justify-between items-center'>
                        {bottomCreatePostOptions.map(({ Icon, id, style, onClick }) => {
                            return <Icon key={id} style={style} onClick={() => onClick()} />
                        })}
                    </div>
                    <button
                        disabled={!postText ? true : false}
                        className='btn-primary px-4 py-2 text-white shadow-md'
                    >Tweet
                    </button>
                </div>
            </div>
        </section>
    )
}

export default CreatePost