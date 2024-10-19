import { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; 
import { useRouter, Link } from 'expo-router';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Authcontext from "../context/AuthContext";

const Profile = () => {
  const router = useRouter(); 
  const { CreateUser , error } = useContext(Authcontext);

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err , setErr] = useState('');

  const handleSubmit = async () => {
    if (!username || !email || !password) {
      setErr('All fields are required'); 
      return;
    }
    try {
      await CreateUser(username, email, password); 
    } catch (error) {
      setErr(error.response?.data?.error || 'An unexpected error occurred');
    }
  };
  
  

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        style={styles.container}
        resetScrollToCoords={{ x: 0, y: 0 }}
        scrollEnabled={true}
      >
        <View style={styles.imageContainer}>
          <Image style={styles.Logoimage} source={require('/Expo/my-app/assets/images/aora-logo.png')} />
        </View>

        <Text style={styles.HeadLineText}>
        Sign up </Text>
        <View style={styles.InputContainer}>
          <Text style={styles.UnderheadlineText}>Username</Text> 
          <TextInput
            onChangeText={(text) => setUsername(text)}
            style={styles.TextInput}
            placeholder='Your unique username'
            value={username}
          />
           {err ? <Text style={styles.errorText}>{err}</Text> : null}
        </View>

        <View style={styles.InputContainer}>
          <Text style={styles.UnderheadlineText}>Email</Text> 
          <TextInput 
            onChangeText={(text) => setEmail(text)}
            keyboardType="email-address"
            style={styles.TextInput}
            placeholder='Your Email'
            value={email}
          />
           {err ? <Text style={styles.errorText}>{err}</Text> : null}
        </View>

        <View style={styles.InputContainer}>
          <Text style={styles.UnderheadlineText}>Password</Text> 
          <TextInput 
            secureTextEntry={true}
            onChangeText={(text) => setPassword(text)}
            style={styles.TextInput}
            placeholder='Password'
            value={password}
          />
           {err ? <Text style={styles.errorText}>{err}</Text> : null}
        </View>
            
        <View>
          <TouchableOpacity style={styles.ButtonStyling} onPress={handleSubmit}>
            <LinearGradient 
              colors={['#FF8C00', '#ffA800', '#FFA300']}
              style={styles.gradient}
            >
              <Text style={styles.buttonText}>Sign Up</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <View>
          <Text style={styles.Text}>
            Already have an account?{' '}
            <Link style={styles.LoginText} href="/LoginPage">
              Login
            </Link>
          </Text>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#161622',
  },
  imageContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginTop: 60,
    marginLeft: 24,
  },
  Logoimage: {
    height: 34.07,
    width: 115,
  },
  HeadLineText: {
    marginTop: 24,
    marginLeft: 24,
    fontWeight: 'bold',
    fontSize: 22,
    lineHeight: 31.9,
    color: '#fff',
    fontFamily: 'Poppins-SemiBold',

  },
  UnderheadlineText: {
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 22.4,
    marginLeft: 32,
    color: '#CDCDE0',
    fontFamily: 'Poppins-SemiBold',
  },
  InputContainer: {
    marginTop: 16,
  },
  TextInput: {
    height: 60,
    width: 310,
    marginLeft: 32,
    marginTop: 10,
    backgroundColor: '#1E1E2D',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#232533',
    padding: 16,
    color: '#fff',
    fontFamily: 'Poppins-Light',
    fontSize : 16,
  },
  ButtonStyling: {
    width: 327,
    marginLeft: 25,
  },
  buttonText: {
    color: '#161622',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 22.4,
    fontFamily: "Poppins-Medium",
  },
  gradient: {
    padding: 10,
    height: 58,
    borderRadius: 8,
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Text: {
    color: '#CDCDE0',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 22.4,
    textAlign: 'center',
    marginTop: 16,
    fontFamily: "Poppins-Medium",
  },
  LoginText: {
    color: '#FFA62B',
    fontSize: 16,
    fontWeight: '800',
    lineHeight: 22.4,
    textAlign: 'center',
    marginTop: 16,
    fontFamily: "Poppins-Medium",
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginLeft: 32,
    marginTop: 5,
    fontFamily: 'Poppins-Light',
  },
  }
);

export default Profile;
