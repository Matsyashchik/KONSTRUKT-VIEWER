import React, {useState, useEffect, useContext} from 'react';
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";
import {AuthContext} from "../context/AuthContext";

export const AuthPage = () => {
    const auth = useContext(AuthContext)
    const message = useMessage()
    const {loading, request, error, clearError} = useHttp()
    const [form, setForm] = useState({
        email: '', password: ''
    })

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    useEffect(() => {
        window.M.updateTextFields()
    }, [])

    useEffect(() => {
        document.title = `Добро пожаловать`;
    }, [])

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    // const registerHandler = async () => {
    //     try {
    //         const data = await request('/api/auth/register', 'POST', {...form})
    //         message(data.message)
    //     } catch (e) {
    //     }
    // }

    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', {...form})
            auth.login(data.token, data.userID, data.isAdmin)
            message(data.message)
        } catch (e) {
        }
    }

    const demoHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', {email: 'admin@konstrukt.viewer', password: 'AH1488'});
            auth.login(data.token, data.userID, data.isAdmin);
        } catch (e) {
        }
    }

    return (
        <div className="row">
            <h1 className="col l8 offset-l2 s12 center">KONSTRUKT-VIEWER</h1>
            <div className="col l6 offset-l3 s12 center">
                <div className="card black">
                    <div className="card-content white-text">
                        <div className="row">
                            <div className="input-field col s12">
                                <input
                                    placeholder="Введите email"
                                    id="email"
                                    type="email"
                                    name="email"
                                    onChange={changeHandler}
                                    className="validate white-text" />
                                <label htmlFor="email">Email</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <input
                                    placeholder="Введите пароль"
                                    id="password"
                                    type="password"
                                    name="password"
                                    onChange={changeHandler}
                                    className="validate white-text" />
                                <label htmlFor="password">Пароль</label>
                            </div>
                        </div>
                    </div>
                    <div className="card-action">
                        {/*<button*/}
                        {/*    className="btn yellow darken-4"*/}
                        {/*    style={{margin: 0}}*/}
                        {/*    onClick={registerHandler}*/}
                        {/*    disabled={loading}*/}
                        {/*>*/}
                        {/*    Зарегаться*/}
                        {/*</button>*/}
                        <button
                            className="btn yellow lighten-1 black-text"
                            onClick={loginHandler}
                            disabled={loading}
                        >
                            Войти
                        </button>
                    </div>
                </div>
            </div>
            <button
                onClick={demoHandler}
                className="waves-effect waves-orange btn col l4 offset-l4 s12 center light-blue lighten-1 black-text"
                disabled={loading}
            >
                Демонстрационный режим
            </button>
        </div>
    )
}