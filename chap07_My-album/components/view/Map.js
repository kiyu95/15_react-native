import { useCallback, useLayoutEffect, useState } from "react"
import { Alert, StyleSheet, TurboModuleRegistry } from "react-native";
import IconButton from "../UI/IconButton";
import MapView,{Marker} from 'react-native-maps';

// npx expo install react-native-maps
// import MapView,{Marker} from 'react-native-maps';
const Map = ({navigation, route}) => {

    // 초기 위치가 존재하는 경우
    const initalLocation = route.params && {
        lat : route.params.latitude,
        lng : route.params.longitude
    }

    const [selectedLocation, setSelectedLocation] = useState(initalLocation);

    const region = {
        latitude : initalLocation ? initalLocation.lat : 37.78,
        longitude : initalLocation ? initalLocation.lng : -122.43,
        latitudeDelta : 0.0922,
        longitudeDelta : 0.0421
    }

    const selectedLocationHandler = (event) => {
        if (initalLocation) return;

        const lat = event.nativeEvent.coordinate.latitude;
        const lng = event.nativeEvent.coordinate.longitude;

        setSelectedLocation({lat:lat, lng:lng});
    }

    const savePickedLocationHandler = useCallback(() => {
        if (!selectedLocation){
            Alert.alert("알림", "위치를 선택해주세요");
            return;
        }

        navigation.navigate("AddPlace", {
            pickedLat : selectedLocation.lat,
            pickedLng : selectedLocation.lng
        });
    },[navigation, selectedLocation]);

    useLayoutEffect(() => {
        if (initalLocation){
            return;
        }

        navigation.setOptions({
            headerRight:({tintColor}) => (
                <IconButton icon="save" size={24} color={tintColor} onPress={savePickedLocationHandler}/>
            )
        })
    },[navigation, savePickedLocationHandler, initalLocation]);

    // npx expo install react-native-maps
    // import MapView,{Marker} from 'react-native-maps';
    return (
        <MapView
            style={styles.map}
            initialRegion={region}
            onPress={selectedLocationHandler}
        >
            {
                selectedLocation && <Marker title="선택 위치" coordinate={{latitude:selectedLocation.lat, longitude:selectedLocation.lng}}/>
            }
        </MapView>
    )
}

export default Map;

const styles = StyleSheet.create({
    map:{
        flex:1
    }
});