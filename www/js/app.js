/**
 * Author : Galadima Ahmed
 * 6th semester home automation project 
 * 
 * 
 * 
 * 
 * 
 */

//get the input host url, port and connect to MQTT server using the MQTT client
var client;
var mqtt;

var url = document.getElementById("urlInput");

var port = document.getElementById("portInput");
var connectButton = document.getElementById("connectButton");
var disconnectButton = document.getElementById("disconnectButton");
var clientId = document.getElementById("clientIdInput");
var device1 = document.getElementById("publishTopic1");
var device2 = document.getElementById("publishTopic2");
var device3 = document.getElementById("publishTopic3");

var temperature = document.getElementById("subscribed");

/**---------------connecting to MQTT from here using the connect () method--------------- 
 * I have to include the client ID function and connection paprameters after test
 * 
 * 
 * 
*/


    connectButton.addEventListener("click", connectMQTT());
    disconnectButton.addEventListener("click", disconnect());

    //lets us know the status of the connection (not needed any more because of the client.connect)
    let status = false;
    
    //update the status in the fromend and change the color
    if (client.connected == true) {
        document.getElementById("con").innerHTML = "<h4 style= 'color:green;'>connected</h4>";
        console.log(document.getElementById("con").innerHTML);
    }
    
    //handles failure
    if (failure() = true) {
        document.getElementById("con").innerHTML = "<h4 style= 'color:red;'>Fail to connect</h4>";
    }
    

 device1.addEventListener("click", publish("myhome/room1/device1", "I worked device 1"));
 device2.addEventListener("click", publish("myhome/room1/device2", "I worked device 2"));

 device3.addEventListener("click", publish("myhome/room1/device1", "I worked device 3"));
 temperature.addEventListener("click", subscribe("myhome/room2/temperature", "I worked temperature"));

/** ----------------------All necessary function for MQTT starts here--------------
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 */
//connects to server when the connect button is clicked
function connectMQTT() {
    mqtt = require('mqtt');
    client = mqtt.connect(url, { clientId: "mqttjs01" });

    client.om("connect", function () {
        console.log("connceted");
        status = true;
    })
}

//disconnect the client from the server
function disconnect() {
    client.end();
}

//fails to connect
function failure() {
    client.on("error",function(error){
        console.log("Can't connect" + error);
        process.exit(1)});
        return true;
}


//publish a message 

function publish(topic, message){   
        client.publish(topic, message)
}

//subscribing to a topic

function subscribe(topic1){
    client.subscribe(topic1);

    //handles incoming messages
    client.on('message',function(topic, message, packet){
        console.log("message is "+ message);
        console.log("topic is "+ topic);
    });
}

//generate random value for the client ID
function genClientId() {
    let randomValue;
    var a;
    var clienTid = [];

    for (a; a < 5; a++) {

        randomValue = Math.random();
        clientId.push(randomValue);

    }
    return clientId;
} 