import React from 'react'

type InputProps = React.ComponentProps<"input"> & {
    error: string | boolean
};

export default function FormInput({ error, className="", ...rest }: InputProps) {
    return (
        <input
            {...rest}
            className={`w-full bg-transparent p-5 mb-5 outline outline-1  ${error ? `outline-primary-red` : `outline-primary-gray`} rounded-md p-2 focus-visible:outline-primary-blue dark:focus-visible:outline-white dark:focus-visible:outline-2 ${className}`}
        />
    )
}
