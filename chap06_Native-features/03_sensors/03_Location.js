import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';

import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';

// npx expo install expo-location
// npm install react-native-maps
const LocationPicker = () => {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
        (async () => {

            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('위치에 대한 접근 권한이 거부되었습니다');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location.coords);
        })();
    }, []);

    if (!location) {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>기다리는 중..</Text>
            </View>
        );
    }

    const region = {
        // 지도의 중앙을 보여주는 속성
        latitude : location&& location.latitude, 
        longitude: location&& location.longitude,
        // 중앙 이외 컨텐트를 얼마나 보여줄지 결정
        latitudeDelta : 0.01,
        longitudeDelta : 0.005
    }

    return (
        <MapView
            style={styles.map}
            initialRegion={region}
        >
            <Marker
                title='선택한 위치'
                coordinate={{ latitude: location.latitude, longitude: location.longitude }} />
        </MapView>
    )
}

export default LocationPicker;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 18,
    },
    map:{
        flex:1
    }
});