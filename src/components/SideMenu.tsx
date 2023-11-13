import { useAppSelector } from '@/redux/hook';

interface Props {
    responsiveMenu: boolean,
    toggleResponsiveMenu: () => void
}

function SideMenu({ responsiveMenu, toggleResponsiveMenu }: Props) {
    const windowWidth = useAppSelector(state => state.windowWidth);
    return (
        <section className={`${windowWidth < 640 && !responsiveMenu ? `hidden` : windowWidth < 1024 ? `w-16 p-2` : `w-1/4`} ${responsiveMenu && `min-w-[16rem]`} min-h-screen outline outline-2 outline-black dark:outline-white rounded-md p-1 m-1 shrink`}>
            {
                windowWidth < 1024 && !responsiveMenu ?
                    <h2 className='font-primary-title-roboto'>
                        M<br />
                        e<br />
                        n<br />
                        u<br />
                    </h2>
                    :
                    <h2 className='font-primary-title-roboto'>Menu</h2>
            }
            <p>{windowWidth}</p>
            {
                responsiveMenu && <div className='w-16 h-16 outline outline-2 outline-black dark:outline-white rounded-full cursor-pointer flex justify-center items-center' onClick={() => toggleResponsiveMenu()}>
                    Off
                </div>
            }
        </section>
    )
}

export default SideMenu