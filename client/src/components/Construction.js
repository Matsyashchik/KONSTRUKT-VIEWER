import {useEffect, useState} from 'react'
import {useDoubleTap} from "use-double-tap";
export const Construction = ({
                                 ID,
                                 title,
                                 isVisible,
                                 dropdownHandler,
                                 constructionHandler,
                                 iconHandler,
                                 details,
                                 detailHandler,
                             }) => {
    const [visibility, setVisibility] = useState(true)
    const [activity, setActivity] = useState(false)


    const bind = useDoubleTap((event) => {
        // console.log(event.target.attributes[0].value);
        dropdownHandler(Number(event.target.attributes[0].value) + 1)
        // constructionHandler(event.target.attributes[0].value)
    }, 200, {onSingleTap: (event) => constructionHandler(Number(event.target.attributes[0].value))});

    const pickConstraction = (event) => {
        // console.log(event)
        console.log(event.target.attributes[0].value)
        // event.stopPropagation()
        // detailHandler(event.target.attributes[0].value)
    }

    const pickDetail = (event) => {
        event.stopPropagation()
        detailHandler(event.target.attributes[0].value)
    }

    const switchActive = (event) => {
        event.stopPropagation()
        iconHandler(ID, visibility !== activity)
        setActivity(!activity)
    }

    useEffect( () => {
        if (isVisible !== visibility) {
            setActivity(false)
            setVisibility(!visibility)
        }
    },[isVisible, visibility])

    return (
        <li key={ID} itemID={ID} className="construction-item"
            {...bind}
            // onClick={() => {constructionHandler(ID)}}
            // onDoubleClick={() => {dropdownHandler(ID + 1)}}
        >
            <div itemID={ID} className="collapsible-header construction-item">{title}
                {/*<a href="#!" className="secondary-content"><i className="material-icons" style={{fontSize: 20}}>edit</i></a>*/}
                <a className="secondary-content" onClick={switchActive}>
                    <i className={activity === visibility ? "material-icons reverse" : "material-icons straight"                        }>remove_red_eye</i>
                </a>
            </div>
            <div className="collapsible-body">
                {details.map((d) =>
                    <div key={d[0]} itemID={d[0]} className="construction-item detail" onClick={pickDetail}>
                        {d[1]}
                    </div>
                )}
            </div>
        </li>
    )
}