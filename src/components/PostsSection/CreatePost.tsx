import UserImage from "../UserImage"
import { LuImage } from "react-icons/lu";
import { MdOutlineGifBox } from "react-icons/md";
import { IoStatsChartSharp } from "react-icons/io5";
import { GrEmoji } from "react-icons/gr";
import { FaRegCalendarMinus } from "react-icons/fa";

function CreatePost() {
    return (
        <div className='w-full h-40 p-5 flex justify-start items-center flex-row flex-nowrap outline outline-[red]'>
            <div className='w-8 h-full flex justify-center items-start'>
                <UserImage />
            </div>
            <div className='h-full ml-4 flex justify-center items-start flex-col flex-nowrap'>
                <textarea name="post_text" id="post_text_area" placeholder="What’s happening" className='max-w-[24rem] min-h-[4.5rem]'>
                </textarea>
                <div className='text-primary-blue w-52 flex justify-between items-center mt-4'>
                    <LuImage style={{fontSize: "1.5rem"}} />
                    <MdOutlineGifBox style={{fontSize: "1.5rem"}} />
                    <IoStatsChartSharp style={{fontSize: "1.5rem"}} />
                    <GrEmoji style={{fontSize: "1.5rem"}} />
                    <FaRegCalendarMinus style={{fontSize: "1.5rem"}} />
                </div>
            </div>
        </div>
    )
}

export default CreatePost