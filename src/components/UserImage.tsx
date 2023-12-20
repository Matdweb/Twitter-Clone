'use client'
import { useAppSelector } from "@/redux/hook";
import Image from "next/image";
import { useEffect, useState } from "react";
import Loader from "./Loaders/Loader";

type Props = React.ComponentProps<"img"> & {
    username?: string,
    src?: string
};

function UserImage({ className, src, username = "Unauthenticated", onClick }: Props) {
    const user = useAppSelector(state => state.userReducer.user);
    const [imgSrc, setImgSrc] = useState<string>("");

    useEffect(() => {
        const update =
            src ? src
                :
                username === user?.name ?
                    user?.profileImage.thumbnailUrl || user?.profileImage.url
                    :
                    "";

        setImgSrc(update);
    }, [src, user])

    const [isLoading, setIsLoading] = useState<boolean>(true);

    if (imgSrc) {
        return (
            <>
                {
                    isLoading &&
                    <div className='w-full h-full bg-white dark:bg-black flex justify-center items-center rounded-full' onClick={onClick}>
                        <Loader className='w-12 h-12' />
                    </div>
                }
                <Image
                    src={imgSrc}
                    width={500}
                    height={500}
                    alt="profile-image"
                    className={`${isLoading && `scale-0 absolute`} ${className} rounded-full`}
                    onClick={onClick}
                    onLoad={() => setIsLoading(false)}
                />
            </>
        )
    } else {
        const firstLetter = username?.charAt(0).toUpperCase();
        return (
            <div
                className={`${className} rounded-full flex justify-center items-center border border-white bg-primary-gray`}
                onClick={onClick}
            >
                <h3 className='font-primary-title-bold text-lg text-black dark:text-black'>{firstLetter || "U"}</h3>
            </div>
        )
    }
}

export default UserImage