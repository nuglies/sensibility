var mongoose = require('mongoose');

var SensorSchema = new mongoose.Schema({
  clientID: Number,
  sensorCode: String,
  sensorName: String,
  area: String,
  growState: String,
  strain: String,
  sensorsettings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SensorSettings' }]
});

mongoose.model('Sensor', SensorSchema);