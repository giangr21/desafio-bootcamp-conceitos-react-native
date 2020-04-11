import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import api from './services/api';

export default function App() {
  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    api.get('repositories').then(result => {
      setRepositories(result.data)
    })
  }, []) 
    

  async function handleLikeRepository(id) {
    const result = await api.post(`repositories/${id}/like`)
    const indexRepo = repositories.findIndex(r => r.id === id)
    repositories[indexRepo].likes = result.data.likes
    setRepositories([...repositories])
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container}>
      <FlatList
        style={styles.repositoryContainer} 
        data={repositories}
        keyExtractor={repo => repo.id}
        renderItem={({item: repositories}) => (
          <>
          <Text style={styles.repository}>{repositories.title}</Text>

          <FlatList
            style={styles.techsContainer}
            data={repositories.techs}
            keyExtractor={repo => repo}
            renderItem={({item: techs}) => (
              <>
                <Text style={styles.tech}>
                {techs}
                </Text>
              </>
            )}
          />

          <View style={styles.likesContainer}>
            <Text
              style={styles.likeText}
              testID={`repository-likes-${repositories.id}`}
            >
              {repositories.likes} curtidas
            </Text>
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={() => handleLikeRepository(repositories.id)}
            testID={`like-button-${repositories.id}`}
          >
            <Text style={styles.buttonText}>Curtir</Text>
          </TouchableOpacity>
        </>
        )}
      />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7159c1",
  },
  repositoryContainer: {
    marginBottom: 15,
    marginHorizontal: 15,
    backgroundColor: "#fff",
    padding: 20,
  },
  repository: {
    fontSize: 32,
    fontWeight: "bold",
  },
  techsContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  tech: {
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 10,
    backgroundColor: "#04d361",
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#fff",
  },
  likesContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  likeText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
  },
  button: {
    marginTop: 10,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
    color: "#fff",
    backgroundColor: "#7159c1",
    padding: 15,
  },
});
