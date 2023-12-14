import { FaRegComment } from "react-icons/fa6";
import { AiOutlineRetweet } from "react-icons/ai";
import { GoHeart } from "react-icons/go";
import { GoHeartFill } from "react-icons/go";
import { RxShare2 } from "react-icons/rx";
import { IoIosStats } from "react-icons/io";

export const bottomPostOptions = [{
    id: 0,
    name: "comments",
    icons: [{
        Icon: FaRegComment,
        style: {
            fontSize: "1rem",
        }
    }],
    clickable: false,
},
{
    id: 1,
    name: "retweets",
    icons: [{
        Icon: AiOutlineRetweet,
        style: {
            fontSize: "1rem",
        }
    },
    {
        Icon: AiOutlineRetweet,
        style: {
            fontSize: "1rem",
            color: "lightgreen"
        }
    }],
    clickable: true,
},
{
    id: 2,
    name: "likes",
    icons: [{
        Icon: GoHeart,
        style: {
            fontSize: "1rem",
        }
    },
    {
        Icon: GoHeartFill,
        style: {
            fontSize: "1rem",
            color: "#EF1C5C"
        }
    }],
    clickable: true,
}, {
    id: 3,
    name: "share",
    icons: [{
        Icon: RxShare2,
        style: {
            fontSize: "1rem",
        }
    }],
    clickable: false,
}, {
    id: 4,
    name: "stats",
    icons: [{
        Icon: IoIosStats,
        style: {
            fontSize: "1rem",
        }
    }],
    clickable: false,
}];