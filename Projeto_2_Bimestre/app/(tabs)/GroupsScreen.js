import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, Alert, ActivityIndicator, StyleSheet } from 'react-native';
import { supabase } from './index';

const GroupsScreen = ({ navigation }) => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();

      if (error) {
        console.error('Erro ao recuperar o usuário:', error);
        return;
      }

      if (!user) {
        console.log('Usuário não autenticado. Redirecionando para login.');
        navigation.replace('Login');
        return;
      }

      setUser(user);
      fetchGroups();
    } catch (error) {
      console.error('Erro ao autenticar usuário:', error);
      Alert.alert('Erro', 'Não foi possível autenticar o usuário.');
    }
  };

  const fetchGroups = async () => {
    try {
      const { data, error } = await supabase.from('Grupos').select('*');

      if (error) {
        throw error;
      }

      setGroups(data);
    } catch (error) {
      console.error('Erro ao recuperar os grupos:', error);
      Alert.alert('Erro', 'Não foi possível carregar os grupos.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      console.log('Usuário deslogado');
      navigation.replace('Login');
    } catch (error) {
      console.error('Erro ao deslogar:', error);
      Alert.alert('Erro', 'Não foi possível deslogar.');
    }
  };

  const renderGroup = ({ item }) => (
    <View style={styles.groupItem}>
      <Text style={styles.groupName}>{item.nome}</Text>
      <Button
        title="Ver Detalhes"
        color="#4CAF50"
        onPress={() => navigation.navigate('GroupDetail', { groupId: item.id })}
      />
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text style={styles.loadingText}>Carregando grupos...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {user && (
        <Text style={styles.welcomeText}>Bem-vindo, {user.email}!</Text>
      )}

      <Text style={styles.title}>Grupos</Text>

      {groups.length > 0 ? (
        <FlatList
          data={groups}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderGroup}
          contentContainerStyle={styles.list}
        />
      ) : (
        <Text style={styles.emptyMessage}>Nenhum grupo encontrado.</Text>
      )}

      <Button title="Deslogar" color="#FF5252" onPress={handleSignOut} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    padding: 15,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  welcomeText: {
    fontSize: 18,
    color: '#333',
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  list: {
    paddingBottom: 20,
  },
  groupItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    justifyContent: 'space-between',
  },
  groupName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  emptyMessage: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    marginVertical: 20,
  },
});

export default GroupsScreen;
