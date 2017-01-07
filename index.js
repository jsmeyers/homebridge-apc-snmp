var Service, Characteristic;
var apcUps = require("./snmp.js");
var ipaddress = require("./ipaddress");
var ups = new apcUps(ipaddress);

const DEF_MIN_TEMPERATURE = -100,
      DEF_MAX_TEMPERATURE = 100,
      DEF_TIMEOUT = 5000;

module.exports = function(homebridge) {
    Service = homebridge.hap.Service;
    Characteristic = homebridge.hap.Characteristic;
    homebridge.registerAccessory("homebridge-apc-snmp", "APC", APCAccessory);
}

function APCAccessory(log, config) {
    this.log = log;
    this.name = config["name"];
    this.location = config["location"];
    this.model = config["model"] || "Model not available";
    this.serial = config["serial"] || "Non-defined serial";
    this.minTemperature = config["min_temp"] || DEF_MIN_TEMPERATURE;
    this.maxTemperature = config["max_temp"] || DEF_MAX_TEMPERATURE;
    this.temperature = 0.0;
}

APCAccessory.prototype = {
   getState: function(callback) {
       ups.getTemperature(function(error, temperature) {
        if (error) {
            console.log(error);
        callback('24');
              
       }
       console.log('The current temperature is:', temperature, 'C');
             this.temperature = 25.1;
             console.log(this.temperature);
               callback('25.1');
             
   });

   },
   identify: function(callback) {
        this.log("Identify requested!");
        callback(); // success
   },

   getServices: function () {
      this.informationService = new Service.AccessoryInformation();
      this.informationService
      .setCharacteristic(Characteristic.Manufacturer, this.manufacturer)
      .setCharacteristic(Characteristic.Model, this.model)
      .setCharacteristic(Characteristic.SerialNumber, this.serial);

      this.temperatureService = new Service.TemperatureSensor(this.name);
      this.temperatureService
         .getCharacteristic(Characteristic.CurrentTemperature)
         .on{('get', this.getState.bind(this))
            console.log('test'))
            }         
         .setProps({
             minValue: this.minTemperature,
             maxValue: this.maxTemperature
         });
      return [this.informationService, this.temperatureService];
   }
};   
