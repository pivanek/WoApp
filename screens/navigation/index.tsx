import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { LogsIcon, ProfileIcon, SettingsIcon, StatsIcon, WorkoutIcon } from '../../components/Icons';
import WorkoutsScreen from './WorkoutsScreen';
import CalendarScreen from './CalendarScreen';
import StatsScreen from './StatsScreen';
import { ColorSchemeName } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import ExerciseSearchModal from '../Stack/ExerciseSearchModal';
import SetUpWorkout from '../Stack/SetUpWorkout';
import ExerciseLog from '../Stack/ExerciseLog';
import ProfileScreen from './ProfileScreen';
import RegistrationScreen from '../Stack/RegistrationScreen';
import LoginScreen from '../Stack/LoginScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import PasswordResetScreen from '../Stack/PasswordResetScreen';


export default function HomeScreen({ colorScheme }: { colorScheme: ColorSchemeName }){
  return(
    <SafeAreaProvider>
      <Navigation colorScheme={colorScheme} />
      <StatusBar />
    </SafeAreaProvider>
  );
} 

function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <StackNavigator/>
    </NavigationContainer>
  );
}

const Stack = createStackNavigator();

export function LoginStack({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return(
    <NavigationContainer theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack.Navigator>
        <Stack.Screen 
          name="LoginScreen" 
          component={LoginScreen}
          options={{
            title: "Login"
          }}
        />
        <Stack.Screen 
          name="RegistrationScreen" 
          component={RegistrationScreen}
          options={{
            title: "Registration"
          }}
        />
        <Stack.Screen 
          name="PasswordReset" 
          component={PasswordResetScreen}
          options={{
            title: "Registration"
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function StackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="BottomTabNavigator"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="SetUpWorkout" 
        component={SetUpWorkout} 
        options={{
          title: "Workout setup"
        }}
      />
      <Stack.Screen 
        name="ExerciseLog" 
        component={ExerciseLog}
        options={{
          title: "Exercise Log"
        }}
      />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
          <Stack.Screen 
            name='ExerciseSearch' 
            component={ExerciseSearchModal}
          />
      </Stack.Group>
    </Stack.Navigator>
  );
}



const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Workouts"
      screenOptions={{
        tabBarActiveTintColor: '#00C5FF',
    }}>
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Profile',
          tabBarIcon: ({color}) => <ProfileIcon color={color}/>,
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
          tabBarStyle: {
            padding: 8
          }
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
            fontSize: 25,
          },
        }}
      />
    </Tab.Navigator>
  );
}