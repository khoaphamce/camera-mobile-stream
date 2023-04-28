import { Client, Message } from "react-native-paho-mqtt";

const connectUrl = "ws://192.168.1.74:8883/";
const mqttBrokerId = "Iot_1";
const captureRequestTopic = `${mqttBrokerId}/Capture`

const myStorage = {
  setItem: (key, item) => {
    myStorage[key] = item;
  },
  getItem: (key) => myStorage[key],
  removeItem: (key) => {
    delete myStorage[key];
  },
};

let option = {
  uri: connectUrl,
  clientId: mqttBrokerId,
  storage: myStorage,
};

// Create a client instance
const client = new Client(option);

// set event handlers
client.on("connectionLost", (responseObject) => {
  if (responseObject.errorCode !== 0) {
    console.log(responseObject.errorMessage);
  }
});

function connectBroker() {
  // connect the client
  client
    .connect()
    .then(() => {
      // Once a connection has been made, make a subscription and send a message.
      console.log("onConnect");
      client.subscribe(captureRequestTopic);
    })
    .catch((responseObject) => {
      if (responseObject.errorCode !== 0) {
        console.log("onConnectionLost:" + responseObject.errorMessage);
      }
    });

  return client;
}

function publishImage(imageBuffer) {
  let message = new Message(imageBuffer);
  message.destinationName = "Image";

  client.send(message);
}

export { connectBroker, publishImage, mqttBrokerId };
