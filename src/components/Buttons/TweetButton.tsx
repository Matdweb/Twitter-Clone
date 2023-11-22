'use client'
import { useAppSelector } from '@/redux/hook';
import { TbPencilPlus } from 'react-icons/tb';

type ButtonProps = React.ComponentProps<"button">;

function TweetButton({ className }: ButtonProps) {
    const windowWidth = useAppSelector(state => state.windowWidth);
    const responsiveMenu = useAppSelector(state => state.responsiveMenu);

    return (
        <button className={`btn-primary mt-4 p-4 flex justify-center items-center text-white dark:text-white ${className}`}>
            {windowWidth > 1024 || responsiveMenu ?
                'Tweet' :
                <TbPencilPlus style={{ fontSize: "1rem" }} />}
        </button>
    )
}

export default TweetButton