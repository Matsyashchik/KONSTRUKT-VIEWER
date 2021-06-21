import React, {useContext, useEffect, useState, useCallback} from 'react'
import {ModelPreview} from "./ModelPreview";
import {Construction, Detail} from "./Construction";

let instance = null;
let dropdownID = -1;

export const ModelMenu = ({
                              modelName,
                              data,
                              menuRef,
                              headerHandler,
                              visibleHandler,
                              constructionHandler,
                              iconHandler,
                              detailHandler
                          }) => {
    const [visibility, setVisibility] = useState(true)
    const [closed, setClosed] = useState(true)

    const pickConstruction = (event) => {
        event.stopPropagation()
        console.log(event);
        // constructionHandler(event.target.attributes[0].value)
    }

    const switchVisible = (event) => {
        // const  jopa =
        event.stopPropagation()
        setVisibility(!visibility)
        visibleHandler(visibility)
    }

    const dropDownItem = (ID) => {
        // constructionHandler(null);

        if (ID === dropdownID) {
            instance.close(ID);
            dropdownID = -1;

        } else {
            instance.open(ID);
            dropdownID = ID;
        }
    }


    const pickDetail = (event) => {
        event.stopPropagation()
        detailHandler(event.target.attributes[0].value)
    }

    useEffect(() => {
        instance = window.M.Collapsible.init(menuRef.current);
        menuRef.current.removeEventListener('click', menuRef.current.M_Collapsible._handleCollapsibleClickBound)
    });

    // const setClosed = () => {
    //
    // }

    // <h5 key={"buksa"} onDoubleClick={props.parentHandler.bind(this, "Header")} >Букса

    return (
        <>
            <a onClick={() =>{setClosed(!closed)}} className="menu-hider hide-on-large-only">
                <i className="material-icons">{closed ? "subject" : "reorder"}</i>
            </a>
            <aside id="menu-model" className={closed ? "closed-menu" : ""}>
                <ul className={visibility ? "collapsible" : "collapsible blind"} ref={menuRef}>
                    <li className="construction-title">
                        <h5 key={"buksa"} onClick={headerHandler}>{modelName}
                            {/*<a href="#!" className="secondary-content"><i className="material-icons" style={{fontSize: 20}}>remove_red_eye</i></a>*/}
                            <a className="secondary-content" onClick={switchVisible}>
                                <i className="material-icons">remove_red_eye</i>
                            </a>
                        </h5>
                    </li>
                    {data.map((k) => <Construction key={k[0]} ID={k[0]}
                                                   title={k[1]}
                                                   details={k[4]}
                                                   isVisible={visibility}
                                                   constructionHandler={constructionHandler}
                                                   dropdownHandler={dropDownItem}
                                                   detailHandler={detailHandler}
                                                   iconHandler={iconHandler}/>)}
                </ul>
            </aside>
        </>

    )
}

// const constructions = data.map((k) => <Construction ID={k[0]} title={k[1]} details={k[4]} isVisible={visibility} constructionHandler={constructionHandler} dropdownHandler={dropDownItem} detailHandler={detailHandler} iconHandler={iconHandler} />
// <>
//
//     <li key={k[0]} itemID={k[0]} className="construction-item" onClick={() => {constructionHandler(k[0])}} onDoubleClick={() => {
//         dropDownItem(k[0] + 1)
//     }}>
//         <div className="collapsible-header construction-item">{k[1]}
//             {/*<a href="#!" className="secondary-content"><i className="material-icons" style={{fontSize: 20}}>edit</i></a>*/}
//             <a className="secondary-content" onClick={iconHandler}><i
//                 className="material-icons">remove_red_eye</i></a>
//         </div>
//         <div className="collapsible-body">
//             {k[4].map((d) =>
//                 <div itemID={d[0]} className="construction-item" onClick={pickDetail}>
//                     {d[1]}
//                 </div>
//             )}
//         </div>
//     </li>
// </>
// );
