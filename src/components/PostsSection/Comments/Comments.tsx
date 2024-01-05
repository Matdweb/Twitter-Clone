import UserImage from "@/components/UserImage"
import type { comment } from "@/types/posts/comments/comment"

interface Props {
    comments: comment[]
}

function Comments({ comments }: Props) {
    return (
        <section className='w-full overflow-hidden overflow-y-scroll max-h-[16rem]'>
            {comments?.map((comment) => {
                return (
                    <div key={comment.id} className='w-full px-5 py-3 flex justify-start items-center'>
                        <div className='mr-4'>
                            <UserImage className='w-10 h-10' username={comment.username} userId={comment.userId}  />
                        </div>
                        <div className='w-full flex justify-center items-start flex-col flex-nowrap'>
                            <p className='font-bold'>{comment.username}</p>
                            <p>{comment.body}</p>
                        </div>
                    </div>
                )
            })}
        </section>
    )
}

export default Comments