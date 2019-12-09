const User = require('../models/user.model')

module.exports.home = (_, res) => {
    res.render('default')
}

module.exports.login = (_, res) => {
    res.render('user/login')
}

module.exports.doLogin = (req, res, next) => {
    const { email, password } = req.body

    if( !email || !password){
        return res.render('/login', { user: req.body })
    }

    User.findOne({ email: email})
        .then(user => {
            if(!user){
                res.render('/login', {user: req.body, error: {password: 'Contraseña invalida'}})
            }else{
                return user.checkPassword(password)
                    .then(match => {
                        if(!match){
                            res.render('/login', {user: req.body, error: { password: 'Contraseña invalida'}})
                        }else{
                            req.session.user = user
                            res.redirect('/user/home')
                        }
                    })
            }
        })
        .catch(error => next(error))
}

module.exports.create = (_, res) => {
    res.render('user/new')
}

module.exports.doCreate = (req, res, next) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })

    console.log(user)

    // if(!user.name || !user.email || user.password){
    //     res.render('user/new' , {user: req.body})
    // }

    user.save()
        .then(user => {
            res.redirect('/login')
        })
        .catch(error => {
            console.log(error)
            if (error instanceof mongoose.Error.ValidationError) {
                res.render('user/new', {
                    user,
                    error: error.errors
                })
            } else if (error.code === 11000) {
                res.render('users/new', {
                    user: {
                        ...user,
                        password: null
                    },
                    genericError: 'User exists'
                })
            } else {
                next(error);
            }
        })
}

module.exports.logout = (req, res) => {
    req.session.destroy()
    res.redirect('/login')
}

module.exports.userHome = (req, res, next) => {
    res.render('user/home')
}