'use client'
import { useState } from "react"
import { signIn } from "next-auth/react"
import Link from "next/link"
import ModeToggleButton from "@/components/ModeToggleButton"
import { BsTwitter } from 'react-icons/bs'
import Input from "@/components/Input"

function LogInPage() {

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [passwordError, setPasswordError] = useState<boolean>(false);
    const [emailError, setEmailError] = useState<boolean>(false);

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(email, password);
        await authenticateUser();
    }

    const authenticateUser = async () => {
        try {
            const response = await fetch('../api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const { status, statusText, email: responseEmail, password: responsePassword  } = await response.json();
            console.log(status);

            if (status === 201) {
                signIn('credentials', {
                    email,
                    password,
                    callbackUrl: '/'
                })
                console.log("succesfull")
            } else {
                setEmailError(!responseEmail);
                setPasswordError(!responsePassword);
                setError(statusText);
            }

        } catch (e) {
            console.log(e)
        }
    }

    return (<>
        <section className='w-full min-h-screen flex justify-start items-center flex-col flex-nowrap bg-white dark:bg-black' >
            <form onSubmit={onSubmit} className='w-full sm:w-[30rem] p-4 sm:p-3 pt-0 flex justify-start items-start flex-col flex-nowrap mt-14 text-black dark:text-white'>
                <BsTwitter style={{ color: "#1D9BF0", fontSize: "3.2rem" }} />
                <h2 className='font-primary-title-roboto my-8 text-black dark:text-white'>Log in to Twitter</h2>
                {emailError ? <p className='w-full text-primary-red dark:text-primary-red my-2'>{error}</p> : ''}
                <Input
                    type="email"
                    value={email}
                    placeholder='Phone number, email address'
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                    error={emailError}
                />
                {passwordError ? <p className='w-full text-primary-red dark:text-primary-red my-2'>{error}</p> : ''}
                <Input
                    type="password"
                    value={password}
                    placeholder='Password'
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                    error={passwordError}
                />
                <button type="submit" className='btn-primary w-full py-5 mb-10'>
                    <h3 className='font-primary-title-bold text-white'>Log in</h3>
                </button>
                <div className='w-full flex justify-between items-center'>
                    <Link href="#" className='text-primary-blue dark:text-primary-blue'>Forgot password?</Link>
                    <Link href="../auth/register" className='text-primary-blue dark:text-primary-blue'>Sign up to Twitter</Link>
                </div>
            </form>
        </section>

        <ModeToggleButton className='absolute scale-75 bottom-0 right-0 m-8' />
    </>)
}

export default LogInPage