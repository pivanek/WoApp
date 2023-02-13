import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import useColorScheme from '../../hooks/useColorScheme';
import { LogsIcon, SettingsIcon, StatsIcon, WorkoutIcon } from '../../components/Icons';
import WorkoutsScreen from './WorkoutScreen';
import CalendarScreen from './CalendarScreen';
import StatsScreen from './StatsScreen';
import SettingsScreen from './SettingsScreen';
import { ColorSchemeName } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import NewWorkout from '../Stack/NewWorkout';
import WorkoutEditor from '../Stack/WorkoutEditor';
import ExerciseSearchModal from '../Stack/ExerciseSearchModal';

const Tab = createBottomTabNavigator();

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <StackNavigator/>
    </NavigationContainer>
  );
}

export function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Workouts"
      screenOptions={{
        tabBarActiveTintColor: '#00C5FF',
    }}>
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: 'Settings',
          tabBarIcon: ({color}) => <SettingsIcon color={color}/>,
          headerTitleStyle: {
            fontSize: 25
          },
        }}
      />
      <Tab.Screen
        name="Workouts"
        component={WorkoutsScreen}
        options={{
          title: 'Workouts',
          tabBarIcon: ({color}) => <WorkoutIcon color={color}/>,
          headerTitleStyle: {
            fontSize: 25
          },
        }}
        
      />
      <Tab.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{
          title: 'Calendar',
          tabBarIcon: ({color}) => <LogsIcon color={color}/>,
          headerTitleStyle: {
            fontSize: 25
          },
        }}
      />
      <Tab.Screen
        name="Stats"
        component={StatsScreen}
        options={{
          title: 'Stats',
          tabBarIcon: ({color}) => <StatsIcon color={color}/>,
          headerTitleStyle: {
            fontSize: 25
          },
        }}
      />
    </Tab.Navigator>
  );
}

const Stack = createStackNavigator();

export function StackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="BottomTabNavigator"
    >
      <Stack.Screen 
        name="NewWorkout" 
        component={NewWorkout} 
        options={{
          title: "Workout"
        }}
      />
      <Stack.Screen name="WorkoutEditor" component={WorkoutEditor}/>
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
          <Stack.Screen 
            name='ExerciseSearch' 
            component={ExerciseSearchModal}
          />
      </Stack.Group>
      <Stack.Screen
        name="BottomTabNavigator"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
