import React, {useState} from 'react'
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";

export const Modal = ({reload}) => {
    const {loading, request} = useHttp()
    const message = useMessage()

    const [form, setForm] = useState({
        email: '', password: ''
    })

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form})
            message(data.message)
            reload();
        } catch (e) {
        }
    }

    return (
        <div id="add-modal" className="modal">
            <div className="modal-content">
                <h4>Добавление пользователя</h4>
                <div className="input-field col s12">
                    <div className="row">
                        <div className="input-field col s12">
                            <input
                                // placeholder="Введите email"
                                id="email"
                                type="email"
                                name="email"
                                autoComplete="off"
                                onChange={changeHandler}
                                className="validate"/>
                            <label htmlFor="email">Email</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <input
                                // placeholder="Введите пароль"
                                id="password"
                                type="password"
                                name="password"
                                autoComplete="off"
                                onChange={changeHandler}
                                className="validate"/>
                            <label htmlFor="password">Пароль</label>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal-footer row">
                <a
                    href="#"
                    className="waves-effect waves-green btn-flat"
                    disabled={loading}
                    onClick={registerHandler}
                >
                    Добавить пользователя
                </a>
                <a
                    href="#"
                    className="modal-close waves-effect waves-red btn-flat"
                    disabled={loading}
                >
                    Отменить
                </a>
            </div>
        </div>
    )
}