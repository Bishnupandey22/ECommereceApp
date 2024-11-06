
import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer, useNavigation } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Toast from 'react-native-toast-message';

import AllProducts from './src/screen/product/AllProducts';
import ProductDetails from './src/screen/product/ProductDetails';
import CartScreen from './src/screen/cart/CartScreen';
import { CartProvider } from './src/context/CartContext';
import CheckoutScreen from './src/screen/cart/CheckoutScreen';
const Stack = createNativeStackNavigator()

function App() {


  return (
    <>

      <CartProvider>
        <NavigationContainer >
          <Stack.Navigator
            initialRouteName="Products"
            screenOptions={{
              headerShown: false,
              gestureEnabled: false,

            }}
          >

            <Stack.Screen name="Products" component={AllProducts} />
            <Stack.Screen name="ProductDetails" component={ProductDetails} />
            <Stack.Screen name="Cart" component={CartScreen} options={{ title: 'Your Cart' }}
            />

            <Stack.Screen name="Checkout" component={CheckoutScreen} />

          </Stack.Navigator>
        </NavigationContainer>
      </CartProvider>

      <Toast />
    </>


  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
