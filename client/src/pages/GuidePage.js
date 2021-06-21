import React, {useEffect} from 'react';

export const GuidePage = () => {
    useEffect(() => {
        document.title = `Руководство пользователя`;
    }, [])

    return (
        <div className="container guide">
            <h3>Выбор модели</h3>
            <p>
                Для начала выберите модель из представленных на странице "Модели".
            </p>
            <p>
                При нажатии на иконку
                <i className="material-icons right">more_vert</i> вы откроете описание модели.
            </p>
            <div className="divider"></div>
            <h3>Просмотр модели</h3>
            <p>
                После загрузки и рендеринга модели перед вами предстанет три зоны:
            </p>
            <h5>1. Область иерархического дерева</h5>
            <p>
                Здесь вы видите название модели и список конструкций
            </p>
            <p>
                При клике на название конструкции она выделится цветом и будет выведено её описание в области отображения информации.
            </p>
            <p>
                При двойном клике на название конструкции будет отображён список деталей.
            </p>
            <p>
                При нажатии на иконку <i className="material-icons right">remove_red_eye</i> вы скроете выбранную конструкцию.
            </p>
            <h5>2. Область построения модели</h5>
            <p>
                Здесь вы можете при помощи кликов выделять конструкции и вращать модель.
            </p>
            <h5>3. Область отображения информации</h5>
            <p>
                Здесь вы видите название конструкции и её описание.
            </p>
            <p>
                При необходимости, нажав на иконку <i className="material-icons right">chevron_left</i>, вы можно скрыть или снова отобразить данную область.
            </p>
        </div>
    )
}