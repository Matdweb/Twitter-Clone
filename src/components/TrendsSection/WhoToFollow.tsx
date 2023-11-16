'use client'
import { useAppSelector } from "@/redux/hook";
import Link from "next/link";

function WhoToFollow() {
    const windowWidth = useAppSelector(state => state.windowWidth);
    const users = [
        {
            id: 0,
            username: "MatDweb",
            name: "Matias Vargas",
            profileImg: "https://pbs.twimg.com/profile_images/1546362031854559232/_vKO9a8v_400x400.jpg"
        },
        {
            id: 1,
            username: "MatDweb",
            name: "Matias Vargas",
            profileImg: "https://pbs.twimg.com/profile_images/1546362031854559232/_vKO9a8v_400x400.jpg"
        }
    ]

    return (
        <div className='mt-5 bg-primary-gray dark:bg-primary-dark-gray rounded-lg px-4 py-5'>
            <h3 className='w-full pb-5 font-primary-title-bold'>You might like</h3>

            {users?.map(({ id, username, name, profileImg }) => {
                return (
                    <div key={id} className={`rounded-full cursor-pointer w-full p-3 pb-6 flex justify-between items-center flex-row`}>
                        <div className='flex justify-start items-center flex-row flex-nowrap'>
                            <img
                                src={profileImg}
                                alt="profile-image"
                                className='w-12 h-12 rounded-full mr-2'
                            />
                            <div className='flex justify-center items-start flex-col flex-nowrap'>
                                <p className='font-bold'>{name}</p>
                                <p className='font-gray-text'>@{username}</p>
                            </div>
                        </div>
                        {
                            windowWidth > 1024 &&
                            <button className='btn-secondary px-4 py-2'>
                                <p className='font-bold text-white dark:text-white'>Follow</p>
                            </button>
                        }
                    </div>
                )
            })}

            <Link href="#" className='pt-5 text-primary-blue dark:text-primary-blue'>Show More</Link>
        </div>
    )
}

export default WhoToFollow