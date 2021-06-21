import React, {useContext, useEffect} from 'react'

export const User = (props) => {
    const user = props.user
    function clickHandler() {
        props.handler(user);
    }

    return (
        <>
            <li className="collection-item">
                <div jopka={user}>
                    {user.email}
                    <a href="#" data-target="delete-modal" className="secondary-content waves-effect waves-red btn-small modal-trigger" onClick={clickHandler}>
                        <i className="material-icons">delete</i>
                    </a>
                    <a href="#" data-target="edit-modal" className="secondary-content waves-effect waves-yellow btn-small modal-trigger" onClick={clickHandler}>
                        <i className="material-icons">edit</i>
                    </a>
                </div>
            </li>
        </>
    )
}