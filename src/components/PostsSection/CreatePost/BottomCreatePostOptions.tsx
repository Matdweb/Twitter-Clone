import { LuImage } from "react-icons/lu";
import { MdOutlineGifBox } from "react-icons/md";
import { IoStatsChartSharp } from "react-icons/io5";
import { GrEmoji } from "react-icons/gr";
import { FaRegCalendarMinus } from "react-icons/fa";

export const bottomCreatePostOptions = [{
    id: 0,
    htmlfor: "postImage",
    Icon: LuImage,
    style: {
        fontSize: "1.5rem",
        cursor: " pointer",
    },
    aria: "Upload Image",
},
{
    id: 1,
    htmlfor: "",
    Icon: MdOutlineGifBox,
    style: {
        fontSize: "1.5rem",
        cursor: " pointer",
    },
    aria: "Upload gif",
},
{
    id: 2,
    htmlfor: "",
    Icon: IoStatsChartSharp,
    style: {
        fontSize: "1.5rem",
        cursor: " pointer",
    },
    aria: "See stats",
}, {
    id: 3,
    htmlfor: "",
    Icon: GrEmoji,
    style: {
        fontSize: "1.5rem",
        cursor: " pointer",
    },
    aria: "Use emojis",
}, {
    id: 4,
    htmlfor: "",
    Icon: FaRegCalendarMinus,
    style: {
        fontSize: "1.5rem",
        cursor: " pointer",
    },
    aria: "Calendar",
}];