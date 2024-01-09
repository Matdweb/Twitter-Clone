import { BiHomeCircle } from 'react-icons/bi';
import { BiSolidHomeAlt2 } from 'react-icons/bi';
import { HiHashtag } from 'react-icons/hi2';
import { HiMiniHashtag } from 'react-icons/hi2';
import { BsBell } from 'react-icons/bs';
import { BsBellFill } from 'react-icons/bs';
import { BiMessageAltDetail } from 'react-icons/bi';
import { BiSolidMessageAltDetail } from 'react-icons/bi';
import { BsPerson } from 'react-icons/bs';
import { BsPersonFill } from 'react-icons/bs';
import { CiCircleMore } from 'react-icons/ci';
import { CgMoreO } from 'react-icons/cg';

export const menuOptions = [
    {
        id: 0,
        name: "Home",
        href: '/home',
        icon: {
            ligth: <BiHomeCircle style={{ fontSize: "1.75rem" }} />,
            bold: <BiSolidHomeAlt2 style={{ fontSize: "1.75rem" }} />
        },
        active: false
    },
    {
        id: 1,
        name: "Explore",
        href: '/home/explore',
        icon: {
            ligth: <HiHashtag style={{ fontSize: "1.75rem" }} />,
            bold: <HiMiniHashtag style={{ fontSize: "1.75rem" }} />
        },
        active: false
    },
    {
        id: 2,
        name: "Notifications",
        href: '/home/notifications',
        icon: {
            ligth: <BsBell style={{ fontSize: "1.5rem" }} />,
            bold: <BsBellFill style={{ fontSize: "1.5rem" }} />
        },
        active: false
    },
    {
        id: 3,
        name: "Messages",
        href: '/home/messages',
        icon: {
            ligth: <BiMessageAltDetail style={{ fontSize: "1.75rem" }} />,
            bold: <BiSolidMessageAltDetail style={{ fontSize: "1.75rem" }} />
        },
        active: false
    },
    {
        id: 4,
        name: "Profile",
        href: "/home/user/profile",
        icon: {
            ligth: <BsPerson style={{ fontSize: "1.75rem" }} />,
            bold: <BsPersonFill style={{ fontSize: "1.75rem" }} />
        },
        active: false
    },
    {
        id: 5,
        name: "More",
        href: '/home/more',
        icon: {
            ligth: <CiCircleMore style={{ fontSize: "1.75rem" }} />,
            bold: <CgMoreO style={{ fontSize: "1.75rem" }} />
        },
        active: false
    }
]