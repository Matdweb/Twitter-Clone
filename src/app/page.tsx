'use client'
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { useSession } from "next-auth/react";
import { fetchUser } from "@/redux/features/userSlice";
import Image from "next/image";
import twitterBackImage from '../../public/assets/img/twitter-background-img.png';
import Link from "next/link";
import TwitterIcon from "@/components/TwitterIcon";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import Loader from "@/components/Loaders/Loader";

export default function Home() {
  const user = useAppSelector(state => state.userReducer.user);
  const isLoading = useAppSelector(state => state.userReducer.isLoading);
  const { data: session } = useSession()
  const dispatch = useAppDispatch();
  const router = useRouter();

  const bottomMenuOptions = ['About', 'Help Center', 'Terms of Service', 'Privacy Policy', 'Cookie Policy', 'Ads info', 'Blog', 'Status', 'Carrers', 'Brand Resources', 'Advertsing', 'Marketing', 'Twitter for Business', 'Developers', 'Directory', 'Settings', '© 2021 Twitter, Inc.'];

  useEffect(() => {
    if (session?.user) {
      dispatch(fetchUser(session?.user?.email || ""));
      router.push('/home');
    }
  }, [session]);

  return (
    <>
      <section className='w-screen h-screen min-h-full flex justify-center items-start flex-row flex-wrap'>
        <div className='w-1/2 h-[95%] hidden md:flex justify-center items-center'>
          <Image
            src={twitterBackImage}
            width={500}
            height={500}
            className='w-full h-full flex object-cover'
            alt='twitter-background-Image'
          />
        </div>
        <div className='w-full md:w-1/2 h-[95%] flex justify-start items-center'>
          <div className='w-full flex justify-center items-start flex-col flex-wrap ml-11'>
            <TwitterIcon />
            <h1 className='font-big-title mt-14'>Happening now</h1>
            <h2 className='font-primary-title-roboto mt-6 sm:mt-11 w-full'>Join Twitter today</h2>

            <div className='w-64 sm:w-[25rem] py-5 mt-8 mb-44 flex justify-center items-center border border-primary-drak-gray dark:border-primary-gray rounded-full hover:scale-95 transition-all'>
              {
                isLoading ?
                  <div className='w-full flex justify-center items-center'>
                    <Loader className='w-10 h-10' />
                  </div>
                  :
                  <Link href='auth/register' className='font-roboto text-lg sm:text-xl font-medium'>
                    Sign up with phone or email
                  </Link>
              }
            </div>
            <p onClick={() => signOut()} className='cursor-pointer hover:underline'>Sign out</p>

            <div className='max-w-[23rem]'>
              <p className='block mb-5'>
                By singing up you agree to the
                <Link href='#' className='text-primary-blue'> Terms of Service </Link>
                and
                <Link href='#' className='text-primary-blue'> Privacy Policy</Link>
                , including
                <Link href='#' className='text-primary-blue'> Cookie Use</Link>
                .
              </p>

              <p className='block'>
                Already have an account? <Link href='auth/login' className='text-primary-blue'>Log in</Link>
              </p>

            </div>
          </div>
        </div>
        <div className='w-full min-h-[5%] h-min px-7 flex justify-between items-center flex-row flex-wrap'>
          {bottomMenuOptions.map((option, i) => {
            return (
              <Link key={i} href='#' className='p-1'>{option}</Link>
            )
          })}
        </div>
      </section>
    </>
  )
}
