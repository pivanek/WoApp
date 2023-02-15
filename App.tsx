import Navigation from './screens/navigation';
import useColorScheme from './hooks/useColorScheme';
import useCachedResources from './hooks/useCachedResources';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  const colorScheme = useColorScheme();
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
    <SafeAreaProvider>
      <Navigation colorScheme={colorScheme} />
      <StatusBar />
    </SafeAreaProvider>
    );
  }
}