import { IoSettingsOutline } from "react-icons/io5";
import Link from "next/link";

function PopularTrends() {
    const trends = [
        {
            country: "Germany",
            type: "Revolution",
            numTweets: "50.4K"
        },
        {
            country: "Costa Rica",
            type: "Revolution",
            numTweets: "32.1K"
        },
        {
            country: "El Salvador",
            type: "Revolution",
            numTweets: "65.9K"
        }
    ];

    return (
        <div className='bg-primary-gray dark:bg-primary-dark-gray rounded-lg px-4 py-5 pb-6'>
            <div className='w-full flex justify-between items-center flex-row flex-nowrap pb-5'>
                <h3 className='font-primary-title-bold'>Trends for you</h3>
                <IoSettingsOutline style={{ fontSize: "1.5rem", color: "theme(colors.white)" }} />
            </div>
            {trends?.map(({ country, type, numTweets }) => {
                return (
                    <div className='w-full flex justify-center items-start flex-col flex-nowrap mb-2'>
                        <p className='font-gray-text'>Trending in {country}</p>
                        <p className='font-primary-text'>{type}</p>
                        <p className='font-gray-text'>{numTweets} Tweets</p>
                    </div>
                )
            })}
            <Link href="#" className='pt-5 text-primary-blue dark:text-primary-blue'>Show More</Link>
        </div>
    )
}

export default PopularTrends