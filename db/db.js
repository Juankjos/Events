// Librery for DB 
const mongoose = require('mongoose');

// Function to connect DB
const connectionDb = async() => {
    try{
        await mongoose.connect(process.env.MONGO,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('DB funcionando');
    }catch(error){
        console.log(error);
        throw new Error('Error al conectarse a la base de datos');
    }
}

// Connect export
module.exports = { connectionDb }