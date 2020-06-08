const express = require('express')
const router = express.Router()
const passport = require('passport')
require('dotenv').config()

const checkLoggedIn = (req, res) => {
  if (!req.isAuthenticated()) {
    res.redirect('/login')
  }
}

router.get('/', (req, res) => {
  checkLoggedIn(req, res)
  res.render('index')
})

router.get('/login', (req, res) => {
  res.render('./pages/login')
})

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) { return next(err) }
    if (!user) { return res.redirect('/login') }
    req.login(user, (err) => {
      if (err) { return next(err) }
      return res.redirect('/')
    })
  })(req, res, next)

})

module.exports = router
