'use client'
import { useAppDispatch, useAppSelector } from '@/redux/hook'
import { increment, decrement } from '@/redux/features/counterSlice';

export default function Home() {
  const counter = useAppSelector(state => state.counterReducer.counter);
  const dispatch = useAppDispatch();

  return (
    <>
      <section className='p-16'>
        <h1 className='font-big-title'>font-big-title</h1>
        <h2 className='font-primary-title-roboto'>font-primary-title-roboto</h2>
        <h3 className='font-primary-title-bold'>font-primary-title-bold: Bobur</h3>
        <p className='font-gray-text'>@bobur_mavlonov</p>
        <p className='font-primary-text'>font-primary-text: Home</p>
        <p>secondary text:
          <br />
          4-kursni tugatgunimcha kamida bitta biznesim bo'lishini, uylanish uchun moddiy jihatdan to'la-to'kis tayyor bo'lishni, sog'lik va jismoniy holatni normallashtirishni reja qildim
        </p>
      </section>
      <section className='p-16 pt-4 bg-white'>
      <h3 className='font-primary-title-bold text-black'>Counter: {counter}</h3>
        <button onClick={()=> dispatch(increment())} className='btn-primary m-4 ml-0 p-4'>Increment</button>
        <button onClick={()=> dispatch(decrement())} className='btn-secondary m-4 ml-0 p-4'>Decrement</button>
      </section>
    </>
  )
}
