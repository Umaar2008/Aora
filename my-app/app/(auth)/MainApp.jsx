import { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Button, ActivityIndicator ,KeyboardAvoidingView, Platform, TouchableOpacity , Vibration, Keyboard } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient'; 
import AuthContext from '../context/AuthContext';
import { GoogleGenerativeAI } from "@google/generative-ai";
import {
  DotIndicator
} from 'react-native-indicators';

const MainApp = () => {
  const [req, setReq] = useState('');
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err , setError] = useState("")
  
  const router = useRouter();
  const {CheckToken , LogoutUser } = useContext(AuthContext);
  
  const genAI = new GoogleGenerativeAI("AIzaSyDMw4ECjZJiG-wZ6gYBLf17DZyVkX4bxtM"); 

 
  
    async function run() {
    setLoading(true);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const chat = model.startChat({
      history: [], 
      generationConfig: {
        maxOutputTokens: 500,
      }
    });

    try {
      Keyboard.dismiss();
      const userMessage = { type: 'user', text: req };
      setContent(prev => [...prev, userMessage]); 

      const result = await chat.sendMessage(req, { stream: true });
      const response = await result.response;
      const text = await response.text();

      const aiMessage = { type: 'ai', text };
      setContent(prev => [...prev, aiMessage]); 

    } catch (error) {
      console.error("Error generating text:", error);
      const errorMessage = { type: 'error', text: "An error occurred. Please try again." };
      setContent(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
      Vibration.vibrate();
    }

    setReq('');
  }

  return (
    
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      keyboardVerticalOffset={20}
    >
      <View>

              <TouchableOpacity style={styles.ButtonStyling}
       onPress={() => { try {
         LogoutUser() 
       }
       catch(err) {
         console.log(err)
       }
       }} 
              >
                  <LinearGradient 
            colors={['#FF8C00', '#ffA800' ,'#FFA300']}
   style={styles.gradient}
                  >
  
          <Text style={styles.buttonText}>Log Out</Text>
  
                  </LinearGradient>
        </TouchableOpacity>
      </View>
      <View style={styles.innerContainer}>
        <ScrollView 
          contentContainerStyle={styles.convo}
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          {content.map((msg, index) => (
            <Text 
              key={index} 
              style={[
                styles.message, 
                msg.type === 'user' ? styles.userMessage : styles.aiMessage
              ]}
            >
              {msg.text}
            </Text>
          ))}
          {loading && (
            <View style={styles.loadingContainer}>
              <View style={styles.example}>
                <DotIndicator animating={true} interaction={true} size={6} color='white' />    
              </View>
            </View>
          )}
        </ScrollView>

        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Message AI"
            style={styles.input}
            onChangeText={setReq}
            value={req}
            onSubmitEditing={run} 
            multiline 
          />

          <TouchableOpacity onPress={run}>
            <Text style={{ marginRight: 20, color: "white", fontSize: 20 , fontFamily: 'Poppins-SemiBold' }}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#161622',
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#161622',
    borderColor: 'gray',
    borderRadius: 100,
    borderWidth: 1,
  },
  input: {
    flex: 1,
    height: 50,
    padding: 15,
    marginRight: 10,
    color: "white",
    fontSize: 16,
    fontFamily: 'Poppins-Light',

  },
  loadingContainer: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  message: {
    width: '75%',
    marginTop: 10,
    padding: 10,
    borderRadius: 10,
  },
  convo: {
    paddingBottom: 10,
  },
  scrollView: {
    flexGrow: 1,
  },
  userMessage: {
    alignSelf: 'flex-end',  
    marginTop: 10,
    borderRadius: 20,  
    marginRight: 10,
    width: '80%',
    height: 'auto',
    textAlign: 'right',
    color: 'white',
    fontFamily: 'Poppins-ExtraLight',
    fontSize: 18,
    fontWeight : 900 ,

    
  },
  
  aiMessage: {
    alignSelf: 'flex-start',  
  borderRadius : 20 ,
    textAlign: 'left',
    color: 'white',
    marginLeft : 10,
    width: '80%',
    height: 'auto',
    fontSize: 18, 
    fontWeight: '400', 

    fontFamily: 'Poppins-Light',

    
  },
  example: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    height: 40,
    width: 100,
    borderRadius: 20,
    backgroundColor: "#11111a",
    left: -130,
  },
  ButtonStyling : {
    width : 100 , 
    height : 50 ,
    padding : 10 ,
    alignItems : 'center' ,
    borderRadius : 40 ,
    marginLeft : 10 ,
  } ,
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
    height: 40,
    backgroundColor  :"black" ,

        borderRadius: 8, 
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
      },
});

export default MainApp;
