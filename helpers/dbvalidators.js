const User = require('../models/users')
const Event = require('../models/events_model')
const moment = require('moment')

const emailVer = async (email = '') =>{
    //Verificación existencia de Email
    const emailExist = await User.findOne({email});
    if(emailExist){
        throw new Error(`Email ${email} already exist`);
    }
}

//Verificación existencia de evento
const eventVer = async (name_event = '')=>{
const eventExist = await Event.findOne({name_event, status:true});
    if(eventExist){
        throw new Error(`Event ${name_event} already exist`);
        }
}

const areaVer = async (area_event = '')=>{
    const areaExist = await Event.findOne({area_event, status:true});
        if(areaExist){
            throw new Error(`Area ${area_event} already in use`);
            }
}

//Validación día
const dayVer = async (Date) =>{
    //Formatos válidos para los datos que van a ser ingresados
    const formats = ["YYYY-MM-DD hh:mm","YYYY-MM-DD HH:mm"];
    //const hourFormat = ["hh:mm","HH:mm"];
    // const dSExist = await Event.findOne({day_start, status:true});
    // const dFExist = await Event.findOne({day_finish, status:true});
    //Toma los valores y el formato en cómo se van a enviar los datos, si funciona regresa un verdadero, si no un falso
    let isValid = moment(Date, formats, true).isValid();

    //Si el formato no es correcto se enviará este error
    if(!isValid){
        throw new Error(`${Date} Is an invalid DATE FORMAT / Must be, for example "YYYY-MM-DD hh:mm","YYYY-MM-DD HH:mm"`);
    }//Investigar el else cómo hacer un match de si en la misma hora y en el mismo escenario que sea inválido

    else if(dSExist || dFExist){
        throw new Error(`Date Start ${day_start} or Date Finish ${day_finish} already in use`);
    }

}

const aliasVer = async (alias = '') =>{
    //Verificación existencia de Alias
    const aliasExist = await Event.findOne({alias});
    if(aliasExist){
        throw new Error(`Alias ${alias} already exist`);
    }
}

const idUserver = async (id) =>{
    const idExist = await User.findById(id);
    if(!idExist){
        throw new Error(`Id ${id} doesn't exist`);
    }
}

const idEventver = async (id) =>{
    const idExist = await Event.findById(id);
    if(!idExist){
        throw new Error(`Id Event ${id} doesn't exist`);
    }
}

module.exports = {
    emailVer,
    aliasVer,
    idUserver,
    idEventver,
    eventVer,
    areaVer,
    dayVer
}