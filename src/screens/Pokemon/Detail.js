import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import React from 'react';

const {width} = Dimensions.get('window');

const PokemonDetail = ({navigation}) => {
  return (
    <View>
      <Text>PokemonDetail</Text>
      <TouchableOpacity
        style={{height: 50, width: 200, borderColor: '#000', borderWidth: 2}}
        onPress={() => navigation.navigate('Profile')}>
        <Text>Go To Profile</Text>
      </TouchableOpacity>
      <View style={styles.container}>
        <View style={[styles.innerContainer, styles.bgPrimary]}>
          <View style={[styles.bgDark]}></View>
          <View style={[styles.bgLight]}>
            <View style={styles.content}>
              <Text>Light</Text>
            </View>
          </View>
        </View>
        <View style={[styles.innerContainer, styles.bgSecondary]}></View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#3bd2d6',
    height: 500,
    width: width,
    flexDirection: 'row',
  },
  innerContainer: {
    flex: 1,
  },
  content: {
    flex: 1,
    borderWidth: 2,
    borderColor: '#000',
    padding: 10,
    borderRadius: 20,
  },
  bgPrimary: {
    backgroundColor: '#da833b',
  },
  bgSecondary: {
    backgroundColor: '#bcffba',
  },
  bgDark: {
    backgroundColor: '#384353',
    flex: 1,
  },
  bgLight: {
    backgroundColor: '#d1b4d4',
    flex: 2,
    padding: 10,
  },
});

export default PokemonDetail;
