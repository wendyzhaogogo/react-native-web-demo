import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper';
import { SignScreen } from './src/screens/SignScreen';
import { VerifyScreen } from './src/screens/VerifyScreen';
import { enableScreens } from 'react-native-screens';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { CustomModalProvider } from './src/components/CustomModal/CustomModalProvider';

enableScreens();

const Stack = createStackNavigator();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1,backgroundColor:'black' }}>
      <PaperProvider>
        <CustomModalProvider>
          <NavigationContainer>
            <Stack.Navigator 
              initialRouteName="Sign"
              screenOptions={{
                headerStyle: {
                  backgroundColor: '#6200ee',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              }}
            >
              <Stack.Screen 
                name="Sign" 
                component={SignScreen}
                options={{ title: 'Sign Message' }}
              />
              <Stack.Screen 
                name="Verify" 
                component={VerifyScreen}
                options={{ title: 'Verify Signature' }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </CustomModalProvider>
      </PaperProvider>
    </GestureHandlerRootView>
  );
}
