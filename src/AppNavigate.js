import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CovidData from './CovidData';

const Stack = createStackNavigator();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="CovidData"
                    component={CovidData}
                    options={{
                        title: 'Covid-19 Data',
                        headerStyle: {
                            backgroundColor: '#252B48', 
                        },
                        headerTintColor: '#fff', 
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        },
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;