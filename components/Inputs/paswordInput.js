import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import  Ionicons  from '@expo/vector-icons/Ionicons'; // Assuming you're using Expo

const PasswordInput = ({ inputIcon, inputPlaceholder, InputConfiguration, value }) => {
  const [isPasswordVisible, setPasswordVisibility] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisibility((prevVisibility) => !prevVisibility);
  };

  return (
    <View style={styles.SingleInputCont}>
      {/* ... other input styling */}
      <View>
      <TextInput
        style={styles.input}
        placeholder={inputPlaceholder}
        secureTextEntry={inputIcon === 'lock' && !isPasswordVisible}
        {...InputConfiguration}
        value={value}
      />
      </View>
      {inputIcon === 'lock' && (
        <TouchableOpacity style={styles.eyeButton} onPress={togglePasswordVisibility}>
          <Ionicons name={isPasswordVisible ? 'eye-off' : 'eye'} size={24} color="black" />
        </TouchableOpacity>
      )}
    </View>
  );
};
export default PasswordInput;
const styles = StyleSheet.create({
  // ... other styles
  SingleInputCont: {
    // display: "flex",
    // flexDirection: "row",
    borderRadius: 10,
    backgroundColor: "#D9D9D9",
    width: '80%',
    margin:8,
    overflow:"hidden",
},
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    paddingBottom: 5,
    marginBottom: 20,
  },

  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },

  eyeButton: {
    padding: 5,
  },
});


