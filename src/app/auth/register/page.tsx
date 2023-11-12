'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Input from '@/components/Input';
import ModeToggleButton from '@/components/ModeToggleButton';
import TwitterIcon from '@/components/TwitterIcon';

function Page() {
    const [name, setName] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [registerWith, setRegisterWith] = useState<string>('email');

    const router = useRouter();

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await registerUser();
    }

    const registerUser = async () => {
        setError("");
        try {
            const response = await fetch('../api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, name, email, password })
            });
            const { status, statusText } = await response.json();

            if (status === 400) {
                setError(statusText);
            } else if (status === 201) {
                router.push('../auth/login');
            }

        } catch (e) {
            console.log(e);
        }
    }

    const handleEmailorPhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (registerWith === 'phoneNumber') {
            if (/^[^a-zA-Z]+$/.test(value)) {
                setError('')
            } else {
                setError('This is not a valid phone-number (only numbers)');
            }
        }
        setEmail(value);
    }

    const toggleRegisterWith = () => {
        if (registerWith === 'email') {
            setRegisterWith('phoneNumber');
        } else {
            setRegisterWith('email')
        }
        setEmail('');
    }

    useEffect(() => {
        if (email.length === 0) {
            setError('');
        }
    }, [email])

    return (<>
        <section className='w-full min-h-screen flex justify-start items-center flex-col flex-nowrap bg-white dark:bg-black'>
            <form onSubmit={onSubmit} className='w-full sm:w-[41rem] p-4 sm:p-3 pt-0 flex justify-start items-start flex-col flex-nowrap mt-6 text-black dark:text-white'>
                <div className='w-full flex justify-center items-center mb-11'>
                    <TwitterIcon fontSize="2.5rem" />
                </div>
                <h2 className='font-primary-title-roboto mb-8 text-black dark:text-white'>Create an account</h2>
                <div className='w-full flex justify-center items-start flex-col flex-nowrap gap-3'>
                    <div className='w-full flex justify-between items-center flex-row flex-wrap'>
                        <Input
                            type="text"
                            value={name}
                            placeholder='Full Name'
                            onChange={(e) => setName(e.target.value)}
                            required
                            autoComplete="username"
                            className='sm:max-w-[19rem] w-full'
                            error={false}
                        />
                        <Input
                            type="text"
                            value={username}
                            placeholder='Username'
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            autoComplete="username"
                            className='sm:max-w-[19rem] w-full'
                            error={false}
                        />
                    </div>
                    {error && <p className='w-full text-primary-red dark:text-primary-red'>{error}</p>}
                    {registerWith === 'email' ?
                        <Input
                            type="email"
                            value={email}
                            placeholder='Email address'
                            onChange={(e) => handleEmailorPhoneChange(e)}
                            required
                            autoComplete="email"
                            error={error}
                        />
                        :
                        <Input
                            type="text"
                            value={email}
                            placeholder='Phone number'
                            onChange={(e) => handleEmailorPhoneChange(e)}
                            required
                            autoComplete="text"
                            error={error}
                        />}
                    <Input
                        type="password"
                        value={password}
                        placeholder='Password'
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength={5}
                        autoComplete="current-password"
                        error={false}
                    />
                    <p
                        className='underline underline-offset-2 cursor-pointer mb-4 text-primary-blue dark:text-primary-blue'
                        onClick={() => toggleRegisterWith()}
                    >
                        Use {registerWith === 'email' ? 'Phone Number' : 'Email'}
                    </p>
                    <button type="submit" className='btn-primary w-full py-5 mb-10'>
                        <h3 className='font-primary-title-bold text-white'>Register</h3>
                    </button>
                </div>
            </form>
        </section>

        <ModeToggleButton className='absolute scale-75 bottom-0 right-0 m-8' />
    </>)
}

export default Page