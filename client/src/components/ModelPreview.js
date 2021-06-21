import React, {useContext, useEffect} from 'react'
import {NavLink, useHistory} from "react-router-dom";
import {AuthContext} from "../context/AuthContext";
import preview1 from "../images/preview.JPG";
import preview2 from "../images/homut.JPG";

export const ModelPreview = (props) => {
    const model = props.model
    if (model.modelID === 1) {
        return (
            <div className="col s12 m6 l3 ">
                <div className="card">
                    <div className="card-image waves-effect waves-block waves-light">
                        <img className="activator" src={preview1}/>
                    </div>
                    <div className="card-content">
                    <span className="card-title activator grey-text text-darken-4">
                        <span className="short-model-title">{model.modelTitle}</span>
                        <i className="material-icons right">more_vert</i>
                    </span>
                    </div>
                    <div className="card-reveal">
                    <span className="card-title grey-text text-darken-4">{model.modelTitle}
                        <i className="material-icons right">close</i></span>
                        <p>{model.modelDescription}</p>
                    </div>
                    <div className="card-action center">
                        <NavLink to="/view/1">Открыть</NavLink>
                        {props.isAdmin && <NavLink to={`/view/${model.modelID}`}>Удалить</NavLink>}
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div className="col s12 m6 l3 ">
            <div className="card">
                <div className="card-image waves-effect waves-block waves-light">
                    <img className="activator" src={preview2}/>
                </div>
                <div className="card-content">
                    <span className="card-title activator grey-text text-darken-4">
                        <span className="short-model-title">{model.modelTitle}</span>
                        <i className="material-icons right">more_vert</i>
                    </span>
                </div>
                <div className="card-reveal">
                    <span className="card-title grey-text text-darken-4">{model.modelTitle}
                    <i className="material-icons right">close</i></span>
                    <p>{model.modelDescription}</p>
                </div>
                <div className="card-action center">
                    <NavLink to="/view/2">Открыть</NavLink>
                    {props.isAdmin && <NavLink to="/view/2">Удалить</NavLink>}
                </div>
            </div>
        </div>
    )
}