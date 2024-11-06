// // src/context/CartContext.js
// import React, { createContext, useState } from 'react';
// import Toast from 'react-native-toast-message';

// export const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//     const [cart, setCart] = useState([]);

//     const addToCart = (product) => {
//         setCart(prevCart => [...prevCart, product]);
//         Toast.show({
//             type: 'success',
//             text1: `${product.title} added to cart!`,
//         });
//     };

//     const removeFromCart = (productId) => {
//         setCart(prevCart => prevCart.filter(item => item.id !== productId));
//         Toast.show({
//             type: 'info',
//             text1: `Product removed from cart.`,
//         });
//     };

//     return (
//         <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
//             {children}
//         </CartContext.Provider>
//     )
// }
// src/context/CartContext.js
import React, { createContext, useState } from 'react';
import Toast from 'react-native-toast-message';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addToCart = (product, quantity = 1) => {
        setCart(prevCart => {
            const existingProduct = prevCart.find(item => item.id === product.id);
            if (existingProduct) {
                return prevCart.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
                );
            } else {
                return [...prevCart, { ...product, quantity }];
            }
        });
        Toast.show({
            type: 'success',
            text1: `${product.title} added to cart!`,
        });
    };

    const removeFromCart = (productId) => {
        setCart(prevCart => prevCart.filter(item => item.id !== productId));
        Toast.show({
            type: 'info',
            text1: `Product removed from cart.`,
        });
    };
    const clearCart = () => setCart([]);


    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};
