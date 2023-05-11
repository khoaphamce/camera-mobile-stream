import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, Image, Dimensions } from "react-native";
import { Camera } from "expo-camera";
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

  downloadFile();

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

      <Button
        title={"Precise Picture"}
        onPress={() => {
          takePrecisePicture(publishImage);
        }}
      />
    </View>
  );
}

function downloadFile(){
  try {
    const downloadUrl = 'https://ibb.co/yFh7Vdf'; 
    const fileUri = fs.documentDirectory + 'lu_1.jpg'; 
    const { uri } = fs.downloadAsync(downloadUrl, fileUri);
    console.log('File downloaded to:', uri);
  } 
  catch (error) {
    console.log(error);
  }
};

const readFile = async () => {
  try {
    const filePath = fs.documentDirectory + 'lu_1.jpg'; // Replace with the actual file name and extension
    const fileContent = await fs.readAsStringAsync(filePath,{
      encoding: fs.EncodingType.Base64,
    });
  } 
  catch (error) {
    console.log(error);
  }
};

const takePicture = async (publishImage) => {
  if (cameraInstance) {
    const base64Image = await cameraInstance.takePictureAsync(
      (options = { base64: true, quality: 0.5, skipProcessing: false })
    );
    // base64Image = base64Image.replaceAll(" ","+")
    console.log("base64 image: ", typeof base64Image);
    for (i in base64Image) {
      console.log(i);
    }
    publishImage(base64Image.base64);
  }
};

const takePrecisePicture = async (publishImage) => {
  cameraStyles.cameraContainer.backgroundColor = "yellow"
  const base64Image = readFile()
  // base64Image = base64Image.replaceAll(" ","+")
  console.log("precise picture");
  publishImage(base64Image);
};

const cameraStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cameraContainer: {
    backgroundColor: "white",
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

export default CameraComponent
export { takePicture, cameraStyles, takePrecisePicture}