'use client'
import { useState } from "react"
import { signIn } from "next-auth/react"
import Link from "next/link"

function LogInPage() {

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');

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
            const { status, statusText } = await response.json();
            console.log(status);

            if (status === 201) {
                signIn('credentials', {
                    email,
                    password,
                    callbackUrl: '/'
                })
                console.log("succesfull")
            } else {
                setError(statusText);
            }

        } catch (e) {
            console.log(e)
        }
    }

    return (
        <form onSubmit={onSubmit} className='p-16'>
            <h2 className='font-primary-title-roboto mb-8'>Log In</h2>

            <div className='flex justify-center items-start flex-col flex-nowrap gap-3'>
                <input
                    type="email"
                    value={email}
                    placeholder='email@example.com'
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                    className={`bg-transparent text-primary-gray border ${error ? `border-[red]` : `border-primary-gray`}  rounded-lg p-2`}
                />
                <input
                    type="password"
                    value={password}
                    placeholder='password'
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                    className={`bg-transparent text-primary-gray border ${error ? `border-[red]` : `border-primary-gray`}  rounded-lg p-2`}
                />
                <button type="submit" className='bg-white text-black p-2 rounded-lg w-20'>Log in</button>
                <Link href='../' className='bg-white text-black p-2 rounded-lg w-20'>Back</Link>
                {error && <p className='font-gray-text'>{error}</p>}
            </div>
        </form>
    )
}

export default LogInPage