const {Router} = require('express');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
const config = require('config')
const fs = require("fs")
const {check, validationResult} = require('express-validator');
const User = require('../models/User');
const router = Router();

// /api/auth/register
router.post(
    '/register',
    [
        check('email', 'Некорректный email').isEmail(),
        check('password', 'Минимальная длинна пароля 6 символов').isLength({min: 6})
    ],
    async (req, res) => {
        try {
            console.log('Body: ', req.body)

            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некорректные данные при регистрации'
                })
            }

            const {email, password} = req.body;

            const candidate = await User.findOne({email})

            if (candidate) {
                return res.status(404).json({message: 'User already exist'})
            }

            const hashedPassword = await bcrypt.hash(password, 12);
            const user = new User({email, password: hashedPassword, isAdmin: false});

            await user.save();

            res.status(201).json({message: 'Пользователь создан'})
        } catch (e) {
            res.status(500).json({message: 'Something goes wrong'})
        }
    })

// /api/auth/login
router.post(
    '/login',
    [
        check('email', 'Введите корректный email').normalizeEmail().isEmail(),
        check('password', 'Введите пароль').exists()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(404).json({
                    errors: errors.array(),
                    message: 'Некорректные данные при регистрации'
                })
            }

            console.log('Body:', req.body)
            const {email, password} = req.body;

            const user = await User.findOne({email})

            console.log('User:', user)
            if (!user) {
                return res.status(400).json({message: 'User not found'})
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(400).json({message: 'Неверный пароль, попробуйте снова'})
            }

            const token = jwt.sign(
                {userId: user.id},
                config.get('jwtSecret'),
                {expiresIn: '24h'}
            )

            res.status(200).json({token, userID: user.id, isAdmin: user.isAdmin})
        } catch (e) {
            res.status(500).json({message: 'Something goes wrong with login'})
        }
    })

// /api/auth/delete
router.post(
    '/delete',
    async (req, res) => {
        try {
            console.log('Body:', req.body)
            const {email} = req.body;

            const user = await User.findOneAndDelete({email})
            console.log('User:', user)
            // if (!user) {
            //     return res.status(400).json({message: 'User not found'})
            // }
            res.status(200).json({message: 'Пользователь удалён'})
        } catch (e) {
            res.status(500).json({message: 'Something goes wrong with login'})
        }
    })

router.get(
    '/users',
    [],
    async (req, res) => {
        try {
            User.find({}, function (err, users) {
                res.send(users)
            })
        } catch (e) {
            console.log(e.message)
            res.status(500).json({message: 'Something goes wrong with login'})
        }
    })

router.get(
    '/model/:id',
    [],
    async (req, res) => {
        let filePath = '';
        const id = req.params.id;
        if (id === '1') {
            filePath = __dirname + "\\букса.obj"
        }
        if (id === '2') {
            filePath = __dirname + "\\homut.obj"
        }
        // смотрим, есть ли такой файл
        fs.access(filePath, fs.constants.R_OK, err => {
            // если произошла ошибка - отправляем статусный код 404
            if(err){
                res.statusCode = 404;
                res.end("Resourse not found!");
            }
            else{
                fs.createReadStream(filePath).pipe(res);
            }
        });
        // try {
        //     res.sendFile('../models/Chair.obj')
        // } catch (e) {
        //     console.log(e.message)
        //     res.status(500).json({message: 'Something goes wrong with login'})
        // }
    })


module.exports = router;