const Sensor = require('../models/user.model.js');
 
// Save FormData to MongoDB
exports.save = (req, res) => {
	console.log('Post a User: ' + JSON.stringify(req.body));
	
    // Create 
    const sensor = new Sensor({
        sound: req.body.sound,
        light: req.body.light,
        temperature: req.body.temperature,
        time: req.body.time,
        humidity: req.body.humidity,
        air:{ co2:req.body.co2 , pm25:req.body.pm25 , no2:req.body.no2 }
    });
 
    // Save in the MongoDB (not working yet)
    sensor.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};
 
// Fetch all Data
exports.findAll = (req, res) =>  {
	console.log("Fetch all Data");
	
    Sensor.find()
    .then(sensors => {
        res.send(sensors);
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};

// Fetch last data
exports.findLast = (req, res) =>  {
	console.log("Fetch last Data");
	
    Sensor.find()
    .then(sensors => {
        res.send(sensors.pop());
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};