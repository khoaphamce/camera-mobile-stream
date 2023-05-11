import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, Image, Dimensions } from "react-native";
import { Camera } from "expo-camera";
import { manipulateAsync, FlipType, SaveFormat } from 'expo-image-manipulator';
import * as fs from "expo-file-system";

let cameraInstance = null;
const { height, width } = Dimensions.get('window');
const screenRatio = width/height;

function CameraComponent(publishImage) {
  const [cameraPermission, setCameraPermission] = useState(null);
  const [galleryPermission, setGalleryPermission] = useState(null);

  const [camera, setCamera] = useState(null);
  const [imageUri, setImageUri] = useState("");
  const [type, setType] = useState(Camera.Constants.Type.back);

  const permisionFunction = async () => {
    // here is how you can get the camera permission
    const cameraPermission = await Camera.requestCameraPermissionsAsync();

    setCameraPermission(cameraPermission.status === "granted");

    const imagePermission = await ImagePicker.getMediaLibraryPermissionsAsync();
    console.log(imagePermission.status);

    setGalleryPermission(imagePermission.status === "granted");

    if (
      imagePermission.status !== "granted" &&
      cameraPermission.status !== "granted"
    ) {
      alert("Permission for media access needed.");
    }
  };

  cameraInstance = camera;

  return (
    <View style={cameraStyles.container}>
      <View style={cameraStyles.cameraContainer}>
        <Camera
          ref={(ref) => setCamera(ref)}
          style={cameraStyles.fixedRatio}
          type={type}
          ratio={"16:9"}
        />
      </View>

      <Button
        title={"Take Picture"}
        onPress={() => {
          takePicture(publishImage);
        }}
      />
    </View>
  );
}

const takePicture = async (publishImage) => {
  if (cameraInstance) {
    const base64Image = await cameraInstance.takePictureAsync(
      (options = { base64: true, quality: 1, skipProcessing: false })
    );
    // base64Image = base64Image.replaceAll(" ","+")
    for (i in base64Image){
      console.log(i)
    }
    const manipResult = await manipulateAsync(
      base64Image.uri,
      [
        {"resize":
          {
            height: 809, 
            width: 1438
          }
        }
      ],
      { compress: 1, format: SaveFormat.JPEG, base64: true }
    );
    console.log("base64 image: ", typeof base64Image);
    publishImage(manipResult.base64);
  }
};

const cameraStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cameraContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: 'center'
  },
  fixedRatio: {
    flex: 1,
    aspectRatio: screenRatio-0.55,
  },
  button: {
    flex: 0.1,
    padding: 10,
    alignSelf: "flex-end",
    alignItems: "center",
  },
});

export default CameraComponent;
export { takePicture, cameraStyles };