
import { createContext, useState , useEffect} from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { router } from 'expo-router';

const AuthContext = createContext();

function AuthProvider ({children}) {

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [Token, setToken] = useState(null);
    const [error , setError] = useState(null);

        const CheckToken = async () => {
            try {
                const token = await AsyncStorage.getItem('UserToken');
                if (token) {
                    setIsAuthenticated(true);
                    router.replace('/MainApp');
                }else {
                    setIsAuthenticated(false);
                    }
            }
            catch(err) {
                console.log("There is an error", err);
            }
        }

      
          const CreateUser = async (UserName, UserEmail, UserPassword) => {
            try {
              const response = await axios.post('http://192.168.0.111:5000/User/Create', {
                UserName,
                UserEmail,
                UserPassword,
              });
              const token = response.data.accessToken;
              setError(null); 
              if (token) {
                await AsyncStorage.setItem('UserToken', token);
                setIsAuthenticated(true);
                router.replace('/MainApp');
              }
            } catch (err) {
              setError(err.response?.data?.error || 'An unexpected error occurred');
              throw err; 
              
            }
          };
          

    const LoginUser = async (UserEmail, UserPassword) => {
        try {
          const response = await axios.post('http://192.168.0.111:5000/User/Login', {
            UserEmail,
            UserPassword
          });
    
          const token = response.data.accessToken;
          const err = response.data.error;
          setError(err);
          if (token) {
            await AsyncStorage.setItem('UserToken', token);
            setIsAuthenticated(true);
            setError(null)
            router.replace('/MainApp');
          } 
          else {
            setIsAuthenticated(false)
            router.replace('/LoginPage')
          }
        }
         catch (err) {
          setError(err.response?.data?.error || 'An unexpected error occurred');
          throw err; 
          
        }
      };

      const LogoutUser = async () => {
        try {
          await AsyncStorage.removeItem('UserToken');
          setIsAuthenticated(false);
          setToken(null);
          setError(null);
          router.replace('/LoginPage')
        } catch (err) {
          console.error('Error logging out:', err);
        }
      };
      const valuesToShare = {
        CreateUser,
        LoginUser ,
        LogoutUser,
        Token ,
        error ,
        CheckToken
      
      }
      return (
        <AuthContext.Provider value={valuesToShare  }>
          {children}
        </AuthContext.Provider>
      );
}

export { AuthProvider };
export default AuthContext;