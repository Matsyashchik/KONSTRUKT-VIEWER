import React, {useEffect, useCallback, useState, useRef} from 'react';
import {Modal} from "../components/Modal";
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";
import {Loader} from "../components/Loader";
import {ModelPreview} from "../components/ModelPreview";
import {User} from "../components/User";
import {render} from "@testing-library/react";
import {ModalEdit} from "../components/ModalEdit";
import {ModalDelete} from "../components/ModalDelete";

export const AdminPage = () => {
    const {loading, request, error, clearError} = useHttp()
    const message = useMessage()
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState({});
    let editModal;
    let addModal;

    const changeUserHandler = useCallback( (keyInfo) => {
        setUser(keyInfo);
    }, [setUser])

    const fetchProjects = useCallback(async () => {
        try {
            const userList = await request('/api/auth/users', 'GET')
            const userElements = userList.map((u) =>
                renderUser(u)
            )
            setUsers(userElements)
        } catch (e) {
        }
    }, [request]);

    function renderUser(u) {
        return(
            <User key={u._id} user={u} handler={changeUserHandler} reloadHandler={fetchProjects}/>
        )
    }

    useEffect(() => {
        fetchProjects()
    }, [fetchProjects]);

    useEffect(() => {
        document.title = `Панель администрирования`;

        // document.addEventListener('DOMContentLoaded', function() {
        //     var elems = document.querySelectorAll('.modal');
        //     instances = document.M.Modal.init(elems);
        // });

        addModal = window.M.Modal.init(document.getElementById('add-modal'));
        editModal = window.M.Modal.init(document.getElementById('edit-modal'));
        window.M.Modal.init(document.getElementById('delete-modal'));
    });
    if (loading) {
        return <Loader/>
    }

    return (
        <>
            <Modal reload={fetchProjects}/>
            <ModalEdit user={user} reload={fetchProjects}/>
            <ModalDelete user={user} reload={fetchProjects}/>
            <div className="row">
                <div className="col s12">
                    <div id="Users" className="col s12">
                        <h5>Список пользователей</h5>
                        <div className='center add-user-button'>
                            <a data-target="add-modal" className="waves-effect waves-light btn center modal-trigger">Добавить
                                пользователя</a>
                        </div>
                        <ul className="collection user-collection">
                            {!loading && users}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}