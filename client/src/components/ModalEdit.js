import React, {useContext, useEffect, useState} from 'react'
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";

export const ModalEdit = ({user, reload}) => {
    const {loading, request, error, clearError} = useHttp()
    const message = useMessage()

    const [form, setForm] = useState({
        email: 'testuser@mail.ru', password: 'qwerty'
    })

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const editHandler = async () => {
        try {
            // console.log(user)
            // console.log(form)
            const data = await request('/api/auth/delete', 'POST', {...user})
            const dataNew = await request('/api/auth/register', 'POST', {...form})
            message("Пользователь изменён")
            reload();
        } catch (e) {
        }
    }

    return (
        <>
            <div id="edit-modal" className="modal">
                <div className="modal-content">
                    <h4>Изменение пользователя</h4>
                    <div className="input-field col s12">
                        <div className="row">
                            <div className="input-field col s12">
                                <input
                                    id="emailNew"
                                    type="email"
                                    name="email"
                                    autoComplete="off"
                                    onChange={changeHandler}
                                    defaultValue="testuser@hotmail.com"
                                    className="validate"/>
                                <label htmlFor="email" className="active">Email</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <input
                                    id="passwordNew"
                                    type="password"
                                    name="password"
                                    autoComplete="off"
                                    defaultValue="PIDORAS"
                                    onChange={changeHandler}
                                    className="validate"/>
                                <label htmlFor="password" className="active">Пароль</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal-footer row">
                    <a
                        href="#"
                        className="waves-effect waves-green btn-flat"
                        disabled={loading}
                        onClick={editHandler}
                    >
                        Изменить пользователя
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
        </>
    )
}