// App.js
import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import * as Location from 'expo-location';

const App = () => {
  // States para armazenar dados da API e geolocalização
  const [apiData, setApiData] = useState(null);
  const [location, setLocation] = useState(null);

  // Função para pegar a localização do usuário
  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permissão para acessar localização negada');
      return;
    }

    const location = await Location.getCurrentPositionAsync({});
    setLocation(location);
  };

  // Função para buscar dados da API
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/users'); // Altere para o IP da API se necessário "http://localhost:3000/users" ou "http://seu ipv4:3000/api/usuarios" caso você use o expo go
      setApiData(response.data);
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    }
  };

  // Efeito para buscar dados e geolocalização
  useEffect(() => {
    fetchData();
    getLocation();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>API Data</Text>

      {/* Exibindo os dados da API */}
      {apiData ? (
        <View style={styles.dataContainer}>
          <Text>Mensagem da API: {apiData.message}</Text>
          <Text>Status: {apiData.status}</Text>
        </View>
      ) : (
        <Text>Carregando dados...</Text>
      )}

      {/* Exibindo a localização */}
      {location ? (
        <View style={styles.locationContainer}>
          <Text>Latitude: {location.coords.latitude}</Text>
          <Text>Longitude: {location.coords.longitude}</Text>
        </View>
      ) : (
        <Text>Carregando localização...</Text>
      )}

      <Button title="Atualizar Localização" onPress={getLocation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  dataContainer: {
    marginVertical: 20,
  },
  locationContainer: {
    marginVertical: 20,
  },
});

export default App;