'use client'
import { useTheme } from "next-themes"
import { BsFillSunFill, BsFillMoonFill } from 'react-icons/bs'

interface Props {
  className?: string
}

function ModeToggleButton({ className }: Props) {
  const { theme, setTheme } = useTheme();

  const toggleMode = () => {
    if (theme === 'ligth') {
      setTheme("dark")
    } else {
      setTheme("ligth")
    }
  }

  return (
    <div className={className}>
      <h3 className='font-primary-title-bold text-black dark:text-white mb-10'>
        {theme === 'ligth' ? 'Dark' : 'Ligth'} Mode
      </h3>

      <section className='w-full flex justify-center items-center'>
        <div
          className='w-20 h-20 rounded-md shadow-md shadow-black bg-black dark:bg-white dark:shadow-white flex justify-center items-center cursor-pointer'
          onClick={() => toggleMode()}
        >
          {theme === 'ligth' ?
            <BsFillMoonFill style={{ color: "white", fontSize: "2.5em" }} /> :
            <BsFillSunFill style={{ color: "black", fontSize: "2.5em" }} />}
        </div>
      </section>
    </div>
  )
}

export default ModeToggleButton