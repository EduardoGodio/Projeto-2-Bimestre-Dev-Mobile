import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert, StyleSheet, Image } from 'react-native';
import inova from '@/assets/images/inova.png';
import uvv from '@/assets/images/uvv.png';
import { supabase } from './index';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const { data: user, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      alert('Login realizado com sucesso!');
      console.log('Usuário logado:', user);
      navigation.replace('Groups');
    } catch (error) {
      console.error('Erro ao realizar login:', error.message);
      alert('Erro: Email ou senha inválidos. Por favor, tente novamente.');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={inova} style={styles.image} />
      <Text style={styles.header}>InovaWeek 2025</Text>
      <Image source={uvv} style={styles.topRightImage} />

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
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Button title="Entrar" onPress={handleLogin} color="#4CAF50" />

      <View style={styles.footer}>
        <Button
          title="Cadastro"
          onPress={() => navigation.navigate('SignUp')}
          color="#2196F3"
        />
        <Button
          title="Esqueci a senha"
          onPress={() => navigation.navigate('ForgotPassword')}
          color="#FFC107"
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
  image: {
    height: 200,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 40,
    textAlign: 'center',
  },
  input: {
    width: '80%',
    height: 50,
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
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  topRightImage: {
    position: 'absolute',
    top: 10,
    right: -60,
    height: 80,
    resizeMode: 'contain',
  },  
});

export default LoginScreen;
