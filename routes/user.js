const { Router } = require('express');
const { check } = require('express-validator');
const { userGet, userDelete, userPut, userPost } = require('../controllers/user');
const { validationFields } = require('../middlewares/validation-fields');
const { emailVer, idUserver, aliasVer } = require('../helpers/dbvalidators');

const router = Router();

router.get('/', userGet);

router.put('/:id', [
    check('id', 'Id is not valid').isMongoId(),
    check('id').custom(idUserver),
validationFields
],userPut);

router.post('/',[
    check('fname', 'First name is required').not().isEmpty(),
    check('lname', 'Last Name is required').not().isEmpty(),
    check('alias', 'Alias is required').not().isEmpty(),
    check('alias').custom(aliasVer),
    check('password', 'Password is required / too short. It has to be 6 characters at least').isLength({min:6}),
    check('email', 'Email is required / not valid').isEmail(),
    check('email').custom(emailVer),
    validationFields
] ,userPost);

router.delete('/:id',[
    check('id', 'Id is not valid').isMongoId(),
    check('id').custom(idUserver),
    validationFields
], userDelete);

module.exports = router;