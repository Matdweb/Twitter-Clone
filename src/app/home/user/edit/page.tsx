'use client'
import React, { useState } from 'react';
import TwitterHeader from '@/components/Header/TwitterHeader';
import FormInput from '@/components/Form/FormInput';
import { useAppSelector, useAppDispatch } from '@/redux/hook';
import Link from 'next/dist/client/link';
import { useRouter } from 'next/navigation';
import { fetchUser } from '@/redux/features/userSlice';
import { toggleResponsiveMenu } from '@/redux/features/responsiveMenuSlice';
import updateUser from '@/lib/mongoDB/updateUser';
import { useEdgeStore } from '@/lib/edgestore/EdgeStoreProvider';
import { SingleImageDropzone } from '@/components/edgestore/SingleImageDropzone';
import UserImage from '@/components/UserImage';

function Page() {

    const responsiveMenu = useAppSelector(state => state.responsiveMenu);
    const user = useAppSelector(state => state.userReducer.user);
    const dispatch = useAppDispatch();

    const rounter = useRouter();

    const [name, setName] = useState<string>(user?.name || '');
    const [username, setUsername] = useState<string>(user?.username || '');
    const [country, setCountry] = useState<string>(user?.country || '');
    const [bio, setBio] = useState<string>(user?.bio || '');
    const [error, setError] = useState<string>('');

    const [file, setFile] = useState<File>();
    const [urls, setUrls] = useState<{
        url: string,
        thumbnailUrl: string
    }>({
        url: "",
        thumbnailUrl: ""
    });

    const { edgestore } = useEdgeStore();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await handleUploadImage();
        await handleUpdateUser();
    }

    const handleUploadImage = async () => {
        if (file) {
            const res = await edgestore.publicImages.upload({ file });
            setUrls({
                url: res.url,
                thumbnailUrl: res.thumbnailUrl || ""
            });
        }
    }

    const handleUpdateUser = async () => {
        const email = user?.email || "";

        console.log(urls);
        const { status, statusText } = await updateUser({
            name,
            username,
            email,
            country,
            bio,
            profileImage: urls
        });

        if (status !== 201) {
            setError(statusText);
        } else {
            dispatch(fetchUser(email));
            rounter.push('/home/user/profile')
        }
    }


    const InputStyles = {
        padding: '0.7rem'
    };

    return (
        <>
            <TwitterHeader section='Edit Profile' />
            <section className={`w-full mt-14 sm:mt-5 ${responsiveMenu && `cursor-pointer opacity-50`}`} onClick={() => responsiveMenu && dispatch(toggleResponsiveMenu())}>
                <form onSubmit={handleSubmit} className='p-10 sm:p-0 w-full h-full flex justify-center items-center flex-col'>
                    <Link href="/home/user/profile" className=' place-self-start sm:ml-5 mb-4 underline'>
                        <p>Back</p>
                    </Link>
                    <div className='w-full sm:w-[19rem] flex justify-center items-center flex-col pb-3'>
                        <label htmlFor="userImage" className='pb-2'>
                            <p>User Image:</p>
                        </label>

                        {
                            user?.profileImage.url &&
                            <UserImage className=" w-20 h-20 m-2" />
                        }

                        <SingleImageDropzone
                            id="userImage"
                            width={200}
                            height={200}
                            value={file}
                            onChange={(file) => {
                                setFile(file);
                            }}
                        />
                        {}
                    </div>

                    <div className='w-full sm:w-[19rem] flex justify-center items-start flex-col'>
                        <label htmlFor="email" className='pb-2'>
                            <p>Email:</p>
                        </label>
                        <FormInput
                            id="email"
                            type="email"
                            value={user?.email || ""}
                            placeholder='Email address'
                            readOnly
                            autoComplete="email"
                            disabled
                            style={InputStyles}
                        />
                    </div>
                    <div className='w-full sm:w-[19rem] flex justify-center items-start flex-col'>
                        <label htmlFor="password" className='pb-2'>
                            <p>Password:</p>
                        </label>
                        <FormInput
                            id='password'
                            type="password"
                            value={'12345'}
                            placeholder='Password'
                            readOnly
                            minLength={5}
                            autoComplete="current-password"
                            disabled
                            style={InputStyles}
                        />
                    </div>
                    <div className='w-full sm:w-[19rem] flex justify-center items-start flex-col'>
                        <label htmlFor="name" className='pb-2'>
                            <p>Name:</p>
                        </label>
                        <FormInput
                            id='name'
                            type="text"
                            value={name}
                            placeholder='Full Name'
                            onChange={(e) => setName(e.target.value)}
                            required
                            autoComplete="username"
                            style={InputStyles}
                        />
                    </div>
                    <div className='w-full sm:w-[19rem] flex justify-center items-start flex-col'>
                        <label htmlFor="username" className='pb-2'>
                            <p>Username:</p>
                        </label>
                        <FormInput
                            id='username'
                            type="text"
                            value={username}
                            placeholder='Username'
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            autoComplete="username"
                            style={InputStyles}
                        />
                    </div>
                    <div className='w-full sm:w-[19rem] flex justify-center items-start flex-col'>
                        <label htmlFor="country" className='pb-2'>
                            <p>Country:</p>
                        </label>
                        <FormInput
                            id='country'
                            type="text"
                            value={country}
                            placeholder='Country'
                            onChange={(e) => setCountry(e.target.value)}
                            required
                            autoComplete="country"
                            style={InputStyles}
                        />
                    </div>
                    <div className='w-full sm:w-[19rem] flex justify-center items-start flex-col pb-2'>
                        <label htmlFor="bio" className='pb-2'>
                            <p>Bio:</p>
                        </label>
                        <FormInput
                            id='bio'
                            type="text"
                            value={bio}
                            placeholder='Bio Description'
                            onChange={(e) => setBio(e.target.value)}
                            autoComplete="Bio Description"
                            style={InputStyles}
                        />
                    </div>
                    <button type="submit" className='btn-edit w-full sm:w-[19rem] py-3 mt-6 mb-1'>
                        <h3 className='font-primary-title-bold'>Save Changes</h3>
                    </button>
                    <p className='py-5 font-gray-text'>{error}</p>
                </form>
            </section>
        </>
    )
}

export default Page