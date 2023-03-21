import Navigation from './screens/navigation';
import useColorScheme from './hooks/useColorScheme';
import useCachedResources from './hooks/useCachedResources';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { auth } from './src/auth';
import LoginScreen from './screens/Stack/LoginScreen';
import { useEffect, useState } from 'react';
import HomeScreen from './screens/navigation';
import { onAuthStateChanged } from 'firebase/auth';

export default function App({navigation} : any) {
  const colorScheme = useColorScheme();
  const isLoadingComplete = useCachedResources();
  const [user, setUser] = useState(auth.currentUser);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    })
  }, [])

  if (!isLoadingComplete) {
    return null;
  } else {
    if(user != null)
      return(<HomeScreen colorScheme={colorScheme}/>);
    else
      return(<LoginScreen/>);
  }
}