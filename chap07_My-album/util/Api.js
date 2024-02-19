import { REACT_APP_GOOGLE_API_KEY } from "@env";
console.log(REACT_APP_GOOGLE_API_KEY)

// npm install --save-dev metro-react-native-babel-preset react-native-dotenv
// 역지오 코딩을 이용한 주소 변환
export const getAddress = async (lat, lng) => {

    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${REACT_APP_GOOGLE_API_KEY}`)
                            .then(response => response.json());
    const address = response.results[0]?.formatted_address;

    if (!address){
        throw new Error("사용자 요청 실수");
    }

    return address;
}

export const getMapPreview = ({lat, lng}) => {

    const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=400x200&maptype=roadmap
            &markers=color:red%7Clabel:S%7C${lat},${lng}
            &key=${REACT_APP_GOOGLE_API_KEY}`;

    return imagePreviewUrl;
}