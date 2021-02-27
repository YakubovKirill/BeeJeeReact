import './AddPostForm.css';
import React, {useState, useEffect} from "react"

function AddPostForm(props) {
    const [userName, setUserName] = useState('')
    const [userMail, setUserMail] = useState('')
    return (
        <form>
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
                <textarea required></textarea>
            </div>
            <div className='f-c'><button className='form-btn f-c'><p>Добавить задачу</p></button></div>
        </form>
    )
}

export default AddPostForm