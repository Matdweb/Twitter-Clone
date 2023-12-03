
type Props = React.ComponentProps<"img"> & {
    username?: string
};

function UserImage({ className, username, src = "", onClick }: Props) {
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