var express = require('express');
var router = express.Router();

const {auth} = require('../middleware/auth');
const { getAll, add, getEmployee, remove, edit } = require('../controllers/employees');

// /api/employees
router.get('/', auth, getAll);

// /api/employees/:id
router.get('/:id', getEmployee);

// /api/employees/add
router.post('/add', auth, add);

// /api/employees/remove/:id
router.post('/remove/:id', auth, remove);

// /api/employees/:id
router.put('/edit/:id', auth, edit);

module.exports = router;
