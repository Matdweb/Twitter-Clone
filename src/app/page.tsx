import { BsTwitter } from 'react-icons/bs';

export default function Home() {
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
        <button className='btn-primary w-40 m-4 ml-0 p-4'>Tweet</button>
        <button className='btn-secondary w-40 m-4 ml-0 p-4'>Follow</button>
        <button className='btn-edit w-40 m-4 ml-0 p-4'>Edit profile</button>
        <BsTwitter size={50} color='#000' /> <p className='text-black'>react-icons</p>
      </section>
    </>
  )
}
