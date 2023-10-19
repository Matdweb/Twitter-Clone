import Image from 'next/image'

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
      
    </>
  )
}
