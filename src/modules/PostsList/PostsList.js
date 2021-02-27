import './PostsList.css';
import Post from "../Post/Post";

function PostsList(props) {
    const createItems = (tasks) => {
        const taskArr = []
        tasks.forEach((element) => {
            const elem = <Post key={element.id} data={element}/>
            taskArr.push(elem)
        })
        return taskArr
    }
    return (
        <div className='posts f-c'>
            <div className='list-wrap'>
                {createItems(props.data)}
            </div>
        </div>
    )
}

export default PostsList