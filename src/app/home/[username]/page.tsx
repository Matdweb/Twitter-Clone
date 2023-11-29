import TwitterHeader from "@/components/Header/TwitterHeader"

function Page(
    { params: { username } }
        :
        { params: { username: string } }) {
    return (
        <section className='w-1/3 grow'>
            <TwitterHeader section="Profile" />
            <div>{username} Page</div>
        </section>
    )
}

export default Page