import {useState} from 'react'

export const ModelInfo = ({titleRef, descriptionRef }) => {
    const [closed, setClose] = useState(true)
    return (
        <>
            <a onClick={() =>{setClose(!closed)}} className="info-hider">
                <i className="material-icons">{closed ? "chevron_left" : "chevron_right"}</i>
            </a>
            <div id="menu-info" className={closed ? "" : "opened"}>

                <h4 ref={titleRef}>
                    Букса
                </h4>
                <div className="divider"></div>
                <p ref={descriptionRef}></p>
                {/*<div className='center '>*/}
                {/*    <a data-target="modal1" className="waves-effect waves-light btn center modal-trigger">Сохранить изменения</a>*/}
                {/*</div>*/}
            </div>
        </>

    )
}