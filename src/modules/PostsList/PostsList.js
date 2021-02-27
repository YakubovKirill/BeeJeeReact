import './PostsList.css';
import Post from "../Post/Post";

function PostsList(props) {
    return (
        <div className='posts f-c'>
            <div className='list-wrap'>
                <Post />
                <Post />
            </div>
        </div>
    )
}

export default PostsList