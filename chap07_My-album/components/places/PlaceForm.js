import { useCallback, useState } from "react"
import { Alert, Button, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { Places } from "../../model/place";
import { Colors } from "../../model/Colors";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";

const PlaceForm = ({onCreatePlace}) => {

    const [enteredTitle, setEnteredTitle] = useState("");
    const [selectedImage, setSelectedImage] = useState();
    const [pickedLocation, setPickedLocation] = useState();

    const changeTitleHandler = (enteredText) => {
        setEnteredTitle(enteredText);
    }

    const takeImageHandler = (imageUri) => {
        setSelectedImage(imageUri);
    }

    const pickedLocationHandler = useCallback((location) => {
        setPickedLocation(location);
    },[]);

    const savePlaceHandler = () => {
        if (enteredTitle === "" || enteredTitle === null){
            Alert.alert("필수값 입력", "제목을 입력해주세요");
            return;
        } else if (!selectedImage) {
            Alert.alert("필수값 입력", "이미지를 추가해주세요");
            return;
        } else if (!pickedLocation) {
            Alert.alert("필수값 입력", "지도를 추가해주세요");
            return;
        }

        const placeData = new Places(enteredTitle, selectedImage, pickedLocation);
        onCreatePlace(placeData);
        
    }

    return (
        <ScrollView style={styles.form}>
            <View>
                <Text style={styles.label}>Title</Text>
                <TextInput style={styles.input} onChangeText={changeTitleHandler} value={enteredTitle}/>
            </View>
            <ImagePicker onTakeImage={takeImageHandler}/>
            <LocationPicker onPickLocation={pickedLocationHandler}/>
            <Button onPress={savePlaceHandler} title="addPlace"/>
        </ScrollView>
    )
}

export default PlaceForm;

const styles = StyleSheet.create({
    form:{
        flex:1,
        padding:24
    },
    label:{
        fontWeight:'bold',
        marginBottom:4,
        color:Colors.primary500

    },
    input:{
        marginVertical:8,
        paddingHorizontal:4,
        paddingVertical:8,
        fontSize:16,
        borderBottomColor: Colors.primary700,
        borderBottomWidth:2,
        backgroundColor:Colors.primary100
    }
})