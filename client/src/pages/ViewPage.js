import React, {useEffect, useRef} from 'react';
import * as THREE from 'three'
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls"
import {OBJLoader} from "three/examples/jsm/loaders/OBJLoader";
import {ModelMenu} from "../components/ModelMenu";
import {ModelInfo} from "../components/ModelInfo";
import {Loader} from "../components/Loader";
import {useParams} from "react-router";


const header1 = ["Букса", "Букса - это стальной корпус, в котором размещаются подшипниковые вкладыши, смазочные и подбивочные материалы. Через буксы на колесные пары передается вертикальная нагрузка от веса локомотива, а от колесных пар на рамы тележек – усилия тяги, торможения и боковые горизонтальные силы, на вагонах буксы обеспечивают передачу нагрузки от кузова и находящегося в нем груза через подшипники на шейки оси колесной пары."]
const header2 = ["Хомут", "Тяговый хомут представляет собой надежное изделие, отлитое из прочной низколегированной стали. В его головной части расположены: окно для клина и приливы, имеющие отверстия для прохода болтов, которые поддерживают клин. Головная часть хомута соединена с его хвостовой частью при помощи верхней и нижней полос."]

const details1 = [
    [0, "Планка стопорная"], [1, "Гайка"], [2, "Крышка смотровая"], [3, "Прокладка"], [4, "Уплотнительное кольцо"], [5, "Смазка"], [6, "Болт"], [7, "Пружинная шайба"], [8, "Пружинная шайба"], [9, "Болт"], [10, "Ролик"], [11, "Ролик"], [12, "Ролик"], [13, "Ролик"], [14, "Ролик"], [15, "Ролик"], [16, "Ролик"], [17, "Ролик"], [18, "Подшипник внутренний "], [19, "Подшипник внутренний "], [20, "Сепаратор подшипника"], [21, "Сепаратор подшипника"], [22, "Ролик"], [23, "Ролик"], [24, "Ролик"], [25, "Ролик"], [26, "Ролик"], [27, "Сепаратор подшипника"], [28, "Сепаратор подшипника"], [29, "Подшипник "], [30, "Подшипник "], [31, "Подшипник "], [32, "Ролик"], [33, "Пружинная шайба"], [34, "Ролик"], [35, "Подшипник наружный "], [36, "Ролик"], [37, "Ролик"], [38, "Ролик"], [39, "Болт"], [40, "Ролик"], [41, "Ролик"], [42, "Ролик"], [43, "Ролик"], [44, "Ролик"], [45, "Ролик"], [46, "Ролик"], [47, "Лабиринтное кольцо"], [48, "Подшипник "], [49, "Подшипник "], [50, "Подшипник "], [51, "Ролик"], [52, "Крышка крепительная"], [53, "Пружинная шайба"], [54, "Болт"], [55, "Болт"], [56, "Болт"], [57, "Пружинная шайба"], [58, "Ролик"], [59, "Пружинная шайба"], [60, "Ролик"], [61, "Болт"], [62, "Болт"], [63, "Болт"], [64, "Болт"], [65, "Болт"], [66, "Ролик"], [67, "Корпус буксы"], [68, "Нажимная шайба"], [69, "Болт"], [70, "Пружинная шайба"], [71, "Ролик"], [72, "Пружинная шайба"], [73, "Пружинная шайба"], [74, "Болт"], [75, "Болт"], [76, "Пружинная шайба"]]

const details2 = [[0, "Деталь хомута"]]

