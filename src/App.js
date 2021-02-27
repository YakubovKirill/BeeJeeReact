import './App.css';
import Header from './modules/Header/Header'
import PostsList from './modules/PostsList/PostsList'
import AddPostForm from './modules/AddPostForm/AddPostForm'
import React, {useState, useEffect} from "react"
import Axios from "axios"

function App() {
  //const [adminIsAuth, setAdminAuth] = useState(false)
  const [tasks, setTasks] = useState([])
  const developer = 'YakubovKirill'

  const loadPosts = (developer) => {
    Axios.get(`https://uxcandy.com/~shapoval/test-task-backend/v2/`, {
      params: {
        developer: developer
      }
    }).then((response) => {
      if(response.data.status === 'ok') {
        setTasks(response.data.message.tasks)
      }
      //console.log(response)
    })
  }

  useEffect(() => {
    loadPosts(developer)
  }, [])

  return (
    <div className="App">
      <Header />
      <div className='formplace f-c'>
        <AddPostForm developer={developer}/>
      </div>
      <PostsList data={tasks}/>
    </div>
  );
}

export default App;
