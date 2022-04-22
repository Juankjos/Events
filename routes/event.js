const { Router } = require('express');
const { check } = require('express-validator');
const { eventGet, eventDelete, eventPut, eventPost } = require('../controllers/event_controller');
const { validationFields } = require('../middlewares/validation-fields');
const { idEventver, eventVer, areaVer, dayVer } = require('../helpers/dbvalidators');

const router = Router();

router.get('/', eventGet);

router.put('/:id', [
    check('id', 'Id is not valid').isMongoId(),
    check('id').custom(idEventver),
validationFields
],eventPut);

router.post('/',[
    check('name_event', 'Name event is required').isString().custom(eventVer),
    check('type_event', 'Type event is required').isIn(['Enterprise', 'Finance', 'Education', 'Leisure', 'Sporty', 'Administrative', 'Social', 'Convention']),
    check('size_event', 'Size event is required').isIn(['Mini', 'Small', 'Medium', 'Big', 'Mega']),
    check('area_event', 'Area event is required').isString().custom(areaVer),
    check('day_start', 'Day Start event is required').custom(dayVer),
    check('day_start', 'Day Start event is required / Writting is wrong')
    .custom((day_start, { req }) => dayVer(day_start)),
    check('day_finish', 'Day Finish event is required / Writting is wrong')
    .custom((day_finish, { req }) => dayVer(day_finish)),    
    validationFields
] ,eventPost);

router.delete('/:id',[
    check('id', 'Id is not valid').isMongoId(),
    check('id').custom(idEventver),
    validationFields
], eventDelete);

module.exports = router;