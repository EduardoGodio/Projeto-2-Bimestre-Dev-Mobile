import React, { useState } from 'react';
import { View, TextInput, Button, ActivityIndicator, StyleSheet, Text, Alert } from 'react-native';
import { supabase } from './index';

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleForgotPassword = async () => {
    if (!email) {
      alert('Erro: Por favor, preencha o campo de email.');
      return;
    }

    if (!isValidEmail(email)) {
      alert('Erro: Por favor, insira um email válido.');
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email);

      if (error) {
        throw error;
      }

      alert(
        'Um email de redefinição de senha foi enviado. Verifique sua caixa de entrada.'
      );
    } catch (error) {
      alert('Erro: Não foi possível enviar o email. Tente novamente mais tarde.');
      console.error('Erro ao enviar o email:', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Redefinir Senha</Text>

      <TextInput
        style={styles.input}
        placeholder="Digite seu email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        editable={!loading} // Desativa enquanto processa
      />

      <Button
        title={loading ? 'Enviando...' : 'Enviar Email'}
        onPress={handleForgotPassword}
        disabled={!email || loading} // Desativa se email está vazio ou processando
        color="#4CAF50"
      />

      {loading && <ActivityIndicator size="large" color="#4CAF50" style={styles.loading} />}
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
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
  input: {
    height: 50,
    width: '80%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  loading: {
    marginTop: 20,
  },
});

export default ForgotPasswordScreen;
