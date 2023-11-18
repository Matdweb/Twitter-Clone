'use client'
import { useState, useRef, useEffect } from "react";
import UserImage from "../UserImage"
import { LuImage } from "react-icons/lu";
import { MdOutlineGifBox } from "react-icons/md";
import { IoStatsChartSharp } from "react-icons/io5";
import { GrEmoji } from "react-icons/gr";
import { FaRegCalendarMinus } from "react-icons/fa";

function CreatePost() {
    const textArea = useRef<HTMLTextAreaElement>(null);
    const [postText, setPostText] = useState<string>('');

    const iconStyles = {
        fontSize: "1.5rem",
        cursor: " pointer",
    }

    const resizeTextArea = () => {
        textArea.current.style.height = "auto"
        textArea.current.style.height = textArea.current?.scrollHeight + "px";
    }

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        resizeTextArea();
        setPostText(e.target.value);
    }

    return (
        <section className='w-full h-full min-h-[10rem] overflow-visible p-5 flex justify-start items-start flex-row flex-nowrap outline outline-[red]'>
            <div className='w-8 h-full'>
                <UserImage />
            </div>
            <div className='h-full ml-4 flex justify-between items-start flex-col flex-nowrap'>
                <textarea
                    name="post_text"
                    id="post_text_area"
                    placeholder="What’s happening"
                    className='w-[24rem] h-6 mt-1 bg-transparent focus:outline-none resize-none'
                    onChange={(e) => handleChange(e)}
                    ref={textArea}
                />
                <div className='text-primary-blue w-52 flex justify-between items-center mt-12'>
                    <LuImage style={iconStyles} />
                    <MdOutlineGifBox style={iconStyles} />
                    <IoStatsChartSharp style={iconStyles} />
                    <GrEmoji style={iconStyles} />
                    <FaRegCalendarMinus style={iconStyles} />
                </div>
            </div>
        </section>
    )
}

export default CreatePost