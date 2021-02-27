import './Post.css';

function Post(props) {
    return (
        <div className='post'>
            <div className='post-header f-c'><p>{props.data.username}</p></div>
            <div className='post-mail f-c'><p>{props.data.email}</p></div>
            <div className='post-text'><p>{props.data.text}</p></div>
            <div className='post-status f-c'><p>Статус : {props.data.status}</p></div>
        </div>
    )
}

export default Post