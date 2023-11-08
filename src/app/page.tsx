'use client'
import { useEffect } from "react";
import { useSession } from "next-auth/react"
import { useAppDispatch, useAppSelector } from '@/redux/hook'
import { increment, decrement } from '@/redux/features/counterSlice';
import { fecthPosts } from '@/redux/features/postsSlice'
import Image from "next/image";
import Link from "next/link";
import { signOut } from "next-auth/react";

export default function Home() {
  const isLoading = useAppSelector(state => state.postsReducer.isLoading);
  const error = useAppSelector(state => state.postsReducer.error);
  const posts = useAppSelector(state => state.postsReducer.posts);

  const { data: session } = useSession()

  const counter = useAppSelector(state => state.counterReducer.counter);
  const dispatch = useAppDispatch();

  const handleRequest = () => {
    //fetchPost uses the lastPostId to fecth the missing posts from that point
    const lastPostId = posts.length > 0 ? posts[posts.length - 1].id : 0;
    dispatch(fecthPosts(lastPostId));
  }

  useEffect(() => {
    console.log("session: ", session);
  }, [session])

  useEffect(() => {
    console.log(posts)
  }, [posts])

  return (
    <>
      {/* <section className='p-16'>
        <h1 className='font-big-title'>font-big-title</h1>
        <h2 className='font-primary-title-roboto'>font-primary-title-roboto</h2>
        <h3 className='font-primary-title-bold'>font-primary-title-bold: Bobur</h3>
        <p className='font-gray-text'>@bobur_mavlonov</p>
        <p className='font-primary-text'>font-primary-text: Home</p>
        <p>secondary text:
          <br />
          4-kursni tugatgunimcha kamida bitta biznesim bo&apos;lishini, uylanish uchun moddiy jihatdan to&apos;la-to&apos;kis tayyor bo&apos;lishni, sog&apos;lik va jismoniy holatni normallashtirishni reja qildim
        </p>
      </section> */}
      <section className='p-16 pt-4 bg-white'>
        <h3 className='font-primary-title-bold text-black'>Counter: {counter}</h3>
        <button onClick={() => dispatch(increment())} className='btn-primary m-4 ml-0 p-4'>Increment</button>
        <button onClick={() => dispatch(decrement())} className='btn-secondary m-4 ml-0 p-4'>Decrement</button>
        <button className='btn-edit p-4 m-4 ml-0' onClick={() => handleRequest()}>Request Posts</button>
        <Link className="text-black" href='auth/login'>Log In Page</Link><br />
        <Link className="text-black" href='auth/register'>Register Page</Link>
      </section>
      {session ? <p className="cursor-pointer" onClick={()=> signOut()}>{session?.user?.name} / Sign Out</p>: ''}
      <section>
        {posts?.map((post) => {
          return (
            <article key={post.id} className='flex flex-col p-8'>
              <p>{post.id}</p>
              <h3 className='font-primary-title-bold'>{post.title}</h3>
              <p>{post.body}</p>
              <Image src={post.imageURL || ""} width={500} height={300} alt="post-image" />
            </article>
          )
        })}
        {isLoading ? <p>Loading ...</p> : ''}
        {error ? <p>There was an loading the posts :(</p> : ''}

      </section>
    </>
  )
}
