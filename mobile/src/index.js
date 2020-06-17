import React, {useEffect, useState} from 'react';
import {SafeAreaView,FlatList, Text, StyleSheet, StatusBar, TouchableOpacity} from 'react-native';

import api from './services/api';

export default function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get('projects').then((response) => {
      console.log(response.data);
      setProjects(response.data);
    });
  }, []);

 async function handleAddProject(){
      const response = await api.post('projects', {
        title: `New Project ${Date.now()}`,
        author: "JoJo"
      });
      setProjects(
        [
          ...projects,
          response.data
        ]
      )
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container}>
        <FlatList
          data={projects}
          keyExtractor={project => project.id}
          renderItem={({ item: project }) => (
            <Text style={styles.project}>{project.title}</Text>
          )}
        />
        <TouchableOpacity 
          onPress={handleAddProject}
          style={styles.button}
          activeOpacity={0.6}
        > 
            <Text style={styles.buttonText}> Adiciobnar projeto</Text>

        </TouchableOpacity>
      </SafeAreaView>
    </> 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7159c1',
  },
  project: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#fff',
  },
  button: {
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    margin: 20,
    height: 50,
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#7159c1'
   
  }
});
