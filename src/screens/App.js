import {
  Text,
  Image,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';

const App = ({navigation}) => {
  const [input, setInput] = useState('');
  const [phone, setPhone] = useState('');
  const onChangeTextHandler = text => {
    setInput(text);
  };
  const onPhoneNumberChange = text => {
    const re = /^\d{1,}$/g;
    if (re.test(text)) {
      return setPhone(text);
    }
    // error handling
  };
  const onPressInHandler = () => {
    console.log('in');
  };
  const onPressOutHandler = () => {
    console.log('out');
  };
  const onLongPressHandler = () => {
    console.log('long');
  };
  return (
    <ScrollView>
      <TouchableOpacity
        onPressIn={onPressInHandler}
        onPressOut={onPressOutHandler}
        onLongPress={onLongPressHandler}
        onPress={() => {
          const param = {
            id: 1,
            firstName: 'Fakhri',
            lastName: 'Ridho',
            profile:
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUDCIqUOBzvKzd-j6EqpcslaIJxwisqrr3Ug&usqp=CAU',
          };
          navigation.navigate('Profile', param);
        }}
        style={{height: 50, width: 200, borderColor: '#000', borderWidth: 2}}>
        <Text>Go To Profile</Text>
      </TouchableOpacity>
      <Image
        style={{width: 200, height: 200}}
        source={{
          uri: 'https://reactnative.dev/img/tiny_logo.png',
        }}
      />
      <Image
        style={{width: 200, height: 200}}
        source={require('../assets/Blue_morpho_butterfly.jpg')}
      />
      <Image
        style={{width: 200, height: 200}}
        source={{
          uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg==',
        }}
      />
      <KeyboardAvoidingView>
        <Text>{input}</Text>
        <TextInput
          style={{borderColor: '#000', borderWidth: 2}}
          value={input}
          onChangeText={onChangeTextHandler}
        />
        <Text>{phone}</Text>
        <TextInput
          style={{borderColor: '#000', borderWidth: 2}}
          placeholder="No Telp."
          onChangeText={onPhoneNumberChange}
        />
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default App;
