import React, { useContext, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { CartContext } from '../../context/CartContext';

export default function CheckoutScreen() {
    const { cart, setCart, clearCart } = useContext(CartContext);
    const [fullName, setFullName] = useState('');
    const [address, setAddress] = useState('');
    const [paymentOption, setPaymentOption] = useState('');

    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const handlePlaceOrder = () => {
        if (!fullName || !address || !paymentOption) {
            Alert.alert("Please fill in all fields.");
            return;
        }

        // Simulate successful order placement
        Alert.alert("Order Placed!", `Thank you, ${fullName}. Your order total is $${totalPrice.toFixed(2)} you order will be delivered shortly`);

        // Clear cart after placing order
        clearCart();

        // Navigate back to cart screen or home
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Order Summary</Text>
            {cart.map((item, index) => (
                <View key={index} style={styles.item}>
                    <Text style={styles.itemText}>{item.title} x {item.quantity}</Text>
                    <Text style={styles.itemText}>${(item.price * item.quantity).toFixed(2)}</Text>
                </View>
            ))}
            <Text style={styles.totalText}>Total: ${totalPrice.toFixed(2)}</Text>

            <Text style={styles.heading}>Delivery Information</Text>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
                style={styles.input}
                placeholder="Full Name"
                value={fullName}
                onChangeText={setFullName}
            />
            <Text style={styles.label}>Delivery Address</Text>
            <TextInput
                style={styles.input}
                placeholder="Delivery Address"
                value={address}
                onChangeText={setAddress}
            />
            <Text style={styles.heading}>Payment Options</Text>
            <TextInput
                style={styles.input}
                placeholder="Payment Option (e.g., Credit Card, PayPal)"
                value={paymentOption}
                onChangeText={setPaymentOption}
            />

            <TouchableOpacity style={styles.button} onPress={handlePlaceOrder}>
                <Text style={styles.buttonText}>Place Order</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: responsiveWidth(5),
    },
    heading: {
        fontSize: responsiveFontSize(2.2),
        fontWeight: 'bold',
        color: 'black',
        marginBottom: responsiveHeight(1.5),
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: responsiveHeight(1),
    },
    itemText: {
        fontSize: responsiveFontSize(1.8),
        color: 'black',
    },
    totalText: {
        fontSize: responsiveFontSize(2),
        fontWeight: 'bold',
        color: 'green',
        textAlign: 'center',
        marginVertical: responsiveHeight(2),
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: responsiveHeight(1),
        padding: responsiveHeight(1),
        marginBottom: responsiveHeight(1.5),
        fontSize: responsiveFontSize(1.8),
        color: 'black',
    },
    button: {
        backgroundColor: '#3e64ff',
        paddingVertical: responsiveHeight(1.5),
        borderRadius: responsiveHeight(1),
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: responsiveFontSize(2),
    },
    label: {
        fontSize: 16,
        fontWeight: '500',
        color: "black"
    }
});
