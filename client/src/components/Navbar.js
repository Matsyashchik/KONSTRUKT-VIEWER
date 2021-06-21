import React, {useContext, useEffect} from 'react'
import {NavLink, useHistory} from "react-router-dom";
import {AuthContext} from "../context/AuthContext";
import penrose from "../images/penrose.png";

export const Navbar = () => {
    const history = useHistory()
    const auth = useContext(AuthContext)
    let sidenav;

    const logoutHandler = event => {
        event.preventDefault()
        auth.logout()
        history.push('/auth');
    }

    useEffect(() => {
        sidenav = window.M.Sidenav.init(document.querySelectorAll('.sidenav'));
    })

    return (
        <div id="navbar-wrapper">
            <nav id="navbar">
                <div className="nav-wrapper">
                    <img src={penrose} className="site-logo" style={{padding: 15}} />
                    <a data-target="mobile-demo" className="sidenav-trigger">
                        <i className="material-icons large">home</i>
                    </a>
                    <ul className="right hide-on-med-and-down">
                        {auth.isAdmin && <li><NavLink to="/admin">Администрирование</NavLink></li>}
                        <li><NavLink to="/main">Модели</NavLink></li>
                        <li><NavLink to="/guide">Руководство</NavLink></li>
                        <li><a href="/" onClick={logoutHandler}>Выход</a></li>
                    </ul>
                </div>
            </nav>

            <ul className="sidenav" id="mobile-demo">
                <li><NavLink to="/main" className="sidenav-close">Модели</NavLink></li>
                <li><NavLink to="/guide" className="sidenav-close">Руководство</NavLink></li>
                <li><a href="/" onClick={logoutHandler} className="sidenav-close">Выход</a></li>
            </ul>
        </div>
        // <nav>
        //     <div className="nav-wrapper">
        //         <a href="#" className="brand-logo">Logo</a>
        //         <ul id="nav-mobile" className="right hide-on-med-and-down">
        //             {true && <li><NavLink to="/admin">Администрирование</NavLink></li>}
        //             <li><NavLink to="/main">Модели</NavLink></li>
        //             <li><NavLink to="/guide">Руководство</NavLink></li>
        //             <li><a href="/" onClick={logoutHandler}>Выход</a></li>
        //         </ul>
        //     </div>
        // </nav>
    )
}