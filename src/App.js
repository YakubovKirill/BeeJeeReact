import './App.css';
import Header from './modules/Header/Header'
import PostsList from './modules/PostsList/PostsList'
import AddPostForm from './modules/AddPostForm/AddPostForm'
import Pages from './modules/Pages/Pages'
import Fields from './modules/Fields/Fields'
import React, {useState, useEffect} from "react"
import Axios from "axios"

function App() {
  const [tasks, setTasks] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [pagesCount, setPagesCount] = useState(1)
  const [fields, setFields] = useState([])
  const [sortedField, setSortedField] = useState('id')
  const [sortedOrder, setSortedOrder] = useState('ask')
  const [isAuth, setAuth] = useState(false)
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')

  const developer = 'YakubovKirill'

  const getPage = (e) => {
    setCurrentPage(e.target.value)
  }

  const getField = (e) => {
    setSortedField(e.target.value)
  }

  const getOrder = (e) => {
    setSortedOrder(e.target.value)
  }

  const login = (e) => {
    e.preventDefault();
    var form = new FormData();
    form.append("username", userName);
    form.append("password", password);
        
    Axios.post(`https://uxcandy.com/~shapoval/test-task-backend/v2/login?developer=${developer}`, form)
    .then((response) => {
            if(response.data.status === 'ok') {
              setAuth(true)
              localStorage.setItem('user', userName)
              alert('Вы успешно авторизовались')
            }
            else alert('Неверное имя пользователя или пароль')
    })
  }

  const logOut = (e) => {
    e.preventDefault();
    setAuth(false)
    localStorage.removeItem('user')
  }

  useEffect(() => {
    const loadPosts = (developer) => {
      Axios.get(`https://uxcandy.com/~shapoval/test-task-backend/v2/`, {
        params: {
          developer: developer,
          sort_field: sortedField,
          sort_direction: sortedOrder,
          page: currentPage
        }
      }).then((response) => {
        if(response.data.status === 'ok') {
          const taskCount = response.data.message.total_task_count
          setTasks(response.data.message.tasks)

          const fildsArr = []
          for (let key in response.data.message.tasks[0]) {
            fildsArr.push(key)
          }
          setFields(fildsArr)

          const pages = (taskCount % 3 === 0) ? taskCount / 3: Math.floor(taskCount / 3) + 1
          setPagesCount(pages)
        }
      })
    }
    localStorage.getItem('user') ? setAuth(true): setAuth(false)
    loadPosts(developer)
  }, [currentPage, sortedField, sortedOrder, isAuth])

  return (
    <div className="App">
      <Header />
      <div className='formplace f-c'>
        <AddPostForm developer={developer} />

        {localStorage.getItem('user') ? (
          <form onSubmit={logOut}>
            <div className='field f-c'><h3>Вход</h3></div>
            <div className='field'>
                <p>Вы вошли в систему под именем {localStorage.getItem('user')}</p>
            </div>
            <div className='f-c'><button className='form-btn f-c'><p>Выйти</p></button></div>
          </form>
        ) : (
          <form onSubmit={login}>
            <div className='field f-c'><h3>Вход</h3></div>
              <div className='field'>
                  <p>Имя пользователя</p>
                  <input type='text' name='userName' onChange={(event) => setUserName(event.target.value)} required />
              </div>
              <div className='field'>
                  <p>Пароль</p>
                  <input type='password' name='userName' onChange={(event) => setPassword(event.target.value)} required />
              </div>
              <div className='f-c'><button className='form-btn f-c'><p>Войти</p></button></div>
          </form>
        )}
      </div>
      <div className='parametres f-c'>
        <div className='params-wrap'>

          <div className='select-field f-c'>
            <p>Текущая страница</p>
            <select onChange={getPage}>
              <Pages data={pagesCount} />
            </select>
          </div>

          <div>

            <div className='select-field f-c'>
              <p>Сортировать по полю</p>
              <select onChange={getField}>
                <Fields data={fields} />
              </select>
            </div>

            <div className='select-field f-c'>
              <p>Сортировать по</p>
              <select onChange={getOrder}>
                <Fields data={['ask', 'desc']} />
              </select>
            </div>

          </div>
        </div>
      </div>
      
      <PostsList data={tasks} />
      <footer></footer>
    </div>
  );
}

export default App;
