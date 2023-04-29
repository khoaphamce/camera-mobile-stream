import React, { useState, useEffect } from "react";

import CameraComponent, {
  takePicture,
  cameraStyles,
} from "./components/Camera";
import { connectBroker, publishImage, captureRequestTopic } from "./components/Mqtt";

const mqttClient = connectBroker();

mqttClient.on("messageReceived", (message) => {
  console.log(message.payloadString);

  if (message.topic == captureRequestTopic){
    takePicture(publishImage);
  }
});

export default function App() {
  return CameraComponent(publishImage);
}