const constructions1 = [
    [0, "Планка стопорная", "Стопорная пластина – также известная как планка-фиксатор, представляет собой стальной элемент крепежа, благодаря которому обеспечивается надежное фиксированное положение болтов и шпилек в поверхности. Рассматриваемая пластина имеет два и более отверстия под головки и гайки вышеперечисленных метизов.", [0]],
    [1, "Гайка", "Крепёжное изделие с резьбовым отверстием, образующее разборное соединение с помощью винта, болта или шпильки.", [1]],
    [2, "Крышка смотровая", "Смотровая крышка служит защитой от пыли и грязи роликовых подшипников. Через смотровые крышки проверяют состояние роликовых подшипников и состояние смазки на ПТО, также смотровую крышку снимают, для обточки колесных пар без демонтажа буксового узла.", [2]],
    [3, "Прокладка", "Часто встречаемая деталь смесителей с традиционными кранами-буксами. Она находится на запирающем штоке или на любых других подвижных элементах водопроводного крана, обеспечивая полную герметизацию прилегающих частей.", [3]],
    [4, "Уплотнительное кольцо", "Элемент уплотнительного устройства торообразной формы. Используется в гидравлических, топливных, смазочных и пневматических устройствах, а именно в регуляторах, клапанах и в других подвижных и неподвижных соединениях", [4]],
    [5, "Смазка", "Смазка необходима для уменьшения трения и изнашивания", [5]],
    [6, "Болт", "Металлический стержень с винтовой резьбой на конце для скрепления разъёмных соединений.", [6, 9, 39, 54, 55, 56, 61, 62, 63, 64, 65, 69, 74, 75]],
    [7, "Пружинная шайба", "Разрезная круглая шайба, концы которой расположены в разных плоскостях, служащая для предотвращения самоотвинчивания крепёжных изделий при её упругой деформации под нагрузкой", [7, 8, 33, 53, 57, 59, 70, 72, 73, 76]],
    [8, "Ролик", "Часть подшипника (роликового) в виде стального цилиндра или усеченного конуса;", [10, 11, 12, 13, 14, 15, 16, 17, 22, 23, 24, 25, 26, 32, 34, 36, 37, 38, 40, 41, 42, 43, 44, 45, 46, 51, 58, 60, 66, 71]],
    [9, "Подшипник внутренний", "Сборочный узел, являющийся частью опоры или упора и поддерживающий вал, ось или иную подвижную конструкцию с заданной жёсткостью.", [18, 19]],
    [10, "Подшипник", "Сборочный узел, являющийся частью опоры или упора и поддерживающий вал, ось или иную подвижную конструкцию с заданной жёсткостью.", [29, 30, 31, 48, 49, 50]],
    [11, "Сепаратор подшипника", "Деталь конструкции подшипника, задачей которого является разделение и направление тел качения. Это позволяет увеличить скорость вращения подшипника по сравнению с бессепараторным вариантом.", [20, 21, 27, 28]],
    [12, "Подшипник наружный", "Сборочный узел, являющийся частью опоры или упора и поддерживающий вал, ось или иную подвижную конструкцию с заданной жёсткостью.", [35]],
    [13, "Лабиринтное кольцо", "Это деталь колесной пары грузового вагона, которая с лабиринтной частью корпуса буксы образует четырехкамерное безконтактное уплотнение и препятствует вытеканию смазки из буксы и попаданию в нее механических примесей.", [47]],
    [14, "Крышка крепительная", "Является составной частью буксового узла тележки грузового вагона. Крепится к корпусу буксы и фиксирует наружную обойму блока подшипников буксы от радиального смещения. Также служит для защиты буксового узла от внешних воздействий и крепления смотровой крышки.", [52]],
    [15, "Корпус буксы", "Одна из важнейших составляющих буксового узла любого вагона. Для грузовых вагонов изготавливается из стали марки 20Гл, ФЛ или алюминиевого сплава. Корпус буксы в составе буксового узла устанавливается на шейках оси и предназначена для защиты шеек осей от загрязнения, повреждений и атмосферных осадков.", [67]],
    [16, "Нажимная шайба", "Механизм сцепления с центральной диафрагменной пружиной", [68]],
]

const constructions2 = [[0, "Конструкция хомута", "Описание", [0]]]

let constructions
let details
let header

function getData() {
    for (const construction of constructions) {
        construction[4] = []
        for (const detailID of construction[3]) {
            construction[4].push(details[detailID])
        }
    }
}

