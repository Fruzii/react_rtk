var express = require('express');
var router = express.Router();
// import {login, register, current} from '../controllers/users.js'
const {login, register, current} = require('../controllers/users')
const {auth} = require('../middleware/auth')

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

// ./api/users/login
router.post('/login', login);

// ./api/users/register
router.post('/register', register);

// ./api/users/current
router.get('/current', auth, current);

module.exports = router;
