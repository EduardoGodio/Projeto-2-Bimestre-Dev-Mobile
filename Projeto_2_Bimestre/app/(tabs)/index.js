import { createClient } from '@supabase/supabase-js';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './LoginScreen';
import SignUpScreen from './SignUpScreen';
import ForgotPasswordScreen from './ForgotPasswordScreen';
import GroupsScreen from './GroupsScreen';
import GroupDetailScreen from './GroupDetailScreen';


const SUPABASE_URL = 'https://serzmjuuwyxvjjbexjpi.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNlcnptanV1d3l4dmpqYmV4anBpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE2OTE4NDUsImV4cCI6MjA0NzI2Nzg0NX0.CKhhic3Nka7ZIICv4C5pY5L3ZLSueMkQTUwKuwtb8qI';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);




const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer independent={true} >
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="Groups" component={GroupsScreen} />
        <Stack.Screen name="GroupDetail" component={GroupDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}