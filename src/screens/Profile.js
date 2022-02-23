import {View, Text, TouchableOpacity, ScrollView, Image} from 'react-native';
import React from 'react';

import styles from '../styles/Profile';

const Profile = ({navigation, route}) => {
  const {firstName, lastName, profile} = route.params;
  return (
    <ScrollView>
      <Text>Profile</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('App')}
        style={styles.backToHomeButton}>
        <Text>Go To Home</Text>
      </TouchableOpacity>
      <View>
        <Text>{firstName.concat(' ', lastName)}</Text>
        <Image
          source={{
            uri: profile,
          }}
          style={styles.profileImage}
        />
      </View>
    </ScrollView>
  );
};

export default Profile;
