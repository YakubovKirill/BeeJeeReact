import './App.css';
import Header from './modules/Header/Header'
import PostsList from './modules/PostsList/PostsList'
import React, {useState, useEffect} from "react"
import Axios from "axios"

function App() {
  const [adminIsAuth, setAdminAuth] = useState(false)
  const [userName, setUserName] = useState('')
  const [userMail, setUserMail] = useState('')
  const [tasks, setTasks] = useState([])
  const developer = 'YakubovKirill'

  const loadPosts = (developer) => {
    Axios.get(`https://uxcandy.com/~shapoval/test-task-backend/v2/`, {
      params: {
        developer: developer
      }
    }).then((response) => {
      if(response.data.status === 'ok')
        setTasks(response.data.message.tasks)
      console.log('e')
    })
  }

  useEffect(() => {
    loadPosts(developer)
  }, tasks)

  return (
    <div className="App">
      <Header />
      <form>
        <p>Имя пользователя</p>
        <input type='text' name='userName' onChange={(event) => setUserName(event.target.value)}/>
        <p>E-mail</p>
        <input type='email' name='userName' onChange={(event) => setUserMail(event.target.value)}/>
        <p>Текст задачи</p>
        <textarea></textarea>
        <button>Добавить задачу</button>
      </form>
      <PostsList data={tasks}/>
    </div>
  );
}

export default App;
