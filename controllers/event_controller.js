const { response } = require('express');
const Event = require('../models/events_model');

const eventGet = async(req = request, res = response) => {
    const {mylimit = 20, init = 0} =req.query;
    const query = {status: true};

    const [totalEvents, event] = await Promise.all([
        Event.countDocuments(query),
        Event.find(query)
        .skip(Number(init))
        .limit(Number(mylimit))
    ])
    res.json({
        totalEvents, 
        event
    });
}

const eventPost = async(req, res = response) => {

    const {name_event, type_event, size_event, area_event, day_start, day_finish, created_date} = req.body;
    const event = new Event({name_event, type_event, size_event, area_event, day_start, day_finish, created_date});

    await event.save();
    res.json({
        msg: 'post CONTROLLER',
        event
    });
}

const eventPut = async(req, res = response) => {
    const {id} = req.params;
    const {_id, ...every} = req.body;

    const event = await Event.findByIdAndUpdate(id, every);

    res.json(event);
}

const eventDelete = async(req, res = response) => {
    const {id} = req.params;

    const event = await Event.findByIdAndUpdate(id, {status: false});
    res.json(event);
}

module.exports = {
    eventGet,
    eventPost,
    eventPut,
    eventDelete
}