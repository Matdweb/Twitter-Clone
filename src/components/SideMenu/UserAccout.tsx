import { MdOutlineMoreHoriz } from 'react-icons/md';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { toggleResponsiveMenu } from '@/redux/features/responsiveMenuSlice';

function UserAccout() {
    const windowWidth = useAppSelector(state => state.windowWidth);
    const responsiveMenu = useAppSelector(state => state.responsiveMenu);
    const dispatch = useAppDispatch();

    return (
        <div 
        className={`rounded-full cursor-pointer ${windowWidth > 1024 ? `w-60 p-3 mt-3 hover:bg-black/20 dark:hover:bg-white/20` : `w-full`} flex justify-between items-center flex-row`} 
        onClick={responsiveMenu ? ()=> dispatch(toggleResponsiveMenu()) : ()=> {}}
        >
            {
                windowWidth > 1024 || responsiveMenu ?
                    <>
                        <div className='flex justify-start items-center flex-row flex-nowrap'>
                            <img
                                src="https://pbs.twimg.com/profile_images/1546362031854559232/_vKO9a8v_400x400.jpg"
                                alt="profile-image"
                                className='w-12 h-12 rounded-full mr-2'
                            />
                            <div className='flex justify-center items-start flex-col flex-nowrap'>
                                <p className='font-bold'>Mat.dweb</p>
                                <p className='font-gray-text'>@MatDweb28</p>
                            </div>
                        </div>
                        <MdOutlineMoreHoriz style={{ marginRight: ".5rem", marginLeft: ".5rem" }} />
                    </>
                    :
                    <img
                        src="https://pbs.twimg.com/profile_images/1546362031854559232/_vKO9a8v_400x400.jpg"
                        alt="profile-image"
                        className='w-full rounded-full'
                    />
            }
        </div>
    )
}

export default UserAccout