import { StatusBar } from 'expo-status-bar';
import { Image, View, Text, TouchableOpacity } from 'react-native';
import React, { useEffect  , useContext} from 'react';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import AuthContext from '../context/AuthContext';

const App = () => {
  const router = useRouter();
  const {CheckToken  } = useContext(AuthContext);


useEffect(() => {
  CheckToken();
}, []);



  return (
    <View style={styles.container}>

      <StatusBar style="dark" backgroundColor="#161622" translucent={false} animated={true} />

      <View style={styles.imageContainer}>
        <Image 
          style={styles.Logoimage}
          source={require('/Expo/my-app/assets/images/aora-logo.png')}
        />
      </View>

      <View style={styles.landingPageImg}>
        <Image
          source={require('/Expo/my-app/assets/images/Landing-page-img.png')}
        />
      </View>

      <View>
        <Text style={styles.HeadlineText}>
          Talk Endless Chats      Using
          <Text style={styles.TextAora}> Aora</Text>
        </Text>
        <Image style={styles.LineBelowAora} source={require('/Expo/my-app/assets/images/Yello-line-below-Aora.png')} />
      </View>

      <View>
        <Text style={styles.UnderheadlineText}>
          Where Creativity Meets Innovation: Embark on a Journey of Endless Building with Aora
        </Text>
      </View>

      <TouchableOpacity style={styles.ButtonStyling} onPress={() => router.push('/Profile')}>
        <LinearGradient colors={['#FF8C00', '#FFA300']} style={styles.gradient}>
          <Text style={styles.buttonText}>Continue with Email</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#161622",
  },
  imageContainer: {
    width: "100%",
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Logoimage: {
    height: 34.07,
    width: 115,
  },
  landingPageImg: {
    width: "100%",
    height: 298,
  },
  HeadlineText: {
    marginTop: 20,
    fontWeight: '700',
    fontSize: 30,
    lineHeight: 36,
    textAlign: 'center',
    color: "#fff",
    fontFamily: 'PlayWrite-Regular',
  },
  UnderheadlineText: {
    marginTop: 10,
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 22.4,
    textAlign: 'center',
    color: "#CDCDE0",
    fontFamily: 'PlayWrite-Thinitalic',

  },
  TextAora: {
    color: "#FFA62B",
    fontWeight: '800',
    marginTop: 100,
    fontFamily: 'PlayWrite-Regular',

  },
  LineBelowAora: {
    marginLeft: 200,
    marginTop: -8,
    width: 65.03,
    height: 13.69,
  },
  ButtonStyling: {
    width: 327,
    marginLeft: 25,
  },
  gradient: {
    padding: 10,
    height: 58,
    borderRadius: 8,
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#161622',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 22.4,
    fontFamily: "Poppins-Medium",

  },
};

export default App;
