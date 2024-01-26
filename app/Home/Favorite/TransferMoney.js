import React, { useState,useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import Input from '../../../components/Inputs/inputs';
import CustomButton from '../../../components/Buttons/button';
import { useRouter } from 'expo-router';
import { FlutterwaveInit } from 'flutterwave-react-native';
import { router, useLocalSearchParams } from 'expo-router'
import axios from 'axios';

const GET_CHILDREN="https://api.schoolflow.rw/students/childDetails.php";
const TransferMoney = () => {
  const router = useRouter();
  const [amount, setAmount] = useState(0);
  const [flutterLink, setFlutterLink] = useState('');
  const [loading, setLoading] = useState(false);
  const [childDetails,setChildDetails]=useState([]);


  const {StudentId,ParentId,pEmail,pPhone,pNames}=useLocalSearchParams();

  const charge = amount * 6 / 100;
  const Total = parseInt(amount) + parseFloat(charge);

  const getChildDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.post(GET_CHILDREN, {
        userid: ParentId,
        childId: StudentId,
      });
      if (response.status === 200) {
        setChildDetails(response.data.data);
      } else {
        Alert.alert("no data found");
      }
    } catch (error) {
      // console.log(error);
      // console.log(ParentId);
      router.replace("Home/HomePage/");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getChildDetails();
  }, []);
  const handlePayment = async () => {
    try {
      // initialize payment
      setLoading(true)
      const paymentLink = await FlutterwaveInit({
        tx_ref: Date.now() + Math.floor(Math.random()),
        authorization: 'FLWPUBK-fd9a72fe52fbf0bd373323b44d7e2097-X',
        amount: Total,
        currency: 'RWF',
        customer: {
          email: 'msinnovationlab1@gmail.com',
          phone_number: '2507',
          name: pNames,
        },
        customizations: {
          title: "Schoolflow",
          description: "Watch Your Kids Next Move",
          logo: "https://parent.schoolflow.rw/assets/img-login.png",
        },
        redirect_url:  `https://parent.schoolflow.rw/mobileTransactionCompletedScreens/TransactionCompleted?customer_id=${ParentId}&studentId=${StudentId}&Amount=${amount}`,
        payment_options: 'mobilemoney',
      });

      // set payment link
      router.push(`Home/Wallet/Comfirmation?Link=${paymentLink}`)

      // setFlutterLink(usePaymentLink(paymentLink));
    } catch (error) {
      // handle payment error
      displayError(error.message);
    }finally{
      setLoading(false)
    }
  };

  // Calculate charge and total
 
  return (
    <View style={styles.TransferContainer}>
      <Text style={styles.TransferHeadings}>AMOUNT TO SEND TO</Text>
      {childDetails.map((item) => (
      <Text key={item.studentId} style={styles.TransferHeadings}>{item.fName} {item.lName}</Text>
))}
      <Input
        inputIcon="money"
        inputPlaceholder="AMOUNT"
        value={amount}
        InputConfiguration={{
          keyboardType: 'phone-pad',
          secureTextEntry: false,
          onChangeText: (val) => setAmount(val),
        }}
      />
      {/* <Text onPress={() => router.push("Home/Wallet/Comfirmation")}>test</Text> */}
      <View style={styles.ChargeDue}>
        <Text style={styles.Titles}>CHARGE DUE</Text>
        <Text style={styles.Amount}>{`${charge} RWF`}</Text>
      </View>
      <View>
        <Text style={styles.Titles}>TOTAL</Text>
        <Text style={styles.Total}>{`${Total} RWF`}</Text>
      </View>
      {loading ?  <ActivityIndicator style={styles.ActivityIndicatorStyle}size="large" color="#47B84D" /> : <CustomButton buttonName={`Send ${Total} FRW`} onPress={handlePayment} />}
      <Text onPress={() => router.back()}>Back</Text>
    </View>
  );
};

// Display error function (replace with your actual implementation)
const displayError = (errorMessage) => {
  console.error('Payment error:', errorMessage);
};
const usePaymentLink = (paymentLink) => {
  // router.push(`Home/Wallet/Comfirmation?Link=${paymentLink}`)
  // Implement logic to use the payment link
  // console.log('Using payment link:', paymentLink);
};
const styles = StyleSheet.create({
  TransferHeadings: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  TransferContainer: {
    backgroundColor: 'silver',
    paddingHorizontal: 20,
    paddingVertical: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ChargeDue: {
    paddingVertical: 20,
    borderTopColor: '#47B84D',
    borderTopWidth: 2,
    width: '90%',
    marginVertical: 20,
  },
  Titles: {
    fontWeight: 'bold', // Changed to a valid value
    padding: 5,
    textAlign: 'center',
  },
  Amount: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
  },
  Total: {
    fontWeight: 'bold',
    fontSize: 22,
    textAlign: 'center',
  },
});

export default TransferMoney;

