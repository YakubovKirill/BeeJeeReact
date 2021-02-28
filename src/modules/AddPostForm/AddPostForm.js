import './AddPostForm.css';
import React, {useState} from "react"
import Axios from "axios"

function AddPostForm(props) {
    const [userName, setUserName] = useState('')
    const [userMail, setUserMail] = useState('')
    const [text, setText] = useState('')

    const addTask = (e) => {
        e.preventDefault();

        var form = new FormData();
        form.append("username", userName);
        form.append("email", userMail);
        form.append("text", text);
        
        Axios.post(`https://uxcandy.com/~shapoval/test-task-backend/v2/create?developer=${props.developer}`, form)
        .then((response) => {
            if(response.data.status === 'ok') alert('Задача успешно добавлена')
        })
    }

    return (
        <form onSubmit={addTask}>
            <div className='field f-c'><h3>Добавить задачу</h3></div>
            <div className='field'>
                <p>Имя пользователя</p>
                <input type='text' name='userName' onChange={(event) => setUserName(event.target.value)} required />
            </div>
            <div className='field'>
                <p>E-mail</p>
                <input type='email' name='userName' onChange={(event) => setUserMail(event.target.value)} required />
            </div>
            <div className='field'>
                <p>Текст задачи</p>
                <textarea onChange={(event) => setText(event.target.value)} required></textarea>
            </div>
            <div className='f-c'><button className='form-btn f-c'><p>Добавить задачу</p></button></div>
        </form>
    )
}

export default AddPostForm