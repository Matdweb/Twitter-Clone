'use client'
import { useAppSelector } from "@/redux/hook";
import Image from "next/image";
import { useEffect, useState } from "react";
import Loader from "./Loaders/Loader";
import requestUserProfileImage from "@/lib/mongoDB/requestUserProfileImage";

type Props = React.ComponentProps<"img"> & {
    username?: string,
    src?: string,
    userId?: string
};

function UserImage({ className, src, username = "Unauthenticated", userId, onClick }: Props) {
    const user = useAppSelector(state => state.userReducer.user);
    const [imgSrc, setImgSrc] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const handleRequestUserProfileImage = async () => {
        const userImageSrc = await requestUserProfileImage(userId || "");
        return userImageSrc?.thumbnailUrl || userImageSrc?.url;
    }

    useEffect(() => {
        const handleImageSrcUpdate = async () => {
            if (src) {
                setImgSrc(src);
            } else if (username === user?.name) {
                setImgSrc(user?.profileImage.thumbnailUrl || user?.profileImage.url);
            } else {
                const fetchedUserImage = await handleRequestUserProfileImage();
                if (fetchedUserImage) {
                    setImgSrc(fetchedUserImage);
                }
            }
        }
        handleImageSrcUpdate()

    }, [src, user, username, userId])

    if (imgSrc) {
        return (
            <div onClick={onClick} className={`${className} min-w-[2.5rem] min-h-[2.5rem]`}>
                {
                    isLoading &&
                    <div className='w-full h-full bg-white dark:bg-black flex justify-center items-center rounded-full'>
                        <Loader className='w-12 h-12' />
                    </div>
                }
                <Image
                    src={imgSrc}
                    width={500}
                    height={500}
                    alt="profile-image"
                    className={`${isLoading && `scale-0 absolute`} ${className} min-w-[2.5rem] min-h-[2.5rem] rounded-full`}
                    onLoad={() => setIsLoading(false)}
                />
            </div>
        )
    } else {
        const firstLetter = username.charAt(0).toUpperCase();
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