function setModel(number) {
    if (number === '1') {
        details = details1
        constructions = constructions1
        header = header1
    }
    if (number === '2') {
        details = details2
        constructions = constructions2
        header = header2
    }
}


let picker = null;

export const ViewPage = (props) => {
    const menuRef = useRef()
    const descriptionRef = useRef()
    const titleRef = useRef()
    const canvasRef = useRef()
    const loaderRef = useRef()
    const containerRef = useRef()
    const id = useParams().id
    let activeList = [];
    setModel(id)
    getData();


    const menuHeaderPickClick = (modelNumber) => {
        setText(header[0], header[1])
        picker.clear();
        setAllUnactive()
    }

    // Метод для сокрытия/открытия всех деталей
    const menuItemsHideClick = (isHide) => {
        picker.hideAllOut(isHide)
    }

    // Метод для выбора конструкции
    const menuConstructionPickClick = (ID) => {
        setText(constructions[ID][1], constructions[ID][2])
        setActive(ID+1)
        picker.pickOut(constructions[ID][3])
    }

    const setActive = (ID) => {
        if (activeList.length) {
            const active = activeList.pop()
            active.classList.toggle('active')
        }
        // console.log(menuRef.current.children);
        // menuRef.current.children[ID].classList.toggle('active')
        // activeList.push(menuRef.current.children[ID])
    }

    const setAllUnactive = () => {
        if (activeList.length) {
            const active = activeList.pop()
            active.classList.toggle('active')
        }
    }

    const menuDetailPickClick = (ID) => {
        // Метод для выбора детали
        picker.pickOut([ID])
    }

    const menuItemHideClick = (ID, isHide) => {
        // Метод для сокрытия/открытия конструкции
        picker.hideOut(constructions[ID][3], isHide)

    }

    const setText = (title, description) => {
        titleRef.current.innerHTML = title
        descriptionRef.current.innerHTML = description
    }

    const hideLoader = () => {
        loaderRef.current.classList.add('hide')
    }

    useEffect(() => {
        document.title = `Модель`;
        picker = WORK(THREE, OrbitControls, OBJLoader, menuConstructionPickClick, canvasRef, hideLoader, id);
        menuHeaderPickClick()
    });

    return (
        <>
            <div id="model-hider" className='hide' ref={containerRef}></div>
            <Loader special={loaderRef}/>
            <div id="view-container">
                <ModelMenu modelName={header[0]}
                           menuRef={menuRef}
                           data={constructions}
                           headerHandler={menuHeaderPickClick}
                           visibleHandler={menuItemsHideClick}
                           constructionHandler={menuConstructionPickClick}
                           iconHandler={menuItemHideClick}
                           detailHandler={menuDetailPickClick}/>
                <canvas id="canvas" ref={canvasRef} />
                <ModelInfo titleRef={titleRef} descriptionRef={descriptionRef}/>
            </div>
        </>

    )
}


