// // src/screens/product/ProductDetails.js
// import React, { useContext } from 'react';
// import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
// import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
// import { CartContext } from '../../context/CartContext';
// import { useNavigation } from '@react-navigation/native';

// export default function ProductDetails({ route }) {
//     const { product } = route.params;
//     const { addToCart } = useContext(CartContext);
//     const navigation = useNavigation();

//     return (
//         <>

//             <View style={styles.container}>
//                 <TouchableOpacity style={{ height: responsiveHeight(3), width: responsiveWidth(100), paddingLeft: responsiveWidth(5), }} onPress={() => navigation.goBack()}>
//                     <Text style={{ color: "black", textAlign: "left" }}>Go Back</Text>
//                 </TouchableOpacity>
//                 <Image source={{ uri: product.url }} style={styles.imgStyle} />
//                 <Text style={styles.headingText}>{product.title}</Text>
//                 <Text style={[styles.headingText, { fontSize: responsiveFontSize(2) }]}>${product.price}</Text>
//                 <Text style={styles.descriptionText}>{product.description}</Text>
//                 <TouchableOpacity
//                     style={styles.buttonLayout}
//                     onPress={() => addToCart(product)}
//                 // onPress={() => navigation.navigate("Cart")}
//                 >
//                     <Text style={styles.buttonText}>Add to Cart</Text>
//                 </TouchableOpacity>
//             </View>
//         </>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: "white",
//         padding: responsiveWidth(5),
//         alignItems: "center"
//     },
//     imgStyle: {
//         width: responsiveWidth(95),
//         height: responsiveHeight(50),
//         resizeMode: "contain",
//         marginBottom: responsiveHeight(2)
//     },
//     headingText: {
//         fontSize: responsiveFontSize(2),
//         color: "black",
//         fontWeight: "bold",
//         textAlign: "center"
//     },
//     descriptionText: {
//         fontSize: responsiveFontSize(1.6),
//         color: "gray",
//         textAlign: "center",
//         marginVertical: responsiveHeight(2)
//     },
//     buttonLayout: {
//         width: responsiveWidth(50),
//         height: responsiveHeight(5),
//         backgroundColor: "#3e64ff",
//         borderRadius: responsiveHeight(1),
//         justifyContent: "center",
//         alignItems: "center",
//         marginTop: responsiveHeight(2)
//     },
//     buttonText: {
//         textAlign: "center",
//         fontSize: responsiveFontSize(2),
//         color: "white"
//     }
// });
import React, { useContext, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { CartContext } from '../../context/CartContext';
import { useNavigation } from '@react-navigation/native';

export default function ProductDetails({ route }) {
    const { product } = route.params;
    const { addToCart } = useContext(CartContext);
    const navigation = useNavigation();
    const [quantity, setQuantity] = useState(1);
    const handleIncrease = () => setQuantity(prev => prev + 1);
    const handleDecrease = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));
    return (
        <View style={styles.container}>
            <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", width: responsiveWidth(100), paddingHorizontal: responsiveWidth(5) }}>
                <View>
                    <TouchableOpacity style={{ height: responsiveHeight(3), }} onPress={() => navigation.goBack()}>
                        <Text style={{ color: "black", }}>Go Back</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity style={{ height: responsiveHeight(3), }} onPress={() => navigation.navigate("Cart")}>
                        <Text style={{ color: "black", }}>Go To Cart</Text>
                    </TouchableOpacity>
                </View>

            </View>

            <Image source={{ uri: product.url }} style={styles.imgStyle} />
            <Text style={styles.headingText}>{product.title}</Text>
            <Text style={[styles.headingText, { fontSize: responsiveFontSize(2) }]}>${product.price}</Text>
            <Text style={styles.descriptionText}>{product.description}</Text>

            {/* Quantity Selector */}
            {/* <View style={styles.quantityContainer}>
                <TouchableOpacity onPress={() => setQuantity(prev => Math.max(1, prev - 1))}>
                    <Text style={styles.quantityButton}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantityText}>{quantity}</Text>
                <TouchableOpacity onPress={() => setQuantity(prev => prev + 1)}>
                    <Text style={styles.quantityButton}>+</Text>
                </TouchableOpacity>
            </View> */}
            {/* Quantity Selector */}
            <View style={styles.quantityContainer}>
                <TouchableOpacity onPress={handleDecrease}>
                    <Text style={styles.quantityButton}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantityText}>{quantity}</Text>
                <TouchableOpacity onPress={handleIncrease}>
                    <Text style={styles.quantityButton}>+</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity
                style={styles.buttonLayout}
                onPress={() => addToCart(product, quantity)}
            // onPress={() => navigation.navigate("Cart")}
            >
                <Text style={styles.buttonText}>Add to Cart</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        padding: responsiveWidth(5),
        alignItems: "center"
    },
    imgStyle: {
        width: responsiveWidth(95),
        height: responsiveHeight(50),
        resizeMode: "contain",
        marginBottom: responsiveHeight(2)
    },
    headingText: {
        fontSize: responsiveFontSize(2),
        color: "black",
        fontWeight: "bold",
        textAlign: "center"
    },
    descriptionText: {
        fontSize: responsiveFontSize(1.6),
        color: "gray",
        textAlign: "center",
        marginVertical: responsiveHeight(2)
    },
    buttonLayout: {
        width: responsiveWidth(50),
        height: responsiveHeight(5),
        backgroundColor: "#3e64ff",
        borderRadius: responsiveHeight(1),
        justifyContent: "center",
        alignItems: "center",
        marginTop: responsiveHeight(2)
    },
    buttonText: {
        textAlign: "center",
        fontSize: responsiveFontSize(2),
        color: "white"
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: responsiveHeight(2),
    },
    quantityButton: {
        fontSize: responsiveFontSize(2.5),
        color: 'black',
        paddingHorizontal: responsiveWidth(2),
    },
    quantityText: {
        fontSize: responsiveFontSize(2),
        color: 'black',
        marginHorizontal: responsiveWidth(2),
    },
});
