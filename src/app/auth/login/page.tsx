'use client'
import { useState } from "react"
import { signIn } from "next-auth/react"
import Link from "next/link"

function LogInPage() {

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(email, password);

        signIn('credentials',{
            email,
            password,
            callbackUrl: '/'
        });
        
        console.log("succesfull")
    }

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }

    return (
        <form onSubmit={onSubmit} className='p-16'>
            <h2 className='font-primary-title-roboto mb-8'>Log In</h2>

            <div className='flex justify-center items-start flex-col flex-nowrap gap-3'>
                <input
                    type="email"
                    value={email}
                    placeholder='email@example.com'
                    onChange={handleEmailChange}
                    required
                    className='bg-transparent text-primary-gray border border-primary-gray rounded-lg p-2'
                />
                <input
                    type="password"
                    value={password} 
                    placeholder='password'
                    onChange={handlePasswordChange}
                    required
                    className='bg-transparent text-primary-gray border border-primary-gray rounded-lg p-2'
                />
                <button type="submit" className='bg-white text-black p-2 rounded-lg w-20'>Log in</button>
                <Link href='../' className='bg-white text-black p-2 rounded-lg w-20'>Back</Link>
            </div>
        </form>
    )
}

export default LogInPage