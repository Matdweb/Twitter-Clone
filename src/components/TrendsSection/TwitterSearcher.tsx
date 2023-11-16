'use client'
import { useState } from 'react';
import { IoIosSearch } from 'react-icons/io';

function TwitterSearcher() {
    const [searchInput, setSearchInput] = useState<string>('');

    return (
        <div className='px-7 py-5 w-full rounded-md flex justify-center items-center'>
            <div className='flex justify-start items-center flex-row flex-nowrap bg-primary-gray dark:bg-primary-dark-gray w-full rounded-full p-4'>
                <IoIosSearch style={{ fontSize: "1.5rem", color: "theme('colors.primary.dark-gray')" }} />
                <input
                    type="text"
                    value={searchInput}
                    placeholder="Search Twitter"
                    onChange={(e) => setSearchInput(e.target.value)}
                    className='bg-transparent outline-none ml-4'
                />
            </div>
        </div>
    )
}

export default TwitterSearcher