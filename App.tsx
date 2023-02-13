import Navigation from './screens/Navigation/Navigation';
import useColorScheme from './hooks/useColorScheme';
import useCachedResources from './hooks/useCachedResources';

export default function App() {
  const colorScheme = useColorScheme();
  const isLoadingComplete = useCachedResources();

  return (
    <Navigation colorScheme = { colorScheme }/>
  );
}