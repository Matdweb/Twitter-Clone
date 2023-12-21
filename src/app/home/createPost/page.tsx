import TwitterHeader from "@/components/Header/TwitterHeader";
import CreatePost from "@/components/PostsSection/CreatePost/CreatePost";

function Page() {
    return (
        <>
            <TwitterHeader section='Create Post' />
            <CreatePost className='flex' />
        </>
    )
}

export default Page