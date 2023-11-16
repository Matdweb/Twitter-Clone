import { MdOutlineMoreHoriz } from 'react-icons/md';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { toggleResponsiveMenu } from '@/redux/features/responsiveMenuSlice';

function UserAccout() {
    const windowWidth = useAppSelector(state => state.windowWidth);
    const responsiveMenu = useAppSelector(state => state.responsiveMenu);
    const dispatch = useAppDispatch();

    return (
        <>
            <div
                className={`rounded-full mt-3 cursor-pointer ${windowWidth > 1024 ? `w-60 p-3 hover:bg-primary-gray dark:hover:bg-primary-dark-gray` : `w-full`} flex ${responsiveMenu ? `justify-start items-start flex-col pl-3` : `justify-between items-center flex-row`}`}
                onClick={responsiveMenu ? () => dispatch(toggleResponsiveMenu()) : () => { }}
            >
                {
                    windowWidth > 1024 || responsiveMenu ?
                        <>
                            <div className={`flex justify-start flex-nowrap ${responsiveMenu ? `items-start flex-col` : `items-center flex-row`}`}>
                                <img
                                    src="https://pbs.twimg.com/profile_images/1546362031854559232/_vKO9a8v_400x400.jpg"
                                    alt="profile-image"
                                    className='w-12 h-12 rounded-full mr-2 mb-1'
                                />
                                <div className='mt-1 flex justify-center items-start flex-col flex-nowrap'>
                                    <p className='font-bold'>Mat.dweb</p>
                                    <p className='font-gray-text'>@MatDweb28</p>
                                </div>
                            </div>
                            {!responsiveMenu && <MdOutlineMoreHoriz style={{ marginRight: ".5rem", marginLeft: ".5rem" }} />}
                        </>
                        :
                        <img
                            src="https://pbs.twimg.com/profile_images/1546362031854559232/_vKO9a8v_400x400.jpg"
                            alt="profile-image"
                            className='w-full rounded-full'
                        />
                }
                {responsiveMenu &&
                    <div className='mt-4 w-52 flex'>
                        <p className='mr-1'>212</p>
                        <p className='font-gray-text mr-2'>Followers</p>
                        <p className='mr-1'>189</p>
                        <p className='font-gray-text'>Following</p>
                    </div>}
            </div>
        </>
    )
}

export default UserAccout