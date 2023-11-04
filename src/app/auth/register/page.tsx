'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

function Page() {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');

    const router = useRouter();

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(name, email, password);
        setError("");
        try {
            const response = await fetch('../api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password })
            });
            const { status, statusText } = await response.json();

            if (status === 400) {
                setError(statusText);
            } else if (status === 201) {
                router.push('/');
            }

        } catch (e) {
            console.log(e);
        }
    }

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    }

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }

    return (
        <form onSubmit={onSubmit} className='p-16'>
            <h2 className='font-primary-title-roboto mb-8'>Register User</h2>

            <div className='flex justify-center items-start flex-col flex-nowrap gap-3'>
                <input
                    type="text"
                    value={name}
                    placeholder='name'
                    onChange={handleNameChange}
                    required
                    className='bg-transparent text-primary-gray border border-primary-gray rounded-lg p-2'
                />
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
                <button type="submit" className='bg-white text-black p-2 rounded-lg w-20'>Register</button>
                <Link href='../' className='bg-white text-black p-2 rounded-lg w-20'>Back</Link>
                {error && <p className='font-gray-text'>{error}</p>}
            </div>
        </form>
    )
}

export default Page