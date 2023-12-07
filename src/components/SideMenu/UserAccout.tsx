import { MdOutlineMoreHoriz } from 'react-icons/md';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { toggleResponsiveMenu } from '@/redux/features/responsiveMenuSlice';
import UserImage from '../UserImage';

function UserAccout() {
    const windowWidth = useAppSelector(state => state.windowWidth);
    const responsiveMenu = useAppSelector(state => state.responsiveMenu);
    const user = useAppSelector(state => state.userReducer.user);
    const userIsLoading = useAppSelector(state => state.userReducer.isLoading);
    const userError = useAppSelector(state => state.userReducer.error);
    const dispatch = useAppDispatch();

    return (
        <>
            <div
                className={`rounded-full mt-3 cursor-pointer w-full lg:w-60 lg:p-3 lg:hover:bg-primary-gray lg:dark:hover:bg-primary-dark-gray flex ${responsiveMenu ? `justify-start items-start flex-col pl-3` : `justify-between items-center flex-row`}`}
                onClick={responsiveMenu ? () => dispatch(toggleResponsiveMenu()) : () => { }}
            >
                {
                    windowWidth > 1024 || responsiveMenu ?
                        <>
                            <div className={`flex justify-start flex-nowrap ${responsiveMenu ? `items-start flex-col` : `items-center flex-row`}`}>
                                <UserImage
                                    username={user?.name}
                                    className='w-12 h-12 mr-2 mb-1'
                                />

                                <div className='mt-1 flex justify-center items-start flex-col flex-nowrap'>
                                    <p className='font-bold'>
                                        {/* if the username is greater than 13 it will render until 13 characters and "..."
                                        If there's no user it renders "Unauthenticated" */}
                                        
                                        {userIsLoading ? "Loading..." :
                                            user ?
                                                user.name.length > 13 ? user.name.slice(0, 13) + "..." : user.name
                                                :
                                                "Unauthenticated"
                                        }
                                    </p>
                                    <p className='font-gray-text'>@{userIsLoading ? "..." : user?.username}</p>
                                </div>
                            </div>
                            {!responsiveMenu && <MdOutlineMoreHoriz style={{ marginRight: ".5rem", marginLeft: ".5rem" }} />}
                        </>
                        :
                        <UserImage
                            username={user?.name}
                            className='w-12 h-12'
                        />
                }
                {responsiveMenu &&
                    <div className='mt-4 w-52 flex'>
                        <p className='mr-1'>{user?.followers}</p>
                        <p className='font-gray-text mr-2'>Followers</p>
                        <p className='mr-1'>{user?.following}</p>
                        <p className='font-gray-text'>Following</p>
                    </div>}
            </div>
        </>
    )
}

export default UserAccout