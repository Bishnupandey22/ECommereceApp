// src/screens/product/AllProducts.js
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState, useContext } from 'react';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { CartContext } from '../../context/CartContext';

export default function AllProducts() {
    const [products, setProducts] = useState([]);
    const navigation = useNavigation();
    const { addToCart } = useContext(CartContext);
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        axios.get("https://jsonplaceholder.typicode.com/photos?_limit=100")
            .then(response => {
                setLoading(false);

                const dataWithDetails = response.data.map(item => ({
                    ...item,
                    price: Math.floor(Math.random() * 1000) + 100,
                    description: "This is a dummy description for the product."
                }));
                setProducts(dataWithDetails);
            })
            .catch(error => console.error(error));
    }, []);

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.cardContainer}
            onPress={() => navigation.navigate('ProductDetails', { product: item })}
        >
            <Image source={{ uri: item.url }} style={styles.imgStyle} />
            <Text style={styles.headingText} numberOfLines={1}>{item.title}</Text>
            <Text style={[styles.headingText, { fontSize: responsiveFontSize(2) }]}>${item.price}</Text>
            <Text style={styles.descriptionText} numberOfLines={2}>{item.description}</Text>
            <TouchableOpacity
                style={styles.buttonLayout}
                onPress={() => addToCart(item)}
            >
                <Text style={styles.buttonText}>Add to Cart</Text>
            </TouchableOpacity>
        </TouchableOpacity>
    );
    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#3e64ff" />
            </View>
        );
    }
    return (
        <View style={styles.container}>
            <TouchableOpacity style={{ height: responsiveHeight(3), width: responsiveWidth(100), paddingLeft: responsiveWidth(5), marginTop: responsiveHeight(2), marginBottom: responsiveHeight(1) }} onPress={() => navigation.navigate("Cart")}>
                <Text style={{ color: "black", textAlign: "left" }}>Go To Cart</Text>
            </TouchableOpacity>
            <FlatList
                data={products}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#b2b2b2",
        width: responsiveWidth(100),
        height: responsiveHeight(100),
        paddingHorizontal: responsiveWidth(3),
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    cardContainer: {
        flex: 1,
        margin: responsiveWidth(1.5),
        backgroundColor: "white",
        borderRadius: responsiveHeight(2),
        justifyContent: "center",
        alignItems: "center",
        padding: responsiveWidth(3),
    },
    imgStyle: {
        width: responsiveWidth(36),
        height: responsiveHeight(15),
        resizeMode: "contain"
    },
    headingText: {
        fontSize: responsiveFontSize(1.6),
        color: "black",
        fontWeight: "bold",
        marginTop: responsiveHeight(1)
    },
    descriptionText: {
        fontSize: responsiveFontSize(1.4),
        color: "gray",
        textAlign: 'center',
        marginVertical: responsiveHeight(1)
    },
    buttonLayout: {
        width: responsiveWidth(35),
        height: responsiveHeight(4),
        backgroundColor: "#3e64ff",
        borderRadius: responsiveHeight(1),
        justifyContent: "center",
        alignItems: "center",
        marginTop: responsiveHeight(1)
    },
    buttonText: {
        textAlign: "center",
        fontSize: responsiveFontSize(2),
        color: "white"
    }
});
