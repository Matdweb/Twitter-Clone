
function Page(
    { params: { username } }
        :
        { params: { username: string } }) {
    return (
        <div>{username} Page</div>
    )
}

export default Page