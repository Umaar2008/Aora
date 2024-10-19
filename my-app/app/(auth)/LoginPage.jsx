import {React , useLayoutEffect , useContext , useState} from 'react'
import { View, Text, StyleSheet, TouchableOpacity , Image, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; 
import { useNavigation , CommonActions } from '@react-navigation/native';
import { useRouter , Link } from 'expo-router';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Authcontext from "../context/AuthContext";
const LoginPage = () => {
    const { LoginUser , error } = useContext(Authcontext);
    const router = useRouter(); 
    const navigation = useNavigation();

    useLayoutEffect(() => {
      navigation.setOptions({
        headerShown: false,
      });
    }, [navigation])
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const[err , setErr] = useState("");


    const handlePress = async () => {

if (!email || !password) {
  setErr("All fields are required");
  return;
}
else {

  try {
      await LoginUser(email, password);
  }catch(error) {
    setErr(error.response?.data?.error || 'An unexpected error occurred');
  }

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
          <Image style={styles.Logoimage} source={require('/Expo/my-app/assets/images/aora-logo.png')}></Image>
        </View>
  
      <Text style={styles.HeadLineText}>Sign In</Text>
    
      <View style={styles.InputContainer}>
        <Text style={styles.UnderheadlineText}>Email</Text> 
        <TextInput 
        keyboardType="email-address" 
        onChangeText={(text) => setEmail(text) }
        style={styles.TextInput}
        placeholder='Your Email'
        ></TextInput>
        {err ? <Text style={styles.errorText}>{err}</Text> : null}
      </View>
      <View style={styles.InputContainer}>
        <Text style={styles.UnderheadlineText}>Password</Text> 
        <TextInput 
          secureTextEntry={true}
          onChangeText={(text) =>setPassword(text) }
        style={styles.TextInput}
        placeholder='Password'
        ></TextInput>
        {err ? <Text style={styles.errorText}>{err}</Text> : null}
      </View>
          
      <View>
              <TouchableOpacity style={styles.ButtonStyling}
       onPress={handlePress} 
              >
                  <LinearGradient 
            colors={['#FF8C00', '#ffA800' ,'#FFA300']}
   style={styles.gradient}
                  >
  
          <Text style={styles.buttonText}>Log In</Text>
  
                  </LinearGradient>
        </TouchableOpacity>
              </View>
  
  <View>
  <Text style={styles.Text}>Doesnt't have an account ? <Link 
  style={styles.LoginText}
  href="/Profile">SignUp</Link> </Text>
  
  </View>
  </KeyboardAwareScrollView>
  </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#161622',
    } ,
  
    imageContainer : {
      width : "100%" ,
      height : 20 ,
      justifyContent : 'center',
      alignItems : 'Start',
      marginTop : 60,
      marginLeft: 24,
      
      } ,
  
      Logoimage : {
          height: 34.07,
          width: 115,
      } ,
      HeadLineText : {
          marginTop : 24 ,
          marginLeft : 24,
          fontSize : 22 ,
          lineHeight : 31.9 ,
          color : "#fff",
          fontFamily: 'Poppins-SemiBold',
  
      } ,
      UnderheadlineText : {
          fontWeight : 500 ,
          fontSize : 16 ,
          lineHeight : 22.4 ,
          marginLeft : 32,
          color : "#CDCDE0" ,
          fontFamily: 'Poppins-SemiBold',
        } ,
      InputContainer : {
        marginTop : 16 ,
      } ,
      TextInput : {
        height : 60 ,
        width : 310 ,
        marginLeft : 32 ,
        marginTop : 10 ,
        backgroundColor : "#1E1E2D" ,
        borderRadius : 12 ,
        borderWidth : 1 ,
        borderColor : '#232533' ,
        padding : 16 ,
        color : "#fff" ,
        fontFamily: 'Poppins-Light',
        fontSize : 16,
            } ,
      ButtonStyling: {
        width: 327,
        marginLeft : 25,
    },
    buttonText: {
      color: '#161622', 
      fontSize: 16, 
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
        Text : {
          color : "#CDCDE0" ,
          fontSize : 16 ,
          lineHeight : 22.4 ,
          textAlign : 'center' ,
          marginTop : 16 ,
          marginRight : 12 ,
          fontFamily: "Poppins-Medium",
  
        } ,
        LoginText : {
          color : "#FFA62B" ,
          fontSize : 16 ,
          lineHeight : 22.4 ,
          textAlign : 'center' ,
          marginTop : 16 ,
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
    )



export default LoginPage

