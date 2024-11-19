import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, Alert, FlatList, StyleSheet, ScrollView } from 'react-native';
import { supabase } from './index';

const GroupDetail = ({ route }) => {
  const { groupId } = route.params;
  const [groupDetails, setGroupDetails] = useState(null);
  const [students, setStudents] = useState([]);
  const [evaluations, setEvaluations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGroupDetails = async () => {
      try {
        const { data: groupData, error: groupError } = await supabase
          .from('Grupos')
          .select('*')
          .eq('id', groupId)
          .single();

        if (groupError) throw groupError;
        setGroupDetails(groupData);

        const { data: studentsData, error: studentsError } = await supabase
          .from('Alunos')
          .select('*')
          .eq('id_grupo', groupId);

        if (studentsError) throw studentsError;
        setStudents(studentsData);

        const { data: evaluationsData, error: evaluationsError } = await supabase
          .from('Avaliacoes')
          .select('*')
          .eq('id_grupo', groupId);

        if (evaluationsError) throw evaluationsError;
        setEvaluations(evaluationsData);
      } catch (error) {
        console.error('Erro ao recuperar os dados:', error);
        Alert.alert('Erro', 'Não foi possível carregar os dados do grupo.');
      } finally {
        setLoading(false);
      }
    };

    fetchGroupDetails();
  }, [groupId]);

  const ListSection = ({ title, data, renderItem, emptyMessage }) => (
    <View>
      <Text style={styles.sectionTitle}>{title}</Text>
      {data.length > 0 ? (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />
      ) : (
        <Text style={styles.emptyMessage}>{emptyMessage}</Text>
      )}
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text style={styles.loadingText}>Carregando detalhes...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {groupDetails ? (
        <>
          <View style={styles.groupInfo}>
            <Text style={styles.groupTitle}>{groupDetails.nome}</Text>
            <Text style={styles.groupDescription}>{groupDetails.descricao}</Text>
            <Text style={styles.groupDescription}>Estande: {groupDetails.estande}</Text>
            <Text style={styles.memberCount}>Membros: {students.length}</Text>
          </View>

          <ListSection
            title="Alunos"
            data={students}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <Text style={styles.itemText}>{item.nome} {item.sobrenome}</Text>
              </View>
            )}
            emptyMessage="Nenhum aluno cadastrado."
          />

          <ListSection
            title="Avaliações"
            data={evaluations}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <Text style={styles.itemText}>Nota: {item.nota}</Text>
                <Text style={styles.itemText}>Comentário: {item.comentario}</Text>
              </View>
            )}
            emptyMessage="Nenhuma avaliação disponível."
          />
        </>
      ) : (
        <Text style={styles.errorMessage}>Grupo não encontrado.</Text>
      )}
    </ScrollView>
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
  groupInfo: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  groupTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  groupDescription: {
    fontSize: 16,
    marginVertical: 5,
    color: '#555',
  },
  memberCount: {
    fontSize: 16,
    color: '#777',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#444',
    marginVertical: 10,
  },
  item: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
  },
  itemText: {
    fontSize: 16,
    color: '#333',
  },
  emptyMessage: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    marginVertical: 10,
  },
  errorMessage: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default GroupDetail;
