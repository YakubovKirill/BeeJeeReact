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

    loadPosts(developer)
  }, [currentPage, sortedField, sortedOrder])

  return (
    <div className="App">
      <Header />
      <div className='formplace f-c'>
        <AddPostForm developer={developer}/>
      </div>
      <div className='parametres f-c'>
        <div className='params-wrap'>

          <div className='select-field f-c'>
            <p>Текущая страница</p>
            <select onChange={getPage}>
              <Pages data={pagesCount}/>
            </select>
          </div>

          <div>

            <div className='select-field f-c'>
              <p>Сортировать по полю</p>
              <select onChange={getField}>
                <Fields data={fields}/>
              </select>
            </div>

            <div className='select-field f-c'>
              <p>Сортировать по</p>
              <select onChange={getOrder}>
                <Fields data={['ask', 'desc']}/>
              </select>
            </div>

          </div>
        </div>
      </div>
      
      <PostsList data={tasks}/>
    </div>
  );
}

export default App;
