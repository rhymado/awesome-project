import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  Button,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector, useDispatch} from 'react-redux';

import {SECRET} from '@env';

import styles from '../../styles/Profile';

const Profile = ({navigation, route}) => {
  const [input, setInput] = useState('');
  const counter = useSelector(state => state.counter);
  const dispatch = useDispatch();
  useEffect(() => {
    const getInputFromStorage = async () => {
      try {
        const inputFromStorage = await AsyncStorage.getItem('text-input');
        if (inputFromStorage) {
          navigation.navigate('Home');
        }
      } catch (err) {
        console.error(err);
      }
    };
    getInputFromStorage();
  }, [navigation]);
  // console.log('params', route.params);
  // const {firstName, lastName, profile} = route.params;
  return (
    <ScrollView>
      <Text>Profile</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('Home')}
        style={styles.backToHomeButton}>
        <Text>Go To Home</Text>
      </TouchableOpacity>
      {route.params &&
        Object.keys(route.params).every(value => {
          const re = /firstName|lastName|profile|id/g;
          // console.log(value);
          return re.test(value);
        }) && (
          <View>
            <Text>
              {route.params.firstName.concat(' ', route.params.lastName)}
            </Text>
            <Image
              source={{
                uri: route.params.profile,
              }}
              style={styles.profileImage}
            />
          </View>
        )}
      <View>
        <TextInput
          style={{borderColor: '#000', borderWidth: 2, marginVertical: 20}}
          value={input}
          onChangeText={text => {
            setInput(text);
          }}
        />
        <Button
          title="Simpan"
          onPress={async () => {
            try {
              AsyncStorage.setItem('text-input', input);
            } catch (err) {
              console.error(err);
            }
          }}
        />
        <View>
          <Text>Counter: {counter}</Text>
          <TouchableOpacity
            style={styles.backToHomeButton}
            onPress={() =>
              dispatch({
                type: 'UP',
              })
            }>
            <Text>UP</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.backToHomeButton}
            onPress={() =>
              dispatch({
                type: 'DOWN',
              })
            }>
            <Text>DOWN</Text>
          </TouchableOpacity>
        </View>
        <Text>{SECRET}</Text>
      </View>
    </ScrollView>
  );
};

export default Profile;
