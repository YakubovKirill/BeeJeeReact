import './Post.css';

function Post() {
    return (
        <div className='post'>
            <div className='post-header f-c'><p>nickname</p></div>
            <div className='post-mail f-c'><p>email</p></div>
            <div className='post-text'><p>Text Text Text</p></div>
            <div className='post-status f-c'><p>Status</p></div>
        </div>
    )
}

export default Post