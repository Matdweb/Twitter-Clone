
type Props = React.ComponentProps<"img">;

function UserImage({ className, onClick }: Props) {
    return (
        <img
            src="https://pbs.twimg.com/profile_images/1546362031854559232/_vKO9a8v_400x400.jpg"
            alt="profile-image"
            className={`${className} rounded-full`}
            onClick={onClick}
        />
    )
}

export default UserImage