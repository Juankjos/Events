const {Schema, model} = require('mongoose');

const eventSchema = Schema ({
    name_event:{
        type: String,
        required: [true, 'Name Event is required']
    },
    type_event:{
        type: String,
        required: true,
        enum: ['Enterprise', 'Finance', 'Education', 'Leisure', 'Sporty', 'Administrative', 'Social', 'Convention']
    },
    size_event:{
        type: String,
        required: true,
        enum: ['Mini', 'Small', 'Medium', 'Big', 'Mega']
    },
    area_event:{
        type: String,
        required: [true, 'Area Event is required']
    },
    //YYYY-MM-DD
    day_start:{
        type: Date,
        required: [true, "Date is required"]
    },
    day_finish:{
        type: Date,
        required: [true, "Date is required"]
    },
    created_date:{
        type: Date,
        default: Date.now
    },
    status:{
        type: Boolean,
        default: true
    },
    //Agregar una llave foranea
    fk_part:{
        type: Schema.ObjectId, ref: "User"
    }
});

module.exports = model('Event', eventSchema);