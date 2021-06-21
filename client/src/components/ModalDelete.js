import React from 'react'
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";

export const ModalDelete = ({user, reload}) => {
    const {loading, request, error, clearError} = useHttp()
    const message = useMessage()

    const deleteHandler = async () => {
        try {
            const data = await request('/api/auth/delete', 'POST', {...user})
            message(data.message)
            reload();
        } catch (e) {}
    }

    return (
        <>
            <div id="delete-modal" className="modal">
                <div className="modal-content">
                    <h4>Удаление пользователя</h4>
                    <p>Вы уверены, что хотите удалить {user.email}?</p>
                </div>
                <div className="modal-footer row">
                    <a
                        href="#"
                        onClick={deleteHandler}
                        disabled={loading}
                        className="waves-effect waves-green btn-flat"
                    >
                        Удалить
                    </a>
                    <a
                        href="#"
                        disabled={loading}
                        className="modal-close waves-effect waves-red btn-flat"
                    >
                        Отменить
                    </a>
                </div>
            </div>
        </>
    )
}