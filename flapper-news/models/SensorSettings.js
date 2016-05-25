var mongoose = require('mongoose');

var SettingsSchema = new mongoose.Schema({
  growState: String,
  Lights_On: 
  {
  	Heat: [{
  		Max: Number,
  		Min: Number
  	}],
  	Humidity: [{
  		Max: Number,
  		Min: Number
  	}]
  },
  Lights_Off: {
  	Heat: [{
  		Max: Number,
  		Min: Number
  	}],
  	Humidity: [{
  		Max: Number,
  		Min: Number
  	}]
  
  }
  ,
  sensor: { type: mongoose.Schema.Types.ObjectId, ref: 'Sensor' }
});



mongoose.model('SensorSettings', SettingsSchema);

/*

meta      : {
        votes : Number
      , favs  : Number
    }

		grow : {
            Lights_On : {
                Heat : {
                    Max : 72,
                    Min : 69
                },
                Humidity : {
                    Max : 65,
                    Min : 55
                }
            },
            Lights_Off : {
                Heat : {
                    Max : 70,
                    Min : 65
                },
                Humidity : {
                    Max : 60,
                    Min : 50
                }
            }
        }

    
    
*/