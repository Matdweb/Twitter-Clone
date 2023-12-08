'use client'
import { useAppSelector } from "@/redux/hook";

type Props = React.ComponentProps<"img"> & {
    username?: string
};

function UserImage({ className, username, onClick }: Props) {
    const user = useAppSelector(state => state.userReducer.user);
    const src = user?.profileImage.thumbnailUrl || user?.profileImage.url;

    if (src) {
        return (
            <img
                src={src}
                alt="profile-image"
                className={`${className} rounded-full`}
                onClick={onClick}
            />
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