const WORK = (THREE, OC, OBJLoader, constructionPick, canvasRef, hideLoader, modelID) => {
    let canPick = true;

    const CANVAS = canvasRef.current;
    const renderer = new THREE.WebGLRenderer({canvas: CANVAS, logarithmicDepthBuffer: true,});
    const SCENE = new THREE.Scene();
    const CAMERA = new THREE.PerspectiveCamera(45, 2, 0.1, 5000);
    // CANVAS.addEventListener('mousedown', setControlCoords);
    // CANVAS.addEventListener('mouseup', canControlCoords);
    const CONTROLS = new OC(CAMERA, CANVAS);
    CONTROLS.target.set(0, 5, 0);
    CONTROLS.update();
    const color = 0xFFFFFF;
    const ground = 0x9b9898;
    const intensity = 1;
    const light = new THREE.HemisphereLight(color, ground, intensity);
    SCENE.add(light);
    const LOADING_MANAGER = new THREE.LoadingManager();
    const OBJ_LOADER = new OBJLoader(LOADING_MANAGER);
    let OBJECT;

    OBJ_LOADER.load(`/api/auth/model/${modelID}`, (object) => {
        for (const child of object.children) {
            child.material = new THREE.MeshPhongMaterial();
        }

        OBJECT = object;
        SCENE.add(OBJECT);
        centerModel(object);
        scaleCamera(object);
        hideLoader()
    });

    function scaleCamera(object) {
        const box = new THREE.Box3().setFromObject(object);
        const boxSize = box.getSize(new THREE.Vector3()).length();
        const boxCenter = box.getCenter(new THREE.Vector3());
        frameArea(boxSize * 1.2, boxSize, boxCenter, CAMERA);
        CONTROLS.maxDistance = boxSize * 2;
        CONTROLS.target.copy(boxCenter);
        CONTROLS.update();
    }

    function centerModel(object) {
        const box = new THREE.Box3().setFromObject(object);
        const boxCenter = box.getCenter(new THREE.Vector3());
        object.position.x = -boxCenter.x;
        object.position.y = -boxCenter.y;
        object.position.z = -boxCenter.z;
    }

    function degToRad(degree) {
        return Math.PI / 180 * degree;
    }

    function frameArea(sizeToFitOnScreen, boxSize, boxCenter, camera) {
        const halfSizeToFitOnScreen = sizeToFitOnScreen * 0.5;

        const halfFovY = degToRad(camera.fov * .5);
        const distance = halfSizeToFitOnScreen / Math.tan(halfFovY);
        // compute a unit vector that points in the direction the camera is now
        // in the xz plane from the center of the box
        const direction = (new THREE.Vector3())
            .subVectors(camera.position, boxCenter)
            .multiply(new THREE.Vector3(1, 0, 1))
            .normalize();

        // move the camera to a position distance units way from the center
        // in whatever direction the camera was from the center already
        camera.position.copy(direction.multiplyScalar(distance).add(boxCenter));

        // pick some near and far values for the frustum that
        // will contain the box.
        camera.near = boxSize / 100;
        camera.far = boxSize * 100;

        camera.updateProjectionMatrix();

        // point the camera to look at the center of the box
        camera.lookAt(boxCenter.x, boxCenter.y, boxCenter.z);
    }


    function render() {
        CAMERA.lookAt(SCENE.position)

        if (resizeRendererToDisplaySize(renderer)) {
            const canvas = renderer.domElement;
            CAMERA.aspect = canvas.clientWidth / canvas.clientHeight;
            CAMERA.updateProjectionMatrix();
        }

        renderer.render(SCENE, CAMERA);

        requestAnimationFrame(render);
    }

    class PickHelper {
        constructor() {
            this.raycaster = new THREE.Raycaster();
            this.details = null;
            this.pickedObject = null;
            this.pickedObjects = [];
            this.hidedObjects = [];
            this.iCan = false;
        }

        pickOut(IDs) {
            this.clear();
            for (const id of IDs) {
                this.addObject(OBJECT.children[id]);
            }
        }

        hideAllOut(isHide) {
            if (isHide) {
                this.hideAll()
            } else this.showAll()
        }

        hideOut(IDs, isHide) {
            if (isHide) {
                for (const id of IDs) {
                    this.hideObject(OBJECT.children[id]);
                }
            } else {
                for (const id of IDs) {
                    this.showObject(OBJECT.children[id]);
                }
            }
        }

        pick(isExtra) {
            this.raycaster.setFromCamera(pickPosition, CAMERA);
            let intersectedObjects = this.raycaster.intersectObjects(OBJECT.children);
            intersectedObjects = intersectedObjects.filter((n) => {
                return !(this.hidedObjects.includes(n.object))
            });
            if (intersectedObjects.length) {
                const pickedObject = intersectedObjects[0].object;
                if (isExtra) {
                    // console.log(pickedObject);
                    if (this.pickedObjects.includes(pickedObject)) {
                        this.removeObject(pickedObject);
                    } else {
                        this.addObject(pickedObject);
                    }
                } else {
                    this.clear();
                    // this.addObject(pickedObject);
                    const id = OBJECT.children.indexOf(pickedObject)
                    for (const construction of constructions) {
                        const search = construction[3].includes(id)
                        if (search) {
                            constructionPick(construction[0])
                        }
                    }
                }
            } else {
                this.clear();
            }
        }

        addObject(object) {
            this.pickedObjects.push(object);
            object.material.color.set(0x4f4f4f);
        }

        addObjects(object) {
            for (const cobject of object) {
                this.addObject(cobject);
            }
        }

        removeObject(object) {
            object.material.color.set(0xffffff)
            this.pickedObjects = this.pickedObjects.filter((n) => {
                return n !== object
            });
        }

        clear() {
            for (let object of this.pickedObjects) {
                this.removeObject(object)
            }
        }

        hideObject(object) {
            this.hidedObjects.push(object);
            object.visible = false;
        }

        hideObjects(objectsList) {
            for (let child of objectsList) {
                this.hideObject(child);
            }
            // this.showObjects(this.pickedObjects);
        }

        showObject(object) {
            this.hidedObjects = this.hidedObjects.filter((n) => {
                return n !== object
            });
            object.visible = true;
        }

        showObjects(objectList) {
            for (let child of objectList) {
                this.showObject(child)
            }
        }

        hideAllButThis(object) {
            this.hidedObjects = [];
            this.hideAll();
            this.showObject(object);
        }

        hideAll() {
            this.hidedObjects = OBJECT.children;
            for (let child of this.hidedObjects) {
                child.visible = false;
            }
        }

        showAll() {
            for (let child of OBJECT.children) {
                child.visible = true;
            }
            this.hidedObjects = [];
        }
    }

    const pickPosition = new THREE.Vector2();
    const pickHelper = new PickHelper();
    clearPickPosition();

    function getCanvasRelativePosition(event) {
        const rect = CANVAS.getBoundingClientRect();

        return {
            x: (event.clientX - rect.left) * CANVAS.width / rect.width,
            y: (event.clientY - rect.top) * CANVAS.height / rect.height,
        };
    }

    function setPickPosition(event) {
        const pos = getCanvasRelativePosition(event);
        pickPosition.x = (pos.x / CANVAS.width) * 2 - 1;
        pickPosition.y = (pos.y / CANVAS.height) * -2 + 1;  // note we flip Y
    }

    function clearPickPosition() {
        pickPosition.x = -100000;
        pickPosition.y = -100000;
    }

    function clearPickPositionSuper(event) {
        // unlike the mouse which always has a position
        // if the user stops touching the screen we want
        // to stop picking. For now we just pick a value
        // unlikely to pick something
        pickEvent(event)
    }

    CANVAS.addEventListener('mousemove', setPickPosition);
    CANVAS.addEventListener('mouseout', clearPickPosition);
    CANVAS.addEventListener('mouseleave', clearPickPosition);

    CANVAS.addEventListener('touchstart', (event) => {
        setPickPosition(event.touches[0]);
    }, {passive: false});

    CANVAS.addEventListener('touchmove', (event) => {
        setPickPosition(event.touches[0]);
    });

    CANVAS.addEventListener('touchend', clearPickPositionSuper);

    let controlCoords = {x: -1000, y: -1000};

    CANVAS.addEventListener('pointerdown', setControlCoords);
    CANVAS.addEventListener('pointerup', canControlCoords);

    function setControlCoords(event) {
        controlCoords = getCanvasRelativePosition(event);
    }

    function canControlCoords(event) {
        let pos = getCanvasRelativePosition(event);
        canPick = controlCoords.x === pos.x && controlCoords.y === pos.y ? true : false;
    }

    CANVAS.addEventListener('click', pickEvent);

    function pickEvent(event) {
        if (canPick)
            // if (true)//
            pickHelper.pick(false)
    }

    function resizeRendererToDisplaySize(renderer) {
        const canvas = renderer.domElement;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        const needResize = canvas.width !== width || canvas.height !== height;
        if (needResize) {
            renderer.setSize(width, height, false);
        }
        return needResize;
    }

    requestAnimationFrame(render);

    return pickHelper
}