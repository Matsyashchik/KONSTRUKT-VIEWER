import React, {Suspense, useEffect} from "react";
import {extend, useThree} from "react-three-fiber";
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

extend({OrbitControls})

export const Scene = ({newMaterialOpt}) => {
    const threeRef = useRef(); // Используется для обращения к контейнеру для canvas
    const three = useRef(); // Служит для определения, создан ли объект, чтобы не создавать повторный
    const [color, colorChange] = useState("blue"); // Состояние отвечает за цвет квадрата

    // Handler служит для того, чтобы изменить цвет
    const colorChangeHandler = () => {
        // Просто поочерёдно меняем цвет с серого на синий и с синего на серый
        colorChange((prevColor) => (prevColor === "grey" ? "blue" : "grey"));
    };

    // Создание объекта класса Three, предназначенного для работы с three.js
    useEffect(() => {
        // Если объект класса "Three" ещё не создан, то попадаем внутрь
        if (!three.current) {
            // Создание объекта класса "Three", который будет использован для работы с three.js
            three.current = new Three({
                color,
                rectSizes,
                sceneSizes,
                colorChangeHandler,
                canvasContainer: threeRef.current,
            });
        }
    }, [color]);

    // при смене цвета вызывается метод объекта класса Three
    useEffect(() => {
        if (three.current) {
            // Запускаем метод, который изменяет в цвет квадрата
            three.current.rectColorChange(color);
        }
    }, [color]);

    // Данный узел будет контейнером для canvas (который создаст three.js)
    return <div className="container" ref={threeRef} />;
}

class Three {
    constructor({
                    canvasContainer,
                    sceneSizes,
                    rectSizes,
                    color,
                    colorChangeHandler,
                }) {
        // Для использования внутри класса добавляем параметры к this
        this.sceneSizes = sceneSizes;
        this.colorChangeHandler = colorChangeHandler;

        this.initRenderer(canvasContainer); // создание рендерера
        this.initScene(); // создание сцены
        this.initCamera(); // создание камеры
        this.initInteraction(); // подключаем библиотеку для интерактивности
        this.renderRect(rectSizes, color); // Добавляем квадрат на сцену
        this.render(); // Запускаем рендеринг
    }

    initRenderer(canvasContainer) {
        // Создаём редерер (по умолчанию будет использован WebGL2)
        // antialias отвечает за сглаживание объектов
        this.renderer = new THREE.WebGLRenderer({antialias: true});

        //Задаём размеры рендерера
        this.renderer.setSize(this.sceneSizes.width, this.sceneSizes.height);

        //Добавляем рендерер в узел-контейнер, который мы прокинули извне
        canvasContainer.appendChild(this.renderer.domElement);
    }

    initScene() {
        // Создаём объект сцены
        this.scene = new THREE.Scene();

        // Задаём цвет фона
        this.scene.background = new THREE.Color("white");
    }

    initCamera() {
        // Создаём ортографическую камеру (Идеально подходит для 2d)
        this.camera = new THREE.OrthographicCamera(
            this.sceneSizes.width / -2, // Левая граница камеры
            this.sceneSizes.width / 2, // Правая граница камеры
            this.sceneSizes.height / 2, // Верхняя граница камеры
            this.sceneSizes.height / -2, // Нижняя граница камеры
            100, // Ближняя граница
            -100 // Дальняя граница
        );

        // Позиционируем камеру в пространстве
        this.camera.position.set(
            this.sceneSizes.width / 2, // Позиция по x
            this.sceneSizes.height / -2, // Позиция по y
            1 // Позиция по z
        );
    }

    initInteraction() {
        // Добавляем интерактивность (можно будет навешивать обработчики событий)
        new Interaction(this.renderer, this.scene, this.camera);
    }

    render() {
        // Выполняем рендеринг сцены (нужно запускать для отображения изменений)
        this.renderer.render(this.scene, this.camera);
    }

    renderRect({width, height}, color) {
        // Создаём геометрию - квадрат с высотой "height" и шириной "width"
        const geometry = new THREE.PlaneGeometry(width, height);

        // Создаём материал с цветом "color"
        const material = new THREE.MeshBasicMaterial({color});

        // Создаём сетку - квадрат
        this.rect = new THREE.Mesh(geometry, material);

        //Позиционируем квадрат в пространстве
        this.rect.position.x = this.sceneSizes.width / 2;
        this.rect.position.y = -this.sceneSizes.height / 2;

        // Благодаря подключению "three.interaction"
        // мы можем навесить обработчик нажатия на квадрат
        this.rect.on("click", () => {
            // Меняем цвет квадрата
            this.colorChangeHandler();
        });

        this.scene.add(this.rect);
    }

    // Служит для изменения цвета квадрат
    rectColorChange(color) {
        // Меняем цвет квадрата
        this.rect.material.color.set(color);

        // Запускаем рендеринг (отобразится квадрат с новым цветом)
        this.render();
    }
}