import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import axios from 'axios';

const PokemonList = ({navigation}) => {
  const [press, setPress] = useState(false);
  const [pokemonList, setPokemonList] = useState([]);
  const [error, setError] = useState('');
  // console.log(press);
  useEffect(() => {
    // subscribing => did mount
    const unsubscribe = navigation.getParent().addListener('tabPress', () => {
      setPress(!press);
    });
    // unsubscribe => will unmount
    return () => unsubscribe();
  }, [navigation, press]);
  useEffect(() => {
    const URL = 'https://pokeapi.co/api/v2/pokemon?limit=10&offset=0';
    axios
      .get(URL)
      .then(res => {
        const pokemonData = res.data.results.map((pokemon, idx) => ({
          ...pokemon,
          id: idx + 1,
        }));
        setPokemonList(pokemonData);
      })
      .catch(err => setError(err.message));
  }, []);
  return (
    <SafeAreaView>
      <Text>Pokemon List</Text>
      <TouchableOpacity
        style={{height: 50, width: 200, borderColor: '#000', borderWidth: 2}}
        onPress={() => navigation.navigate('Detail')}>
        <Text>Go To Detail</Text>
      </TouchableOpacity>
      <Text>{`${press}`}</Text>
      {pokemonList.length > 0 &&
        pokemonList.map((pokemon, idx) => {
          return (
            <View key={idx}>
              <Text>
                {idx + 1}. {pokemon.name}
              </Text>
            </View>
          );
        })}
      <Text>===========Flatlist============</Text>
      {pokemonList.length > 0 && (
        <FlatList
          data={pokemonList}
          renderItem={({item: pokemon}) => {
            // console.log(pokemon);
            return (
              <TouchableOpacity
                style={{
                  height: 50,
                  width: 200,
                  borderColor: '#000',
                  borderWidth: 2,
                }}>
                <Text>
                  {pokemon.id}. {pokemon.name}
                </Text>
              </TouchableOpacity>
            );
          }}
          keyExtractor={pokemon => pokemon.id}
        />
      )}
    </SafeAreaView>
  );
};

export default PokemonList;
