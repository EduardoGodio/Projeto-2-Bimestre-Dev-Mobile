import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, Text } from 'react-native';
import { supabase } from './index';

const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    if (!email || !password) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });

      if (error) {
        throw error;
      } else{
        alert(
          'Cadastro realizado!',
          'Verifique seu email para confirmar o cadastro.'
        );
        navigation.navigate('Login');
      }

    } catch (error) {
      console.error('Erro ao cadastrar:', error.message);
      Alert.alert('Erro', 'Não foi possível realizar o cadastro.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Cadastro</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Button title="Cadastrar" onPress={handleSignUp} color="#4CAF50" />

      <View style={styles.footer}>
        <Text style={styles.footerText}>Já tem uma conta?</Text>
        <Button
          title="Faça Login"
          onPress={() => navigation.navigate('Login')}
          color="#2196F3"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f7f7f7',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 40,
  },
  input: {
    height: 50,
    width: '80%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  footer: {
    marginTop: 20,
    width: '80%',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
});

export default SignUpScreen;
