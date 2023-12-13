'use client'
import { useState } from "react"
import { signIn } from "next-auth/react"
import Link from "next/link"
import ModeToggleButton from "@/components/Buttons/ModeToggleButton"
import FormInput from "@/components/Form/FormInput"
import TwitterIcon from "@/components/TwitterIcon";
import Loader from "@/components/Loaders/Loader"

function LogInPage() {

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [passwordError, setPasswordError] = useState<boolean>(false);
    const [emailError, setEmailError] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        setIsLoading(true);
        setEmailError(false);
        setPasswordError(false);
        e.preventDefault();
        await authenticateUser();
        setIsLoading(false);
    }

    const authenticateUser = async () => {
        try {
            const response = await fetch('../api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const { status, statusText, email: responseEmail, password: responsePassword } = await response.json();

            if (status === 201) {
                signIn('credentials', {
                    email,
                    password,
                    callbackUrl: '/'
                })
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
                <TwitterIcon />
                <h2 className='font-primary-title-roboto my-8 text-black dark:text-white'>Log in to Twitter</h2>
                {emailError && <p className='w-full text-primary-red dark:text-primary-red my-2'>{error}</p>}
                <FormInput
                    type="text"
                    value={email}
                    placeholder='Phone number, email address'
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                    error={emailError}
                />
                {passwordError && <p className='w-full text-primary-red dark:text-primary-red my-2'>{error}</p>}
                <FormInput
                    type="password"
                    value={password}
                    placeholder='Password'
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                    error={passwordError}
                />
                <button type="submit" className='btn-primary w-full py-5 mb-10'>
                    {
                        isLoading ?
                            <div className='w-full flex justify-center items-center'>
                                <Loader className='w-10 h-10' />
                            </div>
                            :
                            <h3 className='font-primary-title-bold text-white'>Log in</h3>
                    }

                </button>
                <div className='w-full flex justify-between items-center text-primary-blue dark:text-primary-blue'>
                    <Link href="#" className=''>Forgot password?</Link>
                    <Link href="../auth/register" className=''>Sign up to Twitter</Link>
                </div>
            </form>
        </section>

        <ModeToggleButton className='absolute scale-75 bottom-0 right-0 m-8' />
    </>)
}

export default LogInPage