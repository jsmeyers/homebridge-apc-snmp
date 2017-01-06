var Service, Characteristic;
var temperatureService;
var apcUps = require("./snmp.js");
var ipaddress = require("./ipaddress");
var ups = new apcUps(ipaddress);

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
}

<<
<< << < HEAD
APCAccessory.prototype = {
        getState: function(callback) {
                ups.getTemperature(function(err, temperature) {
                    if (err) {
                        console.log(err.toString());
                        callback(err);
                        return;
                    }
                    this.log('The current temperature is:', temperature, 'C');
                    this.temperature = temperature;
                    temperatureService.setCharacteristic(Characteristic.CurrentTemperature, this.temperature);

                    this.log('The current temperature is:', temperature, 'C');
                    callback(null, temperature);
                }.bind(this)); ===
                === =
                APCAccessory.prototype = {
                    getState: function(callback) {
                        ups.getTemperature(function(err, temperature) {
                            if (err) {
                                console.log(err.toString());
                                callback(error);
                                return;
                            }
                            this.log('The current temperature is:', temperature, 'C');
                            this.temperature = temperature;
                            temperatureService.setCharacteristic(Characteristic.CurrentTemperature, this.temperature);
                            callback(null, temperature);
                        }.bind(this));


                    },
                    identify: function(callback) {
                        this.log("Identify requested!");
                        callback(); // success
                    },

                    getServices: function() {
                        var informationService = new Service.AccessoryInformation();

                        informationService
                            .setCharacteristic(Characteristic.Manufacturer, "OpenWeatherMap")
                            .setCharacteristic(Characteristic.Model, "Location")
                            .setCharacteristic(Characteristic.SerialNumber, "");

                        temperatureService = new Service.TemperatureSensor(this.name);
                        temperatureService
                            .getCharacteristic(Characteristic.CurrentTemperature)
                            .on("get", this.getState.bind(this));

                        temperatureService
                            .getCharacteristic(Characteristic.CurrentTemperature)
                            .setProps({
                                minValue: -30
                            });

                        temperatureService
                            .getCharacteristic(Characteristic.CurrentTemperature)
                            .setProps({
                                maxValue: 120
                            });

                        return [informationService, temperatureService];
                    }


                };
