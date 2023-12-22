'use client'
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { toggleResponsiveMenu } from "@/redux/features/responsiveMenuSlice";
import TwitterHeader from "@/components/Header/TwitterHeader";
import TwitterBackImage from "../../../../../public/assets/img/twitter-profile-background-img.png";
import Image from "next/image";
import Link from 'next/link';
import Post from "@/components/PostsSection/Post/Post";
import UserImage from "@/components/UserImage";
import { CiLocationOn } from "react-icons/ci";
import { CiLink } from "react-icons/ci";
import Loader from "@/components/Loaders/Loader";

function Page() {
    const responsiveMenu = useAppSelector(state => state.responsiveMenu);
    const user = useAppSelector(state => state.userReducer.user);
    const isLoading = useAppSelector(state => state.userReducer.isLoading);
    const dispatch = useAppDispatch();

    return (
        <>
            <TwitterHeader section='Profile' />
            <section className={`w-full mt-14 sm:mt-0 ${responsiveMenu && `cursor-pointer opacity-50`}`} onClick={() => responsiveMenu && dispatch(toggleResponsiveMenu())}>
                <Image
                    src={TwitterBackImage}
                    width={900}
                    height={285}
                    alt="Twitter background image"
                    className="w-full"
                />
                <div className='w-full flex justify-between items-center flex-row flex-nowrap'>
                    <div className='relative ml-6 sm:ml-10 bottom-8 sm:mb-16 w-20 h-20 sm:scale-150 border-white dark:border-black border-[5px] rounded-full flex justify-center items-center'>
                        <UserImage
                            src=""
                            username={user?.name}
                            className='w-full h-full'
                        />
                    </div>
                    <button className='btn-edit px-3 sm:px-4 py-2 mr-5 sm:mr-6 mb-6 sm:mb-20'>
                        <Link href='./edit' className='no-underline'>Edit profile</Link>
                    </button>
                </div>
                <div className='ml-6 mt-[-1.5rem] sm:mt-[-3.75rem]'>
                    <h3 className='font-primary-title-bold'>{user?.name}</h3>
                    <p className='font-gray-text mb-4'>@{user?.username}</p>
                    <p className='w-10/12 mb-4'>{user?.bio || "Bio description"}</p>
                    <div className='w-full mb-4 flex justify-start items-center flex-row flex-wrap gap-1'>
                        <CiLocationOn style={{ fontSize: "1.5rem" }} />
                        <p className='font-gray-text mr-2'>{user?.country}</p>
                        <CiLink style={{ fontSize: "1.5rem" }} />
                        <Link
                            href={user?.web_page.url || `#`}
                            className='font-gray-text'
                        >{user?.web_page.name || "nice_web_page"}
                        </Link>
                    </div>
                    <div className='mt-4 mb-7 w-52 flex'>
                        <p className='mr-1'>{user?.followers}</p>
                        <p className='font-gray-text mr-2'>Followers</p>
                        <p className='mr-1'>{user?.following}</p>
                        <p className='font-gray-text'>Following</p>
                    </div>
                </div>
                <hr className='w-full border-primary' />
                {user?.posts.map((post) => {
                    return (
                        <Post
                            key={post.id}
                            postContent={post}
                            onLoad={() => { }}
                        />
                    )
                })}
                {
                isLoading && 
                <div className='w-full pt-6 flex justify-center items-center'>
                    <Loader className='w-12 h-12' />
                </div>
                }
            </section>
        </>
    )
}

export default Page