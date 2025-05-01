import React, { useState } from 'react';
import {
  View,
  Button,
  Image,
  PermissionsAndroid,
  Platform,
  Text,
  StyleSheet,
} from 'react-native';
import { launchCamera } from 'react-native-image-picker';
import RNFS from 'react-native-fs';

const App = () => {
  const [photoUri, setPhotoUri] = useState(null);

  const requestPermissions = async () => {
    if (Platform.OS === 'android') {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA
      );
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
      );
    }
  };

  const openCamera = async () => {
    await requestPermissions();

    launchCamera(
      {
        mediaType: 'photo',
        saveToPhotos: false,
      },
      async (response) => {
        if (response.didCancel || response.errorCode) {
          console.warn('Camera cancelled or failed');
          return;
        }

        if (response.assets && response.assets.length > 0) {
          const source = response.assets[0];
          const fileName = `photo_${Date.now()}.jpg`;

          const destPath =
            Platform.OS === 'android'
              ? `${RNFS.PicturesDirectoryPath}/${fileName}`
              : `${RNFS.DocumentDirectoryPath}/${fileName}`;

          try {
            await RNFS.copyFile(source.uri, destPath);
            setPhotoUri('file://' + destPath);
            console.log('Saved to:', destPath);
          } catch (err) {
            console.error('Failed to save image:', err);
          }
        }
      }
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Atanasius Raditya Herkristito - 0000044898</Text>
      <Button title="OPEN CAMERA" onPress={openCamera} />
      {photoUri && (
        <Image
          source={{ uri: photoUri }}
          style={styles.image}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { marginBottom: 10 },
  image: { width: 200, height: 200, marginTop: 20 },
});

export default App;

// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';

// const [uri, setUri] = useState("");
//   const saveFile = async () => {
//     const path = RNFS.DownloadDirectoryPath + "/test.txt";
//     RNFS.writeFile(path, "Lorem ipsum dolor sit amet", "utf8")
//       .then((res) => {
//         console.log("Success create file. Check your download folder");
//       })
//       .catch((err) => {
//         console.error(err)
//       })
//   }

//   const openImagePicker = () => {
//     launchImageLibrary(
//       {
//         mediaType: "photo",
//         includeBase64: false,
//         maxHeight: 2000,
//         maxwidth: 2000,
//       },
//       handleResponse
//     );
//   };

//   const handleCameraLaunch = () => {
//     LaunchCamera(
//       {
//         mediaType: "photo",
//         includeBase64: false,
//         maxHeight: 2000,
//         maxwidth: 2000,
//       },
//       handleResponse
//     );
//   };

//   const requestCameraPermission= async() => {
//     try {
//       const granted = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.CAMERA,
//         {
//           title: "Camera Permission",
//           message: "This app needs access to your camera to take photos.",
//           buttonNeutral: "Ask Me Later",
//           buttonNegative: "Cancel",
//           buttonPositive: "OK",
//         }
//       );
//       if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//         console.log("Camera permission granted");
//         handleCameraLaunch();
//       } else {
//         console.log("Camera permission denied");
//       } 
//     } catch (err) {
//       console.warn(err);
//     }
//   };

//   const handleResponse = (response) => {
//     if (response.didCancel) {
//       console.log("User cancelled image picker");
//     } else if (response.error) {
//       console.log("Image picker error:", response.error);
//     } else if (response.assets && response.assets.length > 0) {
//       const imageuri = response.assets[0].uri;
//       setUri(imageuri);
//     } else {
//       console.log("No assets found in the response");
//     };
//   };

//   export default function App() {
//     return (
//       <View style={styles.container}>
//         <Text>Open up App.js to start working on your app!</Text>
//         <StatusBar style="auto" />
//       </View>
//     );
//   }
  
//   const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       backgroundColor: '#fff',
//       alignItems: 'center',
//       justifyContent: 'center',
//     },
//   });
  