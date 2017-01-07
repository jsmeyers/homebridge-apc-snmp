var Service, Characteristic;
var temperatureService;
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
    this.lastupdate = 0;
    this.model = config["model"] || "Model not available";
    this.serial = config["serial"] || "Non-defined serial";
    this.timeout = config["timeout"] || DEF_TIMEOUT;
    this.minTemperature = config["min_temp"] || DEF_MIN_TEMPERATURE;
    this.maxTemperature = config["max_temp"] || DEF_MAX_TEMPERATURE;
}

APCAccessory.prototype = {
   getState: function(callback) {
       ups.getTemperature(function(error, temperature) {
        if (error) {
            console.log(error);
        return;
       }
       console.log('The current temperature is:', temperature.toString(), 'C');
               callback('25');
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
         .on('get', this.getState.bind(this))
         .setProps({
             minValue: this.minTemperature,
             maxValue: this.maxTemperature
         });
      return [this.informationService, this.temperatureService];
   }
};   
