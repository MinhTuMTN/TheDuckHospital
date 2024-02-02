import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NativeBaseProvider} from 'native-base';
import React from 'react';
import {StatusBar} from 'react-native';
import MainPatientNavigatior from './src/navigator/MainPatientNavigatior';
import SlashScreen from './src/screens/SlashScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NativeBaseProvider>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={'transparent'}
        translucent={true}
      />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="SlashScreen"
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="SlashScreen" component={SlashScreen} />
          <Stack.Screen name="MainPatient" component={MainPatientNavigatior} />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
};

export default App;
