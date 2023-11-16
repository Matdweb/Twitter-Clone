import Link from "next/link";

function Footer() {
    const options = ['Terms of Service', 'Privacy Policy', 'Cookie Policy', 'Imprint', 'Ads Info', 'More ···', '© 2021 Twitter, Inc.']

    return (
        <div className='py-6 flex justify-between itmes-center flex-row flex-wrap' >
            {options.map((option) => {
                return (
                    <Link href='#'>
                        <p className='font-gray-text '>{option}</p>
                    </Link>
                )
            })}
        </div >
    )
}

export default Footer