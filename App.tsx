import Navigation, { LoginStack } from './screens/navigation';
import useColorScheme from './hooks/useColorScheme';
import useCachedResources from './hooks/useCachedResources';
import auth from './src/auth';
import React, { useEffect, useState } from 'react';
import HomeScreen from './screens/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App({navigation} : any) {
  const colorScheme = useColorScheme();
  const isLoadingComplete = useCachedResources();
  const [user, setUser] = useState(auth.currentUser);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    })
  }, [])

  if (!isLoadingComplete) return null;
    
  if(user != null)
    return(<HomeScreen colorScheme={colorScheme}/>);

  return(
    <SafeAreaProvider>
      <LoginStack colorScheme={colorScheme}/>
    </SafeAreaProvider>
  );
}