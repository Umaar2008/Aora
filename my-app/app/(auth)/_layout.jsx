import { StyleSheet, ActivityIndicator, View } from 'react-native';
import { Stack } from 'expo-router';
import { AuthProvider } from '../context/AuthContext';
import { useFonts } from 'expo-font';

const Rootlayout = () => {
  const [fontsLoaded] = useFonts({
    'Poppins-Regular': require('/Expo/my-app/assets/fonts/Poppins-Black.ttf'),
    'Poppins-Bold': require('/Expo/my-app/assets/fonts/Poppins-Bold.ttf'),
    'Poppins-SemiBold': require('/Expo/my-app/assets/fonts/Poppins-SemiBold.ttf'),
    'Poppins-Medium': require('/Expo/my-app/assets/fonts/Poppins-Medium.ttf'),
    'Poppins-Light': require('/Expo/my-app/assets/fonts/Poppins-Light.ttf'),
    'Poppins-Thin': require('/Expo/my-app/assets/fonts/Poppins-Thin.ttf'),
    'Poppins-ExtraLight': require('/Expo/my-app/assets/fonts/Poppins-ExtraLight.ttf'),
    'Poppins-BlackItalic': require('/Expo/my-app/assets/fonts/Poppins-BlackItalic.ttf'),
    'Poppins-BoldItalic': require('/Expo/my-app/assets/fonts/Poppins-BoldItalic.ttf'),
    'Poppins-SemiBoldItalic': require('/Expo/my-app/assets/fonts/Poppins-SemiBoldItalic.ttf'),
    'Poppins-MediumItalic': require('/Expo/my-app/assets/fonts/Poppins-MediumItalic.ttf'),
    'Poppins-LightItalic': require('/Expo/my-app/assets/fonts/Poppins-LightItalic.ttf'),
    'Poppins-ThinItalic': require('/Expo/my-app/assets/fonts/Poppins-ThinItalic.ttf'),
    'Poppins-ExtraLightItalic': require('/Expo/my-app/assets/fonts/Poppins-ExtraLightItalic.ttf'),
    'PlayWrite-Regular': require('/Expo/my-app/assets/fonts/PlaywriteGBS-Regular.ttf'),
    'PlayWrite-Extralight': require('/Expo/my-app/assets/fonts/PlaywriteGBS-ExtraLight.ttf'),
    'PlayWrite-Thin': require('/Expo/my-app/assets/fonts/PlaywriteGBS-Thin.ttf'),
    'PlayWrite-Thinitalic': require('/Expo/my-app/assets/fonts/PlaywriteGBS-ThinItalic.ttf'),
    'PlayWrite-ExtralightItalic': require('/Expo/my-app/assets/fonts/PlaywriteGBS-ExtraLightItalic.ttf'),
  });

  // Check if fonts are loaded
  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#161622" />
      </View>
    );
  }

  return (
    <AuthProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="Profile" options={{ headerShown: false }} />
        <Stack.Screen name="LoginPage" options={{ headerShown: false, gestureEnabled: false }} />
        <Stack.Screen name="MainApp" options={{ headerShown: false, gestureEnabled: false }} />
      </Stack>
    </AuthProvider>
  );
};

export default Rootlayout;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});
