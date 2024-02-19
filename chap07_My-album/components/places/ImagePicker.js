import { useState } from "react";
import { useCameraPermissions, PermissionStatus, launchCameraAsync} from "expo-image-picker";
import { Alert, Image, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../model/Colors";
import OutlineButton from "../UI/OutlineButton";

// npx expo install expo-image-picker
// npx expo install expo-image
const ImagePicker = ({onTakeImage}) => {

    const [pickedImage, setPickedImage] = useState("");

    const [cameraPermissionInfomation, requestPermission] = useCameraPermissions();

    const verifyPermissions = async () => {
        if (cameraPermissionInfomation.status === PermissionStatus.UNDETERMINED) { // 권한이 없을경우
            const permissionResponse = await requestPermission(); // 권한 부여까지 기다림
            return permissionResponse.granted
        }
        
        if (cameraPermissionInfomation.status === PermissionStatus.DENIED) { // 권한 거부일 경우
            Alert.alert("주의", "위 앱은 카메라 권한이 있어야 합니다.");
            return false;
        }
        
        return true;
    }

    const takeImageHandler = async () => {
        const hasPermission = await verifyPermissions(); // 사진을 찍을때마다 권한 확인

        if (!hasPermission) return;

        const image = await launchCameraAsync({
            allowsEditing: true,
            aspect: [16,9],
            quality: 0.5
        });

        setPickedImage(image.assets[0].uri);
        onTakeImage(image.assets[0].uri);
    }

    let imagePreview = <Text>촬영한 이미지가 없습니다.</Text>

    if (pickedImage) {
        imagePreview = <Image style={styles.image} source={{uri:pickedImage}}/>
    }

    return (
        <View>
            <View style={styles.imagePreview}>
                {imagePreview}
            </View>
            <OutlineButton icon="camera" onPress={takeImageHandler}>촬영하기</OutlineButton>
        </View>
    )

}

export default ImagePicker;

const styles = StyleSheet.create({
    imagePreview:{
        width:'100%',
        height:200,
        marginVertical:8,
        justifyContent:"center",
        alignItems:'center',
        backgroundColor:Colors.primary100,
        borderRadius:4,
        overflow:'hidden'
    },
    image:{
        width:'100%',
        height:'100%'
    }
});