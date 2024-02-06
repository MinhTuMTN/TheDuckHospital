import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NativeBaseProvider} from 'native-base';
import React from 'react';
import {StatusBar} from 'react-native';
import PatientBottomNavigator from './src/navigator/PatientBottomNavigator';
import SlashScreen from './src/screens/SlashScreen';
import './src/localization/i18n';
import {BottomSheetModalInternalProvider} from '@gorhom/bottom-sheet/lib/typescript/contexts';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import NotFoundScreen from './src/screens/NotFoundScreen';

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
          <Stack.Screen
            name="PatientBottom"
            component={PatientBottomNavigator}
          />
          <Stack.Screen name="NotFoundScreen" component={NotFoundScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
};

export default App;
