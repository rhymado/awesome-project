import React, {useState} from 'react';
import {View, Text, TouchableOpacity, ScrollView, Image} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import axios from 'axios';
import FormData from 'form-data';

import {dancingScript, lobsterRegular} from '../../assets/fontType';

const Auth = ({navigation}) => {
  const [response, setResponse] = useState(null);
  const [err, setErr] = useState(null);
  //   const [axiosResponse, setAxiosResponse] = useState(null);
  return (
    <ScrollView>
      <View>
        <Text style={{fontFamily: lobsterRegular, fontSize: 40}}>Auth</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Content')}
          style={{borderWidth: 3, borderColor: '#000'}}>
          <Text style={{fontFamily: dancingScript.bold, fontSize: 35}}>
            Content
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{marginTop: 10}}>
        <Text style={{fontFamily: lobsterRegular, fontSize: 40}}>Image</Text>
        <TouchableOpacity
          onPress={() => {
            ImagePicker.launchImageLibrary({}, response => {
              if (response.didCancel) return;
              if (response.errorCode) return setErr(response.errorMessage);
              if (response.assets) {
                const formData = new FormData();
                formData.append('name', 'Fakhri');
                // response.assets.forEach(image =>
                //   formData.append('images', {
                //     uri: image.uri,
                //     name: image.fileName,
                //     type: image.type,
                //   }),
                // );
                console.log(formData);
                axios
                  .post(process.env.LOCAL.concat('/upload'), formData, {
                    headers: {
                      'content-type':
                        'multipart/form-data;boundary=myUniqueString',
                      accept: 'application/json',
                    },
                  })
                  .then(res => console.log(res.data))
                  .catch(err => console.log(err));
                return setResponse(response.assets);
              }
            });
          }}
          style={{borderWidth: 3, borderColor: '#000'}}>
          <Text style={{fontFamily: dancingScript.bold, fontSize: 35}}>
            Upload
          </Text>
        </TouchableOpacity>
        {response?.assets &&
          response?.assets.map(({uri}) => {
            return (
              <View
                key={uri}
                style={{marginVertical: 24, alignItems: 'center'}}>
                <Image
                  source={{uri}}
                  resizeMethod="scale"
                  resizeMode="cover"
                  style={{width: 200, height: 200}}
                />
              </View>
            );
          })}
      </View>
    </ScrollView>
  );
};

export default Auth;
