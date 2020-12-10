const mongoose = require('mongoose');
 
const sensorsSchema = mongoose.Schema({
    sound: Number,
    light: Number,
    temperature: Number,
    time: Number,
    humidity: Number,
    air:{ co2:Number , pm25:Number , no2:Number }
});
 
module.exports = mongoose.model('sensors', sensorsSchema);

