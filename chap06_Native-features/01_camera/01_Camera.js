import { useEffect, useState } from "react";
import {Camera} from "expo-camera"; // npx expo install expo-camera
import { Button, Image, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as MediaLibrary from "expo-media-library"; // npm install expo-media-library

const CameraView = () => {

    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back); // 카메라 후면모드
    const [cameraRef, setCameraRef] = useState(null);
    const [capturedImage, setCapturedImage] = useState(null);
    const [check, setCheck] = useState(false);

    useEffect(() => {
        (async () => {
            const {status} = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === "granted");
        })();
    },[]);

    const handleTakePicture = async () => {
        if(!cameraRef) return;

        try{
            const photo = await cameraRef.takePictureAsync();
            setCapturedImage(photo);

            if(Platform.OS === "ios"){
                await MediaLibrary.saveToLibraryAsync(photo.uri); // import * as MediaLibrary from "expo-media-library"; // npm install expo-media-library
            } else {
                const {status} = await MediaLibrary.requestPermissionsAsync();
                if(status === "granted"){
                    await MediaLibrary.saveToLibraryAsync(photo.uri);
                }
            }
            setCheck(true);
        } catch(error) {
            console.error("Failed to take picture : ", error);
            setCheck(false);
        }
    };

    const handleToggleCameraType = () => {
        setType(type === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back)
    }

    if(hasPermission === null){
        return (
            <View style={styles.permissionDeniedContainer}>
                <Text style={styles.permissionDeniedText}>권한이 승인되지 않았습니다.</Text>
            </View>
        );
    }

    const handleCheck = () => {
        setCheck(!check);
    }

    if(check){
        return (
            <View style={styles.checkContainer}>
                <Image source={{uri:capturedImage.uri}} style={styles.capturedImage} />
                <View style={styles.buttonBox}>
                    <Button onPress={handleCheck} title="확인" />
                </View>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <Camera
                style={styles.camera}
                type={type}
                ref={(ref) => setCameraRef(ref)}
            >
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={handleToggleCameraType}>
                        <Text style={styles.buttonText}>flip Camera</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={handleTakePicture}>
                        <Text style={styles.buttonText}>사진 촬영</Text>
                    </TouchableOpacity>
                </View>
            </Camera>
        </View>
    )

}

export default CameraView;



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000",
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: 20,
    },
    button: {
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 5,
        marginHorizontal: 10,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#000",
    },
    capturedImage: {
        width: 300,
        height: 300,
        alignSelf: "center",
        marginTop: 20,
    },
    permissionDeniedContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    permissionDeniedText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "red",
    },
    checkContainer:{
        flex:1,   
    },
    buttonBox:{
        justifyContent:'center',
        alignContent:'center'
    }
});