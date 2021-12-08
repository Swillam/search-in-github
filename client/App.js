import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  const fetchUser = async (username) => {
    const { API_URL } = process.env;
    console.log(API_URL)
    const response = await fetch(`${API_URL}/api/users/${username}`, {
      headers: {
        Authorization: "token ghp_16C7e42F292c6912E7710c838347Ae178B4a"
      }
    });
    const data = await response.json();

    console.log(data);
  }

  fetchUser("Test");

  return (
    <View style={styles.container}>
      <Text>Hello !</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
