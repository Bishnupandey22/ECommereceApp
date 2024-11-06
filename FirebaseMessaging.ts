import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import { PermissionsAndroid, Platform } from 'react-native';


export async function requestUserPermission() {

    // console.log("PermissionsAndroid.RESULTS.granted", PermissionsAndroid.RESULTS.GRANTED)
    if (Platform.OS == 'android' && Platform.Version >= 33) {
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
        console.log("grantedgranted", granted)
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            getFCMToken()
        } else {
            console.log("permission denied")
        }
    }

}

export async function getFCMToken() {

    console.log("calling grandted firebase");
    try {
        await messaging().registerDeviceForRemoteMessages();

        const token = await messaging().getToken();

        await AsyncStorage.setItem('fcm_token', token);

        console.log("tokenFcm", token);

    } catch (error) {
        console.log("error during generating token", error)
    }
}