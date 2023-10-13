import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import axios from 'axios';

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [meals, setMeals] = useState([]);

  const searchMeals = async () => {
    try {
      const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`);
      const data = response.data;
      if (data.meals) {
        setMeals(data.meals);
      } else {
        setMeals([]);
      }
    } catch (error) {
      console.error('Error fetching data', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>API TheMealDB</Text>
        <View style={styles.pesquisarBox}>
          <TextInput
            placeholder="pesquise..."
            style={styles.pesquisarInput}
            value={searchTerm}
            onChangeText={(text) => setSearchTerm(text)}
          />
          <TouchableOpacity style={styles.buttonPesquisar} onPress={searchMeals}>
            <Text style={styles.textPesquisar}>Search</Text>
          </TouchableOpacity>
        </View>
        <StatusBar style="auto" />
      </View>
      <ScrollView style={styles.scrollView}>
        <View style={styles.mealContainer}>
          {meals.map((meal) => (
            <View key={meal.idMeal} style={styles.mealBox}>
              <Image source={{ uri: meal.strMealThumb }} style={styles.mealImage} />
              <Text style={styles.mealText}>{meal.strMeal}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },

  titleContainer:{
    width:'100%',
    paddingTop:50,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#fff',
    borderBottomColor:'#E1E0E0',
    borderBottomWidth:1,
  },
  
  title:{
    fontSize:24,
    color:'#FFA500',
  },

  pesquisarBox:{
    alignItems:'center',
    width:'100%',
    alignContent:'center',
    flexDirection:'row',
    justifyContent:'center',
  },

  pesquisarInput:{
    textAlignVertical:'bottom',
    padding:5,
    width:'50%',
    borderBottomWidth:1,
    borderColor:'#D8D8D8',
    margin:20,
  },

  buttonPesquisar:{
    paddingVertical:15,
    paddingHorizontal:30,
    borderRadius:15,
    backgroundColor:'#FFA500',
  },

  textPesquisar:{
    color:'#fff',
  },

  mealContainer:{
    marginTop:25,
    width:'100%',
    alignItems:'center',
  },

  mealBox: {
    maxWidth:350,
    alignItems:'center',
    margin: 10,
    backgroundColor:'#fff',
    borderRadius:20,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    elevation: 10,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },

  mealImage: {
    borderTopLeftRadius:20,
    borderTopRightRadius:20,
    width: 350,
    height: 350,
  },

  mealText:{
    textAlign:'center',
    marginVertical:15,
    marginHorizontal:15,
  }
});
