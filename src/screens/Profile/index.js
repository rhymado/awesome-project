import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  Button,
  Keyboard,
} from 'react-native';
import React, {useState, useEffect, useMemo} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector, useDispatch} from 'react-redux';
import EventEmitter from 'events';

import {SECRET} from '@env';
import {
  sendLocalNotification,
  sendScheduledNotification,
  cancelAllLocalNotification,
} from '../../utils/notification';

import styles from '../../styles/Profile';

const Profile = ({navigation, route}) => {
  const [input, setInput] = useState('');
  const counter = useSelector(state => state.counter);
  const dispatch = useDispatch();
  const myEmitter = useMemo(() => new EventEmitter(), []);
  // listener event custom
  useEffect(() => {
    const cb = counter => console.log('counter saat ini =', counter);
    myEmitter.on('counter_change', cb);

    return () => myEmitter.off('counter_change', cb);
  }, [myEmitter]);
  // listener keyboard android
  useEffect(() => {
    const showListener = Keyboard.addListener('keyboardDidShow', () =>
      console.log('Keyboard Muncul'),
    );
    const hideListener = Keyboard.addListener('keyboardDidHide', () =>
      console.log('Keyboard Disembunyikan'),
    );

    return () => {
      showListener.remove();
      hideListener.remove();
    };
  }, []);
  // listener navigation
  useEffect(() => {
    const focusListener = navigation.addListener('focus', () => {
      console.log('Selamat Datang');
    });
    const blurListener = navigation.addListener('blur', () => {
      console.log('Selamat Jalan');
    });
    return () => {
      focusListener();
      blurListener();
    };
  });
  // async storage
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
            onPress={() => {
              dispatch({
                type: 'UP',
              });
              myEmitter.emit('counter_change', counter + 1);
            }}>
            <Text>UP</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.backToHomeButton}
            onPress={() => {
              dispatch({
                type: 'DOWN',
              });
              myEmitter.emit('counter_change', counter - 1);
            }}>
            <Text>DOWN</Text>
          </TouchableOpacity>
        </View>
        <Text>{SECRET}</Text>
        <View>
          <TouchableOpacity
            style={styles.backToHomeButton}
            onPress={() => {
              sendLocalNotification({
                title: 'Welcome',
                message: 'Ini adalah notifikasi lokal dari app',
              });
            }}>
            <Text>Send Local Notification</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.backToHomeButton}
            onPress={() => {
              sendScheduledNotification({
                title: 'Jadwal Sholat',
                message: 'Waktu Zuhur',
                date: new Date(Date.now() + 5 * 1000),
              });
            }}>
            <Text>Send Scheduled Notification</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.backToHomeButton}
            onPress={() => {
              cancelAllLocalNotification();
            }}>
            <Text>Cancel All Local Notification</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Profile;
