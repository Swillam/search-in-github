import React, { useState } from 'react';
import { StyleSheet, Text, View,Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SearchBar } from 'react-native-elements';



async function fetchUser(username) {
  const { API_URL } = process.env;
  
  const response = await fetch(`${API_URL}/api/users/${username}`);
  const data = await response.json();

  return data
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection:"row",
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop:10,
    paddingBottom:10,
    paddingEnd:50,
    paddingStart:50
    // justifyContent: 'top',
  },
  containerC: {
    flexDirection:"row",
    justifyContent: 'space-between',
    paddingEnd:100,
    paddingStart:100,
    paddingTop:10,
    paddingBottom:10,
  },
  containerIcon: {
    justifyContent: 'space-between',
  },
  tinyLogo: {
    width: 50,
    height: 50,
    borderRadius: 75,
    overflow: "hidden",
    marginEnd:25
  },
  title: {
    fontWeight:900,
  },
  subtitle: {
    fontWeight: 100,
  },
  about:{
    paddingStart:25,
    backgroundColor:'#fff'
  }
});

function renderUser(user) {
  if (user){
    if (user.login){
      return (
      <>
        <View style={styles.container}>
          <Image style={styles.tinyLogo} source={{ uri: user.avatar_url, }} />
          <View style={styles.containerIcon}>
            <Text style={styles.title}>{user.login}</Text>
            <Text style={styles.subtitle}>{user.company} </Text>
          </View>
        </View>
        <View style={styles.containerC}>
            <View>
              <Text>Followers</Text>
              <Text>{user.followers}</Text>
            </View>
            <View>
              <Text>Following</Text>
              <Text>{user.following}</Text>
            </View>
            <View>
              <Text>Public repos</Text>
              <Text>{user.public_repos}</Text>
            </View>
          </View>
          <View style={styles.container}>
            <Text style={styles.title}>About</Text>
          </View>
          <Text style={styles.about}>{user.bio} </Text>
      </>
      )
    }
    return (
      <Text>{user.ErrorMessage}</Text>
      )
  }
}

function HomeScreen() {
  const [ username,setUsername] = useState("")
  const [ user,setUser] = useState(null)

  return (
    <View>
      <SearchBar
        placeholder="Type Here..."
        onChangeText={setUsername}
        onSubmitEditing={()=>setUserAsync(username,setUser)}
        value={username}
      />
      { renderUser(user) }
    </View>
  );
}

 async function setUserAsync(username,setUser){
  const search = await fetchUser(username)
  setUser(search)
 }