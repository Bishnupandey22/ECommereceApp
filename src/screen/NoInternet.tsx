import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'

interface NoInternetAgrs {
    onRefresh?: () => void
}

export default function NoInternet({ onRefresh }: NoInternetAgrs) {
    return (
        <View style={{ display: "flex", justifyContent: "center", alignItems: "center", width: responsiveWidth(100), height: responsiveHeight(100), backgroundColor: "white" }}>
            <View>
                <Image
                    source={require('../assets/icons/no-internet.png')}
                    style={{ width: responsiveWidth(50), height: responsiveHeight(30) }}
                    resizeMode='contain'
                />
            </View>
            <View style={{ width: responsiveWidth(85) }}>
                <Text style={{ color: "black", fontSize: responsiveFontSize(2), fontWeight: "800", textAlign: "center", marginBottom: responsiveHeight(1) }}>Something Went Wrong!</Text>
                <Text style={{ color: "black", fontSize: responsiveFontSize(2), textAlign: "center" }}>Slow or no internet connection Please Check your internet settings</Text>
            </View>
            <View style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: responsiveHeight(5) }}>
                <TouchableOpacity onPress={onRefresh} style={{ width: responsiveWidth(50), height: responsiveHeight(6), backgroundColor: "#1877F2", borderRadius: responsiveHeight(3), justifyContent: "center", alignItems: "center" }}>
                    <Text style={{ color: "white", fontSize: responsiveFontSize(2.3), fontWeight: "800", textAlign: "center" }}>Refresh</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({})