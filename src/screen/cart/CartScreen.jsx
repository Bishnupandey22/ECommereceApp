
import React, { useContext } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { CartContext } from '../../context/CartContext';
import { useNavigation } from '@react-navigation/native';

export default function CartScreen() {
    // const { cart, removeFromCart } = useContext(CartContext);

    // const renderItem = ({ item }) => (
    //     <View style={styles.cartItem}>
    //         <Image source={{ uri: item.url }} style={styles.imgStyle} />
    //         <View style={styles.itemDetails}>
    //             <Text style={styles.title}>{item.title}</Text>
    //             <Text style={styles.price}>${item.price}</Text>
    //             <Text style={styles.quantity}>Quantity: {item.quantity}</Text>
    //             <TouchableOpacity
    //                 style={styles.removeButton}
    //                 onPress={() => removeFromCart(item.id)}
    //             >
    //                 <Text style={styles.removeButtonText}>Remove</Text>
    //             </TouchableOpacity>
    //         </View>
    //     </View>
    // );

    // return (
    //     <View style={styles.container}>
    //         {cart.length === 0 ? (
    //             <Text style={styles.emptyText}>Your cart is empty.</Text>
    //         ) : (
    //             <FlatList
    //                 data={cart}
    //                 renderItem={renderItem}
    //                 keyExtractor={(item) => item.id.toString()}
    //                 showsVerticalScrollIndicator={false}
    //             />
    //         )}
    //     </View>
    // );
    const { cart, removeFromCart } = useContext(CartContext);
    const navigation = useNavigation();

    const renderItem = ({ item }) => (
        <View style={styles.cartItem}>
            <Image source={{ uri: item.url }} style={styles.imgStyle} />
            <View style={styles.itemDetails}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.price}>${item.price}</Text>
                <Text style={styles.quantity}>Quantity: {item.quantity}</Text>
                <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() => removeFromCart(item.id)}
                >
                    <Text style={styles.removeButtonText}>Remove</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <View style={styles.container}>
            {cart.length === 0 ? (
                <Text style={styles.emptyText}>Your cart is empty.</Text>
            ) : (
                <>
                    <FlatList
                        data={cart}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id.toString()}
                        showsVerticalScrollIndicator={false}
                    />
                    <Text style={styles.totalPrice}>Total: ${totalPrice.toFixed(2)}</Text>
                    <TouchableOpacity
                        style={styles.checkoutButton}
                        onPress={() => navigation.navigate('Checkout')}
                    >
                        <Text style={styles.checkoutButtonText}>Checkout</Text>
                    </TouchableOpacity>
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
        padding: responsiveWidth(5),
    },
    cartItem: {
        flexDirection: 'row',
        backgroundColor: "white",
        borderRadius: responsiveHeight(1),
        padding: responsiveWidth(3),
        marginVertical: responsiveHeight(1),
        alignItems: 'center',
    },
    imgStyle: {
        width: responsiveWidth(20),
        height: responsiveHeight(10),
        resizeMode: "contain",
        marginRight: responsiveWidth(3)
    },
    itemDetails: {
        flex: 1,
    },
    title: {
        fontSize: responsiveFontSize(1.8),
        fontWeight: "bold",
        color: "black"
    },
    price: {
        fontSize: responsiveFontSize(1.6),
        color: "green",
        marginVertical: responsiveHeight(0.5)
    },
    removeButton: {
        backgroundColor: "#ff4d4d",
        paddingVertical: responsiveHeight(0.5),
        paddingHorizontal: responsiveWidth(2),
        borderRadius: responsiveHeight(1)
    },
    removeButtonText: {
        color: "white",
        fontSize: responsiveFontSize(1.6),
        textAlign: "center"
    },
    emptyText: {
        fontSize: responsiveFontSize(2),
        color: "gray",
        textAlign: "center",
        marginTop: responsiveHeight(10)
    },
    quantity: {
        fontSize: responsiveFontSize(1.6),
        color: "black",
        marginVertical: responsiveHeight(0.5)
    },
    quantity: { fontSize: responsiveFontSize(1.6), color: 'black' },
    totalPrice: {
        fontSize: responsiveFontSize(2.2),
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: responsiveHeight(2),
        color: "black"
    },
    checkoutButton: {
        backgroundColor: '#3e64ff',
        paddingVertical: responsiveHeight(1.5),
        borderRadius: responsiveHeight(1),
        marginVertical: responsiveHeight(1),
        alignItems: 'center',
    },
    checkoutButtonText: {
        color: 'white',
        fontSize: responsiveFontSize(2),
    },
});
