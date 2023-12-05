'use client'
import React, { useState } from 'react';
import TwitterHeader from '@/components/Header/TwitterHeader';
import FormInput from '@/components/Form/FormInput';
import { useAppSelector } from '@/redux/hook';
import { BiObjectsHorizontalCenter } from 'react-icons/bi';

function Page() {

    const responsiveMenu = useAppSelector(state => state.responsiveMenu);
    const user = useAppSelector(state => state.userReducer.user);

    const [name, setName] = useState<string>(user?.name || '');
    const [username, setUsername] = useState<string>(user?.username || '');
    const [country, setCountry] = useState<string>(user?.country || '');
    const [bio, setBio] = useState<string>(user?.bio || '');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

    }

    return (
        <>
            <TwitterHeader section='Edit Profile' />
            <form onSubmit={handleSubmit} className='w-full h-full mt-14 sm:mt-5 flex justify-center items-center flex-col'>
                <div className='flex justify-center items-start flex-col'>
                    <label htmlFor="username" className='pb-2'>
                        <p>User Image</p>
                    </label>
                    <FormInput
                        type="file"
                        id='username'
                        autoComplete="username"
                        className='w-full sm:w-[19rem]'
                    />
                </div>
                <div className='flex justify-center items-start flex-col'>
                    <label htmlFor="username" className='pb-2'>
                        <p>Email:</p>
                    </label>
                    <FormInput
                        type="email"
                        value={user?.email || ""}
                        placeholder='Email address'
                        readOnly
                        autoComplete="email"
                        disabled
                        className='w-full sm:w-[19rem]'
                        style={{ padding: '0.7rem' }}
                    />
                </div>
                <div className='flex justify-center items-start flex-col'>
                    <label htmlFor="username" className='pb-2'>
                        <p>Password:</p>
                    </label>
                    <FormInput
                        type="password"
                        value={'12345'}
                        placeholder='Password'
                        readOnly
                        minLength={5}
                        autoComplete="current-password"
                        disabled
                        className='w-full sm:w-[19rem]'
                        style={{ padding: '0.7rem' }}
                    />
                </div>
                <div className='flex justify-center items-start flex-col'>
                    <label htmlFor="username" className='pb-2'>
                        <p>Name:</p>
                    </label>
                    <FormInput
                        type="text"
                        value={name}
                        placeholder='Full Name'
                        onChange={(e) => setName(e.target.value)}
                        required
                        autoComplete="username"
                        className='w-full sm:w-[19rem]'
                        style={{ padding: '0.7rem' }}
                    />
                </div>
                <div className='flex justify-center items-start flex-col'>
                    <label htmlFor="username" className='pb-2'>
                        <p>Username:</p>
                    </label>
                    <FormInput
                        type="text"
                        value={username}
                        placeholder='Username'
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        autoComplete="username"
                        className='w-full sm:w-[19rem]'
                        style={{ padding: '0.7rem' }}
                    />
                </div>
                <div className='flex justify-center items-start flex-col'>
                    <label htmlFor="username" className='pb-2'>
                        <p>Country:</p>
                    </label>
                    <FormInput
                        type="text"
                        value={country}
                        placeholder='Country'
                        onChange={(e) => setCountry(e.target.value)}
                        required
                        autoComplete="country"
                        className='w-full sm:w-[19rem]'
                        style={{ padding: '0.7rem' }}
                    />
                </div>
                <div className='flex justify-center items-start flex-col pb-2'>
                    <label htmlFor="username" className='pb-2'>
                        <p>Bio:</p>
                    </label>
                    <FormInput
                        type="text"
                        value={bio}
                        placeholder='Bio Description'
                        onChange={(e) => setBio(e.target.value)}
                        required
                        autoComplete="Bio Description"
                        className='w-full sm:w-[19rem]'
                        style={{ padding: '0.7rem' }}
                    />
                </div>
                <button type="submit" className='btn-edit w-full sm:w-[19rem] py-3 mt-6 mb-1'>
                    <h3 className='font-primary-title-bold text-white'>Save Changes</h3>
                </button>
            </form>

        </>
    )
}

export default Page