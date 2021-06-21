import React, {useEffect} from 'react';
import preview from '../images/preview.JPG'
import {ModelPreview} from "../components/ModelPreview";
import {useAuth} from "../hooks/auth.hook";
import {Loader} from "../components/Loader";

const models = [
    {modelID: 1, modelTitle: "Букса", modelDescription: "Букса - это стальной корпус, в котором размещаются подшипниковые вкладыши, смазочные и подбивочные материалы. Через буксы на колесные пары передается вертикальная нагрузка от веса локомотива, а от колесных пар на рамы тележек – усилия тяги, торможения и боковые горизонтальные силы, на вагонах буксы обеспечивают передачу нагрузки от кузова и находящегося в нем груза через подшипники на шейки оси колесной пары. "},
    {modelID: 2, modelTitle: "Хомут", modelDescription: "Тяговый хомут представляет собой надежное изделие, отлитое из прочной низколегированной стали. В его головной части расположены: окно для клина и приливы, имеющие отверстия для прохода болтов, которые поддерживают клин. Головная часть хомута соединена с его хвостовой частью при помощи верхней и нижней полос."}
];


export const BoardPage = () => {
    const auth = useAuth()

    let modelsList = models.map((p) =>
        <ModelPreview key={p.modelID} model={p} isAdmin={auth.isAdmin}/>
    );

    useEffect(() => {
        document.title = `KONSTRUKT-VIEWER`;
    });

    // if (true) {
    //     return <Loader/>
    // }

    return (
        <div className="container">
            <div className="row">
                {/*<div className='center add-user-button'>*/}
                {/*    <a href="#" className="waves-effect waves-light btn center">Добавить*/}
                {/*        модель</a>*/}
                {/*</div>*/}
            {/*<form>*/}
            {/*    <div className="input-field">*/}
            {/*        <input id="search" type="search" required />*/}
            {/*            <label className="label-icon" htmlFor="search"><i className="material-icons">search</i></label>*/}
            {/*            <i className="material-icons">close</i>*/}
            {/*    </div>*/}
            {/*</form>*/}
            {modelsList}
            </div>
        </div>
    )
}