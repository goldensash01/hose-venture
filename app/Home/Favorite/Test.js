import { Pressable, StyleSheet, Text, View } from 'react-native';
import React,{ Component, useState } from 'react';
import { FlutterwaveInit } from 'flutterwave-react-native';
import { WebView } from 'react-native-webview';

export default function Test() {
    // const MyWebComponent = ({paymentLink}) => {
    //     return <WebView source={{ uri: paymentLink }} style={{ flex: 1 }} />;
    //   }
const [flutterLink,setFlutterLink]=useState('')
  const handlePayment = async () => {
    try {
      // initialize payment
      const paymentLink = await FlutterwaveInit({
        tx_ref: Date.now()+Math.floor(Math.random()),
        authorization: 'FLWPUBK-fd9a72fe52fbf0bd373323b44d7e2097-X',
        amount: 300,
        // currency: 'USD',
        currency: 'RWF',
          customer: {
            email: 'dean@gmail.com',
            phone_number:'0786585008',
            name:'Golden Sash'
          },
          redirect_url:'Home/Wallet',
          payment_options: 'mobilemoney',
      });

      // use payment link
      setFlutterLink(usePaymentLink(paymentLink))

    //   
    //   MyWebComponent(paymentLink);
    } catch (error) {
      // handle payment error
      displayError(error.message);
    }
  };

  return (
    <View>
      <Pressable onPress={handlePayment}>
        <Text>Send</Text>
      </Pressable>
      <View>
      <WebView source={{ uri: flutterLink }} style={{ flex: 1 }} />
      </View>
    </View>
  );
}

// Your existing styles
const styles = StyleSheet.create({});

// Example functions (replace with your actual implementations)
const generateTransactionRef = () => {
  // Implement your logic to generate a unique transaction reference
  return 'unique_transaction_ref';
};

const usePaymentLink = (paymentLink) => {
  // Implement logic to use the payment link
  console.log('Using payment link:', paymentLink);
};

const displayError = (errorMessage) => {
  // Implement logic to display the error message
  console.error('Payment error:', errorMessage);
};
